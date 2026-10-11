import type { CanSat } from "@/types";

// Confirmed against teamsammard.com/projects (live production site,
// cross-referenced 2026-09).
export const cansats: CanSat[] = [
  {
    id: "cansat-2025",
    name: "CanSat 2025",
    mission: "Container–payload system: the container descends by parachute and deploys its payload at 75% of apogee.",
    payload: "Coaxial contra-rotating autogyro achieving a controlled descent of ~5 m/s.",
    electronics: "Integrated sensors, dual cameras, and real-time telemetry providing continuous altitude, orientation, and environmental data.",
    results: "Not selected to fly at the finals — launch places were decided by a random draw, purely down to luck.",
    competition: "NASA CanSat",
    image: "/assets/projects/cansat/cansat-2025.jpg",
    imageAlt: "CAD render of the CanSat 2025 payload's coaxial contra-rotating autogyro",
    gallery: [],
  },
  {
    id: "cansat-2023",
    name: "CanSat 2023",
    mission: "Mission — TBD",
    payload: "Glider deployment system for extended data collection during descent.",
    electronics: "Electronics — TBD",
    results: "Results — TBD",
    image: "/assets/projects/cansat/cansat-2023.jpg",
    imageAlt: "CanSat 2023 hardware on display, including the glider deployment mechanism",
    gallery: [],
  },
];
