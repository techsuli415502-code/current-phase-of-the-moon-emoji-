import { SectionHeading } from "@/components/section-heading";
import { ExternalLink } from "lucide-react";

const SOURCES = [
  {
    name: "Moon Phase Emoji",
    url: "https://www.moonphaseemoji.com/",
    description:
      "Our companion site covering moon phase emoji in depth — including full emoji reference tables, copy-paste utilities, and historical moon phase dates for any day in the modern era.",
  },
  {
    name: "timeanddate.com — Moon Phases",
    url: "https://www.timeanddate.com/moon/phases/",
    description:
      "A long-standing, authoritative reference for moonrise, moonset, and exact phase times for any location on Earth. We cross-check our illumination percentages against the data published here on a regular schedule.",
  },
  {
    name: "Wikipedia — Lunar Phase",
    url: "https://en.wikipedia.org/wiki/Lunar_phase",
    description:
      "The encyclopaedic overview of the lunar cycle, including the underlying geometry, the eight canonical phases, and the formulas used to calculate the Moon's phase at any given moment in time.",
  },
];

export function SourcesSection() {
  return (
    <section id="sources" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Sources & references"
          title="Where this information comes from"
          subtitle="Every fact on this site is checked against at least one of the authoritative sources below. If you'd like to dig deeper into lunar astronomy, these are the references we recommend starting with."
        />

        <ol className="mt-12 space-y-5">
          {SOURCES.map((source, idx) => (
            <li
              key={source.url}
              className="phase-card flex flex-col gap-3 rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm sm:flex-row sm:items-start"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                {idx + 1}
              </div>
              <div className="flex-1">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-base font-semibold text-foreground hover:text-primary"
                >
                  {source.name}
                  <ExternalLink
                    className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {source.description}
                </p>
                <p className="mt-2 break-all text-xs text-muted-foreground/70">
                  {source.url}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          All external links open in a new tab. We are not affiliated with the
          publishers of these sources; they are listed here purely for
          transparency and reader reference.
        </p>
      </div>
    </section>
  );
}
