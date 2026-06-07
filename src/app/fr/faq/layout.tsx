import type { Metadata } from "next";
import { FAQ_GROUPED } from "@/lib/faq";
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: "FAQ — Service de Chauffeur Privé au Japon | Octoshell Japan",
  description: "Toutes les réponses sur la réservation Octoshell Japan — tarifs, annulation, transferts aéroport, bagages, paiement.",
  alternates: { canonical: `${BASE}/fr/faq`, languages: { en: `${BASE}/faq`, fr: `${BASE}/fr/faq` } },
  openGraph: { title: "FAQ | Octoshell Japan Chauffeur", description: "Questions fréquentes sur le service de chauffeur privé au Japon.", url: `${BASE}/fr/faq`, locale: "fr_FR" },
};
const FAQ_FR_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_GROUPED.fr.flatMap((g) => g.items.map(({ q, a }) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } }))),
};
export default function FaqFrLayout({ children }: { children: React.ReactNode }) {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_FR_SCHEMA) }} />{children}</>;
}
