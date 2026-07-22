import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

export interface OrderEntitlement {
  id: string;
  orderId: string;
  customerEmail: string;
  customerId?: string;
  externalCustomerId?: string;
  productId?: string;
  status: 'paid' | 'revoked' | 'refunded';
  createdAt: string;
  updatedAt: string;
  amount?: number;
  currency?: string;
  metadata?: Record<string, any>;
}

const USE_REDIS = !!process.env.UPSTASH_REDIS_REST_URL;

const redis = USE_REDIS
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

const DB_FILE = path.join(process.cwd(), 'data', 'entitlements.json');

function ensureDataDirExists() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

function readLocal(): OrderEntitlement[] {
  try {
    ensureDataDirExists();
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[EntitlementsDB] Error reading local DB:', err);
    return [];
  }
}

function writeLocal(data: OrderEntitlement[]) {
  try {
    ensureDataDirExists();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('[EntitlementsDB] Error writing local DB:', err);
  }
}

async function readStore(): Promise<OrderEntitlement[]> {
  if (redis) {
    try {
      const raw = await redis.get<string>('entitlements:all');
      if (!raw) return [];
      try {
        return JSON.parse(raw);
      } catch {
        return [];
      }
    } catch (err) {
      console.error('[EntitlementsDB] Error reading KV:', err);
      return [];
    }
  }
  return readLocal();
}

async function writeStore(data: OrderEntitlement[]) {
  if (redis) {
    try {
      await redis.set('entitlements:all', JSON.stringify(data));
    } catch (err) {
      console.error('[EntitlementsDB] Error writing KV:', err);
    }
    return;
  }
  writeLocal(data);
}

export async function getAllEntitlements(): Promise<OrderEntitlement[]> {
  return readStore();
}

export async function grantOrderEntitlement(
  entitlement: Omit<OrderEntitlement, 'id' | 'createdAt' | 'updatedAt'>
) {
  const list = await readStore();
  const existingIdx = list.findIndex(
    (e) => e.orderId === entitlement.orderId
  );

  const now = new Date().toISOString();
  if (existingIdx >= 0) {
    list[existingIdx] = {
      ...list[existingIdx],
      ...entitlement,
      status: 'paid',
      updatedAt: now,
    };
  } else {
    const newRecord: OrderEntitlement = {
      id: `ent_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...entitlement,
      createdAt: now,
      updatedAt: now,
    };
    list.push(newRecord);
  }

  await writeStore(list);
  console.log(
    `[EntitlementsDB] Granted access to ${entitlement.customerEmail} for order ${entitlement.orderId}`
  );
  return true;
}

export async function checkAccessByEmail(email: string): Promise<{ hasAccess: boolean; orders: OrderEntitlement[] }> {
  if (!email) return { hasAccess: false, orders: [] };
  const list = await readStore();
  const userOrders = list.filter(
    (e) =>
      e.customerEmail.toLowerCase() === email.toLowerCase().trim() &&
      e.status === 'paid'
  );

  return {
    hasAccess: userOrders.length > 0,
    orders: userOrders,
  };
}

export async function revokeOrderEntitlement(orderId: string) {
  const list = await readStore();
  const idx = list.findIndex((e) => e.orderId === orderId);
  if (idx >= 0) {
    list[idx].status = 'revoked';
    list[idx].updatedAt = new Date().toISOString();
    await writeStore(list);
    return true;
  }
  return false;
}
