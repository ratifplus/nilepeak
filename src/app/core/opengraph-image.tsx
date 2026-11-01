import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Nile Peak: The Core';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg('The Core', 'CORE');
}
