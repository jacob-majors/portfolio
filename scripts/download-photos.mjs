/**
 * Downloads all photos from jacobmajorsmedia Google Sites portfolio
 * and saves them to public/photos/[category]/[event]/
 * Run with: node scripts/download-photos.mjs
 */

import { chromium } from "playwright";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public", "photos");

const EVENTS = [
  // Bike Races — NICA
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/nica/nica-exchequer-25", dir: "bike-races/nica/nica-exchequer-25" },
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/nica/nica-fort-ord-25", dir: "bike-races/nica/nica-fort-ord-25" },
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/nica/nica-ford-ord-24", dir: "bike-races/nica/nica-fort-ord-24" },
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/nica/nica-granite-bay-24", dir: "bike-races/nica/nica-granite-bay-24" },
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/nica/nica-exchequer-24", dir: "bike-races/nica/nica-exchequer-24" },
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/nica/nica-six-sigma-24", dir: "bike-races/nica/nica-six-sigma-24" },
  // Bike Races — USAC
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/usac/pro-men-nationals", dir: "bike-races/usac/pro-men-nationals" },
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/usac/xcc-15-16-men-nationals", dir: "bike-races/usac/xcc-15-16-nationals" },
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/usac/xco-15-16-men-nationals", dir: "bike-races/usac/xco-15-16-nationals" },
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/usac/kenda-cup-24", dir: "bike-races/usac/kenda-cup-24" },
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/usac/sea-otter-dual-slalom", dir: "bike-races/usac/sea-otter-dual-slalom" },
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/usac/sea-otter-road", dir: "bike-races/usac/sea-otter-road" },
  // Bike Races — Summit Shorty
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/summit-shorty/summit-shorty-1-24", dir: "bike-races/summit-shorty/summit-shorty-1-24" },
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/summit-shorty/summit-shorty-2-24", dir: "bike-races/summit-shorty/summit-shorty-2-24" },
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/bike-races/summit-shorty/summit-shorty-6-24", dir: "bike-races/summit-shorty/summit-shorty-6-24" },
  // Basketball
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/basketball/sa-vs-victory-academy", dir: "basketball/sa-vs-victory-academy" },
  // Soccer
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/soccer/sa-vs-tech-high", dir: "soccer/sa-vs-tech-high" },
  // Climbing
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/climbing/session-climbing", dir: "climbing/session-climbing" },
  { url: "https://sites.google.com/view/jacobmajorsmedia/portfolio/climbing/tahoe-team-trip", dir: "climbing/tahoe-team-trip" },
];

async function downloadBuffer(url, page) {
  try {
    const response = await page.request.get(url);
    if (response.ok()) return await response.body();
  } catch {}
  return null;
}

async function scrapeEvent(browser, event) {
  const dir = join(PUBLIC_DIR, event.dir);
  mkdirSync(dir, { recursive: true });

  const page = await browser.newPage();
  const downloaded = [];

  try {
    console.log(`\n→ ${event.dir}`);
    await page.goto(event.url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(2000);

    // Find all content images (exclude logos/icons)
    const imgUrls = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll("img"));
      return imgs
        .map((img) => img.src)
        .filter((src) => {
          if (!src) return false;
          if (src.includes("lh3.googleusercontent.com")) return true;
          return false;
        })
        .filter((src, i, arr) => arr.indexOf(src) === i); // dedupe
    });

    // Filter out header/logo images (very wide ones tend to be headers)
    const contentImgs = imgUrls.filter(
      (url) => !url.includes("=w16383") // skip full-width header images
    );

    console.log(`  Found ${contentImgs.length} photos`);

    for (let i = 0; i < contentImgs.length; i++) {
      const url = contentImgs[i];
      const filename = `${String(i + 1).padStart(3, "0")}.jpg`;
      const filepath = join(dir, filename);

      if (existsSync(filepath)) {
        console.log(`  [${i + 1}/${contentImgs.length}] skip (exists) ${filename}`);
        downloaded.push({ local: `/photos/${event.dir}/${filename}`, url });
        continue;
      }

      const buf = await downloadBuffer(url, page);
      if (buf) {
        writeFileSync(filepath, buf);
        console.log(`  [${i + 1}/${contentImgs.length}] saved ${filename}`);
        downloaded.push({ local: `/photos/${event.dir}/${filename}`, url });
      } else {
        console.log(`  [${i + 1}/${contentImgs.length}] FAILED ${url.slice(0, 60)}`);
      }
    }
  } catch (err) {
    console.error(`  ERROR: ${err.message}`);
  } finally {
    await page.close();
  }

  return downloaded;
}

async function main() {
  console.log("Starting photo download from jacobmajorsmedia...\n");
  mkdirSync(PUBLIC_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const results = {};

  for (const event of EVENTS) {
    const photos = await scrapeEvent(browser, event);
    results[event.dir] = photos;
  }

  await browser.close();

  // Write results manifest
  const manifestPath = join(ROOT, "src", "data", "photo-manifest.json");
  writeFileSync(manifestPath, JSON.stringify(results, null, 2));
  console.log(`\n✓ Manifest written to src/data/photo-manifest.json`);

  const total = Object.values(results).flat().length;
  console.log(`✓ Downloaded ${total} photos total`);
}

main().catch(console.error);
