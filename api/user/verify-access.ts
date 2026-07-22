import { checkAccessByEmail } from '../src/lib/entitlementsStore';

export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body: any = {};
  try {
    const chunks: Uint8Array[] = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    body = JSON.parse(Buffer.concat(chunks).toString());
  } catch {
    // body stays empty
  }

  const { email } = body;
  if (!email) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Email is required to verify access' }));
    return;
  }

  const result = await checkAccessByEmail(email);
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      email,
      hasAccess: result.hasAccess,
      activeOrders: result.orders,
    })
  );
};
