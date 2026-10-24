# HireRoom Service Limits & Quotas Register

**Project:** HireRoom (Academic Project by Sepal Sagar)  
**Last Updated:** October 2026  
**Audit Standard:** Only providers with officially confirmed documentation URLs and verification dates are marked Verified. All unverified or community endpoints are explicitly marked `unverified, re-check`.

---

## 1. LLM & Technical Co-Pilot (Google Gemini API via `@google/genai`)
- **Official Model Reference:** https://ai.google.dev/gemini-api/docs/models/gemini
- **Official Pricing Page:** https://ai.google.dev/pricing
- **Verified Date:** October 2026
- **Model Selected:** `gemini-3.8-flash` (confirmed primary stable text model in Google GenAI SDK; legacy `gemini-1.5-flash` and `gemini-2.0-flash` are retired)
- **Official Free Tier Quota:**
  - 15 Requests Per Minute (RPM)
  - 1,000,000 Tokens Per Minute (TPM)
  - 1,500 Requests Per Day (RPD)
- **HireRoom Conservative Operating Guardrails:**
  - Capped to max **10 requests/minute per user** in store-backed rate limiter (`lib/gemini.ts`).
  - Co-pilot suggestions run on-demand or at 60–90 second intervals (~15–20 calls for a standard 45-min round).
  - Conservative daily operating ceiling: ~250 requests/day.
- **Privacy & Data Policy:** Because non-paid tier prompts may be utilized for service improvement by Google, **strictly synthetic candidate data and anonymized code submissions** are sent. Outside tests, an explicit unavailable state is returned if keys are unconfigured.

---

## 2. Relational Database & Vector Store (Supabase PostgreSQL + pgvector)
- **Official Pricing Documentation:** https://supabase.com/pricing
- **Verified Date:** October 2026
- **Verified Free Tier Allowances:**
  - 500 MB PostgreSQL database storage
  - 2 free active projects
  - 50,000 monthly active users (MAU)
  - 1 GB file storage (resumes & reports)
  - 2 GB bandwidth egress / month
- **Inactivity Pause Window:** Free projects pause after 7 consecutive days of inactivity.
  - *Mitigation:* Automated weekly keep-alive GitHub Action (`.github/workflows/supabase-keepalive.yml`).
- **Alternative Fallback:** Neon Serverless PostgreSQL (`unverified, re-check`).

---

## 3. User Authentication & Identity (Clerk)
- **Official Pricing Documentation:** https://clerk.com/pricing
- **Verified Date:** October 2026
- **Verified Free Tier Allowances:**
  - 10,000 Monthly Active Users (MAUs)
  - Google and GitHub OAuth social connections
  - Email magic links & passwordless credentials
  - Multi-session support and RBAC public metadata
- **Fallback:** Self-hosted database session store (unlimited, zero-cost).

---

## 4. Merchant of Record & Billing Sandbox (Dodo Payments)
- **Official Documentation:** https://docs.dodopayments.com/
- **Verified Date:** October 2026
- **Verified Features:**
  - Dedicated developer sandbox (`https://test.dodopayments.com`) with zero card requirement.
  - Cryptographic HMAC-SHA256 webhook signature verification (`verifyWebhookSignature`).
  - Idempotent webhook delivery.
  - Indian individual developer payout support without mandatory incorporated entity.
- **Alternate Gateway:** Polar.sh (`https://docs.polar.sh/`, unverified, re-check).

---

## 5. Persistent Cache & Rate-Limiting Store (Upstash Redis)
- **Official Pricing Documentation:** https://upstash.com/pricing/redis
- **Verified Date:** October 2026
- **Verified Free Tier Allowances:**
  - 10,000 commands / day
  - 256 MB data storage
  - REST API interface with TLS encryption
- **Development Fallback:** In-memory LRU store with automatic TTL and 200-key capacity cap.

---

## 6. Real-time Signaling & State Sync (Supabase Realtime)
- **Official Documentation:** https://supabase.com/docs/guides/realtime/limits
- **Verified Date:** October 2026
- **Verified Free Tier Allowances:**
  - 200 concurrent peak WebSocket connections
  - 2,000,000 broadcast messages / month
  - 100 broadcast messages / second
- **Local Fallback:** In-browser `BroadcastChannel` for multi-tab testing.

---

## 7. WebRTC Audio / Video Infrastructure
- **Google Public STUN:** `stun:stun.l.google.com:19302` (Unmetered public utility, verified).
- **OpenRelay Metered TURN:** https://www.metered.ca/tools/openrelay/ (Free community relay, verified October 2026).
- **LiveKit Cloud Free Tier:** https://livekit.io/pricing (`unverified, re-check`, kept behind adapter).

---

## 8. Code Execution Sandboxes
- **JavaScript / TypeScript:** Browser Web Worker with console capture and 10s timeout (Verified zero server compute).
- **Python:** Pyodide WebAssembly v0.26.4 from jsDelivr CDN (`https://pyodide.org/en/stable/`, verified October 2026).
- **Compiled Languages (C++, Java, Go):** Piston / Judge0 Public API (`unverified, re-check`, disabled by default behind `FEATURE_EXTERNAL_PISTON_ENABLED = false`).
