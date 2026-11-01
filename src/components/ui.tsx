import Link from 'next/link';

/** One idea per screen: a mono section number over a headline and up to two sentences. */
export function Section({
  n,
  label,
  title,
  children,
  link,
  className = '',
}: {
  n?: string;
  label?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  link?: { href: string; label: string };
  className?: string;
}) {
  return (
    <section className={`screen border-t border-rule ${className}`}>
      <div className="grid-12 gap-y-10">
        <p data-reveal className="label col-span-12 text-mute md:col-span-3">
          {n && <span className="mr-4 text-navy">{n}</span>}
          {label}
        </p>
        <div className="col-span-12 md:col-span-9">
          <h2 data-reveal className="headline text-[13vw] md:text-[7.5vw] 2xl:text-[124px]">
            {title}
          </h2>
          {children && (
            <div data-reveal className="body mt-10 max-w-xl">
              {children}
            </div>
          )}
          {link && (
            <div data-reveal className="mt-12">
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
    <section className="flex min-h-[78svh] flex-col justify-end pb-16 pt-32 md:pb-24">
      <div className="grid-12 gap-y-8">
        <p className="label col-span-12 text-mute">{label}</p>
        <h1 className="headline col-span-12 text-[16vw] md:col-span-11 md:text-[10vw] 2xl:text-[168px]">{title}</h1>
        {children && <div className="body col-span-12 max-w-xl md:col-span-6 md:col-start-7">{children}</div>}
      </div>
    </section>
  );
}
