'use client';

import { useEffect, useRef } from 'react';
import { colors } from '@/config/effects';
import { useReducedMotion } from './Providers';
import { Redacted } from './ui';

/**
 * Two scopes, side by side. Left: a weak grid, its waveform drifting in
 * frequency, sagging and dropping out. Right: the Core's steady 50 Hz.
 * Time is slowed so one cycle is readable on screen.
 */
function Scope({ mode, label }: { mode: 'unstable' | 'steady'; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const cvs = ref.current!;
    const ctx = cvs.getContext('2d')!;
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cvs);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cvs.width = cvs.clientWidth * dpr;
      cvs.height = cvs.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const noise = (x: number) => Math.sin(x * 1.7) * 0.5 + Math.sin(x * 3.1 + 1.3) * 0.3 + Math.sin(x * 7.3) * 0.2;

    const draw = (ms: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const t = reduced ? 0 : ms / 1000;
      const W = cvs.clientWidth;
      const H = cvs.clientHeight;
      ctx.clearRect(0, 0, W, H);

      // graticule
      ctx.strokeStyle = colors.rule;
      ctx.lineWidth = 1;
      for (let i = 1; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo((W / 10) * i, 0);
        ctx.lineTo((W / 10) * i, H);
        ctx.stroke();
      }
      for (let i = 1; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (H / 6) * i);
        ctx.lineTo(W, (H / 6) * i);
        ctx.stroke();
      }
      ctx.strokeStyle = '#2a3035';
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.stroke();

      const cycles = 3;
      const amp = H * 0.32;
      ctx.beginPath();
      let freq = 50;
      for (let x = 0; x <= W; x += 2) {
        const u = x / W;
        let y: number;
        if (mode === 'steady') {
          y = Math.sin(u * cycles * Math.PI * 2 - t * 2.2) * amp;
        } else {
          const drift = noise(t * 0.6) * 0.18;
          const sag = 0.55 + 0.35 * (0.5 + 0.5 * noise(t * 0.9 + u * 2));
          const dropout = Math.max(0, Math.sin(t * 0.8) - 0.82) * 5;
          const phase = u * cycles * (1 + drift) * Math.PI * 2 - t * 2.2 * (1 + drift);
          y = Math.sin(phase) * amp * sag * (1 - Math.min(1, dropout)) + noise(u * 40 + t * 9) * amp * 0.08;
          freq = 50 * (1 + drift * 0.06);
        }
        if (x === 0) ctx.moveTo(x, H / 2 - y);
        else ctx.lineTo(x, H / 2 - y);
      }
      if (mode === 'steady') {
        ctx.strokeStyle = colors.current;
        ctx.shadowColor = colors.current;
        ctx.shadowBlur = 16;
        ctx.lineWidth = 2.2;
      } else {
        ctx.strokeStyle = colors.grey;
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1.6;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      if (readout.current) readout.current.textContent = mode === 'steady' ? '50.00 HZ' : `${freq.toFixed(2)} HZ`;
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [mode, reduced]);

  return (
    <figure className="border border-rule bg-[#07090b]">
      <figcaption className="label flex items-center justify-between border-b border-rule px-5 py-3">
        <span className={mode === 'steady' ? 'text-volt' : 'text-mute'}>{label}</span>
        <span ref={readout} className={mode === 'steady' ? 'text-volt' : 'text-paper'}>
          50.00 HZ
        </span>
      </figcaption>
      <canvas ref={ref} className="block h-64 w-full md:h-96" aria-hidden="true" />
      <div className="label grid grid-cols-2 border-t border-rule text-mute">
        <div className="border-r border-rule px-5 py-3">
          {mode === 'steady' ? 'Frequency held' : 'Frequency drifting'}
        </div>
        <div className="flex justify-end px-5 py-3">
          <Redacted label={mode === 'steady' ? 'THD' : 'DEVIATION'} unit="%" size={3} />
        </div>
      </div>
    </figure>
  );
}

export function WaveformCompare() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Scope mode="unstable" label="A / Weak grid" />
      <Scope mode="steady" label="B / With the Core" />
      <p className="sr-only">
        Left: an unstable grid waveform drifting in frequency and amplitude. Right: the Core holding a steady 50 hertz sine wave.
      </p>
    </div>
  );
}
