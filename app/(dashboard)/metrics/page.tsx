import { mockMetrics } from '@/lib/data/mock-data';
import { MetricTable } from '@/app/components/insights/MetricTable';
import { Plus } from 'lucide-react';

export default function MetricsPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Metrics</h1>
          <p className="text-muted-foreground mt-1">
            You can browse your metrics to review and keep track of progress.
          </p>
        </div>
      </div>

      {/* Table Component */}
      <div className="overflow-hidden rounded-xl border shadow-sm">
        <MetricTable metrics={mockMetrics} />
      </div>
    </div>
  );
}
