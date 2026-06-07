import type { Metadata } from 'next';
import { LangProvider } from '@/context/LangContext';

export const metadata: Metadata = {
  alternates: { canonical: '/ko' },
  openGraph: { locale: 'ko_KR', alternateLocale: ['en_US', 'ja_JP', 'zh_TW'] },
};

export default function KoLayout({ children }: { children: React.ReactNode }) {
  return <LangProvider initialLang="ko">{children}</LangProvider>;
}
