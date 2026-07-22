# Polar Integration Setup Guide (SavityLLC)

This document details the Polar (https://polar.sh) payment checkout and webhook integration for **SavityLLC** (Organization ID: `e6ad8ca3-888c-44f9-9520-3f1177d8165e`).

---

## 1. Files Created / Modified

- `/.env` & `/.env.example` — Added environment variable definitions for Polar SDK.
- `/src/lib/polar.ts` — Added reusable Polar SDK client helper (`getPolarClient()`).
- `/src/lib/entitlementsStore.ts` — Created persistent entitlements database layer (`/data/entitlements.json`) to store paid orders and customer access states.
- `/src/components/MemberAccessModal.tsx` — Created customer access check modal for email-based access restoration and testing.
- `/server.ts` — Integrated Express routes for `/checkout`, `/api/webhook/polar` (raw body verification, `order.paid` entitlement granting, and refund revocation), `/api/user/verify-access`, and `/api/admin/grant-manual-access`.
- `/src/components/CheckoutModal.tsx` — Updated checkout forms to support direct Polar hosted checkout redirection.
- `/src/components/Header.tsx` & `/src/components/FoundationGuide.tsx` — Added member access verification button, status indicators, and unlocked digital access state.
- `/src/components/TermsOfService.tsx`, `/src/components/PrivacyPolicy.tsx`, `/src/components/Footer.tsx` — Updated legal terms and copyright to reference Savity LLC.

---

## 2. Environment Variables Added (Names Only)

- `POLAR_ACCESS_TOKEN` — Organization access token generated from the Polar Dashboard (scopes: `products`, `checkouts`, `webhooks` read & write).
- `POLAR_WEBHOOK_SECRET` — Signing secret used by `@polar-sh/sdk/webhooks` to verify incoming webhook payloads.
- `POLAR_SERVER` — Set to `production` (or `sandbox` during testing).

---

## 3. Endpoints & Routes Configured

### Checkout Route
- **Path**: `GET /checkout?products=<PRODUCT_ID>`
- **Behavior**: Calls `polar.checkouts.create({ products: [PRODUCT_ID] })` using `@polar-sh/sdk` and redirects (302) directly to the returned hosted Polar checkout URL.

### Webhook Route
- **Path**: `POST /api/webhook/polar`
- **Behavior**: Verifies the raw request signature against `POLAR_WEBHOOK_SECRET` using `validateEvent` from `@polar-sh/sdk/webhooks`.
- **Handled Events**:
  - `order.paid` / `order.created`: Calls `grantOrderEntitlement()` to record customer email, order ID, product ID, and grant digital access in `/data/entitlements.json`.
  - `order.refunded`: Calls `revokeOrderEntitlement()` to revoke access.
  - `customer.state_changed`: Logs customer membership updates.

### User Access & Entitlements API
- **Path**: `POST /api/user/verify-access` — Verifies if a given email address has paid orders in the entitlements store.
- **Path**: `GET /api/user/access-status?email=...` — Returns entitlement details for a given email.
- **Path**: `POST /api/admin/grant-manual-access` — Grants manual test/admin access for an email address.
- **Path**: `GET /api/admin/entitlements` — Lists all registered order entitlements.

---

## 4. Customer Portal Note

Polar hosts the customer portal directly and automatically emails customers a secure link to manage subscriptions, view invoices, and update payment methods. No local customer portal app code is required.

---

## 5. Verify-Before-Merging Checklist

- [ ] Ensure `POLAR_ACCESS_TOKEN` is pasted into `.env` (generated in Production environment at https://polar.sh/dashboard/savityllc/settings).
- [ ] Ensure `POLAR_WEBHOOK_SECRET` is generated and saved in `.env` if webhooks are registered.
- [ ] Test checkout flow by opening `http://localhost:3000/checkout?products=<PRODUCT_ID>`.
- [ ] Test order fulfillment by sending a webhook or verifying email via the "Check Access" modal.
- [ ] Register your production webhook endpoint (`https://<your-domain>/api/webhook/polar`) in the Polar dashboard.

