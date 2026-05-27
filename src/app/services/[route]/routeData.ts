import type { Lang } from "@/lib/translations";

export type RouteSlug =
  | "narita-airport-transfer"
  | "haneda-airport-transfer"
  | "tokyo-to-hakone"
  | "tokyo-to-fuji"
  | "tokyo-golf-transfer"
  | "tokyo-by-the-hour";

export interface FaqItem {
  q: Record<Lang, string>;
  a: Record<Lang, string>;
}

export interface RouteData {
  slug: RouteSlug;
  /** Page <title> */
  metaTitle: string;
  /** Meta description */
  metaDesc: string;
  /** OpenGraph image path (relative to /public) */
  ogImage: string;
  /** Keywords */
  keywords: string[];
  /** Hero badge */
  badge: Record<Lang, string>;
  /** H1 */
  h1: Record<Lang, string>;
  /** Hero subline */
  sub: Record<Lang, string>;
  /** Price badge (e.g. "From ¥20,000") */
  price: Record<Lang, string>;
  /** Intro paragraph (2-3 sentences) */
  intro: Record<Lang, string>;
  /** Long body (3-4 paragraphs, ~600-900 words per lang) */
  body: Record<Lang, string[]>;
  /** Highlights / bullet points */
  highlights: Record<Lang, string[]>;
  /** CTA label */
  cta: Record<Lang, string>;
  /** Hero image */
  heroImg: string;
  /** Alt text for hero image */
  heroAlt: string;
  /** FAQ items (5-7) */
  faqs: FaqItem[];
  /** JSON-LD Service schema name */
  schemaName: string;
  /** JSON-LD Service description */
  schemaDesc: string;
  /** Price value for schema (number) */
  schemaPrice: number;
}

const ROUTES: Record<RouteSlug, RouteData> = {

  /* ══════════════════════════════════════════════════════
     1. NARITA AIRPORT TRANSFER
  ══════════════════════════════════════════════════════ */
  "narita-airport-transfer": {
    slug: "narita-airport-transfer",
    metaTitle: "Narita Airport Private Transfer Tokyo | ¥25,000 Flat Rate | Octoshell",
    metaDesc: "Book a luxury private transfer between Narita Airport (NRT) and Tokyo. Fixed ¥25,000 flat rate — Toyota Alphard, meet & greet, 1hr free wait, all tolls included. Octoshell Japan.",
    ogImage: "/airport.webp",
    keywords: [
      "Narita airport transfer",
      "Narita airport private car",
      "NRT Tokyo private transfer",
      "Narita airport chauffeur",
      "成田空港 送迎",
      "成田空港 ハイヤー",
      "成田機場 私人接送",
      "Narita airport taxi alternative",
      "luxury transfer Narita Tokyo",
      "Narita airport limousine private",
    ],
    badge: { en: "Airport Transfer", ja: "空港送迎", zh: "機場接送" },
    h1: {
      en: "Narita Airport Private Transfer",
      ja: "成田空港 プライベート送迎",
      zh: "成田機場私人接送服務",
    },
    sub: {
      en: "Tokyo ↔ Narita · Flat Rate ¥25,000 · All-Inclusive",
      ja: "東京 ↔ 成田 · 定額 ¥25,000 · 全込み",
      zh: "東京 ↔ 成田 · 定額 ¥25,000 · 全包服務",
    },
    price: {
      en: "From ¥25,000",
      ja: "¥25,000〜",
      zh: "¥25,000 起",
    },
    intro: {
      en: "Begin or end your Japan journey with absolute ease. Octoshell's Narita Airport private transfer service connects Tokyo city directly to Narita International Airport (NRT) at a guaranteed flat rate of ¥25,000 — no surge pricing, no hidden fees.",
      ja: "成田国際空港と東京市内を、¥25,000の完全定額でつなぐプレミアムな専用車サービスです。追加料金一切なし、メーターなし、完全プライベートの移動空間をお約束します。",
      zh: "成田國際機場（NRT）與東京市中心之間的頂級私人接送，定額¥25,000，全程包含高速費與停車費，讓您的旅程從落地一刻起便舒適如意。",
    },
    body: {
      en: [
        "Narita International Airport lies approximately 60–75 km from central Tokyo — a journey that can stretch to 90 minutes or more during peak traffic. Public options — the Narita Express, limousine bus, or standard taxis — involve shared spaces, fixed timetables, and often unexpected surcharges. Octoshell offers a fundamentally different experience: a private Toyota Alphard dispatched exclusively for you, waiting in the arrivals hall with a personalized name board the moment your flight lands.",
        "Our real-time flight tracking system monitors your exact flight number. Whether your aircraft touches down on schedule or two hours late, your chauffeur adjusts automatically. We include one complimentary hour of free waiting time after your flight's scheduled arrival — no calls, no penalties, just silent attentiveness. After clearing customs at your own pace, step through the arrival doors and find your chauffeur ready, composed, and holding your name.",
        "The flat rate of ¥25,000 is fully all-inclusive: highway tolls on the Higashi-Kanto Expressway, Wangan Route, or Metropolitan Expressway, parking fees at the terminal, and no fuel surcharges — ever. For groups requiring more space, the Toyota Hiace accommodates up to 9 passengers with all luggage, available at a marginally higher rate. Corporate travelers can request advance invoicing; leisure guests may pay by card or cash on arrival.",
        "Whether you are arriving for a business summit in Marunouchi, a luxury hotel stay in Ginza, or beginning a scenic journey onward to Hakone or Nikko, Octoshell's Narita transfer positions you perfectly. Your chauffeur can accommodate requests for highway stops, quiet routes, or direct onward connections. Every detail is handled before you land.",
      ],
      ja: [
        "成田国際空港は東京都心から60〜75kmほど離れており、渋滞時には片道90分以上かかることも珍しくありません。成田エクスプレスやリムジンバスは定刻運行ながら乗り合いが前提。一般のタクシーでは深夜割増や高速料金加算が発生します。Octoshellはその常識を覆します。専用のトヨタ・アルファードがお客様だけのためにチャーターされ、到着ロビーにてお名前を記したウェルカムボードを掲げてお迎えいたします。",
        "フライトナンバーをリアルタイムでトラッキングしているため、定刻通りのご到着でも2時間の遅延が生じても、チャウファーは自動で調整します。ご到着の予定時刻から1時間の無料待機サービスが含まれており、お客様は入国審査・手荷物受け取りをまったく慌てることなくお済みいただけます。",
        "¥25,000の定額料金は、東関東自動車道・湾岸ルート・首都高の通行料、ターミナルの駐車料金、燃料サーチャージなどを完全に含んだオールインクルーシブの価格です。9名まで対応のトヨタ・ハイエースもご用意しており、大荷物が多いグループや法人のお客様にも最適です。",
        "丸の内・銀座・赤坂・六本木など都内主要エリアはもちろん、箱根・日光・横浜・千葉など東京近郊への直接送迎も承ります。ご要望があれば途中の高速パーキングへの立ち寄りや静かなルート変更にも柔軟に対応。フライト前後の時間も、Octoshellとともに贅沢に。",
      ],
      zh: [
        "成田國際機場距離東京市中心約60至75公里，尖峰時段車程可能超過90分鐘。成田特快與巴士雖有班次，卻需共乘、服從時刻表，且行李搬運不便。普通計程車則往往附加深夜加成、高速費另計。Octoshell提供截然不同的出行體驗：一輛豐田埃爾法全程僅為您一行人服務，司機手持印有您名字的迎賓牌，恭候於入境大廳。",
        "我們的系統即時追蹤您的航班號碼。無論準點還是延誤兩小時，司機均自動調整待命時間。預計到達時刻起，我們額外提供一小時的免費等候服務，讓您從容地通關、領取行李，毫不慌張地踏出接機大廳，就能看到您的專屬司機靜靜等候。",
        "定額¥25,000已涵蓋所有東關東高速、灣岸路線、首都高通行費，以及機場停車費，絕無隱藏附加費。若需搭載更多乘客，豐田海獅（HiAce）可容納至多9名乘客加全部行李。法人客戶可申請預付發票，個人旅客支援信用卡或現金付款。",
        "無論您前往丸之內的商務中心、銀座的奢華酒店，還是繼續前往箱根或日光，Octoshell的成田接送都能讓您的日本之旅從第一步便充滿尊貴感。司機可按需求提供高速休息站停靠、靜音路線等個性化服務，一切在您落地前便已安排妥當。",
      ],
    },
    highlights: {
      en: [
        "Fixed flat rate ¥25,000 — all tolls & parking included",
        "Real-time flight tracking — chauffeur adjusts to delays automatically",
        "1 hour complimentary waiting time after scheduled arrival",
        "Personalized name-board meet & greet at arrivals hall",
        "Toyota Alphard (up to 6 pax) · HiAce (up to 9 pax) available",
        "English-speaking chauffeurs available",
        "No surge pricing — ever",
        "Child seats available at no extra charge",
      ],
      ja: [
        "¥25,000の定額（高速・駐車場込み）",
        "フライトリアルタイム追跡・遅延対応",
        "到着後1時間の無料待機サービス",
        "到着ロビーにてウェルカムボード・ミートアンドグリート",
        "アルファード（最大6名）・ハイエース（最大9名）",
        "英語対応チャウファー",
        "割増料金なし",
        "チャイルドシート無料",
      ],
      zh: [
        "定額¥25,000，含所有高速費及停車費",
        "即時航班追蹤，延誤自動調整",
        "預計到達後1小時免費等候",
        "入境大廳姓名牌迎賓服務",
        "豐田埃爾法（最多6人）· 海獅（最多9人）",
        "英語服務司機",
        "絕無浮動加價",
        "嬰兒座椅免費提供",
      ],
    },
    cta: { en: "Book Narita Transfer", ja: "成田空港送迎を予約", zh: "預訂成田機場接送" },
    heroImg: "/airport.webp",
    heroAlt: "Uniformed Octoshell chauffeur holding name board at Narita Airport arrivals hall",
    faqs: [
      {
        q: {
          en: "How much does the Narita Airport private transfer cost?",
          ja: "成田空港の専用車送迎の料金はいくらですか？",
          zh: "成田機場私人接送的費用是多少？",
        },
        a: {
          en: "The flat rate is ¥25,000 for a Toyota Alphard (up to 6 passengers) and approximately ¥28,000 for a Toyota Hiace (up to 9 passengers). All prices include highway tolls, parking fees, and meet-and-greet service — no hidden extras.",
          ja: "トヨタ・アルファード（最大6名）は¥25,000の定額です。トヨタ・ハイエース（最大9名）は約¥28,000となります。高速料金・駐車料金・ウェルカムボードサービスをすべて含んだオールインクルーシブ価格です。",
          zh: "豐田埃爾法（最多6名）定額¥25,000，豐田海獅（最多9名）約¥28,000。所有價格均涵蓋高速費、停車費及迎賓服務，無任何隱藏收費。",
        },
      },
      {
        q: {
          en: "What if my flight is delayed at Narita?",
          ja: "成田到着便が遅れた場合はどうなりますか？",
          zh: "如果在成田的航班延誤怎麼辦？",
        },
        a: {
          en: "We track your flight in real time. Your chauffeur automatically adjusts their arrival time and waits one complimentary hour beyond your scheduled landing time, at no extra charge.",
          ja: "フライトをリアルタイムで追跡しています。到着予定時刻から1時間の無料待機が含まれており、チャウファーは自動で対応します。追加料金は一切かかりません。",
          zh: "我們即時追蹤您的航班。司機會自動調整到達時間，並在您預計降落時間後額外免費等候1小時，無需支付任何額外費用。",
        },
      },
      {
        q: {
          en: "Does the price include highway tolls from Narita to Tokyo?",
          ja: "成田〜東京間の高速道路料金は含まれていますか？",
          zh: "從成田到東京的高速公路費用包含在內嗎？",
        },
        a: {
          en: "Yes. The ¥25,000 flat rate covers all expressway tolls (Higashi-Kanto Expressway, Metropolitan Expressway, etc.), airport parking, and any standard route fees. No extra charges are added after pickup.",
          ja: "はい。¥25,000の定額には、東関東自動車道・首都高などの通行料、空港駐車場代がすべて含まれています。乗車後に追加料金は一切発生しません。",
          zh: "是的。¥25,000的定額費用涵蓋東關東高速及首都高等所有高速費用和機場停車費，上車後絕無額外收費。",
        },
      },
      {
        q: {
          en: "Where will the chauffeur meet me at Narita?",
          ja: "成田空港でチャウファーとはどこで合流しますか？",
          zh: "在成田機場，司機會在哪裡接我？",
        },
        a: {
          en: "Your chauffeur will wait in the arrivals hall of your terminal (T1, T2, or T3), holding a printed name board with your name. Terminal details are confirmed in your booking confirmation email.",
          ja: "ご搭乗のターミナル（第1・第2・第3）の到着ロビーにて、お客様のお名前を記したウェルカムボードを持ってお待ちしております。ターミナルはご予約確認メールにてご案内します。",
          zh: "司機將在您所在航廈（T1、T2或T3）的入境大廳等候，手持印有您姓名的迎賓牌。具體航廈資訊將在預訂確認郵件中說明。",
        },
      },
      {
        q: {
          en: "Can I book a round trip from Tokyo to Narita and back?",
          ja: "東京〜成田の往復予約はできますか？",
          zh: "可以預訂東京往返成田的來回服務嗎？",
        },
        a: {
          en: "Yes. Round-trip bookings are available and can be requested in a single booking form. The return leg is priced at the same ¥25,000 flat rate.",
          ja: "はい。往復の予約は1回の予約フォームでお申し込みいただけます。帰路も同じ¥25,000の定額料金です。",
          zh: "可以。來回預訂可在同一個表單中申請，回程費用同為¥25,000定額。",
        },
      },
      {
        q: {
          en: "How far in advance should I book a Narita transfer?",
          ja: "成田空港の送迎は何日前に予約すべきですか？",
          zh: "成田機場接送需要提前多久預訂？",
        },
        a: {
          en: "We recommend booking at least 24 hours in advance to guarantee vehicle availability. Last-minute requests (under 12 hours) are accommodated subject to availability — please contact us directly.",
          ja: "車両の確保のため、24時間前までのご予約をお勧めします。12時間未満の直前予約は空き状況次第で対応可能ですので、お気軽にお問い合わせください。",
          zh: "建議至少提前24小時預訂以確保車輛供應。12小時內的臨時預訂視車輛空缺情況而定，請直接聯繫我們確認。",
        },
      },
    ],
    schemaName: "Narita Airport Private Transfer — Tokyo",
    schemaDesc: "Flat-rate luxury private transfer between Narita International Airport (NRT) and Tokyo city. Toyota Alphard or Hiace, meet & greet, real-time flight tracking, all tolls included.",
    schemaPrice: 25000,
  },

  /* ══════════════════════════════════════════════════════
     2. HANEDA AIRPORT TRANSFER
  ══════════════════════════════════════════════════════ */
  "haneda-airport-transfer": {
    slug: "haneda-airport-transfer",
    metaTitle: "Haneda Airport Private Transfer Tokyo | ¥20,000 Flat Rate | Octoshell",
    metaDesc: "Book a luxury private transfer between Haneda Airport (HND) and Tokyo. Fixed ¥20,000 flat rate — Toyota Alphard, meet & greet, 1hr free wait, all tolls included. Octoshell Japan.",
    ogImage: "/airport.webp",
    keywords: [
      "Haneda airport transfer",
      "Haneda airport private car",
      "HND Tokyo private transfer",
      "Haneda airport chauffeur",
      "羽田空港 送迎",
      "羽田空港 ハイヤー",
      "羽田機場 私人接送",
      "Haneda airport taxi alternative",
      "luxury transfer Haneda Tokyo",
      "Haneda airport limousine private",
    ],
    badge: { en: "Airport Transfer", ja: "空港送迎", zh: "機場接送" },
    h1: {
      en: "Haneda Airport Private Transfer",
      ja: "羽田空港 プライベート送迎",
      zh: "羽田機場私人接送服務",
    },
    sub: {
      en: "Tokyo ↔ Haneda · Flat Rate ¥20,000 · All-Inclusive",
      ja: "東京 ↔ 羽田 · 定額 ¥20,000 · 全込み",
      zh: "東京 ↔ 羽田 · 定額 ¥20,000 · 全包服務",
    },
    price: {
      en: "From ¥20,000",
      ja: "¥20,000〜",
      zh: "¥20,000 起",
    },
    intro: {
      en: "Haneda Airport sits just 15–20 km from central Tokyo, making it the capital's most convenient gateway. Octoshell's private Haneda transfer service brings the full luxury chauffeur experience to this short but premium journey — flat rate ¥20,000, all tolls included.",
      ja: "羽田空港は東京都心からわずか15〜20km。その利便性に、Octoshellのプレミアムな専用車サービスが加わります。¥20,000の完全定額で、高速・駐車料金込みの洗練された移動をお約束します。",
      zh: "羽田機場距東京市中心僅約15至20公里，是日本首都最便捷的航空門戶。Octoshell的私人接送服務為這段短程旅途注入奢華體驗，定額¥20,000，全包通行費。",
    },
    body: {
      en: [
        "Haneda Airport (HND) is Tokyo's most centrally located international gateway, with Terminal 3 dedicated entirely to international arrivals. Despite its proximity to the city, the airport's multiple terminals, complex taxi queues, and surge-priced ride-hailing services create unnecessary friction after a long flight. Octoshell eliminates that friction entirely — your private Toyota Alphard is reserved for you alone, your chauffeur is already tracking your inbound flight, and your name board is ready before the aircraft lands.",
        "The ¥20,000 flat rate covers the complete journey from any Tokyo central address to any Haneda terminal — or the reverse. Tolls on the Metropolitan Expressway's Wangan Route or Bayshore Route are fully included. Parking at Haneda's multi-story structure is never added to your bill. The price you see when booking is the price you pay. Period.",
        "For early-morning flights, red-eye arrivals, or late-night departures, Octoshell operates 24 hours, 365 days. Our English-speaking chauffeur team is particularly valued by international business travelers connecting to Japan's financial district and government quarter in Kasumigaseki. For leisure travelers heading to boutique hotels in Shibuya, Shinjuku, or Aoyama, the Haneda transfer gets you there in quiet, air-conditioned comfort without the stress of luggage on busy train platforms.",
        "Groups of up to 9 passengers traveling with full luggage sets can be accommodated with the Toyota Hiace at a slightly higher rate. Corporate clients with recurring Haneda travel may enquire about standing account arrangements for simplified monthly invoicing.",
      ],
      ja: [
        "羽田空港（HND）は東京のほぼ中心に位置する利便性最高の国際空港です。第3ターミナルが国際線専用として機能し、都心まで約30〜40分と、成田に比べて圧倒的に近い立地です。それでもタクシー乗り場の長蛇の列や、配車アプリのダイナミックプライシングは帰国・到着後の疲れた身体にこたえます。Octoshellなら、専用のアルファードが確保済みで、チャウファーはリアルタイムでフライトを追跡し、お名前入りのウェルカムボードを持って到着ロビーで静かに待機しています。",
        "¥20,000の定額料金は、都内の任意の住所から各ターミナルまでの全行程をカバー。首都高の湾岸線・ベイショアルートなどの通行料、駐車場代はすべて含まれています。予約時にご確認いただいた金額以上を請求することは一切ありません。",
        "早朝の出発便、深夜着のフライト、終電後のビジネス往復など、Octoshellは年中無休・24時間体制で対応します。英語対応チャウファーが対応するため、国際ビジネス渡航者の方々には特にご好評をいただいています。渋谷・新宿・青山など都内ホテルへのアクセスも、混雑した地下鉄ではなく静かで快適な専用車でお届けします。",
        "大荷物のグループには9名まで対応のトヨタ・ハイエースをご用意。法人のお客様で定期的に羽田を利用される場合は、月次インボイスに対応した法人アカウントのご相談も承ります。",
      ],
      zh: [
        "羽田機場（HND）是東京距市中心最近的國際機場，第3航廈專門用於國際入境。儘管地理位置優越，多個航廈之間的複雜佈局、漫長的計程車排隊以及叫車軟件的浮動計費，在長途飛行後仍會帶來不必要的疲憊。Octoshell徹底消除這些障礙——您的豐田埃爾法專屬為您預留，司機已在追蹤您的航班，姓名牌在您落地前便已準備就緒。",
        "¥20,000定額涵蓋東京市內任何地點至羽田任一航廈的全程往返。首都高灣岸線、海岸線的所有通行費均包含在內，機場停車費亦從不額外計收。您在預訂時看到的價格，就是您最終支付的價格，沒有任何隱藏費用。",
        "無論是清晨早班機、紅眼航班還是深夜出發，Octoshell全年無休、24小時運營。英語服務司機深受前往丸之內、霞關商務區的國際商旅人士青睞。前往澀谷、新宿或青山精品酒店的休閒旅客，也能免去拖著行李擠地鐵的狼狽，在靜謐舒適的專車中輕鬆到達目的地。",
        "攜帶大量行李的最多9名旅客可選擇豐田海獅（HiAce），費用略高。需要頻繁使用羽田機場接送的法人客戶，可洽詢每月統一開票的企業賬戶安排。",
      ],
    },
    highlights: {
      en: [
        "Fixed flat rate ¥20,000 — all tolls & parking included",
        "Tokyo's closest airport — 15–20 km from city centre",
        "Real-time flight tracking — chauffeur adjusts to delays automatically",
        "1 hour complimentary waiting time after scheduled arrival",
        "Meet & greet in arrivals hall — Terminal 1, 2 or 3",
        "24/7 service — early morning & late night no surcharge",
        "English-speaking chauffeurs available",
        "Child seats available at no extra charge",
      ],
      ja: [
        "¥20,000の定額（高速・駐車場込み）",
        "都心まで最短30分の好立地",
        "フライトリアルタイム追跡・遅延対応",
        "到着後1時間の無料待機サービス",
        "第1・2・3ターミナル対応のウェルカムボードサービス",
        "早朝・深夜割増なし・年中無休",
        "英語対応チャウファー",
        "チャイルドシート無料",
      ],
      zh: [
        "定額¥20,000，含所有高速費及停車費",
        "距東京市中心最近，最快約30分鐘",
        "即時航班追蹤，延誤自動調整",
        "預計到達後1小時免費等候",
        "第1、2、3航廈入境大廳迎賓服務",
        "24/7全天候服務，早班深夜不加價",
        "英語服務司機",
        "嬰兒座椅免費提供",
      ],
    },
    cta: { en: "Book Haneda Transfer", ja: "羽田空港送迎を予約", zh: "預訂羽田機場接送" },
    heroImg: "/airport.webp",
    heroAlt: "Octoshell chauffeur meeting passengers at Haneda Airport Terminal 3 arrivals",
    faqs: [
      {
        q: {
          en: "What is the flat rate for a Haneda Airport private transfer?",
          ja: "羽田空港の専用車送迎の定額料金はいくらですか？",
          zh: "羽田機場私人接送的定額費用是多少？",
        },
        a: {
          en: "¥20,000 for a Toyota Alphard (up to 6 passengers). Toyota Hiace (up to 9 passengers) is approximately ¥22,000. Both rates include all highway tolls, airport parking, and the complimentary name-board meet-and-greet service.",
          ja: "トヨタ・アルファード（最大6名）は¥20,000です。トヨタ・ハイエース（最大9名）は約¥22,000です。いずれも高速料金・駐車場代・ウェルカムボードサービスを含むオールインクルーシブ価格です。",
          zh: "豐田埃爾法（最多6名）¥20,000，豐田海獅（最多9名）約¥22,000。兩個價格均涵蓋所有高速費、停車費及姓名牌迎賓服務。",
        },
      },
      {
        q: {
          en: "Which Haneda terminal will the driver meet me at?",
          ja: "羽田のどのターミナルで迎えてもらえますか？",
          zh: "司機會在羽田哪個航廈接我？",
        },
        a: {
          en: "Your chauffeur meets you at the arrivals hall of your specific terminal — International Terminal 3, or Domestic Terminals 1 or 2. Your booking confirmation will specify the exact meeting point.",
          ja: "国際線第3ターミナルまたは国内線第1・第2ターミナルの到着ロビーにてお迎えします。詳細な待ち合わせ場所はご予約確認メールにてお知らせします。",
          zh: "司機將在您指定的航廈（國際線第3航廈或國內線第1、第2航廈）的入境大廳等候。具體接機地點將在預訂確認郵件中說明。",
        },
      },
      {
        q: {
          en: "Is Haneda or Narita better for central Tokyo hotels?",
          ja: "都心のホテルへのアクセスは羽田と成田どちらが便利ですか？",
          zh: "羽田還是成田更適合前往東京市中心酒店？",
        },
        a: {
          en: "Haneda is significantly closer to central Tokyo (15–20 km vs 60–75 km for Narita), resulting in shorter transfer times and a lower flat rate of ¥20,000 vs ¥25,000. For city hotels, Haneda is almost always preferable.",
          ja: "羽田は都心から15〜20kmと、成田（60〜75km）と比べて大幅に近く、移動時間も短くなります。定額料金も¥20,000と成田の¥25,000より安く、都内ホテルへのアクセスには羽田をお勧めします。",
          zh: "羽田距東京市中心僅15至20公里，遠比成田（60至75公里）更近，接送時間更短，定額費用也更低（¥20,000對比¥25,000）。前往市中心酒店，羽田幾乎都是更優選擇。",
        },
      },
      {
        q: {
          en: "Does Octoshell operate overnight for early or late Haneda flights?",
          ja: "羽田の早朝・深夜便にも対応していますか？",
          zh: "Octoshell有提供羽田早班或深夜航班的服務嗎？",
        },
        a: {
          en: "Yes. Octoshell operates 24 hours, 7 days a week, 365 days a year. Early-morning and late-night Haneda flights are handled at the same flat rate — no overnight or unsociable-hours surcharge.",
          ja: "はい。Octoshellは年中無休・24時間対応です。早朝・深夜の羽田便も同じ定額料金で対応し、深夜割増は一切かかりません。",
          zh: "是的。Octoshell全年365天、24小時運營。早班和深夜羽田航班均按同一定額費用服務，無任何早班或深夜附加費。",
        },
      },
      {
        q: {
          en: "Can I get a receipt or invoice for my Haneda transfer?",
          ja: "羽田送迎のレシートや請求書を受け取ることはできますか？",
          zh: "我可以獲得羽田接送的收據或發票嗎？",
        },
        a: {
          en: "Yes. A receipt is provided after every transfer. Corporate clients requiring formal invoices for expense reporting can request invoicing at time of booking.",
          ja: "はい。ご乗車後に領収書を発行いたします。経費精算等に正式な請求書が必要な法人のお客様は、ご予約時にお申し付けください。",
          zh: "可以。每次接送後均可提供收據。需要正式發票用於報帳的企業客戶，請在預訂時提出申請。",
        },
      },
    ],
    schemaName: "Haneda Airport Private Transfer — Tokyo",
    schemaDesc: "Flat-rate luxury private transfer between Haneda Airport (HND) and Tokyo city. Toyota Alphard or Hiace, meet & greet, real-time flight tracking, all tolls included.",
    schemaPrice: 20000,
  },

  /* ══════════════════════════════════════════════════════
     3. TOKYO TO HAKONE
  ══════════════════════════════════════════════════════ */
  "tokyo-to-hakone": {
    slug: "tokyo-to-hakone",
    metaTitle: "Tokyo to Hakone Private Car Transfer | ¥70,000 | Octoshell Japan",
    metaDesc: "Luxury private transfer from Tokyo to Hakone by Toyota Alphard. Flat rate ¥70,000 all-inclusive (Odakyu Outlet option available). No Shinkansen, no crowds — door to door.",
    ogImage: "/Sightseeing.webp",
    keywords: [
      "Tokyo to Hakone private car",
      "Tokyo Hakone transfer",
      "Hakone private chauffeur",
      "東京 箱根 ハイヤー",
      "東京 箱根 送迎",
      "東京 箱根 専用車",
      "東京 箱根 接送",
      "Hakone private driver",
      "Hakone hot spring resort transfer",
      "御殿場プレミアムアウトレット 送迎",
    ],
    badge: { en: "Day Trip Transfer", ja: "送迎サービス", zh: "長途接送" },
    h1: {
      en: "Tokyo to Hakone Private Transfer",
      ja: "東京 → 箱根 プライベート専用車",
      zh: "東京至箱根私人專車",
    },
    sub: {
      en: "Tokyo ↔ Hakone · Flat Rate ¥70,000 · All-Inclusive",
      ja: "東京 ↔ 箱根 · 定額 ¥70,000 · 全込み",
      zh: "東京 ↔ 箱根 · 定額 ¥70,000 · 全包",
    },
    price: {
      en: "From ¥70,000",
      ja: "¥70,000〜",
      zh: "¥70,000 起",
    },
    intro: {
      en: "Hakone is Japan's most celebrated hot-spring and mountain destination — yet getting there on public transport means transfers, timed timetables, and crowds. Octoshell's private Tokyo-to-Hakone transfer takes you door-to-door in a luxury Toyota Alphard at a flat ¥70,000, highway and parking included.",
      ja: "日本を代表する温泉・山岳リゾート、箱根へのアクセスを、乗り換えなし・混雑なしの完全プライベートな専用車でお届けします。高速・駐車料金込みの¥70,000定額で、東京から箱根まで直接ドアツードアでご案内します。",
      zh: "箱根是日本最受歡迎的溫泉與山岳度假勝地。乘坐公共交通前往需要多次換乘，還要面對人群。Octoshell的私人專車服務讓您從東京直達箱根，定額¥70,000，全包高速費與停車費。",
    },
    body: {
      en: [
        "The journey from central Tokyo to Hakone covers approximately 90 km, winding through the outskirts of Yokohama and into the mountains of Kanagawa Prefecture. Via the Tomei Expressway and Odawara-Atsugi Road, the drive takes roughly 90–120 minutes depending on traffic. By private chauffeur, that time is yours — no overhead luggage shelves, no stranger seated beside you, no announcements, no rushing for the right connection at Odawara Station.",
        "Many visitors combine the Hakone journey with a stop at Gotemba Premium Outlets or Oyama town. Octoshell's itinerary is entirely flexible: request a 30-minute outlet stop, a scenic route via Lake Ashi, or a detour to Owakudani volcanic valley — all at no extra charge within the flat rate, as long as the total journey remains reasonable. Your chauffeur is a dedicated professional, not a meter-running taxi driver.",
        "The flat rate of ¥70,000 applies to most central Tokyo locations to Hakone town, Hakone-Yumoto, Gora, Sengokuhara, or any of the 17 areas within the Hakone open-air museum and resort zone. Luxury ryokan guests traveling with heavy luggage, kimono trunks, or golf bags will appreciate the Alphard's rear cargo space and the chauffeur's white-gloved assistance at hotel entrances.",
        "For the return journey from Hakone to Tokyo, the same flat rate applies. Some guests prefer an early-morning return to catch a connection at Haneda or Narita — Octoshell handles seamless onward connections, meaning your driver waits while you check out, loads luggage, and proceeds directly to the airport. One booking, total peace of mind.",
      ],
      ja: [
        "東京都心から箱根まで約90km。東名高速・小田原厚木道路を経由し、渋滞がなければ約90〜120分の道のりです。専用車であれば、その時間は完全にあなたのもの。荷棚に荷物を押し込む必要も、隣の見知らぬ人を気にする必要も、小田原駅での乗り換えダッシュも一切ありません。",
        "御殿場プレミアムアウトレットや小山町に立ち寄るお客様も多くいらっしゃいます。Octoshellのルートは完全にお客様のご要望に応じます。アウトレットでの30分停車、芦ノ湖沿いの景観ルート、大涌谷への迂回——どれも定額料金の範囲内で、メーターを気にせず柔軟にご対応します。",
        "¥70,000の定額は、東京都心の多くのエリアから箱根町・箱根湯本・強羅・仙石原など箱根エリア内の主要17地区への送迎に適用されます。高級旅館へのご宿泊で大荷物・着物・ゴルフバッグをお持ちのお客様にも、アルファードの広いラゲッジスペースと白手袋のチャウファーによる丁寧なサポートが好評です。",
        "箱根から東京への帰路も同じ定額¥70,000でご利用いただけます。早朝出発で羽田・成田への乗り継ぎを希望されるお客様には、シームレスなアクセスをご提供。チェックアウト後、荷物を積み込んでそのまま空港へ直行——1回の予約で完結する安心のサービスです。",
      ],
      zh: [
        "從東京市中心到箱根約90公里，途經橫濱郊區進入神奈川縣山區。走東名高速與小田原厚木公路，車程約90至120分鐘（視路況而定）。乘坐私人專車，這段時間完全屬於您——無需把行李塞進頭頂架，無需在小田原站趕換乘，也無需與陌生人並肩而坐。",
        "許多旅客會在旅途中順道前往御殿場高級名品城或小山町。Octoshell的行程完全靈活：可申請在名品城停留30分鐘、走蘆之湖景觀路線，或繞道大涌谷——只要總行程合理，均無額外收費。您的司機是您的專屬嚮導，而非按錶計費的計程車司機。",
        "¥70,000定額適用於東京市內大多數地點至箱根町、箱根湯本、強羅、仙石原或箱根露天博物館度假區內17個地區的全程接送。攜帶大件行李、和服箱或高爾夫球袋前往高級旅館的旅客，將特別受益於埃爾法寬敞的後備廂空間，以及司機在酒店門口的白手套貼心協助。",
        "箱根返回東京同樣適用¥70,000定額。希望一大早出發趕羽田或成田航班的旅客，Octoshell可提供無縫銜接服務——司機在您退房時等候，幫您裝好行李後直奔機場。一次預訂，全程無憂。",
      ],
    },
    highlights: {
      en: [
        "Fixed flat rate ¥70,000 — Tokyo ↔ Hakone, door to door",
        "All highway tolls & parking included",
        "Optional stops: Gotemba Premium Outlets, Lake Ashi, Owakudani",
        "Flexible itinerary — no timetables, no transfers",
        "Toyota Alphard (6 pax) or Hiace (9 pax) available",
        "Perfect for ryokan stays with heavy luggage",
        "Return trip available at same flat rate",
        "English-speaking chauffeurs available",
      ],
      ja: [
        "¥70,000の定額・東京 ↔ 箱根ドアツードア",
        "高速・駐車場代込み",
        "御殿場アウトレット・芦ノ湖・大涌谷など途中立ち寄り対応",
        "時刻表なし・乗り換えなし",
        "アルファード（6名）・ハイエース（9名）",
        "大荷物・着物・ゴルフバッグも安心",
        "帰路も同額定額で対応",
        "英語対応チャウファー",
      ],
      zh: [
        "¥70,000定額，東京↔箱根全程門到門",
        "全含高速費及停車費",
        "可選停：御殿場名品城、蘆之湖、大涌谷",
        "行程靈活，無時刻表，無換乘",
        "埃爾法（6人）或海獅（9人）",
        "大件行李、和服、高爾夫球具均無憂",
        "回程同等定額",
        "英語服務司機",
      ],
    },
    cta: { en: "Book Tokyo–Hakone Transfer", ja: "東京→箱根を予約", zh: "預訂東京至箱根專車" },
    heroImg: "/Sightseeing.webp",
    heroAlt: "Black Toyota Alphard parked at a scenic Hakone mountain road with Mt Fuji in background",
    faqs: [
      {
        q: {
          en: "How much is a private car from Tokyo to Hakone?",
          ja: "東京〜箱根間の専用車料金はいくらですか？",
          zh: "從東京到箱根的私人專車費用是多少？",
        },
        a: {
          en: "Octoshell charges a flat rate of ¥70,000 for the Tokyo to Hakone transfer in a Toyota Alphard (up to 6 passengers). All highway tolls and parking are included. A Toyota Hiace for larger groups is available at approximately 10–15% more.",
          ja: "トヨタ・アルファード（最大6名）で¥70,000の定額料金です。高速料金・駐車場代込みです。大人数には約10〜15%増のトヨタ・ハイエースもご用意しています。",
          zh: "豐田埃爾法（最多6名）¥70,000定額，包含所有高速費與停車費。大型團體可選豐田海獅，費用約高10至15%。",
        },
      },
      {
        q: {
          en: "How long does the Tokyo to Hakone drive take?",
          ja: "東京〜箱根間の所要時間はどのくらいですか？",
          zh: "從東京開車到箱根需要多長時間？",
        },
        a: {
          en: "Approximately 90–120 minutes under normal traffic conditions via the Tomei Expressway and Odawara-Atsugi Road. Allow an extra 30 minutes during peak weekends or Golden Week.",
          ja: "東名高速・小田原厚木道路経由で通常約90〜120分です。週末のピーク時やゴールデンウィークは30分程度余裕を見てください。",
          zh: "正常路況下，走東名高速及小田原厚木道路約需90至120分鐘。週末高峰或黃金週請預留額外30分鐘。",
        },
      },
      {
        q: {
          en: "Can I stop at Gotemba Premium Outlets on the way to Hakone?",
          ja: "箱根への途中で御殿場プレミアムアウトレットに立ち寄れますか？",
          zh: "去箱根途中可以在御殿場名品城停留嗎？",
        },
        a: {
          en: "Yes. A stop at Gotemba Premium Outlets (approx. 30–60 minutes) can be included in the itinerary at no extra charge within the ¥70,000 flat rate, provided the total journey time remains reasonable.",
          ja: "はい。御殿場プレミアムアウトレットへの立ち寄り（約30〜60分）は¥70,000の定額内で対応可能です。全体の行程が著しく延長しない範囲での対応となります。",
          zh: "可以。在御殿場名品城停留約30至60分鐘，可在¥70,000定額範圍內安排，前提是總行程時間在合理範圍內。",
        },
      },
      {
        q: {
          en: "Is Octoshell's Hakone transfer better than the Romancecar train?",
          ja: "ロマンスカーよりOctoshellの箱根専用車の方が良いですか？",
          zh: "Octoshell的箱根接送比浪漫特快列車更好嗎？",
        },
        a: {
          en: "For groups of 3 or more, heavy luggage, or ryokan stays requiring door-to-door service, a private chauffeur is significantly more convenient. The Romancecar is economical for solo or duo travel but requires transfers, timetables, and luggage handling on your own.",
          ja: "3名以上のご旅行、大荷物、旅館へのドアツードア送迎が必要な場合は専用車が圧倒的に便利です。ロマンスカーは1〜2名の移動には経済的ですが、乗り換え・時刻表への対応・手荷物管理が必要です。",
          zh: "對於3人以上的旅客、攜帶大量行李，或需要門到門服務前往旅館的旅客，私人專車遠比浪漫特快方便。浪漫特快對一兩名旅客較為划算，但需要換乘、遵守時刻表並自行搬運行李。",
        },
      },
      {
        q: {
          en: "Does the Hakone transfer include the return journey?",
          ja: "箱根送迎には帰路も含まれていますか？",
          zh: "箱根接送包含回程嗎？",
        },
        a: {
          en: "The ¥70,000 flat rate covers a single journey (one way). The return journey from Hakone to Tokyo is the same ¥70,000 and can be booked separately or as a round trip.",
          ja: "¥70,000の定額は片道1回の料金です。箱根から東京への帰路も同じ¥70,000で、個別または往復セットでご予約いただけます。",
          zh: "¥70,000定額為單程費用。從箱根返回東京的回程同為¥70,000，可單獨預訂或與去程一起預訂來回。",
        },
      },
    ],
    schemaName: "Tokyo to Hakone Private Chauffeur Transfer",
    schemaDesc: "Luxury private car transfer between Tokyo and Hakone. Flat rate ¥70,000, Toyota Alphard, door-to-door, all highway tolls and parking included.",
    schemaPrice: 70000,
  },

  /* ══════════════════════════════════════════════════════
     4. TOKYO TO FUJI
  ══════════════════════════════════════════════════════ */
  "tokyo-to-fuji": {
    slug: "tokyo-to-fuji",
    metaTitle: "Tokyo to Mt Fuji Private Car Transfer | ¥68,000 | Octoshell Japan",
    metaDesc: "Luxury private transfer from Tokyo to Mount Fuji (Fuji 5th Station, Kawaguchiko, Gotemba). Flat ¥68,000 — Toyota Alphard, door-to-door, all tolls included. Book now.",
    ogImage: "/Sightseeing.webp",
    keywords: [
      "Tokyo to Mount Fuji private car",
      "Tokyo Fuji transfer",
      "Fuji private chauffeur",
      "東京 富士山 ハイヤー",
      "東京 富士山 送迎",
      "東京 富士山 専用車",
      "東京 富士山 接送",
      "Fuji 5th station private driver",
      "Kawaguchiko private transfer",
      "富士山 プライベートカー",
    ],
    badge: { en: "Day Trip Transfer", ja: "送迎サービス", zh: "長途接送" },
    h1: {
      en: "Tokyo to Mt Fuji Private Transfer",
      ja: "東京 → 富士山 プライベート専用車",
      zh: "東京至富士山私人專車",
    },
    sub: {
      en: "Tokyo ↔ Mt Fuji · Flat Rate ¥68,000 · All-Inclusive",
      ja: "東京 ↔ 富士山 · 定額 ¥68,000 · 全込み",
      zh: "東京 ↔ 富士山 · 定額 ¥68,000 · 全包",
    },
    price: {
      en: "From ¥68,000",
      ja: "¥68,000〜",
      zh: "¥68,000 起",
    },
    intro: {
      en: "Mount Fuji is Japan's most iconic landmark — and visiting it on your own terms, by private chauffeur, is the most flexible and rewarding way to experience the mountain. Octoshell's flat-rate ¥68,000 Tokyo–Fuji transfer covers the full journey, door to door, with no hidden fees.",
      ja: "日本最大のシンボル、富士山へのアクセスを、乗り換えなし・完全プライベートの専用車でご案内します。¥68,000の定額料金には高速・駐車場代が含まれ、ドアツードアでご案内します。",
      zh: "富士山是日本最具代表性的地標，以私人專車前往是最靈活、最舒適的體驗方式。Octoshell提供¥68,000定額的東京至富士山全程接送，門到門服務，無任何隱藏費用。",
    },
    body: {
      en: [
        "Mount Fuji lies approximately 100 km southwest of central Tokyo. The most popular access routes — via the Tomei Expressway to the Fuji Subaru Line Fifth Station, or via Route 138 to Kawaguchiko lake — are easily covered in 90–150 minutes by private car, depending on traffic and destination. Unlike tour buses or scheduled train services, Octoshell's chauffeur holds no timetable except yours.",
        "For climbers attempting the Yoshida or Subashiri trails, departure from Tokyo at 4:00 AM or earlier is often necessary. Octoshell's 24/7 service accommodates pre-dawn pickups with no surcharge. Post-climb, the chauffeur waits at your agreed-upon meeting point at the 5th Station or trailhead, ready to transport tired muscles and wet gear back to the city or directly to your hotel.",
        "Non-climbing visitors can enjoy the scenic Fuji Five Lakes region — Kawaguchiko, Saiko, Yamanakako — or combine the visit with a stop at Gotemba Premium Outlets (20 minutes from Fuji 5th Station) for luxury shopping before or after the mountain. Photography guests seeking the dawn or dusk reflection of Fuji in the Chureito Pagoda or Motosu Lake can specify exact timing without compromise.",
        "The ¥68,000 flat rate covers any Tokyo origin to the Fuji 5th Station, Kawaguchiko area, or Gotemba town. Highway tolls on the Tomei Expressway and Fuji Subaru Line fees are fully included. The Hiace is available for larger groups with climbing gear at approximately 10–15% premium.",
      ],
      ja: [
        "富士山は東京都心から約100km南西に位置します。富士スバルライン五合目、または河口湖エリアへは、東名高速経由で約90〜150分。渋滞や目的地によって異なりますが、ツアーバスや電車とは違い、Octoshellのチャウファーは時刻表ではなく、お客様のスケジュールで動きます。",
        "吉田ルートや須走ルートで登山をご予定の方は、東京を早朝4時台に出発する必要があることも。Octoshellは年中無休・24時間対応で、早朝出発も割増なしで承ります。登山後は、五合目または指定の登山口にて疲れた身体と濡れた装備を乗せ、ホテルや東京市内まで直接お届けします。",
        "登山をしない観光客の方には、富士五湖（河口湖・西湖・山中湖など）の周遊や、御殿場プレミアムアウトレットとの組み合わせがおすすめです。チュレイト塔からの朝焼け富士や本栖湖に映る逆さ富士を狙う撮影旅行では、日の出・日没の時間に合わせたフレキシブルな行程が可能です。",
        "¥68,000の定額は、東京都内の多くのエリアから富士スバルライン五合目・河口湖エリア・御殿場まで適用されます。東名高速の通行料・富士スバルラインの料金も含まれます。登山装備を持つ大人数向けには、トヨタ・ハイエースが約10〜15%増でご利用いただけます。",
      ],
      zh: [
        "富士山位於東京市中心西南約100公里。最熱門的路線——走東名高速至富士山河口湖口五合目，或走138號國道至河口湖——私人專車約需90至150分鐘，視路況與目的地而定。與旅遊巴士或定班列車不同，Octoshell的司機沒有固定時刻表，只遵從您的安排。",
        "計劃登吉田路線或須走路線的登山者，往往需要在清晨4時或更早從東京出發。Octoshell全天候服務，凌晨出發不附加任何費用。下山後，司機在您約定的五合目或登山口等候，載著疲憊的您和潮濕的裝備直接返回酒店或東京市區。",
        "非登山旅客可遊覽富士五湖地區（河口湖、西湖、山中湖），或結合御殿場高級名品城（距五合目約20分鐘）享受登山前後的購物樂趣。希望拍攝中雷塔富士日出倒影或本栖湖逆富士的攝影愛好者，可指定精確時間安排行程，無需任何妥協。",
        "¥68,000定額適用於東京任何出發地至富士山五合目、河口湖地區或御殿場的全程接送。東名高速通行費及富士山斯巴魯線費用均包含在內。攜帶登山裝備的大型團體可選擇豐田海獅，費用約高10至15%。",
      ],
    },
    highlights: {
      en: [
        "Fixed flat rate ¥68,000 — Tokyo ↔ Mt Fuji, door to door",
        "All highway tolls & Fuji Subaru Line fees included",
        "24/7 service — pre-dawn departures for climbers, no surcharge",
        "Flexible itinerary: 5th Station, Kawaguchiko, Gotemba, Five Lakes",
        "Optional stop: Gotemba Premium Outlets",
        "Perfect for climbing groups with gear",
        "Photography-optimised timing (sunrise / sunset)",
        "English-speaking chauffeurs available",
      ],
      ja: [
        "¥68,000の定額・東京 ↔ 富士山ドアツードア",
        "高速・富士スバルライン料金込み",
        "年中無休・24時間対応・早朝割増なし",
        "五合目・河口湖・御殿場・富士五湖に対応",
        "御殿場アウトレット途中立ち寄り可能",
        "登山装備・大荷物も対応",
        "日の出・日没の撮影タイミングに対応",
        "英語対応チャウファー",
      ],
      zh: [
        "¥68,000定額，東京↔富士山全程門到門",
        "含所有高速費及富士山斯巴魯線費",
        "24/7全天候，凌晨出發不加價",
        "靈活行程：五合目、河口湖、御殿場、五湖",
        "可選停御殿場名品城",
        "適合攜帶登山裝備的團體",
        "可按日出/日落安排攝影時間",
        "英語服務司機",
      ],
    },
    cta: { en: "Book Tokyo–Fuji Transfer", ja: "東京→富士山を予約", zh: "預訂東京至富士山專車" },
    heroImg: "/Sightseeing.webp",
    heroAlt: "Black Toyota Alphard on a mountain road with Mount Fuji visible in the background",
    faqs: [
      {
        q: {
          en: "How much is a private car from Tokyo to Mount Fuji?",
          ja: "東京〜富士山間の専用車料金はいくらですか？",
          zh: "從東京到富士山的私人專車費用是多少？",
        },
        a: {
          en: "Octoshell charges a flat rate of ¥68,000 for a Toyota Alphard (up to 6 passengers). All highway tolls and Fuji Subaru Line fees are included. Toyota Hiace for larger groups is approximately 10–15% more.",
          ja: "トヨタ・アルファード（最大6名）で¥68,000の定額料金です。高速料金・富士スバルライン料金込みです。大人数にはトヨタ・ハイエースが約10〜15%増でご用意しています。",
          zh: "豐田埃爾法（最多6名）¥68,000定額，包含所有高速費及富士山斯巴魯線費用。大型團體可選豐田海獅，費用約高10至15%。",
        },
      },
      {
        q: {
          en: "Can the chauffeur wait while I climb Fuji?",
          ja: "富士山登山中、チャウファーは待ってもらえますか？",
          zh: "我登富士山時司機會等待嗎？",
        },
        a: {
          en: "Yes. For full-day climbing trips, the chauffeur can be engaged on an hourly hire basis after the initial transfer. Please mention this when booking so we can prepare the appropriate vehicle and schedule.",
          ja: "はい。終日の登山の場合、最初の送迎後はチャウファーを時間制チャーターでご利用いただけます。ご予約時にその旨をお伝えいただければ、適切な車両・スケジュールをご用意します。",
          zh: "可以。對於全天登山行程，初始接送後可按小時包車方式讓司機繼續候命。預訂時請告知，以便我們安排適合的車輛和時間表。",
        },
      },
      {
        q: {
          en: "Does the route include Kawaguchiko and the Fuji Five Lakes?",
          ja: "河口湖や富士五湖も含まれていますか？",
          zh: "路線包含河口湖和富士五湖嗎？",
        },
        a: {
          en: "Yes. The ¥68,000 flat rate covers the Tokyo–Kawaguchiko and Tokyo–Fuji 5th Station routes. Scenic detours through the Five Lakes area can be incorporated at no extra charge within a reasonable itinerary.",
          ja: "はい。¥68,000の定額は東京〜河口湖・東京〜五合目ルートを含みます。合理的な範囲内であれば、富士五湖エリアの観光ルートも追加料金なしで対応します。",
          zh: "是的。¥68,000定額涵蓋東京至河口湖及東京至五合目的路線。在合理行程範圍內，富士五湖地區的景觀繞道可免費加入行程。",
        },
      },
      {
        q: {
          en: "Is it possible to book an early morning Fuji departure from Tokyo?",
          ja: "東京からの早朝富士山出発は予約できますか？",
          zh: "可以預訂從東京早上出發去富士山嗎？",
        },
        a: {
          en: "Yes. Octoshell operates 24 hours a day and can accommodate pickups as early as 3:00 or 4:00 AM for sunrise summit attempts. No surcharge applies for early-morning departures.",
          ja: "はい。Octoshellは24時間対応です。日の出登頂を目指す場合の午前3時・4時台のピックアップも割増なしで承ります。",
          zh: "可以。Octoshell 24小時運營，可安排早上3時或4時出發，滿足追日出登頂的需求，且不收取任何早班附加費。",
        },
      },
    ],
    schemaName: "Tokyo to Mount Fuji Private Chauffeur Transfer",
    schemaDesc: "Luxury private car transfer between Tokyo and Mount Fuji (5th Station, Kawaguchiko, Gotemba). Flat rate ¥68,000, Toyota Alphard, all tolls included.",
    schemaPrice: 68000,
  },

  /* ══════════════════════════════════════════════════════
     5. TOKYO GOLF TRANSFER
  ══════════════════════════════════════════════════════ */
  "tokyo-golf-transfer": {
    slug: "tokyo-golf-transfer",
    metaTitle: "Tokyo Golf Club Transfer | Private Chauffeur | ¥50,000 | Octoshell",
    metaDesc: "Luxury private golf transfer from Tokyo to Kanto-region golf clubs. Flat ¥50,000 — Toyota Alphard or Hiace, ample space for golf bags, early morning departures. Octoshell Japan.",
    ogImage: "/GOLF.webp",
    keywords: [
      "Tokyo golf transfer",
      "Tokyo golf club chauffeur",
      "Kanto golf private car",
      "東京 ゴルフ 送迎",
      "東京 ゴルフ場 ハイヤー",
      "ゴルフ 専用車 関東",
      "日本 ゴルフ 接送",
      "Japan golf club transfer",
      "private driver golf Japan",
      "luxury golf chauffeur Tokyo",
    ],
    badge: { en: "Golf Transfer", ja: "ゴルフ送迎", zh: "高爾夫接送" },
    h1: {
      en: "Tokyo Golf Club Private Transfer",
      ja: "東京 ゴルフ場 プライベート送迎",
      zh: "東京高爾夫球場私人專車",
    },
    sub: {
      en: "Tokyo ↔ Kanto Golf Clubs · Flat Rate ¥50,000 · All-Inclusive",
      ja: "東京 ↔ 関東ゴルフ場 · 定額 ¥50,000 · 全込み",
      zh: "東京 ↔ 關東高爾夫球場 · 定額 ¥50,000 · 全包",
    },
    price: {
      en: "From ¥50,000",
      ja: "¥50,000〜",
      zh: "¥50,000 起",
    },
    intro: {
      en: "Japan's premier golf courses are scattered across the Kanto region, often 60–120 minutes from Tokyo by car. Octoshell's dedicated golf transfer service connects you and your clubs to any Kanto golf course — flat rate ¥50,000, space for all bags guaranteed.",
      ja: "関東圏の名門ゴルフコースへ、クラブバッグを積み込んでストレスフリーに向かいましょう。¥50,000の定額料金で、東京から関東圏内のゴルフ場まで専用車でお届けします。",
      zh: "日本關東地區的頂級高爾夫球場遍佈各地，距東京車程約60至120分鐘。Octoshell的高爾夫專屬接送服務，讓您和所有球具輕鬆抵達任何關東球場，定額¥50,000，球袋空間有保障。",
    },
    body: {
      en: [
        "Japanese golf culture is deeply rooted in punctuality, preparation, and respect for the course. Arriving at a prestigious club by taxi or standard hire car falls short of the experience that begins the moment you leave your hotel. Octoshell's golf chauffeur service is designed for exactly this moment: a spotless Toyota Alphard or Hiace arrives at your hotel entrance, your bags are loaded into the generous rear cargo with care, and you depart for the course in complete comfort.",
        "Early morning tee times — 6:00 AM, 7:00 AM starts — are standard across Kanto's golf clubs. Octoshell operates 24 hours a day, and early-morning departures carry no premium surcharge. Whether your course is in Saitama, Chiba, Kanagawa, or Ibaraki, your chauffeur has the route pre-mapped and arrives on time, every time.",
        "After your round, the return journey is just as seamless. Post-game refreshments at the clubhouse, a bath, a meal — take your time. Your driver is waiting in the designated vehicle area, bags already loaded, ready to bring you home at your pace. No meters running, no impatient honking. Just the quiet dignity of a car that belongs to your afternoon.",
        "The flat rate of ¥50,000 covers most Tokyo to Kanto-region golf courses within a 100km radius. Golf bags, push carts, and equipment cases are handled as standard, with no size surcharge. For foursomes or groups requiring the Hiace's nine-seat capacity, a modest premium applies.",
      ],
      ja: [
        "日本のゴルフ文化は、時間厳守・丁寧な準備・コースへの敬意に深く根ざしています。名門クラブへの到着が普通のタクシーでは、その一日の格が落ちてしまいます。Octoshellのゴルフ専用送迎は、ホテルのエントランスを出た瞬間からその日のクラブライフを演出します。清潔なアルファードが到着し、キャディバッグは丁寧に積み込まれ、あなたは最高の状態でコースへ向かうことができます。",
        "関東のゴルフ場では午前6時・7時スタートが一般的です。Octoshellは24時間対応で、早朝の出発でも割増なし。埼玉・千葉・神奈川・茨城など、どのコースへもルートを事前に確認し、時間通りにお迎えします。",
        "ラウンド後の帰路も同様にスムーズです。クラブハウスでの食事、お風呂、ゆっくりとした余韻——お客様のペースで過ごしていただいて構いません。チャウファーは指定の駐車エリアにて、バッグをすでに積み込んで待機しています。メーターも急かすクラクションもない、静かで品格ある帰り道をお届けします。",
        "¥50,000の定額は、東京から100km圏内の関東ゴルフ場のほとんどに適用されます。キャディバッグ・プッシュカート・道具ケースのサイズ割増は一切かかりません。4名以上のグループや9名対応のハイエースが必要な場合は、若干の追加料金が発生します。",
      ],
      zh: [
        "日本的高爾夫文化深植於守時、充分準備與對球場的尊重。乘坐計程車或普通租車抵達名門球場，難免有失體面。Octoshell的高爾夫專屬司機服務，從您踏出酒店大門的那一刻起，便已為您打造尊貴的俱樂部體驗——一輛一塵不染的豐田埃爾法靜靜停在酒店門口，球袋被輕柔地裝入寬敞的後備廂，您在極度舒適中出發前往球場。",
        "關東各高爾夫球場的早晨開球時間通常為早上6至7時。Octoshell全天候運營，清晨出發不附加任何費用。無論球場位於埼玉、千葉、神奈川還是茨城，司機均會提前規劃路線，準時到達。",
        "打完球後的回程同樣輕鬆順暢。在俱樂部享用餐食、泡個澡、慢慢回味今天的球局——請按您自己的節奏來。司機在指定停車區等候，球袋早已裝好，隨時準備以您的步調帶您回家。沒有計費表在滴答作響，沒有不耐烦的按喇叭，只有屬於這個下午的靜謐尊貴。",
        "¥50,000定額適用於東京至大多數100公里範圍內的關東高爾夫球場。球袋、推車及裝備箱均為標準服務，無任何尺寸附加費。四人以上或需要海獅9座艙位的團體，費用略有增加。",
      ],
    },
    highlights: {
      en: [
        "Fixed flat rate ¥50,000 — Tokyo ↔ Kanto golf clubs",
        "Ample space for multiple golf bags & push carts",
        "Early-morning tee time departures — no surcharge",
        "All highway tolls & parking included",
        "Chauffeur waits & loads after your round",
        "Toyota Alphard (6 pax) or Hiace (9 pax) available",
        "24/7 service — 365 days",
        "English-speaking chauffeurs available",
      ],
      ja: [
        "¥50,000の定額・東京 ↔ 関東ゴルフ場",
        "複数のキャディバッグ・プッシュカートに対応",
        "早朝スタート対応・割増なし",
        "高速・駐車場代込み",
        "ラウンド後の積み込み・帰路もチャウファーが対応",
        "アルファード（6名）・ハイエース（9名）",
        "年中無休・24時間",
        "英語対応チャウファー",
      ],
      zh: [
        "¥50,000定額，東京↔關東高爾夫球場",
        "輕鬆容納多套球袋及推車",
        "早晨開球出發，不附加任何費用",
        "含所有高速費及停車費",
        "打完球後司機等候裝車回程",
        "埃爾法（6人）或海獅（9人）",
        "全年365天，24小時服務",
        "英語服務司機",
      ],
    },
    cta: { en: "Book Golf Transfer", ja: "ゴルフ送迎を予約", zh: "預訂高爾夫接送" },
    heroImg: "/GOLF.webp",
    heroAlt: "Chauffeur loading premium golf bags into Toyota Alphard at a Kanto golf club",
    faqs: [
      {
        q: {
          en: "How much is a private golf transfer from Tokyo?",
          ja: "東京からゴルフ場への専用車料金はいくらですか？",
          zh: "從東京前往高爾夫球場的私人接送費用是多少？",
        },
        a: {
          en: "The flat rate is ¥50,000 for a Toyota Alphard (up to 6 passengers with golf bags). All highway tolls and parking are included. A Toyota Hiace for larger groups is available at a slightly higher rate.",
          ja: "トヨタ・アルファード（最大6名・ゴルフバッグ込み）で¥50,000の定額料金です。高速料金・駐車場代込みです。",
          zh: "豐田埃爾法（最多6名含球袋）¥50,000定額，包含所有高速費與停車費。",
        },
      },
      {
        q: {
          en: "Can the chauffeur accommodate multiple golf bags?",
          ja: "複数のゴルフバッグも積めますか？",
          zh: "司機能裝載多套高爾夫球袋嗎？",
        },
        a: {
          en: "Yes. The Toyota Alphard's rear cargo area comfortably fits up to 4 large golf bags alongside passenger luggage. For 4+ bags, the Toyota Hiace provides additional cargo space.",
          ja: "はい。トヨタ・アルファードのラゲッジスペースには大型キャディバッグ4本まで積み込めます。4本以上はトヨタ・ハイエースをご利用ください。",
          zh: "可以。豐田埃爾法後備廂可輕鬆容納最多4個大型高爾夫球袋連同乘客行李。4袋以上建議選擇豐田海獅，提供更多裝載空間。",
        },
      },
      {
        q: {
          en: "Which golf clubs in Kanto does Octoshell serve?",
          ja: "関東のどのゴルフ場に対応していますか？",
          zh: "Octoshell服務關東哪些高爾夫球場？",
        },
        a: {
          en: "We serve all golf courses within the Greater Tokyo / Kanto region, including courses in Saitama, Chiba, Kanagawa, Ibaraki, Tochigi, and Gunma. If your club is within 120 km of Tokyo, we can get you there.",
          ja: "埼玉・千葉・神奈川・茨城・栃木・群馬を含む関東圏全域のゴルフ場に対応しています。東京から120km圏内であれば基本的に対応可能です。",
          zh: "我們服務大東京/關東地區所有高爾夫球場，包括埼玉、千葉、神奈川、茨城、栃木和群馬的球場。距東京120公里範圍內的球場均可服務。",
        },
      },
      {
        q: {
          en: "Can I book a golf transfer for an early morning tee time?",
          ja: "早朝のティータイムに合わせた送迎を予約できますか？",
          zh: "可以預訂配合早晨開球時間的接送嗎？",
        },
        a: {
          en: "Yes. Octoshell operates 24/7 with no surcharge for early-morning or late-night departures. Simply specify your tee time when booking and we will work backwards to calculate the optimal pickup time from your hotel.",
          ja: "はい。年中無休・24時間対応で、早朝・深夜の出発でも割増なしです。ご予約時にティータイムをお知らせいただければ、最適なピックアップ時刻を逆算してご案内します。",
          zh: "可以。Octoshell全天候運營，早晨或深夜出發均不附加費用。預訂時請告知您的開球時間，我們將計算最合適的接送時間。",
        },
      },
    ],
    schemaName: "Tokyo Golf Club Private Transfer — Kanto Region",
    schemaDesc: "Luxury private chauffeur transfer from Tokyo to Kanto-region golf clubs. Flat rate ¥50,000, Toyota Alphard or Hiace, ample golf bag space, all tolls included.",
    schemaPrice: 50000,
  },

  /* ══════════════════════════════════════════════════════
     6. TOKYO BY THE HOUR
  ══════════════════════════════════════════════════════ */
  "tokyo-by-the-hour": {
    slug: "tokyo-by-the-hour",
    metaTitle: "Tokyo Hourly Chauffeur Hire | 10 Hours ¥43,000 | Octoshell Japan",
    metaDesc: "Hire a private chauffeur in Tokyo by the hour. 10-hour hire from ¥43,000 — Toyota Alphard, flexible itinerary, corporate or leisure. All-day private car hire Tokyo. Octoshell.",
    ogImage: "/By_the_Hour.webp",
    keywords: [
      "Tokyo hourly chauffeur hire",
      "Tokyo private car hire by hour",
      "Tokyo chauffeur by the day",
      "東京 時間制 ハイヤー",
      "東京 時間貸切 専用車",
      "東京 時間制ハイヤー 料金",
      "東京 包車 按小時",
      "all day private car hire Tokyo",
      "corporate chauffeur hire Tokyo",
      "Tokyo business chauffeur hourly",
    ],
    badge: { en: "Hourly Hire", ja: "時間制貸切", zh: "時段包車" },
    h1: {
      en: "Tokyo Hourly Chauffeur Hire",
      ja: "東京 時間制 貸切ハイヤー",
      zh: "東京時段包車服務",
    },
    sub: {
      en: "Tokyo City · 10 Hours ¥43,000 · All-Inclusive",
      ja: "東京市内 · 10時間 ¥43,000 · 全込み",
      zh: "東京市內 · 10小時 ¥43,000 · 全包",
    },
    price: {
      en: "From ¥43,000",
      ja: "¥43,000〜",
      zh: "¥43,000 起",
    },
    intro: {
      en: "When your Tokyo schedule demands complete flexibility — multiple stops, last-minute changes, or a full day of business — Octoshell's hourly hire service provides a dedicated Toyota Alphard and chauffeur for your exclusive use. 10 hours from ¥43,000, all tolls included.",
      ja: "複数の訪問先、直前のスケジュール変更、終日ビジネス対応——Octoshellの時間制貸切サービスは、専属のアルファードとチャウファーを丸ごとお客様専用にします。10時間¥43,000、高速込みです。",
      zh: "當您的東京行程需要完全的靈活性——多個停靠點、臨時行程變更，或全天商務出行——Octoshell的時段包車服務為您提供專屬的豐田埃爾法和司機。10小時¥43,000，含通行費。",
    },
    body: {
      en: [
        "Tokyo is a city of distances. The gap between Shinjuku and Odaiba, Marunouchi and Akihabara, Roppongi and Asakusa — these are 20–40 minute journeys each way by taxi, with unpredictable surge pricing and the constant overhead of finding the next car. For business travelers with client meetings across multiple districts, or leisure guests with a packed itinerary of galleries, department stores, and restaurants, the hourly hire model eliminates all that friction.",
        "With Octoshell's 10-hour Tokyo hire, a single chauffeur and vehicle are yours from morning until evening. Your itinerary is the only agenda. Stop at a client's office in Marunouchi, proceed to a product briefing in Roppongi Hills, then head to a dinner reservation in Ginza — the vehicle is always outside, the chauffeur is always available, and your bags remain secure in the car throughout. No re-booking, no waiting, no exposure to Tokyo rush-hour taxis.",
        "The ¥43,000 rate covers 10 hours of dedicated service within the Metropolitan Tokyo area, including all highway tolls on standard routing. Overtime beyond the 10-hour block is billed at a proportional hourly rate agreed upfront. For half-day requirements, shorter packages are also available — simply specify your preferred duration when booking.",
        "Corporate clients regularly use the hourly hire for investor roadshows, ministry visits, or executive relocations. Leisure guests find it ideal for a luxury shopping day across Ginza, Harajuku, and Shibuya — with bags and purchases safely stored in the car's generous cargo area. The vehicle becomes a private mobile base for the day.",
      ],
      ja: [
        "東京は距離の街です。新宿とお台場、丸の内と秋葉原、六本木と浅草——それぞれが20〜40分かかる移動で、タクシーのたびにダイナミックプライシングと次の車を探す手間が伴います。複数の区をまたぐビジネスアポイントメントや、ギャラリー・百貨店・レストランを巡る充実した観光スケジュールには、時間制貸切がすべての煩わしさを解消します。",
        "Octoshellの10時間東京貸切サービスでは、1台の専用車と1名のチャウファーが朝から夕方まであなただけのために稼働します。丸の内のクライアントオフィスを訪問し、六本木ヒルズでのブリーフィングへ進み、銀座のディナーへ——車は常に外に待機し、チャウファーはいつでも対応可能です。荷物は終日車内に安全に保管されます。再予約も待ち時間も東京の混雑タクシーに乗る必要もありません。",
        "¥43,000の料金は、東京都内10時間の専属サービスを含み、通常ルートの高速料金も込みです。10時間超の残業分は事前合意の時間単価で加算されます。半日利用などの短時間パッケージもご用意していますので、ご予約時にご希望の時間をお知らせください。",
        "法人のお客様には、投資家ロードショー・省庁訪問・エグゼクティブの転居など幅広い用途でご利用いただいています。観光のお客様には、銀座・原宿・渋谷をめぐる高級ショッピングデーに最適で、購入品を安全に車内に保管しながらお楽しみいただけます。",
      ],
      zh: [
        "東京是一座充滿距離感的城市。新宿到台場、丸之內到秋葉原、六本木到淺草——每段路程單程都要20至40分鐘，每次叫計程車都面臨浮動計費和重新等待的煩惱。對於需要跨多個商業區赴約的商務人士，或行程滿滿的休閒旅客來說，時段包車能一次性消除這所有麻煩。",
        "Octoshell的10小時東京包車服務，讓一輛專屬車輛和一名司機從早到晚只為您服務。您的行程就是唯一的日程。前往丸之內拜訪客戶，前往六本木Hills出席簡報，再赴銀座晚宴——車輛始終候在外面，司機隨時待命，您的物品全程安全置於車內。無需重新叫車、無需等待、無需在東京高峰時段與計程車較勁。",
        "¥43,000費率涵蓋東京都內10小時專屬服務，包含標準路線所有高速費。超出10小時的部分，按預訂時商定的時薪比例計費。如有半日需求，也提供更短時段的套餐，預訂時請說明所需時長即可。",
        "法人客戶常用於投資者路演、部門拜訪或高管搬遷。休閒旅客則發現其非常適合橫跨銀座、原宿和澀谷的奢華購物日——購買的物品可安全存放在車輛寬敞的後備廂中，整輛車成為全天候的私人移動據點。",
      ],
    },
    highlights: {
      en: [
        "10 hours dedicated chauffeur service from ¥43,000",
        "Full flexibility — your itinerary, your schedule",
        "Multiple stops across Tokyo at no extra charge",
        "All standard highway tolls included",
        "Vehicle & chauffeur on standby throughout the day",
        "Ideal for business roadshows, shopping, sightseeing",
        "Half-day packages also available",
        "English-speaking chauffeurs available",
      ],
      ja: [
        "10時間専属チャウファーサービス ¥43,000〜",
        "完全フレキシブル・お客様のスケジュールに完全同期",
        "都内複数箇所への立ち寄り追加料金なし",
        "通常ルートの高速料金込み",
        "終日専用車・チャウファーが待機",
        "ビジネスロードショー・ショッピング・観光に最適",
        "半日パッケージあり",
        "英語対応チャウファー",
      ],
      zh: [
        "10小時專屬司機服務 ¥43,000起",
        "完全靈活，行程完全由您主導",
        "東京市內多個停靠點不收額外費用",
        "含標準路線高速費",
        "全天候車輛及司機候命",
        "商務路演、購物、觀光均適合",
        "半日套餐亦可預訂",
        "英語服務司機",
      ],
    },
    cta: { en: "Book Hourly Hire Tokyo", ja: "時間制貸切を予約", zh: "預訂東京時段包車" },
    heroImg: "/By_the_Hour.webp",
    heroAlt: "Luxury Toyota Alphard interior with gold ambient lighting and Tokyo city lights outside",
    faqs: [
      {
        q: {
          en: "How much is a 10-hour chauffeur hire in Tokyo?",
          ja: "東京での10時間のハイヤー料金はいくらですか？",
          zh: "東京10小時包車的費用是多少？",
        },
        a: {
          en: "Octoshell's 10-hour Tokyo city hire is ¥43,000, inclusive of standard highway tolls. This provides a dedicated Toyota Alphard and chauffeur from pickup to the end of the 10-hour block.",
          ja: "Octoshellの東京市内10時間貸切は¥43,000です（通常ルートの高速料金込み）。ピックアップから10時間の間、アルファードとチャウファーが専属でご対応します。",
          zh: "Octoshell的東京10小時包車費用為¥43,000，含標準路線高速費。從接送開始至10小時結束，豐田埃爾法和司機全程專屬為您服務。",
        },
      },
      {
        q: {
          en: "Can I make multiple stops across Tokyo during the hire?",
          ja: "貸切中に都内の複数箇所に立ち寄れますか？",
          zh: "包車期間可以在東京多個地點停留嗎？",
        },
        a: {
          en: "Yes. Multiple stops across Tokyo — hotels, offices, restaurants, shops — are included in the flat hire rate. There is no per-stop charge or additional mileage fee.",
          ja: "はい。ホテル・オフィス・レストラン・ショッピングなど都内複数箇所への立ち寄りは定額料金に含まれます。停車ごとの追加料金や走行距離による加算はありません。",
          zh: "可以。東京市內多個停靠點（酒店、辦公室、餐廳、商店）均包含在定額包車費用內，無任何按站或里程附加費。",
        },
      },
      {
        q: {
          en: "What happens if I need the car for more than 10 hours?",
          ja: "10時間を超えた場合はどうなりますか？",
          zh: "如果需要超過10小時怎麼辦？",
        },
        a: {
          en: "Overtime beyond the 10-hour block is billed at an agreed hourly rate, confirmed upfront at time of booking. We will also inform you proactively if you are approaching the 10-hour limit during the day.",
          ja: "10時間超の追加分は、ご予約時に合意した時間単価で加算されます。当日10時間に近づいた際にもご連絡いたします。",
          zh: "超出10小時的部分，按預訂時商定的時薪計費。當天接近10小時上限時，我們也會主動提醒您。",
        },
      },
      {
        q: {
          en: "Is the hourly hire suitable for corporate business meetings in Tokyo?",
          ja: "東京での法人ビジネスミーティングへの時間制貸切は適していますか？",
          zh: "時段包車適合東京的企業商務會議嗎？",
        },
        a: {
          en: "Yes. Many of our corporate clients use the hourly hire for investor roadshows, client meetings across multiple Tokyo business districts (Marunouchi, Roppongi, Shibuya), and ministerial or government office visits. Invoicing and account billing are available.",
          ja: "はい。法人のお客様には、投資家ロードショー、複数のビジネス地区（丸の内・六本木・渋谷）での商談、省庁・官公庁訪問などにご利用いただいています。インボイス・法人アカウント請求にも対応しています。",
          zh: "非常適合。我們許多企業客戶使用時段包車服務進行投資者路演、跨多個東京商業區（丸之內、六本木、澀谷）的客戶拜訪，以及省廳或政府辦公室訪問。支持開具發票及法人賬戶結算。",
        },
      },
      {
        q: {
          en: "Can I use the hourly hire for a shopping day in Ginza or Shibuya?",
          ja: "銀座や渋谷のショッピングデーに時間制貸切を使えますか？",
          zh: "可以用時段包車做銀座或澀谷的購物日嗎？",
        },
        a: {
          en: "Absolutely. The hourly hire is ideal for luxury shopping days — your purchases are stored securely in the vehicle, you can move between stores without carrying bags, and the chauffeur can suggest optimal routes between Ginza, Harajuku, and Shibuya.",
          ja: "もちろんです。高級ショッピングデーには最適なサービスです。購入品は車内に安全に保管でき、袋を持ち歩く必要なく店舗を移動できます。銀座・原宿・渋谷間の最適ルートもチャウファーがご案内します。",
          zh: "當然可以。時段包車非常適合奢華購物日——您的購物袋安全置於車內，無需拎著大包小包在各店間移動，司機還能為您規劃銀座、原宿和澀谷之間的最佳路線。",
        },
      },
    ],
    schemaName: "Tokyo Hourly Chauffeur Hire",
    schemaDesc: "10-hour dedicated chauffeur hire in Tokyo city. Flat rate ¥43,000, Toyota Alphard, multiple stops included, all highway tolls included. Ideal for business and luxury leisure.",
    schemaPrice: 43000,
  },
};

export const ALL_ROUTE_SLUGS = Object.keys(ROUTES) as RouteSlug[];

export function getRouteData(slug: string): RouteData | null {
  return ROUTES[slug as RouteSlug] ?? null;
}
