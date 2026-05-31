"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Price, { CurrencyNote } from "@/components/Price";
import ReviewsSection from "@/components/ReviewsSection";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";

/* ── Asset URLs ────────────────────────────────────────────────────── */
const LOGO    = "/logo.png";
const HERO_BG = "https://octoshell.jp/wp-content/uploads/2024/10/Home2.png";
const ALPHARD = "/alphard.png";
const HIACE   = "/hiace.png";
const SVC1    = "https://octoshell.jp/wp-content/uploads/2024/09/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240910002336-1024x679.jpg";
const SVC2    = "https://octoshell.jp/wp-content/uploads/2024/09/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240910002341-1024x679.jpg";
const SVC3    = "https://octoshell.jp/wp-content/uploads/2024/09/left.png";

/* ── Social icons ──────────────────────────────────────────────────── */
const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/octoshell_japan/", icon: <InstagramIcon /> },
  { label: "Facebook",  href: "#", icon: <FacebookIcon /> },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/octoshell", icon: <LinkedInIcon /> },
];

/* ── Pricing data (route key → price) ─────────────────────────────── */
const ALPHARD_ROWS: [string, number][] = [
  ["route_haneda", 20000], ["route_narita", 25000],
  ["route_city",   43000], ["route_fuji",   68000],
  ["route_kanagawa",70000],["route_hakone", 70000],
  ["route_izu",    70000], ["route_golf",   50000],
];
const HIACE_ROWS: [string, number][] = [
  ["route_haneda", 22000], ["route_narita", 28000],
  ["route_city",   50000], ["route_fuji",   72000],
  ["route_kanagawa",80000],["route_hakone", 80000],
  ["route_izu",    80000], ["route_golf",   60000],
];

/* ── Page ──────────────────────────────────────────────────────────── */
export default function Home() {
  const { lang } = useLang();

  return (
    <main className="overflow-x-hidden">

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative h-[100svh] min-h-[560px]">
        <Image src={HERO_BG} alt="Octoshell Japan Chauffeur Service" fill
          className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/65" />

        <Header />

        {/* Hero text */}
        <div className="absolute bottom-12 sm:bottom-16 left-5 sm:left-10 lg:left-16 max-w-[90vw] sm:max-w-none">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="shrink-0 block bg-red-600"
              style={{ width: 3, height: 56, transform: "skewX(-8deg)" }} />
            <h1 className="text-2xl sm:text-[2.2rem] lg:text-5xl font-bold text-white tracking-[0.08em] sm:tracking-[0.1em] leading-[1.15]">
              {t.hero_title1[lang]}
              <br />
              {t.hero_title2[lang]}
            </h1>
          </div>
          <p className="mt-2 sm:mt-3 ml-[18px] sm:ml-[28px] text-white/75 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase">
            {t.hero_sub[lang]}
          </p>
          {/* Social icons */}
          <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-7 ml-[18px] sm:ml-[28px]">
            {SOCIALS.map(({ label, href, icon }) => (
              <Link key={label} href={href} aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/70 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                {icon}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ PRICES ══════════════════ */}
      <section id="prices" className="scroll-mt-[88px] sm:scroll-mt-24 py-14 sm:py-20 px-4 sm:px-6 bg-[var(--c-body)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-2xl font-bold tracking-[0.3em] text-[var(--c-ink)]">
              {t.prices_title[lang]}
            </h2>
            <p className="mt-3 text-[10px] sm:text-[11px] tracking-[0.25em] text-[var(--c-ink-3)] uppercase">
              {t.prices_sub[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Alphard card */}
            <PriceCard name="TOYOTA ALPHARD" img={ALPHARD} rows={ALPHARD_ROWS} lang={lang} />
            {/* Hiace card */}
            <PriceCard name="TOYOTA HIACE"   img={HIACE}   rows={HIACE_ROWS}   lang={lang} />
          </div>
          <CurrencyNote lang={lang} />
        </div>
      </section>

      <ReviewsSection showViewAll />

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="bg-[#0a0a0a] pt-10 sm:pt-12 pb-7 sm:pb-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-7 border-b border-white/10">
            <Image src={LOGO} alt="Octoshell" width={50} height={50} className="object-contain" />
            <nav className="flex flex-wrap justify-center gap-8 sm:gap-10">
              {(["nav_home", "nav_services", "nav_about"] as const).map((key) => {
                const href = key === "nav_home" ? "/" : key === "nav_services" ? "/#services" : "/#about";
                return (
                  <Link key={key} href={href}
                    className="text-white/60 text-[11px] tracking-[0.2em] hover:text-white transition-colors">
                    {t[key][lang]}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5">
            <p className="text-white/30 text-[11px] text-center sm:text-left">
              {t.copyright[lang]}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-5">
              <Link href="#"
                className="text-white/30 text-[11px] hover:text-white/60 transition-colors">
                {t.footer_terms[lang]}
              </Link>
              <Link href="/privacy"
                className="text-white/30 text-[11px] hover:text-white/60 transition-colors">
                {t.footer_privacy[lang]}
              </Link>
              <Link href="/law"
                className="text-white/30 text-[11px] hover:text-white/60 transition-colors">
                {t.footer_law[lang]}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ── PriceCard ─────────────────────────────────────────────────────── */
import type { Lang } from "@/lib/translations";

function PriceCard({
  name, img, rows, lang,
}: {
  name: string;
  img: string;
  rows: [string, number][];
  lang: Lang;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center h-[300px] px-4">
        <Image src={img} alt={name} width={480} height={270}
          className="object-contain max-h-60 w-auto" />
      </div>
      <div className="flex flex-col flex-1 px-5 sm:px-7 py-5 sm:py-6">
        <h3 className="text-sm font-bold tracking-[0.2em] text-center mb-4 text-[var(--c-ink)]">
          {name}
        </h3>
        <table className="w-full text-sm flex-1">
          <tbody>
            {rows.map(([routeKey, yen]) => (
              <tr key={routeKey} className="border-b border-[var(--c-rule)] last:border-0">
                <td className="py-2 pr-3 text-[var(--c-ink-2)] text-[13px]">{t[routeKey][lang]}</td>
                <td className="py-2 text-right font-bold text-[var(--c-ink)] whitespace-nowrap text-[15px] sm:text-[16px] tracking-tight">
                  <Price yen={yen} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[11px] text-[var(--c-ink-3)] mt-3">{t.price_note[lang]}</p>
        <Link href="/book"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          className="group mt-4 w-full flex items-center justify-center gap-2.5
                     bg-[#c9a84c] text-[#0c0c0c] text-[11px] sm:text-[12px] tracking-[0.3em] font-black
                     px-8 py-3 transition-all duration-200
                     hover:bg-white
                     shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_4px_28px_rgba(201,168,76,0.5)]
                     active:scale-110 active:bg-white active:shadow-[0_8px_36px_rgba(201,168,76,0.7)]
                     sm:active:scale-100 sm:active:shadow-[0_4px_28px_rgba(201,168,76,0.5)]">
          {t.book_car[lang]}
          <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
            fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ── ServiceCard ───────────────────────────────────────────────────── */
function ServiceCard({ tag, title, body, img }: {
  tag: string; title: string; body: string; img: string;
}) {
  return (
    <div className="group flex flex-col">
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image src={img} alt={title} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="pt-4 sm:pt-5">
        <p className="text-[#c9a84c] text-[10px] tracking-[0.35em] mb-2 font-semibold">{tag}</p>
        <h3 className="text-white text-sm font-semibold tracking-wider mb-2 sm:mb-3">{title}</h3>
        <p className="text-white/55 text-[13px] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
