import type { EventRecord } from "@/types";

// Dates, locations, and results confirmed against teamsammard.com/events
// (live production site's dedicated Events page, cross-referenced 2026-09).
// "SA Cup" (Spaceport America Cup) and "Gravitas" (VIT's tech fest, outreach
// not competition) are real events not previously tracked here — added.
// "Srishti" and "APSA" are confirmed/added from team-supplied event photos
// (2026-09) rather than the live site — see ASSETS_NEEDED.md.
//
// Array order: `status: "upcoming"` events always lead (they haven't
// happened yet, so no date — however stale/unreliable — should ever sort
// them after something that already happened), then `status: "completed"`
// events follow, strictly latest-first by actual date. This mirrors the
// live site's own page structure (an "Upcoming Events" section above
// "Past Events").
//
// "irec-2026"/"cansat-2026" were the live site's own Upcoming Events
// entries (added on a 2026-09 re-check). Their printed date text (June 15-20
// 2025 / April 5-7 2025) is almost certainly stale leftover copy from a
// previous year's card, so it's never used for ordering (an earlier pass did,
// which put "IREC 2026" after the already-happened "IREC" 2025 — the bug this
// comment is here to prevent regressing).
//
// 2026-10: the team's sponsorship brochure confirms Udbhava flew at IREC 2026
// (launched, recovered, 3rd in Asia in 10K SRAD), so "irec-2026" is now
// `completed`. No source gives its exact 2026 dates; it sits between BSX
// (Sept 2026) and Srishti (Feb 2026) because IREC/Spaceport America Cup is
// held every June. "cansat-2026" stays `upcoming` — nothing we have says
// whether/how the team competed (flagged in ASSETS_NEEDED.md).
//
// One more real quirk, found while sorting "completed" events by actual
// date: "CanSat Competition" is branded as the "2025 season" by the team's
// own site copy, but that same site's Past Events card prints the actual
// launch date as June 18-22, 2024 (like how "Super Bowl LIX" is the 2024
// NFL season). Kept `year: 2025` (matches the team's own branding) but
// sorted by the real June 2024 date, and spelled the date out in the
// summary so the discrepancy isn't hidden.
export const events: EventRecord[] = [
  {
    id: "cansat-2026",
    slug: "cansat-2026",
    name: "CanSat Competition 2026",
    year: 2026,
    location: "Texas, USA",
    team: "TBD",
    status: "upcoming",
    gallery: [],
    videoUrls: [],
    reportUrls: [],
    summary: "An international competition pushing students to integrate complete satellite systems into a compact can-sized payload. Team Sammard's upcoming entry, listed on the live site's Events page under \"Upcoming Events\" — its printed date (April 5–7, 2025) is likely stale leftover text; the real 2026 date isn't known yet.",
  },
  {
    id: "bsx",
    slug: "bsx",
    name: "Bangalore Space Expo (BSX)",
    year: 2026,
    location: "Bengaluru, Karnataka, India",
    team: "TBD",
    status: "completed",
    rocketId: "udbhava",
    gallery: [
      {
        id: "bsx-2026-1",
        type: "image",
        src: "/assets/events/bsx/bsx-2026-udbhava-booth.jpg",
        alt: "Team Sammard's booth at Bangalore Space Expo 2026, showcasing the Udbhava rocket",
        category: "Competitions",
      },
    ],
    videoUrls: [],
    reportUrls: [],
    summary: "Presented innovations at ISRO's Bangalore Space Expo, strengthening industry connections. Team Sammard has presented at BSX in 2019, 2022, 2024, and 2026 — the 2026 booth (Sept 2026) showcased Udbhava, the team's newest rocket.",
  },
  {
    id: "irec-2026",
    slug: "irec-2026",
    name: "IREC 2026",
    year: 2026,
    location: "Midland, Texas, USA",
    team: "TBD",
    status: "completed",
    rocketId: "udbhava",
    gallery: [],
    videoUrls: [],
    reportUrls: [],
    summary: "International Rocket Engineering Competition — the world's largest collegiate rocket engineering competition. Team Sammard's first entry in the 10K SRAD category, flying Udbhava on Project Rudra, an N-class solid rocket motor designed and manufactured entirely in-house. Udbhava was launched and recovered successfully and placed 3rd in Asia in the 10K SRAD category.",
  },
  {
    id: "srishti",
    slug: "srishti",
    name: "Srishti",
    year: 2026,
    location: "Saintgits College of Engineering, Kottayam, Kerala, India",
    team: "TBD",
    status: "completed",
    rocketId: "airavata",
    gallery: [
      { id: "srishti-1", type: "image", src: "/assets/events/srishti/srishti-airavata-poster.jpg", alt: "Airavata rocket and technical poster on display at Srishti 2026", category: "Competitions" },
      { id: "srishti-2", type: "image", src: "/assets/events/srishti/srishti-rocket-booth.jpg", alt: "Team Sammard's Srishti 2026 booth with the Airavata rocket", category: "Competitions" },
      { id: "srishti-3", type: "image", src: "/assets/events/srishti/srishti-booth-group.jpg", alt: "Team Sammard members at their Srishti 2026 exhibition booths", category: "Competitions" },
      { id: "srishti-4", type: "image", src: "/assets/events/srishti/srishti-simulation-booth.jpg", alt: "Simulation and CFD work displayed at the Srishti 2026 booth", category: "Competitions" },
      { id: "srishti-5", type: "image", src: "/assets/events/srishti/srishti-team-arrival.jpg", alt: "Team Sammard at Saintgits College of Engineering for Srishti 2026", category: "Competitions" },
      { id: "srishti-6", type: "image", src: "/assets/events/srishti/srishti-solidworks-award.jpg", alt: "Team Sammard receiving the Best SolidWorks Project Award at Srishti 2026", category: "Competitions" },
      { id: "srishti-7", type: "image", src: "/assets/events/srishti/srishti-award-1.jpg", alt: "Team Sammard members receiving a project award on the Srishti 2026 stage", category: "Competitions" },
      { id: "srishti-8", type: "image", src: "/assets/events/srishti/srishti-award-2.jpg", alt: "Team Sammard receiving the Best Computer Applications Project Award at Srishti 2026", category: "Competitions" },
      { id: "srishti-9", type: "image", src: "/assets/events/srishti/srishti-booth-banner.jpg", alt: "Team Sammard's booth banner at Srishti 2026", category: "Competitions" },
      { id: "srishti-10", type: "image", src: "/assets/events/srishti/srishti-cansat-booth.jpg", alt: "A CanSat prototype and CAD models at a Team Sammard exhibition booth at Srishti 2026", category: "Competitions" },
    ],
    videoUrls: [],
    reportUrls: [],
    summary: "Srishti 2026 — the 12th National Level Technical Project Exhibition and Competition (theme: \"Engineering Resilience: Designing for Uncertainty\"), hosted by Saintgits College of Engineering, Kottayam, on 23–24 February 2026. Team Sammard exhibited Airavata and won the Best SolidWorks Project Award, plus what a second stage photo indicates is the Best Computer Applications Project Award (partially obscured in both photos — confirm exact wording).",
  },
  {
    id: "apsa",
    slug: "apsa",
    name: "AP SpaceTech Summit & Rocketry Challenge",
    year: 2026,
    location: "Guntur, Andhra Pradesh, India",
    team: "TBD",
    status: "completed",
    rocketId: "airavata",
    gallery: [
      { id: "apsa-1", type: "image", src: "/assets/events/apsa/apsa-airavata-display.jpg", alt: "Team Sammard's Airavata rocket on display at the AP SpaceTech Summit 2026", category: "Competitions" },
      { id: "apsa-2", type: "image", src: "/assets/events/apsa/apsa-summit.jpg", alt: "Team Sammard on stage at the AP SpaceTech Summit & Rocketry Challenge 2026", category: "Competitions" },
    ],
    videoUrls: [],
    reportUrls: [],
    summary: "AP SpaceTech Summit & Rocketry Challenge 2k26 (\"Connecting Space Science, Technology & Innovation\"), hosted by Vignan's Foundation for Science, Technology & Research in Guntur, Andhra Pradesh, on 24 January 2026. Team Sammard exhibited Airavata. Not yet listed on the team's live site — added from team-supplied event photos (2026-09).",
  },
  {
    id: "gravitas",
    slug: "gravitas",
    name: "Gravitas",
    year: 2025,
    location: "VIT Vellore",
    team: "TBD",
    status: "completed",
    gallery: [],
    videoUrls: [],
    reportUrls: [],
    summary: "VIT's biggest tech fest, 26–29 October 2025 — an outreach/exhibition event, not a competition Team Sammard enters.",
  },
  {
    id: "in-space",
    slug: "in-space",
    name: "IN-SPACe CanSat",
    year: 2025,
    location: "Kushinagar, Uttar Pradesh, India",
    team: "TBD",
    status: "completed",
    gallery: [],
    videoUrls: [],
    reportUrls: [],
    summary: "National-level CanSat competition, held 25–30 October 2025.",
  },
  {
    id: "irec",
    slug: "irec",
    name: "IREC",
    year: 2025,
    location: "Midland, Texas, USA",
    team: "TBD",
    status: "completed",
    gallery: [],
    videoUrls: [],
    reportUrls: [],
    summary: "International Rocket Engineering Competition, held 18–22 June 2025 in Midland. Team Sammard flew Airavata: 1st in India (10K COTS category), Early Bird Award, ranked 30th worldwide in design, build & documentation.",
  },
  {
    id: "cansat",
    slug: "cansat",
    name: "CanSat Competition",
    year: 2025,
    location: "Virginia, USA",
    team: "TBD",
    status: "completed",
    gallery: [],
    videoUrls: [],
    reportUrls: [],
    summary: "NASA's \"CanSat 2025\" competition season — Team Sammard's actual launch was 18–22 June 2024, per the live site's own Past Events card. Flew a container–payload system with a coaxial contra-rotating autogyro for a controlled ~5 m/s descent, with dual cameras and real-time telemetry.",
  },
  {
    id: "sa-cup",
    slug: "sa-cup",
    name: "Spaceport America Cup",
    year: 2024,
    location: "New Mexico, USA",
    team: "TBD",
    status: "completed",
    gallery: [],
    videoUrls: [],
    reportUrls: [],
    summary: "The world's largest intercollegiate rocket engineering competition, held 10–12 June 2024. Team Sammard has competed multiple years, including launching Vajra (2023) and Agneya (2024); placed 23rd worldwide in 2022.",
  },
];
