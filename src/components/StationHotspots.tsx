'use client';

import { useEffect, useState } from 'react';
import { StationElevation } from './visuals/Diagrams';
import { ArrowLink, Redacted } from './ui';

const SPOTS = [
  {
    id: 'core',
    name: 'Core',
    x: 24.5,
    y: 52,
    text: 'Grid-forming power electronics. Holds frequency and voltage like a spinning generator.',
    specs: [
      { label: 'RESPONSE', unit: 'MS' },
      { label: 'RATING', unit: 'MVA' },
      { label: 'TOPOLOGY', unit: '' },
    ],
  },
  {
    id: 'reservoir',
    name: 'Reservoir',
    x: 49,
    y: 66,
    text: 'The energy store. Charges when the grid is strong, carries the city when it is not.',
    specs: [
      { label: 'ENERGY', unit: 'MWH' },
      { label: 'DURATION', unit: 'H' },
      { label: 'CHEMISTRY', unit: '' },
    ],
  },
  {
    id: 'autonomy',
    name: 'Autonomy',
    x: 25,
    y: 29,
    text: 'Forecasts the evening, acts before the lights go out, and reports to remote operators.',
    specs: [
      { label: 'FORECAST HORIZON', unit: 'H' },
      { label: 'DECISION CYCLE', unit: 'S' },
      { label: 'LINK', unit: '' },
    ],
  },
  {
    id: 'thermal',
    name: 'Thermal',
    x: 63,
    y: 50,
    text: 'Sealed against dust and humidity. Rated for equatorial heat, day after day.',
    specs: [
      { label: 'AMBIENT RANGE', unit: '°C' },
      { label: 'INGRESS', unit: 'IP' },
      { label: 'HUMIDITY', unit: '%RH' },
    ],
  },
];

export function StationHotspots() {
  const [active, setActive] = useState<string | null>('core');
  const spot = SPOTS.find((s) => s.id === active);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="relative">
      <div className="relative border border-rule bg-[#07090b]">
        <StationElevation className="block h-auto w-full" />
        {SPOTS.map((s) => {
          const on = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(on ? null : s.id)}
              aria-expanded={on}
              aria-controls="hotspot-card"
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <span className={`relative flex h-7 w-7 items-center justify-center rounded-full border ${on ? 'border-volt' : 'border-paper/60 group-hover:border-volt'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${on ? 'bg-volt shadow-[0_0_10px_#3AD1FF]' : 'bg-paper'}`} />
                {on && <span className="absolute inset-0 animate-ping rounded-full border border-volt/60" />}
              </span>
              <span className={`label absolute left-9 top-1/2 hidden -translate-y-1/2 whitespace-nowrap sm:block ${on ? 'text-volt' : 'text-paper'}`}>
                {s.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <div className="flex flex-wrap gap-2 md:col-span-5">
          {SPOTS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={`label border px-3 py-2 transition-colors ${s.id === active ? 'border-volt text-volt' : 'border-rule text-mute hover:text-paper'}`}
            >
              {String(i + 1).padStart(2, '0')} {s.name}
            </button>
          ))}
        </div>
        <div id="hotspot-card" aria-live="polite" className="md:col-span-7">
          {spot ? (
            <div className="border border-rule bg-panel">
              <div className="label flex items-center justify-between border-b border-rule px-5 py-3">
                <span className="text-volt">{spot.name}</span>
                <button type="button" onClick={() => setActive(null)} className="text-mute hover:text-paper" aria-label="Close spec card">
                  Close
                </button>
              </div>
              <p className="px-5 pt-5 text-paper/90">{spot.text}</p>
              <dl className="mt-5">
                {spot.specs.map((sp) => (
                  <div key={sp.label} className="flex items-center justify-between border-t border-rule px-5 py-3">
                    <dt className="label text-mute">{sp.label}</dt>
                    <dd>
                      <Redacted unit={sp.unit || undefined} size={sp.unit ? 3 : 6} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <p className="label py-4 text-mute">Select a system to open its spec card.</p>
          )}
          <div className="mt-6">
            <ArrowLink href="/station">Learn more</ArrowLink>
          </div>
        </div>
      </div>
    </div>
  );
}
