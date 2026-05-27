import type { Metadata } from "next";

const BASE = "https://octoshell.jp";

export const metadata: Metadata = {
  title: "Book a Private Chauffeur in Japan",
  description:
    "Reserve your luxury private chauffeur in Japan online. Airport transfers from Narita (¥25,000) and Haneda (¥20,000), hourly hire, and bespoke tours across Greater Tokyo and Japan. Instant confirmation. Pay by credit card, bank transfer, or cash.",
  keywords: [
    "book private chauffeur Japan",
    "reserve airport transfer Tokyo",
    "book limousine Japan",
    "hire private driver Tokyo",
    "online booking chauffeur Japan",
    "Narita transfer reservation",
    "Haneda pickup booking",
    "日本ハイヤー予約",
    "東京空港送迎予約",
    "日本包車預訂",
  ],
  openGraph: {
    title: "Book Your Private Chauffeur | Octoshell Japan",
    description:
      "Reserve your luxury private chauffeur in Japan. Airport transfers from ¥20,000. Online booking, instant confirmation.",
    url: `${BASE}/book`,
  },
  alternates: {
    canonical: `${BASE}/book`,
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
