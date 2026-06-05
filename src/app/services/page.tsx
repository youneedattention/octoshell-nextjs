"use client";
import ProtectedImage from "@/components/ProtectedImage";
import Link from "next/link";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/context/LangContext";
import type { Lang } from "@/lib/translations";

/* ══════════════════════════════════════════════════════════════════════
   JSON-LD Schema — enables AI agents & search engines to extract
   the full service catalogue without needing explicit prices.
   Uses schema.org/LocalBusiness + hasOfferCatalog + Service items.
══════════════════════════════════════════════════════════════════════ */
const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Octoshell Japan — Private Chauffeur Services",
  "alternateName": ["貝八方 ハイヤーサービス", "Octoshell Japan Chauffeur"],
  "description": "Japan's premier luxury private chauffeur and hire car service. 9 service categories covering airport transfers, hourly hire, sightseeing tours, golf, MICE events, outdoor excursions, and ceremonial transportation across Greater Tokyo and all of Japan.",
  "url": "https://octoshell.jp/services",
  "provider": {
    "@type": "Organization",
    "@id": "https://octoshell.jp/#organization",
    "name": "Octoshell Co., Ltd.",
    "telephone": "+81-47-382-5728",
    "email": "info@octoshell.jp",
  },
  "areaServed": [
    { "@type": "Country", "name": "Japan" },
    { "@type": "City", "name": "Tokyo" },
    { "@type": "AdministrativeArea", "name": "Greater Tokyo Area" },
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Octoshell Premium Chauffeur Services",
    "itemListElement": [
      { "@type": "Offer", "position": 1, "itemOffered": { "@type": "Service", "name": "Airport Transfer",                    "alternateName": ["空港定額送迎", "機場定額接送"],                                     "description": "Premium flat-rate airport transfers between Tokyo city and Haneda/Narita airports with real-time flight tracking.", "serviceType": "Airport Chauffeur Transfer",          "areaServed": "Tokyo, Kanagawa, Japan" } },
      { "@type": "Offer", "position": 2, "itemOffered": { "@type": "Service", "name": "Hourly Hire Chauffeur",               "alternateName": ["時間制貸切ハイヤー", "時段包車服務"],                               "description": "Flexible hourly chauffeur hire for Tokyo shopping, corporate meetings, or all-day business summits.", "serviceType": "Hourly Chauffeur Hire",               "areaServed": "Greater Tokyo Area, Japan" } },
      { "@type": "Offer", "position": 3, "itemOffered": { "@type": "Service", "name": "One Way Point-to-Point",              "alternateName": ["片道ポイント送迎", "單程點對點穿梭"],                               "description": "Premium single-journey private transfer between any two destinations across Japan.", "serviceType": "Long-Distance Private Transfer",      "areaServed": "Japan" } },
      { "@type": "Offer", "position": 4, "itemOffered": { "@type": "Service", "name": "Luxury Travel Photography Chauffeur", "alternateName": ["ラグジュアリー旅拍（ロケーション撮影）ハイヤー", "奢華旅拍與專屬外景接送"], "description": "Mobile private dressing room and photo-shoot chauffeur across Tokyo's iconic landmarks, partnering with your chosen photographer.", "serviceType": "Luxury Photo Tour Chauffeur",        "areaServed": "Greater Tokyo Area, Japan" } },
      { "@type": "Offer", "position": 5, "itemOffered": { "@type": "Service", "name": "Events & MICE Transportation",        "alternateName": ["エグゼクティブ・イベント & 国際会議送迎", "頂級盛會與大型活動"],     "description": "Bespoke multi-vehicle fleet coordination for international conferences, exhibitions, and private galas.", "serviceType": "Event & MICE Transportation",         "areaServed": "Greater Tokyo Area, Japan" } },
      { "@type": "Offer", "position": 6, "itemOffered": { "@type": "Service", "name": "Bespoke Sightseeing Tour",            "alternateName": ["テーラーメイド観光ハイヤー", "深度定制觀光"],                       "description": "Tailor-made sightseeing chauffeur tours from Tokyo to Mount Fuji, Hakone, and historic hot-spring inns.", "serviceType": "Sightseeing Chauffeur Tour",          "areaServed": "Japan" } },
      { "@type": "Offer", "position": 7, "itemOffered": { "@type": "Service", "name": "Golf Transportation",                 "alternateName": ["ゴルフ＆エグゼクティブ送迎", "尊榮高爾夫接送"],                     "description": "Dedicated golf club transfers with ample space for clubs across the Kanto region.", "serviceType": "Golf Club Transfer",                 "areaServed": "Kanto Region, Japan" } },
      { "@type": "Offer", "position": 8, "itemOffered": { "@type": "Service", "name": "Outdoor & Premium Hiking Chauffeur",  "alternateName": ["アウトドア ＆ プレミアム登山ハイヤー", "戶外極致與尊榮登山接送"],   "description": "Dedicated transport to Japan's mountain trailheads with ample space for trekking gear; flexible for early-morning, late-night, and post-hike onsen transfers.", "serviceType": "Outdoor & Hiking Chauffeur",         "areaServed": "Japan" } },
      { "@type": "Offer", "position": 9, "itemOffered": { "@type": "Service", "name": "Ceremonial Transportation",           "alternateName": ["冠婚葬祭・セレモニー送迎", "冠婚葬祭與典禮迎送"],               "description": "Dignified chauffeur services for weddings, funerals, and important family milestones.", "serviceType": "Ceremonial Chauffeur Service",        "areaServed": "Greater Tokyo Area, Japan" } },
    ],
  },
};

/* ══════════════════════════════════════════════════════════════════════
   Content
══════════════════════════════════════════════════════════════════════ */

const HERO: Record<Lang, { badge: string; title: string; sub: string }> = {
  ja: { badge: "サービス", title: "移動をデザインする",        sub: "日本プライベートハイヤーサービス" },
  en: { badge: "Services", title: "Journeys, by Design",     sub: "Japan Private Chauffeur Service" },
  zh: { badge: "服務",     title: "為您設計的每一段旅程",      sub: "日本專屬司機服務" },
};

/* Anchor chips at top of page */
const CHIPS: { id: string; label: Record<Lang, string> }[] = [
  { id: "airport",     label: { ja: "空港送迎",    en: "Airport",       zh: "機場接送" } },
  { id: "hourly",      label: { ja: "時間制貸切",  en: "By the Hour",   zh: "時段包車" } },
  { id: "oneway",      label: { ja: "片道送迎",    en: "One Way",       zh: "單程穿梭" } },
  { id: "photo",       label: { ja: "旅拍",        en: "Photo Tour",    zh: "旅拍" } },
  { id: "events",      label: { ja: "MICE",        en: "Events & MICE", zh: "頂級盛會" } },
  { id: "sightseeing", label: { ja: "観光",        en: "Sightseeing",   zh: "定制觀光" } },
  { id: "golf",        label: { ja: "ゴルフ",      en: "Golf",          zh: "高爾夫" } },
  { id: "outdoor",     label: { ja: "登山",        en: "Outdoor",       zh: "登山接送" } },
  { id: "ceremony",    label: { ja: "冠婚葬祭",    en: "Ceremonial",    zh: "典禮" } },
];

type ServiceItem = {
  id: string;
  num: string;
  title: Record<Lang, string>;
  body: Record<Lang, string>;
  /** Short instruction for the site owner — which photo to insert */
  imgNote: string;
  /** Real image URL — when set, renders an <Image> instead of the placeholder */
  img?: string;
};

const SERVICES: ServiceItem[] = [
  {
    id: "airport", num: "01",
    title: { ja: "空港定額送迎", en: "Airport Transfers", zh: "機場定額接送" },
    body: {
      ja: "東京市内と各空港の間を、最高峰の快適性とエレガンスで結ぶ完全定額の送迎サービスです。フライト追跡システムにより、遅延の際も正確にお迎えにあがります。到着ロビーでは、専属の運転手がお客様のお名前を掲げてお待ちし、お荷物のサポートから車内へのご案内までスマートにエスコートいたします。",
      en: "Begin your journey with absolute peace of mind. Our premium airport service connects Tokyo downtown with Haneda and Narita airports seamlessly. Featuring real-time flight tracking, your chauffeur will await you in the arrivals hall holding a personalized name board, ready to assist with luggage and escort you to your vehicle.",
      zh: "往返於東京市內與羽田、成田機場的高端定額送迎服務，為您的商旅或度假開啟優雅序幕。結合即時航班動態追蹤，專屬司機將在接機大廳手持您的專屬姓名牌溫馨迎候，貼心打理行李並引導您步入尊榮座艙。",
    },
    imgNote: "Uniformed chauffeur in formal dark suit, holding a printed personalized name board in a bright, modern arrivals hall at Haneda or Narita. Confident posture, natural light. Landscape 3:2 · min 1440×960px.",
    img: "/airport.webp",
  },
  {
    id: "hourly", num: "02",
    title: { ja: "時間制貸切ハイヤー", en: "By the Hour", zh: "時段包車服務" },
    body: {
      ja: "都内での数時間のショッピングから、終日にわたるビジネスミーティングまで、柔軟に対応する時間制の貸切サービスです。選びぬかれたトップドライバーがアテンドし、お客様のスケジュールに完全に同期した自由でシームレスな移動をお約束いたします。",
      en: "Whether for a few hours of bespoke shopping in Tokyo or a full day of corporate summits, our hourly hire service offers ultimate convenience and flexibility. A dedicated chauffeur remains completely synchronized with your schedule, providing a seamless mobile sanctuary.",
      zh: "無論是東京市內的數小時高端購物，還是全天候的商務視察，我們靈活的時段包車服務都能完美契合您的節奏。專屬司機全程待命，讓您的出行行程擁有絕對的掌控權與靈活性。",
    },
    imgNote: "Interior of a luxury Toyota Alphard: rich cream leather seats, soft ambient gold lighting, bokeh city lights through tinted rear window. Cinematic, intimate mood. Landscape 3:2 · min 1440×960px.",
    img: "/By_the_Hour.webp",
  },
  {
    id: "oneway", num: "03",
    title: { ja: "片道ポイント送迎", en: "One Way", zh: "單程點對點穿梭" },
    body: {
      ja: "目的地から目的地への移動に特化した、明瞭で無駄のないプレミアムな片道送迎です。新幹線や国内線航空便に代わるプライベート空間として、移動中も誰にも邪魔されない極上の休息やビジネスアワーをお過ごしいただけます。",
      en: "A straightforward, premium point-to-point chauffeur service tailored for the contemporary traveler. Designed to serve as a luxurious alternative to regional flights or the Shinkansen, this single-journey service ensures you reach your next destination in absolute privacy and comfort.",
      zh: "簡單純粹的特定地點到特定地點單程尊享接送。作為替代區域內航空或新幹線的私密出行方案，我們為當代高端自由行賓客與商務精英提供無縫銜接的移動空間，在旅途中獨享靜謐與從容。",
    },
    imgNote: "Black Toyota Alphard on an empty expressway at blue-hour dusk, silhouette of Tokyo skyline or Mt Fuji in background. Long-exposure, cinematic look, sense of effortless speed. Landscape 3:2 · min 1440×960px.",
    img: "/oneway.webp",
  },
  {
    id: "photo", num: "04",
    title: { ja: "ラグジュアリー旅拍（ロケーション撮影）ハイヤー", en: "Luxury Travel Photography Chauffeur", zh: "奢華旅拍與專屬外景接送" },
    body: {
      ja: "渋谷、浅草、東京タワー、そして熱気溢れる大黒PAや大東京近郊まで、煌めく地標を巡る極上のロケーション撮影に、あなただけの「動くプライベート控え室」を。和服や華やかな盛装に身を包んだまま、混雑した駅で狼狽えることも、街頭で白タクを待つ退屈な時間も、ここには存在しません。お客様が予約されたお気に入りのフォトグラファーを乗せ、最高峰のアルファードが贅沢な専属スタジオへと姿を変えます。徹底的にディープクリーニングされた密やかな車内は、お召し替え、メイク直し、重厚な機材の保管を完璧にサポートする官能的なまでに心地よい私密空間。息をのむような美しい瞬間を切り取る移動のすべてを、まるで映画の主役として甘美なスポットライトを浴びるかのような、至高のクルージング体験へと昇華させます。",
      en: "Embark on an exquisite photography journey across Tokyo's iconic landmarks—from the neon pulse of Shibuya and historic Asakusa to the breathless heights of Tokyo Tower and the raw allure of Daikoku PA. Forget the sheer exhaustion of navigating subways or waiting on frantic streets in your finest couture or traditional kimono; we introduce the concept of a whispering, mobile dressing room. Seamlessly partnering with your chosen photographer, our pristine Toyota Alphard becomes your private back-stage sanctuary. Inside this meticulously deep-cleaned cocoon, you are granted absolute privacy to change wardrobe, refresh your makeup, and secure heavy equipment away from the world's prying eyes. We transform a demanding photo shoot into a full-day, star-lit grand tour, where every movement feels like a seductive prelude to a cinematic masterpiece.",
      zh: "穿梭於澀谷的霓虹、淺草的古樸、東京鐵塔的絕美夜色，乃至大黑PA與大東京近郊的朝聖之旅，我們為您的珍貴旅拍打造一座「隨行移動化妝間」。免去身著華麗盛裝或精緻和服時擠地鐵的狼狽，更無需在街頭焦慮地等待未知車輛，我們的頂級豐田埃爾法將直接化身為您與攝影師的專屬私密行宮。在這座經過深層清潔、與世隔絕的靜謐車廂內，您可以極其優雅地更換華服、從容補妝、安放沉重的攝影器材。這不再是一場疲憊的外景拍攝，而是一次豪車隨行、獨享明星般矚目與尊寵的全天候奢華巡遊，讓鏡頭捕捉到的每一幀畫面，都散發著令人屏息的極致誘惑。",
    },
    imgNote: "Woman in elegant kimono or luxury couture seated inside a pristine Alphard cabin, golden bokeh city lights outside tinted window. Cinematic, intimate, editorial mood. Landscape 3:2 · min 1440×960px.",
    img: "/kimono.webp",
  },
  {
    id: "events", num: "05",
    title: { ja: "エグゼクティブ・イベント ＆ 国際会議送迎", en: "Events & MICE", zh: "頂級盛會與大型活動" },
    body: {
      ja: "国際会議、大規模なエキシビション、ガラディナーからプライベートな式典まで、大東京圏のあらゆるイベント会場や主要ホテル、民泊施設と連動したカスタム送迎を展開いたします。複数台の高級ミニバンや大型ワンボックスカーを用いたシームレスな運行管理により、重要ゲストの格式高いグランドアライバルを演出します。",
      en: "Elevate your high-impact arrivals for international conferences, corporate exhibitions, and private galas across the Greater Tokyo Area. Partnering with premium hotels, luxury rentals, and event venues, we provide tailor-made fleet coordination with luxury vans to ensure flawless logistics for important guests.",
      zh: "專為大東京區域的奢華酒店、高端民宿及各類大型展會場地提供定制化包車解決方案。針對國際會議、商務展覽或私人晚宴，我們透過高標準的車隊調度管理，確保每位貴賓都能享受極具影響力的盛大登場。",
    },
    imgNote: "Row of 3–4 black luxury minivans perfectly aligned at a grand Tokyo hotel entrance at night. Subtle warm entrance lighting, red-carpet suggestion, sense of organised prestige. Landscape 3:2 · min 1440×960px.",
    img: "/events-mice.webp",
  },
  {
    id: "sightseeing", num: "06",
    title: { ja: "テーラーメイド観光ハイヤー", en: "Bespoke Sightseeing", zh: "深度定制觀光" },
    body: {
      ja: "都内名所の巡回から、箱根・富士山周辺の老舗温泉旅館への長距離移動まで、日本の美を巡るプレミアムな観光コースをご案内いたします。国家資格を持つ通訳案内士の資格を有する乗務員によるアテンドも可能であり、国内外のゲストへ最高峰のおもてなしを提供します。",
      en: "Discover the essence of Japan, from curated Tokyo city tours to long-distance excursions to Mount Fuji and historic hot-spring inns in Hakone. Available with elite chauffeurs who have passed the National Interpreter Guide examination, we deliver unparalleled cultural hospitality for global travelers.",
      zh: "從東京市內的經典巡禮，到前往富士山、箱根頂級溫泉旅館的長途度假，我們的專業車隊將帶您深度領略日本之美。亦可為外籍貴賓指派通過日本國家口譯導遊考試的資深乘務員，提供頂級的跨文化款待。",
    },
    imgNote: "Black Alphard parked before a classic red torii gate or autumn-leaf mountain temple path, golden-hour light. Sense of discovery and serenity. No people needed — let the landscape speak. Landscape 3:2 · min 1440×960px.",
    img: "/Sightseeing.webp",
  },
  {
    id: "golf", num: "07",
    title: { ja: "ゴルフ＆エグゼクティブ送迎", en: "Golf Transportation", zh: "尊榮高爾夫接送" },
    body: {
      ja: "大東京圏近郊の名門ゴルフコースへの往復をストレスフリーに結ぶ、専用のハイエンドパッケージです。早朝の出発からプレー後のリフレッシュまで、大きなキャディバッグを余裕で積載できる車両で、至高のクラブライフをサポートします。",
      en: "Indulge in a seamless, premium golf excursion to elite courses around the Kanto region. Designed with ample space for golf bags and luggage, our service takes care of the driving from early morning departures to post-game returns, ensuring you remain focused on your game.",
      zh: "專為高爾夫愛好者量身打造的頂級球場往返接送方案。寬敞的專車空間可輕鬆容納多套高爾夫球具與大件行李，從清晨出發到揮桿後的疲憊返程，全程由專業司機為您的尊貴俱樂部生活保駕護航。",
    },
    imgNote: "Chauffeur loading a premium golf bag into the open trunk of a black Toyota Hiace on a lush green fairway, early morning mist and sunrise light. Elegant and sporty. Landscape 3:2 · min 1440×960px.",
    img: "/GOLF.webp",
  },
  {
    id: "outdoor", num: "08",
    title: { ja: "アウトドア ＆ プレミアム登山ハイヤー", en: "Outdoor & Premium Hiking Chauffeur", zh: "戶外極致與尊榮登山接送" },
    body: {
      ja: "日本の雄大な大自然や名峰へ挑むアクティブなゲストのための、特別な送迎プランです。登山口への快適なアクセスはもちろん、トレッキングギアや本格的な登山装備もゆとりを持って積載可能です。早朝や深夜の出発、下山後の温泉地への移動まで柔軟に対応し、プレミアムなアウトドア体験を安全かつ贅沢にサポートいたします。",
      en: "A dedicated transport solution designed for active guests exploring Japan's majestic landscapes and renowned mountain peaks. We provide seamless access to remote trailheads with ample space to securely store trekking gear and heavy mountaineering equipment. Catering to early morning departures, midnight schedules, or direct post-hike transfers to hot-spring resorts, we ensure a safe, luxurious, and completely stress-free outdoor adventure.",
      zh: "專為前往日本壯麗大自然與名峰發起挑戰的活躍賓客所設計的專屬出行方案。我們不僅提供前往各處登山口的舒適便捷接駁，寬敞的座艙更可輕鬆容納所有專業遠足裝備與重型登山行李。無論是清晨或深夜的整裝出發，還是下山後直接前往溫泉度假村放鬆，我們都將全程提供安全且奢華的保障，讓您的戶外探索旅程更顯尊貴。",
    },
    imgNote: "Black Toyota Hiace parked at a misty mountain trailhead at dawn in the Japanese Alps, lush green forest and peak silhouette in background. Sense of adventure and premium readiness. Landscape 3:2 · min 1440×960px.",
    img: "/HIKING.webp",
  },
  {
    id: "ceremony", num: "09",
    title: { ja: "冠婚葬祭・セレモニー送迎", en: "Ceremonial Services", zh: "冠婚葬祭與典禮迎送" },
    body: {
      ja: "人生の特別な節目や、厳かなセレモニーにおける送迎を承ります。安全運行の徹底はもちろん、極めて細やかで品格ある接遇により、大切なご親族や人生の先輩への敬意を表したおもてなしをお約束いたします。",
      en: "We provide dignified, meticulous chauffeur services for weddings, funerals, and significant family milestones. Beyond impeccable safety, our chauffeurs deliver highly attentive etiquette to honor your guests on these important occasions.",
      zh: "在婚禮、葬禮等人生重要而莊嚴的時刻，我們以最高級別的安全運行與細緻入微的禮儀接待，為您款待生命中最重要的人物，用無可挑剔的品格彰顯家族與企業的體面。",
    },
    imgNote: "Black Alphard with subtle white floral ornament or white ribbon, parked outside a traditional Japanese ceremonial hall or shrine gate. Soft diffused overcast light, dignified and quiet atmosphere. Landscape 3:2 · min 1440×960px.",
    img: "/ceremony.webp",
  },
];

/* ── CTA (bottom of page) ───────────────────────────────────────────── */
const CTA: Record<Lang, { btn: string; micro: string }> = {
  ja: {
    btn:   "空車状況を確認・予約",
    micro: "法人契約、団体様のご案内、およびカスタマイズのご相談は、専任のコンシェルジュが24時間体制で承ります。お気軽にお問い合わせください。",
  },
  en: {
    btn:   "Reserve Your Journey",
    micro: "For corporate accounts, high-profile delegations, or bespoke itinerary planning, connect directly with our private client specialists for a tailored proposal.",
  },
  zh: {
    btn:   "尊享預訂 / 查詢空車",
    micro: "如需企業長期簽約、大宗活動用車或特殊行程定制，歡迎聯絡我們的奢華出行顧問，為您提供專屬的一對一合規方案評估。",
  },
};

/* ══════════════════════════════════════════════════════════════════════
   Sub-components
══════════════════════════════════════════════════════════════════════ */

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-6 h-px bg-[#c9a84c]" />
      <p className="text-[#c9a84c] text-[12px] tracking-[0.45em] uppercase font-semibold">{label}</p>
    </div>
  );
}

/* Image placeholder card */
function ImgPlaceholder({ note, num }: { note: string; num: string }) {
  return (
    <div className="relative aspect-[3/2] bg-[#1a1a1a] border border-white/[0.07] flex flex-col items-center justify-center gap-4 overflow-hidden">
      {/* corner accents */}
      <div className="absolute top-3 left-3 w-7 h-7 border-t border-l border-[#c9a84c]/40" />
      <div className="absolute top-3 right-3 w-7 h-7 border-t border-r border-[#c9a84c]/40" />
      <div className="absolute bottom-3 left-3 w-7 h-7 border-b border-l border-[#c9a84c]/40" />
      <div className="absolute bottom-3 right-3 w-7 h-7 border-b border-r border-[#c9a84c]/40" />
      {/* large ghost number */}
      <span className="absolute bottom-4 right-5 text-[80px] font-bold text-white/[0.03] leading-none font-mono select-none">{num}</span>
      {/* camera icon */}
      <svg className="w-10 h-10 text-white/15" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
      </svg>
      <p className="text-white/18 text-[10px] tracking-[0.18em] uppercase text-center px-8 leading-relaxed">
        Insert photo here · 3:2 landscape
      </p>
      {/* recommendation caption outside the placeholder card */}
      <div className="absolute -bottom-[1px] left-0 right-0 translate-y-full pt-2 px-1">
        <p className="text-white/18 text-[9px] leading-relaxed tracking-[0.08em]">{note}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  const { lang } = useLang();

  return (
    <main className="min-h-screen bg-[#0c0c0c]">

      {/* ── JSON-LD Schema for AI agents / search engines ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      {/* ── Compact hero ───────────────────────────────────────── */}
      <div className="relative bg-[#0c0c0c] pt-[124px] sm:pt-[100px] pb-10 sm:pb-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }} />

        <Header />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] mb-2.5 uppercase">{HERO[lang].badge}</p>
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.12em] sm:tracking-[0.16em] leading-tight">
            {HERO[lang].title}
          </h1>
          <p className="mt-2 text-white/35 text-[12px] tracking-[0.28em] uppercase">{HERO[lang].sub}</p>

          {/* horizontal scrollable anchor chips */}
          <div className="flex items-center gap-2 sm:gap-3 mt-8 sm:mt-10 overflow-x-auto pb-1 scrollbar-hide">
            {CHIPS.map((chip) => (
              <Link key={chip.id} href={`#${chip.id}`}
                className="shrink-0 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase
                           text-white/45 border border-white/15 px-3.5 py-2
                           hover:text-[#c9a84c] hover:border-[#c9a84c]/40 transition-all duration-150 whitespace-nowrap">
                {chip.label[lang]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          8 SERVICE SECTIONS (alternating layout)
      ═══════════════════════════════════════════════════════════ */}
      {SERVICES.map((svc, i) => {
        const isEven = i % 2 === 0;   /* even idx → text left, image right */
        const bg     = isEven ? "bg-[var(--c-body)]" : "bg-[var(--c-card)]";

        return (
          <section
            key={svc.id}
            id={svc.id}
            className={`scroll-mt-24 ${bg} py-16 sm:py-22 px-4 sm:px-6`}
          >
            {/* top gold rule */}
            <div className="max-w-5xl mx-auto">
              <div className="h-px bg-gradient-to-r from-[#c9a84c]/20 via-[#c9a84c]/50 to-transparent mb-10 sm:mb-14" />

              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${!isEven ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}>

                {/* TEXT side */}
                <div>
                  <SectionLabel label={`${svc.num} — ${lang === "ja" ? "サービス" : lang === "zh" ? "服務" : "Service"}`} />
                  <h2 className="text-[var(--c-ink)] text-2xl sm:text-3xl lg:text-[2rem] font-light tracking-[0.08em] leading-snug mb-5">
                    {svc.title[lang]}
                  </h2>
                  <p className="text-[var(--c-ink-2)] text-[15px] sm:text-[16px] leading-[1.9] tracking-[0.03em] mb-8">
                    {svc.body[lang]}
                  </p>
                  <Link href="/book"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="group inline-flex items-center gap-2.5
                               bg-[#c9a84c] text-[#0c0c0c]
                               text-[12px] tracking-[0.3em] font-black
                               px-7 py-3 sm:py-3.5 transition-all duration-200
                               hover:bg-white
                               shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_4px_28px_rgba(201,168,76,0.5)]
                               active:scale-110 active:bg-white active:shadow-[0_8px_36px_rgba(201,168,76,0.7)]
                               sm:active:scale-100 sm:active:shadow-[0_4px_28px_rgba(201,168,76,0.5)]">
                    {lang === "ja" ? "このサービスを予約" : lang === "zh" ? "預訂此服務" : "Book This Service"}
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                      fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>

                {/* IMAGE side */}
                <div className="w-full">
                  {svc.img ? (
                    <div className="relative aspect-[3/2] overflow-hidden group">
                      <ProtectedImage src={svc.img} alt={svc.title["en"]} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  ) : (
                    <ImgPlaceholder note={svc.imgNote} num={svc.num} />
                  )}
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ═══════════════════════════════════════════════════════════
          CTA — bottom of page, trilingual microcopy
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mb-12" />

          <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] uppercase mb-4">
            {lang === "ja" ? "ご予約・お問い合わせ" : lang === "zh" ? "預訂與查詢" : "Book & Enquire"}
          </p>
          <h2 className="text-white text-2xl sm:text-3xl font-light tracking-[0.1em] mb-5">
            {lang === "ja" ? "お客様の移動を、デザインいたします" : lang === "zh" ? "讓我們為您設計每一段旅程" : "Your journey, designed around you"}
          </h2>

          {/* Microcopy */}
          <p className="text-white/40 text-[13px] sm:text-[14px] leading-[1.85] tracking-[0.03em] mb-10 max-w-xl mx-auto">
            {CTA[lang].micro}
          </p>

          <Link href="/book"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="group inline-flex items-center gap-2.5 bg-[#c9a84c] text-[#0c0c0c]
                       text-[12px] sm:text-[13px] font-black tracking-[0.3em] uppercase
                       px-10 py-4 hover:bg-white transition-all duration-200
                       shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_4px_28px_rgba(201,168,76,0.5)]
                       active:scale-110 active:bg-white active:shadow-[0_8px_36px_rgba(201,168,76,0.7)]
                       sm:active:scale-100 sm:active:shadow-[0_4px_28px_rgba(201,168,76,0.5)]">
            {CTA[lang].btn}
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent mt-12" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
