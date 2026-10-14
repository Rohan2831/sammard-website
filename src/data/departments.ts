import type { Department } from "@/types";

// The team's 5 domains, named and ordered as in the team's brochure:
// Mechanical, Electronics, Computer Science, Propulsion, Management. All copy
// below is the team's own (2026-10), condensed into lists where needed.
// Computer Science's skills/technologies were extrapolated from its overview
// plus the methods the team named (Arduino, STM32, EKF, MPC, DMI, PID, Mahony
// and complementary filters, OOB detection) and this website's own stack. See ASSETS_NEEDED.md (Departments page).
// No "major projects" section for any department (per the team).
const PLACEHOLDER = {
  overview: "Overview — TBD",
  responsibilities: ["Responsibility — TBD"],
  skills: ["Skill — TBD"],
  technologies: ["Technology — TBD"],
};

type DepartmentContent = Partial<Omit<Department, "id" | "slug" | "name" | "coverImage">>;

const content: Record<string, DepartmentContent> = {
  mechanical: {
    overview:
      "The Mechanical Department designs, manufactures, simulates and tests the rocket's structural and aerodynamic systems and its recovery, so the rocket is structurally sound, flies stably and comes back safely.",
    responsibilities: [
      "Nose cone layup, and fibreglass body tube fabrication and integration",
      "Fin manufacturing and fin can assembly",
      "CAD design of 3D-printable components",
      "ANSYS aerodynamic analysis and OpenRocket flight-performance and stability simulations",
      "Arranging onboard subsystems for suitable centre of pressure (CP) and centre of gravity (CG) positions",
      "Parachute and deployment-system design, integration and recovery testing",
      "Structural strength testing of motor tubes",
    ],
    skills: [
      "CAD Modelling, 3D Design and Component Integration",
      "Aerodynamic Design, ANSYS and OpenRocket Simulations",
      "Composite Manufacturing and Fibreglass Layup",
      "Rocket Stability Analysis (CG/CP) and Structural Testing",
      "Parachute Design, Deployment and Recovery Systems",
    ],
    technologies: [
      "CAD and design — SolidWorks",
      "Simulation — ANSYS, OpenRocket",
      "Manufacturing — fibreglass layup, composite fabrication, 3D printing",
      "Analysis — aerodynamics, CG/CP analysis, structural strength testing",
      "Recovery systems — parachute design, deployment mechanisms, recovery testing",
    ],
  },
  electronics: {
    overview:
      "The Electronics Department designs, fabricates, integrates and tests the antennas and electronic systems behind Team Sammard's rockets and ground operations — enabling flight monitoring, payload operation, motor performance characterisation, onboard power management, telemetry, antenna tracking, and locating the rocket after landing.",
    responsibilities: [
      "Avionics and the flight computer",
      "Payload electronics",
      "Data Acquisition (DAQ) PCB for thrust and impulse measurement during motor tests",
      "Airbrakes PCB",
      "Battery Management System (BMS)",
      "Shrota telemetry receiver and the Shrota Pro recovery assistance system",
      "Antenna Tracking System (ATS) PCB and antennas",
    ],
    skills: [
      "PCB Design, Embedded Systems and Firmware Development",
      "Avionics, Flight Computer and Sensor Integration",
      "Data Acquisition, Instrumentation and Testing",
      "Telemetry, RF Communication and Antenna Design",
      "Power Management, BMS and Motor Control Systems",
      "Antenna Tracking and Recovery Assistance Systems",
    ],
    technologies: [
      "PCB design — KiCad, Altium Designer",
      "Data acquisition — sensors, ADC, signal processing, instrumentation",
      "Communication systems — RF, GPS, telemetry, antenna design and testing",
      "System integration — BMS, flight computers, motor drivers, antenna tracking systems",
    ],
  },
  propulsion: {
    overview:
      "The Propulsion Department simulates, designs, manufactures and safely tests Team Sammard's SRAD (student researched and developed) rocket motors — a major source of pride for the team.",
    responsibilities: [
      "Thrust plate manufacturing",
      "Motor liner fabrication",
      "Nozzle simulation and manufacturing",
      "Heat and mass transfer (HMT) and CFD simulations to analyse and optimise motor performance",
      "Building and running the in-house motor test stand — measuring thrust and calculating total impulse to validate each motor",
    ],
    skills: [
      "SRAD Rocket Motor Design, Development and Manufacturing",
      "CFD, Thermal and Heat Transfer Simulations",
      "Nozzle Design, Analysis and Manufacturing",
      "Propulsion Component Fabrication and Integration",
      "Test Stand Development, Thrust Measurement and Performance Analysis",
    ],
    technologies: [
      "CAD and design — SolidWorks for motor components, including nozzles and thrust plates",
      "Simulation — ANSYS CFD, thermal analysis, heat and mass transfer (HMT)",
      "Testing and instrumentation — thrust stands, DAQ systems",
      "Performance analysis — thrust-time curves, total impulse calculation, experimental validation",
    ],
  },
  "computer-science": {
    overview:
      "Computer Science serves as the central nervous system of the rocket, providing the core infrastructure required to execute mission-critical functions. From firmware synchronizing onboard PCBs to control algorithms driving active subsystems like the Airbrakes and the Antenna Tracking System (ATS), software ensures precision across every flight phase. Additionally, our custom Ground Control Station (GCS) delivers real-time telemetry visualization and graphical data analysis, ensuring seamless mission monitoring and post-flight evaluation.",
    responsibilities: [
      "Firmware synchronizing the rocket's onboard PCBs",
      "Control algorithms for active subsystems — the Airbrakes and the Antenna Tracking System (ATS)",
      "Our custom Ground Control Station (GCS): real-time telemetry visualization and graphical data analysis for mission monitoring and post-flight evaluation",
    ],
    skills: [
      "Embedded Firmware Development for Onboard PCBs (Arduino, STM32)",
      "State Estimation and Sensor Fusion (EKF, Mahony and Complementary Filters)",
      "Control Systems Design (PID, MPC, Direct Model Inversion) for Airbrakes and Antenna Tracking",
      "Flight Safety Logic and Out-of-Bounds (OOB) Detection",
      "Ground Control Station Software, Real-Time Telemetry and Data Visualization",
      "Full-Stack Web Development, including this website",
    ],
    technologies: [
      "Embedded — Arduino, STM32",
      "Estimation and filtering — Extended Kalman Filter (EKF), Mahony filter, complementary filter",
      "Control — PID, Model Predictive Control (MPC), Direct Model Inversion (DMI)",
      "Flight safety — out-of-bounds (OOB) detection",
      "Ground Control Station — real-time telemetry visualization, graphical data analysis",
      "Web framework — Next.js (App Router, React Server Components, static generation), React, TypeScript",
      "Web styling and UI — CSS Modules, Tailwind CSS, Radix UI",
      "3D and animation — three.js with React Three Fiber and drei (Draco-compressed glTF models), GSAP with ScrollTrigger, Lenis smooth scrolling",
      "Forms and validation — React Hook Form, Zod",
      "Hosting and tooling — Vercel (deployment, image optimization), Git and GitHub, ESLint",
    ],
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
