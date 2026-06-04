"use client";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/context/LangContext";
import type { Lang } from "@/lib/translations";

/* ══════════════════════════════════════════════════════════════════════
   JSON-LD
══════════════════════════════════════════════════════════════════════ */
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Car",
      "name": "Toyota Alphard",
      "brand": { "@type": "Brand", "name": "Toyota" },
      "vehicleSeatingCapacity": 6,
      "description": "Luxury MPV. Perfect for airport transfers, business travel and private sightseeing tours in Japan. Up to 6 passengers. Standard config: 4 passengers + 4 large suitcases. Dimensions: 4,945mm × 1,850mm × 1,895mm.",
      "offers": {
        "@type": "Offer",
        "price": "20000",
        "priceCurrency": "JPY",
        "availability": "https://schema.org/InStock",
        "url": "https://octoshell.jp/book",
      },
      "provider": { "@id": "https://octoshell.jp/#organization" },
    },
    {
      "@type": "Car",
      "name": "Toyota Hiace",
      "brand": { "@type": "Brand", "name": "Toyota" },
      "vehicleSeatingCapacity": 9,
      "description": "Premium Van. Ideal for families, small groups and corporate transportation. Up to 9 passengers and 15 large suitcases. Dimensions: 5,380mm × 1,880mm × 2,285mm.",
      "offers": {
        "@type": "Offer",
        "price": "22000",
        "priceCurrency": "JPY",
        "availability": "https://schema.org/InStock",
        "url": "https://octoshell.jp/book",
      },
      "provider": { "@id": "https://octoshell.jp/#organization" },
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════
   Content
══════════════════════════════════════════════════════════════════════ */
type Copy = Record<Lang, string>;

const HERO_BADGE: Copy = { en: "OUR FLEET", ja: "車種ラインナップ", zh: "車隊介紹" };
const HERO_H1: Copy    = { en: "Two Vehicles.\nEvery Trip Covered.", ja: "2車種で\nあらゆる旅に対応。", zh: "兩款車型\n覆蓋所有行程。" };
const HERO_SUB: Copy   = { en: "Toyota Alphard · Toyota Hiace — Licensed Green-Plate Fleet", ja: "トヨタ アルファード · トヨタ ハイエース — 合法緑ナンバー車両", zh: "豐田埃爾法 · 豐田海獅 — 合規綠牌車隊" };
const BOOK_BTN: Copy   = { en: "Book This Vehicle", ja: "この車両を予約", zh: "預訂此車" };

/* ── Comparison table ── */
const CMP_HEADS: Copy[] = [
  { en: "", ja: "", zh: "" },
  { en: "ALPHARD", ja: "アルファード", zh: "埃爾法" },
  { en: "HIACE", ja: "ハイエース", zh: "海獅" },
];
const CMP_ROWS: { label: Copy; a: Copy; h: Copy }[] = [
  {
    label: { en: "Max passengers", ja: "最大乗車人数", zh: "最多乘客" },
    a: { en: "6", ja: "6名", zh: "6人" },
    h: { en: "9", ja: "9名", zh: "9人" },
  },
  {
    label: { en: "Suitcases (4–6 pax)", ja: "スーツケース（4〜6名）", zh: "行李箱（4至6人）" },
    a: { en: "5 large", ja: "大型5個", zh: "5件大型" },
    h: { en: "9 large", ja: "大型9個", zh: "9件大型" },
  },
  {
    label: { en: "Suitcases (1–3 pax)", ja: "スーツケース（1〜3名）", zh: "行李箱（1至3人）" },
    a: { en: "up to 10 large", ja: "大型10個まで", zh: "最多10件大型" },
    h: { en: "up to 15 large", ja: "大型15個まで", zh: "最多15件大型" },
  },
  {
    label: { en: "Golf bags", ja: "ゴルフバッグ", zh: "高爾夫球袋" },
    a: { en: "2–3", ja: "2〜3本", zh: "2至3個" },
    h: { en: "4–6", ja: "4〜6本", zh: "4至6個" },
  },
  {
    label: { en: "Stroller / wheelchair", ja: "ベビーカー / 車椅子", zh: "嬰兒車 / 輪椅" },
    a: { en: "1 (folded)", ja: "1台（折畳）", zh: "1架（折疊）" },
    h: { en: "1–2", ja: "1〜2台", zh: "1至2架" },
  },
  {
    label: { en: "Child seat (ISOFIX)", ja: "チャイルドシート（ISOFIX）", zh: "兒童座椅（ISOFIX）" },
    a: { en: "Free on request", ja: "無料（要申請）", zh: "免費（需提前申請）" },
    h: { en: "Free on request", ja: "無料（要申請）", zh: "免費（需提前申請）" },
  },
  {
    label: { en: "Airport transfer from", ja: "空港送迎料金〜", zh: "機場接送起價" },
    a: { en: "¥20,000", ja: "¥20,000〜", zh: "¥20,000起" },
    h: { en: "¥22,000", ja: "¥22,000〜", zh: "¥22,000起" },
  },
];

/* ── Vehicle detail data ── */
type VehicleData = {
  id: string;
  name: string;
  badge: Copy;
  tagline: Copy;
  img: string;
  dims: { l: string; w: string; h: string };
  configs: { label: Copy; bags: Copy; note?: Copy }[];
  best_for: Copy[];
  book_slug: string;
};

const VEHICLES: VehicleData[] = [
  {
    id: "alphard",
    name: "Toyota Alphard",
    badge: { en: "Luxury MPV", ja: "ラグジュアリーMPV", zh: "豪華MPV" },
    tagline: {
      en: "Perfect for airport transfers, business travel and private sightseeing tours in Japan.",
      ja: "空港送迎、ビジネス出張、プライベート観光に最適です。",
      zh: "完美適用於機場接送、商務出行及日本私人觀光遊覽。",
    },
    img: "/images/alphard.webp",
    dims: { l: "4,945 mm", w: "1,850 mm", h: "1,895 mm" },
    configs: [
      {
        label: { en: "4–6 passengers", ja: "4〜6名", zh: "4至6人" },
        bags:  { en: "3 large suitcases + 5 carry-on", ja: "大型3個＋機内持込5個", zh: "3件大型＋5件隨身" },
      },
      {
        label: { en: "1–3 passengers", ja: "1〜3名", zh: "1至3人" },
        bags:  { en: "8 large suitcases + 3 carry-on", ja: "大型8個＋機内持込3個", zh: "8件大型＋3件隨身" },
      },
    ],
    best_for: [
      { en: "Airport transfers", ja: "空港送迎", zh: "機場接送" },
      { en: "VIP & corporate clients", ja: "VIP・法人のお客様", zh: "VIP及企業客戶" },
      { en: "Couples & small families", ja: "カップル・小家族", zh: "情侶及小家庭" },
      { en: "Luxury sightseeing", ja: "高級観光", zh: "豪華觀光" },
    ],
    book_slug: "alphard",
  },
  {
    id: "hiace",
    name: "Toyota Hiace",
    badge: { en: "Premium Van", ja: "プレミアムバン", zh: "優質廂型車" },
    tagline: {
      en: "Ideal for families, small groups and corporate transportation.",
      ja: "ファミリー、小グループ、法人輸送に最適です。",
      zh: "適合家庭出行、小型團體及企業接送。",
    },
    img: "/images/hiace.webp",
    dims: { l: "5,380 mm", w: "1,880 mm", h: "2,285 mm" },
    configs: [
      {
        label: { en: "5–9 passengers", ja: "5〜9名", zh: "5至9人" },
        bags:  { en: "8 large suitcases + 8 carry-on", ja: "大型8個＋機内持込8個", zh: "8件大型＋8件隨身" },
      },
      {
        label: { en: "3–5 passengers", ja: "3〜5名", zh: "3至5人" },
        bags:  { en: "12 large suitcases + 10 carry-on", ja: "大型12個＋機内持込10個", zh: "12件大型＋10件隨身" },
      },
    ],
    best_for: [
      { en: "Large groups & families", ja: "大家族・大人数グループ", zh: "大家庭及大型團體" },
      { en: "Golf & ski tours", ja: "ゴルフ・スキーツアー", zh: "高爾夫及滑雪之旅" },
      { en: "Hiking & outdoor trips", ja: "登山・アウトドア", zh: "登山及戶外活動" },
      { en: "Events & MICE", ja: "イベント・MICE", zh: "活動及會議" },
    ],
    book_slug: "hiace",
  },
];

/* ── FAQ ── */
const FAQS: { q: Copy; a: Copy }[] = [
  {
    q: { en: "Can I mix different luggage types — suitcases, golf bags, and a stroller?", ja: "スーツケース・ゴルフバッグ・ベビーカーなど、異なる荷物を一緒に積めますか？", zh: "可以混放行李箱、高爾夫球袋和嬰兒車嗎？" },
    a: { en: "Yes. Just tell us what you're bringing when you book. We'll confirm the vehicle can fit everything before confirming.", ja: "はい。ご予約時に持ち込む荷物をすべてお知らせください。すべて積載できる車両を確認した上で予約を確定いたします。", zh: "可以。預訂時請告訴我們您帶的所有物品，我們確認車輛可以容納後才會確認預訂。" },
  },
  {
    q: { en: "Which vehicle is right for my group?", ja: "どの車両が私のグループに合っていますか？", zh: "哪款車型適合我的團體？" },
    a: { en: "4 or fewer passengers with standard luggage → Alphard. 5 or more passengers, oversized bags, or golf/ski equipment → Hiace. Unsure? Tell us your group size and luggage and we'll recommend.", ja: "標準的な荷物で4名以下 → アルファード。5名以上、大型荷物、ゴルフ・スキー機材あり → ハイエース。迷われている場合は、グループ人数と荷物をお知らせください。", zh: "4人以下且行李標準 → 埃爾法。5人以上、或有超大行李、高爾夫/滑雪器材 → 海獅。不確定？告訴我們人數和行李，我們為您推薦。" },
  },
  {
    q: { en: "Are both vehicles non-smoking?", ja: "両車両とも禁煙ですか？", zh: "兩款車型都禁煙嗎？" },
    a: { en: "Yes. Both vehicles are strictly non-smoking, including e-cigarettes.", ja: "はい。電子タバコを含め、両車両とも完全禁煙です。", zh: "是的。兩款車型均嚴格禁煙，包括電子煙。" },
  },
];

/* ══════════════════════════════════════════════════════════════════════
   Sub-components
══════════════════════════════════════════════════════════════════════ */
function GoldRule() {
  return <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent mb-10 sm:mb-14" />;
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-6 h-px bg-[#c9a84c]" />
      <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] uppercase font-semibold">{label}</p>
    </div>
  );
}

function ImgPlaceholder({ note, ratio = "3/2" }: { note: string; ratio?: string }) {
  return (
    <div className={`relative bg-[#1a1a1a] border border-white/[0.07] flex flex-col items-center justify-center gap-3 overflow-hidden`}
      style={{ aspectRatio: ratio }}>
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#c9a84c]/40" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#c9a84c]/40" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#c9a84c]/40" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#c9a84c]/40" />
      <svg className="w-8 h-8 text-white/15" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
      </svg>
      <p className="text-white/20 text-[10px] tracking-widest uppercase text-center px-6 leading-relaxed">{note}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════════ */
export default function VehiclesPage() {
  const { lang } = useLang();

  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── HERO ── */}
      <div className="relative bg-[#0c0c0c] pt-[124px] sm:pt-[100px] pb-10 sm:pb-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Header />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] mb-2.5 uppercase">{HERO_BADGE[lang]}</p>
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.1em] leading-tight whitespace-pre-line">
            {HERO_H1[lang]}
          </h1>
          <p className="mt-2 text-white/35 text-[12px] tracking-[0.25em] uppercase">{HERO_SUB[lang]}</p>

          {/* Quick jump chips */}
          <div className="flex gap-3 mt-8 overflow-x-auto pb-1 scrollbar-hide">
            {VEHICLES.map((v) => (
              <a key={v.id} href={`#${v.id}`}
                className="shrink-0 text-[11px] tracking-[0.18em] uppercase text-white/45 border border-white/15
                           px-4 py-2 hover:text-[#c9a84c] hover:border-[#c9a84c]/40 transition-all">
                {v.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── VEHICLE CARDS ── */}
      <section className="bg-[var(--c-body)] py-14 sm:py-18 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <GoldRule />
          <SectionLabel label={lang === "ja" ? "車種一覧" : lang === "zh" ? "車型一覽" : "Quick Comparison"} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VEHICLES.map((v) => {
              const isAlphard = v.id === "alphard";
              const configs = isAlphard
                ? [
                    { pax: "1–3", seats: 3,  bags: 8,  carry: 3 },
                    { pax: "4–6", seats: 6,  bags: 3,  carry: 5 },
                  ]
                : [
                    { pax: "3–5", seats: 5,  bags: 12, carry: 10 },
                    { pax: "5–9", seats: 9,  bags: 8,  carry: 8  },
                  ];
              const iconCls = "opacity-80 invert dark:invert-0 dark:opacity-60";
              return (
                <div key={v.id} className="border border-[var(--c-rule)] hover:border-[#c9a84c]/30 transition-colors duration-300">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />

                  {/* Top: text left, image right */}
                  <div className="flex items-center gap-4 p-6 sm:p-8">
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--c-ink)] text-[17px] sm:text-[19px] font-light tracking-[0.08em]">{v.name}</p>
                      <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]/70 font-medium mt-0.5 mb-4">{v.badge[lang]}</p>
                      <p className="text-[var(--c-ink-2)] text-[13px] leading-[1.8]">{v.tagline[lang]}</p>
                    </div>
                    <div className="shrink-0 w-[140px] sm:w-[180px] h-[90px] sm:h-[110px] flex items-center justify-center">
                      <Image src={v.img} alt={v.name} width={240} height={140}
                        className="object-contain w-full h-full" />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[var(--c-rule)] mx-6 sm:mx-8" />

                  {/* Two-row icon configs */}
                  <div className="px-6 sm:px-8 py-4 space-y-3">
                    {configs.map((cfg) => (
                      <div key={cfg.pax} className="flex items-center gap-5">
                        {/* Pax label */}
                        <span className="text-[11px] tracking-[0.15em] text-[var(--c-ink-3)] w-10 shrink-0">{cfg.pax}</span>
                        {/* Seat */}
                        <div className="flex items-center gap-1.5">
                          <Image src="/icons/seat.png" alt="Seats" width={18} height={18} className={iconCls} />
                          <span className="text-[var(--c-ink)] text-[14px] font-semibold">{cfg.seats}</span>
                        </div>
                        {/* Suitcase */}
                        <div className="flex items-center gap-1.5">
                          <Image src="/icons/suitcase.png" alt="Suitcases" width={18} height={18} className={iconCls} />
                          <span className="text-[var(--c-ink)] text-[14px] font-semibold">{cfg.bags}</span>
                        </div>
                        {/* Carry-on */}
                        <div className="flex items-center gap-1.5">
                          <Image src="/icons/carry-on.png" alt="Carry-on" width={18} height={18} className={iconCls} />
                          <span className="text-[var(--c-ink)] text-[14px] font-semibold">{cfg.carry}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VEHICLE SECTIONS ── */}
      {VEHICLES.map((v, idx) => {
        const isEven = idx % 2 === 0;
        const bg = isEven ? "bg-[var(--c-card)]" : "bg-[var(--c-body)]";

        return (
          <section key={v.id} id={v.id} className={`scroll-mt-24 ${bg} py-16 sm:py-22 px-4 sm:px-6`}>
            <div className="max-w-5xl mx-auto">
              <GoldRule />

              {/* Title row */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
                <div>
                  <h2 className="text-[var(--c-ink)] text-2xl sm:text-3xl lg:text-[2rem] font-light tracking-[0.08em]">
                    {v.name}
                  </h2>
                  <p className="mt-1 text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]/70 font-medium">{v.badge[lang]}</p>
                  <p className="mt-4 text-[var(--c-ink-2)] text-[15px] leading-[1.8] max-w-xl">{v.tagline[lang]}</p>
                </div>
                <Link href="/book" draggable={false} onContextMenu={(e) => e.preventDefault()}
                  className="group shrink-0 inline-flex items-center gap-2.5 bg-[#c9a84c] text-[#0c0c0c]
                             text-[12px] font-black tracking-[0.3em] px-8 py-3.5 hover:bg-white
                             transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.35)]
                             active:scale-110 sm:active:scale-100">
                  {BOOK_BTN[lang]}
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Main vehicle image */}
              <div className="overflow-hidden mb-12 flex items-center justify-center h-[200px] sm:h-[260px] px-8">
                <Image src={v.img} alt={v.name} width={600} height={340}
                  className="object-contain w-full h-full" />
              </div>

              {/* Best for */}
              <div className="flex flex-wrap gap-2 mb-12">
                {v.best_for.map((tag) => (
                  <span key={tag.en} className="text-[11px] tracking-[0.15em] px-3 py-1.5 border border-[#c9a84c]/30 text-[#c9a84c]/80 uppercase">
                    {tag[lang]}
                  </span>
                ))}
              </div>

              {/* Two image columns: Dimensions + Luggage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">

                {/* Vehicle Dimensions */}
                <div>
                  <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase font-semibold mb-4">
                    {lang === "ja" ? "車両寸法" : lang === "zh" ? "車輛尺寸" : "Vehicle Dimensions"}
                  </p>
                  <ImgPlaceholder
                    note={`Diagram: top/side/front view with dimensions labelled. L ${v.dims.l} × W ${v.dims.w} × H ${v.dims.h}`}
                    ratio="4/3"
                  />
                  {/* Dimension specs below image */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {[
                      { k: lang === "ja" ? "全長" : lang === "zh" ? "全長" : "Length", v: v.dims.l },
                      { k: lang === "ja" ? "全幅" : lang === "zh" ? "全寬" : "Width",  v: v.dims.w },
                      { k: lang === "ja" ? "全高" : lang === "zh" ? "全高" : "Height", v: v.dims.h },
                    ].map((d) => (
                      <div key={d.k} className="border border-[var(--c-rule)] p-3 text-center">
                        <p className="text-[10px] text-[var(--c-ink-3)] tracking-widest uppercase mb-1">{d.k}</p>
                        <p className="text-[13px] font-semibold text-[var(--c-ink)] tracking-tight">{d.v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Luggage Capacity */}
                <div>
                  <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase font-semibold mb-4">
                    {lang === "ja" ? "荷物積載例" : lang === "zh" ? "行李容量示例" : "Luggage Capacity Examples"}
                  </p>
                  <ImgPlaceholder
                    note={`Infographic: two configs side by side. Config A (${v.configs[0].label.en}): ${v.configs[0].bags.en}. Config B (${v.configs[1].label.en}): ${v.configs[1].bags.en}.`}
                    ratio="4/3"
                  />
                  {/* Config cards below image */}
                  <div className="flex flex-col gap-3 mt-4">
                    {v.configs.map((cfg) => (
                      <div key={cfg.label.en} className="border border-[var(--c-rule)] p-3">
                        <p className="text-[11px] text-[var(--c-ink-3)] tracking-[0.15em] uppercase mb-1">{cfg.label[lang]}</p>
                        <p className="text-[14px] font-bold text-[#c9a84c]">{cfg.bags[lang]}</p>
                        {cfg.note && <p className="text-[11px] text-[var(--c-ink-3)] mt-0.5">{cfg.note[lang]}</p>}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ── FAQ ── */}
      <section className="bg-[#0c0c0c] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <GoldRule />
          <SectionLabel label={lang === "ja" ? "よくある質問" : lang === "zh" ? "常見問題" : "FAQ"} />
          <div>
            {FAQS.map((faq, i) => (
              <details key={i} className="group border-b border-white/[0.07] py-5 cursor-pointer">
                <summary className="flex items-start justify-between gap-4 list-none select-none">
                  <span className="text-white/80 text-[14px] sm:text-[15px] leading-snug group-open:text-white transition-colors">
                    <span className="text-[#c9a84c]/50 text-[11px] tracking-widest mr-3 font-mono">{String(i + 1).padStart(2, "0")}</span>
                    {faq.q[lang]}
                  </span>
                  <svg className="w-4 h-4 shrink-0 text-white/30 mt-0.5 transition-transform duration-200 group-open:rotate-180"
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <p className="mt-4 text-white/50 text-[13px] sm:text-[14px] leading-[1.85] pl-9">{faq.a[lang]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#0a0a0a] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mb-10" />
          <h2 className="text-white text-xl sm:text-2xl font-light tracking-[0.1em] mb-8">
            {lang === "ja" ? "ご予約・お見積もり" : lang === "zh" ? "立即預訂" : "Ready to Book?"}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book" draggable={false} onContextMenu={(e) => e.preventDefault()}
              className="group inline-flex items-center gap-2.5 bg-[#c9a84c] text-[#0c0c0c]
                         text-[12px] font-black tracking-[0.3em] px-10 py-4 hover:bg-white
                         transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.35)]
                         active:scale-110 sm:active:scale-100">
              {lang === "ja" ? "今すぐ予約" : lang === "zh" ? "立即預訂" : "Book Your Vehicle"}
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href="/services" className="text-white/35 text-[11px] tracking-[0.2em] uppercase hover:text-white/60 transition-colors">
              {lang === "ja" ? "サービス一覧へ" : lang === "zh" ? "查看所有服務" : "View All Services"}
            </Link>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent mt-10" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
