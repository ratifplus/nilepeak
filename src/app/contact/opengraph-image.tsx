import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Nile Peak: Request a briefing';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg('Request a briefing', 'CONTACT');
}
