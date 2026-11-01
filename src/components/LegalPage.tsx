import { PageTitle } from './ui';

export function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageTitle label="Legal" title={title}>
        <p>Placeholder text pending legal review.</p>
      </PageTitle>
      <section className="pb-28 md:pb-40">
        <div className="grid-12">
          <div className="col-span-12 border-t border-rule md:col-span-9 md:col-start-4">
            {sections.map((s, i) => (
              <div key={s.h} className="grid grid-cols-9 gap-x-6 gap-y-4 border-b border-rule py-10">
                <h2 className="label col-span-9 md:col-span-3">
                  <span className="mr-4 text-mute">{String(i + 1).padStart(2, '0')}</span>
                  {s.h}
                </h2>
                <p className="body col-span-9 md:col-span-6">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
