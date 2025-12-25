import { Metric, MetricContributor } from '../types/metrics';

export const mockMetrics: Metric[] = [
  {
    id: '1',
    name: 'Revenue',
    value: 150000,
    unit: 'USD',
    trend: 'up',
    lastUpdated: new Date('2023-10-01'),
  },
  {
    id: '2',
    name: 'Users',
    value: 5000,
    unit: 'count',
    trend: 'stable',
    lastUpdated: new Date('2023-10-01'),
  },
  {
    id: '3',
    name: 'Conversion Rate',
    value: 3.5,
    unit: '%',
    trend: 'down',
    lastUpdated: new Date('2023-10-01'),
  },
];

export const mockContributors: MetricContributor[] = [
  {
    id: '1',
    name: 'Marketing Campaign',
    contribution: 40,
  },
  {
    id: '2',
    name: 'Product Updates',
    contribution: 30,
  },
  {
    id: '3',
    name: 'Customer Support',
    contribution: 30,
  },
];
