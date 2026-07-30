import crypto from 'crypto';
import type { Request, Response } from 'express';

const REDDIT_API_BASE = 'https://ads-api.reddit.com/api/v3/pixels';

export type RedditStandardEvent =
  | 'PageVisit'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'Purchase'
  | 'Lead'
  | 'SignUp';

export type RedditActionSource = 'WEBSITE' | 'APP' | 'PHYSICAL_STORE' | 'OTHER';

export interface RedditUserData {
  email?: string;
  phoneNumber?: string;
  externalId?: string;
  idfa?: string;
  aaid?: string;
  ip?: string;
  userAgent?: string;
}

export interface RedditCustomData {
  value?: number;
  currency?: string;
  orderId?: string;
  itemCount?: number;
  contentName?: string;
  searchQuery?: string;
  [key: string]: any;
}

export interface RedditEventInput {
  eventName: RedditStandardEvent;
  eventTime?: number;
  eventSourceUrl?: string;
  actionSource?: RedditActionSource;
  userData?: RedditUserData;
  customData?: RedditCustomData;
  conversionId?: string;
}

interface ConversionEventV3 {
  event_name: string;
  event_time: number;
  event_source_url?: string;
  action_source: RedditActionSource;
  tracking_type: string;
  user_data?: {
    em?: string;
    ph?: string;
    external_id?: string;
    idfa?: string;
    aaid?: string;
    client_ip_address?: string;
    client_user_agent?: string;
  };
  custom_data?: Record<string, any>;
  conversion_id?: string;
}

interface CAPIRequestBody {
  data: ConversionEventV3[];
}

function sha256Hex(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

export function hashEmail(email: string): string {
  return sha256Hex(email.trim().toLowerCase());
}

export function hashPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return sha256Hex(digits);
}

export function generateConversionId(input: {
  eventTime: number;
  trackingType: string;
  metadataValue?: string | number;
  identifier: string;
}): string {
  const seed = `${input.eventTime}|${input.trackingType}|${input.metadataValue ?? ''}|${input.identifier}`;
  return sha256Hex(seed);
}

export function buildBodyForReddit(
  events: RedditEventInput[],
  requestIp?: string,
  requestUserAgent?: string
): CAPIRequestBody {
  const data: ConversionEventV3[] = events.map((event) => {
    const identifierHash = event.userData?.email
      ? hashEmail(event.userData.email)
      : event.userData?.phoneNumber
      ? hashPhone(event.userData.phoneNumber)
      : event.userData?.externalId || `no_email_${Date.now()}`;

    const conversionId =
      event.conversionId ||
      generateConversionId({
        eventTime: event.eventTime || Math.floor(Date.now() / 1000),
        trackingType: event.eventName,
        metadataValue: event.customData?.value ?? event.customData?.orderId ?? event.customData?.contentName,
        identifier: identifierHash,
      });

    const userData: ConversionEventV3['user_data'] = {};

    const hashedIdentifier = event.userData?.email
      ? hashEmail(event.userData.email)
      : event.userData?.phoneNumber
      ? hashPhone(event.userData.phoneNumber)
      : event.userData?.externalId || `no_match_${Date.now()}`;

    if (event.userData?.email) {
      userData.em = hashEmail(event.userData.email);
      userData.external_id = hashedIdentifier;
    }
    if (event.userData?.externalId && !event.userData?.email) {
      userData.external_id = event.userData.externalId;
    }
    if (event.userData?.phoneNumber) {
      userData.ph = hashPhone(event.userData.phoneNumber);
      if (!event.userData?.email) {
        userData.external_id = hashedIdentifier;
      }
    }
    if (event.userData?.idfa) {
      userData.idfa = event.userData.idfa;
    }
    if (event.userData?.aaid) {
      userData.aaid = event.userData.aaid;
    }
    if (event.userData?.ip || requestIp) {
      userData.client_ip_address = event.userData?.ip || requestIp;
    }
    if (event.userData?.userAgent || requestUserAgent) {
      userData.client_user_agent = event.userData?.userAgent || requestUserAgent;
    }

    const customData: Record<string, any> = { ...event.customData };
    if (customData.value !== undefined) delete customData.value;
    if (event.customData?.value !== undefined) {
      customData.value = event.customData.value;
    }

    return {
      event_name: event.eventName,
      event_time: event.eventTime || Math.floor(Date.now() / 1000),
      ...(event.eventSourceUrl ? { event_source_url: event.eventSourceUrl } : {}),
      action_source: event.actionSource || 'WEBSITE',
      tracking_type: event.eventName,
      ...(Object.keys(userData).length > 0 ? { user_data: userData } : {}),
      ...(Object.keys(customData).length > 0 ? { custom_data: customData } : {}),
      conversion_id: conversionId,
    };
  });

  return { data };
}

export function mapPixelEventToCAPI(
  pixelEventName: string,
  options: {
    value?: number;
    currency?: string;
    orderId?: string;
    itemCount?: number;
    contentName?: string;
    searchQuery?: string;
    email?: string;
    phoneNumber?: string;
    externalId?: string;
    ip?: string;
    userAgent?: string;
    eventSourceUrl?: string;
    actionSource?: RedditActionSource;
  } = {}
): RedditEventInput {
  const normalized = pixelEventName.toLowerCase().replace(/\s+/g, '');

  let eventName: RedditStandardEvent;
  switch (normalized) {
    case 'pagevisit':
      eventName = 'PageVisit';
      break;
    case 'viewcontent':
      eventName = 'ViewContent';
      break;
    case 'search':
      eventName = 'Search';
      break;
    case 'addtocart':
      eventName = 'AddToCart';
      break;
    case 'addtowishlist':
      eventName = 'AddToWishlist';
      break;
    case 'purchase':
      eventName = 'Purchase';
      break;
    case 'lead':
      eventName = 'Lead';
      break;
    case 'signup':
      eventName = 'SignUp';
      break;
    default:
      eventName = 'Lead';
  }

  const customData: RedditCustomData = {};
  if (options.value !== undefined) customData.value = options.value;
  if (options.currency) customData.currency = options.currency;
  if (options.orderId) customData.order_id = options.orderId;
  if (options.itemCount !== undefined) customData.item_count = options.itemCount;
  if (options.contentName) customData.content_name = options.contentName;
  if (options.searchQuery) customData.search_string = options.searchQuery;

  return {
    eventName,
    eventTime: Math.floor(Date.now() / 1000),
    eventSourceUrl: options.eventSourceUrl,
    actionSource: options.actionSource || 'WEBSITE',
    customData,
    userData: {
      email: options.email,
      phoneNumber: options.phoneNumber,
      externalId: options.externalId,
      ip: options.ip,
      userAgent: options.userAgent,
    },
  };
}

export function sendCapiEvents(
  events: RedditEventInput[],
  requestIp?: string,
  requestUserAgent?: string
): Promise<any> {
  const pixelId = process.env.REDDIT_PIXEL_ID;
  const conversionToken = process.env.REDDIT_CONVERSION_TOKEN;

  if (!pixelId || !conversionToken) {
    console.warn('[Reddit CAPI] Missing REDDIT_PIXEL_ID or REDDIT_CONVERSION_TOKEN');
    return Promise.resolve({ skipped: true, reason: 'not_configured' });
  }

  const body = buildBodyForReddit(events, requestIp, requestUserAgent);

  if (body.data.length === 0) {
    return Promise.resolve({ skipped: true, reason: 'no_events' });
  }

  return fetch(`${REDDIT_API_BASE}/${pixelId}/conversion_events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${conversionToken}`,
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Reddit CAPI error: ${response.status} ${text}`);
      }
      return response.json().catch(() => ({}));
    })
    .then((data) => {
      console.log(`[Reddit CAPI] Sent ${body.data.length} event(s) successfully.`);
      return { success: true, data };
    })
    .catch((error: any) => {
      console.error('[Reddit CAPI] Error sending events:', error.message || error);
      return { success: false, error: error.message || error };
    });
}

export function handleRedditCAPI(req: Request, res: Response) {
  const requestIp = req.ip || req.socket.remoteAddress || process.env.REDDIT_SERVER_IP || undefined;
  const requestUserAgent = req.get('user-agent') || undefined;

  const events: RedditEventInput[] = req.body?.events || req.body?.data || [];

  if (!Array.isArray(events) || events.length === 0) {
    return res.status(400).json({ error: 'No conversion events provided' });
  }

  if (events.length > 1000) {
    return res.status(400).json({ error: 'Maximum 1000 events per request' });
  }

  sendCapiEvents(events, requestIp, requestUserAgent)
    .then((result) => {
      res.json(result);
    })
    .catch((error: any) => {
      console.error('[Reddit CAPI] Handler error:', error);
      res.status(500).json({ error: 'Failed to send conversion events to Reddit' });
    });
}

// Frontend helpers
export async function trackRedditCAPI(event: RedditEventInput): Promise<any> {
  return sendCapiEvents([event]);
}

export async function trackRedditCAPIFromPixel(
  pixelEventName: string,
  options: {
    value?: number;
    currency?: string;
    orderId?: string;
    itemCount?: number;
    contentName?: string;
    searchQuery?: string;
    email?: string;
    phoneNumber?: string;
    externalId?: string;
    eventSourceUrl?: string;
    actionSource?: RedditActionSource;
  } = {}
): Promise<any> {
  const event = mapPixelEventToCAPI(pixelEventName, options);
  return trackRedditCAPI(event);
}
