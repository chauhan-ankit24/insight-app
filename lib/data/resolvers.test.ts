import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockMetrics } from './mock-data';

// Mock Next.js unstable_cache to just return the function directly
vi.mock('next/cache', () => ({
  unstable_cache: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
}));

import {
  getMetricById,
  getMetricContributors,
  getMetricTrend,
  getSummaryMetrics,
  getMetrics,
  type SummaryMetric,
  type TableMetric,
} from './resolvers';

describe('Metrics Resolve Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getMetricById', () => {
    it('should return a metric when valid ID provided', async () => {
      const metricId = mockMetrics[0].id;
      const result = await getMetricById(metricId);

      expect(result).toBeDefined();
      expect(result.id).toBe(metricId);
      expect(result.name).toBeDefined();
    });

    it('should throw error for invalid metric ID', async () => {
      await expect(getMetricById('invalid-id')).rejects.toThrow('Metric not found');
    });

    it('should not include heavy data fields', async () => {
      const result = await getMetricById(mockMetrics[0].id);

      expect(result).not.toHaveProperty('trendData');
      expect(result).not.toHaveProperty('contributorsData');
    });
  });

  describe('getMetricContributors', () => {
    it('should return contributor data structure', async () => {
      const result = await getMetricContributors(mockMetrics[0].id, 7);

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('keys');
      expect(Array.isArray(result.data)).toBe(true);
      expect(Array.isArray(result.keys)).toBe(true);
    });

    it('should return empty data for invalid metric', async () => {
      const result = await getMetricContributors('invalid-id');

      expect(result.data).toEqual([]);
      expect(result.keys).toEqual([]);
    });
  });

  describe('getMetricTrend', () => {
    it('should return trend data with correct structure', async () => {
      const metricId = mockMetrics[0].id;
      const result = await getMetricTrend(metricId, 'daily', 7);

      expect(result).toBeDefined();
      expect(result?.metricId).toBe(metricId);
      expect(result?.data).toBeDefined();
      expect(Array.isArray(result?.data)).toBe(true);
    });

    it('should return null for invalid metric', async () => {
      const result = await getMetricTrend('invalid-id');

      expect(result).toBeNull();
    });

    it('should have date and value in data items', async () => {
      const result = await getMetricTrend(mockMetrics[0].id, 'daily', 7);

      if (result && result.data.length > 0) {
        expect(result.data[0]).toHaveProperty('date');
        expect(result.data[0]).toHaveProperty('value');
      }
    });
  });

  describe('getSummaryMetrics', () => {
    it('should return an array of metrics', async () => {
      const result = await getSummaryMetrics();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThanOrEqual(3);
    });

    it('should not include contributorsData', async () => {
      const result = await getSummaryMetrics();

      result.forEach((metric: SummaryMetric) => {
        expect(metric).not.toHaveProperty('contributorsData');
      });
    });

    it('should have basic metric properties', async () => {
      const result = await getSummaryMetrics();

      result.forEach((metric: SummaryMetric) => {
        expect(metric).toHaveProperty('id');
        expect(metric).toHaveProperty('name');
        expect(metric).toHaveProperty('status');
      });
    });
  });

  describe('getMetrics', () => {
    it('should return all metrics without filters', async () => {
      const result = await getMetrics();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should filter by search query', async () => {
      const searchTerm = mockMetrics[0].name.substring(0, 5).toLowerCase();
      const result = await getMetrics({ query: searchTerm });

      expect(Array.isArray(result)).toBe(true);

      result.forEach((metric: TableMetric) => {
        const matchesName = metric.name.toLowerCase().includes(searchTerm);
        const matchesDescription = metric.description?.toLowerCase().includes(searchTerm);
        expect(matchesName || matchesDescription).toBe(true);
      });
    });

    it('should filter by category "top"', async () => {
      const result = await getMetrics({ category: 'top' });

      result.forEach((metric: TableMetric) => {
        expect(metric.changePercent).toBeGreaterThan(0);
      });
    });

    it('should not include heavy fields', async () => {
      const result = await getMetrics();

      result.forEach((metric: TableMetric) => {
        expect(metric).not.toHaveProperty('trendData');
        expect(metric).not.toHaveProperty('contributorsData');
      });
    });

    it('should have required metric properties', async () => {
      const result = await getMetrics();

      result.forEach((metric: TableMetric) => {
        expect(metric).toHaveProperty('id');
        expect(metric).toHaveProperty('name');
        expect(metric).toHaveProperty('status');
        expect(metric).toHaveProperty('changePercent');
      });
    });
  });
});
