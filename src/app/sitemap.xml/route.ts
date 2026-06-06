export const dynamic = "force-static";
export const revalidate = 86400;

const BASE     = "https://octoshell.jp";
const BASE_TAT = "https://tokyoairporttransfer.com";

const LANGS = ["en", "ja", "zh", "ko", "fr", "de", "ar", "th"] as const;

const LANG_TO_HREFLANG: Record<string, string> = {
  en: "en", ja: "ja", zh: "zh-TW", ko: "ko", fr: "fr", de: "de", ar: "ar", th: "th",
};

const CONTENT_ROUTES = [
  { path: "",            priority: "1.0",  changefreq: "monthly" },
  { path: "/services",   priority: "0.95", changefreq: "monthly" },
  { path: "/book",       priority: "0.95", changefreq: "monthly" },
  { path: "/reviews",    priority: "0.85", changefreq: "monthly" },
  { path: "/fleet",      priority: "0.9",  changefreq: "monthly" },
  { path: "/faq",        priority: "0.9",  changefreq: "monthly" },
  { path: "/about",      priority: "0.8",  changefreq: "monthly" },
  { path: "/law",        priority: "0.3",  changefreq: "yearly"  },
  { path: "/privacy",    priority: "0.3",  changefreq: "yearly"  },
];

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

  function buildAlternates(path: string) {
    const alts = LANGS.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${LANG_TO_HREFLANG[l]}" href="${BASE}/${l}${path}"/>`
    ).join("\n");
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/en${path}"/>`;
    return `${alts}\n${xDefault}`;
  }

  const langUrls = CONTENT_ROUTES.flatMap(({ path, priority, changefreq }) =>
    LANGS.map((l) => `  <url>
    <loc>${BASE}/${l}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${buildAlternates(path)}
  </url>`)
  );

  const landingUrls = LANDING_ROUTES.flatMap((route) => {
    const path = `/services/${route}`;
    return LANGS.map((l) => `  <url>
    <loc>${BASE}/${l}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
${buildAlternates(path)}
  </url>`);
  });

  const tatUrls = [
    { loc: BASE_TAT,              priority: "1.0", changefreq: "monthly" },
    { loc: `${BASE_TAT}/airport`, priority: "1.0", changefreq: "monthly" },
  ].map(({ loc, priority, changefreq }) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...langUrls,
    ...landingUrls,
    ...tatUrls,
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
