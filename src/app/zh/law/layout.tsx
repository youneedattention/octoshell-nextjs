import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '法定事項記載 | Octoshell',
  description: '依日本特定商取引法規定之法定事項記載。',
  alternates: { canonical: '/zh/law', languages: { 'en': '/law', 'zh-TW': '/zh/law' } },
  openGraph: { locale: 'zh_TW', url: '/zh/law' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
