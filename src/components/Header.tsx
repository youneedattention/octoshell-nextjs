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

const NAV_KEYS = ["nav_home", "nav_services", "nav_about"] as const;
const NAV_HREFS = ["#", "#services", "#about"] as const;

export default function Header() {
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {/* ── Main bar ── */}
      <div className="flex items-start justify-between px-4 sm:px-8 lg:px-14 pt-4 sm:pt-6">

        {/* LEFT — 3 language icon buttons */}
        <div className="flex items-center gap-1 pt-1">
          {LANGS.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              aria-label={`Switch to ${label}`}
              className={`w-7 h-7 rounded-full text-[10px] font-bold tracking-wide border transition-colors
                ${lang === code
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white/50 hover:border-white hover:bg-white/10"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CENTER — Logo + desktop nav */}
        <div className="flex flex-col items-center gap-2">
          <Image
            src={LOGO}
            alt="Octoshell"
            width={50}
            height={50}
            className="object-contain drop-shadow-lg w-10 h-10 sm:w-12 sm:h-12 lg:w-[50px] lg:h-[50px]"
          />
          {/* Desktop nav — hidden on mobile */}
          <nav className="hidden sm:flex items-center gap-6 lg:gap-10">
            {NAV_KEYS.map((key, i) => (
              <Link
                key={key}
                href={NAV_HREFS[i]}
                className="text-white text-[10px] lg:text-[11px] tracking-[0.22em] hover:opacity-60 transition-opacity whitespace-nowrap"
              >
                {t[key][lang]}
              </Link>
            ))}
          </nav>
        </div>

        {/* RIGHT — Book button + mobile hamburger */}
        <div className="flex items-center gap-3 pt-1">
          {/* Book button — hidden on very small screens */}
          <Link
            href="#"
            className="hidden xs:block border border-white text-white text-[10px] lg:text-[11px] tracking-[0.15em] px-4 sm:px-5 lg:px-6 py-2 hover:bg-white hover:text-black transition-colors whitespace-nowrap"
          >
            {t.nav_book[lang]}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-white p-1"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile nav drawer ── */}
      {menuOpen && (
        <div className="sm:hidden bg-black/90 backdrop-blur-sm mt-2 mx-4 rounded-md py-4 px-6">
          <nav className="flex flex-col gap-4">
            {NAV_KEYS.map((key, i) => (
              <Link
                key={key}
                href={NAV_HREFS[i]}
                onClick={() => setMenuOpen(false)}
                className="text-white text-sm tracking-[0.2em] hover:opacity-60 transition-opacity"
              >
                {t[key][lang]}
              </Link>
            ))}
            <Link
              href="#"
              onClick={() => setMenuOpen(false)}
              className="mt-2 border border-white text-white text-[11px] tracking-[0.15em] px-4 py-2 text-center hover:bg-white hover:text-black transition-colors"
            >
              {t.nav_book[lang]}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
