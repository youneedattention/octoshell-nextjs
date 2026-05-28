import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { LangProvider } from "@/context/LangContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

/* ── Canonical base URL (update when custom domain is live) ─────────── */
const BASE = "https://octoshell.jp";
const OG_IMAGE = "https://octoshell.jp/wp-content/uploads/2024/10/Home2.png";

/* ── Root metadata ──────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(BASE),

  title: {
    default: "Octoshell Japan | Private Chauffeur & Luxury Transfer Service",
    template: "%s | Octoshell Japan",
  },

  description:
    "Japan's premier private chauffeur service. Luxury airport transfers from Narita (¥25,000) & Haneda (¥20,000), hourly hire, bespoke sightseeing, golf, MICE events, and ceremonial transportation. Licensed Toyota Alphard & Hiace fleet serving Greater Tokyo and all of Japan.",

  keywords: [
    "Japan private chauffeur",
    "private chauffeur Tokyo",
    "Tokyo airport transfer",
    "Narita airport transfer",
    "Haneda airport transfer",
    "luxury car service Japan",
    "private transfer Japan",
    "Japan limousine service",
    "hire car with driver Japan",
    "private driver Tokyo",
    "Tokyo to Hakone transfer",
    "Tokyo to Fuji transfer",
    "Japan hire car",
    "東京ハイヤー",
    "東京 空港送迎",
    "日本ハイヤーサービス",
    "日本包車服務",
    "東京私人司機",
    "日本豪華轎車服務",
    "Octoshell",
    "貝八方",
  ],

  authors: [{ name: "Octoshell Co., Ltd.", url: BASE }],
  creator: "Octoshell Co., Ltd.",
  publisher: "Octoshell Co., Ltd.",

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ja_JP", "zh_TW"],
    url: BASE,
    siteName: "Octoshell Japan",
    title: "Octoshell Japan | Private Chauffeur & Luxury Transfer Service",
    description:
      "Japan's premier private chauffeur service. Airport transfers, hourly hire, sightseeing, golf, and MICE transportation. Toyota Alphard & Hiace fleet. Serving Tokyo and all of Japan.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Octoshell Japan — Premium Private Chauffeur Service",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Octoshell Japan | Private Chauffeur & Luxury Transfer",
    description:
      "Japan's premier private chauffeur. Airport transfers, hourly hire & bespoke tours across Tokyo and Japan.",
    images: [OG_IMAGE],
  },

  alternates: {
    canonical: BASE,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    // Add Google Search Console / Bing verification tokens here when available
    // google: "xxxx",
    // other: { "msvalidate.01": "xxxx" },
  },
};

/* ── Organization + LocalBusiness + WebSite JSON-LD ────────────────── */
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      "name": "Octoshell Co., Ltd.",
      "alternateName": ["貝八方株式会社", "Octoshell Japan", "Octoshell"],
      "url": BASE,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE}/icon.png`,
        "width": 512,
        "height": 512,
      },
      "image": OG_IMAGE,
      "description":
        "Japan's premier private chauffeur and luxury ground transportation company. Licensed chartered executive chauffeur service (KAN-JI-RYO-NI No. 1248, Kanto Transport Bureau) based in Greater Tokyo, serving all of Japan.",
      "foundingLocation": { "@type": "Place", "name": "Tokyo, Japan" },
      "foundingDate": "2024",
      "legalName": "貝八方株式会社",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+81-47-382-5728",
        "email": "info@octoshell.jp",
        "contactType": "reservations",
        "availableLanguage": ["English", "Japanese", "Chinese"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
          ],
          "opens": "10:00",
          "closes": "17:00",
        },
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Matsudo Dai-Hachi Mansion 103, 618-1 Kamihongo",
        "addressLocality": "Matsudo",
        "addressRegion": "Chiba",
        "postalCode": "271-0064",
        "addressCountry": "JP",
      },
      "sameAs": [
        "https://www.instagram.com/octoshell_japan/",
        "https://octoshell-nextjs.vercel.app",
      ],
    },
    {
      "@type": ["LocalBusiness", "TaxiService"],
      "@id": `${BASE}/#localbusiness`,
      "name": "Octoshell Co., Ltd.",
      "alternateName": "貝八方株式会社",
      "image": OG_IMAGE,
      "description":
        "Premium private chauffeur and luxury hire car service in Japan. Airport transfers (Narita, Haneda), hourly hire, sightseeing tours, golf, MICE, outdoor, and ceremonial transportation. Toyota Alphard (up to 5 pax) and Toyota Hiace (up to 9 pax). Serving Greater Tokyo and all of Japan.",
      "telephone": "+81-47-382-5728",
      "email": "info@octoshell.jp",
      "url": BASE,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Matsudo Dai-Hachi Mansion 103, 618-1 Kamihongo",
        "addressLocality": "Matsudo",
        "addressRegion": "Chiba",
        "postalCode": "271-0064",
        "addressCountry": "JP",
      },
      "priceRange": "¥¥¥",
      "currenciesAccepted": "JPY",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "openingHours": "Mo-Su 00:00-24:00",
      "areaServed": [
        { "@type": "City", "name": "Tokyo", "sameAs": "https://www.wikidata.org/wiki/Q1490" },
        { "@type": "City", "name": "Yokohama" },
        { "@type": "City", "name": "Osaka" },
        { "@type": "AdministrativeArea", "name": "Greater Tokyo Area" },
        { "@type": "Country", "name": "Japan", "sameAs": "https://www.wikidata.org/wiki/Q17" },
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": "Chartered Executive Chauffeur Service License",
        "credentialCategory": "Government Transportation License",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Kanto Transport Bureau",
          "alternateName": "関東運輸局",
        },
        "identifier": "KAN-JI-RYO-NI No. 1248",
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Airport Transfer — Tokyo to Narita (NRT)",
          "description": "Private chauffeur transfer between Tokyo city and Narita International Airport",
          "price": "25000",
          "priceCurrency": "JPY",
          "eligibleTransportationMode": "https://schema.org/Car",
          "seller": { "@id": `${BASE}/#organization` },
        },
        {
          "@type": "Offer",
          "name": "Airport Transfer — Tokyo to Haneda (HND)",
          "description": "Private chauffeur transfer between Tokyo city and Haneda International Airport",
          "price": "20000",
          "priceCurrency": "JPY",
          "eligibleTransportationMode": "https://schema.org/Car",
          "seller": { "@id": `${BASE}/#organization` },
        },
        {
          "@type": "Offer",
          "name": "Tokyo to Hakone Private Transfer",
          "price": "70000",
          "priceCurrency": "JPY",
          "seller": { "@id": `${BASE}/#organization` },
        },
        {
          "@type": "Offer",
          "name": "Tokyo to Mount Fuji Private Transfer",
          "price": "68000",
          "priceCurrency": "JPY",
          "seller": { "@id": `${BASE}/#organization` },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      "name": "Octoshell Japan",
      "url": BASE,
      "description": "Japan private chauffeur service — luxury airport transfers, hourly hire, sightseeing, and more.",
      "inLanguage": ["en", "ja", "zh-TW"],
      "publisher": { "@id": `${BASE}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
      </head>
      <body className="min-h-full antialiased">
        <ThemeProvider>
          <CurrencyProvider>
            <LangProvider>{children}</LangProvider>
          </CurrencyProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
