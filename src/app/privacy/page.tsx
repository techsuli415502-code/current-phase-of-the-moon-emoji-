import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { AdBanner } from "@/components/ad-banner";
import { AUTHOR_EMAIL } from "@/app/layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Moon Phase Emoji collects, uses, and protects your data. We collect almost nothing — the moon phase calculator runs entirely in your browser.",
  alternates: { canonical: "https://www.moonphaseemoji.com/privacy" },
  openGraph: {
    title: "Privacy Policy · Moon Phase Emoji",
    description:
      "How we handle your data — short version: very little of it is collected.",
    url: "https://www.moonphaseemoji.com/privacy",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy — Moon Phase Emoji",
  description:
    "How Moon Phase Emoji collects, uses, and protects your data.",
  url: "https://www.moonphaseemoji.com/privacy",
  publisher: { "@id": "https://www.moonphaseemoji.com/#organization" },
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated: September 15, 2026"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Inline ad — 728×90 leaderboard above the policy text */}
          <div className="mb-12 flex justify-center">
            <AdBanner format="leaderboard" />
          </div>

          <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
            <Clause title="1. Overview">
              <p>
                Moon Phase Emoji (&quot;we&quot;, &quot;us&quot;, or
                &quot;the site&quot;) is committed to protecting your
                privacy. This policy explains what information we collect when
                you visit moonphaseemoji.com, how we use it, and the choices
                you have about it. Because our moon phase calculator runs
                entirely in your browser, we collect very little personal
                data — most visitors never share anything identifiable with
                us at all.
              </p>
            </Clause>

            <Clause title="2. Information we collect">
              <p>
                <strong className="text-foreground">
                  Information you provide directly.
                </strong>{" "}
                If you use our contact form, we receive the name, email
                address, subject, and message you submit. We use this
                information only to respond to your enquiry and do not add
                you to any marketing list.
              </p>
              <p className="mt-3">
                <strong className="text-foreground">
                  Information collected automatically.
                </strong>{" "}
                Like most websites, our hosting provider records basic
                server logs — IP address, browser type, referring page, and
                the time of your visit — for security and abuse prevention.
                These logs are retained for up to 30 days and then
                automatically deleted.
              </p>
              <p className="mt-3">
                <strong className="text-foreground">
                  Local browser data.
                </strong>{" "}
                The moon phase calculation runs entirely on your device. No
                location, timezone, or usage data is sent to our servers as
                part of that calculation.
              </p>
            </Clause>

            <Clause title="3. Cookies">
              <p>
                We do not set any advertising or tracking cookies. The site
                may use a single functional cookie to remember your
                interface preferences (such as theme settings, if
                applicable). You can disable cookies in your browser at any
                time without affecting the moon phase calculator.
              </p>
            </Clause>

            <Clause title="4. Third-party services">
              <p>
                We may use standard infrastructure providers — for example,
                a content delivery network (CDN) and a hosting provider —
                that process technical data such as IP addresses as part of
                serving the website. These providers are bound by their own
                privacy policies and are prohibited from using your data
                for their own purposes.
              </p>
              <p className="mt-3">
                We do not embed advertising networks, social-media trackers,
                or analytics that profile individual users.
              </p>
            </Clause>

            <Clause title="5. How we use your information">
              <p>We use the information we collect to:</p>
              <ul className="ml-5 mt-2 list-disc space-y-1">
                <li>Respond to messages sent through our contact form.</li>
                <li>
                  Maintain the security and stability of the website.
                </li>
                <li>
                  Improve our content based on aggregated, anonymised
                  trends.
                </li>
                <li>Comply with applicable legal obligations.</li>
              </ul>
            </Clause>
          </div>

          {/* Inline ad — 300×250 rectangle between Clause 5 and Clause 6 */}
          <div className="my-10 flex justify-center">
            <AdBanner format="rectangle" />
          </div>

          <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
            <Clause title="6. Children's privacy">
              <p>
                Moon Phase Emoji is suitable for general audiences and does
                not knowingly collect personal information from children
                under 13. If you believe a child has submitted personal
                information through our contact form, please contact us and
                we will delete it promptly.
              </p>
            </Clause>

            <Clause title="7. Your rights">
              <p>
                Depending on your jurisdiction — for example, the EU and UK
                under GDPR, or California under CCPRA — you may have the
                right to access, correct, or delete your personal data, and
                to object to certain processing. To exercise any of these
                rights, please email us at{" "}
                <a
                  href={`mailto:${AUTHOR_EMAIL}`}
                  className="text-primary underline"
                >
                  {AUTHOR_EMAIL}
                </a>
                .
              </p>
            </Clause>

            <Clause title="8. Changes to this policy">
              <p>
                We may update this privacy policy from time to time. When we
                do, we will revise the &quot;last updated&quot; date at the
                top of the page. We encourage you to review this page
                periodically to stay informed about how we protect your
                information.
              </p>
            </Clause>

            <Clause title="9. Contact">
              <p>
                If you have any questions about this privacy policy or how
                we handle your data, please contact us using the{" "}
                <a href="/contact" className="text-primary underline">
                  contact page
                </a>{" "}
                or email{" "}
                <a
                  href={`mailto:${AUTHOR_EMAIL}`}
                  className="text-primary underline"
                >
                  {AUTHOR_EMAIL}
                </a>
                .
              </p>
            </Clause>
          </div>

          {/* Inline ad — 300×250 rectangle below the policy */}
          <div className="mt-12 flex justify-center">
            <AdBanner format="rectangle" />
          </div>
        </div>
      </section>
    </>
  );
}

function Clause({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-2 space-y-3">{children}</div>
    </div>
  );
}
