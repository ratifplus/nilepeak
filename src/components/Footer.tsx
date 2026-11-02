import Link from 'next/link';
import { nav } from '@/lib/site';

const secondary = [
  { href: '/contact?topic=media', label: 'Media Inquiries' },
  { href: '/contact', label: 'Request a briefing' },
];

const legal = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/supplier-code-of-conduct', label: 'Supplier Code of Conduct' },
];

export function Footer() {
  return (
    <footer className="bg-step">
      <div className="grid-12 gap-y-10 pb-10 pt-16">
        <div className="col-span-12 md:col-span-6">
          <Link href="/" className="text-2xl font-bold uppercase tracking-[0.06em] text-ink">
            Nile Peak
          </Link>
          <p className="mt-4 text-sm leading-snug text-mute">Office address placeholder</p>
        </div>
        <ul className="col-span-6 space-y-2 md:col-span-3">
          {nav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="label text-mute hover:text-navy">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="col-span-6 space-y-2 md:col-span-3">
          {secondary.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="label text-mute hover:text-navy">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid-12 gap-y-2 pb-6">
        <p className="label col-span-12 flex flex-wrap gap-x-3 text-mute md:col-span-7">
          {legal.map((l, i) => (
            <span key={l.href} className="flex gap-3">
              {i > 0 && <span aria-hidden="true">|</span>}
              <Link href={l.href} className="hover:text-navy">
                {l.label}
              </Link>
            </span>
          ))}
        </p>
        <p className="label col-span-12 text-mute md:col-span-5 md:text-right">© 2026 Nile Peak. All rights reserved.</p>
      </div>
    </footer>
  );
}
