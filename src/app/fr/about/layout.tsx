import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'À propos d\'Octoshell | Service de Chauffeur Privé à Tokyo',
  description: 'L\'histoire de la marque Octoshell, nos certifications et notre philosophie de service.',
  alternates: { canonical: `${BASE}/fr/about`, languages: { en: `${BASE}/about`, fr: `${BASE}/fr/about` } },
  openGraph: { locale: 'fr_FR', url: `${BASE}/fr/about` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
