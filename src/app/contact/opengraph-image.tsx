import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Nile Peak: Contact Nile Peak';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg('Contact Nile Peak', 'CONTACT');
}
