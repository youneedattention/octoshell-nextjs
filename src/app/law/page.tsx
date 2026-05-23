"use client";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";

/* ── Law content data ─────────────────────────────────────────────── */
type Row =
  | { type: "text"; value: string }
  | { type: "list"; items: string[] }
  | { type: "dl"; pairs: [string, string][] }
  | { type: "note"; value: string };

const SECTIONS: { label: string; row: Row }[] = [
  {
    label: "事業者名",
    row: { type: "text", value: "貝八方株式会社" },
  },
  {
    label: "代表者",
    row: { type: "text", value: "代表取締役　冉 雷磊" },
  },
  {
    label: "運営責任者",
    row: { type: "text", value: "Tracy Chen" },
  },
  {
    label: "本社所在地",
    row: {
      type: "text",
      value: "〒271-0064　千葉県松戸市上本郷618番地の1　松戸第八マンション103号",
    },
  },
  {
    label: "連絡先",
    row: {
      type: "dl",
      pairs: [
        ["電話番号", "080-9060-6083"],
        ["電話受付時間", "9:00〜18:00（年中無休）"],
        ["メールアドレス", "info@octoshell.jp"],
        ["ウェブサイトURL", "https://octoshell.jp"],
      ],
    },
  },
  {
    label: "役務内容",
    row: {
      type: "text",
      value: "一般乗用旅客自動車運送事業（ハイヤー・高級送迎サービス）の提供。",
    },
  },
  {
    label: "販売価格",
    row: {
      type: "text",
      value:
        "各サービスのご提案書、お見積り画面、またはご予約ページに記載された金額（消費税込み）。",
    },
  },
  {
    label: "商品代金以外の\n必要料金",
    row: {
      type: "dl",
      pairs: [
        [
          "実費負担費用",
          "高速道路・有料道路利用料金、回送通行料、駐車場料金、乗務員宿泊費（遠方・泊まりがけの場合）。",
        ],
        [
          "追加料金",
          "お客様の都合による利用時間の延長（延長料金）、深夜早朝運行手配に伴う割増料金。",
        ],
        [
          "通信料等",
          "本サイトの閲覧、オンライン予約決済時に発生するインターネット接続料金および通信料金。",
        ],
        ["振込手数料", "銀行振込によるお支払いの際の手数料。"],
      ],
    },
  },
  {
    label: "お支払い方法",
    row: {
      type: "list",
      items: [
        "クレジットカード決済（Visa、Mastercard、American Express、JCB、Diners Club、Discover）　※Stripe経由",
        "銀行振込（事前入金）",
        "現金支払い（降車時精算）",
      ],
    },
  },
  {
    label: "代金の支払時期",
    row: {
      type: "dl",
      pairs: [
        [
          "クレジットカード決済",
          "ご予約確定時に即時決済、または事前にお送りする決済リンクからの決済。",
        ],
        [
          "銀行振込",
          "ご利用日の前日（または別途指定する期日）までの事前振込。",
        ],
        ["現金支払い", "サービス利用終了時（降車時）に直接精算。"],
      ],
    },
  },
  {
    label: "役務の提供時期",
    row: {
      type: "text",
      value:
        "ご予約時、または最終確定書面（配車指示書・日程表）にて指定された日時に、ご指定の場所へ車両を配車し、サービスを提供いたします。",
    },
  },
  {
    label: "キャンセル・\n変更・返品",
    row: {
      type: "dl",
      pairs: [
        ["", "サービスの性質上、配車後の返品・変更は不可となります。キャンセルの場合は以下の規定に基づき取消料（キャンセル料）を申し受けます。"],
        ["48時間前まで", "無料（全額返金）"],
        ["24時間前〜48時間前", "お見積り料金の50%"],
        ["24時間以内・無断キャンセル", "お見積り料金の100%"],
      ],
    },
  },
  {
    label: "キャンセルに関する\nご注意",
    row: {
      type: "note",
      value:
        "悪天候、天災地変、その他の不可抗力により運行が不可能な場合、キャンセル料は発生いたしません。払い戻しにかかる実費手数料はお客様負担となる場合がございます。",
    },
  },
  {
    label: "許認可証等の表示",
    row: {
      type: "dl",
      pairs: [
        [
          "一般乗用旅客自動車運送事業（ハイヤー）",
          "関自旅二第 1248 号（関東運輸局長認可）",
        ],
        [
          "運賃及び料金認可",
          "関自旅二第 388 号　／　期限変更通知 関自旅二第 773 号",
        ],
      ],
    },
  },
];

/* ── Row renderer ─────────────────────────────────────────────────── */
function RowContent({ row }: { row: Row }) {
  switch (row.type) {
    case "text":
      return <p className="text-[#1a1a1a] text-[13px] leading-[1.9] tracking-wide">{row.value}</p>;

    case "list":
      return (
        <ul className="space-y-2">
          {row.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[13px] text-[#1a1a1a] leading-[1.8]">
              <span className="mt-[6px] shrink-0 w-1 h-1 rounded-full bg-[#c9a84c]" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "dl":
      return (
        <dl className="space-y-2.5">
          {row.pairs.map(([term, def], i) => (
            <div key={i} className={term ? "grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-4" : ""}>
              {term && (
                <dt className="text-[11px] font-semibold tracking-wider text-[#555] whitespace-nowrap pt-[2px]">
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
          <p className="text-[12px] text-[#555] leading-[1.9] italic">{row.value}</p>
        </div>
      );
  }
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function LawPage() {
  const { lang } = useLang();

  return (
    <main>
      {/* ── Hero / Title bar ────────────────────────────────────── */}
      <div className="relative bg-[#0c0c0c] pt-[90px] sm:pt-28 pb-10 sm:pb-14">
        <Header />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[#c9a84c] text-[9px] sm:text-[10px] tracking-[0.45em] mb-4 uppercase">
            {t.law_badge[lang]}
          </p>
          <h1 className="text-white text-xl sm:text-2xl font-light tracking-[0.12em] sm:tracking-[0.18em]">
            特定商取引法に基づく表記
          </h1>
          <div className="mt-6 w-10 h-px bg-[#c9a84c]/60" />
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="bg-[#f8f6f3] py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Back link */}
          <Link href="/"
            className="inline-flex items-center gap-2 text-[11px] tracking-widest text-[#888] hover:text-[#c9a84c] transition-colors mb-12 sm:mb-16">
            {t.law_back[lang]}
          </Link>

          {/* Table */}
          <div className="divide-y divide-[#e2ddd8]">
            {SECTIONS.map(({ label, row }) => (
              <div key={label}
                className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-y-2 sm:gap-x-12 py-7 sm:py-8 items-start">
                {/* Label */}
                <div className="flex items-start gap-2.5">
                  <span className="mt-1 shrink-0 w-px h-3 bg-[#c9a84c]" />
                  <p className="text-[11px] font-semibold tracking-[0.15em] text-[#444] leading-[1.7] whitespace-pre-line">
                    {label}
                  </p>
                </div>
                {/* Value */}
                <div>
                  <RowContent row={row} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <p className="mt-12 sm:mt-16 text-center text-[11px] text-[#aaa] tracking-wider">
            最終更新：2024年10月
          </p>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <SiteFooter />
    </main>
  );
}
