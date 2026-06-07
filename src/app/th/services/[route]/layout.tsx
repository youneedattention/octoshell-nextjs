import type { Metadata } from "next";
import { ALL_ROUTE_SLUGS, getRouteData } from "@/app/services/[route]/routeData";
const BASE = "https://octoshell.jp";
export function generateStaticParams() { return ALL_ROUTE_SLUGS.map((route) => ({ route })); }
export async function generateMetadata({ params }: { params: Promise<{ route: string }> }): Promise<Metadata> {
  const { route } = await params;
  const data = getRouteData(route);
  if (!data) return { title: "Service | Octoshell Japan" };
  return {
    title: data.metaTitle + " | ภาษาไทย",
    description: data.metaDesc,
    alternates: { canonical: `${BASE}/th/services/${data.slug}`, languages: { en: `${BASE}/services/${data.slug}`, th: `${BASE}/th/services/${data.slug}` } },
    openGraph: { title: data.metaTitle, description: data.metaDesc, url: `${BASE}/th/services/${data.slug}`, locale: "th_TH" },
  };
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
