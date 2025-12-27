import { NavLink } from '@/lib/types/metrics';
import { LayoutDashboard, Settings } from 'lucide-react';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: {
    METRICS: '/metrics',
    SETTINGS: '/settings',
  },
  LOGIN: '/login',
} as const;

export const NAV_LINKS: readonly NavLink[] = [
  { href: ROUTES.DASHBOARD.METRICS, label: 'Metrics', icon: LayoutDashboard },
  { href: ROUTES.DASHBOARD.SETTINGS, label: 'Settings', icon: Settings },
] as const;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;
