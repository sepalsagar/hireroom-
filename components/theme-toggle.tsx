'use client';

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle({ showLabels = false }: { showLabels?: boolean }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme switcher"
      className="inline-flex items-center rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-1 text-xs font-medium"
    >
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'light'}
        onClick={() => setTheme('light')}
        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all ${
          theme === 'light'
            ? 'bg-[var(--surface)] text-[var(--foreground)] shadow-xs font-semibold'
            : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
        }`}
        title="Light theme"
      >
        <Sun className="h-3.5 w-3.5" />
        {showLabels && <span>Light</span>}
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={theme === 'dark'}
        onClick={() => setTheme('dark')}
        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all ${
          theme === 'dark'
            ? 'bg-[var(--surface)] text-[var(--foreground)] shadow-xs font-semibold'
            : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
        }`}
        title="Dark theme"
      >
        <Moon className="h-3.5 w-3.5" />
        {showLabels && <span>Dark</span>}
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={theme === 'system'}
        onClick={() => setTheme('system')}
        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all ${
          theme === 'system'
            ? 'bg-[var(--surface)] text-[var(--foreground)] shadow-xs font-semibold'
            : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
        }`}
        title="System preference"
      >
        <Monitor className="h-3.5 w-3.5" />
        {showLabels && <span>Auto</span>}
      </button>
    </div>
  );
}
