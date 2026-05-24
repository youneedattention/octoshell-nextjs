"use client";
import { FormEvent, useRef, useState } from "react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import PlacesInput from "@/components/PlacesInput";
import DialCodeSelect from "@/components/DialCodeSelect";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";

/* ── Duration options ────────────────────────────────────────────────── */
const DURATIONS = ["2", "3", "4", "5", "6", "7", "8", "10", "12"];

/* ── Driver-instruction multi-select options ─────────────────────────  */
const DRIVER_OPTS = [
  { value: "ミートアンドグリート",              key: "book_drv_meet"   },
  { value: "高速利用OK",                       key: "book_drv_hw"     },
  { value: "ゆっくり丁寧な運転をお願いしたい",  key: "book_drv_gentle" },
  { value: "会話は最小限にしてほしい",          key: "book_drv_quiet"  },
  { value: "ベビーシート",                     key: "book_drv_baby"   },
  { value: "その他",                           key: "book_drv_other"  },
] as const;

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

function FieldWrap({ label, required, htmlFor, children }: {
  label: string; required?: boolean; htmlFor?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor}
        className="text-[11px] sm:text-[12px] tracking-[0.28em] text-white/45 uppercase">
        {label}
        {required && <span className="ml-1 text-[#c9a84c]">*</span>}
      </label>
      {children}
    </div>
  );
}

function PickerField({ id, label, type, value, onChange, required, step, inputLang }: {
  id: string; label: string; type: "date" | "time";
  value: string; onChange: (v: string) => void; required?: boolean; step?: number; inputLang?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const open = () => {
    ref.current?.focus();
    try { (ref.current as HTMLInputElement & { showPicker?: () => void })?.showPicker?.(); }
    catch { /* fallback */ }
  };

  const localDate = type === "date" && value && inputLang
    ? (() => {
        try {
          const [y, m, d] = value.split("-").map(Number);
          return new Intl.DateTimeFormat(inputLang, {
            year: "numeric", month: "long", day: "numeric",
          }).format(new Date(y, m - 1, d));
        } catch { return value; }
      })()
    : null;

  const isLocalisedDate = type === "date" && !!inputLang;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} onClick={e => { e.preventDefault(); open(); }}
        className="text-[11px] sm:text-[12px] tracking-[0.28em] text-white/45 uppercase cursor-pointer select-none">
        {label}{required && <span className="ml-1 text-[#c9a84c]">*</span>}
      </label>

      {isLocalisedDate ? (
        <div className="relative cursor-pointer group" onClick={open}>
          <div className="w-full border-b border-white/20 group-hover:border-[#c9a84c]/50
                          text-[13px] py-3 transition-colors select-none pointer-events-none">
            {localDate
              ? <span className="text-white tracking-wide">{localDate}</span>
              : <span className="text-white/30">—</span>}
          </div>
          <input
            ref={ref} id={id} type="date" required={required}
            value={value} onChange={e => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            style={{ fontSize: "16px" }}
          />
        </div>
      ) : (
        <input ref={ref} id={id} type={type} required={required} step={step}
          value={value} onChange={e => onChange(e.target.value)} onClick={open}
          className="w-full bg-transparent border-b border-white/20 focus:border-[#c9a84c] text-white
                     text-[13px] tracking-wide py-3 outline-none transition-colors [color-scheme:dark] cursor-pointer" />
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

  /* Flight */
  const [flightNum,   setFlightNum]   = useState("");

  /* Passengers */
  const [people,      setPeople]      = useState(1);
  const [bags,        setBags]        = useState(1);

  /* Driver */
  const [driverMsgs,  setDriverMsgs]  = useState<string[]>([]);
  const [driverOtherText, setDriverOtherText] = useState("");

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
            {(["transfer", "hour"] as const).map((m) => (
              <button key={m} type="button" onClick={() => setMode(m)}
                className={`flex-1 py-3.5 text-[11px] sm:text-[12px] tracking-[0.28em] uppercase transition-all duration-200
                  ${mode === m
                    ? "bg-[#c9a84c] text-[#0c0c0c] font-bold"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"}`}>
                {m === "transfer" ? t.book_tab_transfer[lang] : t.book_tab_hour[lang]}
              </button>
            ))}
          </div>

          <form id="book-form" onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">

            {/* ═══ 1. ROUTE ═══ */}
            <div>
              <SectionLabel label={t.book_sec_route[lang]} />
              <div className={`grid grid-cols-1 ${mode === "transfer" ? "sm:grid-cols-2" : ""} gap-x-8 gap-y-7`}>
                <FieldWrap label={t.book_from[lang]} required htmlFor="book-from">
                  <PlacesInput id="book-from" placeholder={t.book_from_ph[lang]}
                    value={from} onChange={setFrom} required />
                </FieldWrap>
                {mode === "transfer" && (
                  <FieldWrap label={t.book_to[lang]} required htmlFor="book-to">
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
                <PickerField id="book-date" label={t.book_date[lang]} type="date"
                  value={date} onChange={setDate} required inputLang={inputLang} />
                <PickerField id="book-time" label={t.book_time[lang]} type="time"
                  value={time} onChange={setTime} required step={600} />

                {/* Duration — By the Hour only */}
                {mode === "hour" && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="book-duration"
                      className="text-[11px] sm:text-[12px] tracking-[0.28em] text-white/45 uppercase">
                      {t.book_duration[lang]}<span className="ml-1 text-[#c9a84c]">*</span>
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
              </div>

              {/* ADD RETURN — Transfer only */}
              {mode === "transfer" && (
                <div className="mt-6">
                  {!addReturn ? (
                    <button type="button" onClick={() => setAddReturn(true)}
                      className="flex items-center gap-2.5 text-[11px] sm:text-[12px] tracking-[0.22em]
                                 text-[#c9a84c]/70 hover:text-[#c9a84c] transition-all duration-200 uppercase
                                 border border-dashed border-[#c9a84c]/25 hover:border-[#c9a84c]/55 px-5 py-3">
                      <span className="text-[18px] leading-none font-extralight">+</span>
                      {t.book_add_return[lang]}
                    </button>
                  ) : (
                    <div className="border border-[#c9a84c]/20 p-4 sm:p-5 relative">
                      <button type="button"
                        onClick={() => { setAddReturn(false); setReturnDate(""); setReturnTime(""); }}
                        className="absolute top-3 right-4 text-white/30 hover:text-white/70 transition-colors text-xl leading-none">
                        ×
                      </button>
                      <p className="text-[#c9a84c] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase mb-5">
                        {t.book_add_return[lang]}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                        <PickerField id="book-return-date" label={t.book_return_date[lang]} type="date"
                          value={returnDate} onChange={setReturnDate} inputLang={inputLang} />
                        <PickerField id="book-return-time" label={t.book_return_time[lang]} type="time"
                          value={returnTime} onChange={setReturnTime} step={600} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ═══ 3. FLIGHT TRACKING (Transfer only, optional) ═══ */}
            {mode === "transfer" && (
              <div>
                <SectionLabel label={t.book_sec_flight[lang]} />
                <div className="flex flex-col gap-5">
                  <FieldWrap label={t.book_flight_num[lang]} htmlFor="book-flight">
                    <input id="book-flight" type="text"
                      placeholder={t.book_flight_ph[lang]}
                      value={flightNum}
                      onChange={e => setFlightNum(e.target.value.toUpperCase())}
                      className={inputCls} />
                  </FieldWrap>
                  <p className="text-[11px] sm:text-[12px] text-white/35 italic leading-[1.9]
                                border-l-2 border-[#c9a84c]/45 pl-4">
                    {t.book_flight_note[lang]}
                  </p>
                </div>
              </div>
            )}

            {/* ═══ 4. PASSENGERS & LUGGAGE ═══ */}
            <div>
              <SectionLabel label={t.book_sec_pax[lang]} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] sm:text-[12px] tracking-[0.28em] text-white/45 uppercase">
                    {t.book_people[lang]}<span className="ml-1 text-[#c9a84c]">*</span>
                  </span>
                  <Stepper value={people} onChange={setPeople} min={1} max={9} />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] sm:text-[12px] tracking-[0.28em] text-white/45 uppercase">
                    {t.book_bags[lang]}<span className="ml-1 text-[#c9a84c]">*</span>
                  </span>
                  <Stepper value={bags} onChange={setBags} min={0} max={14} />
                </div>
              </div>
            </div>

            {/* ═══ 5. MESSAGE FOR DRIVER ═══ */}
            <div>
              <SectionLabel label={t.book_sec_driver[lang]} />
              <p className="text-[11px] sm:text-[12px] text-white/25 leading-[1.85] mb-5 border-l-2 border-[#c9a84c]/20 pl-3">
                {t.book_drv_note[lang]}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DRIVER_OPTS.map(o => {
                  const checked = driverMsgs.includes(o.value);
                  return (
                    <label key={o.value}
                      onClick={() => toggleDriver(o.value)}
                      className="flex items-center gap-3 cursor-pointer group py-2.5 px-3 border border-white/[0.06] hover:border-white/20 transition-colors">
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

            {/* ═══ 6. CONTACT INFORMATION ═══ */}
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

          </form>
        </div>
      </div>

      {/* ══ STICKY BOTTOM CTA — frosted glass, bold ══ */}
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
            className="group w-full sm:w-auto flex items-center justify-center gap-2.5
                       bg-[#c9a84c] text-[#0c0c0c] text-[12px] sm:text-[13px] tracking-[0.3em] font-black
                       px-8 py-3.5 sm:py-4 transition-all duration-200
                       hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_4px_28px_rgba(201,168,76,0.5)]"
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
