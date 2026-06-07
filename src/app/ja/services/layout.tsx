import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'サービス | Octoshell Japan プライベートチャウファー',
  description: '東京・日本全国のプライベートチャウファーサービス——空港定額送迎、時間制貸切、観光、ゴルフ送迎など。',
  alternates: { canonical: `${BASE}/ja/services` },
  openGraph: { locale: 'ja_JP', url: `${BASE}/ja/services` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
