import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { AuthorByline } from "@/components/author-byline";
import { AdBanner } from "@/components/ad-banner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What is the current phase of the moon emoji?",
    a: "The exact emoji shown at the top of the home page is computed live, in your browser, for the precise moment you loaded it. The Moon cycles through eight canonical phases — 🌑 New Moon, 🌒 Waxing Crescent, 🌓 First Quarter, 🌔 Waxing Gibbous, 🌕 Full Moon, 🌖 Waning Gibbous, 🌗 Last Quarter, and 🌘 Waning Crescent — and the one displayed corresponds to where the Moon is right now in that 29.53-day cycle.",
  },
  {
    q: "How often does the moon phase change?",
    a: "Technically, the Moon's phase is changing continuously — every minute it is fractionally more (or less) illuminated. In practice, you'll notice a visible change in the emoji roughly every 3 to 4 days. The cycle from one New Moon to the next takes 29.53 days on average, so each of the eight named phases lasts about 3.7 days.",
  },
  {
    q: "Why are there only eight moon phase emojis?",
    a: "Unicode defines eight discrete moon emojis that correspond to the eight canonical lunar phases recognized by astronomers since antiquity. While the actual Moon is a smooth continuum of illumination, the eight-emoji system gives a useful snapshot. For finer detail, look at the illumination percentage shown alongside the emoji on the home page.",
  },
  {
    q: "Is the moon phase the same everywhere on Earth?",
    a: "Yes — the Moon's phase is a global phenomenon because it depends only on the Sun–Earth–Moon geometry, not on your location. What differs by location is the local time the Moon rises and sets, and whether it is visible at a given moment. The emoji you see on this site is correct no matter where you are on the planet.",
  },
  {
    q: "What does 'moon age' mean?",
    a: "Moon age is the number of days since the most recent New Moon. A moon age of 0 means it is exactly New Moon; a moon age of about 14.8 means it is Full Moon; and a moon age approaching 29.5 means the cycle is about to restart. It is a convenient way to express how far along the Moon is in its current cycle.",
  },
  {
    q: "Why does the illumination percentage not always match the emoji?",
    a: "The eight emojis are discrete snapshots, while the illumination percentage is a smooth number. For example, at 60% illumination the Moon is already in the Waxing Gibbous phase (🌔), even though the emoji looks more than half-lit. The percentage gives you the exact value; the emoji gives you the closest named phase.",
  },
  {
    q: "Can I copy and use the moon phase emoji?",
    a: "Absolutely. Every emoji on this site is a standard Unicode character, which means it works in tweets, text messages, emails, calendar entries, and journal apps without any special software. Just select the emoji at the top of the home page and copy it like any other text.",
  },
  {
    q: "How is the moon phase calculated here?",
    a: "We use the J2000 reference New Moon — 6 January 2000 at 18:14 UTC — as a known starting point, and we measure how much time has elapsed since then. Dividing that elapsed time by the mean synodic month (29.530588853 days) gives us the current position in the lunar cycle, which we map to one of the eight phases. The calculation runs entirely in your browser, so it works offline and never sends your data anywhere.",
  },
];

export const metadata: Metadata = {
  title: "Moon Phase Emoji FAQ — Frequently Asked Questions",
  description:
    "Quick, no-nonsense answers to the questions visitors ask most often about moon phase emojis, the lunar cycle, illumination percentages, and how the calculation works.",
  alternates: { canonical: "https://www.moonphaseemoji.com/faq" },
  openGraph: {
    title: "Moon Phase Emoji FAQ",
    description:
      "Answers to the most common questions about moon phases and emojis.",
    url: "https://www.moonphaseemoji.com/faq",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.moonphaseemoji.com/faq/#faqpage",
  url: "https://www.moonphaseemoji.com/faq",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow="Frequently asked questions"
        title="Everything you wanted to know about moon phase emojis"
        subtitle="Quick, no-nonsense answers to the questions visitors ask us most often. If you have a question that isn't covered here, please reach out through the contact page."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Inline ad — 728×90 leaderboard above the FAQ list */}
          <div className="mb-12 flex justify-center">
            <AdBanner format="leaderboard" />
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Inline ad — 300×250 rectangle below the FAQ, before author byline */}
          <div className="my-12 flex justify-center">
            <AdBanner format="rectangle" />
          </div>

          <AuthorByline />
        </div>
      </section>
    </>
  );
}
