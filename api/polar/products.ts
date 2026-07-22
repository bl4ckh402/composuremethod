import { getPolarClient } from '../../../src/lib/polar';

export default async (req: any, res: any) => {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const polar = getPolarClient();
    const response = await polar.products.list({ limit: 10 });
    let items = response.result?.items || [];

    if (items.length === 0) {
      const newProduct = await polar.products.create({
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
      items = [newProduct];
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        result: {
          items,
        },
      })
    );
  } catch (error: any) {
    console.error('[Polar API] Error listing products:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error.message || 'Failed to list Polar products' }));
  }
};
