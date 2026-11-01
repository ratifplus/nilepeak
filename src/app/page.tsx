import Link from 'next/link';
import { HumFilter } from '@/components/HumFilter';
import { Plate } from '@/components/Plate';
import { Section } from '@/components/ui';
import { formatDate, getPostMetas } from '@/lib/news';

export default function Home() {
  const news = getPostMetas().slice(0, 3);

  return (
    <>
      {/* Hero: the page's one dark band */}
      <section className="relative flex min-h-[calc(100svh-6rem)] flex-col overflow-hidden bg-band text-ground">
        <div className="absolute inset-0">
          <Plate kind="station-night" className="h-full w-full" />
        </div>
        <HumFilter target="#hero-title" />
        <div className="grid-12 relative gap-y-8 pt-20 md:pt-28">
          <h1 id="hero-title" className="headline col-span-12 text-[12.5vw] md:col-span-10 md:text-[9.4vw] 2xl:text-[150px]">
            Stable power is national infrastructure.
          </h1>
          <p className="body col-span-12 max-w-md text-ground/80 md:col-span-5">
            Nile Peak develops grid-forming stations that hold power grids steady and restore them after failure.
          </p>
        </div>
      </section>

      <Section n="01" label="Problem" title="Grids are failing faster than they can be rebuilt.">
        <p>Every outage stops industry, public services and investment.</p>
      </Section>

      <section className="screen border-t border-rule">
        <div className="grid-12 gap-y-10">
          <p data-reveal className="label col-span-12 text-mute md:col-span-3">
            <span className="mr-4 text-ink">02</span>Platform
          </p>
          <h2 data-reveal className="headline col-span-12 text-[11vw] md:col-span-9 md:text-[5.6vw] 2xl:text-[92px]">
            A station that stores energy and holds the grid up when it falters.
          </h2>
          <div data-reveal className="col-span-12">
            <Plate kind="station" className="aspect-[16/9] w-full md:aspect-[21/9]" />
          </div>
          <div data-reveal className="col-span-12 md:col-span-9 md:col-start-4">
            <Link href="/platform" className="link">
              Platform
            </Link>
          </div>
        </div>
      </section>

      <Section
        n="03"
        label="Partners"
        title="We develop with utilities, governments, financiers and contractors."
        link={{ href: '/contact', label: 'Contact' }}
      />

      <section className="border-t border-rule py-28 md:py-40">
        <div className="grid-12 gap-y-10">
          <p data-reveal className="label col-span-12 text-mute md:col-span-3">
            <span className="mr-4 text-ink">04</span>News
          </p>
          <ul className="col-span-12 border-t border-rule md:col-span-9">
            {news.map((p) => (
              <li key={p.slug} data-reveal className="border-b border-rule">
                <Link href={`/newsroom/${p.slug}`} className="grid grid-cols-9 gap-x-6 gap-y-2 py-8 transition-opacity hover:opacity-60">
                  <time dateTime={p.date} className="label col-span-9 text-mute md:col-span-2 md:pt-2">
                    {formatDate(p.date)}
                  </time>
                  <span className="headline col-span-9 text-4xl md:col-span-7 md:text-5xl">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div data-reveal className="col-span-12 md:col-span-9 md:col-start-4">
            <Link href="/newsroom" className="link">
              Newsroom
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
