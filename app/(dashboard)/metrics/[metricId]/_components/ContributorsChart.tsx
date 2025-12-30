'use client';

import { getIndexedChartStyle, resolveEntryColor } from '@/lib/utils/style-utils';
import { SearchX } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ContributorsChartProps {
  data: { [key: string]: string | number }[];
  keys: string[];
}

export function ContributorsChart({ data, keys }: ContributorsChartProps) {
  const chartData = useMemo(() => data, [data]);

  const [activeKey, setActiveKey] = useState<string | null>(null);

  if (!chartData || chartData.length === 0) {
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
    <div
      style={{
        height: '350px',
        width: '100%',
        contain: 'strict',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <ResponsiveContainer width="100%" height="100%" debounce={200}>
        <BarChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
          <defs>
            {keys.map((key, index) => {
              const { color, opacity } = getIndexedChartStyle(index);

              return (
                <linearGradient
                  key={`grad-${key}`}
                  id={`grad-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={opacity * 0.8} />
                  <stop offset="100%" stopColor={color} stopOpacity={opacity} />
                </linearGradient>
              );
            })}
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="hsl(var(--border))"
            opacity={0.3}
          />

          <XAxis
            dataKey="timestamp"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: 600 }}
            dy={10}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }}
            interval="preserveStartEnd"
            minTickGap={20}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }}
            width={40}
            domain={[0, 'auto']}
            padding={{ top: 10 }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value;
            }}
            allowDecimals={false}
          />

          <Tooltip
            cursor={{ fill: 'hsl(var(--primary))', opacity: 0.05 }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="border-border rounded-2xl border bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
                    <p className="text-muted-foreground mb-3 text-[10px] font-black uppercase tracking-widest">
                      {label}
                    </p>
                    <div className="space-y-2.5">
                      {[...payload].reverse().map((entry, index) => {
                        const displayColor = resolveEntryColor(entry.color, index, keys.length);
                        return (
                          <div key={index} className="flex items-center justify-between gap-8">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor: displayColor,
                                }}
                              />
                              <span className="text-xs font-medium text-foreground/70">
                                {entry.name}
                              </span>
                            </div>
                            <span className="text-xs font-black tabular-nums text-foreground">
                              {entry.value?.toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            onMouseEnter={(e) => setActiveKey(e.dataKey as string)}
            onMouseLeave={() => setActiveKey(null)}
            formatter={(value) => (
              <span
                className={`text-[10px] font-bold tracking-widest transition-opacity duration-200 ${
                  activeKey && activeKey !== value ? 'opacity-30' : 'opacity-100'
                }`}
              >
                {value}
              </span>
            )}
            wrapperStyle={{ paddingBottom: '30px', textTransform: 'uppercase' }}
          />

          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={`url(#grad-${index})`}
              barSize={20}
              isAnimationActive={false}
              // Only top segment gets rounded corners
              radius={index === keys.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              // className="transition-all duration-500"
              opacity={activeKey === null || activeKey === key ? 1 : 0.15}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
