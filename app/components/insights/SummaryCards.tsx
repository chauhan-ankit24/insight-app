'use client';

import { Metric } from '@/lib/types/metrics';
import { formatCurrency, formatNumberCompact } from '@/lib/utils/formatters';
import { Sparkline } from './Sparkline';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export function SummaryCards({ metrics }: { metrics: Metric[] }) {
  // Take the first three metrics for the top cards
  const summaryData = metrics.slice(0, 3);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {summaryData.map((metric) => (
        <div key={metric.id} className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm font-medium">{metric.name}</span>
            <div
              className={`flex items-center gap-0.5 text-xs font-bold ${
                metric.trend === 'up'
                  ? 'text-green-600'
                  : metric.trend === 'down'
                    ? 'text-red-600'
                    : 'text-slate-500'
              }`}
            >
              {metric.trend === 'up' && <ArrowUpRight className="h-3 w-3" />}
              {metric.trend === 'down' && <ArrowDownRight className="h-3 w-3" />}
              {metric.trend === 'neutral' && <Minus className="h-3 w-3" />}
              {metric.changePercent}%
            </div>
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight">
              {metric.unit === 'USD'
                ? formatCurrency(metric.value)
                : formatNumberCompact(metric.value)}
            </h3>
            <span className="text-muted-foreground text-xs">
              {metric.unit !== 'USD' ? metric.unit : ''}
            </span>
          </div>

          <div className="mt-4 w-full">
            {/* We reuse your Sparkline but give it more height for the card view */}
            <Sparkline data={metric.sparklineData} trend={metric.trend} />
          </div>
        </div>
      ))}
    </div>
  );
}
