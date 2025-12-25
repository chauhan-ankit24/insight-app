import { MetricTrend, MetricContributor } from '../types/metrics';
import { mockMetrics, mockContributors } from './mock-data';

export function getMetricTrend(metricId: string): MetricTrend | null {
  // Mock implementation: return sample trend data
  const metric = mockMetrics.find((m) => m.id === metricId);
  if (!metric) return null;

  // Generate sample trend data
  const data = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    data.push({
      date,
      value: metric.value + Math.random() * 10000 - 5000, // Random variation
    });
  }

  return {
    metricId,
    data,
  };
}

export function getMetricContributors(metricId: string): MetricContributor[] {
  // Mock implementation: return sample contributors
  return mockContributors;
}
