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

export function trackTrafficStarsLead(email?: string): void {
  if (typeof window === 'undefined') return;
  const clickId = getTrafficStarsClickId();
  if (!clickId) return;

  try {
    fetch('/api/track/ts-lead', {
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

export function trackTrafficStarsCheckout(email?: string): void {
  if (typeof window === 'undefined') return;
  const clickId = getTrafficStarsClickId();
  if (!clickId) return;

  try {
    fetch('/api/track/ts-checkout', {
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
