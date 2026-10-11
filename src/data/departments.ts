import type { Department } from "@/types";

// The team's 5 domains, named and ordered as in the team's brochure:
// Mechanical, Electronics, Computer Science, Propulsion, Management. Management's copy
// (overview, five areas, skills, technologies) and Computer Science's
// overview are the team's own (2026-10); everything else is still a labeled
// placeholder. See ASSETS_NEEDED.md (Departments Page).
const PLACEHOLDER = {
  overview: "Overview — TBD",
  responsibilities: ["Responsibility — TBD"],
  skills: ["Skill — TBD"],
  technologies: ["Technology — TBD"],
  majorProjects: ["Project — TBD"],
};

type DepartmentContent = Partial<Omit<Department, "id" | "slug" | "name" | "coverImage">>;

const content: Record<string, DepartmentContent> = {
  "computer-science": {
    overview:
      "Computer Science serves as the central nervous system of the rocket, providing the core infrastructure required to execute mission-critical functions. From firmware synchronizing onboard PCBs to control algorithms driving active subsystems like the Airbrakes and the Antenna Tracking System (ATS), software ensures precision across every flight phase. Our custom Ground Control Station (GCS) delivers real-time telemetry visualization and graphical data analysis, for seamless mission monitoring and post-flight evaluation.",
  },
  management: {
    overview:
      "Management is the backbone of Team Sammard. No rocket reaches the launch rail without it: before anything is built it has to be funded, registered, shipped and permitted, and every one of those steps runs through Management. The division spans five areas — logistics covers everything from registration to transport, finance handles budgeting and shipping, design runs our social media handles, creative writing manages mailing and permissions, and public relations secures the sponsorships and partnerships that pay for the work. Together, they keep the team organised, funded, and focused, so the engineers can stay on the engineering.",
    responsibilities: [
      "Logistics — competition registration through to transport",
      "Finance — budgeting and shipping",
      "Design — the team's social media handles",
      "Creative writing — mailing and permissions",
      "Public relations — sponsorships and partnerships",
    ],
    skills: [
      "Finance & Budgeting",
      "Logistics",
      "Graphic Design",
      "UI/UX",
      "Content Writing",
      "Social Media",
      "Public Relations",
      "Sponsorship & Negotiation",
      "Project Management",
    ],
    technologies: [
      "Figma",
      "Adobe Photoshop",
      "Canva",
      "DaVinci Resolve",
      "Adobe Premiere Pro",
      "Blender",
      "MS Excel",
      "MS Word",
      "MS PowerPoint",
    ],
    // No "major projects" for Management (per the team): its work is what lets every project happen.
    majorProjects: undefined,
  },
};

export const departments: Department[] = [
  { slug: "mechanical", name: "Mechanical" },
  { slug: "electronics", name: "Electronics" },
  { slug: "computer-science", name: "Computer Science" },
  { slug: "propulsion", name: "Propulsion" },
  { slug: "management", name: "Management" },
].map(({ slug, name }) => ({
  id: `department-${slug}`,
  slug,
  name,
  coverImage: `/assets/departments/${slug}.jpg`,
  ...PLACEHOLDER,
  ...content[slug],
}));
