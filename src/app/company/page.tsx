import type { Metadata } from 'next';
import { ArrowLink, PageHero, Redacted, SectionLabel } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Company',
  description: 'Nile Peak builds grid-forming battery power stations in Uganda, for Africa.',
};

const PROBLEMS = [
  { n: '01', text: 'The grid drops at the hour the city needs it most.' },
  { n: '02', text: 'Diesel fills the gap, loudly, expensively and dirtily.' },
  { n: '03', text: 'Every outage costs a clinic, a classroom, a business its evening.' },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        kicker="Company"
        title="Power that holds"
        intro="Nile Peak exists to end load shedding in African cities. We start at home, in Kampala."
      />

      <section>
        <div className="wrap grid gap-10 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-3">
            <SectionLabel n="01">Mission</SectionLabel>
          </div>
          <p className="font-display text-4xl font-semibold uppercase leading-[1.02] md:col-span-9 md:text-6xl">
            We build the power stations that keep a city running when its grid cannot. Not as backup. As infrastructure.
          </p>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap py-24 md:py-32">
          <SectionLabel n="02">The problem</SectionLabel>
          <ol className="mt-12 divide-y divide-rule border-y border-rule">
            {PROBLEMS.map((p) => (
              <li key={p.n} className="grid gap-4 py-10 md:grid-cols-12 md:items-baseline">
                <span className="label text-volt md:col-span-2">{p.n}</span>
                <p className="display text-4xl md:col-span-10 md:text-6xl">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-5">
            <SectionLabel n="03">Founder</SectionLabel>
            <div className="mt-10 aspect-[4/5] max-w-sm border border-rule bg-[#07090b]">
              <svg viewBox="0 0 400 500" className="h-full w-full" role="img" aria-label="Founder portrait placeholder">
                <rect width="400" height="500" fill="#07090b" />
                <circle cx="200" cy="190" r="78" fill="#14181b" />
                <path d="M70 500 C 80 360 320 360 330 500Z" fill="#14181b" />
                <text x="200" y="470" textAnchor="middle" fill="#8B9298" fontFamily="var(--font-plex-mono)" fontSize="12" letterSpacing="4">PORTRAIT</text>
              </svg>
            </div>
          </div>
          <div className="md:col-span-7 md:pt-16">
            <p className="label text-mute">Founder and Chief Executive</p>
            <h2 className="display mt-4 text-5xl md:text-7xl">Founder Name</h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-mute">
              <p>
                Placeholder biography. The founder grew up in Kampala, doing homework by torchlight on the nights the power went
                out. That memory became a mission.
              </p>
              <p>
                Placeholder biography. Before Nile Peak, they worked across energy and engineering, building the conviction that
                the answer to load shedding is not more generators but a smarter grid, built here.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-6">
            <SectionLabel n="04">Origin</SectionLabel>
            <h2 className="display mt-6 text-6xl md:text-8xl">Built in Uganda, for Africa</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-mute md:col-span-5 md:col-start-8 md:self-end">
            <p>
              We design, assemble and operate our stations here, with engineers who know the grid they are fixing. Every lesson
              learned in Kampala travels with us to the next city.
            </p>
            <ArrowLink href="/careers">Join the team</ArrowLink>
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap py-24 md:py-32">
          <SectionLabel n="05">Partners</SectionLabel>
          <ul className="mt-12 grid grid-cols-2 border-l border-t border-rule md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="flex h-32 items-center justify-center border-b border-r border-rule">
                <Redacted label="PARTNER" size={4} className="text-mute" />
              </li>
            ))}
          </ul>
          <p className="label mt-6 text-mute">Partner names are disclosed with their agreement.</p>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap py-24 md:py-32">
          <SectionLabel n="06">Offices</SectionLabel>
          <div className="mt-12 grid gap-px bg-rule md:grid-cols-3">
            <div className="bg-ink p-8 md:pl-0">
              <p className="label text-volt">Headquarters</p>
              <h3 className="display mt-4 text-4xl">Kampala</h3>
              <p className="mt-3 text-mute">Uganda</p>
            </div>
            <div className="bg-ink p-8">
              <p className="label text-mute">Operations desk</p>
              <h3 className="display mt-4 text-4xl">Kampala</h3>
              <p className="mt-3 text-mute">Uganda</p>
            </div>
            <div className="bg-ink p-8">
              <p className="label text-mute">Next</p>
              <h3 className="display mt-4 text-4xl">
                <Redacted size={6} className="text-4xl" />
              </h3>
              <p className="mt-3 text-mute">Announced in due course</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
