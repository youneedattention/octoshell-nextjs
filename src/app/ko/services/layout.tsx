import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '서비스 | Octoshell Japan 전속 쇼퍼',
  description: '도쿄 및 일본 전국 전속 쇼퍼 서비스——공항 이동, 시간제 전세, 관광, 골프 이동 등.',
  alternates: { canonical: `${BASE}/ko/services` },
  openGraph: { locale: 'ko_KR', url: `${BASE}/ko/services` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
