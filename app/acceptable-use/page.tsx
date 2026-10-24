import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function AcceptableUsePage() {
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
            Security &amp; Conduct
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] mt-2">
            Acceptable Use Policy (AUP)
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Standards of conduct for interviewers, candidates, and evaluators on HireRoom.
          </p>
        </div>

        <hr className="border-[var(--surface-border)]" />

        <div className="space-y-6 text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              1. Prohibited Sandbox Activities
            </h2>
            <p className="text-[var(--muted-foreground)] mb-2">
              Users interacting with live Monaco code editor and execution runners must not:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[var(--muted-foreground)] pl-2">
              <li>Attempt to break out of the browser Web Worker or WebAssembly sandbox to access unauthorized storage or host environments.</li>
              <li>Execute cryptocurrency miners, denial-of-service loops, or malicious buffer overflow exploits.</li>
              <li>Transmit malware, viruses, or obfuscated binaries into candidate shared workspaces.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              2. Interview Conduct &amp; Harassment
            </h2>
            <p className="text-[var(--muted-foreground)]">
              HireRoom maintains a zero-tolerance policy for discriminatory, harassing, derogatory, or abusive language during live video or collaborative coding rounds. Evaluators must treat all applicants with professional dignity and adhere to objective technical rubric dimensions.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              3. Enforcement &amp; Account Suspension
            </h2>
            <p className="text-[var(--muted-foreground)]">
              Violations of this policy will result in immediate termination of the live session and revocation of workspace credentials. Reports can be filed at{' '}
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
