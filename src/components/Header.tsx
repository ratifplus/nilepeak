'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/lib/site';

export function Header({ latest }: { latest: { title: string; slug: string } }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-ground">
      <Link href={`/newsroom/${latest.slug}`} className="block border-b border-rule bg-navy text-ground">
        <div className="grid-12 h-8 items-center">
          <p className="label col-span-12 truncate">
            <span className="text-ground/70">Latest</span>
            <span className="mx-3 text-ground/70">/</span>
            {latest.title}
          </p>
        </div>
      </Link>

      <div className="border-b border-rule">
        <div className="grid-12 h-16 items-center">
          <Link href="/" className="col-span-6 font-display text-xl font-bold uppercase tracking-[0.18em] md:col-span-3">
            Nile Peak
          </Link>
          <nav aria-label="Primary" className="col-span-9 hidden justify-end md:flex">
            <ul className="flex gap-8 lg:gap-12">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`label border-b pb-1 transition-colors ${active ? 'border-navy text-navy' : 'border-transparent text-ink/70 hover:text-navy'}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <button
            type="button"
            className="label col-span-6 justify-self-end md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-rule md:hidden">
            <ul className="grid-12">
              {nav.map((item) => (
                <li key={item.href} className="col-span-12 border-b border-rule last:border-b-0">
                  <Link href={item.href} className="headline block py-4 text-4xl">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
