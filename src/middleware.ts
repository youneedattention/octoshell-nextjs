import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_LANGS = ["en", "ja", "zh", "ko", "fr", "de", "ar", "th"] as const;
type Lang = (typeof VALID_LANGS)[number];

/* Non-prefixed paths that should be left alone (legacy / API / special) */
const BYPASS_STARTS = [
  "/api", "/airport", "/_next", "/robots.txt", "/sitemap.xml",
];

function detectLang(req: NextRequest): Lang {
  const accept = req.headers.get("accept-language") ?? "";
  const parts = accept.split(",").map((s) => s.split(";")[0].trim().toLowerCase());
  for (const p of parts) {
    if (p.startsWith("ko")) return "ko";
    if (p.startsWith("ja")) return "ja";
    if (p.startsWith("zh")) return "zh";
    if (p.startsWith("fr")) return "fr";
    if (p.startsWith("de")) return "de";
    if (p.startsWith("ar")) return "ar";
    if (p.startsWith("th")) return "th";
  }
  return "en";
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  /* ── Block Vercel preview domain from Google ── */
  if (host.includes("vercel.app")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  /* ── tokyoairporttransfer.com → airport landing page ── */
  if (host.includes("tokyoairporttransfer.com")) {
    if (pathname === "/sitemap.xml") {
      const url = request.nextUrl.clone();
      url.pathname = "/airport/sitemap.xml";
      return NextResponse.rewrite(url);
    }
    const allowed = ["/airport", "/book", "/api", "/reviews", "/about", "/robots.txt"];
    if (allowed.some((p) => pathname.startsWith(p))) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = "/airport";
    return NextResponse.redirect(url, { status: 301 });
  }

  /* ── Language prefix routing ── */

  /* Bypass: API, special paths, static assets */
  if (BYPASS_STARTS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  /* 1. Valid lang prefix: /ko/services → rewrite to /services, set x-lang header */
  const firstSeg = pathname.split("/")[1] as Lang;
  if (VALID_LANGS.includes(firstSeg as Lang)) {
    const rest = pathname.slice(firstSeg.length + 1) || "/";
    const url = request.nextUrl.clone();
    url.pathname = rest;
    const response = NextResponse.rewrite(url);
    response.headers.set("x-lang", firstSeg);
    return response;
  }

  /* 2. Root "/" → browser-language redirect */
  if (pathname === "/") {
    const lang = detectLang(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${lang}`;
    return NextResponse.redirect(url, { status: 302 });
  }

  /* 3. Non-prefixed content pages → 301 to /en equivalent for canonical SEO */
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.redirect(url, { status: 301 });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)).*)"],
};
