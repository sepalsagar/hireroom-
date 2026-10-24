import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AiUsePage() {
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
            Algorithmic Transparency
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] mt-2">
            AI Use &amp; Fairness-by-Design Charter
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Ethical constraints and objective boundaries governing HireRoom AI co-pilots.
          </p>
        </div>

        <hr className="border-[var(--surface-border)]" />

        <div className="space-y-6 text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
          <section className="rounded-xl border border-[var(--primary)] bg-[var(--primary-light)]/20 p-4 space-y-2">
            <h3 className="font-bold text-[var(--primary)] text-sm flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Hard Ethical Safeguards
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-[var(--foreground)]">
              <li><strong>Zero Emotion or Sentiment Profiling:</strong> We strictly forbid sentiment classification, tone detection, and facial affect analysis. Humans cannot be accurately judged on emotion during high-stress technical interviews.</li>
              <li><strong>Strictly Objective Metrics:</strong> The co-pilot only tracks quantitative physical signals: talk-time ratio (interviewer vs. candidate), pause duration, code execution counts, and test case passing rates.</li>
              <li><strong>Zero Autonomous Rejection:</strong> AI suggestions are purely advisory. Every hiring advancement, rejection, or offer is executed and signed exclusively by human decision-makers.</li>
              <li><strong>Synthetic Data Only on Free Tier:</strong> Because free-tier LLM endpoints may log requests for quality improvement, HireRoom enforces anonymization and synthetic candidate test data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              Rate-Limiting &amp; Responsible Compute
            </h2>
            <p className="text-[var(--muted-foreground)]">
              To prevent runaway API consumption and ensure thoughtful human evaluation, co-pilot queries are limited to at most one request every 60–90 seconds per session, backed by store caching.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              Inquiries &amp; Independent Auditing
            </h2>
            <p className="text-[var(--muted-foreground)]">
              Academic researchers and candidates can request an audit of our objective prompt templates by writing to Sepal Sagar at{' '}
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
