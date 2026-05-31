import type { Metadata } from "next";

const BASE = "https://octoshell.jp";

export const metadata: Metadata = {
  title: "Client Reviews — Octoshell Japan Private Chauffeur",
  description:
    "Verified client reviews for Octoshell Japan private chauffeur service. Rated 4.9/5 for cleanliness, punctuality, hospitality, driving comfort and value.",
  alternates: { canonical: `${BASE}/reviews` },
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
    "ratingValue": "4.9",
    "reviewCount": "3",
    "bestRating": "5",
    "worstRating": "1",
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "J. K." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Ryu san was a very nice driver. Well-dressed and polite, and drove very smoothly.",
      "datePublished": "2025-05",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Michael Smith" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Mr. Wang was also very courteous and cooperative. It was a great help throughout the day.",
      "datePublished": "2025-04",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Evelyn" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Driver Du-san is so wonderful. He responded to every request. I was very happy to work with him.",
      "datePublished": "2025-03",
    },
  ],
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
