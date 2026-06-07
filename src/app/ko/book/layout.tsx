import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '예약 | Octoshell Japan',
  description: '도쿄 및 일본 전국 전속 쇼퍼 서비스를 지금 바로 예약하세요.',
  alternates: { canonical: `${BASE}/ko/book`, languages: { en: `${BASE}/book`, ko: `${BASE}/ko/book` } },
  openGraph: { locale: 'ko_KR', url: `${BASE}/ko/book` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
