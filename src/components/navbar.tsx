"use client";

import { useState } from "react";
import { Menu, X, Moon } from "lucide-react";

const NAV_LINKS = [
  { href: "#moon-phases", label: "Moon Phases" },
  { href: "#forecast", label: "7-Day Forecast" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
  { href: "#privacy", label: "Privacy" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2 font-semibold text-foreground"
          aria-label="Moon Phase Emoji — home"
        >
          <Moon className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="text-base">Moon Phase Emoji</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border/40 bg-background md:hidden"
        >
          <ul className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
