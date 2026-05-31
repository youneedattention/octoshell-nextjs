"use client";
import { useState } from "react";

/* ── Icons ─────────────────────────────────────────────────────────── */
const IconCleanliness = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
  </svg>
);
const IconPunctuality = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3.5 3.5"/>
  </svg>
);
const IconHospitality = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9"/>
    <path strokeLinecap="round" d="M8.5 14s1 2 3.5 2 3.5-2 3.5-2"/>
    <path strokeLinecap="round" strokeWidth={2} d="M9 10h.01M15 10h.01"/>
  </svg>
);
const IconDriving = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="3"/>
    <path strokeLinecap="round" d="M12 3v6M4.22 9h5.52M14.26 9h5.52"/>
  </svg>
);
const IconValue = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.613.226l5.383-6.115a2.25 2.25 0 00-.226-2.613L12.16 3.659A2.25 2.25 0 0010.568 3H9.568z"/>
    <circle cx="6.5" cy="6.5" r=".75" fill="currentColor" stroke="none"/>
  </svg>
);

/* ── Data ───────────────────────────────────────────────────────────── */
const RATINGS = [
  { label: "Vehicle Cleanliness", score: 5.0, Icon: IconCleanliness },
  { label: "Punctuality",         score: 5.0, Icon: IconPunctuality },
  { label: "Hospitality",         score: 4.9, Icon: IconHospitality },
  { label: "Driving Comfort",     score: 4.9, Icon: IconDriving     },
  { label: "Value",               score: 4.8, Icon: IconValue       },
];

const REVIEWS = [
  {
    name: "J. K.",
    location: "United Kingdom",
    date: "May 2025",
    trip: "Narita → Tokyo",
    text: "Ryu san was a very nice driver. Well-dressed and polite, and drove very smoothly.",
    tags: ["Professional", "Well-dressed", "Smooth Ride"],
  },
  {
    name: "Michael Smith",
    location: "United States",
    date: "April 2025",
    trip: "Haneda → Tokyo",
    text: "Mr. Wang was also very courteous and cooperative. It was a great help throughout the day.",
    tags: ["Professional", "Attentive", "Friendly"],
  },
  {
    name: "Evelyn",
    location: "Australia",
    date: "March 2025",
    trip: "Shuzenji → Haneda",
    text: "Driver Du-san is so wonderful. He responded to every request. I was very happy to work with him.",
    tags: ["Professional", "Attentive", "Friendly"],
  },
];

const ALL_TAGS = ["Professional", "Well-dressed", "Smooth Ride", "Attentive", "Friendly"];

const STAR_DIST = [
  { stars: 5, count: 3 },
  { stars: 4, count: 0 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

/* ── Sub-components ─────────────────────────────────────────────────── */
function Stars() {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3 h-3 text-[#c9a84c]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-[#c9a84c]/12 border border-[#c9a84c]/25 flex items-center justify-center shrink-0">
      <span className="text-[13px] font-bold text-[#c9a84c]">{name.charAt(0).toUpperCase()}</span>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────── */
export default function ReviewsSection() {
  const [activeTag,      setActiveTag]      = useState<string | null>(null);
  const [expanded,       setExpanded]       = useState<Set<number>>(new Set());
  const [howOpen,        setHowOpen]        = useState(false);

  const total    = REVIEWS.length;
  const filtered = activeTag ? REVIEWS.filter((r) => r.tags.includes(activeTag)) : REVIEWS;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--c-body)]">
      <div className="max-w-5xl mx-auto">

        {/* ── Top score ── */}
        <div className="text-center mb-6">
          <p className="text-[10px] tracking-[0.4em] text-[#c9a84c] uppercase mb-5">Client Reviews</p>
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="text-[64px] sm:text-[80px] font-bold leading-none tracking-tight text-[var(--c-ink)]">4.9</span>
            <div className="flex flex-col items-start gap-2">
              <Stars />
              <p className="text-[11px] tracking-[0.15em] text-[var(--c-ink-2)] font-semibold">Top Rated Service</p>
              <p className="text-[10px] tracking-[0.08em] text-[var(--c-ink-3)]">{total} verified reviews</p>
            </div>
          </div>

          {/* How reviews work */}
          <button
            onClick={() => setHowOpen((o) => !o)}
            className="text-[11px] text-[var(--c-ink-3)] underline underline-offset-2 hover:text-[var(--c-ink-2)] transition-colors tracking-[0.05em]"
          >
            How reviews work
          </button>
          {howOpen && (
            <div className="mt-4 mx-auto max-w-xl text-left bg-white/[0.03] border border-white/[0.07] p-5 text-[12px] text-[var(--c-ink-3)] leading-relaxed space-y-3 tracking-[0.03em]">
              <p className="font-semibold text-[var(--c-ink-2)] text-[13px]">How reviews work</p>
              <p>Reviews from verified clients help travelers choose the right private chauffeur service for their journey in Japan. By default, reviews are sorted by most recent.</p>
              <p>Only clients with a confirmed and completed Octoshell booking are invited to leave a review. All submissions are verified against booking records to ensure authenticity.</p>
              <p>The Top Rated Service badge requires a minimum of 5 verified reviews. Ratings are calculated as an average across all verified bookings and are updated on an ongoing basis.</p>
            </div>
          )}
        </div>

        {/* ── Rating row (Airbnb style) ── */}
        <div className="mt-10 mb-10 overflow-x-auto">
          <div className="flex min-w-max sm:min-w-0 border-t border-b border-white/[0.07] divide-x divide-white/[0.07]">

            {/* Overall rating bars */}
            <div className="pr-8 py-6 shrink-0">
              <p className="text-[11px] tracking-[0.1em] text-[var(--c-ink-2)] mb-4">Overall rating</p>
              <div className="space-y-1.5">
                {STAR_DIST.map(({ stars, count }) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--c-ink-3)] w-2 shrink-0">{stars}</span>
                    <div className="w-24 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--c-ink)] rounded-full"
                        style={{ width: total ? `${(count / total) * 100}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category columns */}
            {RATINGS.map(({ label, score, Icon }) => (
              <div key={label} className="px-7 py-6 flex flex-col gap-2 shrink-0">
                <p className="text-[11px] tracking-[0.08em] text-[var(--c-ink-2)] whitespace-nowrap">{label}</p>
                <p className="text-[22px] font-semibold text-[var(--c-ink)] leading-none">{score.toFixed(1)}</p>
                <Icon />
              </div>
            ))}
          </div>
        </div>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {ALL_TAGS.map((tag) => {
            const count  = REVIEWS.filter((r) => r.tags.includes(tag)).length;
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(active ? null : tag)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] tracking-[0.08em]
                            border transition-all duration-200
                            ${active
                              ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/8"
                              : "border-white/15 text-[var(--c-ink-2)] hover:border-[#c9a84c]/50 hover:text-[#c9a84c]"}`}
              >
                {tag}
                <span className={`text-[10px] ${active ? "text-[#c9a84c]/60" : "text-white/25"}`}>{count}</span>
              </button>
            );
          })}
          {activeTag && (
            <button
              onClick={() => setActiveTag(null)}
              className="px-3 py-2 text-[11px] text-white/30 hover:text-white/60 transition-colors"
            >
              Clear ×
            </button>
          )}
        </div>

        {/* ── Review cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((r, i) => {
            const isExpanded = expanded.has(i);
            const LIMIT      = 120;
            const truncated  = r.text.length > LIMIT && !isExpanded;
            return (
              <div key={i} className="flex flex-col gap-4 py-6 border-b border-white/[0.07]">

                {/* Header */}
                <div className="flex items-center gap-3">
                  <Avatar name={r.name} />
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--c-ink)] tracking-wide">{r.name}</p>
                    <p className="text-[11px] text-[var(--c-ink-3)]">{r.location}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Stars />
                  <span className="text-white/20">·</span>
                  <span className="text-[10px] tracking-[0.08em] text-[var(--c-ink-3)]">{r.date}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-[10px] tracking-[0.06em] text-[var(--c-ink-3)]">{r.trip}</span>
                </div>

                {/* Text */}
                <div>
                  <p className="text-[13px] text-[var(--c-ink-2)] leading-relaxed">
                    {truncated ? r.text.slice(0, LIMIT) + "…" : r.text}
                  </p>
                  {r.text.length > LIMIT && (
                    <button
                      onClick={() => setExpanded((prev) => {
                        const next = new Set(prev);
                        next.has(i) ? next.delete(i) : next.add(i);
                        return next;
                      })}
                      className="mt-1.5 text-[12px] font-semibold text-[var(--c-ink)] underline underline-offset-2 hover:text-[#c9a84c] transition-colors"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>

                {/* Tag badges */}
                <div className="flex flex-wrap gap-1.5">
                  {r.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] px-2.5 py-1 rounded-full border tracking-[0.06em]
                                  ${activeTag === tag
                                    ? "border-[#c9a84c]/40 text-[#c9a84c]/70"
                                    : "border-white/10 text-white/28"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
