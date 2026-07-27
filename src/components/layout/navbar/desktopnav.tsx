import { navLinks } from "./navdata";
import { NavLink } from "./navlinks";

/**
 * Centered link row, visible from md breakpoint up.
 * Hidden entirely below md — MobileNav takes over instead.
 */
export function DesktopNav() {
  return (
    <nav
      aria-label="Primary"
      className="hidden md:flex md:items-center md:gap-8"
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.href}
          link={link}
          className="relative py-1 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-foreground after:content-['']"
          activeClassName="text-foreground after:opacity-100"
          inactiveClassName="text-muted-foreground hover:text-foreground after:opacity-0"
        />
      ))}
    </nav>
  );
}