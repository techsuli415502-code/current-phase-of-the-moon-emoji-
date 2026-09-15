"use client";

import { LiveMoonPhase } from "@/components/live-moon-phase";
import { Starfield } from "@/components/starfield";

/**
 * Hero section featuring:
 * - The primary keyword "current phase of the moon emoji" in an H1 with a lighting animation
 * - The live moon phase emoji
 * - Animated starfield background
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-16"
    >
      <Starfield count={120} />

      {/* Moon's soft glow from top */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(245,230,200,0.35) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Eyebrow */}
        <p className="fade-in-up mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Live · Real-time lunar data
        </p>

        {/* H1 with lighting animation — main SEO keyword */}
        <h1
          className="fade-in-up lighting-text mx-auto max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.1s" }}
        >
          Current Phase of the Moon Emoji
        </h1>

        {/* Sub-headline */}
        <p
          className="fade-in-up mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
          style={{ animationDelay: "0.3s" }}
        >
          See tonight&apos;s moon phase live, rendered as a single emoji and
          updated every minute. No apps, no calendars — just the real moon,
          right now, in your browser.
        </p>

        {/* Live moon phase */}
        <div
          className="fade-in-up mt-12 w-full"
          style={{ animationDelay: "0.5s" }}
        >
          <LiveMoonPhase />
        </div>

        {/* CTA */}
        <div
          className="fade-in-up mt-12 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "0.7s" }}
        >
          <a
            href="#moon-phases"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Explore all 8 moon phases
          </a>
          <a
            href="#forecast"
            className="inline-flex items-center justify-center rounded-md border border-border/60 bg-card/40 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-primary/50"
          >
            See the 7-day forecast
          </a>
        </div>
      </div>
    </section>
  );
}
