import type { Metadata, Viewport } from 'next';
import { Arimo } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { getPostMetas } from '@/lib/news';
import { site } from '@/lib/site';

const arimo = Arimo({ subsets: ['latin'], variable: '--font-arimo', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Nile Peak | Stable power is national infrastructure', template: '%s | Nile Peak' },
  description: site.description,
  openGraph: { siteName: 'Nile Peak', type: 'website' },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#ECECEC' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const latest = getPostMetas()[0];
  return (
    <html lang="en" className={arimo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="bg-ground text-ink">
        <a href="#main" className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-ground">
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
