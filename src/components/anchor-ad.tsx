"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * Sticky bottom anchor ad (728×90 leaderboard).
 *
 * - Fixed to the bottom of the viewport on screens ≥ 768px wide
 * - Hidden on mobile (728px would overflow small screens)
 * - Dismissible: clicking the ✕ hides the ad for the current session
 * - Uses afterInteractive strategy so it loads after first paint
 *
 * The anchor ad sits above the footer (z-index is below nav but
 * above content) so it never blocks the main navigation.
 */

const AD_KEY = "eb1282ffffa9c28d2f738f91511fd291";
const AD_HEIGHT = 90;
const AD_WIDTH = 728;
const STORAGE_KEY = "moon-phase-emoji:anchor-ad-dismissed";

export function AnchorAd() {
  const [dismissed, setDismissed] = useState(true); // start dismissed to avoid SSR flash
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deferred to client to avoid hydration mismatch
    setMounted(true);
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      setDismissed(stored === "1");
    } catch {
      // sessionStorage may be unavailable (private mode); default to visible
      setDismissed(false);
    }
  }, []);

  if (!mounted || dismissed) return null;

  function dismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore — best-effort persistence
    }
  }

  return (
    <>
      {/* Spacer so the anchor doesn't cover content above the footer */}
      <div aria-hidden="true" style={{ height: AD_HEIGHT + 16 }} />

      <div
        role="complementary"
        aria-label="Sponsored advertisement"
        className="fixed bottom-3 left-1/2 z-40 hidden -translate-x-1/2 md:block"
      >
        <div className="relative rounded-lg border border-border/60 bg-card/95 p-2 shadow-2xl backdrop-blur-md">
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close advertisement"
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-xs font-bold text-muted-foreground shadow-md transition-colors hover:text-foreground"
          >
            ✕
          </button>

          <span className="absolute left-3 top-1 text-[9px] uppercase tracking-wider text-muted-foreground/60">
            Advertisement
          </span>

          <div
            className="mt-3 flex items-center justify-center overflow-hidden"
            style={{ minWidth: AD_WIDTH, minHeight: AD_HEIGHT, maxWidth: "100%" }}
          >
            <Script
              id="anchor-ad-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `atOptions = {
                  'key' : '${AD_KEY}',
                  'format' : 'iframe',
                  'height' : ${AD_HEIGHT},
                  'width' : ${AD_WIDTH},
                  'params' : {}
                };`,
              }}
            />
            <Script
              id="anchor-ad-invoke"
              strategy="afterInteractive"
              src={`https://www.highrevenueformat.com/${AD_KEY}/invoke.js`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
