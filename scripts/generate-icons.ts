/**
 * Generate PNG icons from the SVG favicon and OG image SVG.
 * Uses sharp (already a project dependency).
 *
 * Outputs (all into /public):
 *   - og-image.png        (1200×630, for OpenGraph / Twitter / social shares)
 *   - apple-touch-icon.png (180×180, for iOS home screen)
 *   - icon-192.png        (192×192, for PWA manifest)
 *   - icon-512.png        (512×512, for PWA manifest)
 *   - favicon-32.png      (32×32, classic browser tab)
 *   - favicon-16.png      (16×16, legacy)
 */

import sharp from "sharp";
import { readFile } from "fs/promises";
import { join } from "path";

const PUBLIC_DIR = "/home/z/my-project/public";
const SCRIPTS_DIR = "/home/z/my-project/scripts";

async function generate() {
  const faviconSvg = await readFile(join(PUBLIC_DIR, "favicon.svg"));
  const ogImageSvg = await readFile(join(SCRIPTS_DIR, "og-image.svg"));

  console.log("Generating PNG icons…\n");

  // From favicon.svg
  await sharp(faviconSvg)
    .resize(180, 180)
    .png()
    .toFile(join(PUBLIC_DIR, "apple-touch-icon.png"));
  console.log("  ✓ apple-touch-icon.png (180×180)");

  await sharp(faviconSvg)
    .resize(192, 192)
    .png()
    .toFile(join(PUBLIC_DIR, "icon-192.png"));
  console.log("  ✓ icon-192.png (192×192)");

  await sharp(faviconSvg)
    .resize(512, 512)
    .png()
    .toFile(join(PUBLIC_DIR, "icon-512.png"));
  console.log("  ✓ icon-512.png (512×512)");

  await sharp(faviconSvg)
    .resize(32, 32)
    .png()
    .toFile(join(PUBLIC_DIR, "favicon-32.png"));
  console.log("  ✓ favicon-32.png (32×32)");

  await sharp(faviconSvg)
    .resize(16, 16)
    .png()
    .toFile(join(PUBLIC_DIR, "favicon-16.png"));
  console.log("  ✓ favicon-16.png (16×16)");

  // From og-image.svg
  await sharp(ogImageSvg)
    .resize(1200, 630)
    .png()
    .toFile(join(PUBLIC_DIR, "og-image.png"));
  console.log("  ✓ og-image.png (1200×630)");

  console.log("\nDone. All PNG icons generated into /public.");
}

generate().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});
