'use client';

import { useStationSound } from './Providers';

export function SoundToggle({ className = '' }: { className?: string }) {
  const { enabled, toggle } = useStationSound();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      className={`label items-center gap-3 transition-colors hover:text-paper ${enabled ? 'text-volt' : 'text-paper/70'} ${className}`}
    >
      <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
        {[0.5, 1, 0.7, 0.9].map((h, i) => (
          <span
            key={i}
            className={`w-[2px] ${enabled ? 'bg-volt' : 'bg-paper/50'}`}
            style={{
              height: enabled ? `${h * 100}%` : '25%',
              transition: 'height 300ms',
              animation: enabled ? `blink ${0.5 + i * 0.13}s steps(2) infinite` : undefined,
            }}
          />
        ))}
      </span>
      {enabled ? 'Station audible' : 'Hear the station'}
    </button>
  );
}
