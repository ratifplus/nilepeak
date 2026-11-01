import Link from 'next/link';
import { PageTitle } from '@/components/ui';

export default function NotFound() {
  return (
    <PageTitle label="404" title="Page not found">
      <Link href="/" className="link">
        Home
      </Link>
    </PageTitle>
  );
}
