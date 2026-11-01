import type { Metadata } from 'next';
import { EnergizedHero } from '@/components/EnergizedHero';
import { ContactCta, SectionLabel, SpecSheet } from '@/components/ui';
import { AutonomyLoop, GridDiagram, StationElevation, ThermalDiagram } from '@/components/visuals/Diagrams';

export const metadata: Metadata = {
  title: 'Station',
  description: 'The Peak Station: a grid-forming battery power station that keeps the city on when the grid lets go.',
};

const MODULES = [
  {
    n: '01',
    kicker: 'What it does',
    title: 'Takes over the moment the grid lets go',
    body: 'The Peak Station charges when supply is strong. When load shedding begins, it does not wait for a signal. It forms the grid locally, holds it steady and carries homes, clinics and businesses through the evening. When the wider grid returns, it hands back smoothly.',
    visual: <div className="border border-rule bg-[#07090b]"><StationElevation className="block h-auto w-full" /></div>,
  },
  {
    n: '02',
    kicker: 'Where it sits',
    title: 'Between the grid and the city',
    body: 'The station connects where the network meets the neighbourhood. It draws from the grid, supplies the city, and supports the network as it restarts. To the people it serves, it is invisible. To the grid, it is a steady hand.',
    visual: <GridDiagram className="aspect-[9/5]" />,
  },
  {
    n: '03',
    kicker: 'Built for here',
    title: 'Built for heat and humidity',
    body: 'Equatorial sun, red dust and the rainy seasons. Enclosures are sealed, cooling is sized for the hottest afternoons, and every component is chosen to run in the conditions it will actually see.',
    visual: <ThermalDiagram className="aspect-[9/5.2]" />,
  },
  {
    n: '04',
    kicker: 'Built to run itself',
    title: 'No operator required',
    body: 'Forecasting, dispatch, protection and recovery run on the station itself. Our remote operations team watches over every station, but the station never needs to wait for them to act.',
    visual: <AutonomyLoop className="aspect-[9/5.2]" />,
  },
];

export default function StationPage() {
  return (
    <>
      <EnergizedHero variant="station" kicker="Product / Peak Station" lines={['THE PEAK', 'STATION.']}>
        <p className="mt-8 max-w-md text-lg text-mute">A grid-forming battery power station for cities that cannot afford the dark.</p>
      </EnergizedHero>

      {MODULES.map((m, i) => (
        <section key={m.n} className="border-t border-rule">
          <div className="wrap grid items-center gap-12 py-24 md:grid-cols-12 md:py-32">
            <div className={`md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`}>{m.visual}</div>
            <div className={`md:col-span-5 ${i % 2 ? 'md:order-1 md:pr-10' : 'md:pl-10'}`}>
              <SectionLabel n={m.n}>{m.kicker}</SectionLabel>
              <h2 className="display mt-6 text-5xl md:text-6xl">{m.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-mute">{m.body}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-rule">
        <div className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-4">
            <SectionLabel n="05">Specification</SectionLabel>
            <h2 className="display mt-6 text-5xl md:text-6xl">Spec sheet</h2>
            <p className="mt-6 text-mute">
              Detailed specifications are shared with qualified partners under agreement.
            </p>
          </div>
          <div className="grid gap-6 md:col-span-8 md:grid-cols-2">
            <SpecSheet
              title="Power"
              rows={[
                { label: 'Rated power', redact: { unit: 'MW' } },
                { label: 'Energy', redact: { unit: 'MWH' } },
                { label: 'Response', redact: { unit: 'MS' } },
                { label: 'Grid frequency', value: '50 HZ' },
                { label: 'Black start', value: 'YES' },
              ]}
            />
            <SpecSheet
              title="Environment"
              rows={[
                { label: 'Ambient range', redact: { unit: '°C' } },
                { label: 'Humidity', redact: { unit: '%RH' } },
                { label: 'Ingress', redact: { label: 'IP', size: 2 } },
                { label: 'Footprint', redact: { unit: 'M²' } },
                { label: 'Design life', redact: { unit: 'YR' } },
              ]}
            />
            <SpecSheet
              className="md:col-span-2"
              title="Control"
              rows={[
                { label: 'Control mode', value: 'GRID-FORMING' },
                { label: 'Operation', value: 'AUTONOMOUS' },
                { label: 'Decision cycle', redact: { unit: 'S' } },
                { label: 'Remote link', redact: { size: 6 } },
              ]}
            />
          </div>
        </div>
      </section>

      <ContactCta title="Bring a station to your grid" />
    </>
  );
}
