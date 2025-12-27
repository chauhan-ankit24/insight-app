'use client';

import { formatCurrency, formatNumberCompact } from '@/lib/utils/formatters';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { MicroTrendChart } from './MicroTrendChart';
import { useRouter } from 'next/navigation';
import { SummaryMetric } from '@/lib/data/resolvers';

export function SummaryCards({ metrics }: { metrics: SummaryMetric[] }) {
  const router = useRouter();
  console.log('summary', metrics);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {metrics?.map((metric) => {
        const styles = {
          up: {
            bg: 'bg-success/10',
            border: 'border-success',
            text: 'text-success',
            icon: <ArrowUpRight className="h-4 w-4" />,
          },
          down: {
            bg: 'bg-destructive/10',
            border: 'border-destructive',
            text: 'text-destructive',
            icon: <ArrowDownRight className="h-4 w-4" />,
          },
          neutral: {
            bg: 'bg-warning/10',
            border: 'border-warning',
            text: 'text-warning',
            icon: <Minus className="h-4 w-4" />,
          },
        }[metric.trend || 'neutral'];

        return (
          <div
            key={metric.id}
            onClick={() => router.push(`/metrics/${metric.id}?grain=daily&range=30`)}
            className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border p-5 shadow-sm transition-all hover:scale-[1.01] hover:shadow-md ${styles.bg} ${styles.border}`}
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
                  <h3 className="text-3xl font-black tracking-tight text-foreground">
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
                    data={metric.trendData?.map((d) => ({ value: d.value }))}
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
