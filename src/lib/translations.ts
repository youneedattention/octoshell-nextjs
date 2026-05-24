export type Lang = "en" | "ja" | "zh";

type T = Record<Lang, string>;

export const t: Record<string, T> = {
  /* ── Navigation ─────────────────────────────── */
  nav_home:     { en: "Home",      ja: "ホーム",      zh: "首頁" },
  nav_services: { en: "Services",  ja: "サービス",    zh: "服務" },

  /* ── Services nav dropdown (8 items) ─────────────────────────── */
  nav_svc_1: { en: "By the Hour",          ja: "時間制貸切ハイヤー",    zh: "時段包車服務" },
  nav_svc_2: { en: "Airport Transfers",    ja: "空港定額送迎",          zh: "機場定額接送" },
  nav_svc_3: { en: "One Way",              ja: "片道ポイント送迎",       zh: "單程穿梭" },
  nav_svc_4: { en: "Events & MICE",        ja: "MICE & エグゼクティブ",  zh: "頂級盛會" },
  nav_svc_5: { en: "Bespoke Sightseeing",  ja: "テーラーメイド観光",     zh: "深度定制觀光" },
  nav_svc_6: { en: "Golf",                 ja: "ゴルフ送迎",            zh: "尊榮高爾夫" },
  nav_svc_7: { en: "Ceremonial",           ja: "冠婚葬祭",              zh: "典禮迎送" },
  nav_svc_8: { en: "Driver Dispatch",      ja: "プロ乗務員派遣",        zh: "司機派遣" },
  nav_about:       { en: "About",        ja: "会社情報",        zh: "關於" },
  nav_about_story: { en: "How It Works", ja: "Octoshellについて", zh: "品牌故事" },
  nav_about_faq:   { en: "FAQ",          ja: "よくある質問",      zh: "常見問題" },
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
  footer_terms:   { en: "Terms",         ja: "利用規約",              zh: "使用條款" },
  footer_privacy: { en: "Privacy",       ja: "プライバシーポリシー",   zh: "隱私政策" },
  footer_law:     { en: "Legal Notice",  ja: "特定商取引法に基づく表記", zh: "法定事項記載" },

  /* ── Book page ──────────────────────────────── */
  book_badge:       { en: "RESERVATIONS",                ja: "ご予約",                   zh: "預訂" },
  book_title:       { en: "Where Would You Like To Go?", ja: "どこへお越しですか？",       zh: "您想去哪裡？" },
  book_sub:         { en: "Japan Private Chauffeur Service", ja: "日本プライベートチャウファーサービス", zh: "日本專屬司機服務" },
  book_sec_route:   { en: "Route",                      ja: "ルート",                    zh: "路線" },
  book_from:        { en: "From",                       ja: "出発地",                    zh: "出發地" },
  book_to:          { en: "To",                         ja: "目的地",                    zh: "目的地" },
  book_from_ph:     { en: "Pickup location (airport, hotel, address…)", ja: "乗車場所（空港・ホテル・住所など）", zh: "接載地點（機場、酒店、地址…）" },
  book_to_ph:       { en: "Drop-off location (airport, hotel, address…)", ja: "降車場所（空港・ホテル・住所など）", zh: "目的地（機場、酒店、地址…）" },
  book_sec_sched:   { en: "Schedule",                   ja: "日程",                      zh: "日程" },
  book_date:        { en: "Pickup Date",                 ja: "乗車日",                    zh: "上車日期" },
  book_time:        { en: "Pickup Time",                ja: "乗車時刻",                  zh: "上車時間" },
  book_sec_pax:     { en: "Passengers & Luggage",       ja: "乗客・荷物",                zh: "乘客與行李" },
  book_people:      { en: "Passengers",                 ja: "乗車人数",                  zh: "乘客人數" },
  book_bags:        { en: "Suitcases",                  ja: "スーツケース",              zh: "行李箱" },
  book_sec_contact: { en: "Contact Information",        ja: "連絡先",                    zh: "聯絡資訊" },
  book_name:        { en: "Contact Name",               ja: "お名前",                    zh: "聯絡人姓名" },
  book_name_ph:     { en: "Your full name",             ja: "フルネームを入力",          zh: "請輸入全名" },
  book_email:       { en: "Email Address",              ja: "メールアドレス",            zh: "電子郵件地址" },
  book_submit:      { en: "Request a Quote",            ja: "お見積りを依頼する",        zh: "申請報價" },
  book_required:    { en: "Required",                   ja: "必須",                      zh: "必填" },
  book_back:        { en: "← Back",                     ja: "← 戻る",                    zh: "← 返回" },

  /* ── Book — vehicle ─────────────────────────────── */
  book_sec_vehicle: { en: "Vehicle Preference",         ja: "車種指定",                   zh: "車型選擇" },
  book_veh_any:     { en: "No Preference",              ja: "指定なし",                   zh: "不指定" },
  book_veh_alphard: { en: "Alphard Class",              ja: "アルファードクラス",          zh: "Alphard 車型" },
  book_veh_hiace:   { en: "HiAce Class",                ja: "ハイエースクラス",            zh: "HiAce 車型" },
  book_veh_cap6:    { en: "Max 6 passengers",           ja: "最大ご乗車人数：6名",         zh: "最多乘坐 6 人" },
  book_veh_cap9:    { en: "Max 9 passengers",           ja: "最大ご乗車人数：9名",         zh: "最多乘坐 9 人" },
  book_veh_ex_a:    { en: "4 pax · 4 suitcases",        ja: "ご乗客4名・スーツケース4個",  zh: "4名乘客・4件行李" },
  book_veh_ex_h:    { en: "6 pax · 6 suitcases",        ja: "ご乗客6名・スーツケース6個",  zh: "6名乘客・6件行李" },

  /* ── Book — driver instructions ─────────────────── */
  book_sec_driver:  { en: "Message for Driver",         ja: "ドライバーへの伝達事項",      zh: "司機備注" },
  book_drv_note:    {
    en: "This will be shared directly with your driver after booking is confirmed. It does not affect driver or vehicle assignment.",
    ja: "この内容は配車確定後にドライバーへ直接共有されます。ドライバーや車両の選定には影響しません。",
    zh: "此內容將在預訂確認後直接與司機分享，不影響司機或車輛的安排。",
  },
  book_drv_none:    { en: "None",                       ja: "なし",                       zh: "無" },
  book_drv_hw:      { en: "Highway use OK",             ja: "高速利用OK",                 zh: "可走高速公路" },
  book_drv_gentle:  { en: "Please drive gently",        ja: "ゆっくり丁寧な運転をお願いしたい", zh: "請溫和駕駛" },
  book_drv_quiet:   { en: "Minimal conversation",       ja: "会話は最小限にしてほしい",    zh: "盡量減少交談" },
  book_drv_meet:    { en: "Meet & Greet",               ja: "ミートアンドグリート",        zh: "接機迎賓服務" },
  book_drv_baby:    { en: "Baby Seat",                  ja: "ベビーシート",                zh: "嬰兒座椅" },
  book_drv_other:   { en: "Other",                      ja: "その他",                     zh: "其他" },
  book_drv_other_ph: { en: "Please describe…",           ja: "詳しくご記入ください…",       zh: "請自由填寫…" },

  /* ── Book — mode tabs ───────────────────────────────── */
  book_tab_transfer: { en: "Transfer",                  ja: "送迎",                       zh: "點對點接送" },
  book_tab_hour:     { en: "Hourly",                    ja: "時間チャーター",              zh: "按小時包車" },

  /* ── Book — return / duration ───────────────────────── */
  book_add_return:   { en: "ADD RETURN",                ja: "帰路を追加",                 zh: "加回程" },
  book_return_date:  { en: "Return Date",               ja: "帰路日付",                   zh: "回程日期" },
  book_return_time:  { en: "Return Time",               ja: "帰路出発時刻",               zh: "回程時間" },
  book_duration:     { en: "Duration",                  ja: "利用時間",                   zh: "使用時數" },
  book_dur_h:        { en: "hours",                     ja: "時間",                       zh: "小時" },

  /* ── Book — booking details (accordion) ────────────── */
  book_sec_details:       { en: "Booking Details",      ja: "予約詳細",                   zh: "預訂詳情" },
  book_add_flight_label:  { en: "Add Flight Number",    ja: "フライト番号を追加",          zh: "新增航班號碼" },
  book_add_notes_label:   { en: "Add Notes for the Driver", ja: "ドライバーへのメモを追加", zh: "新增司機備注" },

  /* ── Book — flight tracking ─────────────────────────── */
  book_sec_flight:   { en: "Flight Tracking",           ja: "フライトトラッキング",        zh: "航班追蹤" },
  book_flight_num:   { en: "Flight Number",             ja: "フライト番号",               zh: "航班號碼" },
  book_flight_ph:    { en: "e.g. JL316, NH217…",        ja: "例）JL316、NH217…",          zh: "例：JL316、NH217…" },
  book_flight_note:  {
    en: "We monitor your flight in real time. If you land late, your chauffeur adjusts automatically — no extra cost, no stress. Even better: we include 90 mins of free waiting time after landing so you can take it easy.",
    ja: "フライトをリアルタイムで追跡します。到着が遅れても、チャウファーが自動で調整―追加費用なし、ストレスなし。さらに、着陸後90分間の無料待機サービスが含まれているので、ゆっくりお過ごしいただけます。",
    zh: "我們即時追蹤您的航班。若您延誤降落，司機將自動調整—無需額外費用，毫無壓力。更貼心的是，我們提供降落後90分鐘免費等候時間，讓您從容不迫。",
  },

  /* ── Book — emergency contact ───────────────────── */
  book_sec_sos:     { en: "Emergency Contact",          ja: "緊急連絡先",                 zh: "緊急聯絡人" },
  book_phone:       { en: "Phone Number",               ja: "電話番号",                   zh: "電話號碼" },
  book_phone_ph:    { en: "e.g. 090-1234-5678",         ja: "例）090-1234-5678",           zh: "例：090-1234-5678" },
  book_whatsapp:    { en: "Also on WhatsApp",           ja: "WhatsApp 使用可能",           zh: "同時使用 WhatsApp" },
  book_optional:    { en: "Optional",                   ja: "任意",                       zh: "選填" },

  /* ── Law page ───────────────────────────────── */
  law_badge:  { en: "LEGAL",          ja: "法的情報",          zh: "法定事項" },
  law_title:  { en: "Legal Notice",   ja: "特定商取引法に基づく表記", zh: "法定事項記載" },
  law_back:   { en: "← Back to Home", ja: "← ホームへ戻る",    zh: "← 返回首頁" },
};
