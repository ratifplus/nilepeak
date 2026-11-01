# Nile Peak

Corporate site for [nilepeak.com](https://nilepeak.com). Nile Peak develops grid-forming stations that hold power grids steady and restore them after failure.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, MDX (next-mdx-remote). No 3D or animation libraries.

```bash
npm install
npm run dev
npm run build && npm run start
```

## Structure

| Path | What |
| --- | --- |
| `src/app/` | `/`, `/platform`, `/technology`, `/company`, `/newsroom`, `/newsroom/[slug]`, `/contact`, `/privacy`, `/supplier-code-of-conduct` |
| `content/news/*.mdx` | Posts. Frontmatter: `title`, `date`, `category` (NEWS or PRESS), `summary`, `image` |
| `src/components/Plate.tsx` | Monochrome placeholder imagery, each labelled as a placeholder. Replace with real photography |
| `src/components/HumFilter.tsx` | Home hero shimmer: an SVG turbulence and displacement filter, 1 to 2 px, off under reduced motion |
| `src/components/Waveform.tsx` | Technology page line that settles into a sine wave on entry |
| `src/components/Reveal.tsx` | 12 px, 400 ms fade up as elements enter |
| `src/components/ContactForm.tsx` | `submit` is the placeholder handler to replace with a real endpoint |

## Design rules

Palette `#E6E6E4`, `#111111`, `#8E8E8C`, `#C9C9C6`, plus one `#1C1C1C` band per page. Barlow Condensed 700 for headlines, IBM Plex Mono for labels, Inter for body. No city or country names in copy, no em dashes.
