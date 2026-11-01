# Nile Peak

Website for [nilepeak.com](https://nilepeak.com). Grid-forming battery power stations that keep Kampala's electricity on during load shedding.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · React Three Fiber, drei, @react-three/postprocessing · GSAP ScrollTrigger · Lenis · MDX (next-mdx-remote)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Where things live

| Path | What |
| --- | --- |
| `src/config/effects.ts` | Every effect parameter: jitter, falloff, aberration, pulse speed, bloom, colors, grid moment phases, power dip, sound |
| `src/app/` | Routes: `/`, `/station`, `/core`, `/autonomy`, `/company`, `/newsroom`, `/newsroom/[slug]`, `/careers`, `/contact`, `/privacy`, `/supplier-code-of-conduct` |
| `content/news/*.mdx` | Newsroom posts. Frontmatter: `title`, `date`, `category` (NEWS, BLOG, PRESS), `excerpt`, `featured`, `visual` |
| `content/careers/roles.json` | Open roles |
| `src/components/three/` | Hero scene: station, hills and city lights, transmission line pulses, energized type shader |
| `src/components/GridMoment.tsx` | Home section 03, the pinned scroll sequence |
| `src/components/Forms.tsx` | Contact and application forms. `submitPlaceholder` is the stub to replace with a real endpoint |

## Signature effects

- **Energized type** (home, station, core heroes). The real `<h1>` is rendered in HTML. After first paint the WebGL scene mounts behind a dark poster, draws the headline to a texture at the exact DOM position, and runs it through `EnergizedText`'s fragment shader (100 Hz row jitter, haze displacement, chromatic aberration, charging pulses). Once drawn, the HTML glyphs go transparent, but stay in the DOM for SEO and screen readers.
- **The grid moment** (home 03). GSAP ScrollTrigger pins the section and scrubs a 0 to 1 progress value; a canvas draws the city and the 50 Hz wave, and per-letter transforms handle the sag, flicker and snap back.
- **Power dip** between pages, in `src/app/template.tsx`.
- **Station hum** (off by default). The HEAR THE STATION toggle runs a Web Audio 100 Hz sine with 200 Hz and 300 Hz harmonics; it cuts out when the grid fails in the grid moment and returns when the Core engages.

`prefers-reduced-motion` gets static poster heroes, an unpinned final-state grid moment and simple fades. Small screens get lower effect intensity and pixel ratio.

## Disclosure rule

Stealth launch: no site locations, capacities, grid connection details, supplier names or logos. Use `<Redacted label="RESPONSE" unit="MS" />` wherever a spec would appear.
