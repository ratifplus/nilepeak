import Link from 'next/link';
import { HeroField } from '@/components/HeroField';
import { Plate } from '@/components/Plate';
import { Section } from '@/components/ui';
import { formatDate, getPostMetas } from '@/lib/news';

/** Hero object: swap src for the transparent PNG when it arrives and set placeholder to false. */
const HERO_OBJECT = { src: '/images/hero-object.svg', width: 1000, height: 900, placeholder: true };

export default function Home() {
  const news = getPostMetas().slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[calc(100svh-6rem)] items-center overflow-hidden">
        <HeroField sourceId="hero-title" emitterId="hero-object" />

        <div className="grid-12 relative w-full py-16">
          <h1
            id="hero-title"
            className="field-source headline col-span-12 text-center text-[15vw] leading-[0.92] md:text-[10.5vw] 2xl:text-[168px]"
          >
            <span data-line className="block whitespace-nowrap">Stable power</span>
            <span data-line className="block whitespace-nowrap">is national</span>
            <span data-line className="block whitespace-nowrap">infrastructure.</span>
          </h1>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id="hero-object"
          src={HERO_OBJECT.src}
          width={HERO_OBJECT.width}
          height={HERO_OBJECT.height}
          alt={HERO_OBJECT.placeholder ? 'Placeholder: transformer' : 'A grid-forming station transformer'}
          fetchPriority="high"
          className="pointer-events-none absolute left-1/2 top-[70%] z-10 w-[min(58vw,520px)] -translate-x-1/2 -translate-y-1/2 select-none md:w-[min(28vw,520px)]"
        />

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="grid-12 items-end pb-8">
            <p className="body col-span-12 max-w-sm text-ink/80 md:col-span-4">
              Nile Peak develops grid-forming stations that hold power grids steady and restore them after failure.
            </p>
            {HERO_OBJECT.placeholder && (
              <p className="label col-span-12 mt-4 text-mute md:col-span-4 md:col-start-9 md:mt-0 md:text-right">Placeholder object</p>
            )}
          </div>
        </div>
      </section>

      <Section label="Problem" title="Grids are failing faster than they can be rebuilt.">
        <p>Every outage stops industry, public services and investment.</p>
      </Section>

      <section className="py-28 md:py-44">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <p data-reveal className="label text-mute">
              Platform
            </p>
            <h2 data-reveal className="headline mt-6 text-[11vw] md:text-[5.6vw] 2xl:text-[92px]">
              A station that stores energy and holds the grid up when it falters.
            </h2>
          </div>
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
        label="Partners"
        title="We develop with utilities, governments, financiers and contractors."
        link={{ href: '/contact', label: 'Contact' }}
      />

      <section className="pb-28 md:pb-44">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <p data-reveal className="label text-mute">
              News
            </p>
            <ul className="mt-8">
              {news.map((p) => (
                <li key={p.slug} data-reveal>
                  <Link href={`/newsroom/${p.slug}`} className="grid grid-cols-9 gap-x-6 gap-y-2 py-6 transition-opacity hover:opacity-60">
                    <time dateTime={p.date} className="label col-span-9 text-mute md:col-span-2 md:pt-3">
                      {formatDate(p.date)}
                    </time>
                    <span className="headline col-span-9 text-4xl md:col-span-7 md:text-5xl">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-10">
              <Link href="/newsroom" className="link">
                Newsroom
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
