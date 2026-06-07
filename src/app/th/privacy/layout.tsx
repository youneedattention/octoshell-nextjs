import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัว | Octoshell Japan',
  description: 'นโยบายคุ้มครองข้อมูลส่วนบุคคลของ Octoshell',
  alternates: { canonical: `${BASE}/th/privacy`, languages: { en: `${BASE}/privacy`, th: `${BASE}/th/privacy` } },
  openGraph: { locale: 'th_TH', url: `${BASE}/th/privacy` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
