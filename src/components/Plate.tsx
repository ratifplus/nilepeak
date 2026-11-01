/**
 * Monochrome placeholder imagery. Flat grey renders standing in for photography
 * of the real equipment. Every plate is labelled as a placeholder.
 */

export type PlateKind = 'station-night' | 'station' | 'enclosures' | 'cabinet' | 'transformer' | 'line' | 'portrait';

const LABELS: Record<PlateKind, string> = {
  'station-night': 'Energized station',
  station: 'Peak Station',
  enclosures: 'Battery enclosures',
  cabinet: 'Inverter cabinets',
  transformer: 'Transformer',
  line: 'Transmission line',
  portrait: 'Portrait',
};

function Tower({ x, base, h, stroke }: { x: number; base: number; h: number; stroke: string }) {
  const w = h * 0.22;
  const top = base - h;
  const lines: string[] = [];
  const levels = 8;
  for (let i = 0; i < levels; i++) {
    const y0 = base - (h * i) / levels;
    const y1 = base - (h * (i + 1)) / levels;
    const w0 = w * (1 - (i / levels) * 0.75);
    const w1 = w * (1 - ((i + 1) / levels) * 0.75);
    lines.push(`M${x - w0} ${y0}L${x - w1} ${y1}M${x + w0} ${y0}L${x + w1} ${y1}M${x - w0} ${y0}L${x + w1} ${y1}M${x + w0} ${y0}L${x - w1} ${y1}`);
  }
  lines.push(`M${x - w * 1.3} ${top + h * 0.18}H${x + w * 1.3}M${x - w} ${top + h * 0.06}H${x + w}`);
  return <path d={lines.join('')} stroke={stroke} strokeWidth="1.4" fill="none" />;
}

function Enclosure({ x, y, w, h, body, seam, strip }: { x: number; y: number; w: number; h: number; body: string; seam: string; strip?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={body} />
      <rect x={x - 4} y={y - 6} width={w + 8} height={6} fill={seam} />
      {[1, 2, 3].map((k) => (
        <line key={k} x1={x + (w * k) / 4} y1={y + 8} x2={x + (w * k) / 4} y2={y + h - 6} stroke={seam} strokeWidth="1.5" />
      ))}
      {strip && <rect x={x + 10} y={y + 10} width={w - 20} height={2} fill={strip} />}
    </g>
  );
}

function Art({ kind }: { kind: PlateKind }) {
  switch (kind) {
    case 'station-night':
      return (
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
          <rect width="1600" height="900" fill="#1C1C1C" />
          <rect y="640" width="1600" height="260" fill="#161616" />
          <Tower x={260} base={640} h={430} stroke="#4a4a48" />
          <Tower x={600} base={640} h={300} stroke="#3a3a39" />
          <path d="M200 285 Q 420 360 560 380 M320 285 Q 470 340 640 380 M560 380 Q 760 470 930 470 M640 380 Q 800 450 960 470" stroke="#5a5a58" strokeWidth="1.2" fill="none" />
          <rect x="930" y="470" width="8" height="170" fill="#3a3a39" />
          <rect x="950" y="480" width="70" height="160" fill="#2c2c2b" />
          <rect x="1006" y="492" width="3" height="128" fill="#E6E6E4" opacity="0.85" />
          {[1040, 1170, 1300, 1430].map((x) => (
            <Enclosure key={x} x={x} y={530} w={118} h={110} body="#262626" seam="#1C1C1C" strip="#E6E6E4" />
          ))}
          <rect x="900" y="636" width="700" height="6" fill="#2a2a29" />
        </svg>
      );
    case 'station':
    case 'enclosures':
      return (
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
          <rect width="1600" height="900" fill="#D6D6D3" />
          <rect y="700" width="1600" height="200" fill="#C9C9C6" />
          {kind === 'station' && <Tower x={220} base={700} h={420} stroke="#8E8E8C" />}
          {[0, 1, 2, 3, 4].map((i) => (
            <Enclosure key={i} x={(kind === 'station' ? 420 : 140) + i * 230} y={500} w={210} h={200} body="#9a9a97" seam="#7d7d7a" />
          ))}
          <rect x="0" y="696" width="1600" height="8" fill="#8E8E8C" />
        </svg>
      );
    case 'cabinet':
      return (
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="1600" height="900" fill="#D6D6D3" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${380 + i * 220} 160)`}>
              <rect width="200" height="600" fill="#a3a3a0" />
              <rect x="20" y="30" width="110" height="50" fill="#7d7d7a" />
              {Array.from({ length: 16 }).map((_, k) => (
                <rect key={k} x="20" y={140 + k * 22} width="160" height="8" fill="#8E8E8C" />
              ))}
              <rect x="176" y="120" width="4" height="420" fill="#7d7d7a" />
            </g>
          ))}
          <rect y="760" width="1600" height="140" fill="#C9C9C6" />
        </svg>
      );
    case 'transformer':
      return (
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="1600" height="900" fill="#D6D6D3" />
          <rect x="560" y="360" width="480" height="380" fill="#9a9a97" />
          {Array.from({ length: 12 }).map((_, k) => (
            <rect key={k} x={1040} y={380 + k * 28} width="80" height="12" fill="#8E8E8C" />
          ))}
          {[640, 800, 960].map((x) => (
            <g key={x}>
              <rect x={x - 12} y="220" width="24" height="140" fill="#8E8E8C" />
              {[0, 1, 2, 3, 4].map((k) => (
                <rect key={k} x={x - 22} y={230 + k * 24} width="44" height="10" fill="#7d7d7a" />
              ))}
            </g>
          ))}
          <rect y="740" width="1600" height="160" fill="#C9C9C6" />
        </svg>
      );
    case 'line':
      return (
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
          <rect width="1600" height="900" fill="#D6D6D3" />
          <rect y="740" width="1600" height="160" fill="#C9C9C6" />
          <Tower x={300} base={740} h={560} stroke="#5f5f5d" />
          <Tower x={900} base={740} h={420} stroke="#7d7d7a" />
          <Tower x={1350} base={740} h={320} stroke="#8E8E8C" />
          <path d="M150 280 Q 600 420 830 400 Q 1120 470 1300 480 M450 280 Q 760 400 970 400 Q 1240 470 1400 480" stroke="#5f5f5d" strokeWidth="1.4" fill="none" />
        </svg>
      );
    case 'portrait':
      return (
        <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="800" height="1000" fill="#D6D6D3" />
          <circle cx="400" cy="400" r="150" fill="#a3a3a0" />
          <path d="M140 1000 C 160 700 640 700 660 1000Z" fill="#a3a3a0" />
        </svg>
      );
  }
}

export function Plate({ kind, className = '', label = true }: { kind: PlateKind; className?: string; label?: boolean }) {
  const dark = kind === 'station-night';
  return (
    <div className={`relative overflow-hidden ${className}`} role="img" aria-label={`Placeholder image: ${LABELS[kind]}`}>
      <Art kind={kind} />
      {label && (
        <span aria-hidden="true" className={`label absolute bottom-4 left-4 ${dark ? 'text-ash' : 'text-ink/75'}`}>
          Placeholder image / {LABELS[kind]}
        </span>
      )}
    </div>
  );
}
