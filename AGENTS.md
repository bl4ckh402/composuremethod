# Mixpanel Analytics

This project uses Mixpanel for event tracking.

## Setup

- **SDK:** `mixpanel-browser`
- **Token:** stored in `.env` as `VITE_MIXPANEL_TOKEN`
- **Init:** `src/lib/mixpanel.ts` via `initMixpanel()` called in `src/App.tsx`
- **Session Replay:** enabled in `initMixpanel()` with `record_sessions_percent: 100` and `record_heatmap_data: true` for full playback and click analysis

## Session Replay

- Replays are captured via Mixpanel Session Replay.
- Heatmap data is enabled to capture clicks, rage clicks, and dead clicks.
- Text and inputs are masked by default for privacy.
- To view: Mixpanel dashboard → Session Replay.

## Tracking Calls

| Event | File | Trigger |
|---|---|---|
| `app_viewed` | `src/App.tsx` | App mount |
| `quiz_started` | `src/components/QuizLander.tsx` | User clicks Take the assessment |
| `quiz_lander_click` | `src/components/QuizLander.tsx` | Any click on the lander page for playback/analysis |
| `quiz_question_answered` | `src/quiz/Quiz.tsx` | User answers a quiz question |
| `quiz_exited` | `src/quiz/Quiz.tsx` | User exits quiz early |
| `quiz_completed` | `src/quiz/Quiz.tsx` | User reaches results |
| `checkout_opened` | `src/App.tsx` | Checkout modal opens |
| `checkout_started` | `src/components/CheckoutModal.tsx` | User submits checkout form |
| `checkout_completed` | `src/components/CheckoutModal.tsx` | Polar redirects with `checkout=success` |
| `checkout_canceled` | `src/components/CheckoutModal.tsx` | Polar redirects with `checkout=cancel` or `fail` |

## Identity

- No user accounts/auth in this app; no `identify()` or `reset()` calls are used.
- If auth is added later, call `identify(userId)` on login and `reset()` on logout.

## Adding Events

- Use helpers from `src/lib/mixpanel.ts`: `track`, `identify`, `reset`, `peopleSet`
- Do not import `mixpanel-browser` directly outside `src/lib/mixpanel.ts`
- Follow snake_case naming; avoid PII in event properties
