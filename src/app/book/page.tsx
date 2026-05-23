"use client";
import { useState, FormEvent } from "react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import PlacesInput from "@/components/PlacesInput";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";

/* ── Stepper component ─────────────────────────────────────────────── */
function Stepper({
  value,
  onChange,
  min = 1,
  max = 14,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-0">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/60
                   hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-lg select-none"
        aria-label="Decrease"
      >
        −
      </button>
      <div className="w-12 h-9 flex items-center justify-center border-y border-white/20 text-white text-sm tracking-widest select-none">
        {value}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/60
                   hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-lg select-none"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

/* ── Section heading ───────────────────────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <span className="w-5 h-px bg-[#c9a84c]" />
      <p className="text-[#c9a84c] text-[9px] tracking-[0.45em] uppercase">{label}</p>
      <span className="flex-1 h-px bg-white/[0.07]" />
    </div>
  );
}

/* ── Input wrapper ─────────────────────────────────────────────────── */
function FieldWrap({
  label,
  required,
  children,
  htmlFor,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[10px] tracking-[0.28em] text-white/45 uppercase"
      >
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

/* ── Page ─────────────────────────────────────────────────────────── */
export default function BookPage() {
  const { lang } = useLang();

  /* form state */
  const [from, setFrom]       = useState("");
  const [to, setTo]           = useState("");
  const [date, setDate]       = useState("");
  const [time, setTime]       = useState("");
  const [people, setPeople]   = useState(2);
  const [bags, setBags]       = useState(2);
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    /* In production: POST to API route / email service */
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-[#0c0c0c]">

      {/* ── Hero title bar ─────────────────────────────────────── */}
      <div className="relative bg-[#0c0c0c] pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        {/* subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
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

      {/* ── Form area ──────────────────────────────────────────── */}
      <div className="bg-[#111111] py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] tracking-widest text-white/35
                       hover:text-[#c9a84c] transition-colors mb-12 sm:mb-16"
          >
            {t.book_back[lang]}
          </Link>

          {sent ? (
            /* ── Success state ── */
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#c9a84c]/40 mb-7">
                <svg className="w-6 h-6 text-[#c9a84c]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="text-white text-xl font-light tracking-[0.2em] mb-3">
                {lang === "ja" ? "送信完了" : lang === "zh" ? "已送出" : "Request Sent"}
              </h2>
              <p className="text-white/50 text-[13px] leading-relaxed max-w-sm mx-auto">
                {lang === "ja"
                  ? "お問い合わせありがとうございます。担当者より折り返しご連絡いたします。"
                  : lang === "zh"
                  ? "感謝您的詢問，我們將盡快與您聯繫。"
                  : "Thank you for your request. We will get back to you shortly."}
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-10 text-[11px] tracking-[0.25em] text-white/40 hover:text-[#c9a84c] transition-colors uppercase"
              >
                {lang === "ja" ? "← 戻る" : lang === "zh" ? "← 返回" : "← New Request"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-14 sm:space-y-16">

              {/* ── 1. Route ── */}
              <div>
                <SectionLabel label={t.book_sec_route[lang]} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                  <FieldWrap label={t.book_from[lang]} required htmlFor="from">
                    <PlacesInput
                      id="from"
                      placeholder={t.book_from_ph[lang]}
                      value={from}
                      onChange={setFrom}
                      required
                    />
                  </FieldWrap>
                  <FieldWrap label={t.book_to[lang]} required htmlFor="to">
                    <PlacesInput
                      id="to"
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
                  <FieldWrap label={t.book_date[lang]} required htmlFor="date">
                    <input
                      id="date"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={inputCls + " [color-scheme:dark]"}
                    />
                  </FieldWrap>
                  <FieldWrap label={t.book_time[lang]} required htmlFor="time">
                    <input
                      id="time"
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={inputCls + " [color-scheme:dark]"}
                    />
                  </FieldWrap>
                </div>
              </div>

              {/* ── 3. Passengers & Luggage ── */}
              <div>
                <SectionLabel label={t.book_sec_pax[lang]} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                  <FieldWrap label={t.book_people[lang]}>
                    <div className="pt-2">
                      <Stepper value={people} onChange={setPeople} min={1} max={9} />
                    </div>
                  </FieldWrap>
                  <FieldWrap label={t.book_bags[lang]}>
                    <div className="pt-2">
                      <Stepper value={bags} onChange={setBags} min={0} max={14} />
                    </div>
                  </FieldWrap>
                </div>
              </div>

              {/* ── 4. Contact ── */}
              <div>
                <SectionLabel label={t.book_sec_contact[lang]} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                  <FieldWrap label={t.book_name[lang]} required htmlFor="cname">
                    <input
                      id="cname"
                      type="text"
                      required
                      placeholder={t.book_name_ph[lang]}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputCls}
                    />
                  </FieldWrap>
                  <FieldWrap label={t.book_email[lang]} required htmlFor="cemail">
                    <input
                      id="cemail"
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

              {/* ── Submit ── */}
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-white/25 text-[11px] tracking-widest">
                  <span className="text-[#c9a84c]">*</span> {t.book_required[lang]}
                </p>
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-3 overflow-hidden
                             border border-[#c9a84c]/60 text-white text-[11px] tracking-[0.28em]
                             px-10 py-4 transition-all duration-300
                             hover:border-[#c9a84c] hover:text-[#0c0c0c]"
                >
                  {/* fill-in animation */}
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-0
                               bg-[#c9a84c] transition-transform duration-300 ease-in-out"
                  />
                  <span className="relative">{t.book_submit[lang]}</span>
                  <svg
                    className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <SiteFooter />
    </main>
  );
}
