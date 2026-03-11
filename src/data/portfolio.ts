// Static portfolio data — photos downloaded locally from jacobmajorsmedia Google Sites
// All images served from public/photos/

import manifest from "./photo-manifest.json";

export interface PortfolioPhoto {
  url: string;
  alt: string;
}

export interface PortfolioEvent {
  id: string;
  title: string;
  category: "bike-races" | "basketball" | "soccer" | "climbing";
  subcategory?: string;
  slug: string;
  coverPhoto: string;
  photos: PortfolioPhoto[];
  featured?: boolean;
}

function photosFromManifest(key: string, altPrefix: string): PortfolioPhoto[] {
  const entries = (manifest as Record<string, { local: string }[]>)[key] ?? [];
  return entries.map((e, i) => ({ url: e.local, alt: `${altPrefix} — ${i + 1}` }));
}

function cover(key: string): string {
  const entries = (manifest as Record<string, { local: string }[]>)[key] ?? [];
  return entries[0]?.local ?? "";
}

// Hero slides: 4 best shots used on the homepage
export const HERO_PHOTOS = [
  {
    url: "/photos/bike-races/nica/nica-exchequer-25/001.jpg",
    headline: "Jacob Majors",
    sub: "Action-Sports Photographer",
  },
  {
    url: "/photos/bike-races/usac/pro-men-nationals/001.jpg",
    headline: "USA Cycling Nationals.",
    sub: "Pro Men — XCO & XCC",
  },
  {
    url: "/photos/climbing/session-climbing/001.jpg",
    headline: "On the rock.",
    sub: "Climbing — Session & Tahoe",
  },
  {
    url: "/photos/basketball/sa-vs-victory-academy/001.jpg",
    headline: "Court vision.",
    sub: "Basketball — Sonoma Academy",
  },
];

export const EVENTS: PortfolioEvent[] = [
  // ── BIKE RACES › NICA ─────────────────────────────────────────────────
  {
    id: "nica-exchequer-25",
    title: "NICA | Exchequer '25",
    category: "bike-races",
    subcategory: "NICA",
    slug: "nica-exchequer-25",
    featured: true,
    coverPhoto: cover("bike-races/nica/nica-exchequer-25"),
    photos: photosFromManifest("bike-races/nica/nica-exchequer-25", "NICA Exchequer 2025"),
  },
  {
    id: "nica-fort-ord-25",
    title: "NICA | Fort Ord '25",
    category: "bike-races",
    subcategory: "NICA",
    slug: "nica-fort-ord-25",
    featured: true,
    coverPhoto: cover("bike-races/nica/nica-fort-ord-25"),
    photos: photosFromManifest("bike-races/nica/nica-fort-ord-25", "NICA Fort Ord 2025"),
  },
  {
    id: "nica-fort-ord-24",
    title: "NICA | Fort Ord '24",
    category: "bike-races",
    subcategory: "NICA",
    slug: "nica-fort-ord-24",
    coverPhoto: cover("bike-races/nica/nica-fort-ord-24"),
    photos: photosFromManifest("bike-races/nica/nica-fort-ord-24", "NICA Fort Ord 2024"),
  },
  {
    id: "nica-granite-bay-24",
    title: "NICA | Granite Bay '24",
    category: "bike-races",
    subcategory: "NICA",
    slug: "nica-granite-bay-24",
    featured: true,
    coverPhoto: cover("bike-races/nica/nica-granite-bay-24"),
    photos: photosFromManifest("bike-races/nica/nica-granite-bay-24", "NICA Granite Bay 2024"),
  },
  {
    id: "nica-exchequer-24",
    title: "NICA | Exchequer '24",
    category: "bike-races",
    subcategory: "NICA",
    slug: "nica-exchequer-24",
    coverPhoto: cover("bike-races/nica/nica-exchequer-24"),
    photos: photosFromManifest("bike-races/nica/nica-exchequer-24", "NICA Exchequer 2024"),
  },
  {
    id: "nica-six-sigma-24",
    title: "NICA | Six Sigma '24",
    category: "bike-races",
    subcategory: "NICA",
    slug: "nica-six-sigma-24",
    featured: true,
    coverPhoto: cover("bike-races/nica/nica-six-sigma-24"),
    photos: photosFromManifest("bike-races/nica/nica-six-sigma-24", "NICA Six Sigma 2024"),
  },
  // ── BIKE RACES › USAC ─────────────────────────────────────────────────
  {
    id: "usac-pro-men-nationals",
    title: "Pro Men | Nationals",
    category: "bike-races",
    subcategory: "USAC",
    slug: "usac-pro-men-nationals",
    featured: true,
    coverPhoto: cover("bike-races/usac/pro-men-nationals"),
    photos: photosFromManifest("bike-races/usac/pro-men-nationals", "Pro Men Nationals"),
  },
  {
    id: "usac-xcc-15-16-nationals",
    title: "XCC 15-16 Men | Nationals",
    category: "bike-races",
    subcategory: "USAC",
    slug: "usac-xcc-15-16-nationals",
    coverPhoto: cover("bike-races/usac/xcc-15-16-nationals"),
    photos: photosFromManifest("bike-races/usac/xcc-15-16-nationals", "XCC 15-16 Nationals"),
  },
  {
    id: "usac-xco-15-16-nationals",
    title: "XCO 15-16 Men | Nationals",
    category: "bike-races",
    subcategory: "USAC",
    slug: "usac-xco-15-16-nationals",
    featured: true,
    coverPhoto: cover("bike-races/usac/xco-15-16-nationals"),
    photos: photosFromManifest("bike-races/usac/xco-15-16-nationals", "XCO 15-16 Nationals"),
  },
  {
    id: "usac-kenda-cup-24",
    title: "Kenda Cup '24",
    category: "bike-races",
    subcategory: "USAC",
    slug: "usac-kenda-cup-24",
    coverPhoto: cover("bike-races/usac/kenda-cup-24"),
    photos: photosFromManifest("bike-races/usac/kenda-cup-24", "Kenda Cup 2024"),
  },
  {
    id: "usac-sea-otter-dual-slalom",
    title: "Sea Otter — Dual Slalom",
    category: "bike-races",
    subcategory: "USAC",
    slug: "usac-sea-otter-dual-slalom",
    featured: true,
    coverPhoto: cover("bike-races/usac/sea-otter-dual-slalom"),
    photos: photosFromManifest("bike-races/usac/sea-otter-dual-slalom", "Sea Otter Dual Slalom"),
  },
  {
    id: "usac-sea-otter-road",
    title: "Sea Otter — Road",
    category: "bike-races",
    subcategory: "USAC",
    slug: "usac-sea-otter-road",
    coverPhoto: cover("bike-races/usac/sea-otter-road"),
    photos: photosFromManifest("bike-races/usac/sea-otter-road", "Sea Otter Road"),
  },
  // ── BIKE RACES › Summit Shorty ────────────────────────────────────────
  {
    id: "summit-shorty-1-24",
    title: "Summit Shorty #1 '24",
    category: "bike-races",
    subcategory: "Summit Shorty",
    slug: "summit-shorty-1-24",
    coverPhoto: cover("bike-races/summit-shorty/summit-shorty-1-24"),
    photos: photosFromManifest("bike-races/summit-shorty/summit-shorty-1-24", "Summit Shorty 1 2024"),
  },
  {
    id: "summit-shorty-2-24",
    title: "Summit Shorty #2 '24",
    category: "bike-races",
    subcategory: "Summit Shorty",
    slug: "summit-shorty-2-24",
    coverPhoto: cover("bike-races/summit-shorty/summit-shorty-2-24"),
    photos: photosFromManifest("bike-races/summit-shorty/summit-shorty-2-24", "Summit Shorty 2 2024"),
  },
  {
    id: "summit-shorty-6-24",
    title: "Summit Shorty #6 '24",
    category: "bike-races",
    subcategory: "Summit Shorty",
    slug: "summit-shorty-6-24",
    coverPhoto: cover("bike-races/summit-shorty/summit-shorty-6-24"),
    photos: photosFromManifest("bike-races/summit-shorty/summit-shorty-6-24", "Summit Shorty 6 2024"),
  },
  // ── BASKETBALL ────────────────────────────────────────────────────────
  {
    id: "basketball-sa-vs-victory-academy",
    title: "SA vs Victory Academy",
    category: "basketball",
    slug: "sa-vs-victory-academy",
    featured: true,
    coverPhoto: cover("basketball/sa-vs-victory-academy"),
    photos: photosFromManifest("basketball/sa-vs-victory-academy", "SA vs Victory Academy"),
  },
  // ── SOCCER ────────────────────────────────────────────────────────────
  {
    id: "soccer-sa-vs-tech-high",
    title: "SA vs Tech High",
    category: "soccer",
    slug: "sa-vs-tech-high",
    featured: true,
    coverPhoto: cover("soccer/sa-vs-tech-high"),
    photos: photosFromManifest("soccer/sa-vs-tech-high", "SA vs Tech High"),
  },
  // ── CLIMBING ──────────────────────────────────────────────────────────
  {
    id: "climbing-session",
    title: "Session Climbing",
    category: "climbing",
    slug: "climbing-session",
    featured: true,
    coverPhoto: cover("climbing/session-climbing"),
    photos: photosFromManifest("climbing/session-climbing", "Session Climbing"),
  },
  {
    id: "climbing-tahoe-team-trip",
    title: "Tahoe Team Trip",
    category: "climbing",
    slug: "climbing-tahoe-team-trip",
    featured: true,
    coverPhoto: cover("climbing/tahoe-team-trip"),
    photos: photosFromManifest("climbing/tahoe-team-trip", "Tahoe Climbing Trip"),
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  "bike-races": "Bike Races",
  basketball: "Basketball",
  soccer: "Soccer",
  climbing: "Climbing",
};
