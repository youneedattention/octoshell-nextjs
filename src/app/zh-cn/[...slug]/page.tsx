"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function ZhCnFallback() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/zh-cn" || pathname === "/zh-cn/") return;
    const enPath = pathname.replace(/^\/zh-cn/, "") || "/";
    window.location.replace(enPath);
  }, [pathname]);
  return null;
}
