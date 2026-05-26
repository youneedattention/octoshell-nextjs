import type { MetadataRoute } from "next";

const BASE = "https://octoshell.jp";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date("2025-05-26"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE}/services`,
      lastModified: new Date("2025-05-26"),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE}/book`,
      lastModified: new Date("2025-05-26"),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date("2025-05-26"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/law`,
      lastModified: new Date("2025-05-26"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: new Date("2025-05-26"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
