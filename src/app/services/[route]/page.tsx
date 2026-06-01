"use client";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import Price, { CurrencyNote } from "@/components/Price";
import { useLang } from "@/context/LangContext";
import { getRouteData } from "./routeData";
import type { Lang } from "@/lib/translations";

/* ── Gold divider ────────────────────────────────────────────────────── */
function GoldRule({ fade = "right" }: { fade?: "right" | "both" }) {
  const grad =
    fade === "both"
      ? "from-transparent via-[#c9a84c]/50 to-transparent"
      : "from-[#c9a84c]/20 via-[#c9a84c]/50 to-transparent";
  return <div className={`h-px bg-gradient-to-r ${grad} mb-10 sm:mb-14`} />;
}

/* ── Section label chip ──────────────────────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-6 h-px bg-[#c9a84c]" />
      <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] uppercase font-semibold">
        {label}
      </p>
    </div>
  );
}

/* ── Check icon ──────────────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0 text-[#c9a84c] mt-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

/* ── Parse [text](href) → <Link> inside FAQ answers ─────────────────── */
function parseAnswer(text: string): React.ReactNode {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <Link
        key={m.index}
        href={m[2]}
        className="text-[#c9a84c] hover:text-white underline underline-offset-2 transition-colors"
      >
        {m[1]}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? <>{parts}</> : text;
}

/* ── FAQ accordion item ──────────────────────────────────────────────── */
function FaqItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  return (
    <details
      className="group border-b border-white/[0.07] py-5 cursor-pointer"
    >
      <summary className="flex items-start justify-between gap-4 list-none select-none">
        <span className="text-white/80 text-[14px] sm:text-[15px] leading-snug tracking-[0.02em] group-open:text-white transition-colors">
          <span className="text-[#c9a84c]/50 text-[11px] tracking-widest mr-3 font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
          {q}
        </span>
        {/* chevron */}
        <svg
          className="w-4 h-4 shrink-0 text-white/30 mt-0.5 transition-transform duration-200 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <p className="mt-4 text-white/50 text-[13px] sm:text-[14px] leading-[1.85] tracking-[0.02em] pl-9">
        {parseAnswer(a)}
      </p>
    </details>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════════ */
export default function ServiceRoutePage({
  params,
}: {
  params: Promise<{ route: string }>;
}) {
  const { route } = use(params);
  const { lang } = useLang();
  const data = getRouteData(route);

  if (!data) notFound();

  /* JSON-LD — Service + FAQPage */
  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.schemaName,
    description: data.schemaDesc,
    url: `https://octoshell.jp/services/${data.slug}`,
    provider: {
      "@type": "Organization",
      "@id": "https://octoshell.jp/#organization",
      name: "Octoshell Co., Ltd.",
      telephone: "+81-47-382-5728",
      email: "info@octoshell.jp",
    },
    areaServed: [
      { "@type": "Country", "name": "Japan" },
      { "@type": "City", "name": "Tokyo" },
    ],
    offers: {
      "@type": "Offer",
      price: data.schemaPrice,
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
      url: `https://octoshell.jp/book`,
    },
  };

  const schemaFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q["en"],
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a["en"],
      },
    })),
  };

  const l = lang as Lang;

  return (
    <main className="min-h-screen bg-[#0c0c0c]">

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <div className="relative bg-[#0c0c0c] pt-[88px] sm:pt-[100px] pb-0 overflow-hidden">
        {/* subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* gold radial glow */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }}
        />

        <Header />

        {/* ── Text over hero ── */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/25 uppercase mb-5">
            <Link href="/" className="hover:text-white/50 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white/50 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/45">{data.badge[l]}</span>
          </nav>

          <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] mb-2.5 uppercase">
            {data.badge[l]}
          </p>
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.10em] sm:tracking-[0.13em] leading-tight max-w-2xl">
            {data.h1[l]}
          </h1>
          <p className="mt-2 text-white/35 text-[12px] tracking-[0.28em] uppercase">
            {data.sub[l]}
          </p>

          {/* Price badge */}
          <div className="mt-6 inline-flex items-center gap-3 border border-[#c9a84c]/30 px-5 py-2.5">
            <svg className="w-3.5 h-3.5 text-[#c9a84c]/70" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
            </svg>
            <span className="text-[#c9a84c] text-[13px] tracking-[0.25em] font-semibold uppercase">
              {l === "en" ? "From " : ""}
              <Price yen={data.schemaPrice} />
              {l === "ja" ? "〜" : l === "zh" ? " 起" : ""}
            </span>
            <span className="text-white/20 text-[10px] tracking-widest uppercase">
              {l === "ja" ? "全込み" : l === "zh" ? "全包" : "All-Inclusive"}
            </span>
          </div>
          <CurrencyNote lang={l} />
        </div>

        {/* ── Hero image ── */}
        <div className="relative w-full aspect-[16/7] sm:aspect-[16/6] overflow-hidden">
          <Image
            src={data.heroImg}
            alt={data.heroAlt}
            fill
            priority
            className="object-cover"
          />
          {/* dark gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/20 to-transparent" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          INTRO + HIGHLIGHTS
      ══════════════════════════════════════════════════ */}
      <section className="bg-[var(--c-body)] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <GoldRule />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Intro paragraph */}
            <div>
              <SectionLabel
                label={l === "ja" ? "サービス概要" : l === "zh" ? "服務概覽" : "Overview"}
              />
              <p className="text-[var(--c-ink)] text-[15px] sm:text-[16px] leading-[1.9] tracking-[0.03em] mb-8">
                {data.intro[l]}
              </p>

              {/* Backlink to tokyoairporttransfer.com — airport routes only */}
              {(data.slug === "haneda-airport-transfer" || data.slug === "narita-airport-transfer") && (
                <p className="text-[var(--c-ink)] text-[15px] sm:text-[16px] leading-[1.9] tracking-[0.03em] mb-8">
                  {l === "ja"
                    ? <>空港送迎の詳細・料金比較は <a href="https://tokyoairporttransfer.com/airport" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline">tokyoairporttransfer.com</a> でもご確認いただけます。</>
                    : l === "zh"
                    ? <>機場接送詳情與價格比較，亦可參閱 <a href="https://tokyoairporttransfer.com/airport" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline">tokyoairporttransfer.com</a>。</>
                    : <>Full pricing and details are also available at <a href="https://tokyoairporttransfer.com/airport" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline">tokyoairporttransfer.com</a>.</>
                  }
                </p>
              )}

              <Link
                href="/book"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="group inline-flex items-center gap-2.5 bg-[#c9a84c] text-[#0c0c0c]
                           text-[12px] sm:text-[13px] font-black tracking-[0.3em] uppercase
                           px-8 py-3.5 sm:py-4 hover:bg-white transition-all duration-200
                           shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_4px_28px_rgba(201,168,76,0.5)]
                           active:scale-110 active:bg-white active:shadow-[0_8px_36px_rgba(201,168,76,0.7)]
                           sm:active:scale-100 sm:active:shadow-[0_4px_28px_rgba(201,168,76,0.5)]"
              >
                {data.cta[l]}
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                  fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Highlights checklist */}
            <div>
              <SectionLabel
                label={l === "ja" ? "サービスの特長" : l === "zh" ? "服務特色" : "Service Highlights"}
              />
              <ul className="space-y-3">
                {data.highlights[l].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-white/75 text-[13px] sm:text-[14px] leading-snug tracking-[0.02em]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BODY CONTENT (paragraphs)
      ══════════════════════════════════════════════════ */}
      <section className="bg-[var(--c-card)] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <GoldRule />
          <SectionLabel
            label={l === "ja" ? "詳細情報" : l === "zh" ? "詳細介紹" : "About This Service"}
          />
          <div className="space-y-6">
            {data.body[l].map((para, i) => (
              <p
                key={i}
                className="text-white/55 text-[14px] sm:text-[15px] leading-[1.95] tracking-[0.02em]"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section className="bg-[var(--c-body)] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <GoldRule />
          <SectionLabel
            label={l === "ja" ? "よくある質問" : l === "zh" ? "常見問題" : "FAQ"}
          />
          <h2 className="text-white text-xl sm:text-2xl font-light tracking-[0.08em] mb-8">
            {l === "ja"
              ? "よくあるご質問"
              : l === "zh"
              ? "常見問題解答"
              : "Frequently Asked Questions"}
          </h2>

          <div>
            {data.faqs.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q[l]}
                a={faq.a[l]}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mb-12" />

          <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] uppercase mb-4">
            {l === "ja" ? "ご予約・お問い合わせ" : l === "zh" ? "預訂與查詢" : "Book & Enquire"}
          </p>
          <h2 className="text-white text-2xl sm:text-3xl font-light tracking-[0.1em] mb-5">
            {l === "ja"
              ? "お客様の移動を、デザインいたします"
              : l === "zh"
              ? "讓我們為您設計每一段旅程"
              : "Your journey, designed around you"}
          </h2>
          <p className="text-white/40 text-[13px] sm:text-[14px] leading-[1.85] tracking-[0.03em] mb-10 max-w-xl mx-auto">
            {l === "ja"
              ? "法人契約、団体様のご案内、およびカスタマイズのご相談は、専任のコンシェルジュが24時間体制で承ります。"
              : l === "zh"
              ? "如需企業長期簽約、大宗活動用車或特殊行程定制，歡迎聯絡我們的奢華出行顧問。"
              : "For corporate accounts, group bookings, or bespoke itinerary planning, connect directly with our private client specialists."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="group inline-flex items-center gap-2.5 bg-[#c9a84c] text-[#0c0c0c]
                         text-[12px] sm:text-[13px] font-black tracking-[0.3em] uppercase
                         px-10 py-4 hover:bg-white transition-all duration-200
                         shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_4px_28px_rgba(201,168,76,0.5)]
                         active:scale-110 active:bg-white active:shadow-[0_8px_36px_rgba(201,168,76,0.7)]
                         sm:active:scale-100 sm:active:shadow-[0_4px_28px_rgba(201,168,76,0.5)]"
            >
              {data.cta[l]}
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/40
                         text-[11px] tracking-[0.22em] uppercase
                         hover:text-white/70 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              {l === "ja" ? "サービス一覧へ" : l === "zh" ? "查看所有服務" : "All Services"}
            </Link>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent mt-12" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
