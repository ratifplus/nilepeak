import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLink } from '@/components/ui';
import { PostVisual } from '@/components/visuals/Diagrams';
import { ShareLinks } from '@/components/ShareLinks';
import { formatDate, getPost, getPostMetas } from '@/lib/news';
import { site } from '@/lib/site';

type Params = { slug: string };

export function generateStaticParams() {
  return getPostMetas().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.date },
  };
}

const components = {
  h2: (p: React.ComponentProps<'h2'>) => <h2 className="display mt-14 text-4xl md:text-5xl" {...p} />,
  p: (p: React.ComponentProps<'p'>) => <p className="mt-6 text-lg leading-relaxed text-paper/85" {...p} />,
  ul: (p: React.ComponentProps<'ul'>) => <ul className="mt-6 space-y-3 border-l border-rule pl-6 text-lg text-paper/85" {...p} />,
  li: (p: React.ComponentProps<'li'>) => <li className="marker:text-volt" {...p} />,
  blockquote: (p: React.ComponentProps<'blockquote'>) => (
    <blockquote className="display my-12 border-l-2 border-volt pl-8 text-4xl md:text-5xl [&_p]:mt-0 [&_p]:font-display [&_p]:text-4xl [&_p]:text-paper md:[&_p]:text-5xl" {...p} />
  ),
  a: (p: React.ComponentProps<'a'>) => <a className="text-volt underline underline-offset-4" {...p} />,
};

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getPostMetas().filter((p) => p.slug !== slug).slice(0, 3);
  const url = `${site.url}/newsroom/${slug}`;

  return (
    <article>
      <header className="pt-40 md:pt-52">
        <div className="wrap">
          <Link href="/newsroom" className="label text-mute hover:text-paper">
            Newsroom
          </Link>
          <p className="label mt-10 flex gap-6 text-mute">
            <span className="text-volt">{post.category}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <h1 className="display mt-6 max-w-6xl text-6xl md:text-[7.5rem]">{post.title}</h1>
        </div>
        <div className="wrap mt-14">
          <PostVisual kind={post.visual} className="aspect-[21/9] border border-rule" />
        </div>
      </header>

      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <aside className="md:col-span-3">
          <div className="md:sticky md:top-32">
            <ShareLinks url={url} title={post.title} />
          </div>
        </aside>
        <div className="md:col-span-7">
          <p className="text-2xl leading-relaxed text-paper">{post.excerpt}</p>
          <MDXRemote source={post.body} components={components} />
        </div>
      </div>

      <section className="border-t border-rule">
        <div className="wrap py-20 md:py-28">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="display text-5xl">Related</h2>
            <ArrowLink href="/newsroom">All news</ArrowLink>
          </div>
          <ul className="grid gap-px bg-rule md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug} className="bg-ink">
                <Link href={`/newsroom/${p.slug}`} className="group block">
                  <PostVisual kind={p.visual} className="aspect-[16/10]" />
                  <div className="p-6">
                    <p className="label flex gap-4 text-mute">
                      <span className="text-volt">{p.category}</span>
                      <span>{formatDate(p.date)}</span>
                    </p>
                    <h3 className="display mt-4 text-3xl transition-colors group-hover:text-volt">{p.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
