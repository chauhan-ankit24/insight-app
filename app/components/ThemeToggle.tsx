'use client';

import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ActionButton } from './ui/ActionButton';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <ActionButton onClick={() => setTheme(isDark ? 'light' : 'dark')} type="button">
      <Sun
        className={`h-5 w-5 transition-all duration-500 ${
          isDark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 text-amber-500 opacity-100'
        } `}
      />

      <MoonStar
        className={`absolute h-5 w-5 transition-all duration-500 ${
          isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        } `}
      />

      <span className="sr-only">Toggle theme</span>
    </ActionButton>
  );
}
