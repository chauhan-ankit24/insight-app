'use client';

import { MetricStatus } from '@/lib/types/metrics';
import dynamic from 'next/dynamic';

const DynamicMicroTrendChart = dynamic(
  () => import('./MicroTrendChart').then((mod) => mod.MicroTrendChart),
  {
    ssr: false,
    loading: () => <div className="bg-muted/10 h-10 w-24 animate-pulse rounded" />,
  }
);

export function ClientMicroTrendChart({
  data,
  status,
}: {
  data: { value: number }[];
  status: MetricStatus;
}) {
  return <DynamicMicroTrendChart data={data} status={status} />;
}
