# ADR 0001: Architecture, Zero-Cost Free Tiers, and Provider Abstractions

**Status:** Accepted  
**Date:** October 2026  
**Deciders:** Sepal Sagar (Author), AI Studio Lead Engineer

---

## Context
HireRoom is designed as an academic capstone project with production SaaS deployability. To ensure sustainable, card-free operation throughout development, evaluation, and portfolio demonstration, the system must not incur unexpected cloud expenses or sudden provider lockouts.

## Decisions

### 1. Zero-Cost Free Tier Stack
- **Database:** Supabase PostgreSQL with `pgvector` for relational data and semantic embedding queries (500 MB free).
- **Authentication:** Clerk for secure, production-grade Google and GitHub authentication (10,000 MAUs free).
- **Client Execution:** Client-side Web Worker (JavaScript) and Pyodide (Python WebAssembly) to execute user code locally on the client's device, eliminating server compute costs.
- **Realtime Signaling:** Supabase Realtime for signaling and state sync, coupled with WebRTC P2P mesh for direct video/audio streaming.
- **AI Co-pilot:** Google Gemini 3.8 Flash accessed strictly via server-side `@google/genai` with rate-limiting and 15-minute caching to remain comfortably under free limits (~250 requests/day).
- **Billing:** Dodo Payments and Polar test-mode sandboxes for complete billing flows without financial liability.

### 2. Provider Abstraction Layer
Every external service (Auth, Database, Realtime, Code Runner, Billing, AI) is accessed through a TypeScript interface with at least one local or mock fallback. This ensures the application can run in offline demo environments and enables swapping providers without rewriting business logic.

### 3. Fairness-by-Design & Anti-Deceptive UI
In accordance with ethical AI principles and project rules:
- No tone, emotion, or psychological inferences are made regarding candidates.
- Only objective signals (talk-time percentage, code execution count, test pass rates) are surfaced to interviewers.
- AI never executes automated candidate rejection; all decisions require human sign-off.
- All non-operational integrations are clearly labeled "Coming soon", and sample records are marked "Demo data".

## Consequences
- **Positive:** Zero cloud cost, high resilience to provider deprecations, clean modular code structure, compliance with academic standards.
- **Trade-offs:** Initial Python run requires browser caching of Pyodide WebAssembly bundle (~10 MB one-time download); Supabase free projects require automated weekly keep-alive requests.
