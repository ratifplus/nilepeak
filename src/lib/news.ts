import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type Category = 'NEWS' | 'BLOG' | 'PRESS';
export type PostVisualKind = 'station' | 'wave' | 'grid' | 'core' | 'city';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: Category;
  excerpt: string;
  featured: boolean;
  visual: PostVisualKind;
}

export interface Post extends PostMeta {
  body: string;
}

const NEWS_DIR = path.join(process.cwd(), 'content', 'news');

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(NEWS_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.mdx$/, ''),
    title: String(data.title),
    date: String(data.date),
    category: (data.category ?? 'NEWS') as Category,
    excerpt: String(data.excerpt ?? ''),
    featured: Boolean(data.featured),
    visual: (data.visual ?? 'station') as PostVisualKind,
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
  const d = new Date(iso + 'T00:00:00Z');
  return d
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .toUpperCase();
}
