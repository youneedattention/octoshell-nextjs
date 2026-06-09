"use client";
import ProtectedImage from "@/components/ProtectedImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";
import type { Lang } from "@/lib/translations";

const LOGO = "/logo.png";
const WHATSAPP_URL = "https://wa.me/19716665151";
const WHATSAPP_NUMBER = "+1 971 666 5151";

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
      { labelKey: "nav_about",      href: "/about" },
      { labelKey: "footer_reviews", href: "/reviews" },
      { labelKey: "footer_privacy", href: "/privacy" },
      { labelKey: "footer_law",     href: "/law" },
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
    items: [
      { labelKey: "footer_webapp", href: "/book" },
    ],
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
  const isZh = pathname.startsWith("/zh");
  const lp = (path: string) => isZh ? `/zh${path}` : path;

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.07]">

      {/* ── Main columns ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10 sm:pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-[auto_1fr_1fr_1fr] gap-x-8 gap-y-10 sm:gap-x-12">

          {/* Logo — always first */}
          <div className="col-span-2 sm:col-span-1 flex sm:flex-col items-center sm:items-start gap-4">
            <Link href={lp("/")}>
              <ProtectedImage src={LOGO} alt="Octoshell" width={72} height={72} className="object-contain" />
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
                {/* WhatsApp card — only in the connect column */}
                {col.titleKey === "footer_col_connect" && (
                  <li className="mt-1">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 hover:opacity-80 transition-opacity">
                      {/* WhatsApp icon */}
                      <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.528 5.855L.057 23.882l6.198-1.44A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-4.988-1.363l-.358-.212-3.68.855.924-3.562-.233-.375A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                        </svg>
                      </span>
                      <span className="flex flex-col">
                        <span className="text-white text-[13px] font-semibold leading-tight">
                          {t.footer_whatsapp[lang]}
                        </span>
                        <span className="text-white/45 text-[12px] tracking-[0.04em]">
                          {WHATSAPP_NUMBER}
                        </span>
                      </span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
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
