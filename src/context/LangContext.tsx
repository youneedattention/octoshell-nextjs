"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { Lang, AppLang } from "@/lib/translations";
import { VALID_LANGS, toContentLang } from "@/lib/translations";

interface LangCtx {
  /** Full 8-language value — use for the app shell (nav, header, URL) */
  appLang: AppLang;
  /** 3-language fallback (en/ja/zh) — use for page-level content objects */
  lang: Lang;
  setLang: (l: AppLang) => void;
}

const LangContext = createContext<LangCtx>({
  appLang: "en",
  lang: "en",
  setLang: () => {},
});

function getLangFromPath(pathname: string): AppLang | null {
  const seg = pathname.split("/")[1] as AppLang;
  return VALID_LANGS.includes(seg) ? seg : null;
}

export function LangProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: AppLang;
}) {
  const pathname = usePathname();
  const langFromPath = getLangFromPath(pathname);

  const [appLang, setAppLangState] = useState<AppLang>(
    initialLang ?? langFromPath ?? "en"
  );

  /* Sync when URL path changes (e.g. browser back/forward) */
  useEffect(() => {
    if (langFromPath && langFromPath !== appLang) {
      setAppLangState(langFromPath);
      localStorage.setItem("octoshell-lang", langFromPath);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langFromPath]);

  function setLang(l: AppLang) {
    localStorage.setItem("octoshell-lang", l);
    setAppLangState(l);

    /* Build the new path with lang prefix */
    const segments = pathname.split("/");
    const currentLang = getLangFromPath(pathname);
    if (currentLang) {
      segments[1] = l;
    } else {
      segments.splice(1, 0, l);
    }
    const newPath = segments.join("/") || `/${l}`;

    /* Full page reload so middleware rewrite + server lang header work correctly */
    if (typeof window !== "undefined") {
      window.location.href = newPath;
    }
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
