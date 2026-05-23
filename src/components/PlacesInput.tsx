"use client";
/**
 * PlacesInput
 * -----------
 * • No API key → uses OpenStreetMap Nominatim (free, works immediately)
 * • NEXT_PUBLIC_GOOGLE_MAPS_API_KEY set → loads Google Places and takes over
 *
 * The Nominatim dropdown is custom-styled; the Google dropdown relies on
 * .pac-container CSS in globals.css.
 */
import { useCallback, useEffect, useRef, useState } from "react";

const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

/* ── Google Maps loader ─────────────────────────────────────────────── */
declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          Autocomplete: new (
            el: HTMLInputElement,
            opts?: Record<string, unknown>
          ) => {
            addListener: (event: string, cb: () => void) => void;
            getPlace: () => { formatted_address?: string; name?: string };
          };
        };
      };
    };
    _gmCb?: () => void;
  }
}

function loadGoogle(): Promise<void> {
  if (!GOOGLE_KEY) return Promise.reject(new Error("no key"));
  if (typeof window === "undefined") return Promise.reject();
  if (window.google?.maps?.places) return Promise.resolve();
  return new Promise((resolve, reject) => {
    if (document.getElementById("gm-places")) {
      window._gmCb = resolve;
      return;
    }
    window._gmCb = resolve;
    const s = document.createElement("script");
    s.id = "gm-places";
    s.async = true;
    s.defer = true;
    s.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&libraries=places&callback=_gmCb`;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

/* ── Nominatim suggestion type ──────────────────────────────────────── */
interface Sug {
  short: string; // first 2 parts of display_name
  full: string;  // full display_name (what gets written to input)
}

/* ── Props ──────────────────────────────────────────────────────────── */
interface Props {
  id: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

/* ── Component ──────────────────────────────────────────────────────── */
export default function PlacesInput({
  id, placeholder, value, onChange, required,
}: Props) {
  const inputRef    = useRef<HTMLInputElement>(null);
  const [sugs, setSugs]           = useState<Sug[]>([]);
  const [open, setOpen]           = useState(false);
  const [loading, setLoading]     = useState(false);
  const [googleOn, setGoogleOn]   = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Try Google Maps */
  useEffect(() => {
    loadGoogle()
      .then(() => setGoogleOn(true))
      .catch(() => { /* fall through to Nominatim */ });
  }, []);

  /* Wire Google Autocomplete once ready */
  useEffect(() => {
    if (!googleOn || !inputRef.current || !window.google?.maps?.places) return;
    const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "jp" },
      types: ["establishment", "geocode"],
      fields: ["formatted_address", "name"],
    });
    ac.addListener("place_changed", () => {
      const p = ac.getPlace();
      onChange(p.formatted_address ?? p.name ?? inputRef.current?.value ?? "");
    });
  }, [googleOn, onChange]);

  /* Nominatim search */
  const searchNominatim = useCallback(async (q: string) => {
    if (q.trim().length < 2) { setSugs([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search` +
        `?q=${encodeURIComponent(q)}` +
        `&format=json&limit=6&countrycodes=jp&accept-language=ja,en`,
        { headers: { "User-Agent": "octoshell-booking/1.0 (contact: info@octoshell.jp)" } }
      );
      const data = (await res.json()) as { display_name: string }[];
      setSugs(
        data.map((d) => {
          const parts = d.display_name.split(", ");
          return {
            short: parts.slice(0, 3).join(", "),
            full: d.display_name,
          };
        })
      );
      setOpen(true);
    } catch {
      setSugs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /* Input change handler */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      onChange(v);
      if (!googleOn) {
        if (debounce.current) clearTimeout(debounce.current);
        debounce.current = setTimeout(() => searchNominatim(v), 420);
      }
    },
    [googleOn, onChange, searchNominatim]
  );

  /* Pick a Nominatim suggestion */
  const choose = useCallback(
    (full: string) => {
      onChange(full);
      if (inputRef.current) inputRef.current.value = full;
      setSugs([]);
      setOpen(false);
    },
    [onChange]
  );

  const base =
    "w-full bg-transparent border-b border-white/20 focus:border-[#c9a84c] " +
    "text-white text-[13px] tracking-wide py-3 pr-8 outline-none transition-colors " +
    "placeholder:text-white/30";

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={handleChange}
        onFocus={() => sugs.length > 0 && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 180)}
        autoComplete="off"
        className={base}
      />

      {/* Map-pin icon */}
      <svg
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25"
        fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>

      {/* Nominatim custom dropdown */}
      {!googleOn && open && (sugs.length > 0 || loading) && (
        <ul className="absolute z-[9999] left-0 right-0 top-[calc(100%+6px)] bg-[#1c1c1c] border border-white/[0.08] shadow-2xl overflow-hidden">
          {loading && (
            <li className="px-4 py-3 text-white/30 text-[11px] tracking-widest">
              Searching…
            </li>
          )}
          {sugs.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => choose(s.full)}
              className="px-4 py-3 border-b border-white/[0.04] last:border-0 cursor-pointer hover:bg-white/[0.06] transition-colors"
            >
              <span className="block text-[13px] text-white/90 leading-snug">{s.short}</span>
              <span className="block text-[10px] text-white/35 mt-0.5 truncate">{s.full}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
