import { MetricTrend, Metric } from '../types/metrics';

export type SummaryMetric = Metric & { summaryLabel?: string };
import { mockMetrics } from './mock-data';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate fetching a metric by its ID API
export async function getMetricById(metricId: string) {
  await delay(800);
  const metric = mockMetrics.find((m) => m.id === metricId);

  if (!metric) throw new Error('Metric not found');

  const {
    trendData,
    sparklineData,
    contributorKeys,
    contributorsData,
    changePercent,
    value,
    ...lightMetric
  } = metric;

  void trendData;
  void sparklineData;
  void contributorKeys;
  void contributorsData;
  void changePercent;
  void value;

  return lightMetric;
}

// Simulate fetching metric contributors API
export async function getMetricContributors(metricId: string, range: number = 7) {
  await delay(900);

  const metric = mockMetrics.find((m) => m.id === metricId);
  if (!metric) return { data: [], keys: [] };

  const allContributors = metric.contributorsData;

  let displayContributors = [];

  if (range <= 7) {
    displayContributors = allContributors.slice(-7);
  } else if (range <= 30) {
    displayContributors = allContributors.slice(-30).filter((_, i) => i % 3 === 0);
  } else {
    displayContributors = allContributors.slice(-90).filter((_, i) => i % 7 === 0);
  }

  const dynamicKeys =
    displayContributors?.length > 0
      ? Object.keys(displayContributors[0]).filter((key) => key !== 'timestamp')
      : [];

  return {
    data: displayContributors,
    keys: dynamicKeys,
  };
}

// Simulate fetching metric trend data API
export async function getMetricTrend(
  metricId: string,
  grain: string = 'daily',
  range: number = 7
): Promise<MetricTrend | null> {
  const metric = mockMetrics.find((m) => m.id === metricId);
  if (!metric) return null;

  const rawData = metric.trendData.slice(-range);

  const aggregatedData = rawData.reduce((acc: { date: string; value: number }[], curr) => {
    let key: string;
    const d = new Date(curr.date);

    if (grain === 'weekly') {
      const startOfYear = new Date(d.getFullYear(), 0, 1);
      const week = Math.ceil(
        ((d.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7
      );
      key = `Week ${week}, ${d.getFullYear()}`;
    } else if (grain === 'monthly') {
      key = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } else {
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

export async function getSummaryMetrics(): Promise<SummaryMetric[]> {
  await delay(1000);
  const metrics = mockMetrics;

  if (!metrics || metrics?.length === 0) return [];

  const healthyMetric = [...metrics]
    .filter((m) => m.status === 'healthy')
    .sort((a, b) => b.changePercent - a.changePercent)[0];

  const criticalMetric = [...metrics]
    .filter((m) => m.status === 'critical')
    .sort((a, b) => a.changePercent - b.changePercent)[0];

  const warningMetric = [...metrics]
    .filter((m) => m.status === 'warning')
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))[0];

  const rawResults: SummaryMetric[] = [];

  if (healthyMetric) rawResults.push({ ...healthyMetric, summaryLabel: 'Best Performer' });
  if (criticalMetric) rawResults.push({ ...criticalMetric, summaryLabel: 'Action Required' });
  if (warningMetric) rawResults.push({ ...warningMetric, summaryLabel: 'Needs Attention' });

  if (rawResults?.length < 3) {
    const usedIds = rawResults?.map((r) => r.id);
    const remaining = metrics.filter((m) => !usedIds.includes(m.id));
    rawResults.push(...remaining.slice(0, 3 - rawResults?.length));
  }

  return rawResults.slice(0, 3)?.map(({ contributorsData, ...rest }) => {
    void contributorsData;
    return rest as SummaryMetric;
  });
}

// Simulate fetching all metrics for the table view API
export async function getMetrics(): Promise<Metric[]> {
  await delay(1200);

  const metrics = mockMetrics;

  if (!metrics) return [];

  return metrics;
}
