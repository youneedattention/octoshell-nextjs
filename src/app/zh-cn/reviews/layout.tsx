import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '客户评价 | Octoshell Japan',
  description: '来自全球旅客的真实评价，了解Octoshell的服务品质。',
  alternates: { canonical: `${BASE}/zh-cn/reviews`, languages: { en: `${BASE}/reviews`, 'zh-CN': `${BASE}/zh-cn/reviews` } },
  openGraph: { locale: 'zh_CN', url: `${BASE}/zh-cn/reviews` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
