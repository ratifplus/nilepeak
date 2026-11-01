/* Abstract, dashboard-style visuals for /autonomy. No real data. */

import { Redacted } from '../ui';

const C = '#3AD1FF';

function Panel({ title, status, children, className = '' }: { title: string; status?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-rule bg-[#07090b] ${className}`}>
      <div className="label flex items-center justify-between border-b border-rule px-4 py-2.5 text-mute">
        <span>{title}</span>
        {status && (
          <span className="flex items-center gap-2 text-volt">
            <span className="blink h-1.5 w-1.5 rounded-full bg-volt" />
            {status}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

const demand = Array.from({ length: 49 }, (_, i) => {
  const h = i / 2;
  return 0.35 + 0.12 * Math.sin((h - 8) / 3) + 0.42 * Math.exp(-Math.pow((h - 20) / 2.2, 2)) + 0.08 * Math.exp(-Math.pow((h - 8) / 1.5, 2));
});
const toPath = (arr: number[], w: number, h: number) => arr.map((v, i) => `${i ? 'L' : 'M'}${(i / (arr.length - 1)) * w} ${h - v * h}`).join(' ');

export function ForecastPanel() {
  const W = 640;
  const H = 220;
  const supply = demand.map((d, i) => Math.min(d, 0.62 - 0.25 * Math.exp(-Math.pow((i / 2 - 20) / 2.5, 2))));
  return (
    <Panel title="Forecast / Evening peak" status="Live model">
      <svg viewBox={`0 0 ${W} ${H + 30}`} className="block h-auto w-full" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={(W / 6) * i} y1="0" x2={(W / 6) * i} y2={H} stroke="#1E2226" />
        ))}
        <path d={`${toPath(demand, W, H)} L${W} ${H} L0 ${H}Z`} fill={C} opacity="0.08" />
        <path d={toPath(demand, W, H)} stroke={C} strokeWidth="2" fill="none" />
        <path d={toPath(supply, W, H)} stroke="#8B9298" strokeWidth="1.4" strokeDasharray="5 5" fill="none" />
        <rect x={W * 0.76} y="0" width={W * 0.14} height={H} fill="#F2F3F4" opacity="0.04" />
        <line x1={W * 0.76} y1="0" x2={W * 0.76} y2={H} stroke={C} strokeDasharray="2 4" />
        <text x={W * 0.76 + 8} y="18" fill={C} fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="2">PRE-CHARGE</text>
        {['00', '04', '08', '12', '16', '20', '24'].map((t, i) => (
          <text key={t} x={(W / 6) * i} y={H + 20} fill="#8B9298" fontFamily="var(--font-plex-mono)" fontSize="10" textAnchor={i === 0 ? 'start' : i === 6 ? 'end' : 'middle'}>{t}</text>
        ))}
      </svg>
      <div className="label grid grid-cols-2 border-t border-rule text-mute">
        <span className="border-r border-rule px-4 py-2.5"><span className="mr-2 inline-block h-0.5 w-4 bg-volt align-middle" />Demand</span>
        <span className="px-4 py-2.5"><span className="mr-2 inline-block h-0.5 w-4 border-t border-dashed border-mute align-middle" />Grid supply</span>
      </div>
    </Panel>
  );
}

const TIMELINE = [
  { t: 'T-', label: 'Forecast', body: 'The station predicts the evening and the risk of a drop.' },
  { t: 'T-', label: 'Pre-charge', body: 'It fills the reservoir while supply is still strong.' },
  { t: 'T0', label: 'Island', body: 'The grid drops. The Core forms a local grid in its place.' },
  { t: 'T+', label: 'Restore', body: 'Supply returns. The station resynchronises and hands back.' },
];

export function ActionTimeline() {
  return (
    <Panel title="Sequence / Before the lights go out" status="Armed">
      <ol className="grid md:grid-cols-4">
        {TIMELINE.map((s, i) => (
          <li key={s.label} className="relative border-b border-rule p-5 md:border-b-0 md:border-r md:last:border-r-0">
            <div className="flex items-center gap-3">
              <span className={`h-2.5 w-2.5 rounded-full ${i === 2 ? 'bg-volt shadow-[0_0_10px_#3AD1FF]' : 'border border-paper/60'}`} />
              <span className="label text-mute">
                {s.t === 'T0' ? 'T0' : <Redacted label={s.t} unit="MIN" size={2} />}
              </span>
            </div>
            <h4 className={`display mt-5 text-3xl ${i === 2 ? 'text-volt' : ''}`}>{s.label}</h4>
            <p className="mt-3 text-sm leading-relaxed text-mute">{s.body}</p>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

export function RemoteConsole() {
  const tiles = Array.from({ length: 12 }, (_, i) => i);
  return (
    <Panel title="Remote operations / Fleet" status="Connected">
      <div className="grid grid-cols-3 gap-px bg-rule sm:grid-cols-4">
        {tiles.map((i) => (
          <div key={i} className="bg-[#07090b] p-4">
            <div className="label flex items-center justify-between text-mute">
              <span>ST-██</span>
              <span className={`h-1.5 w-1.5 rounded-full ${i % 5 === 2 ? 'bg-paper/40' : 'bg-volt'}`} />
            </div>
            <div className="mt-4 flex h-8 items-end gap-[3px]">
              {Array.from({ length: 10 }).map((_, k) => (
                <span
                  key={k}
                  className="flex-1 bg-paper/20"
                  style={{ height: `${25 + ((i * 7 + k * 13) % 70)}%`, background: k === 9 ? C : undefined }}
                />
              ))}
            </div>
            <p className="label mt-3 text-[10px] text-mute">{i % 5 === 2 ? 'STANDBY' : 'HOLDING'}</p>
          </div>
        ))}
      </div>
      <div className="label flex flex-wrap justify-between gap-3 border-t border-rule px-4 py-2.5 text-mute">
        <Redacted label="STATIONS" size={2} />
        <Redacted label="LATENCY" unit="MS" size={2} />
        <span>All data shown is illustrative</span>
      </div>
    </Panel>
  );
}
