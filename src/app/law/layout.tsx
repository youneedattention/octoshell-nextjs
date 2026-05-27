import type { Metadata } from "next";

const BASE = "https://octoshell.jp";

export const metadata: Metadata = {
  title: "Specified Commercial Transactions Act Disclosure",
  description:
    "Octoshell Co., Ltd. (貝八方株式会社) legal disclosure per Japan's Specified Commercial Transactions Act. Licensed private chauffeur service: KAN-JI-RYO-NI No. 1248 (Kanto Transport Bureau). Pricing, cancellation policy, and payment terms.",
  openGraph: {
    title: "Legal Disclosure | Octoshell Japan",
    description:
      "Octoshell Co., Ltd. — Specified Commercial Transactions Act disclosure. Licensed chauffeur service, pricing, and cancellation policy.",
    url: `${BASE}/law`,
  },
  alternates: {
    canonical: `${BASE}/law`,
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default function LawLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
