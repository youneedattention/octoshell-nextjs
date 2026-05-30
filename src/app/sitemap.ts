import type { MetadataRoute } from "next";

const BASE = "https://octoshell.jp";

const SERVICE_ROUTES = [
  "airport", "hourly", "oneway", "photo",
  "events", "sightseeing", "golf", "outdoor", "ceremony",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,               lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/about`,    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/book`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...SERVICE_ROUTES.map((r) => ({
      url: `${BASE}/services/${r}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${BASE}/privacy`,  lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/law`,      lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
