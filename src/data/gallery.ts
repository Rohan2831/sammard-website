import type { GalleryItem } from "@/types";

// The Gallery's photos/videos are listed in `public/assets/gallery/images.txt`
// (`file | description | category`), read at build time — see src/lib/medialist.ts.
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
  "Rockets",
  "Avionics",
  "Exhibitions",
];
