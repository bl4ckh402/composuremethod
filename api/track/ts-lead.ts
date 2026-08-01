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

export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const { click_id, email } = req.body || {};
    if (!click_id || typeof click_id !== 'string') {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'click_id is required' }));
      return;
    }

    const redisClient = await getRedis();
    const key = email ? email.toLowerCase().trim() : click_id;
    if (redisClient) {
      await redisClient.set(`trafficstars:click:${key}`, click_id, { ex: 24 * 60 * 60 });
    }

    if (!TRAFFICSTARS_POSTBACK_URL || !TRAFFICSTARS_KEY) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ received: true, skipped: true }));
      return;
    }

    const value = TRAFFICSTARS_DEFAULT_VALUE ?? 20;
    const url = TRAFFICSTARS_POSTBACK_URL
      .replace('{value}', encodeURIComponent(String(value)))
      .replace('{price}', encodeURIComponent(String(value)))
      .replace('{lead_code}', encodeURIComponent(`lead_${Date.now()}`))
      .replace('{click_id}', encodeURIComponent(click_id))
      .replace('{key}', encodeURIComponent(TRAFFICSTARS_KEY))
      .replace('{goalid}', encodeURIComponent(TRAFFICSTARS_LEAD_GOAL_ID));

    try {
      await fetch(url, { method: 'GET' });
    } catch {}

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ received: true }));
  } catch (err) {
    console.error('[TrafficStars Lead] Error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Failed to track lead' }));
  }
};
