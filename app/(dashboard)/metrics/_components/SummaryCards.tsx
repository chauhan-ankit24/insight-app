'use client';

import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { Metric } from '@/lib/types/metrics';
import { formatCurrency, formatNumberCompact } from '@/lib/utils/formatters';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export function SummaryCards({ metrics }: { metrics: Metric[] }) {
  const summaryData = metrics.slice(0, 3);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {summaryData.map((metric) => {
        // Define Glass Colors based on Trend
        const styles = {
          up: {
            bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
            border: 'border-emerald-500/20',
            text: 'text-emerald-700 dark:text-emerald-400',
            chart: '#10b981',
            icon: <ArrowUpRight className="h-3 w-3" />,
          },
          down: {
            bg: 'bg-rose-500/10 dark:bg-rose-500/20',
            border: 'border-rose-500/20',
            text: 'text-rose-700 dark:text-rose-400',
            chart: '#f43f5e',
            icon: <ArrowDownRight className="h-3 w-3" />,
          },
          neutral: {
            bg: 'bg-slate-500/10 dark:bg-slate-500/20',
            border: 'border-slate-500/20',
            text: 'text-slate-700 dark:text-slate-400',
            chart: '#94a3b8',
            icon: <Minus className="h-3 w-3" />,
          },
        }[metric.trend || 'neutral'];

        const chartData = metric.sparklineData.map((val) => ({ value: val }));

        return (
          <div
            key={metric.id}
            className={`group relative flex items-center justify-between gap-2 rounded-2xl border p-4 shadow-sm backdrop-blur-md transition-all hover:scale-[1.02] ${styles.bg} ${styles.border}`}
          >
            {/* Left Section: Metric Data */}
            <div className="z-10 flex flex-col gap-1">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest opacity-80 ${styles.text}`}
              >
                {metric.name}
              </span>

              <div className="flex items-baseline gap-1.5">
                <h3 className="text-foreground text-xl font-black tabular-nums">
                  {metric.unit === 'USD'
                    ? formatCurrency(metric.value)
                    : formatNumberCompact(metric.value)}
                </h3>
              </div>

              <div className={`flex items-center gap-1 text-[11px] font-bold ${styles.text}`}>
                {styles.icon}
                <span>{metric.changePercent}%</span>
              </div>
            </div>

            {/* Right Section: Recharts Sparkline */}
            <div className="h-14 w-full flex-1 shrink-0 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={styles.chart} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={styles.chart} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={styles.chart}
                    strokeWidth={2.5}
                    fill={`url(#gradient-${metric.id})`}
                    animationDuration={1500}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Decorative Inner Glow for Glass Effect */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
          </div>
        );
      })}
    </div>
  );
}
