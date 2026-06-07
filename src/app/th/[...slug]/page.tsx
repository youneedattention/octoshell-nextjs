"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function ThFallback() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/th" || pathname === "/th/") return;
    const enPath = pathname.replace(/^\/th/, "") || "/";
    window.location.replace(enPath);
  }, [pathname]);
  return null;
}
