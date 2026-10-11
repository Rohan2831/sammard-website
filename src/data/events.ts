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
// Each event's photos live in `public/assets/events/<slug>/` and are listed in
// that folder's `images.txt` (read at build time by `readMediaList`), so
// adding photos never needs a code change. `website` is the competition's
// official site (verified 2026-10).
export const events: EventRecord[] = [
  {
    id: "cansat-2026",
    slug: "cansat-2026",
    name: "CanSat Competition 2026",
    year: 2026,
    location: "Texas, USA",
    website: "https://www.cansatcompetition.com/",
    status: "upcoming",
    videoUrls: [],
    summary: "An international competition pushing students to integrate complete satellite systems into a compact can-sized payload. Team Sammard's 2026 CanSat is in development — the competition is still ahead.",
  },
  {
    id: "bsx",
    slug: "bsx",
    name: "Bangalore Space Expo (BSX)",
    year: 2026,
    location: "Bengaluru, Karnataka, India",
    website: "https://bsxindia.com/",
    status: "completed",
    rocketId: "udbhava",
    videoUrls: [],
    summary: "Presented innovations at ISRO's Bangalore Space Expo, strengthening industry connections. Team Sammard has presented at BSX in 2019, 2022, 2024, and 2026 — the 2026 booth (Sept 2026) showcased Udbhava, the team's newest rocket.",
  },
  {
    id: "irec-2026",
    slug: "irec-2026",
    name: "IREC 2026",
    year: 2026,
    location: "Midland, Texas, USA",
    website: "https://www.esrarocket.org/",
    status: "completed",
    rocketId: "udbhava",
    videoUrls: [],
    reportUrls: ["/assets/documentation/irec-2026-project-technical-report.pdf"],
    summary: "International Rocket Engineering Competition — the world's largest collegiate rocket engineering competition. Team Sammard's first entry in the 10K SRAD category, flying Udbhava on Project Rudra, an N-class solid rocket motor designed and manufactured entirely in-house. Udbhava was launched and recovered successfully and placed 3rd in Asia in the 10K SRAD category.",
  },
  {
    id: "srishti",
    slug: "srishti",
    name: "Srishti",
    year: 2026,
    location: "Saintgits College of Engineering, Kottayam, Kerala, India",
    website: "https://www.saintgits.org/",
    status: "completed",
    rocketId: "airavata",
    videoUrls: [],
    summary: "Srishti 2026 — the 12th National Level Technical Project Exhibition and Competition (theme: \"Engineering Resilience: Designing for Uncertainty\"), hosted by Saintgits College of Engineering, Kottayam, on 23–24 February 2026. Team Sammard exhibited Airavata and five projects placed: 1st position in two project categories, and 2nd position for Best Analytical & Best ANSYS Project (Integrated CFD), Best SolidWorks Project (CanSat design) and Best Computer Application Project (CyberDeck).",
  },
  {
    id: "apsa",
    slug: "apsa",
    name: "AP SpaceTech Summit & Rocketry Challenge",
    year: 2026,
    location: "Guntur, Andhra Pradesh, India",
    website: "https://www.vignan.ac.in/newvignan/spacetech.php",
    status: "completed",
    rocketId: "airavata",
    videoUrls: [],
    summary: "AP SpaceTech Summit & Rocketry Challenge 2k26 (\"Connecting Space Science, Technology & Innovation\"), hosted by Vignan's Foundation for Science, Technology & Research in Guntur, Andhra Pradesh, on 24 January 2026. Team Sammard exhibited Airavata. Not yet listed on the team's live site — added from team-supplied event photos (2026-09).",
  },
  {
    id: "gravitas",
    slug: "gravitas",
    name: "Gravitas",
    year: 2025,
    location: "VIT Vellore",
    website: "https://vit.ac.in/campuslife/fests",
    status: "completed",
    videoUrls: [],
    summary: "VIT's biggest tech fest, 26–29 October 2025 — an outreach/exhibition event, not a competition Team Sammard enters.",
  },
  {
    id: "in-space",
    slug: "in-space",
    name: "IN-SPACe CanSat",
    year: 2025,
    location: "Kushinagar, Uttar Pradesh, India",
    website: "https://www.inspace.gov.in/",
    status: "completed",
    videoUrls: [],
    summary: "National-level CanSat competition, held 25–30 October 2025.",
  },
  {
    id: "irec",
    slug: "irec",
    name: "IREC",
    year: 2025,
    location: "Midland, Texas, USA",
    website: "https://www.esrarocket.org/",
    status: "completed",
    videoUrls: [],
    reportUrls: ["/assets/documentation/irec-2025-project-technical-report.pdf"],
    summary: "International Rocket Engineering Competition, held 18–22 June 2025 in Midland. Team Sammard flew Airavata: 1st in India (10K COTS category), Early Bird Award, ranked 28th globally in Design and Build Quality.",
  },
  {
    id: "cansat",
    slug: "cansat",
    name: "CanSat Competition",
    year: 2025,
    location: "Virginia, USA",
    website: "https://www.cansatcompetition.com/",
    status: "completed",
    videoUrls: [],
    summary: "NASA's \"CanSat 2025\" competition season. Team Sammard built a container–payload system with a coaxial contra-rotating autogyro for a controlled ~5 m/s descent, with dual cameras and real-time telemetry. The team didn't get to fly it at the finals: places at the launch were decided by a random draw, purely down to luck, and Team Sammard wasn't picked.",
  },
  {
    id: "sa-cup",
    slug: "sa-cup",
    name: "Spaceport America Cup",
    year: 2024,
    location: "New Mexico, USA",
    website: "https://www.esrarocket.org/",
    status: "completed",
    videoUrls: [],
    reportUrls: ["/assets/documentation/sa-cup-2024-project-technical-report.pdf"],
    summary: "The world's largest intercollegiate rocket engineering competition, held 10–12 June 2024. Team Sammard has competed multiple years, including launching Vajra (2023) and Agneya (2024); placed 23rd worldwide in 2022.",
  },
];
