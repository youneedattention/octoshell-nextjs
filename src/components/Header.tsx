"use client";
import { useState } from "react";
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

const NAV_KEYS  = ["nav_home", "nav_services", "nav_about"] as const;
const NAV_HREFS = ["/", "/#services", "/#about"]            as const;

export default function Header() {
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    /* ── Fixed frosted-glass bar — 1.25× scale ── */
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/72 border-b border-white/[0.07]">

      {/* ── Main row ── */}
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-16 h-[70px] sm:h-20">

        {/* LEFT — lang circles (1.25×: w-9 h-9) */}
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

        {/* CENTER — Logo (55px) + desktop nav */}
        <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <Image
              src={LOGO}
              alt="Octoshell"
              width={55}
              height={55}
              className="object-contain drop-shadow-lg"
            />
          </Link>
          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-8 lg:gap-12 mt-0.5">
            {NAV_KEYS.map((key, i) => (
              <Link
                key={key}
                href={NAV_HREFS[i]}
                className="text-white/80 text-[12px] lg:text-[13px] tracking-[0.22em] hover:text-white transition-colors whitespace-nowrap"
              >
                {t[key][lang]}
              </Link>
            ))}
          </nav>
        </div>

        {/* RIGHT — BOOK pill + hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Mobile BOOK — gold solid pill */}
          <Link
            href="/book"
            className="sm:hidden inline-flex items-center bg-[#c9a84c] text-black text-[9px] font-bold tracking-[0.15em] px-3.5 py-1.5 rounded-full whitespace-nowrap"
          >
            BOOK
          </Link>

          {/* Desktop BOOK — border pill */}
          <Link
            href="/book"
            className="hidden sm:inline-flex items-center border border-white/80 text-white text-[11px] lg:text-[12px] tracking-[0.18em] px-6 lg:px-8 py-2 sm:py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-200 whitespace-nowrap"
          >
            {t.nav_book[lang]}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-white p-1 touch-manipulation"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="sm:hidden bg-black/95 backdrop-blur-lg border-t border-white/[0.07] py-5 px-6">
          <nav className="flex flex-col gap-4">
            {NAV_KEYS.map((key, i) => (
              <Link
                key={key}
                href={NAV_HREFS[i]}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 text-[13px] tracking-[0.2em] hover:text-white transition-colors"
              >
                {t[key][lang]}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMenuOpen(false)}
              className="mt-3 inline-flex justify-center bg-[#c9a84c] text-black text-[11px] font-bold tracking-[0.18em] px-6 py-2.5 rounded-full hover:bg-white transition-all duration-200"
            >
              {t.nav_book[lang]}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
