"use client";

import { useEffect, useState } from "react";

/**
 * Responsive sticky bottom anchor ad — uses industry-standard sizes.
 *
 * Mobile  (< 768px): 320×50  sticky banner (only 50px tall — minimal space)
 * Desktop (≥ 768px): 728×90  leaderboard  (standard desktop banner)
 *
 * Why these sizes:
 * - 320×50 is the IAB-recommended mobile sticky anchor size. At only
 *   50px tall it occupies ~6% of an 812px viewport (vs 34% with the
 *   previous 300×250 rectangle) — won't block content or annoy users.
 * - 728×90 is the IAB-recommended desktop anchor size.
 *
 * Implementation:
 * - BOTH ad sizes rendered in DOM, CSS media queries show the right one
 *   (works on iOS Safari, no JS viewport detection needed)
 * - Container has explicit width/height so it never collapses
 * - Iframe loads immediately (no lazy loading) so ads always render
 * - Iframe runs inside isolated srcDoc — no clash with inline ads
 * - Dismissible via ✕ button (persists for current session)
 * - position: fixed with safe-area-inset for iOS notch / home indicator
 * - White background so ad creative is always visible
 *
 * Ad code note:
 * The user has two ad codes (300×250 rectangle + 728×90 leaderboard).
 * For the mobile 320×50 slot we re-use the 300×250 rectangle ad code
 * but render it in a 320×50 container — the ad network's iframe is
 * responsive within its container and will fill whatever space it's
 * given. This is standard practice for anchor ads.
 */

const RECTANGLE_AD_KEY = "23e98aeeab23e7beeb1305832f744d21"; // 300×250
const LEADERBOARD_AD_KEY = "eb1282ffffa9c28d2f738f91511fd291"; // 728×90

const MOBILE_AD = { width: 320, height: 50 };
const DESKTOP_AD = { width: 728, height: 90 };

const STORAGE_KEY = "moon-phase-emoji:anchor-ad-dismissed";

function buildIframeDoc(key: string, height: number, width: number) {
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
  'key' : '${key}',
  'format' : 'iframe',
  'height' : ${height},
  'width' : ${width},
  'params' : {}
};
</script>
<script type="text/javascript" src="https://www.highrevenueformat.com/${key}/invoke.js"></script>
</body>
</html>`;
}

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

  const mobileIframeDoc = buildIframeDoc(
    RECTANGLE_AD_KEY,
    MOBILE_AD.height,
    MOBILE_AD.width
  );
  const desktopIframeDoc = buildIframeDoc(
    LEADERBOARD_AD_KEY,
    DESKTOP_AD.height,
    DESKTOP_AD.width
  );

  return (
    <>
      {/* Spacer reserves space at bottom of page so anchor doesn't cover content.
          Uses the desktop height (90) which is larger than mobile (50), so content
          is never covered on any viewport. */}
      <div aria-hidden="true" style={{ height: DESKTOP_AD.height + 24 }} />

      {/* Mobile anchor ad (320×50) — visible below md breakpoint */}
      <div
        role="complementary"
        aria-label="Sponsored advertisement"
        className="fixed left-1/2 z-40 -translate-x-1/2 md:hidden"
        style={{
          bottom: "max(8px, env(safe-area-inset-bottom))",
          width: "calc(100% - 16px)",
          maxWidth: MOBILE_AD.width + 16,
        }}
      >
        <AnchorAdShell onDismiss={dismiss}>
          <div
            className="relative mx-auto overflow-hidden rounded-md"
            style={{
              width: "100%",
              maxWidth: MOBILE_AD.width,
              height: MOBILE_AD.height,
              background: "#ffffff",
            }}
          >
            <iframe
              title="Anchor advertisement"
              srcDoc={mobileIframeDoc}
              style={{
                width: MOBILE_AD.width,
                height: MOBILE_AD.height,
                position: "absolute",
                left: "50%",
                top: 0,
                transform: "translateX(-50%)",
                border: "none",
                background: "#ffffff",
              }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </AnchorAdShell>
      </div>

      {/* Desktop anchor ad (728×90) — visible at md breakpoint and up */}
      <div
        role="complementary"
        aria-label="Sponsored advertisement"
        className="fixed left-1/2 z-40 hidden -translate-x-1/2 md:block"
        style={{
          bottom: "max(12px, env(safe-area-inset-bottom))",
          width: DESKTOP_AD.width,
        }}
      >
        <AnchorAdShell onDismiss={dismiss}>
          <div
            className="relative overflow-hidden rounded-md"
            style={{
              width: DESKTOP_AD.width,
              height: DESKTOP_AD.height,
              background: "#ffffff",
            }}
          >
            <iframe
              title="Anchor advertisement"
              srcDoc={desktopIframeDoc}
              style={{
                width: DESKTOP_AD.width,
                height: DESKTOP_AD.height,
                position: "absolute",
                left: 0,
                top: 0,
                border: "none",
                background: "#ffffff",
              }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </AnchorAdShell>
      </div>
    </>
  );
}

function AnchorAdShell({
  onDismiss,
  children,
}: {
  onDismiss: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-lg border border-border/60 bg-card/95 p-1.5 shadow-2xl backdrop-blur-md">
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close advertisement"
        className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-xs font-bold text-muted-foreground shadow-md transition-colors hover:text-foreground"
      >
        ✕
      </button>

      <span className="absolute left-2 top-0.5 text-[9px] uppercase tracking-wider text-muted-foreground/60">
        Ad
      </span>

      <div className="mt-3">{children}</div>
    </div>
  );
}
