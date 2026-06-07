import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'จองรถ | Octoshell Japan',
  description: 'จองบริการรถพร้อมคนขับส่วนตัวในโตเกียวและทั่วญี่ปุ่นได้เลย',
  alternates: { canonical: `${BASE}/th/book`, languages: { en: `${BASE}/book`, th: `${BASE}/th/book` } },
  openGraph: { locale: 'th_TH', url: `${BASE}/th/book` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
