import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

/** Shared Open Graph card: black field, thin rules, a current line and the page title. */
export function renderOg(title: string, kicker: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#050607',
          color: '#F2F3F4',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 6, color: '#8B9298' }}>
          <span style={{ color: '#F2F3F4', fontWeight: 700, letterSpacing: 8 }}>NILE PEAK</span>
          <span>{kicker}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', height: 2, width: '100%', background: '#1E2226', marginBottom: 40 }}>
            <div style={{ width: 220, height: 2, background: '#3AD1FF', boxShadow: '0 0 24px #3AD1FF' }} />
          </div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -1, textTransform: 'uppercase' }}>
            {title}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 20, letterSpacing: 6, color: '#8B9298' }}>KAMPALA, UGANDA</div>
      </div>
    ),
    ogSize,
  );
}
