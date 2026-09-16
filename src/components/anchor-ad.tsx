"use client";

import { useEffect, useState, useId } from "react";

/**
 * Responsive sticky bottom anchor ad.
 *
 * - Mobile  (< 768px): 300×250 rectangle (fits 375px viewports, no overflow)
 * - Desktop (≥ 768px): 728×90 leaderboard (full-width banner)
 *
 * - Dismissible via ✕ button (persists for current session via sessionStorage)
 * - Loaded inside isolated iframe (srcDoc) — no clash with inline ads
 * - White background so creative is always visible
 * - Spacer div reserves space at the bottom of the page so the anchor
 *   never covers content above the footer
 *
 * Uses matchMedia to pick the right ad size client-side, avoiding loading
 * both ad sizes simultaneously (saves bandwidth + prevents hidden-iframes
 * from triggering invisible ad impressions).
 */

const RECTANGLE_AD = {
  key: "23e98aeeab23e7beeb1305832f744d21",
  height: 250,
  width: 300,
};

const LEADERBOARD_AD = {
  key: "eb1282ffffa9c28d2f738f91511fd291",
  height: 90,
  width: 728,
};

const STORAGE_KEY = "moon-phase-emoji:anchor-ad-dismissed";
const MOBILE_BREAKPOINT = 768; // md breakpoint — matches Tailwind

function buildIframeDoc(config: { key: string; height: number; width: number }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html, body { margin: 0; padding: 0; background: #ffffff; width: 100%; height: 100%; overflow: hidden; }
  body { display: flex; align-items: center; justify-content: center; }
</style>
</head>
<body>
<script type="text/javascript">
atOptions = {
  'key' : '${config.key}',
  'format' : 'iframe',
  'height' : ${config.height},
  'width' : ${config.width},
  'params' : {}
};
</script>
<script type="text/javascript" src="https://www.highrevenueformat.com/${config.key}/invoke.js"></script>
</body>
</html>`;
}

export function AnchorAd() {
  const uid = useId().replace(/[:]/g, "");
  const [dismissed, setDismissed] = useState(true); // start dismissed to avoid SSR flash
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deferred to client to avoid hydration mismatch
    setMounted(true);

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const updateIsMobile = () => setIsMobile(mql.matches);
    updateIsMobile();

    // Listen for viewport changes (e.g. user rotates phone or resizes browser)
    mql.addEventListener("change", updateIsMobile);

    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      setDismissed(stored === "1");
    } catch {
      setDismissed(false);
    }

    return () => mql.removeEventListener("change", updateIsMobile);
  }, []);

  if (!mounted || dismissed) return null;

  function dismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  // Pick the ad size based on viewport
  const config = isMobile ? RECTANGLE_AD : LEADERBOARD_AD;
  const iframeDoc = buildIframeDoc(config);
  const containerId = `anchor-ad-${uid}`;

  return (
    <>
      {/* Spacer reserves space at bottom of page so anchor doesn't cover content */}
      <div aria-hidden="true" style={{ height: config.height + 32 }} />

      <div
        role="complementary"
        aria-label="Sponsored advertisement"
        className="fixed bottom-3 left-1/2 z-40 -translate-x-1/2"
        style={{ width: isMobile ? "calc(100% - 24px)" : "auto", maxWidth: isMobile ? "none" : "none" }}
      >
        <div className="relative rounded-lg border border-border/60 bg-card/95 p-2 shadow-2xl backdrop-blur-md">
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close advertisement"
            className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-xs font-bold text-muted-foreground shadow-md transition-colors hover:text-foreground"
          >
            ✕
          </button>

          <span className="absolute left-3 top-1 text-[9px] uppercase tracking-wider text-muted-foreground/60">
            Advertisement
          </span>

          <div
            className="relative mt-3 overflow-hidden rounded-md"
            style={{
              width: isMobile ? "100%" : config.width,
              height: config.height,
              background: "#ffffff",
              maxWidth: "100vw",
            }}
          >
            <iframe
              id={containerId}
              title="Anchor advertisement"
              srcDoc={iframeDoc}
              style={{
                width: config.width,
                height: config.height,
                position: "absolute",
                left: isMobile ? "50%" : 0,
                top: 0,
                transform: isMobile ? "translateX(-50%)" : "none",
                border: "none",
                background: "#ffffff",
              }}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </>
  );
}
