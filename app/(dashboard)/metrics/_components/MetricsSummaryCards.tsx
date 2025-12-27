'use client';

import { Metric } from '@/lib/types/metrics';
import { formatCurrency, formatNumberCompact } from '@/lib/utils/formatters';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { MicroTrendChart } from './MicroTrendChart';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

export function SummaryCards({ metrics }: { metrics: Metric[] }) {
  const router = useRouter();

  const summaryData = useMemo(() => {
    if (!metrics || metrics.length === 0) return [];

    const healthyMetric = metrics
      .filter((m) => m.status === 'healthy')
      .sort((a, b) => b.changePercent - a.changePercent)[0];

    const criticalMetric = metrics
      .filter((m) => m.status === 'critical')
      .sort((a, b) => a.changePercent - b.changePercent)[0];

    const warningMetric = metrics
      .filter((m) => m.status === 'warning')
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))[0];

    const results = [];
    if (healthyMetric) results.push({ ...healthyMetric, summaryLabel: 'Best Performer' });
    if (criticalMetric) results.push({ ...criticalMetric, summaryLabel: 'Action Required' });
    if (warningMetric) results.push({ ...warningMetric, summaryLabel: 'Needs Attention' });

    if (results.length < 3) {
      const usedIds = results.map((r) => r.id);
      const remaining = metrics.filter((m) => !usedIds.includes(m.id));
      results.push(...remaining.slice(0, 3 - results.length));
    }

    return results.slice(0, 3);
  }, [metrics]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {summaryData.map((metric) => {
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
