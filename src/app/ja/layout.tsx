import type { Metadata } from 'next';
import { LangProvider } from '@/context/LangContext';

export const metadata: Metadata = {
  alternates: { canonical: '/ja' },
  openGraph: { locale: 'ja_JP', alternateLocale: ['en_US', 'zh_TW', 'ko_KR'] },
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return <LangProvider initialLang="ja">{children}</LangProvider>;
}
