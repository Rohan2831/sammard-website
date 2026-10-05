import type { TimelineMilestone } from "@/types";

// 2017-2025 sourced from teamsammard.com/timeline (live production site,
// which ends at 2025 "To Be Continued…"), cross-referenced 2026-09. The 2026
// entry is added from team-supplied event photos/PTR, not the live site —
// see ASSETS_NEEDED.md. Not all years have a "category" that cleanly fits
// the type; picked the closest fit.
export const timelineMilestones: TimelineMilestone[] = [
  {
    id: "2017-genesis",
    year: 2017,
    title: "Genesis of Sammard",
    description: "Team Sammard was founded, uniting passionate students to embark on a journey in space technology and engineering.",
    category: "formation",
  },
  {
    id: "2018-making-our-mark",
    year: 2018,
    title: "Making Our Mark",
    description: "Achieved 18th rank worldwide in the international CanSat competition, marking Team Sammard's first appearance on the global stage.",
    category: "international",
  },
  {
    id: "2019-strengthening-global-ties",
    year: 2019,
    title: "Strengthening Global Ties",
    description: "Secured 20th rank globally in CanSat. Presented innovations at ISRO's Bangalore Space Expo 2019.",
    category: "international",
  },
  {
    id: "2020-forging-ahead",
    year: 2020,
    title: "Forging Ahead Through Innovation",
    description: "Hosted the Astrophilia webinar with Star Labs and the Space Voyagers webinar with SAE VIT. Started R&D for the team's first sounding rocket.",
    category: "first-rocket",
  },
  {
    id: "2021-ascending-the-ranks",
    year: 2021,
    title: "Ascending the Ranks",
    description: "Ranked 13th worldwide in CanSat. Achieved 5th in Asia Pacific and competed in the 10K COTS category at IREC. Collaborated with BSG Karnataka for SatCan.",
    category: "competition",
  },
  {
    id: "2022-world-stage-recognition",
    year: 2022,
    title: "World Stage Recognition",
    description: "Placed 23rd worldwide at Spaceport America Cup. Presented at Bangalore Space Expo 2022, ran a workshop at Techno VIT Chennai, exhibited at World Space Week with ISRO and VIT, and completed a successful recovery-system test.",
    category: "award",
  },
  {
    id: "2023-inspiring-innovation",
    year: 2023,
    title: "Inspiring Innovation",
    description: "Ran the Ignitia workshop during Yantra, launched Vajra at Spaceport America Cup, and hosted a lecture with the Chandrayaan-3 Mission Director.",
    category: "first-rocket",
  },
  {
    id: "2024-elevating-global-presence",
    year: 2024,
    title: "Elevating Global Presence",
    description: "Presented at Bangalore Space Expo 2024 and launched Agneya at Spaceport America Cup.",
    category: "competition",
  },
  {
    id: "2025-breaking-new-frontiers",
    year: 2025,
    title: "Breaking New Frontiers",
    description: "Successful static-fire test of the team's first in-house J-class KNSB solid rocket motor (Ignis). Flew Airavata at IREC 2025 — 1st in India (10K COTS), Early Bird Award, 30th worldwide in design/build/documentation.",
    category: "award",
  },
  {
    id: "2026-udbhava",
    year: 2026,
    title: "Into the SRAD Category",
    description: "Exhibited Airavata at the AP SpaceTech Summit (Guntur) and at Srishti 2026 (Saintgits, Kottayam), winning the Best SolidWorks Project Award. Flew Udbhava at IREC 2026 — the team's first entry in the 10K SRAD category, powered by Project Rudra, an N-class solid motor designed and built in-house — launching and recovering it successfully and placing 3rd in Asia. Showcased Udbhava at Bangalore Space Expo 2026.",
    category: "award",
  },
];
