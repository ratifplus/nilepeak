import type { Metadata } from 'next';
import Link from 'next/link';
import { Waveform } from '@/components/Waveform';
import { PageTitle } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Technology',
  description: 'Grid-forming systems lead the grid, behaving like the spinning generators grids were built around.',
};

export default function TechnologyPage() {
  return (
    <>
      <PageTitle label="Technology" title="Grid-forming">
        <p>
          Conventional batteries follow the grid. Grid-forming systems lead it, behaving like the spinning generators grids
          were built around.
        </p>
      </PageTitle>

      <section className="screen border-t border-rule">
        <div className="grid-12 gap-y-10">
          <p className="label col-span-12 text-mute md:col-span-3">
            <span className="mr-4 text-ink">01</span>Waveform
          </p>
          <div className="col-span-12 md:col-span-9">
            <Waveform />
            <div className="label mt-6 flex justify-between text-mute">
              <span>Unstable</span>
              <span>Held</span>
            </div>
          </div>
        </div>
      </section>

      <section className="screen border-t border-rule">
        <div className="grid-12 gap-y-10">
          <h2 className="headline col-span-12 text-[15vw] md:text-[9vw] 2xl:text-[150px]">The Peak Station</h2>
          <div className="col-span-12">
            <Link href="/platform" className="link">
              Platform
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
