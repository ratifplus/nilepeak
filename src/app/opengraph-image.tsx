import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Nile Peak: Kampala, without load shedding';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg('Kampala, without load shedding', 'PEAK STATION');
}
