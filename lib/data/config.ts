export const API_CONFIG = {
  DELAYS: {
    METRIC_DETAIL: 800,
    CONTRIBUTORS: 900,
    TREND: 500,
    SUMMARY: 1000,
    LIST: 800,
  },
  CACHE_TTL: {
    DETAIL: 3600,
    LIST: 600,
  },
  CACHE_KEYS: {
    DETAIL: 'metric-detail',
    CONTRIBUTORS: 'metric-contributors',
    TREND: 'metric-trend',
    SUMMARY: 'summary-metrics',
    LIST: 'metrics-list',
  },
  TAGS: {
    METRICS: 'metrics',
    CONTRIBUTORS: 'contributors',
    TRENDS: 'trends',
    SUMMARY: 'summary-metrics',
  },
  FAILURE_RATE: 0.1,
} as const;
