"use client";
import { useState } from "react";
import ProtectedImage from "@/components/ProtectedImage";
import { useLang } from "@/context/LangContext";
import { useTheme } from "@/context/ThemeContext";
import { REVIEWS, RATING_VALUE_STR } from "@/lib/reviews";

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
  ko: {
    section:      "고객 리뷰",
    badge:        "최고 평점 서비스",
    verified:     (n: number) => `${n}개의 인증된 리뷰`,
    overall:      "전체 평점",
    showMore:     "더 보기",
    showLess:     "접기",
    clear:        "초기화",
  },
  "zh-cn": {
    section:      "客户评价",
    badge:        "顶级服务",
    verified:     (n: number) => `${n} 条已验证评价`,
    overall:      "综合评分",
    showMore:     "显示更多",
    showLess:     "收起",
    clear:        "清除",
  },
  th: {
    section:      "รีวิวจากลูกค้า",
    badge:        "บริการระดับดีเยี่ยม",
    verified:     (n: number) => `${n} รีวิวที่ยืนยันแล้ว`,
    overall:      "คะแนนรวม",
    showMore:     "แสดงเพิ่มเติม",
    showLess:     "ย่อลง",
    clear:        "ล้าง",
  },
  fr: {
    section:      "Avis clients",
    badge:        "Service haut de gamme",
    verified:     (n: number) => `${n} avis vérifiés`,
    overall:      "Note générale",
    showMore:     "Voir plus",
    showLess:     "Réduire",
    clear:        "Effacer",
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
  ko: {
    title: "리뷰 안내",
    p1: "인증된 고객의 리뷰는 일본에서 적합한 프라이빗 쇼퍼 서비스를 선택하는 데 도움을 줍니다. 기본적으로 최신순으로 정렬됩니다.",
    p2: "예약이 확인·완료된 Octoshell 고객에게만 리뷰 작성 초대가 발송됩니다. 모든 리뷰는 예약 기록과 대조하여 진위를 검증합니다.",
    p3: "「최고 평점 서비스」 배지를 받으려면 최소 5개의 인증된 리뷰가 필요합니다. 평점은 모든 인증된 예약의 평균값으로 산출되며 지속적으로 업데이트됩니다.",
  },
  "zh-cn": {
    title: "评价说明",
    p1: "已验证客户的评价有助于旅行者在日本选择合适的私人司机服务。评价默认按最新日期排序。",
    p2: "仅完成确认订单的 Octoshell 客户才会收到评价邀请，所有评价均与预订记录核实，以确保真实性。",
    p3: "获得「顶级服务」标章需至少 5 条已验证评价。评分为所有已验证预订的平均值，并持续更新。",
  },
  th: {
    title: "วิธีการทำงานของรีวิว",
    p1: "รีวิวจากลูกค้าที่ยืนยันแล้วช่วยให้นักเดินทางเลือกบริการรถส่วนตัวพร้อมคนขับที่เหมาะสมสำหรับการเดินทางในญี่ปุ่น โดยค่าเริ่มต้นรีวิวจะเรียงตามวันที่ล่าสุด",
    p2: "เฉพาะลูกค้าที่ยืนยันและเสร็จสิ้นการจองกับ Octoshell เท่านั้นที่จะได้รับคำเชิญให้เขียนรีวิว ทุกรีวิวได้รับการตรวจสอบกับบันทึกการจองเพื่อรับรองความถูกต้อง",
    p3: "เหรียญ Top Rated Service ต้องมีรีวิวที่ยืนยันแล้วอย่างน้อย 5 รายการ คะแนนคำนวณจากค่าเฉลี่ยของการจองที่ยืนยันแล้วทั้งหมด และอัปเดตอย่างต่อเนื่อง",
  },
  fr: {
    title: "Fonctionnement des avis",
    p1: "Les avis de clients vérifiés aident les voyageurs à choisir le bon service de chauffeur privé pour leur séjour au Japon. Par défaut, les avis sont triés par date de publication.",
    p2: "Seuls les clients ayant effectué une réservation confirmée et complétée chez Octoshell sont invités à laisser un avis. Toutes les soumissions sont vérifiées par rapport aux dossiers de réservation pour garantir leur authenticité.",
    p3: "Le badge Top Rated Service requiert un minimum de 5 avis vérifiés. Les notes sont calculées comme une moyenne de toutes les réservations vérifiées et sont mises à jour en continu.",
  },
};

/* ── Icons ─────────────────────────────────────────────────────────── */
const IconCleanliness = () => (
  <ProtectedImage src="/icon-spray.svg" alt="" width={32} height={32} className="dark:invert"
    draggable={false} onContextMenu={(e) => e.preventDefault()} />
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
  { label: { en: "Cleanliness",     ja: "清潔さ",       zh: "整潔度",   ko: "청결도",   "zh-cn": "整洁度",   th: "ความสะอาด",     fr: "Propreté"        }, score: 5.0, Icon: IconCleanliness },
  { label: { en: "Punctuality",     ja: "時間厳守",     zh: "準時率",   ko: "정시성",   "zh-cn": "准时率",   th: "ตรงต่อเวลา",    fr: "Ponctualité"     }, score: 5.0, Icon: IconPunctuality },
  { label: { en: "Hospitality",     ja: "おもてなし",   zh: "服務態度", ko: "서비스",   "zh-cn": "服务态度", th: "การต้อนรับ",     fr: "Hospitalité"     }, score: 4.9, Icon: IconHospitality },
  { label: { en: "Driving Comfort", ja: "乗り心地",     zh: "乘坐舒適", ko: "승차감",   "zh-cn": "乘坐舒适", th: "ความสะดวกสบาย", fr: "Confort de conduite" }, score: 4.9, Icon: IconDriving     },
  { label: { en: "Value",           ja: "価格",         zh: "性價比",   ko: "가성비",   "zh-cn": "性价比",   th: "คุ้มค่า",       fr: "Rapport qualité/prix" }, score: 4.8, Icon: IconValue       },
];

/* ── Service type lookup (matches /services page IDs) ───────────────── */
const SERVICE_TYPES: Record<string, Record<string, string>> = {
  airport:     { en: "Airport Transfer",    ja: "空港送迎",          zh: "機場接送",   "zh-cn": "机场接送",   th: "รับส่งสนามบิน",       fr: "Transfert aéroport"   },
  hourly:      { en: "By the Hour",         ja: "時間制貸切",        zh: "時段包車",   "zh-cn": "按时包车",   th: "เช่าเหมาพร้อมคนขับ",  fr: "Location à l'heure"   },
  oneway:      { en: "One Way",             ja: "片道送迎",          zh: "單程穿梭",   "zh-cn": "单程接送",   th: "เที่ยวเดียว",          fr: "Trajet simple"        },
  photo:       { en: "Photo Tour",          ja: "旅拍",              zh: "旅拍接送",   "zh-cn": "旅拍接送",   th: "ทัวร์ถ่ายภาพ",        fr: "Tour photo"           },
  events:      { en: "Events & MICE",       ja: "MICE",              zh: "頂級盛會",   "zh-cn": "顶级盛会",   th: "งานอีเวนต์และ MICE",   fr: "Événements & MICE"    },
  sightseeing: { en: "Bespoke Sightseeing", ja: "テーラーメイド観光", zh: "定制觀光",  "zh-cn": "定制观光",   th: "ทัวร์ชมสถานที่",       fr: "Circuit touristique"  },
  golf:        { en: "Golf Transfer",       ja: "ゴルフ送迎",        zh: "高爾夫接送", "zh-cn": "高尔夫接送", th: "รับส่งกอล์ฟ",          fr: "Transfert golf"       },
  outdoor:     { en: "Outdoor",             ja: "アウトドア送迎",    zh: "戶外接送",   "zh-cn": "户外接送",   th: "กิจกรรมกลางแจ้ง",     fr: "Plein air"            },
  ceremony:    { en: "Ceremonial",          ja: "冠婚葬祭",          zh: "典禮接送",   "zh-cn": "典礼接送",   th: "งานพิธี",              fr: "Cérémonie"            },
  port:        { en: "Port Transfer",       ja: "港湾送迎",          zh: "港口接送",   "zh-cn": "港口接送",   th: "รับส่งท่าเรือ",        fr: "Transfert port"       },
};

const MONTH: Record<string, Record<string, string>> = {
  "01": { en: "Jan", ja: "1月",  zh: "1月",  "zh-cn": "1月",  th: "ม.ค.",  fr: "Jan" },
  "02": { en: "Feb", ja: "2月",  zh: "2月",  "zh-cn": "2月",  th: "ก.พ.",  fr: "Fév" },
  "03": { en: "Mar", ja: "3月",  zh: "3月",  "zh-cn": "3月",  th: "มี.ค.", fr: "Mar" },
  "04": { en: "Apr", ja: "4月",  zh: "4月",  "zh-cn": "4月",  th: "เม.ย.", fr: "Avr" },
  "05": { en: "May", ja: "5月",  zh: "5月",  "zh-cn": "5月",  th: "พ.ค.",  fr: "Mai" },
  "06": { en: "Jun", ja: "6月",  zh: "6月",  "zh-cn": "6月",  th: "มิ.ย.", fr: "Juin" },
  "07": { en: "Jul", ja: "7月",  zh: "7月",  "zh-cn": "7月",  th: "ก.ค.",  fr: "Juil" },
  "08": { en: "Aug", ja: "8月",  zh: "8月",  "zh-cn": "8月",  th: "ส.ค.",  fr: "Août" },
  "09": { en: "Sep", ja: "9月",  zh: "9月",  "zh-cn": "9月",  th: "ก.ย.",  fr: "Sep" },
  "10": { en: "Oct", ja: "10月", zh: "10月", "zh-cn": "10月", th: "ต.ค.",  fr: "Oct" },
  "11": { en: "Nov", ja: "11月", zh: "11月", "zh-cn": "11月", th: "พ.ย.",  fr: "Nov" },
  "12": { en: "Dec", ja: "12月", zh: "12月", "zh-cn": "12月", th: "ธ.ค.",  fr: "Déc" },
};

function fmtDate(iso: string, lang: string): string {
  const [y, m] = iso.split("-");
  const mo = MONTH[m]?.[lang] ?? m;
  return lang === "en" ? `${mo} ${y}` : `${y}年${mo}`;
}

const ALL_TAGS = ["Well-dressed", "Polite", "Smooth Ride", "Courteous", "Cooperative", "Wonderful"];

/* Auto-computed from REVIEWS — no manual update needed */
const STAR_DIST = [5, 4, 3, 2, 1].map((stars) => ({
  stars,
  count: REVIEWS.filter((r) => (r.rating ?? 5) === stars).length,
}));

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
  const { theme } = useTheme();
  const barFill5  = theme === "dark" ? "#ffffff" : "#c9a84c";
  const barFillLo = theme === "dark" ? "rgba(255,255,255,0.35)" : "rgba(201,168,76,0.35)";
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expanded,  setExpanded]  = useState<Set<number>>(new Set());
  const [howOpen,   setHowOpen]   = useState(false);

  const total    = REVIEWS.length;
  const sorted   = [...REVIEWS].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
  const base     = showViewAll ? sorted.slice(0, 6) : sorted;
  const filtered = activeTag ? base.filter((r) => r.tags.includes(activeTag)) : base;
  const hw       = HOW_CONTENT[lang];
  const ui       = UI[lang];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--c-body)]">
      <div className="max-w-5xl mx-auto flex flex-col items-center">

        {/* ── Score header ── */}
        <p className="text-[10px] tracking-[0.4em] text-[#c9a84c] uppercase mb-6">{ui.section}</p>
        <div className="flex flex-col items-center gap-2 mb-10">
          <div className="flex items-center gap-0">
            <ProtectedImage src="/laurel-left.png"  alt="" width={103} height={140} className="object-contain opacity-90 dark:opacity-70 pointer-events-none select-none w-[70px] h-[100px] sm:w-[103px] sm:h-[140px]" aria-hidden draggable={false} />
            <span style={{ letterSpacing: -2, fontWeight: 500, lineHeight: 1 }} className="text-[80px] sm:text-[100px] text-[#222222] dark:text-[#c9a84c]">{RATING_VALUE_STR}</span>
            <ProtectedImage src="/laurel-right.png" alt="" width={103} height={140} className="object-contain opacity-90 dark:opacity-70 pointer-events-none select-none w-[70px] h-[100px] sm:w-[103px] sm:h-[140px]" aria-hidden draggable={false} />
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
                    <div style={{ width: 91, height: 4, borderRadius: 2, background: theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          borderRadius: 2,
                          width: total ? `${(count / total) * 100}%` : "0%",
                          background: stars === 5 ? barFill5 : barFillLo,
                        }}
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
                color: active ? "#c9a84c" : "var(--c-ink)",
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
        <div className="w-full border-t border-[var(--c-rule)]">
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 sm:overflow-x-visible scrollbar-hide">
          {filtered.map((r, i) => {
            const isExpanded = expanded.has(i);
            const LIMIT      = 160;
            return (
              <div key={i} className="shrink-0 w-[85vw] sm:w-auto flex flex-col gap-4 py-8 px-4 sm:px-6 border-r border-[var(--c-rule)] last:border-r-0 sm:border-r-0 sm:border-b sm:border-[var(--c-rule)]">

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

                {/* Stars · date · travelType · route */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Stars />
                  <span className="text-[var(--c-rule)] text-xs">·</span>
                  <span style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", color: "var(--c-ink-3)" }}>{fmtDate(r.dateISO, lang)}</span>
                  {r.travelType && <><span className="text-[var(--c-rule)]">·</span><span style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", color: "var(--c-ink-3)" }}>{(r.travelType as Record<string,string>)[lang]}</span></>}
                  {"trip" in r && r.trip && <><span className="text-[var(--c-rule)]">·</span><span style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", color: "var(--c-ink-3)" }}>{r.trip as string}</span></>}
                </div>

                {/* Service badges */}
                <div className="flex flex-wrap gap-1.5">
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
