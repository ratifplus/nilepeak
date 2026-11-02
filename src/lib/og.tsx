import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

/** Shared Open Graph card: light grey field, hairline, oversized title. */
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
          background: '#D9D9D9',
          color: '#454343',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 6 }}>
          <span style={{ fontWeight: 800, letterSpacing: 8 }}>NILE PEAK</span>
          <span style={{ color: '#1B2A4A' }}>{kicker}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', height: 1, width: '100%', background: '#AEAEAE', marginBottom: 40 }} />
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>{title}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
