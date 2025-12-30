'use client';

import { MetricStatus } from '@/lib/types/metrics';
import { getStatusColor } from '@/lib/utils/style-utils';
import { useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer, ReferenceLine, YAxis } from 'recharts';

export function MicroTrendChart({
  data,
  status,
}: {
  data: { value: number }[];
  status: MetricStatus;
}) {
  const brandColor = useMemo(() => getStatusColor(status), [status]);

  // 2. Calculate Average
  const avgValue = useMemo(() => {
    if (!data?.length) return 0;
    return data.reduce((acc, curr) => acc + curr.value, 0) / data?.length;
  }, [data]);

  return (
    <div
      style={{
        height: '40px',
        width: '100%',
        contain: 'strict',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <ResponsiveContainer width="100%" height="100%" debounce={200}>
        <AreaChart data={data} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
          <defs>
            <linearGradient id={`micro-grad-${status}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={brandColor} stopOpacity={0.25} />
              <stop offset="95%" stopColor={brandColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <YAxis
            hide
            domain={[(dataMin: number) => dataMin * 0.98, (dataMax: number) => dataMax * 1.02]}
          />

          <ReferenceLine
            y={avgValue}
            stroke="hsl(var(--primary))"
            strokeDasharray="4 4"
            strokeWidth={1}
            opacity={0.15}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={brandColor}
            strokeWidth={2}
            fill={`url(#micro-grad-${status})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
