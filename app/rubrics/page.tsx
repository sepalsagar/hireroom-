'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  FileText,
  Sliders,
  CheckCircle2,
  Plus,
  ArrowRight,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function RubricsPage() {
  const [activeDimension, setActiveDimension] = useState<number>(0);

  const rubricDimensions = [
    {
      id: 1,
      name: 'Algorithm Design & Correctness',
      weight: 30,
      description: 'Ability to select optimal data structures, navigate edge cases, and ensure correctness of concurrent or distributed routines.',
      levels: [
        { score: 1, label: 'Unacceptable', desc: 'Code produces runtime exceptions on basic inputs; unable to identify logic faults without extensive hints.' },
        { score: 3, label: 'Competent', desc: 'Implements working solutions for standard cases; handles primary boundaries after mild prompting.' },
        { score: 5, label: 'Exemplary', desc: 'Writes pristine, idiomatic code with proactive boundary assertions and zero regression hazards.' },
      ],
    },
    {
      id: 2,
      name: 'Computational & Space Complexity',
      weight: 25,
      description: 'Formal reasoning regarding asymptotic complexity (Big-O time and space) and hardware efficiency.',
      levels: [
        { score: 1, label: 'Unacceptable', desc: 'Unable to derive execution time scaling or confuses quadratic with linear operations.' },
        { score: 3, label: 'Competent', desc: 'Accurately determines dominant terms; recognizes tradeoffs between memory buffers and CPU cycles.' },
        { score: 5, label: 'Exemplary', desc: 'Identifies hardware cache locality advantages, amortized costs, and optimizes memory overhead.' },
      ],
    },
    {
      id: 3,
      name: 'Collaborative Problem Exploration',
      weight: 25,
      description: 'Objective communication balance, asking clarifying architectural questions, and articulating tradeoffs.',
      levels: [
        { score: 1, label: 'Unacceptable', desc: 'Monopolizes session without checking alignment, or remains unresponsive to interviewer probes.' },
        { score: 3, label: 'Competent', desc: 'Shares thought process openly; verifies specifications before initiating execution.' },
        { score: 5, label: 'Exemplary', desc: 'Leads structured inquiry; drives consensus on ambiguous constraints and alternative paths.' },
      ],
    },
    {
      id: 4,
      name: 'Verification & Automated Testing',
      weight: 20,
      description: 'Discipline in writing comprehensive unit assertions and dry-running code prior to deployment.',
      levels: [
        { score: 1, label: 'Unacceptable', desc: 'Relies solely on interviewer confirmation; does not execute code or verify return values.' },
        { score: 3, label: 'Competent', desc: 'Constructs positive and negative test cases; identifies off-by-one errors systematically.' },
        { score: 5, label: 'Exemplary', desc: 'Develops property-based assertions and stress tests with extreme input scales.' },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between rounded-xl border border-[var(--warning)] bg-[var(--warning-light)]/40 p-3 text-xs text-[var(--warning)]">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            <strong>Template Library:</strong> Standardized Technical Rubrics provide objective scoring criteria to eliminate interviewer bias.
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
            Rubric &amp; Prompt Studio
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
            Calibrate structured scoring dimensions and evidence-based scorecard questions.
          </p>
        </div>
      </div>

      {/* Main Rubric Editor View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Dimensions list */}
        <div className="space-y-3">
          <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 shadow-xs">
            <h2 className="text-sm font-bold text-[var(--foreground)] mb-3">
              Standard Technical Dimensions (100% Weight)
            </h2>
            <div className="space-y-2">
              {rubricDimensions.map((dim, idx) => (
                <button
                  key={dim.id}
                  type="button"
                  onClick={() => setActiveDimension(idx)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between ${
                    activeDimension === idx
                      ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)] font-semibold'
                      : 'border-[var(--surface-border)] hover:bg-[var(--surface-subtle)] text-[var(--foreground)]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p>{dim.name}</p>
                    <p className="text-[11px] text-[var(--muted-foreground)] font-normal">Weight: {dim.weight}%</p>
                  </div>
                  <span className="text-[10px] font-mono bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--surface-border)]">
                    {dim.weight}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Dimension Criteria Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--surface-border-subtle)] mb-4">
              <div>
                <h3 className="text-base font-bold text-[var(--foreground)]">
                  {rubricDimensions[activeDimension].name}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  {rubricDimensions[activeDimension].description}
                </p>
              </div>
              <span className="rounded-full bg-[var(--accent-light)] px-3 py-1 text-xs font-bold text-[var(--accent)]">
                Weight: {rubricDimensions[activeDimension].weight}%
              </span>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                Scoring Calibrations (Human Evaluation Benchmarks)
              </h4>

              <div className="space-y-3">
                {rubricDimensions[activeDimension].levels.map((lvl) => (
                  <div
                    key={lvl.score}
                    className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-3.5 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-[11px]">
                        {lvl.score}
                      </span>
                      <span className="text-xs font-bold text-[var(--foreground)]">{lvl.label}</span>
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed pl-7">
                      {lvl.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--surface-border-subtle)] flex items-center justify-between text-xs text-[var(--muted-foreground)]">
              <span>Used across all standard full-stack engineering interviews.</span>
              <span className="font-semibold text-[var(--primary)]">Immutable Version Hash: v1.0.4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
