import { mockMetrics } from '@/lib/data/mock-data';
import { MetricTable } from '@/app/(dashboard)/metrics/_components/MetricTable';
import { SummaryCards } from '@/app/(dashboard)/metrics/_components/SummaryCards';
import { Download, Calendar, Search } from 'lucide-react';

export default function MetricsPage() {
  return (
    <div className="space-y-8 p-6">
      {/* 1. Header Section with Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-foreground text-4xl font-black tracking-tight">Metrics</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Review and track your business performance in real-time.
          </p>
        </div>

        {/* --- NEW ACTION BUTTONS --- */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="group relative max-w-96 flex-1">
            <Search className="text-muted-foreground group-focus-within:text-primary absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transition-colors" />
            <input
              placeholder="Search by metric name, category or ID..."
              className="bg-card/40 border-border focus:ring-primary/40 focus:bg-card/60 w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm backdrop-blur-md transition-all focus:outline-none focus:ring-2"
            />
          </div>

          {/* Secondary Action: Export */}
          <button className="border-border bg-card/50 hover:bg-accent hidden items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold backdrop-blur-md transition-all sm:inline-flex">
            <Download className="h-4 w-4" />
            Export
          </button>

          {/* Secondary Action: Date Picker Placeholder */}
          <button className="border-border bg-card/50 hover:bg-accent inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold backdrop-blur-md transition-all">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </button>
        </div>
      </div>

      <SummaryCards metrics={mockMetrics} />

      {/* Table Component */}
      <div className="border-border bg-card/30 overflow-hidden rounded-2xl border shadow-sm backdrop-blur-md">
        <MetricTable metrics={mockMetrics} />
      </div>
    </div>
  );
}
