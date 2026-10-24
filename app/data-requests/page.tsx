'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, CheckCircle, FileText } from 'lucide-react';

export default function DataRequestsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [requestType, setRequestType] = useState('export');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            Privacy Portal
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] mt-2">
            Data Subject Requests (Export &amp; Erasure)
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Request an export of your interview sessions or prompt profile erasure.
          </p>
        </div>

        <hr className="border-[var(--surface-border)]" />

        <div className="space-y-6 text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
          <p className="text-[var(--muted-foreground)]">
            Under HireRoom&apos;s voluntary privacy practices, candidates and evaluators can request a machine-readable export of all recorded code runs, scorecards, and transcripts, or request complete account erasure.
          </p>

          {submitted ? (
            <div className="rounded-xl border border-[var(--success)] bg-[var(--success-light)] p-5 text-center space-y-2">
              <CheckCircle className="h-8 w-8 text-[var(--success)] mx-auto" />
              <h3 className="font-bold text-sm text-[var(--foreground)]">Request Logged Successfully</h3>
              <p className="text-xs text-[var(--muted-foreground)]">
                Your request ({requestType}) for <strong>{email}</strong> has been logged. For this academic project, Sepal Sagar will process your request within 7 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-5 space-y-4">
              <div className="space-y-1">
                <label className="font-semibold text-xs text-[var(--foreground)]">Request Action</label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] p-2 text-xs text-[var(--foreground)]"
                >
                  <option value="export">Download Complete Data Export (JSON / PDF)</option>
                  <option value="erasure">Request Complete Profile &amp; Session Erasure</option>
                  <option value="telemetry_optout">Opt-Out of Objective Audio Telemetry</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-xs text-[var(--foreground)]">Registered Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="candidate@example.com"
                  className="w-full rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] p-2 text-xs text-[var(--foreground)]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-[var(--primary-foreground)] shadow-xs hover:bg-[var(--primary-hover)] transition-colors"
              >
                <Send className="h-3.5 w-3.5" /> Submit Data Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
