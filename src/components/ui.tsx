import Link from 'next/link';

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
