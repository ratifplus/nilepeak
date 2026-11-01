import type { Metadata } from 'next';
import Link from 'next/link';
import { PageTitle } from '@/components/ui';
import { formatDate, getPostMetas } from '@/lib/news';

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'News and press releases from Nile Peak.',
};

export default function NewsroomPage() {
  const posts = getPostMetas();
  return (
    <>
      <PageTitle label="Newsroom" title="Newsroom" />
      <section className="pb-28 md:pb-40">
        <div className="grid-12">
          <ul className="col-span-12 border-t border-rule">
            {posts.map((p) => (
              <li key={p.slug} data-reveal className="border-b border-rule">
                <Link href={`/newsroom/${p.slug}`} className="grid grid-cols-12 gap-x-6 gap-y-2 py-10 transition-opacity hover:opacity-60">
                  <time dateTime={p.date} className="label col-span-6 text-mute md:col-span-2 md:pt-2">
                    {formatDate(p.date)}
                  </time>
                  <span className="label col-span-6 text-mute md:col-span-1 md:pt-2">{p.category}</span>
                  <span className="headline col-span-12 text-4xl md:col-span-9 md:text-6xl">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
