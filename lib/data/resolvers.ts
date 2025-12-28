import { MetricTrend, Metric } from '../types/metrics';
import { unstable_cache } from 'next/cache';
import { mockMetrics } from './mock-data';
import { METRIC_FILTERS } from '@/app/constants';
import { API_CONFIG } from './config';

export type SummaryMetric = Metric & { summaryLabel?: string };
export type TableMetric = Omit<Metric, 'contributorsData'>;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const simulateRandomFailure = () => {
  if (process.env.NODE_ENV === 'development') return;
  if (Math.random() < API_CONFIG.FAILURE_RATE) {
    throw new Error('Simulated random API failure');
  }
};

// --- API Resolvers ---

export const getMetricById = (metricId: string) =>
  unstable_cache(
    async () => {
      simulateRandomFailure();
      await delay(API_CONFIG.DELAYS.METRIC_DETAIL);
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
    [API_CONFIG.CACHE_KEYS.DETAIL, metricId],
    {
      revalidate: API_CONFIG.CACHE_TTL.DETAIL,
      tags: [`metric-${metricId}`, API_CONFIG.TAGS.METRICS],
    }
  )();

export const getMetricContributors = (metricId: string, range: number = 7) =>
  unstable_cache(
    async () => {
      simulateRandomFailure();
      await delay(API_CONFIG.DELAYS.CONTRIBUTORS);

      const metric = mockMetrics.find((m) => m.id === metricId);
      if (!metric) return { data: [], keys: [] };

      const allContributors = metric.contributorsData;
      let displayContributors = [];

      // Logic for slicing based on range
      if (range <= 7) {
        displayContributors = allContributors.slice(-7);
      } else if (range <= 30) {
        displayContributors = allContributors.slice(-30).filter((_, i) => i % 3 === 0);
      } else {
        displayContributors = allContributors.slice(-90).filter((_, i) => i % 7 === 0);
      }

      const dynamicKeys = displayContributors?.[0]
        ? Object.keys(displayContributors[0]).filter((key) => key !== 'timestamp')
        : [];

      return { data: displayContributors, keys: dynamicKeys };
    },
    [API_CONFIG.CACHE_KEYS.CONTRIBUTORS, metricId, range.toString()],
    {
      revalidate: API_CONFIG.CACHE_TTL.DETAIL,
      tags: [`metric-${metricId}`, API_CONFIG.TAGS.CONTRIBUTORS],
    }
  )();

export const getMetricTrend = (metricId: string, grain: string = 'daily', range: number = 7) =>
  unstable_cache(
    async (): Promise<MetricTrend | null> => {
      simulateRandomFailure();
      await delay(API_CONFIG.DELAYS.TREND);

      const metric = mockMetrics.find((m) => m.id === metricId);
      if (!metric) return null;

      const rawData = metric.trendData.slice(-range);
      const aggregatedData = rawData.reduce((acc: { date: string; value: number }[], curr) => {
        const d = new Date(curr.date);
        let key: string;

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
        if (existing) existing.value += curr.value;
        else acc.push({ date: key, value: curr.value });

        return acc;
      }, []);

      return { metricId, data: aggregatedData };
    },
    [API_CONFIG.CACHE_KEYS.TREND, metricId, grain, range.toString()],
    {
      revalidate: API_CONFIG.CACHE_TTL.DETAIL,
      tags: [`metric-${metricId}`, API_CONFIG.TAGS.TRENDS],
    }
  )();

export const getSummaryMetrics = unstable_cache(
  async (): Promise<SummaryMetric[]> => {
    await delay(API_CONFIG.DELAYS.SUMMARY);
    simulateRandomFailure();
    const metrics = mockMetrics;

    if (!metrics?.length) return [];

    // Strategy: Grab best of each status
    const healthy = [...metrics]
      .filter((m) => m.status === 'healthy')
      .sort((a, b) => b.changePercent - a.changePercent)[0];
    const critical = [...metrics]
      .filter((m) => m.status === 'critical')
      .sort((a, b) => a.changePercent - b.changePercent)[0];
    const warning = [...metrics]
      .filter((m) => m.status === 'warning')
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))[0];

    const results: SummaryMetric[] = [];
    if (healthy) results.push({ ...healthy, summaryLabel: 'Best Performer' });
    if (critical) results.push({ ...critical, summaryLabel: 'Action Required' });
    if (warning) results.push({ ...warning, summaryLabel: 'Needs Attention' });

    // Fill to 3 if needed
    if (results.length < 3) {
      const ids = results.map((r) => r.id);
      const extras = metrics.filter((m) => !ids.includes(m.id)).slice(0, 3 - results.length);
      results.push(...extras);
    }

    return results.slice(0, 3).map(({ contributorsData, ...rest }) => {
      void contributorsData;
      return rest as SummaryMetric;
    });
  },

  [API_CONFIG.CACHE_KEYS.SUMMARY],
  {
    revalidate: API_CONFIG.CACHE_TTL.DETAIL,
    tags: [API_CONFIG.TAGS.SUMMARY, API_CONFIG.TAGS.METRICS],
  }
);

export const getMetrics = (filters?: { query?: string; category?: string }) => {
  const query = filters?.query || '';
  const category = filters?.category || METRIC_FILTERS.ALL;

  return unstable_cache(
    async () => {
      simulateRandomFailure();
      await delay(API_CONFIG.DELAYS.LIST);

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
        void contributorsData;
        return rest;
      });
    },
    [API_CONFIG.CACHE_KEYS.LIST, query, category],
    {
      revalidate: API_CONFIG.CACHE_TTL.LIST,
      tags: [API_CONFIG.TAGS.METRICS, `query-${query}`, `category-${category}`],
    }
  )();
};
