import { PageHero } from './ui';

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHero kicker="Legal" title={title} intro={`Last updated ${updated}. Placeholder text pending legal review.`} />
      <section>
        <div className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <nav aria-label="Sections" className="md:col-span-3">
            <ol className="label space-y-3 text-mute md:sticky md:top-32">
              {sections.map((s, i) => (
                <li key={s.h}>
                  <a href={`#s${i + 1}`} className="hover:text-paper">
                    {String(i + 1).padStart(2, '0')} {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="md:col-span-7">
            {sections.map((s, i) => (
              <section key={s.h} id={`s${i + 1}`} className="scroll-mt-32 border-t border-rule py-10 first:border-t-0 first:pt-0">
                <h2 className="display text-4xl">
                  <span className="label mr-4 align-middle text-volt">{String(i + 1).padStart(2, '0')}</span>
                  {s.h}
                </h2>
                <p className="mt-6 leading-relaxed text-mute">{s.p}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
