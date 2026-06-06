import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '關於 Octoshell | 東京頂級司機服務',
  description: 'Octoshell 品牌故事、資質認證及服務理念。',
  alternates: { canonical: '/zh/about', languages: { 'en': '/about', 'zh-TW': '/zh/about' } },
  openGraph: { locale: 'zh_TW', url: '/zh/about' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
