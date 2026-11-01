import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Nile Peak: Grid-forming';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg('Grid-forming', 'TECHNOLOGY');
}
