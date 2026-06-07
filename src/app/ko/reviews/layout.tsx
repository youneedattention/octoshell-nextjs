import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '고객 후기 | Octoshell Japan',
  description: '전 세계 여행객의 실제 후기로 Octoshell의 서비스 품질을 확인하세요.',
  alternates: { canonical: `${BASE}/ko/reviews`, languages: { en: `${BASE}/reviews`, ko: `${BASE}/ko/reviews` } },
  openGraph: { locale: 'ko_KR', url: `${BASE}/ko/reviews` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
