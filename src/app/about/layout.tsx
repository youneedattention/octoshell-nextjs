import type { Metadata } from "next";

const BASE = "https://octoshell.jp";

export const metadata: Metadata = {
  title: "About Octoshell | Japan Private Chauffeur Story & FAQ",
  description:
    "Learn about Octoshell, Japan's premier licensed private chauffeur company (KAN-JI-RYO-NI No. 1248). Brand story, vehicle fleet (Toyota Alphard & Hiace), and comprehensive FAQ covering pricing, cancellation, payment, and service policies.",
  keywords: [
    "Octoshell Japan about",
    "Japan private chauffeur company",
    "licensed chauffeur Japan",
    "Toyota Alphard hire Japan",
    "Toyota Hiace charter Japan",
    "Japan chauffeur FAQ",
    "private driver Japan cancellation policy",
    "Japan chauffeur pricing",
    "日本ハイヤー会社",
    "貝八方株式会社",
  ],
  openGraph: {
    title: "About Octoshell | Japan's Premier Private Chauffeur",
    description:
      "Octoshell's brand story, fleet, and FAQ. Licensed private chauffeur service (KAN-JI-RYO-NI No. 1248) serving Tokyo and all of Japan.",
    url: `${BASE}/about`,
  },
  alternates: {
    canonical: `${BASE}/about`,
  },
};

/* ── FAQPage JSON-LD ─────────────────────────────────────────────────── */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What vehicles does Octoshell provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Octoshell exclusively operates Toyota Alphard (maximum 5 passengers, luxury MPV) and Toyota Hiace (maximum 9 passengers, luxury van). No standard taxis or economy vehicles are used.",
      },
    },
    {
      "@type": "Question",
      "name": "How much does a private airport transfer from Tokyo to Narita cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Toyota Alphard: ¥25,000 (tax included). Toyota Hiace: ¥28,000 (tax included). Prices are flat-rate and include all highway tolls, up to 1 hour of complimentary waiting, and meet-and-greet service with a personalized name board in the arrivals hall.",
      },
    },
    {
      "@type": "Question",
      "name": "How much does a private airport transfer from Tokyo to Haneda cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Toyota Alphard: ¥20,000 (tax included). Toyota Hiace: ¥22,000 (tax included). All-inclusive flat-rate with highway tolls, waiting time, and meet-and-greet service.",
      },
    },
    {
      "@type": "Question",
      "name": "Are highway tolls, parking fees, and chauffeur accommodation included in the price?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All standard highway tolls, parking fees, deadhead tolls, and chauffeur overnight accommodation expenses for the scheduled itinerary are fully included in the quoted price. No hidden fees are added unless the passenger requests route modifications during the journey.",
      },
    },
    {
      "@type": "Question",
      "name": "What is Octoshell's cancellation policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Up to 48 hours before pickup: Free of charge (100% refund). Between 24 and 48 hours before pickup: 50% of the total estimated quote. Within 24 hours or no-show: 100% of the total estimated quote. Cancellation fees are waived if the flight is officially cancelled by the airline, provided Octoshell is notified immediately.",
      },
    },
    {
      "@type": "Question",
      "name": "Is airport meet-and-greet and name-board service included?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The personalized name-board meet-and-greet service at the airport arrivals hall is complimentary (free of charge) for all airport transfers. Child safety seats are also provided free of charge upon advance request.",
      },
    },
    {
      "@type": "Question",
      "name": "What payment methods does Octoshell accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Octoshell accepts credit card (Visa, Mastercard, American Express, JCB, Diners Club, Discover) via secure online payment, bank transfer (upfront payment), and cash payment settled upon drop-off.",
      },
    },
    {
      "@type": "Question",
      "name": "Does Octoshell operate outside Tokyo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Octoshell operates nationwide across Japan, covering Hakone, Mount Fuji, Izu Peninsula, Nikko, Kyoto, Osaka, and all major destinations beyond Greater Tokyo.",
      },
    },
    {
      "@type": "Question",
      "name": "Can Octoshell transport golf bags and large luggage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Toyota Alphard and Hiace both offer ample cargo space for golf bags, ski equipment, heavy mountaineering gear, and large suitcases. Golf club transport to courses in the Kanto region is a dedicated service.",
      },
    },
    {
      "@type": "Question",
      "name": "Is Octoshell a licensed chauffeur service in Japan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Octoshell (貝八方株式会社) holds a Chartered Executive Chauffeur Service License issued by the Kanto Transport Bureau (KAN-JI-RYO-NI No. 1248), and an Official Tariff and Fare Approval (KAN-JI-RYO-NI No. 388). All vehicles carry green license plates as required by Japanese law.",
      },
    },
  ],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      {children}
    </>
  );
}
