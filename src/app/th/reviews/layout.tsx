import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'รีวิวจากลูกค้า | Octoshell Japan',
  description: 'รีวิวจริงจากนักท่องเที่ยวทั่วโลก เพื่อยืนยันคุณภาพบริการของ Octoshell',
  alternates: { canonical: `${BASE}/th/reviews`, languages: { en: `${BASE}/reviews`, th: `${BASE}/th/reviews` } },
  openGraph: { locale: 'th_TH', url: `${BASE}/th/reviews` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
