"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Currency =
  | "JPY" | "USD" | "CNY" | "TWD" | "HKD" | "SGD" | "AUD" | "EUR" | "GBP";

export interface CurrencyMeta {
  code: Currency;
  symbol: string;
  label: string;
  flag: string;
}

export const CURRENCIES: CurrencyMeta[] = [
  { code: "JPY", symbol: "¥",   label: "JPY", flag: "🇯🇵" },
  { code: "USD", symbol: "$",   label: "USD", flag: "🇺🇸" },
  { code: "CNY", symbol: "CN¥", label: "CNY", flag: "🇨🇳" },
  { code: "TWD", symbol: "NT$", label: "TWD", flag: "🇹🇼" },
  { code: "HKD", symbol: "HK$", label: "HKD", flag: "🇭🇰" },
  { code: "SGD", symbol: "S$",  label: "SGD", flag: "🇸🇬" },
  { code: "AUD", symbol: "A$",  label: "AUD", flag: "🇦🇺" },
  { code: "EUR", symbol: "€",   label: "EUR", flag: "🇪🇺" },
  { code: "GBP", symbol: "£",   label: "GBP", flag: "🇬🇧" },
];

/** Conservative fallback rates (JPY base) — used if API is unreachable */
const FALLBACK: Record<Currency, number> = {
  JPY: 1,
  USD: 0.0067,
  CNY: 0.0490,
  TWD: 0.2190,
  HKD: 0.0524,
  SGD: 0.0090,
  AUD: 0.0103,
  EUR: 0.0062,
  GBP: 0.0053,
};

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (yen: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "JPY",
  setCurrency: () => {},
  format: (yen) => `¥${yen.toLocaleString("en")}`,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("JPY");
  const [rates, setRates] = useState<Record<Currency, number>>(FALLBACK);

  /* Restore saved preference (client-only) */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("oc_cur") as Currency | null;
      if (saved && CURRENCIES.some((c) => c.code === saved)) {
        setCurrencyState(saved);
      }
    } catch {}
  }, []);

  /* Fetch live rates once per browser session */
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem("oc_rates");
      if (cached) {
        setRates(JSON.parse(cached) as Record<Currency, number>);
        return;
      }
    } catch {}

    fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/jpy.min.json"
    )
      .then((r) => r.json())
      .then((d: { jpy: Record<string, number> }) => {
        const j = d.jpy;
        const fresh: Record<Currency, number> = {
          JPY: 1,
          USD: j["usd"] ?? FALLBACK.USD,
          CNY: j["cny"] ?? FALLBACK.CNY,
          TWD: j["twd"] ?? FALLBACK.TWD,
          HKD: j["hkd"] ?? FALLBACK.HKD,
          SGD: j["sgd"] ?? FALLBACK.SGD,
          AUD: j["aud"] ?? FALLBACK.AUD,
          EUR: j["eur"] ?? FALLBACK.EUR,
          GBP: j["gbp"] ?? FALLBACK.GBP,
        };
        setRates(fresh);
        try { sessionStorage.setItem("oc_rates", JSON.stringify(fresh)); } catch {}
      })
      .catch(() => {}); // silently use FALLBACK
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try { localStorage.setItem("oc_cur", c); } catch {}
  };

  const format = (yen: number): string => {
    if (currency === "JPY") return `¥${yen.toLocaleString("en")}`;
    const meta = CURRENCIES.find((c) => c.code === currency)!;
    const converted = Math.round(yen * rates[currency]);
    return `${meta.symbol}${converted.toLocaleString("en")}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
