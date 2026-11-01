import Link from 'next/link';

/** A deliberately redacted value: LABEL ████ UNIT */
export function Redacted({ label, unit, size = 4, className = '' }: { label?: string; unit?: string; size?: number; className?: string }) {
  return (
    <span className={`label inline-flex items-center gap-2 whitespace-nowrap ${className}`}>
      {label && <span>{label}</span>}
      <span className="redacted-bar" style={{ width: `${size * 0.75}em` }} role="img" aria-label="redacted" />
      {unit && <span>{unit}</span>}
    </span>
  );
}

/** Numbered section marker: 01 / MISSION */
export function SectionLabel({ n, children, className = '' }: { n?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`label flex items-center gap-4 text-mute ${className}`}>
      {n && <span className="text-paper">{n}</span>}
      <span className="h-px w-10 bg-rule" />
      <span>{children}</span>
    </div>
  );
}

export function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`link-arrow ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}

export interface SpecRow {
  label: string;
  value?: string;
  redact?: { label?: string; unit?: string; size?: number };
}

/** Spec sheet with thin rules. Values are redacted unless given explicitly. */
export function SpecSheet({ title, rows, className = '' }: { title: string; rows: SpecRow[]; className?: string }) {
  return (
    <div className={`border border-rule bg-panel/60 ${className}`}>
      <div className="label flex items-center justify-between border-b border-rule px-5 py-3 text-mute">
        <span>{title}</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-volt shadow-[0_0_6px_#3AD1FF]" />
          Restricted
        </span>
      </div>
      <dl>
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-2 border-b border-rule px-5 py-3.5 last:border-b-0">
            <dt className="label text-mute">{r.label}</dt>
            <dd className="label text-right text-paper">
              {r.value ?? <Redacted unit={r.redact?.unit} size={r.redact?.size ?? 4} label={r.redact?.label} />}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Interior page hero for non-WebGL pages. */
export function PageHero({ kicker, title, intro, children }: { kicker: string; title: React.ReactNode; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-rule pt-40 pb-16 md:pt-52 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(58,209,255,0.07),transparent_55%)]" />
      <div className="wrap relative">
        <SectionLabel>{kicker}</SectionLabel>
        <h1 className="display mt-8 max-w-5xl text-[13vw] md:text-[7.5rem]">{title}</h1>
        {intro && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mute">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function ContactCta({ title = 'Talk to Nile Peak', body }: { title?: string; body?: string }) {
  return (
    <section className="border-t border-rule">
      <div className="wrap grid gap-10 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-7">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="display mt-6 text-6xl md:text-8xl">{title}</h2>
        </div>
        <div className="flex flex-col justify-end gap-8 md:col-span-5">
          <p className="text-lg leading-relaxed text-mute">
            {body ?? 'Utilities, developers, businesses and institutions: we brief qualified partners in person.'}
          </p>
          <div>
            <Link href="/contact?tab=partnerships" className="btn">
              Request a briefing <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
