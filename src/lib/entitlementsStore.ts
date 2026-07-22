import fs from 'fs';
import path from 'path';

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

export function getAllEntitlements(): OrderEntitlement[] {
  try {
    ensureDataDirExists();
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[EntitlementsDB] Error reading DB:', err);
    return [];
  }
}

export function saveEntitlements(data: OrderEntitlement[]) {
  try {
    ensureDataDirExists();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('[EntitlementsDB] Error writing DB:', err);
  }
}

export function grantOrderEntitlement(entitlement: Omit<OrderEntitlement, 'id' | 'createdAt' | 'updatedAt'>) {
  const list = getAllEntitlements();
  const existingIdx = list.findIndex(e => e.orderId === entitlement.orderId || (e.customerEmail.toLowerCase() === entitlement.customerEmail.toLowerCase() && e.orderId === entitlement.orderId));

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

  saveEntitlements(list);
  console.log(`[EntitlementsDB] Granted access to ${entitlement.customerEmail} for order ${entitlement.orderId}`);
  return true;
}

export function checkAccessByEmail(email: string): { hasAccess: boolean; orders: OrderEntitlement[] } {
  if (!email) return { hasAccess: false, orders: [] };
  const list = getAllEntitlements();
  const userOrders = list.filter(
    e => e.customerEmail.toLowerCase() === email.toLowerCase().trim() && e.status === 'paid'
  );

  return {
    hasAccess: userOrders.length > 0,
    orders: userOrders,
  };
}

export function revokeOrderEntitlement(orderId: string) {
  const list = getAllEntitlements();
  const idx = list.findIndex(e => e.orderId === orderId);
  if (idx >= 0) {
    list[idx].status = 'revoked';
    list[idx].updatedAt = new Date().toISOString();
    saveEntitlements(list);
    return true;
  }
  return false;
}
