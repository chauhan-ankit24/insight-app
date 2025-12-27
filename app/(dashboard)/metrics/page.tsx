'use client';

import { useState, useMemo } from 'react';
import { mockMetrics } from '@/lib/data/mock-data';
import { MetricTable } from '@/app/(dashboard)/metrics/_components/MetricsTable';
import { SummaryCards } from '@/app/(dashboard)/metrics/_components/MetricsSummaryCards';
import { MetricsHeader } from '@/app/(dashboard)/metrics/_components/MetricsHeader';
import { exportMetrics } from '@/lib/utils/exportMetrics';

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

  return (
    <div className="relative space-y-8">
      <MetricsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
        onExport={() => exportMetrics(filteredMetrics)}
      />

      <SummaryCards metrics={mockMetrics} />
      <MetricTable metrics={filteredMetrics} />
    </div>
  );
}
