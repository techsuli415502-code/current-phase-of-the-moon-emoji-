import { ALL_MOON_PHASES } from "@/lib/moon-phase";
import { SectionHeading } from "@/components/section-heading";

/**
 * Educational section explaining the 8 phases of the moon.
 * Strong SEO content with each phase's emoji, name, and description.
 */
export function MoonPhasesSection() {
  return (
    <section id="moon-phases" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The 8 Lunar Phases"
          title="Every Moon Phase Emoji Explained"
          subtitle="The Moon completes one full synodic cycle every 29.53 days. As it orbits Earth, the angle between the Sun, Earth, and Moon changes — and so does the visible slice of the Moon that sunlight reaches. These eight snapshots are the canonical phases astronomers and calendar-makers have used for centuries."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ALL_MOON_PHASES.map((phase, idx) => (
            <article
              key={phase.key}
              className="phase-card rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm"
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
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {phase.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Cycle position: {Math.round(phase.phaseValue * 100)}%
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {phase.description}
              </p>
            </article>
          ))}
        </div>

        {/* Long-form SEO paragraph */}
        <div className="mt-16 max-w-3xl mx-auto prose prose-invert">
          <h3 className="text-2xl font-bold text-foreground">
            How the moon phase cycle actually works
          </h3>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            The lunar cycle — also called a lunation — averages 29.53 days from
            one New Moon to the next. This period is known as the synodic
            month, and it is longer than the Moon&apos;s actual orbital period
            around Earth (27.32 days, the sidereal month) because Earth itself
            is moving along its orbit around the Sun during that time.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Each of the eight canonical phases corresponds to a specific
            geometric arrangement of the Sun–Earth–Moon system. When the Moon
            sits between Earth and the Sun, its illuminated hemisphere faces
            away from us, producing the New Moon (🌑). Roughly seven days
            later, the Moon has moved a quarter of the way around its orbit,
            and we see half of its illuminated face — the First Quarter (🌓).
            At the halfway point, Earth sits between the Sun and Moon, and the
            full visible disk is lit: the Full Moon (🌕). The cycle then
            reverses through the waning phases until the next New Moon.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Knowing the current phase of the moon emoji is more than a
            curiosity — it is useful for photographers planning moonlit
            landscapes, fishermen tracking feeding patterns, gardeners who
            follow biodynamic calendars, and anyone who simply enjoys looking
            up. Our calculator uses the well-established J2000 reference new
            moon (6 January 2000, 18:14 UTC) and computes the exact phase for
            any moment in your browser, with no external API call required.
          </p>
        </div>
      </div>
    </section>
  );
}
