"use client";
import { FormEvent, useRef, useState } from "react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import PlacesInput from "@/components/PlacesInput";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";

/* ─────────────────────────────────────────────────────────────────────
   Stepper — ± buttons + editable number input (click to type)
───────────────────────────────────────────────────────────────────── */
function Stepper({
  value, onChange, min = 0, max = 14,
}: { value: number; onChange: (n: number) => void; min?: number; max?: number }) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div className="flex items-center">
      {/* − */}
      <button type="button" onClick={() => onChange(clamp(value - 1))}
        className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/55
                   hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors select-none text-base leading-none">
        −
      </button>

      {/* editable number — click to type, hides native spinners via globals.css */}
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!isNaN(n)) onChange(clamp(n));
        }}
        onBlur={(e) => {
          const n = parseInt(e.target.value, 10);
          onChange(isNaN(n) ? min : clamp(n));
        }}
        className="stepper-input w-12 h-9 border-y border-white/20 bg-transparent text-white
                   text-sm text-center outline-none tracking-widest focus:border-[#c9a84c]/50
                   transition-colors"
      />

      {/* + */}
      <button type="button" onClick={() => onChange(clamp(value + 1))}
        className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/55
                   hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors select-none text-base leading-none">
        +
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   PickerField — label click triggers showPicker() on date/time inputs
───────────────────────────────────────────────────────────────────── */
function PickerField({
  id, label, type, value, onChange, required,
}: {
  id: string; label: string; type: "date" | "time";
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const open = () => {
    ref.current?.focus();
    /* showPicker() is available in Chrome/Edge 99+, FF 101+, Safari 16+ */
    try { (ref.current as HTMLInputElement & { showPicker?: () => void })?.showPicker?.(); }
    catch { /* fallback: focus is enough */ }
  };

  const base =
    "w-full bg-transparent border-b border-white/20 focus:border-[#c9a84c] " +
    "text-white text-[13px] tracking-wide py-3 outline-none transition-colors " +
    "[color-scheme:dark] cursor-pointer";

  return (
    <div className="flex flex-col gap-1.5">
      {/* Clicking the label text also opens the picker */}
      <label
        htmlFor={id}
        onClick={(e) => { e.preventDefault(); open(); }}
        className="text-[10px] tracking-[0.28em] text-white/45 uppercase cursor-pointer select-none"
      >
        {label}
        {required && <span className="ml-1 text-[#c9a84c]">*</span>}
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={open}
        className={base}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Section divider label
───────────────────────────────────────────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <span className="w-5 h-px bg-[#c9a84c]" />
      <p className="text-[#c9a84c] text-[9px] tracking-[0.45em] uppercase">{label}</p>
      <span className="flex-1 h-px bg-white/[0.07]" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Generic field wrapper (for text/email inputs)
───────────────────────────────────────────────────────────────────── */
function FieldWrap({
  label, required, htmlFor, children,
}: { label: string; required?: boolean; htmlFor?: string; children: React.ReactNode }) {
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

const inputCls =
  "w-full bg-transparent border-b border-white/20 focus:border-[#c9a84c] " +
  "text-white text-[13px] tracking-wide py-3 outline-none transition-colors " +
  "placeholder:text-white/30";

/* ─────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────── */
type Status = "idle" | "loading" | "success" | "error";

export default function BookPage() {
  const { lang } = useLang();

  /* form state */
  const [from,   setFrom]   = useState("");
  const [to,     setTo]     = useState("");
  const [date,   setDate]   = useState("");
  const [time,   setTime]   = useState("");
  const [people, setPeople] = useState(1);
  const [bags,   setBags]   = useState(1);
  const [name,   setName]   = useState("");
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, date, time, people, bags, name, email }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (json.ok) {
        setStatus("success");
      } else {
        setErrMsg(json.error ?? "Unknown error");
        setStatus("error");
      }
    } catch (err) {
      setErrMsg(String(err));
      setStatus("error");
    }
  }

  /* ── Success screen ── */
  if (status === "success") {
    return (
      <main className="min-h-screen bg-[#0c0c0c] flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-28 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#c9a84c]/40 mb-8">
            <svg className="w-7 h-7 text-[#c9a84c]" fill="none" stroke="currentColor"
              strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <p className="text-[#c9a84c] text-[9px] tracking-[0.45em] uppercase mb-4">
            {lang === "ja" ? "送信完了" : lang === "zh" ? "已送出" : "Request Sent"}
          </p>
          <h2 className="text-white text-2xl font-light tracking-[0.15em] mb-4">
            {lang === "ja" ? "ありがとうございます"
              : lang === "zh" ? "感謝您的詢問"
              : "Thank You"}
          </h2>
          <p className="text-white/45 text-[13px] leading-[1.9] max-w-sm">
            {lang === "ja"
              ? "リクエストを受け付けました。担当者より折り返しご連絡いたします。"
              : lang === "zh"
              ? "我們已收到您的預訂請求，將盡快與您聯繫。"
              : "We've received your request and will be in touch shortly."}
          </p>
          <button
            onClick={() => { setStatus("idle"); setFrom(""); setTo(""); setDate(""); setTime(""); setName(""); setEmail(""); }}
            className="mt-10 text-[11px] tracking-[0.25em] text-white/35 hover:text-[#c9a84c] transition-colors uppercase"
          >
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

      {/* ── Hero / title bar ─────────────────────────────────── */}
      <div className="relative bg-[#0c0c0c] pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        {/* subtle grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        <Header />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[#c9a84c] text-[9px] sm:text-[10px] tracking-[0.45em] mb-4 uppercase">
            {t.book_badge[lang]}
          </p>
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.12em] sm:tracking-[0.18em] leading-tight">
            {t.book_title[lang]}
          </h1>
          <p className="mt-3 text-white/40 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase">
            {t.book_sub[lang]}
          </p>
          <div className="mt-7 w-12 h-px bg-[#c9a84c]/60" />
        </div>
      </div>

      {/* ── Form ─────────────────────────────────────────────── */}
      <div className="bg-[#111111] py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/"
            className="inline-flex items-center gap-2 text-[11px] tracking-widest text-white/35
                       hover:text-[#c9a84c] transition-colors mb-12 sm:mb-16">
            {t.book_back[lang]}
          </Link>

          <form onSubmit={handleSubmit} className="space-y-14 sm:space-y-16">

            {/* ── 1. Route ── */}
            <div>
              <SectionLabel label={t.book_sec_route[lang]} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                <FieldWrap label={t.book_from[lang]} required htmlFor="book-from">
                  <PlacesInput
                    id="book-from"
                    placeholder={t.book_from_ph[lang]}
                    value={from}
                    onChange={setFrom}
                    required
                  />
                </FieldWrap>
                <FieldWrap label={t.book_to[lang]} required htmlFor="book-to">
                  <PlacesInput
                    id="book-to"
                    placeholder={t.book_to_ph[lang]}
                    value={to}
                    onChange={setTo}
                    required
                  />
                </FieldWrap>
              </div>
            </div>

            {/* ── 2. Schedule ── */}
            <div>
              <SectionLabel label={t.book_sec_sched[lang]} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                <PickerField
                  id="book-date"
                  label={t.book_date[lang]}
                  type="date"
                  value={date}
                  onChange={setDate}
                  required
                />
                <PickerField
                  id="book-time"
                  label={t.book_time[lang]}
                  type="time"
                  value={time}
                  onChange={setTime}
                  required
                />
              </div>
            </div>

            {/* ── 3. Passengers & Luggage ── */}
            <div>
              <SectionLabel label={t.book_sec_pax[lang]} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] tracking-[0.28em] text-white/45 uppercase">
                    {t.book_people[lang]}
                  </span>
                  <Stepper value={people} onChange={setPeople} min={1} max={9} />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] tracking-[0.28em] text-white/45 uppercase">
                    {t.book_bags[lang]}
                  </span>
                  <Stepper value={bags} onChange={setBags} min={0} max={14} />
                </div>
              </div>
            </div>

            {/* ── 4. Contact ── */}
            <div>
              <SectionLabel label={t.book_sec_contact[lang]} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                <FieldWrap label={t.book_name[lang]} required htmlFor="book-name">
                  <input
                    id="book-name"
                    type="text"
                    required
                    placeholder={t.book_name_ph[lang]}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputCls}
                  />
                </FieldWrap>
                <FieldWrap label={t.book_email[lang]} required htmlFor="book-email">
                  <input
                    id="book-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                  />
                </FieldWrap>
              </div>
            </div>

            {/* ── Error message ── */}
            {status === "error" && (
              <p className="text-red-400 text-[12px] tracking-wide border border-red-400/20 px-4 py-3">
                {lang === "ja" ? "送信に失敗しました：" : lang === "zh" ? "發送失敗：" : "Failed to send: "}
                {errMsg}
              </p>
            )}

            {/* ── Submit ── */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-white/25 text-[11px] tracking-widest">
                <span className="text-[#c9a84c]">*</span> {t.book_required[lang]}
              </p>
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative inline-flex items-center gap-3 overflow-hidden
                           border border-[#c9a84c]/60 text-white text-[11px] tracking-[0.28em]
                           px-10 py-4 transition-all duration-300
                           hover:border-[#c9a84c] hover:text-[#0c0c0c]
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* gold fill animation */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0
                                 bg-[#c9a84c] transition-transform duration-300 ease-in-out" />

                {status === "loading" ? (
                  /* spinner */
                  <svg className="relative w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : (
                  <>
                    <span className="relative">{t.book_submit[lang]}</span>
                    <svg className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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

      <SiteFooter />
    </main>
  );
}
