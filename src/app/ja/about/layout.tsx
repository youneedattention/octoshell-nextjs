import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'Octoshellについて | 東京プレミアムチャウファーサービス',
  description: 'Octoshellのブランドストーリー、資格認定、サービス理念をご紹介します。',
  alternates: { canonical: `${BASE}/ja/about`, languages: { en: `${BASE}/about`, ja: `${BASE}/ja/about` } },
  openGraph: { locale: 'ja_JP', url: `${BASE}/ja/about` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
