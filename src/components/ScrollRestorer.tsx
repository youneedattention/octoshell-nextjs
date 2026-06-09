"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestorer() {
  const pathname = usePathname();
  const isPopRef = useRef(false);

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
    } else {
      // Fresh navigation: scroll to top
      window.scrollTo(0, 0);
    }

    // Save scroll position continuously for this route
    const handler = () => sessionStorage.setItem(key, String(window.scrollY));
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [pathname]);

  return null;
}
