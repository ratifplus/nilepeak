import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Supplier Code of Conduct', description: 'The standards Nile Peak expects of its suppliers.' };

export default function SupplierCodePage() {
  return (
    <LegalPage
      title="Supplier Code of Conduct"
      sections={[
        { h: 'Scope', p: 'Placeholder. Which suppliers, contractors and partners this code applies to.' },
        { h: 'Health and safety', p: 'Placeholder. Expectations for safe work around high-voltage equipment and construction sites.' },
        { h: 'Labour and human rights', p: 'Placeholder. Fair wages and working hours, and zero tolerance for forced or child labour.' },
        { h: 'Environment', p: 'Placeholder. Responsible sourcing, emissions, waste and end-of-life handling.' },
        { h: 'Ethics', p: 'Placeholder. Bribery, corruption, conflicts of interest and confidentiality.' },
        { h: 'Reporting concerns', p: 'Placeholder. How to raise a concern in confidence, without retaliation.' },
      ]}
    />
  );
}
