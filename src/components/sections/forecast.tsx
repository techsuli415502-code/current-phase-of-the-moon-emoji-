"use client";

import { useEffect, useState } from "react";
import { getMoonPhaseForecast, type MoonPhaseData } from "@/lib/moon-phase";
import { SectionHeading } from "@/components/section-heading";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * 7-day moon phase forecast. Renders on the client to avoid SSR/client
 * date drift, with a small skeleton placeholder during initial mount.
 */
export function ForecastSection() {
  const [forecast, setForecast] = useState<MoonPhaseData[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deferred to client to avoid SSR/CSR date drift
    setMounted(true);
    setForecast(getMoonPhaseForecast(7));
    // Refresh forecast once an hour in case the user keeps the tab open
    const interval = setInterval(
      () => setForecast(getMoonPhaseForecast(7)),
      60 * 60 * 1000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="forecast" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="7-Day Outlook"
          title="Moon Phase Forecast for the Next Week"
          subtitle="A day-by-day look at how the Moon will look in your sky over the coming week. Each entry shows the emoji you'd see that night, the illumination percentage, and the moon's age in days since the last new moon."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {!mounted
            ? Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-xl bg-card/40"
                />
              ))
            : forecast.map((day, idx) => {
                const date = new Date(day.timestamp);
                return (
                  <article
                    key={idx}
                    className="phase-card flex flex-col items-center rounded-xl border border-border/60 bg-card/60 p-5 text-center backdrop-blur-sm"
                  >
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {idx === 0 ? "Today" : WEEKDAYS[date.getUTCDay()]}
                    </div>
                    <div className="text-xs text-muted-foreground/70">
                      {date.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <span
                      className="my-3 text-5xl"
                      role="img"
                      aria-label={`${day.name} emoji`}
                    >
                      {day.emoji}
                    </span>
                    <div className="text-sm font-semibold text-foreground">
                      {day.name}
                    </div>
                    <div className="mt-2 w-full">
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>Illumination</span>
                        <span>{day.illumination}%</span>
                      </div>
                      <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${day.illumination}%` }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-[10px] text-muted-foreground/70">
                      Moon age: {day.age} days
                    </div>
                  </article>
                );
              })}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Forecast is calculated locally in your browser using the J2000
          reference new moon and the standard 29.53-day synodic month.
        </p>
      </div>
    </section>
  );
}
