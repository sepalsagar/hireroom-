'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const consent = localStorage.getItem('hireroom-cookie-consent');
        if (!consent) {
          setIsOpen(true);
        }
      } catch {
        // safe fallback
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('hireroom-cookie-consent', 'accepted');
    } catch {}
    setIsOpen(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('hireroom-cookie-consent', 'declined');
    } catch {}
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 shadow-xl backdrop-blur-md"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-[var(--primary-light)] p-2 text-[var(--primary)]">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-[var(--foreground)]">
            Privacy & Cookie Preferences
          </h4>
          <p className="mt-1 text-xs text-[var(--muted-foreground)] leading-relaxed">
            HireRoom is an academic project by Sepal Sagar. We only use functional session cookies necessary for live interview synchronization and local settings. We do not sell data or run cross-site trackers.
          </p>
          <div className="mt-2 text-xs">
            <Link
              href="/cookie-policy"
              className="text-[var(--primary)] underline hover:opacity-80"
            >
              Read full cookie policy
            </Link>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleAccept}
              className="rounded-md bg-[var(--primary)] px-3 py-1.5 text-xs font-medium text-[var(--primary-foreground)] hover:opacity-90"
            >
              Accept Essential
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="rounded-md border border-[var(--surface-border)] bg-[var(--surface-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
            >
              Decline Analytics
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDecline}
          aria-label="Close cookie banner"
          className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
