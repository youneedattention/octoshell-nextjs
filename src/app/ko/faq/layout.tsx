import type { Metadata } from "next";
import { FAQ_GROUPED } from "@/lib/faq";

const BASE = "https://octoshell.jp";

export const metadata: Metadata = {
  title: "자주 묻는 질문 — 일본 전속 쇼퍼 서비스 | Octoshell Japan",
  description: "Octoshell Japan 예약에 관한 모든 질문——요금, 취소 정책, 공항 이동, 수하물, 결제 방법 등.",
  alternates: {
    canonical: `${BASE}/ko/faq`,
    languages: { en: `${BASE}/faq`, ko: `${BASE}/ko/faq` },
  },
  openGraph: {
    title: "자주 묻는 질문 | Octoshell Japan 쇼퍼",
    description: "일본 전속 쇼퍼 서비스에 관한 자주 묻는 질문——요금, 공항, 차량, 예약 방법.",
    url: `${BASE}/ko/faq`,
    locale: "ko_KR",
  },
};

const FAQ_KO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_GROUPED.ko.flatMap((g) =>
    g.items.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    }))
  ),
};

export default function FaqKoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_KO_SCHEMA) }}
      />
      {children}
    </>
  );
}
