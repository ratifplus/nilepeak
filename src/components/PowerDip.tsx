'use client';

import { useEffect, useState } from 'react';
import { powerDip } from '@/config/effects';

/** Brief dim and flicker over a newly mounted page. Removed by timer in case animations are paused. */
export function PowerDip() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setDone(true), powerDip.duration + 60);
    return () => window.clearTimeout(id);
  }, []);
  if (done) return null;
  return (
    <div
      aria-hidden="true"
      onAnimationEnd={() => setDone(true)}
      className="power-dip pointer-events-none fixed inset-0 z-[90] bg-ink"
      style={{ ['--dip-ms' as string]: `${powerDip.duration}ms`, ['--dip-depth' as string]: powerDip.depth }}
    />
  );
}
