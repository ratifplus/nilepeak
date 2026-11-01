import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'How Nile Peak handles personal information.' };

const L = 'Placeholder text. This section will describe';

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 November 2026"
      sections={[
        { h: 'Who we are', p: `${L} Nile Peak, its registered office in Kampala, Uganda, and how to contact us about privacy.` },
        { h: 'What we collect', p: `${L} the information you give us through our contact and application forms, and the limited technical data our website collects.` },
        { h: 'How we use it', p: `${L} how we use your information to respond to enquiries, assess applications and operate this website.` },
        { h: 'Sharing', p: `${L} when, if ever, we share information with service providers, and the safeguards we require.` },
        { h: 'Retention', p: `${L} how long we keep information and how it is deleted.` },
        { h: 'Your rights', p: `${L} your rights under the Data Protection and Privacy Act of Uganda and how to exercise them.` },
        { h: 'Changes', p: `${L} how we will tell you about changes to this policy.` },
      ]}
    />
  );
}
