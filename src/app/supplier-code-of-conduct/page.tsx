import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Supplier Code of Conduct', description: 'The standards Nile Peak expects of its suppliers.' };

const L = 'Placeholder text. This section will set out';

export default function SupplierCodePage() {
  return (
    <LegalPage
      title="Supplier Code of Conduct"
      updated="1 November 2026"
      sections={[
        { h: 'Purpose', p: `${L} why this code exists and which suppliers, contractors and partners it applies to.` },
        { h: 'Health and safety', p: `${L} our expectations for safe working, particularly around high-voltage equipment and construction sites.` },
        { h: 'Labour and human rights', p: `${L} our standards on fair wages, working hours, freedom of association, and zero tolerance for forced or child labour.` },
        { h: 'Environment', p: `${L} our expectations on responsible sourcing, emissions, waste and end-of-life handling of equipment.` },
        { h: 'Ethics', p: `${L} our position on bribery, corruption, conflicts of interest and fair competition.` },
        { h: 'Confidentiality', p: `${L} how suppliers must protect confidential information, including site and technical details.` },
        { h: 'Reporting concerns', p: `${L} how to raise a concern in confidence, without fear of retaliation.` },
      ]}
    />
  );
}
