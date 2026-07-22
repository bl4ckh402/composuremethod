import { validateEvent, WebhookVerificationError } from '@polar-sh/sdk/webhooks';
import {
  grantOrderEntitlement,
  revokeOrderEntitlement,
} from '../../../src/lib/entitlementsStore';

export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
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
