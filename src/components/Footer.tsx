import Link from 'next/link';
import { nav } from '@/lib/site';

const secondary = [
  { href: '/contact?topic=media', label: 'Media Inquiries' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/supplier-code-of-conduct', label: 'Supplier Code of Conduct' },
];

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="grid-12 gap-y-12 py-16 md:py-24">
        <Link href="/" className="headline col-span-12 text-6xl md:col-span-6 md:text-8xl">
          Nile Peak
        </Link>
        <ul className="col-span-6 space-y-3 md:col-span-3">
          {nav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="label hover:opacity-60">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="col-span-6 space-y-3 md:col-span-3">
          {secondary.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="label hover:opacity-60">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-rule">
        <div className="grid-12 py-6">
          <p className="label col-span-12 text-mute">© 2026 Nile Peak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
