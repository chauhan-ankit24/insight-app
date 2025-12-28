'use server';

import { TableMetric } from '../data/resolvers';

export async function generateMetricsCSV(metrics: TableMetric[]): Promise<string> {
  const headers = ['ID', 'Name', 'Category', 'Current Value', 'Change %'];

  const rows = metrics.map((m) => [m.id, m.name, m.category, m.value, `${m.changePercent}%`]);

  const csvString = [headers, ...rows].map((row) => row.join(',')).join('\n');

  return csvString;
}
