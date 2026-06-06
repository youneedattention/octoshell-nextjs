/** 3-language type used by existing page-level content objects (en/ja/zh) */
export type Lang = "en" | "ja" | "zh";

/** Full 8-language type used by the app shell (nav, header, URL routing) */
export type AppLang = Lang | "ko" | "fr" | "de" | "ar" | "th";

export const VALID_LANGS: AppLang[] = ["en", "ja", "zh", "ko", "fr", "de", "ar", "th"];

/** Map any AppLang to the nearest 3-lang fallback for page-level content */
export function toContentLang(l: AppLang): Lang {
  if (l === "en" || l === "ja" || l === "zh") return l;
  return "en";
}

/**
 * Fill a partial lang map with English fallback for all missing AppLang keys.
 */
export function fillLang<T>(
  partial: { en: T } & Partial<Record<AppLang, T>>
): Record<AppLang, T> {
  return {
    en: partial.en,
    ja: partial.ja ?? partial.en,
    zh: partial.zh ?? partial.en,
    ko: partial.ko ?? partial.en,
    fr: partial.fr ?? partial.en,
    de: partial.de ?? partial.en,
    ar: partial.ar ?? partial.en,
    th: partial.th ?? partial.en,
  };
}

type T = Record<AppLang, string>;

export const t: Record<string, T> = {
  /* ── Navigation ─────────────────────────────── */
  nav_home: {
    en: "Home", ja: "ホーム", zh: "首頁",
    ko: "홈", fr: "Accueil", de: "Startseite", ar: "الرئيسية", th: "หน้าแรก",
  },
  nav_services: {
    en: "Services", ja: "サービス", zh: "服務",
    ko: "서비스", fr: "Services", de: "Leistungen", ar: "الخدمات", th: "บริการ",
  },

  /* ── Services nav dropdown ─────────────────────────── */
  nav_svc_1: {
    en: "By the Hour", ja: "時間制貸切ハイヤー", zh: "時段包車服務",
    ko: "시간제 대여", fr: "À l'heure", de: "Stundenweise", ar: "بالساعة", th: "รายชั่วโมง",
  },
  nav_svc_2: {
    en: "Airport Transfers", ja: "空港定額送迎", zh: "機場定額接送",
    ko: "공항 픽업/드롭", fr: "Transferts aéroport", de: "Flughafentransfer", ar: "نقل المطار", th: "รับส่งสนามบิน",
  },
  nav_svc_3: {
    en: "One Way", ja: "片道ポイント送迎", zh: "單程穿梭",
    ko: "편도 이동", fr: "Trajet simple", de: "Einwegfahrt", ar: "رحلة ذهاب فقط", th: "เที่ยวเดียว",
  },
  nav_svc_4: {
    en: "Events & MICE", ja: "MICE & エグゼクティブ", zh: "頂級盛會",
    ko: "이벤트 & MICE", fr: "Événements & MICE", de: "Events & MICE", ar: "الفعاليات وMICE", th: "อีเวนต์ & MICE",
  },
  nav_svc_5: {
    en: "Bespoke Sightseeing", ja: "テーラーメイド観光", zh: "深度定制觀光",
    ko: "맞춤 관광", fr: "Visites sur mesure", de: "Individuelle Besichtigung", ar: "جولات مخصصة", th: "ทัวร์ตามสั่ง",
  },
  nav_svc_6: {
    en: "Golf", ja: "ゴルフ送迎", zh: "尊榮高爾夫",
    ko: "골프", fr: "Golf", de: "Golf", ar: "الغولف", th: "กอล์ฟ",
  },
  nav_svc_7: {
    en: "Ceremonial", ja: "冠婚葬祭", zh: "典禮迎送",
    ko: "의전 서비스", fr: "Cérémonies", de: "Zeremonien", ar: "مراسم رسمية", th: "งานพิธี",
  },
  nav_svc_8: {
    en: "Driver Dispatch", ja: "プロ乗務員派遣", zh: "司機派遣",
    ko: "드라이버 파견", fr: "Mise à disposition", de: "Fahrervermittlung", ar: "توفير سائق", th: "จัดหาคนขับ",
  },
  nav_svc_9: {
    en: "Photo Tour", ja: "旅拍ハイヤー", zh: "旅拍接送",
    ko: "포토 투어", fr: "Circuit photo", de: "Fototour", ar: "جولة تصوير", th: "ทัวร์ถ่ายภาพ",
  },
  nav_svc_10: {
    en: "Outdoor", ja: "アウトドア送迎", zh: "戶外接送",
    ko: "아웃도어", fr: "Plein air", de: "Outdoor", ar: "المغامرات الخارجية", th: "กิจกรรมกลางแจ้ง",
  },
  nav_fleet: {
    en: "Fleet", ja: "車種", zh: "車型",
    ko: "차량", fr: "Véhicules", de: "Fahrzeuge", ar: "الأسطول", th: "ยานพาหนะ",
  },
  nav_about: {
    en: "About", ja: "会社情報", zh: "關於",
    ko: "소개", fr: "À propos", de: "Über uns", ar: "عن الشركة", th: "เกี่ยวกับเรา",
  },
  nav_about_story: {
    en: "How It Works", ja: "Octoshellについて", zh: "品牌故事",
    ko: "서비스 소개", fr: "Comment ça marche", de: "So funktioniert es", ar: "كيف يعمل", th: "วิธีการทำงาน",
  },
  nav_about_faq: {
    en: "FAQ", ja: "よくある質問", zh: "常見問題",
    ko: "자주 묻는 질문", fr: "Questions fréquentes", de: "Häufige Fragen", ar: "الأسئلة الشائعة", th: "คำถามที่พบบ่อย",
  },
  nav_about_contact: {
    en: "Contact Us", ja: "お問い合わせ", zh: "聯絡我們",
    ko: "문의하기", fr: "Nous contacter", de: "Kontakt", ar: "اتصل بنا", th: "ติดต่อเรา",
  },
  nav_faq: {
    en: "FAQ", ja: "FAQ", zh: "FAQ",
    ko: "FAQ", fr: "FAQ", de: "FAQ", ar: "الأسئلة الشائعة", th: "FAQ",
  },
  nav_book: {
    en: "BOOK / Reserve", ja: "BOOK / 予約", zh: "BOOK / 預約",
    ko: "예약하기", fr: "RÉSERVER", de: "BUCHEN", ar: "احجز الآن", th: "จองเลย",
  },

  /* ── Hero ───────────────────────────────────── */
  hero_title1: {
    en: "OCTOSHELL JAPAN", ja: "OCTOSHELL JAPAN", zh: "OCTOSHELL JAPAN",
    ko: "OCTOSHELL JAPAN", fr: "OCTOSHELL JAPAN", de: "OCTOSHELL JAPAN", ar: "OCTOSHELL JAPAN", th: "OCTOSHELL JAPAN",
  },
  hero_title2: {
    en: "CHAUFFEUR SERVICE", ja: "チャウファーサービス", zh: "專屬司機服務",
    ko: "전속 기사 서비스", fr: "SERVICE CHAUFFEUR PRIVÉ", de: "PRIVATCHAUFFEUR-SERVICE", ar: "خدمة السائق الخاص", th: "บริการคนขับส่วนตัว",
  },
  hero_sub: {
    en: "Lay back and enjoy your trip", ja: "ゆったりと旅をお楽しみください", zh: "放鬆身心，盡享旅途",
    ko: "편안하게 여행을 즐기세요", fr: "Détendez-vous et profitez de votre voyage", de: "Lehnen Sie sich zurück und genießen Sie Ihre Reise", ar: "استرخِ واستمتع برحلتك", th: "ผ่อนคลายและเพลิดเพลินกับการเดินทาง",
  },

  /* ── Prices ─────────────────────────────────── */
  prices_title: {
    en: "PRICES", ja: "料金", zh: "價格",
    ko: "요금", fr: "TARIFS", de: "PREISE", ar: "الأسعار", th: "ราคา",
  },
  prices_sub: {
    en: "Includes Parking & Highway Expenses", ja: "駐車場・高速道路料金込み", zh: "包含停車及高速公路費用",
    ko: "주차장 및 고속도로 요금 포함", fr: "Inclus : stationnement et autoroute", de: "Inkl. Parkgebühren & Autobahnmaut", ar: "يشمل مواقف السيارات ورسوم الطريق السريع", th: "รวมค่าจอดรถและทางด่วน",
  },
  book_car: {
    en: "BOOK THIS CAR", ja: "この車を予約する", zh: "預訂此車",
    ko: "이 차량 예약", fr: "RÉSERVER CE VÉHICULE", de: "DIESES FAHRZEUG BUCHEN", ar: "احجز هذه السيارة", th: "จองรถคันนี้",
  },
  price_note: {
    en: "*10 hours per day. Prices may differ on holidays.", ja: "*1日10時間。祝祭日は料金が異なる場合があります。", zh: "*每日10小時，假日價格可能有所不同。",
    ko: "*1일 10시간. 공휴일에는 요금이 다를 수 있습니다.", fr: "*10 heures par jour. Tarifs pouvant varier les jours fériés.", de: "*10 Stunden pro Tag. Preise können an Feiertagen abweichen.", ar: "*10 ساعات يومياً. قد تختلف الأسعار في أيام العطل.", th: "*10 ชั่วโมงต่อวัน ราคาอาจแตกต่างในวันหยุด",
  },

  /* Route names */
  route_haneda: {
    en: "Haneda Airport – Tokyo", ja: "羽田空港 – 東京", zh: "羽田機場 – 東京",
    ko: "하네다공항 – 도쿄", fr: "Aéroport de Haneda – Tokyo", de: "Flughafen Haneda – Tokio", ar: "مطار هانيدا – طوكيو", th: "สนามบินฮาเนดะ – โตเกียว",
  },
  route_narita: {
    en: "Narita Airport – Tokyo", ja: "成田空港 – 東京", zh: "成田機場 – 東京",
    ko: "나리타공항 – 도쿄", fr: "Aéroport de Narita – Tokyo", de: "Flughafen Narita – Tokio", ar: "مطار ناريتا – طوكيو", th: "สนามบินนาริตะ – โตเกียว",
  },
  route_city: {
    en: "Tokyo City", ja: "東京市内", zh: "東京市區",
    ko: "도쿄 시내", fr: "Tokyo Ville", de: "Tokio Stadt", ar: "مدينة طوكيو", th: "เมืองโตเกียว",
  },
  route_fuji: {
    en: "Tokyo – Fuji Mt. – Outlets", ja: "東京 – 富士山 – アウトレット", zh: "東京 – 富士山 – 購物中心",
    ko: "도쿄 – 후지산 – 아울렛", fr: "Tokyo – Mont Fuji – Outlets", de: "Tokio – Fuji – Outlets", ar: "طوكيو – جبل فوجي – المنافذ", th: "โตเกียว – ภูเขาไฟฟูจิ – เอาท์เล็ต",
  },
  route_kanagawa: {
    en: "Tokyo – Kanagawa", ja: "東京 – 神奈川", zh: "東京 – 神奈川",
    ko: "도쿄 – 가나가와", fr: "Tokyo – Kanagawa", de: "Tokio – Kanagawa", ar: "طوكيو – كاناغاوا", th: "โตเกียว – คานากาวะ",
  },
  route_hakone: {
    en: "Tokyo – Hakone – Outlets", ja: "東京 – 箱根 – アウトレット", zh: "東京 – 箱根 – 購物中心",
    ko: "도쿄 – 하코네 – 아울렛", fr: "Tokyo – Hakone – Outlets", de: "Tokio – Hakone – Outlets", ar: "طوكيو – هاكوني – المنافذ", th: "โตเกียว – ฮาโกเน่ – เอาท์เล็ต",
  },
  route_izu: {
    en: "Tokyo – Izu/East Izu", ja: "東京 – 伊豆/東伊豆", zh: "東京 – 伊豆/東伊豆",
    ko: "도쿄 – 이즈/히가시이즈", fr: "Tokyo – Izu/Est Izu", de: "Tokio – Izu/Ost-Izu", ar: "طوكيو – إيزو / شرق إيزو", th: "โตเกียว – อิซุ/อิซุตะวันออก",
  },
  route_golf: {
    en: "Tokyo – Golf Clubs", ja: "東京 – ゴルフ場", zh: "東京 – 高爾夫球場",
    ko: "도쿄 – 골프장", fr: "Tokyo – Golfs", de: "Tokio – Golfclubs", ar: "طوكيو – ملاعب الغولف", th: "โตเกียว – สนามกอล์ฟ",
  },

  /* ── Tailored ───────────────────────────────── */
  tailored_title: {
    en: "TAILORED FOR YOU", ja: "あなたのために", zh: "為您量身定制",
    ko: "당신을 위한 맞춤 서비스", fr: "FAIT POUR VOUS", de: "MASSGESCHNEIDERT FÜR SIE", ar: "مصمم خصيصاً لك", th: "ปรับแต่งเพื่อคุณ",
  },
  tailored_sub: {
    en: "Professional, Outstanding and Consistent", ja: "プロフェッショナル・卓越・一貫性", zh: "專業、卓越、始終如一",
    ko: "전문적이고 탁월하며 일관된 서비스", fr: "Professionnel, Remarquable et Constant", de: "Professionell, Hervorragend und Beständig", ar: "احترافي ومتميز ومتسق", th: "มืออาชีพ โดดเด่น และสม่ำเสมอ",
  },
  our_company: {
    en: "OUR COMPANY", ja: "会社概要", zh: "關於公司",
    ko: "회사 소개", fr: "NOTRE ENTREPRISE", de: "UNSER UNTERNEHMEN", ar: "شركتنا", th: "บริษัทของเรา",
  },
  tailored_body: {
    en: "Welcome to Octoshell JP, Japan's premier chartered car service specializing in luxury transportation for bespoke travel experiences. We cater to discerning clients seeking comfort, style, and exceptional service, whether for exclusive hiking adventures, scenic tours, or business travel. Our fleet of premium vehicles, combined with our knowledgeable and courteous chauffeurs, ensures a seamless and unforgettable journey through Japan's most beautiful and iconic destinations.",
    ja: "Octoshell JPへようこそ。日本最高峰のプレミアムチャータードカーサービスとして、お客様だけの贅沢な旅をご提供しています。上質なご旅行をお求めのお客様に、快適さ・洗練されたスタイル・卓越したサービスをお届けします。厳選されたプレミアム車両と知識豊富な礼儀正しいチャウファーが、日本の美しい名所を巡る忘れられない旅をお手伝いします。",
    zh: "歡迎來到Octoshell JP，日本頂級專屬座駕服務，專注於為客製化旅程提供豪華接送。我們服務追求舒適、品味與卓越體驗的尊貴客戶，無論是私人健行探險、風景觀光還是商務出行。我們的豪華車隊配備知識淵博、彬彬有禮的專屬司機，確保您在日本最美麗的目的地享受流暢難忘的旅程。",
    ko: "오토쉘 JP에 오신 것을 환영합니다. 일본 최고의 프리미엄 전세 차량 서비스로, 맞춤형 여행을 위한 고급 운송을 전문으로 합니다. 편안함, 스타일, 탁월한 서비스를 원하시는 고객을 위해 하이킹 어드벤처, 경치 관광, 비즈니스 여행 등 모든 여정을 지원합니다. 최고급 차량과 풍부한 지식을 갖춘 친절한 기사가 일본의 아름다운 명소를 완벽하게 안내해 드립니다.",
    fr: "Bienvenue chez Octoshell JP, le service de chauffeur privé haut de gamme du Japon, spécialisé dans le transport de luxe pour des voyages sur mesure. Nous accueillons une clientèle exigeante en quête de confort, de style et d'un service d'exception, que ce soit pour des randonnées privées, des visites touristiques ou des déplacements professionnels. Notre flotte de véhicules premium, associée à des chauffeurs compétents et courtois, garantit un voyage fluide et inoubliable à travers les plus beaux sites du Japon.",
    de: "Willkommen bei Octoshell JP, Japans führendem Premiumchauffeurservice für maßgeschneiderte Luxusreisen. Wir betreuen anspruchsvolle Gäste, die Komfort, Stil und exzellenten Service suchen – ob für exklusive Wanderabenteuer, Sightseeing-Touren oder Geschäftsreisen. Unsere Premium-Fahrzeugflotte und erfahrenen, höflichen Chauffeure garantieren eine reibungslose und unvergessliche Reise durch Japans schönste Destinationen.",
    ar: "مرحباً بكم في أوكتوشيل JP، الخدمة الرائدة للسيارات المستأجرة في اليابان، المتخصصة في النقل الفاخر لتجارب السفر المخصصة. نقدم خدماتنا للعملاء المميزين الباحثين عن الراحة والأناقة والخدمة الاستثنائية، سواء للمغامرات الجبلية أو الجولات السياحية أو رحلات الأعمال. تضمن سيارتنا الفارهة وسائقونا المؤهلون والمهذبون رحلة سلسة ولا تُنسى عبر أجمل الوجهات اليابانية.",
    th: "ยินดีต้อนรับสู่ Octoshell JP บริการรถเช่าพร้อมคนขับระดับพรีเมียมของญี่ปุ่น เชี่ยวชาญด้านการขนส่งหรูสำหรับการเดินทางแบบตัวต่อตัว เราดูแลลูกค้าที่มีความต้องการสูงซึ่งต้องการความสะดวกสบาย สไตล์ และบริการพิเศษ ไม่ว่าจะเป็นการผจญภัยในธรรมชาติ ทัวร์ชมวิว หรือการเดินทางเพื่อธุรกิจ",
  },
  tailored_bold: {
    en: "Welcome to Octoshell JP", ja: "Octoshell JPへようこそ", zh: "歡迎來到Octoshell JP",
    ko: "오토쉘 JP에 오신 것을 환영합니다", fr: "Bienvenue chez Octoshell JP", de: "Willkommen bei Octoshell JP", ar: "مرحباً بكم في أوكتوشيل JP", th: "ยินดีต้อนรับสู่ Octoshell JP",
  },

  /* ── Services ───────────────────────────────── */
  services_title: {
    en: "OUR SERVICES", ja: "私たちのサービス", zh: "我們的服務",
    ko: "서비스 안내", fr: "NOS SERVICES", de: "UNSERE LEISTUNGEN", ar: "خدماتنا", th: "บริการของเรา",
  },
  services_sub: {
    en: "Tailor Made Travel Just for You", ja: "あなただけのカスタムトラベル", zh: "專為您打造的旅行",
    ko: "당신만을 위한 맞춤 여행", fr: "Un voyage sur mesure rien que pour vous", de: "Maßgeschneiderte Reisen nur für Sie", ar: "رحلة مصممة خصيصاً لك", th: "การเดินทางที่ออกแบบมาเพื่อคุณ",
  },

  svc1_tag: {
    en: "BY THE DAY", ja: "日帰り", zh: "按日計費",
    ko: "1일 단위", fr: "À LA JOURNÉE", de: "TAGESWEISE", ar: "يومي", th: "รายวัน",
  },
  svc1_title: {
    en: "Personal Chauffeur", ja: "パーソナルチャウファー", zh: "專屬司機",
    ko: "전속 기사", fr: "Chauffeur personnel", de: "Persönlicher Chauffeur", ar: "سائق خاص", th: "คนขับส่วนตัว",
  },
  svc1_body: {
    en: "We offer a luxurious, private transportation experience tailored to your itinerary, ensuring comfort and convenience as you explore Japan's stunning landscapes and cultural landmarks.",
    ja: "お客様のスケジュールに合わせた豪華なプライベート送迎サービスをご提供します。日本の素晴らしい風景や文化的名所を快適にご旅行いただけます。",
    zh: "我們提供為您行程量身定制的豪華私人接送服務，讓您在探索日本壯麗風景和文化名勝時盡享舒適便捷。",
    ko: "고객님의 일정에 맞춘 호화로운 프라이빗 이동 서비스를 제공하며, 일본의 멋진 풍경과 문화 명소를 편안하게 탐방하실 수 있도록 도와드립니다.",
    fr: "Nous proposons une expérience de transport privé et luxueuse adaptée à votre itinéraire, vous assurant confort et commodité lors de l'exploration des paysages du Japon.",
    de: "Wir bieten ein luxuriöses, privates Fahrerlebnis, das auf Ihren Reiseplan zugeschnitten ist und Komfort bei der Erkundung Japans gewährleistet.",
    ar: "نقدم تجربة نقل خاصة وفاخرة مصممة وفق جدولك الزمني، لضمان الراحة أثناء استكشاف المناظر الطبيعية والمعالم الثقافية في اليابان.",
    th: "เราให้บริการขนส่งส่วนตัวระดับหรู ปรับแต่งตามตารางเวลาของคุณ เพื่อความสะดวกสบายในการสำรวจภูมิทัศน์อันสวยงามของญี่ปุ่น",
  },
  svc2_tag: {
    en: "AIRPORT", ja: "空港送迎", zh: "機場接送",
    ko: "공항", fr: "AÉROPORT", de: "FLUGHAFEN", ar: "المطار", th: "สนามบิน",
  },
  svc2_title: {
    en: "Pick up and Drop off", ja: "空港送迎サービス", zh: "機場接送服務",
    ko: "픽업 및 드롭", fr: "Prise en charge et dépose", de: "Abholung und Anlieferung", ar: "الاستقبال والتوصيل", th: "รับและส่ง",
  },
  svc2_body: {
    en: "We provide a seamless and stress-free travel experience, with punctual, comfortable, and luxurious transportation to and from Japan's major airports.",
    ja: "日本の主要空港への送迎を、時間厳守・快適・豪華にご提供します。ストレスのないスムーズな移動をお約束します。",
    zh: "我們提供無縫、無壓力的出行體驗，準時接送您往返日本各大機場，舒適豪華。",
    ko: "일본 주요 공항까지 정시에 편안하고 고급스러운 이동 서비스를 제공합니다. 스트레스 없이 원활한 여행을 경험하세요.",
    fr: "Nous offrons une expérience de voyage sans faille et sans stress, avec un transport ponctuel, confortable et luxueux vers et depuis les principaux aéroports du Japon.",
    de: "Wir bieten ein nahtloses und stressfreies Reiseerlebnis mit pünktlichem, komfortablem und luxuriösem Transfer zu Japans wichtigsten Flughäfen.",
    ar: "نوفر تجربة سفر سلسة وخالية من التوتر، مع نقل دقيق ومريح وفاخر من وإلى المطارات الرئيسية في اليابان.",
    th: "เราให้บริการเดินทางที่ราบรื่นและปราศจากความเครียด พร้อมการขนส่งที่ตรงเวลา สะดวกสบาย และหรูหราไปยังสนามบินหลักในญี่ปุ่น",
  },
  svc3_tag: {
    en: "ROUND TRIP", ja: "往復送迎", zh: "往返接送",
    ko: "편도", fr: "ALLER SIMPLE", de: "EINWEG", ar: "ذهاب فقط", th: "เที่ยวเดียว",
  },
  svc3_title: {
    en: "Luxury experience between A and B", ja: "A地点からB地点へのラグジュアリー体験", zh: "奢華點對點接送體驗",
    ko: "A에서 B까지의 럭셔리 이동", fr: "Voyage luxueux de A à B", de: "Luxuriöse Fahrt von A nach B", ar: "تجربة فاخرة من النقطة A إلى B", th: "การเดินทางหรูจาก A ถึง B",
  },
  svc3_body: {
    en: "We offer convenient and stylish transportation, ensuring a smooth and comfortable journey to your appointed destination without hassle of return arrangements.",
    ja: "目的地までのスムーズで快適な移動をご提供します。帰りの手配の煩わしさなく、洗練されたスタイルでご旅行いただけます。",
    zh: "我們提供便捷時尚的接送服務，確保您順暢舒適地抵達目的地，無需為返程安排費心。",
    ko: "불편한 귀환 준비 없이 목적지까지 편안하고 스타일리시한 이동 서비스를 제공합니다.",
    fr: "Nous proposons un transport pratique et élégant pour un trajet agréable vers votre destination, sans les tracas des arrangements pour le retour.",
    de: "Wir bieten komfortable und stilvolle Beförderung zu Ihrem Ziel, ohne die Mühe der Rückreiseplanung.",
    ar: "نقدم نقلاً مريحاً وأنيقاً لضمان وصولك السلس إلى وجهتك دون عناء ترتيبات العودة.",
    th: "เราให้บริการขนส่งที่สะดวกสบายและมีสไตล์ เพื่อให้คุณเดินทางถึงจุดหมายได้อย่างราบรื่น โดยไม่ต้องกังวลเรื่องการเดินทางกลับ",
  },

  /* ── Footer ─────────────────────────────────── */
  copyright: {
    en: "© Copyright 2024 Octoshell.  All Rights Reserved",
    ja: "© Copyright 2024 Octoshell.  全著作権所有",
    zh: "© Copyright 2024 Octoshell.  版權所有",
    ko: "© Copyright 2024 Octoshell. 모든 권리 보유",
    fr: "© Copyright 2024 Octoshell. Tous droits réservés",
    de: "© Copyright 2024 Octoshell. Alle Rechte vorbehalten",
    ar: "© حقوق النشر 2024 أوكتوشيل. جميع الحقوق محفوظة",
    th: "© Copyright 2024 Octoshell. สงวนลิขสิทธิ์ทั้งหมด",
  },
  footer_terms: {
    en: "Terms", ja: "利用規約", zh: "使用條款",
    ko: "이용약관", fr: "Conditions", de: "AGB", ar: "الشروط", th: "ข้อกำหนด",
  },
  footer_privacy: {
    en: "Privacy", ja: "プライバシーポリシー", zh: "隱私政策",
    ko: "개인정보처리방침", fr: "Confidentialité", de: "Datenschutz", ar: "الخصوصية", th: "ความเป็นส่วนตัว",
  },
  footer_law: {
    en: "Legal Notice", ja: "特定商取引法に基づく表記", zh: "法定事項記載",
    ko: "법적 고지", fr: "Mentions légales", de: "Impressum", ar: "الإشعار القانوني", th: "ประกาศทางกฎหมาย",
  },

  /* ── Book page ──────────────────────────────── */
  book_badge: {
    en: "RESERVATIONS", ja: "ご予約", zh: "預訂",
    ko: "예약", fr: "RÉSERVATIONS", de: "RESERVIERUNGEN", ar: "الحجوزات", th: "การจอง",
  },
  book_title: {
    en: "Where Would You Like To Go?", ja: "どこへお越しですか？", zh: "您想去哪裡？",
    ko: "어디로 가시겠어요?", fr: "Où souhaitez-vous aller ?", de: "Wohin möchten Sie reisen?", ar: "إلى أين تريد الذهاب؟", th: "คุณต้องการไปที่ไหน?",
  },
  book_sub: {
    en: "Japan Private Chauffeur Service", ja: "日本プライベートチャウファーサービス", zh: "日本專屬司機服務",
    ko: "일본 프라이빗 기사 서비스", fr: "Service de chauffeur privé au Japon", de: "Privater Chauffeurservice in Japan", ar: "خدمة السائق الخاص في اليابان", th: "บริการคนขับส่วนตัวในญี่ปุ่น",
  },
  book_sec_route: {
    en: "Route", ja: "ルート", zh: "路線",
    ko: "경로", fr: "Itinéraire", de: "Route", ar: "المسار", th: "เส้นทาง",
  },
  book_from: {
    en: "From", ja: "出発地", zh: "出發地",
    ko: "출발지", fr: "Départ", de: "Von", ar: "من", th: "จาก",
  },
  book_to: {
    en: "To", ja: "目的地", zh: "目的地",
    ko: "목적지", fr: "Arrivée", de: "Nach", ar: "إلى", th: "ถึง",
  },
  book_from_ph: {
    en: "Pickup location (airport, hotel, address…)", ja: "乗車場所（空港・ホテル・住所など）", zh: "接載地點（機場、酒店、地址…）",
    ko: "승차 장소 (공항, 호텔, 주소...)", fr: "Lieu de prise en charge (aéroport, hôtel, adresse…)", de: "Abholort (Flughafen, Hotel, Adresse…)", ar: "موقع الاستلام (مطار، فندق، عنوان…)", th: "สถานที่รับ (สนามบิน โรงแรม ที่อยู่…)",
  },
  book_to_ph: {
    en: "Drop-off location (airport, hotel, address…)", ja: "降車場所（空港・ホテル・住所など）", zh: "目的地（機場、酒店、地址…）",
    ko: "하차 장소 (공항, 호텔, 주소...)", fr: "Lieu de dépose (aéroport, hôtel, adresse…)", de: "Zielort (Flughafen, Hotel, Adresse…)", ar: "موقع التوصيل (مطار، فندق، عنوان…)", th: "สถานที่ส่ง (สนามบิน โรงแรม ที่อยู่…)",
  },
  book_sec_sched: {
    en: "Schedule", ja: "日程", zh: "日程",
    ko: "일정", fr: "Horaires", de: "Zeitplan", ar: "الجدول", th: "ตารางเวลา",
  },
  book_date: {
    en: "Pickup Date", ja: "乗車日", zh: "上車日期",
    ko: "승차 날짜", fr: "Date de prise en charge", de: "Abholdatum", ar: "تاريخ الاستلام", th: "วันที่รับ",
  },
  book_time: {
    en: "Pickup Time", ja: "乗車時刻", zh: "上車時間",
    ko: "승차 시간", fr: "Heure de prise en charge", de: "Abholzeit", ar: "وقت الاستلام", th: "เวลารับ",
  },
  book_sec_pax: {
    en: "Passengers & Luggage", ja: "乗客・荷物", zh: "乘客與行李",
    ko: "승객 및 수하물", fr: "Passagers & Bagages", de: "Passagiere & Gepäck", ar: "الركاب والأمتعة", th: "ผู้โดยสารและสัมภาระ",
  },
  book_people: {
    en: "Passengers", ja: "乗車人数", zh: "乘客人數",
    ko: "승객 수", fr: "Passagers", de: "Passagiere", ar: "الركاب", th: "ผู้โดยสาร",
  },
  book_bags: {
    en: "Suitcases", ja: "スーツケース", zh: "行李箱",
    ko: "수트케이스", fr: "Valises", de: "Koffer", ar: "الحقائب", th: "กระเป๋าเดินทาง",
  },
  book_sec_contact: {
    en: "Contact Information", ja: "連絡先", zh: "聯絡資訊",
    ko: "연락처", fr: "Coordonnées", de: "Kontaktinformationen", ar: "معلومات الاتصال", th: "ข้อมูลติดต่อ",
  },
  book_name: {
    en: "Contact Name", ja: "お名前", zh: "聯絡人姓名",
    ko: "연락처 이름", fr: "Nom du contact", de: "Kontaktname", ar: "اسم جهة الاتصال", th: "ชื่อผู้ติดต่อ",
  },
  book_name_ph: {
    en: "Your full name", ja: "フルネームを入力", zh: "請輸入全名",
    ko: "성함을 입력해 주세요", fr: "Votre nom complet", de: "Ihr vollständiger Name", ar: "اسمك الكامل", th: "ชื่อ-นามสกุลของคุณ",
  },
  book_email: {
    en: "Email Address", ja: "メールアドレス", zh: "電子郵件地址",
    ko: "이메일 주소", fr: "Adresse e-mail", de: "E-Mail-Adresse", ar: "البريد الإلكتروني", th: "ที่อยู่อีเมล",
  },
  book_submit: {
    en: "Request a Quote", ja: "お見積りを依頼する", zh: "申請報價",
    ko: "견적 요청", fr: "Demander un devis", de: "Angebot anfordern", ar: "طلب عرض سعر", th: "ขอใบเสนอราคา",
  },
  book_required: {
    en: "Required", ja: "必須", zh: "必填",
    ko: "필수", fr: "Obligatoire", de: "Pflichtfeld", ar: "مطلوب", th: "จำเป็น",
  },
  book_back: {
    en: "← Back", ja: "← 戻る", zh: "← 返回",
    ko: "← 뒤로", fr: "← Retour", de: "← Zurück", ar: "← رجوع", th: "← กลับ",
  },

  /* ── Book — vehicle ─────────────────────────────── */
  book_sec_vehicle: {
    en: "Vehicle Preference", ja: "車種指定", zh: "車型選擇",
    ko: "차량 선택", fr: "Préférence de véhicule", de: "Fahrzeugpräferenz", ar: "تفضيل السيارة", th: "ความต้องการรถยนต์",
  },
  book_veh_any: {
    en: "No Preference", ja: "指定なし", zh: "不指定",
    ko: "선택 안 함", fr: "Sans préférence", de: "Keine Präferenz", ar: "بدون تفضيل", th: "ไม่มีความต้องการพิเศษ",
  },
  book_veh_alphard: {
    en: "Alphard Class", ja: "アルファードクラス", zh: "Alphard 車型",
    ko: "알파드 클래스", fr: "Classe Alphard", de: "Alphard-Klasse", ar: "فئة ألفارد", th: "คลาสอัลฟาร์ด",
  },
  book_veh_hiace: {
    en: "HiAce Class", ja: "ハイエースクラス", zh: "HiAce 車型",
    ko: "하이에이스 클래스", fr: "Classe HiAce", de: "HiAce-Klasse", ar: "فئة هايس", th: "คลาสไฮเอซ",
  },
  book_veh_cap6: {
    en: "Max 6 passengers", ja: "最大ご乗車人数：6名", zh: "最多乘坐 6 人",
    ko: "최대 6명", fr: "Max 6 passagers", de: "Max. 6 Passagiere", ar: "أقصى 6 ركاب", th: "สูงสุด 6 คน",
  },
  book_veh_cap9: {
    en: "Max 9 passengers", ja: "最大ご乗車人数：9名", zh: "最多乘坐 9 人",
    ko: "최대 9명", fr: "Max 9 passagers", de: "Max. 9 Passagiere", ar: "أقصى 9 ركاب", th: "สูงสุด 9 คน",
  },
  book_veh_ex_a: {
    en: "4 pax · 4 suitcases", ja: "ご乗客4名・スーツケース4個", zh: "4名乘客・4件行李",
    ko: "4명 · 캐리어 4개", fr: "4 pass. · 4 valises", de: "4 Pers. · 4 Koffer", ar: "4 ركاب · 4 حقائب", th: "4 คน · 4 กระเป๋า",
  },
  book_veh_ex_h: {
    en: "6 pax · 6 suitcases", ja: "ご乗客6名・スーツケース6個", zh: "6名乘客・6件行李",
    ko: "6명 · 캐리어 6개", fr: "6 pass. · 6 valises", de: "6 Pers. · 6 Koffer", ar: "6 ركاب · 6 حقائب", th: "6 คน · 6 กระเป๋า",
  },

  /* ── Book — driver instructions ─────────────────── */
  book_sec_driver: {
    en: "Message for Driver", ja: "ドライバーへの伝達事項", zh: "司機備注",
    ko: "기사에게 전달 사항", fr: "Message pour le chauffeur", de: "Nachricht an den Fahrer", ar: "رسالة للسائق", th: "ข้อความถึงคนขับ",
  },
  book_drv_note: {
    en: "This will be shared directly with your driver after booking is confirmed. It does not affect driver or vehicle assignment.",
    ja: "この内容は配車確定後にドライバーへ直接共有されます。ドライバーや車両の選定には影響しません。",
    zh: "此內容將在預訂確認後直接與司機分享，不影響司機或車輛的安排。",
    ko: "예약 확정 후 기사에게 직접 전달됩니다. 기사 및 차량 배정에는 영향을 주지 않습니다.",
    fr: "Ces informations seront transmises directement à votre chauffeur après confirmation. Elles n'affectent pas l'attribution du chauffeur ou du véhicule.",
    de: "Diese Informationen werden nach Buchungsbestätigung direkt an Ihren Fahrer weitergeleitet. Sie beeinflussen nicht die Fahrer- oder Fahrzeugzuweisung.",
    ar: "ستُشارك هذه المعلومات مباشرة مع سائقك بعد تأكيد الحجز. لا تؤثر على تعيين السائق أو السيارة.",
    th: "ข้อมูลนี้จะถูกแชร์กับคนขับของคุณโดยตรงหลังยืนยันการจอง ไม่มีผลต่อการมอบหมายคนขับหรือรถยนต์",
  },
  book_drv_none: {
    en: "None", ja: "なし", zh: "無",
    ko: "없음", fr: "Aucun", de: "Keine", ar: "لا شيء", th: "ไม่มี",
  },
  book_drv_hw: {
    en: "Highway use OK", ja: "高速利用OK", zh: "可走高速公路",
    ko: "고속도로 이용 가능", fr: "Autoroute autorisée", de: "Autobahn OK", ar: "استخدام الطريق السريع مقبول", th: "ใช้ทางด่วนได้",
  },
  book_drv_gentle: {
    en: "Please drive gently", ja: "ゆっくり丁寧な運転をお願いしたい", zh: "請溫和駕駛",
    ko: "부드럽게 운전해 주세요", fr: "Conduite douce svp", de: "Bitte sanft fahren", ar: "الرجاء القيادة بهدوء", th: "ขับรถเบาๆ ด้วยนะ",
  },
  book_drv_quiet: {
    en: "Minimal conversation", ja: "会話は最小限にしてほしい", zh: "盡量減少交談",
    ko: "대화 최소화", fr: "Conversation minimale", de: "Minimale Unterhaltung", ar: "حوار أدنى", th: "การสนทนาน้อยที่สุด",
  },
  book_drv_meet: {
    en: "Meet & Greet", ja: "ミートアンドグリート", zh: "接機迎賓服務",
    ko: "미트 & 그리트", fr: "Accueil personnalisé", de: "Meet & Greet", ar: "الاستقبال والترحيب", th: "บริการต้อนรับ",
  },
  book_drv_baby: {
    en: "Baby Seat", ja: "ベビーシート", zh: "嬰兒座椅",
    ko: "유아용 카시트", fr: "Siège bébé", de: "Kindersitz", ar: "مقعد أطفال", th: "ที่นั่งเด็ก",
  },
  book_drv_other: {
    en: "Other", ja: "その他", zh: "其他",
    ko: "기타", fr: "Autre", de: "Sonstiges", ar: "أخرى", th: "อื่นๆ",
  },
  book_drv_other_ph: {
    en: "Please describe…", ja: "詳しくご記入ください…", zh: "請自由填寫…",
    ko: "상세히 기재해 주세요...", fr: "Veuillez décrire…", de: "Bitte beschreiben…", ar: "يرجى الوصف…", th: "โปรดอธิบาย…",
  },

  /* ── Book — mode tabs ───────────────────────────────── */
  book_tab_transfer: {
    en: "Transfer", ja: "送迎", zh: "點對點接送",
    ko: "이동", fr: "Transfert", de: "Transfer", ar: "نقل", th: "รับส่ง",
  },
  book_tab_hour: {
    en: "Hourly", ja: "時間チャーター", zh: "按小時包車",
    ko: "시간제", fr: "À l'heure", de: "Stundenweise", ar: "بالساعة", th: "รายชั่วโมง",
  },

  /* ── Book — return / duration ───────────────────────── */
  book_add_return: {
    en: "ADD RETURN", ja: "帰路を追加", zh: "加回程",
    ko: "귀로 추가", fr: "AJOUTER RETOUR", de: "RÜCKFAHRT HINZUFÜGEN", ar: "إضافة عودة", th: "เพิ่มเที่ยวกลับ",
  },
  book_return_date: {
    en: "Return Date", ja: "帰路日付", zh: "回程日期",
    ko: "귀로 날짜", fr: "Date de retour", de: "Rückfahrtdatum", ar: "تاريخ العودة", th: "วันที่กลับ",
  },
  book_return_time: {
    en: "Return Time", ja: "帰路出発時刻", zh: "回程時間",
    ko: "귀로 시간", fr: "Heure de retour", de: "Rückfahrtzeit", ar: "وقت العودة", th: "เวลากลับ",
  },
  book_duration: {
    en: "Duration", ja: "利用時間", zh: "使用時數",
    ko: "이용 시간", fr: "Durée", de: "Dauer", ar: "المدة", th: "ระยะเวลา",
  },
  book_dur_h: {
    en: "hours", ja: "時間", zh: "小時",
    ko: "시간", fr: "heures", de: "Stunden", ar: "ساعات", th: "ชั่วโมง",
  },

  /* ── Book — booking details ────────────── */
  book_sec_details: {
    en: "Booking Details", ja: "予約詳細", zh: "預訂詳情",
    ko: "예약 세부 사항", fr: "Détails de réservation", de: "Buchungsdetails", ar: "تفاصيل الحجز", th: "รายละเอียดการจอง",
  },
  book_add_flight_label: {
    en: "Add Flight Number", ja: "フライト番号を追加", zh: "新增航班號碼",
    ko: "항공편 번호 추가", fr: "Ajouter numéro de vol", de: "Flugnummer hinzufügen", ar: "إضافة رقم الرحلة", th: "เพิ่มหมายเลขเที่ยวบิน",
  },
  book_add_notes_label: {
    en: "Add Notes for the Driver", ja: "ドライバーへのメモを追加", zh: "新增司機備注",
    ko: "기사에게 메모 추가", fr: "Ajouter notes pour le chauffeur", de: "Notizen für den Fahrer hinzufügen", ar: "إضافة ملاحظات للسائق", th: "เพิ่มหมายเหตุสำหรับคนขับ",
  },

  /* ── Book — flight tracking ─────────────────────────── */
  book_sec_flight: {
    en: "Flight Tracking", ja: "フライトトラッキング", zh: "航班追蹤",
    ko: "항공편 추적", fr: "Suivi de vol", de: "Flugrückverfolgung", ar: "تتبع الرحلة", th: "ติดตามเที่ยวบิน",
  },
  book_flight_num: {
    en: "Flight Number", ja: "フライト番号", zh: "航班號碼",
    ko: "항공편 번호", fr: "Numéro de vol", de: "Flugnummer", ar: "رقم الرحلة", th: "หมายเลขเที่ยวบิน",
  },
  book_flight_ph: {
    en: "e.g. JL316, NH217…", ja: "例）JL316、NH217…", zh: "例：JL316、NH217…",
    ko: "예: JL316, NH217...", fr: "ex. JL316, NH217…", de: "z.B. JL316, NH217…", ar: "مثال: JL316، NH217…", th: "เช่น JL316, NH217…",
  },
  book_flight_note: {
    en: "We monitor your flight in real time. If you land late, your chauffeur adjusts automatically — no extra cost, no stress. Even better: we include 90 mins of free waiting time after landing so you can take it easy.",
    ja: "フライトをリアルタイムで追跡します。到着が遅れても、チャウファーが自動で調整―追加費用なし、ストレスなし。さらに、着陸後90分間の無料待機サービスが含まれているので、ゆっくりお過ごしいただけます。",
    zh: "我們即時追蹤您的航班。若您延誤降落，司機將自動調整—無需額外費用，毫無壓力。更貼心的是，我們提供降落後90分鐘免費等候時間，讓您從容不迫。",
    ko: "항공편을 실시간으로 모니터링합니다. 늦게 도착하더라도 기사가 자동으로 조정합니다 — 추가 비용 없음, 스트레스 없음. 더욱 좋은 점은, 착륙 후 90분간 무료 대기 시간이 포함되어 있어 여유롭게 이동하실 수 있습니다.",
    fr: "Nous surveillons votre vol en temps réel. En cas de retard, votre chauffeur s'adapte automatiquement — sans frais supplémentaires, sans stress. De plus, 90 minutes d'attente gratuite sont incluses après l'atterrissage.",
    de: "Wir überwachen Ihren Flug in Echtzeit. Bei Verspätung passt sich Ihr Chauffeur automatisch an — ohne Mehrkosten, ohne Stress. Dazu sind 90 Minuten kostenlose Wartezeit nach der Landung inklusive.",
    ar: "نراقب رحلتك في الوقت الفعلي. في حال التأخير، يتكيف سائقك تلقائياً — بدون تكاليف إضافية أو توتر. والأفضل أن 90 دقيقة انتظار مجانية مشمولة بعد الهبوط.",
    th: "เราติดตามเที่ยวบินของคุณแบบเรียลไทม์ หากล่าช้า คนขับจะปรับตัวโดยอัตโนมัติ — ไม่มีค่าใช้จ่ายเพิ่ม ไม่มีความเครียด นอกจากนี้ยังรวมเวลารอฟรี 90 นาทีหลังลงจอด",
  },

  /* ── Book — emergency contact ───────────────────── */
  book_sec_sos: {
    en: "Emergency Contact", ja: "緊急連絡先", zh: "緊急聯絡人",
    ko: "긴급 연락처", fr: "Contact d'urgence", de: "Notfallkontakt", ar: "جهة اتصال طوارئ", th: "ผู้ติดต่อฉุกเฉิน",
  },
  book_phone: {
    en: "Phone Number", ja: "電話番号", zh: "電話號碼",
    ko: "전화번호", fr: "Numéro de téléphone", de: "Telefonnummer", ar: "رقم الهاتف", th: "หมายเลขโทรศัพท์",
  },
  book_phone_ph: {
    en: "e.g. 090-1234-5678", ja: "例）090-1234-5678", zh: "例：090-1234-5678",
    ko: "예: 090-1234-5678", fr: "ex. 090-1234-5678", de: "z.B. 090-1234-5678", ar: "مثال: 090-1234-5678", th: "เช่น 090-1234-5678",
  },
  book_whatsapp: {
    en: "Also on WhatsApp", ja: "WhatsApp 使用可能", zh: "同時使用 WhatsApp",
    ko: "WhatsApp 사용 가능", fr: "Disponible sur WhatsApp", de: "Auch per WhatsApp", ar: "متاح على واتساب", th: "ใช้ WhatsApp ได้",
  },
  book_optional: {
    en: "Optional", ja: "任意", zh: "選填",
    ko: "선택 사항", fr: "Facultatif", de: "Optional", ar: "اختياري", th: "ไม่บังคับ",
  },

  /* ── Law page ───────────────────────────────── */
  law_badge: {
    en: "LEGAL NOTICE", ja: "法的情報", zh: "法定事項",
    ko: "법적 고지", fr: "MENTIONS LÉGALES", de: "IMPRESSUM", ar: "الإشعار القانوني", th: "ประกาศทางกฎหมาย",
  },
  law_title: {
    en: "Legal Notice", ja: "特定商取引法に基づく表記", zh: "法定事項記載",
    ko: "법적 고지", fr: "Mentions légales", de: "Impressum", ar: "الإشعار القانوني", th: "ประกาศทางกฎหมาย",
  },
  law_back: {
    en: "← Back to Home", ja: "← ホームへ戻る", zh: "← 返回首頁",
    ko: "← 홈으로 돌아가기", fr: "← Retour à l'accueil", de: "← Zurück zur Startseite", ar: "← العودة إلى الرئيسية", th: "← กลับสู่หน้าแรก",
  },
};
