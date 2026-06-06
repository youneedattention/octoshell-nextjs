import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Services | Octoshell Japan 專屬司機服務',
  description: '東京及日本全境專屬司機服務——機場定額接送、按時計費包車、景點觀光、高爾夫接送。',
  alternates: { canonical: '/zh/services' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
