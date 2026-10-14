import type { Rocket } from "@/types";

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
// 2026-10: the team's sponsorship brochure (public/assets/sponsors/
// team-sammard-brochure.pdf) confirms Udbhava flew at IREC 2026 — launched
// and recovered, 3rd in Asia in the 10K SRAD category — and names its motor
// "Project Rudra". Status moved from in-development to flown accordingly.
// Udbhava's payload follows the brochure ("MARK", coefficient of friction in
// microgravity): it's the later document, written after the flight, so it
// supersedes the PTR's bioprinter (still shown as an R&D project in rnd.ts).
// Airavata's IREC 2025 rank uses the brochure's "28th globally in Design and
// Build Quality" (team's call, 2026-10) over the old site's "30th worldwide".
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
      averageThrust: "2622 N (theoretical, N2622-class)",
      designedApogee: "10,000 ft",
    },
    // Nose to tail, as on the vehicle (PTR structural layout + CAD positions):
    // the drogue tube sits above the avionics bay, the airbrake coupler below it,
    // then the lower body tube housing the motor, the fin can and the nozzle.
    components: [
      {
        id: "nose-cone",
        name: "Nose Cone",
        description: "Von Kármán (LD-Haack) profile with a 5:1 fineness ratio, selected via CFD across 5 candidate geometries to minimize transonic wave drag (Mach 0.8–1.2). Built as a 5-layer 240 GSM fiberglass hand layup over a 10-part 3D-printed PLA mold, with a CNC-machined Aluminum 6061 tip bonded using J-B Weld epoxy.",
      },
      {
        id: "payload",
        name: "Payload",
        description: "MARK — a scientific payload that measured the coefficient of friction in microgravity during flight.",
      },
      {
        id: "recovery",
        name: "Recovery",
        description: "Dual-deployment using 5/8-inch Kevlar shock cords (4,500 lb test strength) and two redundant 5g black-powder charge wells per separation event; both parachutes are packed in two-layer stitched fiberglass bags for ember protection.",
      },
      {
        id: "avionics-bay",
        name: "Avionics Bay",
        description: "A modular bay pairing COTS hardware (RRC3+, Blue Raven, Featherweight GPS on a 5-cell 21700 battery pack) with two custom SRAD flight computers — Arceus and the STM32-based Sirius — and a dedicated Power Distribution Board on a 10-cell 21700 Li-ion pack, for redundant recovery actuation, telemetry, and data acquisition.",
      },
      {
        id: "airbrakes",
        name: "Airbrakes",
        description: "A custom SRAD servo-driven 4-leaf airbrake, controlled by BHAGAT-C, an ESP32-based PCB. A cam plate with four symmetric spiral slots deploys the four flush-mounted leaves radially for active drag control, validated by CFD from Mach 0.875 down to Mach 0.3 across the coasting phase.",
      },
      {
        id: "airframe",
        name: "Airframe",
        description: "Two filament-wound fiberglass body tubes forming the primary load-bearing structure, compression-tested to 21,539 N (≈5.8× the expected motor thrust) before buckling failure.",
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
        id: "nozzle",
        name: "Nozzle",
        description: "A converging–diverging nozzle machined from SS304 for high-temperature strength, oxidation resistance and reusability, with a 28.5 mm throat. An O-ring groove on its shoulder seals against the motor's thermal liner, and a bolted retention ring secures it at the aft end.",
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
        src: "/assets/projects/udbhava-poster.jpg",
        alt: "Udbhava rocket and technical poster at Bangalore Space Expo 2026",
        category: "Competitions",
      },
    ],
    heroImage: "/assets/projects/udbhava-poster.jpg",
    render: {
      vertical: "/assets/shared/rockets/udbhava.webp",
      horizontal: "/assets/shared/rockets/udbhava-horizontal.webp",
    },
    model: {
      src: "/assets/shared/models/udbhava.glb",
      // The airframe CAD has no motor (it's added below as an attachment), no
      // payload and no airbrake parts. Base-bleed segments, the airframe/fin-can
      // couplers and the motor retainer belong to no listed subsystem and stay neutral.
      partGroups: {
        "nose-cone": ["nose tip", "nose cone", "nosecone"],
        "avionics-bay": ["avionics bay"],
        // The drogue/main parachute tubes plus the charge-well couplers either side of the avionics bay.
        recovery: ["recovery"],
        nozzle: ["nozzle assembly", "graphite insert", "retaining ring"],
        // The coupler between the main parachute tube and the lower body tube carries the airbrake (attachment below).
        airbrakes: ["coupler-1"],
        // "5 deg bevel" plates are the fins; "fincan" the four aluminium plates holding them.
        fins: ["fincan", "5 deg bevel"],
        airframe: ["lowerbodytube"],
      },
      // Project Rudra's own CAD, fitted inside the lower body tube by matching its
      // nozzle sub-assembly to Udbhava's (same part in both exports). The
      // half-section cutaway replaces it while the Motor subsystem is in focus.
      attachments: [
        { src: "/assets/shared/models/n_class_motor.glb", anchor: "nozzle assembly", group: "motor" },
        { src: "/assets/shared/models/n_class_motor_half.glb", anchor: "nozzle assembly", group: "motor", show: "focus" },
        // The team's airbrake module. It shares no identical part with the airframe
        // CAD, so it's placed by its coupler: the PTR has the mechanism "integrated
        // into a structural coupler connecting rocket body tubes", and the module
        // was modelled with the motor tube just below it — i.e. Udbhava's "coupler-1",
        // between the main parachute tube and the lower (motor) body tube. Its own
        // coupler/tube pieces are dropped in favour of the airframe's. Threaded rods
        // and bearings were simplified to plain cylinders for size (5.8 → 1.1 MB).
        {
          src: "/assets/shared/models/airbrakes.glb",
          align: { own: "coupler - copy", target: "coupler-1" },
          omit: ["coupler - copy", "lowers + upper coupler", "recovery tube", "motor tibe"],
          group: "airbrakes",
        },
      ],
      decal: {
        src: "/assets/shared/models/udbhava-decal.webp",
        parts: ["nose cone", "recovery tube", "avionics bay", "lowerbodytube"],
        // The artwork's grey top band is drawn for the bare aluminium tip.
        span: ["nose tip", "nose cone", "recovery tube", "avionics bay", "lowerbodytube"],
      },
      // Checked against the CAD's own material tags and the PTR: SS304 nozzle
      // (tagged "cast stainless steel") and nozzle retaining ring; 6061 aluminium
      // nose tip (tagged "satin finish aluminum"), couplers (BOM: 6), fin-can plates
      // and the motor retainer (PTR: 6061-T6, not steel); carbon-composite fins.
      // Motor (attachments): Al 6061-T6 casing, Al 6063-T6 forward closure,
      // A4-80 stainless M6 bolts, KNSB propellant grains ("bate" = BATES grain).
      finishes: {
        "carbon-fiber": ["5 deg bevel"],
        "stainless-steel": ["nozzle assembly", "m6x25"],
        aluminium: ["nose tip", "coupler", "fincan", "lower retainer", "motor casing", "forward closure"],
        propellant: ["bate"],
      },
    },
  },
  {
    id: "airavata",
    name: "Airavata",
    status: "flown",
    year: 2025,
    tagline: "IREC 2025 rocket (10K COTS) — a 3U CubeSat payload combining ViziNav vision-aided navigation, muon detection and structural health monitoring, with dual Sirius flight computers.",
    specs: {
      // From Airavata's IREC 2025 Project Technical Report (Team 188), matching
      // the competition poster the team chose (2026-10). Its weights: 23.7 kg
      // vehicle + 2 kg payload = 25.7 kg at liftoff.
      height: "2.82m",
      diameter: "14cm",
      totalWeight: "25.7kg at liftoff",
      dryWeight: "23.7kg (without payload)",
      motor: "Aerotech M1845NT-PS",
      bodyMaterial: "Fiberglass (GFRP) airframe, carbon-fiber nose cone and fins",
      averageThrust: "1875 N",
      designedApogee: "10,000 ft (predicted 9,640 ft)",
    },
    components: [
      { id: "nose-cone", name: "Nose Cone", description: "LD-Haack profile at a 2.5:1 fineness ratio, picked over parabolic, conical and ellipsoidal shapes in OpenRocket and CFD, and made in carbon fiber for its strength-to-weight ratio and tolerance of aerodynamic heating." },
      { id: "payload", name: "Payload", description: "A 3U CubeSat-format payload under 2 kg, entered in the Space Dynamics Laboratory Payload Challenge: ViziNav (vision-aided inertial navigation on an NVIDIA Jetson Nano with a camera and IMU), a muon detection module comparing an industry-grade and an additively manufactured scintillator, and strain-gauge structural health monitoring." },
      { id: "avionics-bay", name: "Avionics Bay", description: "Housed in the coupler: a four-layer SRAD stack (Bessie 2.0 tracker, redundant and primary Sirius flight computers, master pull-pin switch) beside a removable sled carrying the COTS electronics, for quick field swaps." },
      { id: "recovery", name: "Recovery", description: "Black-powder dual deployment — drogue at apogee, main at about 1,500 ft — run by a MissileWorks RRC3 with a Featherweight Raven 4 as backup. Both 12-gore hemispherical parachutes (100 cm drogue, 260 cm main) were sewn in-house from ripstop nylon." },
      { id: "motor", name: "Motor", description: "Aerotech M1845NT-PS (Blue Thunder) COTS M-class motor: 8,307 N·s total impulse, 1,875 N average and 3,081 N peak thrust over a 4.4 s burn." },
      { id: "fins", name: "Fins", description: "Four carbon-fiber fins (195 mm root chord, 70 mm tip chord, 4 mm thick) on a fin can that slides into the aft body tube for easy, repeatable alignment." },
      { id: "airframe", name: "Airframe", description: "Two GFRP body tubes — 1.2 m upper for recovery, 1.1 m lower for the motor and payload — wet-laid and vacuum-bagged in-house, joined by an in-house GFRP coupler, with a fiberglass boat tail to cut base drag." },
    ],
    flightHistory: [{ date: "2025-06", event: "IREC 2025", outcome: "1st in India (10K COTS category), Early Bird Award, 28th globally in Design and Build Quality" }],
    videoUrls: [],
    gallery: [],
    heroImage: "/assets/shared/rockets/airavata.webp",
    render: {
      vertical: "/assets/shared/rockets/airavata.webp",
      horizontal: "/assets/shared/rockets/airavata-horizontal.webp",
    },
  },
  {
    id: "agneya",
    name: "Agneya",
    status: "flown",
    year: 2024,
    tagline: "Built for IREC 2024 (Spaceport America Cup, 10K COTS) — an actively stabilized gimbal payload and the team's SRAD SPARC flight computer.",
    specs: {
      // From Agneya's 2024 Spaceport America Cup Project Technical Report
      // (Team 145), converted from inches/ounces: 85.2 in, 5.9 in, 947 oz
      // liftoff, 572 oz vehicle (without motor and payload).
      height: "2.17m",
      diameter: "15cm",
      totalWeight: "26.8kg at liftoff",
      dryWeight: "16.2kg (without motor and payload)",
      motor: "Aerotech M1845NT-PS",
      bodyMaterial: "Fiberglass airframe and fins, carbon-fiber nose cone with aluminium tip",
      averageThrust: "1822 N",
      designedApogee: "10,000 ft (predicted 10,154 ft)",
    },
    components: [
      { id: "nose-cone", name: "Nose Cone", description: "LD-Haack profile, chosen after OpenRocket and CFD comparisons for the least drag and highest apogee, made in carbon fiber with an aluminium tip." },
      { id: "payload", name: "Payload", description: "An 8.8 lb Active Control Gimbal Stabilization payload in a 3U CubeSat structure: gimbal BLDC motors and AS5600 magnetic encoders hold a platform steady for shock-sensitive cargo, logging IMU data and gimbal angles — a step up from the team's earlier passive vibration-attenuation (PVAD) payload." },
      { id: "avionics-bay", name: "Avionics Bay", description: "A 3D-printed bay carrying a MissileWorks RRC3 (primary) and Featherweight Raven 4 (backup), a Featherweight GPS tracker, and the team's own SRAD SPARC flight computer and GPS tracker." },
      { id: "recovery", name: "Recovery", description: "Rigorously tested black-powder dual deployment: drogue at apogee, main at about 1,490 ft." },
      { id: "motor", name: "Motor", description: "Aerotech M1845NT-PS COTS M-class motor: 8,093 N·s total impulse, 1,822 N average and 2,434 N peak thrust over a 4.4 s burn." },
      { id: "fins", name: "Fins", description: "Four swept-back fiberglass (GFRP) fins with a rounded cross-section to cut drag, keeping a static margin of at least 2 calibers, mounted on a fin can that doubles as the motor retainer." },
      { id: "airframe", name: "Airframe", description: "Two fiberglass composite body tubes forming the primary load-bearing structure, with fiberglass bulkheads." },
    ],
    flightHistory: [{ date: "2024", event: "IREC 2024 / Spaceport America Cup 2024", outcome: "Flown" }],
    videoUrls: [],
    gallery: [],
    heroImage: "/assets/shared/rockets/agneya.webp",
    render: {
      vertical: "/assets/shared/rockets/agneya.webp",
      horizontal: "/assets/shared/rockets/agneya-horizontal.webp",
    },
  },
  {
    id: "vajra",
    name: "Vajra",
    status: "flown",
    year: 2023,
    tagline: "Team Sammard's first high-powered rocket, built for IREC 2023.",
    specs: {
      // From the previous website (its homepage rocket carousel + Projects
      // card), per the team (2026-10). No PTR for Vajra yet; that carousel's
      // Agneya/Airavata figures disagreed with their PTRs, so treat as provisional.
      height: "1.8m",
      diameter: "12cm",
      totalWeight: "18kg",
      dryWeight: "13kg",
      motor: "M2050-P",
      bodyMaterial: "Fiberglass, carbon-fiber nose cone",
      averageThrust: "2500 N",
      designedApogee: "10,000 ft",
    },
    components: [
      { id: "nose-cone", name: "Nose Cone", description: "Carbon fiber." },
      { id: "payload", name: "Payload", description: "An experimental passive vibration-damping payload (PVAD) — the forerunner of Agneya's actively stabilized gimbal." },
      { id: "avionics-bay", name: "Avionics Bay", description: "The team's SRAD SPARC flight computer." },
      { id: "recovery", name: "Recovery", description: "Description — TBD" },
      { id: "motor", name: "Motor", description: "M2050-P solid motor, about 2,500 N average thrust." },
      { id: "fins", name: "Fins", description: "Description — TBD" },
      { id: "airframe", name: "Airframe", description: "Fiberglass." },
    ],
    flightHistory: [{ date: "2023", event: "IREC 2023 / Spaceport America Cup 2023", outcome: "Flown" }],
    videoUrls: [],
    gallery: [],
    heroImage: "/assets/shared/rockets/vajra.webp",
    render: {
      vertical: "/assets/shared/rockets/vajra.webp",
      horizontal: "/assets/shared/rockets/vajra-horizontal.webp",
    },
  },
  {
    id: "pinaka",
    name: "Pinaka",
    status: "retired",
    year: 2021,
    tagline: "The team's first indigenously developed sounding rocket (2021), designed for 30,000 ft.",
    specs: {
      // From the previous website (its homepage rocket carousel + Projects
      // card), per the team (2026-10); the carousel left motor, thrust and
      // loaded weight blank. It also called Pinaka a "Concept" — nothing we
      // have says it flew, so it's recorded as built, not flown.
      height: "3.2m",
      diameter: "22cm",
      totalWeight: "TBD",
      dryWeight: "22kg",
      motor: "TBD",
      bodyMaterial: "Carbon fiber",
      averageThrust: "TBD",
      designedApogee: "30,000 ft",
    },
    components: [
      { id: "nose-cone", name: "Nose Cone", description: "Description — TBD" },
      { id: "payload", name: "Payload", description: "Description — TBD" },
      { id: "avionics-bay", name: "Avionics Bay", description: "Description — TBD" },
      { id: "recovery", name: "Recovery", description: "Description — TBD" },
      { id: "motor", name: "Motor", description: "Description — TBD" },
      { id: "fins", name: "Fins", description: "Description — TBD" },
      { id: "airframe", name: "Airframe", description: "Carbon fiber." },
    ],
    flightHistory: [{ date: "2021", event: "First indigenous sounding rocket", outcome: "Built" }],
    videoUrls: [],
    gallery: [],
    heroImage: "/assets/projects/pinaka.jpg",
    render: {
      vertical: "/assets/shared/rockets/pinaka.webp",
      horizontal: "/assets/shared/rockets/pinaka-horizontal.webp",
    },
  },
];
