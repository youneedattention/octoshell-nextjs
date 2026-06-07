import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'プライバシーポリシー | Octoshell Japan',
  description: 'Octoshellの個人情報保護方針。',
  alternates: { canonical: `${BASE}/ja/privacy`, languages: { en: `${BASE}/privacy`, ja: `${BASE}/ja/privacy` } },
  openGraph: { locale: 'ja_JP', url: `${BASE}/ja/privacy` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
