import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'ご予約 | Octoshell Japan',
  description: '東京・日本全国のプライベートチャウファーサービスを今すぐご予約ください。',
  alternates: { canonical: `${BASE}/ja/book`, languages: { en: `${BASE}/book`, ja: `${BASE}/ja/book` } },
  openGraph: { locale: 'ja_JP', url: `${BASE}/ja/book` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
