export interface NavLink {
    label: string;
    href: string;
}


export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Departments", href: "/departments" },
  { label: "Events", href: "/events" },
  { label: "Timeline", href: "/timeline" },
  { label: "Gallery", href: "/gallery" },
  { label: "Documentation", href: "/documentation" },
  { label: "Sponsors", href: "/sponsors" },
];
export const ctaLink = {
    label: "Join Us",
    href: "/join",
};
