'use client';

import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Video,
  Sparkles,
  Award,
  ArrowRight,
  Shield,
  Layers,
  Terminal,
  Activity,
  Cpu,
  FileCheck2,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function HomePage() {
  const { user, loginAs } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[var(--surface-border)] bg-[var(--surface)]">
        <div className="absolute inset-0 bg-radial from-[var(--primary-light)]/20 via-transparent to-transparent pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-subtle)] px-3 py-1 text-xs font-medium text-[var(--foreground)] mb-6 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[var(--primary)]" />
              <span>Academic Engineering Capstone • Sepal Sagar</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.15]">
              AI-Assisted Hiring &amp;{' '}
              <span className="text-[var(--primary)]">Live Technical</span> Interviews
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
              An enterprise-grade platform uniting multi-party live coding, peer-to-peer video, isolated WebAssembly execution, and an objective co-pilot designed around fairness.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                href="/interviews/room_demo_live/room"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary-foreground)] shadow-md hover:bg-[var(--primary-hover)] transition-all w-full sm:w-auto"
              >
                <Code2 className="h-4 w-4" />
                Launch Live Interview Room
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-all w-full sm:w-auto"
              >
                <Layers className="h-4 w-4" />
                Explore Talent Hub
              </Link>
              <Link
                href="/candidate"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-all w-full sm:w-auto"
              >
                <Award className="h-4 w-4" />
                Practice Lounge &amp; Passport
              </Link>
            </div>

            {/* Technical Highlights Badges */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl text-left">
              <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground)]">
                  <Video className="h-3.5 w-3.5 text-[var(--primary)]" />
                  <span>WebRTC P2P</span>
                </div>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">Zero external video relay bills</p>
              </div>

              <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground)]">
                  <Cpu className="h-3.5 w-3.5 text-[var(--primary)]" />
                  <span>Pyodide WASM</span>
                </div>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">Client-side sandbox execution</p>
              </div>

              <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground)]">
                  <Activity className="h-3.5 w-3.5 text-[var(--primary)]" />
                  <span>Objective Telemetry</span>
                </div>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">Talk-time balance, no sentiment</p>
              </div>

              <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground)]">
                  <Shield className="h-3.5 w-3.5 text-[var(--primary)]" />
                  <span>Human-in-Loop</span>
                </div>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">Zero automated rejections</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="py-16 md:py-20 bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Engineered for Fairness, Speed &amp; Zero Operating Cost
            </h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Every subsystem is built with provider abstractions, isolated client compute, and ethical guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] mb-4">
                  <Terminal className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Collaborative Room &amp; Runner
                </h3>
                <p className="mt-2 text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Real-time Monaco code editor with multi-cursor state sync. Code executes directly in the candidate browser via Web Workers (JS/TS) and Pyodide WebAssembly (Python), bypassing expensive server infrastructure.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--surface-border-subtle)] flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--primary)]">Interactive Monaco + WASM</span>
                <Link href="/interviews/room_demo_live/room" className="hover:underline text-[var(--muted-foreground)] flex items-center gap-1">
                  Try Room <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-light)] text-[var(--accent)] mb-4">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Objective Co-Pilot &amp; Rubrics
                </h3>
                <p className="mt-2 text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Google Gemini 3.8 Flash powers on-demand follow-up question suggestions and evidence-linked scorecard drafts. Strictly adheres to objective dynamics: talk-time balance, silence detection, and test pass counts.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--surface-border-subtle)] flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--accent)]">Rate-limited &amp; Cached</span>
                <Link href="/rubrics" className="hover:underline text-[var(--muted-foreground)] flex items-center gap-1">
                  Rubric Studio <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--success-light)] text-[var(--success)] mb-4">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Practice Lounge &amp; Passport
                </h3>
                <p className="mt-2 text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Candidates can practice algorithm challenges inside a dedicated mock lounge without stakes. Verified interview assessments generate a portable, verifiable Skills Passport with shareable credentials.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--surface-border-subtle)] flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--success)]">Candidate-Owned Career Asset</span>
                <Link href="/candidate" className="hover:underline text-[var(--muted-foreground)] flex items-center gap-1">
                  Practice Lounge <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Role Tester Strip */}
      <section className="py-8 border-t border-[var(--surface-border)] bg-[var(--surface-subtle)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-[var(--foreground)]">
                Evaluate Role-Based Access Control (RBAC)
              </h4>
              <p className="text-xs text-[var(--muted-foreground)]">
                Currently logged in as: <strong className="text-[var(--primary)] capitalize">{user?.role.replace('_', ' ')}</strong> ({user?.fullName})
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => loginAs('super_admin')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  user?.role === 'super_admin'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground)] hover:bg-[var(--surface-muted)]'
                }`}
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => loginAs('hiring_manager')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  user?.role === 'hiring_manager'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground)] hover:bg-[var(--surface-muted)]'
                }`}
              >
                Hiring Manager
              </button>
              <button
                type="button"
                onClick={() => loginAs('interviewer')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  user?.role === 'interviewer'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground)] hover:bg-[var(--surface-muted)]'
                }`}
              >
                Interviewer
              </button>
              <button
                type="button"
                onClick={() => loginAs('candidate')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  user?.role === 'candidate'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground)] hover:bg-[var(--surface-muted)]'
                }`}
              >
                Candidate
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
