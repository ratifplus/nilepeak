import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { getPostMetas } from '@/lib/news';
import { site } from '@/lib/site';

const barlow = Barlow_Condensed({ subsets: ['latin'], weight: '700', variable: '--font-barlow', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: '500', variable: '--font-plex-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Nile Peak | Stable power is national infrastructure', template: '%s | Nile Peak' },
  description: site.description,
  openGraph: { siteName: 'Nile Peak', type: 'website' },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#E6E6E4' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const latest = getPostMetas()[0];
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="bg-ground text-ink">
        <a href="#main" className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-ground">
          Skip to content
        </a>
        <Header latest={{ title: latest.title, slug: latest.slug }} />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
