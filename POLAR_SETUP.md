# Polar Integration Setup Guide (SavityLLC)

This document details the Polar (https://polar.sh) payment checkout and webhook integration for **SavityLLC** (Organization ID: `e6ad8ca3-888c-44f9-9520-3f1177d8165e`).

---

## 1. Files Created / Modified

- `/.env` & `/.env.example` — Added environment variable definitions for Polar SDK.
- `/src/lib/polar.ts` — Added reusable Polar SDK client helper (`getPolarClient()`).
- `/src/lib/entitlementsStore.ts` — Created persistent entitlements database layer (`/data/entitlements.json`) to store paid orders and customer access states.
- `/src/components/CheckoutModal.tsx` — Updated to use Polar checkout embed instead of redirecting to a hosted Polar page.
- `/src/components/Header.tsx` & `/src/components/FoundationGuide.tsx` — Added member access verification button, status indicators, and unlocked digital access state.
- `/src/components/TermsOfService.tsx`, `/src/components/PrivacyPolicy.tsx`, `/src/components/Footer.tsx` — Updated legal terms and copyright to reference Savity LLC.
- `/index.html` — Added Polar checkout embed script (`@polar-sh/checkout`) and hidden checkout link element.
- `/server.ts` — Removed redirect-based `/checkout` and `/api/checkout` routes. Kept webhook endpoint and product listing endpoint.
- `/src/lib/brand.ts` — Updated `checkoutSuccessRedirect` to include `{CHECKOUT_ID}` placeholder.
- `/src/App.tsx` — Updated success handler to read `checkout_id` from URL params and store it in localStorage.

---

## 2. Environment Variables Added (Names Only)

- `POLAR_ACCESS_TOKEN` — Organization access token generated from the Polar Dashboard (scopes: `products`, `checkouts`, `webhooks` read & write).
- `POLAR_WEBHOOK_SECRET` — Signing secret used by `@polar-sh/sdk/webhooks` to verify incoming webhook payloads.
- `POLAR_SERVER` — Set to `production` (or `sandbox` during testing).

---

## 3. Embedded Checkout Flow

The checkout is now embedded directly in the site using the Polar Checkout Embed SDK (`@polar-sh/checkout`). No server-side checkout session creation or redirect is needed.

### How It Works

1. The embed script is loaded in `index.html` from `https://cdn.jsdelivr.net/npm/@polar-sh/checkout@0.1/dist/embed.global.js`.
2. A hidden `<a>` element with `data-polar-checkout` attribute is placed in the page. Its `href` points to the Polar checkout link (`https://buy.polar.sh/polar_cl_...`).
3. When the user submits their email in the `CheckoutModal`, the modal dynamically updates the hidden link's `href` with the `email` query parameter and programmatically triggers a click.
4. The embed script intercepts the click and opens the checkout in an inline overlay on the page.
5. On success, Polar redirects the top-level window to the configured success URL: `/?checkout=success&checkout_id={CHECKOUT_ID}`.
6. On cancel, Polar redirects to the configured return URL: `/?checkout=cancel`.

### Required Data Attributes on the Checkout Link

| Attribute | Value |
|-----------|-------|
| `data-polar-checkout` | Enables the embed on the element |
| `data-polar-checkout-theme` | `dark` |
| `data-polar-checkout-success-url` | `https://composuremethod.help/?checkout=success&checkout_id={CHECKOUT_ID}` |
| `data-polar-checkout-return-url` | `https://composuremethod.help/?checkout=cancel` |

### Success URL

Must include `{CHECKOUT_ID}` to receive the Checkout ID on success. The frontend reads this from the URL query parameter and stores it in localStorage for reference.

### Return URL

When set, a back button will be shown in the checkout to return to this URL. The frontend handles `?checkout=cancel` by rendering the `CancelPage`.

---

## 4. Endpoints & Routes Configured

### Webhook Route
- **Path**: `POST /api/webhook/polar`
- **Behavior**: Verifies the raw request signature against `POLAR_WEBHOOK_SECRET` using `validateEvent` from `@polar-sh/sdk/webhooks`.
- **Handled Events**:
  - `order.paid` / `order.created`: Calls `grantOrderEntitlement()` to record customer email, order ID, product ID, and grant digital access in `/data/entitlements.json`.
  - `order.refunded`: Calls `revokeOrderEntitlement()` to revoke access.
  - `customer.state_changed`: Logs customer membership updates.

### Product Listing Endpoint
- **Path**: `GET /api/polar/products`
- **Behavior**: Lists active Polar products for display in the checkout modal.

### User Access & Entitlements API
- **Path**: `POST /api/user/verify-access` — Verifies if a given email address has paid orders in the entitlements store.
- **Path**: `GET /api/user/access-status?email=...` — Returns entitlement details for a given email.
- **Path**: `POST /api/admin/grant-manual-access` — Grants manual test/admin access for an email address.
- **Path**: `GET /api/admin/entitlements` — Lists all registered order entitlements.

---

## 5. Customer Portal Note

Polar hosts the customer portal directly and automatically emails customers a secure link to manage subscriptions, view invoices, and update payment methods. No local customer portal app code is required.

---

## 6. Verify-Before-Merging Checklist

- [ ] Ensure `POLAR_ACCESS_TOKEN` is pasted into `.env` (generated in Production environment at https://polar.sh/dashboard/savityllc/settings).
- [ ] Ensure `POLAR_WEBHOOK_SECRET` is generated and saved in `.env` if webhooks are registered.
- [ ] Verify the embed script is loaded on the production domain.
- [ ] Test the embedded checkout flow by clicking a Purchase button and completing a test order.
- [ ] Test order fulfillment by sending a webhook or verifying email via the "Check Access" modal.
- [ ] Register your production webhook endpoint (`https://<your-domain>/api/webhook/polar`) in the Polar dashboard.
- [ ] Verify the success URL includes `{CHECKOUT_ID}` and that the `checkout_id` is stored in localStorage on success.
