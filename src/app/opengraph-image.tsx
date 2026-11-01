import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Nile Peak: Stable power is national infrastructure';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg('Stable power is national infrastructure', 'NILE PEAK');
}
