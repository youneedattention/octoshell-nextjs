import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Fleet — Toyota Alphard & Hiace | Octoshell Japan",
  description:
    "Octoshell Japan operates premium Toyota Alphard (up to 6 passengers, 12 suitcases) and Toyota Hiace Grand Cabin (up to 9 passengers, 15 suitcases). Detailed specs, dimensions, and luggage capacity for every configuration.",
  alternates: { canonical: "https://octoshell.jp/vehicles" },
  robots: { index: true, follow: true },
};

export default function VehiclesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
