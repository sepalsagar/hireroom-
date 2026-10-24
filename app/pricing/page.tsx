'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { getBillingProvider } from '@/lib/billing/billing-adapter';

export default function PricingPage() {
  const [checkoutError, setCheckoutError] = React.useState<string | null>(null);

  const handleTestCheckout = async (planId: string) => {
    try {
      setCheckoutError(null);
      const provider = getBillingProvider();
      const session = await provider.createCheckoutSession({
        organizationId: 'org_hireroom_demo',
        planId,
        userEmail: 'sepalsagar1234@gmail.com',
        returnUrl: window.location.href,
      });
      if (session.checkoutUrl) {
        window.location.href = session.checkoutUrl;
      }
    } catch (err: any) {
      setCheckoutError(err?.message || 'Checkout creation failed');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-subtle)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
          <CreditCard className="h-3.5 w-3.5" />
          <span>SaaS Readiness Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
          Transparent, Predictable Plans
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          HireRoom is completely free for academic review. Test mode checkout is wired to Dodo Payments and Polar sandbox adapters.
        </p>

        {checkoutError && (
          <div className="rounded-lg border border-[var(--destructive)] bg-[var(--destructive-light)] p-3 text-xs text-[var(--destructive)] text-left">
            <strong>Checkout Error:</strong> {checkoutError}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Plan 1: Academic Free */}
        <div className="rounded-2xl border-2 border-[var(--primary)] bg-[var(--surface)] p-6 shadow-md flex flex-col justify-between relative">
          <span className="absolute -top-3 left-6 rounded-full bg-[var(--primary)] px-3 py-0.5 text-[10px] font-bold text-[var(--primary-foreground)] uppercase tracking-wider">
            Current Tier
          </span>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[var(--foreground)]">Academic Free</h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Full capstone evaluation access</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-[var(--foreground)]">$0</span>
              <span className="text-xs text-[var(--muted-foreground)]">/ forever</span>
            </div>

            <ul className="space-y-2 text-xs text-[var(--foreground)] pt-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--success)]" />
                <span>Unlimited live interview rooms</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--success)]" />
                <span>WebRTC peer-to-peer video mesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--success)]" />
                <span>Client WebWorker &amp; Pyodide WASM runner</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--success)]" />
                <span>Objective audio co-pilot &amp; rubrics</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--success)]" />
                <span>Candidate Practice Lounge &amp; Passports</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Link
              href="/interviews/room_demo_live/room"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--primary)] py-2.5 text-xs font-semibold text-[var(--primary-foreground)] shadow-xs hover:bg-[var(--primary-hover)] transition-colors"
            >
              Start Free Session
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Plan 2: Growth SaaS */}
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[var(--foreground)]">Growth SaaS</h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">For scaling engineering organizations</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-[var(--foreground)]">$49</span>
              <span className="text-xs text-[var(--muted-foreground)]">/ month</span>
            </div>

            <ul className="space-y-2 text-xs text-[var(--foreground)] pt-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--success)]" />
                <span>50 Live technical sessions / mo</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--success)]" />
                <span>Custom team rubrics &amp; branding</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--success)]" />
                <span>Direct ATS webhooks (Greenhouse, Lever)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--success)]" />
                <span>Dodo Payments automated billing</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => handleTestCheckout('plan_growth_tier')}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] py-2.5 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              Simulate Test Checkout
            </button>
          </div>
        </div>

        {/* Plan 3: Enterprise */}
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[var(--foreground)]">Enterprise</h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Custom infrastructure &amp; compliance</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-[var(--foreground)]">$199</span>
              <span className="text-xs text-[var(--muted-foreground)]">/ month</span>
            </div>

            <ul className="space-y-2 text-xs text-[var(--foreground)] pt-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--success)]" />
                <span>Unlimited sessions &amp; candidates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--success)]" />
                <span>Dedicated PostgreSQL instance</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--success)]" />
                <span>Custom SSO (SAML / Okta via Clerk)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--success)]" />
                <span>Audit log export &amp; signed SLAs</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => handleTestCheckout('plan_enterprise_tier')}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] py-2.5 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              Simulate Test Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
