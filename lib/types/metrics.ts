export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
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
