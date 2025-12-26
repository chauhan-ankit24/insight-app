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

interface ContributorsChartProps {
  data: { [key: string]: string | number }[];
  keys: string[];
}

// A more sophisticated, softer palette matching enterprise dashboard standards
const COLORS = [
  '#818cf8', // Indigo
  '#fb7185', // Rose
  '#34d399', // Emerald
  '#fbbf24', // Amber
  '#60a5fa', // Blue
  '#a78bfa', // Violet
  '#2dd4bf', // Teal
  '#f472b6', // Pink
];

export function ContributorsChart({ data, keys }: ContributorsChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-muted/30 flex h-[400px] items-center justify-center rounded-xl border-2 border-dashed">
        <div className="text-center">
          <p className="text-muted-foreground text-sm font-medium">
            No contributor data available.
          </p>
          <p className="text-muted-foreground/60 text-xs">Try selecting a different time range.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={0}>
          <defs>
            {/* Adding subtle gradients to the bars for a premium 3D effect */}
            {keys.map((key, index) => (
              <linearGradient key={`grad-${key}`} id={`grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.9} />
                <stop offset="100%" stopColor={COLORS[index % COLORS.length]} stopOpacity={1} />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--border))"
            opacity={0.4}
          />

          <XAxis
            dataKey="period"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }}
          />

          <Tooltip
            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background/95 min-w-[180px] rounded-xl border p-4 shadow-2xl backdrop-blur-md">
                    <p className="text-muted-foreground mb-3 border-b pb-2 text-[10px] font-bold uppercase tracking-widest">
                      {label} Breakdown
                    </p>
                    <div className="space-y-2">
                      {payload.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-foreground/80 text-xs font-medium">
                              {entry.name}
                            </span>
                          </div>
                          <span className="text-xs font-bold tabular-nums">
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
            iconSize={8}
            formatter={(value) => (
              <span className="text-foreground ml-1 font-semibold">{value.replace(/_/g, ' ')}</span>
            )}
            wrapperStyle={{
              paddingBottom: '30px',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          />

          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={`url(#grad-${index})`}
              barSize={32}
              // Only apply top rounding to the very last segment in the stack
              radius={index === keys.length - 1 ? [6, 6, 0, 0] : [0, 0, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
