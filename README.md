# Moon Phase Emoji 🌙

> See the **current phase of the moon emoji** live — updated every minute, right in your browser.

A simple, accurate, and beautiful moon phase website that shows the Moon's current phase as a single emoji, computed in real time on the client side. No apps, no calendars, no sign-up.

🔗 **Live site:** https://www.moonphaseemoji.com/

---

## ✨ Features

- **Live moon phase emoji** — updates every minute, runs entirely in your browser
- **Lighting text animation** on the hero H1 with the main SEO keyword
- **All 8 lunar phases explained** with emojis, cycle positions, and plain-English descriptions
- **7-day moon phase forecast** with illumination bars and moon age
- **FAQ** with structured data (FAQPage schema) for Google rich results
- **Contact form** with working toast confirmation
- **EEAT author bio** — first-person bio by Jacob Moses, Content Specialist
- **Sources page** with 3 authoritative references
- **Full privacy policy** covering GDPR and CCPRA rights

## 🧭 Site structure (separate routes)

| Route             | Purpose                                          |
| ----------------- | ------------------------------------------------ |
| `/`               | Hero with live moon phase emoji + featured links |
| `/moon-phases`    | All 8 phases explained                           |
| `/forecast`       | 7-day moon phase forecast                        |
| `/about`          | Why we built the site + how accurate it is       |
| `/faq`            | Frequently asked questions (FAQ schema)          |
| `/author`         | Full EEAT author bio (Jacob Moses)               |
| `/contact`        | Contact form (email: techsuli415502@gmail.com)  |
| `/sources`        | Authoritative references                         |
| `/privacy`        | Full privacy policy                              |

## 🚀 SEO setup

- ✅ Meta title contains the main keyword (`current phase of the moon emoji`)
- ✅ Per-page `title`, `description`, and canonical URL
- ✅ OpenGraph + Twitter Card metadata
- ✅ 5 JSON-LD blocks: `WebSite`, `Organization`, `Person`, `WebPage`, `FAQPage`
- ✅ SVG favicon (rendered moon)
- ✅ `robots.txt` (allows all + points to sitemap)
- ✅ `sitemap.xml` (9 URLs)
- ✅ Semantic HTML, accessible navigation, breadcrumbs on every sub-page

## 🛠 Tech stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui (New York style)
- **Icons:** lucide-react
- **No backend:** the moon phase calculation runs 100% client-side

## 📐 Moon phase calculation

The calculator anchors the lunar cycle to the J2000 reference New Moon (6 January 2000, 18:14 UTC) and divides elapsed time by the mean synodic month of `29.530588853` days. This produces a phase angle typically accurate to within a few hours for any modern date.

See `src/lib/moon-phase.ts` for the full implementation.

## 👤 Author

**Jacob Moses** — Content Specialist  
Email: techsuli415502@gmail.com

Seven years writing about astronomy, timekeeping, and the rituals that connect people to the night sky. Read the full bio at [/author](https://www.moonphaseemoji.com/author).

## 📄 License

© Moon Phase Emoji. All rights reserved. Source code is private.
