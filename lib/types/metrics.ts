export type ContributorSnapshot = {
  timestamp: string;
  [key: string]: string | number;
};

export interface Metric {
  id: string;
  name: string;
  description: string;
  value: number;
  unit: string;
  type: 'CUSTOM' | 'SIMPLE';
  category: 'Marketing' | 'Finance' | 'Product' | 'Operations' | 'Sales';
  status: 'healthy' | 'warning' | 'critical';
  changePercent: number;
  lastUpdated: string;
  trend: 'up' | 'down' | 'neutral';
  sparklineData: number[];
  contributorKeys: string[];
  contributorsData: ContributorSnapshot[];
  trendData: { date: Date; value: number }[];
}

export interface MetricTrend {
  metricId: string;
  data: { date: string; value: number }[];
}
export interface MetricTrendPoint {
  date: string; // ISO string for sorting/formatting
  label: string; // e.g. "Jan", "Feb" or "Week 1"
  [key: string]: string | number; // This allows dynamic keys like { date: '...', label: 'Jan', Wheat: 10, Barley: 5 }
}
export interface MetricContributor {
  id: string;
  name: string;
  contribution: number;
}

export interface MetricTrendResponse {
  metricId: string;
  grain: 'daily' | 'weekly' | 'monthly';
  range: number;
  data: MetricTrendPoint[];
}
