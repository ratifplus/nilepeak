import { PowerDip } from '@/components/PowerDip';

/**
 * Remounts on every navigation. A brief power dip (dim, one flicker, release)
 * sits over the new page while it fades up.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PowerDip />
      <div className="page-up">{children}</div>
    </>
  );
}
