import { formatCurrency, formatNumberCompact, formatPercentage } from '@/lib/utils/formatters';
import { TableMetric } from '@/lib/data/resolvers';
import { MicroTrendChart } from './MicroTrendChart';
import { SearchX } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/app/constants/routes';

export function MetricTable({ metrics }: { metrics: TableMetric[] }) {
  const hrefBuilder = (id: string) => `${ROUTES.DASHBOARD.METRICS}/${id}?grain=daily&range=30`;

  return (
    <div className="bg-card border-border/50 relative min-h-[400px] w-full overflow-hidden rounded-xl border shadow-sm">
      <div className="custom-scrollbar h-full w-full overflow-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="border-border/50 sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md">
            <tr className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
              <th className="px-6 py-4">Metric Details</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4">Current Value</th>
              <th className="px-6 py-4">Trend (7d)</th>
              <th className="px-6 py-4 text-right">Change</th>
              <th className="px-6 py-4">Category</th>
            </tr>
          </thead>
          <tbody className="divide-border/40 divide-y">
            {metrics?.length > 0 ? (
              metrics.map((metric) => {
                const url = hrefBuilder(metric.id);
                return (
                  <tr
                    key={metric.id}
                    className="group transition-all duration-200 hover:bg-primary/[0.03] dark:hover:bg-primary/[0.05]"
                  >
                    {/* Metric Details Cell */}
                    <td className="p-0">
                      <Link href={url} className="block px-6 py-4 outline-none">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground transition-colors group-hover:text-primary">
                            {metric.name}
                          </span>
                          <span className="text-muted-foreground mt-0.5 text-[11px]">
                            {metric.description}
                          </span>
                        </div>
                      </Link>
                    </td>

                    {/* Status Cell */}
                    <td className="p-0">
                      <Link
                        href={url}
                        className="flex h-full w-full items-center justify-center px-6 py-4"
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-full ring-2 ring-offset-2 ring-offset-background ${
                            metric.status === 'healthy'
                              ? 'bg-[#22c55e] ring-[#22c55e]'
                              : metric.status === 'warning'
                                ? 'bg-[#f59e0b] ring-[#f59e0b]'
                                : 'bg-[#ef4444] ring-[#ef4444]'
                          }`}
                          aria-hidden="true"
                        />
                      </Link>
                    </td>

                    {/* Value Cell */}
                    <td className="p-0">
                      <Link
                        href={url}
                        className="block px-6 py-4 font-mono text-[13px] font-bold tracking-tight text-foreground"
                      >
                        {metric.unit === 'USD'
                          ? formatCurrency(metric.value)
                          : formatNumberCompact(metric.value)}
                      </Link>
                    </td>

                    {/* Trend Cell */}
                    <td className="p-0">
                      <Link href={url} className="block min-w-[280px] px-6 py-4">
                        <div className="h-8 w-full opacity-80 transition-opacity group-hover:opacity-100">
                          <MicroTrendChart
                            data={(metric.trendData || []).map((point) => ({
                              value: point.value,
                            }))}
                            status={metric.status}
                          />
                        </div>
                      </Link>
                    </td>

                    {/* Change Cell */}
                    <td className="p-0 text-right">
                      <Link href={url} className="block px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold tabular-nums transition-colors ${metric.changePercent >= 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}
                        >
                          {metric.changePercent >= 0 ? '+' : ''}
                          {formatPercentage(metric.changePercent)}
                        </span>
                      </Link>
                    </td>

                    {/* Category Cell */}
                    <td className="p-0">
                      <Link href={url} className="block px-6 py-4">
                        <span className="inline-flex items-center rounded-md border border-primary/20 bg-primary/[0.05] px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight text-primary">
                          {metric.category || 'General'}
                        </span>
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="bg-muted/20 flex h-12 w-12 items-center justify-center rounded-full">
                      <SearchX className="text-muted-foreground h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold">No metrics found</p>
                      <p className="text-muted-foreground text-xs">
                        Try adjusting your filters or search query.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
