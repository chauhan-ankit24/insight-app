import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers/providers';
import { SEO_CONFIG } from './constants/seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.SITE_URL),
  title: {
    default: SEO_CONFIG.SITE_NAME,
    template: `%s | ${SEO_CONFIG.SITE_NAME}`,
  },
  description: 'Professional real-time business performance tracking and analytics.',
  keywords: SEO_CONFIG.KEYWORDS,
  authors: [{ name: 'Nexus Team' }],
  creator: 'Nexus Analytics',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SEO_CONFIG.SITE_URL,
    siteName: SEO_CONFIG.SITE_NAME,
    images: [{ url: SEO_CONFIG.DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: SEO_CONFIG.TWITTER_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
