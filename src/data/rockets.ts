import type { Rocket } from "@/types";

const SUBSYSTEM_TEMPLATE = (): Rocket["components"] => [
  { id: "nose-cone", name: "Nose Cone", description: "Description — TBD" },
  { id: "payload", name: "Payload", description: "Description — TBD" },
  { id: "avionics-bay", name: "Avionics Bay", description: "Description — TBD" },
  { id: "recovery", name: "Recovery", description: "Description — TBD" },
  { id: "airbrakes", name: "Airbrakes", description: "Description — TBD" },
  { id: "motor", name: "Motor", description: "Description — TBD" },
  { id: "fins", name: "Fins", description: "Description — TBD" },
  { id: "airframe", name: "Airframe", description: "Description — TBD" },
];

// Names, years, specs and descriptions confirmed against teamsammard.com
// (homepage rocket fleet + /projects page, live production site,
// cross-referenced 2026-09). Subsystem breakdowns per rocket aren't published
// there — left as labeled placeholders. See ASSETS_NEEDED.md for gaps.
//
// "Udbhava" (added 2026-09) isn't on the live site. Full specs + all 8
// subsystem descriptions sourced from the team-supplied "Team 316 Project
// Technical Report to the 2026 IREC" PDF (314 pages), cross-checked against
// a photo of the project's own booth poster at Bangalore Space Expo 2026.
// Airbrakes description was updated from the poster's "passive DRS" wording
// to the PTR's fuller active BHAGAT-C system. averageThrust is still TBD
// (only a peak/structural-test figure was found, not a published average).
//
// 2026-10: the team's sponsorship brochure (public/assets/documents/
// team-sammard-brochure.pdf) confirms Udbhava flew at IREC 2026 — launched
// and recovered, 3rd in Asia in the 10K SRAD category — and names its motor
// "Project Rudra". Status moved from in-development to flown accordingly.
// The brochure calls Udbhava's payload "MARK" (coefficient of friction in
// microgravity), which conflicts with the PTR's bioprinter payload — the
// PTR text is kept below until the team confirms; see ASSETS_NEEDED.md.
// The brochure also says Airavata ranked "28th globally in Design and Build
// Quality" vs the live site's "30th worldwide in design/build/documentation"
// — left as the live site states, also flagged there.
//
// `render`: transparent livery renders supplied by the team (2026-10). No
// render exists for Pinaka yet, so it keeps its photo stand-in.
// `model`: Udbhava's SolidWorks assembly export (embedded DDS normal maps
// stripped — browsers can't decode DDS; original kept in reference-material/
// Skeleton.GLB). partGroups map only parts whose names clearly identify a
// subsystem. "5 deg bevel" is the four fins themselves (four radial instances
// at the fin station, visibly the fin blades in the render). Ambiguous parts
// (BaseBleed, generic couplers) stay unhighlighted rather than guessed, and
// Payload/Airbrakes have no separately modelled parts.
//
// Array order is latest-first (Udbhava, the current flagship, leads; older
// rockets follow newest-to-oldest) rather than the live site's insertion
// order.
export const rockets: Rocket[] = [
  {
    id: "udbhava",
    name: "Udbhava",
    status: "flown",
    year: 2026,
    tagline: "Team Sammard's first rocket in IREC's 10K SRAD category, powered by Project Rudra — an N-class solid motor designed and built in-house. Launched and recovered at IREC 2026, placing 3rd in Asia. \"Udbhava\" is Sanskrit for Origin/Birth/Emergence.",
    specs: {
      height: "3.06m (with nose cone)",
      diameter: "15.3cm",
      totalWeight: "36.25kg",
      dryWeight: "~26.7kg (total minus 9.54kg propellant)",
      motor: "Project Rudra — in-house SRAD Class N solid motor (KNSB propellant)",
      bodyMaterial: "Filament-wound fiberglass",
      averageThrust: "TBD (peak ~3,700 N per structural test data)",
      designedApogee: "10,000 ft",
    },
    components: [
      {
        id: "nose-cone",
        name: "Nose Cone",
        description: "Von Kármán (LD-Haack) profile with a 5:1 fineness ratio, selected via CFD across 5 candidate geometries to minimize transonic wave drag (Mach 0.8–1.2). Built as a 5-layer 240 GSM fiberglass hand layup over a 10-part 3D-printed PLA mold, with a CNC-machined Aluminum 6061 tip bonded using J-B Weld epoxy.",
      },
      {
        id: "payload",
        name: "Payload",
        description: "A compact, autonomous 3D micro bioprinter that performs controlled extrusion-based printing during flight, studying bioink flow and print fidelity under transient acceleration and reduced-gravity conditions for future aerospace and biomanufacturing applications.",
      },
      {
        id: "avionics-bay",
        name: "Avionics Bay",
        description: "A modular bay pairing COTS hardware (RRC3+, Blue Raven, Featherweight GPS on a 5-cell 21700 battery pack) with two custom SRAD flight computers — Arceus and the STM32-based Sirius — and a dedicated Power Distribution Board on a 10-cell 21700 Li-ion pack, for redundant recovery actuation, telemetry, and data acquisition.",
      },
      {
        id: "recovery",
        name: "Recovery",
        description: "Dual-deployment using 5/8-inch Kevlar shock cords (4,500 lb test strength) and two redundant 5g black-powder charge wells per separation event; both parachutes are packed in two-layer stitched fiberglass bags for ember protection.",
      },
      {
        id: "airbrakes",
        name: "Airbrakes",
        description: "A custom SRAD servo-driven 4-leaf airbrake, controlled by BHAGAT-C, an ESP32-based PCB. A cam plate with four symmetric spiral slots deploys the four flush-mounted leaves radially for active drag control, validated by CFD from Mach 0.875 down to Mach 0.3 across the coasting phase.",
      },
      {
        id: "motor",
        name: "Motor",
        description: "Project Rudra — an in-house Class N SRAD solid motor with a 6-grain BATES-configuration KNSB (potassium nitrate–sorbitol, 65:35 oxidizer-to-fuel) propellant charge, the team's first flight motor in the SRAD category. Validated through 3 static-fire tests plus a hydrostatic proof test of the motor casing.",
      },
      {
        id: "fins",
        name: "Fins",
        description: "Four fins in a hybrid forged-carbon-fiber/fiberglass composite, compression-molded and mounted via a CNC-machined 6061-T6 aluminium fin-can for precise, repeatable alignment.",
      },
      {
        id: "airframe",
        name: "Airframe",
        description: "Two filament-wound fiberglass body tubes forming the primary load-bearing structure, compression-tested to 21,539 N (≈5.8× the expected motor thrust) before buckling failure.",
      },
    ],
    flightHistory: [
      { date: "2026", event: "IREC 2026", outcome: "Launched and recovered successfully — 3rd in Asia, 10K SRAD category" },
    ],
    videoUrls: [],
    gallery: [
      {
        id: "udbhava-1",
        type: "image",
        src: "/assets/images/rockets/udbhava-poster.jpg",
        alt: "Udbhava rocket and technical poster at Bangalore Space Expo 2026",
        category: "Competitions",
      },
    ],
    heroImage: "/assets/images/rockets/udbhava-poster.jpg",
    render: {
      vertical: "/assets/images/rockets/renders/udbhava.webp",
      horizontal: "/assets/images/rockets/renders/udbhava-horizontal.webp",
    },
    model: {
      src: "/assets/models/udbhava.glb",
      partGroups: {
        "nose-cone": ["nose tip", "nose cone", "nosecone"],
        "avionics-bay": ["avionics bay"],
        recovery: ["recovery"],
        motor: ["nozzle", "graphite insert", "retaining ring", "lower retainer"],
        fins: ["fincan", "5 deg bevel"],
        airframe: ["lowerbodytube"],
      },
    },
  },
  {
    id: "airavata",
    name: "Airavata",
    status: "flown",
    year: 2025,
    tagline: "IREC 2025 rocket — structural health monitoring payload, SPARC-III avionics.",
    specs: {
      // NOTE: source conflict — homepage's structured spec table lists
      // 2.5m length; the /projects page description says "standing 2.8 m
      // tall". Used the structured-table value; flagged in ASSETS_NEEDED.md.
      height: "2.5m",
      diameter: "15cm",
      totalWeight: "25kg",
      dryWeight: "18kg",
      motor: "Aerotech M1845-NT",
      bodyMaterial: "Fiber Glass",
      averageThrust: "1875 N",
      designedApogee: "10,000 ft",
    },
    components: SUBSYSTEM_TEMPLATE(),
    flightHistory: [
      { date: "2025-06", event: "IREC 2025", outcome: "1st in India (10K COTS category), Early Bird Award, 30th worldwide in design/build/documentation" },
    ],
    videoUrls: [],
    gallery: [],
    heroImage: "/assets/images/teampic1.JPG",
    render: {
      vertical: "/assets/images/rockets/renders/airavata.webp",
      horizontal: "/assets/images/rockets/renders/airavata-horizontal.webp",
    },
  },
  {
    id: "agneya",
    name: "Agneya",
    status: "flown",
    year: 2024,
    tagline: "Built for IREC 2024 — SPARC-II avionics, vibration-analysis payload.",
    specs: {
      height: "2.2m",
      diameter: "TBD",
      totalWeight: "TBD",
      dryWeight: "TBD",
      motor: "Aerotech M1845NT",
      bodyMaterial: "TBD",
      averageThrust: "TBD",
      designedApogee: "10,000 ft",
    },
    components: SUBSYSTEM_TEMPLATE(),
    flightHistory: [{ date: "2024", event: "IREC 2024", outcome: "Flown" }],
    videoUrls: [],
    gallery: [],
    heroImage: "/assets/images/teampic1.JPG",
    render: {
      vertical: "/assets/images/rockets/renders/agneya.webp",
      horizontal: "/assets/images/rockets/renders/agneya-horizontal.webp",
    },
  },
  {
    id: "vajra",
    name: "Vajra",
    status: "flown",
    year: 2023,
    tagline: "Team Sammard's first high-powered rocket, built for IREC 2023.",
    specs: {
      height: "TBD",
      diameter: "TBD",
      totalWeight: "TBD",
      dryWeight: "TBD",
      motor: "TBD",
      bodyMaterial: "Carbon-fiber nosecone",
      averageThrust: "TBD",
      designedApogee: "10,000 ft",
    },
    components: SUBSYSTEM_TEMPLATE(),
    flightHistory: [{ date: "2023", event: "IREC 2023 / Spaceport America Cup 2023", outcome: "Flown" }],
    videoUrls: [],
    gallery: [],
    heroImage: "/assets/images/teampic1.JPG",
    render: {
      vertical: "/assets/images/rockets/renders/vajra.webp",
      horizontal: "/assets/images/rockets/renders/vajra-horizontal.webp",
    },
  },
  {
    id: "pinaka",
    name: "Pinaka",
    status: "flown",
    year: 2021,
    tagline: "The team's first indigenously developed sounding rocket (2021).",
    specs: {
      height: "TBD",
      diameter: "TBD",
      totalWeight: "TBD",
      dryWeight: "TBD",
      motor: "TBD",
      bodyMaterial: "TBD",
      averageThrust: "TBD",
      designedApogee: "30,000 ft",
    },
    components: SUBSYSTEM_TEMPLATE(),
    flightHistory: [{ date: "2021", event: "First indigenous sounding rocket", outcome: "Flown" }],
    videoUrls: [],
    gallery: [],
    heroImage: "/assets/images/teampic1.JPG",
  },
];
