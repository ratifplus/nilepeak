import { ogContentType, ogSize, renderOg } from '@/lib/og';
import { getPost, getPostMetas } from '@/lib/news';

export const alt = 'Nile Peak newsroom';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getPostMetas().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return renderOg(post?.title ?? 'Newsroom', post?.category ?? 'NEWSROOM');
}
