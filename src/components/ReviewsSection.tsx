"use client";
import { useState } from "react";
import { useLang } from "@/context/LangContext";

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
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M7 21h8a1 1 0 001-1v-7H6v7a1 1 0 001 1z"/>
    <path d="M9 13V9.5"/>
    <rect x="7.5" y="6.5" width="4" height="3" rx="0.5"/>
    <path d="M11.5 8h2.5l1.5-2.5"/>
    <circle cx="16.5" cy="4.5" r=".4" fill="currentColor" stroke="none"/>
    <circle cx="17.8" cy="5.8" r=".4" fill="currentColor" stroke="none"/>
    <circle cx="17.5" cy="3.5" r=".4" fill="currentColor" stroke="none"/>
  </svg>
);
const IconPunctuality = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v5l3.5 3.5"/>
  </svg>
);
const IconHospitality = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9"/>
    <path d="M8.5 14s1 2 3.5 2 3.5-2 3.5-2"/>
    <circle cx="9" cy="10" r=".6" fill="currentColor" stroke="none"/>
    <circle cx="15" cy="10" r=".6" fill="currentColor" stroke="none"/>
  </svg>
);
const IconDriving = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="2.5"/>
    <path d="M12 3v6.5M5 9.5h6.5M12.5 9.5H19"/>
  </svg>
);
const IconValue = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.613.226l5.383-6.115a2.25 2.25 0 00-.226-2.613L12.16 3.659A2.25 2.25 0 0010.568 3H9.568z"/>
    <circle cx="6.5" cy="6.5" r=".75" fill="currentColor" stroke="none"/>
  </svg>
);

/* ── Data ───────────────────────────────────────────────────────────── */
const RATINGS = [
  { label: "Cleanliness",     score: 5.0, Icon: IconCleanliness },
  { label: "Punctuality",     score: 5.0, Icon: IconPunctuality },
  { label: "Hospitality",     score: 4.9, Icon: IconHospitality },
  { label: "Driving Comfort", score: 4.9, Icon: IconDriving     },
  { label: "Value",           score: 4.8, Icon: IconValue       },
];

const REVIEWS = [
  {
    name: "J. K.",
    location: "United Kingdom",
    date: "May 2025",
    trip: "Narita → Tokyo",
    text: "Ryu san was a very nice driver. Well-dressed and polite, and drove very smoothly.",
    tags: ["Well-dressed", "Polite", "Smooth Ride"],
  },
  {
    name: "Michael Smith",
    location: "United States",
    date: "April 2025",
    trip: "Haneda → Tokyo",
    text: "Mr. Wang was also very courteous and cooperative. It was a great help throughout the day.",
    tags: ["Courteous", "Cooperative"],
  },
  {
    name: "Evelyn",
    location: "Australia",
    date: "March 2025",
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
        <svg key={i} className="w-3 h-3 text-[#c9a84c]" fill="currentColor" viewBox="0 0 24 24">
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
export default function ReviewsSection() {
  const { lang } = useLang();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expanded,  setExpanded]  = useState<Set<number>>(new Set());
  const [howOpen,   setHowOpen]   = useState(false);

  const total    = REVIEWS.length;
  const filtered = activeTag ? REVIEWS.filter((r) => r.tags.includes(activeTag)) : REVIEWS;
  const hw       = HOW_CONTENT[lang];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--c-body)]">
      <div className="max-w-5xl mx-auto flex flex-col items-center">

        {/* ── Score header ── */}
        <p className="text-[10px] tracking-[0.4em] text-[#c9a84c] uppercase mb-5">Client Reviews</p>
        <div className="flex items-center gap-5 mb-3">
          <span className="text-[72px] sm:text-[88px] font-bold leading-none tracking-tight text-[var(--c-ink)]">4.9</span>
          <div className="flex flex-col gap-2">
            <Stars />
            <p className="text-[12px] tracking-[0.15em] text-[var(--c-ink-2)] font-semibold">Top Rated Service</p>
            <p className="text-[10px] tracking-[0.08em] text-[var(--c-ink-3)]">{total} verified reviews</p>
          </div>
        </div>

        {/* How reviews work */}
        <button
          onClick={() => setHowOpen(true)}
          className="mb-10 text-[11px] text-[var(--c-ink-3)] underline underline-offset-2 hover:text-[var(--c-ink-2)] transition-colors tracking-[0.05em]"
        >
          {hw.title}
        </button>

        {/* ── Rating row ── */}
        <div className="w-full overflow-x-auto mb-10">
          <div className="flex min-w-[640px]">

            {/* Overall rating */}
            <div className="w-40 shrink-0 py-6 pr-6 border-r border-[var(--c-rule)]">
              <p className="text-[11px] tracking-[0.1em] text-[var(--c-ink-2)] mb-4">Overall rating</p>
              <div className="space-y-[7px]">
                {STAR_DIST.map(({ stars, count }) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--c-ink-3)] w-2 shrink-0 text-right">{stars}</span>
                    <div className="w-24 h-[3px] bg-[var(--c-rule)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--c-ink)] rounded-full"
                        style={{ width: total ? `${(count / total) * 100}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 category columns — equal flex */}
            {RATINGS.map(({ label, score, Icon }, i) => (
              <div
                key={label}
                className={`flex-1 py-6 px-5 flex flex-col gap-2.5 ${i < RATINGS.length - 1 ? "border-r border-[var(--c-rule)]" : ""}`}
              >
                <p className="text-[11px] tracking-[0.06em] text-[var(--c-ink-2)] whitespace-nowrap">{label}</p>
                <p className="text-[24px] font-semibold text-[var(--c-ink)] leading-none">{score.toFixed(1)}</p>
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
                className={`flex items-center gap-2 px-5 py-3 rounded-3xl text-[12px] tracking-[0.06em]
                            border transition-all duration-200 bg-[var(--c-card)]
                            ${active
                              ? "border-[#c9a84c] text-[#c9a84c] shadow-[0_0_0_1px_#c9a84c]"
                              : "border-[var(--c-rule)] text-[var(--c-ink-2)] hover:border-[var(--c-ink-3)]"}`}
              >
                {tag}
                <span className={`text-[10px] font-light ${active ? "text-[#c9a84c]/60" : "text-[var(--c-ink-4)]"}`}>{count}</span>
              </button>
            );
          })}
          {activeTag && (
            <button
              onClick={() => setActiveTag(null)}
              className="px-4 py-3 rounded-3xl text-[11px] border border-[var(--c-rule)] text-[var(--c-ink-3)] hover:border-[var(--c-ink-3)] bg-[var(--c-card)] transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* ── Review cards ── */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 border-t border-[var(--c-rule)]">
          {filtered.map((r, i) => {
            const isExpanded = expanded.has(i);
            const LIMIT      = 120;
            const truncated  = r.text.length > LIMIT && !isExpanded;
            return (
              <div key={i} className="flex flex-col gap-4 py-8 px-1 sm:px-6 border-b border-[var(--c-rule)]">

                <div className="flex items-center gap-3">
                  <Avatar name={r.name} />
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--c-ink)]">{r.name}</p>
                    <p className="text-[11px] text-[var(--c-ink-3)]">{r.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Stars />
                  <span className="text-[var(--c-rule)] text-xs">·</span>
                  <span className="text-[10px] tracking-[0.08em] text-[var(--c-ink-3)]">{r.date}</span>
                  <span className="text-[var(--c-rule)] text-xs">·</span>
                  <span className="text-[10px] tracking-[0.06em] text-[var(--c-ink-3)]">{r.trip}</span>
                </div>

                <div>
                  <p className="text-[13px] text-[var(--c-ink-2)] leading-relaxed">
                    {truncated ? r.text.slice(0, LIMIT) + "…" : r.text}
                  </p>
                  {r.text.length > LIMIT && (
                    <button
                      onClick={() => setExpanded((prev) => {
                        const next = new Set(prev);
                        next.has(i) ? next.delete(i) : next.add(i);
                        return next;
                      })}
                      className="mt-1.5 text-[12px] font-semibold text-[var(--c-ink)] underline underline-offset-2 hover:text-[#c9a84c] transition-colors"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {r.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] px-3 py-1 rounded-full border tracking-[0.06em]
                                  ${activeTag === tag
                                    ? "border-[#c9a84c]/40 text-[#c9a84c]/70"
                                    : "border-[var(--c-rule)] text-[var(--c-ink-3)]"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

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
