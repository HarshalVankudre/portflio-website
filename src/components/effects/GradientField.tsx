"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { prefersReducedMotion } from "@/lib/motion";
import { GLOW_EVENT, type GlowEventDetail } from "@/lib/glow";

const VERTEX = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uScroll;
uniform float uBoost;
uniform vec2 uPointer;
uniform vec2 uResolution;
varying vec2 vUv;

// --- simplex noise (Ashima) ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  for (int i = 0; i < 3; i++) {
    v += a * snoise(p);
    p = p * 2.1 + 13.7;
    a *= 0.5;
  }
  return v;
}

// hash dithering — kills gradient banding on dark output
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = uTime * 0.04;

  // Domain-warped field, drifting slowly, dragged by scroll
  vec2 warp = vec2(
    fbm(p * 1.4 + t),
    fbm(p * 1.4 - t + 5.2)
  );
  vec2 q = p + warp * 0.35 + vec2(0.0, uScroll * 0.6);

  // Glow anchors wander a little and lean toward the pointer
  vec2 lean = (uPointer - 0.5) * 0.08;
  vec2 cViolet = vec2(0.22 * aspect, 0.74) + lean + warp * 0.10;
  vec2 cTeal   = vec2(0.84 * aspect, 0.30) - lean + warp * 0.12;
  vec2 cVolt   = vec2(0.58 * aspect, 0.92 - uScroll * 0.35) + lean * 1.5;

  float dViolet = length(q - cViolet);
  float dTeal   = length(q - cTeal);
  float dVolt   = length(q - cVolt);

  vec3 base   = vec3(0.0235, 0.0235, 0.0275);  // #060607
  vec3 violet = vec3(0.133, 0.078, 0.251);     // #221440
  vec3 teal   = vec3(0.043, 0.169, 0.169);     // #0B2B2B
  vec3 volt   = vec3(0.808, 1.0, 0.0);         // #CEFF00

  // Scroll shifts the mood: violet fades, teal takes over down-page
  float wViolet = smoothstep(0.85, 0.0, dViolet) * (1.0 - uScroll * 0.45);
  float wTeal   = smoothstep(0.95, 0.0, dTeal) * (0.65 + uScroll * 0.5);
  // uBoost (hero hover) widens and brightens the volt pool
  float wVolt   = smoothstep(0.42 + uBoost * 0.22, 0.0, dVolt) * (0.06 + uBoost * 0.10);

  vec3 col = base;
  col = mix(col, violet, wViolet);
  col = mix(col, teal, wTeal * 0.8);
  col += volt * wVolt;

  // Vignette
  float vig = smoothstep(1.25, 0.35, length(uv - 0.5) * 1.6);
  col *= mix(0.75, 1.0, vig);

  // Dither
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * Fixed full-viewport WebGL gradient field. Renders at reduced
 * resolution (it's a soft gradient — upscaling is invisible) and
 * pauses when the tab is hidden. Falls back to the CSS gradient
 * on reduced motion or when WebGL is unavailable.
 */
export default function GradientField() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        // extra 0.7x on coarse pointers — the soft gradient hides it
        dpr:
          Math.min(window.devicePixelRatio || 1, 1.5) *
          0.5 *
          (coarse ? 0.7 : 1),
        alpha: false,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return; // CSS fallback stays visible
    }

    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    wrap.appendChild(canvas);

    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uBoost: { value: 0 },
        uPointer: { value: [0.5, 0.5] },
        uResolution: { value: [1, 1] },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    let scroll = 0;
    let raf = 0;
    let running = true;
    let lost = false;
    let lostTimer = 0;
    let maxScroll = 1;
    let lastFrame = -1000; // negative so the first throttled frame renders
    let lastMeasure = 0;
    const reduced = prefersReducedMotion();

    const measure = () => {
      maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
    };

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      program.uniforms.uResolution.value = [
        window.innerWidth,
        window.innerHeight,
      ];
      measure();
      // loop is parked under reduced motion / hidden tab — repaint once
      if (!lost && (reduced || !running)) renderer.render({ scene: mesh });
    };
    resize();
    window.addEventListener("resize", resize);

    const pointerTarget = [0.5, 0.5];
    const pointer = [0.5, 0.5];
    const onPointer = (e: MouseEvent) => {
      pointerTarget[0] = e.clientX / window.innerWidth;
      pointerTarget[1] = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onPointer, { passive: true });

    // Glow swell requests (hero name hover). No-op while the loop is
    // parked (reduced motion / hidden tab) — the static frame stays correct.
    let boost = 0;
    let boostTarget = 0;
    const onGlow = (e: Event) => {
      const v = (e as CustomEvent<GlowEventDetail>).detail?.v ?? 0;
      boostTarget = Math.min(Math.max(v, 0), 1);
    };
    window.addEventListener(GLOW_EVENT, onGlow);

    const frame = (now: number) => {
      if (running && !reduced && !lost) raf = requestAnimationFrame(frame);
      if (coarse && now - lastFrame < 33) return; // ~30fps cap
      lastFrame = now;
      if (now - lastMeasure > 2000) {
        // pick up content-height changes without per-frame layout reads
        lastMeasure = now;
        measure();
      }

      scroll += (window.scrollY / maxScroll - scroll) * 0.06;
      pointer[0] += (pointerTarget[0] - pointer[0]) * 0.05;
      pointer[1] += (pointerTarget[1] - pointer[1]) * 0.05;
      boost += (boostTarget - boost) * 0.08;

      program.uniforms.uTime.value = now / 1000;
      program.uniforms.uScroll.value = scroll;
      program.uniforms.uPointer.value = pointer;
      program.uniforms.uBoost.value = boost;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(frame); // reduced motion: single static frame

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running && !reduced && !lost) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onContextLost = (e: Event) => {
      e.preventDefault(); // signals the browser we want a restore
      lost = true;
      cancelAnimationFrame(raf);
      // never restored → drop the canvas so .gradient-fallback shows
      lostTimer = window.setTimeout(() => {
        if (lost && canvas.parentNode === wrap) wrap.removeChild(canvas);
      }, 4000);
    };
    const onContextRestored = () => {
      window.clearTimeout(lostTimer);
      lost = false;
      resize(); // repaints once when the loop stays parked
      if (running && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(lostTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointer);
      window.removeEventListener(GLOW_EVENT, onGlow);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      if (canvas.parentNode === wrap) wrap.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="gradient-fallback fixed inset-0 z-0 pointer-events-none"
    />
  );
}
