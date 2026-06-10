"use client";
import ProtectedImage from "@/components/ProtectedImage";
import Link from "next/link";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";
import type { Lang } from "@/lib/translations";

const LOGO = "/logo.png";
const WHATSAPP_URL = "https://wa.me/19716665151";
const WHATSAPP_NUMBER = "+1 971 666 5151";
const EMAIL = "info@octoshell.jp";

/* ── Column definitions ─────────────────────────────────────────────
   To add a new column: insert a new object into COLUMNS anywhere
   between the first and last entry. The layout adjusts automatically.
─────────────────────────────────────────────────────────────────── */
type NavItem = { labelKey: keyof typeof t; href: string; external?: boolean };
type Column  = { titleKey: keyof typeof t; items: NavItem[] };

const COLUMNS: Column[] = [
  {
    titleKey: "footer_col_company",
    items: [
      { labelKey: "nav_home",      href: "/" },
      { labelKey: "nav_about",     href: "/about" },
      { labelKey: "nav_chauffeur", href: "/services" },
      { labelKey: "nav_fleet",     href: "/fleet" },
      { labelKey: "nav_faq",       href: "/faq" },
    ],
  },
  {
    titleKey: "footer_col_top_trips",
    items: [
      { labelKey: "footer_trip_haneda",  href: "/airport" },
      { labelKey: "footer_trip_narita",  href: "/airport" },
      { labelKey: "footer_trip_hakone",  href: "/services/tokyo-to-hakone" },
      { labelKey: "footer_trip_fuji",    href: "/services/tokyo-to-fuji" },
      { labelKey: "footer_trip_golf",    href: "/services/tokyo-golf-transfer" },
      { labelKey: "footer_trip_hourly",  href: "/services/tokyo-by-the-hour" },
    ],
  },
  {
    titleKey: "footer_col_connect",
    items: [],
  },
];

function ColLink({ item, lang, lp }: { item: NavItem; lang: Lang; lp: (p: string) => string }) {
  const href = item.external ? item.href : lp(item.href);
  const props = item.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} {...props}
      className="block text-white/50 hover:text-[#c9a84c] transition-colors text-[13px] leading-[1.5] tracking-[0.04em]">
      {t[item.labelKey][lang]}
    </Link>
  );
}

export default function SiteFooter() {
  const { lang } = useLang();
  const pathname  = usePathname();
  const langPrefix = pathname.startsWith("/zh-cn") ? "/zh-cn"
    : pathname.startsWith("/zh") ? "/zh"
    : pathname.startsWith("/ja") ? "/ja"
    : pathname.startsWith("/ko") ? "/ko"
    : pathname.startsWith("/th") ? "/th"
    : pathname.startsWith("/fr") ? "/fr"
    : "";
  const lp = (path: string) => `${langPrefix}${path}`;

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.07]">

      {/* ── Main columns ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 pt-12 sm:pt-16 pb-10 sm:pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-[auto_1fr_1fr_1fr] gap-x-8 gap-y-10 sm:gap-x-12">

          {/* Logo — always first */}
          <div className="col-span-2 sm:col-span-1 flex sm:flex-col items-center sm:items-start gap-4">
            <Link href={lp("/")}>
              <ProtectedImage src={LOGO} alt="Octoshell" width={95} height={95} className="object-contain sm:w-[100px] sm:h-[100px]" />
            </Link>
            <p className="text-white/25 text-[11px] leading-relaxed tracking-[0.06em] hidden sm:block max-w-[140px]">
              Japan Private<br />Chauffeur Service
            </p>
          </div>

          {/* Dynamic columns */}
          {COLUMNS.map((col) => (
            <div key={col.titleKey}>
              <p className="text-white/90 text-[11px] tracking-[0.3em] uppercase font-semibold mb-4">
                {t[col.titleKey][lang]}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <li key={item.labelKey}>
                    <ColLink item={item} lang={lang} lp={lp} />
                  </li>
                ))}
                {/* Book Now button + WhatsApp + Email — connect column only */}
                {col.titleKey === "footer_col_connect" && (
                  <>
                    {/* Book Online */}
                    <li>
                      <Link href={lp("/book")}
                        className="group inline-flex items-center gap-3">
                        <span className="flex-shrink-0 w-[25px] h-[25px] rounded-full bg-white/10 group-hover:bg-[#c9a84c] group-active:bg-[#c9a84c] flex items-center justify-center transition-colors duration-200">
                          <svg viewBox="0 0 24 24" className="w-[13px] h-[13px] text-white/50 group-hover:text-white group-active:text-white transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                          </svg>
                        </span>
                        <span className="flex flex-col">
                          <span className="text-white/70 group-hover:text-[#c9a84c] group-active:text-[#c9a84c] text-[13px] font-semibold leading-tight transition-colors duration-200">
                            {t.footer_webapp[lang]}
                          </span>
                          <span className="text-white/30 group-hover:text-[#c9a84c]/60 group-active:text-[#c9a84c]/60 text-[11px] tracking-[0.04em] transition-colors duration-200">
                            {t.footer_webapp_sub[lang]}
                          </span>
                        </span>
                      </Link>
                    </li>

                    {/* divider */}
                    <li className="my-1">
                      <div className="h-px bg-white/[0.07]" />
                    </li>

                    {/* WhatsApp */}
                    <li>
                      <button type="button" onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}
                        className="group inline-flex items-center gap-3 transition-opacity cursor-pointer w-full text-left">
                        <span className="flex-shrink-0 w-[25px] h-[25px] rounded-full bg-white/10 group-hover:bg-[#c9a84c] group-active:bg-[#c9a84c] flex items-center justify-center transition-colors duration-200">
                          <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-white/50 group-hover:fill-white group-active:fill-white transition-colors duration-200">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.528 5.855L.057 23.882l6.198-1.44A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-4.988-1.363l-.358-.212-3.68.855.924-3.562-.233-.375A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                          </svg>
                        </span>
                        <span className="flex flex-col">
                          <span className="text-white/70 group-hover:text-[#c9a84c] group-active:text-[#c9a84c] text-[13px] font-semibold leading-tight transition-colors duration-200">
                            {t.footer_whatsapp[lang]}
                          </span>
                          <span className="text-white/30 group-hover:text-[#c9a84c]/60 group-active:text-[#c9a84c]/60 text-[11px] tracking-[0.04em] transition-colors duration-200">
                            {t.footer_whatsapp_sub[lang]}
                          </span>
                        </span>
                      </button>
                    </li>

                    {/* divider */}
                    <li className="my-1">
                      <div className="h-px bg-white/[0.07]" />
                    </li>

                    {/* Email */}
                    <li>
                      <span className="group inline-flex items-center gap-3">
                        <span className="flex-shrink-0 w-[25px] h-[25px] rounded-full bg-white/10 group-hover:bg-[#c9a84c] group-active:bg-[#c9a84c] flex items-center justify-center transition-colors duration-200">
                          <svg viewBox="0 0 24 24" className="w-[13px] h-[13px]" fill="none" stroke="currentColor" strokeWidth={1.8}
                            style={{ color: "rgba(255,255,255,0.5)" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "white")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                          </svg>
                        </span>
                        <span className="flex flex-col">
                          <span className="text-white/70 group-hover:text-[#c9a84c] group-active:text-[#c9a84c] text-[13px] font-semibold leading-tight transition-colors duration-200">
                            {t.footer_email[lang]}
                          </span>
                          <ObfuscatedEmail className="text-white/30 hover:text-[#c9a84c]/60 text-[11px] tracking-[0.04em] transition-colors duration-200" />
                        </span>
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-[12px] tracking-[0.04em]">
            © {new Date().getFullYear()} Octoshell Co., Ltd. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href={lp("/privacy")}
              className="text-white/25 hover:text-white/50 transition-colors text-[12px] tracking-[0.04em]">
              {t.footer_privacy[lang]}
            </Link>
            <Link href={lp("/law")}
              className="text-white/25 hover:text-white/50 transition-colors text-[12px] tracking-[0.04em]">
              {t.footer_law[lang]}
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
