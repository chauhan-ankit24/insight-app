import { Metric, MetricContributor } from '../types/metrics';

export const mockMetrics: Metric[] = [
  {
    id: 'revenue',
    name: 'Total Revenue',
    description: 'Gross revenue generated across all subscription tiers and add-ons.',
    value: 1250000,
    // targetValue: 1500000, // Goal for the quarter
    unit: 'USD',
    type: 'CUSTOM',
    category: 'Finance',
    status: 'healthy',
    changePercent: 12.5,
    lastUpdated: '2025-12-26T09:45:00Z',
    trend: 'up',
    // isInverse: false, // Up is good
    sparklineData: [1120000, 1150000, 1145000, 1190000, 1210000, 1250000],
    contributorKeys: ['Enterprise', 'Pro', 'Basic', 'Consulting'],
    contributorsData: [
      { period: 'Q1', Enterprise: 450000, Pro: 300000, Basic: 150000, Consulting: 50000 },
      { period: 'Q2', Enterprise: 480000, Pro: 320000, Basic: 160000, Consulting: 55000 },
      { period: 'Q3', Enterprise: 520000, Pro: 340000, Basic: 170000, Consulting: 60000 },
      { period: 'Q4', Enterprise: 600000, Pro: 400000, Basic: 200000, Consulting: 50000 },
    ],
  },
  {
    id: 'nps',
    name: 'Net Promoter Score',
    description: 'Customer satisfaction based on survey responses (Promoters - Detractors).',
    value: 68,
    // targetValue: 75,
    unit: 'score',
    type: 'SIMPLE',
    category: 'Product',
    status: 'warning',
    changePercent: -4.2,
    lastUpdated: '2025-12-26T08:00:00Z',
    trend: 'down',
    // isInverse: false,
    sparklineData: [72, 74, 73, 70, 69, 68],
    contributorKeys: ['Promoters', 'Passives', 'Detractors'],
    contributorsData: [
      { period: 'Aug', Promoters: 70, Passives: 20, Detractors: 10 },
      { period: 'Sep', Promoters: 72, Passives: 18, Detractors: 10 },
      { period: 'Oct', Promoters: 68, Passives: 22, Detractors: 10 },
      { period: 'Nov', Promoters: 65, Passives: 25, Detractors: 10 },
    ],
  },
  {
    id: 'churn-rate',
    name: 'Customer Churn',
    description: 'Percentage of customers who cancelled their subscription this month.',
    value: 2.1,
    // targetValue: 1.5,
    unit: '%',
    type: 'SIMPLE',
    category: 'Finance',
    status: 'critical', // High churn is bad
    changePercent: 15.8, // Increased by 15% (Bad)
    lastUpdated: '2025-12-26T10:15:00Z',
    trend: 'up', // Going up is bad here
    // isInverse: true, // Higher value = Worse status
    sparklineData: [1.2, 1.4, 1.3, 1.8, 1.9, 2.1],
    contributorKeys: ['Voluntary', 'Delinquent', 'Technical Issues'],
    contributorsData: [
      { period: 'Week 1', Voluntary: 0.5, Delinquent: 0.3, 'Technical Issues': 0.1 },
      { period: 'Week 2', Voluntary: 0.6, Delinquent: 0.2, 'Technical Issues': 0.2 },
      { period: 'Week 3', Voluntary: 0.8, Delinquent: 0.4, 'Technical Issues': 0.4 },
      { period: 'Week 4', Voluntary: 0.9, Delinquent: 0.5, 'Technical Issues': 0.7 },
    ],
  },
  {
    id: 'infrastructure-cost',
    name: 'Cloud Infrastructure',
    description: 'Monthly spend on AWS, Vercel, and Database hosting.',
    value: 42500,
    // targetValue: 45000,
    unit: 'USD',
    type: 'SIMPLE',
    category: 'Finance',
    status: 'healthy',
    changePercent: -2.4, // We saved money
    lastUpdated: '2025-12-25T23:59:59Z',
    trend: 'down',
    // isInverse: true, // Lower is better
    sparklineData: [45000, 44500, 44000, 43500, 43000, 42500],
    contributorKeys: ['EC2', 'RDS', 'S3', 'Lambda'],
    contributorsData: [
      { period: 'Oct', EC2: 25000, RDS: 10000, S3: 5000, Lambda: 5000 },
      { period: 'Nov', EC2: 23000, RDS: 11000, S3: 6000, Lambda: 4500 },
      { period: 'Dec', EC2: 20000, RDS: 12000, S3: 7000, Lambda: 3500 },
    ],
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
