"use client";
/**
 * PlacesInput — address autocomplete with current-location support
 *
 * Priority order:
 *  1. Google Maps Places  (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)   ← most accurate
 *  2. Mapbox Geocoding    (NEXT_PUBLIC_MAPBOX_TOKEN)          ← free 100k/mo, great POI
 *  3. Nominatim / OSM     (always available, zero-config)     ← fallback
 *
 * Current location: browser Geolocation → reverse-geocode via Mapbox or Nominatim.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LangContext";

/* ── Tokens (public — safe to expose) ──────────────────────────────── */
const MAPBOX = process.env.NEXT_PUBLIC_MAPBOX_TOKEN        ?? "";
const GMAP   = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

/* ── Google Maps types ──────────────────────────────────────────────── */
declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          Autocomplete: new (
            el: HTMLInputElement,
            opts?: Record<string, unknown>
          ) => {
            addListener: (e: string, cb: () => void) => void;
            getPlace: () => { formatted_address?: string; name?: string };
          };
        };
      };
    };
    _gmCb?: () => void;
  }
}

function loadGoogle(): Promise<void> {
  if (!GMAP) return Promise.reject();
  if (typeof window === "undefined") return Promise.reject();
  if (window.google?.maps?.places) return Promise.resolve();
  return new Promise((resolve, reject) => {
    if (document.getElementById("gm-places")) { window._gmCb = resolve; return; }
    window._gmCb = resolve;
    const s = document.createElement("script");
    s.id = "gm-places"; s.async = true;
    s.src = `https://maps.googleapis.com/maps/api/js?key=${GMAP}&libraries=places&callback=_gmCb`;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

/* ── Geocoding helpers ──────────────────────────────────────────────── */
interface Sug { short: string; full: string; }

/** Forward search — returns suggestions for a text query */
async function fwdSearch(q: string): Promise<Sug[]> {
  if (q.trim().length < 2) return [];

  // ── Mapbox (preferred) ──────────────────────────────────────────────
  if (MAPBOX) {
    try {
      const url =
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json` +
        `?country=JP&types=poi,address,place,district&language=en,ja&limit=6` +
        `&access_token=${MAPBOX}`;
      const r = await fetch(url);
      if (!r.ok) throw new Error(`Mapbox ${r.status}`);
      const d = await r.json() as {
        features?: { place_name: string; text: string }[];
      };
      if (d.features?.length) {
        return d.features.map(f => ({ short: f.text, full: f.place_name }));
      }
    } catch (err) {
      console.warn("[PlacesInput] Mapbox failed, falling back to Nominatim:", err);
    }
  }

  // ── Nominatim fallback ─────────────────────────────────────────────
  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/search` +
      `?q=${encodeURIComponent(q)}&format=json&limit=6&countrycodes=jp&accept-language=en,ja`,
      { headers: { "User-Agent": "octoshell-booking/1.0 (info@octoshell.jp)" } }
    );
    if (!r.ok) return [];
    const d = await r.json() as { display_name: string; name?: string }[];
    return d.map(x => ({
      short: x.name ?? x.display_name.split(", ")[0],
      full:  x.display_name,
    }));
  } catch { return []; }
}

/** Reverse geocode — lat/lng → address string */
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  // ── Mapbox ────────────────────────────────────────────────────────
  if (MAPBOX) {
    try {
      const url =
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json` +
        `?language=en,ja&limit=1&access_token=${MAPBOX}`;
      const r = await fetch(url);
      const d = await r.json() as { features?: { place_name: string }[] };
      if (d.features?.[0]?.place_name) return d.features[0].place_name;
    } catch { /* fall through */ }
  }
  // ── Nominatim ────────────────────────────────────────────────────
  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en,ja`,
      { headers: { "User-Agent": "octoshell-booking/1.0 (info@octoshell.jp)" } }
    );
    const d = await r.json() as { display_name?: string };
    return d.display_name ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch { return `${lat.toFixed(5)}, ${lng.toFixed(5)}`; }
}

/* ── i18n strings ───────────────────────────────────────────────────── */
type Lang = "en" | "ja" | "zh";
const LOC_LABEL:   Record<Lang, string> = { en: "Use current location",  ja: "現在地を使用",           zh: "使用目前位置"   };
const LOC_BUSY:    Record<Lang, string> = { en: "Locating…",             ja: "取得中…",               zh: "定位中…"       };
const LOC_DENIED:  Record<Lang, string> = { en: "Location denied",       ja: "位置情報へのアクセスが拒否されました", zh: "位置存取被拒"   };
const LOC_UNAVAIL: Record<Lang, string> = { en: "Location unavailable",  ja: "現在地を取得できません",  zh: "無法取得目前位置" };
const SEARCHING:   Record<Lang, string> = { en: "Searching…",            ja: "検索中…",               zh: "搜尋中…"       };

/* ── Props ──────────────────────────────────────────────────────────── */
interface Props {
  id: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

/* ── Component ──────────────────────────────────────────────────────── */
export default function PlacesInput({ id, placeholder, value, onChange, required }: Props) {
  const { lang } = useLang();
  const inputRef   = useRef<HTMLInputElement>(null);
  const [sugs, setSugs]         = useState<Sug[]>([]);
  const [open, setOpen]         = useState(false);
  const [busy, setBusy]         = useState(false);
  const [locating, setLocating] = useState(false);
  const [locState, setLocState] = useState<"idle" | "locating" | "denied" | "unavailable">("idle");
  const [googleOn, setGoogleOn] = useState(false);
  const debTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Sync external value → DOM (handles form reset / pre-fill) */
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  /* Try Google Maps */
  useEffect(() => {
    if (!GMAP) return;
    loadGoogle().then(() => setGoogleOn(true)).catch(() => {});
  }, []);

  /* Wire Google Autocomplete */
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

  /* Handle typing → Mapbox / Nominatim search */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange(v);
    if (googleOn) return;
    if (debTimer.current) clearTimeout(debTimer.current);
    if (v.trim().length < 2) { setSugs([]); setOpen(false); return; }
    debTimer.current = setTimeout(async () => {
      setBusy(true);
      try {
        const results = await fwdSearch(v);
        setSugs(results);
        setOpen(results.length > 0);
      } finally { setBusy(false); }
    }, 380);
  }, [googleOn, onChange]);

  /* Pick a suggestion */
  const choose = useCallback((full: string) => {
    onChange(full);
    if (inputRef.current) inputRef.current.value = full;
    setSugs([]); setOpen(false);
  }, [onChange]);

  /* Get current location — tries high-accuracy first, retries with low-accuracy on timeout */
  const locate = useCallback(() => {
    if (!navigator?.geolocation) return;
    setLocState("locating");
    setLocating(true);

    const attempt = (highAccuracy: boolean) => {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const addr = await reverseGeocode(coords.latitude, coords.longitude);
            onChange(addr);
            if (inputRef.current) inputRef.current.value = addr;
            setLocState("idle");
          } finally { setLocating(false); }
        },
        (err) => {
          // Timeout on high-accuracy → silently retry with network-based (faster)
          if (err.code === 3 && highAccuracy) { attempt(false); return; }
          setLocating(false);
          // code 1 = PERMISSION_DENIED, codes 2/3 = unavailable / timeout
          setLocState(err.code === 1 ? "denied" : "unavailable");
          setTimeout(() => setLocState("idle"), 4000);
        },
        { enableHighAccuracy: highAccuracy, timeout: highAccuracy ? 8000 : 15000, maximumAge: 60000 }
      );
    };

    attempt(true);
  }, [onChange]);

  /* ── Render ── */
  const base =
    "w-full bg-transparent border-b border-white/20 focus:border-[#c9a84c] " +
    "text-white text-[13px] tracking-wide py-3 pr-8 outline-none transition-colors " +
    "placeholder:text-white/30";

  return (
    <div className="relative">
      {/* ── Text input ── */}
      <input
        ref={inputRef}
        id={id}
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        required={required}
        onChange={handleChange}
        onFocus={() => sugs.length > 0 && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 180)}
        autoComplete="off"
        className={base}
      />

      {/* Map-pin icon (right) */}
      <svg className="pointer-events-none absolute right-0 top-[14px] w-4 h-4 text-white/20"
        fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>

      {/* ── Dropdown (Mapbox / Nominatim) ── */}
      {!googleOn && open && (sugs.length > 0 || busy) && (
        <ul className="absolute z-[9999] left-0 right-0 top-[calc(100%+6px)]
                       bg-[#1c1c1c] border border-white/[0.08] shadow-2xl overflow-hidden">
          {busy && sugs.length === 0 && (
            <li className="px-4 py-3 text-white/30 text-[11px] tracking-widest">
              {SEARCHING[lang]}
            </li>
          )}
          {sugs.map((s, i) => (
            <li key={i}
              onMouseDown={() => choose(s.full)}
              className="px-4 py-3 border-b border-white/[0.04] last:border-0
                         cursor-pointer hover:bg-white/[0.06] transition-colors">
              <span className="block text-[13px] text-white/90 font-medium leading-snug">
                {s.short}
              </span>
              <span className="block text-[10px] text-white/35 mt-0.5 truncate">
                {s.full}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* ── Current-location button ── */}
      <button
        type="button"
        onClick={locate}
        disabled={locating}
        className={`mt-2 flex items-center gap-1.5 text-[10px] tracking-[0.18em]
                   transition-colors disabled:cursor-wait
                   ${locState === "denied"      ? "text-red-400"
                   : locState === "unavailable" ? "text-amber-400"
                   : "text-white/30 hover:text-[#c9a84c]"}`}
      >
        {/* icon */}
        {locating ? (
          /* spinner */
          <svg className="w-3 h-3 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          /* crosshair */
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor"
            strokeWidth={1.5} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" />
            <path strokeLinecap="round" d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
        )}
        <span>
          {locState === "denied"      ? LOC_DENIED[lang]
           : locState === "unavailable" ? LOC_UNAVAIL[lang]
           : locState === "locating"  ? LOC_BUSY[lang]
           : LOC_LABEL[lang]}
        </span>
      </button>
    </div>
  );
}
