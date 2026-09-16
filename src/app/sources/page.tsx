import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { AuthorByline } from "@/components/author-byline";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Sources & References — Where Our Moon Phase Data Comes From",
  description:
    "Every fact on Moon Phase Emoji is checked against at least one authoritative source. Here are the references we recommend for digging deeper into lunar astronomy.",
  alternates: { canonical: "https://www.moonphaseemoji.com/sources" },
  openGraph: {
    title: "Sources & References",
    description:
      "The authoritative references behind every claim on Moon Phase Emoji.",
    url: "https://www.moonphaseemoji.com/sources",
  },
};

const SOURCES = [
  {
    name: "Moon Phase Emoji",
    url: "https://moonphaseemoji.com/",
    description:
      "Our companion site covering moon phase emoji in depth — including full emoji reference tables, copy-paste utilities, and historical moon phase dates for any day in the modern era.",
  },
  {
    name: "NASA Science — Moon Phases",
    url: "https://science.nasa.gov/moon/moon-phases/",
    description:
      "The official NASA Solar System Exploration reference on lunar phases, explaining the underlying Sun–Earth–Moon geometry, the eight canonical phases, and why the Moon's appearance changes throughout its 29.53-day cycle. Used as a primary astronomical reference for this site.",
  },
  {
    name: "Space.com — Moon Phases Explained",
    url: "https://www.space.com/18880-moon-phases.html",
    description:
      "A long-running, accessible explainer from Space.com that breaks down the eight lunar phases in plain English with illustrations. Useful for readers who want a visual, less technical introduction to the synodic cycle.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sources & References — Moon Phase Emoji",
  description:
    "The authoritative references behind every claim on Moon Phase Emoji.",
  url: "https://www.moonphaseemoji.com/sources",
  author: { "@id": "https://www.moonphaseemoji.com/#person" },
  publisher: { "@id": "https://www.moonphaseemoji.com/#organization" },
};

export default function SourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow="Sources & references"
        title="Where this information comes from"
        subtitle="Every fact on this site is checked against at least one of the authoritative sources below. If you'd like to dig deeper into lunar astronomy, these are the references we recommend starting with."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sources" }]}
      />

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <ol className="space-y-5">
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
            All external links open in a new tab. We are not affiliated with
            the publishers of these sources; they are listed here purely for
            transparency and reader reference.
          </p>

          <AuthorByline />
        </div>
      </section>
    </>
  );
}
