import mixpanel from 'mixpanel-browser';

const token = import.meta.env.VITE_MIXPANEL_TOKEN as string | undefined;

export function initMixpanel() {
  if (!token || typeof window === 'undefined') return;
  mixpanel.init(token, {
    debug: true,
    record_sessions_percent: 100,
    record_heatmap_data: true,
  });
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (!token) return;
  mixpanel.track(event, properties);
}

export function identify(userId: string) {
  if (!token) return;
  mixpanel.identify(userId);
}

export function reset() {
  if (!token) return;
  mixpanel.reset();
}

export function peopleSet(properties: Record<string, unknown>) {
  if (!token) return;
  mixpanel.people.set(properties);
}
