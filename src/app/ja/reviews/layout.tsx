import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'お客様の声 | Octoshell Japan',
  description: '世界中のお客様からの真のレビューで、Octoshellのサービス品質をご確認ください。',
  alternates: { canonical: `${BASE}/ja/reviews`, languages: { en: `${BASE}/reviews`, ja: `${BASE}/ja/reviews` } },
  openGraph: { locale: 'ja_JP', url: `${BASE}/ja/reviews` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
