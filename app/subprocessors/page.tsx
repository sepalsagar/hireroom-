import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Server } from 'lucide-react';

export default function SubprocessorsPage() {
  const subprocessors = [
    {
      name: 'Supabase Inc.',
      purpose: 'PostgreSQL Relational Database & Row Level Security Hosting',
      location: 'United States (AWS)',
      dataProcessed: 'Encrypted user accounts, job postings, candidate submissions, and scorecards',
    },
    {
      name: 'Google Cloud Platform (Google AI Studio)',
      purpose: 'Gemini 3.8 Flash LLM API for Technical Co-Pilot Suggestions',
      location: 'United States / Global',
      dataProcessed: 'Objective code snippets and rubric questions (synthetic test data only on free tier)',
    },
    {
      name: 'Clerk Inc.',
      purpose: 'User Authentication, Session Management & Social OAuth',
      location: 'United States',
      dataProcessed: 'User email addresses, full names, authentication tokens, and RBAC roles',
    },
    {
      name: 'Dodo Payments Inc.',
      purpose: 'Merchant of Record & Billing Sandbox Gateway',
      location: 'United States / Global',
      dataProcessed: 'Simulated subscription metadata and organization billing identifiers',
    },
    {
      name: 'jsDelivr / Cloudflare CDN',
      purpose: 'Content Delivery Network for Pyodide WebAssembly Binaries',
      location: 'Global Edge Network',
      dataProcessed: 'Zero user data (stateless delivery of public Python WASM bundles)',
    },
  ];

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
            Vendor Transparency
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] mt-2">
            Third-Party Subprocessors Register
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Official list of external infrastructure providers utilized by HireRoom.
          </p>
        </div>

        <hr className="border-[var(--surface-border)]" />

        <div className="space-y-4 text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
          <p className="text-[var(--muted-foreground)]">
            In compliance with transparency guidelines, HireRoom lists all third-party sub-processors that may store or process application data.
          </p>

          <div className="overflow-x-auto rounded-lg border border-[var(--surface-border)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--surface-subtle)] text-[var(--foreground)] font-semibold border-b border-[var(--surface-border)]">
                <tr>
                  <th className="px-3 py-2.5">Subprocessor</th>
                  <th className="px-3 py-2.5">Purpose</th>
                  <th className="px-3 py-2.5">Location</th>
                  <th className="px-3 py-2.5">Data Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--surface-border)] text-[var(--muted-foreground)]">
                {subprocessors.map((sub) => (
                  <tr key={sub.name}>
                    <td className="px-3 py-2.5 font-bold text-[var(--foreground)]">{sub.name}</td>
                    <td className="px-3 py-2.5">{sub.purpose}</td>
                    <td className="px-3 py-2.5 font-mono text-[11px]">{sub.location}</td>
                    <td className="px-3 py-2.5">{sub.dataProcessed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
