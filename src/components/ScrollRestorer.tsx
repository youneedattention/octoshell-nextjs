"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestorer() {
  const pathname = usePathname();
  const isPopRef = useRef(false);

  // Disable browser's native scroll restoration so we control it
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  // Detect back/forward button
  useEffect(() => {
    const onPop = () => { isPopRef.current = true; };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const key = `sp:${pathname}`;

    if (isPopRef.current) {
      // Back/forward: restore saved position
      isPopRef.current = false;
      const saved = sessionStorage.getItem(key);
      if (saved) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo(0, +saved);
          });
        });
      }
    }
    // Fresh navigation / language switch: let Next.js handle scroll
    // (Link scrolls to top by default; router.push({ scroll: false }) preserves position)

    // Continuously save scroll position for this route
    const handler = () => sessionStorage.setItem(key, String(window.scrollY));
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [pathname]);

  return null;
}
