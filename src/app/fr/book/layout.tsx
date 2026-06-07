import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'Réserver | Octoshell Japan',
  description: 'Réservez dès maintenant votre chauffeur privé à Tokyo et dans tout le Japon.',
  alternates: { canonical: `${BASE}/fr/book`, languages: { en: `${BASE}/book`, fr: `${BASE}/fr/book` } },
  openGraph: { locale: 'fr_FR', url: `${BASE}/fr/book` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
