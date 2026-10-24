import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Shield, Cpu, Key } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-6 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to platform
      </Link>

      <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <span className="rounded-full bg-[var(--accent-light)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
            Systems Architecture
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] mt-2">
            Security &amp; Sandbox Isolation
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Technical measures protecting candidate code, user sessions, and database tenancy.
          </p>
        </div>

        <hr className="border-[var(--surface-border)]" />

        <div className="space-y-6 text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-4 space-y-2">
              <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                <Cpu className="h-4 w-4" />
                <span>Isolated Client Compute</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Code submitted in the live editor executes inside isolated browser WebWorkers and Pyodide WebAssembly. Candidate code never has access to the recruiter&apos;s cookies, local storage, or session tokens.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-4 space-y-2">
              <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                <Lock className="h-4 w-4" />
                <span>Row Level Security (RLS)</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                PostgreSQL database access enforces strict RLS policies: candidates can only query their own verified submissions, and organization scorecards are isolated by tenant membership.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-4 space-y-2">
              <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                <Key className="h-4 w-4" />
                <span>Zero Server Secrets in Browser</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Backend API keys (Gemini, Dodo Payments, Supabase service roles) are strictly server-only secrets. They are never sent down in client bundles or exposed to browser memory.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-4 space-y-2">
              <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                <Shield className="h-4 w-4" />
                <span>HMAC Webhook Verification</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                External billing webhooks verify cryptographic HMAC-SHA256 signatures and enforce idempotency caches to prevent replay attacks and subscription spoofing.
              </p>
            </div>
          </div>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              Vulnerability Disclosure
            </h2>
            <p className="text-[var(--muted-foreground)]">
              If you identify a security issue in HireRoom, please report it privately to Sepal Sagar at{' '}
              <a href="mailto:sepalsagar1234@gmail.com" className="text-[var(--primary)] underline font-medium">
                sepalsagar1234@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
