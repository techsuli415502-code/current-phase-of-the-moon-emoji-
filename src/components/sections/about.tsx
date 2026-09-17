import { SectionHeading } from "@/components/section-heading";
import { Sparkles, Clock, Globe2, Code2 } from "lucide-react";

const FEATURES = [
  {
    icon: Clock,
    title: "Real-time, no refresh needed",
    text: "Our calculator recomputes the moon phase every minute, so the emoji on screen is always the phase happening right now — not a cached snapshot from a server.",
  },
  {
    icon: Globe2,
    title: "Works anywhere on Earth",
    text: "Because the calculation runs in your browser using UTC time, you get the same accurate result whether you're in New York, Karachi, Tokyo, or a remote mountain cabin with patchy internet.",
  },
  {
    icon: Code2,
    title: "Open, transparent algorithm",
    text: "We use the well-documented J2000 synodic-month method. No proprietary black boxes, no third-party API calls — every number is reproducible with basic astronomy formulas.",
  },
  {
    icon: Sparkles,
    title: "Built for emoji lovers",
    text: "Each of the eight lunar phases maps to its official Unicode emoji, so you can copy the current moon phase and paste it into a tweet, a message, a calendar entry, or a journal.",
  },
];

/**
 * About / "Why use this site" section. Combines feature highlights with
 * long-form explanatory content for SEO depth and E-E-A-T.
 */
export function AboutSection() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About this site"
          title="A simple, accurate, and beautiful moon phase emoji tool"
          subtitle="Moon Phase Emoji exists for one reason: to show you exactly what the Moon looks like right now, in a single glance, using the universal language of emoji. No clutter, no sign-up, no distraction."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="phase-card rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm"
              >
                <div className="inline-flex rounded-lg bg-primary/10 p-3">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-bold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <article>
            <h3 className="text-2xl font-bold text-foreground">
              Why people check the current moon phase
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The Moon has shaped human routines for as long as we&apos;ve
              looked up. Farmers planted by it, sailors navigated by it, and
              entire calendars — Islamic, Hebrew, Chinese, Hindu — are still
              built around its 29.53-day cycle. Today, the practical reasons
              for knowing the phase are just as varied.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Astrophotographers wait for the thin crescent after a New Moon to
              capture earthshine; landscape photographers chase the golden
              light of a Waxing Gibbous; deep-sky observers prefer the dark
              skies of a New Moon. Anglers, hunters, and birders track moon
              phase because it changes animal behaviour. And then there are the
              millions of us who simply like to know what we&apos;ll see when
              we step outside tonight.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Whatever your reason, a quick emoji is the fastest possible
              answer. No chart to read, no number to convert — just a glance
              and you know.
            </p>
          </article>

          <article>
            <h3 className="text-2xl font-bold text-foreground">
              How accurate is the calculation?
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The formula used here is the standard approximation taught in
              most introductory astronomy courses. It anchors the cycle to a
              precisely known New Moon (6 January 2000, 18:14 UTC) and divides
              elapsed time by the mean synodic month of 29.530588853 days.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              This produces a phase angle that is typically accurate to within
              a few hours for any date in the modern era. For comparison, the
              Moon&apos;s orbit isn&apos;t perfectly circular, so the actual
              moment of a given phase can shift by up to about 7 hours from the
              mean. If you need second-precision times — for example, the
              exact instant of a lunar eclipse — consult a professional
              astronomical almanac or one of the sources listed below.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              For everyday curiosity, planning a photo walk, or deciding
              whether to expect moonlight on your evening hike, this
              approximation is more than sufficient.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
