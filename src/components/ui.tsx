import Link from 'next/link';
import { Plate } from '@/components/Plate';
import { formatDate, type PostMeta } from '@/lib/news';

/** Navy square on an object. Opens a short note about that part. */
export function Hotspot({
  title,
  text,
  x,
  y,
  align = 'left',
}: {
  title: string;
  text: string;
  x: number;
  y: number;
  align?: 'left' | 'right';
}) {
  return (
    <details className="group absolute z-20 open:z-30" style={{ left: `${x}%`, top: `${y}%` }}>
      <summary aria-label={title} className="pulse flex h-6 w-6 cursor-pointer list-none items-center justify-center bg-navy text-white [&::-webkit-details-marker]:hidden">
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="transition-transform group-open:rotate-45">
          <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1" />
        </svg>
      </summary>
      <div className={`absolute top-8 w-48 bg-card p-4 md:w-56 ${align === 'left' ? 'left-0' : 'right-0'}`}>
        <p className="text-sm font-bold text-title">{title}</p>
        <p className="mt-2 text-sm font-light leading-snug text-title">{text}</p>
      </div>
    </details>
  );
}

/** A story on the white news ground. The navy tag marks its category. */
export function NewsCard({ post }: { post: PostMeta }) {
  return (
    <li data-reveal className="relative flex flex-col bg-card">
      <Plate kind={post.image} label={false} className="aspect-[4/3] w-full" sizes="(min-width: 768px) 33vw, 100vw" />
      <div className="flex flex-1 flex-col gap-10 p-5">
        <Link href={`/newsroom/${post.slug}`} className="text-lg leading-snug text-title after:absolute after:inset-0 hover:text-navy">
          {post.title}
        </Link>
        <div className="mt-auto flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-2 text-title">
            <span className="h-2 w-2 bg-navy" aria-hidden="true" />
            <span className="capitalize">{post.category.toLowerCase()}</span>
          </span>
          <time dateTime={post.date} className="text-mute">
            {formatDate(post.date)}
          </time>
        </div>
      </div>
    </li>
  );
}

/** Small index and label over a hairline. Opens each block of content. */
export function Marker({ n, label }: { n?: string; label: string }) {
  return (
    <div data-reveal className="border-b border-rule pb-3">
      {n && <p className="text-[11px] leading-none text-mute">{n}</p>}
      <p className="mt-1 text-sm text-title">{label}</p>
    </div>
  );
}

/** A block of content on a stepped grey ground. */
export function Section({
  n,
  label,
  title,
  children,
  link,
  className = '',
}: {
  n?: string;
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  link?: { href: string; label: string };
  className?: string;
}) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="grid-12 gap-y-10">
        <div className="col-span-12">
          <Marker n={n} label={label} />
        </div>
        <h2 data-reveal className="headline t-l col-span-12 md:col-span-8">
          {title}
        </h2>
        <div className="col-span-12 md:col-span-4">
          {children && (
            <div data-reveal className="body">
              {children}
            </div>
          )}
          {link && (
            <div data-reveal className="mt-8">
              <Link href={link.href} className="link">
                {link.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function PageTitle({ label, title, children }: { label: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="bg-step pb-16 pt-40 md:pb-24 md:pt-56">
      <div className="grid-12 gap-y-8">
        <p className="label col-span-12 text-mute">{label}</p>
        <h1 className="headline t-xl col-span-12 md:col-span-9">{title}</h1>
        {children && <div className="body col-span-12 md:col-span-5">{children}</div>}
      </div>
    </section>
  );
}
