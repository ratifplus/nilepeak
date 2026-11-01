import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getPostMetas } from '@/lib/news';
import { site } from '@/lib/site';

const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-barlow', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Nile Peak | Kampala, without load shedding', template: '%s | Nile Peak' },
  description: site.tagline,
  openGraph: { siteName: 'Nile Peak', type: 'website', locale: 'en_UG' },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#050607', colorScheme: 'dark' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const latest = getPostMetas()[0];
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="min-h-screen bg-ink text-paper">
        <a href="#main" className="label sr-only z-[100] bg-paper px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <Providers>
          <Header headline={{ title: latest.title, slug: latest.slug, category: latest.category }} />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
