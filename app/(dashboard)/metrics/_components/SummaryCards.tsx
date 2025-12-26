'use client';

import { Metric } from '@/lib/types/metrics';
import { formatCurrency, formatNumberCompact } from '@/lib/utils/formatters';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { MicroTrendChart } from './MicroTrendChart'; // Reusing your existing component

export function SummaryCards({ metrics }: { metrics: Metric[] }) {
  // We only show the top 3 high-level metrics in the summary
  const summaryData = metrics.slice(0, 3);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {summaryData.map((metric) => {
        // Trend-based styling for the glass cards
        const styles = {
          up: {
            bg: 'bg-emerald-500/5 dark:bg-emerald-500/10',
            border: 'border-emerald-500/20',
            text: 'text-emerald-600 dark:text-emerald-400',
            icon: <ArrowUpRight className="h-4 w-4" />,
          },
          down: {
            bg: 'bg-rose-500/5 dark:bg-rose-500/10',
            border: 'border-rose-500/20',
            text: 'text-rose-600 dark:text-rose-400',
            icon: <ArrowDownRight className="h-4 w-4" />,
          },
          neutral: {
            bg: 'bg-slate-500/5 dark:bg-slate-500/10',
            border: 'border-slate-500/20',
            text: 'text-slate-600 dark:text-slate-400',
            icon: <Minus className="h-4 w-4" />,
          },
        }[metric.trend || 'neutral'];

        return (
          <div
            key={metric.id}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-5 shadow-sm transition-all hover:scale-[1.01] hover:shadow-md ${styles.bg} ${styles.border}`}
          >
            <div className="relative z-10 space-y-4">
              {/* Header: Label and Percentage Pill */}
              <div className="flex items-start justify-between">
                <span className="text-muted-foreground/70 text-[11px] font-bold uppercase tracking-widest">
                  {metric.name}
                </span>
                <div
                  className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-black ${styles.bg} ${styles.text} ${styles.border}`}
                >
                  {styles.icon}
                  {Math.abs(metric.changePercent)}%
                </div>
              </div>

              {/* Middle: Primary Value */}
              <div className="flex w-full flex-wrap justify-between gap-2">
                <div>
                  <h3 className="text-foreground text-3xl font-black tracking-tight">
                    {metric.unit === 'USD'
                      ? formatCurrency(metric.value)
                      : formatNumberCompact(metric.value)}
                  </h3>
                  <p className="text-muted-foreground/60 mt-1 text-[10px] font-bold uppercase tracking-tighter">
                    Current Performance
                  </p>
                </div>
                <div className="mt-4 flex-1">
                  <MicroTrendChart
                    data={metric.trendData.map((d) => ({ value: d.value }))}
                    status={metric.status}
                  />
                </div>
              </div>
            </div>

            {/* Decorative Glass Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />
          </div>
        );
      })}
    </div>
  );
}
