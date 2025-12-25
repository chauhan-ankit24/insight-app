'use client';

interface SparklineProps {
  data: number[];
  trend: 'up' | 'down' | 'neutral';
}

export function Sparkline({ data, trend }: SparklineProps) {
  const width = 120;
  const height = 32;
  const padding = 4;

  // Calculate SVG points
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - padding - ((val - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  // Determine color based on trend
  const color = trend === 'up' ? '#22c55e' : trend === 'down' ? '#ef4444' : '#94a3b8';

  return (
    <div className="h-8 w-32">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${trend}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Fill Area */}
        <path
          d={`M 0 ${height} L ${points} L ${width} ${height} Z`}
          fill={`url(#gradient-${trend})`}
        />
        {/* Trend Line */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  );
}
