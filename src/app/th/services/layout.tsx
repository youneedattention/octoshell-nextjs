import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'บริการ | Octoshell Japan รถพร้อมคนขับส่วนตัว',
  description: 'บริการรถพร้อมคนขับส่วนตัวในโตเกียวและทั่วญี่ปุ่น — รับส่งสนามบิน เช่าเหมาชั่วโมง ท่องเที่ยว กอล์ฟ',
  alternates: { canonical: `${BASE}/th/services` },
  openGraph: { locale: 'th_TH', url: `${BASE}/th/services` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
