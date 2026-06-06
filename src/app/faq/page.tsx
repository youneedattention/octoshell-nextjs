"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/context/LangContext";
import { FAQ_GROUPED, FAQ_FLAT_EN, type FaqItem } from "@/lib/faq";

/* ── FAQPage JSON-LD schema ── */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_FLAT_EN.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a },
  })),
};

/* ── Strip leading emoji from group name ── */
const stripEmoji = (s: string) => s.replace(/^[\p{Emoji}\s]+/u, "").trim();

/* ── Sub-components ── */
function FaqRow({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  return (
    <div className={`border-b border-[var(--c-rule)] transition-colors duration-200 ${open ? "border-[#c9a84c]/20" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-5 py-5 sm:py-6 text-left group"
      >
        <span className={`text-[14px] sm:text-[15px] tracking-[0.04em] leading-relaxed transition-colors duration-200
          ${open ? "text-[var(--c-ink)]" : "text-[var(--c-ink-2)] group-hover:text-[var(--c-ink)]"}`}>
          {item.q}
        </span>
        <span className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-200 mt-0.5
          ${open ? "border-[#c9a84c]/60 text-[#c9a84c]" : "border-[var(--c-rule)] text-[var(--c-ink-3)] group-hover:border-[var(--c-ink-2)]"}`}>
          <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
      {/* max-height transition — content always in DOM and visible to crawlers */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="pb-6 text-[14px] sm:text-[15px] text-[var(--c-ink-2)] leading-relaxed tracking-[0.03em] pr-9 whitespace-pre-line">
          {item.a}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════════ */
export default function FaqPage() {
  const { lang } = useLang();
  const [openKey, setOpenKey]       = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<number | "all">("all");
  const toggle = (key: string) => setOpenKey(prev => prev === key ? null : key);
  const groups = FAQ_GROUPED[lang];

  const ALL_LABEL = { en: "All Questions", ja: "すべての質問", zh: "全部問題" };
  const HERO = {
    en: { badge: "Help Centre",  title: "Frequently Asked Questions", sub: "Everything you need to know before your trip" },
    ja: { badge: "ヘルプセンター", title: "よくある質問",              sub: "ご予約前にご確認いただける情報をまとめました" },
    zh: { badge: "幫助中心",      title: "常見問題",                   sub: "行程前您需要了解的一切" },
  };

  const handleGroupSelect = (g: number | "all") => {
    setActiveGroup(g);
    setOpenKey(null);
  };

  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      {/* ── Hero ── */}
      <div className="relative bg-[#0c0c0c] pt-[124px] sm:pt-[100px] pb-10 sm:pb-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Header />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] mb-2.5 uppercase">{HERO[lang].badge}</p>
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.12em] leading-tight">
            {HERO[lang].title}
          </h1>
          <p className="mt-2 text-white/35 text-[12px] tracking-[0.28em] uppercase">{HERO[lang].sub}</p>
        </div>
      </div>

      {/* ── Main: sidebar + content ── */}
      <section className="bg-[var(--c-body)] py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* ── Left: sticky category nav ── */}
          <nav className="w-full lg:w-56 shrink-0 lg:sticky lg:top-28">

            {/* Mobile: horizontal scrollable chips */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <button
                onClick={() => handleGroupSelect("all")}
                className={`shrink-0 text-[10px] tracking-[0.2em] uppercase px-3 py-2 border transition-all whitespace-nowrap
                  ${activeGroup === "all"
                    ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/[0.07]"
                    : "border-[var(--c-rule)] text-[var(--c-ink-3)] hover:text-[var(--c-ink)] hover:border-[var(--c-ink-3)]"}`}
              >
                {ALL_LABEL[lang]}
              </button>
              {groups.map((g, i) => (
                <button key={i}
                  onClick={() => handleGroupSelect(i)}
                  className={`shrink-0 text-[10px] tracking-[0.2em] uppercase px-3 py-2 border transition-all whitespace-nowrap
                    ${activeGroup === i
                      ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/[0.07]"
                      : "border-[var(--c-rule)] text-[var(--c-ink-3)] hover:text-[var(--c-ink)] hover:border-[var(--c-ink-3)]"}`}
                >
                  {stripEmoji(g.group)}
                </button>
              ))}
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden lg:flex flex-col">
              {/* CATEGORIES label */}
              <p className="text-[9px] tracking-[0.4em] uppercase text-[var(--c-ink-3)] mb-4 ml-4">
                {lang === "ja" ? "カテゴリー" : lang === "zh" ? "分類" : "Categories"}
              </p>

              {/* All questions */}
              <button
                onClick={() => handleGroupSelect("all")}
                className={`group relative flex items-center justify-between pl-4 pr-3 py-3.5 text-left transition-all duration-200
                  ${activeGroup === "all"
                    ? "text-[var(--c-ink)]"
                    : "text-[var(--c-ink-3)] hover:text-[var(--c-ink)]"}`}
              >
                {/* gold left border + glow */}
                <span className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-200
                  ${activeGroup === "all"
                    ? "bg-[#c9a84c] shadow-[2px_0_12px_rgba(201,168,76,0.5)]"
                    : "bg-transparent group-hover:bg-[#c9a84c]/30"}`} />
                <span className={`text-[14px] font-light transition-colors duration-200
                  ${activeGroup === "all" ? "text-[var(--c-ink)]" : ""}`}>
                  {ALL_LABEL[lang]}
                </span>
                <span className={`text-[12px] font-light tabular-nums transition-colors duration-200
                  ${activeGroup === "all" ? "text-[#c9a84c]/70" : "text-[var(--c-ink-4)]"}`}>
                  {String(groups.reduce((s, g) => s + g.items.length, 0)).padStart(2, "0")}
                </span>
              </button>

              {/* Divider */}
              <div className="h-px bg-[var(--c-rule)] mx-4 my-2" />

              {/* Category items */}
              {groups.map((g, i) => (
                <button key={i}
                  onClick={() => handleGroupSelect(i)}
                  className={`group relative flex items-center justify-between pl-4 pr-3 py-3 text-left transition-all duration-200
                    ${activeGroup === i
                      ? "text-[var(--c-ink)]"
                      : "text-[var(--c-ink-3)] hover:text-[var(--c-ink)]"}`}
                >
                  <span className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-200
                    ${activeGroup === i
                      ? "bg-[#c9a84c] shadow-[2px_0_12px_rgba(201,168,76,0.5)]"
                      : "bg-transparent group-hover:bg-[#c9a84c]/30"}`} />
                  <span className="text-[14px] font-light">{stripEmoji(g.group)}</span>
                  <span className={`text-[12px] font-light tabular-nums transition-colors duration-200
                    ${activeGroup === i ? "text-[#c9a84c]/70" : "text-[var(--c-ink-4)]"}`}>
                    {String(g.items.length).padStart(2, "0")}
                  </span>
                </button>
              ))}

              {/* Direct contact */}
              <div className="mt-8 ml-4 pt-6 border-t border-[var(--c-rule)]">
                <p className="text-[9px] tracking-[0.4em] uppercase text-[var(--c-ink-3)] mb-3">
                  {lang === "ja" ? "お問い合わせ" : lang === "zh" ? "直接聯絡" : "Direct Contact"}
                </p>
                <a href="mailto:info@octoshell.jp"
                  className="text-[13px] text-[#c9a84c] hover:text-[#c9a84c]/70 transition-colors break-all">
                  info@octoshell.jp
                </a>
              </div>
            </div>
          </nav>

          {/* ── Right: questions ── */}
          <div className="flex-1 min-w-0 space-y-12">
            {groups.map((group, gi) => {
              if (activeGroup !== "all" && activeGroup !== gi) return null;
              return (
                <div key={gi}>
                  {/* Group header */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-5 h-px bg-[#c9a84c]" />
                    <p className="text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase font-semibold">
                      {stripEmoji(group.group)}
                    </p>
                    <span className="text-[var(--c-ink-4)] text-[10px] tracking-widest">
                      {group.items.length}
                    </span>
                  </div>
                  {/* Questions */}
                  <div>
                    {group.items.map((item, qi) => {
                      const key = `${gi}-${qi}`;
                      return (
                        <FaqRow key={key} item={item} open={openKey === key} onToggle={() => toggle(key)} />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[#0a0a0a] py-14 sm:py-18 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent mb-10" />
          <p className="text-white/40 text-[13px] tracking-[0.15em] mb-6">
            {lang === "ja" ? "まだご質問がありますか？" : lang === "zh" ? "仍有疑問？" : "Still have a question?"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book"
              className="inline-flex items-center gap-2.5 bg-[#c9a84c] text-[#0c0c0c]
                         text-[11px] font-black tracking-[0.3em] uppercase px-8 py-3.5
                         hover:bg-white transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.3)]">
              {lang === "ja" ? "今すぐ予約" : lang === "zh" ? "立即預訂" : "Book Now"}
            </Link>
            <Link href="/about#contact"
              className="text-white/35 text-[11px] tracking-[0.2em] uppercase hover:text-white/60 transition-colors">
              {lang === "ja" ? "お問い合わせ" : lang === "zh" ? "聯絡我們" : "Contact Us"}
            </Link>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent mt-10" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
