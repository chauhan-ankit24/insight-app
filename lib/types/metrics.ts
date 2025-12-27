import { DATA_GRAINS, DATA_RANGES, METRIC_STATUS, METRIC_TRENDS } from '@/app/constants';
import { THEMES } from '@/app/constants/routes';
import { LucideIcon } from 'lucide-react';

export type ContributorSnapshot = {
  timestamp: string;
  [key: string]: string | number;
};

export type Point = {
  date: Date;
  value: number;
};

export interface Metric {
  id: string;
  name: string;
  description: string;
  value: number;
  unit: string;
  type: 'CUSTOM' | 'SIMPLE';
  category: 'Marketing' | 'Finance' | 'Product' | 'Operations' | 'Sales';
  status: MetricStatus;
  changePercent: number;
  lastUpdated: string;
  trend: Trend;
  sparklineData: number[];
  contributorKeys: string[];
  contributorsData: ContributorSnapshot[];
  trendData: Point[];
}

export interface MetricTrend {
  metricId: string;
  data: {
    date: string;
    value: number;
  }[];
}
export interface MetricTrendPoint {
  date: string;
  label: string;
  [key: string]: string | number;
}
export interface MetricContributor {
  id: string;
  name: string;
  contribution: number;
}

export interface MetricTrendResponse {
  metricId: string;
  grain: DataGrain;
  range: DataRange;
  data: MetricTrendPoint[];
}

export interface NavLink {
  readonly href: string;
  readonly label: string;
  readonly icon: LucideIcon;
}

export type MetricFilter = 'all' | 'top' | 'under' | 'critical';

export type Trend = 'up' | 'down' | 'neutral';

export type MetricTrends = (typeof METRIC_TRENDS)[keyof typeof METRIC_TRENDS];

export type MetricStatus = (typeof METRIC_STATUS)[keyof typeof METRIC_STATUS];

export type DataGrain = (typeof DATA_GRAINS)[keyof typeof DATA_GRAINS];

export type DataRange = (typeof DATA_RANGES)[keyof typeof DATA_RANGES];

export type ThemeValue = (typeof THEMES)[keyof typeof THEMES];
