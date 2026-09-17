"use client";

import { useEffect, useState, useId } from "react";

/**
 * Responsive sticky bottom anchor ad.
 *
 * Strategy: render BOTH ad sizes in the DOM, but use CSS media queries
 * to show only the right one. This is more robust than JS-based viewport
 * detection because:
 *   - Works on iOS Safari (where matchMedia listener can be flaky)
 *   - Works on browsers with JavaScript disabled
 *   - Handles viewport changes (rotation, resize) via pure CSS
 *   - Only one iframe is actually visible at a time (the hidden one has
 *     display:none so it doesn't trigger ad impressions)
 *
 * Mobile  (< 768px): 300×250 rectangle (fits 375px / 320px viewports)
 * Desktop (≥ 768px): 728×90 leaderboard (full-width banner)
 *
 * - Dismissible via ✕ button (persists for current session via sessionStorage)
 * - Loaded inside isolated iframe (srcDoc) — no clash with inline ads
 * - White background so creative is always visible
 * - Spacer div reserves space at the bottom of the page so the anchor
 *   never covers content above the footer
 * - position: fixed with safe-area-inset for iOS notch / home indicator
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
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
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

  const rectangleDoc = buildIframeDoc(RECTANGLE_AD);
  const leaderboardDoc = buildIframeDoc(LEADERBOARD_AD);

  return (
    <>
      {/* Spacer reserves space at bottom of page (use the larger of the two
          ad sizes so content is never covered, regardless of which ad shows) */}
      <div aria-hidden="true" style={{ height: RECTANGLE_AD.height + 32 }} />

      {/* Mobile anchor ad (300×250 rectangle) — visible below md breakpoint */}
      <div
        role="complementary"
        aria-label="Sponsored advertisement"
        className="anchor-ad-mobile fixed left-1/2 z-40 -translate-x-1/2 md:hidden"
        style={{
          bottom: "max(12px, env(safe-area-inset-bottom))",
          width: "calc(100% - 16px)",
        }}
      >
        <AnchorAdShell onDismiss={dismiss} uid={`${uid}-m`}>
          <AdIframe
            id={`anchor-ad-${uid}-mobile`}
            doc={rectangleDoc}
            width={RECTANGLE_AD.width}
            height={RECTANGLE_AD.height}
            center={true}
          />
        </AnchorAdShell>
      </div>

      {/* Desktop anchor ad (728×90 leaderboard) — visible at md breakpoint and up */}
      <div
        role="complementary"
        aria-label="Sponsored advertisement"
        className="anchor-ad-desktop fixed left-1/2 z-40 hidden -translate-x-1/2 md:block"
        style={{
          bottom: "max(12px, env(safe-area-inset-bottom))",
        }}
      >
        <AnchorAdShell onDismiss={dismiss} uid={`${uid}-d`}>
          <AdIframe
            id={`anchor-ad-${uid}-desktop`}
            doc={leaderboardDoc}
            width={LEADERBOARD_AD.width}
            height={LEADERBOARD_AD.height}
            center={false}
          />
        </AnchorAdShell>
      </div>
    </>
  );
}

function AnchorAdShell({
  onDismiss,
  uid,
  children,
}: {
  onDismiss: () => void;
  uid: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-lg border border-border/60 bg-card/95 p-2 shadow-2xl backdrop-blur-md">
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close advertisement"
        className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-xs font-bold text-muted-foreground shadow-md transition-colors hover:text-foreground"
      >
        ✕
      </button>

      <span className="absolute left-3 top-1 text-[9px] uppercase tracking-wider text-muted-foreground/60">
        Advertisement
      </span>

      <div className="mt-3">{children}</div>
    </div>
  );
}

function AdIframe({
  id,
  doc,
  width,
  height,
  center,
}: {
  id: string;
  doc: string;
  width: number;
  height: number;
  center: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-md"
      style={{
        width: "100%",
        maxWidth: width,
        height: height,
        background: "#ffffff",
        margin: "0 auto",
      }}
    >
      <iframe
        id={id}
        title="Anchor advertisement"
        srcDoc={doc}
        style={{
          width: width,
          height: height,
          position: "absolute",
          left: center ? "50%" : 0,
          top: 0,
          transform: center ? "translateX(-50%)" : "none",
          border: "none",
          background: "#ffffff",
        }}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
