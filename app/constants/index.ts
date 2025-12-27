import { MetricFilter } from '@/lib/types/metrics';

export const METRIC_FILTERS: Record<string, MetricFilter> = {
  ALL: 'all',
  TOP: 'top',
  UNDER: 'under',
  CRITICAL: 'critical',
} as const;

export const METRIC_TRENDS = {
  UP: 'up',
  DOWN: 'down',
  NEUTRAL: 'neutral',
} as const;

export const METRIC_STATUS = {
  HEALTHY: 'healthy',
  WARNING: 'warning',
  CRITICAL: 'critical',
} as const;

export const DATA_GRAINS = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
} as const;

export const DATA_RANGES = {
  '7D': '7',
  '30D': '30',
  '90D': '90',
} as const;
