import type { Sponsor, SponsorshipPackage } from "@/types";

// Names, descriptions, tiers and websites confirmed against teamsammard.com/sponsors
// (live production site, cross-referenced 2026-09). Logo files themselves are
// not scraped/copied — see ASSETS_NEEDED.md. "Aerospace Association of India"
// was previously dropped here as unverified; the live site confirms it's real,
// restored below (its own site links to a placeholder example.com, so no real
// website URL exists yet even on their side).
export const sponsors: Sponsor[] = [
  {
    id: "converge",
    name: "Converge",
    logoSrc: "/assets/images/sponsors/converge.png",
    logoAlt: "Converge company logo",
    tier: "platinum",
    description: "Leading aerospace manufacturing company providing materials and technical expertise.",
    website: "https://www.converge.com/",
  },
  {
    id: "solidworks",
    name: "SolidWorks",
    logoSrc: "/assets/images/sponsors/solidworks.png",
    logoAlt: "SolidWorks company logo",
    description: "Innovative space technology company supporting our propulsion systems development.",
    website: "https://www.solidworks.com/",
  },
  {
    id: "altium",
    name: "Altium Designer",
    logoSrc: "/assets/images/sponsors/altium.png",
    logoAlt: "Altium Designer company logo",
    description: "Electronics manufacturer providing components for our avionics systems.",
    website: "https://www.altium.com/",
  },
  {
    id: "altair",
    name: "Altair",
    logoSrc: "/assets/images/sponsors/altair.png",
    logoAlt: "Altair company logo",
    description: "Advanced materials supplier for our rocket airframes and structural components.",
    website: "https://altair.com/",
  },
  {
    id: "vit",
    name: "VIT University",
    logoSrc: "/assets/images/sponsors/vit.png",
    logoAlt: "VIT University logo",
    description: "Our home institution providing facilities, mentorship, and academic support.",
    website: "https://vit.ac.in/",
  },
  {
    id: "aerospace-association-of-india",
    name: "Aerospace Association of India",
    logoSrc: "/assets/images/sponsors/sponsor-six.png",
    logoAlt: "Aerospace Association of India logo",
    description: "National organization supporting collegiate aerospace initiatives.",
  },
];

// Tier names are spec'd in the project blueprint; benefits are not — TBD,
// see ASSETS_NEEDED.md (Sponsors Page). Note: the live site labels its actual
// current sponsors "Platinum" (Converge only) or generic "Partners" — it does
// not use Gold/Silver/Bronze for existing sponsors, so these tiers below are
// forward-looking packages offered to prospective sponsors, not a re-labeling
// of current ones.
export const sponsorshipPackages: SponsorshipPackage[] = [
  { tier: "platinum", title: "Platinum", benefits: ["Benefits — TBD, to be finalized with sponsorship lead"] },
  { tier: "gold", title: "Gold", benefits: ["Benefits — TBD, to be finalized with sponsorship lead"] },
  { tier: "silver", title: "Silver", benefits: ["Benefits — TBD, to be finalized with sponsorship lead"] },
  { tier: "bronze", title: "Bronze", benefits: ["Benefits — TBD, to be finalized with sponsorship lead"] },
];
