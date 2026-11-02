'use client';

import { useEffect, useRef } from 'react';

const W = 1200;
const H = 240;
const CYCLES = 4;
const SETTLE_MS = 2400;

function path(chaos: number, t: number) {
  let d = '';
  for (let x = 0; x <= W; x += 4) {
    const u = x / W;
    const drift = 1 + chaos * 0.18 * Math.sin(t * 0.0011 + u * 3);
    const amp = 1 - chaos * (0.35 + 0.3 * Math.sin(u * 9 + t * 0.002));
    const noise = chaos * (Math.sin(u * 61 + t * 0.006) * 0.12 + Math.sin(u * 23 - t * 0.004) * 0.1);
    const y = H / 2 - (Math.sin(u * CYCLES * 2 * Math.PI * drift) * amp + noise) * (H * 0.4);
    d += `${x ? 'L' : 'M'}${x} ${y.toFixed(1)}`;
  }
  return d;
}

/** A thin waveform that wavers, then settles into a clean sine once it enters view. */
export function Waveform() {
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.setAttribute('d', path(0, 0));
      return;
    }
    let raf = 0;
    let start = 0;
    const step = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / SETTLE_MS);
      const chaos = 1 - p * p * (3 - 2 * p);
      el.setAttribute('d', path(chaos, now));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="A waveform that wavers, then settles into a clean sine wave">
      <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="#AEAEAE" strokeWidth="1" />
      <path ref={ref} d={path(1, 0)} stroke="#1B2A4A" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
