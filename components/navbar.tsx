'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Code2,
  Users,
  Briefcase,
  PlayCircle,
  Settings,
  ChevronDown,
  Sparkles,
  Shield,
  CreditCard,
  Menu,
  X,
} from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { useAuth } from '@/lib/auth/auth-context';
import { UserRole } from '@/lib/auth/types';

export function Navbar() {
  const pathname = usePathname();
  const { user, loginAs, logout } = useAuth();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Talent Hub', href: '/dashboard', icon: Briefcase },
    { label: 'Pipeline', href: '/pipeline', icon: Users },
    { label: 'Live Room', href: '/interviews/room_demo_live/room', icon: Code2 },
    { label: 'Candidate Lounge', href: '/candidate', icon: PlayCircle },
    { label: 'Rubric Studio', href: '/rubrics', icon: Sparkles },
    { label: 'Pricing', href: '/pricing', icon: CreditCard },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  const roles: { role: UserRole; title: string; desc: string }[] = [
    { role: 'super_admin', title: 'Super Admin', desc: 'System governance & org controls' },
    { role: 'hiring_manager', title: 'Hiring Manager', desc: 'Pipelines, job creation, offers' },
    { role: 'interviewer', title: 'Interviewer', desc: 'Live technical evaluations & scoring' },
    { role: 'candidate', title: 'Candidate', desc: 'Practice lounge & skills passport' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--surface-border)] bg-[var(--surface)]/90 backdrop-blur-md transition-colors">
      {/* Top Banner: Academic Notice & Demo Mode */}
      <div className="flex items-center justify-between border-b border-[var(--surface-border-subtle)] bg-[var(--surface-subtle)] px-4 py-1 text-xs text-[var(--muted-foreground)]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-[var(--accent-light)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
            Academic Capstone
          </span>
          <span className="hidden sm:inline">
            HireRoom — An academic project by <strong>Sepal Sagar</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--warning)]">
            <span className="h-2 w-2 rounded-full bg-[var(--warning)] animate-pulse" />
            Demo Data Active
          </span>
          <span className="text-[11px] text-[var(--muted-foreground)] hidden md:inline">
            Zero-Cost Architecture
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs transition-transform group-hover:scale-105">
              <Code2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[var(--foreground)]">
                HireRoom
              </span>
              <span className="text-[10px] font-medium text-[var(--muted-foreground)] -mt-1">
                Collaborative Tech Hiring
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors ${
                    isActive
                      ? 'bg-[var(--surface-muted)] text-[var(--primary)] font-semibold'
                      : 'text-[var(--muted-foreground)] hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Role Switcher Pill - Strictly disabled in production builds */}
          {process.env.NODE_ENV !== 'production' ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors"
                aria-expanded={roleDropdownOpen}
                aria-haspopup="true"
              >
                <Shield className="h-3.5 w-3.5 text-[var(--primary)]" />
                <span className="hidden sm:inline">Role (Dev):</span>
                <span className="font-semibold capitalize text-[var(--primary)]">
                  {user?.role.replace('_', ' ') || 'Guest'}
                </span>
                <ChevronDown className="h-3 w-3 text-[var(--muted-foreground)]" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-2 shadow-2xl z-50 text-xs animate-in fade-in zoom-in-95 duration-100"
                  role="menu"
                >
                  <div className="px-2 py-1.5 border-b border-[var(--surface-border-subtle)] mb-1">
                    <p className="font-semibold text-[var(--foreground)]">Dev Mode Role Switcher</p>
                    <p className="text-[11px] text-[var(--muted-foreground)]">
                      Simulate RBAC views (disabled in production)
                    </p>
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r.role}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        loginAs(r.role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full flex flex-col items-start px-2.5 py-2 rounded-lg text-left transition-colors ${
                        user?.role === r.role
                          ? 'bg-[var(--primary-light)] text-[var(--primary)] font-semibold'
                          : 'text-[var(--foreground)] hover:bg-[var(--surface-subtle)]'
                      }`}
                    >
                      <span className="font-medium text-xs">{r.title}</span>
                      <span className="text-[10px] text-[var(--muted-foreground)]">{r.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)]">
              <Shield className="h-3.5 w-3.5 text-[var(--primary)]" />
              <span className="font-semibold capitalize text-[var(--primary)]">
                {user?.role.replace('_', ' ') || 'Authenticated'}
              </span>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-lg border border-[var(--surface-border)] p-1.5 text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-[var(--primary-light)] text-[var(--primary)] font-semibold'
                    : 'text-[var(--foreground)] hover:bg-[var(--surface-subtle)]'
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
