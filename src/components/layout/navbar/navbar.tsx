import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo }  from "./logo";
import { DesktopNav } from "./desktopnav";
import { MobileNav } from "./mobilenav";
import { ctaLink } from "./navdata";

/**
 * Site-wide navbar.
 * - Fixed to the top of the viewport, transparent background (no blur/backdrop
 *   so it stays truly see-through over hero content).
 * - Exactly 80px tall at every breakpoint.
 * - Desktop (md+): logo left, links centered, CTA right.
 * - Mobile (<md): logo left, hamburger right, links live in a slide-over Sheet.
 *
 * This is a server component itself; usePathname() and open/close state
 * are isolated inside the client children (NavLink, MobileNav).
 */
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 bg-transparent">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <DesktopNav />

        <div className="hidden md:block">
          <Button asChild>
            <Link href={ctaLink.href}>{ctaLink.label}</Link>
          </Button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}