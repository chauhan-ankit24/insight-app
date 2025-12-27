import { MetadataRoute } from 'next';
import { SEO_CONFIG } from './constants/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard/settings/'],
    },
    sitemap: `${SEO_CONFIG.SITE_URL}/sitemap.xml`,
  };
}
