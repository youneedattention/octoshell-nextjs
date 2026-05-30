"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "@/lib/translations";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangCtx>({ lang: "en", setLang: () => {} });

function detectLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("octoshell-lang") as Lang | null;
  if (stored === "en" || stored === "ja" || stored === "zh") return stored;
  const b = navigator.language.toLowerCase();
  if (b.startsWith("ja")) return "ja";
  if (b.startsWith("zh")) return "zh";
  return "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

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
