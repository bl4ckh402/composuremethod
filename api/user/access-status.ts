import { checkAccessByEmail } from '../../src/lib/entitlementsStore.js';

export default async (req: any, res: any) => {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const email = url.searchParams.get('email');
  if (!email) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Email query parameter required' }));
    return;
  }

  const result = await checkAccessByEmail(email);
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      email,
      hasAccess: result.hasAccess,
      orders: result.orders,
    })
  );
};
