import { MetadataRoute } from 'next';
import { SEO_CONFIG } from './constants/seo';
import { getMetrics } from '@/lib/data/resolvers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const metrics = await getMetrics();

  const metricEntries = metrics.map((m) => ({
    url: `${SEO_CONFIG.SITE_URL}/dashboard/metrics/${m.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    { url: SEO_CONFIG.SITE_URL, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    ...metricEntries,
  ];
}
