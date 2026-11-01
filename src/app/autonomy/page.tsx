import type { Metadata } from 'next';
import { ContactCta, PageHero, SectionLabel } from '@/components/ui';
import { ActionTimeline, ForecastPanel, RemoteConsole } from '@/components/visuals/Dashboards';

export const metadata: Metadata = {
  title: 'Autonomy',
  description: 'Control and software that forecast the evening, act before the lights go out and run every station remotely.',
};

export default function AutonomyPage() {
  return (
    <>
      <PageHero
        kicker="Software / Autonomy"
        title="Acts before the dark"
        intro="Every Peak Station thinks for itself. It forecasts the evening, prepares before supply drops, and takes over without waiting for a human to press a button."
      />

      <section>
        <div className="wrap grid items-center gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-5">
            <SectionLabel n="01">Forecasting</SectionLabel>
            <h2 className="display mt-6 text-5xl md:text-6xl">It knows the evening is coming</h2>
            <p className="mt-6 text-lg leading-relaxed text-mute">
              Demand in a city follows a rhythm. The station learns it: the morning rise, the afternoon lull, the steep climb as
              the sun goes down. It plans each day around the hour the grid is most likely to falter.
            </p>
          </div>
          <div className="md:col-span-7">
            <ForecastPanel />
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap py-24 md:py-32">
          <div className="mb-12 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionLabel n="02">Acting early</SectionLabel>
              <h2 className="display mt-6 text-5xl md:text-6xl">Ready before the lights go out</h2>
            </div>
            <p className="text-lg leading-relaxed text-mute md:col-span-6 md:col-start-7 md:self-end">
              By the time the grid drops, the station has already charged, armed its protection and chosen its response. The
              handover takes less time than a flicker.
            </p>
          </div>
          <ActionTimeline />
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap grid items-center gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:order-2 md:col-span-5 md:pl-10">
            <SectionLabel n="03">Remote operation</SectionLabel>
            <h2 className="display mt-6 text-5xl md:text-6xl">One desk, every station</h2>
            <p className="mt-6 text-lg leading-relaxed text-mute">
              Our operations team in Kampala watches the whole fleet in real time. They can tune, update and inspect any station
              from one desk, and send a field team when something needs hands.
            </p>
          </div>
          <div className="md:order-1 md:col-span-7">
            <RemoteConsole />
          </div>
        </div>
      </section>

      <ContactCta title="Run a fleet, not a site" body="Utilities and operators can request a walkthrough of our control platform." />
    </>
  );
}
