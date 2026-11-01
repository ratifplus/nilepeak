import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Nile Peak: Built in Uganda, for Africa';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg('Built in Uganda, for Africa', 'COMPANY');
}
