import type { Metadata } from "next";

const BASE = "https://octoshell.jp";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Octoshell Japan (貝八方株式会社) privacy policy. How we collect, use, and protect your personal data in accordance with Japanese personal information protection laws.",
  openGraph: {
    title: "Privacy Policy | Octoshell Japan",
    description:
      "Octoshell Japan's privacy and personal data protection policy.",
    url: `${BASE}/privacy`,
  },
  alternates: {
    canonical: `${BASE}/privacy`,
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
