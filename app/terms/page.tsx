import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
            Academic Demonstration
          </span>
          <span className="text-xs text-[var(--muted-foreground)]">Effective: October 2026</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Governing the use of HireRoom, an academic technical interview prototype engineered by Sepal Sagar.
        </p>

        <hr className="my-6 border-[var(--surface-border)]" />

        <div className="space-y-6 text-sm text-[var(--foreground)] leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              1. Academic Nature & Scope
            </h2>
            <p className="text-[var(--muted-foreground)]">
              HireRoom is developed as a final-year Bachelor of Technology in Computer Science academic project by Sepal Sagar. The software is provided solely for educational, demonstration, technical review, and portfolio evaluation purposes. It is not an officially registered legal corporation and does not provide commercial service level agreements (SLAs).
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              2. Acceptable Use & Conduct
            </h2>
            <p className="text-[var(--muted-foreground)]">
              Users may interact with the live interview rooms, practice lounge, and code execution sandboxes provided that no malicious scripts, denial-of-service attempts, automated scraping, or attempts to exploit WebWorker/WebAssembly environments are performed.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              3. AI Co-pilot Advisory & Non-Autonomous Decisions
            </h2>
            <p className="text-[var(--muted-foreground)]">
              All AI-generated evaluations, rubrics, and suggestions provided by the platform are <strong>advisory only</strong>. HireRoom strictly enforces a human-in-the-loop paradigm: no automated hiring, promotion, or rejection decisions are made by the platform. Interviewers and hiring teams retain 100% discretion and legal responsibility for their hiring processes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              4. Disclaimer of Warranty & Limitation of Liability
            </h2>
            <div className="rounded-lg border border-[var(--warning)] bg-[var(--warning-light)] p-3.5 text-xs text-[var(--warning)] flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                THE PLATFORM IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. UNDER NO CIRCUMSTANCES SHALL THE AUTHOR (SEPAL SAGAR) BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING FROM SYSTEM USE.
              </span>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              5. Governing Law & Contact
            </h2>
            <p className="text-[var(--muted-foreground)]">
              These terms are governed by the laws of India. For questions or academic inquiries, please contact Sepal Sagar at{' '}
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
