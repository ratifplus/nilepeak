import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ContactForm } from '@/components/Forms';
import { PageHero, SectionLabel } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Nile Peak for general enquiries, partnerships and media.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact" title="Contact" intro="General enquiries, partnerships and media. Choose a desk and we will route your message." />
      <section>
        <div className="wrap grid gap-16 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-8">
            <Suspense>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="space-y-12 md:col-span-3 md:col-start-10">
            <div>
              <SectionLabel>Office</SectionLabel>
              <p className="display mt-6 text-3xl">Kampala, Uganda</p>
            </div>
            <div id="media-kit" className="scroll-mt-32 border border-rule p-6">
              <p className="label text-volt">Media kit</p>
              <p className="mt-4 text-sm text-mute">
                Logos, approved imagery and a company fact sheet are available to accredited media. Select the Media tab and
                choose the media kit topic to request access.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
