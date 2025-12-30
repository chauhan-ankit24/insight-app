import Link from 'next/link';
import { getMetricById, getMetricContributors, getMetricTrend } from '@/lib/data/resolvers';
import { InsightControls } from './_components/InsightControls';
import { ChevronLeft, Tag, Folder } from 'lucide-react';
import { formatDate } from '@/lib/utils/formatters';
import { ROUTES } from '@/app/constants/routes';
import { getStatusStyles } from '@/lib/utils/style-utils';
import { Metadata } from 'next';

import { ClientTrendChart, ClientContributorsChart } from './_components/ChartContainer';

type Props = { params: Promise<{ metricId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { metricId } = await params;

  const metric = await getMetricById(metricId);

  if (!metric) {
    return { title: 'Metric Not Found', robots: { index: false } };
  }

  return {
    title: metric.name,
    description: `Deep dive into ${metric.name} performance. ${metric.description}`,
    openGraph: {
      title: `${metric.name} Trends`,
      description: `Analyzing real-time data for ${metric.name}.`,
      images: [`/api/og?title=${metric.name}`],
    },
  };
}

export default async function MetricDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ metricId: string }>;
  searchParams: Promise<{ grain?: string; range?: string }>;
}) {
  const { metricId } = await params;
  const { grain = 'daily', range = '30' } = await searchParams;
  const rangeNum = Number(range);

  const [metric, trendData, contributors] = await Promise.all([
    getMetricById(metricId),

    getMetricTrend(metricId, grain, rangeNum).catch((err) => {
      console.error('Trend API Error:', err);
      return null;
    }),

    getMetricContributors(metricId, rangeNum).catch((err) => {
      console.error('Contributors Error:', err);
      return { data: [], keys: [] };
    }),
  ]);

  if (!metric) return <div>Metric Not Found</div>;

  const statusInfo = getStatusStyles(metric.status);

  return (
    <div className="animate-in fade-in space-y-8 pb-12 duration-700">
      <div className="space-y-6">
        <Link
          href={ROUTES.DASHBOARD.METRICS}
          className="text-muted-foreground inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Metrics
        </Link>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="text-4xl font-black uppercase tracking-tight text-foreground">
                {metric.name}
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                  statusInfo.bg
                } text-background`}
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
              <span className="ml-2 hidden text-sm opacity-70 md:inline">
                Last Updated: {formatDate(new Date(metric.lastUpdated))}
              </span>
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
            <div className="text-muted-foreground/80 text-sm font-bold uppercase tracking-widest">
              Performance Trend
            </div>
          </div>
          <ClientTrendChart
            data={
              trendData?.data.map((d) => ({
                date: String(d.date),
                value: d.value,
              })) || []
            }
          />
        </div>

        {/* Contributors Breakdown */}
        <div className="bg-card border-border rounded-3xl border p-6">
          <div className="mb-4">
            <div className="text-muted-foreground/80 text-sm font-bold uppercase tracking-widest">
              Contributors
            </div>
          </div>
          <ClientContributorsChart data={contributors.data} keys={contributors.keys} />
        </div>
      </div>
    </div>
  );
}
