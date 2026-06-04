"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import Price, { CurrencyNote } from "@/components/Price";
import { useLang } from "@/context/LangContext";
import type { Lang } from "@/lib/translations";
import { RATING_VALUE_STR, REVIEW_COUNT } from "@/lib/reviews";

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
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.97",
        "bestRating": "5",
        "worstRating": "1",
        "reviewCount": "9"
      },
      "review": [
        { "@type": "Review", "author": { "@type": "Person", "name": "Lily Wu" }, "datePublished": "2026-04", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "My family absolutely loved Mr. Wang, our driver. They couldn't stop gushing about how polite, helpful, and kind he was throughout the trip." },
        { "@type": "Review", "author": { "@type": "Person", "name": "Ikuko Ushio" }, "datePublished": "2026-03", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "Mr Du Kun was the best driver I've ever worked with. Hope to work with him as one team soon again." },
        { "@type": "Review", "author": { "@type": "Person", "name": "David Paul" }, "datePublished": "2025-04", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "Ryu san was a very nice driver. Well-dressed and polite, and drove very smoothly." },
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
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": RATING_VALUE_STR,
        "reviewCount": String(REVIEW_COUNT),
        "bestRating": "5",
        "worstRating": "1",
      },
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
  /* ── Add / edit Q&As below freely ── */
  {
    q: { en: "Do your drivers speak English?", ja: "乗務員は英語を話せますか？", zh: "司機會說英語嗎？" },
    a: { en: "Yes. All bookings are fully supported in English. Our drivers have working English for day-to-day communication. For complex conversations we use translation tools to assist.", ja: "はい。すべての予約は英語で対応しております。乗務員は日常会話程度の英語を使用できます。複雑なご要望の際は翻訳ツールを活用してサポートいたします。", zh: "是的。我們全程提供英文預訂支援。司機具備日常英語溝通能力，如有複雜需求，亦會借助翻譯工具協助。" },
  },
  {
    q: { en: "Do you operate 24/7?", ja: "24時間対応していますか？", zh: "是否24小時服務？" },
    a: { en: "Yes. We operate around the clock with no late-night or early-morning surcharge. All prices are the same regardless of departure time.", ja: "はい。24時間365日対応しており、深夜・早朝の割増料金は一切ございません。出発時間に関わらず料金は同一です。", zh: "是的。我們全年無休、24小時服務，深夜及清晨均無附加費用，價格不因時段而改變。" },
  },
  {
    q: { en: "Where exactly will the driver meet me?", ja: "空港でどこで待っていてもらえますか？", zh: "司機在機場哪裡等候？" },
    a: { en: "In the arrivals hall, after customs and baggage claim. Your chauffeur will be holding a name board with your name. Please do not exit the terminal before finding your driver.", ja: "到着ロビー（入国審査・手荷物受け取り後）にてお待ちしております。乗務員がお客様のお名前を掲げたネームプレートをお持ちしております。ドライバーを見つける前に建物の外へ出ないようご注意ください。", zh: "在到達大廳（通關及取行李後）等候。司機將手持寫有您姓名的接機牌。請在找到司機前勿離開航站樓。" },
  },
  {
    q: { en: "How long does it take from Narita Airport to Tokyo?", ja: "成田空港から東京市内まで何分かかりますか？", zh: "從成田機場到東京市區需要多久？" },
    a: { en: "Typically 50–70 minutes. Allow up to 90 minutes during peak hours or if there is an accident on the expressway.", ja: "通常50〜70分程度です。ラッシュアワー時や高速道路での事故発生時は、最大90分ほどお見込みください。", zh: "通常約50至70分鐘。尖峰時段或高速公路發生事故時，請預留最多90分鐘。" },
  },
  {
    q: { en: "How long does it take from Haneda Airport to Tokyo?", ja: "羽田空港から東京市内まで何分かかりますか？", zh: "從羽田機場到東京市區需要多久？" },
    a: { en: "Typically 30–45 minutes. Allow up to 60 minutes during heavy traffic.", ja: "通常30〜45分程度です。交通渋滞時は最大60分ほどお見込みください。", zh: "通常約30至45分鐘。交通繁忙時請預留最多60分鐘。" },
  },
  {
    q: { en: "How long will the driver wait after landing?", ja: "着陸後どのくらい待ってもらえますか？", zh: "落地後司機會等多久？" },
    a: { en: "90 minutes from your actual touchdown — free of charge. This covers customs, immigration, and baggage claim. Beyond 90 minutes for personal reasons: Alphard ¥2,500 / Hiace ¥3,000 per 30 minutes. Waiting caused by flight delays is always free.", ja: "実際の着陸時刻から90分間は無料でお待ちします。入国審査・手荷物受け取りに十分な時間です。個人的な理由で90分を超えた場合：アルファード ¥2,500・ハイエース ¥3,000（30分毎）。フライト遅延による超過は常に無料です。", zh: "實際落地後90分鐘免費等候，足以完成通關及取行李。若因個人原因超過90分鐘：埃爾法 ¥2,500・海獅 ¥3,000（每30分鐘）。因航班延誤所致的等候永遠免費。" },
  },
  {
    q: { en: "Should I exchange my JR Pass at the airport?", ja: "JRパスは空港で交換すべきですか？", zh: "我應該在機場兌換JR Pass嗎？" },
    a: { en: "We recommend exchanging at major Tokyo stations (Tokyo, Shinjuku, Shibuya) where queues are minimal. Airport counters can have 1–2 hour waits. Your driver can take you to a station counter after drop-off if needed.", ja: "東京・新宿・渋谷など都内の主要駅での交換をお勧めします。空港のカウンターは1〜2時間待ちになる場合があります。ご希望であれば、お送りの後に駅のカウンターへご案内することも可能です。", zh: "建議在東京、新宿、澀谷等主要車站兌換，等候時間極短。機場兌換窗口可能需排隊1至2小時。若有需要，司機可在送達後帶您前往車站窗口。" },
  },
  {
    q: { en: "Do you accommodate wheelchair users?", ja: "車椅子の方も利用できますか？", zh: "可以乘坐輪椅嗎？" },
    a: { en: "Yes. Please notify us at booking with the wheelchair type (foldable / electric / dimensions) so we can assign a suitable vehicle.", ja: "はい。ご予約の際に車椅子の種類（折りたたみ式・電動式・サイズ）をお知らせいただければ、適切な車両をご用意いたします。", zh: "可以。預訂時請告知輪椅類型（折疊式／電動式／尺寸），以便我們安排合適的車輛。" },
  },
  {
    q: { en: "What if I leave something in the car?", ja: "車内に忘れ物をした場合は？", zh: "如果在車上遺留物品怎麼辦？" },
    a: { en: "Contact us immediately at info@octoshell.jp. If the item is found, we will arrange return delivery. Shipping costs are at the client's expense.", ja: "速やかにinfo@octoshell.jpまでご連絡ください。お忘れ物が見つかり次第、ご返送の手配をいたします。送料はお客様のご負担となります。", zh: "請立即聯絡 info@octoshell.jp。若找到遺失物，我們將為您安排寄回。郵寄費用由客人承擔。" },
  },
  {
    q: { en: "Is tipping required?", ja: "チップは必要ですか？", zh: "需要給小費嗎？" },
    a: { en: "No. Tipping is not customary in Japan and is never expected by our chauffeurs. A kind word or an online review is the best way to show your appreciation.", ja: "不要です。チップは日本では一般的な慣習ではなく、乗務員が期待することもございません。温かいお言葉やオンラインレビューが最大の励みになります。", zh: "不需要。日本沒有給小費的習慣，我們的司機也從不期待。若您滿意服務，留下評價或一句好評是最好的回饋。" },
  },
];

const CMP_TITLE: Copy = { en: "PRIVATE TRANSFER vs. OTHER OPTIONS", ja: "プライベート送迎 vs. 他の交通手段", zh: "專車接送 vs. 其他交通方式" };
const CMP_ROWS: { feature: Copy; private: Copy; train: Copy; taxi: Copy; bus: Copy }[] = [
  {
    feature: { en: "Door-to-door service",        ja: "ドアツードアサービス",   zh: "門對門服務" },
    private: { en: "✓ Yes",                        ja: "✓ あり",               zh: "✓ 是" },
    train:   { en: "✗ Station only",               ja: "✗ 駅のみ",             zh: "✗ 僅限車站" },
    taxi:    { en: "✓ Yes",                        ja: "✓ あり",               zh: "✓ 是" },
    bus:     { en: "✗ Fixed stops",                ja: "✗ 固定停留所のみ",     zh: "✗ 固定站點" },
  },
  {
    feature: { en: "Fixed all-inclusive price",    ja: "定額・追加費用なし",    zh: "定額全包價格" },
    private: { en: "✓ Always",                     ja: "✓ 常に定額",           zh: "✓ 固定定額" },
    train:   { en: "✓ Fixed fare",                 ja: "✓ 定額",              zh: "✓ 定額" },
    taxi:    { en: "✗ Metered + tolls",            ja: "✗ メーター＋高速代",   zh: "✗ 計費+過路費" },
    bus:     { en: "✓ Fixed fare",                 ja: "✓ 定額",              zh: "✓ 定額" },
  },
  {
    feature: { en: "Luggage handling",             ja: "荷物サポート",          zh: "行李協助" },
    private: { en: "✓ Full assistance",            ja: "✓ 全面サポート",       zh: "✓ 全程協助" },
    train:   { en: "✗ Self-carry",                 ja: "✗ 自己搬送",           zh: "✗ 自行搬運" },
    taxi:    { en: "△ Limited",                    ja: "△ 限定的",             zh: "△ 有限協助" },
    bus:     { en: "✗ Self-carry",                 ja: "✗ 自己搬送",           zh: "✗ 自行搬運" },
  },
  {
    feature: { en: "Flight delay — no extra cost", ja: "フライト遅延・追加費用なし", zh: "航班延誤無額外費用" },
    private: { en: "✓ Free 90-min wait",           ja: "✓ 90分無料待機",       zh: "✓ 免費等候90分鐘" },
    train:   { en: "✓ Not affected",               ja: "✓ 影響なし",           zh: "✓ 不受影響" },
    taxi:    { en: "✗ Meter keeps running",        ja: "✗ メーターが進む",     zh: "✗ 計費持續" },
    bus:     { en: "✗ Fixed schedule",             ja: "✗ 時刻表どおり",       zh: "✗ 固定班次" },
  },
  {
    feature: { en: "Group / large luggage",        ja: "グループ・大型荷物",    zh: "團體/大型行李" },
    private: { en: "✓ Up to 9 pax",               ja: "✓ 最大9名",            zh: "✓ 最多9人" },
    train:   { en: "✗ Cramped",                    ja: "✗ 狭い",               zh: "✗ 空間有限" },
    taxi:    { en: "✗ Max 4 pax",                  ja: "✗ 最大4名",            zh: "✗ 最多4人" },
    bus:     { en: "△ Limited storage",            ja: "△ 荷物スペース限定",   zh: "△ 行李空間有限" },
  },
  {
    feature: { en: "Privacy",                      ja: "プライバシー",          zh: "私密性" },
    private: { en: "✓ Vehicle is yours only",      ja: "✓ 完全貸切",           zh: "✓ 專屬包車" },
    train:   { en: "✗ Public",                     ja: "✗ 公共交通",           zh: "✗ 公共交通" },
    taxi:    { en: "✓ Private",                    ja: "✓ プライベート",       zh: "✓ 私密" },
    bus:     { en: "✗ Shared with others",         ja: "✗ 相乗り",             zh: "✗ 與人共乘" },
  },
];
const CMP_HEADS: { key: "private" | "train" | "taxi" | "bus"; label: Copy }[] = [
  { key: "private", label: { en: "Octoshell Private", ja: "Octoshell 専車", zh: "Octoshell 專車" } },
  { key: "train",   label: { en: "Narita Express / Keikyu", ja: "成田エクスプレス / 京急", zh: "成田特快 / 京急" } },
  { key: "taxi",    label: { en: "Street Taxi", ja: "流しタクシー", zh: "街頭計程車" } },
  { key: "bus",     label: { en: "Limousine Bus", ja: "リムジンバス", zh: "利木津巴士" } },
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
          <p className="text-white/60 text-[11px] sm:text-[13px] tracking-[0.22em] uppercase mb-8">{HERO_SUB[lang]}</p>

          {/* Price badge */}
          <div className="inline-flex items-center gap-3 border border-[#c9a84c]/30 px-5 py-3 mb-8">
            <svg className="w-3.5 h-3.5 text-[#c9a84c]/70" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
            </svg>
            <span className="text-white/60 text-[11px] tracking-widest uppercase">{HERO_FROM[lang]}</span>
            <span className="text-[#c9a84c] text-[18px] sm:text-[22px] font-bold tracking-tight">
              <Price yen={20000} />
            </span>
            <span className="text-white/55 text-[10px] tracking-widest uppercase">
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
            <Link href="https://octoshell.jp" className="inline-flex items-center justify-center gap-2 text-white/55 text-[11px] tracking-[0.2em] uppercase hover:text-white transition-colors sm:ml-2">
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
              <p className="text-white/70 text-[13px] leading-[1.8]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ AI FACT PARAGRAPH ════════════════════════════════════════ */}
      <section className="bg-[#0c0c0c] py-12 sm:py-16 px-4 sm:px-6 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/55 text-[14px] sm:text-[15px] leading-[2] tracking-[0.02em]">
            {lang === "ja" ? (
              <>
                Octoshell（貝八方）は、東京市内と羽田空港（HND）・成田空港（NRT）を結ぶ定額制プライベート送迎サービスを提供しています。
                羽田空港〜東京市内の料金は<strong className="text-white">トヨタ・アルファード（最大4名）で¥20,000〜</strong>、<strong className="text-white">トヨタ・ハイエース（最大9名）で¥22,000〜</strong>です。
                成田空港〜東京市内はアルファード¥25,000〜、ハイエース¥28,000〜となります。
                すべての料金に<strong className="text-white">高速道路料金・駐車場料金・ミートアンドグリート・着陸後90分間の無料待機</strong>が含まれます。
                フライト番号によるリアルタイム追跡を実施しており、遅延時も追加費用なしで自動対応します。
                チャイルドシートは無料で提供可能。車内でのキャッシュ払い、クレジットカード払い（Stripe）に対応しています。
              </>
            ) : lang === "zh" ? (
              <>
                Octoshell（貝八方）提供東京市區往返羽田機場（HND）及成田機場（NRT）的定額私人接送服務。
                羽田機場至東京市區的費用為<strong className="text-white">豐田埃爾法（最多4人）¥20,000起</strong>，<strong className="text-white">豐田海獅（最多9人）¥22,000起</strong>。
                成田機場至東京市區為埃爾法¥25,000起，海獅¥28,000起。
                所有價格均包含<strong className="text-white">高速公路費、停車費、舉牌接機服務及落地後90分鐘免費等候</strong>。
                我們透過航班號碼進行即時追蹤，延誤時自動調整，無額外費用。
                兒童安全座椅免費提供，支持現金及信用卡（Stripe）付款。
              </>
            ) : (
              <>
                Octoshell Japan provides flat-rate private airport transfers between Tokyo city centre and Haneda Airport (HND) or Narita International Airport (NRT).{" "}
                Transfers from Haneda Airport to Tokyo start from <strong className="text-white">¥20,000 for a Toyota Alphard (up to 4 passengers and 4 suitcases)</strong> and{" "}
                <strong className="text-white">¥22,000 for a Toyota Hiace (up to 9 passengers)</strong>.{" "}
                From Narita Airport to Tokyo: Alphard from ¥25,000, Hiace from ¥28,000.{" "}
                All prices are all-inclusive — <strong className="text-white">highway tolls, airport parking, a personalised Meet &amp; Greet name-board service, and 90 minutes of free waiting time after landing</strong> are all included at no extra cost.{" "}
                Octoshell monitors every flight in real time using the passenger&apos;s flight number; if a flight is delayed, the chauffeur automatically adjusts at no additional charge.{" "}
                Child seats are available free of charge on request. Payment is accepted in cash inside the vehicle or by credit card via Stripe.
              </>
            )}
          </p>
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
                <p className="text-white/70 text-[13px] leading-[1.8]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMPARISON TABLE ══════════════════════════════════════════ */}
      <section className="bg-[var(--c-card)] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <GoldRule />
          <SectionLabel label={CMP_TITLE[lang]} />
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[600px] text-[12px] sm:text-[13px]">
              <thead>
                <tr>
                  <th className="pb-4 pr-4 text-left text-[var(--c-ink-3)] font-medium w-[32%]" />
                  {CMP_HEADS.map((h) => (
                    <th key={h.key} className={`pb-4 px-3 text-center font-bold tracking-[0.1em] ${h.key === "private" ? "text-[#c9a84c]" : "text-[var(--c-ink-3)]"}`}>
                      {h.label[lang]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CMP_ROWS.map((row, i) => (
                  <tr key={i} className="border-t border-[var(--c-rule)]">
                    <td className="py-3.5 pr-4 text-[var(--c-ink-2)] leading-snug">{row.feature[lang]}</td>
                    {CMP_HEADS.map((h) => (
                      <td key={h.key} className={`py-3.5 px-3 text-center leading-snug
                        ${h.key === "private" ? "text-[#c9a84c] font-semibold bg-[#c9a84c]/[0.04]" : "text-[var(--c-ink-3)]"}`}>
                        {row[h.key][lang]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
                <div className="h-[160px] sm:h-[180px] flex items-center justify-center px-6">
                  <Image src={i === 0 ? "/alphard.webp" : "/hiace.webp"} alt={v.name}
                    width={340} height={200} priority className="object-contain object-bottom w-full h-full p-2" />
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
          <p className="text-white/60 text-[13px] leading-relaxed mb-10">{CTA_SUB[lang]}</p>
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
