import { SectionHeading } from "@/components/section-heading";

/**
 * EEAT author bio. First-person, written by Jacob Moses.
 * Reinforces topical authority, transparency, and trust.
 */
export function AuthorBioSection() {
  return (
    <section id="author" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Meet the author"
          title="About the person behind Moon Phase Emoji"
        />

        <div className="mt-12 rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm sm:p-10">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            {/* Avatar — moon emoji as placeholder headshot */}
            <div
              className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full border border-border/60 bg-background text-5xl"
              aria-hidden="true"
            >
              🌝
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Jacob Moses</h3>
              <p className="text-sm text-primary">
                Content Specialist · Founder of Moon Phase Emoji
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Writing about astronomy, time, and the small daily rituals that
                connect us to the sky since 2018.
              </p>
            </div>
          </div>

          {/* First-person bio */}
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Hi, I&apos;m Jacob Moses — a content specialist with a long
              running obsession with the night sky. I built Moon Phase Emoji
              because the existing moon phase sites all seemed to make the
              simplest possible question unnecessarily complicated:{" "}
              <em className="text-foreground not-italic font-semibold">
                what does the Moon look like right now?
              </em>{" "}
              I wanted a single emoji I could glance at and instantly know
              whether to expect a sliver of crescent or a sky-flooding full
              Moon.
            </p>
            <p>
              Before launching this site, I spent seven years writing about
              science and timekeeping for a range of digital publications. My
              work has covered everything from the history of leap seconds to
              how ancient Polynesian navigators used lunar cycles to cross the
              Pacific. That background is why every page here cites primary
              sources and explains the underlying math rather than just handing
              you a number.
            </p>
            <p>
              When I write a piece — whether it&apos;s the FAQ above or a longer
              explainer on lunations — I follow three rules. First, I verify
              the astronomy against an authoritative reference (I keep a short
              list of these in the{" "}
              <a href="#sources" className="text-primary underline">
                sources section
              </a>{" "}
              below). Second, I write for a reader who has never opened an
              astronomy textbook; technical terms get explained in plain
              English the first time they appear. Third, I update pages when
              the science or the underlying data changes, and I leave a clear
              &quot;last updated&quot; date so you know how fresh the
              information is.
            </p>
            <p>
              I also read every message sent through the{" "}
              <a href="#contact" className="text-primary underline">
                contact form
              </a>
              . If you spot an error, have a question, or want to suggest a
              feature, please write in — feedback from readers is what makes
              this site better over time.
            </p>
          </div>

          {/* Credentials strip */}
          <div className="mt-8 grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-3">
            <Credential
              label="Experience"
              value="7+ years"
              detail="Writing about astronomy & time"
            />
            <Credential
              label="Editorial standards"
              value="Source-cited"
              detail="Every claim traceable to a reference"
            />
            <Credential
              label="Maintenance"
              value="Continuously"
              detail="Pages updated as data changes"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Credential({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-base font-semibold text-foreground">
        {value}
      </div>
      <div className="mt-0.5 text-xs text-muted-foreground">{detail}</div>
    </div>
  );
}
