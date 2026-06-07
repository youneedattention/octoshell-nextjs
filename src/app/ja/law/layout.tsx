import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 | Octoshell',
  description: '特定商取引法に基づく法定事項の記載。',
  alternates: { canonical: `${BASE}/ja/law`, languages: { en: `${BASE}/law`, ja: `${BASE}/ja/law` } },
  openGraph: { locale: 'ja_JP', url: `${BASE}/ja/law` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
