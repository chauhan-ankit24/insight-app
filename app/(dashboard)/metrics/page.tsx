'use client';

import { useState, useMemo } from 'react';
import { mockMetrics } from '@/lib/data/mock-data';
import { MetricTable } from '@/app/(dashboard)/metrics/_components/MetricTable';
import { SummaryCards } from '@/app/(dashboard)/metrics/_components/SummaryCards';
import { Download, Search, TrendingUp, TrendingDown, LayoutGrid } from 'lucide-react';
import { ActionButton } from '@/app/components/ui/ActionButton';

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
          <h1 className="text-4xl font-black tracking-tight text-foreground">Metrics</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Review and track your business performance in real-time.
          </p>
        </div>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-3">
          {/* Search Bar */}
          <div className="group relative w-full lg:max-w-72">
            <Search className="text-muted-foreground absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transition-colors" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search metrics..."
              className="w-full rounded-xl border border-foreground/20 bg-background py-2 pl-10 pr-4 text-sm outline-none"
            />
          </div>

          {/* Segmented Filter Control */}
          <div className="flex gap-2">
            <ActionButton
              onClick={() => setFilter('all')}
              className={`${filter === 'all' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              All
            </ActionButton>
            <ActionButton
              onClick={() => setFilter('top')}
              className={`${filter === 'top' ? 'bg-success/10 text-success' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Gainers
            </ActionButton>
            <ActionButton
              onClick={() => setFilter('under')}
              className={`${filter === 'under' ? 'bg-destructive/10 text-[hsl(var(--destructive))]' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <TrendingDown className="h-3.5 w-3.5" />
              Loosers
            </ActionButton>
          </div>

          <ActionButton onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </ActionButton>
        </div>
      </div>

      <SummaryCards metrics={mockMetrics} />
      <MetricTable metrics={filteredMetrics} />
    </div>
  );
}
