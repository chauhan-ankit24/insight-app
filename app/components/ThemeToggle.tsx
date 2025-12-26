'use client';

import { useTheme } from 'next-themes';
import { Sun, MoonStar } from 'lucide-react';
import { ActionButton } from './ui/ActionButton';
import { THEMES } from '../constants';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ActionButton onClick={() => setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK)}>
      {theme === THEMES.DARK && <Sun className="h-5 w-5" />}
      {theme === THEMES.LIGHT && <MoonStar className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </ActionButton>
  );
}
