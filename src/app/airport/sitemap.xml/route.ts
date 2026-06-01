export const dynamic = "force-static";

const BASE = "https://tokyoairporttransfer.com";

export async function GET() {
  const now = new Date().toISOString();

  const urls = [
    { loc: `${BASE}`,         priority: "1.0",  changefreq: "weekly"  },
    { loc: `${BASE}/airport`, priority: "1.0",  changefreq: "weekly"  },
    { loc: `${BASE}/book`,    priority: "0.95", changefreq: "monthly" },
    { loc: `${BASE}/reviews`, priority: "0.8",  changefreq: "monthly" },
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(({ loc, priority, changefreq }) =>
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
