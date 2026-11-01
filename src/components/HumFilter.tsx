'use client';

import { useEffect, useRef } from 'react';

const FPS = 12;
const PERIOD = 14; // seconds per breath of the haze

/**
 * The hero shimmer. A slow, low-frequency turbulence field displaces the
 * headline by 1 to 2 px, like air bending over an energized station.
 * Starts only after the page has loaded, steps at a low frame rate, pauses
 * off screen, and never runs under prefers-reduced-motion.
 */
export function HumFilter({ target }: { target: string }) {
  const noise = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = document.querySelector<HTMLElement>(target);
    if (!el) return;

    let timer = 0;
    let visible = true;
    const t0 = performance.now();
    const tick = () => {
      if (!visible) return;
      const phase = Math.sin(((performance.now() - t0) / 1000 / PERIOD) * Math.PI * 2) * 0.5 + 0.5;
      noise.current?.setAttribute('baseFrequency', `${(0.003 + phase * 0.0015).toFixed(5)} ${(0.014 + phase * 0.004).toFixed(5)}`);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));

    const start = () => {
      el.classList.add('hum-on');
      io.observe(el);
      timer = window.setInterval(tick, 1000 / FPS);
    };
    let idle = 0;
    const schedule = () => {
      idle = window.setTimeout(start, 3500);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      window.removeEventListener('load', schedule);
      window.clearTimeout(idle);
      window.clearInterval(timer);
      io.disconnect();
      el.classList.remove('hum-on');
    };
  }, [target]);

  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <filter id="hum" x="-2%" y="-10%" width="104%" height="120%" colorInterpolationFilters="sRGB">
        <feTurbulence ref={noise} type="fractalNoise" baseFrequency="0.003 0.014" numOctaves="1" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
