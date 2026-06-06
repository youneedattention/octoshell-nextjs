"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Lang } from "@/lib/translations";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const VALID: Lang[] = ["en", "ja", "zh"];

const LangContext = createContext<LangCtx>({ lang: "en", setLang: () => {} });

function detectLang(): Lang {
  const stored = localStorage.getItem("octoshell-lang") as Lang | null;
  if (stored && VALID.includes(stored)) return stored;
  const b = navigator.language.toLowerCase();
  if (b.startsWith("ja")) return "ja";
  if (b.startsWith("zh")) return "zh";
  return "en";
}

export function LangProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  /* Always start with initialLang (for zh/ pages) or "en" so server and
     client initial render match — avoids React hydration mismatch errors. */
  const [lang, setLangState] = useState<Lang>(initialLang ?? "en");

  /* After mount: read localStorage preference (client-only) */
  useEffect(() => {
    if (!initialLang) {
      setLangState(detectLang());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setLang(l: Lang) {
    localStorage.setItem("octoshell-lang", l);
    setLangState(l);
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
