"use client";

import { useId } from "react";

type AdFormat = "rectangle" | "leaderboard";

interface AdConfig {
  key: string;
  height: number;
  width: number;
}

const AD_CONFIGS: Record<AdFormat, AdConfig> = {
  // 300×250 medium rectangle — fits mobile (375px) and desktop
  rectangle: {
    key: "23e98aeeab23e7beeb1305832f744d21",
    height: 250,
    width: 300,
  },
  // 728×90 leaderboard — desktop only (would overflow mobile)
  leaderboard: {
    key: "eb1282ffffa9c28d2f738f91511fd291",
    height: 90,
    width: 728,
  },
};

interface AdBannerProps {
  format: AdFormat;
  /** Label shown above the ad slot. Pass null to hide. */
  label?: string | null;
  /** Extra classes for the outer wrapper. */
  className?: string;
}

/**
 * Reusable ad banner — fully responsive, no layout shift.
 *
 * Design decisions:
 * - Rectangle (300×250): visible on ALL screen sizes (fits mobile 375px)
 * - Leaderboard (728×90): desktop only (hidden below md breakpoint)
 * - Outer wrapper has fixed height = ad height + label height → no CLS
 * - Outer wrapper has overflow:hidden + max-width:100% → no horizontal scroll
 * - Iframe runs inside its own srcDoc document → multiple slots on the same
 *   page don't clash over the ad network's `atOptions` global
 * - Iframe has white background → ad creative always visible on dark theme
 */
export function AdBanner({
  format,
  label = "Advertisement",
  className = "",
}: AdBannerProps) {
  const config = AD_CONFIGS[format];
  const uid = useId().replace(/[:]/g, "");
  const containerId = `ad-${format}-${uid}`;

  // Leaderboard is hidden on mobile/tablet (< 768px) to prevent overflow
  const isLeaderboard = format === "leaderboard";
  const wrapperDisplay = isLeaderboard ? "hidden md:flex" : "flex";

  // Total height = label (~16px) + gap (4px) + ad height + small breathing room
  const reservedHeight = config.height + 24;

  // Iframe document — ad network expects this exact structure
  const iframeDoc = `<!DOCTYPE html>
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

  return (
    <div
      className={`${wrapperDisplay} flex-col items-center ${className}`}
      data-ad-slot={format}
      style={{
        // Reserve height to prevent CLS — ad container occupies this much
        // space even before the iframe loads
        minHeight: reservedHeight,
        width: "100%",
      }}
    >
      {label !== null && (
        <span
          className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground/60"
          style={{ height: 16 }}
        >
          {label}
        </span>
      )}
      {/* Outer container: responsive, never overflows viewport */}
      <div
        className="relative mx-auto overflow-hidden rounded-md"
        style={{
          width: "100%",
          maxWidth: config.width,
          height: config.height,
          background: "#ffffff",
          border: "1px solid rgba(245, 230, 200, 0.25)",
        }}
      >
        <iframe
          id={containerId}
          title="Advertisement"
          srcDoc={iframeDoc}
          // Iframe keeps native ad dimensions; centered inside container
          style={{
            width: config.width,
            height: config.height,
            position: "absolute",
            left: "50%",
            top: 0,
            transform: "translateX(-50%)",
            border: "none",
            background: "#ffffff",
          }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
