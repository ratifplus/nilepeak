import Link from 'next/link';
import { footerColumns, site } from '@/lib/site';
import { Wordmark } from './Wordmark';

export function Footer() {
  return (
    <footer className="border-t border-rule bg-ink">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" aria-label="Nile Peak home">
            <Wordmark />
          </Link>
          <p className="label mt-5 text-mute">{site.city}</p>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-mute">
            Grid-forming battery power stations. When the grid drops, the station holds.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-5">
          {footerColumns.map((col, i) => (
            <ul key={i} className="space-y-4">
              {col.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="label text-paper/80 transition-colors hover:text-volt">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        <div className="flex gap-3 md:col-span-2 md:justify-end">
          <a
            href={site.social.linkedin}
            aria-label="Nile Peak on LinkedIn"
            className="flex h-10 w-10 items-center justify-center border border-rule text-paper/80 transition-colors hover:border-volt hover:text-volt"
            target="_blank"
            rel="noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm7 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.6 4.77 6v5.46h-4v-4.84c0-1.16-.02-2.64-1.6-2.64-1.62 0-1.86 1.26-1.86 2.56v4.92h-4v-11Z" />
            </svg>
          </a>
          <a
            href={site.social.x}
            aria-label="Nile Peak on X"
            className="flex h-10 w-10 items-center justify-center border border-rule text-paper/80 transition-colors hover:border-volt hover:text-volt"
            target="_blank"
            rel="noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="wrap label flex flex-col gap-3 py-6 text-mute md:flex-row md:items-center md:gap-0">
          <Link href="/privacy" className="hover:text-paper">Privacy Policy</Link>
          <span className="hidden px-4 text-rule md:inline">|</span>
          <Link href="/supplier-code-of-conduct" className="hover:text-paper">Supplier Code of Conduct</Link>
          <span className="hidden px-4 text-rule md:inline">|</span>
          <span>© 2026 Nile Peak. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
