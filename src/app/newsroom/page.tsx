import type { Metadata } from 'next';
import { NewsCard, PageTitle } from '@/components/ui';
import { getPostMetas } from '@/lib/news';

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'News and press releases from Nile Peak.',
};

export default function NewsroomPage() {
  const posts = getPostMetas();
  return (
    <>
      <PageTitle label="Newsroom" title="Newsroom" />
      <section className="bg-white py-16 md:py-24">
        <div className="grid-12">
          <ul className="col-span-12 grid gap-4 md:grid-cols-3 md:gap-6">
            {posts.map((p) => (
              <NewsCard key={p.slug} post={p} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
