import type { Metadata } from 'next';
import { Plate } from '@/components/Plate';
import { PageTitle } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Company',
  description: 'Nile Peak develops grid-forming stations for the grids that need them most.',
};

export default function CompanyPage() {
  return (
    <>
      <PageTitle label="Company" title="Built for the grids that need it most" />

      <section className="screen">
        <div className="grid-12 gap-y-10">
          <p data-reveal className="label col-span-12 text-mute md:col-span-3">
            Mission
          </p>
          <p data-reveal className="headline col-span-12 text-5xl md:col-span-9 md:text-7xl">
            We exist to make stable power a given. We develop the stations that keep grids up and bring them back when they fall.
          </p>
        </div>
      </section>

      {/* The page's one dark band */}
      <section className="screen bg-band text-ground">
        <div className="grid-12 items-end gap-y-10">
          <p data-reveal className="label col-span-12 text-ground/70 md:col-span-3">
            Leadership
          </p>
          <div data-reveal className="col-span-8 md:col-span-4">
            <Plate kind="portrait" className="aspect-[4/5] w-full" sizes="(min-width: 768px) 33vw, 66vw" />
          </div>
          <div data-reveal className="col-span-12 md:col-span-5">
            <p className="label text-ground/70">Founder and Chief Executive</p>
            <h2 className="headline mt-4 text-6xl text-ground md:text-8xl">Name Surname</h2>
            <p className="body mt-6 max-w-sm text-ground/70">Placeholder biography. One or two sentences on background and role.</p>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-40">
        <div className="grid-12 gap-y-10">
          <p data-reveal className="label col-span-12 text-mute md:col-span-3">
            Locations
          </p>
          <p data-reveal className="headline col-span-12 text-5xl md:col-span-9 md:text-7xl">
            Offices: placeholder
          </p>
        </div>
      </section>
    </>
  );
}
