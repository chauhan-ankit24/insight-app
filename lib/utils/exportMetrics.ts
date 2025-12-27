import { Metric } from '@/lib/types/metrics';

export const exportMetrics = (metrics: Metric[]) => {
  // 1. Create CSV Header
  const headers = ['ID', 'Name', 'Category', 'Current Value', 'Change %'];

  // 2. Map Metrics to Rows
  const rows = metrics.map((m) => [m.id, m.name, m.category, m.value, `${m.changePercent}%`]);

  // 3. Combine and Create Blob
  const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // 4. Trigger Download
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `metrics_report_${new Date().toISOString().split('T')[0]}.csv`);
  link.click();
};
