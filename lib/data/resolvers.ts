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
      { timestamp: 'Jan', 'Channel A': 1000, 'Channel B': 800, 'Channel C': 600 },
      { timestamp: 'Feb', 'Channel A': 1200, 'Channel B': 900, 'Channel C': 700 },
      { timestamp: 'Mar', 'Channel A': 1100, 'Channel B': 1000, 'Channel C': 800 },
      { timestamp: 'Apr', 'Channel A': 1300, 'Channel B': 1100, 'Channel C': 900 },
      { timestamp: 'May', 'Channel A': 1400, 'Channel B': 1200, 'Channel C': 1000 },
      { timestamp: 'Jun', 'Channel A': 1500, 'Channel B': 1300, 'Channel C': 1100 },
    ],
    trendData: [],
  };
}

export async function getMetricTrend(
  metricId: string,
  grain: string = 'daily',
  range: number = 30
): Promise<MetricTrend | null> {
  const metric = mockMetrics.find((m) => m.id === metricId);
  if (!metric) return null;

  // 1. Slice by Range first (get the raw daily data)
  const rawData = metric.trendData.slice(-range);

  // 2. Aggregate by Grain
  const aggregatedData = rawData.reduce((acc: { date: string; value: number }[], curr) => {
    let key: string;
    const d = new Date(curr.date);

    if (grain === 'weekly') {
      // Group by Year + Week Number
      const startOfYear = new Date(d.getFullYear(), 0, 1);
      const week = Math.ceil(
        ((d.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7
      );
      key = `Week ${week}, ${d.getFullYear()}`;
    } else if (grain === 'monthly') {
      // Group by Month Name + Year
      key = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } else {
      // Default: Daily
      key = d.toISOString();
    }

    const existing = acc.find((item) => item.date === key);
    if (existing) {
      existing.value += curr.value;
    } else {
      acc.push({ date: key, value: curr.value });
    }
    return acc;
  }, []);

  return {
    metricId,
    data: aggregatedData,
  };
}

export async function getMetricContributors(): Promise<MetricContributor[]> {
  // Mock implementation: return sample contributors
  return mockContributors;
}
