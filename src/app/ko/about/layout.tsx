import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'Octoshell 소개 | 도쿄 프리미엄 쇼퍼 서비스',
  description: 'Octoshell 브랜드 스토리, 자격 인증, 서비스 철학을 소개합니다.',
  alternates: { canonical: `${BASE}/ko/about`, languages: { en: `${BASE}/about`, ko: `${BASE}/ko/about` } },
  openGraph: { locale: 'ko_KR', url: `${BASE}/ko/about` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
