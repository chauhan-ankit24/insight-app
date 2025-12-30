import { formatCurrency, formatNumberCompact } from '@/lib/utils/formatters';
import { SummaryMetric } from '@/lib/data/resolvers';
import Link from 'next/link';
import { ROUTES } from '@/app/constants/routes';
import { getTrendStyles, getStatusStyles } from '@/lib/utils/style-utils';
import { ClientMicroTrendChart } from './ChartContainer';

export function SummaryCards({ metrics }: { metrics: SummaryMetric[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {metrics?.map((metric) => {
        const styles = getTrendStyles(metric.trend);
        const statusStyles = getStatusStyles(metric.status);
        const Icon = styles.icon;

        return (
          <Link
            key={metric.id}
            href={`${ROUTES.DASHBOARD.METRICS}/${metric.id}?grain=daily&range=30`}
            className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border p-5 shadow-sm transition-all hover:scale-[1.01] hover:shadow-md ${styles.bg} ${styles.border}`}
            aria-label={`View ${metric.name} summary details`}
          >
            <div className="relative z-10 space-y-4">
              {/* Header: Label and Percentage Pill */}
              <div className="flex items-start justify-between">
                <span className="text-muted-foreground/70 text-[11px] font-bold uppercase tracking-widest">
                  {metric.name}
                </span>
                <div
                  className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-black ${statusStyles.pill}`}
                >
                  <Icon className="h-4 w-4" />
                  {Math.abs(metric.changePercent)}%
                </div>
              </div>

              {/* Middle: Primary Value */}
              <div className="flex w-full flex-wrap justify-between gap-2">
                <div>
                  <h3 className="text-3xl font-black tracking-tight text-foreground">
                    {metric.unit === 'USD'
                      ? formatCurrency(metric.value)
                      : formatNumberCompact(metric.value)}
                  </h3>
                  <p
                    className={`${styles.text} mt-1 text-[10px] font-bold uppercase tracking-wider`}
                  >
                    {metric.summaryLabel}
                  </p>
                </div>
                <div className="mt-4 flex-1">
                  <ClientMicroTrendChart
                    data={metric.trendData?.map((d) => ({ value: d.value }))}
                    status={metric.status}
                  />
                </div>
              </div>
            </div>

            {/* Decorative Glass Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />
          </Link>
        );
      })}
    </div>
  );
}
