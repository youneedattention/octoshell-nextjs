"use client";
import ProtectedImage from "@/components/ProtectedImage";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";

const LOGO = "/logo.png";

export default function SiteFooter() {
  const { lang } = useLang();
  return (
    <footer className="bg-[#0a0a0a] pt-10 sm:pt-12 pb-7 sm:pb-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-7 border-b border-white/10">
          <Link href="/">
            <ProtectedImage src={LOGO} alt="Octoshell" width={80} height={80} className="object-contain" />
          </Link>
          <nav className="flex flex-wrap justify-center gap-8 sm:gap-10">
            {(["nav_home", "nav_services", "nav_about"] as const).map((key) => (
              <Link key={key}
                href={key === "nav_home" ? "/" : key === "nav_services" ? "/services" : "/about"}
                style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", textDecoration: "none" }}
                className="text-white/60 hover:text-white transition-colors">
                {t[key][lang]}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3" style={{ padding: "24px 0" }}>
          <p style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px" }} className="text-white/30 text-center sm:text-left">
            Copyright &copy; Octoshell all rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-5">
            <Link href="#" style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", textDecoration: "none" }} className="text-white/30 hover:text-white/60 transition-colors">
              {t.footer_terms[lang]}
            </Link>
            <Link href="/privacy" style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", textDecoration: "none" }} className="text-white/30 hover:text-white/60 transition-colors">
              {t.footer_privacy[lang]}
            </Link>
            <Link href="/law" style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", textDecoration: "none" }} className="text-white/30 hover:text-white/60 transition-colors">
              {t.footer_law[lang]}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
