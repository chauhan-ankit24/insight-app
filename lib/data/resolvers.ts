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
    contributorKeys: ['Channel A', 'Channel B', 'Channel C'],
    contributorsData: [
      { period: 'Jan', 'Channel A': 1000, 'Channel B': 800, 'Channel C': 600 },
      { period: 'Feb', 'Channel A': 1200, 'Channel B': 900, 'Channel C': 700 },
      { period: 'Mar', 'Channel A': 1100, 'Channel B': 1000, 'Channel C': 800 },
      { period: 'Apr', 'Channel A': 1300, 'Channel B': 1100, 'Channel C': 900 },
      { period: 'May', 'Channel A': 1400, 'Channel B': 1200, 'Channel C': 1000 },
      { period: 'Jun', 'Channel A': 1500, 'Channel B': 1300, 'Channel C': 1100 },
    ],
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

export async function getMetricContributors(): Promise<MetricContributor[]> {
  // Mock implementation: return sample contributors
  return mockContributors;
}
