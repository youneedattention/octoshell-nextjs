"use client";
/**
 * PlacesInput — Google Maps Places Autocomplete (Japan-restricted).
 * Falls back gracefully to a plain <input> if the API key is absent or the
 * Maps SDK hasn't loaded yet.
 *
 * Env var:  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
 */
import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          Autocomplete: new (
            el: HTMLInputElement,
            opts?: Record<string, unknown>
          ) => { addListener: (event: string, cb: () => void) => void; getPlace: () => { formatted_address?: string; name?: string } };
        };
      };
    };
    _googleMapsCallback?: () => void;
  }
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

/** Load the Google Maps JS SDK once per page. */
function loadMapsSDK(): Promise<void> {
  if (!API_KEY) return Promise.reject(new Error("No API key"));
  if (typeof window === "undefined") return Promise.reject();
  if (window.google?.maps?.places) return Promise.resolve();

  return new Promise((resolve, reject) => {
    if (document.getElementById("gm-sdk")) {
      window._googleMapsCallback = resolve;
      return;
    }
    window._googleMapsCallback = resolve;
    const s = document.createElement("script");
    s.id = "gm-sdk";
    s.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=_googleMapsCallback`;
    s.async = true;
    s.defer = true;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default function PlacesInput({
  id, placeholder, value, onChange, className = "", required,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ready, setReady] = useState(false);

  const initAC = useCallback(() => {
    const el = inputRef.current;
    if (!el || !window.google?.maps?.places) return;
    const ac = new window.google.maps.places.Autocomplete(el, {
      componentRestrictions: { country: "jp" },
      types: ["establishment", "geocode"],
      fields: ["formatted_address", "name"],
    });
    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      const chosen = place.formatted_address || place.name || el.value;
      onChange(chosen);
    });
  }, [onChange]);

  useEffect(() => {
    loadMapsSDK()
      .then(() => { setReady(true); })
      .catch(() => { /* no key — plain input */ });
  }, []);

  useEffect(() => {
    if (ready) initAC();
  }, [ready, initAC]);

  /* Sync external value back to the raw input (e.g. form reset) */
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  const base =
    "w-full bg-transparent border-b border-white/20 focus:border-[#c9a84c] " +
    "text-white text-[13px] tracking-wide py-3 pr-8 outline-none transition-colors " +
    "placeholder:text-white/35 ";

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={base + className}
        autoComplete="off"
      />
      {/* subtle map-pin icon */}
      <svg
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25"
        fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    </div>
  );
}
