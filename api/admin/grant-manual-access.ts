import { grantOrderEntitlement } from '../_libs/entitlementsStore';

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

  const { email, note } = body;
  if (!email) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Email is required' }));
    return;
  }

  const orderId = `manual_${Date.now()}`;
  try {
    await grantOrderEntitlement({
      orderId,
      customerEmail: email,
      productId: 'manual_grant',
      amount: 0,
      currency: 'usd',
      status: 'paid',
      metadata: {
        source: 'admin_manual_grant',
        note: note || 'Manual administrator access grant',
      },
    });
  } catch (err) {
    console.error('[Admin] Error granting manual access:', err);
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      message: `Manual lifetime access granted to ${email}`,
      orderId,
    })
  );
};
