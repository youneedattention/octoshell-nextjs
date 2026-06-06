import type { Metadata } from "next";
import { FAQ_GROUPED } from "@/lib/faq";

const BASE = "https://octoshell.jp";

export const metadata: Metadata = {
  title: "常見問題 — 日本專屬司機服務 | Octoshell Japan",
  description: "關於預訂 Octoshell Japan 的所有問題解答——費用、取消政策、機場接送、行李、付款方式等。",
  alternates: {
    canonical: `${BASE}/zh/faq`,
    languages: { en: `${BASE}/faq`, "zh-TW": `${BASE}/zh/faq` },
  },
  openGraph: {
    title: "常見問題 | Octoshell Japan 專屬司機",
    description: "關於日本專屬司機服務的常見問題——費用、機場、車型及預訂方式。",
    url: `${BASE}/zh/faq`,
    locale: "zh_TW",
  },
};

const FAQ_ZH_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_GROUPED.zh.flatMap((g) =>
    g.items.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    }))
  ),
};

export default function FaqZhLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_ZH_SCHEMA) }}
      />
      {children}
    </>
  );
}
