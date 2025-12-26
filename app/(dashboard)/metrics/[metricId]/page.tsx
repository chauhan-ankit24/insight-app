import Link from 'next/link';
import { getMetricById, getMetricTrend, getMetricContributors } from '@/lib/data/resolvers';
import { MetricContributor } from '@/lib/types/metrics';
import { InsightControls } from './_components/InsightControls';
import { TrendChart } from './_components/TrendChart';
import { ContributorsChart } from './_components/ContributorsChart';
import { ChevronLeft, Info, TrendingUp, Users } from 'lucide-react';

export default async function MetricDetailPage({
  params,
  searchParams,
}: {
  params: { metricId: string };
  searchParams: { grain?: string; range?: string };
}) {
  const { metricId } = await params;

  const grain = searchParams.grain || 'daily';
  const range = Number(searchParams.range) || 30;
  console.log('id', metricId, params);

  const [metric, trendData, contributors] = await Promise.all([
    getMetricById(metricId),
    getMetricTrend(metricId, grain, range),
    getMetricContributors(),
  ]);

  if (!metric) {
    return (
      <div className="animate-in fade-in zoom-in-95 flex flex-col items-center justify-center py-32">
        <div className="bg-destructive/10 mb-4 rounded-full p-4">
          <Info className="text-destructive h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold">Metric Not Found</h1>
        {/* <p className="text-muted-foreground">The ID "{metricId}" does not exist in our records.</p> */}
        <Link
          href="/metrics"
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const statusStyles = {
    healthy:
      'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20',
    warning:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20',
    critical:
      'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20',
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12 duration-700">
      {/* 1. Enhanced Breadcrumb & Header */}
      <div className="space-y-4">
        <Link
          href="/metrics"
          className="text-muted-foreground hover:text-primary group inline-flex items-center gap-1 text-sm font-medium transition-colors"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Metrics
        </Link>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-foreground text-4xl font-extrabold tracking-tight">
                {metric.name}
              </h1>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${statusStyles[metric.status]}`}
              >
                {metric.status}
              </span>
            </div>
            <p className="text-muted-foreground max-w-2xl text-lg">{metric.description}</p>
          </div>

          <div className="bg-card hidden items-center gap-6 rounded-2xl border px-6 py-3 shadow-sm lg:flex">
            <div className="text-center">
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                Type
              </p>
              <p className="text-sm font-bold">{metric.type}</p>
            </div>
            <div className="bg-border h-8 w-px" />
            <div className="text-center">
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                Category
              </p>
              <p className="text-sm font-bold">{metric.category}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Insight Controls with Surface Style */}
      <div className="bg-background/80 sticky top-2 z-30 pb-2 backdrop-blur-md">
        <div className="bg-card inline-block rounded-2xl border p-3 shadow-sm">
          <InsightControls />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 3. Trend Insight (Main Chart Card) */}
        <div className="bg-card rounded-2xl border p-6 shadow-sm transition-all lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary rounded-lg p-2">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-foreground text-lg font-bold">Performance Trend</h3>
            </div>
            <div className="bg-secondary text-muted-foreground rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              {grain} • Last {range} days
            </div>
          </div>

          <div className="">
            <TrendChart
              data={
                trendData?.data.map((item: { date: Date; value: number }) => ({
                  date: item.date.toISOString(),
                  value: item.value,
                })) || []
              }
            />
          </div>
        </div>

        {/* 4. Contributors Insight (Stacked Card) */}
        <div className="bg-card flex flex-col rounded-2xl border shadow-sm">
          <div className="p-6 pb-0">
            <div className="mb-6 flex items-center gap-2">
              <div className="bg-primary/10 text-primary rounded-lg p-2">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-foreground text-lg font-bold">Distribution</h3>
            </div>
            <div className="h-[300px]">
              <ContributorsChart data={metric.contributorsData} keys={metric.contributorKeys} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
