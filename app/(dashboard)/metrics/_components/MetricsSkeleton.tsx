import { MetricsHeader } from './MetricsHeader';

export function MetricsSkeleton() {
  return (
    <div className="animate-in fade-in relative space-y-8 !bg-transparent duration-500">
      {/* 1. Header Skeleton - Consistent with Dashboard Title Styling */}
      <MetricsHeader />

      {/* 2. Summary Cards - Unified with exactly 32px rounding and success/indigo tints */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative h-[140px] overflow-hidden rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-button backdrop-blur-md dark:bg-white/5"
          >
            <div className="relative z-10 flex h-full flex-col justify-between">
              {/* Top Row: Aligned with Image Reference */}
              <div className="flex items-center justify-between">
                <div className="h-3 w-32 animate-pulse rounded-full bg-foreground/20 font-black tracking-widest" />
                <div className="flex h-8 w-20 animate-pulse items-center justify-center rounded-full border border-success/30 bg-success/10">
                  <div className="h-2 w-10 rounded bg-success/20" />
                </div>
              </div>

              {/* Bottom Row: Large Value + Sparkline */}
              <div className="flex items-end justify-between gap-4">
                <div className="space-y-3 pb-1">
                  <div className="h-10 w-44 animate-pulse rounded-xl bg-foreground/15" />
                  <div className="h-3 w-36 animate-pulse rounded-full bg-foreground/10" />
                </div>

                <div className="relative h-12 w-full max-w-[140px] overflow-hidden">
                  <div className="absolute top-1/2 h-[1px] w-full border-t border-dashed border-primary/20" />
                  <div
                    className="clip-path-sparkline absolute bottom-0 h-full w-full animate-pulse rounded-lg bg-primary/20"
                    style={{
                      clipPath:
                        'polygon(0% 80%, 15% 85%, 30% 70%, 45% 80%, 60% 60%, 75% 65%, 90% 40%, 100% 45%, 100% 100%, 0% 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Consistent Shine Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30" />
          </div>
        ))}
      </div>

      {/* 3. Six-Column Table - Optimized for Grid Alignment */}
      <div className="overflow-hidden rounded-[24px] border border-white/20 bg-white/10 shadow-button backdrop-blur-xl dark:bg-white/5">
        {/* Table Header Row - Standardized Opacity */}
        <div className="flex items-center border-b border-white/10 bg-white/5 px-8 py-5">
          <div className="grid w-full grid-cols-6 gap-6">
            <div className="h-3 w-24 animate-pulse rounded-full bg-foreground/20" />
            <div className="h-3 w-20 animate-pulse rounded-full bg-foreground/10" />
            <div className="h-3 w-20 animate-pulse rounded-full bg-foreground/10" />
            <div className="h-3 w-28 animate-pulse rounded-full bg-primary/20" />
            <div className="h-3 w-16 animate-pulse rounded-full bg-foreground/10" />
            <div className="h-3 w-16 animate-pulse rounded-full bg-foreground/10" />
          </div>
        </div>

        {/* Table Content Rows */}
        <div className="divide-y divide-white/5">
          {[1, 2, 3].map((row) => (
            <div
              key={row}
              className="flex items-center px-8 py-6 transition-colors hover:bg-white/5"
            >
              <div className="grid w-full grid-cols-6 items-center gap-6">
                {/* Column 1: Stacked Meta */}
                <div className="space-y-2">
                  <div className="h-4 w-44 animate-pulse rounded-md bg-foreground/15" />
                  <div className="h-3 w-32 animate-pulse rounded-md bg-foreground/5" />
                </div>

                {/* Column 2: Category */}
                <div className="h-3.5 w-24 animate-pulse rounded-md bg-foreground/10" />

                {/* Column 3: Status Badge */}
                <div className="h-7 w-24 animate-pulse rounded-full bg-foreground/10" />

                {/* Column 4: Sparkline - Unique Jagged Clip for variety */}
                <div className="relative flex h-10 w-full items-center overflow-hidden pr-6">
                  <div className="absolute top-1/2 h-[1px] w-full border-t border-dashed border-primary/20" />
                  <div
                    className="h-full w-full animate-pulse rounded-md bg-primary/10"
                    style={{
                      clipPath:
                        'polygon(0% 70%, 20% 75%, 40% 60%, 55% 85%, 70% 50%, 85% 65%, 100% 40%, 100% 100%, 0% 100%)',
                    }}
                  />
                </div>

                {/* Column 5: Numeric */}
                <div className="h-4 w-20 animate-pulse rounded-md bg-foreground/15" />

                {/* Column 6: Right Aligned Change */}
                <div className="">
                  <div className="h-4 w-14 animate-pulse rounded-md bg-foreground/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
