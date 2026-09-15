const FOOTER_LINKS = [
  {
    title: "Explore",
    links: [
      { href: "#moon-phases", label: "Moon phases" },
      { href: "#forecast", label: "7-day forecast" },
      { href: "#about", label: "About" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#author", label: "About the author" },
      { href: "#contact", label: "Contact us" },
      { href: "#sources", label: "Sources" },
    ],
  },
  {
    title: "Legal",
    links: [{ href: "#privacy", label: "Privacy policy" }],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-background/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Brand blurb */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl" role="img" aria-label="moon">
                🌙
              </span>
              <span className="text-base font-semibold text-foreground">
                Moon Phase Emoji
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The simplest way to see tonight&apos;s moon phase — rendered live
              as a single emoji and updated every minute, right in your browser.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border/40 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Moon Phase Emoji. All rights
            reserved.
          </p>
          <p>
            Written by{" "}
            <a href="#author" className="underline hover:text-primary">
              Jacob Moses
            </a>{" "}
            · Content Specialist
          </p>
        </div>
      </div>
    </footer>
  );
}
