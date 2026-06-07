import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'Politique de confidentialité | Octoshell Japan',
  description: 'Politique de protection des données personnelles d\'Octoshell.',
  alternates: { canonical: `${BASE}/fr/privacy`, languages: { en: `${BASE}/privacy`, fr: `${BASE}/fr/privacy` } },
  openGraph: { locale: 'fr_FR', url: `${BASE}/fr/privacy` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
