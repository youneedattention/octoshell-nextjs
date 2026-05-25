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
type PBlock =
  | { type: "text"; value: string }
  | { type: "list"; items: string[] }
  | { type: "note"; label: string; body: string };

interface PSection { heading: string; blocks: PBlock[]; }

/* ══════════════════════════════════════════════════════════════════════
   Page-level strings
══════════════════════════════════════════════════════════════════════ */
const PAGE_BADGE: Record<Lang, string> = {
  en: "PRIVACY POLICY",
  ja: "個人情報",
  zh: "隱私權",
};
const PAGE_TITLE: Record<Lang, string> = {
  en: "Privacy Policy",
  ja: "プライバシーポリシー（個人情報保護方針）",
  zh: "隱私權保護政策",
};
const PAGE_UPDATED: Record<Lang, string> = {
  en: "Last updated: October 2024",
  ja: "最終更新：2024年10月",
  zh: "最後更新：2024年10月",
};

/* ══════════════════════════════════════════════════════════════════════
   Intro paragraphs
══════════════════════════════════════════════════════════════════════ */
const INTRO: Record<Lang, string> = {
  ja: "貝八方株式会社（以下、「弊社」といいます）は、インターネットを介したハイヤー予約業務の完遂、およびお客様に最適化された情報の提供にあたり、個人情報の重要性を深く認識し、その適切な管理と保護に努めております。",
  en: "Octoshell Co., Ltd. (hereinafter referred to as \"the Company\") defines and manages personal information as follows to ensure the privacy and confidentiality of our users.",
  zh: "貝八方株式會社（以下簡稱「本公司」）在透過網路提供高級專屬包車預訂業務及向用戶提供客製化資訊的過程中，深知客戶個人隱私之重要性，並將嚴格妥善管理與保護個人資料。",
};

/* ══════════════════════════════════════════════════════════════════════
   Section data — all three languages
══════════════════════════════════════════════════════════════════════ */
const SECTIONS: Record<Lang, PSection[]> = {

  /* ─── JAPANESE ──────────────────────────────────────────────────── */
  ja: [
    {
      heading: "個人情報の定義について",
      blocks: [
        { type: "text", value: "本方針における個人情報とは、氏名、住所、電子メールアドレス、アクセス記録、その他の記述、個人に付与された番号や記号、画像または音声など、特定の個人を直接的または間接的に識別できるものを指します（単体では識別できないが、他のデータと容易に照合することで識別可能となるものも含みます）。" },
      ],
    },
    {
      heading: "個人情報の利用目的の範囲について",
      blocks: [
        { type: "text", value: "弊社が個人情報を取得・利用する目的は以下の通りです。" },
        { type: "list", items: [
          "弊社、弊社の提携パートナー、および共同運行会社がインターネットを通じて「ハイヤー予約」業務を完遂するため。",
          "お客様がウェブサイト上で、個別化・最適化された情報を閲覧できるようにするため。",
          "登録内容に基づき、弊社からお客様へ有益な情報を届けるため。",
        ]},
      ],
    },
    {
      heading: "個人情報の第三者への開示・提供について",
      blocks: [
        { type: "text", value: "弊社は、原則としてお客様の事前の同意を得ることなく、個人情報を第三者に開示または提供いたしません。取得した個人情報は、弊社、本ウェブサイトの管理運営主体、および弊社と守秘義務契約を締結した提携パートナーおよび共同運行会社の間でのみ、非公開として厳重に管理されます。" },
        { type: "text", value: "また、ウェブサイトの運営管理および運送・旅行業務の一部を、弊社と守秘義務を含む業務委託契約を締結した企業または個人に委託する場合がございます。" },
        { type: "note", label: "【ただし、以下の例外的な状況においては、個人情報を開示する場合がございます】", body: "お客様が第三者に不利益を及ぼすと弊社が判断した場合、登録内容やプロフィールを当該第三者、警察、または関連する各機関に通知することがあります。また、裁判所、検察庁、警察、弁護士会、消費者生活センター、その他の公的・準公的機関から合法的な手続きに基づき開示を求められた場合、弊社はそれに応じ情報を開示します。さらに、弊社の権利や財産を保護するために必要と判断される場合にも、開示を行う権利を有します。" },
        { type: "text", value: "弊社は、潜在的な提携パートナーや広告主、その他の第三者に対して弊社のサービスを説明する目的、またはその他の合法的な目的のために、お客様の統計情報（個人を特定できない情報）を開示することがあります。" },
      ],
    },
    {
      heading: "不正なコンピューターアクセスへの対応措置",
      blocks: [
        { type: "text", value: "弊社は、個人情報への不正アクセス、紛失、破壊、改ざんおよび漏洩を防止するため、適切な組織的・技術的セキュリティ対策および管理措置を講じます。" },
      ],
    },
    {
      heading: "インターネット上のプライバシーに関する注意事項",
      blocks: [
        { type: "text", value: "インターネット上でお客様が自発的に個人情報を開示した場合、その情報は他の利用客によって収集・利用される可能性があることにご留意ください。誰もがアクセスできる場所に個人情報を公開した場合、それに基づいた不要なメッセージを受信する可能性があります。" },
        { type: "text", value: "お客様は、自己の責任において情報を送信してください。また、本ウェブサイトを通じてデータを収集したりサービスを提供したりする第三者の企業、あるいは特典や販売インセンティブ等を提供する組織は、それぞれ独自のプライバシー規則や収集規定を設けています。弊社は、これら弊社から独立した外部ウェブサイトの規約や活動に対していかなる義務や責任も負いかねます。" },
      ],
    },
  ],

  /* ─── ENGLISH ───────────────────────────────────────────────────── */
  en: [
    {
      heading: "Definition of Personal Information",
      blocks: [
        { type: "text", value: "Personal information refers to any form of information pertaining to the individual involved. It is identified by the name, address, e-mail address, access records, other descriptions, numbers, and signs given to the individual, as well as images or voice that a person has. This also includes information that is not identifiable by itself but can be easily identified by cross-checking with other data." },
      ],
    },
    {
      heading: "Range of Use of Personal Information",
      blocks: [
        { type: "text", value: "Our purposes for collecting and processing personal information are:" },
        { type: "list", items: [
          "For the Company, our partners, and our cooperative companies to accomplish the online \"Hired car reservation\" business through the Internet.",
          "For the user to view customized and tailored information displayed on our website.",
          "For the Company to deliver the best information and updates based on the contents of the individual's registration.",
        ]},
      ],
    },
    {
      heading: "Disclosing of Personal Information to Third Parties",
      blocks: [
        { type: "text", value: "As a rule, we will not disclose a user's personal information without the prior consent of the person involved. All personal data will be kept strictly private to the Company, the managing body of this website, our partners, and our cooperative enterprises who have entered into a non-disclosure agreement with the Company." },
        { type: "text", value: "A part of the site management and the transportation/travel business may be consigned to enterprises or individuals who have executed a business contract, including a non-disclosure agreement, with the Company." },
        { type: "note", label: "【However, personal information may be disclosed under the following exceptional situations】", body: "The information, registration content, and profile given by the user can be notified to a third party concerned, the police, or related organizations when the Company believes that the user's actions cause disadvantage or harm to a third party. Moreover, when the information, registration contents, and profile given by the user are requested by a court, the public prosecutor's office, the police, the bar association, the consumer affairs bureau, or other official and quasi-official bodies, the Company can disclose the information in compliance with the request. The Company also reserves the right to disclose such information to protect the rights and property of the Company." },
        { type: "text", value: "The Company may disclose anonymized statistical information about our users to explain our services to potential cooperative partners, advertisers, and other third parties, or for other lawful purposes." },
      ],
    },
    {
      heading: "Measures Against Unauthorized Computer Access",
      blocks: [
        { type: "text", value: "To address and prevent unauthorized computer access, loss, destruction, alteration, or leakage of personal data, the Company implements robust organizational and technical security countermeasures and safety management controls." },
      ],
    },
    {
      heading: "Privacy Safeguards and User Responsibility Over the Internet",
      blocks: [
        { type: "text", value: "Please note that there is a possibility that personal information you voluntarily disclose online may be collected and used by other internet users. If personal information is disclosed in a public space on the Internet that everyone has access to, you might receive unsolicited messages based on the information posted there." },
        { type: "text", value: "Users must transmit information at their own risk. Moreover, external enterprises that collect data through this website or provide independent services, rewards, or sales incentives have their own regulations regarding private information. The Company cannot assume any obligation or responsibility for rules and activities independent of our website." },
      ],
    },
  ],

  /* ─── TRADITIONAL CHINESE ───────────────────────────────────────── */
  zh: [
    {
      heading: "個人資料之定義",
      blocks: [
        { type: "text", value: "本方針所指之個人資料，是指與特定個人相關的任何形式之資訊。包括姓名、住址、電子郵件地址、線上訪問紀錄、其他相關描述、賦予該個人的專屬數字或符號，以及個人所持有的圖像或聲音等（亦包含單憑該資料本身無法直接識別、但透過與其他數據進行交叉比對後即可輕易識別特定個人的資訊）。" },
      ],
    },
    {
      heading: "個人資料之利用目的範圍",
      blocks: [
        { type: "text", value: "本公司收集與利用個人資料之特定目的如下：" },
        { type: "list", items: [
          "為了本公司、我們的合作夥伴以及共同運行車隊之企業，能順利完成透過網路進行的「高級專屬包車預訂」業務。",
          "為了讓用戶能夠在本網站上瀏覽經過客製化與最佳化的專屬行程資訊。",
          "為了讓本公司能夠根據用戶註冊登記的具體內容，精準提供最有益的資訊與更新。",
        ]},
      ],
    },
    {
      heading: "向第三方揭露與提供資料之限制",
      blocks: [
        { type: "text", value: "本公司原則上在未獲得客戶本人的明確同意前，絕不向任何第三方揭露或提供個人資料。所搜集的個人資料將僅限於本公司、本網站的營運管理主體，以及與本公司簽署嚴格保密協議的合作夥伴和共同運行企業之間，進行非公開的嚴格保護與管理。" },
        { type: "text", value: "此外，網站的部分營運管理以及包車與旅遊業務的特定環節，可能會委託給與本公司簽署包含保密條款在內之業務委託合同的企業或個人。" },
        { type: "note", label: "【然而，在以下例外特殊情形下，本公司可能會揭露個人資料】", body: "當本公司判定用戶的行為造成第三方遭受損失或不利益時，可將用戶的登記內容與個人檔案通知該第三方當事人、警察或相關的各個機構。此外，當接獲法院、檢察廳、警察機關、律師公會、消費者生活中心或其他正式官方與準官方機構，依據法定程序提出正式調閱要求時，本公司可配合其合法要求揭露資料。本公司亦保留為了保護自身權利與財產而揭露此類資訊的合法權利。" },
        { type: "text", value: "本公司在需要向潛在的合作夥伴、廣告主或其他第三方說明我們的服務時，或出於其他合法目的，可能會依法揭露不包含個人身份特徵的用戶統計數據。" },
      ],
    },
    {
      heading: "防止未授權電腦存取的安全防護措施",
      blocks: [
        { type: "text", value: "為防止個人資料遭受未授權之電腦存取、遺失、破壞、篡改或洩漏，本公司部署了嚴格的系統防禦技術、加密通信協議以及相應的安全管理防範措施。" },
      ],
    },
    {
      heading: "網路環境下的免責聲明與用戶自我責任",
      blocks: [
        { type: "text", value: "請注意，您在網路上自願公開的個人資料，存在被其他網路用戶收集並利用的可能性。若個人資料被公開在任何人均可存取的公共網路空間中，您可能會收到基於該公開資訊而發送的垃圾郵件或不必要的訊息。" },
        { type: "text", value: "用戶必須自行承擔在網路環境下發送資訊的相關風險。此外，透過本網站連結或提供獨立服務、獎勵或銷售激勵的外部第三方企業，均設有其獨立的隱私權規則與收集規定。本公司對於這些獨立於本網站之外的第三方行為與規則，不承擔任何法律義務與責任。" },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════
   Block renderer
══════════════════════════════════════════════════════════════════════ */
function BlockContent({ block }: { block: PBlock }) {
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
    case "note":
      return (
        <div className="border-l-2 border-[#c9a84c]/40 pl-4 space-y-2">
          <p className="text-[12px] font-semibold text-[#444] leading-[1.85] tracking-[0.02em]">
            {block.label}
          </p>
          <p className="text-[12px] text-[#666] leading-[1.9] italic">
            {block.body}
          </p>
        </div>
      );
  }
}

/* ══════════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════════ */
export default function PrivacyPage() {
  const { lang } = useLang();
  const sections = SECTIONS[lang];

  return (
    <main>

      {/* ── Hero / Title bar ──────────────────────────────────── */}
      <div className="relative bg-[#0c0c0c] pt-[90px] sm:pt-28 pb-10 sm:pb-14">
        <Header />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[#c9a84c] text-[9px] sm:text-[10px] tracking-[0.45em] mb-4 uppercase">
            {PAGE_BADGE[lang]}
          </p>
          <h1 className="text-white text-lg sm:text-2xl font-light tracking-[0.06em] leading-snug max-w-2xl">
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

          {/* Intro paragraph */}
          <div className="mb-12 sm:mb-16 border-l-2 border-[#c9a84c]/50 pl-5">
            <p className="text-[#333] text-[13px] sm:text-[14px] leading-[1.9] tracking-wide">
              {INTRO[lang]}
            </p>
          </div>

          {/* Sections */}
          <div className="divide-y divide-[#e2ddd8]">
            {sections.map(({ heading, blocks }) => (
              <div key={heading} className="py-9 sm:py-11">

                {/* Section heading */}
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="shrink-0 w-px h-4 bg-[#c9a84c]" />
                  <h2 className="text-[12px] sm:text-[13px] font-semibold tracking-[0.12em] text-[#333] uppercase">
                    {heading}
                  </h2>
                </div>

                {/* Section blocks */}
                <div className="space-y-4 pl-4">
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
