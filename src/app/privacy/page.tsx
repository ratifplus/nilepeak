import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'How Nile Peak handles personal information.' };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { h: 'Who we are', p: 'Placeholder. Who is responsible for your information and how to contact us.' },
        { h: 'What we collect', p: 'Placeholder. Information you submit through our contact form, and limited technical data.' },
        { h: 'How we use it', p: 'Placeholder. To respond to enquiries and operate this website.' },
        { h: 'Retention', p: 'Placeholder. How long we keep information and how it is deleted.' },
        { h: 'Your rights', p: 'Placeholder. Your rights under applicable data protection law and how to exercise them.' },
      ]}
    />
  );
}
