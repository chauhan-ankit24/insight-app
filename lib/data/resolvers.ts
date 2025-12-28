import { MetricTrend, Metric } from '../types/metrics';
import { unstable_cache } from 'next/cache';

export type SummaryMetric = Metric & { summaryLabel?: string };
export type TableMetric = Omit<Metric, 'contributorsData'>;
import { mockMetrics } from './mock-data';
import { METRIC_FILTERS } from '@/app/constants';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate fetching a metric by its ID API
export const getMetricById = (metricId: string) =>
  unstable_cache(
    async () => {
      await delay(800);
      const metric = mockMetrics.find((m) => m.id === metricId);

      if (!metric) return null;

      const { trendData, contributorKeys, contributorsData, changePercent, value, ...lightMetric } =
        metric;

      void trendData;
      void contributorKeys;
      void contributorsData;
      void changePercent;
      void value;

      return lightMetric;
    },
    ['metric-detail', metricId],
    {
      revalidate: 3600,
      tags: [`metric-${metricId}`, 'metrics'],
    }
  )();

// Simulate fetching metric contributors API
export const getMetricContributors = (metricId: string, range: number = 7) =>
  unstable_cache(
    async () => {
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
    },
    ['metric-contributors', metricId, range.toString()],
    {
      revalidate: 3600,
      tags: [`metric-${metricId}`, 'contributors', 'metrics'],
    }
  )();

// Simulate fetching metric trend data API
export const getMetricTrend = (metricId: string, grain: string = 'daily', range: number = 7) =>
  unstable_cache(
    async (): Promise<MetricTrend | null> => {
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
    },
    ['metric-trend', metricId, grain, range.toString()],
    {
      revalidate: 3600,
      tags: [`metric-${metricId}`, 'trends'],
    }
  )();

// Simulate fetching summary cards metric API
export const getSummaryMetrics = unstable_cache(
  async (): Promise<SummaryMetric[]> => {
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
  },
  ['metric-detail'],
  {
    revalidate: 3600,
    tags: ['summary-metrics', 'metrics'],
  }
);

// Simulate fetching all metrics for the table view API
export const getMetrics = (filters?: { query?: string; category?: string }) => {
  const query = filters?.query || '';
  const category = filters?.category || METRIC_FILTERS.ALL;

  return unstable_cache(
    async () => {
      await delay(800);

      let filtered = [...mockMetrics];

      if (query) {
        const lowQ = query.toLowerCase();
        filtered = filtered.filter(
          (m) => m.name.toLowerCase().includes(lowQ) || m.description?.toLowerCase().includes(lowQ)
        );
      }

      if (category !== METRIC_FILTERS.ALL) {
        if (category === METRIC_FILTERS.TOP) filtered = filtered.filter((m) => m.changePercent > 0);
        else if (category === METRIC_FILTERS.UNDER)
          filtered = filtered.filter((m) => m.changePercent < 0);
        else if (category === METRIC_FILTERS.CRITICAL)
          filtered = filtered.filter((m) => m.status === METRIC_FILTERS.CRITICAL);
        else filtered = filtered.filter((m) => m.category === category);
      }

      return filtered.map(({ contributorsData, ...rest }) => {
        // void trendData;
        void contributorsData;
        return rest;
      });
    },
    ['metrics-list', query, category],
    {
      revalidate: 600,
      tags: ['metrics', `query-${query}`, `category-${category}`],
    }
  )();
};
