import { getPolarClient } from '../../src/lib/polar.js';

export default async (req: any, res: any) => {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const polar = getPolarClient();

    // Collect all products by iterating the PageIterator
    let items: any[] = [];
    try {
      const iterator = await polar.products.list({ limit: 100 });
      for await (const page of iterator) {
        // Each page is a ProductsListResponse with result.items
        const pageItems = (page as any).result?.items || (page as any).items || [];
        items.push(...pageItems);
      }
    } catch {
      // Fallback: access first-page result directly (older SDK behaviour)
      const response = await polar.products.list({ limit: 10 }) as any;
      items = response.result?.items || response.items || [];
    }

    // Filter to active (non-archived) products only
    const activeItems = items.filter((p: any) => !p.isArchived);

    if (activeItems.length === 0) {
      const newProduct = await polar.products.create({
        name: 'Composure Method',
        description: 'Composure is a practical confidence guide designed for men who want to better understand arousal control, reduce performance anxiety, and build lasting confidence in intimate relationships.',
        prices: [
          {
            amountType: 'fixed',
            priceAmount: 2000,
            priceCurrency: 'usd',
          },
        ],
      });
      items = [newProduct];
    } else {
      items = activeItems;
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
