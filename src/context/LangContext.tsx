"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Lang } from "@/lib/translations";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const VALID: Lang[] = ["en", "ja", "zh", "ko", "zh-cn", "th", "fr"];

const LangContext = createContext<LangCtx>({ lang: "en", setLang: () => {} });

function detectLang(): Lang {
  const stored = localStorage.getItem("octoshell-lang") as Lang | null;
  if (stored && VALID.includes(stored)) return stored;
  const b = navigator.language.toLowerCase();
  if (b.startsWith("ja")) return "ja";
  if (b === "zh-cn" || b === "zh-hans") return "zh-cn";
  if (b.startsWith("zh")) return "zh";
  if (b.startsWith("ko")) return "ko";
  if (b.startsWith("th")) return "th";
  if (b.startsWith("fr")) return "fr";
  return "en";
}

// Root provider's setState — allows nested providers to sync back on navigation
let _rootSetLang: ((l: Lang) => void) | null = null;

export function LangProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang ?? "en");
  const isRoot = !initialLang;

  useEffect(() => {
    if (isRoot) {
      _rootSetLang = setLangState;
      setLangState(detectLang());
      return () => { _rootSetLang = null; };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setLang(l: Lang) {
    localStorage.setItem("octoshell-lang", l);
    setLangState(l);
    // When called from a nested provider (language route), also update the
    // root provider so navigating back to an unprefixed route shows correctly
    if (!isRoot && _rootSetLang) {
      _rootSetLang(l);
    }
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
