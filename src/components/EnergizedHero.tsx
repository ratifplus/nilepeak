'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { scene as sceneCfg } from '@/config/effects';
import { useReducedMotion } from './Providers';
import { HeroPoster } from './visuals/HeroPoster';
import type { HeroVariant } from './three/HeroScene';

const HeroScene = dynamic(() => import('./three/HeroScene'), { ssr: false });

interface Props {
  variant: HeroVariant;
  /** Headline lines, already uppercase. Each renders on its own line. */
  lines: string[];
  kicker: string;
  children?: React.ReactNode;
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Full-bleed hero. The real HTML headline is always present. After first
 * paint the WebGL scene mounts behind a dark poster; once the energized copy
 * is drawn, the HTML glyphs go transparent so the two never double up.
 */
export function EnergizedHero({ variant, lines, kicker, children }: Props) {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced || !webglAvailable()) return;
    let idle = 0;
    const raf = requestAnimationFrame(() => {
      idle = window.setTimeout(() => setMount(true), sceneCfg.mountDelay);
    });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
    };
  }, [reduced]);

  const onReady = useCallback(() => setReady(true), []);

  const align = variant === 'core' ? 'items-end' : 'items-end';

  return (
    <section
      ref={section}
      className={`relative flex h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink ${align} ${ready ? 'energized-ready' : ''}`}
    >
      <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}>
        <HeroPoster variant={variant} />
      </div>
      {mount && section.current && headline.current && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <HeroScene variant={variant} container={section.current} source={headline.current} onReady={onReady} />
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="wrap relative z-10 pb-14 md:pb-20">
        <p className="label mb-6 flex items-center gap-3 text-mute">
          <span className="h-1.5 w-1.5 rounded-full bg-volt shadow-[0_0_8px_#3AD1FF]" />
          {kicker}
        </p>
        <h1 ref={headline} className="display energized-source text-[14vw] leading-[0.86] sm:text-[11vw] lg:text-[8.6vw] 2xl:text-[136px]">
          {lines.map((l) => (
            <span key={l} data-line className="block whitespace-nowrap">
              {l}
            </span>
          ))}
        </h1>
        {children}
      </div>
    </section>
  );
}
