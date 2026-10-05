"use client";
/* eslint-disable react-hooks/immutability -- three.js objects (part transforms,
   materials, the camera) are imperative and mutated per frame by design; that's
   the standard React Three Fiber pattern, which the React Compiler's
   immutability model doesn't account for. */

import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { prefersReducedMotion } from "@/animations/gsap";
import type { RocketModel } from "@/types";

const DRACO_DECODER_PATH = "/vendor/draco/";
// At full explode each part moves this fraction of its axial distance from
// the assembly's centre, and this multiple of its radial distance (spreads the fins).
const AXIAL_SPREAD = 0.55;
const RADIAL_SPREAD = 2.5;
// Low enough that ghosted neighbours behind the showcase's text don't fight it.
const DIM_OPACITY = 0.07;
// Soft white self-illumination on the emphasised subsystem, so dark parts
// (carbon nose cone, fins) read as highlighted too, not just un-dimmed.
const ACTIVE_GLOW = 0.3;
const SPIN_SPEED = 0.25;
// Exponential ease rate for camera moves (higher = snappier).
const CAMERA_EASE = 2.5;

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
  for (const [group, needles] of Object.entries(partGroups)) {
    if (matchesAny(name, needles)) return group;
  }
  return null;
}

const matchesAny = (name: string, needles: string[]) =>
  needles.some((needle) => normalizeName(name).includes(normalizeName(needle)));

// Scenes already wrapped. useGLTF caches one scene per URL and every viewer clones
// it, so the decal is applied to that shared original exactly once.
const decalled = new WeakSet<THREE.Object3D>();

/**
 * Wraps the flat livery artwork around the outer-skin parts with a cylindrical
 * projection about the long (+Y) axis: across the artwork = once around the
 * body, down the artwork = nose tip to the bottom of the last skin part. Each
 * part gets its own crop of the artwork as a texture, so no single texture
 * exceeds GPU size limits however tall the artwork is.
 */
function applyDecal(scene: THREE.Object3D, decal: NonNullable<RocketModel["decal"]>, image: HTMLImageElement) {
  if (decalled.has(scene)) return;
  decalled.add(scene);
  scene.updateMatrixWorld(true);

  const meshes: THREE.Mesh[] = [];
  scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    for (let node: THREE.Object3D | null = mesh; node; node = node.parent) {
      if (matchesAny(node.name, decal.parts)) {
        meshes.push(mesh);
        return;
      }
    }
  });
  if (meshes.length === 0) return;

  const skin = new THREE.Box3();
  meshes.forEach((m) => skin.expandByObject(m));
  const axis = skin.getCenter(new THREE.Vector3());
  const length = skin.max.y - skin.min.y;
  const p = new THREE.Vector3();

  for (const mesh of meshes) {
    // Non-indexed so triangles straddling the seam can take their own wrapped coordinates.
    const geometry = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
    const position = geometry.getAttribute("position");
    const u = new Float32Array(position.count);
    const v = new Float32Array(position.count);
    for (let i = 0; i < position.count; i++) {
      p.fromBufferAttribute(position, i).applyMatrix4(mesh.matrixWorld);
      // Seen from outside, the artwork runs left → right with increasing angle (not mirrored).
      u[i] = Math.atan2(p.x - axis.x, p.z - axis.z) / (2 * Math.PI) + 0.5;
      v[i] = (skin.max.y - p.y) / length;
    }
    // A triangle crossing the seam would otherwise smear the whole artwork across itself.
    for (let i = 0; i < position.count; i += 3) {
      const hi = Math.max(u[i], u[i + 1], u[i + 2]);
      for (let k = i; k < i + 3; k++) if (hi - u[k] > 0.5) u[k] += 1;
    }

    let top = 1;
    let bottom = 0;
    for (let i = 0; i < v.length; i++) {
      top = Math.min(top, v[i]);
      bottom = Math.max(bottom, v[i]);
    }
    const uv = new Float32Array(position.count * 2);
    for (let i = 0; i < position.count; i++) {
      uv[i * 2] = u[i];
      // Textures are flipped on upload, so 1 is the crop's top edge.
      uv[i * 2 + 1] = 1 - (v[i] - top) / Math.max(bottom - top, 1e-6);
    }
    geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    mesh.geometry.dispose();
    mesh.geometry = geometry;

    const canvas = document.createElement("canvas");
    const sy = top * image.naturalHeight;
    canvas.width = image.naturalWidth;
    canvas.height = Math.max(1, Math.round((bottom - top) * image.naturalHeight));
    canvas.getContext("2d")?.drawImage(image, 0, sy, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.wrapS = THREE.RepeatWrapping;
    map.anisotropy = 8;
    // emissiveMap: the highlight glow brightens the artwork instead of washing it out to grey.
    mesh.material = new THREE.MeshStandardMaterial({ map, emissiveMap: map, roughness: 0.45, metalness: 0 });
  }
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
  const assembled: Framing = { min: 0, max: 0, radial: 0 };
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
      const restRadial = Math.max(
        Math.abs(min.x - center.x),
        Math.abs(max.x - center.x),
        Math.abs(min.z - center.z),
        Math.abs(max.z - center.z)
      );
      assembled.min = Math.min(assembled.min, min.y - center.y);
      assembled.max = Math.max(assembled.max, max.y - center.y);
      assembled.radial = Math.max(assembled.radial, restRadial);

      const lo = min.y - center.y + worldOffset.y;
      const hi = max.y - center.y + worldOffset.y;
      const radial = restRadial + Math.hypot(worldOffset.x, worldOffset.z);
      for (const framing of group ? [whole, (groups[group] ??= { min: Infinity, max: -Infinity, radial: 0 })] : [whole]) {
        framing.min = Math.min(framing.min, lo);
        framing.max = Math.max(framing.max, hi);
        framing.radial = Math.max(framing.radial, radial);
      }
    }

    return { object, base: object.position.clone(), offset: to.sub(from), group, materials };
  });

  // Keep the whole-rocket framings centred on the origin, which OrbitControls orbits around.
  for (const framing of [assembled, whole]) {
    const reach = Math.max(-framing.min, framing.max);
    framing.min = -reach;
    framing.max = reach;
  }

  return { root, parts, center, assembled, whole, groups };
}

interface RocketPartsProps {
  model: RocketModel;
  orientation: Orientation;
  activeSubsystemId: string | null;
  explode: ExplodeSource;
  /** Frame the camera on the active subsystem instead of the whole rocket. */
  focus: boolean;
  shift: Shift;
  interacting: RefObject<boolean>;
  onReady?: () => void;
  decalImage?: HTMLImageElement;
}

/** Loads the livery artwork alongside the model, so the rocket never appears unpainted. */
function DecalledRocketParts({ decalSrc, ...props }: RocketPartsProps & { decalSrc: string }) {
  const decalImage = useLoader(THREE.ImageLoader, decalSrc);
  return <RocketParts {...props} decalImage={decalImage} />;
}

function RocketParts({
  model,
  orientation,
  activeSubsystemId,
  explode,
  focus,
  shift,
  interacting,
  onReady,
  decalImage,
}: RocketPartsProps) {
  const { scene } = useGLTF(model.src, DRACO_DECODER_PATH);
  const { root, parts, center, assembled, whole, groups } = useMemo(() => {
    if (model.decal && decalImage) applyDecal(scene, model.decal, decalImage);
    return prepare(scene, model.partGroups);
  }, [scene, model.partGroups, model.decal, decalImage]);
  const spinRef = useRef<THREE.Group>(null);
  const explodeCurrent = useRef(typeof explode === "number" ? explode : 0);
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);
  const activeHasParts = activeSubsystemId !== null && parts.some((p) => p.group === activeSubsystemId);
  const focused = (focus && activeSubsystemId && groups[activeSubsystemId]) || null;
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const shot = useRef<Shot | null>(null);
  const framing = useRef<Framing>({ ...assembled });

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

    // Whole-rocket framing follows the explode (tight when assembled, wide when
    // exploded); a focused subsystem uses its own exploded extents.
    const f = framing.current;
    if (focused) Object.assign(f, focused);
    else {
      const t = explodeCurrent.current;
      f.min = THREE.MathUtils.lerp(assembled.min, whole.min, t);
      f.max = THREE.MathUtils.lerp(assembled.max, whole.max, t);
      f.radial = THREE.MathUtils.lerp(assembled.radial, whole.radial, t);
    }
    const goal = frameShot(camera, size.width / Math.max(size.height, 1), f, orientation, focused ? 1.6 : 1.1, shift);
    shot.current = aimCamera(camera, shot.current, goal, reducedMotion ? Infinity : CAMERA_EASE, delta);
  });

  return (
    <group rotation={orientation === "horizontal" ? [0, 0, Math.PI / 2] : [0, 0, 0]}>
      <group ref={spinRef}>
        <primitive object={root} position={[-center.x, -center.y, -center.z]} />
      </group>
    </group>
  );
}

/** Where the camera looks, and how far back from that point it sits. */
interface Shot {
  look: THREE.Vector3;
  distance: number;
}

/**
 * Slides the framed subject off-centre, as a fraction of the half-viewport:
 * [0.4, 0] puts it right of centre (room for text on the left), [0, 0.3] above.
 */
export type Shift = readonly [number, number];

const NO_SHIFT: Shift = [0, 0];

/**
 * The shot that frames a region (the whole rocket, or one subsystem) so
 * nothing clips. Fits both along the rocket's axis and across it, within
 * whatever share of the frame the shift leaves; adding the radial reach to the
 * distance keeps flared parts in frame even when the spin swings them toward
 * the camera (perspective would otherwise push them past the edge).
 */
function frameShot(
  camera: THREE.PerspectiveCamera,
  aspect: number,
  { min, max, radial }: Framing,
  orientation: Orientation,
  alongMargin: number,
  [sx, sy]: Shift
): Shot {
  const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
  const kx = 1 - Math.abs(sx);
  const ky = 1 - Math.abs(sy);
  const mid = (min + max) / 2;
  const along = ((max - min) / 2) * alongMargin;
  const across = radial * 1.15;
  const vertical = orientation === "vertical";
  const fitAlong = vertical ? along / (tan * ky) : along / (tan * aspect * kx);
  const fitAcross = vertical ? across / (tan * aspect * kx) : across / (tan * ky);
  const distance = Math.max(fitAlong, fitAcross) + radial;
  // Horizontal mode rotates the model +90° about Z, so its +Y axis points to -X.
  const look = vertical ? new THREE.Vector3(0, mid, 0) : new THREE.Vector3(-mid, 0, 0);
  // Looking away from the subject is what moves it across the frame.
  look.x -= sx * distance * tan * aspect;
  look.y -= sy * distance * tan;
  return { look, distance };
}

/**
 * Eases the camera toward a shot (snaps on the first frame). It keeps its
 * current viewing direction rather than resetting to straight-on, so an
 * OrbitControls drag survives the framing changing underneath it.
 */
function aimCamera(
  camera: THREE.PerspectiveCamera,
  current: Shot | null,
  goal: Shot,
  ease: number,
  delta: number
): Shot {
  const direction = current
    ? camera.position.clone().sub(current.look).normalize()
    : new THREE.Vector3(0, 0, 1);
  const next = current ?? { look: goal.look.clone(), distance: goal.distance };
  if (current) {
    const t = ease === Infinity ? 1 : 1 - Math.exp(-ease * delta);
    next.look.lerp(goal.look, t);
    next.distance = THREE.MathUtils.lerp(next.distance, goal.distance, t);
  }
  camera.position.copy(next.look).addScaledVector(direction, next.distance);
  camera.lookAt(next.look);
  camera.near = next.distance / 100;
  camera.far = next.distance * 10;
  camera.updateProjectionMatrix();
  return next;
}

interface RocketSceneProps {
  model: RocketModel;
  orientation: Orientation;
  activeSubsystemId: string | null;
  explode: ExplodeSource;
  focus?: boolean;
  shift?: Shift;
  interactive?: boolean;
  onReady?: () => void;
}

/** Camera, lights and model. */
function RocketScene({
  model,
  orientation,
  activeSubsystemId,
  explode,
  focus = false,
  shift = NO_SHIFT,
  interactive = false,
  onReady,
}: RocketSceneProps) {
  const interacting = useRef(false);
  const partsProps = { model, orientation, activeSubsystemId, explode, focus, shift, interacting, onReady };

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
        {model.decal ? (
          <DecalledRocketParts decalSrc={model.decal.src} {...partsProps} />
        ) : (
          <RocketParts {...partsProps} />
        )}
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
  /** Frame the camera on the active subsystem instead of the whole rocket. */
  focus?: boolean;
  shift?: Shift;
  /** Pauses rendering while off-screen. */
  active: boolean;
  onReady?: () => void;
}

/** A standalone viewer with its own WebGL canvas. */
export function RocketModelCanvas({ active, ...scene }: RocketModelCanvasProps) {
  return (
    <Canvas dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} frameloop={active ? "always" : "never"} aria-hidden="true">
      <RocketScene {...scene} />
    </Canvas>
  );
}
