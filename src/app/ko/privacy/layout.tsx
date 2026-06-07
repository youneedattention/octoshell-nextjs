import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '개인정보처리방침 | Octoshell Japan',
  description: 'Octoshell 개인정보 보호 방침.',
  alternates: { canonical: `${BASE}/ko/privacy`, languages: { en: `${BASE}/privacy`, ko: `${BASE}/ko/privacy` } },
  openGraph: { locale: 'ko_KR', url: `${BASE}/ko/privacy` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
