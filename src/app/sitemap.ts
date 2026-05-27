import type { MetadataRoute } from "next";

const BASE = "https://octoshell.jp";

const LANDING_ROUTES = [
  "narita-airport-transfer",
  "haneda-airport-transfer",
  "tokyo-to-hakone",
  "tokyo-to-fuji",
  "tokyo-golf-transfer",
  "tokyo-by-the-hour",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const landingPages: MetadataRoute.Sitemap = LANDING_ROUTES.map((route) => ({
    url: `${BASE}/services/${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE}/book`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    ...landingPages,
    {
      url: `${BASE}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/law`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
