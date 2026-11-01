'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/lib/site';
import { Wordmark } from './Wordmark';
import { SoundToggle } from './SoundToggle';

export function Header({ headline }: { headline: { title: string; slug: string; category: string } }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* News ticker */}
      <Link
        href={`/newsroom/${headline.slug}`}
        className="group block h-8 overflow-hidden border-b border-rule bg-ink text-paper"
        aria-label={`Latest news: ${headline.title}`}
      >
        <div className="ticker-track flex w-max items-center whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="label flex items-center gap-4 px-6 leading-8" aria-hidden={i > 0}>
              <span className="text-volt">{headline.category}</span>
              <span className="text-paper group-hover:text-volt">{headline.title}</span>
              <span className="text-mute">READ MORE</span>
              <span className="text-rule">/</span>
            </span>
          ))}
        </div>
      </Link>

      <div
        className={`transition-colors duration-300 ${
          scrolled || open ? 'border-b border-rule bg-ink/90 backdrop-blur-md' : 'border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent'
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between">
          <Link href="/" aria-label="Nile Peak home" className="shrink-0">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`label relative py-2 transition-colors hover:text-paper ${
                      isActive(item.href) ? 'text-paper' : 'text-paper/70'
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="absolute inset-x-0 -bottom-[1px] h-px bg-volt shadow-[0_0_8px_#3AD1FF]" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <SoundToggle className="hidden whitespace-nowrap xl:inline-flex" />
            <Link href="/contact" className="label hidden border border-paper/30 px-4 py-2 transition-colors hover:border-volt hover:text-volt sm:inline-block">
              Contact
            </Link>
            <button
              type="button"
              className="label flex h-9 items-center gap-2 xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="flex w-5 flex-col gap-[5px]">
                <span className={`h-px bg-paper transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
                <span className={`h-px bg-paper transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
              </span>
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="wrap border-t border-rule pb-8 xl:hidden">
            <ul>
              {[...nav, { href: '/contact', label: 'Contact' }].map((item, i) => (
                <li key={item.href} className="border-b border-rule">
                  <Link href={item.href} className="flex items-baseline gap-5 py-4">
                    <span className="label text-mute">{String(i + 1).padStart(2, '0')}</span>
                    <span className="display text-3xl">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <SoundToggle className="mt-6" />
          </div>
        )}
      </div>
    </header>
  );
}
