import { ArrowLink, Redacted } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-end pt-40 pb-24">
      <div className="wrap">
        <Redacted label="SIGNAL" unit="LOST" className="text-mute" />
        <h1 className="display mt-6 text-[18vw] md:text-[12rem]">404</h1>
        <p className="mt-4 max-w-md text-lg text-mute">This page is dark. The rest of the grid is holding.</p>
        <div className="mt-10">
          <ArrowLink href="/">Back to home</ArrowLink>
        </div>
      </div>
    </section>
  );
}
