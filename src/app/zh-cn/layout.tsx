import type { Metadata } from 'next';
import { LangProvider } from '@/context/LangContext';
export const metadata: Metadata = {
  alternates: { canonical: '/zh-cn' },
  openGraph: { locale: 'zh_CN', alternateLocale: ['en_US', 'ja_JP', 'zh_TW', 'ko_KR'] },
};
export default function ZhCnLayout({ children }: { children: React.ReactNode }) {
  return <LangProvider initialLang="zh-cn">{children}</LangProvider>;
}
