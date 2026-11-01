import type { Metadata } from 'next';
import { EnergizedHero } from '@/components/EnergizedHero';
import { WaveformCompare } from '@/components/WaveformCompare';
import { ContactCta, SectionLabel, SpecSheet } from '@/components/ui';
import { CabinetCloseup } from '@/components/visuals/Diagrams';

export const metadata: Metadata = {
  title: 'Core',
  description: 'The Core: grid-forming power electronics that behave like a spinning generator, hold frequency and restart the grid.',
};

const STORY = [
  {
    n: '01',
    title: 'Behaves like a generator',
    body: 'A turbine stores energy in its spinning mass. When demand jumps, that inertia holds the grid steady for the moments it takes to respond. The Core gives a battery the same character, in electronics, with no moving parts.',
  },
  {
    n: '02',
    title: 'Holds the frequency',
    body: 'The Core sets its own voltage and frequency rather than following the grid. Loads connect to it as they would to a power plant. Whatever the network does, the city sees a clean, steady 50 Hz.',
  },
  {
    n: '03',
    title: 'Restarts a dark grid',
    body: 'After a blackout, most systems wait for the grid to come back. The Core can bring it back: energizing a dark section, holding it, and handing it back in sync with the wider network.',
  },
];

export default function CorePage() {
  return (
    <>
      <EnergizedHero variant="core" kicker="Technology / Core" lines={['THE CORE.']}>
        <p className="mt-8 max-w-md text-lg text-mute">Grid-forming electronics that hold a city's frequency steady and restart it after the dark.</p>
      </EnergizedHero>

      <section className="border-t border-rule">
        <div className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-5">
            <SectionLabel n="00">Inside the cabinet</SectionLabel>
            <h2 className="display mt-6 text-5xl md:text-7xl">Power that leads, not follows</h2>
            <p className="mt-6 text-lg leading-relaxed text-mute">
              The Core is the heart of every Peak Station. It turns stored energy into a grid of its own, strong enough to carry a
              neighbourhood and steady enough to anchor the network around it.
            </p>
          </div>
          <div className="md:col-span-7">
            <CabinetCloseup className="aspect-[9/6.4]" />
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap grid divide-y divide-rule md:grid-cols-3 md:divide-x md:divide-y-0">
          {STORY.map((s) => (
            <article key={s.n} className="py-16 md:px-8 md:py-24 md:first:pl-0 md:last:pr-0">
              <span className="label text-volt">{s.n}</span>
              <h3 className="display mt-6 text-4xl md:text-5xl">{s.title}</h3>
              <p className="mt-6 leading-relaxed text-mute">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap py-24 md:py-32">
          <div className="mb-12 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionLabel n="04">Waveform</SectionLabel>
            </div>
            <div className="md:col-span-8">
              <h2 className="display text-5xl md:text-7xl">Unsteady in, steady out</h2>
              <p className="mt-6 max-w-xl text-lg text-mute">
                On a weak grid, frequency wanders and voltage sags. Behind the Core, the city sees one clean wave.
              </p>
            </div>
          </div>
          <WaveformCompare />
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-4">
            <SectionLabel n="05">Specification</SectionLabel>
            <h2 className="display mt-6 text-5xl">Core spec sheet</h2>
          </div>
          <SpecSheet
            className="md:col-span-8"
            title="Core / Power electronics"
            rows={[
              { label: 'Control', value: 'GRID-FORMING' },
              { label: 'Virtual inertia', redact: { unit: 'S' } },
              { label: 'Response', redact: { unit: 'MS' } },
              { label: 'Frequency hold', value: '50 HZ' },
              { label: 'Fault current', redact: { unit: 'PU' } },
              { label: 'Black start', value: 'YES' },
              { label: 'Topology', redact: { size: 7 } },
            ]}
          />
        </div>
      </section>

      <ContactCta title="See the Core run" body="We demonstrate the Core to utilities and engineering partners under agreement." />
    </>
  );
}
