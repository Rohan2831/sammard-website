import type { ComponentType } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

export interface ContactInfo {
  email: string;
  phone: string;
  addressLines: string[];
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  alt: string;
  category:
    | "Launches"
    | "Testing"
    | "Assembly"
    | "Manufacturing"
    | "Recovery"
    | "Competitions"
    | "Team"
    | "Ground Station"
    | "Behind the Scenes";
  caption?: string;
}

export interface RocketSpecs {
  height?: string;
  diameter?: string;
  totalWeight?: string;
  dryWeight?: string;
  motor?: string;
  bodyMaterial?: string;
  averageThrust?: string;
  designedApogee?: string;
}

export interface RocketComponent {
  id: string;
  name: string;
  description: string;
}

export interface RocketRender {
  /** Transparent full-livery render, nose up. */
  vertical: string;
  /** Same render rotated so the livery text reads upright (nose points left). */
  horizontal: string;
}

export interface RocketModel {
  /** Draco-compressed .glb, decoded via the self-hosted decoder in public/vendor/draco/. */
  src: string;
  /**
   * Subsystem (RocketComponent id) → case-insensitive substrings of the model's
   * part names. First matching group wins; unmatched parts stay neutral.
   */
  partGroups: Record<string, string[]>;
  decal?: RocketDecal;
  /**
   * Real-material finishes, by case-insensitive substrings of part names (a part
   * also matches through any ancestor's name). Overrides the CAD's own material,
   * in the main model and its attachments alike.
   */
  finishes?: Partial<Record<RocketFinish, string[]>>;
  /** Separately exported sub-assemblies fitted into the main model (e.g. the motor). */
  attachments?: RocketModelAttachment[];
}

export interface RocketModelAttachment {
  /** Draco-compressed .glb, decoded like the main model. */
  src: string;
  /**
   * Case-insensitive substring of a part present in both files (e.g. a shared
   * nozzle sub-assembly). The attachment is positioned so its copy lands exactly
   * on the main model's, and that duplicate copy is dropped.
   */
  anchor: string;
  /** Subsystem (RocketComponent id) the whole attachment belongs to. */
  group: string;
  /**
   * "default" (the default): shown except while `group` is the active subsystem.
   * "focus": shown only then — e.g. a cutaway that replaces the full part when zoomed in.
   */
  show?: "default" | "focus";
}

export type RocketFinish = "aluminium" | "stainless-steel" | "carbon-fiber" | "propellant";

export interface RocketDecal {
  /** Flat livery artwork: width = one full turn around the body, top edge = nose tip. */
  src: string;
  /** Case-insensitive substrings of the outer-skin part names it's painted onto. */
  parts: string[];
  /**
   * Parts whose combined length the artwork's height spans, nose tip to tail —
   * when that's more than the painted parts (e.g. a bare metal nose tip the
   * artwork's top band was drawn for). Defaults to `parts`.
   */
  span?: string[];
}

export interface Rocket {
  id: string;
  name: string;
  status: "placeholder" | "concept" | "in-development" | "flown" | "retired";
  year?: number;
  tagline?: string;
  specs: RocketSpecs;
  components: RocketComponent[]; // nose cone, payload, avionics bay, recovery, airbrakes, motor, fins, airframe
  flightHistory: { date: string; event: string; outcome: string }[];
  videoUrls: string[];
  gallery: GalleryItem[];
  heroImage: string;
  render?: RocketRender;
  model?: RocketModel;
}

export interface CanSat {
  id: string;
  name: string;
  mission: string;
  payload: string;
  electronics: string;
  results: string;
  competition?: string;
  gallery: GalleryItem[];
}

export interface RndProject {
  id: string;
  category:
    | "Payloads"
    | "Motors"
    | "Antennas"
    | "Ground Station"
    | "Avionics"
    | "Airbrakes"
    | "Recovery Systems"
    | "Future Research";
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface Competition {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
}

export type SponsorTier = "platinum" | "gold" | "silver" | "bronze";

export interface Sponsor {
  id: string;
  name: string;
  logoSrc: string;
  logoAlt: string;
  website?: string;
  description?: string;
  tier?: SponsorTier;
}

export interface SponsorshipPackage {
  tier: SponsorTier;
  title: string;
  benefits: string[];
}

export interface Department {
  id: string;
  slug: string;
  name: string;
  coverImage: string;
  overview: string;
  responsibilities: string[];
  skills: string[];
  technologies: string[];
  majorProjects: string[];
}

export interface BoardMember {
  id: string;
  name: string;
  position: string;
  department: string;
  photo: string;
  linkedinUrl?: string;
}

export interface BoardYear {
  year: string; // e.g. "2026–2027"
  members: BoardMember[];
}

export interface EventRecord {
  id: string;
  slug: string;
  name: string;
  year: number | "TBD";
  location: string;
  team: string;
  rocketId?: string;
  /** "upcoming" hasn't happened yet — sorts before every "completed" event regardless of its (sometimes unreliable) date. */
  status: "upcoming" | "completed";
  gallery: GalleryItem[];
  videoUrls: string[];
  reportUrls: string[];
  summary: string;
}

export interface TimelineMilestone {
  id: string;
  year: number | "TBD";
  title: string;
  description: string;
  imageSrc?: string;
  category: "formation" | "first-rocket" | "competition" | "award" | "international";
}

export interface DocumentResource {
  id: string;
  title: string;
  category:
    | "Technical Report"
    | "Design Report"
    | "Flight Report"
    | "Post-Flight Report"
    | "Research Paper"
    | "Publication"
    | "Patent";
  year?: number;
  fileUrl: string;
}
