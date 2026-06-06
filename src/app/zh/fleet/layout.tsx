import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '車隊',
  description: 'Toyota Alphard 及 Hiace 豪華專車一覽，提供舒適私人接送服務。',
  alternates: { canonical: '/zh/fleet', languages: { 'en': '/fleet', 'zh-TW': '/zh/fleet' } },
  openGraph: { locale: 'zh_TW', url: '/zh/fleet' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
