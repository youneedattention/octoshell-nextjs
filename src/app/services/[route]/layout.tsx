import type { Metadata } from "next";
import { ALL_ROUTE_SLUGS, getRouteData } from "./routeData";

const BASE = "https://octoshell.jp";

/* ── Static params for pre-rendering ────────────────────────────────── */
export function generateStaticParams() {
  return ALL_ROUTE_SLUGS.map((route) => ({ route }));
}

/* ── Per-route metadata ──────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ route: string }>;
}): Promise<Metadata> {
  const { route } = await params;
  const data = getRouteData(route);

  if (!data) {
    return {
      title: "Service | Octoshell Japan",
      description: "Premium private chauffeur services across Japan.",
    };
  }

  const canonicalUrl = `${BASE}/services/${data.slug}`;

  return {
    title: data.metaTitle,
    description: data.metaDesc,
    keywords: data.keywords,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDesc,
      url: canonicalUrl,
      images: [
        {
          url: `https://octoshell.jp${data.ogImage}`,
          width: 1200,
          height: 630,
          alt: data.heroAlt,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDesc,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/* ── Layout wrapper ──────────────────────────────────────────────────── */
export default function ServiceRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
