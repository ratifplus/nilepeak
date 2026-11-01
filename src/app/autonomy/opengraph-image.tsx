import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Nile Peak: Acts before the dark';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg('Acts before the dark', 'AUTONOMY');
}
