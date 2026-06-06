"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang, AppLang } from "@/lib/translations";
import { VALID_LANGS, toContentLang } from "@/lib/translations";

interface LangCtx {
  appLang: AppLang;
  lang: Lang;
  setLang: (l: AppLang) => void;
}

const LangContext = createContext<LangCtx>({
  appLang: "en",
  lang: "en",
  setLang: () => {},
});

function detectLang(): AppLang {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("octoshell-lang") as AppLang | null;
  if (stored && VALID_LANGS.includes(stored)) return stored;
  const b = navigator.language.toLowerCase();
  if (b.startsWith("ko")) return "ko";
  if (b.startsWith("ja")) return "ja";
  if (b.startsWith("zh")) return "zh";
  if (b.startsWith("fr")) return "fr";
  if (b.startsWith("de")) return "de";
  if (b.startsWith("ar")) return "ar";
  if (b.startsWith("th")) return "th";
  return "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [appLang, setAppLangState] = useState<AppLang>(detectLang);

  function setLang(l: AppLang) {
    localStorage.setItem("octoshell-lang", l);
    setAppLangState(l);
  }

  const lang = toContentLang(appLang);

  return (
    <LangContext.Provider value={{ appLang, lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
