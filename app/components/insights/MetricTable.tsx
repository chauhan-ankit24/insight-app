'use client';

import { useRouter } from 'next/navigation';
import { formatCurrency, formatNumberCompact, formatPercentage } from '@/lib/utils/formatters';
import { Sparkline } from './Sparkline';
import { Metric } from '@/lib/types/metrics';

export function MetricTable({ metrics }: { metrics: Metric[] }) {
  const router = useRouter();

  const statusColors = {
    healthy: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500',
  };

  return (
    <div className="h-[calc(100vh-285px)] w-full overflow-x-auto rounded-xl border shadow-sm">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="text-muted-foreground border-b bg-gray-50/50 text-[11px] font-semibold uppercase tracking-wider dark:bg-gray-800/50">
          <tr>
            <th className="px-6 py-4">Metric name</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4">Current Value</th>
            <th className="px-6 py-4">Trend (7d)</th>
            <th className="px-6 py-4 text-right">Change %</th>
            <th className="px-6 py-4">Category</th>
            <th className="w-10 px-6 py-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {metrics.map((metric) => (
            <tr
              key={metric.id}
              onClick={() => router.push(`/metrics/${metric.id}`)}
              className="group transition-colors hover:bg-gray-50/90 dark:hover:bg-gray-700/10"
            >
              {/* 1. Name & Description */}
              <td className="px-6 py-4">
                <div className="text-muted-foreground font-medium">{metric.name}</div>
                <p className="text-muted-foreground max-w-[200px] truncate text-xs">
                  {metric.description}
                </p>
              </td>

              {/* 2. Status Indicator */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${statusColors[metric.status]}`}
                    title={metric.status}
                  />
                </div>
              </td>

              {/* 3. Value */}
              <td className="px-6 py-4 font-mono font-semibold">
                {metric.unit === 'USD'
                  ? formatCurrency(metric.value)
                  : formatNumberCompact(metric.value)}
              </td>

              {/* 4. Sparkline */}
              <td className="px-6 py-4">
                <Sparkline data={metric.sparklineData} trend={metric.trend} />
              </td>

              {/* 5. Change Percentage */}
              <td
                className={`px-6 py-4 text-right font-medium ${
                  metric.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {formatPercentage(metric.changePercent)}
              </td>

              {/* 6. Category Tag */}
              <td className="px-6 py-4">
                <span className="rounded-full border bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium uppercase text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {metric.category || 'General'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
