import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'Octoshell 简介 | 东京顶级专属司机服务',
  description: 'Octoshell 品牌故事、资质认证及服务理念。',
  alternates: { canonical: `${BASE}/zh-cn/about`, languages: { en: `${BASE}/about`, 'zh-CN': `${BASE}/zh-cn/about` } },
  openGraph: { locale: 'zh_CN', url: `${BASE}/zh-cn/about` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
