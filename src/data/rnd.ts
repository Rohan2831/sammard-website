import type { RndProject } from "@/types";

// Confirmed against teamsammard.com/projects (live production site's flat
// "Featured Projects" grid — individually named sub-projects, cross-referenced
// 2026-09), which has far more detail than a single paragraph per category.
// Payloads / Antennas / Airbrakes / Recovery Systems categories aren't
// covered on the live site — filled 2026-09 from Udbhava's Project Technical
// Report (same PDF used for rockets.ts), since the PTR documents these as
// full team subsystem projects, not just per-rocket components.
// 2026-10: Project Rudra, Sirius's STM32 basis, the CyberDeck ground station
// and BHAGAT-C's ESP32/4-leaf details added from the team's sponsorship
// brochure. The brochure names Udbhava's payload "MARK" — conflicts with the
// PTR's bioprinter below; kept as-is pending team confirmation.
export const rndProjects: RndProject[] = [
  {
    id: "rnd-motors",
    category: "Motors",
    title: "Propulsion Systems",
    description: "Foundational KNSB solid-propellant testing began in 2022. That led to Ignis, our first in-house J-class SRAD solid rocket motor (KNSB propellant, 850 N thrust), successfully static-fire tested in 2025. Tejas, our follow-up L-class motor, then achieved a 4.71s burn, 4,773 Ns total impulse, and ~1 kN average thrust — both tested on a custom-built propulsion test system (built in-house by the Electronics and CS divisions) enabling remote ignition and real-time data acquisition. Project Rudra, our N-class SRAD solid rocket motor designed and manufactured entirely in-house, powered Udbhava at IREC 2026 — the team's first flight in the 10K SRAD category.",
  },
  {
    id: "rnd-avionics",
    category: "Avionics",
    title: "Avionics & Control Systems",
    description: "Our SPARC line of custom flight computers has reached its 4th generation (Sparc 4: GPS, pressure and inertial sensors) and Sirius, a compact 70mm STM32-based board with GPS, IMUs, LoRa telemetry and dual pyro channels, flown aboard Udbhava. Bessie 1.0 and 2.0 are our SRAD GPS trackers — Bessie 1.0 uses a U-blox NEO-6M module for ±2.5m accuracy over 915MHz LoRa; Bessie 2.0 is built around an ESP32-S3 with real-time sensor fusion for precise in-flight and post-landing recovery.",
  },
  {
    id: "rnd-airbrakes",
    category: "Airbrakes",
    title: "BHAGAT-C",
    description: "BHAGAT-C (Borne Hardware for Apogee Guidance, Airbrakes Tuning & Control) is our custom ESP32-based SRAD airbrake controller, driving a 4-leaf airbrake mechanism for precise apogee control during coast, after the vehicle is boosted past its target altitude. It's a closed-loop drag control system: redundant altitude, orientation, rate and acceleration sensors feed a custom control algorithm that actuates the airbrake mechanism via dual redundant servo channels, built for field accessibility and consistent operation across flight campaigns.",
  },
  {
    id: "rnd-antennas",
    category: "Antennas",
    title: "Antenna Tracking System (ATS)",
    description: "Our dual communication architecture pairs a 4-stack Yagi antenna (915 MHz) for long-range telemetry with a high-gain horn antenna (5.8 GHz) for live video. Since the horn antenna is highly directional, we built the Antenna Tracking System (ATS) to keep it pointed at the rocket automatically — it estimates the rocket's real-time position from incoming GPS/IMU telemetry via an Extended Kalman Filter, then drives two NEMA-23 stepper motors (on a Teensy 4.1) to the calculated azimuth and elevation, maintaining lock for reliable signal reception throughout flight.",
  },
  {
    id: "rnd-ground-station",
    category: "Ground Station",
    title: "Ground Station",
    description: "Shrota is our custom telemetry receiver and tracker, pairing with the Bessie trackers over 915MHz LoRa. Shrota 2.0 upgrades this with a 50-channel GPS receiver (WAAS/EGNOS/MSAS augmentation) refreshing at 5Hz, running on a single 18650 lithium-ion cell for reliable long-range rocket tracking. For Udbhava, our integrated ground control station pairs SRAD antennas for long-range communication with a CyberDeck for live data visualization.",
  },
  {
    id: "rnd-payloads",
    category: "Payloads",
    title: "In-Flight Bioprinter",
    description: "Our current payload project is a compact, autonomous 3D micro bioprinter, first flying aboard Udbhava. It performs controlled extrusion-based printing during flight using a specialized bio-ink formulation, studying bioink flow and print fidelity under transient acceleration and reduced-gravity conditions, with applications in future aerospace and biomanufacturing research.",
  },
  {
    id: "rnd-recovery",
    category: "Recovery Systems",
    title: "Dual-Deployment Recovery",
    description: "Our recovery systems use dual-deployment with 5/8-inch Kevlar shock cords rated to 4,500 lb, and redundant 5g black-powder charge wells per separation event for reliability. Parachutes are packed in two-layer stitched fiberglass bags for ember protection, and recovery electronics (COTS altimeters alongside our own SRAD flight computers) provide redundant deployment triggers.",
  },
  {
    id: "rnd-future-research",
    category: "Future Research",
    title: "Future Research",
    description: "ViziNav (Visual-Aided Inertial Navigation System) is a GPS-independent, vision-based navigation system built around a Raspberry Pi, monocular camera, and IMU. It performs real-time 6-DOF pose estimation and 3D trajectory reconstruction — useful both for in-flight orientation and post-flight path visualization, with future potential for autonomous planetary landings.",
  },
];
