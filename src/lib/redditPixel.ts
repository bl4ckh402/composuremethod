// Helper module for Reddit Pixel integration (Pixel ID: a2_hy5rwg3g91ay)

export const REDDIT_PIXEL_ID = 'a2_hy5rwg3g91ay';

declare global {
  interface Window {
    rdt?: (...args: any[]) => void;
  }
}

/**
 * Initialize or update match keys for Reddit Pixel (Advanced Matching)
 */
export function initRedditPixel(userData?: {
  email?: string;
  phoneNumber?: string;
  externalId?: string;
  idfa?: string;
  aaid?: string;
}) {
  if (typeof window !== 'undefined' && window.rdt) {
    if (userData && Object.keys(userData).length > 0) {
      window.rdt('init', REDDIT_PIXEL_ID, {
        ...(userData.email ? { email: userData.email.trim().toLowerCase() } : {}),
        ...(userData.phoneNumber ? { phoneNumber: userData.phoneNumber } : {}),
        ...(userData.externalId ? { externalId: userData.externalId } : {}),
        ...(userData.idfa ? { idfa: userData.idfa } : {}),
        ...(userData.aaid ? { aaid: userData.aaid } : {}),
      });
    } else {
      window.rdt('init', REDDIT_PIXEL_ID);
    }
  }
}

/**
 * Track standard PageVisit event
 */
export function trackPageVisit() {
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', 'PageVisit');
  }
}

/**
 * Track Lead event (e.g., email submission, access verification, or checkout form start)
 */
export function trackLead(email?: string) {
  if (email) {
    initRedditPixel({ email });
  }
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', 'Lead');
  }
}

/**
 * Track AddToCart event (e.g., clicking "Get Instant Access $47" or opening checkout modal)
 */
export function trackAddToCart(value: number = 47, currency: string = 'USD') {
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', 'AddToCart', {
      itemCount: 1,
      value: value,
      currency: currency,
    });
  }
}

/**
 * Track SignUp event
 */
export function trackSignUp(email?: string) {
  if (email) {
    initRedditPixel({ email });
  }
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', 'SignUp');
  }
}

/**
 * Track Purchase event (Order placement / payment completion)
 */
export function trackPurchase(details: {
  value: number;
  currency?: string;
  orderId?: string;
  itemCount?: number;
  email?: string;
}) {
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
}

/**
 * Track ViewContent event
 */
export function trackViewContent(contentName: string) {
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', 'ViewContent', {
      contentName,
    });
  }
}

/**
 * Track custom interaction events
 */
export function trackCustomEvent(eventName: string, metadata?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.rdt) {
    window.rdt('track', eventName, metadata);
  }
}
