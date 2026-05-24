"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";
import type { Lang } from "@/lib/translations";

const LOGO =
  "https://octoshell.jp/wp-content/uploads/2024/09/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240910223903.png";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ja", label: "日" },
  { code: "zh", label: "中" },
];

const SVC_ITEMS: { key: keyof typeof t; anchor: string; icon: React.ReactNode }[] = [
  {
    key: "nav_svc_1", anchor: "#hourly",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3"/></svg>,
  },
  {
    key: "nav_svc_2", anchor: "#airport",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>,
  },
  {
    key: "nav_svc_3", anchor: "#oneway",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6-6m6 6l-6 6"/></svg>,
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
    key: "nav_svc_7", anchor: "#ceremony",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>,
  },
  {
    key: "nav_svc_8", anchor: "#dispatch",
    icon: <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>,
  },
];

export default function Header() {
  const { lang, setLang } = useLang();
  const [menuOpen,          setMenuOpen]          = useState(false);
  const [aboutDrop,         setAboutDrop]         = useState(false);
  const [aboutMobileOpen,   setAboutMobileOpen]   = useState(false);
  const [servicesDrop,      setServicesDrop]      = useState(false);
  const [servicesMobileOpen,setServicesMobileOpen]= useState(false);
  const dropTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const svcDropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // check immediately on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDrop  = () => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
    setAboutDrop(true);
  };
  const closeDrop = () => {
    dropTimer.current = setTimeout(() => setAboutDrop(false), 200);
  };

  const openSvcDrop  = () => {
    if (svcDropTimer.current) clearTimeout(svcDropTimer.current);
    setServicesDrop(true);
  };
  const closeSvcDrop = () => {
    svcDropTimer.current = setTimeout(() => setServicesDrop(false), 200);
  };

  const closeAll  = () => {
    setMenuOpen(false);
    setAboutMobileOpen(false);
    setServicesMobileOpen(false);
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
      ${scrolled
        ? "backdrop-blur-xl bg-black/75 border-b border-white/[0.07]"
        : "bg-transparent border-b border-transparent"}`}>

      {/* ── Main row ── */}
      <div className="flex items-center justify-between px-6 sm:px-12 lg:px-20 h-[84px] sm:h-[96px]">

        {/* LEFT — lang circles */}
        <div className="flex items-center gap-1.5 shrink-0">
          {LANGS.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              aria-label={`Switch to ${label}`}
              className={`w-9 h-9 rounded-full text-[11px] font-bold border transition-all duration-200
                ${lang === code
                  ? "bg-white text-black border-white shadow-[0_0_0_2px_rgba(255,255,255,0.25)]"
                  : "bg-transparent text-white/80 border-white/40 hover:border-white hover:bg-white/10"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CENTER — Logo + desktop nav */}
        <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <Image src={LOGO} alt="Octoshell" width={75} height={75} className="object-contain drop-shadow-lg" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-8 lg:gap-12 mt-0.5">

            {/* HOME */}
            <Link href="/"
              className="text-white/80 text-[12px] lg:text-[13px] tracking-[0.22em] hover:text-white transition-colors whitespace-nowrap">
              {t.nav_home[lang]}
            </Link>

            {/* SERVICES — hover dropdown */}
            <div className="relative" onMouseEnter={openSvcDrop} onMouseLeave={closeSvcDrop}>
              <Link href="/services"
                className={`flex items-center gap-1 text-[12px] lg:text-[13px] tracking-[0.22em]
                            hover:text-white transition-colors whitespace-nowrap
                            ${servicesDrop ? "text-white" : "text-white/80"}`}>
                {t.nav_services[lang]}
                <svg
                  className={`w-2.5 h-2.5 opacity-40 transition-transform duration-200 ${servicesDrop ? "rotate-180 opacity-70" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </Link>

              {/* Services dropdown panel */}
              {servicesDrop && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-[420px]
                             bg-[#0a0a0a]/96 backdrop-blur-xl
                             border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.6)]
                             overflow-hidden"
                  onMouseEnter={openSvcDrop}
                  onMouseLeave={closeSvcDrop}
                >
                  {/* Gold top accent */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />

                  <div className="grid grid-cols-2 p-1">
                    {SVC_ITEMS.map((item, idx) => (
                      <Link
                        key={item.anchor}
                        href={`/services${item.anchor}`}
                        onClick={() => setServicesDrop(false)}
                        className={`flex items-center gap-3 px-4 py-3
                                   text-[10px] tracking-[0.22em] uppercase text-white/50
                                   hover:text-[#c9a84c] hover:bg-white/[0.035] transition-all duration-150
                                   ${idx % 2 === 0 ? "border-r border-white/[0.05]" : ""}
                                   ${idx < 6 ? "border-b border-white/[0.05]" : ""}`}
                      >
                        {item.icon}
                        {t[item.key][lang]}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ABOUT — hover dropdown */}
            <div className="relative" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
              <Link href="/about"
                className={`flex items-center gap-1 text-[12px] lg:text-[13px] tracking-[0.22em]
                            hover:text-white transition-colors whitespace-nowrap
                            ${aboutDrop ? "text-white" : "text-white/80"}`}>
                {t.nav_about[lang]}
                <svg
                  className={`w-2.5 h-2.5 opacity-40 transition-transform duration-200 ${aboutDrop ? "rotate-180 opacity-70" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </Link>

              {/* Dropdown panel */}
              {aboutDrop && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-52
                             bg-[#0a0a0a]/96 backdrop-blur-xl
                             border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.6)]
                             overflow-hidden"
                  onMouseEnter={openDrop}
                  onMouseLeave={closeDrop}
                >
                  {/* Gold top accent */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />

                  <Link href="/about#story" onClick={() => setAboutDrop(false)}
                    className="flex items-center gap-3 px-5 py-3.5
                               text-[10px] tracking-[0.25em] uppercase text-white/50
                               hover:text-[#c9a84c] hover:bg-white/[0.035] transition-all duration-150
                               border-b border-white/[0.05]">
                    {/* clock icon */}
                    <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                    </svg>
                    {t.nav_about_story[lang]}
                  </Link>

                  <Link href="/about#faq" onClick={() => setAboutDrop(false)}
                    className="flex items-center gap-3 px-5 py-3.5
                               text-[10px] tracking-[0.25em] uppercase text-white/50
                               hover:text-[#c9a84c] hover:bg-white/[0.035] transition-all duration-150
                               border-b border-white/[0.05]">
                    {/* question mark icon */}
                    <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path strokeLinecap="round" d="M12 17h.01" />
                    </svg>
                    {t.nav_about_faq[lang]}
                  </Link>

                  <Link href="/about#contact" onClick={() => setAboutDrop(false)}
                    className="flex items-center gap-3 px-5 py-3.5
                               text-[10px] tracking-[0.25em] uppercase text-white/50
                               hover:text-[#c9a84c] hover:bg-white/[0.035] transition-all duration-150">
                    {/* mail icon */}
                    <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    {t.nav_about_contact[lang]}
                  </Link>
                </div>
              )}
            </div>

          </nav>
        </div>

        {/* RIGHT — BOOK pill + hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile BOOK */}
          <Link href="/book"
            className="sm:hidden inline-flex items-center bg-[#c9a84c] text-black text-[9px] font-bold tracking-[0.15em] px-3.5 py-1.5 rounded-full whitespace-nowrap">
            BOOK
          </Link>
          {/* Desktop BOOK */}
          <Link href="/book"
            className="hidden sm:inline-flex items-center border border-white/80 text-white text-[11px] lg:text-[12px] tracking-[0.18em] px-6 lg:px-8 py-2 sm:py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-200 whitespace-nowrap">
            {t.nav_book[lang]}
          </Link>
          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-white p-1 touch-manipulation" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="sm:hidden bg-black/95 backdrop-blur-lg border-t border-white/[0.07] py-5 px-6">
          <nav className="flex flex-col gap-4">

            <Link href="/" onClick={closeAll}
              className="text-white/80 text-[13px] tracking-[0.2em] hover:text-white transition-colors">
              {t.nav_home[lang]}
            </Link>

            {/* SERVICES — expandable mobile */}
            <div>
              <button
                onClick={() => setServicesMobileOpen(o => !o)}
                className="flex items-center justify-between w-full text-white/80 text-[13px] tracking-[0.2em] hover:text-white transition-colors"
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
                      className="text-white/45 text-[11px] tracking-[0.22em] hover:text-[#c9a84c] transition-colors"
                    >
                      {t[item.key][lang]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ABOUT — expandable */}
            <div>
              <button
                onClick={() => setAboutMobileOpen(o => !o)}
                className="flex items-center justify-between w-full text-white/80 text-[13px] tracking-[0.2em] hover:text-white transition-colors"
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
                    className="text-white/45 text-[11px] tracking-[0.22em] hover:text-[#c9a84c] transition-colors">
                    {t.nav_about_story[lang]}
                  </Link>
                  <Link href="/about#faq" onClick={closeAll}
                    className="text-white/45 text-[11px] tracking-[0.22em] hover:text-[#c9a84c] transition-colors">
                    {t.nav_about_faq[lang]}
                  </Link>
                  <Link href="/about#contact" onClick={closeAll}
                    className="text-white/45 text-[11px] tracking-[0.22em] hover:text-[#c9a84c] transition-colors">
                    {t.nav_about_contact[lang]}
                  </Link>
                </div>
              )}
            </div>

            <Link href="/book" onClick={closeAll}
              className="mt-3 inline-flex justify-center bg-[#c9a84c] text-black text-[11px] font-bold tracking-[0.18em] px-6 py-2.5 rounded-full hover:bg-white transition-all duration-200">
              {t.nav_book[lang]}
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}
