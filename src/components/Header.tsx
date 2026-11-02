'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/lib/site';

export function Header({ latest }: { latest: { title: string; slug: string } }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [strip, setStrip] = useState(true);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40">
      {strip && (
        <div className="bg-white">
          <div className="grid-12 h-8 items-center">
            <p className="label col-span-3 flex items-center gap-2 text-ink md:col-span-2">
              <span className="h-2 w-2 rounded-full bg-navy" aria-hidden="true" />
              News
            </p>
            <Link href={`/newsroom/${latest.slug}`} className="label col-span-8 truncate text-ink hover:text-navy md:col-span-9 md:text-center">
              {latest.title}
            </Link>
            <button type="button" onClick={() => setStrip(false)} aria-label="Dismiss news" className="col-span-1 justify-self-end text-ink hover:text-navy">
              <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
                <path d="M1 1l9 9M10 1l-9 9" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="absolute inset-x-0">
        <div className="grid-12 h-16 items-center">
          <Link href="/" className="col-span-6 text-lg font-bold uppercase tracking-[0.06em] text-ink">
            Nile Peak
          </Link>
          <button
            type="button"
            className="col-span-6 flex h-10 w-10 flex-col justify-center gap-2 justify-self-end"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`h-px w-full bg-ink transition-transform ${open ? 'translate-y-[4.5px] rotate-45' : ''}`} />
            <span className={`h-px w-full bg-ink transition-transform ${open ? '-translate-y-[4.5px] -rotate-45' : ''}`} />
          </button>
        </div>
        {open && (
          <nav id="site-menu" aria-label="Primary" className="bg-white">
            <ul className="grid-12 py-8">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <li key={item.href} className="col-span-12">
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`t-l block py-2 font-bold transition-colors hover:text-navy ${active ? 'text-navy' : 'text-title'}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
