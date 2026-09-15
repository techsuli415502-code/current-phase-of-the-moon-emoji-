import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactSection } from "@/components/sections/contact";
import { AUTHOR_EMAIL } from "@/app/layout";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch with Moon Phase Emoji",
  description:
    "Have a question about the moon phase, a feature request, or a correction to suggest? Send us a message — we read every email and reply personally, usually within 48 hours.",
  alternates: { canonical: "https://www.moonphaseemoji.com/contact" },
  openGraph: {
    title: "Contact Moon Phase Emoji",
    description:
      "Send us a message — we read every email and reply within 48 hours.",
    url: "https://www.moonphaseemoji.com/contact",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Moon Phase Emoji",
  description:
    "Get in touch with the Moon Phase Emoji team. We reply to every message within 48 hours.",
  url: "https://www.moonphaseemoji.com/contact",
  author: { "@id": "https://www.moonphaseemoji.com/#person" },
  publisher: { "@id": "https://www.moonphaseemoji.com/#organization" },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow="Get in touch"
        title="Contact us"
        subtitle="Have a question about the moon phase, a feature request, or a correction to suggest? We read every message and reply personally — usually within 48 hours."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <ContactSection />

          <div className="mt-12 rounded-xl border border-border/60 bg-card/40 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Prefer email? Reach us directly at{" "}
              <a
                href={`mailto:${AUTHOR_EMAIL}`}
                className="font-semibold text-primary hover:underline"
              >
                {AUTHOR_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
