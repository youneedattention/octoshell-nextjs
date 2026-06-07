import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '법적 고지 | Octoshell',
  description: '일본 특정상거래법에 따른 법적 사항 기재.',
  alternates: { canonical: `${BASE}/ko/law`, languages: { en: `${BASE}/law`, ko: `${BASE}/ko/law` } },
  openGraph: { locale: 'ko_KR', url: `${BASE}/ko/law` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
