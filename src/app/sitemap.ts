import type { MetadataRoute } from 'next';
import { getPostMetas } from '@/lib/news';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/platform', '/technology', '/company', '/newsroom', '/contact', '/privacy', '/supplier-code-of-conduct'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date('2026-11-01') })),
    ...getPostMetas().map((p) => ({ url: `${site.url}/newsroom/${p.slug}`, lastModified: new Date(p.date) })),
  ];
}
