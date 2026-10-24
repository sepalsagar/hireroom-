'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  PlayCircle,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Code2,
  Terminal,
  Clock,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function CandidatePage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="flex items-center justify-between rounded-xl border border-[var(--warning)] bg-[var(--warning-light)]/40 p-3 text-xs text-[var(--warning)]">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            <strong>Candidate Portal:</strong> Candidates can prepare stress-free in the practice sandbox and carry their Verified Skills Passport across participating employers.
          </span>
        </div>
        <span className="font-semibold uppercase tracking-wider text-[10px] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--warning)]">
          Demo data
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Candidate Hub &amp; Practice Lounge
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
            Familiarize yourself with the live interview environment and inspect your portable verified achievements.
          </p>
        </div>

        <Link
          href="/interviews/room_demo_live/room"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-[var(--primary-foreground)] shadow-xs hover:bg-[var(--primary-hover)] transition-colors"
        >
          <PlayCircle className="h-4 w-4" />
          Enter Practice Sandbox
        </Link>
      </div>

      {/* Grid: Practice Tracks & Verified Passport */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Practice Tracks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--surface-border-subtle)]">
              <div>
                <h2 className="text-base font-bold text-[var(--foreground)]">
                  Zero-Stakes Practice Lounge
                </h2>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  Test your setup, camera permissions, Monaco shortcuts, and browser WebWorker execution before live rounds.
                </p>
              </div>
              <span className="rounded-full bg-[var(--accent-light)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
                Isolated Sandbox
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--foreground)]">
                  <Terminal className="h-4 w-4 text-[var(--primary)]" />
                  <span>Distributed Stream Processing</span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Implement an in-memory sliding window rate limiter with microsecond timestamp granularity.
                </p>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[var(--surface-border-subtle)]">
                  <span className="text-[var(--muted-foreground)]">Python / TypeScript</span>
                  <Link
                    href="/interviews/room_demo_live/room"
                    className="font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
                  >
                    Start Problem <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--foreground)]">
                  <Code2 className="h-4 w-4 text-[var(--accent)]" />
                  <span>Real-time Collaborative Canvas</span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Build an optimistic update queue with rollback capability for concurrent document editing.
                </p>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[var(--surface-border-subtle)]">
                  <span className="text-[var(--muted-foreground)]">JavaScript WebWorker</span>
                  <Link
                    href="/interviews/room_demo_live/room"
                    className="font-semibold text-[var(--accent)] hover:underline flex items-center gap-1"
                  >
                    Start Problem <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Verified Skills Passport */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[var(--foreground)]">
              <div className="rounded-lg bg-[var(--primary-light)] p-2 text-[var(--primary)]">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold">Verified Skills Passport</h2>
                <p className="text-[11px] text-[var(--muted-foreground)]">Candidate: Alex Chen</p>
              </div>
            </div>

            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Cryptographically signed proof of validated technical competencies earned through live evaluations.
            </p>

            <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">Verification Token:</span>
                <span className="font-mono font-bold text-[var(--primary)] text-[11px]">HR-PASS-88192-AC</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">Aggregate Rating:</span>
                <span className="font-bold text-[var(--success)]">94 / 100 (Exemplary)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">Issued:</span>
                <span>October 2026</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-semibold text-[var(--foreground)]">Validated Competencies:</p>
              <div className="flex flex-wrap gap-1">
                {['Next.js 15 App Router', 'WebRTC & Yjs', 'Pyodide WASM', 'Distributed Architecture', 'Unit Testing'].map((sk) => (
                  <span
                    key={sk}
                    className="inline-flex items-center gap-1 rounded bg-[var(--surface-subtle)] px-2 py-0.5 text-[10px] font-medium text-[var(--foreground)] border border-[var(--surface-border)]"
                  >
                    <CheckCircle2 className="h-2.5 w-2.5 text-[var(--success)]" />
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors"
                onClick={() => alert('Public share link copied: https://hireroom.dev/passport/HR-PASS-88192-AC (Simulated)')}
              >
                <ExternalLink className="h-3.5 w-3.5 text-[var(--primary)]" />
                Copy Public Passport Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
