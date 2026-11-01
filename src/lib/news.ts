import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { PlateKind } from '@/components/Plate';

export type Category = 'NEWS' | 'PRESS';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: Category;
  summary: string;
  image: PlateKind;
}

export interface Post extends PostMeta {
  body: string;
}

const NEWS_DIR = path.join(process.cwd(), 'content', 'news');

function readPost(file: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(NEWS_DIR, file), 'utf8'));
  return {
    slug: file.replace(/\.mdx$/, ''),
    title: String(data.title),
    date: String(data.date),
    category: (data.category ?? 'NEWS') as Category,
    summary: String(data.summary ?? ''),
    image: (data.image ?? 'station') as PlateKind,
    body: content,
  };
}

export function getAllPosts(): Post[] {
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostMetas(): PostMeta[] {
  return getAllPosts().map(({ body: _body, ...meta }) => meta);
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00Z')
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .toUpperCase();
}
