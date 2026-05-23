import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { LangProvider } from "@/context/LangContext";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Octoshell Japan Chauffeur Service",
  description:
    "Japan's premier chartered car service — lay back and enjoy your trip.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full`}>
      <body className="min-h-full antialiased">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
