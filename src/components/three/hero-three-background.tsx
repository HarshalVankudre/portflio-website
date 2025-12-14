"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

import { cn } from "@/lib/utils";

type SceneState = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  points: THREE.Points;
  resizeObserver: ResizeObserver;
  intersectionObserver: IntersectionObserver;
  onPointerMove: (e: PointerEvent) => void;
  rafId: number | null;
  disposed: boolean;
};

function createParticlePositions(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 3 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    const idx = i * 3;
    positions[idx] = x;
    positions[idx + 1] = y;
    positions[idx + 2] = z;
  }
  return positions;
}

function getThemePalette(theme: "light" | "dark") {
  if (theme === "dark") {
    return {
      points: 0xa855f7,
    };
  }

  return {
    points: 0x0ea5e9,
  };
}

export function HeroThreeBackground({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const sceneRef = React.useRef<SceneState | null>(null);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!mounted) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    if (sceneRef.current) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const particleCount = 950;
    const particles = new THREE.BufferGeometry();
    particles.setAttribute(
      "position",
      new THREE.BufferAttribute(createParticlePositions(particleCount), 3),
    );
    const points = new THREE.Points(
      particles,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.018,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(points);

    let pointerX = 0;
    let pointerY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      pointerX = (x - 0.5) * 2;
      pointerY = (y - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(container);
    {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    let isVisible = true;
    let rafId: number | null = null;
    const clock = new THREE.Clock();

    const render = () => {
      if (sceneRef.current?.disposed) return;
      if (!isVisible) {
        rafId = null;
        return;
      }

      const t = clock.getElapsedTime();
      const rotX = t * 0.12 + pointerY * 0.1;
      const rotY = t * 0.18 + pointerX * 0.14;
      points.rotation.set(-t * 0.02, -t * 0.04, 0);

      camera.position.x = pointerX * 0.22;
      camera.position.y = -pointerY * 0.18;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(render);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible && rafId === null && !reduceMotion) {
          clock.start();
          rafId = window.requestAnimationFrame(render);
        }
        if (!isVisible && rafId !== null) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0.12 },
    );
    intersectionObserver.observe(container);

    if (!reduceMotion) {
      rafId = window.requestAnimationFrame(render);
    } else {
      renderer.render(scene, camera);
    }

    sceneRef.current = {
      renderer,
      scene,
      camera,
      points,
      resizeObserver,
      intersectionObserver,
      onPointerMove,
      rafId,
      disposed: false,
    };

    return () => {
      const state = sceneRef.current;
      if (!state) return;
      state.disposed = true;

      state.resizeObserver.disconnect();
      state.intersectionObserver.disconnect();
      window.removeEventListener("pointermove", state.onPointerMove);
      if (state.rafId !== null) window.cancelAnimationFrame(state.rafId);

      state.scene.remove(state.points);
      (state.points.geometry as THREE.BufferGeometry).dispose();
      (state.points.material as THREE.Material).dispose();
      state.renderer.dispose();

      sceneRef.current = null;
    };
  }, [mounted]);

  React.useEffect(() => {
    if (!mounted) return;
    const theme = resolvedTheme === "dark" ? "dark" : "light";
    const palette = getThemePalette(theme);

    const state = sceneRef.current;
    if (!state) return;

    const pointsMat = state.points.material as THREE.PointsMaterial;
    pointsMat.color.set(palette.points);
    pointsMat.setValues({ opacity: theme === "dark" ? 0.55 : 0.42 });
  }, [mounted, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
      <canvas ref={canvasRef} className="h-full w-full opacity-90" />
    </div>
  );
}
