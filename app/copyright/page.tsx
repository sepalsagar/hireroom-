import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Copyright } from 'lucide-react';

export default function CopyrightPage() {
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
            Intellectual Property Notice
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] mt-2">
            Copyright &amp; Open Source Attribution
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            HireRoom — An academic capstone project by Sepal Sagar (October 2026).
          </p>
        </div>

        <hr className="border-[var(--surface-border)]" />

        <div className="space-y-4 text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-1">
              1. Original Software Ownership
            </h2>
            <p className="text-[var(--muted-foreground)]">
              The architecture, application source code, rubrics schema, telemetry design, and original implementations of HireRoom are authored by and copyright © {new Date().getFullYear()} <strong>Sepal Sagar</strong>. All rights reserved for commercial distribution.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-1">
              2. Open-Source Ecosystem Attribution
            </h2>
            <p className="text-[var(--muted-foreground)] mb-2">
              HireRoom proudly builds upon the work of open-source software projects under permissive licenses:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[var(--muted-foreground)] pl-2">
              <li><strong>Next.js &amp; React:</strong> MIT License (Vercel, Inc. &amp; Meta Platforms, Inc.)</li>
              <li><strong>Pyodide:</strong> Mozilla Public License 2.0 (The Pyodide Development Team)</li>
              <li><strong>Tailwind CSS &amp; Lucide Icons:</strong> MIT License</li>
              <li><strong>Drizzle ORM &amp; Vitest:</strong> MIT / Apache 2.0 Licenses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-1">
              3. DMCA &amp; Content Inquiries
            </h2>
            <p className="text-[var(--muted-foreground)]">
              For academic review or intellectual property queries, contact Sepal Sagar directly at{' '}
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
