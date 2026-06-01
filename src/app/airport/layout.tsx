import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tokyo Airport Transfer — Private Chauffeur | Octoshell Japan",
  description:
    "Flat-rate private airport transfers between Tokyo city and Haneda (HND) or Narita (NRT) airports. Toyota Alphard from ¥20,000. Real-time flight tracking, 90-min free waiting, Meet & Greet included. Book online in 2 minutes.",
  keywords: [
    "Tokyo airport transfer",
    "Haneda airport transfer",
    "Narita airport transfer",
    "Tokyo private chauffeur",
    "HND NRT limo service",
    "Japan airport taxi",
    "Tokyo airport shuttle",
    "private car Tokyo airport",
    "空港送迎 東京",
    "羽田空港 送迎",
    "成田空港 送迎",
    "東京 機場接送",
  ],
  openGraph: {
    title: "Tokyo Airport Transfer — Private Chauffeur from ¥20,000",
    description:
      "Premium flat-rate private transfers between Tokyo and Haneda / Narita airports. Flight tracking, free waiting, Meet & Greet — all included.",
    url: "https://tokyoairporttransfer.com",
    siteName: "Tokyo Airport Transfer by Octoshell",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tokyo Airport Transfer — Private Chauffeur from ¥20,000",
    description:
      "Flat-rate private transfers. Haneda from ¥20,000 · Narita from ¥25,000. Flight tracked, Meet & Greet included.",
  },
  alternates: {
    canonical: "https://tokyoairporttransfer.com/airport",
    languages: {
      "en-US": "https://tokyoairporttransfer.com",
      "ja-JP": "https://octoshell.jp/services/airport",
      "zh-TW": "https://octoshell.jp/services/airport",
    },
  },
  robots: { index: true, follow: true },
};

export default function AirportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
