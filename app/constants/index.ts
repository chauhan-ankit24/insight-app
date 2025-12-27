import { LayoutDashboard, Settings } from 'lucide-react';

export const NAV_LINKS = [
  { href: '/metrics', label: 'Metrics', icon: LayoutDashboard },
  { href: '/settings', label: 'Settings', icon: Settings },
] as const;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export type ThemeValue = (typeof THEMES)[keyof typeof THEMES];
