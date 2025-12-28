import { Metric, ContributorSnapshot } from '../types/metrics';

const generateTrendData = (days: number, startValue: number, trend: 'up' | 'down' | 'volatile') => {
  const data = [];
  const today = new Date();
  let currentValue = startValue;

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // 1. INCREASE BIAS: General direction force
    // We increase this to 2-3% to ensure the line actually travels up or down
    let bias = 0;
    if (trend === 'up') bias = currentValue * (Math.random() * 0.04);
    if (trend === 'down') bias = -currentValue * (Math.random() * 0.03);
    if (trend === 'volatile') bias = (Math.random() - 0.5) * (currentValue * 0.08);

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
    unit: 'USD',
    type: 'SIMPLE',
    category: 'Finance',
    status: 'healthy',
    changePercent: 3.1,
    lastUpdated: new Date().toISOString(),
    trend: 'up',
    contributorKeys: ['New Customers', 'Returning Customers'],
    contributorsData: generateDailyContributors(90, ['New Customers', 'Returning Customers'], 100),
    trendData: generateTrendData(90, 140, 'up'),
  },
  {
    id: 'conversion-rate',
    name: 'Conversion Rate',
    description: 'Percentage of unique visitors who completed a checkout.',
    value: 3.24,
    unit: 'PERCENT',
    type: 'SIMPLE',
    category: 'Sales',
    status: 'warning',
    changePercent: -2.1,
    lastUpdated: new Date().toISOString(),
    trend: 'down',
    contributorKeys: ['Organic', 'Paid Search', 'Email', 'Direct'],
    contributorsData: generateDailyContributors(
      90,
      ['Organic', 'Paid Search', 'Email', 'Direct'],
      5
    ),
    trendData: generateTrendData(90, 3.5, 'down'),
  },
  {
    id: 'revenue',
    name: 'Total Revenue',
    description: 'Gross revenue generated across all subscription tiers and add-ons.',
    value: 125430,
    unit: 'USD',
    type: 'CUSTOM',
    category: 'Finance',
    status: 'healthy',
    changePercent: 12.5,
    lastUpdated: new Date().toISOString(),
    trend: 'up',
    contributorKeys: ['Enterprise', 'Pro', 'Basic', 'Consulting', 'Add-ons'],
    contributorsData: generateDailyContributors(
      90,
      ['Enterprise', 'Pro', 'Basic', 'Consulting', 'Add-ons'],
      50000
    ),
    trendData: generateTrendData(90, 110000, 'up'),
  },
  {
    id: 'churn-rate',
    name: 'Customer Churn',
    description: 'Percentage of customers who cancelled their subscription.',
    value: 2.15,
    unit: 'PERCENT',
    type: 'SIMPLE',
    category: 'Finance',
    status: 'critical',
    changePercent: -15.8,
    lastUpdated: new Date().toISOString(),
    trend: 'down',
    contributorKeys: ['Voluntary', 'Delinquent', 'Technical', 'Product Gap'],
    contributorsData: generateDailyContributors(
      90,
      ['Voluntary', 'Delinquent', 'Technical', 'Product Gap'],
      200
    ),
    trendData: generateTrendData(90, 1.5, 'volatile'),
  },
  {
    id: 'orders',
    name: 'Total Orders',
    description: 'Number of successful transactions processed in the current period.',
    value: 8432,
    unit: 'NUMBER',
    type: 'SIMPLE',
    category: 'Sales',
    status: 'healthy',
    changePercent: 8.2,
    lastUpdated: new Date().toISOString(),
    trend: 'up',
    contributorKeys: ['Direct', 'Referral', 'Social', 'Affiliate'],
    contributorsData: generateDailyContributors(
      90,
      ['Direct', 'Referral', 'Social', 'Affiliate'],
      3000
    ),
    trendData: generateTrendData(90, 7000, 'up'),
  },
  {
    id: 'active-users',
    name: 'Active Users',
    description: 'Daily active users (DAU) currently interacting with the platform.',
    value: 42150,
    unit: 'NUMBER',
    type: 'SIMPLE',
    category: 'Product',
    status: 'healthy',
    changePercent: 5.4,
    lastUpdated: new Date().toISOString(),
    trend: 'up',
    contributorKeys: ['Web', 'iOS', 'Android', 'Desktop'],
    contributorsData: generateDailyContributors(90, ['Web', 'iOS', 'Android', 'Desktop'], 15000),
    trendData: generateTrendData(90, 35000, 'up'),
  },
  {
    id: 'nps',
    name: 'Net Promoter Score',
    description: 'Customer satisfaction based on survey responses.',
    value: 68,
    unit: 'NUMBER',
    type: 'SIMPLE',
    category: 'Product',
    status: 'warning',
    changePercent: 4.2,
    lastUpdated: new Date().toISOString(),
    trend: 'neutral',
    contributorKeys: ['Promoters', 'Passives', 'Detractors'],
    contributorsData: generateDailyContributors(90, ['Promoters', 'Passives', 'Detractors'], 1000),
    trendData: generateTrendData(90, 75, 'down'),
  },
];
