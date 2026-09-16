import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { AuthorByline } from "@/components/author-byline";
import { AdBanner } from "@/components/ad-banner";
import { ForecastSection } from "@/components/sections/forecast";

export const metadata: Metadata = {
  title: "7-Day Moon Phase Forecast — See the Moon Every Night This Week",
  description:
    "A day-by-day look at how the Moon will look in your sky over the coming week — each day's phase emoji, illumination percentage, and moon age. Updated daily.",
  alternates: { canonical: "https://www.moonphaseemoji.com/forecast" },
  openGraph: {
    title: "7-Day Moon Phase Forecast",
    description:
      "See exactly how the Moon will look in your sky every night for the next 7 days.",
    url: "https://www.moonphaseemoji.com/forecast",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "7-Day Moon Phase Forecast",
  description:
    "Day-by-day moon phase forecast for the next 7 days with emoji and illumination.",
  url: "https://www.moonphaseemoji.com/forecast",
  author: { "@id": "https://www.moonphaseemoji.com/#person" },
  publisher: { "@id": "https://www.moonphaseemoji.com/#organization" },
};

export default function ForecastPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow="7-Day Outlook"
        title="Moon Phase Forecast for the Next Week"
        subtitle="A day-by-day look at how the Moon will look in your sky over the coming week. Each entry shows the emoji you'd see that night, the illumination percentage, and the moon's age in days since the last new moon."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "7-Day Forecast" },
        ]}
      />

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Inline ad — 728×90 leaderboard above the forecast grid */}
          <div className="mb-12 flex justify-center">
            <AdBanner format="leaderboard" />
          </div>

          <ForecastSection />

          {/* Inline ad — 300×250 rectangle between forecast and explainer */}
          <div className="my-12 flex justify-center">
            <AdBanner format="rectangle" />
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground">
              How to read this forecast
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Each card above represents one day, starting with today. The
                large emoji is the moon phase you&apos;d see that evening, the
                illumination bar shows what fraction of the Moon&apos;s visible
                face is lit by the Sun (0% at New Moon, 100% at Full Moon), and
                the moon age counts the days since the most recent New Moon.
              </p>
              <p>
                The Moon moves noticeably from night to night, but the
                difference is most dramatic around the quarter phases (when
                illumination is near 50%) and most subtle near the Full and
                New Moons. If you&apos;re planning a stargazing trip, look for
                nights close to the New Moon for the darkest skies.
              </p>
              <p>
                All times are calculated locally in your browser using UTC and
                the standard 29.53-day synodic month, anchored to the J2000
                reference New Moon of 6 January 2000, 18:14 UTC.
              </p>
            </div>
          </div>

          {/* Inline ad — 300×250 rectangle at the end of the explainer content */}
          <div className="my-12 flex justify-center">
            <AdBanner format="rectangle" />
          </div>

          <AuthorByline />
        </div>
      </section>
    </>
  );
}
