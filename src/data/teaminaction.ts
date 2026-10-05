export interface ActionCardData {
  title: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  imageAlt: string;
}

// "Manufacturing" (home/team-in-action/manufacturing.png) reuses an older
// team photo as a stopgap — it is not a dedicated manufacturing photo. "Team Culture" now
// uses a real lab photo supplied by the user (2026-09) — see ASSETS_NEEDED.md.
export const actionCards: ActionCardData[] = [
  {
    title: "Launches",
    mediaType: "video",
    mediaSrc: "/assets/shared/videos/inflight.mp4",
    imageAlt: "Rocket Launch",
  },
  {
    title: "Manufacturing",
    mediaType: "image",
    mediaSrc: "/assets/home/team-in-action/manufacturing.png",
    imageAlt: "Manufacturing",
  },
  {
    title: "Testing",
    mediaType: "video",
    mediaSrc: "/assets/shared/videos/testing_Rudra.mp4",
    imageAlt: "Rocket Testing",
  },
  {
    title: "Team Culture",
    mediaType: "image",
    mediaSrc: "/assets/home/team-in-action/team-culture.jpg",
    imageAlt: "Team Culture",
  },
];
