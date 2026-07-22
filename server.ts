import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { validateEvent, WebhookVerificationError } from "@polar-sh/sdk/webhooks";
import { getPolarClient } from "./src/lib/polar";
import {
  grantOrderEntitlement,
  checkAccessByEmail,
  getAllEntitlements,
  revokeOrderEntitlement,
} from "./src/lib/entitlementsStore";

dotenv.config();


async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Polar Webhook endpoint (Raw body parser before express.json())
  app.post(
    "/api/webhook/polar",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
      if (!webhookSecret) {
        console.warn("[Polar Webhook] POLAR_WEBHOOK_SECRET is missing from environment.");
        return res.status(500).json({ error: "POLAR_WEBHOOK_SECRET not configured" });
      }

      const rawBody = typeof req.body === "string" ? req.body : (req.body as Buffer).toString("utf8");

      let event: ReturnType<typeof validateEvent>;
      try {
        event = validateEvent(
          rawBody,
          {
            "webhook-id": (req.headers["webhook-id"] as string) || "",
            "webhook-timestamp": (req.headers["webhook-timestamp"] as string) || "",
            "webhook-signature": (req.headers["webhook-signature"] as string) || "",
          },
          webhookSecret
        );
      } catch (error) {
        if (error instanceof WebhookVerificationError) {
          console.error("[Polar Webhook] Signature verification failed.");
          return res.status(403).json({ received: false, error: "Invalid signature" });
        }
        console.error("[Polar Webhook] Verification error:", error);
        return res.status(400).json({ error: "Webhook verification error" });
      }

      // Event dispatch per Polar integration guide
      switch (event.type) {
        case "order.created":
        case "order.paid": {
          const orderData = event.data as any;
          const orderId = orderData.id || `ord_${Date.now()}`;
          const customerEmail =
            orderData.customer_email ||
            orderData.customerEmail ||
            orderData.customer?.email;

          if (!customerEmail) {
            console.warn(`[Polar Webhook] Order ${orderId} missing customer email. Skipping entitlement grant.`);
            break;
          }
          const customerId = orderData.customer_id || orderData.customer?.id;
          const productId = orderData.product_id || orderData.product?.id;
          const amount = orderData.amount || orderData.total_amount;
          const currency = orderData.currency || "usd";

          grantOrderEntitlement({
            orderId,
            customerEmail,
            customerId,
            productId,
            amount,
            currency,
            status: "paid",
            metadata: {
              source: "polar_webhook",
              eventType: event.type,
            },
          });

          console.log(
            `[Polar Webhook] Successfully granted access to ${customerEmail} for order ${orderId}`
          );
          break;
        }

        case "order.refunded": {
          const orderData = event.data as any;
          if (orderData.id) {
            revokeOrderEntitlement(orderData.id);
            console.log(`[Polar Webhook] Revoked entitlement for order ${orderData.id}`);
          }
          break;
        }

        case "customer.state_changed": {
          const customerData = event.data as any;
          console.log(
            "[Polar Webhook] customer.state_changed received for customer ID:",
            customerData.id || customerData.customer_id
          );
          break;
        }

        default:
          console.log(`[Polar Webhook] Received unhandled event type: ${event.type}`);
          break;
      }

      return res.json({ received: true });
    }
  );

  app.use(express.json());

  // 2. User Access & Entitlements API Endpoints
  app.post("/api/user/verify-access", (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required to verify access" });
    }
    const result = checkAccessByEmail(email);
    return res.json({
      email,
      hasAccess: result.hasAccess,
      activeOrders: result.orders,
    });
  });

  app.get("/api/user/access-status", (req, res) => {
    const email = req.query.email as string;
    if (!email) {
      return res.status(400).json({ error: "Email query parameter required" });
    }
    const result = checkAccessByEmail(email);
    return res.json({
      email,
      hasAccess: result.hasAccess,
      orders: result.orders,
    });
  });

  app.get("/api/admin/entitlements", (_req, res) => {
    const all = getAllEntitlements();
    return res.json({
      total: all.length,
      entitlements: all,
    });
  });

  app.post("/api/admin/grant-manual-access", (req, res) => {
    const { email, note } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const orderId = `manual_${Date.now()}`;
    grantOrderEntitlement({
      orderId,
      customerEmail: email,
      productId: "manual_grant",
      amount: 0,
      currency: "usd",
      status: "paid",
      metadata: {
        source: "admin_manual_grant",
        note: note || "Manual administrator access grant",
      },
    });
    return res.json({
      message: `Manual lifetime access granted to ${email}`,
      orderId,
    });
  });

  // 2. Polar Checkout Endpoint: GET /checkout or GET /api/checkout
  const handlePolarCheckoutRoute = async (req: express.Request, res: express.Response) => {
    let productsParam = req.query.products;
    const customerEmail = (req.query.email as string) || undefined;
    const host = req.get("host") || "localhost:3000";
    const rawProto = (req.headers["x-forwarded-proto"] as string) || req.protocol || "http";
    const protocol = rawProto.split(",")[0].trim();
    const baseUrl = process.env.APP_URL ? process.env.APP_URL.replace(/\/$/, "") : `${protocol}://${host}`;
    const successUrl = `${baseUrl}/?checkout=success${customerEmail ? `&email=${encodeURIComponent(customerEmail)}` : ''}`;

    try {
      const polar = getPolarClient();
      let productsList: string[] = [];

      if (!productsParam) {
        // Fetch or auto-provision active Polar product
        const existing = await polar.products.list({ limit: 10 });
        let activeProduct = (existing.result?.items || []).find((p: any) => !p.isArchived);

        if (!activeProduct) {
          activeProduct = await polar.products.create({
            name: "The Composure Method: Pre-Ejaculation Control & Stamina System",
            description: "Complete 5-Module Digital System + 4 Free Bonus Playbooks & Logs",
            prices: [
              {
                amountType: "fixed",
                priceAmount: 2000, // $20.00 USD
                priceCurrency: "usd",
              },
            ],
          });
        }
        productsList = [activeProduct.id];
      } else {
        productsList = Array.isArray(productsParam)
          ? productsParam.map((p) => String(p))
          : String(productsParam).split(",");
      }

      const checkoutSession = await polar.checkouts.create({
        products: productsList,
        customerEmail: customerEmail,
        successUrl: successUrl,
      });

      return res.redirect(302, checkoutSession.url);
    } catch (error: any) {
      console.error("[Polar Checkout] Error creating checkout session:", error);
      return res.status(500).json({
        error: error.message || "Failed to create Polar checkout session",
      });
    }
  };

  app.get("/checkout", handlePolarCheckoutRoute);
  app.get("/api/checkout", handlePolarCheckoutRoute);

  // 3. Helper Endpoint to list or auto-provision Polar products
  app.get("/api/polar/products", async (_req, res) => {
    try {
      const polar = getPolarClient();
      const response = await polar.products.list({ limit: 10 });
      let items = response.result?.items || [];
      
      // Auto-provision standard product if none exist
      if (items.length === 0) {
        const newProduct = await polar.products.create({
          name: "The Composure Method: Pre-Ejaculation Control & Stamina System",
          description: "Complete 5-Module Digital System + 4 Free Bonus Playbooks & Logs",
          prices: [
            {
              amountType: "fixed",
              priceAmount: 2000, // $20.00 USD
              priceCurrency: "usd",
            },
          ],
        });
        items = [newProduct];
      }

      return res.json({
        result: {
          items,
        },
      });
    } catch (error: any) {
      console.error("[Polar API] Error listing products:", error);
      return res.status(500).json({ error: error.message || "Failed to list Polar products" });
    }
  });

  const handleProvisionProduct = async (_req: express.Request, res: express.Response) => {
    try {
      const polar = getPolarClient();
      const existing = await polar.products.list({ limit: 10 });
      const activeProducts = (existing.result?.items || []).filter((p: any) => !p.isArchived);

      if (activeProducts.length > 0) {
        return res.json({
          message: "Active products already exist.",
          products: activeProducts,
        });
      }

      // Create standard product with $20.00 price
      const newProduct = await polar.products.create({
        name: "The Composure Method: Pre-Ejaculation Control & Stamina System",
        description: "Complete 5-Module Digital System + 4 Free Bonus Playbooks & Logs",
        prices: [
          {
            amountType: "fixed",
            priceAmount: 2000, // $20.00 USD
            priceCurrency: "usd",
          },
        ],
      });

      return res.json({
        message: "Created Polar product successfully.",
        product: newProduct,
      });
    } catch (error: any) {
      console.error("[Polar Provision] Error:", error);
      return res.status(500).json({ error: error.message || "Failed to provision product" });
    }
  };

  app.post("/api/polar/provision-product", handleProvisionProduct);
  app.post("/api/polar/provision-test-product", handleProvisionProduct);

  // Gemini AI Client (Lazy initialized or checked per request)
  function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in environment.");
    }
    return new GoogleGenAI({ apiKey });
  }

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Endpoint: Generate Custom Composure & Cortisol Reset Protocol
  app.post("/api/clarity-protocol", async (req, res) => {
    try {
      const { stressLevel, primaryStressor, currentContext, energyLevel } = req.body;

      let aiClient;
      try {
        aiClient = getGeminiClient();
      } catch (err: any) {
        // Fallback response if GEMINI_API_KEY is missing
        return res.json({
          protocolTitle: "Standard Cortisol Reduction & Tactical Reset",
          cortisolTarget: "Lower stress response by ~35% within 8 minutes",
          breathworkPattern: {
            name: "Box Breathing (4-4-4-4)",
            inhale: 4,
            hold1: 4,
            exhale: 4,
            hold2: 4,
            cycles: 6
          },
          pillars: [
            {
              step: 1,
              title: "Cognitive De-escalation",
              action: `Acknowledge "${primaryStressor || 'current high cognitive load'}" without emotional attachment. Record the single metric that actually matters today.`
            },
            {
              step: 2,
              title: "Somatic Grounding",
              action: "Drop shoulders away from ears. Place feet flat on floor. Unclench jaw and focus vision on a fixed distant horizontal plane for 90 seconds."
            },
            {
              step: 3,
              title: "Tactical Execution",
              action: "Select ONE priority task. Clear all browser tabs except the required work document. Set a 25-minute uninterrupted execution timer."
            }
          ],
          quote: "Order is not the absence of pressure, but the architecture through which pressure is rendered harmless."
        });
      }

      const prompt = `
You are the ComposureMethod AI Clarity Architect, an elite performance and mental discipline system based on Botanical Technicality principles.
A high-performance individual has submitted their current mental state:
- Stress Level: ${stressLevel || 'Moderate'} / 10
- Primary Stressor / Focus Block: ${primaryStressor || 'Overwhelming cognitive load and scattered focus'}
- Context / Environment: ${currentContext || 'Desk work'}
- Energy Level: ${energyLevel || 'Medium'}

Generate a structured, highly disciplined, tactical 3-step Composure Protocol designed to lower cortisol, restore mental clarity, and establish immediate execution momentum.

Respond strictly in valid JSON format with the following keys:
{
  "protocolTitle": "Short precise title (e.g. Tactical Cortisol Dump & Focal Reset)",
  "cortisolTarget": "Estimated physiological outcome sentence",
  "breathworkPattern": {
    "name": "e.g. 4-7-8 Cortisol Dump or Tactical Box Breathing",
    "inhale": number_of_seconds,
    "hold1": number_of_seconds,
    "exhale": number_of_seconds,
    "hold2": number_of_seconds,
    "cycles": number_of_cycles
  },
  "pillars": [
    {
      "step": 1,
      "title": "Cognitive De-escalation",
      "action": "Specific concise instructions"
    },
    {
      "step": 2,
      "title": "Somatic Grounding",
      "action": "Specific concise physical alignment instructions"
    },
    {
      "step": 3,
      "title": "Environmental Discipline",
      "action": "Specific workspace / task clearing rule"
    }
  ],
  "quote": "A single disciplined, elegant sentence on mental order and composure"
}
`;

      const response = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const text = response.text || "{}";
      const data = JSON.parse(text);
      res.json(data);
    } catch (error: any) {
      console.error("Error generating clarity protocol:", error);
      res.status(500).json({ error: error.message || "Failed to generate protocol" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ComposureMethod] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
