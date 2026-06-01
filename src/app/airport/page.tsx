"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import Price, { CurrencyNote } from "@/components/Price";
import { useLang } from "@/context/LangContext";
import type { Lang } from "@/lib/translations";

/* ══════════════════════════════════════════════════════════════════════
   JSON-LD — Service + FAQPage + LocalBusiness
══════════════════════════════════════════════════════════════════════ */
const SCHEMA_SERVICE = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://octoshell.jp/#organization",
      "name": "Octoshell Co., Ltd.",
      "alternateName": "貝八方",
      "url": "https://octoshell.jp",
      "telephone": "+81-47-382-5728",
      "email": "info@octoshell.jp",
      "priceRange": "¥¥¥",
      "address": { "@type": "PostalAddress", "addressCountry": "JP", "addressRegion": "Tokyo" },
      "areaServed": [
        { "@type": "City", "name": "Tokyo" },
        { "@type": "Airport", "name": "Haneda Airport", "iataCode": "HND" },
        { "@type": "Airport", "name": "Narita International Airport", "iataCode": "NRT" },
      ],
    },
    {
      "@type": "Service",
      "name": "Tokyo Airport Transfer — Private Chauffeur",
      "description": "Flat-rate private airport transfers between Tokyo city centre and Haneda (HND) or Narita (NRT) airports. Includes real-time flight tracking, 90 minutes of free waiting time after landing, and a personalised Meet & Greet name-board service at the arrivals hall.",
      "url": "https://tokyoairporttransfer.com",
      "serviceType": "Airport Chauffeur Transfer",
      "provider": { "@id": "https://octoshell.jp/#organization" },
      "areaServed": "Tokyo, Kanagawa, Japan",
      "offers": [
        { "@type": "Offer", "name": "Haneda Airport ↔ Tokyo (Alphard)", "price": "20000", "priceCurrency": "JPY", "availability": "https://schema.org/InStock", "url": "https://tokyoairporttransfer.com" },
        { "@type": "Offer", "name": "Narita Airport ↔ Tokyo (Alphard)", "price": "25000", "priceCurrency": "JPY", "availability": "https://schema.org/InStock", "url": "https://tokyoairporttransfer.com" },
        { "@type": "Offer", "name": "Haneda Airport ↔ Tokyo (Hiace)", "price": "22000", "priceCurrency": "JPY", "availability": "https://schema.org/InStock", "url": "https://tokyoairporttransfer.com" },
        { "@type": "Offer", "name": "Narita Airport ↔ Tokyo (Hiace)", "price": "28000", "priceCurrency": "JPY", "availability": "https://schema.org/InStock", "url": "https://tokyoairporttransfer.com" },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How much is a private transfer from Haneda Airport to Tokyo city?", "acceptedAnswer": { "@type": "Answer", "text": "A flat-rate private transfer from Haneda Airport (HND) to Tokyo city centre starts from ¥20,000 for a Toyota Alphard (up to 4 passengers and 4 suitcases), and ¥22,000 for a Toyota Hiace (up to 9 passengers). All prices are all-inclusive — highway tolls and parking fees are never added on top." } },
        { "@type": "Question", "name": "How much is a private transfer from Narita Airport to Tokyo?", "acceptedAnswer": { "@type": "Answer", "text": "A flat-rate private transfer from Narita International Airport (NRT) to Tokyo city centre starts from ¥25,000 for a Toyota Alphard (up to 4 passengers), and ¥28,000 for a Toyota Hiace (up to 9 passengers). Price is all-inclusive with no hidden charges." } },
        { "@type": "Question", "name": "What happens if my flight is delayed?", "acceptedAnswer": { "@type": "Answer", "text": "Octoshell monitors your flight in real time using your flight number. Your chauffeur automatically adjusts to your actual landing time at no extra cost. 90 minutes of free waiting time is included after landing. If waiting exceeds 90 minutes, a surcharge of ¥2,500 per 30 minutes applies for Alphard, or ¥3,000 per 30 minutes for Hiace." } },
        { "@type": "Question", "name": "Is Meet & Greet included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Your chauffeur will be waiting in the arrivals hall holding a personalised name board with your name on it. This Meet & Greet service is 100% complimentary — there is no extra charge." } },
        { "@type": "Question", "name": "Are highway tolls and parking fees included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All prices are strictly all-inclusive (包干価格 in Japanese). Highway tolls, expressway fees, and airport parking are all included in the quoted price. No surprise charges." } },
        { "@type": "Question", "name": "How many passengers and suitcases can the car accommodate?", "acceptedAnswer": { "@type": "Answer", "text": "The Toyota Alphard accommodates up to 4 passengers and 4 large suitcases. The Toyota Hiace accommodates up to 9 passengers and 6+ suitcases. Please mention your luggage count when booking." } },
        { "@type": "Question", "name": "Can I pay cash in the car?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Cash payment inside the vehicle is accepted. You can also pre-register a credit card for automatic billing via Stripe after your trip. Corporate clients may request bank transfer." } },
        { "@type": "Question", "name": "Is a child seat available?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Child and junior safety seats are provided free of charge. Please request when booking so availability can be confirmed in advance." } },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════
   Content
══════════════════════════════════════════════════════════════════════ */

type Copy = Record<Lang, string>;

const HERO_BADGE: Copy     = { en: "TOKYO AIRPORT TRANSFER", ja: "東京空港送迎サービス", zh: "東京機場接送服務" };
const HERO_H1: Copy        = { en: "Private Airport Transfer\nin Tokyo", ja: "東京プライベート\n空港送迎", zh: "東京專屬\n機場接送" };
const HERO_SUB: Copy       = { en: "Haneda · Narita — Flat Rate — Flight Tracked", ja: "羽田 · 成田 — 定額制 — フライト追跡", zh: "羽田 · 成田 — 定額制 — 即時航班追蹤" };
const HERO_FROM: Copy      = { en: "All-inclusive from", ja: "全込み料金", zh: "全包價格起" };
const HERO_CTA: Copy       = { en: "Book Your Transfer", ja: "今すぐ予約", zh: "立即預訂" };

const TRUST: Record<Lang, { icon: string; title: string; body: string }[]> = {
  en: [
    { icon: "✈", title: "Real-Time Flight Tracking", body: "We monitor your flight live. If you land late, your chauffeur adjusts automatically — no calls needed, no extra cost." },
    { icon: "⏱", title: "90 Min Free Waiting", body: "90 minutes of complimentary waiting time after landing. Take your time through customs and baggage claim." },
    { icon: "🪧", title: "Meet & Greet Included", body: "Your chauffeur stands in the arrivals hall with a personalised name board. Luggage assistance provided." },
  ],
  ja: [
    { icon: "✈", title: "リアルタイムフライト追跡", body: "フライトをリアルタイムで追跡。遅延があっても自動で調整—電話不要、追加費用なし。" },
    { icon: "⏱", title: "着陸後90分間の無料待機", body: "着陸後90分間の無料待機。入国審査・手荷物受け取りをゆっくりお済ませください。" },
    { icon: "🪧", title: "ミートアンドグリート込み", body: "到着ロビーでお名前プレートを掲げてお出迎え。お荷物のお手伝いも無料。" },
  ],
  zh: [
    { icon: "✈", title: "即時航班追蹤", body: "我們即時監控您的航班動態。航班延誤時，司機自動調整，無需您致電，亦無額外費用。" },
    { icon: "⏱", title: "落地後90分鐘免費等候", body: "提供90分鐘免費等候時間，讓您從容過海關、取行李，毫無壓力。" },
    { icon: "🪧", title: "接機舉牌服務（免費）", body: "司機在到達大廳手持您的專屬姓名牌迎候，並提供行李搬運協助，完全免費。" },
  ],
};

const PRICES_TITLE: Copy = { en: "FLAT-RATE PRICES", ja: "定額料金", zh: "定額價格" };
const PRICES_SUB: Copy   = { en: "All prices include highway tolls · parking · Meet & Greet · 90-min free wait", ja: "高速道路料金・駐車場・ミートアンドグリート・90分無料待機込み", zh: "含高速費・停車費・舉牌接機・90分鐘免費等候" };

const ROUTES: { key: string; label: Copy; alphard: number; hiace: number }[] = [
  { key: "haneda", label: { en: "Haneda Airport (HND) ↔ Tokyo", ja: "羽田空港 ↔ 東京市内", zh: "羽田機場 ↔ 東京市區" }, alphard: 20000, hiace: 22000 },
  { key: "narita", label: { en: "Narita Airport (NRT) ↔ Tokyo", ja: "成田空港 ↔ 東京市内", zh: "成田機場 ↔ 東京市區" }, alphard: 25000, hiace: 28000 },
];

const HOW_TITLE: Copy = { en: "HOW IT WORKS", ja: "ご利用の流れ", zh: "預訂流程" };
const HOW_STEPS: Record<Lang, { num: string; title: string; body: string }[]> = {
  en: [
    { num: "01", title: "Book Online", body: "Fill in your flight number, pickup point, and passenger details. Takes under 2 minutes." },
    { num: "02", title: "We Track Your Flight", body: "Our system monitors your flight in real time. Your chauffeur knows your actual landing time." },
    { num: "03", title: "Relax & Be Met", body: "Your suited chauffeur stands in arrivals with your name board. Luggage is handled. Journey begins." },
  ],
  ja: [
    { num: "01", title: "オンライン予約", body: "フライト番号・乗車場所・人数を入力するだけ。2分で完了します。" },
    { num: "02", title: "フライト追跡", body: "システムがリアルタイムでフライトを追跡。乗務員は実際の着陸時刻を把握しています。" },
    { num: "03", title: "到着・お出迎え", body: "スーツ姿の乗務員が到着ロビーでお出迎え。お荷物もお任せください。" },
  ],
  zh: [
    { num: "01", title: "線上預訂", body: "填寫航班號碼、接載地點與乘客人數，兩分鐘內完成預訂。" },
    { num: "02", title: "即時追蹤航班", body: "我們的系統即時追蹤您的航班，司機隨時掌握您的實際落地時間。" },
    { num: "03", title: "抵達・迎賓接機", body: "著正裝的司機手持您的姓名牌在出口迎候，並協助搬運行李，開啟您的旅程。" },
  ],
};

const INCL_TITLE: Copy = { en: "WHAT'S INCLUDED", ja: "料金に含まれるもの", zh: "包含項目" };
const INCL: Record<Lang, string[]> = {
  en: ["Highway & expressway tolls", "Airport parking fees", "Personalised Meet & Greet name board", "90 minutes of free waiting after landing", "Luggage assistance", "Child/junior safety seat (on request)", "In-car USB charging cables (iPhone & Android)", "Complimentary bottled water"],
  ja: ["高速道路・有料道路料金", "空港駐車場料金", "お名前プレートでのミートアンドグリート", "着陸後90分間の無料待機", "お荷物のサポート", "チャイルドシート（ご要望時）", "車内USB充電ケーブル（iPhone・Android）", "ミネラルウォーターサービス"],
  zh: ["高速公路及收費道路費用", "機場停車費", "個人化舉牌接機服務", "落地後90分鐘免費等候", "行李搬運協助", "兒童安全座椅（需提前申請）", "車內USB充電線（蘋果及安卓）", "免費瓶裝礦泉水"],
};

const VEH_TITLE: Copy = { en: "AVAILABLE VEHICLES", ja: "ご用意している車種", zh: "可用車型" };
const VEH: Record<Lang, { name: string; cap: string; bag: string; body: string }[]> = {
  en: [
    { name: "Toyota Alphard", cap: "Up to 4 passengers", bag: "4 large suitcases", body: "Japan's most prestigious executive minivan. Spacious, whisper-quiet cabin with premium leather seating. The choice for VIPs and couples." },
    { name: "Toyota Hiace", cap: "Up to 9 passengers", bag: "6+ large suitcases", body: "Generous space for groups and families travelling with oversized luggage, golf bags, or strollers. Never sacrifice comfort for capacity." },
  ],
  ja: [
    { name: "トヨタ アルファード", cap: "最大4名様", bag: "大型スーツケース4個", body: "日本最高峰のプレミアムミニバン。上質なレザーシートと静粛な車内空間。VIPやカップルの方に最適です。" },
    { name: "トヨタ ハイエース", cap: "最大9名様", bag: "大型スーツケース6個以上", body: "大人数グループや大型荷物・ゴルフバッグ・ベビーカーをお持ちのファミリーに最適。快適性と積載量を両立します。" },
  ],
  zh: [
    { name: "豐田埃爾法", cap: "最多4名乘客", bag: "4件大型行李箱", body: "日本最頂級的商務廂型車，寬敞靜謐的車廂與高級皮革座椅，是VIP貴賓與情侶出行的首選。" },
    { name: "豐田海獅", cap: "最多9名乘客", bag: "6件以上大型行李箱", body: "為攜帶超大行李、高爾夫球具或嬰兒車的家庭與團體量身打造，絕不因容量犧牲舒適度。" },
  ],
};

const FAQ_TITLE: Copy = { en: "FREQUENTLY ASKED QUESTIONS", ja: "よくあるご質問", zh: "常見問題" };
const FAQS: { q: Copy; a: Copy }[] = [
  {
    q: { en: "How much is a transfer from Haneda Airport to Tokyo?", ja: "羽田空港から東京市内への料金はいくらですか？", zh: "羽田機場到東京市區的費用是多少？" },
    a: { en: "A flat-rate private transfer from Haneda Airport (HND) to Tokyo city centre starts from ¥20,000 for a Toyota Alphard (up to 4 passengers) and ¥22,000 for a Toyota Hiace (up to 9 passengers). All prices are all-inclusive — highway tolls and parking are never added.", ja: "羽田空港（HND）から東京市内への定額送迎は、アルファード（最大4名）が¥20,000〜、ハイエース（最大9名）が¥22,000〜です。高速道路料金・駐車場料金はすべて込みの総額です。", zh: "羽田機場（HND）往東京市區的定額包車，豐田埃爾法（最多4人）起價¥20,000，豐田海獅（最多9人）起價¥22,000。所有費用均已包含高速公路費及停車費。" },
  },
  {
    q: { en: "How much is a transfer from Narita Airport to Tokyo?", ja: "成田空港から東京市内への料金はいくらですか？", zh: "成田機場到東京市區的費用是多少？" },
    a: { en: "From Narita International Airport (NRT) to Tokyo city centre: Toyota Alphard from ¥25,000 (up to 4 passengers), Toyota Hiace from ¥28,000 (up to 9 passengers). All-inclusive — no hidden charges.", ja: "成田空港（NRT）から東京市内：アルファード（最大4名）¥25,000〜、ハイエース（最大9名）¥28,000〜。すべて込みの料金で追加請求はありません。", zh: "成田機場（NRT）往東京市區：豐田埃爾法（最多4人）¥25,000起，豐田海獅（最多9人）¥28,000起。全包定額，無任何隱藏費用。" },
  },
  {
    q: { en: "What if my flight is delayed?", ja: "フライトが遅延した場合はどうなりますか？", zh: "航班延誤怎麼辦？" },
    a: { en: "We track your flight in real time using your flight number. If you land late, your chauffeur automatically adjusts — no calls needed and no extra cost. 90 minutes of free waiting are included from your actual landing time. Beyond 90 minutes, a surcharge of ¥2,500 per 30 min (Alphard) or ¥3,000 per 30 min (Hiace) applies.", ja: "フライト番号でリアルタイム追跡しています。遅延があっても自動で調整—お電話不要・追加費用なし。着陸後90分間の無料待機込みです。90分を超えた場合は30分毎にアルファード¥2,500、ハイエース¥3,000の超過料金が発生します。", zh: "我們透過您的航班號碼進行即時追蹤。延誤時司機自動調整，無需您致電，也無額外費用。落地後90分鐘免費等候。超過90分鐘後，每30分鐘加收埃爾法¥2,500、海獅¥3,000。" },
  },
  {
    q: { en: "Is Meet & Greet at the arrivals hall included?", ja: "到着ロビーでのミートアンドグリートは含まれていますか？", zh: "到達大廳舉牌接機服務是否包含？" },
    a: { en: "Yes, it is 100% complimentary. Your chauffeur will be standing in the arrivals hall with a personalised name board bearing your name. Luggage assistance is also included at no extra charge.", ja: "はい、完全無料です。乗務員がお客様のお名前を掲げて到着ロビーでお待ちしております。お荷物のサポートも無料でご提供します。", zh: "是的，完全免費。司機將手持寫有您姓名的專屬名牌，在出口大廳等候。行李搬運協助亦免費提供。" },
  },
  {
    q: { en: "Are highway tolls and parking fees included?", ja: "高速道路料金・駐車場料金は含まれますか？", zh: "高速公路費及停車費是否包含？" },
    a: { en: "Yes. Our prices are strictly all-inclusive. All highway tolls, expressway fees, and airport parking charges required for your scheduled route are fully included. No surprises.", ja: "はい。弊社の料金はすべて込みの総額（包干価格）です。ご予約いただいたルートに必要な高速道路料金・有料道路料金・駐車場料金はすべて含まれています。", zh: "是的。我們的報價採全包制。您預定行程所需的所有高速公路費、收費道路費及停車費均已包含，絕無額外收費。" },
  },
  {
    q: { en: "How many passengers and suitcases fit?", ja: "何名・スーツケース何個まで乗れますか？", zh: "最多能乘坐幾人，可放幾件行李？" },
    a: { en: "Toyota Alphard: up to 4 passengers and 4 large suitcases. Toyota Hiace: up to 9 passengers and 6+ large suitcases. Please include your luggage count in the booking form.", ja: "アルファード：最大4名・大型スーツケース4個。ハイエース：最大9名・大型スーツケース6個以上。予約フォームに荷物の数もご記入ください。", zh: "豐田埃爾法：最多4人，4件大型行李箱。豐田海獅：最多9人，6件以上大型行李箱。請在預訂表格中填寫行李數量。" },
  },
  {
    q: { en: "Can I pay cash inside the car?", ja: "車内で現金払いはできますか？", zh: "可以在車內現金付款嗎？" },
    a: { en: "Yes. Cash payment inside the vehicle is accepted. You can also register a credit card before your trip for automatic billing via Stripe. Corporate clients may request a bank transfer.", ja: "はい、対応しています。クレジットカードをご登録いただければ、運行後にStripeで自動決済も可能です。法人のお客様は事前振込も承ります。", zh: "可以。支持車內現金結帳。亦可提前綁定信用卡，行程結束後透過Stripe自動扣款。企業客戶可申請銀行轉帳。" },
  },
];

const CTA_TITLE: Copy = { en: "Ready to Book Your Transfer?", ja: "送迎をご予約ください", zh: "準備好預訂您的接送了嗎？" };
const CTA_SUB: Copy   = { en: "Instant quote · No credit card required to enquire · Reply within 2 hours", ja: "即時見積 · お問合せはクレジットカード不要 · 2時間以内にご返信", zh: "即時報價 · 詢問無需信用卡 · 2小時內回覆" };
const CTA_BTN: Copy   = { en: "Book Now", ja: "今すぐ予約", zh: "立即預訂" };

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

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0 text-[#c9a84c] mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════════ */
export default function AirportPage() {
  const { lang } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#0c0c0c]">

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_SERVICE) }} />

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <div className="relative bg-[#0c0c0c] pt-[124px] sm:pt-[100px] pb-12 sm:pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }} />

        <Header />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-[#c9a84c] text-[9px] sm:text-[11px] tracking-[0.45em] mb-3 uppercase">{HERO_BADGE[lang]}</p>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.08em] leading-tight whitespace-pre-line mb-4">
            {HERO_H1[lang]}
          </h1>
          <p className="text-white/40 text-[11px] sm:text-[13px] tracking-[0.22em] uppercase mb-8">{HERO_SUB[lang]}</p>

          {/* Price badge */}
          <div className="inline-flex items-center gap-3 border border-[#c9a84c]/30 px-5 py-3 mb-8">
            <svg className="w-3.5 h-3.5 text-[#c9a84c]/70" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
            </svg>
            <span className="text-white/40 text-[11px] tracking-widest uppercase">{HERO_FROM[lang]}</span>
            <span className="text-[#c9a84c] text-[18px] sm:text-[22px] font-bold tracking-tight">
              <Price yen={20000} />
            </span>
            <span className="text-white/20 text-[10px] tracking-widest uppercase">
              {lang === "ja" ? "全込み" : lang === "zh" ? "全包" : "All-incl."}
            </span>
          </div>
          <CurrencyNote lang={lang} />

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link href="/book" draggable={false} onContextMenu={(e) => e.preventDefault()}
              className="group inline-flex items-center justify-center gap-2.5
                         bg-[#c9a84c] text-[#0c0c0c] text-[12px] sm:text-[13px] tracking-[0.3em] font-black
                         px-10 py-4 hover:bg-white transition-all duration-200
                         shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_4px_28px_rgba(201,168,76,0.5)]
                         active:scale-110 sm:active:scale-100">
              {HERO_CTA[lang]}
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href="https://octoshell.jp" className="inline-flex items-center justify-center gap-2 text-white/30 text-[11px] tracking-[0.2em] uppercase hover:text-white/60 transition-colors sm:ml-2">
              octoshell.jp →
            </Link>
          </div>
        </div>
      </div>

      {/* ══ TRUST STRIP ═══════════════════════════════════════════════ */}
      <section className="bg-[#111111] py-10 sm:py-14 px-4 sm:px-6 border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {TRUST[lang].map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-white text-[14px] font-semibold tracking-[0.06em]">{item.title}</p>
              <p className="text-white/45 text-[13px] leading-[1.8]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PRICES ════════════════════════════════════════════════════ */}
      <section className="bg-[var(--c-body)] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <GoldRule />
          <SectionLabel label={PRICES_TITLE[lang]} />
          <p className="text-[var(--c-ink-2)] text-[13px] leading-relaxed mb-10 max-w-xl">{PRICES_SUB[lang]}</p>

          {/* Price table */}
          <div className="border border-[var(--c-rule)] overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-[var(--c-card)] border-b border-[var(--c-rule)]">
              <div className="py-3 px-4 sm:px-6" />
              <div className="py-3 px-4 sm:px-6 border-l border-[var(--c-rule)] text-center">
                <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--c-ink)]">ALPHARD</p>
                <p className="text-[10px] text-[var(--c-ink-3)] tracking-wider mt-0.5">max 4 pax</p>
              </div>
              <div className="py-3 px-4 sm:px-6 border-l border-[var(--c-rule)] text-center">
                <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--c-ink)]">HIACE</p>
                <p className="text-[10px] text-[var(--c-ink-3)] tracking-wider mt-0.5">max 9 pax</p>
              </div>
            </div>
            {ROUTES.map((route, i) => (
              <div key={route.key} className={`grid grid-cols-3 ${i < ROUTES.length - 1 ? "border-b border-[var(--c-rule)]" : ""}`}>
                <div className="py-4 sm:py-5 px-4 sm:px-6 flex items-center">
                  <p className="text-[var(--c-ink)] text-[13px] sm:text-[14px] font-medium leading-snug">{route.label[lang]}</p>
                </div>
                <div className="py-4 sm:py-5 px-4 sm:px-6 border-l border-[var(--c-rule)] flex items-center justify-center">
                  <p className="text-[#c9a84c] text-[16px] sm:text-[18px] font-bold tracking-tight"><Price yen={route.alphard} /></p>
                </div>
                <div className="py-4 sm:py-5 px-4 sm:px-6 border-l border-[var(--c-rule)] flex items-center justify-center">
                  <p className="text-[var(--c-ink)] text-[16px] sm:text-[18px] font-bold tracking-tight"><Price yen={route.hiace} /></p>
                </div>
              </div>
            ))}
          </div>
          <CurrencyNote lang={lang} />

          <div className="mt-8 text-center">
            <Link href="/book" draggable={false} onContextMenu={(e) => e.preventDefault()}
              className="group inline-flex items-center gap-2.5 bg-[#c9a84c] text-[#0c0c0c]
                         text-[12px] font-black tracking-[0.3em] px-10 py-4
                         hover:bg-[var(--c-ink)] hover:text-white transition-all duration-200
                         shadow-[0_4px_20px_rgba(201,168,76,0.35)]">
              {HERO_CTA[lang]}
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════════════ */}
      <section className="bg-[#0c0c0c] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <GoldRule />
          <SectionLabel label={HOW_TITLE[lang]} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {HOW_STEPS[lang].map((step) => (
              <div key={step.num} className="flex flex-col gap-4">
                <p className="text-[56px] font-bold text-[#c9a84c]/15 leading-none font-mono tracking-tight">{step.num}</p>
                <p className="text-white text-[15px] font-semibold tracking-[0.05em]">{step.title}</p>
                <p className="text-white/45 text-[13px] leading-[1.8]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT'S INCLUDED ═══════════════════════════════════════════ */}
      <section className="bg-[var(--c-card)] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <GoldRule />
          <SectionLabel label={INCL_TITLE[lang]} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INCL[lang].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-[var(--c-ink-2)] text-[14px] leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VEHICLES ══════════════════════════════════════════════════ */}
      <section className="bg-[var(--c-body)] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <GoldRule />
          <SectionLabel label={VEH_TITLE[lang]} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VEH[lang].map((v, i) => (
              <div key={v.name} className="border border-[var(--c-rule)] overflow-hidden group hover:border-[#c9a84c]/30 transition-colors duration-300">
                <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
                <div className="bg-white h-[160px] sm:h-[180px] flex items-center justify-center px-6">
                  <Image src={i === 0 ? "/images/alphard.png" : "/images/hiace.png"} alt={v.name}
                    width={340} height={200} className="object-contain mix-blend-multiply w-full h-full p-2" />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[var(--c-ink)] text-[15px] font-semibold tracking-[0.08em] mb-1">{v.name}</p>
                  <div className="flex gap-3 mb-3">
                    <span className="text-[11px] text-[#c9a84c] border border-[#c9a84c]/30 px-2 py-0.5">{v.cap}</span>
                    <span className="text-[11px] text-[var(--c-ink-3)] border border-[var(--c-rule)] px-2 py-0.5">{v.bag}</span>
                  </div>
                  <p className="text-[var(--c-ink-2)] text-[13px] leading-[1.75]">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ════════════════════════════════════════════════════════ */}
      <section className="bg-[#0c0c0c] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <GoldRule />
          <SectionLabel label={FAQ_TITLE[lang]} />
          <div>
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-white/[0.07]">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 py-5 text-left group">
                  <span className="text-white/80 text-[14px] sm:text-[15px] leading-snug tracking-[0.02em] group-hover:text-white transition-colors">
                    <span className="text-[#c9a84c]/50 text-[11px] tracking-widest mr-3 font-mono">{String(i + 1).padStart(2, "0")}</span>
                    {faq.q[lang]}
                  </span>
                  <svg className={`w-4 h-4 shrink-0 text-white/30 mt-0.5 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {openFaq === i && (
                  <p className="pb-6 text-white/50 text-[13px] sm:text-[14px] leading-[1.85] pl-9">{faq.a[lang]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ═════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mb-12" />
          <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] uppercase mb-4">
            {lang === "ja" ? "ご予約・お問い合わせ" : lang === "zh" ? "預訂與查詢" : "Book & Enquire"}
          </p>
          <h2 className="text-white text-2xl sm:text-3xl font-light tracking-[0.1em] mb-4">{CTA_TITLE[lang]}</h2>
          <p className="text-white/35 text-[13px] leading-relaxed mb-10">{CTA_SUB[lang]}</p>
          <Link href="/book" draggable={false} onContextMenu={(e) => e.preventDefault()}
            className="group inline-flex items-center gap-2.5 bg-[#c9a84c] text-[#0c0c0c]
                       text-[13px] font-black tracking-[0.3em] px-12 py-4
                       hover:bg-white transition-all duration-200
                       shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_4px_28px_rgba(201,168,76,0.5)]
                       active:scale-110 sm:active:scale-100">
            {CTA_BTN[lang]}
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent mt-12" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
