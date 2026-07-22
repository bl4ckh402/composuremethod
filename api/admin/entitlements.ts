import { getAllEntitlements } from '../../src/lib/entitlementsStore';

export default async (_req: any, res: any) => {
  const all = await getAllEntitlements();
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      total: all.length,
      entitlements: all,
    })
  );
};
