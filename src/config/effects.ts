/**
 * Every tunable parameter for the site's signature effects lives here.
 * Pixel values are CSS pixels. Times are seconds unless noted.
 */

export const colors = {
  black: '#050607',
  white: '#F2F3F4',
  grey: '#8B9298',
  rule: '#1E2226',
  /** The only accent. Reserved for electricity: pulses, glow, active states. */
  current: '#3AD1FF',
} as const;

export const energizedType = {
  /** Mains hum frequency the jitter is phase-locked to (transformer hum is 2x mains). */
  humHz: 100,
  /** Max horizontal jitter of the letters nearest the station, in px. */
  jitterAmplitude: 0.75,
  /** Heat-haze style displacement amplitude, in px. */
  displacementAmplitude: 0.5,
  /** Distance (px) over which the effect decays away from the station. */
  falloff: 520,
  /** Minimum effect strength far from the station (0 to 1). */
  floor: 0.22,
  /** Chromatic aberration on letter edges, in px at full jitter. */
  aberration: 1.0,
  /** How often a current pulse leaves the station (seconds). */
  pulsePeriod: 2.6,
  /** Width of the charging band that sweeps through the letters, in px. */
  pulseWidth: 90,
  /** Brightness the letters gain while a pulse charges them. */
  pulseGain: 1.9,
  /** Steady glow on letters closest to the station. */
  nearGlow: 0.18,
};

export const scene = {
  /** Speed multiplier for pulses travelling along the transmission line. */
  linePulseSpeed: 1,
  /** Number of pulses on each conductor at once. */
  linePulseCount: 3,
  bloom: { intensity: 1.15, threshold: 0.95, smoothing: 0.25, radius: 0.72 },
  /** Global chromatic aberration pass (very small, in UV units). */
  chromaticAberration: 0.0006,
  vignette: { offset: 0.25, darkness: 0.78 },
  cityLights: { desktop: 2600, mobile: 900 },
  /** Delay after first paint before the 3D scene is mounted (ms). */
  mountDelay: 120,
};

export const performance = {
  maxDprDesktop: 1.75,
  maxDprMobile: 1.25,
  /** Multiplier applied to jitter, aberration and bloom on small screens. */
  mobileIntensity: 0.6,
  mobileBreakpoint: 768,
};

export const gridMoment = {
  /** Scroll distance the pinned sequence occupies, as a multiple of viewport height. */
  scrollLength: 3.2,
  /** Progress markers (0 to 1) for each phase of the sequence. */
  phases: { failStart: 0.12, failEnd: 0.42, engage: 0.52, restored: 0.82 },
  /** How far the letters sag at full failure, in px. */
  sag: 26,
  /** Amplitude of the 50 Hz wave the letters ride when the Core engages, in px. */
  rideAmplitude: 14,
  waveHz: 50,
};

export const powerDip = {
  /** Total duration of the dip between pages (ms). Keep under 300. */
  duration: 280,
  /** How dark the screen gets at the bottom of the dip (0 to 1). */
  depth: 0.82,
};

export const sound = {
  fundamental: 100,
  harmonics: [
    { multiple: 2, gain: 0.35 },
    { multiple: 3, gain: 0.16 },
  ],
  /** Master gain. Keep it very low. */
  gain: 0.045,
  fadeIn: 0.8,
  cutOut: 0.08,
  restore: 0.6,
};
