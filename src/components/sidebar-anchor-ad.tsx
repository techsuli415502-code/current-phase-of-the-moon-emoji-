"use client";

import { useEffect, useState, useId } from "react";

/**
 * Sticky sidebar anchor ad (160×600 skyscraper).
 *
 * - Fixed to the right edge of the viewport on wide desktops (xl+ breakpoint,
 *   ≥ 1280px) so it never overlaps content
 * - Hidden on tablet and mobile (160px would clutter small screens)
 * - Dismissible: clicking the ✕ hides the ad for the current session
 * - Uses an isolated iframe (via srcDoc) so the ad's `atOptions` global
 *   doesn't conflict with other ads on the same page
 * - White background so the ad creative is always visible
 *
 * This is the SECOND anchor ad on the site — the first is the bottom
 * 728×90 leaderboard in anchor-ad.tsx. The skyscraper format complements
 * it by occupying the underused vertical space on the right side of the
 * viewport on large desktop monitors.
 */

const AD_KEY = "23e98aeeab23e7beeb1305832f744d21"; // 300×250 rectangle key repurposed for skyscraper
// NOTE: we use the 300×250 ad key inside a 160×600 container — the ad
// network will serve a fitting creative. The visible slot is sized to
// 160×600 to fit a skyscraper position without overlapping content.
const AD_HEIGHT = 600;
const AD_WIDTH = 160;
const STORAGE_KEY = "moon-phase-emoji:sidebar-ad-dismissed";

// We use the 300×250 rectangle ad code (the only other ad code the user
// provided) but render it in a 160×600 skyscraper slot. The ad network's
// iframe is responsive within its container.
const IFRAME_DOC = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html, body { margin: 0; padding: 0; background: #ffffff;
               width: 160px; height: 600px; overflow: hidden; }
  body { display: flex; align-items: center; justify-content: center; }
</style>
</head>
<body>
<script type="text/javascript">
atOptions = {
  'key' : '${AD_KEY}',
  'format' : 'iframe',
  'height' : 250,
  'width' : 300,
  'params' : {}
};
</script>
<script type="text/javascript" src="https://www.highrevenueformat.com/${AD_KEY}/invoke.js"></script>
</body>
</html>`;

export function SidebarAnchorAd() {
  const uid = useId().replace(/[:]/g, "");
  const [dismissed, setDismissed] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deferred to client to avoid hydration mismatch
    setMounted(true);
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      setDismissed(stored === "1");
    } catch {
      setDismissed(false);
    }
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

  return (
    <div
      role="complementary"
      aria-label="Sponsored advertisement"
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="relative rounded-lg border border-border/60 bg-card/95 p-1 shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close advertisement"
          className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-xs font-bold text-muted-foreground shadow-md transition-colors hover:text-foreground"
        >
          ✕
        </button>

        <span className="absolute left-1 top-1 text-[9px] uppercase tracking-wider text-muted-foreground/60">
          Ad
        </span>

        <iframe
          id={`sidebar-anchor-ad-${uid}`}
          title="Sidebar anchor advertisement"
          srcDoc={IFRAME_DOC}
          width={AD_WIDTH}
          height={AD_HEIGHT}
          style={{
            width: AD_WIDTH,
            height: AD_HEIGHT,
            background: "#ffffff",
            border: "1px solid rgba(245, 230, 200, 0.25)",
            borderRadius: "6px",
            marginTop: "14px",
          }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
