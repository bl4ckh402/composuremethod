import { Redis } from '@upstash/redis';

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    })
  : null;

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

    if (redis) {
      const key = email ? `trafficstars:click:${email.toLowerCase().trim()}` : `trafficstars:click:${click_id}`;
      await redis.set(key, click_id, { ex: 24 * 60 * 60 });
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ received: true }));
  } catch (err) {
    console.error('[TrafficStars Click] Error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Failed to store click_id' }));
  }
};
