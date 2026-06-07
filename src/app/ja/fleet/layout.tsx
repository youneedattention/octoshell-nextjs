import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '車種 | Octoshell Japan',
  description: 'トヨタ・アルファード及びハイエースの豪華専用車をご案内。快適なプライベート送迎を提供します。',
  alternates: { canonical: `${BASE}/ja/fleet`, languages: { en: `${BASE}/fleet`, ja: `${BASE}/ja/fleet` } },
  openGraph: { locale: 'ja_JP', url: `${BASE}/ja/fleet` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
