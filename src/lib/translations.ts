export type Lang = "en" | "ja" | "zh";

type T = Record<Lang, string>;

export const t: Record<string, T> = {
  /* ── Navigation ─────────────────────────────── */
  nav_home:     { en: "Home",      ja: "ホーム",      zh: "首頁" },
  nav_services: { en: "Services",  ja: "サービス",    zh: "服務" },
  nav_about:    { en: "About us",  ja: "私たちについて", zh: "關於我們" },
  nav_book:     { en: "BOOK / Reserve", ja: "BOOK / 予約", zh: "BOOK / 預約" },

  /* ── Hero ───────────────────────────────────── */
  hero_title1:  { en: "OCTOSHELL JAPAN",     ja: "OCTOSHELL JAPAN",     zh: "OCTOSHELL JAPAN" },
  hero_title2:  { en: "CHAUFFEUR SERVICE",   ja: "チャウファーサービス", zh: "專屬司機服務" },
  hero_sub:     { en: "Lay back and enjoy your trip", ja: "ゆったりと旅をお楽しみください", zh: "放鬆身心，盡享旅途" },

  /* ── Prices ─────────────────────────────────── */
  prices_title: { en: "PRICES",    ja: "料金",     zh: "價格" },
  prices_sub:   { en: "Includes Parking & Highway Expenses", ja: "駐車場・高速道路料金込み", zh: "包含停車及高速公路費用" },
  book_car:     { en: "BOOK THIS CAR",      ja: "この車を予約する",   zh: "預訂此車" },
  price_note:   { en: "*10 hours per day. Prices may differ on holidays.", ja: "*1日10時間。祝祭日は料金が異なる場合があります。", zh: "*每日10小時，假日價格可能有所不同。" },

  /* Route names */
  route_haneda:   { en: "Haneda Airport – Tokyo",       ja: "羽田空港 – 東京",          zh: "羽田機場 – 東京" },
  route_narita:   { en: "Narita Airport – Tokyo",       ja: "成田空港 – 東京",          zh: "成田機場 – 東京" },
  route_city:     { en: "Tokyo City",                   ja: "東京市内",                 zh: "東京市區" },
  route_fuji:     { en: "Tokyo – Fuji Mt. – Outlets",   ja: "東京 – 富士山 – アウトレット", zh: "東京 – 富士山 – 購物中心" },
  route_kanagawa: { en: "Tokyo – Kanagawa",             ja: "東京 – 神奈川",            zh: "東京 – 神奈川" },
  route_hakone:   { en: "Tokyo – Hakone – Outlets",     ja: "東京 – 箱根 – アウトレット", zh: "東京 – 箱根 – 購物中心" },
  route_izu:      { en: "Tokyo – Izu/East Izu",         ja: "東京 – 伊豆/東伊豆",       zh: "東京 – 伊豆/東伊豆" },
  route_golf:     { en: "Tokyo – Golf Clubs",           ja: "東京 – ゴルフ場",          zh: "東京 – 高爾夫球場" },

  /* ── Tailored ───────────────────────────────── */
  tailored_title: { en: "TAILORED FOR YOU",                       ja: "あなたのために",                    zh: "為您量身定制" },
  tailored_sub:   { en: "Professional, Outstanding and Consistent", ja: "プロフェッショナル・卓越・一貫性", zh: "專業、卓越、始終如一" },
  our_company:    { en: "OUR COMPANY", ja: "会社概要", zh: "關於公司" },
  tailored_body:  {
    en: "Welcome to Octoshell JP, Japan's premier chartered car service specializing in luxury transportation for bespoke travel experiences. We cater to discerning clients seeking comfort, style, and exceptional service, whether for exclusive hiking adventures, scenic tours, or business travel. Our fleet of premium vehicles, combined with our knowledgeable and courteous chauffeurs, ensures a seamless and unforgettable journey through Japan's most beautiful and iconic destinations.",
    ja: "Octoshell JPへようこそ。日本最高峰のプレミアムチャータードカーサービスとして、お客様だけの贅沢な旅をご提供しています。上質なご旅行をお求めのお客様に、快適さ・洗練されたスタイル・卓越したサービスをお届けします。厳選されたプレミアム車両と知識豊富な礼儀正しいチャウファーが、日本の美しい名所を巡る忘れられない旅をお手伝いします。",
    zh: "歡迎來到Octoshell JP，日本頂級專屬座駕服務，專注於為客製化旅程提供豪華接送。我們服務追求舒適、品味與卓越體驗的尊貴客戶，無論是私人健行探險、風景觀光還是商務出行。我們的豪華車隊配備知識淵博、彬彬有禮的專屬司機，確保您在日本最美麗的目的地享受流暢難忘的旅程。",
  },
  tailored_bold:  { en: "Welcome to Octoshell JP", ja: "Octoshell JPへようこそ", zh: "歡迎來到Octoshell JP" },

  /* ── Services ───────────────────────────────── */
  services_title: { en: "OUR SERVICES",                   ja: "私たちのサービス",        zh: "我們的服務" },
  services_sub:   { en: "Tailor Made Travel Just for You", ja: "あなただけのカスタムトラベル", zh: "專為您打造的旅行" },

  svc1_tag:   { en: "BY THE DAY",    ja: "日帰り",   zh: "按日計費" },
  svc1_title: { en: "Personal Chauffeur", ja: "パーソナルチャウファー", zh: "專屬司機" },
  svc1_body:  {
    en: "We offer a luxurious, private transportation experience tailored to your itinerary, ensuring comfort and convenience as you explore Japan's stunning landscapes and cultural landmarks.",
    ja: "お客様のスケジュールに合わせた豪華なプライベート送迎サービスをご提供します。日本の素晴らしい風景や文化的名所を快適にご旅行いただけます。",
    zh: "我們提供為您行程量身定制的豪華私人接送服務，讓您在探索日本壯麗風景和文化名勝時盡享舒適便捷。",
  },
  svc2_tag:   { en: "AIRPORT",          ja: "空港送迎",   zh: "機場接送" },
  svc2_title: { en: "Pick up and Drop off", ja: "空港送迎サービス", zh: "機場接送服務" },
  svc2_body:  {
    en: "We provide a seamless and stress-free travel experience, with punctual, comfortable, and luxurious transportation to and from Japan's major airports.",
    ja: "日本の主要空港への送迎を、時間厳守・快適・豪華にご提供します。ストレスのないスムーズな移動をお約束します。",
    zh: "我們提供無縫、無壓力的出行體驗，準時接送您往返日本各大機場，舒適豪華。",
  },
  svc3_tag:   { en: "ROUND TRIP",       ja: "往復送迎",   zh: "往返接送" },
  svc3_title: { en: "Luxury experience between A and B", ja: "A地点からB地点へのラグジュアリー体験", zh: "奢華點對點接送體驗" },
  svc3_body:  {
    en: "We offer convenient and stylish transportation, ensuring a smooth and comfortable journey to your appointed destination without hassle of return arrangements.",
    ja: "目的地までのスムーズで快適な移動をご提供します。帰りの手配の煩わしさなく、洗練されたスタイルでご旅行いただけます。",
    zh: "我們提供便捷時尚的接送服務，確保您順暢舒適地抵達目的地，無需為返程安排費心。",
  },

  /* ── Footer ─────────────────────────────────── */
  copyright: {
    en: "© Copyright 2024 Octoshell.  All Rights Reserved",
    ja: "© Copyright 2024 Octoshell.  全著作権所有",
    zh: "© Copyright 2024 Octoshell.  版權所有",
  },
  footer_terms:   { en: "Terms",   ja: "利用規約",   zh: "使用條款" },
  footer_privacy: { en: "Privacy", ja: "プライバシー", zh: "隱私政策" },
  footer_cookies: { en: "Cookies", ja: "クッキー",   zh: "Cookie" },
};
