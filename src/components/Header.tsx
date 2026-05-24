"use client";
import { useRef, useState } from "react";
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
  { code: "zh", label: "繁" },
];

export default function Header() {
  const { lang, setLang } = useLang();
  const [menuOpen,        setMenuOpen]        = useState(false);
  const [aboutDrop,       setAboutDrop]       = useState(false);
  const [aboutMobileOpen, setAboutMobileOpen] = useState(false);
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDrop  = () => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
    setAboutDrop(true);
  };
  const closeDrop = () => {
    dropTimer.current = setTimeout(() => setAboutDrop(false), 200);
  };
  const closeAll  = () => { setMenuOpen(false); setAboutMobileOpen(false); };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/72 border-b border-white/[0.07]">

      {/* ── Main row ── */}
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-16 h-[70px] sm:h-20">

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

            {/* SERVICES */}
            <Link href="/#services"
              className="text-white/80 text-[12px] lg:text-[13px] tracking-[0.22em] hover:text-white transition-colors whitespace-nowrap">
              {t.nav_services[lang]}
            </Link>

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
                               hover:text-[#c9a84c] hover:bg-white/[0.035] transition-all duration-150">
                    {/* question mark icon */}
                    <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c]/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path strokeLinecap="round" d="M12 17h.01" />
                    </svg>
                    {t.nav_about_faq[lang]}
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

            <Link href="/#services" onClick={closeAll}
              className="text-white/80 text-[13px] tracking-[0.2em] hover:text-white transition-colors">
              {t.nav_services[lang]}
            </Link>

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
