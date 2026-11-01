import type { Metadata } from 'next';
import { NewsList } from '@/components/NewsList';
import { PageHero } from '@/components/ui';
import { formatDate, getPostMetas } from '@/lib/news';

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'News, blog posts and press releases from Nile Peak.',
};

export default function NewsroomPage() {
  const posts = getPostMetas().map((p) => ({ ...p, displayDate: formatDate(p.date) }));
  return (
    <>
      <PageHero kicker="Newsroom" title="Newsroom" intro="Updates from Nile Peak. For media enquiries, contact our press team." />
      <section>
        <div className="wrap py-16 md:py-24">
          <NewsList posts={posts} />
        </div>
      </section>
    </>
  );
}
