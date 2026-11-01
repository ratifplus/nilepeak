import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ApplicationForm } from '@/components/Forms';
import { Arrow, PageHero, SectionLabel } from '@/components/ui';
import roles from '@content/careers/roles.json';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Nile Peak in Kampala and help end load shedding in African cities.',
};

const VALUES = [
  { title: 'Hold the line', body: 'Our stations do not get a night off. Neither does our standard.' },
  { title: 'Build it here', body: 'We design for the grid we live on, with the people who know it.' },
  { title: 'Say less, ship more', body: 'Outcomes speak. We let the lights do the talking.' },
  { title: 'Safety first, always', body: 'High voltage forgives nothing. We plan, check and check again.' },
];

const HOW = [
  'Small teams with real ownership, from model to energization.',
  'Time on site. Everyone who designs a station sees one run.',
  'Written decisions, open data and short meetings.',
  'Kampala first. Hybrid where the work allows.',
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        kicker="Careers"
        title="Keep the lights on with us"
        intro="We are a small team of engineers, builders and operators in Kampala. If you want your work to be felt every evening by a whole city, read on."
      />

      <section>
        <div className="wrap py-24 md:py-32">
          <SectionLabel n="01">Values</SectionLabel>
          <div className="mt-12 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <div key={v.title} className="bg-ink p-6 md:p-8">
                <span className="label text-volt">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display mt-6 text-4xl">{v.title}</h3>
                <p className="mt-4 text-mute">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-4">
            <SectionLabel n="02">How we work</SectionLabel>
          </div>
          <ul className="divide-y divide-rule border-y border-rule md:col-span-8">
            {HOW.map((h) => (
              <li key={h} className="py-6 text-xl text-paper/90">
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule" id="roles">
        <div className="wrap py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel n="03">Open roles</SectionLabel>
              <h2 className="display mt-6 text-6xl md:text-8xl">Open roles</h2>
            </div>
            <p className="label text-mute">{roles.length} positions</p>
          </div>
          <ul className="mt-12 border-t border-rule">
            {roles.map((r) => (
              <li key={r.slug} className="border-b border-rule">
                <details className="group">
                  <summary className="grid cursor-pointer list-none gap-4 py-8 md:grid-cols-12 md:items-center [&::-webkit-details-marker]:hidden">
                    <h3 className="display text-4xl transition-colors group-hover:text-volt md:col-span-6 md:text-5xl">{r.title}</h3>
                    <span className="label text-mute md:col-span-2">{r.team}</span>
                    <span className="label text-mute md:col-span-2">{r.location}</span>
                    <span className="label flex items-center justify-between text-mute md:col-span-2">
                      {r.type}
                      <span className="text-2xl leading-none text-paper transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <div className="grid gap-10 pb-12 md:grid-cols-12">
                    <p className="text-lg text-paper/90 md:col-span-5">{r.summary}</p>
                    <div className="md:col-span-3">
                      <p className="label text-mute">You will</p>
                      <ul className="mt-4 space-y-2 text-sm text-mute">
                        {r.responsibilities.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-3">
                      <p className="label text-mute">You bring</p>
                      <ul className="mt-4 space-y-2 text-sm text-mute">
                        {r.requirements.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-12">
                      <Link href={`/careers?role=${r.slug}#apply`} scroll={false} className="btn">
                        Apply for this role <Arrow />
                      </Link>
                    </div>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule" id="apply">
        <div className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-4">
            <SectionLabel n="04">Apply</SectionLabel>
            <h2 className="display mt-6 text-5xl md:text-6xl">General application</h2>
            <p className="mt-6 text-mute">Do not see your role? Tell us what you would build here.</p>
          </div>
          <div className="md:col-span-8">
            <Suspense>
              <ApplicationForm roles={roles.map((r) => ({ slug: r.slug, title: r.title }))} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
