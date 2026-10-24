import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-6 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to platform
      </Link>

      <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="rounded-full bg-[var(--accent-light)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
            Privacy Standard
          </span>
          <span className="text-xs text-[var(--muted-foreground)]">Updated: October 2026</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Transparent data handling practices for HireRoom, an academic project by Sepal Sagar.
        </p>

        <hr className="my-6 border-[var(--surface-border)]" />

        <div className="space-y-6 text-sm text-[var(--foreground)] leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              1. Information Collection Principles
            </h2>
            <p className="text-[var(--muted-foreground)]">
              HireRoom collects only the data strictly required to deliver live technical interview capabilities and candidate evaluation records. In demo and prototype mode, mock data is utilized to safeguard real user confidentiality.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              2. Synthetic Data & AI Processing Transparency
            </h2>
            <p className="text-[var(--muted-foreground)]">
              Because HireRoom operates on official free-tier developer APIs (including Google Gemini API where non-paid tier logs may be processed for service improvement by upstream providers), <strong>HireRoom enforces the use of synthetic candidate test accounts and anonymized code submissions</strong>. We urge evaluators never to input real proprietary credentials, source secrets, or sensitive PII into candidate profiles.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              3. Objective Audio & Code Telemetry (No Emotion or Sentiment Inference)
            </h2>
            <p className="text-[var(--muted-foreground)]">
              We uphold strict ethical guidelines against emotion, sentiment, or tone profiling. The platform measures only <strong>objective physical dynamics</strong>: talk-time distribution (e.g., Interviewer 40% / Candidate 60%), pause intervals, code run timestamps, and test assertions. We do not make psychological inferences about candidates.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              4. User Rights Honored as Good Practice
            </h2>
            <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-4 text-xs space-y-2 text-[var(--foreground)]">
              <div className="flex items-center gap-2 font-semibold">
                <Lock className="h-4 w-4 text-[var(--primary)]" />
                <span>Voluntary Privacy Protections (GDPR-Style Principles)</span>
              </div>
              <p className="text-[var(--muted-foreground)]">
                While operated as an individual academic student project in India, HireRoom honors the following rights in good faith:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[var(--muted-foreground)] pl-2">
                <li><strong>Right of Access & Export:</strong> You can export interview reports and candidate profiles in PDF / JSON formats.</li>
                <li><strong>Right to Erasure:</strong> Any test account or candidate session can be cleared upon request.</li>
                <li><strong>Zero Data Selling:</strong> We never sell, monetize, or broker telemetry data to advertisers or third parties.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              5. Contact & Privacy Requests
            </h2>
            <p className="text-[var(--muted-foreground)]">
              To request profile removal or inquire about academic data architecture, please write directly to Sepal Sagar at{' '}
              <a
                href="mailto:sepalsagar1234@gmail.com"
                className="text-[var(--primary)] underline font-medium"
              >
                sepalsagar1234@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
