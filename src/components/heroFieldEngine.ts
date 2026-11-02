/**
 * The landing hero's electric field. The real HTML headline is redrawn into a
 * WebGL texture and bent by a field radiating from the hero object: outward
 * ripples plus a fine shimmer, strongest at the object and fading with
 * distance. Wave crests briefly charge the letters navy. Plain WebGL, no
 * libraries. Pauses off screen. Loaded on demand by HeroField.
 */

const FIELD = {
  /** Peak displacement at the object, in CSS px. */
  amplitude: 4.5,
  /** Distance over which the field fades, as a fraction of hero height. */
  falloff: 0.3,
  /** Ripple spacing in px and outward speed. */
  wavelength: 170,
  speed: 2.6,
  /** Fine shimmer on top of the ripples. */
  shimmer: 0.9,
  /** How strongly crests tint the letters navy (0 to 1). */
  charge: 0.85,
  maxDpr: 1.5,
};

const VERT = `attribute vec2 p; varying vec2 vUv; void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform sampler2D uText;
uniform vec2 uRes;
uniform vec2 uEmit;
uniform float uTime;
uniform float uAmp;
uniform float uFall;
uniform float uWave;
uniform float uSpeed;
uniform float uShimmer;
uniform float uCharge;
uniform vec3 uInk;
uniform vec3 uNavy;
varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main(){
  vec2 px = vUv * uRes;
  vec2 rel = px - uEmit;
  float d = length(rel);
  vec2 dir = rel / (d + 0.001);
  float near = exp(-d / (uFall * uRes.y));

  float phase = d / uWave * 6.2831853 - uTime * uSpeed;
  float wave = sin(phase);
  float n1 = noise(vec2(px.x * 0.012, px.y * 0.03 - uTime * 1.8)) - 0.5;
  float n2 = noise(vec2(px.x * 0.025 + uTime * 0.9, px.y * 0.012)) - 0.5;

  vec2 off = dir * wave * uAmp * near
           + vec2(n1, n2) * uAmp * uShimmer * near
           + vec2(n1, n2) * 0.35;
  vec4 t = texture2D(uText, (px - off) / uRes);
  float a = t.a;

  float crest = smoothstep(0.55, 1.0, wave) * near;
  vec3 col = mix(uInk, uNavy, clamp(crest * uCharge * 1.6, 0.0, 1.0));
  gl_FragColor = vec4(col * a, a);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16) / 255) as [number, number, number];
}

function drawText(cvs: HTMLCanvasElement, box: DOMRect, source: HTMLElement, dpr: number) {
  cvs.width = Math.max(1, Math.round(box.width * dpr));
  cvs.height = Math.max(1, Math.round(box.height * dpr));
  const ctx = cvs.getContext('2d')!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, box.width, box.height);
  ctx.fillStyle = '#fff';
  ctx.textBaseline = 'alphabetic';
  const range = document.createRange();
  source.querySelectorAll<HTMLElement>('[data-line]').forEach((line) => {
    const cs = getComputedStyle(line);
    ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
    range.selectNodeContents(line);
    const tr = range.getBoundingClientRect();
    const lr = line.getBoundingClientRect();
    const m = ctx.measureText(line.textContent ?? '');
    const asc = m.fontBoundingBoxAscent ?? parseFloat(cs.fontSize) * 0.8;
    const desc = m.fontBoundingBoxDescent ?? parseFloat(cs.fontSize) * 0.2;
    const baseline = lr.top - box.top + (lr.height - (asc + desc)) / 2 + asc;
    ctx.fillText(line.textContent ?? '', tr.left - box.left, baseline);
  });
}

/** Starts the field on the canvas. Returns a cleanup function, or null if WebGL is unavailable. */
export function startField(canvas: HTMLCanvasElement, source: HTMLElement, emitter: HTMLElement): (() => void) | null {
  const host = canvas.parentElement!;
  let raf = 0;
  let visible = true;
  let cleanupGl = () => {};
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) return null;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const u = (n: string) => gl.getUniformLocation(prog, n);
  const css = getComputedStyle(document.documentElement);
  gl.uniform3fv(u('uInk'), hexToRgb(css.getPropertyValue('--color-title').trim() || '#2b2b29'));
  gl.uniform3fv(u('uNavy'), hexToRgb(css.getPropertyValue('--color-navy').trim() || '#1b2a4a'));
  gl.uniform1f(u('uAmp'), FIELD.amplitude);
  gl.uniform1f(u('uFall'), FIELD.falloff);
  gl.uniform1f(u('uWave'), FIELD.wavelength);
  gl.uniform1f(u('uSpeed'), FIELD.speed);
  gl.uniform1f(u('uShimmer'), FIELD.shimmer);
  gl.uniform1f(u('uCharge'), FIELD.charge);
  const uRes = u('uRes');
  const uEmit = u('uEmit');
  const uTime = u('uTime');
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const textCanvas = document.createElement('canvas');
  const layout = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, FIELD.maxDpr);
    const box = host.getBoundingClientRect();
    canvas.width = Math.round(box.width * dpr);
    canvas.height = Math.round(box.height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    drawText(textCanvas, box, source, dpr);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    const e = emitter.getBoundingClientRect();
    gl.uniform2f(uRes, box.width, box.height);
    gl.uniform2f(uEmit, e.left + e.width / 2 - box.left, box.height - (e.top + e.height * 0.42 - box.top));
  };
  layout();

  const t0 = performance.now();
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    gl.uniform1f(uTime, (now - t0) / 1000);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  raf = requestAnimationFrame((now) => {
    frame(now);
    host.classList.add('field-ready');
  });

  const ro = new ResizeObserver(layout);
  ro.observe(host);
  const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
  io.observe(host);
  cleanupGl = () => {
    ro.disconnect();
    io.disconnect();
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
  return () => {
    cancelAnimationFrame(raf);
    cleanupGl();
    host.classList.remove('field-ready');
  };
}
