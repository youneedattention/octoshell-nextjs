import type { Metadata } from "next";

const BASE = "https://octoshell.jp";

export const metadata: Metadata = {
  title: "Private Chauffeur Services Japan | Airport, Hourly Hire & Tours",
  description:
    "9 premium private chauffeur services across Japan: airport transfers (Narita ¥25,000 · Haneda ¥20,000), hourly hire, one-way transfers, luxury photo tours, golf, bespoke sightseeing, MICE events, outdoor & hiking, and ceremonial transportation. Toyota Alphard & Hiace fleet.",
  keywords: [
    "Japan airport transfer",
    "Narita airport private transfer",
    "Haneda airport chauffeur",
    "hourly hire chauffeur Tokyo",
    "Tokyo to Hakone private car",
    "Tokyo to Fuji private transfer",
    "golf transfer Japan",
    "MICE transportation Tokyo",
    "wedding chauffeur Japan",
    "luxury sightseeing tour Japan",
    "kimono photo shoot chauffeur Tokyo",
    "private hiking transfer Japan",
    "空港送迎 東京",
    "時間制ハイヤー 東京",
    "機場接送 日本",
  ],
  openGraph: {
    title: "Private Chauffeur Services Japan | Octoshell",
    description:
      "Airport transfers, hourly hire, sightseeing, golf, MICE & ceremonial chauffeur services across Japan. Flat-rate pricing from ¥20,000.",
    url: `${BASE}/services`,
    images: [
      {
        url: "https://octoshell.jp/wp-content/uploads/2024/10/Home2.png",
        width: 1200,
        height: 630,
        alt: "Octoshell Japan Private Chauffeur Services",
      },
    ],
  },
  alternates: {
    canonical: `${BASE}/services`,
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
