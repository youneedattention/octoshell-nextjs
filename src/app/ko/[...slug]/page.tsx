"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function KoFallback() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/ko" || pathname === "/ko/") return;
    const enPath = pathname.replace(/^\/ko/, "") || "/";
    window.location.replace(enPath);
  }, [pathname]);
  return null;
}
