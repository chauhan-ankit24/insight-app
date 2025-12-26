'use client';

import { useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer, ReferenceLine, YAxis } from 'recharts';

export function MicroTrendChart({
  data,
  status,
}: {
  data: { value: number }[];
  status: 'healthy' | 'warning' | 'critical';
}) {
  const brandColor =
    status === 'healthy' ? '#22c55e' : status === 'warning' ? '#f59e0b' : '#ef4444';

  // 1. Calculate Average
  const avgValue = useMemo(() => {
    if (!data.length) return 0;
    return data.reduce((acc, curr) => acc + curr.value, 0) / data.length;
  }, [data]);

  return (
    <div className="h-10 w-full min-w-32">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
          <defs>
            <linearGradient id={`gradient-${status}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={brandColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={brandColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* 2. Critical: Zoom in on the data so the variations and AVG line are visible */}
          <YAxis
            hide
            domain={[(dataMin: number) => dataMin * 0.9, (dataMax: number) => dataMax * 1.1]}
          />

          {/* 3. The Average Line (Subtle) */}
          <ReferenceLine
            y={avgValue}
            stroke="currentColor"
            strokeDasharray="3 3"
            strokeWidth={1}
            className="text-muted-foreground opacity-20"
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={brandColor}
            strokeWidth={1.5}
            fill={`url(#gradient-${status})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
