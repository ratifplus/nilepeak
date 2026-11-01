import type { Metadata } from 'next';
import Link from 'next/link';
import { Plate, type PlateKind } from '@/components/Plate';

export const metadata: Metadata = {
  title: 'Platform',
  description: 'The Peak Station stores energy, stabilizes the grid and restores it after a blackout.',
};

const MODULES: { n: string; title: string; text: string; plate: PlateKind }[] = [
  { n: '01', title: 'Stores', text: 'Energy held in reserve, ready the moment the grid needs it.', plate: 'enclosures' },
  { n: '02', title: 'Stabilizes', text: 'Holds frequency and voltage steady when supply and demand fall out of balance.', plate: 'cabinet' },
  { n: '03', title: 'Restores', text: 'Restarts the grid after a blackout, section by section.', plate: 'line' },
];

const SPECS = ['Rated power', 'Energy capacity', 'Response time', 'Grid code compliance', 'Black start', 'Design life', 'Footprint'];

export default function PlatformPage() {
  return (
    <>
      <section className="flex min-h-[calc(100svh-6rem)] flex-col">
        <div className="grid-12 gap-y-6 pb-12 pt-20 md:pt-28">
          <p className="label col-span-12 text-mute">Platform</p>
          <h1 className="headline col-span-12 text-[16vw] md:text-[11vw] 2xl:text-[180px]">The Peak Station</h1>
        </div>
        <Plate kind="transformer" className="min-h-[50svh] w-full flex-1" />
      </section>

      {MODULES.map((m, i) => (
        <section key={m.n} className="screen border-t border-rule">
          <div className="grid-12 items-center gap-y-10">
            <div className={`col-span-12 md:col-span-5 ${i % 2 ? 'md:order-2 md:col-start-8' : ''}`}>
              <p data-reveal className="label text-mute">
                <span className="mr-4 text-ink">{m.n}</span>Function
              </p>
              <h2 data-reveal className="headline mt-8 text-[18vw] md:text-[8vw] 2xl:text-[132px]">
                {m.title}
              </h2>
              <p data-reveal className="body mt-8 max-w-sm">
                {m.text}
              </p>
            </div>
            <div data-reveal className={`col-span-12 md:col-span-7 ${i % 2 ? 'md:order-1' : 'md:col-start-6'}`}>
              <Plate kind={m.plate} className="aspect-[4/3] w-full" />
            </div>
          </div>
        </section>
      ))}

      <section className="screen border-t border-rule">
        <div className="grid-12 gap-y-10">
          <p data-reveal className="label col-span-12 text-mute md:col-span-3">
            <span className="mr-4 text-ink">04</span>Specification
          </p>
          <dl data-reveal className="col-span-12 border-t border-rule md:col-span-9">
            {SPECS.map((s) => (
              <div key={s} className="grid grid-cols-2 border-b border-rule py-5">
                <dt className="label">{s}</dt>
                <dd className="label text-right text-mute">Disclosed under NDA</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="screen border-t border-rule">
        <div className="grid-12 gap-y-10">
          <h2 data-reveal className="headline col-span-12 text-[15vw] md:text-[9vw] 2xl:text-[150px]">
            Request a briefing
          </h2>
          <div data-reveal className="col-span-12">
            <Link href="/contact" className="link">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
