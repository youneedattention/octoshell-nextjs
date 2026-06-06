"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Catch-all fallback for /zh/* paths without an explicit zh page file.
 * Redirects to the English equivalent — users never see a 404.
 *
 * Rule: whenever a new page is added at /[page], ALSO create:
 *   src/app/zh/[page]/page.tsx  →  export { default } from "@/app/[page]/page";
 */
export default function ZhFallback() {
  const pathname = usePathname();

  useEffect(() => {
    // Guard: if somehow the zh root is matched, don't redirect
    if (pathname === "/zh" || pathname === "/zh/") return;
    const enPath = pathname.replace(/^\/zh/, "") || "/";
    window.location.replace(enPath);
  }, [pathname]);

  return null;
}
