// 1. REMOVE 'use client' FROM HERE
import Link from 'next/link';
import { getMetricById, getMetricTrend } from '@/lib/data/resolvers';
import { InsightControls } from './_components/InsightControls';
import { TrendChart } from './_components/TrendChart';
import { ContributorsChart } from './_components/ContributorsChart';
import { ChevronLeft, Tag, Folder } from 'lucide-react';

// This is a Server Component, so it CAN be async
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

  const statusStyles = {
    healthy: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    critical: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12 duration-700">
      <div className="space-y-6">
        <Link
          href="/metrics"
          className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 text-sm font-medium"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Metrics
        </Link>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-foreground text-4xl font-black uppercase tracking-tight">
                {metric.name}
              </h1>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${statusStyles[metric.status as keyof typeof statusStyles]}`}
              >
                {metric.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
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
            <p className="text-muted-foreground max-w-2xl text-base">{metric.description}</p>
          </div>

          <div className="shrink-0">
            <div className="bg-card/50 border-border inline-block rounded-2xl border p-2 shadow-sm backdrop-blur-sm">
              {/* This child component MUST have 'use client' */}
              <InsightControls />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="bg-card border-border rounded-3xl border p-6 lg:col-span-2">
          <TrendChart
            data={
              trendData?.data.map((d) => ({ date: d.date.toISOString(), value: d.value })) || []
            }
          />
        </div>
        <div className="bg-card border-border rounded-3xl border p-6">
          <ContributorsChart data={metric.contributorsData} keys={metric.contributorKeys} />
        </div>
      </div>
    </div>
  );
}
