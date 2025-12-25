import Link from 'next/link';
import { mockMetrics } from '../../../lib/data/mock-data';
import { formatCurrency, formatDate } from '../../../lib/utils/formatters';

export default function MetricsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Metrics</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockMetrics.map((metric) => (
          <Link key={metric.id} href={`/metrics/${metric.id}`}>
            <div className="rounded-lg border p-4 transition-shadow hover:shadow-lg">
              <h2 className="text-lg font-semibold">{metric.name}</h2>
              <p className="text-2xl font-bold">
                {metric.unit === 'USD'
                  ? formatCurrency(metric.value)
                  : `${metric.value} ${metric.unit}`}
              </p>
              <p className="text-sm text-gray-500">
                Last updated: {formatDate(metric.lastUpdated)}
              </p>
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
          </Link>
        ))}
      </div>
    </div>
  );
}
