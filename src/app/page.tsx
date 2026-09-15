import { Hero } from "@/components/sections/hero";
import Link from "next/link";
import { ALL_MOON_PHASES } from "@/lib/moon-phase";
import { ArrowRight, CalendarDays, HelpCircle, Mail, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Current Phase of the Moon Emoji — Live Moon Phase Emoji Updated Every Minute",
  description:
    "See the current phase of the moon emoji live — updated every minute with real-time illumination, moon age, and a 7-day forecast. Free, accurate, no sign-up.",
  alternates: { canonical: "https://www.moonphaseemoji.com/" },
};

const FEATURED_LINKS = [
  {
    href: "/moon-phases",
    icon: BookOpen,
    title: "All 8 moon phases",
    description:
      "From the invisible New Moon to the sky-flooding Full Moon — every phase explained with its emoji.",
  },
  {
    href: "/forecast",
    icon: CalendarDays,
    title: "7-day forecast",
    description:
      "See exactly how the Moon will look in your sky every night for the coming week.",
  },
  {
    href: "/faq",
    icon: HelpCircle,
    title: "Moon phase FAQ",
    description:
      "Quick, no-nonsense answers to the questions visitors ask us most often.",
  },
  {
    href: "/contact",
    icon: Mail,
    title: "Contact us",
    description:
      "Spotted a bug, got a feature idea, or want to say hello? We read every message.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Featured section previews */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Explore the site
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Everything you need to track the Moon
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Beyond the live emoji above, the site breaks down every phase,
              forecasts the week ahead, and answers the questions that come up
              most often.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="phase-card group flex flex-col rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm"
                >
                  <div className="inline-flex w-fit rounded-lg bg-primary/10 p-3">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:underline">
                    Read more
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Preview: 8 phases at a glance */}
          <div className="mt-16 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-10">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  The 8 moon phase emojis at a glance
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tap any phase for the full explanation.
                </p>
              </div>
              <Link
                href="/moon-phases"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                View all 8 phases
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-4 sm:grid-cols-8">
              {ALL_MOON_PHASES.map((phase) => (
                <Link
                  key={phase.key}
                  href={`/moon-phases#${phase.key}`}
                  className="flex flex-col items-center gap-2 rounded-lg p-3 text-center transition-colors hover:bg-secondary"
                >
                  <span
                    className="text-3xl sm:text-4xl"
                    role="img"
                    aria-label={`${phase.name} emoji`}
                  >
                    {phase.emoji}
                  </span>
                  <span className="text-[10px] leading-tight text-muted-foreground">
                    {phase.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
