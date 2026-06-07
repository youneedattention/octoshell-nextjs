import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'Mentions légales | Octoshell',
  description: 'Mentions légales conformes à la loi japonaise sur les transactions commerciales spécifiées.',
  alternates: { canonical: `${BASE}/fr/law`, languages: { en: `${BASE}/law`, fr: `${BASE}/fr/law` } },
  openGraph: { locale: 'fr_FR', url: `${BASE}/fr/law` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
