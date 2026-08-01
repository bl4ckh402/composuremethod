import { Redis } from '@upstash/redis';

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    })
  : null;

const TRAFFICSTARS_POSTBACK_URL = process.env.VITE_TRAFFICSTARS_POSTBACK_URL || '';
const TRAFFICSTARS_KEY = process.env.VITE_TRAFFICSTARS_KEY || '';
const TRAFFICSTARS_LEAD_GOAL_ID = process.env.VITE_TRAFFICSTARS_LEAD_GOAL_ID || '0';
const TRAFFICSTARS_CHECKOUT_GOAL_ID = process.env.VITE_TRAFFICSTARS_CHECKOUT_GOAL_ID || '5141';
const TRAFFICSTARS_GOAL_ID = process.env.VITE_TRAFFICSTARS_GOAL_ID || '5123';
const TRAFFICSTARS_DEFAULT_VALUE = process.env.VITE_TRAFFICSTARS_DEFAULT_VALUE
  ? parseFloat(process.env.VITE_TRAFFICSTARS_DEFAULT_VALUE)
  : undefined;

async function getRedis() {
  if (redis) return redis;
  if (typeof process === 'undefined' || !process.env.UPSTASH_REDIS_REST_URL) return null;
  try {
    const { Redis: RedisModule } = await import('@upstash/redis');
    return new RedisModule({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    });
  } catch {
    return null;
  }
}

async function storeClickId(clickId: string, email?: string): Promise<void> {
  if (!clickId) return;
  const key = email ? email.toLowerCase().trim() : clickId;

  const redisClient = await getRedis();
  if (redisClient) {
    try {
      await redisClient.set(`trafficstars:click:${key}`, clickId, { ex: 24 * 60 * 60 });
    } catch {
      // ignore Redis errors
    }
  }
}

async function getClickIdByEmail(email: string): Promise<string | undefined> {
  const redisClient = await getRedis();
  if (!redisClient) return undefined;
  try {
    const stored = await redisClient.get(`trafficstars:click:${email.toLowerCase().trim()}`);
    if (stored) return stored as string;
  } catch {}
  return undefined;
}

async function getAnyClickId(): Promise<string | undefined> {
  const redisClient = await getRedis();
  if (!redisClient) return undefined;
  try {
    const keys = await redisClient.keys('trafficstars:click:*');
    if (keys.length > 0) {
      const stored = await redisClient.get(keys[0]);
      if (stored) return stored as string;
    }
  } catch {}
  return undefined;
}

async function firePostback(options: {
  value?: number;
  price?: number;
  leadCode?: string;
  orderId?: string;
  email?: string;
  goalId: string;
}): Promise<void> {
  if (!TRAFFICSTARS_POSTBACK_URL || !TRAFFICSTARS_KEY || !options.goalId) {
    return;
  }

  const value = options.value ?? TRAFFICSTARS_DEFAULT_VALUE;
  const price = options.price ?? TRAFFICSTARS_DEFAULT_PRICE;
  if (value == null || price == null) return;

  const leadCode = options.leadCode || options.orderId || `order_${Date.now()}`;
  let clickId = '';

  if (options.email) {
    clickId = (await getClickIdByEmail(options.email)) || '';
  }

  if (!clickId) {
    clickId = (await getAnyClickId()) || '';
  }

  if (!clickId) return;

  const url = TRAFFICSTARS_POSTBACK_URL
    .replace('{value}', encodeURIComponent(String(value)))
    .replace('{price}', encodeURIComponent(String(price)))
    .replace('{lead_code}', encodeURIComponent(leadCode))
    .replace('{click_id}', encodeURIComponent(clickId))
    .replace('{key}', encodeURIComponent(TRAFFICSTARS_KEY))
    .replace('{goalid}', encodeURIComponent(options.goalId));

  try {
    await fetch(url, { method: 'GET' });
  } catch {
    // ignore postback failures
  }
}

export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const { click_id, email, type } = req.body || {};

    if (!click_id || typeof click_id !== 'string') {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'click_id is required' }));
      return;
    }

    await storeClickId(click_id, email);

    if (type === 'checkout') {
      await firePostback({
        value: TRAFFICSTARS_DEFAULT_VALUE ?? 20,
        price: TRAFFICSTARS_DEFAULT_VALUE ?? 20,
        leadCode: `checkout_${Date.now()}`,
        email,
        goalId: TRAFFICSTARS_CHECKOUT_GOAL_ID,
      });
    } else if (type === 'lead') {
      await firePostback({
        value: TRAFFICSTARS_DEFAULT_VALUE ?? 20,
        price: TRAFFICSTARS_DEFAULT_VALUE ?? 20,
        leadCode: `lead_${Date.now()}`,
        email,
        goalId: TRAFFICSTARS_LEAD_GOAL_ID,
      });
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ received: true }));
  } catch (err) {
    console.error('[TrafficStars Track] Error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Failed to track event' }));
  }
};
