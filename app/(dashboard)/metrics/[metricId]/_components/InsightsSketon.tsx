'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function InsightsSkeleton() {
  return (
    <div className="animate-in fade-in space-y-8 pb-12 duration-700">
      {/* 1. Static Back Link - Kept for immediate interaction */}
      <div className="text-muted-foreground/40 inline-flex items-center gap-1 text-sm font-medium">
        <Link
          href="/metrics"
          className="text-muted-foreground inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Metrics
        </Link>
      </div>

      {/* 2. Header Skeleton */}
      <div className="space-y-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 space-y-4">
            {/* Title & Badge Row */}
            <div className="flex items-center gap-4">
              <div className="h-10 w-64 animate-pulse rounded-2xl bg-foreground/20" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-primary/10" />
              {/* Tag/Folder placeholders */}
              <div className="h-4 w-32 animate-pulse rounded-md bg-foreground/5" />
            </div>

            {/* Description Paragraph blocks */}
            <div className="space-y-2">
              <div className="h-4 w-full max-w-2xl animate-pulse rounded-md bg-foreground/10" />
            </div>
          </div>

          {/* Right side controls skeleton */}
          <div className="h-12 w-48 shrink-0 animate-pulse rounded-2xl bg-primary/5" />
        </div>
      </div>

      {/* 3. Charts Section Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Performance Trend Skeleton (2/3 width) */}
        <div className="rounded-[32px] border border-white/20 bg-white/10 p-8 backdrop-blur-md lg:col-span-2 dark:bg-white/5">
          <div className="mb-8 space-y-2">
            <div className="h-3 w-40 animate-pulse rounded-full bg-foreground/20" />
            <div className="h-2 w-24 animate-pulse rounded-full bg-foreground/5" />
          </div>

          {/* Simulated Large Line Chart Area */}
          <div className="relative h-[300px] w-full overflow-hidden">
            {/* 1. Faint Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-2 opacity-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[1px] w-full border-t border-dashed border-foreground" />
              ))}
            </div>

            {/* 2. High-Point Area Fill */}
            <div
              className="absolute inset-0 animate-pulse bg-primary/5"
              style={{
                clipPath:
                  'polygon(0% 85%, 8% 80%, 15% 88%, 25% 60%, 32% 75%, 40% 45%, 48% 55%, 55% 30%, 65% 50%, 72% 35%, 80% 60%, 88% 25%, 95% 40%, 100% 35%, 100% 100%, 0% 100%)',
              }}
            />

            {/* 3. High-Point Stroke (The Line) */}
            <div
              className="absolute inset-0 animate-pulse bg-primary/30"
              style={{
                // Double-traced polygon to create a 2px-3px thick stroke effect
                clipPath:
                  'polygon(0% 84%, 8% 79%, 15% 87%, 25% 59%, 32% 74%, 40% 44%, 48% 54%, 55% 29%, 65% 49%, 72% 34%, 80% 59%, 88% 24%, 95% 39%, 100% 34%, 100% 37%, 95% 42%, 88% 27%, 80% 62%, 72% 37%, 65% 52%, 55% 32%, 48% 57%, 40% 47%, 32% 77%, 25% 62%, 15% 90%, 8% 82%, 0% 87%)',
              }}
            />

            {/* 4. Scatter Points at Major Intersection Peaks */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute left-[40%] top-[45%] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
              <div className="absolute left-[55%] top-[30%] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
              <div className="absolute left-[88%] top-[25%] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
            </div>
          </div>
        </div>

        {/* Contributors Breakdown Skeleton (1/3 width) */}
        <div className="rounded-[32px] border border-white/20 bg-white/10 p-8 backdrop-blur-md dark:bg-white/5">
          <div className="mb-8">
            <div className="h-3 w-32 animate-pulse rounded-full bg-foreground/20" />
          </div>

          {/* Simulated Bar Chart / Breakdown */}
          <div className="flex h-[300px] items-end justify-between gap-2 pt-4">
            {[40, 70, 45, 90, 60, 80, 100, 40, 80, 60].map((h, i) => (
              <div
                key={i}
                className="w-full animate-pulse rounded-t-lg bg-primary/10 transition-all"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
