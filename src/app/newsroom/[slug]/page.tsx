import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Plate } from '@/components/Plate';
import { formatDate, getPost, getPostMetas } from '@/lib/news';

type Params = { slug: string };

export function generateStaticParams() {
  return getPostMetas().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: 'article', title: post.title, description: post.summary, publishedTime: post.date },
  };
}

const components = {
  p: (p: React.ComponentProps<'p'>) => <p className="body mt-6 first:mt-0" {...p} />,
  h2: (p: React.ComponentProps<'h2'>) => <h2 className="headline t-l mt-14" {...p} />,
  a: (p: React.ComponentProps<'a'>) => <a className="underline underline-offset-4" {...p} />,
};

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="pb-28 md:pb-40">
      <header className="grid-12 gap-y-8 pb-16 pt-36 md:pt-48">
        <p className="label col-span-12 text-mute">
          <Link href="/newsroom" className="hover:text-ink">
            Newsroom
          </Link>
          <span className="mx-3">/</span>
          {post.category}
        </p>
        <h1 className="headline t-xl col-span-12 md:col-span-11">{post.title}</h1>
        <time dateTime={post.date} className="label col-span-12 text-mute">
          {formatDate(post.date)}
        </time>
      </header>
      <div className="grid-12">
        <Plate kind={post.image} className="col-span-12 aspect-[16/9] md:aspect-[21/9]" />
      </div>
      <div className="grid-12 pt-16 md:pt-24">
        <div className="col-span-12 max-w-2xl md:col-span-7 md:col-start-4">
          <MDXRemote source={post.body} components={components} />
          <div className="mt-16">
            <Link href="/newsroom" className="link">
              All news
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
