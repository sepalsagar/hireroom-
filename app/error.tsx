'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="rounded-full bg-[var(--destructive-light)] p-4 text-[var(--destructive)] mb-4">
        <AlertTriangle className="h-10 w-10" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
        Application Error Encountered
      </h1>
      <p className="mt-2 text-sm text-[var(--muted-foreground)] max-w-md">
        An unexpected error occurred while executing this component. Your interview session data and local state are preserved.
      </p>
      {error?.message && (
        <div className="mt-4 max-w-md rounded-md bg-[var(--surface-subtle)] p-3 text-left font-mono text-xs text-[var(--destructive)] border border-[var(--surface-border)]">
          {error.message}
        </div>
      )}
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-[var(--primary-foreground)] shadow-xs hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="h-4 w-4" />
          Retry Action
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors"
        >
          <Home className="h-4 w-4" />
          Return to Safety
        </Link>
      </div>
    </div>
  );
}
