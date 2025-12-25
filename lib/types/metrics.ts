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
}

export interface MetricTrend {
  metricId: string;
  data: { date: Date; value: number }[];
}

export interface MetricContributor {
  id: string;
  name: string;
  contribution: number;
}
