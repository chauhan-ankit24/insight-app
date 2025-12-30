'use client';

import { Download, Search, TrendingUp, TrendingDown, LayoutGrid, Loader2, X } from 'lucide-react';
import { ActionButton } from '@/app/components/ui/ActionButton';
import { generateMetricsCSV } from '@/lib/utils/exportMetrics';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { MetricFilter } from '@/lib/types/metrics';
import { METRIC_FILTERS } from '@/app/constants';
import { TableMetric } from '@/lib/data/resolvers';

export function MetricsHeader({ metrics }: { metrics: TableMetric[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [isExporting, startExportTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const [isTyping, setIsTyping] = useState(false);

  const updatePath = (key: string, value: MetricFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== METRIC_FILTERS.ALL) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  useEffect(() => {
    const currentQ = searchParams.get('q') || '';
    if (searchValue === currentQ) {
      setTimeout(() => setIsTyping(false), 0);
      return;
    }

    setTimeout(() => setIsTyping(true), 0);
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue) params.set('q', searchValue);
      else params.delete('q');

      startTransition(() => {
        router.push(`?${params.toString()}`, { scroll: false });
        setIsTyping(false);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, router, searchParams]);

  const handleClear = () => {
    setSearchValue('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const currentFilter = (searchParams.get('filter') as MetricFilter) || METRIC_FILTERS.ALL;

  const handleExport = () => {
    startExportTransition(async () => {
      try {
        const csvContent = await generateMetricsCSV(metrics);

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `metrics_report_${new Date().toISOString().split('T')[0]}.csv`;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Export failed:', error);
      }
    });
  };

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
          {isTyping || isPending ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : null}
          <div className="group relative w-full lg:max-w-72">
            <Search className="text-muted-foreground absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transition-colors group-focus-within:text-primary" />

            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search metrics..."
              className="w-full rounded-xl border border-foreground/10 bg-background py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/5"
            />

            {/* Right side Icon logic: Loader vs Cross */}
            <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              {searchValue && (
                <button
                  onClick={handleClear}
                  className="hover:bg-muted flex h-6 w-6 items-center justify-center rounded-full transition-colors"
                  type="button"
                  aria-label="Clear search"
                >
                  <X className="text-muted-foreground h-4 w-4 hover:text-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex gap-2">
            <ActionButton
              onClick={() => updatePath('filter', METRIC_FILTERS.ALL)}
              className={`${currentFilter === METRIC_FILTERS.ALL ? 'bg-primary/20 text-primary' : 'text-muted-foreground bg-transparent hover:text-foreground'}`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              All
            </ActionButton>

            <ActionButton
              onClick={() => updatePath('filter', METRIC_FILTERS.TOP)}
              className={`${currentFilter === METRIC_FILTERS.TOP ? 'bg-success/20 text-success' : 'text-muted-foreground bg-transparent hover:text-foreground'}`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Gainers
            </ActionButton>

            <ActionButton
              onClick={() => updatePath('filter', METRIC_FILTERS.UNDER)}
              className={`${currentFilter === METRIC_FILTERS.UNDER ? 'bg-destructive/20 text-destructive' : 'text-muted-foreground bg-transparent hover:text-foreground'}`}
            >
              <TrendingDown className="h-3.5 w-3.5" />
              Losers
            </ActionButton>
          </div>

          <ActionButton
            onClick={handleExport}
            disabled={isExporting}
            className="flex w-36 items-center justify-center bg-primary/70 text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            <span>{isExporting ? 'Exporting...' : 'Export'}</span>
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
