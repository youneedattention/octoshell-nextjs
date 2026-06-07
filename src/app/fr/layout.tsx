import type { Metadata } from 'next';
import { LangProvider } from '@/context/LangContext';
export const metadata: Metadata = {
  alternates: { canonical: '/fr' },
  openGraph: { locale: 'fr_FR', alternateLocale: ['en_US', 'ja_JP', 'zh_TW', 'ko_KR'] },
};
export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <LangProvider initialLang="fr">{children}</LangProvider>;
}
