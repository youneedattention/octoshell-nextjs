"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import PlacesInput from "@/components/PlacesInput";
import DialCodeSelect from "@/components/DialCodeSelect";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";

/* ── Duration options ────────────────────────────────────────────────── */
const DURATIONS = ["4", "5", "6", "7", "8", "10", "12"];

/* ── Driver-instruction multi-select options ─────────────────────────  */
const DRIVER_OPTS = [
  { value: "ミートアンドグリート",             key: "book_drv_meet"   },
  { value: "高速利用OK",                      key: "book_drv_hw"     },
  { value: "ゆっくり丁寧な運転をお願いしたい", key: "book_drv_gentle" },
  { value: "会話は最小限にしてほしい",         key: "book_drv_quiet"  },
  { value: "ベビーシート",                    key: "book_drv_baby"   },
  { value: "その他",                          key: "book_drv_other"  },
] as const;

/* ══════════════════════════════════════════════════════════════════════
   Inline icons
══════════════════════════════════════════════════════════════════════ */
const IconPin = () => (
  <svg className="w-3.5 h-3.5 shrink-0 text-white/35" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);
const IconFlag = () => (
  <svg className="w-3.5 h-3.5 shrink-0 text-white/35" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18M3 4.5l9-1.5 6 1.5-6 1.5-9-1.5ZM3 10.5l9-1.5 6 1.5-6 1.5-9-1.5Z" />
  </svg>
);
const IconCalendar = () => (
  <svg className="w-3.5 h-3.5 shrink-0 text-white/35" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const IconClock = () => (
  <svg className="w-3.5 h-3.5 shrink-0 text-white/35" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
  </svg>
);
const IconClockGold = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
  </svg>
);
const IconArrow = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m-5-5 5 5-5 5" />
  </svg>
);
const IconPlane = () => (
  <svg className="w-4 h-4 shrink-0 text-white/40" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
);
const IconNote = () => (
  <svg className="w-4 h-4 shrink-0 text-white/40" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487 18.55 2.8a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════
   Sub-components
══════════════════════════════════════════════════════════════════════ */

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 sm:mb-7">
      <span className="w-5 h-px bg-[#c9a84c]" />
      <p className="text-[#c9a84c] text-[11px] sm:text-[12px] tracking-[0.4em] uppercase font-semibold">{label}</p>
      <span className="flex-1 h-px bg-white/[0.07]" />
    </div>
  );
}

function FieldLabel({ icon, label, required }: {
  icon?: React.ReactNode; label: string; required?: boolean;
}) {
  return (
    <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] tracking-[0.28em] text-white/45 uppercase">
      {icon}
      {label}
      {required && <span className="text-[#c9a84c]">*</span>}
    </span>
  );
}

function FieldWrap({ icon, label, required, htmlFor, children }: {
  icon?: React.ReactNode; label: string; required?: boolean; htmlFor?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor}>
        <FieldLabel icon={icon} label={label} required={required} />
      </label>
      {children}
    </div>
  );
}

/* ── Calendar constants ─────────────────────────────────────────────── */
const CAL_MONTHS: Record<string, string[]> = {
  "en-US": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  "ja":    ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
  "zh-TW": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
};
const CAL_DOW: Record<string, string[]> = {
  "en-US": ["Mo","Tu","We","Th","Fr","Sa","Su"],
  "ja":    ["月","火","水","木","金","土","日"],
  "zh-TW": ["一","二","三","四","五","六","日"],
};
const TIME_HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const TIME_MINS  = ["00", "10", "20", "30", "40", "50"];

/* ── Custom date picker ─────────────────────────────────────────────── */
function DatePickerField({ id, icon, label, required, value, onChange, inputLang }: {
  id: string; icon?: React.ReactNode; label: string; required?: boolean;
  value: string; onChange: (v: string) => void; inputLang: string;
}) {
  const today = new Date();
  const selY = value ? parseInt(value.slice(0, 4), 10) : 0;
  const selM = value ? parseInt(value.slice(5, 7), 10) - 1 : -1;
  const selD = value ? parseInt(value.slice(8, 10), 10) : 0;

  const [open,      setOpen]      = useState(false);
  const [viewYear,  setViewYear]  = useState(selY || today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selM >= 0 ? selM : today.getMonth());
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setViewYear(parseInt(value.slice(0, 4), 10));
      setViewMonth(parseInt(value.slice(5, 7), 10) - 1);
    }
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  /* build cells */
  type Cell = { day: number; dateStr: string | null; thisMonth: boolean };
  const daysInMonth    = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDow       = new Date(viewYear, viewMonth, 1).getDay();
  const startOffset    = (firstDow + 6) % 7;
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();
  const cells: Cell[]  = [];

  for (let i = startOffset - 1; i >= 0; i--)
    cells.push({ day: daysInPrevMonth - i, dateStr: null, thisMonth: false });
  for (let d = 1; d <= daysInMonth; d++) {
    const mo = viewMonth + 1;
    cells.push({
      day: d,
      dateStr: `${viewYear}-${String(mo).padStart(2,"0")}-${String(d).padStart(2,"0")}`,
      thisMonth: true,
    });
  }
  let nd = 1;
  while (cells.length < 35 || cells.length % 7 !== 0) cells.push({ day: nd++, dateStr: null, thisMonth: false });

  const displayDate = value ? (() => {
    try {
      const [y, m, d] = value.split("-").map(Number);
      return new Intl.DateTimeFormat(inputLang, { year:"numeric", month:"long", day:"numeric" })
        .format(new Date(y, m - 1, d));
    } catch { return value; }
  })() : null;

  const yearRange  = Array.from({ length: 5 }, (_, i) => today.getFullYear() + i);
  const monthNames = CAL_MONTHS[inputLang] ?? CAL_MONTHS["en-US"];
  const dowHdrs    = CAL_DOW[inputLang]    ?? CAL_DOW["en-US"];

  const shiftMonth = (delta: number) => {
    const d = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(d.getFullYear()); setViewMonth(d.getMonth());
  };

  return (
    <div ref={panelRef} className="relative flex flex-col gap-1.5">
      <label htmlFor={id} onClick={e => { e.preventDefault(); setOpen(o => !o); }} className="cursor-pointer select-none">
        <FieldLabel icon={icon} label={label} required={required} />
      </label>

      <button type="button" id={id} onClick={() => setOpen(o => !o)}
        className="w-full border-b border-white/20 hover:border-[#c9a84c]/50 text-[13px] py-3 text-left transition-colors">
        {displayDate
          ? <span className="text-white tracking-wide">{displayDate}</span>
          : <span className="text-white/30">—</span>}
      </button>

      {open && (
        <div className="absolute top-full left-0 z-[60] mt-1 bg-[#141414] border border-white/[0.12]
                        shadow-[0_8px_32px_rgba(0,0,0,0.75)] w-[272px] overflow-hidden">
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
          <div className="p-3">

            {/* Month / Year row */}
            <div className="flex items-center gap-1 mb-3">
              <button type="button" onClick={() => shiftMonth(-1)}
                className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-[#c9a84c] text-lg transition-colors shrink-0">‹</button>
              <div className="flex-1 flex items-center justify-center gap-1.5">
                <select value={viewMonth} onChange={e => setViewMonth(Number(e.target.value))}
                  className="bg-[#1c1c1c] border border-white/[0.10] text-white text-[12px] py-1 px-1.5
                             outline-none cursor-pointer hover:border-[#c9a84c]/50 transition-colors">
                  {monthNames.map((mn, i) => <option key={i} value={i} className="bg-[#1c1c1c]">{mn}</option>)}
                </select>
                <select value={viewYear} onChange={e => setViewYear(Number(e.target.value))}
                  className="bg-[#1c1c1c] border border-white/[0.10] text-white text-[12px] py-1 px-1.5
                             outline-none cursor-pointer hover:border-[#c9a84c]/50 transition-colors">
                  {yearRange.map(y => <option key={y} value={y} className="bg-[#1c1c1c]">{y}</option>)}
                </select>
              </div>
              <button type="button" onClick={() => shiftMonth(1)}
                className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-[#c9a84c] text-lg transition-colors shrink-0">›</button>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 mb-0.5">
              {dowHdrs.map((d, i) => (
                <div key={i} className={`text-center text-[10px] py-0.5 ${i >= 5 ? "text-[#c9a84c]/50" : "text-white/25"}`}>{d}</div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-y-0.5">
              {cells.map((cell, i) => {
                const isSel = cell.thisMonth && selY === viewYear && selM === viewMonth && selD === cell.day;
                const isToday = cell.thisMonth && today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === cell.day;
                const isWknd = i % 7 >= 5;
                return (
                  <button key={i} type="button"
                    disabled={!cell.thisMonth}
                    onClick={() => { if (cell.dateStr) { onChange(cell.dateStr); setOpen(false); } }}
                    className={[
                      "w-full aspect-square flex items-center justify-center text-[12px] transition-all duration-100",
                      !cell.thisMonth   ? "text-white/[0.12] pointer-events-none" : "",
                      cell.thisMonth && !isSel ? `cursor-pointer ${isWknd ? "text-[#c9a84c]/70" : "text-white/70"} hover:bg-[#c9a84c]/20 hover:text-white` : "",
                      isSel             ? "bg-[#c9a84c] text-black font-bold" : "",
                      isToday && !isSel ? "ring-1 ring-inset ring-[#c9a84c]/50" : "",
                    ].filter(Boolean).join(" ")}>
                    {cell.day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Custom time picker ─────────────────────────────────────────────── */
function TimePickerField({ id, icon, label, required, value, onChange }: {
  id: string; icon?: React.ReactNode; label: string; required?: boolean;
  value: string; onChange: (v: string) => void;
}) {
  const [open,     setOpen]     = useState(false);
  const [pendingH, setPendingH] = useState("");
  const panelRef   = useRef<HTMLDivElement>(null);
  const hourColRef = useRef<HTMLDivElement>(null);

  const selH = value ? value.slice(0, 2) : "";
  const selM = value ? value.slice(3, 5) : "";

  /* sync pendingH when panel opens */
  useEffect(() => { if (open) setPendingH(selH); }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  /* scroll hour list to selected hour */
  useEffect(() => {
    if (open && hourColRef.current) {
      const h = parseInt(pendingH || selH || "0", 10);
      hourColRef.current.scrollTop = h * 36;
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  /* click outside */
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const activeH = pendingH || selH;

  return (
    <div ref={panelRef} className="relative flex flex-col gap-1.5">
      <label htmlFor={id} onClick={e => { e.preventDefault(); setOpen(o => !o); }} className="cursor-pointer select-none">
        <FieldLabel icon={icon} label={label} required={required} />
      </label>

      <button type="button" id={id} onClick={() => setOpen(o => !o)}
        className="w-full border-b border-white/20 hover:border-[#c9a84c]/50 text-[13px] py-3 text-left transition-colors">
        {value
          ? <span className="text-white tracking-wider">{value}</span>
          : <span className="text-white/30">—</span>}
      </button>

      {open && (
        <div className="absolute top-full left-0 z-[60] mt-1 bg-[#141414] border border-white/[0.12]
                        shadow-[0_8px_32px_rgba(0,0,0,0.75)] overflow-hidden">
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
          <div className="flex">

            {/* Hour column — scrollable */}
            <div ref={hourColRef}
              className="w-14 h-[216px] overflow-y-auto overscroll-contain"
              style={{ scrollbarWidth: "none" }}>
              {TIME_HOURS.map(h => (
                <button key={h} type="button"
                  onClick={() => setPendingH(h)}
                  className={[
                    "w-full h-9 flex items-center justify-center text-[13px] transition-colors",
                    activeH === h ? "bg-[#c9a84c] text-black font-bold" : "text-white/60 hover:bg-white/[0.06] hover:text-white",
                  ].join(" ")}>
                  {h}
                </button>
              ))}
            </div>

            <div className="w-px bg-white/[0.08]" />

            {/* Minute column — fixed 6 items */}
            <div className="w-14">
              {TIME_MINS.map(m => (
                <button key={m} type="button"
                  onClick={() => { onChange(`${activeH || "00"}:${m}`); setOpen(false); }}
                  className={[
                    "w-full h-9 flex items-center justify-center text-[13px] transition-colors",
                    selM === m && selH === activeH ? "bg-[#c9a84c] text-black font-bold" : "text-white/60 hover:bg-white/[0.06] hover:text-white",
                  ].join(" ")}>
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stepper({ value, onChange, min = 0, max = 14 }: {
  value: number; onChange: (n: number) => void; min?: number; max?: number;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div className="flex items-center">
      <button type="button" onClick={() => onChange(clamp(value - 1))}
        className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/55
                   hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors select-none text-base">−</button>
      <input type="number" value={value} min={min} max={max}
        onChange={e => { const n = parseInt(e.target.value, 10); if (!isNaN(n)) onChange(clamp(n)); }}
        onBlur={e => { const n = parseInt(e.target.value, 10); onChange(isNaN(n) ? min : clamp(n)); }}
        className="stepper-input w-12 h-9 border-y border-white/20 bg-transparent text-white
                   text-sm text-center outline-none tracking-widest" />
      <button type="button" onClick={() => onChange(clamp(value + 1))}
        className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/55
                   hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors select-none text-base">+</button>
    </div>
  );
}

/* ── Collapsible accordion item for Booking Details ── */
function AccordionItem({ labelOpen, labelClosed, icon, children }: {
  labelOpen: string; labelClosed: string; icon: React.ReactNode; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border transition-colors duration-200 ${open ? "border-[#c9a84c]/30" : "border-white/[0.08]"}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left group"
      >
        <div className="flex items-center gap-2.5">
          {icon}
          <span className={`text-[12px] sm:text-[13px] tracking-[0.22em] uppercase transition-colors
            ${open ? "text-white/80" : "text-white/45 group-hover:text-white/65"}`}>
            {open ? labelOpen : labelClosed}
          </span>
        </div>
        <div className={`w-6 h-6 border flex items-center justify-center shrink-0 transition-all duration-200
          ${open ? "border-[#c9a84c] rotate-45" : "border-white/20 group-hover:border-white/40"}`}>
          <svg className={`w-3 h-3 transition-colors ${open ? "text-[#c9a84c]" : "text-white/40"}`}
            fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-5 pt-1 border-t border-white/[0.06]">
          {children}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════════ */
const inputCls =
  "w-full bg-transparent border-b border-white/20 focus:border-[#c9a84c] " +
  "text-white text-[13px] tracking-wide py-3 outline-none transition-colors placeholder:text-white/30";

type Status = "idle" | "loading" | "success" | "error";
type Mode   = "transfer" | "hour";

export default function BookPage() {
  const { lang } = useLang();
  const inputLang = lang === "en" ? "en-US" : lang === "ja" ? "ja" : "zh-TW";

  /* Mode */
  const [mode,        setMode]        = useState<Mode>("transfer");

  /* Route */
  const [from,        setFrom]        = useState("");
  const [to,          setTo]          = useState("");

  /* Schedule */
  const [date,        setDate]        = useState("");
  const [time,        setTime]        = useState("");
  const [addReturn,   setAddReturn]   = useState(false);
  const [returnDate,  setReturnDate]  = useState("");
  const [returnTime,  setReturnTime]  = useState("");
  const [duration,    setDuration]    = useState("");

  /* Booking details (accordion) */
  const [flightNum,       setFlightNum]       = useState("");
  const [driverMsgs,      setDriverMsgs]      = useState<string[]>([]);
  const [driverOtherText, setDriverOtherText] = useState("");

  /* Passengers */
  const [people,      setPeople]      = useState(1);
  const [bags,        setBags]        = useState(1);

  /* Contact */
  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [dialCode,    setDialCode]    = useState("81");
  const [phone,       setPhone]       = useState("");
  const [hasWhatsapp, setHasWhatsapp] = useState(false);

  /* Form */
  const [status,      setStatus]      = useState<Status>("idle");
  const [errMsg,      setErrMsg]      = useState("");

  const toggleDriver = (val: string) => {
    setDriverMsgs(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
    if (val === "その他") setDriverOtherText("");
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    /* Custom validation for date/time pickers */
    if (!date) {
      setStatus("error");
      setErrMsg(lang === "ja" ? "出発日を選択してください" : lang === "zh" ? "請選擇出發日期" : "Please select a pickup date");
      return;
    }
    if (!time) {
      setStatus("error");
      setErrMsg(lang === "ja" ? "出発時刻を選択してください" : lang === "zh" ? "請選擇出發時間" : "Please select a pickup time");
      return;
    }
    setStatus("loading"); setErrMsg("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          from,
          to: mode === "transfer" ? to : "",
          date,
          time,
          addReturn: mode === "transfer" ? addReturn : false,
          returnDate: addReturn ? returnDate : "",
          returnTime: addReturn ? returnTime : "",
          duration: mode === "hour" ? duration : "",
          flightNum,
          people,
          bags,
          driverMsgs: driverMsgs.map(v =>
            v === "その他" && driverOtherText.trim()
              ? `その他：${driverOtherText.trim()}`
              : v
          ),
          name,
          email,
          phone: phone ? `+${dialCode} ${phone}` : "",
          hasWhatsapp: !!phone && hasWhatsapp,
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      setStatus(json.ok ? "success" : "error");
      if (!json.ok) setErrMsg(json.error ?? "Unknown error");
    } catch (err) { setErrMsg(String(err)); setStatus("error"); }
  }

  /* ── Success screen ── */
  if (status === "success") {
    return (
      <main className="min-h-screen bg-[#0c0c0c] flex flex-col">
        <Header alwaysFrosted frostedBg="bg-black/35" />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-28 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#c9a84c]/40 mb-8">
            <svg className="w-7 h-7 text-[#c9a84c]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <p className="text-[#c9a84c] text-[9px] tracking-[0.45em] uppercase mb-4">
            {lang === "ja" ? "送信完了" : lang === "zh" ? "已送出" : "Request Sent"}
          </p>
          <h2 className="text-white text-2xl font-light tracking-[0.15em] mb-4">
            {lang === "ja" ? "ありがとうございます" : lang === "zh" ? "感謝您的詢問" : "Thank You"}
          </h2>
          <p className="text-white/45 text-[13px] leading-[1.9] max-w-sm">
            {lang === "ja"
              ? "リクエストを受け付けました。担当者より折り返しご連絡いたします。"
              : lang === "zh"
              ? "我們已收到您的預訂請求，將盡快與您聯繫。"
              : "We've received your request and will be in touch shortly."}
          </p>
          <button onClick={() => {
            setStatus("idle"); setFrom(""); setTo(""); setDate(""); setTime("");
            setAddReturn(false); setReturnDate(""); setReturnTime(""); setDuration("");
            setFlightNum(""); setName(""); setEmail(""); setPhone("");
            setDriverMsgs([]); setDriverOtherText("");
          }} className="mt-10 text-[11px] tracking-[0.25em] text-white/35 hover:text-[#c9a84c] transition-colors uppercase">
            {lang === "ja" ? "← 新しいリクエスト" : lang === "zh" ? "← 新增請求" : "← New Request"}
          </button>
        </div>
        <SiteFooter />
      </main>
    );
  }

  /* ── Main form ── */
  return (
    <main className="min-h-screen bg-[#0c0c0c]">

      {/* ── Compact hero ── */}
      <div className="relative bg-[#0c0c0c] pt-[156px] sm:pt-[100px] pb-5 sm:pb-7 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Header alwaysFrosted frostedBg="bg-black/35" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[#c9a84c] text-[9px] tracking-[0.45em] mb-2 uppercase">{t.book_badge[lang]}</p>
          <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.12em] sm:tracking-[0.16em] leading-tight">
            {t.book_title[lang]}
          </h1>
          <p className="mt-1.5 text-white/35 text-[10px] tracking-[0.28em] uppercase">{t.book_sub[lang]}</p>
        </div>
      </div>

      {/* ── Form area ── */}
      <div className="bg-[#111111] pt-8 sm:pt-10 pb-36 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/"
            className="inline-flex items-center gap-2 text-[11px] tracking-widest text-white/30
                       hover:text-[#c9a84c] transition-colors mb-8 sm:mb-10">
            {t.book_back[lang]}
          </Link>

          {/* ── Mode Tabs ── */}
          <div className="flex mb-8 sm:mb-10 border border-white/10 overflow-hidden">
            <button type="button" onClick={() => setMode("transfer")}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5
                text-[11px] sm:text-[12px] tracking-[0.25em] uppercase transition-all duration-200
                ${mode === "transfer"
                  ? "bg-[#c9a84c] text-[#0c0c0c] font-bold"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"}`}>
              <IconArrow />
              {t.book_tab_transfer[lang]}
            </button>
            <button type="button" onClick={() => setMode("hour")}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5
                text-[11px] sm:text-[12px] tracking-[0.25em] uppercase transition-all duration-200
                ${mode === "hour"
                  ? "bg-[#c9a84c] text-[#0c0c0c] font-bold"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"}`}>
              <IconClockGold />
              {t.book_tab_hour[lang]}
            </button>
          </div>

          <form id="book-form" onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">

            {/* ═══ 1. ROUTE ═══ */}
            <div>
              <SectionLabel label={t.book_sec_route[lang]} />
              <div className={`grid grid-cols-1 ${mode === "transfer" ? "sm:grid-cols-2" : ""} gap-x-8 gap-y-7`}>
                <FieldWrap icon={<IconPin />} label={t.book_from[lang]} required htmlFor="book-from">
                  <PlacesInput id="book-from" placeholder={t.book_from_ph[lang]}
                    value={from} onChange={setFrom} required />
                </FieldWrap>
                {mode === "transfer" && (
                  <FieldWrap icon={<IconFlag />} label={t.book_to[lang]} required htmlFor="book-to">
                    <PlacesInput id="book-to" placeholder={t.book_to_ph[lang]}
                      value={to} onChange={setTo} required />
                  </FieldWrap>
                )}
              </div>
            </div>

            {/* ═══ 2. SCHEDULE ═══ */}
            <div>
              <SectionLabel label={t.book_sec_sched[lang]} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                <DatePickerField id="book-date" icon={<IconCalendar />} label={t.book_date[lang]}
                  value={date} onChange={setDate} required inputLang={inputLang} />
                <TimePickerField id="book-time" icon={<IconClock />} label={t.book_time[lang]}
                  value={time} onChange={setTime} required />

                {/* Duration — Hourly only */}
                {mode === "hour" && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="book-duration">
                      <FieldLabel icon={<IconClock />} label={t.book_duration[lang]} required />
                    </label>
                    <select id="book-duration" required={mode === "hour"}
                      value={duration} onChange={e => setDuration(e.target.value)}
                      className="w-full bg-[#111111] border-b border-white/20 focus:border-[#c9a84c]
                                 text-white text-[13px] tracking-wide py-3 outline-none transition-colors
                                 [color-scheme:dark] cursor-pointer">
                      <option value="" disabled>—</option>
                      {DURATIONS.map(d => (
                        <option key={d} value={d}>{d} {t.book_dur_h[lang]}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* ADD RETURN (collapsed) — same grid cell, same height as Duration */}
                {mode === "transfer" && !addReturn && (
                  <div className="flex flex-col gap-1.5">
                    {/* invisible spacer matching FieldLabel height so button aligns with Duration select */}
                    <div aria-hidden className="h-[22px]" />
                    <button type="button" onClick={() => setAddReturn(true)}
                      className="flex items-center gap-2.5 w-full text-[11px] sm:text-[12px] tracking-[0.22em]
                                 text-[#c9a84c]/70 hover:text-[#c9a84c] transition-all duration-200 uppercase
                                 border-b border-dashed border-[#c9a84c]/30 hover:border-[#c9a84c]/70 py-3">
                      <span className="text-[18px] leading-none font-extralight">+</span>
                      {t.book_add_return[lang]}
                    </button>
                  </div>
                )}
              </div>

              {/* ADD RETURN expanded panel — full width below grid */}
              {mode === "transfer" && addReturn && (
                <div className="mt-7 border border-[#c9a84c]/25 p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-[#c9a84c] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold">
                      {t.book_add_return[lang]}
                    </p>
                    <button
                      type="button"
                      onClick={() => { setAddReturn(false); setReturnDate(""); setReturnTime(""); }}
                      className="flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-[0.15em]
                                 text-white/50 hover:text-red-400 border border-white/15 hover:border-red-400/60
                                 px-3 py-1.5 transition-all duration-200 uppercase">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                      {lang === "ja" ? "削除" : lang === "zh" ? "刪除" : "Remove"}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                    <DatePickerField id="book-return-date" icon={<IconCalendar />} label={t.book_return_date[lang]}
                      value={returnDate} onChange={setReturnDate} inputLang={inputLang} />
                    <TimePickerField id="book-return-time" icon={<IconClock />} label={t.book_return_time[lang]}
                      value={returnTime} onChange={setReturnTime} />
                  </div>
                </div>
              )}
            </div>

            {/* ═══ 3. PASSENGERS & LUGGAGE ═══ */}
            <div>
              <SectionLabel label={t.book_sec_pax[lang]} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                <div className="flex flex-col gap-3">
                  <FieldLabel label={t.book_people[lang]} required />
                  <Stepper value={people} onChange={setPeople} min={1} max={9} />
                </div>
                <div className="flex flex-col gap-3">
                  <FieldLabel label={t.book_bags[lang]} required />
                  <Stepper value={bags} onChange={setBags} min={0} max={14} />
                </div>
              </div>
            </div>

            {/* ═══ 4. CONTACT INFORMATION ═══ */}
            <div>
              <SectionLabel label={t.book_sec_contact[lang]} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                <FieldWrap label={t.book_name[lang]} required htmlFor="book-name">
                  <input id="book-name" type="text" required
                    placeholder={t.book_name_ph[lang]} value={name}
                    onChange={e => setName(e.target.value)} className={inputCls} />
                </FieldWrap>
                <FieldWrap label={t.book_email[lang]} required htmlFor="book-email">
                  <input id="book-email" type="email" required
                    placeholder="your@email.com" value={email}
                    onChange={e => setEmail(e.target.value)} className={inputCls} />
                </FieldWrap>
              </div>

              <div className="mt-7">
                <FieldWrap label={t.book_phone[lang]} htmlFor="book-phone">
                  <div className="flex items-end gap-3">
                    <DialCodeSelect dialCode={dialCode} onChange={(dial) => setDialCode(dial)} />
                    <div className="flex-1">
                      <input id="book-phone" type="tel"
                        placeholder={t.book_phone_ph[lang]} value={phone}
                        onChange={e => setPhone(e.target.value)} className={inputCls} />
                    </div>
                  </div>
                  {phone && (
                    <label className="mt-3 flex items-center gap-2.5 cursor-pointer group w-fit">
                      <button type="button" onClick={() => setHasWhatsapp(v => !v)}
                        className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors
                          ${hasWhatsapp ? "bg-[#25D366] border-[#25D366]" : "border-white/25 hover:border-white/50"}`}>
                        {hasWhatsapp && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </button>
                      <svg className={`w-4 h-4 shrink-0 transition-colors ${hasWhatsapp ? "text-[#25D366]" : "text-white/25"}`}
                        viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span className={`text-[11px] tracking-wider transition-colors
                        ${hasWhatsapp ? "text-[#25D366]" : "text-white/30 group-hover:text-white/50"}`}>
                        {t.book_whatsapp[lang]}
                      </span>
                    </label>
                  )}
                </FieldWrap>
              </div>
            </div>

            {/* ═══ 5. BOOKING DETAILS (collapsible accordions) ═══ */}
            <div>
              <SectionLabel label={t.book_sec_details[lang]} />
              <div className="flex flex-col gap-3">

                {/* ── Add Flight Number ── */}
                <AccordionItem
                  labelClosed={t.book_add_flight_label[lang]}
                  labelOpen={t.book_flight_num[lang]}
                  icon={<IconPlane />}
                >
                  <div className="flex flex-col gap-4 pt-2">
                    <input
                      type="text"
                      placeholder={t.book_flight_ph[lang]}
                      value={flightNum}
                      onChange={e => setFlightNum(e.target.value.toUpperCase())}
                      className={inputCls}
                    />
                    <p className="text-[11px] sm:text-[12px] text-white/35 italic leading-[1.9]
                                  border-l-2 border-[#c9a84c]/45 pl-4">
                      {t.book_flight_note[lang]}
                    </p>
                  </div>
                </AccordionItem>

                {/* ── Add Notes for the Driver ── */}
                <AccordionItem
                  labelClosed={t.book_add_notes_label[lang]}
                  labelOpen={t.book_sec_driver[lang]}
                  icon={<IconNote />}
                >
                  <div className="pt-2 flex flex-col gap-4">
                    <p className="text-[11px] sm:text-[12px] text-white/25 leading-[1.85] border-l-2 border-[#c9a84c]/20 pl-3">
                      {t.book_drv_note[lang]}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {DRIVER_OPTS.map(o => {
                        const checked = driverMsgs.includes(o.value);
                        return (
                          <label key={o.value}
                            onClick={() => toggleDriver(o.value)}
                            className="flex items-center gap-3 cursor-pointer group py-2.5 px-3
                                       border border-white/[0.06] hover:border-white/20 transition-colors">
                            <div className={`w-4 h-4 border shrink-0 flex items-center justify-center transition-colors
                              ${checked ? "bg-[#c9a84c] border-[#c9a84c]" : "border-white/25 group-hover:border-white/50"}`}>
                              {checked && (
                                <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor"
                                  strokeWidth={3} viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              )}
                            </div>
                            <span className={`text-[12px] sm:text-[13px] tracking-wide transition-colors leading-snug
                              ${checked ? "text-white" : "text-white/50 group-hover:text-white/70"}`}>
                              {t[o.key][lang]}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {driverMsgs.includes("その他") && (
                      <input
                        type="text"
                        placeholder={t.book_drv_other_ph[lang]}
                        value={driverOtherText}
                        onChange={e => setDriverOtherText(e.target.value)}
                        className={inputCls}
                        autoFocus
                      />
                    )}
                  </div>
                </AccordionItem>

              </div>
            </div>

            {/* Error */}
            {status === "error" && (
              <p className="text-red-400 text-[12px] border border-red-400/20 px-4 py-3">
                {lang === "ja" ? "送信に失敗しました：" : lang === "zh" ? "發送失敗：" : "Failed: "}
                {errMsg}
              </p>
            )}

          </form>
        </div>
      </div>

      {/* ══ STICKY BOTTOM CTA — frosted glass ══ */}
      <div className="fixed bottom-0 inset-x-0 z-40
                      bg-black/55 backdrop-blur-2xl border-t border-white/[0.10]
                      shadow-[0_-20px_60px_rgba(0,0,0,0.55)]
                      px-4 py-3 sm:px-6 sm:py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <p className="text-white/30 text-[11px] sm:text-[12px] tracking-widest hidden sm:block font-medium">
            <span className="text-[#c9a84c] font-bold">*</span> {t.book_required[lang]}
          </p>
          <button
            type="submit"
            form="book-form"
            disabled={status === "loading"}
            onContextMenu={(e) => e.preventDefault()}
            className="group w-full sm:w-auto flex items-center justify-center gap-2.5
                       bg-[#c9a84c] text-[#0c0c0c] text-[12px] sm:text-[13px] tracking-[0.3em] font-black
                       px-8 py-3.5 sm:py-4 transition-all duration-200
                       hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_4px_28px_rgba(201,168,76,0.5)]
                       active:scale-110 active:shadow-[0_8px_36px_rgba(201,168,76,0.7)]
                       sm:active:scale-100 sm:active:shadow-[0_4px_28px_rgba(201,168,76,0.5)]"
          >
            {status === "loading" ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : (
              <>
                <span>{t.book_submit[lang]}</span>
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                  fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
