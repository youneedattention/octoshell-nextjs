import type { Metadata } from "next";
import { ALL_ROUTE_SLUGS, getRouteData } from "@/app/services/[route]/routeData";
const BASE = "https://octoshell.jp";
export function generateStaticParams() { return ALL_ROUTE_SLUGS.map((route) => ({ route })); }
export async function generateMetadata({ params }: { params: Promise<{ route: string }> }): Promise<Metadata> {
  const { route } = await params;
  const data = getRouteData(route);
  if (!data) return { title: "Service | Octoshell Japan" };
  return {
    title: data.metaTitle + " | Français",
    description: data.metaDesc,
    alternates: { canonical: `${BASE}/fr/services/${data.slug}`, languages: { en: `${BASE}/services/${data.slug}`, fr: `${BASE}/fr/services/${data.slug}` } },
    openGraph: { title: data.metaTitle, description: data.metaDesc, url: `${BASE}/fr/services/${data.slug}`, locale: "fr_FR" },
  };
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
