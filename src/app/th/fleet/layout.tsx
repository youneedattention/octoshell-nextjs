import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'รถ | Octoshell Japan',
  description: 'รถ Toyota Alphard และ HiAce หรูหราสำหรับบริการรับส่งส่วนตัว',
  alternates: { canonical: `${BASE}/th/fleet`, languages: { en: `${BASE}/fleet`, th: `${BASE}/th/fleet` } },
  openGraph: { locale: 'th_TH', url: `${BASE}/th/fleet` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
