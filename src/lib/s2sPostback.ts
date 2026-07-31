import express from 'express';

const TRAFFICSTARS_POSTBACK_URL = process.env.VITE_TRAFFICSTARS_POSTBACK_URL || '';
const TRAFFICSTARS_KEY = process.env.VITE_TRAFFICSTARS_KEY || '';
const TRAFFICSTARS_GOAL_ID = process.env.VITE_TRAFFICSTARS_GOAL_ID || '';
const TRAFFICSTARS_DEFAULT_VALUE = process.env.VITE_TRAFFICSTARS_DEFAULT_VALUE
  ? parseFloat(process.env.VITE_TRAFFICSTARS_DEFAULT_VALUE)
  : undefined;
const TRAFFICSTARS_DEFAULT_PRICE = process.env.VITE_TRAFFICSTARS_DEFAULT_PRICE
  ? parseFloat(process.env.VITE_TRAFFICSTARS_DEFAULT_PRICE)
  : undefined;

interface ClickRecord {
  clickId: string;
  email?: string;
  capturedAt: number;
}

const clickStore = new Map<string, ClickRecord>();
const CLICK_TTL_MS = 24 * 60 * 60 * 1000;

function cleanupClicks() {
  const now = Date.now();
  for (const [key, record] of clickStore.entries()) {
    if (now - record.capturedAt > CLICK_TTL_MS) {
      clickStore.delete(key);
    }
  }
}

export function registerS2SRoutes(app: express.Application) {
  app.post('/api/track/ts-click', express.json(), (req, res) => {
    const { click_id, email } = req.body || {};
    if (!click_id || typeof click_id !== 'string') {
      return res.status(400).json({ error: 'click_id is required' });
    }

    cleanupClicks();

    const key = email ? email.toLowerCase().trim() : click_id;
    clickStore.set(key, {
      clickId: click_id,
      email: email?.toLowerCase().trim(),
      capturedAt: Date.now(),
    });

    return res.json({ received: true });
  });

  app.get('/api/track/ts-click/:identifier', (req, res) => {
    const { identifier } = req.params;
    const record = clickStore.get(identifier.toLowerCase());
    if (!record) {
      return res.status(404).json({ error: 'click_id not found' });
    }
    return res.json({ click_id: record.clickId });
  });
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
    const record = clickStore.get(options.email.toLowerCase().trim());
    if (record) {
      clickId = record.clickId;
    }
  }

  if (!clickId) {
    for (const record of clickStore.values()) {
      clickId = record.clickId;
      break;
    }
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
