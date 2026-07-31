import express from 'express';

export function registerS2SRoutes(app: express.Application) {
  app.post('/api/track/ts-click', express.json(), async (req, res) => {
    const { click_id, email } = req.body || {};
    if (!click_id || typeof click_id !== 'string') {
      return res.status(400).json({ error: 'click_id is required' });
    }

    await storeClickId(click_id, email);

    return res.json({ received: true });
  });
}

const getEnv = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  return undefined;
};

const TRAFFICSTARS_POSTBACK_URL = getEnv('VITE_TRAFFICSTARS_POSTBACK_URL') || '';
const TRAFFICSTARS_KEY = getEnv('VITE_TRAFFICSTARS_KEY') || '';
const TRAFFICSTARS_GOAL_ID = getEnv('VITE_TRAFFICSTARS_GOAL_ID') || '';
const TRAFFICSTARS_DEFAULT_VALUE = getEnv('VITE_TRAFFICSTARS_DEFAULT_VALUE')
  ? parseFloat(getEnv('VITE_TRAFFICSTARS_DEFAULT_VALUE')!)
  : undefined;
const TRAFFICSTARS_DEFAULT_PRICE = getEnv('VITE_TRAFFICSTARS_DEFAULT_PRICE')
  ? parseFloat(getEnv('VITE_TRAFFICSTARS_DEFAULT_PRICE')!)
  : undefined;

interface ClickRecord {
  clickId: string;
  email?: string;
  capturedAt: number;
}

const USE_REDIS = typeof process !== 'undefined' && !!process.env.UPSTASH_REDIS_REST_URL;

const redis = USE_REDIS
  ? new (await import('@upstash/redis')).Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    })
  : null;

const CLICK_TTL_SECONDS = 24 * 60 * 60;
const clickStore = new Map<string, ClickRecord>();

function cleanupClicks() {
  const now = Date.now();
  for (const [key, record] of clickStore.entries()) {
    if (now - record.capturedAt > CLICK_TTL_SECONDS * 1000) {
      clickStore.delete(key);
    }
  }
}

export async function storeClickId(clickId: string, email?: string): Promise<void> {
  if (!clickId) return;
  const key = email ? email.toLowerCase().trim() : clickId;

  if (redis) {
    try {
      const redisKey = email ? `trafficstars:click:${key}` : `trafficstars:click:${clickId}`;
      await redis.set(redisKey, clickId, { ex: CLICK_TTL_SECONDS });
    } catch {
      // ignore Redis errors
    }
  }

  cleanupClicks();
  clickStore.set(key, {
    clickId,
    email: email?.toLowerCase().trim(),
    capturedAt: Date.now(),
  });
}

export async function getClickIdByEmail(email: string): Promise<string | undefined> {
  if (!email) return undefined;

  if (redis) {
    try {
      const redisKey = `trafficstars:click:${email.toLowerCase().trim()}`;
      const stored = await redis.get<string>(redisKey);
      if (stored) return stored;
    } catch {
      // ignore Redis errors
    }
  }

  const record = clickStore.get(email.toLowerCase().trim());
  return record?.clickId;
}

export async function getAnyClickId(): Promise<string | undefined> {
  if (redis) {
    try {
      const keys = await redis.keys('trafficstars:click:*');
      if (keys.length > 0) {
        const stored = await redis.get<string>(keys[0]);
        if (stored) return stored;
      }
    } catch {
      // ignore Redis errors
    }
  }

  for (const record of clickStore.values()) {
    return record.clickId;
  }
  return undefined;
}

export async function fireTrafficStarsPostback(options: {
  value?: number;
  price?: number;
  leadCode?: string;
  orderId?: string;
  email?: string;
}): Promise<void> {
  if (!TRAFFICSTARS_POSTBACK_URL || !TRAFFICSTARS_KEY || !TRAFFICSTARS_GOAL_ID) {
    return;
  }

  const value = options.value ?? TRAFFICSTARS_DEFAULT_VALUE;
  const price = options.price ?? TRAFFICSTARS_DEFAULT_PRICE;
  if (value == null || price == null) {
    return;
  }

  const leadCode = options.leadCode || options.orderId || `order_${Date.now()}`;
  let clickId = '';

  if (options.email) {
    clickId = (await getClickIdByEmail(options.email)) || '';
  }

  if (!clickId) {
    clickId = (await getAnyClickId()) || '';
  }

  const url = TRAFFICSTARS_POSTBACK_URL
    .replace('{value}', encodeURIComponent(String(value)))
    .replace('{price}', encodeURIComponent(String(price)))
    .replace('{lead_code}', encodeURIComponent(leadCode))
    .replace('{click_id}', encodeURIComponent(clickId))
    .replace('{key}', encodeURIComponent(TRAFFICSTARS_KEY))
    .replace('{goalid}', encodeURIComponent(TRAFFICSTARS_GOAL_ID));

  try {
    await fetch(url, { method: 'GET' });
  } catch {
    // ignore postback failures
  }
}
