/**
 * Single source of truth for all reviews.
 * AggregateRating in layout.tsx and airport/page.tsx
 * are both derived from this file — update once, updates everywhere.
 */

export type ReviewEntry = {
  name: string;
  location: string;
  role?: { en: string; ja: string; zh: string };
  dateISO: string;
  serviceIds: string[];
  travelType?: { en: string; ja: string; zh: string };
  trip?: string;
  text: string;
  tags: string[];
  rating?: number; // default 5 if omitted
};

export const REVIEWS: ReviewEntry[] = [
  {
    name: "David Paul",
    location: "United States",
    dateISO: "2025-04",
    serviceIds: ["airport", "sightseeing"],
    trip: "Narita → Tokyo",
    text: "Ryu san was a very nice driver. Well-dressed and polite, and drove very smoothly.",
    tags: ["Well-dressed", "Polite", "Smooth Ride"],
  },
  {
    name: "Kaiko Hatakeyama",
    location: "Japan",
    role: { en: "Guide", ja: "ガイド", zh: "導遊" },
    dateISO: "2025-05",
    serviceIds: ["sightseeing", "port"],
    travelType: { en: "Family Trip", ja: "ファミリー", zh: "家庭出遊" },
    text: "Mr. Wang was very courteous and cooperative. It was a great help throughout the day.",
    tags: ["Courteous", "Cooperative"],
  },
  {
    name: "Shiraiwa Yukiko",
    location: "Japan",
    role: { en: "Guide", ja: "ガイド", zh: "導遊" },
    dateISO: "2025-09",
    serviceIds: ["sightseeing"],
    travelType: { en: "3-Day Trip", ja: "3日間", zh: "3天行程" },
    text: "Driver Du-san is so wonderful. He responded to every request. I was very happy to work with him.",
    tags: ["Wonderful", "Cooperative"],
  },
  {
    name: "Neizer Naoko",
    location: "Japan",
    role: { en: "Guide", ja: "ガイド", zh: "導遊" },
    dateISO: "2026-02",
    serviceIds: ["sightseeing"],
    travelType: { en: "2-Day Trip", ja: "2日間", zh: "2天行程" },
    text: "This driver is very professional, had hospitality and guests were very happy with him.",
    tags: ["Courteous", "Wonderful"],
  },
  {
    name: "Ikuko Ushio",
    location: "Japan",
    role: { en: "Guide", ja: "ガイド", zh: "導遊" },
    dateISO: "2026-03",
    serviceIds: ["airport", "sightseeing"],
    travelType: { en: "5-Day Trip", ja: "5日間", zh: "5天行程" },
    text: "Blessed with good customers and the driver, I enjoyed guiding everyday. Mr. and Mrs Das took plenty of nice photos of Mt. Fuji and cherry blossoms. As for driver, Mr Du Kun, was the best driver I've ever worked with. Hope to work with him as one team soon again.",
    tags: ["Wonderful", "Cooperative"],
  },
  {
    name: "Josephine Caruso",
    location: "United States",
    dateISO: "2026-03",
    serviceIds: ["airport", "sightseeing"],
    travelType: { en: "7-Day Trip", ja: "7日間", zh: "7天行程" },
    text: "The driver, Mr. Zhang is a good speaker of English, which is also good for the guests. I think he is quite a good driver.",
    tags: ["Polite", "Courteous"],
  },
  {
    name: "Lily Wu",
    location: "United States",
    dateISO: "2026-04",
    serviceIds: ["airport", "sightseeing"],
    travelType: { en: "9-Day Trip", ja: "9日間", zh: "9天行程" },
    text: "On a very positive note, my family absolutely loved Mr. Wang, our driver. They couldn't stop gushing about how polite, helpful, and kind he was throughout the trip — they basically wanted to take him home with them lol.",
    tags: ["Polite", "Wonderful"],
  },
  {
    name: "Jodi Sue Hanh",
    location: "United States",
    dateISO: "2026-05",
    serviceIds: ["airport", "sightseeing"],
    travelType: { en: "12-Day Trip", ja: "12日間", zh: "12天行程" },
    text: "He was a good driver because he was very nice to our guests. I am sure all the drivers of his company (貝八方) are very good since they are in a suit with a tie and behave gentle to guests.",
    tags: ["Well-dressed", "Polite"],
  },
  {
    name: "Yumi Takase",
    location: "Japan",
    role: { en: "Guide", ja: "ガイド", zh: "導遊" },
    dateISO: "2026-05",
    serviceIds: ["airport", "sightseeing"],
    travelType: { en: "3-Day Trip", ja: "3日間", zh: "3天行程" },
    text: "Driver Wang is very good!! Kind and safe driving, speaks English a little but good pronunciation!!",
    tags: ["Polite", "Smooth Ride"],
  },
];

/* ── Auto-computed stats ─────────────────────────────────────────────
   Import these wherever AggregateRating is needed.
   Add a review above → both values update automatically.
──────────────────────────────────────────────────────────────────── */
export const REVIEW_COUNT = REVIEWS.length;

export const RATING_VALUE = (() => {
  const avg =
    REVIEWS.reduce((sum, r) => sum + (r.rating ?? 5), 0) / REVIEWS.length;
  return Math.round(avg * 100) / 100; // e.g. 4.97
})();

export const RATING_VALUE_STR = RATING_VALUE.toFixed(2); // "4.97"
