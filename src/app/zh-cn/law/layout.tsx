import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '法定事项记载 | Octoshell',
  description: '依日本特定商取引法规定之法定事项记载。',
  alternates: { canonical: `${BASE}/zh-cn/law`, languages: { en: `${BASE}/law`, 'zh-CN': `${BASE}/zh-cn/law` } },
  openGraph: { locale: 'zh_CN', url: `${BASE}/zh-cn/law` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
