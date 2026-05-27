"use client";
import { useCurrency } from "@/context/CurrencyContext";

/**
 * Renders a price in the user's selected currency.
 * Usage: <Price yen={25000} />  →  "¥25,000" / "$167" / "CN¥1,225" etc.
 */
export default function Price({ yen }: { yen: number }) {
  const { format } = useCurrency();
  return <>{format(yen)}</>;
}
