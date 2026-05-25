"use client";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";
import type { Lang } from "@/lib/translations";

/* ══════════════════════════════════════════════════════════════════════
   Content types
══════════════════════════════════════════════════════════════════════ */
type CB =
  | { type: "text";  value: string }
  | { type: "list";  items: string[] }
  | { type: "dl";    pairs: [string, string][] }
  | { type: "note";  value: string };

interface Section { label: string; blocks: CB[]; }

/* ══════════════════════════════════════════════════════════════════════
   Page-level strings
══════════════════════════════════════════════════════════════════════ */
const PAGE_TITLE: Record<Lang, string> = {
  en: "Legal Notice (Specified Commercial Transactions Act)",
  ja: "特定商取引法に基づく表記",
  zh: "特定商業交易法公示",
};
const PAGE_UPDATED: Record<Lang, string> = {
  en: "Last updated: October 2024",
  ja: "最終更新：2024年10月",
  zh: "最後更新：2024年10月",
};

/* ══════════════════════════════════════════════════════════════════════
   Section data — all three languages
══════════════════════════════════════════════════════════════════════ */
const SECTIONS: Record<Lang, Section[]> = {

  /* ─── JAPANESE ──────────────────────────────────────────────────── */
  ja: [
    {
      label: "事業者名",
      blocks: [{ type: "text", value: "貝八方株式会社" }],
    },
    {
      label: "代表者",
      blocks: [{ type: "text", value: "代表取締役　冉 雷磊" }],
    },
    {
      label: "運営責任者",
      blocks: [{ type: "text", value: "Tracy Chen" }],
    },
    {
      label: "本社所在地",
      blocks: [{ type: "text", value: "〒271-0064　千葉県松戸市上本郷618番地の1　松戸第八マンション103号" }],
    },
    {
      label: "連絡先",
      blocks: [{ type: "dl", pairs: [
        ["電話番号",       "047-382-5728"],
        ["電話受付時間",   "10:00〜17:00（年中無休）"],
        ["メールアドレス", "info@octoshell.jp"],
        ["ウェブサイトURL","https://octoshell.jp"],
      ]}],
    },
    {
      label: "役務内容",
      blocks: [{ type: "text", value: "一般乗用旅客自動車運送事業（ハイヤー・高級送迎サービス）の提供。" }],
    },
    {
      label: "販売価格",
      blocks: [
        { type: "text", value: "各サービスのご提案書、お見積り画面、またはご予約ページに記載された金額（消費税込み）。" },
        { type: "note", value: "弊社の提示するお見積り金額には、通常運行に必要な高速道路料金、有料道路料金、回送通行料、駐車場料金、および乗務員の宿泊費用（遠方・泊まりがけの場合）がすべて含まれております。" },
      ],
    },
    {
      label: "商品代金以外の必要料金",
      blocks: [{ type: "dl", pairs: [
        ["突発的な追加費用", "当日の運行開始後、お客様の都合またはご要望により、当初の予定にないルートの変更、立ち寄り地の追加、または利用時間の延長が発生した場合に限り、それに伴う新たな高速道路料金、有料道路料金、回送通行料、駐車場料金、乗務員宿泊費、および延長割増料金を別途申し受けます。"],
        ["通信料等",         "本サイトの閲覧、オンライン予約決済時に発生するインターネット接続料金および通信料金。"],
        ["振込手数料",       "銀行振込によるお支払いの際の手数料。"],
      ]}],
    },
    {
      label: "お支払い方法",
      blocks: [{ type: "list", items: [
        "クレジットカード決済（ミール、マスターカード、アメリカンエキスプレス、ジェーシービー、ダイナースクラブ、ディスカバー）※専用のオンライン決済システムを経由",
        "銀行振込（事前入金）",
        "現金支払い（降車時精算）",
      ]}],
    },
    {
      label: "代金の支払時期",
      blocks: [{ type: "dl", pairs: [
        ["クレジットカード決済", "ご予約確定時に即時決済、または事前にお送りする決済リンクからの決済。"],
        ["銀行振込",             "ご利用日の前日（または別途指定する期日）までの事前振込。"],
        ["現金支払い",           "サービス利用終了時（降車時）に直接精算。"],
      ]}],
    },
    {
      label: "役務の提供時期（商品の引き渡し時期）",
      blocks: [{ type: "text", value: "ご予約時、または最終確定書面（配車指示書・日程表）にて指定された日時に、ご指定の場所へ車両を配車し、サービスを提供いたします。" }],
    },
    {
      label: "キャンセル・変更・返品について",
      blocks: [
        { type: "text", value: "サービスの性質上、配車後の返品・変更は不可となります。キャンセルの場合は、以下の規定に基づき取消料（キャンセル料）を申し受けます。" },
        { type: "list", items: [
          "配車日の48時間前まで： 無料（全額返金）",
          "配車日の24時間前〜48時間前まで： お見積り金額の 50%",
          "配車日の24時間以内、または無断キャンセル： お見積り金額の 100%",
        ]},
        { type: "note", value: "航空便の欠航など不可抗力による場合は、速やかにお知らせいただくことでキャンセル料は免除となります。" },
      ],
    },
    {
      label: "許認可証等の表示",
      blocks: [{ type: "dl", pairs: [
        ["一般乗用旅客自動車運送事業（ハイヤー）", "関自旅二第 1248 号（関東運輸局長認可）"],
        ["運賃及び料金認可",                       "関自旅二第 388 号 / 期限変更通知 関自旅二第 773 号"],
      ]}],
    },
  ],

  /* ─── ENGLISH ───────────────────────────────────────────────────── */
  en: [
    {
      label: "Distributor",
      blocks: [{ type: "text", value: "Octoshell Co., Ltd." }],
    },
    {
      label: "Legal Representative",
      blocks: [{ type: "text", value: "Representative Director: Lei-Lei Ran" }],
    },
    {
      label: "Operations Manager",
      blocks: [{ type: "text", value: "Tracy Chen" }],
    },
    {
      label: "Location",
      blocks: [{ type: "text", value: "103 Matsudo Dai-Hachi Mansion, 618-1 Kamihongo, Matsudo-shi, Chiba, 271-0064, Japan" }],
    },
    {
      label: "Contact Information",
      blocks: [{ type: "dl", pairs: [
        ["Phone Number",  "+81 47-382-5728"],
        ["Support Hours", "10:00 - 17:00 (Seven days a week)"],
        ["Email Address", "info@octoshell.jp"],
        ["Website URL",   "https://octoshell.jp"],
      ]}],
    },
    {
      label: "Services Offered",
      blocks: [{ type: "text", value: "Provision of chartered executive chauffeur services (Premium Private Transport)." }],
    },
    {
      label: "Sales Price",
      blocks: [
        { type: "text", value: "Prices are displayed on individual service quotes, estimate screens, or booking pages (inclusive of consumption tax)." },
        { type: "note", value: "Our initial quotes are all-inclusive, encompassing all standard toll fees, highway fees, deadhead tolls, parking fees, and chauffeur overnight accommodation expenses (for long-distance/overnight trips)." },
      ],
    },
    {
      label: "Additional Fees Required",
      blocks: [{ type: "dl", pairs: [
        ["Spontaneous Amendment Fees",  "Additional fees for newly incurred highway tolls, parking fees, deadhead tolls, chauffeur accommodation expenses, and hourly extension surcharges will only apply if a passenger spontaneously requests a change of route, additional stopovers, or an extension of service time after the journey has commenced."],
        ["Transaction/Data Surcharges", "Internet connection and data fees incurred while browsing our website or utilizing online booking/payment services."],
        ["Bank Fees",                   "Transfer fees associated with payments made via bank wire (Furikomi)."],
      ]}],
    },
    {
      label: "Payment Methods",
      blocks: [{ type: "list", items: [
        "Credit Card (Visa, Mastercard, American Express, JCB, Diners Club, Discover) via our secure online system.",
        "Bank Transfer (Upfront Payment)",
        "Cash Payment (Settled upon drop-off)",
      ]}],
    },
    {
      label: "Timing of Payment",
      blocks: [{ type: "dl", pairs: [
        ["Credit Card",   "Charged immediately upon booking confirmation, or via a pre-authorized secure billing link sent in advance."],
        ["Bank Transfer", "Upfront payment required by the day before the service (or by an individually designated due date)."],
        ["Cash",          "Paid directly to the chauffeur upon completion of the service (drop-off)."],
      ]}],
    },
    {
      label: "Service Delivery Time",
      blocks: [{ type: "text", value: "Vehicles will be dispatched to the designated location at the date and time specified in your booking confirmation or final travel itinerary." }],
    },
    {
      label: "Cancellations and Refunds",
      blocks: [
        { type: "text", value: "Due to the nature of our services, refunds or route changes are not permitted once a vehicle has been dispatched. Cancellations are subject to the following cancellation fees:" },
        { type: "list", items: [
          "Up to 48 hours before pickup: Free of charge (100% Refund)",
          "Between 24 to 48 hours before pickup: 50% of the total estimated quote",
          "Within 24 hours or No-Show: 100% of the total estimated quote",
        ]},
        { type: "note", value: "Cancellation fees are waived if your flight is officially canceled by the airline, provided you notify our office immediately." },
      ],
    },
    {
      label: "Official Licenses & Registrations",
      blocks: [{ type: "dl", pairs: [
        ["Chartered Executive Chauffeur Service License", "KAN-JI-RYO-NI No. 1248 (Approved by Kanto Transport Bureau)"],
        ["Official Tariff and Fare Approval",            "KAN-JI-RYO-NI No. 388 / Amendment Notice KAN-JI-RYO-NI No. 773"],
      ]}],
    },
  ],

  /* ─── TRADITIONAL CHINESE ───────────────────────────────────────── */
  zh: [
    {
      label: "事業者名稱",
      blocks: [{ type: "text", value: "貝八方株式會社" }],
    },
    {
      label: "代表者",
      blocks: [{ type: "text", value: "代表取締役　冉 雷磊" }],
    },
    {
      label: "營運負責人",
      blocks: [{ type: "text", value: "陳 翠西（翠西・陳）" }],
    },
    {
      label: "總店所在地",
      blocks: [{ type: "text", value: "千葉縣松戶市上本郷618番地的1　松戶第八大廈103號" }],
    },
    {
      label: "聯絡方式",
      blocks: [{ type: "dl", pairs: [
        ["電話號碼",     "047-382-5728"],
        ["電話服務時間", "10:00〜17:00（年中無休）"],
        ["電子郵箱",     "info@octoshell.jp"],
        ["官方網站網址", "https://octoshell.jp"],
      ]}],
    },
    {
      label: "服務內容",
      blocks: [{ type: "text", value: "一般乘用旅客汽車運送事業（高級專屬包車與接送服務）。" }],
    },
    {
      label: "銷售價格",
      blocks: [
        { type: "text", value: "依各項服務提案書、估價畫面或預訂頁面所標示之金額為準（已含消費稅）。" },
        { type: "note", value: "本公司所提供之初始估價均採包乾制，已完整包含行程所需的高速公路費、收費道路費、回送通行費、停車場費以及司機隨行住宿費（限遠途及跨夜行程）。" },
      ],
    },
    {
      label: "價格之外的必要費用",
      blocks: [{ type: "dl", pairs: [
        ["突發性追加費用", "當行程開始後，僅在乘客主動要求修改路線、臨時增加停靠點或延長用車時間的情況下，由此產生的全新高速公路費、收費道路費、回送通行費、停車場費、司機隨行住宿費及時間延長溢價費用，將另行向客戶全額據實收取。"],
        ["網路通訊費",     "瀏覽本網站、進行線上預約及支付時所產生的網路連接費與數據通訊流量費。"],
        ["匯款手續費",     "選擇銀行轉帳支付時，需由客戶承擔的銀行端手續費。"],
      ]}],
    },
    {
      label: "支付方式",
      blocks: [{ type: "list", items: [
        "信用卡支付（維薩、萬事達、美國運通、吉士美、大來、發現卡）※經由專屬線上安全支付系統",
        "銀行轉帳（事前入帳）",
        "現金支付（降車時結清）",
      ]}],
    },
    {
      label: "支付時間",
      blocks: [{ type: "dl", pairs: [
        ["信用卡支付", "訂單確認時即時扣款，或經由事前發送的安全支付連結進行線上扣款。"],
        ["銀行轉帳",   "需於用車日前一天（或另行指定的截止日期）完成事前匯款。"],
        ["現金支付",   "於服務結束（降車）時，在車內向司機直接結清。"],
      ]}],
    },
    {
      label: "服務提供時間",
      blocks: [{ type: "text", value: "我們將嚴格按照預訂確認書或最終行程表上指定的日期與時間，將車輛派遣至您指定的地點提供包車服務。" }],
    },
    {
      label: "取消與退款政策",
      blocks: [
        { type: "text", value: "基於包車服務之特殊性質，車輛一經派遣即無法受理退款或任意變更。訂單取消將依據以下比例收取取消手續費：" },
        { type: "list", items: [
          "用車時間前 48 小時以上取消： 免費（全額退款）",
          "用車時間前 24 至 48 小時內取消： 收取預計行程總額的 50%",
          "用車時間前 24 小時內取消或無故未到： 收取預計行程總額的 100%",
        ]},
        { type: "note", value: "若因航班突發取消等不可抗力因素導致無法出行，在您及時通知本公司並提供航司憑證的前提下，將免收取消手續費。" },
      ],
    },
    {
      label: "特許資質及許可公示",
      blocks: [{ type: "dl", pairs: [
        ["一般乘用旅客汽車運送事業許可（高級包車）", "關自旅二第 1248 號（關東運輸局長認可）"],
        ["運價及費用核准認可",                       "關自旅二第 388 號 / 期限變更通知 關自旅二第 773 號"],
      ]}],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════
   Block renderer
══════════════════════════════════════════════════════════════════════ */
function BlockContent({ block }: { block: CB }) {
  switch (block.type) {

    case "text":
      return (
        <p className="text-[#1a1a1a] text-[13px] leading-[1.9] tracking-wide">
          {block.value}
        </p>
      );

    case "list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[13px] text-[#1a1a1a] leading-[1.8]">
              <span className="mt-[7px] shrink-0 w-1 h-1 rounded-full bg-[#c9a84c]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "dl":
      return (
        <dl className="space-y-3">
          {block.pairs.map(([term, def], i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-5 gap-y-0.5">
              {term && (
                <dt className="text-[11px] font-semibold tracking-[0.08em] text-[#555]
                               whitespace-nowrap pt-[3px] min-w-[7rem]">
                  {term}
                </dt>
              )}
              <dd className={`text-[13px] text-[#1a1a1a] leading-[1.85] ${!term ? "col-span-full" : ""}`}>
                {def}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "note":
      return (
        <div className="border-l-2 border-[#c9a84c]/40 pl-4">
          <p className="text-[12px] text-[#666] leading-[1.9] italic">
            {block.value}
          </p>
        </div>
      );
  }
}

/* ══════════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════════ */
export default function LawPage() {
  const { lang } = useLang();
  const sections = SECTIONS[lang];

  return (
    <main>

      {/* ── Hero / Title bar ──────────────────────────────────── */}
      <div className="relative bg-[#0c0c0c] pt-[90px] sm:pt-28 pb-10 sm:pb-14">
        <Header />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[#c9a84c] text-[9px] sm:text-[10px] tracking-[0.45em] mb-4 uppercase">
            {t.law_badge[lang]}
          </p>
          <h1 className="text-white text-lg sm:text-2xl font-light tracking-[0.06em]
                         leading-snug max-w-2xl">
            {PAGE_TITLE[lang]}
          </h1>
          <div className="mt-6 w-10 h-px bg-[#c9a84c]/60" />
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="bg-[#f8f6f3] py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] tracking-widest
                       text-[#888] hover:text-[#c9a84c] transition-colors mb-12 sm:mb-16"
          >
            {t.law_back[lang]}
          </Link>

          {/* Section table */}
          <div className="divide-y divide-[#e2ddd8]">
            {sections.map(({ label, blocks }) => (
              <div
                key={label}
                className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-y-3 sm:gap-x-12
                           py-7 sm:py-9 items-start"
              >
                {/* Label column */}
                <div className="flex items-start gap-2.5 sm:pt-[2px]">
                  <span className="mt-[5px] shrink-0 w-px h-3 bg-[#c9a84c]" />
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-[#444]
                                leading-[1.75] whitespace-pre-line">
                    {label}
                  </p>
                </div>

                {/* Content column — stacked blocks */}
                <div className="space-y-4">
                  {blocks.map((block, i) => (
                    <BlockContent key={i} block={block} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Last-updated note */}
          <p className="mt-14 sm:mt-20 text-center text-[11px] text-[#aaa] tracking-wider">
            {PAGE_UPDATED[lang]}
          </p>

        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────── */}
      <SiteFooter />
    </main>
  );
}
