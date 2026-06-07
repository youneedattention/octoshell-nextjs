import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '隐私政策 | Octoshell Japan',
  description: 'Octoshell个人信息保护方针。',
  alternates: { canonical: `${BASE}/zh-cn/privacy`, languages: { en: `${BASE}/privacy`, 'zh-CN': `${BASE}/zh-cn/privacy` } },
  openGraph: { locale: 'zh_CN', url: `${BASE}/zh-cn/privacy` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
