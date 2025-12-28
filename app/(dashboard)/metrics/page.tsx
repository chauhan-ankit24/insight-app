import { getSummaryMetrics, getMetrics } from '@/lib/data/resolvers';
import { MetricTable } from './_components/MetricsTable';
import { SummaryCards } from './_components/MetricsSummaryCards';
import { MetricsHeader } from './_components/MetricsHeader';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ q?: string; filter?: string }>;
};

export default async function MetricsPage({ searchParams }: Props) {
  const { q, filter } = await searchParams;

  const summaryPromise = getSummaryMetrics();
  const tablePromise = getMetrics({ query: q, category: filter });

  const [summaryData, tableData] = await Promise.all([
    summaryPromise.catch(() => []),
    tablePromise.catch(() => []),
  ]);

  return (
    <div className="relative space-y-8">
      <Suspense fallback={<div>Loading...</div>}>
        <MetricsHeader metrics={tableData} />
      </Suspense>
      <SummaryCards metrics={summaryData} />
      <MetricTable metrics={tableData} />
    </div>
  );
}
