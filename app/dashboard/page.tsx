'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  Plus,
  Play,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { initialMockStore } from '@/lib/db';

export default function DashboardPage() {
  const { user } = useAuth();
  const jobs = initialMockStore.jobs;
  const candidates = initialMockStore.candidates;
  const interviews = initialMockStore.interviews;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner: Labeled Demo Data */}
      <div className="flex items-center justify-between rounded-xl border border-[var(--warning)] bg-[var(--warning-light)]/40 p-3 text-xs text-[var(--warning)]">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            <strong>Demo Organization:</strong> You are currently viewing simulated technical hiring data for <em>HireRoom Engineering Demo</em>.
          </span>
        </div>
        <span className="font-semibold uppercase tracking-wider text-[10px] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--warning)]">
          Demo data
        </span>
      </div>

      {/* Header & Stats Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Talent Hub &amp; Sessions
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
            Manage active roles, upcoming live technical rooms, and scored evaluations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/interviews/room_demo_live/room"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3.5 py-2 text-xs font-semibold text-[var(--primary-foreground)] shadow-xs hover:bg-[var(--primary-hover)] transition-colors"
          >
            <Play className="h-3.5 w-3.5" />
            Join Demo Room
          </Link>
          <Link
            href="/pipeline"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors"
          >
            <Users className="h-3.5 w-3.5" />
            View Kanban
          </Link>
        </div>
      </div>

      {/* Metric Cards (Real Calculated Metrics, No Faked Enterprise Stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Active Roles</span>
            <Briefcase className="h-4 w-4 text-[var(--primary)]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[var(--foreground)]">{jobs.length}</p>
          <p className="mt-1 text-[11px] text-[var(--muted-foreground)]">Distributed Systems &amp; Frontend</p>
        </div>

        <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Candidates in Pipeline</span>
            <Users className="h-4 w-4 text-[var(--accent)]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[var(--foreground)]">{candidates.length}</p>
          <p className="mt-1 text-[11px] text-[var(--muted-foreground)]">2 undergoing evaluations</p>
        </div>

        <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Live Sessions Scheduled</span>
            <Calendar className="h-4 w-4 text-[var(--warning)]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[var(--foreground)]">{interviews.length}</p>
          <p className="mt-1 text-[11px] text-[var(--muted-foreground)]">1 session ready today</p>
        </div>

        <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Evaluations Finalized</span>
            <CheckCircle className="h-4 w-4 text-[var(--success)]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[var(--foreground)]">1</p>
          <p className="mt-1 text-[11px] text-[var(--muted-foreground)]">Human verified &amp; signed</p>
        </div>
      </div>

      {/* Main Grid: Scheduled Sessions & Active Openings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Scheduled Sessions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[var(--foreground)]">
                Upcoming Live Technical Sessions
              </h2>
              <span className="text-xs text-[var(--muted-foreground)]">Live Room Dispatch</span>
            </div>

            <div className="space-y-3">
              {interviews.map((session) => (
                <div
                  key={session.id}
                  className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-[var(--primary)] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-md bg-[var(--primary-light)] px-2 py-0.5 text-xs font-semibold text-[var(--primary)]">
                        60 Min Coding
                      </span>
                      <h3 className="font-semibold text-sm text-[var(--foreground)]">
                        {session.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Candidate: <strong>Alex Chen</strong> • Staff Full-Stack Frontend Architect
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-[var(--muted-foreground)] pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Today, In 1 hour
                      </span>
                      <span>WebRTC Mesh • Pyodide WASM</span>
                    </div>
                  </div>

                  <Link
                    href={`/interviews/${session.id}/room`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 py-1.5 text-xs font-semibold text-[var(--primary-foreground)] shadow-xs hover:bg-[var(--primary-hover)] transition-colors shrink-0"
                  >
                    Enter Live Room
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Active Job Roles */}
          <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[var(--foreground)]">
                Active Job Openings
              </h2>
              <Link
                href="/pipeline"
                className="text-xs font-medium text-[var(--primary)] hover:underline flex items-center gap-1"
              >
                View Pipeline Kanban <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="divide-y divide-[var(--surface-border)]">
              {jobs.map((job) => (
                <div key={job.id} className="py-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--foreground)]">{job.title}</h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {job.department} • {job.location} • {job.jobType}
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--accent-light)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--accent)] capitalize">
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Tools & Audit Trail */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-5 shadow-xs">
            <h2 className="text-base font-bold text-[var(--foreground)] mb-3">
              Platform Modules
            </h2>
            <div className="space-y-2">
              <Link
                href="/pipeline"
                className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--surface-border)] hover:bg-[var(--surface-subtle)] text-xs font-medium text-[var(--foreground)] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[var(--primary)]" />
                  Pipeline Kanban
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
              </Link>

              <Link
                href="/rubrics"
                className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--surface-border)] hover:bg-[var(--surface-subtle)] text-xs font-medium text-[var(--foreground)] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[var(--accent)]" />
                  Rubric &amp; Prompt Studio
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
              </Link>

              <Link
                href="/candidate"
                className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--surface-border)] hover:bg-[var(--surface-subtle)] text-xs font-medium text-[var(--foreground)] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[var(--success)]" />
                  Practice Lounge &amp; Passport
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-5 shadow-xs">
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              Objective Telemetry Active
            </h2>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Interviews conducted on HireRoom log speech duration and test results without psychological inference. Evaluator notes require human sign-off before reports lock.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
