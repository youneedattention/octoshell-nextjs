"use client";
import ProtectedImage from "@/components/ProtectedImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";
import type { Lang } from "@/lib/translations";

const LOGO = "/logo.png";
const WHATSAPP_URL = "https://wa.me/81473825728";

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
      { labelKey: "footer_webapp",    href: "/book" },
      { labelKey: "footer_whatsapp",  href: WHATSAPP_URL, external: true },
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
