import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'Avis clients | Octoshell Japan',
  description: 'Avis authentiques de voyageurs du monde entier sur la qualité du service Octoshell.',
  alternates: { canonical: `${BASE}/fr/reviews`, languages: { en: `${BASE}/reviews`, fr: `${BASE}/fr/reviews` } },
  openGraph: { locale: 'fr_FR', url: `${BASE}/fr/reviews` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
