import { getPolarClient } from '../../src/lib/polar';

export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const polar = getPolarClient();
    const existing = await polar.products.list({ limit: 10 });
    const activeProducts = (existing.result?.items || []).filter((p: any) => !p.isArchived);

    if (activeProducts.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          message: 'Active products already exist.',
          products: activeProducts,
        })
      );
      return;
    }

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

    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        message: 'Created Polar product successfully.',
        product: newProduct,
      })
    );
  } catch (error: any) {
    console.error('[Polar Provision] Error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error.message || 'Failed to provision product' }));
  }
};
