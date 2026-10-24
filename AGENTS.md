Rules for this repo:
- Never fake data, output or integrations. Missing config returns an explicit error state.
- Auth fails closed. Roles come from Postgres via Clerk auth(), never from headers, cookies, or in-memory maps.
- Never read, print or commit .env files or keys. Secrets are never put in next.config.
- A fix is done only when a test fails without it and passes with it. Report real command output.
- Run npm run lint, npm test and npm run build before saying a task is done.
- Free-tier services only. Check limits on the official page and cite the URL in docs/LIMITS.md.
- No compliance, certification or customer claims we cannot prove.