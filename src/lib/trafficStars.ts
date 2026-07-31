const TRAFFICSTARS_POSTBACK_URL = import.meta.env.VITE_TRAFFICSTARS_POSTBACK_URL || '';
const TRAFFICSTARS_KEY = import.meta.env.VITE_TRAFFICSTARS_KEY || '';
const TRAFFICSTARS_GOAL_ID = import.meta.env.VITE_TRAFFICSTARS_GOAL_ID || '';
const TRAFFICSTARS_DEFAULT_VALUE = import.meta.env.VITE_TRAFFICSTARS_DEFAULT_VALUE
  ? parseFloat(import.meta.env.VITE_TRAFFICSTARS_DEFAULT_VALUE)
  : undefined;
const TRAFFICSTARS_DEFAULT_PRICE = import.meta.env.VITE_TRAFFICSTARS_DEFAULT_PRICE
  ? parseFloat(import.meta.env.VITE_TRAFFICSTARS_DEFAULT_PRICE)
  : undefined;

function getTrafficStarsClickId(): string | null {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  const fromUrl = urlParams.get('click_id') || urlParams.get('clickid') || urlParams.get('ts_click_id');
  if (fromUrl) {
    try {
      localStorage.setItem('trafficstars_click_id', fromUrl);
    } catch {
      // ignore storage errors
    }
    return fromUrl;
  }
  try {
    return localStorage.getItem('trafficstars_click_id');
  } catch {
    return null;
  }
}

export function trackTrafficStarsClick(email?: string): void {
  if (typeof window === 'undefined') return;
  const clickId = getTrafficStarsClickId();
  if (!clickId) return;

  try {
    fetch('/api/track/ts-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ click_id: clickId, email: email?.trim().toLowerCase() }),
      keepalive: true,
    }).catch(() => {
      // ignore tracking failures so page load never breaks
    });
  } catch {
    // ignore
  }
}

export function trackTrafficStarsPurchase(options?: {
  value?: number;
  price?: number;
  leadCode?: string;
  orderId?: string;
}) {
  // Client-side purchase pixel removed intentionally.
  // Conversion tracking is handled server-side from the Polar webhook via fireTrafficStarsPostback().
}
