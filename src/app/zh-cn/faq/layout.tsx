import type { Metadata } from "next";
import { FAQ_GROUPED } from "@/lib/faq";
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: "常见问题 — 日本专属司机服务 | Octoshell Japan",
  description: "关于预订Octoshell Japan的所有问题解答——费用、取消政策、机场接送、行李、付款方式等。",
  alternates: { canonical: `${BASE}/zh-cn/faq`, languages: { en: `${BASE}/faq`, 'zh-CN': `${BASE}/zh-cn/faq` } },
  openGraph: { title: "常见问题 | Octoshell Japan 专属司机", description: "日本专属司机服务常见问题——费用、机场、车型及预订方式。", url: `${BASE}/zh-cn/faq`, locale: "zh_CN" },
};
const FAQ_ZHCN_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_GROUPED["zh-cn"].flatMap((g) => g.items.map(({ q, a }) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } }))),
};
export default function FaqZhCnLayout({ children }: { children: React.ReactNode }) {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_ZHCN_SCHEMA) }} />{children}</>;
}
