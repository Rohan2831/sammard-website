"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, ctaLink } from "./navdata";
import { NavLink } from "./navlinks";
import { Logo } from "./logo";

/**
 * Hamburger trigger + slide-over Sheet, visible below the md breakpoint.
 * The Sheet closes itself whenever a link inside it is clicked.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="text-foreground hover:bg-foreground/10"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="flex w-4/5 flex-col sm:max-w-xs">
          <SheetHeader>
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <Logo />
          </SheetHeader>

          <nav aria-label="Mobile primary" className="mt-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                link={link}
                className="text-base"
                onNavigate={() => setOpen(false)}
              />
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <Button asChild className="w-full" onClick={() => setOpen(false)}>
              <a href={ctaLink.href}>{ctaLink.label}</a>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}