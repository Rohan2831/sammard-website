import type { Department } from "@/types";

// The team's 5 real divisions, confirmed by the team from Udbhava's PTR:
// Mechanical, Propulsion, Electrical, CS, and Management. Management's copy
// is the team's own (2026-10); the other four divisions' overview,
// responsibilities, skills, technologies, and major projects still aren't
// supplied — left as labeled placeholders. See ASSETS_NEEDED.md (Departments Page).
const PLACEHOLDER = {
  overview: "Overview — TBD",
  responsibilities: ["Responsibility — TBD"],
  skills: ["Skill — TBD"],
  technologies: ["Technology — TBD"],
  majorProjects: ["Project — TBD"],
};

type DepartmentContent = Partial<Omit<Department, "id" | "slug" | "name" | "coverImage">>;

const content: Record<string, DepartmentContent> = {
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
    // No "major projects" for Management (per the team): its work is what lets every project happen.
    majorProjects: undefined,
  },
};

export const departments: Department[] = [
  { slug: "mechanical", name: "Mechanical" },
  { slug: "propulsion", name: "Propulsion" },
  { slug: "electrical", name: "Electrical" },
  { slug: "cs", name: "CS" },
  { slug: "management", name: "Management" },
].map(({ slug, name }) => ({
  id: `department-${slug}`,
  slug,
  name,
  coverImage: `/assets/departments/${slug}.jpg`,
  ...PLACEHOLDER,
  ...content[slug],
}));
