import type { Competition } from "@/types";

// NOTE: srishti.jpg now exists (real photo, 2026-09). The other 4 image
// files still don't exist — see ASSETS_NEEDED.md (Home Page).
export const competitions: Competition[] = [
  {
    id: "irec",
    title: "IREC",
    imageSrc: "/assets/home/competitions/irec.jpg",
    imageAlt: "Team at the Intercollegiate Rocket Engineering Competition",
  },
  {
    id: "cansat",
    title: "CanSat",
    imageSrc: "/assets/home/competitions/cansat.jpg",
    imageAlt: "Team working on a CanSat competition entry",
  },
  {
    id: "in-space",
    title: "IN-SPACe",
    imageSrc: "/assets/home/competitions/in-space.jpg",
    imageAlt: "Team presenting at an IN-SPACe event",
  },
  {
    id: "bsx",
    title: "BSX",
    imageSrc: "/assets/home/competitions/bsx.jpg",
    imageAlt: "Team competing at BSX",
  },
  {
    id: "srishti",
    title: "Srishti",
    imageSrc: "/assets/home/competitions/srishti.jpg",
    imageAlt: "Team competing at Srishti",
  },
];
