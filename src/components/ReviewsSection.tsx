"use client";
import { useState } from "react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

/* ── UI strings ────────────────────────────────────────────────────── */
const UI = {
  en: {
    section:      "Client Reviews",
    badge:        "Top Rated Service",
    verified:     (n: number) => `${n} verified reviews`,
    overall:      "Overall rating",
    showMore:     "Show more",
    showLess:     "Show less",
    clear:        "Clear",
  },
  ja: {
    section:      "クライアントレビュー",
    badge:        "高評価サービス",
    verified:     (n: number) => `${n}件の認証済みレビュー`,
    overall:      "総合評価",
    showMore:     "続きを読む",
    showLess:     "閉じる",
    clear:        "クリア",
  },
  zh: {
    section:      "客戶評價",
    badge:        "頂級服務",
    verified:     (n: number) => `${n} 則已驗證評價`,
    overall:      "總體評分",
    showMore:     "顯示更多",
    showLess:     "收起",
    clear:        "清除",
  },
};

/* ── Trilingual modal content ───────────────────────────────────────── */
const HOW_CONTENT = {
  en: {
    title: "How reviews work",
    p1: "Reviews from verified clients help travelers choose the right private chauffeur service for their journey in Japan. By default, reviews are sorted by most recent.",
    p2: "Only clients with a confirmed and completed Octoshell booking are invited to leave a review. All submissions are verified against booking records to ensure authenticity.",
    p3: "The Top Rated Service badge requires a minimum of 5 verified reviews. Ratings are calculated as an average across all verified bookings and are updated on an ongoing basis.",
  },
  ja: {
    title: "レビューの仕組み",
    p1: "認証済みのお客様によるレビューは、日本でのご旅行に最適なプライベートシェーファーサービスを選ぶ際の参考になります。デフォルトでは新着順に表示されます。",
    p2: "予約が確認・完了したOctoshellのお客様のみ、レビューの投稿をご案内します。すべての投稿は予約記録と照合し、信頼性を確保しています。",
    p3: "「トップレイテッドサービス」バッジの取得には、5件以上の認証済みレビューが必要です。評価はすべての認証済み予約の平均値として算出され、随時更新されます。",
  },
  zh: {
    title: "評價說明",
    p1: "已驗證客戶的評價有助於旅行者在日本選擇合適的私人司機服務。評價預設按最新日期排序。",
    p2: "僅完成確認訂單的 Octoshell 客戶才會收到評價邀請，所有評價均與預訂記錄核實，以確保真實性。",
    p3: "獲得「頂級服務」標章需至少 5 則已驗證評價。評分為所有已驗證預訂的平均值，並持續更新。",
  },
};

/* ── Icons ─────────────────────────────────────────────────────────── */
const IconCleanliness = () => (
  <Image src="/icon-spray.svg" alt="" width={32} height={32} className="dark:invert" />
);
const IconPunctuality = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v5l3.5 3.5"/>
  </svg>
);
const IconHospitality = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9"/>
    <path d="M8.5 14s1 2 3.5 2 3.5-2 3.5-2"/>
    <circle cx="9" cy="10" r=".6" fill="currentColor" stroke="none"/>
    <circle cx="15" cy="10" r=".6" fill="currentColor" stroke="none"/>
  </svg>
);
const IconDriving = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="2.5"/>
    <path d="M12 3v6.5M5 9.5h6.5M12.5 9.5H19"/>
  </svg>
);
const IconValue = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.613.226l5.383-6.115a2.25 2.25 0 00-.226-2.613L12.16 3.659A2.25 2.25 0 0010.568 3H9.568z"/>
    <circle cx="6.5" cy="6.5" r=".75" fill="currentColor" stroke="none"/>
  </svg>
);

/* ── Data ───────────────────────────────────────────────────────────── */
const RATINGS = [
  { label: { en: "Cleanliness",     ja: "清潔さ",       zh: "整潔度"   }, score: 5.0, Icon: IconCleanliness },
  { label: { en: "Punctuality",     ja: "時間厳守",     zh: "準時率"   }, score: 5.0, Icon: IconPunctuality },
  { label: { en: "Hospitality",     ja: "おもてなし",   zh: "服務態度" }, score: 4.9, Icon: IconHospitality },
  { label: { en: "Driving Comfort", ja: "乗り心地",     zh: "乘坐舒適" }, score: 4.9, Icon: IconDriving     },
  { label: { en: "Value",           ja: "価格",         zh: "性價比"   }, score: 4.8, Icon: IconValue       },
];

/* ── Service type lookup (matches /services page IDs) ───────────────── */
const SERVICE_TYPES: Record<string, Record<string, string>> = {
  airport:     { en: "Airport Transfer",    ja: "空港送迎",          zh: "機場接送"   },
  hourly:      { en: "By the Hour",         ja: "時間制貸切",        zh: "時段包車"   },
  oneway:      { en: "One Way",             ja: "片道送迎",          zh: "單程穿梭"   },
  photo:       { en: "Photo Tour",          ja: "旅拍",              zh: "旅拍接送"   },
  events:      { en: "Events & MICE",       ja: "MICE",              zh: "頂級盛會"   },
  sightseeing: { en: "Bespoke Sightseeing", ja: "テーラーメイド観光", zh: "定制觀光"  },
  golf:        { en: "Golf Transfer",       ja: "ゴルフ送迎",        zh: "高爾夫接送" },
  outdoor:     { en: "Outdoor",             ja: "アウトドア送迎",    zh: "戶外接送"   },
  ceremony:    { en: "Ceremonial",          ja: "冠婚葬祭",          zh: "典禮接送"   },
  port:        { en: "Port Transfer",       ja: "港湾送迎",          zh: "港口接送"   },
};

const MONTH: Record<string, Record<string, string>> = {
  "01": { en: "Jan", ja: "1月",  zh: "1月"  },
  "02": { en: "Feb", ja: "2月",  zh: "2月"  },
  "03": { en: "Mar", ja: "3月",  zh: "3月"  },
  "04": { en: "Apr", ja: "4月",  zh: "4月"  },
  "05": { en: "May", ja: "5月",  zh: "5月"  },
  "06": { en: "Jun", ja: "6月",  zh: "6月"  },
  "07": { en: "Jul", ja: "7月",  zh: "7月"  },
  "08": { en: "Aug", ja: "8月",  zh: "8月"  },
  "09": { en: "Sep", ja: "9月",  zh: "9月"  },
  "10": { en: "Oct", ja: "10月", zh: "10月" },
  "11": { en: "Nov", ja: "11月", zh: "11月" },
  "12": { en: "Dec", ja: "12月", zh: "12月" },
};

function fmtDate(iso: string, lang: string): string {
  const [y, m] = iso.split("-");
  const mo = MONTH[m]?.[lang] ?? m;
  return lang === "en" ? `${mo} ${y}` : `${y}年${mo}`;
}

const REVIEWS = [
  {
    name: "David Paul",
    location: "United States",
    dateISO: "2025-04",
    serviceIds: ["airport", "sightseeing"],
    trip: "Narita → Tokyo",          // directional route — keep
    text: "Ryu san was a very nice driver. Well-dressed and polite, and drove very smoothly.",
    tags: ["Well-dressed", "Polite", "Smooth Ride"],
  },
  {
    name: "Kaiko Hatakeyama",
    location: "Japan",
    role:     { en: "Guide", ja: "ガイド", zh: "導遊" },
    dateISO: "2025-05",
    serviceIds: ["sightseeing", "port"],
    duration:   { en: "3 days",      ja: "3日間",    zh: "3天"     },
    travelType: { en: "Family Trip", ja: "ファミリー", zh: "家庭出遊" },
    text: "Mr. Wang was very courteous and cooperative. It was a great help throughout the day.",
    tags: ["Courteous", "Cooperative"],
  },
  {
    name: "Evelyn",
    location: "Australia",
    dateISO: "2025-03",
    serviceIds: ["airport"],
    trip: "Shuzenji → Haneda",
    text: "Driver Du-san is so wonderful. He responded to every request. I was very happy to work with him.",
    tags: ["Wonderful"],
  },
];

const ALL_TAGS = ["Well-dressed", "Polite", "Smooth Ride", "Courteous", "Cooperative", "Wonderful"];

const STAR_DIST = [
  { stars: 5, count: 3 },
  { stars: 4, count: 0 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

/* ── Sub-components ─────────────────────────────────────────────────── */
function Stars() {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-[9px] h-[9px] text-[#c9a84c]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-[#c9a84c]/12 border border-[#c9a84c]/25 flex items-center justify-center shrink-0">
      <span className="text-[13px] font-bold text-[#c9a84c]">{name.charAt(0)}</span>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────────────── */
export default function ReviewsSection({ showViewAll = false }: { showViewAll?: boolean }) {
  const { lang } = useLang();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expanded,  setExpanded]  = useState<Set<number>>(new Set());
  const [howOpen,   setHowOpen]   = useState(false);

  const total    = REVIEWS.length;
  const filtered = activeTag ? REVIEWS.filter((r) => r.tags.includes(activeTag)) : REVIEWS;
  const hw       = HOW_CONTENT[lang];
  const ui       = UI[lang];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--c-body)]">
      <div className="max-w-5xl mx-auto flex flex-col items-center">

        {/* ── Score header ── */}
        <p className="text-[10px] tracking-[0.4em] text-[#c9a84c] uppercase mb-6">{ui.section}</p>
        <div className="flex flex-col items-center gap-2 mb-10">
          <div className="flex items-center gap-0">
            <Image src="/laurel-left.png"  alt="" width={103} height={140} className="object-contain opacity-90 dark:opacity-70 pointer-events-none select-none" aria-hidden draggable={false} />
            <span style={{ fontSize: 100, fontWeight: 500, lineHeight: "100px", letterSpacing: -2 }} className="text-[#222222] dark:text-[#c9a84c]">4.97</span>
            <Image src="/laurel-right.png" alt="" width={103} height={140} className="object-contain opacity-90 dark:opacity-70 pointer-events-none select-none" aria-hidden draggable={false} />
          </div>
          <p className="text-[12px] tracking-[0.15em] text-[var(--c-ink-2)] font-semibold mt-1">{ui.badge}</p>
          <button
            onClick={() => setHowOpen(true)}
            style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", color: "#6C6C6C", textDecoration: "underline", textUnderlineOffset: 2 }}
          >
            {hw.title}
          </button>
        </div>

        {/* ── Rating row ── */}
        <div className="w-full overflow-x-auto mb-10">
          <div className="flex min-w-[900px]">

            {/* Overall rating */}
            <div className="w-52 shrink-0 py-6 pr-6 border-r border-[var(--c-rule)]">
              <p style={{ fontSize: 12, fontWeight: 500, lineHeight: "16px", color: "var(--c-ink)" }} className="mb-5">{ui.overall}</p>
              <div className="space-y-[9px]">
                {STAR_DIST.map(({ stars, count }) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span style={{ fontSize: 10, fontWeight: 400, lineHeight: "12px", color: "var(--c-ink)" }} className="w-6 shrink-0 text-right">{stars}</span>
                    <div style={{ width: 91, height: 4, borderRadius: 2, background: "#DDDDDD", overflow: "hidden" }}>
                      <div
                        style={{ height: "100%", background: "#222222", borderRadius: 2, width: total ? `${(count / total) * 100}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 category columns — equal flex */}
            {RATINGS.map(({ label, score, Icon }, i) => (
              <div
                key={label.en}
                className={`flex-1 py-6 px-5 flex flex-col gap-3 min-w-[140px] ${i < RATINGS.length - 1 ? "border-r border-[var(--c-rule)]" : ""}`}
              >
                <p style={{ fontSize: 12, fontWeight: 500, lineHeight: "16px", color: "var(--c-ink)" }}>{label[lang]}</p>
                <p style={{ fontSize: 12, fontWeight: 500, lineHeight: "16px", color: "var(--c-ink)" }}>{score.toFixed(1)}</p>
                <Icon />
              </div>
            ))}
          </div>
        </div>

        {/* ── Tags (Airbnb chip style) ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 w-full">
          {ALL_TAGS.map((tag) => {
            const count  = REVIEWS.filter((r) => r.tags.includes(tag)).length;
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(active ? null : tag)}
                style={{
                height: 48, borderRadius: 16, padding: "12px 18px 12px 14px",
                border: active ? "0.74px solid #c9a84c" : "0.74px solid #DDDDDD",
                background: "transparent", display: "flex", alignItems: "center", gap: 8,
                fontSize: 12, fontWeight: 500, lineHeight: "16px",
                color: active ? "#c9a84c" : "#222222",
                boxShadow: active ? "0 0 0 1px #c9a84c" : undefined,
                transition: "all 0.2s",
              }}
              >
                {tag}
                <span style={{ fontSize: 10, fontWeight: 300, color: active ? "rgba(201,168,76,0.6)" : "#aaaaaa" }}>{count}</span>
              </button>
            );
          })}
          {activeTag && (
            <button
              onClick={() => setActiveTag(null)}
              className="px-4 py-3 rounded-3xl text-[11px] border border-[var(--c-rule)] text-[var(--c-ink-3)] hover:border-[var(--c-ink-3)] bg-[var(--c-card)] transition-colors"
            >
              {ui.clear} ✕
            </button>
          )}
        </div>

        {/* ── Review cards ── */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 border-t border-[var(--c-rule)]">
          {filtered.map((r, i) => {
            const isExpanded = expanded.has(i);
            const LIMIT      = 160;
            return (
              <div key={i} className="flex flex-col gap-4 py-8 px-1 sm:px-6 border-b border-[var(--c-rule)]">

                {/* Name + [Guide] badge + location */}
                <div className="flex items-center gap-3">
                  <Avatar name={r.name} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p style={{ fontSize: 16, fontWeight: 500, lineHeight: "20px", color: "var(--c-ink)" }}>{r.name}</p>
                      {"role" in r && r.role && (
                        <span className="text-[11px] tracking-[0.1em] px-2 py-0.5 rounded-full border border-[var(--c-ink-3)]/40 text-[var(--c-ink-3)] font-medium">
                          {(r.role as Record<string,string>)[lang]}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", color: "var(--c-ink-3)" }}>{r.location}</p>
                  </div>
                </div>

                {/* Stars · date · duration · route */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Stars />
                  <span className="text-[var(--c-rule)] text-xs">·</span>
                  <span style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", color: "var(--c-ink-3)" }}>{fmtDate(r.dateISO, lang)}</span>
                  {r.duration && <><span className="text-[var(--c-rule)]">·</span><span style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", color: "var(--c-ink-3)" }}>{(r.duration as Record<string,string>)[lang]}</span></>}
                  {"trip" in r && r.trip && <><span className="text-[var(--c-rule)]">·</span><span style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", color: "var(--c-ink-3)" }}>{r.trip as string}</span></>}
                </div>

                {/* Service + travelType badges */}
                <div className="flex flex-wrap gap-1.5">
                  {r.travelType && (
                    <span className="text-[13px] tracking-[0.08em] px-3 py-1 rounded-full border border-[var(--c-ink-3)]/30 text-[var(--c-ink-2)] font-semibold">
                      {(r.travelType as Record<string,string>)[lang]}
                    </span>
                  )}
                  {r.serviceIds.map(id => (
                    <span key={id} className="text-[13px] tracking-[0.08em] px-3 py-1 rounded-full border border-[#c9a84c]/30 text-[#c9a84c]/80">
                      {SERVICE_TYPES[id]?.[lang]}
                    </span>
                  ))}
                </div>

                <div>
                  <p
                    style={{
                      fontSize: 16, fontWeight: 400, lineHeight: "24px", color: "var(--c-ink-2)",
                      ...(!isExpanded ? {
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical" as const,
                        overflow: "hidden",
                      } : {}),
                    }}
                  >
                    {r.text}
                  </p>
                  {r.text.length > LIMIT && (
                    <button
                      onClick={() => setExpanded((prev) => {
                        const next = new Set(prev);
                        next.has(i) ? next.delete(i) : next.add(i);
                        return next;
                      })}
                      style={{ fontSize: 16, fontWeight: 500, lineHeight: "20px", textDecoration: "underline", marginTop: 6 }}
                      className="text-[var(--c-ink)] hover:text-[#c9a84c] transition-colors block"
                    >
                      {isExpanded ? ui.showLess : ui.showMore}
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* View all reviews link — shown only on homepage */}
        {showViewAll && (
          <div className="mt-10 text-center">
            <a
              href="/reviews"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] text-[var(--c-ink-2)] border border-[var(--c-rule)] px-8 py-3 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors duration-200"
            >
              {lang === "ja" ? "すべてのレビューを見る" : lang === "zh" ? "查看所有評價" : "View All Reviews"}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6-6m6 6l-6 6"/>
              </svg>
            </a>
          </div>
        )}

      </div>

      {/* ── Modal (theme-aware) ── */}
      {howOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setHowOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-[var(--c-card)] border border-[var(--c-rule)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setHowOpen(false)}
              className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center text-[var(--c-ink-3)] hover:text-[var(--c-ink)] transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <h3 className="text-[15px] font-semibold text-[var(--c-ink)] tracking-[0.08em] mb-6">{hw.title}</h3>
            <div className="space-y-4 text-[13px] text-[var(--c-ink-2)] leading-relaxed">
              <p>{hw.p1}</p>
              <p>{hw.p2}</p>
              <p>{hw.p3}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
