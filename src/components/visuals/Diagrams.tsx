/* Machine visuals drawn in SVG: technical, dark, thin rules, current in cyan. */

const C = '#3AD1FF';
const RULE = '#1E2226';
const LINE = '#3a434b';
const METAL = '#14181b';

function Frame({ children, label, className = '' }: { children: React.ReactNode; label?: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden border border-rule bg-[#07090b] ${className}`}>
      {children}
      {label && <span className="label absolute left-4 top-4 text-mute">{label}</span>}
      <span className="absolute right-4 top-4 h-2 w-2 border-r border-t border-mute/50" />
      <span className="absolute bottom-4 left-4 h-2 w-2 border-b border-l border-mute/50" />
    </div>
  );
}

/** Side elevation of the Peak Station. Used under the home hotspots and on /station. */
export function StationElevation({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 560" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="se-glow" cx="0.3" cy="0.6" r="0.6">
          <stop offset="0" stopColor={C} stopOpacity="0.16" />
          <stop offset="1" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <pattern id="se-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={RULE} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="560" fill="url(#se-grid)" opacity="0.6" />
      <rect width="1200" height="560" fill="url(#se-glow)" />
      {/* ground */}
      <line x1="40" y1="452" x2="1160" y2="452" stroke={LINE} />
      <rect x="120" y="452" width="960" height="10" fill="#101315" />
      {/* incoming line */}
      <path d="M0 120 Q 110 150 210 160" stroke={LINE} strokeWidth="1.5" fill="none" />
      <path d="M0 120 Q 110 150 210 160" stroke={C} strokeWidth="2" fill="none" strokeDasharray="14 160" className="animate-[dash_2.6s_linear_infinite]" />
      <line x1="210" y1="160" x2="210" y2="452" stroke={LINE} strokeWidth="3" />
      <line x1="180" y1="160" x2="240" y2="160" stroke={LINE} strokeWidth="3" />
      {/* core cabinet */}
      <rect x="240" y="232" width="110" height="220" fill="#1a1f23" stroke="#262c31" />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x="256" y={300 + i * 12} width="64" height="4" fill="#0a0c0e" />
      ))}
      <rect x="334" y="250" width="3" height="170" fill={C} />
      <rect x="256" y="252" width="44" height="18" fill={C} opacity="0.45" />
      {/* reservoir: battery enclosures */}
      {[390, 560, 730].map((x) => (
        <g key={x}>
          <rect x={x} y="300" width="150" height="152" fill={METAL} stroke="#20262b" />
          <line x1={x + 50} y1="306" x2={x + 50} y2="446" stroke="#07090b" />
          <line x1={x + 100} y1="306" x2={x + 100} y2="446" stroke="#07090b" />
          <rect x={x + 12} y="312" width="126" height="2" fill={C} />
          <rect x={x - 3} y="294" width="156" height="6" fill="#1c2226" />
        </g>
      ))}
      {/* thermal units on roof */}
      {[420, 590, 760].map((x) => (
        <g key={x}>
          <rect x={x} y="276" width="90" height="18" fill="#1c2226" />
          <circle cx={x + 25} cy="285" r="6" fill="none" stroke={LINE} />
          <circle cx={x + 65} cy="285" r="6" fill="none" stroke={LINE} />
        </g>
      ))}
      {/* transformer */}
      <rect x="920" y="330" width="120" height="122" fill={METAL} stroke="#20262b" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={1040} y={340 + i * 13} width="18" height="6" fill="#1c2226" />
      ))}
      {[945, 980, 1015].map((x) => (
        <rect key={x} x={x - 4} y="300" width="8" height="30" fill="#2a3035" />
      ))}
      {/* antenna for autonomy */}
      <line x1="300" y1="232" x2="300" y2="170" stroke={LINE} />
      <circle cx="300" cy="166" r="4" fill={C} />
      {/* outgoing feeder */}
      <path d="M1058 360 H1200" stroke={LINE} strokeWidth="1.5" />
      <path d="M1058 360 H1200" stroke={C} strokeWidth="2" strokeDasharray="10 120" className="animate-[dash_2.6s_linear_infinite]" />
      <style>{'@keyframes dash{to{stroke-dashoffset:-174}}'}</style>
    </svg>
  );
}

/** How the station sits between the grid and the city. Diagrammatic only. */
export function GridDiagram({ className = '' }: { className?: string }) {
  const node = (x: number, label: string, active = false) => (
    <g transform={`translate(${x} 200)`}>
      <rect x="-90" y="-60" width="180" height="120" fill="#0a0c0e" stroke={active ? C : LINE} />
      {active && <rect x="-90" y="-60" width="180" height="120" fill={C} opacity="0.05" />}
      <text x="0" y="6" textAnchor="middle" fill={active ? C : '#F2F3F4'} fontFamily="var(--font-plex-mono)" fontSize="13" letterSpacing="3">
        {label}
      </text>
    </g>
  );
  return (
    <Frame label="FIG. 02 / POSITION" className={className}>
      <svg viewBox="0 0 900 400" className="h-full w-full" aria-hidden="true">
        <path d="M190 200 H360 M540 200 H710" stroke={LINE} strokeWidth="1.5" />
        <path d="M190 200 H360" stroke={C} strokeWidth="2" strokeDasharray="8 60">
          <animate attributeName="stroke-dashoffset" from="0" to="-68" dur="1.1s" repeatCount="indefinite" />
        </path>
        <path d="M540 200 H710" stroke={C} strokeWidth="2" strokeDasharray="8 60">
          <animate attributeName="stroke-dashoffset" from="0" to="-68" dur="1.1s" repeatCount="indefinite" />
        </path>
        {node(100, 'GRID')}
        {node(450, 'PEAK STATION', true)}
        {node(800, 'CITY')}
        <text x="275" y="180" textAnchor="middle" fill="#8B9298" fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="2">CHARGE</text>
        <text x="625" y="180" textAnchor="middle" fill="#8B9298" fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="2">SUPPLY</text>
        <path d="M450 260 V320 H100 V260" stroke={LINE} strokeDasharray="3 5" fill="none" />
        <text x="275" y="345" textAnchor="middle" fill="#8B9298" fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="2">RESTART SUPPORT</text>
      </svg>
    </Frame>
  );
}

/** Built for heat and humidity. */
export function ThermalDiagram({ className = '' }: { className?: string }) {
  return (
    <Frame label="FIG. 03 / THERMAL" className={className}>
      <svg viewBox="0 0 900 520" className="h-full w-full" aria-hidden="true">
        <circle cx="760" cy="110" r="44" fill="none" stroke={LINE} />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1={760 + Math.cos(a) * 58} y1={110 + Math.sin(a) * 58} x2={760 + Math.cos(a) * 72} y2={110 + Math.sin(a) * 72} stroke={LINE} />;
        })}
        <rect x="220" y="230" width="420" height="200" fill={METAL} stroke="#20262b" />
        <rect x="240" y="250" width="380" height="2" fill={C} />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M ${170 - i * 6} ${290 + i * 34} C 260 ${270 + i * 34}, 520 ${320 + i * 34}, ${690 + i * 6} ${280 + i * 34}`} stroke="#8B9298" strokeOpacity="0.5" fill="none" strokeDasharray="4 8">
            <animate attributeName="stroke-dashoffset" from="0" to="-48" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </path>
        ))}
        {Array.from({ length: 26 }).map((_, i) => (
          <circle key={i} cx={100 + ((i * 97) % 700)} cy={60 + ((i * 53) % 150)} r="1.6" fill="#8B9298" opacity="0.5" />
        ))}
        <text x="220" y="470" fill="#8B9298" fontFamily="var(--font-plex-mono)" fontSize="12" letterSpacing="3">AMBIENT ████ °C   HUMIDITY ████ %RH</text>
      </svg>
    </Frame>
  );
}

/** Built to run itself: an abstract control loop. */
export function AutonomyLoop({ className = '' }: { className?: string }) {
  const steps = ['SENSE', 'FORECAST', 'DECIDE', 'ACT'];
  return (
    <Frame label="FIG. 04 / CONTROL LOOP" className={className}>
      <svg viewBox="0 0 900 520" className="h-full w-full" aria-hidden="true">
        <circle cx="450" cy="270" r="170" fill="none" stroke={LINE} />
        <circle cx="450" cy="270" r="170" fill="none" stroke={C} strokeWidth="2" strokeDasharray="60 1008" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 450 270" to="360 450 270" dur="6s" repeatCount="indefinite" />
        </circle>
        {steps.map((s, i) => {
          const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
          const x = 450 + Math.cos(a) * 170;
          const y = 270 + Math.sin(a) * 170;
          return (
            <g key={s}>
              <rect x={x - 62} y={y - 18} width="124" height="36" fill="#07090b" stroke={LINE} />
              <text x={x} y={y + 5} textAnchor="middle" fill="#F2F3F4" fontFamily="var(--font-plex-mono)" fontSize="12" letterSpacing="3">{s}</text>
            </g>
          );
        })}
        <text x="450" y="264" textAnchor="middle" fill={C} fontFamily="var(--font-plex-mono)" fontSize="12" letterSpacing="3">AUTONOMOUS</text>
        <text x="450" y="286" textAnchor="middle" fill="#8B9298" fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="3">CYCLE ████ S</text>
      </svg>
    </Frame>
  );
}

/** Close-up of the Core inverter cabinet. */
export function CabinetCloseup({ className = '' }: { className?: string }) {
  return (
    <Frame label="CORE / CABINET DETAIL" className={className}>
      <svg viewBox="0 0 900 640" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="cab" x1="0" x2="1">
            <stop offset="0" stopColor="#15191c" />
            <stop offset="0.6" stopColor="#1c2125" />
            <stop offset="1" stopColor="#111416" />
          </linearGradient>
          <radialGradient id="cab-glow" cx="0.75" cy="0.5" r="0.5">
            <stop offset="0" stopColor={C} stopOpacity="0.18" />
            <stop offset="1" stopColor={C} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="900" height="640" fill="url(#cab-glow)" />
        <rect x="220" y="40" width="460" height="580" fill="url(#cab)" stroke="#2a3035" />
        <rect x="240" y="60" width="420" height="120" fill="#0b0d0f" stroke="#22282d" />
        <rect x="260" y="80" width="180" height="40" fill={C} opacity="0.3" />
        <text x="270" y="106" fill={C} fontFamily="var(--font-plex-mono)" fontSize="14" letterSpacing="3">GRID-FORMING</text>
        <text x="270" y="152" fill="#8B9298" fontFamily="var(--font-plex-mono)" fontSize="12" letterSpacing="3">UNIT ████  REV ██</text>
        {Array.from({ length: 22 }).map((_, i) => (
          <rect key={i} x="260" y={210 + i * 16} width="300" height="6" fill="#090b0c" />
        ))}
        <rect x="620" y="210" width="6" height="360" fill={C}>
          <animate attributeName="opacity" values="1;0.55;1" dur="2.6s" repeatCount="indefinite" />
        </rect>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx="600" cy={240 + i * 30} r="5" fill={i === 0 ? C : '#2a3035'} />
        ))}
        <rect x="240" y="580" width="420" height="20" fill="#0b0d0f" />
      </svg>
    </Frame>
  );
}

/** Abstract artwork for newsroom posts. */
export function PostVisual({ kind, className = '' }: { kind: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#07090b] ${className}`}>
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id={`pv-${kind}`} cx="0.6" cy="0.7" r="0.6">
            <stop offset="0" stopColor={C} stopOpacity="0.22" />
            <stop offset="1" stopColor={C} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill={`url(#pv-${kind})`} />
        {kind === 'wave' && (
          <>
            <path d={Array.from({ length: 81 }, (_, i) => `${i ? 'L' : 'M'}${i * 10} ${250 + Math.sin(i * 0.35) * 70}`).join(' ')} stroke={C} strokeWidth="2.5" fill="none" />
            <path d={Array.from({ length: 81 }, (_, i) => `${i ? 'L' : 'M'}${i * 10} ${250 + Math.sin(i * 0.35 + 1.2) * 70 * (0.4 + ((i * 37) % 11) / 11)}`).join(' ')} stroke="#8B9298" strokeOpacity="0.4" fill="none" />
          </>
        )}
        {kind === 'grid' && (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 45} x2="800" y2={i * 45} stroke={RULE} />
            ))}
            {Array.from({ length: 18 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="500" stroke={RULE} />
            ))}
            {[120, 220, 300, 380].map((y, i) => (
              <rect key={y} x={100 + i * 90} y={y} width={300 - i * 40} height="18" fill="#F2F3F4" />
            ))}
          </>
        )}
        {(kind === 'station' || kind === 'core' || kind === 'city') && (
          <>
            <path d="M0 330 C 160 270 300 310 420 280 S 660 250 800 290 V500 H0Z" fill="#0c1116" />
            {Array.from({ length: 120 }).map((_, i) => (
              <circle key={i} cx={(i * 67) % 800} cy={320 + ((i * 29) % 120)} r="1.3" fill="#f3e2c2" opacity={0.25 + ((i * 13) % 10) / 16} />
            ))}
            <rect x="0" y="420" width="800" height="80" fill="#050607" />
            <g transform="translate(430 360)">
              <rect width="22" height="60" fill="#1a1f23" />
              <rect x="18" y="8" width="2" height="44" fill={C} />
              {[30, 70, 110].map((x) => (
                <g key={x}>
                  <rect x={x} y="20" width="34" height="40" fill="#14181b" />
                  <rect x={x + 4} y="24" width="26" height="1.2" fill={C} />
                </g>
              ))}
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
