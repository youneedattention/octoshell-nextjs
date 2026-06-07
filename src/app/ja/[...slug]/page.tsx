"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function JaFallback() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/ja" || pathname === "/ja/") return;
    const enPath = pathname.replace(/^\/ja/, "") || "/";
    window.location.replace(enPath);
  }, [pathname]);
  return null;
}
