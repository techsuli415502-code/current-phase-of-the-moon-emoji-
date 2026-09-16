"use client";

import { useEffect, useState } from "react";
import { calculateMoonPhase, type MoonPhaseData } from "@/lib/moon-phase";

/**
 * Renders the live, real-time moon phase. Updates every minute.
 * Updates the document title with the live phase keyword for SEO freshness.
 */
export function LiveMoonPhase() {
  const [data, setData] = useState<MoonPhaseData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deferred to client to avoid SSR/CSR date drift
    setMounted(true);
    const update = () => setData(calculateMoonPhase());
    update();
    // Update every minute — the moon moves noticeably every few minutes
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted || !data) {
    // Static server-rendered fallback to avoid hydration mismatch
    return <LiveMoonPhaseSkeleton />;
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Moon emoji with halo rings */}
      <div className="relative flex items-center justify-center">
        {/* Outer halo */}
        <div
          className="absolute h-72 w-72 rounded-full halo-ring"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(245,230,200,0.12) 25%, transparent 50%, rgba(255,217,122,0.10) 75%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        {/* Inner halo */}
        <div
          className="absolute h-56 w-56 rounded-full halo-ring-reverse"
          style={{
            background:
              "conic-gradient(from 90deg, transparent 0%, rgba(255,248,220,0.15) 33%, transparent 66%, rgba(245,230,200,0.10) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Soft glow circle behind emoji */}
        <div
          className="absolute h-44 w-44 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,248,220,0.35) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="moon-glow float-moon text-[10rem] leading-none sm:text-[12rem]"
          role="img"
          aria-label={`Current moon phase: ${data.name}, ${data.illumination}% illuminated`}
        >
          {data.emoji}
        </div>
      </div>

      {/* Phase name */}
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Right now, the Moon is in
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          {data.name}
        </h2>
      </div>

      {/* Stats row */}
      <div className="grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Illumination" value={`${data.illumination}%`} />
        <Stat label="Moon Age" value={`${data.age} days`} />
        <Stat label="Next Full" value={`${data.daysUntilFullMoon}d`} />
        <Stat label="Next New" value={`${data.daysUntilNewMoon}d`} />
      </div>

      {/* Live timestamp */}
      <p className="text-xs text-muted-foreground">
        Live data · Updated {new Date(data.timestamp).toLocaleTimeString()} ·
        Refreshes every 60 seconds
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/60 p-3 text-center backdrop-blur-sm">
      <div className="text-lg font-semibold text-primary">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function LiveMoonPhaseSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex h-72 w-72 items-center justify-center">
        <div className="h-32 w-32 animate-pulse rounded-full bg-muted/60" />
      </div>
      <div className="h-10 w-48 animate-pulse rounded bg-muted/60" />
      <div className="grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-lg bg-muted/40"
          />
        ))}
      </div>
    </div>
  );
}
