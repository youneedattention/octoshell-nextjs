import type { Metadata } from 'next';
import { LangProvider } from '@/context/LangContext';

export const metadata: Metadata = {
  alternates: { canonical: '/zh' },
  openGraph: { locale: 'zh_TW', alternateLocale: ['en_US', 'ja_JP'] },
};

export default function ZhLayout({ children }: { children: React.ReactNode }) {
  return <LangProvider initialLang="zh">{children}</LangProvider>;
}
