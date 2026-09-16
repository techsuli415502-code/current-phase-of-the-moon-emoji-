"use client";

import { useEffect, useState, useId } from "react";

/**
 * Sticky bottom anchor ad (728×90 leaderboard).
 *
 * - Fixed to the bottom of the viewport on screens ≥ 768px wide
 * - Hidden on mobile (728px would overflow small screens)
 * - Dismissible: clicking the ✕ hides the ad for the current session
 * - Uses an isolated iframe (via srcDoc) so the ad's `atOptions` global
 *   doesn't conflict with any inline ads on the same page
 * - White background so the ad creative is always visible
 */

const AD_KEY = "eb1282ffffa9c28d2f738f91511fd291";
const AD_HEIGHT = 90;
const AD_WIDTH = 728;
const STORAGE_KEY = "moon-phase-emoji:anchor-ad-dismissed";

const IFRAME_DOC = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html, body { margin: 0; padding: 0; background: #ffffff; }
  body { display: flex; align-items: center; justify-content: center;
         min-height: ${AD_HEIGHT}px; min-width: ${AD_WIDTH}px;
         overflow: hidden; }
</style>
</head>
<body>
<script type="text/javascript">
atOptions = {
  'key' : '${AD_KEY}',
  'format' : 'iframe',
  'height' : ${AD_HEIGHT},
  'width' : ${AD_WIDTH},
  'params' : {}
};
</script>
<script type="text/javascript" src="https://www.highrevenueformat.com/${AD_KEY}/invoke.js"></script>
</body>
</html>`;

export function AnchorAd() {
  const uid = useId().replace(/[:]/g, "");
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

          <iframe
            id={`anchor-ad-${uid}`}
            title="Anchor advertisement"
            srcDoc={IFRAME_DOC}
            width={AD_WIDTH}
            height={AD_HEIGHT}
            style={{
              minWidth: AD_WIDTH,
              minHeight: AD_HEIGHT,
              maxWidth: "100%",
              background: "#ffffff",
              border: "1px solid rgba(245, 230, 200, 0.25)",
              borderRadius: "6px",
              marginTop: "12px",
            }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  );
}
