"use client";
import { useEffect, useRef, useState } from "react";
import ProtectedImage from "@/components/ProtectedImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { useTheme } from "@/context/ThemeContext";
import { useCurrency, CURRENCIES } from "@/context/CurrencyContext";
import { t } from "@/lib/translations";
import type { Lang } from "@/lib/translations";

const LOGO = "/logo.png";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ja", label: "日" },
  { code: "zh", label: "中" },
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

/* ── Reusable theme toggle icon ─────────────────────────────────────── */
function ThemeIcon({ theme }: { theme: string }) {
  return theme === "dark" ? (
    <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4"/>
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  ) : (
    <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Header({ alwaysFrosted = false, frostedBg = "bg-black/50" }: { alwaysFrosted?: boolean; frostedBg?: string }) {
  const pathname = usePathname();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const { lang, setLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const [menuOpen,           setMenuOpen]           = useState(false);
  const [aboutDrop,          setAboutDrop]          = useState(false);
  const [aboutMobileOpen,    setAboutMobileOpen]    = useState(false);
  const [servicesDrop,       setServicesDrop]       = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);
  const [currencyOpen,       setCurrencyOpen]       = useState(false);
  const dropTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const svcDropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const curRef       = useRef<HTMLDivElement>(null);
  const headerRef       = useRef<HTMLElement>(null);
  const langRef         = useRef<HTMLDivElement>(null);
  const mobileCurRef    = useRef<HTMLDivElement>(null);
  const [langOpen,      setLangOpen]         = useState(false);
  const [mobileCurOpen, setMobileCurOpen]    = useState(false);
  const [scrolled,      setScrolled]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close currency dropdown on outside click */
  useEffect(() => {
    if (!currencyOpen) return;
    const handler = (e: MouseEvent) => {
      if (curRef.current && !curRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [currencyOpen]);

  /* Close mobile lang dropdown on outside click */
  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langOpen]);

  /* Close mobile currency dropdown on outside click */
  useEffect(() => {
    if (!mobileCurOpen) return;
    const handler = (e: MouseEvent) => {
      if (mobileCurRef.current && !mobileCurRef.current.contains(e.target as Node)) {
        setMobileCurOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileCurOpen]);

  /* Close mobile drawer when clicking outside the header */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setAboutMobileOpen(false);
        setServicesMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const openDrop    = () => { if (dropTimer.current)    clearTimeout(dropTimer.current);    setAboutDrop(true);    };
  const closeDrop   = () => { dropTimer.current    = setTimeout(() => setAboutDrop(false),    200); };
  const openSvcDrop = () => { if (svcDropTimer.current) clearTimeout(svcDropTimer.current); setServicesDrop(true); };
  const closeSvcDrop= () => { svcDropTimer.current = setTimeout(() => setServicesDrop(false), 200); };
  const closeAll    = () => { setMenuOpen(false); setAboutMobileOpen(false); setServicesMobileOpen(false); };

  return (
    <header ref={headerRef} className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
      ${scrolled || alwaysFrosted
        ? `backdrop-blur-xl ${frostedBg} border-b border-white/[0.07]`
        : "bg-transparent border-b border-transparent"}`}>

      {/* ══════════════════════════════════════════════════════════════
          MAIN ROW
      ══════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between
                      px-5 sm:px-8 lg:px-12
                      py-2.5 sm:py-0 sm:h-[72px]">

        {/* ── MOBILE LEFT: large logo ───────────────────────────── */}
        <Link href="/" draggable={false}
          className="sm:hidden shrink-0 transition-transform duration-200 active:scale-110"
          onContextMenu={(e) => e.preventDefault()}>
          <ProtectedImage
            src={LOGO}
            alt="Octoshell"
            width={80}
            height={80}
            draggable={false}
            className="object-contain drop-shadow-lg pointer-events-none select-none"
          />
        </Link>

        {/* ── DESKTOP LEFT: logo ───────────────────────────────── */}
        <Link href="/" onContextMenu={(e) => e.preventDefault()}
          className="hidden sm:block shrink-0">
          <ProtectedImage src={LOGO} alt="Octoshell" width={56} height={56} draggable={false}
            className="object-contain drop-shadow-lg pointer-events-none select-none" />
        </Link>

        {/* ── DESKTOP CENTER: nav links (left-aligned, follows logo) ── */}
        <nav className="hidden sm:flex items-center gap-5 lg:gap-7 ml-6 lg:ml-10">

          {/* HOME */}
          <Link href="/"
            onClick={pathname === "/" ? (e) => { e.preventDefault(); scrollTop(); } : undefined}
            className={`relative text-[12px] lg:text-[13px] tracking-[0.12em]
                       hover:text-white transition-colors duration-200 whitespace-nowrap pb-0.5
                       ${pathname === "/" ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a84c] after:rounded-full" : "text-white/75"}`}>
            {t.nav_home[lang]}
          </Link>

          {/* SERVICES */}
          <div className="relative" onMouseEnter={openSvcDrop} onMouseLeave={closeSvcDrop}>
            <Link href="/services"
              onClick={pathname === "/services" ? (e) => { e.preventDefault(); scrollTop(); } : undefined}
              className={`relative flex items-center gap-1 text-[12px] lg:text-[13px] tracking-[0.12em]
                          hover:text-white transition-colors duration-200 whitespace-nowrap pb-0.5
                          ${pathname === "/services"
                            ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a84c] after:rounded-full"
                            : servicesDrop ? "text-white" : "text-white/75"}`}>
              {t.nav_services[lang]}
              <svg className={`w-2.5 h-2.5 transition-transform duration-200 opacity-50 ${servicesDrop ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </Link>

            {servicesDrop && (
              <div
                className="absolute top-full left-0 mt-3 w-[420px]
                           bg-[#0a0a0a]/96 backdrop-blur-xl
                           border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.6)]
                           overflow-hidden"
                onMouseEnter={openSvcDrop} onMouseLeave={closeSvcDrop}
              >
                <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
                <div className="grid grid-cols-2 p-1">
                  {SVC_ITEMS.map((item, idx) => (
                    <Link key={item.anchor} href={`/services${item.anchor}`}
                      onClick={() => setServicesDrop(false)}
                      className={`flex items-center gap-3 px-4 py-3
                                 text-[10px] tracking-[0.22em] uppercase text-white/50
                                 hover:text-[#c9a84c] hover:bg-white/[0.035] transition-all duration-150
                                 ${idx % 2 === 0 ? "border-r border-white/[0.05]" : ""}
                                 ${idx < SVC_ITEMS.length - 2 ? "border-b border-white/[0.05]" : ""}`}>
                      {item.icon}
                      {t[item.key][lang]}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* FLEET */}
          <Link href="/fleet"
            onClick={pathname === "/fleet" ? (e) => { e.preventDefault(); scrollTop(); } : undefined}
            className={`relative text-[12px] lg:text-[13px] tracking-[0.12em]
                       hover:text-white transition-colors duration-200 whitespace-nowrap pb-0.5
                       ${pathname === "/fleet" ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a84c] after:rounded-full" : "text-white/75"}`}>
            {t.nav_fleet[lang]}
          </Link>

          {/* ABOUT */}
          <div className="relative" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
            <Link href="/about"
              onClick={pathname === "/about" ? (e) => { e.preventDefault(); scrollTop(); } : undefined}
              className={`relative flex items-center gap-1 text-[12px] lg:text-[13px] tracking-[0.12em]
                          hover:text-white transition-colors duration-200 whitespace-nowrap pb-0.5
                          ${pathname === "/about"
                            ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a84c] after:rounded-full"
                            : aboutDrop ? "text-white" : "text-white/75"}`}>
              {t.nav_about[lang]}
              <svg className={`w-2.5 h-2.5 transition-transform duration-200 opacity-50 ${aboutDrop ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </Link>

            {aboutDrop && (
              <div
                className="absolute top-full left-0 mt-3 w-52
                           bg-[#0a0a0a]/96 backdrop-blur-xl
                           border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.6)]
                           overflow-hidden"
                onMouseEnter={openDrop} onMouseLeave={closeDrop}
              >
                <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
                <Link href="/about#story" onClick={() => setAboutDrop(false)}
                  className="flex items-center gap-3 px-5 py-3.5 text-[10px] tracking-[0.25em] uppercase text-white/50
                             hover:text-[#c9a84c] hover:bg-white/[0.035] transition-all duration-150 border-b border-white/[0.05]">
                  <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                  </svg>
                  {t.nav_about_story[lang]}
                </Link>
                <Link href="/about#contact" onClick={() => setAboutDrop(false)}
                  className="flex items-center gap-3 px-5 py-3.5 text-[10px] tracking-[0.25em] uppercase text-white/50
                             hover:text-[#c9a84c] hover:bg-white/[0.035] transition-all duration-150">
                  <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  {t.nav_about_contact[lang]}
                </Link>
              </div>
            )}
          </div>

        </nav>

        {/* ── DESKTOP RIGHT: lang icon + theme + currency + BOOK ── */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-3 shrink-0">

          {/* Language — single globe icon with dropdown */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              aria-label="Select language"
              className={`w-8 h-8 rounded-full border flex items-center justify-center
                         transition-all duration-200
                         ${langOpen ? "border-[#c9a84c] text-[#c9a84c]" : "border-white/30 text-white/70 hover:border-[#c9a84c] hover:text-[#c9a84c]"}`}>
              {/* Globe icon */}
              <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-2.4 2.6-3.8 5.7-3.8 9s1.4 6.4 3.8 9M12 3c2.4 2.6 3.8 5.7 3.8 9s-1.4 6.4-3.8 9M3 12h18"/>
              </svg>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2
                              bg-[#0a0a0a]/96 backdrop-blur-xl
                              border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.6)]
                              overflow-hidden z-50 w-[72px]">
                <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
                {LANGS.map(({ code, label }) => (
                  <button key={code} onClick={() => { setLang(code); setLangOpen(false); }}
                    className={`w-full py-2.5 text-[11px] font-bold tracking-widest transition-colors
                      ${lang === code
                        ? "text-[#c9a84c] bg-white/[0.04]"
                        : "text-white/50 hover:text-[#c9a84c] hover:bg-white/[0.035]"}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme */}
          <button onClick={toggleTheme} aria-label="Toggle light / dark theme"
            className="w-8 h-8 rounded-full border border-white/30 text-white/60
                       hover:border-[#c9a84c] hover:text-[#c9a84c]
                       flex items-center justify-center transition-all duration-200">
            <ThemeIcon theme={theme} />
          </button>

          {/* Currency */}
          <div ref={curRef} className="relative">
            <button onClick={() => setCurrencyOpen((o) => !o)} aria-label="Select currency"
              className={`h-8 px-2.5 rounded-full text-[10px] font-bold border transition-all duration-200
                          flex items-center gap-1 tracking-widest
                          ${currencyOpen ? "border-[#c9a84c] text-[#c9a84c]" : "border-white/30 text-white/70 hover:border-[#c9a84c] hover:text-[#c9a84c]"}`}>
              {currency}
              <svg className="w-2 h-2 opacity-50" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {currencyOpen && (
              <div className="absolute top-full left-0 mt-2 w-[216px]
                              bg-[#0a0a0a]/96 backdrop-blur-xl
                              border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.6)]
                              overflow-hidden z-50">
                <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
                    className={`group w-full flex items-center px-4 py-2.5 transition-colors duration-200
                                ${currency === c.code ? "bg-white/[0.04]" : "hover:bg-white/[0.025]"}`}
                  >
                    <div className="flex items-center gap-3 transition-transform duration-200 origin-left group-hover:scale-[1.06]">
                      <span className={`text-[10px] font-bold tracking-[0.18em] w-8 shrink-0 transition-colors duration-200
                                        group-hover:text-[#c9a84c]
                                        ${currency === c.code ? "text-[#c9a84c]" : "text-white/55"}`}>
                        {c.code}
                      </span>
                      <span className={`text-[10px] tracking-[0.06em] transition-colors duration-200
                                        group-hover:text-[#c9a84c]/60
                                        ${currency === c.code ? "text-white/45" : "text-white/22"}`}>
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
                      {lang === "ja"
                        ? "※参考値。決済はJPY建て。外貨手数料あり"
                        : lang === "zh"
                        ? "※僅供參考。結算以JPY為準，外幣手續費另計"
                        : "* Reference only. Payment settled in JPY."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop BOOK — filled gold button */}
          <Link href="/book"
            onClick={pathname === "/book" ? (e) => { e.preventDefault(); scrollTop(); } : undefined}
            className="bg-[#c9a84c] hover:bg-[#b8973e] text-black
                       text-[11px] lg:text-[12px] font-bold tracking-[0.18em]
                       px-5 lg:px-7 py-2 rounded-full
                       transition-all duration-200 whitespace-nowrap shadow-[0_4px_16px_rgba(201,168,76,0.35)]">
            {lang === "ja" ? "予約" : lang === "zh" ? "預訂" : "Book Now"}
          </Link>
        </div>

        {/* ── MOBILE RIGHT: hamburger + lang stack ── */}
        <div className="sm:hidden flex flex-col items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white touch-manipulation p-1 transition-transform duration-150 active:scale-110"
              aria-label="Toggle menu"
              onContextMenu={(e) => e.preventDefault()}
            >
              <svg className="w-[30px] h-[30px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>

            {/* Single lang button with dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((o) => !o)}
                aria-label="Select language"
                onContextMenu={(e) => e.preventDefault()}
                className={`w-[38px] h-[38px] rounded-full text-[11px] font-bold border transition-all duration-200
                  flex items-center justify-center active:scale-110
                  ${langOpen
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/90 border-white/50 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                  }`}
              >
                {lang === "en" ? "EN" : lang === "ja" ? "日" : "中"}
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-1.5
                                bg-[#0a0a0a]/96 backdrop-blur-xl
                                border border-white/[0.09]
                                shadow-[0_8px_32px_rgba(0,0,0,0.7)]
                                overflow-hidden z-50 w-[64px]">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
                  {LANGS.map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangOpen(false); }}
                      className={`w-full py-2.5 text-[13px] font-bold tracking-wider transition-colors
                        ${lang === code
                          ? "text-[#c9a84c] bg-white/[0.04]"
                          : "text-white/50 hover:text-[#c9a84c] hover:bg-white/[0.035]"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile currency selector */}
            <div ref={mobileCurRef} className="relative">
              <button
                onClick={() => setMobileCurOpen((o) => !o)}
                aria-label="Select currency"
                onContextMenu={(e) => e.preventDefault()}
                className={`w-[38px] h-[38px] rounded-full text-[9px] font-bold border transition-all duration-200
                  flex items-center justify-center tracking-wider active:scale-110
                  ${mobileCurOpen
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/90 border-white/50 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                  }`}
              >
                {currency}
              </button>

              {mobileCurOpen && (
                <div className="absolute right-0 top-full mt-1.5
                                bg-[#0a0a0a]/96 backdrop-blur-xl
                                border border-white/[0.09]
                                shadow-[0_8px_32px_rgba(0,0,0,0.7)]
                                overflow-hidden z-50 w-[200px]">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c.code); setMobileCurOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2.5
                                  transition-colors
                                  ${currency === c.code
                                    ? "text-[#c9a84c] bg-white/[0.04]"
                                    : "text-white/50 hover:text-[#c9a84c] hover:bg-white/[0.035]"}`}
                    >
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

        </div>

      </div>{/* end main row */}

      {/* ══════════════════════════════════════════════════════════════
          MOBILE DRAWER
      ══════════════════════════════════════════════════════════════ */}
      {menuOpen && (
        <div className="sm:hidden bg-black/75 backdrop-blur-xl border-t border-white/[0.07]">

          {/* Theme toggle — top-right corner of drawer */}
          <div className="flex justify-end px-6 pt-4 pb-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle light / dark theme"
              className="w-9 h-9 rounded-full border border-white/40 bg-transparent
                         text-white/70 hover:border-[#c9a84c] hover:text-[#c9a84c]
                         flex items-center justify-center transition-all duration-200"
            >
              <ThemeIcon theme={theme} />
            </button>
          </div>

          <nav className="flex flex-col gap-4 px-6 pb-6 pt-2">

            <Link href="/" onClick={pathname === "/" ? (e) => { e.preventDefault(); closeAll(); scrollTop(); } : closeAll}
              className="text-white/80 text-[17px] tracking-[0.2em] hover:text-white transition-colors">
              {t.nav_home[lang]}
            </Link>

            {/* SERVICES — expandable mobile */}
            <div>
              <button
                onClick={() => {
                  if (pathname === "/services") { closeAll(); scrollTop(); }
                  else setServicesMobileOpen(o => !o);
                }}
                className="flex items-center justify-between w-full text-white/80 text-[17px] tracking-[0.2em] hover:text-white transition-colors"
              >
                <span>{t.nav_services[lang]}</span>
                <svg className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${servicesMobileOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {servicesMobileOpen && (
                <div className="mt-3 ml-1 pl-4 border-l border-[#c9a84c]/25 flex flex-col gap-3">
                  {SVC_ITEMS.map((item) => (
                    <Link
                      key={item.anchor}
                      href={`/services${item.anchor}`}
                      onClick={closeAll}
                      className="text-white/45 text-[14px] tracking-[0.22em] hover:text-[#c9a84c] transition-colors"
                    >
                      {t[item.key][lang]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* FLEET */}
            <Link href="/fleet" onClick={pathname === "/fleet" ? (e) => { e.preventDefault(); closeAll(); scrollTop(); } : closeAll}
              className="text-white/80 text-[17px] tracking-[0.2em] hover:text-white transition-colors">
              {t.nav_fleet[lang]}
            </Link>

            {/* ABOUT — expandable */}
            <div>
              <button
                onClick={() => {
                  if (pathname === "/about") { closeAll(); scrollTop(); }
                  else setAboutMobileOpen(o => !o);
                }}
                className="flex items-center justify-between w-full text-white/80 text-[17px] tracking-[0.2em] hover:text-white transition-colors"
              >
                <span>{t.nav_about[lang]}</span>
                <svg className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${aboutMobileOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {aboutMobileOpen && (
                <div className="mt-3 ml-1 pl-4 border-l border-[#c9a84c]/25 flex flex-col gap-3">
                  <Link href="/about#story" onClick={closeAll}
                    className="text-white/45 text-[14px] tracking-[0.22em] hover:text-[#c9a84c] transition-colors">
                    {t.nav_about_story[lang]}
                  </Link>
                  <Link href="/about#faq" onClick={closeAll}
                    className="text-white/45 text-[14px] tracking-[0.22em] hover:text-[#c9a84c] transition-colors">
                    {t.nav_about_faq[lang]}
                  </Link>
                  <Link href="/about#contact" onClick={closeAll}
                    className="text-white/45 text-[14px] tracking-[0.22em] hover:text-[#c9a84c] transition-colors">
                    {t.nav_about_contact[lang]}
                  </Link>
                </div>
              )}
            </div>


            {/* BOOK */}
            <Link href="/book" onClick={pathname === "/book" ? (e) => { e.preventDefault(); closeAll(); scrollTop(); } : closeAll}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
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
