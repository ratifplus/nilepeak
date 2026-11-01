'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors, gridMoment as cfg, performance as perfCfg } from '@/config/effects';
import { useReducedMotion, useStationSound } from './Providers';
import { Redacted, SectionLabel } from './ui';

gsap.registerPlugin(ScrollTrigger);

const LINES = ['WHEN THE GRID DROPS,', 'THE STATION HOLDS.'];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const hash = (n: number) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};
const easeOutBack = (t: number) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2);

interface Light { x: number; y: number; r: number; o: number; fail: number }

type Status = 'NOMINAL' | 'FAILING' | 'GRID LOST' | 'CORE ENGAGED' | 'HOLDING';

/**
 * 03 THE GRID MOMENT. A pinned, scroll-driven sequence: the city goes dark in
 * waves, the type flickers and sags, then the Core engages and a clean 50 Hz
 * wave sweeps out from the station, snapping every letter back into place.
 */
export function GridMoment() {
  const reduced = useReducedMotion();
  const { setGrid } = useStationSound();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const letters = useRef<HTMLSpanElement[]>([]);
  const statusEl = useRef<HTMLSpanElement>(null);
  const freqEl = useRef<HTMLSpanElement>(null);
  const progress = useRef(0);

  const chars = useMemo(() => {
    let i = 0;
    return LINES.map((line) =>
      line.split(' ').map((word) => word.split('').map((ch) => ({ ch, i: i++ }))),
    );
  }, []);

  useEffect(() => {
    const sec = section.current!;
    const stg = stage.current!;
    const cvs = canvas.current!;
    const ctx = cvs.getContext('2d')!;
    const mobile = window.innerWidth < perfCfg.mobileBreakpoint;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);

    let W = 0;
    let H = 0;
    let lights: Light[] = [];
    let letterX: number[] = [];
    let baseY = 0;
    let stationX = 0;
    let stationY = 0;
    let hillA: [number, number][] = [];
    let hillB: [number, number][] = [];

    const layout = () => {
      const rect = stg.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      cvs.width = Math.round(W * dpr);
      cvs.height = Math.round(H * dpr);
      cvs.style.width = `${W}px`;
      cvs.style.height = `${H}px`;
      stationX = W * 0.5;
      stationY = H * 0.86;
      const ridge = (x: number, s: number, h: number, base: number) =>
        base - h * (0.6 + 0.25 * Math.sin(x * 0.004 + s) + 0.15 * Math.sin(x * 0.011 + s * 2));
      hillA = [];
      hillB = [];
      for (let x = 0; x <= W + 20; x += 20) {
        hillA.push([x, ridge(x, 1.3, H * 0.22, H * 0.7)]);
        hillB.push([x, ridge(x, 4.1, H * 0.16, H * 0.8)]);
      }
      const n = mobile ? 420 : 1100;
      lights = [];
      for (let k = 0; k < n; k++) {
        const x = hash(k + 1) * W;
        const back = hash(k + 7) < 0.55;
        const top = back ? ridge(x, 1.3, H * 0.22, H * 0.7) : ridge(x, 4.1, H * 0.16, H * 0.8);
        const y = top + Math.pow(hash(k + 3), 0.7) * (H * 0.92 - top);
        // Outage arrives in waves, district by district.
        const district = Math.floor((x / W) * 6);
        const order = [3, 0, 5, 2, 4, 1][district] ?? 0;
        lights.push({ x, y, r: hash(k + 11) < 0.9 ? 1 : 1.7, o: 0.3 + hash(k + 5) * 0.7, fail: order / 6 + hash(k + 9) * 0.16 });
      }
      const sRect = stg.getBoundingClientRect();
      letterX = letters.current.map((el) => {
        const r = el.getBoundingClientRect();
        return r.left - sRect.left + r.width / 2;
      });
      const first = letters.current[0]?.getBoundingClientRect();
      const last = letters.current[letters.current.length - 1]?.getBoundingClientRect();
      baseY = first && last ? (first.top + last.bottom) / 2 - sRect.top : H * 0.45;
    };

    const draw = (time: number) => {
      const p = reduced ? 1 : progress.current;
      const { failStart, failEnd, engage, restored } = cfg.phases;
      const fail = smooth(failStart, failEnd, p);
      const eng = smooth(engage, restored, p);
      const maxR = Math.hypot(W, H);
      const R = eng * maxR;
      const engaged = p >= engage;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // hills
      const fillHill = (pts: [number, number][], c: string) => {
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (const [x, y] of pts) ctx.lineTo(x, y);
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fillStyle = c;
        ctx.fill();
      };
      fillHill(hillA, '#0b0f13');
      fillHill(hillB, '#080b0e');

      // city lights
      for (let k = 0; k < lights.length; k++) {
        const L = lights[k];
        let on = 1;
        if (!engaged || Math.hypot(L.x - stationX, L.y - stationY) > R) {
          const goneAt = L.fail * 0.85;
          if (fail > goneAt + 0.08) on = 0;
          else if (fail > goneAt) on = hash(k + Math.floor(time * 24)) > 0.5 ? 1 : 0;
        }
        if (!on) continue;
        ctx.globalAlpha = L.o * 0.85;
        ctx.fillStyle = '#f3e2c2';
        ctx.fillRect(L.x, L.y, L.r, L.r);
      }
      ctx.globalAlpha = 1;

      // station
      const glow = engaged ? 1 : 1 - fail * 0.85;
      const g = ctx.createRadialGradient(stationX, stationY, 0, stationX, stationY, 160);
      g.addColorStop(0, `rgba(58,209,255,${0.28 * glow})`);
      g.addColorStop(1, 'rgba(58,209,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(stationX - 160, stationY - 160, 320, 320);
      ctx.fillStyle = '#15191c';
      ctx.fillRect(stationX - 46, stationY - 22, 92, 28);
      ctx.fillRect(stationX - 60, stationY - 34, 14, 40);
      ctx.fillStyle = `rgba(58,209,255,${0.4 + 0.6 * glow})`;
      ctx.fillRect(stationX - 42, stationY - 19, 84, 1.5);
      ctx.fillRect(stationX - 50, stationY - 30, 1.5, 30);

      // 50 Hz wave sweeping out from the station
      if (engaged) {
        const lambda = Math.max(140, W / 9);
        const omega = time * 2.6 * Math.PI * 2;
        const amp = cfg.rideAmplitude;
        ctx.save();
        ctx.strokeStyle = colors.current;
        ctx.shadowColor = colors.current;
        ctx.shadowBlur = 14;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        let started = false;
        for (let x = 0; x <= W; x += 3) {
          const dist = Math.abs(x - stationX);
          if (dist > R) {
            started = false;
            continue;
          }
          const front = clamp((R - dist) / 80);
          const y = baseY + amp * 2.2 * front * Math.sin((2 * Math.PI * (x - stationX)) / lambda - omega);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else ctx.lineTo(x, y);
        }
        ctx.globalAlpha = 0.85 - eng * 0.45;
        ctx.stroke();
        // feed line from station up to the wave
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(stationX, stationY - 34);
        ctx.lineTo(stationX, baseY);
        ctx.stroke();
        ctx.restore();
      }

      // letters
      const els = letters.current;
      for (let k = 0; k < els.length; k++) {
        const el = els[k];
        const x = letterX[k] ?? 0;
        const dist = Math.hypot(x - stationX, baseY - stationY);
        const rnd = hash(k + 101);
        const localFail = clamp(fail * 1.25 - rnd * 0.25);
        let y = localFail * cfg.sag * (0.45 + 0.55 * hash(k + 31));
        let rot = localFail * (hash(k + 53) - 0.5) * 9;
        let op = 1 - localFail * 0.78;
        if (localFail > 0.02 && localFail < 0.98 && hash(k * 3 + Math.floor(time * 18)) < 0.22 + localFail * 0.3) op *= 0.25;
        let charge = 0;
        if (engaged && dist < R) {
          const s = clamp((R - dist) / 140);
          const snap = easeOutBack(s);
          const ride = cfg.rideAmplitude * Math.exp(-(R - dist) / 420) * Math.sin((2 * Math.PI * (x - stationX)) / Math.max(140, W / 9) - time * 2.6 * Math.PI * 2);
          y = y * (1 - snap) + ride * Math.min(1, s * 3);
          rot *= 1 - snap;
          op = op + (1 - op) * Math.min(1, s * 2);
          charge = Math.exp(-Math.pow((R - dist) / 90, 2));
        }
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`;
        el.style.opacity = op.toFixed(3);
        el.style.color = charge > 0.05 ? `color-mix(in srgb, ${colors.current} ${Math.round(charge * 100)}%, ${colors.white})` : '';
        el.style.textShadow = charge > 0.05 ? `0 0 ${Math.round(18 * charge)}px rgba(58,209,255,${(0.8 * charge).toFixed(2)})` : '';
      }

      // HUD
      let status: Status = 'NOMINAL';
      if (p >= restored) status = 'HOLDING';
      else if (engaged) status = 'CORE ENGAGED';
      else if (fail >= 0.98) status = 'GRID LOST';
      else if (fail > 0) status = 'FAILING';
      if (statusEl.current && statusEl.current.textContent !== status) {
        statusEl.current.textContent = status;
        statusEl.current.style.color = status === 'CORE ENGAGED' || status === 'HOLDING' ? colors.current : status === 'NOMINAL' ? colors.white : colors.grey;
      }
      if (freqEl.current) {
        let f = '50.00';
        if (!engaged && fail >= 0.98) f = '--.--';
        else if (!engaged && fail > 0) f = (50 - fail * 1.6 + (hash(Math.floor(time * 12)) - 0.5) * fail * 0.9).toFixed(2);
        freqEl.current.textContent = `${f} HZ`;
      }

      setGrid(!engaged && fail > 0.6 ? 'down' : 'up');
    };

    layout();
    let raf = 0;
    const loop = (t: number) => {
      draw(t / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    let st: ScrollTrigger | undefined;
    if (!reduced) {
      st = ScrollTrigger.create({
        trigger: sec,
        start: 'top top',
        end: () => `+=${window.innerHeight * cfg.scrollLength}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
        onRefresh: layout,
      });
    }
    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    document.fonts.ready.then(layout);

    return () => {
      cancelAnimationFrame(raf);
      st?.kill();
      window.removeEventListener('resize', onResize);
      setGrid('up');
    };
  }, [reduced, setGrid]);

  return (
    <section ref={section} aria-labelledby="grid-moment-title" className="relative h-[100svh] overflow-hidden border-t border-rule bg-ink">
      <div ref={stage} className="absolute inset-0">
        <canvas ref={canvas} className="absolute inset-0" aria-hidden="true" />

        <div className="wrap relative flex h-full flex-col justify-between pt-28 pb-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <SectionLabel n="03">The Grid Moment</SectionLabel>
            <div className="label grid grid-cols-[auto_auto] gap-x-6 gap-y-2 border border-rule bg-ink/70 px-4 py-3 text-mute backdrop-blur-sm">
              <span>Grid</span>
              <span ref={statusEl} className="text-paper">NOMINAL</span>
              <span>Frequency</span>
              <span ref={freqEl} className="text-paper">50.00 HZ</span>
              <span>Response</span>
              <Redacted unit="MS" size={3} className="text-paper" />
            </div>
          </div>

          <h2 id="grid-moment-title" className="display text-center text-[11vw] leading-[0.92] md:text-[7.4vw]">
            <span className="sr-only">When the grid drops, the station holds.</span>
            <span aria-hidden="true">
              {chars.map((line, li) => (
                <span key={li} className="block">
                  {line.map((word, wi) => (
                    <span key={wi} className="inline-block whitespace-nowrap">
                      {word.map(({ ch, i }) => (
                        <span
                          key={i}
                          ref={(el) => {
                            if (el) letters.current[i] = el;
                          }}
                          className="inline-block will-change-transform"
                        >
                          {ch}
                        </span>
                      ))}
                      {wi < line.length - 1 && <span className="inline-block w-[0.22em]" />}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h2>

          <p className="label mx-auto max-w-md text-center text-mute">
            Scroll to drop the grid. The Core forms a new one in its place.
          </p>
        </div>
      </div>
    </section>
  );
}
