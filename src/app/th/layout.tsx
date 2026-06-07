import type { Metadata } from 'next';
import { LangProvider } from '@/context/LangContext';
export const metadata: Metadata = {
  alternates: { canonical: '/th' },
  openGraph: { locale: 'th_TH', alternateLocale: ['en_US', 'ja_JP', 'zh_TW', 'ko_KR'] },
};
export default function ThLayout({ children }: { children: React.ReactNode }) {
  return <LangProvider initialLang="th">{children}</LangProvider>;
}
