'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { SignIn, useAuth, useClerk } from '@clerk/nextjs';

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const hasClerkKey = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_')
  );

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to platform
        </Link>

        {!hasClerkKey ? (
          <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-xs text-center space-y-3">
            <Shield className="h-8 w-8 text-[var(--primary)] mx-auto" />
            <h2 className="text-lg font-bold text-[var(--foreground)]">Sign-in is unavailable</h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              Clerk authentication is not configured. Contact the site administrator.
            </p>
          </div>
        ) : !isLoaded ? (
          <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 text-center text-sm text-[var(--muted-foreground)]">
            Loading sign-in…
          </div>
        ) : isSignedIn ? (
          <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-xs text-center space-y-3">
            <h2 className="text-lg font-bold text-[var(--foreground)]">You’re already signed in</h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              Sign out to use a different account.
            </p>
            <button
              type="button"
              onClick={() => void signOut({ redirectUrl: '/sign-in' })}
              className="inline-flex items-center justify-center rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-[var(--primary-foreground)]"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <SignIn
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
              fallbackRedirectUrl="/dashboard"
            />
          </div>
        )}
      </div>
    </div>
  );
}
