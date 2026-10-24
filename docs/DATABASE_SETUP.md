# HireRoom Database Setup Guide (Supabase PostgreSQL)

**Project:** HireRoom (Academic Project by Sepal Sagar)  
**Database:** PostgreSQL 16 + pgvector on Supabase Free Tier

---

## 1. Retrieve Your Supabase Connection String
1. Log in to [https://supabase.com](https://supabase.com) and select your project.
2. Navigate to **Project Settings** (gear icon) &gt; **Database**.
3. Under **Connection String**, select the **URI** (or **Node.js**) format:
   ```
   postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
4. Place this string into your `.env.local` file:
   ```bash
   DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres"
   ```

---

## 2. Apply Schema & Migrations

### Method A: Automated Push via Drizzle (Recommended)
Run the automated schema synchronization:
```bash
npx drizzle-kit push
```
This reads `lib/db/schema.ts` and pushes all 26 tables, foreign keys, and indexes directly to your Supabase PostgreSQL instance.

### Method B: Manual SQL Execution via Supabase SQL Editor
1. In the Supabase dashboard, open the **SQL Editor** tab from the left sidebar.
2. Click **New query**.
3. Copy and paste the entire contents of `drizzle/migrations/0000_initial_schema.sql`.
4. Click **Run** (Ctrl + Enter).
5. All 26 tables and the `vector` extension will be created instantly.

---

## 3. Apply Row Level Security (RLS) Policies
1. In the Supabase **SQL Editor**, open a new query.
2. Copy and paste the contents of `drizzle/rls.sql`.
3. Click **Run**.
4. This enables RLS and applies tenancy isolation, restricting scorecards and pipeline data to authenticated organization members.

---

## 4. Run the Initial Seed Script
Populate your database with the initial demo organization, administrative user profile (Sepal Sagar), and technical job openings:
```bash
npx tsx scripts/seed.ts
```

---

## 5. Automated Supabase Keep-Alive
To ensure your free Supabase instance does not automatically pause after 7 days of inactivity, the repository includes `.github/workflows/supabase-keepalive.yml`. Add your Supabase project keys to your GitHub repository secrets:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
