"use client";
import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import PlacesInput from "@/components/PlacesInput";
import DialCodeSelect from "@/components/DialCodeSelect";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";

/* ── Assets ─────────────────────────────────────────────────────────── */
const ALPHARD = "https://octoshell.jp/wp-content/uploads/2024/09/toyotaalphard.png";
const HIACE   = "https://octoshell.jp/wp-content/uploads/2024/09/toyatahiace.png";

/* ── Driver-instruction multi-select options ─────────────────────────  */
const DRIVER_OPTS = [
  { value: "高速利用OK",                      key: "book_drv_hw"     },
  { value: "ゆっくり丁寧な運転をお願いしたい", key: "book_drv_gentle" },
  { value: "会話は最小限にしてほしい",         key: "book_drv_quiet"  },
  { value: "その他",                          key: "book_drv_other"  },
] as const;

/* ── Vehicle data ────────────────────────────────────────────────────── */
type VehicleKey = "none" | "alphard" | "hiace";
interface VehicleDef {
  key: VehicleKey;
  price: string;
  capKey: string | null;
  exKey:  string | null;
  img:    string | null;
}
const VEHICLES: VehicleDef[] = [
  { key: "none",    price: "+¥0",     capKey: null,            exKey: null,          img: null    },
  { key: "alphard", price: "+¥500",   capKey: "book_veh_cap6", exKey: "book_veh_ex_a", img: ALPHARD },
  { key: "hiace",   price: "+¥4,500", capKey: "book_veh_cap9", exKey: "book_veh_ex_h", img: HIACE   },
];
const VEHICLE_NAME: Record<VehicleKey, string> = {
  none:    "book_veh_any",
  alphard: "book_veh_alphard",
  hiace:   "book_veh_hiace",
};

/* ══════════════════════════════════════════════════════════════════════
   Sub-components
══════════════════════════════════════════════════════════════════════ */

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 sm:mb-7">
      <span className="w-5 h-px bg-[#c9a84c]" />
      <p className="text-[#c9a84c] text-[9px] tracking-[0.45em] uppercase">{label}</p>
      <span className="flex-1 h-px bg-white/[0.07]" />
    </div>
  );
}

function FieldWrap({ label, required, htmlFor, children }: {
  label: string; required?: boolean; htmlFor?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor}
        className="text-[10px] tracking-[0.28em] text-white/45 uppercase">
        {label}
        {required && <span className="ml-1 text-[#c9a84c]">*</span>}
      </label>
      {children}
    </div>
  );
}

function PickerField({ id, label, type, value, onChange, required, step }: {
  id: string; label: string; type: "date" | "time";
  value: string; onChange: (v: string) => void; required?: boolean; step?: number;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const open = () => {
    ref.current?.focus();
    try { (ref.current as HTMLInputElement & { showPicker?: () => void })?.showPicker?.(); }
    catch { /* fallback */ }
  };
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} onClick={e => { e.preventDefault(); open(); }}
        className="text-[10px] tracking-[0.28em] text-white/45 uppercase cursor-pointer select-none">
        {label}{required && <span className="ml-1 text-[#c9a84c]">*</span>}
      </label>
      <input ref={ref} id={id} type={type} required={required} step={step}
        value={value} onChange={e => onChange(e.target.value)} onClick={open}
        className="w-full bg-transparent border-b border-white/20 focus:border-[#c9a84c] text-white
                   text-[13px] tracking-wide py-3 outline-none transition-colors [color-scheme:dark] cursor-pointer" />
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
                   hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors select-none text-base">
        −
      </button>
      <input type="number" value={value} min={min} max={max}
        onChange={e => { const n = parseInt(e.target.value, 10); if (!isNaN(n)) onChange(clamp(n)); }}
        onBlur={e => { const n = parseInt(e.target.value, 10); onChange(isNaN(n) ? min : clamp(n)); }}
        className="stepper-input w-12 h-9 border-y border-white/20 bg-transparent text-white
                   text-sm text-center outline-none tracking-widest" />
      <button type="button" onClick={() => onChange(clamp(value + 1))}
        className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/55
                   hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors select-none text-base">
        +
      </button>
    </div>
  );
}

/* ── Vehicle card ── */
function VehicleCard({ v, nameLabel, capLabel, exLabel, selected, onSelect, lang }: {
  v: VehicleDef; nameLabel: string; capLabel: string | null; exLabel: string | null;
  selected: boolean; onSelect: () => void; lang: "en"|"ja"|"zh";
}) {
  return (
    <label htmlFor={`veh-${v.key}`}
      className={`relative cursor-pointer flex flex-col border transition-all duration-200
        ${selected ? "border-[#c9a84c]" : "border-white/10 hover:border-white/25"}`}>
      <input type="radio" id={`veh-${v.key}`} name="vehicle"
        className="sr-only" checked={selected} onChange={onSelect} readOnly />

      {selected && (
        <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-[#c9a84c] flex items-center justify-center">
          <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      )}

      {/* Image area — white bg so mix-blend-multiply removes white from PNG */}
      <div className="bg-white flex items-center justify-center h-28 sm:h-32 overflow-hidden">
        {v.img ? (
          <Image src={v.img} alt={nameLabel} width={200} height={100}
            className="object-contain max-h-[90%] w-auto mix-blend-multiply" />
        ) : (
          <svg className="w-12 h-12 text-black/[0.07]" fill="none" stroke="currentColor"
            strokeWidth={0.8} viewBox="0 0 64 40">
            <path d="M8 28 L14 14 Q16 10 20 10 L44 10 Q48 10 50 14 L56 28 Q60 29 60 33 L60 36 Q60 38 58 38 L52 38 Q50 38 50 36 L50 33 L14 33 L14 36 Q14 38 12 38 L6 38 Q4 38 4 36 L4 33 Q4 29 8 28 Z" />
            <circle cx="18" cy="33" r="5" />
            <circle cx="46" cy="33" r="5" />
          </svg>
        )}
      </div>

      <div className="bg-[#0e0e0e] px-3 py-3 flex-1">
        <div className="flex items-start justify-between gap-1">
          <span className="text-white text-[12px] sm:text-[13px] font-semibold leading-tight">{nameLabel}</span>
          <span className={`text-[15px] sm:text-[16px] font-mono font-bold shrink-0 ${v.price === "+¥0" ? "text-white/30" : "text-[#c9a84c]"}`}>
            {v.price}
          </span>
        </div>
        {capLabel && <p className="text-white/40 text-[10px] mt-1.5 leading-snug">{capLabel}</p>}
        {exLabel && <p className="text-white/25 text-[10px] mt-0.5">【{lang === "ja" ? "例" : "e.g."}】{exLabel}</p>}
      </div>
    </label>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════════ */
const inputCls =
  "w-full bg-transparent border-b border-white/20 focus:border-[#c9a84c] " +
  "text-white text-[13px] tracking-wide py-3 outline-none transition-colors placeholder:text-white/30";

type Status = "idle" | "loading" | "success" | "error";

export default function BookPage() {
  const { lang } = useLang();

  const [from,        setFrom]        = useState("");
  const [to,          setTo]          = useState("");
  const [date,        setDate]        = useState("");
  const [time,        setTime]        = useState("");
  const [people,      setPeople]      = useState(1);
  const [bags,        setBags]        = useState(1);
  const [vehicle,     setVehicle]     = useState<VehicleKey>("none");
  const [driverMsgs,  setDriverMsgs]  = useState<string[]>([]);
  const [driverOtherText, setDriverOtherText] = useState("");
  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [dialCode,    setDialCode]    = useState("81");
  const [phone,       setPhone]       = useState("");
  const [hasWhatsapp, setHasWhatsapp] = useState(false);
  const [status,      setStatus]      = useState<Status>("idle");
  const [errMsg,      setErrMsg]      = useState("");

  const toggleDriver = (val: string) => {
    setDriverMsgs(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
    if (val === "その他") setDriverOtherText("");
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading"); setErrMsg("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from, to, date, time, people, bags,
          vehicle,
          driverMsgs: driverMsgs.map(v =>
            v === "その他" && driverOtherText.trim()
              ? `その他：${driverOtherText.trim()}`
              : v
          ),
          name, email,
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
        <Header />
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
            setName(""); setEmail(""); setPhone(""); setVehicle("none"); setDriverMsgs([]); setDriverOtherText("");
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
      <div className="relative bg-[#0c0c0c] pt-[82px] sm:pt-24 pb-5 sm:pb-7 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Header />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[#c9a84c] text-[9px] tracking-[0.45em] mb-2 uppercase">
            {t.book_badge[lang]}
          </p>
          <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.12em] sm:tracking-[0.16em] leading-tight">
            {t.book_title[lang]}
          </h1>
          <p className="mt-1.5 text-white/35 text-[10px] tracking-[0.28em] uppercase">
            {t.book_sub[lang]}
          </p>
        </div>
      </div>

      {/* ── Form ── */}
      <div className="bg-[#111111] pt-8 sm:pt-10 pb-28 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/"
            className="inline-flex items-center gap-2 text-[11px] tracking-widest text-white/30
                       hover:text-[#c9a84c] transition-colors mb-8 sm:mb-10">
            {t.book_back[lang]}
          </Link>

          <form id="book-form" onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">

            {/* ═══ 1. ROUTE ═══ */}
            <div>
              <SectionLabel label={t.book_sec_route[lang]} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                <FieldWrap label={t.book_from[lang]} required htmlFor="book-from">
                  <PlacesInput id="book-from" placeholder={t.book_from_ph[lang]}
                    value={from} onChange={setFrom} required />
                </FieldWrap>
                <FieldWrap label={t.book_to[lang]} required htmlFor="book-to">
                  <PlacesInput id="book-to" placeholder={t.book_to_ph[lang]}
                    value={to} onChange={setTo} required />
                </FieldWrap>
              </div>
            </div>

            {/* ═══ 2. SCHEDULE ═══ */}
            <div>
              <SectionLabel label={t.book_sec_sched[lang]} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                <PickerField id="book-date" label={t.book_date[lang]} type="date"
                  value={date} onChange={setDate} required />
                <PickerField id="book-time" label={t.book_time[lang]} type="time"
                  value={time} onChange={setTime} required step={600} />
              </div>
            </div>

            {/* ═══ 3. PASSENGERS ═══ */}
            <div>
              <SectionLabel label={t.book_sec_pax[lang]} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] tracking-[0.28em] text-white/45 uppercase">
                    {t.book_people[lang]}<span className="ml-1 text-[#c9a84c]">*</span>
                  </span>
                  <Stepper value={people} onChange={setPeople} min={1} max={9} />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] tracking-[0.28em] text-white/45 uppercase">
                    {t.book_bags[lang]}<span className="ml-1 text-[#c9a84c]">*</span>
                  </span>
                  <Stepper value={bags} onChange={setBags} min={0} max={14} />
                </div>
              </div>
            </div>

            {/* ═══ 4. VEHICLE ═══ */}
            <div>
              <SectionLabel label={t.book_sec_vehicle[lang]} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {VEHICLES.map(v => (
                  <VehicleCard key={v.key} v={v}
                    nameLabel={t[VEHICLE_NAME[v.key]][lang]}
                    capLabel={v.capKey ? t[v.capKey][lang] : null}
                    exLabel={v.exKey  ? t[v.exKey][lang]  : null}
                    selected={vehicle === v.key}
                    onSelect={() => setVehicle(v.key)}
                    lang={lang}
                  />
                ))}
              </div>
            </div>

            {/* ═══ 5. DRIVER INSTRUCTIONS (multi-select checkboxes) ═══ */}
            <div>
              <SectionLabel label={t.book_sec_driver[lang]} />
              <p className="text-[11px] text-white/25 leading-[1.85] mb-5 border-l-2 border-[#c9a84c]/20 pl-3">
                {t.book_drv_note[lang]}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DRIVER_OPTS.map(o => {
                  const checked = driverMsgs.includes(o.value);
                  return (
                    <label key={o.value}
                      onClick={() => toggleDriver(o.value)}
                      className="flex items-center gap-3 cursor-pointer group py-2.5 px-3 border border-white/[0.06] hover:border-white/20 transition-colors">
                      {/* Checkbox */}
                      <div className={`w-4 h-4 border shrink-0 flex items-center justify-center transition-colors
                        ${checked ? "bg-[#c9a84c] border-[#c9a84c]" : "border-white/25 group-hover:border-white/50"}`}>
                        {checked && (
                          <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor"
                            strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-[12px] tracking-wide transition-colors leading-snug
                        ${checked ? "text-white" : "text-white/50 group-hover:text-white/70"}`}>
                        {t[o.key][lang]}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Other — free-text input */}
              {driverMsgs.includes("その他") && (
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder={t.book_drv_other_ph[lang]}
                    value={driverOtherText}
                    onChange={e => setDriverOtherText(e.target.value)}
                    className={inputCls}
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* ═══ 6. CONTACT ═══ */}
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

              {/* Emergency phone */}
              <div className="mt-7">
                <FieldWrap label={t.book_phone[lang]} htmlFor="book-phone">
                  <div className="flex items-end gap-3">
                    <DialCodeSelect dialCode={dialCode}
                      onChange={(dial) => setDialCode(dial)} />
                    <div className="flex-1">
                      <input id="book-phone" type="tel"
                        placeholder={t.book_phone_ph[lang]} value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className={inputCls} />
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

            {/* Error */}
            {status === "error" && (
              <p className="text-red-400 text-[12px] border border-red-400/20 px-4 py-3">
                {lang === "ja" ? "送信に失敗しました：" : lang === "zh" ? "發送失敗：" : "Failed: "}
                {errMsg}
              </p>
            )}

            {/* ── In-form submit (desktop, visible at end) ── */}
            <div className="pt-2 flex items-center justify-between gap-4 sm:flex">
              <p className="text-white/20 text-[11px] tracking-widest hidden sm:block">
                <span className="text-[#c9a84c]">*</span> {t.book_required[lang]}
              </p>
              <button type="submit" disabled={status === "loading"}
                className="group relative hidden sm:inline-flex items-center gap-3 overflow-hidden
                           border border-[#c9a84c]/60 text-white text-[11px] tracking-[0.28em]
                           px-10 py-4 transition-all duration-300
                           hover:border-[#c9a84c] hover:text-[#0c0c0c]
                           disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0
                                 bg-[#c9a84c] transition-transform duration-300 ease-in-out" />
                {status === "loading" ? (
                  <svg className="relative w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : (
                  <>
                    <span className="relative">{t.book_submit[lang]}</span>
                    <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* ══ STICKY BOTTOM CTA — always visible ══════════════════════════
          On mobile: full-width gold bar
          On desktop: pill aligned right inside max-w container           */}
      <div className="fixed bottom-0 inset-x-0 z-40
                      bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/[0.08]
                      px-4 py-3 sm:px-6 sm:py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <p className="text-white/25 text-[10px] tracking-widest hidden sm:block">
            <span className="text-[#c9a84c]">*</span> {t.book_required[lang]}
          </p>
          <button
            type="submit"
            form="book-form"
            disabled={status === "loading"}
            className="group w-full sm:w-auto flex items-center justify-center gap-2.5
                       bg-[#c9a84c] text-[#0c0c0c] text-[11px] tracking-[0.3em] font-bold
                       px-8 py-3 sm:py-3.5 transition-all duration-200
                       hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
