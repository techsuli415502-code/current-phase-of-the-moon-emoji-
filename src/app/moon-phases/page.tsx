import type { Metadata } from "next";
import { ALL_MOON_PHASES } from "@/lib/moon-phase";
import { PageHeader } from "@/components/page-header";
import { AuthorByline } from "@/components/author-byline";
import { AdBanner } from "@/components/ad-banner";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "All 8 Moon Phases Explained with Emojis",
  description:
    "The complete guide to the 8 lunar phases — New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Last Quarter, and Waning Crescent. Each phase explained with its emoji, cycle position, and astronomical meaning.",
  alternates: { canonical: "https://www.moonphaseemoji.com/moon-phases" },
  openGraph: {
    title: "All 8 Moon Phases Explained with Emojis",
    description:
      "From New Moon to Waning Crescent — every lunar phase explained with its emoji and meaning.",
    url: "https://www.moonphaseemoji.com/moon-phases",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "All 8 Moon Phases Explained with Emojis",
  description:
    "The complete guide to the 8 lunar phases with their corresponding emojis.",
  url: "https://www.moonphaseemoji.com/moon-phases",
  author: { "@id": "https://www.moonphaseemoji.com/#person" },
  publisher: { "@id": "https://www.moonphaseemoji.com/#organization" },
};

export default function MoonPhasesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow="The 8 Lunar Phases"
        title="Every Moon Phase Emoji Explained"
        subtitle="The Moon completes one full synodic cycle every 29.53 days. As it orbits Earth, the angle between the Sun, Earth, and Moon changes — and so does the visible slice of the Moon that sunlight reaches. These eight snapshots are the canonical phases astronomers and calendar-makers have used for centuries."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Moon Phases" },
        ]}
      />

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ALL_MOON_PHASES.map((phase, idx) => (
              <article
                key={phase.key}
                id={phase.key}
                className="phase-card scroll-mt-20 rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="text-5xl"
                    role="img"
                    aria-label={`${phase.name} emoji`}
                  >
                    {phase.emoji}
                  </span>
                  <span className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    Phase {idx + 1}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-foreground">
                  {phase.name}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Cycle position: {Math.round(phase.phaseValue * 100)}%
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {phase.description}
                </p>
              </article>
            ))}
          </div>

          {/* Inline ad — 300×250 rectangle between phase grid and long-form content */}
          <div className="my-12 flex justify-center">
            <AdBanner format="rectangle" />
          </div>

          {/* Long-form SEO content */}
          <article className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground">
              How the moon phase cycle actually works
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                The lunar cycle — also called a lunation — averages 29.53 days
                from one New Moon to the next. This period is known as the
                synodic month, and it is longer than the Moon&apos;s actual
                orbital period around Earth (27.32 days, the sidereal month)
                because Earth itself is moving along its orbit around the Sun
                during that time.
              </p>
              <p>
                Each of the eight canonical phases corresponds to a specific
                geometric arrangement of the Sun–Earth–Moon system. When the
                Moon sits between Earth and the Sun, its illuminated
                hemisphere faces away from us, producing the New Moon (🌑).
                Roughly seven days later, the Moon has moved a quarter of the
                way around its orbit, and we see half of its illuminated face
                — the First Quarter (🌓). At the halfway point, Earth sits
                between the Sun and Moon, and the full visible disk is lit: the
                Full Moon (🌕). The cycle then reverses through the waning
                phases until the next New Moon.
              </p>
              <p>
                Knowing the current phase of the moon emoji is more than a
                curiosity — it is useful for photographers planning moonlit
                landscapes, fishermen tracking feeding patterns, gardeners who
                follow biodynamic calendars, and anyone who simply enjoys
                looking up. Our calculator uses the well-established J2000
                reference new moon (6 January 2000, 18:14 UTC) and computes
                the exact phase for any moment in your browser, with no
                external API call required.
              </p>
            </div>

            <div className="mt-8 rounded-xl border border-border/60 bg-card/40 p-6">
              <h3 className="text-lg font-bold text-foreground">
                Want the live emoji for right now?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Head back to the home page to see today&apos;s moon phase
                rendered live as a single emoji, updated every minute.
              </p>
              <Link
                href="/"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                See the live moon phase
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* Inline ad — 728×90 leaderboard at the end of the long-form content */}
          <div className="my-12 flex justify-center">
            <AdBanner format="leaderboard" />
          </div>

          <AuthorByline />
        </div>
      </section>
    </>
  );
}
