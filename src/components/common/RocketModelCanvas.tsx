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
import type { RocketFinish, RocketModel } from "@/types";

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
// While a cutaway is in focus the spin settles with its cut face toward the
// camera, turned this far (radians) so the section's depth still reads.
const CUTAWAY_TURN = 0.45;
// Exponential ease rate for camera moves (higher = snappier).
const CAMERA_EASE = 2.5;
// Moving between two subsystems, the camera first pulls back to the whole
// exploded rocket for this long (seconds), then zooms into the next one.
const ZOOM_OUT_TIME = 0.8;

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
  /** Attachment variant (see `RocketModelAttachment.show`); undefined for the main model's own parts. */
  show?: "default" | "focus";
  /** Spin angle that turns this part's cut face toward the camera (cutaway attachments only). */
  faceCameraAt?: number;
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

/** Meshes whose own name, or any ancestor's, contains one of the needles. */
function meshesMatching(scene: THREE.Object3D, needles: string[]): THREE.Mesh[] {
  const meshes: THREE.Mesh[] = [];
  scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    for (let node: THREE.Object3D | null = mesh; node; node = node.parent) {
      if (matchesAny(node.name, needles)) {
        meshes.push(mesh);
        return;
      }
    }
  });
  return meshes;
}

// Size (m) of one repeat of the carbon-fibre weave on a part's surface.
const WEAVE_REPEAT = 0.04;

/**
 * A 2x2 twill carbon-fibre weave, drawn once: each tow is a dark band with a
 * soft sheen across it, alternating direction in the staggered twill pattern.
 */
function carbonWeaveTexture() {
  const size = 256;
  const cells = 8;
  const cell = size / cells;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    for (let y = 0; y < cells; y++) {
      for (let x = 0; x < cells; x++) {
        const horizontal = (x + y) % 4 < 2;
        const g = horizontal
          ? ctx.createLinearGradient(0, y * cell, 0, (y + 1) * cell)
          : ctx.createLinearGradient(x * cell, 0, (x + 1) * cell, 0);
        g.addColorStop(0, "#0b0b0c");
        g.addColorStop(0.5, horizontal ? "#3a3b3e" : "#2a2b2e");
        g.addColorStop(1, "#0b0b0c");
        ctx.fillStyle = g;
        ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

function finishMaterial(finish: RocketFinish): THREE.Material {
  switch (finish) {
    case "aluminium":
      return new THREE.MeshStandardMaterial({ color: 0xc8cbd0, metalness: 1, roughness: 0.32 });
    case "stainless-steel":
      return new THREE.MeshStandardMaterial({ color: 0xa9a8a4, metalness: 1, roughness: 0.18 });
    case "propellant":
      // Cast KNSB (sugar-based) grains: a matte off-white tan.
      return new THREE.MeshStandardMaterial({ color: 0xc9b48e, metalness: 0, roughness: 0.85 });
    case "carbon-fiber": {
      const weave = carbonWeaveTexture();
      // emissiveMap: the highlight glow brightens the weave rather than greying it.
      return new THREE.MeshPhysicalMaterial({
        map: weave,
        emissiveMap: weave,
        metalness: 0.2,
        roughness: 0.45,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      });
    }
  }
}

/** Flat UVs in metres across a part's two largest dimensions, so a tiled texture keeps true scale. */
function planarUVs(geometry: THREE.BufferGeometry, metresPerRepeat: number) {
  const box = new THREE.Box3().setFromBufferAttribute(geometry.getAttribute("position") as THREE.BufferAttribute);
  const extent = box.getSize(new THREE.Vector3()).toArray();
  const [a, b] = [0, 1, 2].sort((i, j) => extent[j] - extent[i]);
  const position = geometry.getAttribute("position");
  const uv = new Float32Array(position.count * 2);
  for (let i = 0; i < position.count; i++) {
    uv[i * 2] = position.getComponent(i, a) / metresPerRepeat;
    uv[i * 2 + 1] = position.getComponent(i, b) / metresPerRepeat;
  }
  geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
}

// Scenes already given their finishes (applied once to the cached original, like the decal).
const finished = new WeakSet<THREE.Object3D>();

/** Swaps the CAD's materials for real finishes on the named parts. */
function applyFinishes(scene: THREE.Object3D, finishes: NonNullable<RocketModel["finishes"]>) {
  if (finished.has(scene)) return;
  finished.add(scene);
  for (const [finish, needles] of Object.entries(finishes) as [RocketFinish, string[]][]) {
    const material = finishMaterial(finish);
    for (const mesh of meshesMatching(scene, needles)) {
      if (finish === "carbon-fiber") planarUVs(mesh.geometry, WEAVE_REPEAT);
      mesh.material = material;
    }
  }
}

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

  const meshes = meshesMatching(scene, decal.parts);
  if (meshes.length === 0) return;

  const skin = new THREE.Box3();
  meshesMatching(scene, decal.span ?? decal.parts).forEach((m) => skin.expandByObject(m));
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

/** Clones a cached glTF scene without the exporter's own lights and cameras. */
function cloneWithoutExtras(scene: THREE.Object3D) {
  const root = scene.clone(true);
  const strip: THREE.Object3D[] = [];
  root.traverse((o) => {
    if ((o as THREE.Light).isLight || (o as THREE.Camera).isCamera) strip.push(o);
  });
  strip.forEach((o) => o.removeFromParent());
  root.updateMatrixWorld(true);
  return root;
}

function findNode(root: THREE.Object3D, needle: string): THREE.Object3D | null {
  let found: THREE.Object3D | null = null;
  root.traverse((o) => {
    if (!found && matchesAny(o.name, [needle])) found = o;
  });
  return found;
}

interface LoadedAttachment {
  spec: NonNullable<RocketModel["attachments"]>[number];
  scene: THREE.Object3D;
}

/**
 * Fits each attachment into the assembly as one rigid part: the transform that
 * carries its copy of the anchor part onto the main model's copy places all of
 * it, then that duplicate anchor is dropped.
 */
function fitAttachments(root: THREE.Object3D, assembly: THREE.Object3D, attachments: LoadedAttachment[]) {
  for (const { spec, scene } of attachments) {
    const attachment = cloneWithoutExtras(scene);
    const own = findNode(attachment, spec.anchor);
    const target = findNode(root, spec.anchor);
    if (!own || !target) continue;
    const toMain = target.matrixWorld.clone().multiply(own.matrixWorld.clone().invert());
    own.removeFromParent();

    const wrapper = new THREE.Group();
    wrapper.name = spec.src;
    wrapper.userData = { group: spec.group, show: spec.show ?? "default" };
    wrapper.add(attachment);
    assembly.matrixWorld.clone().invert().multiply(toMain).decompose(wrapper.position, wrapper.quaternion, wrapper.scale);
    assembly.add(wrapper);
  }
  root.updateMatrixWorld(true);
}

/**
 * Clones the cached glTF scene so per-instance material changes don't leak
 * between viewers, strips the exporter's own lights/cameras, fits in any
 * attachments, and records each part's resting position plus its exploded-view
 * displacement, and the exploded extents of the whole assembly and of each
 * subsystem group. Assumes the model's long axis is +Y (nose up), SolidWorks'
 * default export.
 */
function prepare(scene: THREE.Object3D, partGroups: RocketModel["partGroups"], attachments: LoadedAttachment[]) {
  const root = cloneWithoutExtras(scene);

  // CAD exporters put every part under one assembly node — the object with the most direct children.
  let assembly: THREE.Object3D = root;
  root.traverse((o) => {
    if (o.children.length > assembly.children.length) assembly = o;
  });
  fitAttachments(root, assembly, attachments);

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

    const group: string | null = object.userData.group ?? findGroup(object, partGroups);
    const materials: PartMaterial[] = [];
    object.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const cloned = Array.isArray(mesh.material) ? mesh.material.map((m) => m.clone()) : mesh.material.clone();
      mesh.material = cloned;
      for (const material of Array.isArray(cloned) ? cloned : [cloned]) {
        const standard = material as THREE.MeshStandardMaterial;
        let glowable: THREE.MeshStandardMaterial | null = null;
        // No glow on metals or cutaways: flat white light would wash out their reflections/section
        // shading, and everything else is ghosted anyway, so they still stand out.
        const glows = standard.metalness < 0.5 && object.userData.show !== "focus";
        if (standard.isMeshStandardMaterial && standard.emissive.getHex() === 0 && glows) {
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

    // A half-section's material sits on one side of the axis; its cut face looks the other way.
    // Spinning by π − (angle of that side) points the cut face at the camera (+Z).
    const faceCameraAt = object.userData.show === "focus" ? Math.PI - Math.atan2(d.x, d.z) + CUTAWAY_TURN : undefined;

    return { object, base: object.position.clone(), offset: to.sub(from), group, show: object.userData.show, faceCameraAt, materials };
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
  /**
   * True while the visitor has taken the camera (navigable mode). The automatic
   * shot and spin pause; moving on to another step (or a double-click) hands it back.
   */
  manual: RefObject<boolean>;
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
  manual,
  onReady,
  decalImage,
}: RocketPartsProps) {
  // One call for the model and its attachments (always a non-empty list, so the hook is unconditional).
  const gltfs = useGLTF([model.src, ...(model.attachments ?? []).map((a) => a.src)], DRACO_DECODER_PATH);
  const { root, parts, center, assembled, whole, groups } = useMemo(() => {
    const [main, ...rest] = gltfs;
    if (model.finishes) applyFinishes(main.scene, model.finishes);
    if (model.decal && decalImage) applyDecal(main.scene, model.decal, decalImage);
    const attachments = (model.attachments ?? []).map((spec, i) => ({ spec, scene: rest[i].scene }));
    if (model.finishes) attachments.forEach(({ scene }) => applyFinishes(scene, model.finishes!));
    return prepare(main.scene, model.partGroups, attachments);
  }, [gltfs, model.partGroups, model.attachments, model.finishes, model.decal, decalImage]);
  const spinRef = useRef<THREE.Group>(null);
  const explodeCurrent = useRef(typeof explode === "number" ? explode : 0);
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const shot = useRef<Shot | null>(null);
  const framing = useRef<Framing>({ ...assembled });
  // Explode amount when the visitor took the camera; scrolling well past it hands it back.
  const manualSince = useRef<number | null>(null);
  // The subsystem last seen, and until when (clock time) to stay pulled back after a change.
  const lastActive = useRef(activeSubsystemId);
  const zoomedOutUntil = useRef(0);

  // A new step always reframes automatically.
  useEffect(() => {
    manual.current = false;
  }, [activeSubsystemId, manual]);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useEffect(
    () => () => parts.forEach((p) => p.materials.forEach(({ material }) => material.dispose())),
    [parts]
  );

  useFrame((state, delta) => {
    const target = typeof explode === "number" ? explode : (explode.current ?? 0);
    explodeCurrent.current = reducedMotion ? target : THREE.MathUtils.damp(explodeCurrent.current, target, 5, delta);

    if (!manual.current) manualSince.current = null;
    else if (manualSince.current === null) manualSince.current = target;
    else if (Math.abs(target - manualSince.current) > 0.15) manual.current = false;

    // Subsystem → subsystem: pull back to the whole rocket first (everything un-ghosted),
    // then go in. Each further change restarts the pull-back, so fast scrolling stays wide.
    const now = state.clock.elapsedTime;
    if (lastActive.current !== activeSubsystemId) {
      if (lastActive.current !== null && activeSubsystemId !== null && !reducedMotion) {
        zoomedOutUntil.current = now + ZOOM_OUT_TIME;
      }
      lastActive.current = activeSubsystemId;
    }
    const current = now < zoomedOutUntil.current ? null : activeSubsystemId;
    const activeHasParts = current !== null && parts.some((p) => p.group === current);
    const focused = (focus && current && groups[current]) || null;

    for (const part of parts) {
      part.object.position.copy(part.base).addScaledVector(part.offset, explodeCurrent.current);
      const isActive = activeHasParts && part.group === current;
      // Attachment variants crossfade: a "focus" cutaway replaces the full part while its subsystem is active.
      const shown = !part.show || (part.show === "focus") === (part.group === current);
      const emphasis = (shown ? 1 : 0) * (!activeHasParts || isActive ? 1 : DIM_OPACITY);
      let visible = shown;
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
        if (material.opacity > 0.01) visible = true;
      }
      part.object.visible = visible;
    }

    const spin = spinRef.current;
    const cutaway = parts.find((p) => p.faceCameraAt !== undefined && p.group === current);
    if (spin && cutaway?.faceCameraAt !== undefined) {
      // Settle on the nearest equivalent angle rather than unwinding whole turns.
      const turns = Math.round((spin.rotation.y - cutaway.faceCameraAt) / (2 * Math.PI));
      const goal = cutaway.faceCameraAt + turns * 2 * Math.PI;
      spin.rotation.y = reducedMotion ? goal : THREE.MathUtils.damp(spin.rotation.y, goal, 3, delta);
    } else if (spin && !reducedMotion && !interacting.current && !manual.current) {
      spin.rotation.y += delta * SPIN_SPEED;
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
    const controls = state.controls as unknown as { target: THREE.Vector3 } | null;
    if (manual.current) {
      // The visitor's OrbitControls own the camera; resume from wherever they leave it.
      shot.current = controls ? { look: controls.target.clone(), distance: camera.position.distanceTo(controls.target) } : null;
      return;
    }
    const goal = frameShot(camera, size.width / Math.max(size.height, 1), f, orientation, focused ? 1.6 : 1.1, shift);
    // Navigable views also swing back to straight-on after a visitor's orbit.
    shot.current = aimCamera(camera, shot.current, goal, reducedMotion ? Infinity : CAMERA_EASE, delta, manualHome(manual));
    controls?.target.copy(shot.current.look);
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

const STRAIGHT_ON = new THREE.Vector3(0, 0, 1);

/** Navigable views ease back to straight-on; drag-to-rotate views keep the visitor's angle. */
const manualHome = (manual: RefObject<boolean>) => (manual === NOT_NAVIGABLE ? undefined : STRAIGHT_ON);

/**
 * Eases the camera toward a shot (snaps on the first frame). It keeps its
 * current viewing direction rather than resetting to straight-on, so an
 * OrbitControls drag survives the framing changing underneath it — unless a
 * `home` direction is given, which it also eases back to.
 */
function aimCamera(
  camera: THREE.PerspectiveCamera,
  current: Shot | null,
  goal: Shot,
  ease: number,
  delta: number,
  home?: THREE.Vector3
): Shot {
  const direction = current
    ? camera.position.clone().sub(current.look).normalize()
    : (home ?? STRAIGHT_ON).clone();
  const next = current ?? { look: goal.look.clone(), distance: goal.distance };
  if (current) {
    const t = ease === Infinity ? 1 : 1 - Math.exp(-ease * delta);
    next.look.lerp(goal.look, t);
    next.distance = THREE.MathUtils.lerp(next.distance, goal.distance, t);
    if (home) direction.lerp(home, t).normalize();
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
  /** Drag to rotate (the Projects card). */
  interactive?: boolean;
  /**
   * Full navigation without hijacking page scroll (the homepage showcase): drag
   * to rotate, right-drag/shift-drag to pan, Ctrl/⌘+wheel or pinch to zoom,
   * double-click to hand the camera back. Plain wheel and one-finger swipes still scroll.
   */
  navigable?: boolean;
  onReady?: () => void;
}

// Shared "never manual" flag for views that aren't navigable.
const NOT_NAVIGABLE: RefObject<boolean> = { current: false };

/**
 * Keeps navigation from taking over page scrolling: zoom only answers a
 * Ctrl/⌘-wheel (also what a trackpad pinch sends) or touch pinch, and a single
 * finger scrolls the page. Double-click returns the camera to the guided shot.
 */
function NavigationGuards({ manual }: { manual: RefObject<boolean> }) {
  const controls = useThree((s) => s.controls) as unknown as { enableZoom: boolean } | null;
  const target = useThree((s) => s.events.connected) as HTMLElement | null | undefined;
  const canvas = useThree((s) => s.gl.domElement);

  useEffect(() => {
    const element = target ?? canvas;
    const host = element.parentElement ?? element;
    if (!controls) return;
    // OrbitControls sets touch-action: none; allow vertical page panning with one finger.
    element.style.touchAction = "pan-y";
    const onWheel = (e: WheelEvent) => {
      const zoom = e.ctrlKey || e.metaKey;
      controls.enableZoom = zoom;
      if (zoom) manual.current = true;
    };
    const onPointerDown = () => {
      controls.enableZoom = true;
    };
    const onDoubleClick = () => {
      manual.current = false;
    };
    // Capture on the parent so the flag is set before OrbitControls sees the event.
    host.addEventListener("wheel", onWheel, { capture: true, passive: true });
    host.addEventListener("pointerdown", onPointerDown, { capture: true });
    element.addEventListener("dblclick", onDoubleClick);
    return () => {
      host.removeEventListener("wheel", onWheel, { capture: true });
      host.removeEventListener("pointerdown", onPointerDown, { capture: true });
      element.removeEventListener("dblclick", onDoubleClick);
    };
  }, [controls, target, canvas, manual]);

  return null;
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
  navigable = false,
  onReady,
}: RocketSceneProps) {
  const interacting = useRef(false);
  const navigation = useRef(false);
  const manual = navigable ? navigation : NOT_NAVIGABLE;
  const partsProps = { model, orientation, activeSubsystemId, explode, focus, shift, interacting, manual, onReady };

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

      {(interactive || navigable) && (
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={navigable}
          enableDamping
          // Navigable: one finger is left to the page (-1 = no action); two fingers pinch/pan.
          touches={navigable ? { ONE: -1 as THREE.TOUCH, TWO: THREE.TOUCH.DOLLY_PAN } : undefined}
          onStart={() => {
            interacting.current = true;
            if (navigable) navigation.current = true;
          }}
          onEnd={() => {
            interacting.current = false;
          }}
        />
      )}
      {navigable && <NavigationGuards manual={navigation} />}
    </>
  );
}

export interface RocketModelCanvasProps {
  model: RocketModel;
  orientation: Orientation;
  activeSubsystemId: string | null;
  explode: ExplodeSource;
  interactive: boolean;
  /** See `RocketSceneProps.navigable`. */
  navigable?: boolean;
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
