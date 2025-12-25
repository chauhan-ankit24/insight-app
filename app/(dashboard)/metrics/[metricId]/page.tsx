'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { mockMetrics, mockContributors } from '../../../../lib/data/mock-data';
import { formatCurrency, formatDate } from '../../../../lib/utils/formatters';

export default function MetricDetailPage() {
  const params = useParams();
  const metricId = params.metricId as string;

  const metric = mockMetrics.find((m) => m.id === metricId);

  if (!metric) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Metric Not Found</h1>
        <p>The requested metric could not be found.</p>
        <Link href="/metrics" className="text-blue-500 hover:underline">
          Back to Metrics
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/metrics" className="text-blue-500 hover:underline">
          ← Back to Metrics
        </Link>
        <h1 className="text-2xl font-bold">{metric.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Metric Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Value:</span>
              <span className="text-xl font-bold">
                {metric.unit === 'USD'
                  ? formatCurrency(metric.value)
                  : `${metric.value} ${metric.unit}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Unit:</span>
              <span>{metric.unit}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Trend:</span>
              <span
                className={`inline-block rounded px-2 py-1 text-xs ${
                  metric.trend === 'up'
                    ? 'bg-green-100 text-green-800'
                    : metric.trend === 'down'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                }`}
              >
                {metric.trend.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Last Updated:</span>
              {/* <span>{formatDate(metric.lastUpdated)}</span> */}
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Contributors</h2>
          <div className="space-y-2">
            {mockContributors.map((contributor) => (
              <div key={contributor.id} className="flex justify-between">
                <span>{contributor.name}</span>
                <span className="font-medium">{contributor.contribution}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
