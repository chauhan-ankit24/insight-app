'use client';

import { useRouter } from 'next/navigation';
import { formatCurrency, formatNumberCompact, formatPercentage } from '@/lib/utils/formatters';
import { Metric } from '@/lib/types/metrics';
import { MicroTrendChart } from './MicroTrendChart';

export function MetricTable({ metrics }: { metrics: Metric[] }) {
  const router = useRouter();

  const statusConfig = {
    healthy: { bg: 'bg-success', ring: 'ring-success/20', text: 'Healthy' },
    warning: { bg: 'bg-warning', ring: 'ring-warning/20', text: 'Warning' },
    critical: { bg: 'bg-destructive', ring: 'ring-destructive/20', text: 'Critical' },
  };

  return (
    <div className="bg-card border-border/50 relative w-full overflow-hidden rounded-xl border shadow-sm">
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
          <tbody className="divide-border/40 divide-y border-t-0">
            {metrics.map((metric) => (
              <tr
                key={metric.id}
                onClick={() => router.push(`/metrics/${metric.id}?grain=daily&range=30`)}
                className="group cursor-pointer transition-all duration-200 hover:bg-primary/[0.03] dark:hover:bg-primary/[0.05]"
              >
                {/* 1. Name & Description */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground transition-colors group-hover:text-primary">
                      {metric.name}
                    </span>
                    <span className="text-muted-foreground mt-0.5 max-w-[240px] truncate text-[11px] leading-relaxed">
                      {metric.description}
                    </span>
                  </div>
                </td>

                {/* 2. Status Indicator with "Glow" - Uses Semantic Variables */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <div className="relative flex h-2 w-2">
                      <div
                        className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-20 ${statusConfig[metric.status].bg}`}
                      />
                      <div
                        className={`relative inline-flex h-2 w-2 rounded-full ring-4 ${statusConfig[metric.status].bg} ${statusConfig[metric.status].ring}`}
                        title={statusConfig[metric.status].text}
                      />
                    </div>
                  </div>
                </td>

                {/* 3. Value */}
                <td className="px-6 py-4 font-mono text-[13px] font-bold tracking-tight text-foreground">
                  {metric.unit === 'USD'
                    ? formatCurrency(metric.value)
                    : formatNumberCompact(metric.value)}
                </td>

                {/* 4. Sparkline */}
                <td className="min-w-[120px] px-6 py-4">
                  <div className="h-8 w-full opacity-80 transition-opacity group-hover:opacity-100">
                    <MicroTrendChart
                      data={metric.trendData.map((d) => ({ value: d.value }))}
                      status={metric.status}
                    />
                  </div>
                </td>

                {/* 5. Change Percentage - Uses Success/Destructive Variables */}
                <td className="px-6 py-4 text-right">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold tabular-nums transition-colors ${
                      metric.changePercent >= 0
                        ? 'bg-success/10 text-success'
                        : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    {metric.changePercent >= 0 ? '+' : ''}
                    {formatPercentage(metric.changePercent)}
                  </span>
                </td>

                {/* 6. Category Tag - Uses Primary (Indigo) Variables */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-md border border-primary/20 bg-primary/[0.05] px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight text-primary">
                    {metric.category || 'General'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
