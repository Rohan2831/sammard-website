import type { Competition } from "@/types";

// Card photos live in public/assets/home/competitions/ (see its images.txt).
// cansat.jpg is a stand-in: CanSat assembly at IN-SPACe 2025 (no NASA CanSat photos).
export const competitions: Competition[] = [
  {
    id: "irec",
    title: "IREC",
    imageSrc: "/assets/home/competitions/irec.jpg",
    imageAlt: "Team Sammard holding Udbhava at IREC 2026",
  },
  {
    id: "cansat",
    title: "CanSat",
    imageSrc: "/assets/home/competitions/cansat.jpg",
    imageAlt: "Team Sammard assembling a CanSat",
  },
  {
    id: "in-space",
    title: "IN-SPACe",
    imageSrc: "/assets/home/competitions/in-space.jpg",
    imageAlt: "Team Sammard at IN-SPACe CanSat 2025, Kushinagar",
  },
  {
    id: "bsx",
    title: "BSX",
    imageSrc: "/assets/home/competitions/bsx.jpg",
    imageAlt: "Team Sammard's booth at Bangalore Space Expo 2026, showcasing Udbhava",
  },
  {
    id: "srishti",
    title: "Srishti",
    imageSrc: "/assets/home/competitions/srishti.jpg",
    imageAlt: "Team competing at Srishti",
  },
];
