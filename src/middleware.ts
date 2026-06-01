import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  /* ── tokyoairporttransfer.com → airport landing page ── */
  if (host.includes("tokyoairporttransfer.com")) {
    const { pathname } = request.nextUrl;

    /* Already on /airport* → let it through */
    if (pathname.startsWith("/airport")) {
      return NextResponse.next();
    }

    /* Everything else → redirect to dedicated airport page */
    const url = request.nextUrl.clone();
    url.pathname = "/airport";
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)).*)"],
};
