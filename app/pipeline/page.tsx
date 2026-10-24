'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Plus,
  Play,
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { initialMockStore } from '@/lib/db';

export default function PipelinePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [blindMode, setBlindMode] = useState(false);

  const stages = [
    { id: 'applied', label: 'Applied', color: 'border-blue-400' },
    { id: 'screening', label: 'Screening', color: 'border-yellow-400' },
    { id: 'interview', label: 'Technical Interview', color: 'border-pink-500' },
    { id: 'offer', label: 'Offer Extended', color: 'border-emerald-500' },
    { id: 'hired', label: 'Hired', color: 'border-purple-500' },
  ];

  const applications = [
    {
      id: 'app_01',
      candidateName: 'Alex Chen',
      anonymizedName: 'Candidate C-812',
      role: 'Staff Frontend Architect',
      stage: 'interview',
      matchScore: 94,
      skills: ['Next.js 15', 'WebRTC', 'WebWorkers'],
      interviewId: 'room_demo_live',
    },
    {
      id: 'app_02',
      candidateName: 'Priya Sharma',
      anonymizedName: 'Candidate P-449',
      role: 'Senior Distributed Systems Engineer',
      stage: 'screening',
      matchScore: 89,
      skills: ['Go', 'Raft', 'PostgreSQL'],
      interviewId: null,
    },
    {
      id: 'app_03',
      candidateName: 'Jordan Taylor',
      anonymizedName: 'Candidate J-103',
      role: 'Staff Frontend Architect',
      stage: 'applied',
      matchScore: 82,
      skills: ['TypeScript', 'React', 'CSS'],
      interviewId: null,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Top Banner: Labeled Demo Data */}
      <div className="flex items-center justify-between rounded-xl border border-[var(--warning)] bg-[var(--warning-light)]/40 p-3 text-xs text-[var(--warning)]">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            <strong>Demo Data:</strong> Interactive Pipeline Kanban showcasing applicant progression and blind screening mode.
          </span>
        </div>
        <span className="font-semibold uppercase tracking-wider text-[10px] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--warning)]">
          Demo data
        </span>
      </div>

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Applicant Pipeline Kanban
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
            Track candidates across stages, trigger live technical rooms, and evaluate scores.
          </p>
        </div>

        {/* Blind Review Mode Toggle */}
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--foreground)] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={blindMode}
              onChange={(e) => setBlindMode(e.target.checked)}
              className="rounded border-[var(--surface-border)] text-[var(--primary)] focus:ring-[var(--primary)]"
            />
            <span>Blind Review Mode (Redacts Names &amp; Demographics)</span>
          </label>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageApps = applications.filter((app) => app.stage === stage.id);
          return (
            <div
              key={stage.id}
              className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-3.5 flex flex-col min-h-[450px]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[var(--surface-border-subtle)] mb-3">
                <span className="text-xs font-bold text-[var(--foreground)]">{stage.label}</span>
                <span className="rounded-full bg-[var(--surface-subtle)] px-2 py-0.5 text-[11px] font-semibold text-[var(--muted-foreground)]">
                  {stageApps.length}
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {stageApps.map((app) => (
                  <div
                    key={app.id}
                    className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-3 shadow-xs hover:border-[var(--primary)] transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[var(--foreground)]">
                          {blindMode ? app.anonymizedName : app.candidateName}
                        </h4>
                        <p className="text-[11px] text-[var(--muted-foreground)]">{app.role}</p>
                      </div>
                      <span className="rounded bg-[var(--accent-light)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--accent)]">
                        {app.matchScore}% match
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {app.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded bg-[var(--surface)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--muted-foreground)] border border-[var(--surface-border-subtle)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {app.interviewId && (
                      <div className="pt-2 border-t border-[var(--surface-border-subtle)]">
                        <Link
                          href={`/interviews/${app.interviewId}/room`}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--primary)] hover:underline"
                        >
                          <Play className="h-3 w-3" /> Enter Live Room
                        </Link>
                      </div>
                    )}
                  </div>
                ))}

                {stageApps.length === 0 && (
                  <div className="flex-1 flex items-center justify-center text-[11px] text-[var(--muted-foreground)] italic p-4 text-center">
                    No candidates in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
