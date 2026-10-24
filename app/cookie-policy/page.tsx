import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';

export default function CookiePolicyPage() {
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
            Technical Storage
          </span>
          <span className="text-xs text-[var(--muted-foreground)]">Updated: October 2026</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Cookie & Local Storage Policy
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Explanation of client storage keys utilized in the HireRoom prototype.
        </p>

        <hr className="my-6 border-[var(--surface-border)]" />

        <div className="space-y-6 text-sm text-[var(--foreground)] leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              1. What Storage Keys Are Used?
            </h2>
            <p className="text-[var(--muted-foreground)] mb-3">
              HireRoom uses modern HTML5 `localStorage` exclusively for operational settings and UX state persistence across page refreshes. We do not place marketing or tracking cookies.
            </p>

            <div className="overflow-x-auto rounded-lg border border-[var(--surface-border)]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--surface-subtle)] text-[var(--foreground)] font-semibold border-b border-[var(--surface-border)]">
                  <tr>
                    <th className="px-3 py-2">Storage Key</th>
                    <th className="px-3 py-2">Purpose</th>
                    <th className="px-3 py-2">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--surface-border)] text-[var(--muted-foreground)]">
                  <tr>
                    <td className="px-3 py-2 font-mono text-[var(--foreground)]">hireroom-theme</td>
                    <td className="px-3 py-2">Stores light, dark, or system theme preference.</td>
                    <td className="px-3 py-2">Persistent until cleared</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-mono text-[var(--foreground)]">hireroom-active-role</td>
                    <td className="px-3 py-2">Preserves active demo profile (super admin, manager, interviewer, candidate).</td>
                    <td className="px-3 py-2">Session / Local</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-mono text-[var(--foreground)]">hireroom-cookie-consent</td>
                    <td className="px-3 py-2">Records user acceptance of essential storage settings.</td>
                    <td className="px-3 py-2">Persistent until cleared</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              2. How to Clear Local Storage
            </h2>
            <p className="text-[var(--muted-foreground)]">
              You can clear all stored preferences at any time by resetting your browser cookies or clicking Application &gt; Local Storage &gt; Clear in your browser Developer Tools (F12).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
