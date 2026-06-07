import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'เกี่ยวกับ Octoshell | บริการรถพร้อมคนขับระดับพรีเมียมในโตเกียว',
  description: 'เรื่องราวแบรนด์ คุณสมบัติ และปรัชญาการบริการของ Octoshell',
  alternates: { canonical: `${BASE}/th/about`, languages: { en: `${BASE}/about`, th: `${BASE}/th/about` } },
  openGraph: { locale: 'th_TH', url: `${BASE}/th/about` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
