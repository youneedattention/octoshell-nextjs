import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '隱私政策 | Octoshell Japan',
  description: 'Octoshell 個人資訊保護方針。',
  alternates: { canonical: '/zh/privacy', languages: { 'en': '/privacy', 'zh-TW': '/zh/privacy' } },
  openGraph: { locale: 'zh_TW', url: '/zh/privacy' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
