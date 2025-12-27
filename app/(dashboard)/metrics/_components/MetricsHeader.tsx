'use client';

import { Download, Search, TrendingUp, TrendingDown, LayoutGrid, Loader2, X } from 'lucide-react';
import { ActionButton } from '@/app/components/ui/ActionButton';
import { exportMetrics } from '@/lib/utils/exportMetrics';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition, useMemo } from 'react';
import { Metric } from '@/lib/types/metrics';

export function MetricsHeader({ metrics }: { metrics: Metric[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const [isTyping, setIsTyping] = useState(false);

  const updatePath = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
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

  const currentFilter = searchParams.get('filter') || 'all';

  const filteredMetrics = useMemo(() => {
    const q = searchParams.get('q')?.toLowerCase() || '';
    const filter = searchParams?.get('filter') || 'all';

    return metrics?.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(q) || m.category?.toLowerCase().includes(q);

      // Filter Logic
      if (filter === 'top') return matchesSearch && m.changePercent > 0;
      if (filter === 'under') return matchesSearch && m.changePercent < 0;
      if (filter === 'critical') return matchesSearch && m.status === 'critical';

      return matchesSearch;
    });
  }, [metrics, searchParams]);

  const exportMetricsHandler = () => {
    exportMetrics(filteredMetrics);
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
                >
                  <X className="text-muted-foreground h-4 w-4 hover:text-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex gap-2">
            <ActionButton
              onClick={() => updatePath('filter', 'all')}
              className={`${currentFilter === 'all' ? 'bg-primary/20 text-primary' : 'text-muted-foreground bg-transparent hover:text-foreground'}`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              All
            </ActionButton>

            <ActionButton
              onClick={() => updatePath('filter', 'top')}
              className={`${currentFilter === 'top' ? 'bg-success/20 text-success' : 'text-muted-foreground bg-transparent hover:text-foreground'}`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Gainers
            </ActionButton>

            <ActionButton
              onClick={() => updatePath('filter', 'under')}
              className={`${currentFilter === 'under' ? 'bg-destructive/20 text-destructive' : 'text-muted-foreground bg-transparent hover:text-foreground'}`}
            >
              <TrendingDown className="h-3.5 w-3.5" />
              Losers
            </ActionButton>
          </div>

          <ActionButton
            onClick={exportMetricsHandler}
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
