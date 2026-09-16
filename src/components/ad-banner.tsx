"use client";

import Script from "next/script";

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
 * Reusable ad banner. Renders the ad network's `atOptions` config script
 * followed by the invoke.js script. Each ad slot gets a unique container
 * id so multiple ads on the same page don't collide.
 *
 * Uses next/script with the `afterInteractive` strategy so the ad
 * script loads after first paint and doesn't block the page.
 */
export function AdBanner({
  format,
  label = "Advertisement",
  className = "",
}: AdBannerProps) {
  const config = AD_CONFIGS[format];
  // Unique id per slot, stable across renders
  const containerId = `ad-${format}-${config.key.slice(-6)}`;

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
      <div
        id={containerId}
        className="flex min-h-[${config.height}px] items-center justify-center overflow-hidden rounded-md border border-border/40 bg-card/30"
        style={{ minWidth: config.width, minHeight: config.height, maxWidth: "100%" }}
      >
        <Script
          id={`${containerId}-config`}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `atOptions = {
              'key' : '${config.key}',
              'format' : 'iframe',
              'height' : ${config.height},
              'width' : ${config.width},
              'params' : {}
            };`,
          }}
        />
        <Script
          id={`${containerId}-invoke`}
          strategy="afterInteractive"
          src={`https://www.highrevenueformat.com/${config.key}/invoke.js`}
        />
      </div>
    </div>
  );
}
