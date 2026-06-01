import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  /* ── tokyoairporttransfer.com → airport landing page ── */
  if (host.includes("tokyoairporttransfer.com")) {
    const { pathname } = request.nextUrl;

    /* Paths to let through on tokyoairporttransfer.com */
    const allowed = ["/airport", "/book", "/api", "/reviews", "/about", "/sitemap.xml", "/robots.txt"];
    if (allowed.some((p) => pathname.startsWith(p))) {
      return NextResponse.next();
    }

    /* Everything else (i.e. "/") → redirect to airport landing page */
    const url = request.nextUrl.clone();
    url.pathname = "/airport";
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)).*)"],
};
