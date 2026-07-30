export const REDDIT_PIXEL_ID = 'a2_hy5rwg3g91ay';

declare global {
  interface Window {
    rdt?: (...args: any[]) => void;
  }
}

function getOrCreateExternalId(): string {
  if (typeof window === 'undefined') return `web_${Date.now()}`;
  let id = localStorage.getItem('reddit_external_id');
  if (!id) {
    id = `web_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem('reddit_external_id', id);
  }
  return id;
}

function generateConversionId(eventAt: number, eventName: string, value?: number): string {
  const id = getOrCreateExternalId();
  const seed = `${eventAt}|${eventName}|${value ?? ''}|${id}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `capi_${Math.abs(hash).toString(16)}_${eventAt}`;
}

function fireCAPI(eventPayload: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  const url = '/api/reddit/capi';
  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify({ events: [eventPayload] })], { type: 'application/json' });
    navigator.sendBeacon(url, blob);
  } else {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: [eventPayload] }),
      keepalive: true,
    }).catch(() => {});
  }
}

export function initRedditPixel(userData?: {
  email?: string;
  phoneNumber?: string;
  externalId?: string;
  idfa?: string;
  aaid?: string;
}) {
  const effectiveExternalId = userData?.externalId || getOrCreateExternalId();
  if (typeof window !== 'undefined' && window.rdt) {
    if (userData && Object.keys(userData).length > 0) {
      window.rdt('init', REDDIT_PIXEL_ID, {
        ...(userData.email ? { email: userData.email.trim().toLowerCase() } : {}),
        ...(userData.phoneNumber ? { phoneNumber: userData.phoneNumber } : {}),
        externalId: effectiveExternalId,
        ...(userData.idfa ? { idfa: userData.idfa } : {}),
        ...(userData.aaid ? { aaid: userData.aaid } : {}),
      });
    } else {
      window.rdt('init', REDDIT_PIXEL_ID, { externalId: effectiveExternalId });
    }
  }
}

export function trackPageVisit(eventSourceUrl?: string) {
  initRedditPixel();
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', 'PageVisit');
  }
  const eventAt = Math.floor(Date.now() / 1000);
  const externalId = getOrCreateExternalId();
  fireCAPI({
    eventName: 'PageVisit',
    eventTime: eventAt,
    eventSourceUrl,
    actionSource: 'WEBSITE',
    userData: { externalId },
  });
}

export function trackLead(email?: string, eventSourceUrl?: string) {
  if (email) {
    initRedditPixel({ email });
  }
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', 'Lead');
  }
  const eventAt = Math.floor(Date.now() / 1000);
  const externalId = getOrCreateExternalId();
  fireCAPI({
    eventName: 'Lead',
    eventTime: eventAt,
    eventSourceUrl,
    actionSource: 'WEBSITE',
    userData: {
      externalId,
      ...(email ? { email: email.trim().toLowerCase() } : {}),
    },
  });
}

export function trackAddToCart(value: number = 47, currency: string = 'USD', eventSourceUrl?: string) {
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', 'AddToCart', {
      itemCount: 1,
      value,
      currency,
    });
  }
  const eventAt = Math.floor(Date.now() / 1000);
  const externalId = getOrCreateExternalId();
  fireCAPI({
    eventName: 'AddToCart',
    eventTime: eventAt,
    eventSourceUrl,
    actionSource: 'WEBSITE',
    userData: { externalId },
    customData: { value, currency, item_count: 1 },
  });
}

export function trackSignUp(email?: string, eventSourceUrl?: string) {
  if (email) {
    initRedditPixel({ email });
  }
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', 'SignUp');
  }
  const eventAt = Math.floor(Date.now() / 1000);
  const externalId = getOrCreateExternalId();
  fireCAPI({
    eventName: 'SignUp',
    eventTime: eventAt,
    eventSourceUrl,
    actionSource: 'WEBSITE',
    userData: {
      externalId,
      ...(email ? { email: email.trim().toLowerCase() } : {}),
    },
  });
}

export function trackPurchase(details: {
  value: number;
  currency?: string;
  orderId?: string;
  itemCount?: number;
  email?: string;
}, eventSourceUrl?: string) {
  if (details.email) {
    initRedditPixel({ email: details.email });
  }
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', 'Purchase', {
      itemCount: details.itemCount || 1,
      value: details.value,
      currency: details.currency || 'USD',
      transactionId: details.orderId,
    });
  }
  const eventAt = Math.floor(Date.now() / 1000);
  const conversionId = generateConversionId(eventAt, 'Purchase', details.value);
  const externalId = getOrCreateExternalId();
  fireCAPI({
    eventName: 'Purchase',
    eventTime: eventAt,
    eventSourceUrl,
    actionSource: 'WEBSITE',
    conversionId,
    userData: {
      externalId,
      ...(details.email ? { email: details.email.trim().toLowerCase() } : {}),
    },
    customData: {
      value: details.value,
      currency: details.currency || 'USD',
      order_id: details.orderId,
      item_count: details.itemCount || 1,
    },
  });
}

export function trackViewContent(contentName: string, eventSourceUrl?: string) {
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', 'ViewContent', {
      contentName,
    });
  }
  const eventAt = Math.floor(Date.now() / 1000);
  const externalId = getOrCreateExternalId();
  fireCAPI({
    eventName: 'ViewContent',
    eventTime: eventAt,
    eventSourceUrl,
    actionSource: 'WEBSITE',
    userData: { externalId },
    customData: { content_name: contentName },
  });
}

export function trackCustomEvent(eventName: string, metadata?: Record<string, any>, eventSourceUrl?: string) {
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', eventName, metadata);
  }
  const eventAt = Math.floor(Date.now() / 1000);
  const externalId = getOrCreateExternalId();
  fireCAPI({
    eventName: eventName as any,
    eventTime: eventAt,
    eventSourceUrl,
    actionSource: 'WEBSITE',
    userData: { externalId },
    customData: metadata,
  });
}
