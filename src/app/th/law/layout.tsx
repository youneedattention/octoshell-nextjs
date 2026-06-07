import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'ข้อกำหนดทางกฎหมาย | Octoshell',
  description: 'ข้อกำหนดตามกฎหมายธุรกรรมพาณิชย์เฉพาะของญี่ปุ่น',
  alternates: { canonical: `${BASE}/th/law`, languages: { en: `${BASE}/law`, th: `${BASE}/th/law` } },
  openGraph: { locale: 'th_TH', url: `${BASE}/th/law` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
