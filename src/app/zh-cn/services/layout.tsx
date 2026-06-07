import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '服务 | Octoshell Japan 专属司机',
  description: '东京及日本全境专属司机服务——机场定额接送、时段包车、景点观光、高尔夫接送等。',
  alternates: { canonical: `${BASE}/zh-cn/services` },
  openGraph: { locale: 'zh_CN', url: `${BASE}/zh-cn/services` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
