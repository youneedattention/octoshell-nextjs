"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function FrFallback() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/fr" || pathname === "/fr/") return;
    const enPath = pathname.replace(/^\/fr/, "") || "/";
    window.location.replace(enPath);
  }, [pathname]);
  return null;
}
