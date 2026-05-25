"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";

/* ── Asset URLs ────────────────────────────────────────────────────── */
const LOGO    = "https://octoshell.jp/wp-content/uploads/2024/09/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240910223903.png";
const HERO_BG = "https://octoshell.jp/wp-content/uploads/2024/10/Home2.png";
const ALPHARD = "https://octoshell.jp/wp-content/uploads/2024/09/toyotaalphard.png";
const HIACE   = "https://octoshell.jp/wp-content/uploads/2024/09/toyatahiace.png";
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
const YouTubeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const TikTokIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/octoshell_japan/", icon: <InstagramIcon /> },
  { label: "Facebook",  href: "#", icon: <FacebookIcon /> },
  { label: "YouTube",   href: "#", icon: <YouTubeIcon /> },
  { label: "TikTok",    href: "#", icon: <TikTokIcon /> },
];

/* ── Pricing data (route key → price) ─────────────────────────────── */
const ALPHARD_ROWS: [string, string][] = [
  ["route_haneda", "¥20,000"], ["route_narita", "¥25,000"],
  ["route_city",   "¥43,000"], ["route_fuji",   "¥68,000"],
  ["route_kanagawa","¥70,000"],["route_hakone", "¥70,000"],
  ["route_izu",    "¥70,000"], ["route_golf",   "¥50,000"],
];
const HIACE_ROWS: [string, string][] = [
  ["route_haneda", "¥22,000"], ["route_narita", "¥28,000"],
  ["route_city",   "¥50,000"], ["route_fuji",   "¥72,000"],
  ["route_kanagawa","¥80,000"],["route_hakone", "¥80,000"],
  ["route_izu",    "¥80,000"], ["route_golf",   "¥60,000"],
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
      <section id="prices" className="scroll-mt-[88px] sm:scroll-mt-24 py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-2xl font-bold tracking-[0.3em] text-gray-900">
              {t.prices_title[lang]}
            </h2>
            <p className="mt-3 text-[10px] sm:text-[11px] tracking-[0.25em] text-gray-400 uppercase">
              {t.prices_sub[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Alphard card */}
            <PriceCard name="TOYOTA ALPHARD" img={ALPHARD} rows={ALPHARD_ROWS} lang={lang} />
            {/* Hiace card */}
            <PriceCard name="TOYOTA HIACE"   img={HIACE}   rows={HIACE_ROWS}   lang={lang} />
          </div>
        </div>
      </section>

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
              <Link href="#"
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
  rows: [string, string][];
  lang: Lang;
}) {
  const { lang: _l } = useLang(); // already passed as prop, but hook is fine
  return (
    <div className="flex flex-col border border-gray-200">
      <div className="bg-white flex items-center justify-center h-[200px] px-4">
        <Image src={img} alt={name} width={320} height={180}
          className="object-contain max-h-40 w-auto mix-blend-multiply" />
      </div>
      <div className="flex flex-col flex-1 px-5 sm:px-7 py-5 sm:py-6">
        <h3 className="text-sm font-bold tracking-[0.2em] text-center mb-4 text-gray-900">
          {name}
        </h3>
        <table className="w-full text-sm flex-1">
          <tbody>
            {rows.map(([routeKey, price]) => (
              <tr key={routeKey} className="border-b border-gray-100 last:border-0">
                <td className="py-2 pr-3 text-gray-600 text-[13px]">{t[routeKey][lang]}</td>
                <td className="py-2 text-right font-bold text-gray-900 whitespace-nowrap text-[15px] sm:text-[16px] tracking-tight">{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[11px] text-gray-400 mt-3">{t.price_note[lang]}</p>
        <Link href="/book"
          className="block w-full mt-4 bg-[#1a2340] text-white text-center text-[11px] tracking-[0.18em] py-3 hover:bg-[#0f1829] transition-colors">
          {t.book_car[lang]}
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
