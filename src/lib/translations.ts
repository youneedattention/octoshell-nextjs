export type Lang = "en" | "ja" | "zh" | "ko";

type T = Record<Lang, string>;

export const t: Record<string, T> = {
  /* ── Navigation ─────────────────────────────── */
  nav_home:     { en: "Home",      ja: "ホーム",      zh: "首頁",    ko: "홈" },
  nav_services: { en: "Services",  ja: "サービス",    zh: "服務",    ko: "서비스" },

  /* ── Services nav dropdown (9 items) ─────────────────────────── */
  nav_svc_1:  { en: "By the Hour",          ja: "時間制貸切ハイヤー",    zh: "時段包車服務",   ko: "시간제 전세" },
  nav_svc_2:  { en: "Airport Transfers",    ja: "空港定額送迎",          zh: "機場定額接送",   ko: "공항 이동" },
  nav_svc_3:  { en: "One Way",              ja: "片道ポイント送迎",       zh: "單程穿梭",       ko: "편도" },
  nav_svc_4:  { en: "Events & MICE",        ja: "MICE & エグゼクティブ",  zh: "頂級盛會",       ko: "이벤트 & MICE" },
  nav_svc_5:  { en: "Bespoke Sightseeing",  ja: "テーラーメイド観光",     zh: "深度定制觀光",   ko: "맞춤 관광" },
  nav_svc_6:  { en: "Golf",                 ja: "ゴルフ送迎",            zh: "尊榮高爾夫",     ko: "골프" },
  nav_svc_7:  { en: "Ceremonial",           ja: "冠婚葬祭",              zh: "典禮迎送",       ko: "행사 의전" },
  nav_svc_8:  { en: "Driver Dispatch",      ja: "プロ乗務員派遣",        zh: "司機派遣",       ko: "기사 파견" },
  nav_svc_9:  { en: "Photo Tour",           ja: "旅拍ハイヤー",          zh: "旅拍接送",       ko: "포토 투어" },
  nav_svc_10: { en: "Outdoor",              ja: "アウトドア送迎",        zh: "戶外接送",       ko: "아웃도어" },
  nav_fleet:       { en: "Fleet",        ja: "車種",            zh: "車型",    ko: "차량" },
  nav_faq:         { en: "FAQ",          ja: "よくある質問",    zh: "常見問題", ko: "자주 묻는 질문" },
  nav_about:       { en: "About",        ja: "会社情報",        zh: "關於",    ko: "소개" },
  nav_about_story: { en: "How It Works", ja: "Octoshellについて", zh: "品牌故事", ko: "브랜드 스토리" },
  nav_about_faq:     { en: "FAQ",          ja: "よくある質問",      zh: "常見問題", ko: "자주 묻는 질문" },
  nav_about_contact: { en: "Contact Us",  ja: "お問い合わせ",      zh: "聯絡我們", ko: "문의하기" },
  nav_book:     { en: "BOOK / Reserve", ja: "BOOK / 予約", zh: "BOOK / 預約", ko: "BOOK / 예약" },

  /* ── Hero ───────────────────────────────────── */
  hero_title1:  { en: "OCTOSHELL JAPAN",     ja: "OCTOSHELL JAPAN",     zh: "OCTOSHELL JAPAN",  ko: "OCTOSHELL JAPAN" },
  hero_title2:  { en: "CHAUFFEUR SERVICE",   ja: "チャウファーサービス", zh: "專屬司機服務",      ko: "쇼퍼 서비스" },
  hero_sub:     { en: "Lay back and enjoy your trip", ja: "ゆったりと旅をお楽しみください", zh: "放鬆身心，盡享旅途", ko: "편안하게 여행을 즐기세요" },

  /* ── Prices ─────────────────────────────────── */
  prices_title: { en: "PRICES",    ja: "料金",     zh: "價格",  ko: "요금" },
  prices_sub:   { en: "Includes Parking & Highway Expenses", ja: "駐車場・高速道路料金込み", zh: "包含停車及高速公路費用", ko: "주차 및 고속도로 요금 포함" },
  book_car:     { en: "BOOK THIS CAR",      ja: "この車を予約する",   zh: "預訂此車",  ko: "이 차량 예약" },
  price_note:   { en: "*10 hours per day. Prices may differ on holidays.", ja: "*1日10時間。祝祭日は料金が異なる場合があります。", zh: "*每日10小時，假日價格可能有所不同。", ko: "*하루 10시간. 공휴일에는 요금이 다를 수 있습니다." },

  /* Route names */
  route_haneda:   { en: "Haneda Airport – Tokyo",       ja: "羽田空港 – 東京",          zh: "羽田機場 – 東京",         ko: "하네다 공항 – 도쿄" },
  route_narita:   { en: "Narita Airport – Tokyo",       ja: "成田空港 – 東京",          zh: "成田機場 – 東京",         ko: "나리타 공항 – 도쿄" },
  route_city:     { en: "Tokyo City",                   ja: "東京市内",                 zh: "東京市區",                ko: "도쿄 시내" },
  route_fuji:     { en: "Tokyo – Fuji Mt. – Outlets",   ja: "東京 – 富士山 – アウトレット", zh: "東京 – 富士山 – 購物中心", ko: "도쿄 – 후지산 – 아울렛" },
  route_kanagawa: { en: "Tokyo – Kanagawa",             ja: "東京 – 神奈川",            zh: "東京 – 神奈川",           ko: "도쿄 – 가나가와" },
  route_hakone:   { en: "Tokyo – Hakone – Outlets",     ja: "東京 – 箱根 – アウトレット", zh: "東京 – 箱根 – 購物中心", ko: "도쿄 – 하코네 – 아울렛" },
  route_izu:      { en: "Tokyo – Izu/East Izu",         ja: "東京 – 伊豆/東伊豆",       zh: "東京 – 伊豆/東伊豆",      ko: "도쿄 – 이즈/히가시이즈" },
  route_golf:     { en: "Tokyo – Golf Clubs",           ja: "東京 – ゴルフ場",          zh: "東京 – 高爾夫球場",       ko: "도쿄 – 골프장" },

  /* ── Tailored ───────────────────────────────── */
  tailored_title: { en: "TAILORED FOR YOU",                       ja: "あなたのために",                    zh: "為您量身定制",   ko: "맞춤형 서비스" },
  tailored_sub:   { en: "Professional, Outstanding and Consistent", ja: "プロフェッショナル・卓越・一貫性", zh: "專業、卓越、始終如一", ko: "전문적이고 탁월하며 일관된" },
  our_company:    { en: "OUR COMPANY", ja: "会社概要", zh: "關於公司", ko: "회사 소개" },
  tailored_body:  {
    en: "Welcome to Octoshell JP, Japan's premier chartered car service specializing in luxury transportation for bespoke travel experiences. We cater to discerning clients seeking comfort, style, and exceptional service, whether for exclusive hiking adventures, scenic tours, or business travel. Our fleet of premium vehicles, combined with our knowledgeable and courteous chauffeurs, ensures a seamless and unforgettable journey through Japan's most beautiful and iconic destinations.",
    ja: "Octoshell JPへようこそ。日本最高峰のプレミアムチャータードカーサービスとして、お客様だけの贅沢な旅をご提供しています。上質なご旅行をお求めのお客様に、快適さ・洗練されたスタイル・卓越したサービスをお届けします。厳選されたプレミアム車両と知識豊富な礼儀正しいチャウファーが、日本の美しい名所を巡る忘れられない旅をお手伝いします。",
    zh: "歡迎來到Octoshell JP，日本頂級專屬座駕服務，專注於為客製化旅程提供豪華接送。我們服務追求舒適、品味與卓越體驗的尊貴客戶，無論是私人健行探險、風景觀光還是商務出行。我們的豪華車隊配備知識淵博、彬彬有禮的專屬司機，確保您在日本最美麗的目的地享受流暢難忘的旅程。",
    ko: "Octoshell JP에 오신 것을 환영합니다. 일본 최고의 프리미엄 전세 차량 서비스로, 맞춤형 여행을 위한 럭셔리 이동 서비스를 전문으로 합니다. 편안함, 세련된 스타일, 탁월한 서비스를 원하시는 고객께, 독점 하이킹 투어, 경치 관광, 비즈니스 여행 등 다양한 용도로 제공합니다. 최고급 차량과 경험 풍부하고 예의 바른 쇼퍼가 일본의 아름다운 명소를 여행하는 잊을 수 없는 여정을 선사합니다.",
  },
  tailored_bold:  { en: "Welcome to Octoshell JP", ja: "Octoshell JPへようこそ", zh: "歡迎來到Octoshell JP", ko: "Octoshell JP에 오신 것을 환영합니다" },

  /* ── Services ───────────────────────────────── */
  services_title: { en: "OUR SERVICES",                   ja: "私たちのサービス",        zh: "我們的服務",    ko: "저희 서비스" },
  services_sub:   { en: "Tailor Made Travel Just for You", ja: "あなただけのカスタムトラベル", zh: "專為您打造的旅行", ko: "맞춤형 여행" },

  svc1_tag:   { en: "BY THE DAY",    ja: "日帰り",   zh: "按日計費",  ko: "일일" },
  svc1_title: { en: "Personal Chauffeur", ja: "パーソナルチャウファー", zh: "專屬司機", ko: "전속 쇼퍼" },
  svc1_body:  {
    en: "We offer a luxurious, private transportation experience tailored to your itinerary, ensuring comfort and convenience as you explore Japan's stunning landscapes and cultural landmarks.",
    ja: "お客様のスケジュールに合わせた豪華なプライベート送迎サービスをご提供します。日本の素晴らしい風景や文化的名所を快適にご旅行いただけます。",
    zh: "我們提供為您行程量身定制的豪華私人接送服務，讓您在探索日本壯麗風景和文化名勝時盡享舒適便捷。",
    ko: "귀하의 일정에 맞춘 럭셔리 프라이빗 이동 서비스를 제공합니다. 일본의 아름다운 풍경과 문화 명소를 편안하게 여행하실 수 있습니다.",
  },
  svc2_tag:   { en: "AIRPORT",          ja: "空港送迎",   zh: "機場接送",  ko: "공항" },
  svc2_title: { en: "Pick up and Drop off", ja: "空港送迎サービス", zh: "機場接送服務", ko: "픽업 및 드롭오프" },
  svc2_body:  {
    en: "We provide a seamless and stress-free travel experience, with punctual, comfortable, and luxurious transportation to and from Japan's major airports.",
    ja: "日本の主要空港への送迎を、時間厳守・快適・豪華にご提供します。ストレスのないスムーズな移動をお約束します。",
    zh: "我們提供無縫、無壓力的出行體驗，準時接送您往返日本各大機場，舒適豪華。",
    ko: "일본 주요 공항에서의 이동을 정시, 쾌적하고 럭셔리하게 제공합니다. 스트레스 없는 원활한 이동을 약속합니다.",
  },
  svc3_tag:   { en: "ROUND TRIP",       ja: "往復送迎",   zh: "往返接送",  ko: "왕복" },
  svc3_title: { en: "Luxury experience between A and B", ja: "A地点からB地点へのラグジュアリー体験", zh: "奢華點對點接送體驗", ko: "A에서 B까지 럭셔리 경험" },
  svc3_body:  {
    en: "We offer convenient and stylish transportation, ensuring a smooth and comfortable journey to your appointed destination without hassle of return arrangements.",
    ja: "目的地までのスムーズで快適な移動をご提供します。帰りの手配の煩わしさなく、洗練されたスタイルでご旅行いただけます。",
    zh: "我們提供便捷時尚的接送服務，確保您順暢舒適地抵達目的地，無需為返程安排費心。",
    ko: "목적지까지 원활하고 쾌적한 이동을 제공합니다. 귀로 준비에 번거로움 없이 세련된 스타일로 여행하실 수 있습니다.",
  },

  /* ── Footer ─────────────────────────────────── */
  copyright: {
    en: "© Copyright 2024 Octoshell.  All Rights Reserved",
    ja: "© Copyright 2024 Octoshell.  全著作権所有",
    zh: "© Copyright 2024 Octoshell.  版權所有",
    ko: "© Copyright 2024 Octoshell.  모든 권리 보유",
  },
  footer_terms:   { en: "Terms",         ja: "利用規約",              zh: "使用條款",    ko: "이용약관" },
  footer_privacy: { en: "Privacy",       ja: "プライバシーポリシー",   zh: "隱私政策",    ko: "개인정보처리방침" },
  footer_law:     { en: "Legal Notice",  ja: "特定商取引法に基づく表記", zh: "法定事項記載", ko: "법적 고지" },

  /* ── Book page ──────────────────────────────── */
  book_badge:       { en: "RESERVATIONS",                ja: "ご予約",                   zh: "預訂",       ko: "예약" },
  book_title:       { en: "Where Would You Like To Go?", ja: "どこへお越しですか？",       zh: "您想去哪裡？", ko: "어디로 가시겠습니까?" },
  book_sub:         { en: "Japan Private Chauffeur Service", ja: "日本プライベートチャウファーサービス", zh: "日本專屬司機服務", ko: "일본 프라이빗 쇼퍼 서비스" },
  book_sec_route:   { en: "Route",                      ja: "ルート",                    zh: "路線",       ko: "경로" },
  book_from:        { en: "From",                       ja: "出発地",                    zh: "出發地",     ko: "출발지" },
  book_to:          { en: "To",                         ja: "目的地",                    zh: "目的地",     ko: "목적지" },
  book_from_ph:     { en: "Pickup location (airport, hotel, address…)", ja: "乗車場所（空港・ホテル・住所など）", zh: "接載地點（機場、酒店、地址…）", ko: "픽업 장소 (공항, 호텔, 주소...)" },
  book_to_ph:       { en: "Drop-off location (airport, hotel, address…)", ja: "降車場所（空港・ホテル・住所など）", zh: "目的地（機場、酒店、地址…）", ko: "목적지 (공항, 호텔, 주소...)" },
  book_sec_sched:   { en: "Schedule",                   ja: "日程",                      zh: "日程",       ko: "일정" },
  book_date:        { en: "Pickup Date",                 ja: "乗車日",                    zh: "上車日期",   ko: "픽업 날짜" },
  book_time:        { en: "Pickup Time",                ja: "乗車時刻",                  zh: "上車時間",   ko: "픽업 시간" },
  book_sec_pax:     { en: "Passengers & Luggage",       ja: "乗客・荷物",                zh: "乘客與行李", ko: "승객 및 수하물" },
  book_people:      { en: "Passengers",                 ja: "乗車人数",                  zh: "乘客人數",   ko: "승객" },
  book_bags:        { en: "Suitcases",                  ja: "スーツケース",              zh: "行李箱",     ko: "수트케이스" },
  book_sec_contact: { en: "Contact Information",        ja: "連絡先",                    zh: "聯絡資訊",   ko: "연락처 정보" },
  book_name:        { en: "Contact Name",               ja: "お名前",                    zh: "聯絡人姓名", ko: "연락처 이름" },
  book_name_ph:     { en: "Your full name",             ja: "フルネームを入力",          zh: "請輸入全名", ko: "성함을 입력하세요" },
  book_email:       { en: "Email Address",              ja: "メールアドレス",            zh: "電子郵件地址", ko: "이메일 주소" },
  book_submit:      { en: "Request a Quote",            ja: "お見積りを依頼する",        zh: "申請報價",   ko: "견적 요청" },
  book_required:    { en: "Required",                   ja: "必須",                      zh: "必填",       ko: "필수" },
  book_back:        { en: "← Back",                     ja: "← 戻る",                    zh: "← 返回",     ko: "← 뒤로" },

  /* ── Book — vehicle ─────────────────────────────── */
  book_sec_vehicle: { en: "Vehicle Preference",         ja: "車種指定",                   zh: "車型選擇",   ko: "차량 선택" },
  book_veh_any:     { en: "No Preference",              ja: "指定なし",                   zh: "不指定",     ko: "선택 없음" },
  book_veh_alphard: { en: "Alphard Class",              ja: "アルファードクラス",          zh: "Alphard 車型", ko: "알파드 클래스" },
  book_veh_hiace:   { en: "HiAce Class",                ja: "ハイエースクラス",            zh: "HiAce 車型", ko: "하이에이스 클래스" },
  book_veh_cap6:    { en: "Max 6 passengers",           ja: "最大ご乗車人数：6名",         zh: "最多乘坐 6 人", ko: "최대 6명" },
  book_veh_cap9:    { en: "Max 9 passengers",           ja: "最大ご乗車人数：9名",         zh: "最多乘坐 9 人", ko: "최대 9명" },
  book_veh_ex_a:    { en: "4 pax · 4 suitcases",        ja: "ご乗客4名・スーツケース4個",  zh: "4名乘客・4件行李", ko: "4명 · 수트케이스 4개" },
  book_veh_ex_h:    { en: "6 pax · 6 suitcases",        ja: "ご乗客6名・スーツケース6個",  zh: "6名乘客・6件行李", ko: "6명 · 수트케이스 6개" },

  /* ── Book — driver instructions ─────────────────── */
  book_sec_driver:  { en: "Message for Driver",         ja: "ドライバーへの伝達事項",      zh: "司機備注",   ko: "기사에게 메시지" },
  book_drv_note:    {
    en: "This will be shared directly with your driver after booking is confirmed. It does not affect driver or vehicle assignment.",
    ja: "この内容は配車確定後にドライバーへ直接共有されます。ドライバーや車両の選定には影響しません。",
    zh: "此內容將在預訂確認後直接與司機分享，不影響司機或車輛的安排。",
    ko: "이 내용은 예약 확인 후 기사에게 직접 공유됩니다. 기사 또는 차량 배정에는 영향을 미치지 않습니다.",
  },
  book_drv_none:    { en: "None",                       ja: "なし",                       zh: "無",         ko: "없음" },
  book_drv_hw:      { en: "Highway use OK",             ja: "高速利用OK",                 zh: "可走高速公路", ko: "고속도로 이용 가능" },
  book_drv_gentle:  { en: "Please drive gently",        ja: "ゆっくり丁寧な運転をお願いしたい", zh: "請溫和駕駛", ko: "부드럽게 운전해 주세요" },
  book_drv_quiet:   { en: "Minimal conversation",       ja: "会話は最小限にしてほしい",    zh: "盡量減少交談", ko: "대화 최소화" },
  book_drv_meet:    { en: "Meet & Greet",               ja: "ミートアンドグリート",        zh: "接機迎賓服務", ko: "미팅 & 그리팅" },
  book_drv_baby:    { en: "Baby Seat",                  ja: "ベビーシート",                zh: "嬰兒座椅",   ko: "베이비 시트" },
  book_drv_other:   { en: "Other",                      ja: "その他",                     zh: "其他",       ko: "기타" },
  book_drv_other_ph: { en: "Please describe…",           ja: "詳しくご記入ください…",       zh: "請自由填寫…", ko: "자세히 입력해 주세요..." },

  /* ── Book — mode tabs ───────────────────────────────── */
  book_tab_transfer: { en: "Transfer",                  ja: "送迎",                       zh: "點對點接送", ko: "이동" },
  book_tab_hour:     { en: "Hourly",                    ja: "時間チャーター",              zh: "按小時包車", ko: "시간제" },

  /* ── Book — return / duration ───────────────────────── */
  book_add_return:   { en: "ADD RETURN",                ja: "帰路を追加",                 zh: "加回程",     ko: "귀로 추가" },
  book_return_date:  { en: "Return Date",               ja: "帰路日付",                   zh: "回程日期",   ko: "귀로 날짜" },
  book_return_time:  { en: "Return Time",               ja: "帰路出発時刻",               zh: "回程時間",   ko: "귀로 출발 시간" },
  book_duration:     { en: "Duration",                  ja: "利用時間",                   zh: "使用時數",   ko: "이용 시간" },
  book_dur_h:        { en: "hours",                     ja: "時間",                       zh: "小時",       ko: "시간" },

  /* ── Book — booking details (accordion) ────────────── */
  book_sec_details:       { en: "Booking Details",      ja: "予約詳細",                   zh: "預訂詳情",   ko: "예약 상세" },
  book_add_flight_label:  { en: "Add Flight Number",    ja: "フライト番号を追加",          zh: "新增航班號碼", ko: "항공편 번호 추가" },
  book_add_notes_label:   { en: "Add Notes for the Driver", ja: "ドライバーへのメモを追加", zh: "新增司機備注", ko: "기사에게 메모 추가" },

  /* ── Book — flight tracking ─────────────────────────── */
  book_sec_flight:   { en: "Flight Tracking",           ja: "フライトトラッキング",        zh: "航班追蹤",   ko: "항공편 추적" },
  book_flight_num:   { en: "Flight Number",             ja: "フライト番号",               zh: "航班號碼",   ko: "항공편 번호" },
  book_flight_ph:    { en: "e.g. JL316, NH217…",        ja: "例）JL316、NH217…",          zh: "例：JL316、NH217…", ko: "예: JL316, NH217..." },
  book_flight_note:  {
    en: "We monitor your flight in real time. If you land late, your chauffeur adjusts automatically — no extra cost, no stress. Even better: we include 90 mins of free waiting time after landing so you can take it easy.",
    ja: "フライトをリアルタイムで追跡します。到着が遅れても、チャウファーが自動で調整―追加費用なし、ストレスなし。さらに、着陸後90分間の無料待機サービスが含まれているので、ゆっくりお過ごしいただけます。",
    zh: "我們即時追蹤您的航班。若您延誤降落，司機將自動調整—無需額外費用，毫無壓力。更貼心的是，我們提供降落後90分鐘免費等候時間，讓您從容不迫。",
    ko: "항공편을 실시간으로 추적합니다. 늦게 도착하셔도 쇼퍼가 자동으로 조정합니다—추가 비용 없음, 스트레스 없음. 더욱이 착륙 후 90분 무료 대기 서비스가 포함되어 있어 여유롭게 이동하실 수 있습니다.",
  },

  /* ── Book — emergency contact ───────────────────── */
  book_sec_sos:     { en: "Emergency Contact",          ja: "緊急連絡先",                 zh: "緊急聯絡人", ko: "긴급 연락처" },
  book_phone:       { en: "Phone Number",               ja: "電話番号",                   zh: "電話號碼",   ko: "전화번호" },
  book_phone_ph:    { en: "e.g. 090-1234-5678",         ja: "例）090-1234-5678",           zh: "例：090-1234-5678", ko: "예: 090-1234-5678" },
  book_whatsapp:    { en: "Also on WhatsApp",           ja: "WhatsApp 使用可能",           zh: "同時使用 WhatsApp", ko: "WhatsApp도 사용 가능" },
  book_optional:    { en: "Optional",                   ja: "任意",                       zh: "選填",       ko: "선택" },

  /* ── Law page ───────────────────────────────── */
  law_badge:  { en: "LEGAL NOTICE",   ja: "法的情報",          zh: "法定事項",  ko: "법적 고지" },
  law_title:  { en: "Legal Notice",   ja: "特定商取引法に基づく表記", zh: "法定事項記載", ko: "법적 고지" },
  law_back:   { en: "← Back to Home", ja: "← ホームへ戻る",    zh: "← 返回首頁", ko: "← 홈으로 돌아가기" },
};
