import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'Flotte | Octoshell Japan',
  description: 'Toyota Alphard et HiAce de luxe pour un service de transport privé confortable.',
  alternates: { canonical: `${BASE}/fr/fleet`, languages: { en: `${BASE}/fleet`, fr: `${BASE}/fr/fleet` } },
  openGraph: { locale: 'fr_FR', url: `${BASE}/fr/fleet` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
