"use client";
import { useState } from "react";

const RATINGS = [
  { label: "Vehicle Cleanliness", score: 5.0 },
  { label: "Punctuality",         score: 5.0 },
  { label: "Hospitality",         score: 4.9 },
  { label: "Driving Comfort",     score: 4.9 },
  { label: "Value",               score: 4.8 },
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

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3 h-3 ${i < n ? "text-[#c9a84c]" : "text-white/15"}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 flex items-center justify-center shrink-0">
      <span className="text-[13px] font-bold text-[#c9a84c]">{name.charAt(0).toUpperCase()}</span>
    </div>
  );
}

export default function ReviewsSection() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const filtered = activeTag
    ? REVIEWS.filter((r) => r.tags.includes(activeTag))
    : REVIEWS;

  const total = REVIEWS.length;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--c-body)]">
      <div className="max-w-5xl mx-auto">

        {/* ── Top score ── */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[10px] tracking-[0.4em] text-[#c9a84c] uppercase mb-4">Client Reviews</p>
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-[64px] sm:text-[80px] font-bold leading-none tracking-tight text-[var(--c-ink)]">
              4.9
            </span>
            <div className="flex flex-col items-start gap-2">
              <Stars />
              <p className="text-[10px] tracking-[0.2em] text-[var(--c-ink-3)] uppercase">Top Rated Service</p>
            </div>
          </div>
          <p className="text-[11px] text-[var(--c-ink-3)] tracking-[0.1em]">
            Based on {total} verified client reviews
          </p>
        </div>

        {/* ── Rating grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mb-10 sm:mb-14">

          {/* Star distribution */}
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.2em] text-[var(--c-ink-3)] uppercase mb-4">Overall rating</p>
            {STAR_DIST.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-[11px] text-[var(--c-ink-3)] w-3 text-right shrink-0">{stars}</span>
                <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#c9a84c] rounded-full transition-all duration-500"
                    style={{ width: total ? `${(count / total) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Subcategory bars */}
          <div className="space-y-4">
            {RATINGS.map(({ label, score }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="text-[11px] tracking-[0.06em] text-[var(--c-ink-2)] w-[148px] shrink-0">{label}</span>
                <div className="flex-1 h-[2px] bg-white/[0.07] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c9a84c] rounded-full" style={{ width: `${(score / 5) * 100}%` }} />
                </div>
                <span className="text-[11px] font-semibold text-[var(--c-ink)] w-7 text-right tabular-nums">
                  {score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b border-white/[0.07]">
          {ALL_TAGS.map((tag) => {
            const count = REVIEWS.filter((r) => r.tags.includes(tag)).length;
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(active ? null : tag)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] tracking-[0.1em]
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
              className="px-4 py-2 text-[11px] tracking-[0.1em] text-white/30 hover:text-white/60 transition-colors"
            >
              Clear ×
            </button>
          )}
        </div>

        {/* ── Review cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {filtered.map((r, i) => {
            const isExpanded = expanded.has(i);
            const LIMIT = 120;
            const truncated = r.text.length > LIMIT && !isExpanded;
            return (
              <div key={i} className="flex flex-col gap-4 p-6 border border-white/[0.07] hover:border-white/[0.12] transition-colors">

                {/* Header */}
                <div className="flex items-center gap-3">
                  <Avatar name={r.name} />
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--c-ink)] tracking-wide">{r.name}</p>
                    <p className="text-[11px] text-[var(--c-ink-3)] tracking-[0.05em]">{r.location}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3">
                  <Stars />
                  <span className="text-[10px] text-white/25">·</span>
                  <span className="text-[10px] tracking-[0.1em] text-[var(--c-ink-3)]">{r.date}</span>
                  <span className="text-[10px] text-white/25">·</span>
                  <span className="text-[10px] tracking-[0.08em] text-[var(--c-ink-3)]">{r.trip}</span>
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
                      className="mt-2 text-[12px] font-semibold text-[var(--c-ink)] underline underline-offset-2 hover:text-[#c9a84c] transition-colors"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  {r.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] px-2.5 py-1 rounded-full tracking-[0.08em] border
                                  ${activeTag === tag
                                    ? "border-[#c9a84c]/50 text-[#c9a84c]/80 bg-[#c9a84c]/6"
                                    : "border-white/10 text-white/30"}`}
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
