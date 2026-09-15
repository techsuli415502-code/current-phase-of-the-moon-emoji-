import { Hero } from "@/components/sections/hero";
import { MoonPhasesSection } from "@/components/sections/moon-phases";
import { ForecastSection } from "@/components/sections/forecast";
import { AboutSection } from "@/components/sections/about";
import { FaqSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
import { PrivacySection } from "@/components/sections/privacy";
import { AuthorBioSection } from "@/components/sections/author-bio";
import { SourcesSection } from "@/components/sections/sources";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MoonPhasesSection />
        <ForecastSection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
        <AuthorBioSection />
        <SourcesSection />
        <PrivacySection />
      </main>
      <Footer />
    </div>
  );
}
