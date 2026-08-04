import { navLinks } from "./navdata";
import { NavLink } from "./navlinks";
import styles from "./desktopnav.module.css";

/**
 * Centered link row, visible from md breakpoint up.
 * Hidden entirely below md — MobileNav takes over instead.
 */
export function DesktopNav() {
  return (
    <nav
      aria-label="Primary"
      className={styles.desktopNav}
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.href}
          link={link}
          className={styles.link}
          activeClassName={styles.active}
          inactiveClassName={styles.inactive}
        />
      ))}
    </nav>
  );
}