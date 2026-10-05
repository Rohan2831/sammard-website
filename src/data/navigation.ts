import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { NavLink, SocialLink, ContactInfo } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Departments", href: "/departments" },
  { label: "Events", href: "/events" },
  { label: "Timeline", href: "/timeline" },
  { label: "Gallery", href: "/gallery" },
  { label: "Sponsors", href: "/sponsors" },
];

export const ctaLink: NavLink = {
  label: "Join Us",
  href: "/join",
};

export const quickLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Departments", href: "/departments" },
  { label: "Events", href: "/events" },
  { label: "Timeline", href: "/timeline" },
  { label: "Gallery", href: "/gallery" },
  { label: "Documentation", href: "/documentation" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
];

// Confirmed against teamsammard.com (live production site footer,
// cross-referenced 2026-09) — resolves the navbar-vs-footer conflict flagged
// earlier in favor of these verified values. YouTube removed (2026-09) — the
// team confirmed they don't have one; the old link was never actually real.
export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/team_sammard/", icon: FaInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/teamsammardrocketry/", icon: FaLinkedin },
  { label: "Twitter / X", href: "https://x.com/TeamSammard", icon: FaXTwitter },
];

export const CONTACT_EMAIL = "teamsammard@gmail.com";

export const contactInfo: ContactInfo = {
  email: CONTACT_EMAIL,
  phone: "+91-8095390385",
  addressLines: ["Creation Labs, VIT Vellore", "Vellore, Tamil Nadu, India"],
};
