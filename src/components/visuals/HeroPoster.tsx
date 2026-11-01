/**
 * Static dark poster frame. Shown before the 3D scene mounts, and as the
 * hero itself when the visitor prefers reduced motion.
 */

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const r = rand(7);
const LIGHTS = Array.from({ length: 260 }, () => {
  const x = r() * 1600;
  const y = 540 + Math.pow(r(), 0.6) * 170;
  return { x, y, o: 0.2 + r() * 0.6, s: r() < 0.85 ? 1.1 : 1.8 };
});

export function HeroPoster({ variant }: { variant: 'home' | 'station' | 'core' }) {
  const stationX = variant === 'station' ? 700 : 1040;
  return (
    <svg className="h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#030405" />
          <stop offset="0.65" stopColor="#0a0d10" />
          <stop offset="1" stopColor="#050607" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3AD1FF" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3AD1FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#sky)" />
      {variant !== 'core' && (
        <>
          <path d="M0 560 C 180 470 320 520 460 480 S 760 420 900 470 S 1200 430 1360 480 S 1520 450 1600 470 V 900 H0Z" fill="#0c1116" />
          <path d="M0 610 C 200 560 360 600 520 570 S 820 530 980 580 S 1260 550 1600 590 V 900 H0Z" fill="#090c10" />
          {LIGHTS.map((l, i) => (
            <circle key={i} cx={l.x} cy={l.y} r={l.s} fill="#f3e2c2" opacity={l.o * 0.7} />
          ))}
          <rect y="700" width="1600" height="200" fill="#050607" />
          {/* tower and line */}
          <path d="M300 700 L330 470 L360 700 M312 560 L348 560 M318 520 L342 520 M280 490 L380 490" stroke="#2c3339" strokeWidth="1.5" fill="none" />
          <path d={`M380 490 Q ${(380 + stationX) / 2} 560 ${stationX - 30} 620`} stroke="#3a434b" strokeWidth="1.2" fill="none" />
        </>
      )}
      {/* station silhouette */}
      <g transform={variant === 'core' ? 'translate(560 220) scale(2.6)' : `translate(${stationX - 60} 610)`}>
        <ellipse cx="120" cy="40" rx="190" ry="60" fill="url(#glow)" />
        <rect x="0" y="0" width="34" height="90" fill="#1a1f23" />
        <rect x="28" y="10" width="2" height="66" fill="#3AD1FF" />
        {[50, 100, 150, 200].map((x) => (
          <g key={x}>
            <rect x={x} y="28" width="44" height="62" fill="#14181b" />
            <rect x={x + 5} y="33" width="34" height="1.2" fill="#3AD1FF" />
          </g>
        ))}
      </g>
    </svg>
  );
}
