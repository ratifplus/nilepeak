import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Nile Peak: The Peak Station';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg('The Peak Station', 'STATION');
}
