import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: '차량 | Octoshell Japan',
  description: '토요타 알파드 및 하이에이스 럭셔리 전용차 안내. 쾌적한 프라이빗 이동 서비스를 제공합니다.',
  alternates: { canonical: `${BASE}/ko/fleet`, languages: { en: `${BASE}/fleet`, ko: `${BASE}/ko/fleet` } },
  openGraph: { locale: 'ko_KR', url: `${BASE}/ko/fleet` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
