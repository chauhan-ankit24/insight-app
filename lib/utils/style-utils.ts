import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { METRIC_STATUS, METRIC_TRENDS } from '@/app/constants';
import { MetricStatus, MetricTrends } from '../types/metrics';

export function getTrendStyles(trend: MetricTrends = METRIC_TRENDS.NEUTRAL) {
  const config = {
    [METRIC_TRENDS.UP]: {
      bg: 'bg-success/10',
      border: 'border-success',
      text: 'text-success',
      icon: ArrowUpRight,
    },
    [METRIC_TRENDS.DOWN]: {
      bg: 'bg-destructive/10',
      border: 'border-destructive',
      text: 'text-destructive',
      icon: ArrowDownRight,
    },
    [METRIC_TRENDS.NEUTRAL]: {
      bg: 'bg-warning/10',
      border: 'border-warning',
      text: 'text-warning',
      icon: Minus,
    },
    [METRIC_TRENDS.VOLATILE]: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500',
      text: 'text-orange-500',
      icon: Minus,
    },
  };

  return config[trend];
}

export function getStatusStyles(status: MetricStatus = METRIC_STATUS.HEALTHY) {
  const config = {
    [METRIC_STATUS.HEALTHY]: {
      bg: 'bg-success',
      pill: 'bg-success/10 text-success border-success/20',
      text: 'Healthy',
      ring: 'ring-success',
    },
    [METRIC_STATUS.WARNING]: {
      bg: 'bg-warning',
      pill: 'bg-warning text-warning-foreground border-warning',
      text: 'Warning',
      ring: 'ring-warning',
    },
    [METRIC_STATUS.CRITICAL]: {
      bg: 'bg-destructive',
      pill: 'bg-destructive/10 text-destructive border-destructive/20',
      text: 'Critical',
      ring: 'ring-destructive',
    },
  };

  return config[status];
}

export function getStatusColor(status: MetricStatus = METRIC_STATUS.HEALTHY) {
  const colors = {
    [METRIC_STATUS.HEALTHY]: 'var(--success)',
    [METRIC_STATUS.WARNING]: 'var(--warning)',
    [METRIC_STATUS.CRITICAL]: 'var(--destructive)',
  };

  return `hsl(${colors[status]})`;
}

export const CHART_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--chart-cyan))',
  'hsl(var(--success))',
  'hsl(var(--warning))',
  'hsl(var(--chart-violet))',
  'hsl(var(--chart-sky))',
  'hsl(var(--destructive))',
] as const;

export const getIndexedChartStyle = (index: number) => {
  const baseColor = CHART_COLORS[index % CHART_COLORS.length];

  const opacity = index >= CHART_COLORS.length ? 0.6 : 1;

  return {
    color: baseColor,
    opacity,
    rgba: baseColor.replace(')', `, ${opacity})`).replace('hsl', 'hsla'),
  };
};

export const resolveEntryColor = (color: string | undefined, index: number, totalKeys: number) => {
  if (color && !color.includes('url')) {
    return color;
  }

  const reversedIndex = (totalKeys - 1 - index) % CHART_COLORS.length;

  const safeIndex = Math.abs(reversedIndex);

  return CHART_COLORS[safeIndex];
};
