export const dynamic = "force-static";
export const revalidate = 86400; // regenerate every 24 h

const BASE     = "https://octoshell.jp";
const BASE_TAT = "https://tokyoairporttransfer.com";

const LANDING_ROUTES = [
  "narita-airport-transfer",
  "haneda-airport-transfer",
  "tokyo-to-hakone",
  "tokyo-to-fuji",
  "tokyo-golf-transfer",
  "tokyo-by-the-hour",
] as const;

export async function GET() {
  const now = new Date().toISOString();

  const urls: { loc: string; priority: string; changefreq: string }[] = [
    { loc: BASE,                    priority: "1.0",  changefreq: "monthly" },
    { loc: `${BASE}/services`,      priority: "0.95", changefreq: "monthly" },
    { loc: `${BASE}/book`,          priority: "0.95", changefreq: "monthly" },
    { loc: `${BASE}/reviews`,       priority: "0.85", changefreq: "monthly" },
    ...LANDING_ROUTES.map((route) => ({
      loc:         `${BASE}/services/${route}`,
      priority:    "0.9",
      changefreq:  "monthly",
    })),
    { loc: `${BASE}/fleet`, priority: "0.9", changefreq: "monthly" },
    { loc: `${BASE}/faq`,   priority: "0.9", changefreq: "monthly" },
    { loc: `${BASE}/about`,   priority: "0.8", changefreq: "monthly" },
    { loc: `${BASE}/law`,     priority: "0.3", changefreq: "yearly"  },
    { loc: `${BASE}/privacy`, priority: "0.3", changefreq: "yearly"  },
    /* tokyoairporttransfer.com */
    { loc: `${BASE_TAT}`,         priority: "1.0", changefreq: "monthly" },
    { loc: `${BASE_TAT}/airport`, priority: "1.0", changefreq: "monthly" },
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      ({ loc, priority, changefreq }) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    ),
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
