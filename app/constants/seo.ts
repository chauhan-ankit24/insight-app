export const SEO_CONFIG = {
  SITE_NAME: 'Insight Edge',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://insight-edge-beta.vercel.app',
  TWITTER_HANDLE: '@insight_edge',
  DEFAULT_DESCRIPTION: 'Real-time business intelligence and performance tracking.',
  KEYWORDS: [
    'business intelligence',
    'real-time metrics',
    'SaaS dashboard',
    'data visualization',
  ] as string[],
  DEFAULT_OG_IMAGE: '/logo.png',
} as const;
