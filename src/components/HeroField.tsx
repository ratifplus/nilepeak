'use client';

import { useEffect, useRef } from 'react';

/** Delay after load before the field starts (ms). The engine module is fetched only then. */
const START_DELAY = 3000;

/**
 * Canvas for the landing hero's electric field. Keeps the initial page light:
 * the WebGL engine (heroFieldEngine.ts) is imported only after load and idle,
 * and never under prefers-reduced-motion.
 */
export function HeroField({ sourceId, emitterId }: { sourceId: string; emitterId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current!;
    const source = document.getElementById(sourceId);
    const emitter = document.getElementById(emitterId);
    if (!source || !emitter) return;

    let timer = 0;
    let disposed = false;
    let stop: (() => void) | null = null;

    const start = async () => {
      const [{ startField }] = await Promise.all([import('./heroFieldEngine'), document.fonts.ready]);
      if (!disposed) stop = startField(canvas, source, emitter);
    };
    const schedule = () => {
      timer = window.setTimeout(() => {
        if ('requestIdleCallback' in window) window.requestIdleCallback(() => void start(), { timeout: 2000 });
        else void start();
      }, START_DELAY);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      disposed = true;
      window.removeEventListener('load', schedule);
      window.clearTimeout(timer);
      stop?.();
    };
  }, [sourceId, emitterId]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] h-full w-full" />;
}
