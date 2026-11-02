import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Request a briefing',
  description: 'Request a briefing from Nile Peak: utilities, governments, financiers, engineering partners and media.',
};

export default function ContactPage() {
  return (
    <section className="pb-28 pt-36 md:pb-40 md:pt-48">
      <div className="grid-12 gap-y-16">
        <p className="label col-span-12 text-mute">Contact</p>
        <h1 className="headline t-xl col-span-12">Request a briefing</h1>
        <div className="col-span-12 md:col-span-8 md:col-start-5">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
