'use server';

import { Metric } from '@/lib/types/metrics';

export async function generateMetricsCSV(metrics: Metric[]): Promise<string> {
  // 1. Create CSV Header
  const headers = ['ID', 'Name', 'Category', 'Current Value', 'Change %'];

  // 2. Map Metrics to Rows
  const rows = metrics.map((m) => [m.id, m.name, m.category, m.value, `${m.changePercent}%`]);

  // 3. Combine into a single string
  const csvString = [headers, ...rows].map((row) => row.join(',')).join('\n');

  return csvString;
}
