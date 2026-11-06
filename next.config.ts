import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  /**
   * Permanent 301 redirect — every URL on this Vercel site is redirected
   * to the main website at https://moonphaseemoji.com/.
   *
   * Vercel compiles these Next.js redirects into edge-level rules, so the
   * redirect fires instantly at the CDN edge before any page is rendered.
   *
   * statusCode: 301 gives the classic permanent redirect that passes full
   * SEO link equity and is recognised by every browser, crawler, and tool.
   *
   * No redirect loop risk: the destination is a completely different domain
   * (moonphaseemoji.com), so there is no way for the redirect to cycle back
   * to this Vercel site.
   *
   * Two rules cover every possible URL pattern:
   *   - "/"        catches the root URL
   *   - "/:path*"  catches every other path (including nested segments)
   */
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://moonphaseemoji.com/",
        statusCode: 301,
      },
      {
        source: "/:path*",
        destination: "https://moonphaseemoji.com/",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
