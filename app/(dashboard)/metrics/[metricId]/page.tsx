import Link from 'next/link';
import { getMetricById, getMetricTrend } from '@/lib/data/resolvers';
import { InsightControls } from './_components/InsightControls';
import { TrendChart } from './_components/TrendChart';
import { ContributorsChart } from './_components/ContributorsChart';
import { ChevronLeft, Tag, Folder } from 'lucide-react';

export default async function MetricDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ metricId: string }>;
  searchParams: Promise<{ grain?: string; range?: string }>;
}) {
  const { metricId } = await params;
  const resolvedSearchParams = await searchParams;

  const grain = resolvedSearchParams.grain || 'daily';
  const range = Number(resolvedSearchParams.range) || 30;

  const [metric, trendData] = await Promise.all([
    getMetricById(metricId),
    getMetricTrend(metricId, grain, range),
  ]);

  if (!metric) return <div>Metric Not Found</div>;

  // Get all historical contributor data (e.g., 90 days)
  const allContributors = metric.contributorsData;

  // Filter based on Range
  let displayContributors = [];

  if (range <= 7) {
    // Show last 7 days - 7 bars total
    displayContributors = allContributors.slice(-7);
  } else if (range <= 30) {
    // Show last 30 days, but perhaps pick every 3rd day to keep 10 clean bars
    displayContributors = allContributors.slice(-30).filter((_, i) => i % 3 === 0);
  } else {
    // Show last 90 days, pick every 7th day (Weekly view) - ~12 clean bars
    displayContributors = allContributors.slice(-90).filter((_, i) => i % 7 === 0);
  }

  const statusStyles = {
    healthy: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    critical: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12 duration-700">
      <div className="space-y-6">
        <Link
          href="/metrics"
          className="text-muted-foreground inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Metrics
        </Link>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground">
                {metric.name}
              </h1>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                  statusStyles[metric.status as keyof typeof statusStyles]
                }`}
              >
                {metric.status}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-muted-foreground flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {metric.type}
                  </span>
                </div>
                <div className="bg-border h-3 w-px" />
                <div className="text-muted-foreground flex items-center gap-1.5">
                  <Folder className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {metric.category}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              {metric.description}
            </p>
          </div>

          <div className="shrink-0">
            <InsightControls />
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Performance Trend */}
        <div className="bg-card border-border rounded-3xl border p-6 lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-muted-foreground/80 text-sm font-bold uppercase tracking-widest">
              Performance Trend
            </h3>
          </div>
          <TrendChart
            data={
              trendData?.data.map((d) => ({
                date: d.date,
                value: d.value,
              })) || []
            }
          />
        </div>

        {/* Contributors Breakdown */}
        <div className="bg-card border-border rounded-3xl border p-6">
          <div className="mb-4">
            <h3 className="text-muted-foreground/80 text-sm font-bold uppercase tracking-widest">
              Contributors
            </h3>
          </div>
          <ContributorsChart data={displayContributors} keys={metric.contributorKeys} />
        </div>
      </div>
    </div>
  );
}
