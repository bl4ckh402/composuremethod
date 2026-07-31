const TRAFFICSTARS_POSTBACK_URL =
  'https://tsyndicate.com/api/v1/cpa/action?value={value}&price={price}&lead_code={lead_code}&allow_duplicates=1&clickid={click_id}&key=jhF0JX78NYeYY9O1JAro6oHYMxhDzCoWn9fA&goalid=5123';

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

export function trackTrafficStarsPurchase(options?: {
  value?: number;
  price?: number;
  leadCode?: string;
  orderId?: string;
}) {
  if (typeof window === 'undefined') return;

  const clickId = getTrafficStarsClickId();
  if (!clickId) {
    return;
  }

  const value = options?.value ?? 20;
  const price = options?.price ?? 20;
  const leadCode = options?.leadCode || options?.orderId || `order_${Date.now()}`;

  const url = TRAFFICSTARS_POSTBACK_URL
    .replace('{value}', encodeURIComponent(String(value)))
    .replace('{price}', encodeURIComponent(String(price)))
    .replace('{lead_code}', encodeURIComponent(leadCode))
    .replace('{click_id}', encodeURIComponent(clickId));

  try {
    new Image().src = url;
  } catch {
    // ignore tracking pixel failures
  }
}
