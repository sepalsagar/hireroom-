'use client';

import React from 'react';
import Link from 'next/link';
import { Code2, Heart, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[var(--surface-border)] bg-[var(--surface)] text-[var(--muted-foreground)] transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Identity & Origin */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)]">
                <Code2 className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-[var(--foreground)] tracking-tight">
                HireRoom
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-md">
              HireRoom is an academic project by <strong>Sepal Sagar</strong>, final-year B.Tech Computer Science student. Built with Next.js 15 App Router, TypeScript, and Tailwind CSS.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--foreground)]">
              <Mail className="h-3.5 w-3.5 text-[var(--primary)]" />
              <span>Contact:</span>
              <a
                href="mailto:sepalsagar1234@gmail.com"
                className="hover:text-[var(--primary)] underline font-medium"
              >
                sepalsagar1234@gmail.com
              </a>
            </div>
          </div>

          {/* Platform Routes */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Platform
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-[var(--foreground)] transition-colors">
                  Talent Hub
                </Link>
              </li>
              <li>
                <Link href="/pipeline" className="hover:text-[var(--foreground)] transition-colors">
                  Job Pipeline Kanban
                </Link>
              </li>
              <li>
                <Link href="/interviews/room_demo_live/room" className="hover:text-[var(--foreground)] transition-colors">
                  Live Technical Room
                </Link>
              </li>
              <li>
                <Link href="/candidate" className="hover:text-[var(--foreground)] transition-colors">
                  Practice Lounge & Passport
                </Link>
              </li>
              <li>
                <Link href="/rubrics" className="hover:text-[var(--foreground)] transition-colors">
                  Rubric Studio
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[var(--foreground)] transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Governance &amp; Policies
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <li>
                <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/ai-use" className="hover:text-[var(--foreground)] transition-colors">
                  AI Use &amp; Ethics
                </Link>
              </li>
              <li>
                <Link href="/candidate-consent" className="hover:text-[var(--foreground)] transition-colors">
                  Candidate Consent
                </Link>
              </li>
              <li>
                <Link href="/acceptable-use" className="hover:text-[var(--foreground)] transition-colors">
                  Acceptable Use
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-[var(--foreground)] transition-colors">
                  Security Architecture
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-[var(--foreground)] transition-colors">
                  Accessibility (AA)
                </Link>
              </li>
              <li>
                <Link href="/data-requests" className="hover:text-[var(--foreground)] transition-colors">
                  Data Requests
                </Link>
              </li>
              <li>
                <Link href="/subprocessors" className="hover:text-[var(--foreground)] transition-colors">
                  Subprocessors
                </Link>
              </li>
              <li>
                <Link href="/copyright" className="hover:text-[var(--foreground)] transition-colors">
                  Copyright
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--surface-border-subtle)] pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2">
          <p>© {new Date().getFullYear()} HireRoom. Built for academic evaluation and SaaS readiness.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="h-3 w-3 text-[var(--primary)] fill-current" /> by Sepal Sagar
          </p>
        </div>
      </div>
    </footer>
  );
}
