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

export function clearTrafficStarsClickId(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('trafficstars_click_id');
  } catch {
    // ignore storage errors
  }
}

function sendBeacon(url: string, data: Record<string, any>): void {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  if (navigator.sendBeacon && navigator.sendBeacon(url, blob)) {
    return;
  }
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    keepalive: true,
  }).catch(() => {});
}

export function trackTrafficStarsClick(email?: string): void {
  const clickId = getTrafficStarsClickId();
  if (!clickId) return;
  sendBeacon('/api/track/ts-event', {
    click_id: clickId,
    email: email?.trim().toLowerCase(),
    type: 'click',
  });
}

export function trackTrafficStarsLead(email?: string): void {
  const clickId = getTrafficStarsClickId();
  if (!clickId) return;
  sendBeacon('/api/track/ts-event', {
    click_id: clickId,
    email: email?.trim().toLowerCase(),
    type: 'lead',
  });
}

export function trackTrafficStarsCheckout(email?: string): void {
  const clickId = getTrafficStarsClickId();
  if (!clickId) return;
  sendBeacon('/api/track/ts-event', {
    click_id: clickId,
    email: email?.trim().toLowerCase(),
    type: 'checkout',
  });
}
