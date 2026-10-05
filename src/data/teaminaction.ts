export interface ActionCardData {
  title: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  imageAlt: string;
}

// "Manufacturing" reuses the existing unused teaminaction/image2.png as a
// stopgap — it is not a dedicated manufacturing photo. "Team Culture" now
// uses a real lab photo supplied by the user (2026-09) — see ASSETS_NEEDED.md.
export const actionCards: ActionCardData[] = [
  {
    title: "Launches",
    mediaType: "video",
    mediaSrc: "/assets/videos/inflight.mp4",
    imageAlt: "Rocket Launch",
  },
  {
    title: "Manufacturing",
    mediaType: "image",
    mediaSrc: "/assets/images/teaminaction/image2.png",
    imageAlt: "Manufacturing",
  },
  {
    title: "Testing",
    mediaType: "video",
    mediaSrc: "/assets/videos/testing_Rudra.mp4",
    imageAlt: "Rocket Testing",
  },
  {
    title: "Team Culture",
    mediaType: "image",
    mediaSrc: "/assets/images/teaminaction/team-culture.jpg",
    imageAlt: "Team Culture",
  },
];
