'use client';

import React from 'react';
import { AlertTriangle, Lock } from 'lucide-react';

export function DemoBanner() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDemoMode = !isProduction && process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  if (!isDemoMode) return null;

  return (
    <div
      role="banner"
      aria-label="Demo mode warning banner"
      className="w-full bg-amber-500 text-amber-950 px-4 py-1.5 text-xs font-semibold flex items-center justify-center gap-2 border-b border-amber-600 shadow-xs z-50 text-center select-none"
    >
      <AlertTriangle className="h-4 w-4 shrink-0 text-amber-950" />
      <span>
        <strong>Demo mode: auth disabled</strong> — AI Studio isolated preview active. In production (<code>NODE_ENV=production</code>), all protected routes strictly fail closed and require an authenticated Clerk session.
      </span>
      <span className="hidden sm:inline-flex items-center gap-1 rounded bg-amber-600/30 px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-amber-950">
        <Lock className="h-3 w-3 inline" /> Strict RBAC
      </span>
    </div>
  );
}
