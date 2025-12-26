'use client';

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
import { useState } from 'react';

interface ContributorsChartProps {
  data: { [key: string]: string | number }[];
  keys: string[];
}

const COLORS = [
  '#818cf8', // Indigo
  '#fb7185', // Rose
  '#34d399', // Emerald
  '#fbbf24', // Amber
  '#60a5fa', // Blue
];

export function ContributorsChart({ data, keys }: ContributorsChartProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  console.log('contri', data);

  if (!data || data.length === 0) return null; // Logic for empty state...

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
          onMouseMove={(state) => {
            if (state.activeTooltipIndex !== undefined) {
              // Optional: Add logic for global hover highlights
            }
          }}
        >
          <defs>
            {keys.map((key, index) => (
              <linearGradient key={`grad-${key}`} id={`grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8} />
                <stop offset="100%" stopColor={COLORS[index % COLORS.length]} stopOpacity={1} />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--border))"
            opacity={0.3}
          />

          <XAxis
            dataKey="timestamp"
            axisLine={false}
            tickLine={false}
            // 1. Styling: Consistent font with the rest of the dashboard
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }}
            // 2. Vertical Spacing: Pull labels away from the bars
            dy={10}
            // 3. Smart Formatting: Convert ISO strings to "Dec 26" or "Fri"
            tickFormatter={(value) => {
              const date = new Date(value);
              // If you have many bars, use a shorter format like 'MMM d'
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              });
            }}
            // 4. Interval: Prevents labels from overlapping on smaller screens
            interval="preserveStartEnd"
            minTickGap={20}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            // 1. Styling: Use slightly smaller font for the sidebar chart
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }}
            // 2. Fixed Width: Prevents the chart layout from shifting
            width={40}
            // 3. Spacing: Ensure bars don't hit the ceiling
            // This adds 10% breathing room above the highest stack
            domain={[0, 'auto']}
            padding={{ top: 10 }}
            // 4. Formatter: Your compact logic
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value;
            }}
            // 5. Cleanliness: Remove decimal noise
            allowDecimals={false}
          />

          <Tooltip
            cursor={{ fill: 'hsl(var(--foreground))', opacity: 0.05 }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background/95 border-border rounded-2xl border p-4 shadow-2xl backdrop-blur-xl">
                    <p className="text-muted-foreground mb-3 text-[10px] font-bold uppercase tracking-widest">
                      {label}
                    </p>
                    <div className="space-y-2.5">
                      {[...payload].reverse().map((entry, index) => (
                        <div key={index} className="flex items-center justify-between gap-8">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-foreground/70 text-xs font-medium">
                              {entry.name}
                            </span>
                          </div>
                          <span className="text-foreground text-xs font-black tabular-nums">
                            {entry.value?.toLocaleString()}
                          </span>
                        </div>
                      ))}
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
                className={`transition-opacity duration-200 ${activeKey && activeKey !== value ? 'opacity-30' : 'opacity-100'}`}
              >
                {value}
              </span>
            )}
            wrapperStyle={{
              paddingBottom: '40px',
              // paddingTop: '20px',
              textTransform: 'uppercase',
              fontSize: '10px',
              letterSpacing: '0.1em',
            }}
          />

          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={`url(#grad-${index})`}
              barSize={24}
              // Only top bar gets rounding, but we handle it via CSS/SVG better
              radius={index === keys.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              className="transition-all duration-300"
              opacity={activeKey === null || activeKey === key ? 1 : 0.2}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
