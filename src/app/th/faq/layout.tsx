import type { Metadata } from "next";
import { FAQ_GROUPED } from "@/lib/faq";
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย — บริการรถพร้อมคนขับส่วนตัวในญี่ปุ่น | Octoshell Japan",
  description: "คำถามทั้งหมดเกี่ยวกับการจอง Octoshell Japan — ราคา นโยบายยกเลิก รับส่งสนามบิน กระเป๋า วิธีชำระเงิน",
  alternates: { canonical: `${BASE}/th/faq`, languages: { en: `${BASE}/faq`, th: `${BASE}/th/faq` } },
  openGraph: { title: "คำถามที่พบบ่อย | Octoshell Japan", description: "คำถามที่พบบ่อยเกี่ยวกับบริการรถพร้อมคนขับในญี่ปุ่น", url: `${BASE}/th/faq`, locale: "th_TH" },
};
const FAQ_TH_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_GROUPED.th.flatMap((g) => g.items.map(({ q, a }) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } }))),
};
export default function FaqThLayout({ children }: { children: React.ReactNode }) {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_TH_SCHEMA) }} />{children}</>;
}
