import type { Department } from "@/types";

// Department names confirmed by the team (2026-09), sourced from Udbhava's
// Project Technical Report — Team Sammard is organized into 5 divisions:
// Mechanical, Propulsion, Electrical, CS, and Management. Overview,
// responsibilities, skills, technologies, and major projects per department
// still aren't published/supplied — left as labeled placeholders. See
// ASSETS_NEEDED.md (Departments Page).
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
  coverImage: "/assets/images/teampic1.JPG",
  overview: "Overview — TBD",
  responsibilities: ["Responsibility — TBD"],
  skills: ["Skill — TBD"],
  technologies: ["Technology — TBD"],
  majorProjects: ["Project — TBD"],
}));
