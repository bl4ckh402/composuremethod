const getEnv = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
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

const CLICK_TTL_SECONDS = 24 * 60 * 60;
const clickStore = new Map<string, ClickRecord>();

let redis: any = null;

async function getRedis() {
  if (redis) return redis;
  if (typeof process === 'undefined' || !process.env.UPSTASH_REDIS_REST_URL) return null;
  try {
    const redisModule = require('@upstash/redis');
    redis = new redisModule.Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    });
  } catch (err) {
    console.error('[S2S] Failed to initialize Redis:', err);
  }
  return redis;
}

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

  const redisClient = await getRedis();
  if (redisClient) {
    try {
      const redisKey = email ? `trafficstars:click:${key}` : `trafficstars:click:${clickId}`;
      await redisClient.set(redisKey, clickId, { ex: CLICK_TTL_SECONDS });
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

  const redisClient = await getRedis();
  if (redisClient) {
    try {
      const redisKey = `trafficstars:click:${email.toLowerCase().trim()}`;
      const stored = await redisClient.get(redisKey);
      if (stored) return stored as string;
    } catch {
      // ignore Redis errors
    }
  }

  const record = clickStore.get(email.toLowerCase().trim());
  return record?.clickId;
}

export async function getAnyClickId(): Promise<string | undefined> {
  const redisClient = await getRedis();
  if (redisClient) {
    try {
      const keys = await redisClient.keys('trafficstars:click:*');
      if (keys.length > 0) {
        const stored = await redisClient.get(keys[0]);
        if (stored) return stored as string;
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
    .replace('{click_id}', encodeURIComponent(String(clickId)))
    .replace('{key}', encodeURIComponent(TRAFFICSTARS_KEY))
    .replace('{goalid}', encodeURIComponent(TRAFFICSTARS_GOAL_ID));

  try {
    await fetch(url, { method: 'GET' });
  } catch {
    // ignore postback failures
  }
}

export function registerS2SRoutes(app: any) {
  app.post('/api/track/ts-click', expressJson(), async (req: any, res: any) => {
    const { click_id, email } = req.body || {};
    if (!click_id || typeof click_id !== 'string') {
      return res.status(400).json({ error: 'click_id is required' });
    }

    await storeClickId(click_id, email);

    return res.json({ received: true });
  });
}

function expressJson() {
  return (req: any, res: any, next: any) => {
    let data = '';
    req.on('data', (chunk: any) => { data += chunk; });
    req.on('end', () => {
      try {
        req.body = data ? JSON.parse(data) : {};
      } catch {
        req.body = {};
      }
      next();
    });
  };
}
