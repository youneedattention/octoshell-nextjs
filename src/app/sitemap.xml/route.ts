export const dynamic = "force-static";
export const revalidate = 86400;

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

const CONTENT_PATHS = [
  { path: "",          priority: "1.0",  changefreq: "monthly" },
  { path: "/services", priority: "0.95", changefreq: "monthly" },
  { path: "/book",     priority: "0.95", changefreq: "monthly" },
  { path: "/reviews",  priority: "0.85", changefreq: "monthly" },
  { path: "/fleet",    priority: "0.9",  changefreq: "monthly" },
  { path: "/faq",      priority: "0.9",  changefreq: "monthly" },
  { path: "/about",    priority: "0.8",  changefreq: "monthly" },
  { path: "/law",      priority: "0.3",  changefreq: "yearly"  },
  { path: "/privacy",  priority: "0.3",  changefreq: "yearly"  },
];

function urlEntry(loc: string, priority: string, changefreq: string, lastmod: string, alts?: { hreflang: string; href: string }[]) {
  const altXml = alts
    ? alts.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`)
        .join("\n")
    : "";
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${altXml}
  </url>`;
}

export async function GET() {
  const now = new Date().toISOString();
  const entries: string[] = [];

  /* ── Core content pages — all 7 language alternates ── */
  for (const { path, priority, changefreq } of CONTENT_PATHS) {
    const alts = [
      { hreflang: "en",        href: `${BASE}${path}` },
      { hreflang: "ja",        href: `${BASE}/ja${path}` },
      { hreflang: "zh-TW",     href: `${BASE}/zh${path}` },
      { hreflang: "zh-CN",     href: `${BASE}/zh-cn${path}` },
      { hreflang: "ko",        href: `${BASE}/ko${path}` },
      { hreflang: "th",        href: `${BASE}/th${path}` },
      { hreflang: "fr",        href: `${BASE}/fr${path}` },
      { hreflang: "x-default", href: `${BASE}${path}` },
    ];
    entries.push(urlEntry(`${BASE}${path}`,       priority, changefreq, now, alts));
    entries.push(urlEntry(`${BASE}/ja${path}`,    priority, changefreq, now, alts));
    entries.push(urlEntry(`${BASE}/zh${path}`,    priority, changefreq, now, alts));
    entries.push(urlEntry(`${BASE}/zh-cn${path}`, priority, changefreq, now, alts));
    entries.push(urlEntry(`${BASE}/ko${path}`,    priority, changefreq, now, alts));
    entries.push(urlEntry(`${BASE}/th${path}`,    priority, changefreq, now, alts));
    entries.push(urlEntry(`${BASE}/fr${path}`,    priority, changefreq, now, alts));
  }

  /* ── Service landing pages — all 7 language alternates ── */
  for (const route of LANDING_ROUTES) {
    const en   = `${BASE}/services/${route}`;
    const jap  = `${BASE}/ja/services/${route}`;
    const zhp  = `${BASE}/zh/services/${route}`;
    const zhcn = `${BASE}/zh-cn/services/${route}`;
    const kop  = `${BASE}/ko/services/${route}`;
    const thp  = `${BASE}/th/services/${route}`;
    const frp  = `${BASE}/fr/services/${route}`;
    const alts = [
      { hreflang: "en",        href: en   },
      { hreflang: "ja",        href: jap  },
      { hreflang: "zh-TW",     href: zhp  },
      { hreflang: "zh-CN",     href: zhcn },
      { hreflang: "ko",        href: kop  },
      { hreflang: "th",        href: thp  },
      { hreflang: "fr",        href: frp  },
      { hreflang: "x-default", href: en   },
    ];
    entries.push(urlEntry(en,   "0.9", "monthly", now, alts));
    entries.push(urlEntry(jap,  "0.9", "monthly", now, alts));
    entries.push(urlEntry(zhp,  "0.9", "monthly", now, alts));
    entries.push(urlEntry(zhcn, "0.9", "monthly", now, alts));
    entries.push(urlEntry(kop,  "0.9", "monthly", now, alts));
    entries.push(urlEntry(thp,  "0.9", "monthly", now, alts));
    entries.push(urlEntry(frp,  "0.9", "monthly", now, alts));
  }

  /* ── tokyoairporttransfer.com ── */
  entries.push(urlEntry(`${BASE_TAT}`,          "1.0", "monthly", now));
  entries.push(urlEntry(`${BASE_TAT}/airport`,  "1.0", "monthly", now));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
