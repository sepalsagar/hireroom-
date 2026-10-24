import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function AccessibilityPage() {
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
            Universal Usability
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] mt-2">
            Accessibility Statement (WCAG 2.1 AA)
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Our commitment to accessible, inclusive hiring interfaces for all engineers.
          </p>
        </div>

        <hr className="border-[var(--surface-border)]" />

        <div className="space-y-6 text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              Accessibility Commitments
            </h2>
            <p className="text-[var(--muted-foreground)] mb-3">
              HireRoom strives to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. Key implementations include:
            </p>
            <ul className="space-y-2 text-[var(--muted-foreground)]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--success)] shrink-0 mt-0.5" />
                <span><strong>High-Contrast Theme Tokens:</strong> Warm Marketplace Light and Warm Human Dark palettes exceed 4.5:1 contrast ratios for body copy and 3:1 for graphical elements.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--success)] shrink-0 mt-0.5" />
                <span><strong>Full Keyboard Navigability:</strong> All interactive buttons, modals, dropdowns, and Monaco editor panels are navigable using standard Tab, Shift+Tab, and Enter keyboard controls with distinct `:focus-visible` outline rings.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--success)] shrink-0 mt-0.5" />
                <span><strong>Screen Reader Semantics:</strong> ARIA roles, live regions for terminal console outputs, and explicit form labeling across applicant workflows.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              Feedback &amp; Accessibility Assistance
            </h2>
            <p className="text-[var(--muted-foreground)]">
              If you experience any accessibility barrier while navigating HireRoom, please contact Sepal Sagar at{' '}
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
