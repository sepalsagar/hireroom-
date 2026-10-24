'use client';

import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import type { AuthContextType, UserProfile } from './types';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, user: clerkUser } = useUser();
  const { signOut } = useClerk();

  const user = useMemo<UserProfile | null>(() => {
    if (!clerkUser) return null;

    return {
      id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress ?? '',
      fullName:
        clerkUser.fullName ??
        clerkUser.username ??
        clerkUser.primaryEmailAddress?.emailAddress ??
        'Clerk user',
      avatarUrl: clerkUser.imageUrl,
      // Roles and organizations are resolved server-side from Postgres.
      role: null,
      organizationId: null,
      organizationName: null,
    };
  }, [clerkUser]);

  const logout = useCallback(async () => {
    await signOut({ redirectUrl: '/' });
  }, [signOut]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading: !isLoaded,
      provider: 'clerk',
      logout,
    }),
    [isLoaded, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
