import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '預約 | Octoshell Japan',
  description: '立即預訂東京及日本全境專屬司機服務。',
  alternates: { canonical: '/zh/book', languages: { 'en': '/book', 'zh-TW': '/zh/book' } },
  openGraph: { locale: 'zh_TW', url: '/zh/book' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
