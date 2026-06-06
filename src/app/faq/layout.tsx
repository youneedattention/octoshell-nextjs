import type { Metadata } from "next";
import { FAQ_FLAT_EN } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ — Japan Private Chauffeur Service | Octoshell Japan",
  description: "Everything you need to know about booking Octoshell Japan — pricing, cancellation policy, airport transfers, luggage, payment methods, and more.",
  alternates: { canonical: "https://octoshell.jp/faq" },
  openGraph: {
    title: "FAQ | Octoshell Japan Private Chauffeur",
    description: "Frequently asked questions about our private chauffeur service in Japan — pricing, airports, vehicles, and booking.",
    url: "https://octoshell.jp/faq",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_FLAT_EN.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a },
  })),
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      {children}
    </>
  );
}
