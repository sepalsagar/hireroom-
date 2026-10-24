# HireRoom Build Pack

*PRD + master prompt for Google AI Studio. Final-year project that can grow into a real, listable business.*

## 0. Read this first

**How to use it.** Section 1 is the prompt to paste into AI Studio. Sections 2 to 12 are the PRD it points to; upload this whole document with it. Also upload everything from the Stitch export: every `code.html`, every `screen.png`, and both `DESIGN.md` files. Run the build one phase at a time (section 11), not all at once.

**Honest limits (so nothing surprises you):**

- Nobody can guarantee that nothing breaks. This pack makes the AI write the tests, run what it can, and report failures. You run `npm run test:all` on your machine and paste failures back. Expect AI Studio to get you about 80%; the last 20% is debugging.
- AI Studio is a browser build tool. A real-time server, Postgres and payment webhooks are easier to finish locally. Suggested path: phases 0 to 2 in AI Studio, export to GitHub, then continue in VS Code with Gemini CLI or any coding agent.
- Free tiers change often. The AI must check current limits before picking services and record them in `docs/LIMITS.md`.
- Legal pages are templates, not legal advice. Have them reviewed before real users sign up.
- REA (github.com/morluto/rea) is a local MCP tool for coding agents. It cannot run inside AI Studio. See section 10 for how to use competitor research safely.

## 1. MASTER PROMPT (paste this)

```text
You are a senior full-stack engineer, product designer and QA lead. Build HireRoom: an AI-assisted hiring and live technical interview platform (comparable in core function to Intervue.io, with extra features). I am Sepal, a final-year B.Tech CS student. I know Next.js, React, Node, Express and PostgreSQL. The product must work as a final-year project AND be deployable as a real paid SaaS later.

SOURCE OF TRUTH FOR LOOK AND FEATURES
- The uploaded Stitch export (code.html + screen.png per screen, two DESIGN.md files: Warm Human light and dark). Rebuild every screen as real React components. Extract design tokens (colors, Inter typography, radius, spacing) from the DESIGN.md files into Tailwind config and CSS variables. Support light and dark themes with a toggle, and respect prefers-color-scheme.
- The PRD in this document (sections 2 to 12). If the PRD and screenshots conflict, tell me and propose a fix. Do not silently choose.

HARD RULES
1. FREE ONLY. Every service must have a free plan I can use today without a card where possible. No paid API keys. Before choosing a service, check its current free limits and write them in docs/LIMITS.md. For every service add a provider abstraction and name a free fallback.
2. STACK: Next.js (App Router) + TypeScript + Tailwind + shadcn/ui, Node for any real-time service, PostgreSQL with pgvector. Use another language only if clearly necessary, and tell me why.
3. NEVER FAKE. The Stitch screens contain invented stats (42,000+ sessions, 4.92/5), customer logos (Stripe, Figma, etc.), testimonials, and fake integrations marked Active. Remove them or replace with real data. Seed or demo data must be labelled 'Demo data' in the UI. Integrations that do not exist show 'Coming soon', never 'Active'.
4. NO EMOTION OR TONE INFERENCE about candidates (the mockups show 'warm tone detected'). Only objective signals are allowed, such as talk-time share. AI suggests; humans decide. Never auto-reject.
5. SECRETS: never in client code or in chat. Provide .env.example and tell me exactly which keys I must create and where.
6. ASK ME. When you need something only I can supply (accounts, keys, legal name, prices, domain, a choice between options), STOP and output a block titled BLOCKERS with numbered questions and a recommended default for each. Do not invent values.
7. PHASES. Work in the phases of section 11. At the end of each phase output: file tree, full code for new or changed files, run instructions, tests added, test results you could actually verify (say plainly what you could not run), known issues, and what I must do next. Do not start the next phase until I say 'next'.
8. DEFINITION OF DONE per phase: typecheck passes, lint passes, unit and e2e tests written, performance budgets from section 9 respected, accessibility checks (axe) clean, docs updated.
9. UX SPEED IS PRIORITY ONE: server components by default, streaming and Suspense boundaries, skeletons (no layout shift), route prefetching, optimistic updates with rollback, debounced inputs, virtualized long lists, lazy-loaded heavy modules (Monaco, whiteboard), no unnecessary re-renders (measure with React Profiler), AbortController on every cancellable request.
10. ROBUSTNESS: every action must be safe when clicked twice, when the network drops, when the session expires, and when opened in two tabs. Use idempotency keys, disabled-while-pending buttons, retry with backoff, and clear error states.
11. DOCUMENT everything as you go (section 12 list). Write code the way a team would: modular folders, small components, typed API contracts with zod, ADRs for big decisions.
12. COMPETITOR RESEARCH IS CLEAN-ROOM: use only public information (marketing pages, docs, pricing pages, help centre, reviews, features I can observe as a normal user). Never copy code, text, images, branding or logos. Build a feature-parity matrix in docs/FEATURE_MATRIX.md and implement features in our own way.
13. LEGAL AND COMPLIANCE pages and flows from section 8 are required, not optional.

FIRST RESPONSE: do NOT write code yet. Reply with (a) your understanding in 10 lines, (b) any conflicts between screenshots and PRD, (c) the BLOCKERS list for Phase 0, (d) the exact free services you propose with current free limits. Then wait for my answers.
```

## 2. Product summary

**One line:** Hire in one room, not five tools: AI screening, live code + whiteboard + video interviews, evidence-based scorecards, and a candidate practice lounge, all in one place.

**Parity with Intervue-style tools:** instant-join interview links (candidate needs no install), live collaborative code editor with multi-language execution, shared whiteboard, video and chat, take-home assignments, interview scheduling, centralized feedback.

**Twists (our edge):**

1. **Interviewer co-pilot:** live suggested follow-ups and untested resume skills, visible to the host only. Candidates see an 'AI assist is on' badge.
2. **Practice Lounge:** low-pressure drills, architecture sketch board, and AI mock chat (Coach Aria) for candidates. This is also a B2C revenue line.
3. **Verified Skills Passport:** a signed, shareable record issued after a real interview or drill. Verified means issued by HireRoom from a real session. It is not an external certification and the UI must say so.
4. **Fairness by design:** blind-screening mode, talk-time balance, anti-bias rubric prompts, reviewers score independently before seeing consensus.
5. **Evidence-linked reports:** every AI claim links to a transcript timestamp or code/whiteboard snapshot.

## 3. Personas

- **Recruiter / hiring manager (Alex):** posts jobs, reviews ranked candidates, schedules, runs interviews, decides.
- **Interviewer / panelist (Marcus):** uses rubric, co-pilot, scorecard.
- **Candidate (Elena):** applies, joins by link, practises, sees feedback and offers, owns her passport.
- **Org admin:** team, roles, billing, defaults.
- **Guest evaluator:** limited, time-boxed access.

## 4. Screens and routes (from the Stitch export)

| Stitch folder | Route | Notes |
| --- | --- | --- |
| landing\_pricing\_\* | `/`, `/pricing` | Static or ISR for speed. Remove fake stats and logos. |
| talent\_hub\_recruiter\_dashboard\_\* | `/dashboard` | Today's interviews, pipeline stats, AI-matched spotlight. |
| job\_pipeline\_kanban\_\* | `/jobs/[id]/pipeline` | Drag and drop, filters, match score, verified-skills filter. |
| live\_interview\_room\_\* | `/interviews/[id]/room` | The hero feature (section 6). |
| post\_interview\_report\_\* | `/interviews/[id]/report` | Narrative summary, scores, snapshots, PDF, share link. |
| question\_rubric\_builder\_studio\_light | `/rubrics/[id]` | Dimensions, weights, 4-tier anchors, publish versions. |
| candidate\_hub\_practice\_lounge\* | `/candidate` | Upcoming room, device check, drills, canvas, Coach Aria, passport. |
| offer\_welcome\_light | `/candidate/offers/[id]` | View, accept with typed signature, download PDF. |
| team\_organization\_settings\_light | `/settings/team` (+ sub-tabs) | Members, roles, integrations, room defaults, billing. |

Extra routes: `/sign-in`, `/sign-up`, `/join/[token]` (guest join), `/verify/[passportId]` (public passport check), legal pages (section 8), custom 404, 500, offline page.

## 5. Feature list by priority

**P0 (must ship):** auth + roles, orgs and invites, jobs, candidates and applications, kanban with drag and drop, resume upload and parsing, AI match score with explanation, scheduling with calendar file (.ics) and email, live room (video, chat, code, run code, whiteboard, timer, lobby), scorecard, report with PDF, legal pages and cookie consent, billing with test-mode checkout.

**P1:** co-pilot, live transcript, talk-time balance, rubric studio, Practice Lounge and Coach Aria, skills passport, offer portal, analytics tiles (time-to-offer, acceptance rate, from real data only), take-home assignments, guest evaluators.

**P2:** CSV import and export, webhooks, Greenhouse or Lever sync, Slack notifications, recording (only if a free storage option allows it), mobile polish, i18n.

## 6. Live interview room (most important and most fragile)

- **Lobby:** device check (camera, mic, speaker test, bandwidth estimate), recording and transcription consent from every participant, ready state.
- **Video and audio:** WebRTC peer-to-peer for up to 3 participants. Free STUN plus a free TURN service for the roughly 10 to 15 percent of networks that need relay. Signaling over the realtime channel. Alternative: LiveKit Cloud free plan. Handle reconnect, ICE restart, camera or mic permission denied, device switch, and screen share.
- **Code editor:** Monaco (MIT) + Yjs for conflict-free sync, per-user cursor colors, language switch. Run code: JavaScript in a sandboxed Web Worker, Python via Pyodide (WASM), other languages through a Judge0 free option behind an adapter. Show stdout, stderr and time limits. Never run candidate code on our own server unsandboxed.
- **Whiteboard:** Excalidraw (MIT) with Yjs sync. Check the license of any other whiteboard library before using it commercially (tldraw's production license, for example).
- **Problem panel:** prompt, constraints, hints the host can reveal.
- **Chat:** persisted, with typing indicators.
- **Transcript:** each participant's browser transcribes their own mic locally using the Web Speech API (works in Chrome and Edge; flag unsupported browsers) and broadcasts text segments. Merge by timestamp. Needs consent and a visible indicator.
- **Talk-time balance:** computed locally from audio levels (WebAudio analyser). Objective only.
- **Co-pilot (host only):** about every 20 seconds, or after a finished sentence, send the last two minutes of transcript plus rubric plus a short resume summary (token-capped) to Gemini. Return JSON: follow-up questions, untested skills, notes. Cancel the in-flight call when a new one starts. Hard rate and token limits per interview.
- **Controls:** mute, camera, share screen, lock room, remove participant, end session and open scorecard. Autosave everything every few seconds.
- **Security:** room join uses short-lived signed tokens. Guests join via magic link without an account, but only for their own interview.
- **Failure behavior:** if the network drops, show a banner and keep local edits; on reconnect, merge and resume. If AI fails, the room still works.

## 7. Architecture (free-tier defaults, each behind an adapter)

| Need | Default | Free fallback |
| --- | --- | --- |
| Web app | Next.js App Router | none |
| Auth | Clerk free plan (Google, GitHub and other social logins, email) | Auth.js v5 with Google OAuth |
| Roles and orgs | Own Postgres RBAC tables (avoids org-seat limits of any vendor) | none |
| Database | Supabase Postgres + pgvector + Row Level Security | Neon free Postgres |
| Realtime (signaling, presence, chat, Yjs transport) | Supabase Realtime | Liveblocks free, or a small Node Socket.IO + Hocuspocus server on a free VM |
| Rate limiting and cache | Upstash Redis free | in-memory for dev |
| File storage (resumes, snapshots) | Supabase Storage | Cloudflare R2 free |
| Email | Resend free plan | SMTP via a free provider |
| AI | Gemini API free tier from AI Studio (Flash-class models) | Groq or OpenRouter free models; local Ollama for dev |
| Embeddings | Gemini embedding model, or local MiniLM via transformers.js (zero API cost) | the other one |
| Payments | See section 8b |  |
| Errors and analytics | Sentry free; PostHog or Plausible only after cookie consent | server logs |
| CI | GitHub Actions free |  |
| Hosting | Vercel Hobby while it is a student project | Cloudflare or Netlify free for commercial use |

**Watch-outs the AI must document:** Vercel Hobby is for non-commercial use, so move before charging customers. Vercel cannot hold long-lived WebSockets, which is why realtime is a separate service. Supabase free projects can pause after inactivity, so add a keep-alive job. Free AI tiers may use your prompts to improve products. Use synthetic resumes for testing and real candidate data only on a tier whose terms allow it.

**Repo layout:**

```
/apps/web            Next.js app
/apps/realtime       optional Node realtime service
/packages/ui         shared components and tokens
/packages/db         schema, migrations, seed
/packages/ai         prompts, schemas, provider adapters
/packages/billing    provider adapter, entitlements
/docs                all documentation
/tests               e2e, load, chaos
```

## 8. Auth, security, billing, legal

**Auth:** sign-up and sign-in pages styled like Stitch, with Google plus at least one more social login, email magic link or password, email verification, sign-out everywhere, session expiry handling. Guest join links carry scoped tokens, never full accounts.

**Security baseline:**

- Server-side authorization on every route and query, scoped to the organization. Supabase RLS as a second wall.
- Validate every input with zod. Rate limit auth, AI, upload and webhook routes.
- Upload limits: type, size and magic-byte checks for resumes. Signed URLs only.
- Strict CSP and security headers, XSS-safe rendering of transcripts and notes, audit log for sensitive actions.
- `npm audit` and Dependabot in CI. Secrets only in environment variables.

**8b. Billing (free to build, real to run):**

- Provider adapter with test mode until I say go live. TrustMRR currently lists several supported providers (Stripe, LemonSqueezy, Polar, DodoPayment and others; check their site when listing). For an Indian student without a registered business, prefer a merchant-of-record provider such as Dodo Payments or Polar, and confirm that it onboards my account type. Ask me before choosing. Avoid Razorpay if verified MRR on TrustMRR is a goal.
- Flow: hosted checkout, then verified webhook, then `subscriptions` table, then entitlements. Webhooks must verify signatures and be idempotent. Handle failed payments with a grace period, cancellation, upgrade and downgrade, and a customer portal link.
- Plans (placeholders, ask me for prices): Free (3 interviews a month, 1 recruiter seat, limited AI), Pro (per seat), Team, and a Candidate Practice Pass.
- Usage meters shown in settings, enforced on the server, and visible before the limit hits.
- Keep all revenue through one provider account so it can be verified later with a read-only key.

**Legal and compliance (required):**

- Pages: Privacy Policy, Terms of Service, Cookie Policy, Copyright and IP policy (with takedown contact), AI Use and Transparency, Acceptable Use, Security, Accessibility Statement, Data Requests (export and delete), Subprocessors list.
- Cookie consent banner: categories (essential, analytics, preferences), nothing non-essential before consent, reject as easy as accept, a persistent 'Cookie settings' link, consent stored with a timestamp.
- Recording and transcription consent in the lobby for both sides, with what is stored and for how long.
- 18+ age gate, data retention rules and automatic deletion jobs, candidate data export and delete.
- Alerts: consistent toast, banner and modal system for success, warning, error and destructive confirmation.
- Jurisdiction notes to write into `docs/LEGAL.md` and verify with a lawyer before selling: India DPDP Act 2023, GDPR, the EU AI Act (hiring AI is treated as high-risk and emotion recognition in the workplace is restricted, which is why rule 4 exists), NYC Local Law 144 on automated hiring tools, and Illinois rules on AI video interviews.

## 9. Performance and UX budgets (top priority)

| Metric | Budget |
| --- | --- |
| Landing LCP on mid-range phone, 4G | 2.5 s or less |
| INP (any interaction) | 200 ms or less |
| CLS | 0.1 or less |
| Route change, perceived | under 100 ms to skeleton, under 400 ms to content (prefetch + cache) |
| Initial JS per route | 200 KB gzipped or less. Monaco and whiteboard lazy loaded |
| Kanban with 500 cards | 60 fps scroll and drag (virtualize) |
| Memory growth after 200 navigations | under 10 percent |
| Room join to first video | under 3 s median |
| Code sync latency between two users | under 150 ms at p95 |
| AI first token | under 2 s median (stream everything) |

**UX rules:** optimistic UI with rollback, skeletons in the final layout shape, no spinners over 300 ms without context, keyboard shortcuts, focus management, visible focus rings, reduced-motion support, empty, loading and error states for every screen, WCAG AA contrast, mobile layouts for dashboard, report, candidate hub and offer.

## 10. Competitor research method (clean-room)

1. Build `docs/FEATURE_MATRIX.md` from public sources only: Intervue's marketing pages, docs and pricing, third-party reviews (Capterra and similar), and the TrustMRR products named below. Columns: feature, who has it, how it behaves from a user's view, our version, priority.
2. Products to compare: Intervue.io (live coding, 35+ languages, whiteboard, take-homes, centralized feedback), Natively and Yooda (real-time AI during interviews), Mockingly.AI (whiteboard + AI interviewer), CoPrep AI (coaching and resume help).
3. **About REA:** it is built to inspect apps and websites locally, and its own disclaimer limits use to lawful research, interoperability, and software you own or are authorized to examine. Using it on a public page to see page structure and network behavior is fine. Decompiling, scraping behind a login, or copying another company's code, text, assets or branding is not, and it would also put a product you sell at legal risk. If you want to use it, run it in your own coding agent on your machine (not inside AI Studio) and keep notes at the level of behavior, never code.
4. Never use competitor names, logos or wording in our marketing as if affiliated.

## 11. Phase plan (one phase per message; say 'next' to continue)

**Phase 0, Foundations:** repo and tooling, tokens from DESIGN.md, app shell with theme toggle, Clerk auth and sign-in/up pages, database schema and migrations, RBAC, legal pages and cookie consent, alert system, 404, 500 and offline pages, CI pipeline, `docs/LIMITS.md`, `.env.example`.

**Phase 1, Core hiring:** orgs, invites, jobs, candidate profiles, applications, kanban with optimistic drag and drop, dashboard, resume upload and parsing, embeddings and match score with explanation and blind mode, scheduling with .ics and email, guest join links.

**Phase 2, Live room:** lobby and consent, WebRTC video, chat, Monaco + Yjs, code execution, whiteboard, timer, controls, reconnect logic, autosave, room tests with two simulated users.

**Phase 3, AI and reports:** transcript, talk-time balance, co-pilot, scorecard, consensus view, narrative report with evidence links, PDF export, rubric studio, Practice Lounge and Coach Aria, skills passport and public verify page.

**Phase 4, Money and offers:** billing adapter and test-mode checkout, webhooks, entitlements, usage meters, offer creation and acceptance portal with audit log and PDF.

**Phase 5, Hardening:** run the full chaos suite (section 13), load tests, Lighthouse CI, axe sweep, security review against section 8, dependency audit, docs completion, deployment and the pre-deploy checklist.

## 12. Documentation to produce

`README.md` (setup in under 10 minutes), `docs/ARCHITECTURE.md`, `DATA_MODEL.md`, `API.md` (OpenAPI), `REALTIME.md` (events and reconnect rules), `AI.md` (prompts, schemas, limits, fallbacks), `BILLING.md`, `SECURITY.md`, `LEGAL.md`, `TESTING.md`, `LIMITS.md`, `FEATURE_MATRIX.md`, `RUNBOOK.md` (incidents, keep-alive jobs, key rotation), `adr/` (decision records), `CONTRIBUTING.md`, `CHANGELOG.md`, `.env.example`.

**Core tables:** users, organizations, memberships (role), jobs, candidates, applications (stage, match\_score, explanation), resumes, embeddings, interviews, interview\_participants, rubrics, rubric\_versions, rubric\_dimensions, scorecards, scores, transcript\_segments, room\_snapshots (code, whiteboard), reports, passports, offers, offer\_events, practice\_sessions, subscriptions, entitlements, usage\_events, webhook\_events (idempotency), consents, audit\_log, invites, notifications.

## 13. Test plan, including the irritated user

**Layers:** unit (Vitest), component (Testing Library), API contract tests, e2e (Playwright, Chromium + WebKit + mobile viewport), load (k6 free), Lighthouse CI, axe accessibility, security checks (npm audit, header checks), and a chaos suite. Commands: `npm run test`, `test:e2e`, `test:chaos`, `test:perf`, `test:all`. CI runs them on every push.

**Chaos and irritated-user scenarios (each must have an automated test and a written expected behavior):**

| Scenario | Expected |
| --- | --- |
| Double-click or triple-click every submit and primary button | one action only, button disabled while pending |
| Mash back and forward across all routes for 2 minutes | no crash, no stale or duplicate data, no console errors |
| Refresh in the middle of an interview, then rejoin | same room state restored, video reconnects |
| Same user in two tabs, edit in both | consistent state, clear conflict handling |
| Log out in one tab while another is mid-save | second tab shows re-auth prompt, edits kept locally |
| Login and logout 50 times in a loop | no leaks, no redirect loops, no stuck sessions |
| Paste 100k characters into any AI input, fire 20 AI requests at once, cancel mid-stream | token cap message, queue or rate-limit message, clean cancel, no stuck spinner |
| Drag a kanban card then navigate away mid-drag | no ghost card, position consistent after reload |
| Go offline during a live interview, come back | banner, local edits preserved, merge on reconnect |
| Throttle to slow 3G and 6x CPU slowdown | skeletons appear fast, no layout shift, interactions stay responsive |
| Switch theme 30 times quickly, resize window constantly | no flash or broken layout |
| Upload a wrong file type, an empty file, a 50 MB file, a malicious filename | clear rejection, nothing stored |
| Session expires while saving a scorecard | save retried after re-auth, nothing lost |
| Duplicate or out-of-order payment webhook | processed once, entitlements correct |
| Open 200 route navigations, then profile memory | growth under budget |
| Rapid typing in the shared editor from two users | converges, no duplicated or lost characters |
| Keyboard-only walkthrough of every screen | everything reachable, visible focus, no traps |

**Pre-deploy checklist (AI must produce and tick it):** all tests green, Lighthouse and axe budgets met, `npm audit` clean or justified, env vars documented, database migrations tested on a fresh database and a seeded one, RLS verified with a second test user, webhook secrets set, test-mode payments passed, legal pages reviewed, cookie banner verified with the network tab, error monitoring on, backups and keep-alive configured, rollback plan written, demo data labelled, no fake stats or logos left.

## 14. Decisions I will need from you (the AI will ask these as BLOCKERS)

1. Clerk account and keys, or choose Auth.js. Which social logins besides Google?
2. Supabase (or Neon) project and keys.
3. Gemini API key from AI Studio; confirm you are fine with free-tier data terms for synthetic data only.
4. Payment provider choice and whether it accepts your account type; plan names and prices.
5. Product legal name, contact email, postal address, grievance contact, and country for legal pages.
6. Domain name and hosting choice for the demo versus for commercial launch.
7. Which code languages to support at launch (recommended: JavaScript, Python).
8. Whether to attempt recording (needs free storage) or transcript-only.
9. Brand name check: confirm that HireRoom does not clash with an existing trademark before launch.
