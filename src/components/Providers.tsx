'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sound as soundCfg } from '@/config/effects';

gsap.registerPlugin(ScrollTrigger);

/* ---------- Reduced motion ---------- */

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

/* ---------- Station hum (Web Audio) ---------- */

type GridState = 'up' | 'down';

interface SoundApi {
  enabled: boolean;
  toggle: () => void;
  setGrid: (state: GridState) => void;
}

const SoundContext = createContext<SoundApi>({ enabled: false, toggle: () => {}, setGrid: () => {} });
export const useStationSound = () => useContext(SoundContext);

function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const gridRef = useRef<GainNode | null>(null);
  const gridState = useRef<GridState>('up');

  const build = useCallback(() => {
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0;
    const grid = ctx.createGain();
    grid.gain.value = gridState.current === 'up' ? 1 : 0;
    grid.connect(master).connect(ctx.destination);

    const voices = [{ multiple: 1, gain: 1 }, ...soundCfg.harmonics];
    for (const v of voices) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = soundCfg.fundamental * v.multiple;
      const g = ctx.createGain();
      g.gain.value = v.gain;
      osc.connect(g).connect(grid);
      osc.start();
    }
    ctxRef.current = ctx;
    masterRef.current = master;
    gridRef.current = grid;
  }, []);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    if (next && !ctxRef.current) build();
    const ctx = ctxRef.current!;
    const master = masterRef.current!;
    if (next) void ctx.resume();
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(next ? soundCfg.gain : 0, t + (next ? soundCfg.fadeIn : 0.25));
    setEnabled(next);
  }, [build]);

  const setGrid = useCallback((state: GridState) => {
    if (gridState.current === state) return;
    gridState.current = state;
    const ctx = ctxRef.current;
    const grid = gridRef.current;
    if (!ctx || !grid) return;
    const t = ctx.currentTime;
    grid.gain.cancelScheduledValues(t);
    grid.gain.setValueAtTime(grid.gain.value, t);
    if (state === 'down') grid.gain.linearRampToValueAtTime(0, t + soundCfg.cutOut);
    else grid.gain.linearRampToValueAtTime(1, t + soundCfg.restore);
  }, []);

  useEffect(() => () => void ctxRef.current?.close(), []);

  return <SoundContext.Provider value={{ enabled, toggle, setGrid }}>{children}</SoundContext.Provider>;
}

/* ---------- Smooth scroll (Lenis driven by the GSAP ticker) ---------- */

function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider>
      <SmoothScroll />
      {children}
    </SoundProvider>
  );
}
