import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '预约 | Octoshell Japan',
  description: '立即预订东京及日本全境专属司机服务。',
  alternates: { canonical: `${BASE}/zh-cn/book`, languages: { en: `${BASE}/book`, 'zh-CN': `${BASE}/zh-cn/book` } },
  openGraph: { locale: 'zh_CN', url: `${BASE}/zh-cn/book` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
