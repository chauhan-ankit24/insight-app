'use client';

import { Download, Search, TrendingUp, TrendingDown, LayoutGrid } from 'lucide-react';
import { ActionButton } from '@/app/components/ui/ActionButton';

interface MetricsHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: 'all' | 'top' | 'under' | 'critical';
  setFilter: (filter: 'all' | 'top' | 'under' | 'critical') => void;
  onExport: () => void;
}

export function MetricsHeader({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  onExport,
}: MetricsHeaderProps) {
  return (
    <div className="sticky -top-6 z-30 mb-8 bg-background/80 px-4 py-4 backdrop-blur-md">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">Metrics</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Review and track your business performance in real-time.
          </p>
        </div>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-3">
          {/* Search Bar */}
          <div className="group relative w-full lg:max-w-72">
            <Search className="text-muted-foreground absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transition-colors group-focus-within:text-primary" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search metrics..."
              className="w-full rounded-xl border border-foreground/10 bg-background py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/5"
            />
          </div>

          {/* Segmented Filter Control */}
          <div className="flex gap-2">
            <ActionButton
              onClick={() => setFilter('all')}
              className={`${filter === 'all' ? 'bg-primary/20 text-primary' : 'text-muted-foreground bg-transparent hover:text-foreground'}`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              All
            </ActionButton>
            <ActionButton
              onClick={() => setFilter('top')}
              className={`${filter === 'top' ? 'bg-success/20 text-success' : 'text-muted-foreground bg-transparent hover:text-foreground'}`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Gainers
            </ActionButton>
            <ActionButton
              onClick={() => setFilter('under')}
              className={`${filter === 'under' ? 'bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]' : 'text-muted-foreground bg-transparent hover:text-foreground'}`}
            >
              <TrendingDown className="h-3.5 w-3.5" />
              Losers
            </ActionButton>
          </div>

          <ActionButton
            onClick={onExport}
            className="bg-primary/80 text-primary-foreground hover:bg-primary/90"
          >
            <Download className="h-4 w-4" />
            Export
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
