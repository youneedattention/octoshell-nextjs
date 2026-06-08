"use client";
import { useEffect } from "react";

/**
 * On every page load / refresh, scroll to the very top.
 * Overrides browser's native scroll restoration which sometimes
 * remembers the previous position on mobile refresh.
 */
export default function ScrollRestorer() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return null;
}
