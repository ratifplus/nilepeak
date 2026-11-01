'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { colors, energizedType as cfg, scene as sceneCfg } from '@/config/effects';
import { CORE_POSITION } from './StationWorld';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/**
 * Energized type. The headline is rendered to a texture, then displaced by a
 * fast row jitter phase-locked to the 100 Hz hum plus a heat-haze wobble.
 * Strength falls off with distance from the station. Edges split into RGB in
 * proportion to the jitter. Charging bands leave the station with each
 * current pulse and brighten the letters as they pass.
 */
const fragmentShader = /* glsl */ `
  uniform sampler2D uText;
  uniform vec2 uRes;
  uniform vec2 uStation;
  uniform float uTime;
  uniform float uHumHz;
  uniform float uJitter;
  uniform float uDisp;
  uniform float uFalloff;
  uniform float uFloor;
  uniform float uAberration;
  uniform float uPulsePeriod;
  uniform float uPulseWidth;
  uniform float uPulseGain;
  uniform float uNearGlow;
  uniform float uIntensity;
  uniform vec3 uColor;
  uniform vec3 uCurrent;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

  void main() {
    vec2 px = vUv * uRes;
    vec2 st = uStation * uRes;
    float d = distance(px, st);
    float near = exp(-d / uFalloff);
    float amt = mix(uFloor, 1.0, near) * uIntensity;

    // 100 Hz hum. Sampled at display rate it aliases into a fine shimmer,
    // which is what a humming transformer looks like through heat.
    float hum = sin(uTime * 6.2831853 * uHumHz);
    float frame = floor(uTime * 120.0);
    float row = floor(px.y / 2.0);
    float j = (hash(vec2(row, frame)) - 0.5) * 2.0;
    float j2 = (hash(vec2(row * 0.37, frame + 17.0)) - 0.5) * 2.0;
    float haze = sin(px.y * 0.21 + uTime * 31.0) * 0.6 + sin(px.y * 0.067 - uTime * 17.0 + px.x * 0.01) * 0.4;

    vec2 off = vec2(j * uJitter + haze * uDisp, (hum * 0.35 + j2 * 0.25) * uJitter) * amt;
    vec2 ouv = off / uRes;
    float ca = uAberration * amt * (0.35 + 0.65 * abs(j));
    vec2 cuv = vec2(ca, ca * 0.25) / uRes;

    float r = texture2D(uText, vUv + ouv + cuv).a;
    float g = texture2D(uText, vUv + ouv).a;
    float b = texture2D(uText, vUv + ouv - cuv).a;
    float a = max(max(r, g), b);
    if (a < 0.003) discard;

    // Charging band leaving the station with each pulse.
    float phase = fract(uTime / uPulsePeriod);
    float radius = phase * length(uRes) * 1.15;
    float band = exp(-pow((d - radius) / uPulseWidth, 2.0)) * (1.0 - phase * 0.8);
    float charge = band * uPulseGain + near * uNearGlow;

    vec3 base = uColor * vec3(r, g, b);
    vec3 glow = uCurrent * g * charge;
    gl_FragColor = vec4(base * (1.0 + charge * 0.35) + glow, a);
  }
`;

interface Props {
  container: HTMLElement;
  source: HTMLElement;
  intensity: number;
  onReady: () => void;
}

function drawText(canvas: HTMLCanvasElement, container: HTMLElement, source: HTMLElement, dpr: number) {
  const cRect = container.getBoundingClientRect();
  canvas.width = Math.max(1, Math.round(cRect.width * dpr));
  canvas.height = Math.max(1, Math.round(cRect.height * dpr));
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cRect.width, cRect.height);
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'alphabetic';

  const lines = source.querySelectorAll<HTMLElement>('[data-line]');
  const range = document.createRange();
  lines.forEach((line) => {
    const cs = getComputedStyle(line);
    ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    if ('letterSpacing' in ctx) {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
        cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
    }
    const text = line.textContent ?? '';
    range.selectNodeContents(line);
    const tr = range.getBoundingClientRect();
    const lr = line.getBoundingClientRect();
    const m = ctx.measureText(text);
    const asc = m.fontBoundingBoxAscent ?? parseFloat(cs.fontSize) * 0.8;
    const desc = m.fontBoundingBoxDescent ?? parseFloat(cs.fontSize) * 0.2;
    const baseline = lr.top - cRect.top + (lr.height - (asc + desc)) / 2 + asc;
    ctx.fillText(text, tr.left - cRect.left, baseline);
  });
  return { width: cRect.width, height: cRect.height };
}

export function EnergizedText({ container, source, intensity, onReady }: Props) {
  const { camera } = useThree();
  const canvas = useMemo(() => document.createElement('canvas'), []);
  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas);
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    return t;
  }, [canvas]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
        uniforms: {
          uText: { value: texture },
          uRes: { value: new THREE.Vector2(1, 1) },
          uStation: { value: new THREE.Vector2(0.5, 0.3) },
          uTime: { value: 0 },
          uHumHz: { value: cfg.humHz },
          uJitter: { value: cfg.jitterAmplitude },
          uDisp: { value: cfg.displacementAmplitude },
          uFalloff: { value: cfg.falloff },
          uFloor: { value: cfg.floor },
          uAberration: { value: cfg.aberration },
          uPulsePeriod: { value: cfg.pulsePeriod / sceneCfg.linePulseCount },
          uPulseWidth: { value: cfg.pulseWidth },
          uPulseGain: { value: cfg.pulseGain },
          uNearGlow: { value: cfg.nearGlow },
          uIntensity: { value: intensity },
          uColor: { value: new THREE.Color(colors.white) },
          uCurrent: { value: new THREE.Color(colors.current) },
        },
      }),
    [texture, intensity],
  );

  const ready = useRef(false);
  const projected = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    let cancelled = false;
    const redraw = () => {
      if (cancelled) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = drawText(canvas, container, source, dpr);
      material.uniforms.uRes.value.set(width, height);
      texture.needsUpdate = true;
    };
    document.fonts.ready.then(() => {
      redraw();
      requestAnimationFrame(() => {
        if (!cancelled && !ready.current) {
          ready.current = true;
          onReady();
        }
      });
    });
    const ro = new ResizeObserver(() => document.fonts.ready.then(redraw));
    ro.observe(container);
    ro.observe(source);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [canvas, container, source, material, texture, onReady]);

  useEffect(() => () => {
    texture.dispose();
    material.dispose();
  }, [texture, material]);

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
    projected.copy(CORE_POSITION).project(camera);
    material.uniforms.uStation.value.set((projected.x + 1) / 2, (projected.y + 1) / 2);
  });

  return (
    <mesh frustumCulled={false} renderOrder={999} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}
