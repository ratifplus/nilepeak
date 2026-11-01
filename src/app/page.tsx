import Link from 'next/link';
import { EnergizedHero } from '@/components/EnergizedHero';
import { GridMoment } from '@/components/GridMoment';
import { StationHotspots } from '@/components/StationHotspots';
import { ArrowLink, SectionLabel } from '@/components/ui';
import { PostVisual } from '@/components/visuals/Diagrams';
import { formatDate, getPostMetas } from '@/lib/news';

export default function Home() {
  const posts = getPostMetas();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const recent = posts.filter((p) => p.slug !== featured.slug).slice(0, 3);

  return (
    <>
      <EnergizedHero variant="home" kicker="Peak Station / Live" lines={['KAMPALA,', 'WITHOUT LOAD', 'SHEDDING.']}>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <ArrowLink href="/station">Meet the station</ArrowLink>
          <span className="label text-mute">Scroll</span>
        </div>
      </EnergizedHero>

      {/* 01 MISSION */}
      <section className="border-t border-rule">
        <div className="wrap grid gap-10 py-24 md:grid-cols-12 md:py-40">
          <div className="md:col-span-3">
            <SectionLabel n="01">Mission</SectionLabel>
          </div>
          <div className="md:col-span-9">
            <p className="font-display text-4xl font-semibold uppercase leading-[1.02] md:text-6xl">
              Every evening, at the hour a city needs power most, the lights go out. We build grid-forming power stations
              that hold them on. <span className="text-mute">Quietly, automatically, and every single night.</span>
            </p>
            <div className="mt-12">
              <ArrowLink href="/company">Our company</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* 02 PRODUCT */}
      <section className="border-t border-rule">
        <div className="wrap py-24 md:py-32">
          <div className="mb-14 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <SectionLabel n="02">Product</SectionLabel>
            </div>
            <div className="md:col-span-9">
              <h2 className="display text-6xl md:text-8xl">The Peak Station</h2>
              <p className="mt-6 max-w-xl text-lg text-mute">
                A self-contained power station that sits between the grid and the city, and takes over the moment the grid
                lets go.
              </p>
            </div>
          </div>
          <StationHotspots />
        </div>
      </section>

      {/* 03 THE GRID MOMENT */}
      <GridMoment />

      {/* 04 NEWS */}
      <section className="border-t border-rule">
        <div className="wrap py-24 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel n="04">News</SectionLabel>
              <h2 className="display mt-6 text-6xl md:text-8xl">Newsroom</h2>
            </div>
            <ArrowLink href="/newsroom">More news</ArrowLink>
          </div>

          <div className="grid gap-px bg-rule md:grid-cols-12">
            <Link href={`/newsroom/${featured.slug}`} className="group bg-ink md:col-span-7">
              <PostVisual kind={featured.visual} className="aspect-[16/10]" />
              <div className="p-6 md:p-8">
                <p className="label flex gap-4 text-mute">
                  <span className="text-volt">{featured.category}</span>
                  <span>{formatDate(featured.date)}</span>
                </p>
                <h3 className="display mt-4 text-4xl transition-colors group-hover:text-volt md:text-5xl">{featured.title}</h3>
                <p className="mt-4 max-w-lg text-mute">{featured.excerpt}</p>
              </div>
            </Link>
            <ul className="flex flex-col bg-ink md:col-span-5">
              {recent.map((p) => (
                <li key={p.slug} className="flex-1 border-b border-rule last:border-b-0">
                  <Link href={`/newsroom/${p.slug}`} className="group flex h-full flex-col justify-between gap-6 p-6 md:p-8">
                    <p className="label flex gap-4 text-mute">
                      <span className="text-volt">{p.category}</span>
                      <span>{formatDate(p.date)}</span>
                    </p>
                    <h3 className="display text-3xl transition-colors group-hover:text-volt">{p.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
