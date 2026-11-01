import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Nile Peak: Built for the grids that need it most';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg('Built for the grids that need it most', 'COMPANY');
}
