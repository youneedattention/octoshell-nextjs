"use client";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";

const LOGO =
  "https://octoshell.jp/wp-content/uploads/2024/09/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240910223903.png";

export default function SiteFooter() {
  const { lang } = useLang();
  return (
    <footer className="bg-[#0a0a0a] pt-10 sm:pt-12 pb-7 sm:pb-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-7 border-b border-white/10">
          <Link href="/">
            <Image src={LOGO} alt="Octoshell" width={80} height={80} className="object-contain" />
          </Link>
          <nav className="flex flex-wrap justify-center gap-8 sm:gap-10">
            {(["nav_home", "nav_services", "nav_about"] as const).map((key) => (
              <Link key={key}
                href={key === "nav_home" ? "/" : key === "nav_services" ? "/services" : "/about"}
                className="text-white/60 text-[11px] tracking-[0.2em] hover:text-white transition-colors">
                {t[key][lang]}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5">
          <p className="text-white/30 text-[11px] text-center sm:text-left">
            Copyright &copy; Octoshell all rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-5">
            <Link href="#" className="text-white/30 text-[11px] hover:text-white/60 transition-colors">
              {t.footer_terms[lang]}
            </Link>
            <Link href="/privacy" className="text-white/30 text-[11px] hover:text-white/60 transition-colors">
              {t.footer_privacy[lang]}
            </Link>
            <Link href="/law" className="text-white/30 text-[11px] hover:text-white/60 transition-colors">
              {t.footer_law[lang]}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
