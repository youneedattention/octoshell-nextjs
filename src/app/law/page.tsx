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
  zh: "基於日本《特定商業交易法》之法定公示聲明",
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
        ["電話番号",       "080-9060-6083"],
        ["電話受付時間",   "9:00〜18:00（年中無休）"],
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
      blocks: [{ type: "text", value: "各サービスのご提案書、お見積り画面、または個別のご予約ページに記載された金額（消費税込み）。" }],
    },
    {
      label: "商品代金以外の\n必要料金",
      blocks: [{ type: "dl", pairs: [
        ["実費負担費用",   "高速道路・有料道路利用料金、回送通行料、駐車場料金、乗務員宿泊費（遠方・泊まりがけの場合）。"],
        ["追加料金",       "お客様の都合による利用時間の延長（延長料金）、深夜早朝運行手配に伴う割増料金。"],
        ["通信料等",       "本サイトの閲覧、オンライン予約決済時に発生するインターネット接続料金および通信料金。"],
        ["違約金・賠償金", "お客様の都合や過失による車両の破損・汚損に伴う特殊清掃費、修理代、または利用規約に基づく違約金。"],
        ["振込手数料",     "銀行振込によるお支払いの際の手数料。"],
      ]}],
    },
    {
      label: "お支払い方法",
      blocks: [{ type: "list", items: [
        "クレジットカード決済（Visa、Mastercard、American Express、JCB、Diners Club、Discover）※Stripe経由",
        "銀行振込（事前入金）",
        "現金支払い（降車時精算）",
      ]}],
    },
    {
      label: "代金の支払時期",
      blocks: [
        { type: "dl", pairs: [
          ["クレジットカード決済", "ご予約確定時に即時決済、または事前にお送りする決済リンクからの決済。"],
          ["銀行振込",             "ご利用日の前日（または別途指定する期日）までの事前振込。"],
          ["現金支払い",           "サービス利用終了時（降車時）に直接精算。"],
        ]},
        { type: "note", value: "クレジットカードでお支払いいただいた場合、実際にお客さまの銀行口座から金銭が引き落とされる時期、または返金される時期は、各クレジット会社の規定および決済周期に基づきます。" },
      ],
    },
    {
      label: "役務の提供時期\n（商品の引き渡し時期）",
      blocks: [{ type: "text", value: "ご予約時、または最終確定書面（配車指示書・日程表）にて指定された日時に、ご指定の場所へ車両を配車し、サービスを提供いたします。" }],
    },
    {
      label: "キャンセル・\n変更・返品について",
      blocks: [
        { type: "text", value: "サービスの性質上、配車後の返品・変更は不可となります。キャンセルの場合は、以下の基本基準に基づき取消料（キャンセル料）を申し受けます。" },
        { type: "list", items: [
          "サービス利用開始の48時間前まで：無料（全額返金）",
          "サービス利用開始の24時間前〜48時間前まで：お見積り料金の50%",
          "サービス利用開始の24時間以内、または無断キャンセル：お見積り料金の100%",
        ]},
        { type: "note", value: "個別契約に別途定めがある場合は、当該契約を優先します。悪天候、天災地変、その他の不可抗力により運行が不可能な場合、キャンセル料は発生いたしません。" },
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
      label: "Legal Entity Name",
      blocks: [{ type: "text", value: "Octoshell Co., Ltd. (貝八方株式会社)" }],
    },
    {
      label: "Representative",
      blocks: [{ type: "text", value: "Representative Director, Leilei Ran (冉 雷磊)" }],
    },
    {
      label: "Operations\nManager",
      blocks: [{ type: "text", value: "Tracy Chen" }],
    },
    {
      label: "Headquarters\nAddress",
      blocks: [{ type: "text", value: "#103 Matsudo Daihachi Mansion, 618-1 Kamihongo, Matsudo-shi, Chiba 271-0064, Japan" }],
    },
    {
      label: "Contact\nInformation",
      blocks: [{ type: "dl", pairs: [
        ["Phone Number",  "+81 80-9060-6083"],
        ["Support Hours", "9:00 AM – 6:00 PM (JST, Open 365 days)"],
        ["Email Address", "info@octoshell.jp"],
        ["Website URL",   "https://octoshell.jp"],
      ]}],
    },
    {
      label: "Services Offered",
      blocks: [{ type: "text", value: "Provision of limousine, chauffeur, and luxury passenger transportation services (一般乗用旅客自動車運送事業)." }],
    },
    {
      label: "Sales Price",
      blocks: [{ type: "text", value: "Please refer to the quotation, booking confirmation screen, or individual service agreement page. Prices include Japanese Consumption Tax." }],
    },
    {
      label: "Additional Fees\nand Charges",
      blocks: [{ type: "dl", pairs: [
        ["Actual Expenses",     "Toll road/highway fees, vehicle ferry/repositioning fees, parking fees, and driver accommodation expenses (for long-distance or overnight trips)."],
        ["Surcharges",          "Extension fees for additional time requested by the customer, and late-night/early-morning operation surcharges."],
        ["Data / Comm. Fees",   "Internet connection and communication fees incurred while browsing this website, making online bookings, or processing payments."],
        ["Damages & Penalties", "Special cleaning fees or repair costs in the event of vehicle damage or severe staining caused by the customer, or penalties based on our Terms of Service."],
        ["Bank Fees",           "Transfer fees incurred when choosing payment via bank wire."],
      ]}],
    },
    {
      label: "Methods\nof Payment",
      blocks: [{ type: "list", items: [
        "Credit Card (Visa, Mastercard, American Express, JCB, Diners Club, Discover) — via Stripe",
        "Bank Wire Transfer (Advance payment)",
        "Cash Payment (Settled upon drop-off)",
      ]}],
    },
    {
      label: "Timing\nof Payment",
      blocks: [
        { type: "dl", pairs: [
          ["Credit Card",        "Charged instantly upon booking confirmation, or paid via the secure payment link sent in advance."],
          ["Bank Wire Transfer", "Must be completed by the day before the service date (or by the designated deadline)."],
          ["Cash",               "Settled directly at the end of the service upon drop-off."],
        ]},
        { type: "note", value: "For credit card payments, the exact timing of debits or refunds depends on the regulations and billing cycles of the respective credit card issuer." },
      ],
    },
    {
      label: "Timing of\nService Delivery",
      blocks: [{ type: "text", value: "Vehicles will be dispatched to the location designated by the customer at the date and time specified during booking or outlined in the final confirmation itinerary." }],
    },
    {
      label: "Cancellation &\nRefund Policy",
      blocks: [
        { type: "text", value: "Due to the nature of our services, refunds or modifications are not accepted once the vehicle has been dispatched. If a booking is cancelled, cancellation fees apply as follows:" },
        { type: "list", items: [
          "48 hours or more prior to service: Free of charge (100% refund)",
          "24 to 48 hours prior to service: 50% of the total quotation",
          "Less than 24 hours prior to service or No-Show: 100% of the total quotation",
        ]},
        { type: "note", value: "Individual service contracts with specific cancellation terms shall take precedence. No cancellation fees will apply if operations are rendered impossible due to severe weather, natural disasters, or other force majeure events." },
      ],
    },
    {
      label: "Official Licenses\n& Disclosures",
      blocks: [{ type: "dl", pairs: [
        ["Passenger Transport License", "KAN-JI-RYO-NI No. 1248 (Authorized by the Kanto Transportation Bureau)"],
        ["Approved Tariff Schedule",    "KAN-JI-RYO-NI No. 388 / Extension Notice KAN-JI-RYO-NI No. 773"],
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
      blocks: [{ type: "text", value: "代表董事　冉 雷磊" }],
    },
    {
      label: "營運負責人",
      blocks: [{ type: "text", value: "Tracy Chen" }],
    },
    {
      label: "總公司所在地",
      blocks: [{ type: "text", value: "〒271-0064　日本千葉縣松戶市上本鄉618番地之1　松戶第八大廈103號" }],
    },
    {
      label: "聯絡方式",
      blocks: [{ type: "dl", pairs: [
        ["電話號碼",     "080-9060-6083"],
        ["電話服務時間", "9:00〜18:00（全年無休）"],
        ["電子郵件",     "info@octoshell.jp"],
        ["官方網站 URL", "https://octoshell.jp"],
      ]}],
    },
    {
      label: "服務內容",
      blocks: [{ type: "text", value: "一般乘用旅客汽車運送事業（高級包車及專車接送服務）之提供。" }],
    },
    {
      label: "銷售價格",
      blocks: [{ type: "text", value: "請參照各服務之提案書、報價單、預約確認畫面或個別合同頁面所標示之金額（已含消費稅）。" }],
    },
    {
      label: "服務費用之外\n需負擔之款項",
      blocks: [{ type: "dl", pairs: [
        ["實際費用",    "高速道路及收費道路通行費、車輛回送費、停車場費用、司機住宿費（限遠途或過夜行程）。"],
        ["追加費用",    "因客戶原因導致的服務時間延長（超時費）、深夜早朝運作之加價費用。"],
        ["通訊費用",    "瀏覽本網站、進行線上預約及支付時所產生的網際網路連接及通訊費用（由客戶簽約之電信商收取）。"],
        ["違約金及賠償","因客戶原因導致車輛損壞、污損而產生的特殊清潔費、維修費，或依據利用規約產生的違約金。"],
        ["匯款手續費",  "選擇銀行轉賬支付時所產生的轉賬費用。"],
      ]}],
    },
    {
      label: "支付方式",
      blocks: [{ type: "list", items: [
        "信用卡支付（Visa、Mastercard、American Express、JCB、Diners Club、Discover）※ 經由 Stripe 系統",
        "銀行轉賬（事前匯款）",
        "現金支付（降車時結清）",
      ]}],
    },
    {
      label: "支付時期",
      blocks: [
        { type: "dl", pairs: [
          ["信用卡支付", "預約確認時即時扣款，或於事前發送之支付連結完成付款。"],
          ["銀行轉賬",   "於用車日前一日（或指定之截止日前）完成事前匯款。"],
          ["現金支付",   "於服務結束降車時直接結清。"],
        ]},
        { type: "note", value: "若使用信用卡支付，實際自客戶銀行賬戶扣款或退款之時間，依據各信用卡公司之規定與結算週期為準。" },
      ],
    },
    {
      label: "服務提供時期\n（服務交付時間）",
      blocks: [{ type: "text", value: "於預約時確認、或於最終確定書面（派車單/行程表）所指定之日期與時間，配車至客戶指定地點並提供接送服務。" }],
    },
    {
      label: "申請之撤回\n（預約取消與變更）",
      blocks: [
        { type: "text", value: "基於服務之性質，車輛派發後恕不接受退款或變更。若客戶取消預約，我們將依據以下基本基準收取取消手續費（違約金）：" },
        { type: "list", items: [
          "用車日前 48 小時以上取消：免費（全額退款）",
          "用車日前 24 小時至 48 小時內取消：收取總報價之 50%",
          "用車日前 24 小時內取消或無故缺席：收取總報價之 100%",
        ]},
        { type: "note", value: "若有個別合同約定，則以該合同之取消條款為準。因惡劣天氣、天災等不可抗力導致無法出車時，不收取取消手續費。" },
      ],
    },
    {
      label: "許可資質公示",
      blocks: [{ type: "dl", pairs: [
        ["一般乘用旅客汽車運送事業（高級包車）", "關自旅二第 1248 號（關東運輸局長許可）"],
        ["運價及費用核准",                       "關自旅二第 388 號 / 期限變更通知 關自旅二第 773 號"],
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
