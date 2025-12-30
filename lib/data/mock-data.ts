import {
  METRIC_CATEGORIES,
  METRIC_STATUS,
  METRIC_TRENDS,
  METRIC_TYPES,
  METRIC_UNITS,
} from '@/app/constants';
import { Metric, ContributorSnapshot, Trend } from '../types/metrics';

const generateTrendData = (days: number, startValue: number, trend: Trend) => {
  const data = [];
  const today = new Date();
  let currentValue = startValue;

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // 1. INCREASE BIAS: General direction force
    // We increase this to 2-3% to ensure the line actually travels up or down
    let bias = 0;
    if (trend === METRIC_TRENDS.UP) bias = currentValue * (Math.random() * 0.04);
    if (trend === METRIC_TRENDS.DOWN) bias = -currentValue * (Math.random() * 0.03);
    if (trend === METRIC_TRENDS.VOLATILE) bias = (Math.random() - 0.5) * (currentValue * 0.08);

    // 2. BIGGER NOISE: Daily "jitter"
    // Increased to 5% variance to prevent flat-looking segments
    const noise = (Math.random() - 0.5) * (currentValue * 0.1);

    // 3. AGGRESSIVE SPIKES: Occasional 15% jumps/drops
    const isSpike = Math.random() > 0.85; // 15% chance per day
    const spikeFactor = isSpike ? (Math.random() - 0.5) * (currentValue * 0.3) : 0;

    // 4. Update and clamp
    currentValue = currentValue + bias + noise + spikeFactor;

    // Prevent the data from hitting zero or staying too flat
    const floor = startValue * 0.2;
    if (currentValue < floor) currentValue = floor + Math.random() * floor;

    data.push({
      date,
      value: Math.floor(currentValue),
    });
  }
  return data;
};

export const generateDailyContributors = (
  days: number,
  keys: string[],
  totalValue: number
): ContributorSnapshot[] => {
  const data: ContributorSnapshot[] = [];
  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dayEntry: ContributorSnapshot = { timestamp: date.toISOString() };
    let remaining = totalValue + (Math.random() - 0.5) * (totalValue * 0.2);

    // Distribute the total among keys
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        dayEntry[key] = Math.max(0, Math.floor(remaining));
      } else {
        const portion = Math.random() * (remaining / (keys.length - index));
        dayEntry[key] = Math.max(0, Math.floor(portion));
        remaining -= portion;
      }
    });

    data.push(dayEntry);
  }
  return data;
};

export const mockMetrics: Metric[] = [
  {
    id: 'avg-ticket-size',
    name: 'Avg. Ticket Size',
    description: 'Average order value generated per customer transaction.',
    value: 148.5,
    unit: METRIC_UNITS.USD,
    type: METRIC_TYPES.SIMPLE,
    category: METRIC_CATEGORIES.FINANCE,
    status: METRIC_STATUS.HEALTHY,
    changePercent: 3.1,
    lastUpdated: new Date().toISOString(),
    trend: METRIC_TRENDS.UP,
    contributorKeys: ['New Customers', 'Returning Customers'],
    contributorsData: generateDailyContributors(90, ['New Customers', 'Returning Customers'], 100),
    trendData: generateTrendData(90, 140, METRIC_TRENDS.UP),
  },
  {
    id: 'conversion-rate',
    name: 'Conversion Rate',
    description: 'Percentage of unique visitors who completed a checkout.',
    value: 3.24,
    unit: METRIC_UNITS.PERCENT,
    type: METRIC_TYPES.SIMPLE,
    category: METRIC_CATEGORIES.SALES,
    status: METRIC_STATUS.WARNING,
    changePercent: -2.1,
    lastUpdated: new Date().toISOString(),
    trend: METRIC_TRENDS.DOWN,
    contributorKeys: ['Organic', 'Paid Search', 'Email', 'Direct'],
    contributorsData: generateDailyContributors(
      90,
      ['Organic', 'Paid Search', 'Email', 'Direct'],
      5
    ),
    trendData: generateTrendData(90, 3500, METRIC_TRENDS.DOWN),
  },
  {
    id: 'revenue',
    name: 'Total Revenue',
    description: 'Gross revenue generated across all subscription tiers and add-ons.',
    value: 125430,
    unit: METRIC_UNITS.USD,
    type: METRIC_TYPES.CUSTOM,
    category: METRIC_CATEGORIES.FINANCE,
    status: METRIC_STATUS.HEALTHY,
    changePercent: 12.5,
    lastUpdated: new Date().toISOString(),
    trend: METRIC_TRENDS.UP,
    contributorKeys: ['Enterprise', 'Pro', 'Basic', 'Consulting', 'Add-ons'],
    contributorsData: generateDailyContributors(
      90,
      ['Enterprise', 'Pro', 'Basic', 'Consulting', 'Add-ons'],
      50000
    ),
    trendData: generateTrendData(90, 110000, METRIC_TRENDS.UP),
  },
  {
    id: 'churn-rate',
    name: 'Customer Churn',
    description: 'Percentage of customers who cancelled their subscription.',
    value: 2.15,
    unit: METRIC_UNITS.PERCENT,
    type: METRIC_TYPES.SIMPLE,
    category: METRIC_CATEGORIES.FINANCE,
    status: METRIC_STATUS.CRITICAL,
    changePercent: -15.8,
    lastUpdated: new Date().toISOString(),
    trend: METRIC_TRENDS.DOWN,
    contributorKeys: ['Voluntary', 'Delinquent', 'Technical', 'Product Gap'],
    contributorsData: generateDailyContributors(
      90,
      ['Voluntary', 'Delinquent', 'Technical', 'Product Gap'],
      200
    ),
    trendData: generateTrendData(90, 158900, METRIC_TRENDS.DOWN),
  },
  {
    id: 'orders',
    name: 'Total Orders',
    description: 'Number of successful transactions processed in the current period.',
    value: 8432,
    unit: METRIC_UNITS.NUMBER,
    type: METRIC_TYPES.SIMPLE,
    category: METRIC_CATEGORIES.SALES,
    status: METRIC_STATUS.HEALTHY,
    changePercent: 8.2,
    lastUpdated: new Date().toISOString(),
    trend: METRIC_TRENDS.UP,
    contributorKeys: ['Direct', 'Referral', 'Social', 'Affiliate'],
    contributorsData: generateDailyContributors(
      90,
      ['Direct', 'Referral', 'Social', 'Affiliate'],
      3000
    ),
    trendData: generateTrendData(90, 70080, METRIC_TRENDS.UP),
  },
  {
    id: 'active-users',
    name: 'Active Users',
    description: 'Daily active users (DAU) currently interacting with the platform.',
    value: 42150,
    unit: METRIC_UNITS.NUMBER,
    type: METRIC_TYPES.SIMPLE,
    category: METRIC_CATEGORIES.PRODUCT,
    status: METRIC_STATUS.HEALTHY,
    changePercent: 5.4,
    lastUpdated: new Date().toISOString(),
    trend: METRIC_TRENDS.UP,
    contributorKeys: ['Web', 'iOS', 'Android', 'Desktop'],
    contributorsData: generateDailyContributors(90, ['Web', 'iOS', 'Android', 'Desktop'], 15000),
    trendData: generateTrendData(90, 35000, METRIC_TRENDS.UP),
  },
  {
    id: 'nps',
    name: 'Net Promoter Score',
    description: 'Customer satisfaction based on survey responses.',
    value: 68,
    unit: METRIC_UNITS.NUMBER,
    type: METRIC_TYPES.SIMPLE,
    category: METRIC_CATEGORIES.PRODUCT,
    status: METRIC_STATUS.WARNING,
    changePercent: 4.2,
    lastUpdated: new Date().toISOString(),
    trend: METRIC_TRENDS.NEUTRAL,
    contributorKeys: ['Promoters', 'Passives', 'Detractors'],
    contributorsData: generateDailyContributors(90, ['Promoters', 'Passives', 'Detractors'], 1000),
    trendData: generateTrendData(90, 7502234, METRIC_TRENDS.DOWN),
  },
];
