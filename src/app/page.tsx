import Link from 'next/link';
import { HeroField } from '@/components/HeroField';
import { Plate } from '@/components/Plate';
import { Marker, Section } from '@/components/ui';
import { formatDate, getPostMetas } from '@/lib/news';

/** Hero object: swap src for the transparent PNG when it arrives and set placeholder to false. */
const HERO_OBJECT = { src: '/images/hero-object.svg', width: 1000, height: 900, placeholder: true };

export default function Home() {
  const news = getPostMetas().slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-step">
        <HeroField sourceId="hero-title" emitterId="hero-object" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id="hero-object"
          src={HERO_OBJECT.src}
          width={HERO_OBJECT.width}
          height={HERO_OBJECT.height}
          alt={HERO_OBJECT.placeholder ? 'Placeholder: transformer' : 'A grid-forming station transformer'}
          fetchPriority="high"
          className="pointer-events-none absolute right-[-22vw] top-[6%] z-10 w-[120vw] max-w-none select-none md:right-[-10vw] md:top-[4%] md:w-[72vw]"
        />

        <div className="grid-12 relative z-20 w-full gap-y-5 pb-12 md:pb-16">
          <h1 id="hero-title" className="field-source headline t-xl col-span-12">
            <span data-line className="block whitespace-nowrap">Stable power</span>
            <span data-line className="block whitespace-nowrap">is national</span>
            <span data-line className="block whitespace-nowrap">infrastructure.</span>
          </h1>
          <p className="body col-span-12 max-w-sm md:col-span-4">
            Nile Peak develops grid-forming stations that hold power grids steady and restore them after failure.
          </p>
          {HERO_OBJECT.placeholder && <p className="label col-span-12 text-mute">Placeholder object</p>}
        </div>
      </section>

      <div className="bg-step">
        <Plate kind="station" className="aspect-[16/10] w-full md:aspect-[21/9]" />
      </div>

      <Section n="01" label="Problem" title="Grids are failing faster than they can be rebuilt." className="bg-step">
        <p>Every outage stops industry, public services and investment.</p>
      </Section>

      <Section
        n="02"
        label="Platform"
        title="A station that stores energy and holds the grid up when it falters."
        link={{ href: '/platform', label: 'Platform' }}
        className="bg-ground"
      />

      <Section
        n="03"
        label="Partners"
        title="We develop with utilities, governments, financiers and contractors."
        link={{ href: '/contact', label: 'Contact' }}
        className="bg-ground"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="grid-12 gap-y-8">
          <div className="col-span-12">
            <Marker n="04" label="News" />
          </div>
          <ul className="col-span-12 grid gap-8 md:grid-cols-3">
            {news.map((p) => (
              <li key={p.slug} data-reveal>
                <time dateTime={p.date} className="text-[11px] text-mute">
                  {formatDate(p.date)}
                </time>
                <Link href={`/newsroom/${p.slug}`} className="mt-3 block text-xl font-bold leading-tight tracking-[-0.01em] text-title hover:text-navy">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
          <div data-reveal className="col-span-12 mt-4">
            <Link href="/newsroom" className="link">
              Read more
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
