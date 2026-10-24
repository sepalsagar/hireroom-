'use client';

import React, { useState } from 'react';
import {
  Building2,
  Users,
  CreditCard,
  Webhook,
  Calendar,
  Lock,
  Mail,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'org' | 'team' | 'integrations' | 'billing'>('integrations');

  const integrations = [
    {
      name: 'Google Calendar & .ics Export',
      category: 'Scheduling',
      status: 'active',
      desc: 'Export interview schedules and calendar attachments directly to interviewer calendars.',
    },
    {
      name: 'Custom Webhooks',
      category: 'Platform Automation',
      status: 'active',
      desc: 'Send signed scorecard and offer events to your internal HR database.',
    },
    {
      name: 'Greenhouse ATS',
      category: 'Applicant Tracking',
      status: 'coming_soon',
      desc: 'Sync candidate stages and scorecards directly into Greenhouse job pipelines.',
    },
    {
      name: 'Lever ATS',
      category: 'Applicant Tracking',
      status: 'coming_soon',
      desc: 'Two-way synchronization for candidate profiles, tags, and feedback.',
    },
    {
      name: 'Ashby ATS',
      category: 'Applicant Tracking',
      status: 'coming_soon',
      desc: 'Automatic interviewer room dispatch and feedback forms in Ashby.',
    },
    {
      name: 'Slack Notifications',
      category: 'Team Communication',
      status: 'coming_soon',
      desc: 'Direct dispatch alerts 10 minutes prior to live coding sessions.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between rounded-xl border border-[var(--warning)] bg-[var(--warning-light)]/40 p-3 text-xs text-[var(--warning)]">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            <strong>Integration Policy:</strong> External ATS systems are currently marked <em>Coming soon</em> per Hard Rule #3. Only verified platform webhooks and .ics exports are active.
          </span>
        </div>
        <span className="font-semibold uppercase tracking-wider text-[10px] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--warning)]">
          Demo data
        </span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Organization &amp; Team Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
          Configure members, integrations, billing tier, and security preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--surface-border)] gap-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('integrations')}
          className={`pb-3 px-3 border-b-2 transition-colors ${
            activeTab === 'integrations'
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
          }`}
        >
          Integrations &amp; Webhooks
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('team')}
          className={`pb-3 px-3 border-b-2 transition-colors ${
            activeTab === 'team'
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
          }`}
        >
          Team Members &amp; RBAC
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('billing')}
          className={`pb-3 px-3 border-b-2 transition-colors ${
            activeTab === 'billing'
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
          }`}
        >
          Billing &amp; Entitlements
        </button>
      </div>

      {/* Tab 1: Integrations */}
      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-5 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[var(--foreground)]">{item.name}</h3>
                  {item.status === 'active' ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--success-light)] px-2 py-0.5 text-[10px] font-bold text-[var(--success)]">
                      <CheckCircle className="h-3 w-3" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-[var(--surface-subtle)] px-2 py-0.5 text-[10px] font-bold text-[var(--muted-foreground)] border border-[var(--surface-border)]">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--surface-border-subtle)] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[var(--muted-foreground)]">{item.category}</span>
                {item.status === 'active' ? (
                  <button
                    type="button"
                    className="font-semibold text-[var(--primary)] hover:underline"
                    onClick={() => alert(`Configuring ${item.name}`)}
                  >
                    Configure
                  </button>
                ) : (
                  <span className="text-[11px] text-[var(--muted-foreground)] italic">In Roadmap</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Team Members & RBAC */}
      {activeTab === 'team' && (
        <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--surface-border-subtle)]">
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">Team Directory</h2>
              <p className="text-xs text-[var(--muted-foreground)]">Roles and access control for this workspace.</p>
            </div>
            <span className="text-xs font-semibold text-[var(--muted-foreground)]">3 Members</span>
          </div>

          <div className="divide-y divide-[var(--surface-border)]">
            <div className="py-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[var(--foreground)]">Sepal Sagar</p>
                <p className="text-[var(--muted-foreground)]">sepalsagar1234@gmail.com</p>
              </div>
              <span className="rounded-full bg-[var(--primary-light)] px-2.5 py-0.5 font-bold text-[var(--primary)]">
                Super Admin
              </span>
            </div>
            <div className="py-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[var(--foreground)]">Marcus Vance</p>
                <p className="text-[var(--muted-foreground)]">marcus.vance@techcorp.internal</p>
              </div>
              <span className="rounded-full bg-[var(--surface-subtle)] px-2.5 py-0.5 font-medium text-[var(--foreground)] border border-[var(--surface-border)]">
                Hiring Manager
              </span>
            </div>
            <div className="py-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[var(--foreground)]">Elena Rostova</p>
                <p className="text-[var(--muted-foreground)]">elena.rostova@techcorp.internal</p>
              </div>
              <span className="rounded-full bg-[var(--surface-subtle)] px-2.5 py-0.5 font-medium text-[var(--foreground)] border border-[var(--surface-border)]">
                Interviewer
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Billing & Entitlements */}
      {activeTab === 'billing' && (
        <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--surface-border-subtle)]">
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">Billing Sandbox &amp; Entitlements</h2>
              <p className="text-xs text-[var(--muted-foreground)]">Current plan and simulated payment gateway.</p>
            </div>
            <span className="rounded-full bg-[var(--accent-light)] px-3 py-1 text-xs font-bold text-[var(--accent)]">
              Academic Demonstration
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-3 space-y-1">
              <span className="text-[var(--muted-foreground)]">Active Plan:</span>
              <p className="font-bold text-sm text-[var(--foreground)]">Free Academic Tier</p>
            </div>
            <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-3 space-y-1">
              <span className="text-[var(--muted-foreground)]">Primary Gateway:</span>
              <p className="font-bold text-sm text-[var(--primary)]">Dodo Payments (Sandbox)</p>
            </div>
            <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-3 space-y-1">
              <span className="text-[var(--muted-foreground)]">Interviews Remaining:</span>
              <p className="font-bold text-sm text-[var(--success)]">Unlimited in Demo</p>
            </div>
          </div>

          <div className="pt-3">
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              When ready for production deployment, connect your <strong>Dodo Payments API Key</strong> or <strong>Polar Token</strong> in `.env.local` to enable live subscription checkout sessions without code alterations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
