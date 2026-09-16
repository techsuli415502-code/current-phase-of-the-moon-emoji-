import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AnchorAd } from "@/components/anchor-ad";

// Google Analytics 4 Measurement ID
// Tracks page views across all routes including client-side navigation.
const GA_MEASUREMENT_ID = "G-G749C8QG4Z";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const SITE_URL = "https://www.moonphaseemoji.com";
export const PRIMARY_KEYWORD = "current phase of the moon emoji";
export const AUTHOR_EMAIL = "techsuli415502@gmail.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PRIMARY_KEYWORD} — Live Moon Phase Emoji Updated Every Minute`,
    template: `%s · Moon Phase Emoji`,
  },
  description:
    "See the current phase of the moon emoji live — updated every minute with real-time illumination, moon age, and a 7-day forecast. Free, accurate, no sign-up.",
  keywords: [
    PRIMARY_KEYWORD,
    "moon phase emoji",
    "moon emoji today",
    "live moon phase",
    "moon phase right now",
    "tonight's moon emoji",
    "lunar phase calculator",
    "moon phase forecast",
    "new moon emoji",
    "full moon emoji",
    "waxing crescent",
    "waning gibbous",
  ],
  authors: [{ name: "Jacob Moses", url: SITE_URL }],
  creator: "Jacob Moses",
  publisher: "Moon Phase Emoji",
  category: "Science & Astronomy",
  applicationName: "Moon Phase Emoji",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: `${PRIMARY_KEYWORD} — Live Moon Phase Emoji`,
    description:
      "Real-time moon phase shown as an emoji, updated every minute in your browser. Includes 7-day forecast, 8 phases explained, and a moon phase FAQ.",
    url: SITE_URL,
    siteName: "Moon Phase Emoji",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/favicon.svg",
        width: 64,
        height: 64,
        alt: "Moon phase emoji favicon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRIMARY_KEYWORD} — Live Moon Phase Emoji`,
    description:
      "See tonight's moon phase as an emoji — live, accurate, no refresh needed.",
    creator: "@moonphaseemoji",
    images: ["/favicon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "HyGeK1v2kW0tFAnTZJUW3q1jl460a0HEoZCa3xAInEE",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Moon Phase Emoji",
    description:
      "Live moon phase emoji updated every minute. See the current phase of the moon as an emoji with illumination percentage and 7-day forecast.",
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Moon Phase Emoji",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      "Publisher of the live moon phase emoji tool, lunar phase guides, and 7-day moon forecasts.",
    founder: { "@id": `${SITE_URL}/#person` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Jacob Moses",
    jobTitle: "Content Specialist",
    url: `${SITE_URL}/author`,
    email: `mailto:${AUTHOR_EMAIL}`,
    description:
      "Jacob Moses is a content specialist and the founder of Moon Phase Emoji. He writes about astronomy, time, and the rituals that connect people to the night sky.",
    worksFor: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: `${PRIMARY_KEYWORD} — Live Moon Phase Emoji`,
    description:
      "See the current phase of the moon emoji live, updated every minute. Free lunar phase calculator with illumination percentage, moon age, and a 7-day forecast.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: {
      "@type": "Thing",
      name: "Lunar phase",
      sameAs: "https://en.wikipedia.org/wiki/Lunar_phase",
    },
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {jsonLd.map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        {/* Sticky bottom anchor ad (728×90, desktop-only, dismissible) */}
        <AnchorAd />
      </body>
      {/* Google Analytics 4 — loads gtag.js and tracks page views on every
          route change. Placed as a direct child of <html> so the script
          is injected into <head> with the correct afterInteractive strategy. */}
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}
