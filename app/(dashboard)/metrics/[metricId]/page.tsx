import Link from 'next/link';
import { getMetricById, getMetricTrend, getMetricContributors } from '@/lib/data/resolvers';
import { MetricContributor } from '@/lib/types/metrics';
import { InsightControls } from './_components/InsightControls';
import { TrendChart } from './_components/TrendChart';
import { ContributorsChart } from './_components/ContributorsChart';

export default async function MetricDetailPage({
  params,
  searchParams,
}: {
  params: { metricId: string };
  searchParams: { grain?: string; range?: string };
}) {
  const { metricId } = params;

  // URL as Global State: Fallback to defaults if params are missing
  const grain = searchParams.grain || 'daily';
  const range = Number(searchParams.range) || 30;

  // Parallel Data Fetching: Fetch everything at once to save time
  const [metric, trendData, contributors] = await Promise.all([
    getMetricById(metricId),
    getMetricTrend(metricId, grain, range),
    getMetricContributors(metricId),
  ]);

  if (!metric) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold text-gray-800">Metric Not Found</h1>
        <Link href="/metrics" className="mt-4 text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header Navigation */}
      <div className="flex flex-col gap-2">
        <Link
          href="/metrics"
          className="w-fit text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to Metrics
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{metric.name}</h1>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
              metric.status === 'healthy'
                ? 'bg-green-100 text-green-700'
                : metric.status === 'warning'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
            }`}
          >
            {metric.status}
          </span>
        </div>
        <p className="text-muted-foreground">{metric.description}</p>
      </div>

      {/* A. Insight Controls (URL Syncing) */}
      <InsightControls />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* B. Trend Insight (Main Chart) */}
        <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Performance Trend</h3>
            <div className="text-muted-foreground text-xs">
              Showing {range} days ({grain})
            </div>
          </div>
          <TrendChart
            data={
              trendData?.data.map((item: { date: Date; value: number }) => ({
                date: item.date.toISOString(),
                value: item.value,
              })) || []
            }
          />
        </div>

        {/* C. Contributors Insight (Bar Chart) */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-6 font-semibold text-gray-800">Top Contributors</h3>
          <ContributorsChart
            data={contributors.map((c: MetricContributor) => ({
              name: c.name,
              value: c.contribution,
            }))}
          />

          {/* Legacy List fallback for accessibility */}
          <div className="mt-8 space-y-3 border-t pt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Detailed Breakdown
            </p>
            {contributors.map((c: MetricContributor, idx: number) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-gray-600">{c.name}</span>
                <span className="font-mono font-bold">{c.contribution}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
