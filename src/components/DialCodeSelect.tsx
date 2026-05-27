"use client";
/**
 * DialCodeSelect — searchable country dial-code picker.
 * Search by country name (any case), ISO code (US, JP…), aliases, or dial number.
 */
import { useEffect, useMemo, useRef, useState } from "react";

/* ── Country data ───────────────────────────────────────────────────── */
interface Country {
  code: string;
  dial: string;
  name: string;
  aliases?: string[];
}

/** Generate flag emoji from ISO-3166 country code */
const flag = (c: string) =>
  [...c.toUpperCase()].map(ch => String.fromCodePoint(ch.charCodeAt(0) + 127397)).join("");

/** Ordered by Japan inbound tourism volume */
const COUNTRIES: Country[] = [
  { code: "JP", dial: "81",  name: "Japan" },
  { code: "CN", dial: "86",  name: "China",          aliases: ["PRC", "中国"] },
  { code: "TW", dial: "886", name: "Taiwan",          aliases: ["台湾", "台灣"] },
  { code: "HK", dial: "852", name: "Hong Kong",       aliases: ["香港"] },
  { code: "MO", dial: "853", name: "Macau",           aliases: ["Macao", "澳門"] },
  { code: "KR", dial: "82",  name: "South Korea",     aliases: ["Korea", "한국"] },
  { code: "US", dial: "1",   name: "United States",   aliases: ["USA", "America", "US"] },
  { code: "CA", dial: "1",   name: "Canada" },
  { code: "AU", dial: "61",  name: "Australia" },
  { code: "GB", dial: "44",  name: "United Kingdom",  aliases: ["UK", "Britain", "England"] },
  { code: "SG", dial: "65",  name: "Singapore" },
  { code: "MY", dial: "60",  name: "Malaysia" },
  { code: "TH", dial: "66",  name: "Thailand" },
  { code: "ID", dial: "62",  name: "Indonesia" },
  { code: "PH", dial: "63",  name: "Philippines" },
  { code: "VN", dial: "84",  name: "Vietnam" },
  { code: "IN", dial: "91",  name: "India" },
  { code: "MM", dial: "95",  name: "Myanmar",         aliases: ["Burma"] },
  { code: "KH", dial: "855", name: "Cambodia" },
  { code: "LA", dial: "856", name: "Laos" },
  { code: "BD", dial: "880", name: "Bangladesh" },
  { code: "LK", dial: "94",  name: "Sri Lanka" },
  { code: "NP", dial: "977", name: "Nepal" },
  { code: "PK", dial: "92",  name: "Pakistan" },
  { code: "AE", dial: "971", name: "UAE",             aliases: ["United Arab Emirates", "Dubai"] },
  { code: "SA", dial: "966", name: "Saudi Arabia" },
  { code: "QA", dial: "974", name: "Qatar" },
  { code: "KW", dial: "965", name: "Kuwait" },
  { code: "BH", dial: "973", name: "Bahrain" },
  { code: "OM", dial: "968", name: "Oman" },
  { code: "IL", dial: "972", name: "Israel" },
  { code: "TR", dial: "90",  name: "Turkey",          aliases: ["Türkiye"] },
  { code: "IR", dial: "98",  name: "Iran" },
  { code: "FR", dial: "33",  name: "France" },
  { code: "DE", dial: "49",  name: "Germany" },
  { code: "IT", dial: "39",  name: "Italy" },
  { code: "ES", dial: "34",  name: "Spain" },
  { code: "PT", dial: "351", name: "Portugal" },
  { code: "NL", dial: "31",  name: "Netherlands",     aliases: ["Holland"] },
  { code: "BE", dial: "32",  name: "Belgium" },
  { code: "CH", dial: "41",  name: "Switzerland" },
  { code: "AT", dial: "43",  name: "Austria" },
  { code: "SE", dial: "46",  name: "Sweden" },
  { code: "NO", dial: "47",  name: "Norway" },
  { code: "DK", dial: "45",  name: "Denmark" },
  { code: "FI", dial: "358", name: "Finland" },
  { code: "RU", dial: "7",   name: "Russia" },
  { code: "PL", dial: "48",  name: "Poland" },
  { code: "CZ", dial: "420", name: "Czech Republic",  aliases: ["Czechia"] },
  { code: "HU", dial: "36",  name: "Hungary" },
  { code: "RO", dial: "40",  name: "Romania" },
  { code: "UA", dial: "380", name: "Ukraine" },
  { code: "GR", dial: "30",  name: "Greece" },
  { code: "NZ", dial: "64",  name: "New Zealand" },
  { code: "ZA", dial: "27",  name: "South Africa" },
  { code: "NG", dial: "234", name: "Nigeria" },
  { code: "EG", dial: "20",  name: "Egypt" },
  { code: "MA", dial: "212", name: "Morocco" },
  { code: "KE", dial: "254", name: "Kenya" },
  { code: "BR", dial: "55",  name: "Brazil" },
  { code: "MX", dial: "52",  name: "Mexico" },
  { code: "AR", dial: "54",  name: "Argentina" },
  { code: "CL", dial: "56",  name: "Chile" },
  { code: "CO", dial: "57",  name: "Colombia" },
  { code: "PE", dial: "51",  name: "Peru" },
  { code: "MN", dial: "976", name: "Mongolia" },
];

/* ── Props ──────────────────────────────────────────────────────────── */
interface Props {
  dialCode: string;
  onChange: (dialCode: string, countryCode: string) => void;
}

/* ── Component ──────────────────────────────────────────────────────── */
export default function DialCodeSelect({ dialCode, onChange }: Props) {
  const [open,  setOpen]  = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef    = useRef<HTMLInputElement>(null);

  const current = COUNTRIES.find(c => c.code === dialCode) ??
                  COUNTRIES.find(c => c.dial === dialCode) ??
                  COUNTRIES[0];

  /* Filter by name, code, aliases, or dial number */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    const num = q.replace(/^\+/, "");
    return COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(q)          ||
      c.code.toLowerCase().includes(q)          ||
      c.dial.startsWith(num)                    ||
      (c.aliases?.some(a => a.toLowerCase().includes(q)) ?? false)
    );
  }, [query]);

  /* Auto-focus search when open */
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 40);
  }, [open]);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false); setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pick = (c: Country) => {
    onChange(c.dial, c.code);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative shrink-0">
      {/* ── Trigger button ── */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 h-full border-b border-white/20 pr-2 py-3
                   text-white hover:border-[#c9a84c]/50 transition-colors select-none"
      >
        <span className="text-xl leading-none">{flag(current.code)}</span>
        <span className="text-[13px] tracking-wide text-white/80 font-mono">+{current.dial}</span>
        <svg className="w-3 h-3 text-white/30 shrink-0" fill="none" stroke="currentColor"
          strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div className="absolute z-[9999] bottom-full left-0 mb-2 w-64
                        bg-[#1c1c1c] border border-white/[0.08] shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/[0.06]">
            <svg className="w-3.5 h-3.5 text-white/30 shrink-0" fill="none" stroke="currentColor"
              strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Country name, code, or +XX…"
              className="flex-1 bg-transparent text-white text-[12px] outline-none
                         placeholder:text-white/25 tracking-wide"
            />
          </div>

          {/* Country list */}
          <ul className="max-h-56 overflow-y-auto">
            {filtered.length === 0 && (
              <li className="px-4 py-4 text-white/30 text-[11px] text-center tracking-widest">
                No results
              </li>
            )}
            {filtered.map(c => (
              <li
                key={c.code}
                onMouseDown={() => pick(c)}
                className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer
                            text-[12px] border-b border-white/[0.03] last:border-0
                            transition-colors
                            ${current.code === c.code
                              ? "bg-white/[0.08] text-white"
                              : "text-white/70 hover:bg-white/[0.05]"
                            }`}
              >
                <span className="text-lg leading-none">{flag(c.code)}</span>
                <span className="flex-1 truncate">{c.name}</span>
                <span className="text-white/35 font-mono text-[11px] shrink-0">+{c.dial}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
