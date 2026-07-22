import { getPolarClient } from '../src/lib/polar.js';

export default async (req: any, res: any) => {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const url = new URL(req.url || '/', `http://${req.headers.host}`);
    const productsParam = url.searchParams.get('products');
    const customerEmail = url.searchParams.get('email') || undefined;
    const host = req.headers.host || 'localhost:3000';
    const rawProto = (req.headers['x-forwarded-proto'] as string) || 'http';
    const protocol = rawProto.split(',')[0].trim() || 'http';
    const baseUrl = process.env.APP_URL ? process.env.APP_URL.replace(/\/$/, '') : `${protocol}://${host}`;
    const successUrl = `${baseUrl}/?checkout=success${customerEmail ? `&email=${encodeURIComponent(customerEmail)}` : ''}`;

    const polar = getPolarClient();
    let productsList: string[] = [];

    if (!productsParam) {
      const existing = await polar.products.list({ limit: 10 });
      let activeProduct = (existing.result?.items || []).find((p: any) => !p.isArchived);

      if (!activeProduct) {
        activeProduct = await polar.products.create({
          name: 'The Composure Method: Pre-Ejaculation Control & Stamina System',
          description: 'Complete 5-Module Digital System + 4 Free Bonus Playbooks & Logs',
          prices: [
            {
              amountType: 'fixed',
              priceAmount: 2000,
              priceCurrency: 'usd',
            },
          ],
        });
      }
      productsList = [activeProduct.id];
    } else {
      productsList = productsParam.split(',');
    }

    const checkoutSession = await polar.checkouts.create({
      products: productsList,
      customerEmail: customerEmail,
      successUrl: successUrl,
    });

    res.writeHead(302, { Location: checkoutSession.url }).end('');
  } catch (error: any) {
    console.error('[Polar Checkout] Error creating checkout session:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: error.message || 'Failed to create Polar checkout session',
      })
    );
  }
};
