"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/context/LangContext";
import type { Lang } from "@/lib/translations";

/* ── Vehicle images ─────────────────────────────────────────────────── */
const ALPHARD_IMG = "https://octoshell.jp/wp-content/uploads/2024/09/toyotaalphard.png";
const HIACE_IMG   = "https://octoshell.jp/wp-content/uploads/2024/09/toyatahiace.png";

/* ══════════════════════════════════════════════════════════════════════
   Trilingual content
══════════════════════════════════════════════════════════════════════ */

/* ── Page hero ──────────────────────────────────────────────────────── */
const HERO: Record<Lang, { badge: string; title: string; sub: string; link_story: string; link_faq: string }> = {
  ja: { badge: "会社情報", title: "Octoshellについて", sub: "日本プライベートチャウファーサービス", link_story: "ブランドストーリー", link_faq: "よくある質問" },
  en: { badge: "About Us", title: "The Octoshell Story", sub: "Japan Private Chauffeur Service", link_story: "How It Works", link_faq: "FAQ" },
  zh: { badge: "關於我們", title: "品牌故事", sub: "日本專屬司機服務", link_story: "品牌故事", link_faq: "常見問題" },
};

/* ── Brand story ────────────────────────────────────────────────────── */
const STORY: Record<Lang, { sectionBadge: string; title: string; p1: string; p2: string; imgNote: string }> = {
  ja: {
    sectionBadge: "ブランドストーリー",
    title: "移動の常識を変える",
    p1: "貝八方（Octoshell）は日本・東京を拠点に、ラグジュアリーなプライベート送迎サービスとして誕生しました。創業の想いはシンプルです。「移動そのものを、旅の一部にしたい」——ただそれだけです。",
    p2: "始まりは、名門の高級温泉旅館とのご縁でした。その宿が大切にする、余白のある時間、静かで丁寧なもてなし——私たちはその哲学を、車内という空間に再現しようと決意しました。今日、Octoshellのチャウファーは単なるドライバーではありません。あなたの旅を静かに、確実に支える存在です。",
    imgNote: "推奨写真：黒いアルファードのリアドアを開ける、白手袋の正装チャウファー。東京の景色または伝統的な門を背景に。ゴールデンアワー、シネマティックな浅い被写界深度。縦位置（3:4）、最小720×960px。",
  },
  en: {
    sectionBadge: "Our Story",
    title: "Changing the Way You Travel",
    p1: "Octoshell was founded in Tokyo, Japan, with a simple but powerful belief: the journey itself should be as extraordinary as the destination. Born from a passion for elevated hospitality, we set out to redefine what private transportation could be.",
    p2: "What started as a refined vision rooted in Japan's finest ryokan culture — where every detail is considered, every moment unhurried — has grown into Tokyo's most trusted luxury chauffeur service. Our chauffeurs are not merely drivers; they are the quiet guardians of your journey.",
    imgNote: "Suggested photo: Chauffeur in formal dark suit & white gloves, opening the rear door of a black Alphard. Golden hour light. Tokyo skyline or a traditional gate in the background. Cinematic shallow depth of field. Portrait orientation (3:4 ratio), min 720 × 960 px.",
  },
  zh: {
    sectionBadge: "品牌故事",
    title: "顛覆傳統出行的遊戲規則",
    p1: "貝八方（Octoshell）於日本東京創立，懷抱一個簡單卻深遠的信念：旅途本身，應該與目的地一樣令人難忘。我們從對極致款待的熱忱出發，重新定義私人接送服務的可能性。",
    p2: "誕生之初，這只是一個源自日本頂級旅館文化的精緻願景——每一個細節都用心考量，每一刻都從容不迫。如今，Octoshell 已成為東京最值得信賴的豪華司機服務。我們的司機不僅是駕駛，更是您旅途中默默守護的存在。",
    imgNote: "建議圖片：穿著正式深色西裝、戴白手套的司機，正在為黑色 Alphard 打開後車門。黃金時刻光線。背景為東京天際線或傳統鳥居。電影感淺景深。縱向（3:4比例），最小 720×960px。",
  },
};

/* ── How It Works — 4 steps ─────────────────────────────────────────── */
type Step = { num: string; title: string; body: string };
const STEPS: Record<Lang, Step[]> = {
  ja: [
    { num: "01", title: "ご予約", body: "ウェブフォームで簡単お申し込み。ルート・日時・人数をご入力いただくだけで、担当者が迅速にお見積りをご提案します。" },
    { num: "02", title: "確認・調整", body: "担当者がお客様と直接ご連絡を取り、旅程の詳細を確認・最終調整します。特別なご要望もお気軽にどうぞ。" },
    { num: "03", title: "当日のお迎え", body: "指定の場所・時刻にチャウファーがお迎えします。空港でのサインボードでのお出迎えも可能。ゆったりとお乗りください。" },
    { num: "04", title: "安心のアフターケア", body: "ご乗車後もフィードバックを受け付けています。次回の旅もより良いものにするために、常にサービスを改善しています。" },
  ],
  en: [
    { num: "01", title: "Book Online", body: "Submit your request via our booking form in minutes. Enter your route, date, and passenger count — we respond with a personalised quote swiftly." },
    { num: "02", title: "Confirm & Customise", body: "Our team contacts you directly to review your itinerary and finalise every detail. Special requests? Simply let us know — we are here to make it happen." },
    { num: "03", title: "Meet Your Chauffeur", body: "On the day, your uniformed chauffeur arrives at your specified location, on time, every time. Name-board greetings available at all major airports." },
    { num: "04", title: "Journey & Beyond", body: "Your comfort is our priority throughout. After the ride, we welcome feedback and continuously refine our service so every trip is better than the last." },
  ],
  zh: [
    { num: "01", title: "線上預訂", body: "透過預訂表單快速提交需求，填寫路線、日期和人數，我們將迅速為您提供個人化報價。" },
    { num: "02", title: "確認與客製化", body: "我們的團隊會直接與您聯繫，確認行程細節並完成最終安排。有任何特殊需求，請隨時告知，我們竭誠為您實現。" },
    { num: "03", title: "司機接送", body: "當天，您的專屬司機將準時出現在指定地點，著整齊制服，於各大機場提供舉牌接機服務。" },
    { num: "04", title: "旅途全程守護", body: "全程以您的舒適為優先。旅程結束後歡迎您的回饋，我們持續優化服務，讓每一次出行都更加美好。" },
  ],
};

/* ── Vehicles ───────────────────────────────────────────────────────── */
type Vehicle = { name: string; tag: string; cap: string; bags: string; desc: string };
const VEHICLES: Record<Lang, Vehicle[]> = {
  ja: [
    { name: "アルファードクラス", tag: "ALPHARD", cap: "最大6名", bags: "スーツケース6個まで", desc: "VIPおよびファミリー旅行に最適。広々とした静粛な室内と最上のリクライニングシートで、日本の旅を最高の形でお楽しみください。" },
    { name: "ハイエースクラス",   tag: "HiACE",   cap: "最大9名", bags: "スーツケース9個まで", desc: "グループ・法人のご移動に。大人数・大荷物にも余裕で対応するキャビンと、快適な乗り心地をご提供します。" },
  ],
  en: [
    { name: "Alphard Class", tag: "ALPHARD", cap: "Up to 6 passengers", bags: "Up to 6 suitcases", desc: "The choice of VIPs and discerning families. An expansive, whisper-quiet cabin with premium reclining seats — the finest way to experience Japan." },
    { name: "HiAce Class",   tag: "HiACE",   cap: "Up to 9 passengers", bags: "Up to 9 suitcases", desc: "Ideal for groups and corporate travel. Generous capacity for both passengers and luggage, combined with a smooth and supremely comfortable ride." },
  ],
  zh: [
    { name: "Alphard 車型", tag: "ALPHARD", cap: "最多6名乘客", bags: "最多6件行李", desc: "VIP 及精緻家庭旅行的首選。寬敞靜謐的車廂與豪華可調座椅，以最優雅的方式體驗日本之旅。" },
    { name: "HiAce 車型",   tag: "HiACE",   cap: "最多9名乘客", bags: "最多9件行李", desc: "最適合團體及商務出行。充裕的乘客與行李空間，配合順暢舒適的駕乘體驗，讓大型旅行無憂無慮。" },
  ],
};

/* ── FAQ ────────────────────────────────────────────────────────────── */
type FaqItem  = { q: string; a: string };
type FaqGroup = { group: string; items: FaqItem[] };
const FAQ: Record<Lang, FaqGroup[]> = {
  ja: [
    {
      group: "ご予約・料金",
      items: [
        { q: "どのように予約できますか？", a: "ウェブサイトの予約フォームからお申し込みいただけます。ご入力後、担当者より24時間以内にご連絡いたします。" },
        { q: "料金はどのように決まりますか？", a: "距離・車種・ご利用時間をもとに算出します。高速道路料金・駐車場代はすべて含まれます。追加費用は発生しません。" },
        { q: "キャンセルポリシーはどうなっていますか？", a: "ご乗車72時間前まではキャンセル無料です。それ以降はキャンセル料が発生する場合があります。詳細はお問い合わせください。" },
        { q: "支払い方法を教えてください。", a: "現金・クレジットカード・銀行振込に対応しています。お支払いは乗車日またはご請求書にて承ります。" },
      ],
    },
    {
      group: "当日のサービス",
      items: [
        { q: "空港でのお迎えはどのように行われますか？", a: "チャウファーがお客様のお名前を記載したサインボードをお持ちして、到着ロビーにてお待ちしております。フライトが遅れた場合も、リアルタイムで追跡し自動で調整します。着陸後90分間の無料待機時間が含まれます。" },
        { q: "チャイルドシートは利用できますか？", a: "はい。ご予約の際にベビーシートオプションをご選択ください。事前のご連絡が必要です。" },
        { q: "英語でのコミュニケーションは可能ですか？", a: "はい。当社のチャウファーは英語でのコミュニケーションに対応しております。中国語（広東語・普通話）対応のドライバーもご相談ください。" },
        { q: "乗車中の飲食は可能ですか？", a: "ソフトドリンクの持ち込みは歓迎します。強い臭いを発する飲食物はお控えいただくようお願いしています。" },
      ],
    },
    {
      group: "車両・荷物",
      items: [
        { q: "車内は清潔で安全ですか？", a: "すべての車両は乗車前に徹底的に清掃・点検を実施しています。最高の環境をご提供できるよう、常に万全の状態を保っています。" },
      ],
    },
  ],
  en: [
    {
      group: "Booking & Pricing",
      items: [
        { q: "How do I make a booking?", a: "Simply fill in our online booking form. A member of our team will respond within 24 hours with a personalised quote and confirmation." },
        { q: "How is the price calculated?", a: "Pricing is based on distance, vehicle type, and duration. All highway tolls and parking fees are included — no hidden charges, ever." },
        { q: "What is your cancellation policy?", a: "Cancellations made 72 hours or more before the trip are free of charge. For cancellations within 72 hours, a fee may apply. Please contact us for full details." },
        { q: "What payment methods do you accept?", a: "We accept cash, major credit cards, and bank transfer. Payment can be made on the day of the trip or via invoice." },
      ],
    },
    {
      group: "On the Day",
      items: [
        { q: "How does airport pick-up work?", a: "Your chauffeur will be waiting in the arrivals hall with a personalised name board. We monitor all flights in real time — if your flight is delayed, your chauffeur adjusts automatically. 90 minutes of free waiting time is included after landing." },
        { q: "Can I request a baby seat?", a: "Yes. Please select the Baby Seat option when booking, or let us know in advance and we will arrange it for you." },
        { q: "Can I communicate with the driver in English?", a: "Absolutely. All our chauffeurs are comfortable communicating in English. Mandarin and Cantonese-speaking drivers are also available upon request." },
        { q: "Can I eat or drink in the vehicle?", a: "Soft drinks and light snacks are welcome. We kindly ask that you avoid foods with strong odours to keep the cabin fresh for all passengers." },
      ],
    },
    {
      group: "Vehicles & Luggage",
      items: [
        { q: "Are the vehicles clean and well-maintained?", a: "Every vehicle is thoroughly cleaned and inspected before each trip. We maintain the highest standards of cleanliness and safety so you always step into a pristine cabin." },
      ],
    },
  ],
  zh: [
    {
      group: "預訂與費用",
      items: [
        { q: "如何進行預訂？", a: "只需填寫線上預訂表單，我們的團隊將在24小時內回覆您，提供個人化報價及確認資訊。" },
        { q: "費用是如何計算的？", a: "費用根據距離、車型及使用時間計算，已包含所有高速公路過路費及停車費，絕無任何隱藏收費。" },
        { q: "取消政策是什麼？", a: "在出發72小時前取消可免費退款。72小時內取消可能會產生取消費用，詳情請與我們聯繫。" },
        { q: "接受哪些付款方式？", a: "我們接受現金、主要信用卡及銀行轉帳，可於出行當天付款或透過發票付款。" },
      ],
    },
    {
      group: "當天服務",
      items: [
        { q: "機場接送是如何運作的？", a: "您的專屬司機將在抵達大廳舉牌等候。我們會即時監控所有航班——若您的航班延誤，司機將自動調整。降落後包含90分鐘免費等候時間。" },
        { q: "可以要求嬰兒座椅嗎？", a: "可以。請在預訂時選擇嬰兒座椅選項，或提前通知我們，我們將為您安排。" },
        { q: "可以用中文與司機溝通嗎？", a: "當然可以。我們備有普通話及廣東話司機，請在預訂時提出需求，我們將盡力安排。" },
        { q: "車內可以飲食嗎？", a: "歡迎攜帶軟性飲料及輕食。請避免氣味濃烈的食物，以保持車廂環境整潔舒適。" },
      ],
    },
    {
      group: "車輛與行李",
      items: [
        { q: "車輛是否乾淨且定期保養？", a: "每輛車在每次出行前都會進行徹底清潔和檢查，我們嚴格維持最高的清潔及安全標準，讓您每次踏入車廂都煥然一新。" },
      ],
    },
  ],
};

/* ── Section label ──────────────────────────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <span className="w-5 h-px bg-[#c9a84c]" />
      <p className="text-[#c9a84c] text-[10px] sm:text-[11px] tracking-[0.45em] uppercase font-semibold">{label}</p>
    </div>
  );
}

/* ── FAQ accordion item ─────────────────────────────────────────────── */
function FaqRow({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  return (
    <div className={`border-b border-white/[0.07] transition-colors duration-200 ${open ? "border-[#c9a84c]/20" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-4 sm:py-5 text-left group"
      >
        <span className={`text-[12px] sm:text-[13px] tracking-[0.06em] leading-relaxed transition-colors duration-200 ${open ? "text-white" : "text-white/65 group-hover:text-white/90"}`}>
          {item.q}
        </span>
        <span className={`shrink-0 w-5 h-5 flex items-center justify-center rounded-full border transition-all duration-200 mt-0.5
          ${open ? "border-[#c9a84c]/60 text-[#c9a84c]" : "border-white/20 text-white/30 group-hover:border-white/40"}`}>
          <svg className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-[12px] sm:text-[13px] text-white/50 leading-relaxed tracking-[0.03em] pr-8">
          {item.a}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const { lang } = useLang();
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggle = (key: string) => setOpenKey(prev => (prev === key ? null : key));

  return (
    <main className="min-h-screen bg-[#0c0c0c]">

      {/* ── Compact hero ───────────────────────────────────────────── */}
      <div className="relative bg-[#0c0c0c] pt-[82px] sm:pt-24 pb-8 sm:pb-12 overflow-hidden">
        {/* subtle grid texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* radial glow top-right */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }} />

        <Header />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[#c9a84c] text-[9px] tracking-[0.45em] mb-2 uppercase">{HERO[lang].badge}</p>
          <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.12em] sm:tracking-[0.16em] leading-tight">
            {HERO[lang].title}
          </h1>
          <p className="mt-1.5 text-white/35 text-[10px] tracking-[0.28em] uppercase">{HERO[lang].sub}</p>

          {/* anchor links */}
          <div className="flex items-center gap-6 mt-6 sm:mt-7">
            <Link href="#story"
              className="flex items-center gap-2 text-white/45 text-[10px] tracking-[0.22em] uppercase hover:text-[#c9a84c] transition-colors">
              <span className="w-3.5 h-px bg-current" />
              {HERO[lang].link_story}
            </Link>
            <Link href="#faq"
              className="flex items-center gap-2 text-white/45 text-[10px] tracking-[0.22em] uppercase hover:text-[#c9a84c] transition-colors">
              <span className="w-3.5 h-px bg-current" />
              {HERO[lang].link_faq}
            </Link>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* ── STORY section ─────────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section id="story" className="scroll-mt-20 bg-[#111111] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          <SectionLabel label={STORY[lang].sectionBadge} />

          {/* Story text + image placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16 items-start">

            {/* Text */}
            <div>
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.08em] leading-snug mb-6 sm:mb-8">
                {STORY[lang].title}
              </h2>
              <p className="text-white/60 text-[13px] sm:text-[14px] leading-[1.9] tracking-[0.04em] mb-5">
                {STORY[lang].p1}
              </p>
              <p className="text-white/60 text-[13px] sm:text-[14px] leading-[1.9] tracking-[0.04em]">
                {STORY[lang].p2}
              </p>

              <div className="mt-8 sm:mt-10">
                <Link href="/book"
                  className="inline-flex items-center gap-3 border border-[#c9a84c]/50 text-[#c9a84c] text-[11px] tracking-[0.25em] uppercase px-7 py-3 hover:bg-[#c9a84c] hover:text-black transition-all duration-200">
                  {lang === "ja" ? "ご予約はこちら" : lang === "zh" ? "立即預訂" : "Book Now"}
                </Link>
              </div>
            </div>

            {/* Image placeholder — portrait 3:4 */}
            <div className="relative w-full max-w-[300px] mx-auto lg:mx-0">
              <div className="aspect-[3/4] bg-[#1a1a1a] border border-white/[0.07] flex flex-col items-center justify-center gap-3 overflow-hidden">
                {/* decorative corner lines */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#c9a84c]/40" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#c9a84c]/40" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#c9a84c]/40" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#c9a84c]/40" />

                {/* camera icon */}
                <svg className="w-8 h-8 text-white/15" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>

                <p className="text-white/20 text-[9px] tracking-[0.2em] uppercase text-center px-6 leading-relaxed">
                  {lang === "ja" ? "写真をここに挿入" : lang === "zh" ? "在此插入圖片" : "Insert photo here"}
                </p>
                <p className="text-white/12 text-[8px] tracking-[0.12em] text-center px-6 leading-relaxed mt-1">
                  720 × 960 px · 3:4
                </p>
              </div>

              {/* caption below placeholder */}
              <p className="mt-3 text-white/20 text-[9px] tracking-[0.15em] leading-relaxed text-center lg:text-left">
                {STORY[lang].imgNote}
              </p>
            </div>
          </div>

          {/* ── How It Works — 4 steps ─────────────────────────────── */}
          <div className="mt-20 sm:mt-28">
            <SectionLabel label={lang === "ja" ? "ご利用の流れ" : lang === "zh" ? "服務流程" : "How It Works"} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06]">
              {STEPS[lang].map((step) => (
                <div key={step.num} className="bg-[#111111] p-7 sm:p-9 group hover:bg-[#161616] transition-colors duration-200">
                  <p className="text-[#c9a84c]/40 text-[36px] font-bold tracking-tight leading-none mb-4 font-mono
                                group-hover:text-[#c9a84c]/60 transition-colors duration-200">
                    {step.num}
                  </p>
                  <h3 className="text-white text-[14px] sm:text-[15px] font-medium tracking-[0.1em] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/45 text-[12px] sm:text-[13px] leading-[1.85] tracking-[0.03em]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Vehicles ──────────────────────────────────────────── */}
          <div className="mt-20 sm:mt-28">
            <SectionLabel label={lang === "ja" ? "車両ラインアップ" : lang === "zh" ? "車隊介紹" : "Our Fleet"} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {VEHICLES[lang].map((veh, i) => (
                <div key={veh.tag}
                  className="relative bg-[#0f0f0f] border border-white/[0.07] overflow-hidden group hover:border-white/[0.14] transition-all duration-300">

                  {/* gold top accent */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />

                  {/* vehicle image */}
                  <div className="bg-white mx-6 mt-6 mb-0 h-[160px] sm:h-[190px] flex items-center justify-center overflow-hidden">
                    <Image
                      src={i === 0 ? ALPHARD_IMG : HIACE_IMG}
                      alt={veh.name}
                      width={340}
                      height={200}
                      className="object-contain mix-blend-multiply w-full h-full p-2"
                    />
                  </div>

                  {/* info */}
                  <div className="px-6 py-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white text-[13px] sm:text-[14px] font-medium tracking-[0.12em]">{veh.name}</h3>
                      <span className="text-[#c9a84c] text-[9px] tracking-[0.25em] border border-[#c9a84c]/30 px-2 py-0.5">
                        {veh.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="flex items-center gap-1.5 text-white/40 text-[11px] tracking-[0.08em]">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        {veh.cap}
                      </span>
                      <span className="flex items-center gap-1.5 text-white/40 text-[11px] tracking-[0.08em]">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                        {veh.bags}
                      </span>
                    </div>
                    <p className="text-white/40 text-[12px] leading-[1.75] tracking-[0.03em]">{veh.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Gold divider ────────────────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/35 to-transparent" />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* ── FAQ section ───────────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="scroll-mt-20 bg-[#0c0c0c] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <SectionLabel label={lang === "ja" ? "よくある質問" : lang === "zh" ? "常見問題" : "FAQ"} />

          <h2 className="text-white text-2xl sm:text-3xl font-light tracking-[0.1em] mb-10 sm:mb-14">
            {lang === "ja" ? "よくあるご質問" : lang === "zh" ? "常見問題" : "Frequently Asked Questions"}
          </h2>

          <div className="space-y-10 sm:space-y-12">
            {FAQ[lang].map((group) => (
              <div key={group.group}>
                {/* group heading */}
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-3 h-px bg-[#c9a84c]/50" />
                  <p className="text-[#c9a84c]/70 text-[10px] tracking-[0.35em] uppercase font-semibold">
                    {group.group}
                  </p>
                </div>
                <div className="border-t border-white/[0.07] mt-3">
                  {group.items.map((item, idx) => {
                    const key = `${group.group}-${idx}`;
                    return (
                      <FaqRow
                        key={key}
                        item={item}
                        open={openKey === key}
                        onToggle={() => toggle(key)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* CTA below FAQ */}
          <div className="mt-14 sm:mt-20 border border-white/[0.07] p-8 sm:p-10 text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mb-8" />
            <p className="text-white/40 text-[11px] tracking-[0.25em] uppercase mb-3">
              {lang === "ja" ? "もっと詳しく知りたい方は" : lang === "zh" ? "有其他疑問？" : "Still have questions?"}
            </p>
            <p className="text-white text-[14px] sm:text-[15px] tracking-[0.06em] mb-6 leading-relaxed">
              {lang === "ja"
                ? "お気軽にご予約フォームからお問い合わせください。"
                : lang === "zh"
                ? "歡迎透過預訂表單與我們聯繫。"
                : "Reach out through our booking form and we'll be happy to help."}
            </p>
            <Link href="/book"
              className="inline-flex items-center gap-3 bg-[#c9a84c] text-black text-[11px] font-bold tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-white transition-all duration-200">
              {lang === "ja" ? "ご予約・お問い合わせ" : lang === "zh" ? "預訂 / 聯絡我們" : "Book / Contact Us"}
            </Link>
          </div>

        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
