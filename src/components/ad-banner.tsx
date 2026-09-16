"use client";

import { useId } from "react";

type AdFormat = "rectangle" | "leaderboard";

interface AdConfig {
  key: string;
  height: number;
  width: number;
}

const AD_CONFIGS: Record<AdFormat, AdConfig> = {
  // 300×250 medium rectangle — inline placement in content
  rectangle: {
    key: "23e98aeeab23e7beeb1305832f744d21",
    height: 250,
    width: 300,
  },
  // 728×90 leaderboard — wider inline placement (desktop)
  leaderboard: {
    key: "eb1282ffffa9c28d2f738f91511fd291",
    height: 90,
    width: 728,
  },
};

interface AdBannerProps {
  format: AdFormat;
  /**
   * Optional label shown above the ad slot. Defaults to "Advertisement".
   * Pass `null` to hide the label entirely.
   */
  label?: string | null;
  /**
   * Extra classes for the outer wrapper (e.g. margin/alignment).
   */
  className?: string;
}

/**
 * Reusable ad banner. Each ad is loaded inside its own sandboxed iframe
 * via `srcDoc` so that multiple ad slots on the same page don't clash
 * over the `atOptions` global variable the ad network uses.
 *
 * The iframe gets a clean white background so the ad creative is always
 * visible regardless of the site's dark theme.
 */
export function AdBanner({
  format,
  label = "Advertisement",
  className = "",
}: AdBannerProps) {
  const config = AD_CONFIGS[format];
  // Stable unique id for this slot
  const uid = useId().replace(/[:]/g, "");
  const containerId = `ad-${format}-${uid}`;

  // Build the iframe document — this is what the ad network expects
  // to find inside its host page, but isolated per slot.
  const iframeDoc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html, body { margin: 0; padding: 0; background: #ffffff; }
  body { display: flex; align-items: center; justify-content: center;
         min-height: ${config.height}px; min-width: ${config.width}px;
         overflow: hidden; }
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
      className={`flex flex-col items-center ${className}`}
      data-ad-slot={format}
    >
      {label !== null && (
        <span className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground/60">
          {label}
        </span>
      )}
      <iframe
        id={containerId}
        title="Advertisement"
        // srcDoc isolates each ad in its own document so multiple ad
        // slots can coexist on the same page.
        srcDoc={iframeDoc}
        width={config.width}
        height={config.height}
        // White background so ad creatives are always visible
        style={{
          minWidth: config.width,
          minHeight: config.height,
          maxWidth: "100%",
          background: "#ffffff",
          border: "1px solid rgba(245, 230, 200, 0.25)",
          borderRadius: "8px",
        }}
        loading="lazy"
        // Allow the ad network's scripts to run inside the iframe
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
