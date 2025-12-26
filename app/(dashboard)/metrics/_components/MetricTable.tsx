'use client';

import { useRouter } from 'next/navigation';
import { formatCurrency, formatNumberCompact, formatPercentage } from '@/lib/utils/formatters';
import { Metric } from '@/lib/types/metrics';
import { MicroTrendChart } from './MicroTrendChart';

export function MetricTable({ metrics }: { metrics: Metric[] }) {
  const router = useRouter();
  console.log('main', metrics);

  const statusConfig = {
    healthy: { bg: 'bg-green-500', ring: 'ring-green-500/20', text: 'Healthy' },
    warning: { bg: 'bg-yellow-500', ring: 'ring-yellow-500/20', text: 'Warning' },
    critical: { bg: 'bg-red-500', ring: 'ring-red-500/20', text: 'Critical' },
  };

  return (
    <div className="bg-card relative w-full overflow-hidden rounded-xl border shadow-sm">
      {/* Scrollable Container */}
      <div className="custom-scrollbar h-full w-full overflow-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 border-b bg-gray-50/80 backdrop-blur-md dark:bg-gray-900/80">
            <tr className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
              <th className="px-6 py-4">Metric Details</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4">Current Value</th>
              <th className="px-6 py-4">Trend (7d)</th>
              <th className="px-6 py-4 text-right">Change</th>
              <th className="px-6 py-4">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y border-t-0">
            {metrics.map((metric) => (
              <tr
                key={metric.id}
                onClick={() => router.push(`/metrics/${metric.id}?grain=daily&range=30`)}
                className="group cursor-pointer transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/20"
              >
                {/* 1. Name & Description */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-foreground group-hover:text-primary font-semibold transition-colors">
                      {metric.name}
                    </span>
                    <span className="text-muted-foreground mt-0.5 max-w-[240px] truncate text-[11px] leading-relaxed">
                      {metric.description}
                    </span>
                  </div>
                </td>

                {/* 2. Status Indicator with "Glow" */}
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

                {/* 3. Value with improved font */}
                <td className="text-foreground px-6 py-4 font-mono text-[13px] font-bold tracking-tight">
                  {metric.unit === 'USD'
                    ? formatCurrency(metric.value)
                    : formatNumberCompact(metric.value)}
                </td>

                {/* 4. Sparkline */}
                <td className="min-w-[120px] px-6 py-4">
                  <div className="h-8 w-full opacity-80 transition-opacity group-hover:opacity-100">
                    <div className="flex items-center justify-center opacity-70 transition-all group-hover:scale-105 group-hover:opacity-100">
                      <MicroTrendChart
                        data={metric.trendData.map((d) => ({ value: d.value }))}
                        status={metric.status}
                      />
                    </div>
                  </div>
                </td>

                {/* 5. Change Percentage */}
                <td className="px-6 py-4 text-right">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold tabular-nums ${
                      metric.changePercent >= 0
                        ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                        : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                    }`}
                  >
                    {metric.changePercent >= 0 ? '+' : ''}
                    {formatPercentage(metric.changePercent)}
                  </span>
                </td>

                {/* 6. Category Tag */}
                <td className="px-6 py-4">
                  <span className="bg-secondary/50 text-muted-foreground inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight">
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
