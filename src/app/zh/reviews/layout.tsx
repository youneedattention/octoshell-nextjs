import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '客戶評價 | Octoshell Japan',
  description: '來自全球旅客的真實評價，了解 Octoshell 的服務品質。',
  alternates: { canonical: '/zh/reviews', languages: { 'en': '/reviews', 'zh-TW': '/zh/reviews' } },
  openGraph: { locale: 'zh_TW', url: '/zh/reviews' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
