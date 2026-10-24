import Link from 'next/link';
import { HelpCircle, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="rounded-full bg-[var(--surface-muted)] p-4 text-[var(--primary)] mb-4">
        <HelpCircle className="h-10 w-10" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
        Page Not Found (404)
      </h1>
      <p className="mt-2 text-sm text-[var(--muted-foreground)] max-w-md">
        The route or interview room you are attempting to reach does not exist, has expired, or has been moved.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-[var(--primary-foreground)] shadow-xs hover:opacity-90 transition-opacity"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
