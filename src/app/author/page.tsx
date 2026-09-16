import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { AdBanner } from "@/components/ad-banner";
import { AUTHOR_EMAIL } from "@/app/layout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Author — Jacob Moses, Content Specialist",
  description:
    "Meet Jacob Moses, Content Specialist and founder of Moon Phase Emoji. Seven years of writing about astronomy, timekeeping, and the rituals that connect people to the night sky.",
  alternates: { canonical: "https://www.moonphaseemoji.com/author" },
  openGraph: {
    title: "About the Author — Jacob Moses",
    description:
      "Content Specialist and founder of Moon Phase Emoji. First-person bio, credentials, and editorial standards.",
    url: "https://www.moonphaseemoji.com/author",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: "https://www.moonphaseemoji.com/author",
  mainEntity: {
    "@type": "Person",
    "@id": "https://www.moonphaseemoji.com/#person",
    name: "Jacob Moses",
    jobTitle: "Content Specialist",
    email: `mailto:${AUTHOR_EMAIL}`,
    description:
      "Jacob Moses is a content specialist and the founder of Moon Phase Emoji. He writes about astronomy, time, and the rituals that connect people to the night sky.",
  },
};

export default function AuthorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow="Meet the author"
        title="About the person behind Moon Phase Emoji"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Author" }]}
      />

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm sm:p-10">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              {/* Avatar — moon emoji as placeholder headshot */}
              <div
                className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full border border-border/60 bg-background text-5xl"
                aria-hidden="true"
              >
                🌝
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Jacob Moses
                </h2>
                <p className="text-sm text-primary">
                  Content Specialist · Founder of Moon Phase Emoji
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Writing about astronomy, time, and the small daily rituals
                  that connect us to the sky since 2018.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Email:{" "}
                  <a
                    href={`mailto:${AUTHOR_EMAIL}`}
                    className="text-primary underline hover:no-underline"
                  >
                    {AUTHOR_EMAIL}
                  </a>
                </p>
              </div>
            </div>

            {/* First-person bio */}
            <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Hi, I&apos;m Jacob Moses — a content specialist with a long
                running obsession with the night sky. I built Moon Phase
                Emoji because the existing moon phase sites all seemed to make
                the simplest possible question unnecessarily complicated:{" "}
                <em className="text-foreground not-italic font-semibold">
                  what does the Moon look like right now?
                </em>{" "}
                I wanted a single emoji I could glance at and instantly know
                whether to expect a sliver of crescent or a sky-flooding
                full Moon.
              </p>
              <p>
                Before launching this site, I spent seven years writing about
                science and timekeeping for a range of digital publications.
                My work has covered everything from the history of leap
                seconds to how ancient Polynesian navigators used lunar
                cycles to cross the Pacific. That background is why every
                page here cites primary sources and explains the underlying
                math rather than just handing you a number.
              </p>
              <p>
                When I write a piece — whether it&apos;s the FAQ or a longer
                explainer on lunations — I follow three rules. First, I
                verify the astronomy against an authoritative reference (I
                keep a short list of these on the{" "}
                <Link
                  href="/sources"
                  className="text-primary underline"
                >
                  sources page
                </Link>
                ). Second, I write for a reader who has never opened an
                astronomy textbook; technical terms get explained in plain
                English the first time they appear. Third, I update pages
                when the science or the underlying data changes, and I
                leave a clear &quot;last updated&quot; date so you know how
                fresh the information is.
              </p>
              <p>
                I also read every message sent through the{" "}
                <Link href="/contact" className="text-primary underline">
                  contact page
                </Link>
                . If you spot an error, have a question, or want to suggest
                a feature, please write in — feedback from readers is what
                makes this site better over time.
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

          {/* Inline ad — 300×250 rectangle after the bio card */}
          <div className="my-12 flex justify-center">
            <AdBanner format="rectangle" />
          </div>

          {/* What I write about */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground">
              What I write about
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              My focus is the intersection of astronomy, timekeeping, and
              everyday life. On Moon Phase Emoji you&apos;ll find me
              explaining the eight lunar phases in plain English, breaking
              down why the synodic month differs from the sidereal month,
              and writing the occasional piece on how different cultures have
              historically structured their calendars around the Moon.
              Everything is written to be readable in five minutes but
              accurate enough to satisfy a working astronomer.
            </p>
          </div>

          {/* Editorial standards */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-foreground">
              Editorial standards
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Every page on this site is checked against at least one
              authoritative source before publication. When the underlying
              science or data changes — for example, when a new precision
              measurement of the synodic month is published — I update the
              affected pages and note the change in the page&apos;s
              &quot;last updated&quot; date. I do not accept sponsored
              content, paid placements, or affiliate links that could
              influence what I recommend.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
            <h2 className="text-2xl font-bold text-foreground">
              Want to get in touch?
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              I read every email personally. Whether you&apos;ve spotted a
              typo, have a feature request, or just want to say hello, the
              contact page is the fastest way to reach me.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Go to the contact page
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Inline ad — 728×90 leaderboard at the end of the author page */}
          <div className="my-12 flex justify-center">
            <AdBanner format="leaderboard" />
          </div>
        </div>
      </section>
    </>
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
