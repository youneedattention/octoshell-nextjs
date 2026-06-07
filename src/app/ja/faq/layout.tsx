import type { Metadata } from "next";
import { FAQ_GROUPED } from "@/lib/faq";

const BASE = "https://octoshell.jp";

export const metadata: Metadata = {
  title: "よくある質問 — 日本プライベートチャウファーサービス | Octoshell Japan",
  description: "Octoshell Japanのご予約に関するよくある質問——料金、キャンセルポリシー、空港送迎、お荷物、お支払い方法など。",
  alternates: {
    canonical: `${BASE}/ja/faq`,
    languages: { en: `${BASE}/faq`, ja: `${BASE}/ja/faq` },
  },
  openGraph: {
    title: "よくある質問 | Octoshell Japan チャウファー",
    description: "日本プライベートチャウファーサービスに関するよくある質問——料金・空港・車種・ご予約方法。",
    url: `${BASE}/ja/faq`,
    locale: "ja_JP",
  },
};

const FAQ_JA_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_GROUPED.ja.flatMap((g) =>
    g.items.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    }))
  ),
};

export default function FaqJaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JA_SCHEMA) }}
      />
      {children}
    </>
  );
}
