'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { PostMeta } from '@/lib/news';
import { PostVisual } from './visuals/Diagrams';

const FILTERS = ['ALL', 'NEWS', 'BLOG', 'PRESS'] as const;

export function NewsList({ posts }: { posts: (PostMeta & { displayDate: string })[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('ALL');
  const shown = filter === 'ALL' ? posts : posts.filter((p) => p.category === filter);

  return (
    <div>
      <div role="tablist" aria-label="Filter posts" className="flex flex-wrap gap-2 border-b border-rule pb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`label border px-4 py-2 transition-colors ${filter === f ? 'border-volt text-volt' : 'border-rule text-mute hover:text-paper'}`}
          >
            {f}
            <span className="ml-2 text-mute">{f === 'ALL' ? posts.length : posts.filter((p) => p.category === f).length}</span>
          </button>
        ))}
      </div>

      <ul>
        {shown.map((p) => (
          <li key={p.slug} className="border-b border-rule">
            <Link href={`/newsroom/${p.slug}`} className="group grid items-center gap-6 py-8 md:grid-cols-12">
              <div className="label flex gap-6 text-mute md:col-span-3 md:flex-col md:gap-2">
                <span>{p.displayDate}</span>
                <span className="text-volt">{p.category}</span>
              </div>
              <h2 className="display text-3xl transition-colors group-hover:text-volt md:col-span-6 md:text-5xl">{p.title}</h2>
              <PostVisual kind={p.visual} className="aspect-[16/10] border border-rule md:col-span-3" />
            </Link>
          </li>
        ))}
        {shown.length === 0 && <li className="label py-16 text-mute">No posts in this category yet.</li>}
      </ul>
    </div>
  );
}
