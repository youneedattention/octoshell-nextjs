import type { Metadata } from 'next';
const BASE = "https://octoshell.jp";
export const metadata: Metadata = {
  title: 'Services | Octoshell Japan Chauffeur Privé',
  description: 'Service de chauffeur privé à Tokyo et dans tout le Japon — transferts aéroport, location à l\'heure, visites touristiques, golf.',
  alternates: { canonical: `${BASE}/fr/services` },
  openGraph: { locale: 'fr_FR', url: `${BASE}/fr/services` },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
