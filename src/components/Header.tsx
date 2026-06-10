"use client";
import { useEffect, useRef, useState } from "react";
import ProtectedImage from "@/components/ProtectedImage";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { useTheme } from "@/context/ThemeContext";
import { useCurrency, CURRENCIES } from "@/context/CurrencyContext";
import { t } from "@/lib/translations";
import type { Lang } from "@/lib/translations";

const LOGO = "/logo.png";

const LANGS: { code: Lang; label: string; full: string }[] = [
  { code: "en",    label: "EN", full: "English"   },
  { code: "ja",    label: "日", full: "日本語"    },
  { code: "zh",    label: "繁", full: "繁體中文"  },
  { code: "zh-cn", label: "简", full: "简体中文"  },
  { code: "ko",    label: "한", full: "한국어"    },
  { code: "th",    label: "ไท", full: "ภาษาไทย"  },
  { code: "fr",    label: "FR", full: "Français"  },
];

const SVC_ITEMS: { key: keyof typeof t; anchor: string; icon: React.ReactNode }[] = [
  {
    key: "nav_svc_2", anchor: "#airport",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>,
  },
  {
    key: "nav_svc_1", anchor: "#hourly",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3"/></svg>,
  },
  {
    key: "nav_svc_3", anchor: "#oneway",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6-6m6 6l-6 6"/></svg>,
  },
  {
    key: "nav_svc_9", anchor: "#photo",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316ZM16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"/></svg>,
  },
  {
    key: "nav_svc_4", anchor: "#events",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>,
  },
  {
    key: "nav_svc_5", anchor: "#sightseeing",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v.01M3 12h.01M21 12h-.01M12 21v-.01M6.343 6.343l.007.007M17.657 6.343l-.007.007M6.343 17.657l.007-.007M17.657 17.657l-.007-.007M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>,
  },
  {
    key: "nav_svc_6", anchor: "#golf",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-.5 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>,
  },
  {
    key: "nav_svc_10", anchor: "#outdoor",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>,
  },
  {
    key: "nav_svc_7", anchor: "#ceremony",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>,
  },
];

function ThemeIcon({ theme }: { theme: string }) {
  return theme === "dark" ? (
    <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4"/>
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  ) : (
    <svg className="w-[13px] h-[13px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Header({ alwaysFrosted = false, frostedBg = "bg-black/50" }: { alwaysFrosted?: boolean; frostedBg?: string }) {
  const pathname = usePathname();
  const router   = useRouter();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const { lang, setLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();

  const PREFIXED_LANGS: Lang[] = ["zh-cn", "zh", "ja", "ko", "th", "fr"];
  const langPrefix = pathname.startsWith("/zh-cn") ? "/zh-cn"
    : pathname.startsWith("/zh") ? "/zh"
    : pathname.startsWith("/ja") ? "/ja"
    : pathname.startsWith("/ko") ? "/ko"
    : pathname.startsWith("/th") ? "/th"
    : pathname.startsWith("/fr") ? "/fr"
    : "";
  const lp = (path: string) => `${langPrefix}${path}`;

  function switchLang(code: Lang) {
    if (lang === code) return;
    setLang(code);
    const basePath = langPrefix ? pathname.replace(new RegExp(`^${langPrefix}`), "") || "/" : pathname;
    if (PREFIXED_LANGS.includes(code)) {
      const prefix = code === "zh-cn" ? "/zh-cn" : `/${code}`;
      if (langPrefix !== prefix) {
        const dest = `${prefix}${basePath === "/" ? "" : basePath}` || prefix;
        router.replace(dest, { scroll: false });
      }
    } else if (langPrefix) {
      router.replace(basePath || "/", { scroll: false });
    }
  }

  const { currency, setCurrency } = useCurrency();
  const [menuOpen,           setMenuOpen]           = useState(false);
  const [aboutDrop,          setAboutDrop]          = useState(false);
  const [aboutMobileOpen,    setAboutMobileOpen]    = useState(false);
  const [servicesDrop,       setServicesDrop]       = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);
  const [currencyOpen,       setCurrencyOpen]       = useState(false);
  const [langOpen,           setLangOpen]           = useState(false);
  const [mobileLangOpen,     setMobileLangOpen]     = useState(false);
  const [mobileCurOpen,      setMobileCurOpen]      = useState(false);
  const [scrolled,           setScrolled]           = useState(false);

  const dropTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const svcDropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef    = useRef<HTMLElement>(null);
  const langRef      = useRef<HTMLDivElement>(null);
  const curRef       = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const mobileCurRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const h = (e: MouseEvent) => { if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [langOpen]);

  useEffect(() => {
    if (!currencyOpen) return;
    const h = (e: MouseEvent) => { if (curRef.current && !curRef.current.contains(e.target as Node)) setCurrencyOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [currencyOpen]);

  useEffect(() => {
    if (!mobileLangOpen) return;
    const h = (e: MouseEvent) => { if (mobileLangRef.current && !mobileLangRef.current.contains(e.target as Node)) setMobileLangOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [mobileLangOpen]);

  useEffect(() => {
    if (!mobileCurOpen) return;
    const h = (e: MouseEvent) => { if (mobileCurRef.current && !mobileCurRef.current.contains(e.target as Node)) setMobileCurOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [mobileCurOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const h = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false); setAboutMobileOpen(false); setServicesMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [menuOpen]);

  const openDrop    = () => { if (dropTimer.current)    clearTimeout(dropTimer.current);    setAboutDrop(true);    };
  const closeDrop   = () => { dropTimer.current    = setTimeout(() => setAboutDrop(false),    200); };
  const openSvcDrop = () => { if (svcDropTimer.current) clearTimeout(svcDropTimer.current); setServicesDrop(true); };
  const closeSvcDrop= () => { svcDropTimer.current = setTimeout(() => setServicesDrop(false), 200); };
  const closeAll    = () => { setMenuOpen(false); setAboutMobileOpen(false); setServicesMobileOpen(false); };

  return (
    <header ref={headerRef} className="fixed top-0 inset-x-0 z-50">

      {/* ══════════════════════════════════════════════════════════════
          ANNOUNCEMENT BAR
      ══════════════════════════════════════════════════════════════ */}
      <div className="backdrop-blur-xl bg-black/50 border-b border-white/[0.07]">
        <div className="flex items-center justify-between px-5 sm:px-12 lg:px-20 h-9">

          {/* Center: announcement text (empty — future use) */}
          <div className="flex-1 flex items-center justify-center">
            {/* announcement text goes here */}
          </div>

          {/* Right: Currency · Theme */}
          <div className="flex items-center gap-3">

            {/* Currency */}
            <div ref={curRef} className="relative">
              <button
                onClick={() => setCurrencyOpen((o) => !o)}
                aria-label="Select currency"
                className={`flex items-center gap-1 text-[11px] tracking-[0.08em] transition-colors duration-150
                            ${currencyOpen ? "text-[#c9a84c]" : "text-white/90 hover:text-white"}`}
              >
                {currency}
                <svg className={`w-2.5 h-2.5 opacity-50 transition-transform duration-150 ${currencyOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {currencyOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-[216px]
                                bg-[#0a0a0a]/96 backdrop-blur-xl
                                border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.6)]
                                overflow-hidden z-50">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
                  {CURRENCIES.map((c) => (
                    <button key={c.code}
                      onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
                      className={`group w-full flex items-center px-4 py-2.5 transition-colors duration-200
                                  ${currency === c.code ? "bg-white/[0.04]" : "hover:bg-white/[0.025]"}`}>
                      <div className="flex items-center gap-3 transition-transform duration-200 origin-left group-hover:scale-[1.06]">
                        <span className={`text-[10px] font-bold tracking-[0.18em] w-8 shrink-0 transition-colors duration-200
                                          group-hover:text-[#c9a84c] ${currency === c.code ? "text-[#c9a84c]" : "text-white/55"}`}>
                          {c.code}
                        </span>
                        <span className={`text-[10px] tracking-[0.06em] transition-colors duration-200
                                          group-hover:text-[#c9a84c]/60 ${currency === c.code ? "text-white/45" : "text-white/22"}`}>
                          {c.name}
                        </span>
                      </div>
                      {currency === c.code && (
                        <svg className="w-2.5 h-2.5 ml-auto shrink-0 text-[#c9a84c]/60" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </button>
                  ))}
                  {currency !== "JPY" && (
                    <div className="px-3.5 py-2.5 border-t border-white/[0.05]">
                      <p className="text-[11px] text-white/25 leading-relaxed">
                        {lang === "ja" ? "※参考値。決済はJPY建て。外貨手数料あり"
                          : lang === "zh" ? "※僅供參考。結算以JPY為準，外幣手續費另計"
                          : "* Reference only. Payment settled in JPY."}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <span className="text-white/30 text-[10px] select-none">|</span>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle light / dark theme"
              className="text-white/90 hover:text-white flex items-center transition-colors duration-150"
            >
              <ThemeIcon theme={theme} />
            </button>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MAIN NAV ROW
      ══════════════════════════════════════════════════════════════ */}
      <div className={`transition-all duration-300
        ${scrolled || alwaysFrosted
          ? `backdrop-blur-xl ${frostedBg} border-b border-white/[0.07]`
          : "bg-transparent border-b border-transparent"}`}>

        <div className="flex items-center justify-between
                        px-5 sm:px-12 lg:px-20
                        py-2.5 sm:py-0 sm:h-[84px]">

          {/* ── MOBILE LEFT: logo ─────────────────────────────── */}
          <Link href={lp("/")} draggable={false}
            className="sm:hidden shrink-0 transition-transform duration-200 active:scale-110"
            onContextMenu={(e) => e.preventDefault()}>
            <ProtectedImage src={LOGO} alt="Octoshell" width={95} height={95} draggable={false}
              className="object-contain drop-shadow-lg pointer-events-none select-none" />
          </Link>

          {/* ── DESKTOP CENTER: logo + nav (absolute) ─────────── */}
          <div className="hidden sm:flex flex-col items-center absolute left-1/2 -translate-x-1/2">
            <Link href={lp("/")} onContextMenu={(e) => e.preventDefault()}>
              <ProtectedImage src={LOGO} alt="Octoshell" width={75} height={75} draggable={false}
                className="object-contain drop-shadow-lg pointer-events-none select-none" />
            </Link>

            <nav className="flex items-center gap-6 lg:gap-8 mt-0.5">

              <Link href={lp("/")}
                onClick={pathname === lp("/") ? (e) => { e.preventDefault(); scrollTop(); } : undefined}
                className="text-white/80 text-[12px] lg:text-[13px] tracking-[0.22em]
                           hover:text-[#c9a84c] transition-all duration-200 whitespace-nowrap
                           pb-[3px] border-b border-transparent hover:border-[#c9a84c]/55">
                {t.nav_home[lang]}
              </Link>

              <Link href={lp("/airport")}
                onClick={pathname === lp("/airport") ? (e) => { e.preventDefault(); scrollTop(); } : undefined}
                className="text-white/80 text-[12px] lg:text-[13px] tracking-[0.22em]
                           hover:text-[#c9a84c] transition-all duration-200 whitespace-nowrap
                           pb-[3px] border-b border-transparent hover:border-[#c9a84c]/55">
                {t.nav_airport_transfer[lang]}
              </Link>

              {/* CHAUFFEUR dropdown */}
              <div className="relative" onMouseEnter={openSvcDrop} onMouseLeave={closeSvcDrop}>
                <button
                  onClick={() => { openSvcDrop(); if (pathname !== lp("/services")) router.push(lp("/services"), { scroll: false }); }}
                  className={`flex items-center gap-1 text-[12px] lg:text-[13px] tracking-[0.22em]
                              hover:text-[#c9a84c] transition-all duration-200 whitespace-nowrap
                              pb-[3px] border-b border-transparent hover:border-[#c9a84c]/55
                              ${servicesDrop ? "text-[#c9a84c] border-[#c9a84c]/55" : "text-white/80"}`}>
                  {t.nav_chauffeur[lang]}
                  <svg className={`w-2.5 h-2.5 transition-all duration-200 ${servicesDrop ? "rotate-180 opacity-70" : "opacity-40"}`}
                    fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {servicesDrop && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-[340px]
                                  bg-[#0a0a0a]/96 backdrop-blur-xl
                                  border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.6)]
                                  overflow-hidden"
                    onMouseEnter={openSvcDrop} onMouseLeave={closeSvcDrop}>
                    <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
                    {[
                      { key: "nav_city_transfer", sub: "nav_city_transfer_sub", href: lp("/services") },
                      { key: "nav_city_charter",  sub: "nav_city_charter_sub",  href: lp("/services") },
                      { key: "nav_day_tours",     sub: "nav_day_tours_sub",     href: lp("/services") },
                    ].map((item, idx, arr) => (
                      <Link key={item.key} href={item.href} onClick={() => setServicesDrop(false)}
                        className={`flex flex-col px-5 py-3.5 hover:bg-white/[0.035] transition-all duration-150
                                   ${idx < arr.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                        <span className="text-[11px] tracking-[0.2em] uppercase text-white/70 hover:text-[#c9a84c]">
                          {t[item.key][lang]}
                        </span>
                        <span className="text-[10px] tracking-[0.1em] text-white/30 mt-0.5">
                          {t[item.sub][lang]}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href={lp("/fleet")}
                onClick={pathname === lp("/fleet") ? (e) => { e.preventDefault(); scrollTop(); } : undefined}
                className="text-white/80 text-[12px] lg:text-[13px] tracking-[0.22em]
                           hover:text-[#c9a84c] transition-all duration-200 whitespace-nowrap
                           pb-[3px] border-b border-transparent hover:border-[#c9a84c]/55">
                {t.nav_fleet[lang]}
              </Link>

              <Link href={lp("/faq")}
                onClick={pathname === lp("/faq") ? (e) => { e.preventDefault(); scrollTop(); } : undefined}
                className="text-white/80 text-[12px] lg:text-[13px] tracking-[0.22em]
                           hover:text-[#c9a84c] transition-all duration-200 whitespace-nowrap
                           pb-[3px] border-b border-transparent hover:border-[#c9a84c]/55">
                {t.nav_faq[lang]}
              </Link>

              {/* ABOUT dropdown */}
              <div className="relative" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
                <Link href={lp("/about")}
                  onClick={pathname === lp("/about") ? (e) => { e.preventDefault(); scrollTop(); } : undefined}
                  className={`flex items-center gap-1 text-[12px] lg:text-[13px] tracking-[0.22em]
                              hover:text-[#c9a84c] transition-all duration-200 whitespace-nowrap
                              pb-[3px] border-b border-transparent hover:border-[#c9a84c]/55
                              ${aboutDrop ? "text-[#c9a84c] border-[#c9a84c]/55" : "text-white/80"}`}>
                  {t.nav_about[lang]}
                  <svg className={`w-2.5 h-2.5 transition-all duration-200 ${aboutDrop ? "rotate-180 opacity-70" : "opacity-40"}`}
                    fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </Link>
                {aboutDrop && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-52
                                  bg-[#0a0a0a]/96 backdrop-blur-xl
                                  border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.6)]
                                  overflow-hidden"
                    onMouseEnter={openDrop} onMouseLeave={closeDrop}>
                    <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
                    <Link href={lp("/about#story")} onClick={() => setAboutDrop(false)}
                      className="flex items-center gap-3 px-5 py-3.5 text-[10px] tracking-[0.25em] uppercase text-white/50
                                 hover:text-[#c9a84c] hover:bg-white/[0.035] transition-all duration-150 border-b border-white/[0.05]">
                      <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3"/>
                      </svg>
                      {t.nav_about_story[lang]}
                    </Link>
                    <Link href={lp("/about#contact")} onClick={() => setAboutDrop(false)}
                      className="flex items-center gap-3 px-5 py-3.5 text-[10px] tracking-[0.25em] uppercase text-white/50
                                 hover:text-[#c9a84c] hover:bg-white/[0.035] transition-all duration-150">
                      <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
                      </svg>
                      {t.nav_about_contact[lang]}
                    </Link>
                  </div>
                )}
              </div>

            </nav>
          </div>

          {/* ── RIGHT: Desktop Lang + Book | Mobile: hamburger ────────── */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Desktop Language selector */}
            <div ref={langRef} className="relative hidden sm:block">
              <button
                onClick={() => setLangOpen((o) => !o)}
                aria-label="Select language"
                className="flex items-center gap-1 text-[11px] text-white/70 hover:text-white tracking-[0.1em] transition-colors duration-150"
              >
                {LANGS.find((l) => l.code === lang)?.label ?? "EN"}
                <svg className={`w-2.5 h-2.5 opacity-40 transition-transform duration-150 ${langOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 min-w-[140px]
                                bg-[#1a1a1a]/98 backdrop-blur-xl rounded-2xl
                                border border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.7)]
                                overflow-hidden z-50 py-1">
                  {LANGS.map(({ code, full }) => (
                    <button key={code}
                      onClick={() => { switchLang(code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] tracking-wide transition-colors duration-150
                                  ${lang === code
                                    ? "text-white font-medium bg-white/10 rounded-xl mx-1 w-[calc(100%-8px)]"
                                    : "text-white/55 hover:text-white/90 hover:bg-white/[0.04]"}`}>
                      {full}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop BOOK */}
            <Link href={lp("/book")}
              onClick={pathname === lp("/book") ? (e) => { e.preventDefault(); scrollTop(); } : undefined}
              className="hidden sm:inline-flex items-center justify-center relative overflow-hidden group
                         border border-white/80 hover:border-[#c9a84c] text-white
                         text-[11px] lg:text-[12px] tracking-[0.18em]
                         px-6 lg:px-8 py-2 sm:py-2.5 rounded-full
                         hover:bg-[#c9a84c] hover:text-black transition-all duration-200 whitespace-nowrap">
              <span className="transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-2 inline-block">
                {t.nav_book[lang]}
              </span>
              <span className="absolute transition-all duration-200 opacity-0 translate-y-2
                               group-hover:opacity-100 group-hover:translate-y-0 font-bold tracking-[0.2em]">
                {lang === "ja" ? "今すぐ予約" : lang === "zh" ? "立即預訂" : "Book Now"}
              </span>
            </Link>

            {/* Mobile: hamburger only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden text-white touch-manipulation p-1 transition-transform duration-150 active:scale-110"
              aria-label="Toggle menu"
              onContextMenu={(e) => e.preventDefault()}
            >
              <svg className="w-[30px] h-[30px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE DRAWER
      ══════════════════════════════════════════════════════════════ */}
      {menuOpen && (
        <div className="sm:hidden bg-black/75 backdrop-blur-xl border-t border-white/[0.07]">

          {/* Lang + Currency row in drawer */}
          <div className="flex items-center gap-3 px-6 pt-4 pb-1">

            {/* Language */}
            <div ref={mobileLangRef} className="relative">
              <button onClick={() => setMobileLangOpen((o) => !o)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-200
                            ${mobileLangOpen ? "border-white text-white bg-white/10" : "border-white/30 text-white/70 hover:border-white/60"}`}>
                {LANGS.find((l) => l.code === lang)?.full ?? "English"}
                <svg className={`w-2.5 h-2.5 opacity-50 transition-transform ${mobileLangOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {mobileLangOpen && (
                <div className="absolute left-0 top-full mt-1.5 min-w-[140px] bg-[#1a1a1a]/98 backdrop-blur-xl rounded-2xl
                                border border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.7)] overflow-hidden z-50 py-1">
                  {LANGS.map(({ code, full }) => (
                    <button key={code} onClick={() => { switchLang(code); setMobileLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] tracking-wide transition-colors duration-150
                                  ${lang === code ? "text-white font-medium bg-white/10 rounded-xl mx-1 w-[calc(100%-8px)]" : "text-white/55 hover:text-white/90 hover:bg-white/[0.04]"}`}>
                      {full}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency */}
            <div ref={mobileCurRef} className="relative">
              <button onClick={() => setMobileCurOpen((o) => !o)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all duration-200 tracking-widest
                            ${mobileCurOpen ? "border-[#c9a84c] text-[#c9a84c]" : "border-white/30 text-white/70 hover:border-[#c9a84c]/60"}`}>
                {currency}
                <svg className={`w-2.5 h-2.5 opacity-50 transition-transform ${mobileCurOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {mobileCurOpen && (
                <div className="absolute left-0 top-full mt-1.5 bg-[#0a0a0a]/96 backdrop-blur-xl
                                border border-white/[0.09] shadow-[0_8px_32px_rgba(0,0,0,0.7)] overflow-hidden z-50 w-[200px]">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
                  {CURRENCIES.map((c) => (
                    <button key={c.code} onClick={() => { setCurrency(c.code); setMobileCurOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 transition-colors
                                  ${currency === c.code ? "text-[#c9a84c] bg-white/[0.04]" : "text-white/50 hover:text-[#c9a84c] hover:bg-white/[0.035]"}`}>
                      <span className="text-[13px] leading-none">{c.flag}</span>
                      <span className="text-[10px] font-bold tracking-[0.18em] w-7 shrink-0">{c.code}</span>
                      <span className={`text-[10px] tracking-[0.06em] ${currency === c.code ? "text-[#c9a84c]/70" : "text-white/25"}`}>{c.name}</span>
                    </button>
                  ))}
                  {currency !== "JPY" && (
                    <div className="px-2.5 py-2 border-t border-white/[0.05]">
                      <p className="text-[10px] text-white/25 leading-relaxed">
                        {lang === "ja" ? "※参考値。JPY建て決済"
                          : lang === "zh" ? "※僅供參考，JPY結算"
                          : "* Ref. only. Settled in JPY."}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Theme */}
            <button onClick={toggleTheme} aria-label="Toggle theme"
              className="ml-auto w-8 h-8 rounded-full border border-white/30 text-white/60
                         hover:border-[#c9a84c] hover:text-[#c9a84c] flex items-center justify-center transition-all duration-200">
              <ThemeIcon theme={theme} />
            </button>
          </div>

          <nav className="flex flex-col gap-4 px-6 pb-6 pt-4">

            <Link href={lp("/")} onClick={pathname === lp("/") ? (e) => { e.preventDefault(); closeAll(); scrollTop(); } : closeAll}
              className="text-white/80 text-[17px] tracking-[0.2em] hover:text-white transition-colors">
              {t.nav_home[lang]}
            </Link>

            <Link href={lp("/airport")} onClick={closeAll}
              className="text-white/80 text-[17px] tracking-[0.2em] hover:text-white transition-colors">
              {t.nav_airport_transfer[lang]}
            </Link>

            {/* CHAUFFEUR expandable */}
            <div>
              <button onClick={() => setServicesMobileOpen(o => !o)}
                className="flex items-center justify-between w-full text-white/80 text-[17px] tracking-[0.2em] hover:text-white transition-colors">
                <span>{t.nav_chauffeur[lang]}</span>
                <svg className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${servicesMobileOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {servicesMobileOpen && (
                <div className="mt-3 ml-1 pl-4 border-l border-[#c9a84c]/25 flex flex-col gap-4">
                  {[
                    { key: "nav_city_transfer", sub: "nav_city_transfer_sub", href: lp("/services") },
                    { key: "nav_city_charter",  sub: "nav_city_charter_sub",  href: lp("/services") },
                    { key: "nav_day_tours",     sub: "nav_day_tours_sub",     href: lp("/services") },
                  ].map((item) => (
                    <Link key={item.key} href={item.href} onClick={closeAll} className="flex flex-col gap-0.5">
                      <span className="text-white/70 text-[14px] tracking-[0.22em] hover:text-[#c9a84c] transition-colors">
                        {t[item.key][lang]}
                      </span>
                      <span className="text-white/30 text-[11px] tracking-[0.1em]">
                        {t[item.sub][lang]}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={lp("/fleet")} onClick={pathname === lp("/fleet") ? (e) => { e.preventDefault(); closeAll(); scrollTop(); } : closeAll}
              className="text-white/80 text-[17px] tracking-[0.2em] hover:text-white transition-colors">
              {t.nav_fleet[lang]}
            </Link>

            <Link href={lp("/faq")} onClick={pathname === lp("/faq") ? (e) => { e.preventDefault(); closeAll(); scrollTop(); } : closeAll}
              className="text-white/80 text-[17px] tracking-[0.2em] hover:text-white transition-colors">
              {t.nav_faq[lang]}
            </Link>

            {/* ABOUT expandable */}
            <div>
              <button onClick={() => setAboutMobileOpen(o => !o)}
                className="flex items-center justify-between w-full text-white/80 text-[17px] tracking-[0.2em] hover:text-white transition-colors">
                <span>{t.nav_about[lang]}</span>
                <svg className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${aboutMobileOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {aboutMobileOpen && (
                <div className="mt-3 ml-1 pl-4 border-l border-[#c9a84c]/25 flex flex-col gap-3">
                  <Link href={lp("/about#story")} onClick={closeAll}
                    className="text-white/45 text-[14px] tracking-[0.22em] hover:text-[#c9a84c] transition-colors">
                    {t.nav_about_story[lang]}
                  </Link>
                  <Link href={lp("/about#contact")} onClick={closeAll}
                    className="text-white/45 text-[14px] tracking-[0.22em] hover:text-[#c9a84c] transition-colors">
                    {t.nav_about_contact[lang]}
                  </Link>
                </div>
              )}
            </div>

            <Link href={lp("/book")}
              onClick={pathname === lp("/book") ? (e) => { e.preventDefault(); closeAll(); scrollTop(); } : closeAll}
              draggable={false} onContextMenu={(e) => e.preventDefault()}
              className="mt-3 inline-flex justify-center bg-[#c9a84c] text-black text-[14px] font-bold tracking-[0.18em] px-6 py-2.5 rounded-full hover:bg-white transition-all duration-200
                         active:scale-110 active:bg-white active:shadow-[0_8px_36px_rgba(201,168,76,0.7)]">
              {t.nav_book[lang]}
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}
