import { getSummaryMetrics, getMetrics } from '@/lib/data/resolvers';
import { MetricTable } from './_components/MetricsTable';
import { SummaryCards } from './_components/MetricsSummaryCards';
import { MetricsHeader } from './_components/MetricsHeader';

export default async function MetricsPage() {
  const summaryData = await getSummaryMetrics().catch((err) => {
    console.error('Summary API failed:', err);
    return [];
  });

  const tableData = await getMetrics().catch((err) => {
    console.error('Table API failed:', err);
    return [];
  });

  // throw new Error("DATABASE_CONNECTION_TIMEOUT");

  return (
    <div className="relative space-y-8">
      <MetricsHeader metrics={tableData} />
      <SummaryCards metrics={summaryData} />
      <MetricTable metrics={tableData} />
    </div>
  );
}
