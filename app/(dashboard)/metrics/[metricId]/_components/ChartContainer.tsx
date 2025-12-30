'use client';

import dynamic from 'next/dynamic';

// Lazy load the actual heavy Recharts components
const ContributorsChart = dynamic(
  () => import('./ContributorsChart').then((mod) => mod.ContributorsChart),
  {
    ssr: false,
    loading: () => <div className="bg-muted/10 h-[350px] w-full animate-pulse rounded-xl" />,
  }
);

const TrendChart = dynamic(() => import('./TrendChart').then((mod) => mod.TrendChart), {
  ssr: false,
  loading: () => <div className="bg-muted/10 h-[350px] w-full animate-pulse rounded-xl" />,
});

export function ClientTrendChart({
  data,
}: {
  data: {
    date: string;
    value: number;
  }[];
}) {
  return <TrendChart data={data} />;
}

export function ClientContributorsChart({
  data,
  keys,
}: {
  data: { [key: string]: string | number }[];
  keys: string[];
}) {
  return <ContributorsChart data={data} keys={keys} />;
}
