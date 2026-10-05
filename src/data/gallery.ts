import type { GalleryItem } from "@/types";

// Only real, existing assets are listed here — no fabricated items.
// gallery-7..20 are generic lab/workshop photos supplied by the user
// (2026-09, not tied to any specific event) — see ASSETS_NEEDED.md.
// gallery-21 (L-Class.mov) is a motor static-fire test per the user.
export const galleryItems: GalleryItem[] = [
  { id: "gallery-1", type: "image", src: "/assets/images/teampic1.JPG", alt: "Team SAMMARD", category: "Team" },
  { id: "gallery-2", type: "image", src: "/assets/images/teampic2.JPG", alt: "Team SAMMARD at work", category: "Team" },
  { id: "gallery-3", type: "image", src: "/assets/images/teaminaction/image2.png", alt: "Team SAMMARD manufacturing", category: "Manufacturing" },
  { id: "gallery-4", type: "video", src: "/assets/videos/launch.mp4", alt: "Rocket launch", category: "Launches" },
  { id: "gallery-5", type: "video", src: "/assets/videos/inflight.mp4", alt: "Rocket in flight", category: "Launches" },
  { id: "gallery-6", type: "video", src: "/assets/videos/testing_Rudra.mp4", alt: "Rocket testing", category: "Testing" },
  { id: "gallery-7", type: "image", src: "/assets/images/gallery/team-at-work-1.jpg", alt: "Team SAMMARD working at Creation Labs, VIT Vellore", category: "Behind the Scenes" },
  { id: "gallery-8", type: "image", src: "/assets/images/gallery/team-at-work-2.jpg", alt: "CFD and structural simulations running at the team's lab", category: "Behind the Scenes" },
  { id: "gallery-9", type: "image", src: "/assets/images/gallery/team-at-work-3.jpg", alt: "A team member assembling a component in the lab", category: "Assembly" },
  { id: "gallery-10", type: "image", src: "/assets/images/gallery/team-at-work-4.jpg", alt: "Team SAMMARD members at a competition venue", category: "Behind the Scenes" },
  { id: "gallery-11", type: "image", src: "/assets/images/gallery/team-at-work-5.jpg", alt: "Team members working together at Creation Labs", category: "Behind the Scenes" },
  { id: "gallery-12", type: "image", src: "/assets/images/gallery/team-at-work-6.jpg", alt: "CFD meshing and simulation work on laptops", category: "Behind the Scenes" },
  { id: "gallery-13", type: "image", src: "/assets/images/gallery/team-at-work-7.jpg", alt: "A team member soldering an electronics board", category: "Assembly" },
  { id: "gallery-14", type: "image", src: "/assets/images/gallery/team-at-work-8.jpg", alt: "A team member rework-soldering a PCB with a heat gun", category: "Assembly" },
  { id: "gallery-15", type: "image", src: "/assets/images/gallery/team-at-work-9.jpg", alt: "PCB layout and routing in progress", category: "Ground Station" },
  { id: "gallery-16", type: "image", src: "/assets/images/gallery/team-at-work-10.jpg", alt: "Firmware development on an embedded flight computer", category: "Ground Station" },
  { id: "gallery-17", type: "image", src: "/assets/images/gallery/team-at-work-11.jpg", alt: "Flight simulation code running on a laptop", category: "Ground Station" },
  { id: "gallery-18", type: "image", src: "/assets/images/gallery/team-at-work-12.jpg", alt: "CAD design of a motor assembly, IREC 2025 stickers visible on the laptop", category: "Manufacturing" },
  { id: "gallery-19", type: "image", src: "/assets/images/gallery/team-at-work-13.jpg", alt: "Team members sketching a design together on a tablet", category: "Behind the Scenes" },
  { id: "gallery-20", type: "image", src: "/assets/images/events/srishti/srishti-cansat-booth.jpg", alt: "A CanSat prototype and CAD models at a Team Sammard exhibition booth", category: "Competitions" },
  { id: "gallery-21", type: "video", src: "/assets/videos/L-Class.mov", alt: "L-class motor static-fire test", category: "Testing" },
];

export const galleryCategories: GalleryItem["category"][] = [
  "Launches",
  "Testing",
  "Assembly",
  "Manufacturing",
  "Recovery",
  "Competitions",
  "Team",
  "Ground Station",
  "Behind the Scenes",
];
