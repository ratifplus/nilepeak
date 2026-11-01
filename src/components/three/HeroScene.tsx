'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { performance as perfCfg, scene as sceneCfg } from '@/config/effects';
import { StationWorld } from './StationWorld';
import { EnergizedText } from './EnergizedText';

export type HeroVariant = 'home' | 'station' | 'core';

const CAMERAS: Record<HeroVariant, { pos: [number, number, number]; target: [number, number, number]; fov: number }> = {
  home: { pos: [-2.2, 2.0, 11.5], target: [2.2, 1.9, -2], fov: 38 },
  station: { pos: [9.5, 1.5, 7.5], target: [2.4, 1.2, -1], fov: 36 },
  core: { pos: [-1.0, 1.25, 2.6], target: [0.9, 1.05, -0.4], fov: 40 },
};

function CameraRig({ variant, reduced }: { variant: HeroVariant; reduced: boolean }) {
  const { camera, pointer } = useThree();
  const cfg = CAMERAS[variant];
  const base = useMemo(() => new THREE.Vector3(...cfg.pos), [cfg]);
  const target = useMemo(() => new THREE.Vector3(...cfg.target), [cfg]);
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = cfg.fov;
    cam.position.copy(base);
    cam.lookAt(target);
    cam.updateProjectionMatrix();
  }, [camera, cfg, base, target]);
  useFrame(({ clock }) => {
    if (reduced) return;
    const t = clock.elapsedTime;
    const s = variant === 'core' ? 0.12 : 0.35;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, base.x + pointer.x * s + Math.sin(t * 0.07) * s, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, base.y + pointer.y * s * 0.4, 0.04);
    camera.lookAt(target);
  });
  return null;
}

interface Props {
  variant: HeroVariant;
  container: HTMLElement;
  source: HTMLElement;
  onReady: () => void;
}

export default function HeroScene({ variant, container, source, onReady }: Props) {
  const [mobile] = useState(() => window.innerWidth < perfCfg.mobileBreakpoint);
  const [visible, setVisible] = useState(true);
  const intensity = mobile ? perfCfg.mobileIntensity : 1;
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '100px' });
    io.observe(container);
    return () => io.disconnect();
  }, [container]);

  const ca = useMemo(() => new THREE.Vector2(sceneCfg.chromaticAberration * intensity, sceneCfg.chromaticAberration * intensity * 0.5), [intensity]);

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, mobile ? perfCfg.maxDprMobile : perfCfg.maxDprDesktop]}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false, stencil: false }}
        camera={{ position: CAMERAS[variant].pos, fov: CAMERAS[variant].fov, near: 0.1, far: 400 }}
      >
        <CameraRig variant={variant} reduced={false} />
        <StationWorld lightCount={mobile ? sceneCfg.cityLights.mobile : sceneCfg.cityLights.desktop} intensity={intensity} />
        <EnergizedText container={container} source={source} intensity={intensity} onReady={onReady} />
        <EffectComposer multisampling={mobile ? 0 : 4}>
          <Bloom
            mipmapBlur
            intensity={sceneCfg.bloom.intensity * intensity}
            luminanceThreshold={sceneCfg.bloom.threshold}
            luminanceSmoothing={sceneCfg.bloom.smoothing}
            radius={sceneCfg.bloom.radius}
          />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={ca} radialModulation={false} modulationOffset={0} />
          <Vignette offset={sceneCfg.vignette.offset} darkness={sceneCfg.vignette.darkness} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
