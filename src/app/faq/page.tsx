"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/context/LangContext";
import { FAQ_GROUPED, type FaqItem } from "@/lib/faq";

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
  const pathname = usePathname();
  const isZh = pathname.startsWith("/zh");
  const lp = (path: string) => isZh ? `/zh${path}` : path;
  const [openKey, setOpenKey]         = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<number | "all">("all");
  const [query, setQuery]             = useState("");
  const toggle = (key: string) => setOpenKey(prev => prev === key ? null : key);
  const groups = FAQ_GROUPED[lang];

  const ALL_LABEL = { en: "All Questions", ja: "すべての質問", zh: "全部問題" };

  const SLOGAN = {
    en: { badge: "Help Centre", line1: "Every question.", line2: "Precisely answered.", sub: "Before your journey begins, we want you to feel certain. Browse every detail below — or reach us directly.", placeholder: "Search questions…" },
    ja: { badge: "ヘルプセンター", line1: "すべてのご質問に、", line2: "丁寧にお答えします。", sub: "旅が始まる前に、安心してご出発いただけるよう。以下からご確認ください。", placeholder: "質問を検索…" },
    zh: { badge: "幫助中心", line1: "每一個問題，", line2: "都值得精確的回答。", sub: "出發前，我們希望您一切心中有數。請瀏覽以下內容，或直接與我們聯絡。", placeholder: "搜尋問題…" },
  };

  const handleGroupSelect = (g: number | "all") => {
    setActiveGroup(g);
    setOpenKey(null);
    setQuery("");
  };

  /* Search: flatten all items and filter */
  const q = query.trim().toLowerCase();
  const searchResults = q
    ? groups.flatMap((g, gi) =>
        g.items
          .filter(item => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q))
          .map((item, qi) => ({ item, key: `s-${gi}-${qi}` }))
      )
    : [];
  const isSearching = q.length > 0;

  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      {/* ── Hero ── */}
      <div className="relative bg-[#0c0c0c] pt-[124px] sm:pt-[100px] pb-14 sm:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Header />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          {/* Badge */}
          <p className="text-[#c9a84c] text-[10px] tracking-[0.5em] uppercase mb-6">
            {SLOGAN[lang].badge}
          </p>

          {/* Two-col: slogan left, description right */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16 mb-10">
            <div className="flex-1">
              <h1 className="text-white/60 text-3xl sm:text-4xl lg:text-[3.2rem] font-light tracking-[-0.01em] leading-[1.15]">
                {SLOGAN[lang].line1}
              </h1>
              <p className="text-[#c9a84c] text-3xl sm:text-4xl lg:text-[3.2rem] italic font-light tracking-[-0.01em] leading-[1.15]">
                {SLOGAN[lang].line2}
              </p>
            </div>
            <p className="lg:max-w-[320px] text-white/35 text-[13px] leading-[1.9] tracking-[0.02em] lg:text-right">
              {SLOGAN[lang].sub}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xl">
            <input
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setOpenKey(null); }}
              placeholder={SLOGAN[lang].placeholder}
              className="w-full bg-transparent border border-white/15 text-white placeholder-white/25
                         text-[13px] tracking-[0.05em] px-5 py-4 pr-12
                         focus:outline-none focus:border-[#c9a84c]/50 transition-colors duration-200"
            />
            {query ? (
              <button onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none"
                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
              </svg>
            )}
          </div>
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
          <div className="flex-1 min-w-0">
            {isSearching ? (
              /* Search results */
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--c-ink-3)] mb-6">
                  {searchResults.length > 0
                    ? `${searchResults.length} ${lang === "ja" ? "件の結果" : lang === "zh" ? "個結果" : "result" + (searchResults.length > 1 ? "s" : "")}`
                    : lang === "ja" ? "結果なし" : lang === "zh" ? "無結果" : "No results"}
                </p>
                {searchResults.length > 0 ? (
                  <div>
                    {searchResults.map(({ item, key }) => (
                      <FaqRow key={key} item={item} open={openKey === key} onToggle={() => toggle(key)} />
                    ))}
                  </div>
                ) : (
                  <p className="text-[var(--c-ink-3)] text-[14px]">
                    {lang === "ja" ? "別のキーワードでお試しください。" : lang === "zh" ? "請嘗試其他關鍵字。" : "Try a different keyword, or contact us directly."}
                  </p>
                )}
              </div>
            ) : (
              /* Normal grouped view */
              <div className="space-y-12">
                {groups.map((group, gi) => {
                  if (activeGroup !== "all" && activeGroup !== gi) return null;
                  return (
                    <div key={gi}>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-5 h-px bg-[#c9a84c]" />
                        <p className="text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase font-semibold">
                          {stripEmoji(group.group)}
                        </p>
                        <span className="text-[var(--c-ink-4)] text-[10px] tracking-widest">
                          {group.items.length}
                        </span>
                      </div>
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
            )}
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
            <Link href={lp("/book")}
              className="inline-flex items-center gap-2.5 bg-[#c9a84c] text-[#0c0c0c]
                         text-[11px] font-black tracking-[0.3em] uppercase px-8 py-3.5
                         hover:bg-white transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.3)]">
              {lang === "ja" ? "今すぐ予約" : lang === "zh" ? "立即預訂" : "Book Now"}
            </Link>
            <Link href={lp("/about#contact")}
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
