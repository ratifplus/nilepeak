import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Nile Peak: Keep the lights on with us';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg('Keep the lights on with us', 'CAREERS');
}
