"use client";
import { useCurrency } from "@/context/CurrencyContext";
import type { Lang } from "@/lib/translations";

/**
 * Renders a price in the user's selected currency.
 * Usage: <Price yen={25000} />  →  "¥25,000" / "$167" / "CN¥1,225" etc.
 */
export default function Price({ yen }: { yen: number }) {
  const { format } = useCurrency();
  return <>{format(yen)}</>;
}

const NOTE: Record<Lang, string> = {
  en: "* Prices shown in [C] are approximate and for reference only. All payments are settled in Japanese Yen (JPY). If paying in a foreign currency, conversion fees may apply.",
  ja: "* [C]建ての表示価格は参考値です。最終的なお支払いは日本円（JPY）にてご請求いたします。外貨でのお支払いをご希望の場合、為替手数料が発生する場合がございます。",
  zh: "* 以上[C]換算金額僅供參考，最終結算以日元（JPY）計算。如以非日元貨幣付款，可能需要支付外幣換算手續費。",
};

/**
 * Shows a JPY disclaimer when a non-JPY currency is selected.
 * Renders nothing when JPY is active.
 */
export function CurrencyNote({ lang }: { lang: Lang }) {
  const { currency } = useCurrency();
  if (currency === "JPY") return null;
  return (
    <p className="text-white/30 text-[11px] leading-relaxed mt-3 italic">
      {NOTE[lang].replace("[C]", currency)}
    </p>
  );
}
