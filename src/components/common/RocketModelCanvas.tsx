"use client";
/* eslint-disable react-hooks/immutability -- three.js objects (part transforms,
   materials, the camera) are imperative and mutated per frame by design; that's
   the standard React Three Fiber pattern, which the React Compiler's
   immutability model doesn't account for. */

import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, PerspectiveCamera, View, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { prefersReducedMotion } from "@/animations/gsap";
import type { RocketModel } from "@/types";

const DRACO_DECODER_PATH = "/assets/draco/";
// At full explode each part moves this fraction of its axial distance from
// the assembly's centre, and this multiple of its radial distance (spreads the fins).
const AXIAL_SPREAD = 0.55;
const RADIAL_SPREAD = 2.5;
const DIM_OPACITY = 0.12;
// Soft white self-illumination on the emphasised subsystem, so dark parts
// (carbon nose cone, fins) read as highlighted too, not just un-dimmed.
const ACTIVE_GLOW = 0.3;
const SPIN_SPEED = 0.25;

export type ExplodeSource = number | RefObject<number>;
type Orientation = "vertical" | "horizontal";

interface PartMaterial {
  material: THREE.Material;
  baseOpacity: number;
  baseTransparent: boolean;
  /** Present only for standard materials with no emissive of their own. */
  glowable: THREE.MeshStandardMaterial | null;
}

interface Part {
  object: THREE.Object3D;
  base: THREE.Vector3;
  offset: THREE.Vector3;
  group: string | null;
  materials: PartMaterial[];
}

/** Region to frame, relative to the assembly centre at full explode: axial range plus radial reach. */
interface Framing {
  min: number;
  max: number;
  radial: number;
}

// GLTFLoader sanitises node names (spaces become underscores: "5 deg bevel" → "5_deg_bevel"),
// so compare both sides with underscores and whitespace collapsed to single spaces.
const normalizeName = (s: string) => s.toLowerCase().replace(/[_\s]+/g, " ").trim();

function matchGroup(name: string, partGroups: RocketModel["partGroups"]): string | null {
  const normalized = normalizeName(name);
  for (const [group, needles] of Object.entries(partGroups)) {
    if (needles.some((needle) => normalized.includes(normalizeName(needle)))) return group;
  }
  return null;
}

/** First group matched by the part or any of its descendants (e.g. "Nozzle Assembly" → its children). */
function findGroup(object: THREE.Object3D, partGroups: RocketModel["partGroups"]): string | null {
  const queue: THREE.Object3D[] = [object];
  for (let node = queue.shift(); node; node = queue.shift()) {
    const group = matchGroup(node.name, partGroups);
    if (group) return group;
    queue.push(...node.children);
  }
  return null;
}

/**
 * Clones the cached glTF scene so per-instance material changes don't leak
 * between viewers, strips the exporter's own lights/cameras, and records each
 * part's resting position plus its exploded-view displacement, and the
 * exploded extents of the whole assembly and of each subsystem group.
 * Assumes the model's long axis is +Y (nose up), SolidWorks' default export.
 */
function prepare(scene: THREE.Object3D, partGroups: RocketModel["partGroups"]) {
  const root = scene.clone(true);
  const strip: THREE.Object3D[] = [];
  root.traverse((o) => {
    if ((o as THREE.Light).isLight || (o as THREE.Camera).isCamera) strip.push(o);
  });
  strip.forEach((o) => o.removeFromParent());
  root.updateMatrixWorld(true);

  // CAD exporters put every part under one assembly node — the object with the most direct children.
  let assembly: THREE.Object3D = root;
  root.traverse((o) => {
    if (o.children.length > assembly.children.length) assembly = o;
  });

  const box = new THREE.Box3().setFromObject(root);
  const center = box.getCenter(new THREE.Vector3());
  const toAssemblyLocal = assembly.matrixWorld.clone().invert();
  const whole: Framing = { min: 0, max: 0, radial: 0 };
  const groups: Record<string, Framing> = {};

  const parts: Part[] = assembly.children.map((object) => {
    const partBox = new THREE.Box3().setFromObject(object);
    const partCenter = partBox.isEmpty() ? center.clone() : partBox.getCenter(new THREE.Vector3());
    const d = partCenter.clone().sub(center);
    const worldOffset = new THREE.Vector3(d.x * RADIAL_SPREAD, d.y * AXIAL_SPREAD, d.z * RADIAL_SPREAD);
    const from = partCenter.clone().applyMatrix4(toAssemblyLocal);
    const to = partCenter.clone().add(worldOffset).applyMatrix4(toAssemblyLocal);

    const group = findGroup(object, partGroups);
    const materials: PartMaterial[] = [];
    object.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const cloned = Array.isArray(mesh.material) ? mesh.material.map((m) => m.clone()) : mesh.material.clone();
      mesh.material = cloned;
      for (const material of Array.isArray(cloned) ? cloned : [cloned]) {
        const standard = material as THREE.MeshStandardMaterial;
        let glowable: THREE.MeshStandardMaterial | null = null;
        if (standard.isMeshStandardMaterial && standard.emissive.getHex() === 0) {
          standard.emissive.set(0xffffff);
          standard.emissiveIntensity = 0;
          glowable = standard;
        }
        materials.push({ material, baseOpacity: material.opacity, baseTransparent: material.transparent, glowable });
      }
    });

    if (!partBox.isEmpty()) {
      const { min, max } = partBox;
      const lo = min.y - center.y + worldOffset.y;
      const hi = max.y - center.y + worldOffset.y;
      const radial =
        Math.max(
          Math.abs(min.x - center.x),
          Math.abs(max.x - center.x),
          Math.abs(min.z - center.z),
          Math.abs(max.z - center.z)
        ) + Math.hypot(worldOffset.x, worldOffset.z);
      for (const framing of group ? [whole, (groups[group] ??= { min: Infinity, max: -Infinity, radial: 0 })] : [whole]) {
        framing.min = Math.min(framing.min, lo);
        framing.max = Math.max(framing.max, hi);
        framing.radial = Math.max(framing.radial, radial);
      }
    }

    return { object, base: object.position.clone(), offset: to.sub(from), group, materials };
  });

  // Keep the whole-assembly framing centred on the origin, which OrbitControls orbits around.
  const reach = Math.max(-whole.min, whole.max);
  whole.min = -reach;
  whole.max = reach;

  return { root, parts, center, whole, groups };
}

interface RocketPartsProps {
  model: RocketModel;
  orientation: Orientation;
  activeSubsystemId: string | null;
  explode: ExplodeSource;
  /** Frame the camera on the active subsystem instead of the whole rocket. */
  focus: boolean;
  interacting: RefObject<boolean>;
  onReady?: () => void;
}

function RocketParts({ model, orientation, activeSubsystemId, explode, focus, interacting, onReady }: RocketPartsProps) {
  const { scene } = useGLTF(model.src, DRACO_DECODER_PATH);
  const { root, parts, center, whole, groups } = useMemo(
    () => prepare(scene, model.partGroups),
    [scene, model.partGroups]
  );
  const spinRef = useRef<THREE.Group>(null);
  const explodeCurrent = useRef(typeof explode === "number" ? explode : 0);
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);
  const activeHasParts = activeSubsystemId !== null && parts.some((p) => p.group === activeSubsystemId);
  const framing = (focus && activeSubsystemId && groups[activeSubsystemId]) || whole;

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useEffect(
    () => () => parts.forEach((p) => p.materials.forEach(({ material }) => material.dispose())),
    [parts]
  );

  useFrame((_, delta) => {
    const target = typeof explode === "number" ? explode : (explode.current ?? 0);
    explodeCurrent.current = reducedMotion ? target : THREE.MathUtils.damp(explodeCurrent.current, target, 5, delta);

    for (const part of parts) {
      part.object.position.copy(part.base).addScaledVector(part.offset, explodeCurrent.current);
      const isActive = activeHasParts && part.group === activeSubsystemId;
      const emphasis = !activeHasParts || isActive ? 1 : DIM_OPACITY;
      for (const entry of part.materials) {
        const goal = entry.baseOpacity * emphasis;
        const { material, glowable } = entry;
        material.opacity = reducedMotion ? goal : THREE.MathUtils.damp(material.opacity, goal, 8, delta);
        if (glowable) {
          const glow = isActive ? ACTIVE_GLOW : 0;
          glowable.emissiveIntensity = reducedMotion ? glow : THREE.MathUtils.damp(glowable.emissiveIntensity, glow, 8, delta);
        }
        const dimmed = entry.baseTransparent || material.opacity < 0.995;
        if (material.transparent !== dimmed) {
          material.transparent = dimmed;
          material.needsUpdate = true;
        }
        material.depthWrite = !dimmed || entry.baseTransparent;
      }
    }

    if (spinRef.current && !reducedMotion && !interacting.current) {
      spinRef.current.rotation.y += delta * SPIN_SPEED;
    }
  });

  return (
    <>
      <FitCamera
        min={framing.min}
        max={framing.max}
        radial={framing.radial}
        orientation={orientation}
        // Focused views leave room along the axis so ghosted neighbours show where the part sits.
        alongMargin={framing === whole ? 1.1 : 1.6}
      />
      <group rotation={orientation === "horizontal" ? [0, 0, Math.PI / 2] : [0, 0, 0]}>
        <group ref={spinRef}>
          <primitive object={root} position={[-center.x, -center.y, -center.z]} />
        </group>
      </group>
    </>
  );
}

/**
 * Frames an exploded region (the whole rocket, or one subsystem) so nothing
 * clips. Fits both along the rocket's axis and across it; adding the radial
 * reach to the distance keeps flared parts in frame even when the spin swings
 * them toward the camera (perspective would otherwise push them past the edge).
 */
function FitCamera({
  min,
  max,
  radial,
  orientation,
  alongMargin,
}: Framing & { orientation: Orientation; alongMargin: number }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const { width, height } = useThree((s) => s.size);

  useEffect(() => {
    const aspect = width > 0 && height > 0 ? width / height : 1;
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const mid = (min + max) / 2;
    const along = ((max - min) / 2) * alongMargin;
    const across = radial * 1.15;
    const vertical = orientation === "vertical";
    const fitAlong = vertical ? along / tan : along / (tan * aspect);
    const fitAcross = vertical ? across / (tan * aspect) : across / tan;
    const distance = Math.max(fitAlong, fitAcross) + radial;
    // Horizontal mode rotates the model +90° about Z, so its +Y axis points to -X.
    const target = vertical ? new THREE.Vector3(0, mid, 0) : new THREE.Vector3(-mid, 0, 0);
    camera.position.set(target.x, target.y, distance);
    camera.lookAt(target);
    camera.near = distance / 100;
    camera.far = distance * 10;
    camera.updateProjectionMatrix();
  }, [camera, min, max, radial, orientation, alongMargin, width, height]);

  return null;
}

interface RocketSceneProps {
  model: RocketModel;
  orientation: Orientation;
  activeSubsystemId: string | null;
  explode: ExplodeSource;
  focus?: boolean;
  interactive?: boolean;
  onReady?: () => void;
}

/** Camera, lights and model — shared by the standalone canvas and the multi-view layout. */
function RocketScene({
  model,
  orientation,
  activeSubsystemId,
  explode,
  focus = false,
  interactive = false,
  onReady,
}: RocketSceneProps) {
  const interacting = useRef(false);

  return (
    <>
      <PerspectiveCamera makeDefault fov={30} position={[0, 0, 10]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 6]} intensity={1.4} />
      <directionalLight position={[-6, -2, -4]} intensity={0.5} />
      {/* Studio reflections built from local light panels — no HDRI fetched from a CDN. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 0, 6]} scale={[12, 4, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-6, 2, 0]} rotation-y={Math.PI / 2} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[6, 2, 0]} rotation-y={-Math.PI / 2} scale={[12, 3, 1]} />
        <Lightformer form="ring" intensity={2} position={[0, 8, 0]} rotation-x={Math.PI / 2} scale={4} />
      </Environment>

      <Suspense fallback={null}>
        <RocketParts
          model={model}
          orientation={orientation}
          activeSubsystemId={activeSubsystemId}
          explode={explode}
          focus={focus}
          interacting={interacting}
          onReady={onReady}
        />
      </Suspense>

      {interactive && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          onStart={() => {
            interacting.current = true;
          }}
          onEnd={() => {
            interacting.current = false;
          }}
        />
      )}
    </>
  );
}

export interface RocketModelCanvasProps {
  model: RocketModel;
  orientation: Orientation;
  activeSubsystemId: string | null;
  explode: ExplodeSource;
  interactive: boolean;
  /** Pauses rendering while off-screen. */
  active: boolean;
  onReady?: () => void;
}

/** A single standalone viewer with its own WebGL canvas. */
export function RocketModelCanvas({ active, ...scene }: RocketModelCanvasProps) {
  return (
    <Canvas dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} frameloop={active ? "always" : "never"} aria-hidden="true">
      <RocketScene {...scene} />
    </Canvas>
  );
}

/**
 * One shared, viewport-sized WebGL canvas that draws every `RocketPartView`
 * on the page into its own DOM box (drei `View`, scissored). One context
 * instead of one per subsystem. Portalled to <body> so no transformed
 * ancestor can break its `position: fixed`; it never takes pointer events,
 * and sits under the fixed navbar.
 */
export function RocketViewsCanvas({ active }: { active: boolean }) {
  return createPortal(
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "never"}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}
    >
      <View.Port />
    </Canvas>,
    document.body
  );
}

/** The rocket fully exploded, framed on one subsystem (lit) with its neighbours ghosted for context. */
export function RocketPartView({
  model,
  subsystemId,
  className,
}: {
  model: RocketModel;
  subsystemId: string;
  className?: string;
}) {
  return (
    <View className={className}>
      <RocketScene model={model} orientation="vertical" activeSubsystemId={subsystemId} explode={1} focus />
    </View>
  );
}
