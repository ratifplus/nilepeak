import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Nile Peak: Newsroom';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg('Newsroom', 'NEWSROOM');
}
