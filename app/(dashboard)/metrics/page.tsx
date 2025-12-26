'use client';

import { useState, useMemo } from 'react';
import { mockMetrics } from '@/lib/data/mock-data';
import { MetricTable } from '@/app/(dashboard)/metrics/_components/MetricTable';
import { SummaryCards } from '@/app/(dashboard)/metrics/_components/SummaryCards';
import { Download, Search, TrendingUp, TrendingDown, LayoutGrid } from 'lucide-react';

export default function MetricsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'top' | 'under' | 'critical'>('all');

  const filteredMetrics = useMemo(() => {
    return mockMetrics.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category?.toLowerCase().includes(searchQuery.toLowerCase());

      if (filter === 'top') return matchesSearch && m.changePercent > 0;
      if (filter === 'under') return matchesSearch && m.changePercent < 0;
      if (filter === 'critical') return matchesSearch && m.status === 'critical';
      return matchesSearch;
    });
  }, [searchQuery, filter]);

  const handleExport = () => {
    // 1. Create CSV Header
    const headers = ['ID', 'Name', 'Category', 'Current Value', 'Change %'];

    // 2. Map Metrics to Rows
    const rows = filteredMetrics.map((m) => [
      m.id,
      m.name,
      m.category,
      m.value,
      `${m.changePercent}%`,
    ]);

    // 3. Combine and Create Blob
    const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // 4. Trigger Download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `metrics_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-foreground text-4xl font-black tracking-tight">Metrics</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Review and track your business performance in real-time.
          </p>
        </div>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-3">
          {/* Search Bar */}
          <div className="group relative w-full lg:max-w-72">
            <Search className="text-muted-foreground group-focus-within:text-primary absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transition-colors" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search metrics..."
              className="bg-card/40 border-border focus:ring-primary/40 focus:bg-card/60 w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm backdrop-blur-md transition-all focus:outline-none focus:ring-2"
            />
          </div>

          {/* Segmented Filter Control */}
          <div className="bg-secondary/40 border-border flex rounded-xl border p-1 backdrop-blur-md">
            <button
              onClick={() => setFilter('all')}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${filter === 'all' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              All
            </button>
            <button
              onClick={() => setFilter('top')}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${filter === 'top' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Top Performers
            </button>
            <button
              onClick={() => setFilter('under')}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${filter === 'under' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <TrendingDown className="h-3.5 w-3.5" />
              Underperforming
            </button>
          </div>

          <button
            className="border-border bg-card/50 hover:bg-accent hidden items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold backdrop-blur-md transition-all sm:inline-flex"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <SummaryCards metrics={mockMetrics} />

      <div className="border-border bg-card/30 overflow-hidden rounded-2xl border shadow-sm backdrop-blur-md">
        <MetricTable metrics={filteredMetrics} />
      </div>
    </div>
  );
}
