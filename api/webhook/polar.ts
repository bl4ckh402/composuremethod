import { validateEvent, WebhookVerificationError } from '@polar-sh/sdk/webhooks';
import {
  grantOrderEntitlement,
  revokeOrderEntitlement,
} from '../../src/lib/entitlementsStore.js';

const TRAFFICSTARS_POSTBACK_URL = process.env.VITE_TRAFFICSTARS_POSTBACK_URL || '';
const TRAFFICSTARS_KEY = process.env.VITE_TRAFFICSTARS_KEY || '';
const TRAFFICSTARS_GOAL_ID = process.env.VITE_TRAFFICSTARS_GOAL_ID || '';
const TRAFFICSTARS_DEFAULT_VALUE = process.env.VITE_TRAFFICSTARS_DEFAULT_VALUE
  ? parseFloat(process.env.VITE_TRAFFICSTARS_DEFAULT_VALUE)
  : undefined;
const TRAFFICSTARS_DEFAULT_PRICE = process.env.VITE_TRAFFICSTARS_DEFAULT_PRICE
  ? parseFloat(process.env.VITE_TRAFFICSTARS_DEFAULT_PRICE)
  : undefined;

async function getRedis() {
  if (typeof process === 'undefined' || !process.env.UPSTASH_REDIS_REST_URL) return null;
  try {
    const { Redis } = await import('@upstash/redis');
    return new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    });
  } catch {
    return null;
  }
}

async function getClickIdByEmail(email: string): Promise<string | undefined> {
  const redis = await getRedis();
  if (!redis) return undefined;
  try {
    const stored = await redis.get(`trafficstars:click:${email.toLowerCase().trim()}`);
    if (stored) return stored as string;
  } catch {}
  return undefined;
}

async function getAnyClickId(): Promise<string | undefined> {
  const redis = await getRedis();
  if (!redis) return undefined;
  try {
    const keys = await redis.keys('trafficstars:click:*');
    if (keys.length > 0) {
      const stored = await redis.get(keys[0]);
      if (stored) return stored as string;
    }
  } catch {}
  return undefined;
}

async function fireTrafficStarsPostback(options: {
  value?: number;
  price?: number;
  leadCode?: string;
  orderId?: string;
  email?: string;
  goalId?: string;
}): Promise<void> {
  const goalId = options.goalId || TRAFFICSTARS_GOAL_ID;
  if (!TRAFFICSTARS_POSTBACK_URL || !TRAFFICSTARS_KEY || !goalId) {
    console.warn('[TrafficStars S2S] Missing env vars, skipping postback');
    return;
  }

  const value = options.value ?? TRAFFICSTARS_DEFAULT_VALUE;
  const price = options.price ?? TRAFFICSTARS_DEFAULT_PRICE;
  if (value == null || price == null) {
    console.warn('[TrafficStars S2S] Missing value/price, skipping postback');
    return;
  }

  const leadCode = options.leadCode || options.orderId || `order_${Date.now()}`;
  let clickId = '';

  if (options.email) {
    clickId = (await getClickIdByEmail(options.email)) || '';
    if (clickId) {
      console.log(`[TrafficStars S2S] Found clickId by email ${options.email}: ${clickId}`);
    }
  }

  if (!clickId) {
    clickId = (await getAnyClickId()) || '';
    if (clickId) {
      console.log(`[TrafficStars S2S] Using fallback clickId: ${clickId}`);
    }
  }

  if (!clickId) {
    console.warn(`[TrafficStars S2S] No clickId found for order ${options.orderId}`);
    return;
  }

  const url = TRAFFICSTARS_POSTBACK_URL
    .replace('{value}', encodeURIComponent(String(value)))
    .replace('{price}', encodeURIComponent(String(price)))
    .replace('{lead_code}', encodeURIComponent(leadCode))
    .replace('{click_id}', encodeURIComponent(clickId))
    .replace('{key}', encodeURIComponent(TRAFFICSTARS_KEY))
    .replace('{goalid}', encodeURIComponent(goalId));

  console.log(`[TrafficStars S2S] Firing postback: ${url}`);

  try {
    await fetch(url, { method: 'GET' });
    console.log(`[TrafficStars S2S] Postback fired successfully`);
  } catch (err) {
    console.error(`[TrafficStars S2S] Postback failed:`, err);
  }
}

export default async (req: any, res: any) => {
  console.log(`[Polar Webhook] Received ${req.method} request`);
  
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
  console.log(`[Polar Webhook] webhookSecret present: ${!!webhookSecret}`);
  
  if (!webhookSecret) {
    console.warn('[Polar Webhook] POLAR_WEBHOOK_SECRET is missing from environment.');
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'POLAR_WEBHOOK_SECRET not configured' }));
    return;
  }

  let rawBody: string;
  try {
    const chunks: Uint8Array[] = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    rawBody = Buffer.concat(chunks).toString('utf8');
  } catch {
    rawBody = '';
  }

  let event: ReturnType<typeof validateEvent>;
  try {
    event = validateEvent(
      rawBody,
      {
        'webhook-id': (req.headers['webhook-id'] as string) || '',
        'webhook-timestamp': (req.headers['webhook-timestamp'] as string) || '',
        'webhook-signature': (req.headers['webhook-signature'] as string) || '',
      },
      webhookSecret
    );
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      console.error('[Polar Webhook] Signature verification failed.');
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ received: false, error: 'Invalid signature' }));
      return;
    }
    console.error('[Polar Webhook] Verification error:', error);
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Webhook verification error' }));
    return;
  }

  switch (event.type) {
    case 'order.created':
    case 'order.paid': {
      const orderData = event.data as any;
      const orderId = orderData.id || `ord_${Date.now()}`;
      const customerEmail =
        orderData.customer_email ||
        orderData.customerEmail ||
        orderData.customer?.email;

      if (!customerEmail) {
        console.warn(`[Polar Webhook] Order ${orderId} missing customer email. Skipping entitlement grant.`);
        break;
      }
      const customerId = orderData.customer_id || orderData.customer?.id;
      const productId = orderData.product_id || orderData.product?.id;
      const amount = orderData.amount || orderData.total_amount;
      const currency = orderData.currency || 'usd';

      try {
        await grantOrderEntitlement({
          orderId,
          customerEmail,
          customerId,
          productId,
          amount,
          currency,
          status: 'paid',
          metadata: {
            source: 'polar_webhook',
            eventType: event.type,
          },
        });
      } catch (err) {
        console.error('[Polar Webhook] Error granting entitlement:', err);
      }

      fireTrafficStarsPostback({
        value: amount,
        price: amount,
        leadCode: orderId,
        orderId,
        email: customerEmail,
        goalId: TRAFFICSTARS_GOAL_ID || undefined,
      }).catch((err) => {
        console.error('[TrafficStars S2S] Purchase postback failed:', err);
      });

      console.log(
        `[Polar Webhook] Successfully granted access to ${customerEmail} for order ${orderId}`
      );
      break;
    }

    case 'order.refunded': {
      const orderData = event.data as any;
      if (orderData.id) {
        try {
          await revokeOrderEntitlement(orderData.id);
        } catch (err) {
          console.error('[Polar Webhook] Error revoking entitlement:', err);
        }
        console.log(`[Polar Webhook] Revoked entitlement for order ${orderData.id}`);
      }
      break;
    }

    case 'customer.state_changed': {
      const customerData = event.data as any;
      console.log(
        "[Polar Webhook] customer.state_changed received for customer ID:",
        customerData.id || customerData.customer_id
      );
      break;
    }

    default:
      console.log(`[Polar Webhook] Received unhandled event type: ${event.type}`);
      break;
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ received: true }));
};
