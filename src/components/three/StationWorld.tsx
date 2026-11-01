'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { colors, energizedType, scene as sceneCfg } from '@/config/effects';

/** World position of the Core cabinet: pulses arrive here and spread into the type. */
export const CORE_POSITION = new THREE.Vector3(0.55, 1.1, 0);

const CURRENT = new THREE.Color(colors.current);
const METAL = '#14181b';
const METAL_LIGHT = '#1c2226';

/* ---------- deterministic randomness ---------- */
function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ridge(x: number, seed: number, height: number) {
  return (
    height *
    (0.55 +
      0.25 * Math.sin(x * 0.045 + seed) +
      0.14 * Math.sin(x * 0.11 + seed * 2.3) +
      0.06 * Math.sin(x * 0.31 + seed * 5.1))
  );
}

/* ---------- Kampala's hills and lights ---------- */

const HILL_LAYERS = [
  { z: -34, height: 7, seed: 1.2, color: '#080b0e', width: 150 },
  { z: -56, height: 12, seed: 3.7, color: '#0a0e12', width: 220 },
  { z: -90, height: 19, seed: 6.1, color: '#0d1217', width: 340 },
];

function Hills({ lightCount }: { lightCount: number }) {
  const shapes = useMemo(
    () =>
      HILL_LAYERS.map((l) => {
        const s = new THREE.Shape();
        const half = l.width / 2;
        s.moveTo(-half, -2);
        for (let x = -half; x <= half; x += 1.5) s.lineTo(x, ridge(x, l.seed, l.height));
        s.lineTo(half, -2);
        s.closePath();
        return new THREE.ShapeGeometry(s);
      }),
    [],
  );

  const lights = useMemo(() => {
    const rand = mulberry(42);
    const pos: number[] = [];
    const col: number[] = [];
    const warm = new THREE.Color('#f3e2c2');
    const cool = new THREE.Color('#dfe6ea');
    for (let i = 0; i < lightCount; i++) {
      const layer = rand() < 0.4 ? 0 : rand() < 0.65 ? 1 : 2;
      const l = HILL_LAYERS[layer];
      const x = (rand() - 0.5) * l.width * 0.9;
      const top = ridge(x, l.seed, l.height);
      // Lights cluster on lower slopes and in the valleys, like a city at night.
      const y = Math.pow(rand(), 1.8) * top * 0.92;
      pos.push(x, y, l.z + 0.5);
      const c = rand() < 0.75 ? warm : cool;
      const b = 0.35 + rand() * 0.65;
      col.push(c.r * b, c.g * b, c.b * b);
    }
    // Valley floor between the station and the hills
    for (let i = 0; i < lightCount * 0.45; i++) {
      const z = -10 - rand() * 22;
      const x = (rand() - 0.5) * 90;
      pos.push(x, 0.05, z);
      const b = 0.25 + rand() * 0.6;
      col.push(warm.r * b, warm.g * b, warm.b * b);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    return g;
  }, [lightCount]);

  return (
    <group>
      {shapes.map((g, i) => (
        <mesh key={i} geometry={g} position={[0, 0, HILL_LAYERS[i].z]}>
          <meshBasicMaterial color={HILL_LAYERS[i].color} />
        </mesh>
      ))}
      <points geometry={lights}>
        <pointsMaterial size={0.16} vertexColors sizeAttenuation transparent opacity={0.9} toneMapped={false} depthWrite={false} />
      </points>
    </group>
  );
}

function Sky() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        depthWrite: false,
        uniforms: {},
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
        fragmentShader: `varying vec2 vUv;
          void main(){
            float h = vUv.y;
            vec3 top = vec3(0.0012, 0.0016, 0.0024);
            vec3 horizon = vec3(0.007, 0.0085, 0.011);
            vec3 c = mix(horizon, top, smoothstep(0.18, 0.75, h));
            gl_FragColor = vec4(c, 1.0);
          }`,
      }),
    [],
  );
  return (
    <mesh position={[0, 30, -120]} material={mat}>
      <planeGeometry args={[600, 140]} />
    </mesh>
  );
}

/* ---------- The Peak Station ---------- */

function Enclosure({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.58, 0]} castShadow>
        <boxGeometry args={[1.3, 1.08, 0.72]} />
        <meshStandardMaterial color={METAL} roughness={0.55} metalness={0.45} />
      </mesh>
      {/* door seams */}
      {[-0.32, 0.32].map((x) => (
        <mesh key={x} position={[x, 0.58, 0.362]}>
          <boxGeometry args={[0.012, 0.98, 0.004]} />
          <meshBasicMaterial color="#06080a" />
        </mesh>
      ))}
      {/* roof */}
      <mesh position={[0, 1.14, 0]}>
        <boxGeometry args={[1.36, 0.04, 0.78]} />
        <meshStandardMaterial color={METAL_LIGHT} roughness={0.5} metalness={0.5} />
      </mesh>
      {/* energized status strip */}
      <mesh position={[0, 1.04, 0.364]}>
        <boxGeometry args={[1.1, 0.014, 0.004]} />
        <meshBasicMaterial color={CURRENT.clone().multiplyScalar(2.2)} toneMapped={false} />
      </mesh>
    </group>
  );
}

function CoreCabinet() {
  const glow = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (!glow.current) return;
    const period = energizedType.pulsePeriod / sceneCfg.linePulseCount;
    const phase = (clock.elapsedTime / period) % 1;
    const flash = Math.exp(-phase * 9);
    glow.current.color.copy(CURRENT).multiplyScalar(1.6 + flash * 3.5);
  });
  return (
    <group position={[CORE_POSITION.x, 0, 0]}>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.72, 1.62, 0.92]} />
        <meshStandardMaterial color={METAL_LIGHT} roughness={0.45} metalness={0.55} />
      </mesh>
      {/* vents */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[0, 0.3 + i * 0.07, 0.462]}>
          <boxGeometry args={[0.5, 0.025, 0.004]} />
          <meshBasicMaterial color="#07090b" />
        </mesh>
      ))}
      {/* vertical current light */}
      <mesh position={[0.3, 0.95, 0.463]}>
        <boxGeometry args={[0.018, 1.2, 0.004]} />
        <meshBasicMaterial ref={glow} color={CURRENT} toneMapped={false} />
      </mesh>
      {/* status window */}
      <mesh position={[-0.12, 1.35, 0.463]}>
        <boxGeometry args={[0.28, 0.12, 0.004]} />
        <meshBasicMaterial color={CURRENT.clone().multiplyScalar(0.55)} toneMapped={false} />
      </mesh>
      <pointLight position={[0.2, 1.1, 0.9]} color={colors.current} intensity={1.6} distance={4} decay={2} />
    </group>
  );
}

function Transformer() {
  return (
    <group position={[6.35, 0, 0.1]}>
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[0.9, 1.2, 1.1]} />
        <meshStandardMaterial color={METAL} roughness={0.6} metalness={0.4} />
      </mesh>
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[0.47, 0.6, -0.42 + i * 0.14]}>
          <boxGeometry args={[0.08, 1.0, 0.02]} />
          <meshStandardMaterial color={METAL_LIGHT} roughness={0.6} metalness={0.4} />
        </mesh>
      ))}
      {[-0.25, 0, 0.25].map((z) => (
        <mesh key={z} position={[0, 1.38, z]}>
          <cylinderGeometry args={[0.04, 0.06, 0.32, 8]} />
          <meshStandardMaterial color="#2a3035" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Transmission line ---------- */

function towerGeometry(height: number) {
  const pts: number[] = [];
  const base = 1.5;
  const top = 0.42;
  const levels = 7;
  const corner = (y: number, sx: number, sz: number) => {
    const w = THREE.MathUtils.lerp(base, top, y / height) / 2;
    return [sx * w, y, sz * w];
  };
  const corners: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  for (let i = 0; i < levels; i++) {
    const y0 = (i / levels) * height;
    const y1 = ((i + 1) / levels) * height;
    for (let c = 0; c < 4; c++) {
      const [ax, az] = corners[c];
      const [bx, bz] = corners[(c + 1) % 4];
      pts.push(...corner(y0, ax, az), ...corner(y1, ax, az)); // leg
      pts.push(...corner(y0, ax, az), ...corner(y1, bx, bz)); // brace
      pts.push(...corner(y0, bx, bz), ...corner(y1, ax, az)); // brace
      pts.push(...corner(y1, ax, az), ...corner(y1, bx, bz)); // ring
    }
  }
  // crossarms
  const arm = (y: number, len: number) => {
    pts.push(-len, y, 0, len, y, 0);
    pts.push(-len, y, 0, -top / 2, y + 0.35, 0, len, y, 0, top / 2, y + 0.35, 0);
  };
  arm(height * 0.8, 1.5);
  arm(height * 0.93, 1.1);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  return g;
}

const TOWERS: { pos: [number, number, number]; rot: number; h: number }[] = [
  { pos: [-3.2, 0, -7], rot: 0.65, h: 6.4 },
  { pos: [-11, 0, -18], rot: 0.65, h: 6.8 },
  { pos: [-20, 0, -30], rot: 0.65, h: 7.2 },
  { pos: [-30, 0, -43], rot: 0.65, h: 7.4 },
];

const GANTRY = new THREE.Vector3(CORE_POSITION.x - 0.15, 2.5, 0);

function useConductors() {
  return useMemo(() => {
    const offsets = [-1.5, 0, 1.5];
    return offsets.map((off, k) => {
      const anchors: THREE.Vector3[] = [];
      for (let i = TOWERS.length - 1; i >= 0; i--) {
        const t = TOWERS[i];
        const y = t.h * 0.8 + (k === 1 ? t.h * 0.13 : 0);
        const lateral = k === 1 ? 0 : off * (k === 1 ? 0.7 : 1);
        anchors.push(
          new THREE.Vector3(t.pos[0] + Math.cos(t.rot) * lateral, y, t.pos[2] - Math.sin(t.rot) * lateral),
        );
      }
      anchors.push(GANTRY.clone().add(new THREE.Vector3(0, 0, (k - 1) * 0.35)));
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < anchors.length - 1; i++) {
        const a = anchors[i];
        const b = anchors[i + 1];
        const span = a.distanceTo(b);
        for (let s = 0; s < 24; s++) {
          const t = s / 24;
          const p = a.clone().lerp(b, t);
          p.y -= span * 0.045 * 4 * t * (1 - t);
          pts.push(p);
        }
      }
      pts.push(anchors[anchors.length - 1]);
      return new THREE.CatmullRomCurve3(pts);
    });
  }, []);
}

function Pulses({ curves, intensity }: { curves: THREE.CatmullRomCurve3[]; intensity: number }) {
  const TAIL = 28;
  const count = curves.length * sceneCfg.linePulseCount * TAIL;
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const period = energizedType.pulsePeriod / sceneCfg.linePulseSpeed;
    let idx = 0;
    curves.forEach((curve, c) => {
      for (let p = 0; p < sceneCfg.linePulseCount; p++) {
        const head = (clock.elapsedTime / period + p / sceneCfg.linePulseCount + c * 0.012) % 1;
        for (let t = 0; t < TAIL; t++) {
          const u = head - t * 0.0018;
          if (u < 0) {
            dummy.scale.setScalar(0);
          } else {
            curve.getPointAt(u, tmp);
            dummy.position.copy(tmp);
            dummy.scale.setScalar((1 - t / TAIL) * 0.032);
          }
          dummy.updateMatrix();
          mesh.setMatrixAt(idx++, dummy.matrix);
        }
      }
    });
    mesh.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={CURRENT.clone().multiplyScalar(3.2 * intensity)} toneMapped={false} />
    </instancedMesh>
  );
}

function TransmissionLine({ intensity }: { intensity: number }) {
  const curves = useConductors();
  const towers = useMemo(() => TOWERS.map((t) => towerGeometry(t.h)), []);
  const cablePoints = useMemo(() => curves.map((c) => c.getPoints(200)), [curves]);
  return (
    <group>
      {TOWERS.map((t, i) => (
        <lineSegments key={i} geometry={towers[i]} position={t.pos} rotation={[0, t.rot, 0]}>
          <lineBasicMaterial color="#39414a" transparent opacity={0.9} />
        </lineSegments>
      ))}
      {cablePoints.map((pts, i) => (
        <Line key={i} points={pts} color="#4a545d" lineWidth={1} transparent opacity={0.85} />
      ))}
      {/* gantry */}
      <mesh position={[GANTRY.x, GANTRY.y / 2, 0]}>
        <boxGeometry args={[0.06, GANTRY.y, 0.06]} />
        <meshStandardMaterial color="#2a3035" />
      </mesh>
      <mesh position={[GANTRY.x, GANTRY.y, 0]}>
        <boxGeometry args={[0.06, 0.06, 1.0]} />
        <meshStandardMaterial color="#2a3035" />
      </mesh>
      <Pulses curves={curves} intensity={intensity} />
    </group>
  );
}

export function StationWorld({ lightCount, intensity }: { lightCount: number; intensity: number }) {
  return (
    <group>
      <color attach="background" args={[colors.black]} />
      <fog attach="fog" args={['#07090c', 18, 130]} />
      <ambientLight intensity={0.22} color="#9fb3c2" />
      <directionalLight position={[-8, 12, 6]} intensity={0.45} color="#a9bccb" />
      <Sky />
      <Hills lightCount={lightCount} />

      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -20]}>
        <planeGeometry args={[400, 200]} />
        <meshStandardMaterial color="#060809" roughness={1} />
      </mesh>
      {/* pad */}
      <mesh position={[3.4, 0.03, 0]}>
        <boxGeometry args={[8.2, 0.06, 3.2]} />
        <meshStandardMaterial color="#111416" roughness={0.9} />
      </mesh>

      <CoreCabinet />
      {[1.6, 3.05, 4.5].map((x) => (
        <group key={x}>
          <Enclosure position={[x, 0.06, -0.5]} />
          <Enclosure position={[x, 0.06, 0.5]} />
        </group>
      ))}
      <Transformer />
      <TransmissionLine intensity={intensity} />
    </group>
  );
}
