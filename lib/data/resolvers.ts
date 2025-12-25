import { Metric, MetricTrend, MetricContributor } from '../types/metrics';
import { mockMetrics, mockContributors } from './mock-data';

export function getMetricById(metricId: string): Metric | null {
  const metric = mockMetrics.find((m) => m.id === metricId);
  if (metric) return metric;

  // Return a default metric if not found
  return {
    id: metricId,
    name: 'Unknown Metric',
    description: 'This metric was not found in the data.',
    value: 0,
    unit: 'N/A',
    type: 'SIMPLE',
    category: 'Product',
    status: 'critical',
    changePercent: 0,
    lastUpdated: new Date().toISOString(),
    trend: 'neutral',
    sparklineData: [],
  };
}

export async function getMetricTrend(
  metricId: string,
  grain: string,
  range: number
): Promise<MetricTrend | null> {
  await new Promise((r) => setTimeout(r, 1000)); // Simulate delay

  const metric = mockMetrics.find((m) => m.id === metricId);
  if (!metric) {
    // Return default trend data if metric not found
    const data = [];
    for (let i = 0; i < range; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (range - 1 - i));
      data.push({
        date,
        value: Math.random() * 10000, // Random variation
      });
    }
    return {
      metricId,
      data,
    };
  }

  // Generate sample trend data based on range
  const data = [];
  for (let i = 0; i < range; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (range - 1 - i));
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

export async function getMetricContributors(metricId: string): Promise<MetricContributor[]> {
  // Mock implementation: return sample contributors
  return mockContributors;
}
