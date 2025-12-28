'use client';

import { SearchX } from 'lucide-react';
import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Label,
} from 'recharts';

interface TrendPoint {
  date: string;
  value: number;
}

export function TrendChart({ data }: { data: TrendPoint[] }) {
  const chartData = useMemo(() => data, [data]);
  const isHighDensity = data.length > 20;

  const stats = useMemo(() => {
    if (data.length === 0) return { avg: 0, isPositive: true };
    const avg = data.reduce((acc, curr) => acc + curr.value, 0) / data.length;
    const isPositive = data[data.length - 1].value >= data[0].value;
    return { avg, isPositive };
  }, [data]);

  const brandColor = stats.isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))';
  const indigoColor = 'hsl(var(--primary))';

  if (!data || data.length === 0) {
    return (
      <div className="border-muted/50 bg-muted/5 animate-in fade-in zoom-in-95 flex min-h-[400px] w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed p-12 text-center duration-500">
        <div className="relative mb-6">
          <div className="absolute inset-0 scale-150 rounded-full bg-primary/5 blur-3xl" />

          <SearchX className="text-muted-foreground/60 h-5 w-5" />
        </div>

        <div className="max-w-[280px] space-y-2">
          <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
            No matches found
          </h3>
          <p className="text-muted-foreground text-sm font-medium leading-relaxed">
            We couldn&apos;t find any metrics matching your current filters. Try
            <span className="text-primary/80"> resetting your search</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[350px] min-h-0 w-full min-w-0 flex-1">
      <ResponsiveContainer
        width="100%"
        height="100%"
        debounce={50}
        minWidth={0}
        minHeight={0}
        aspect={undefined}
      >
        <AreaChart data={chartData} margin={{ top: 20, right: 80, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="dynamicGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={brandColor} stopOpacity={0.2} />
              <stop offset="95%" stopColor={brandColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="hsl(var(--border))"
            opacity={0.3}
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            interval={'preserveStartEnd'}
            padding={{ left: 15, right: 15 }}
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: 600 }}
            dy={10}
            tickFormatter={(str) => {
              try {
                const date = new Date(str);
                if (isNaN(date.getTime())) return str;
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              } catch {
                return str;
              }
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }}
            domain={[0, (dataMax: number) => Math.max(dataMax, stats.avg) * 1.2]}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value;
            }}
            width={50}
            allowDecimals={false}
          />
          <Tooltip
            cursor={{ stroke: brandColor, strokeWidth: 2, strokeDasharray: '6 6' }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="border-border rounded-xl border bg-background/95 p-4 shadow-2xl backdrop-blur-md">
                    <p className="text-muted-foreground mb-1 text-[10px] font-black uppercase tracking-widest">
                      {label}
                    </p>
                    <p className="text-lg font-black tabular-nums text-foreground">
                      {payload[0].value?.toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <ReferenceLine
            y={stats.avg}
            stroke={indigoColor}
            strokeDasharray="8 4"
            strokeWidth={1.5}
            opacity={0.6}
          >
            <Label
              value={
                stats.avg >= 1000000
                  ? `AVG: ${(stats.avg / 1000000).toFixed(1)}M`
                  : stats.avg >= 1000
                    ? `AVG: ${(stats.avg / 1000).toFixed(1)}K`
                    : Math.floor(stats.avg)
              }
              position="right"
              fill="hsl(var(--primary))"
              fontSize={10}
              fontWeight={900}
              offset={5}
              style={{ textAnchor: 'start' }}
            />
          </ReferenceLine>

          <Area
            type="monotone"
            dataKey="value"
            stroke={brandColor}
            strokeWidth={4}
            fill="url(#dynamicGradient)"
            animationDuration={2000}
            dot={isHighDensity ? false : { r: 4, fill: brandColor, strokeWidth: 0 }}
            activeDot={{
              r: 6,
              strokeWidth: 4,
              stroke: 'hsl(var(--background))',
              fill: brandColor,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
