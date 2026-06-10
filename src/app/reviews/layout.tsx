import type { Metadata } from "next";
import { REVIEWS, RATING_VALUE_STR, REVIEW_COUNT } from "@/lib/reviews";

const BASE = "https://octoshell.jp";

export const metadata: Metadata = {
  title: "Client Reviews — Octoshell Japan Private Chauffeur",
  description:
    "Verified client reviews for Octoshell Japan private chauffeur service. Rated 4.9/5 for cleanliness, punctuality, hospitality, driving comfort and value.",
  alternates: { canonical: `${BASE}/reviews` },
  robots: { index: true, follow: true, noimageindex: true },
  openGraph: {
    title: "Client Reviews | Octoshell Japan",
    description: "See what our clients say about Octoshell Japan private chauffeur service.",
    url: `${BASE}/reviews`,
  },
};

const REVIEW_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE}/#localbusiness`,
  "name": "Octoshell Co., Ltd.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": RATING_VALUE_STR,
    "reviewCount": String(REVIEW_COUNT),
    "bestRating": "5",
    "worstRating": "1",
  },
  "review": REVIEWS.map((r) => ({
    "@type": "Review",
    "author": { "@type": "Person", "name": r.name },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": String(r.rating ?? 5),
      "bestRating": "5",
    },
    "reviewBody": r.text,
    "datePublished": r.dateISO,
  })),
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(REVIEW_SCHEMA) }}
      />
      {children}
    </>
  );
}
