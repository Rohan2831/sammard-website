// Core
export { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";
export { initLenis, getLenis } from "./lenis";
export type {
  AnimationCleanup,
  SectionAnimationRefs,
  EntranceOptions,
  ScrollOptions,
} from "./types";

// Primitives
export {
  fadeUp,
  fadeIn,
  staggerReveal,
  splitTextReveal,
  parallax,
  pinSection,
} from "./primitives";
export type {
  SplitTextRevealOptions,
  ParallaxOptions,
  PinSectionOptions,
} from "./primitives";

// Section animation functions
export { heroAnimation } from "./hero";
export type { HeroAnimationRefs } from "./hero";

export { navbarAnimation } from "./navbar";
export type { NavbarAnimationRefs } from "./navbar";

export { whoWeAreAnimation } from "./whoweare";
export type { WhoWeAreAnimationRefs } from "./whoweare";

export { teamInActionAnimation } from "./teaminaction";
export type { TeamInActionAnimationRefs } from "./teaminaction";

export { competitionsAnimation } from "./competitions";
export type { CompetitionsAnimationRefs } from "./competitions";

export { sponsorsAnimation } from "./sponsors";
export type { SponsorsAnimationRefs } from "./sponsors";

export { footerAnimation } from "./footer";
export type { FooterAnimationRefs } from "./footer";