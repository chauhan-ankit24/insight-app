'use client';

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

  const stats = useMemo(() => {
    if (data.length === 0) return { avg: 0, isPositive: true };
    const avg = data.reduce((acc, curr) => acc + curr.value, 0) / data.length;
    const isPositive = data[data.length - 1].value >= data[0].value;
    return { avg, isPositive };
  }, [data]);

  const brandColor = stats.isPositive ? '#22c55e' : '#ef4444';

  if (!data || data.length === 0) return null;

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 80, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="dynamicGradient" x1="0" y1="0" x2="0" y2="1">
              {/* Lowered stopOpacity to ensure things behind/below are visible */}
              <stop offset="5%" stopColor={brandColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={brandColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--border))"
            opacity={0.2}
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            domain={[0, (dataMax: number) => Math.max(dataMax, stats.avg) * 1.2]}
          />

          <Tooltip
            cursor={{ stroke: brandColor, strokeWidth: 2, strokeDasharray: '6 6' }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background/95 border-border rounded-xl border p-4 shadow-2xl backdrop-blur-md">
                    <p className="text-muted-foreground mb-1 text-[10px] font-bold uppercase tracking-widest">
                      {label}
                    </p>
                    <p className="text-foreground text-lg font-black tabular-nums">
                      {payload[0].value?.toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          {/* 1. LAYER 1: The Area (Rendered first = Bottom) */}
          <Area
            type="monotone"
            dataKey="value"
            stroke={brandColor}
            strokeWidth={3}
            fill="url(#dynamicGradient)"
            animationDuration={2000}
            activeDot={{ r: 8, strokeWidth: 4, stroke: 'hsl(var(--background))', fill: brandColor }}
          />

          {/* 2. LAYER 2: The ReferenceLine (Rendered last = Top) */}
          <ReferenceLine y={stats.avg} stroke="#94a3b8" strokeDasharray="8 4" strokeWidth={2}>
            <Label
              value={`AVG: ${stats.avg.toFixed(0)}`}
              position="right"
              fill="#64748b"
              fontSize={10}
              fontWeight={800}
              offset={20}
            />
          </ReferenceLine>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
