import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '车队 | Octoshell Japan',
  description: '丰田埃尔法及海狮豪华专车一览，提供舒适私人接送服务。',
  alternates: { canonical: `${BASE}/zh-cn/fleet`, languages: { en: `${BASE}/fleet`, 'zh-CN': `${BASE}/zh-cn/fleet` } },
  openGraph: { locale: 'zh_CN', url: `${BASE}/zh-cn/fleet` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
