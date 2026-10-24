'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, UserProfile, UserRole } from './types';
import { DEMO_PROFILES } from './profiles';

export { DEMO_PROFILES };

const AuthContext = createContext<AuthContextType>({
  user: DEMO_PROFILES.interviewer,
  isAuthenticated: true,
  isLoading: false,
  provider: 'mock-dev',
  loginAs: () => {},
  logout: () => {},
  switchOrganization: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEMO_PROFILES.interviewer);
  const [isLoading, setIsLoading] = useState(false);
  const isClerkConfigured = Boolean(
    typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_')
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedRole = localStorage.getItem('hireroom-active-role') as UserRole | null;
        if (savedRole && DEMO_PROFILES[savedRole]) {
          setUser(DEMO_PROFILES[savedRole]);
        }
      } catch {
        // safe fallback
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const loginAs = (role: UserRole) => {
    setIsLoading(true);
    const profile = DEMO_PROFILES[role];
    setUser(profile);
    try {
      localStorage.setItem('hireroom-active-role', role);
    } catch {
      // safe fallback
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('hireroom-active-role');
    } catch {
      // safe fallback
    }
  };

  const switchOrganization = (orgId: string, orgName: string) => {
    if (!user) return;
    setUser({
      ...user,
      organizationId: orgId,
      organizationName: orgName,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        provider: isClerkConfigured ? 'clerk' : 'mock-dev',
        loginAs,
        logout,
        switchOrganization,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
