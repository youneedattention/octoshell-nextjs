import type { Lang } from "@/lib/translations";

export type FaqItem  = { q: string; a: string };
export type FaqGroup = { group: string; items: FaqItem[] };

/* ── Base FAQ ─────────────────────────────────────────────────────────── */
const FAQ_BASE: Record<Lang, FaqGroup[]> = {
  ja: [
    {
      group: "🚗 車両・車内規則について",
      items: [
        // veh[0]
        { q: "どのような車が配車されますか。", a: "2車種をご用意しております。トヨタ・アルファード（最大6名様・大型スーツケース5個）、およびトヨタ・ハイエース グランドキャビン（最大9名様・大型スーツケース15個）。いずれも緑ナンバー認可・完全禁煙・USB充電対応です。セダン等の配車はございません。" },
        // veh[1]
        { q: "車内での喫煙や飲食はできますか。", a: "全車両完全禁煙（電子タバコ含む）です。飲料は蓋付きのペットボトル等に限りOKです。軽食は臭いの残らないものに限りお召し上がりいただけます。" },
        // veh[2]
        { q: "ペット同伴での利用はできますか。", a: "はい、猫・犬・小型動物を歓迎しております。ご乗車中は必ずキャリーケースまたはクレートに入れていただく必要があります。キャリーをお持ちでない場合はご乗車をお断りする場合がございます。" },
        // veh[3]
        { q: "荷物のみを先行して運んでもらうことはできますか。", a: "はい、可能です。ゴルフグループや登山グループに人気のサービスです。お客様をゴルフ場や登山口にお送りした後、ゴルフバッグや大型バックパック等をホテルへ先行搬入いたします。ツアー契約者様のお荷物に限り対応可能です（無人の商業貨物輸送は法律上不可）。" },
        // veh[4]
        { q: "乗務員はスーツ・ネクタイ姿で対応してもらえますか？", a: "はい、すべてのご乗車において例外なくお守りしております。ダークスーツとネクタイの着用は弊社の固定基準であり、オプションではございません。これがタクシーやライドシェアとの違いです。" },
        // veh[5]
        { q: "乗務員はお客様のプライバシーと機密を守ってくれますか？", a: "はい。乗務員は厳格な守秘義務のもと業務を行っており、録音や乗客情報・会話内容の共有は一切行いません。お客様のプライバシーは絶対的に守られます。" },
        // veh[6]
        { q: "車内でスマートフォンの充電はできますか？", a: "はい、可能です。USB-AおよびUSB-Cポートを装備しており、iPhone・Android対応の充電ケーブルを無料でご用意しております。" },
      ],
    },
    {
      group: "💴 料金・お支払いについて",
      items: [
        // pay[0]
        { q: "待機料金（飛行機の遅延等）は発生しますか。", a: "担当乗務員がフライトをリアルタイムで追跡し、実際の着陸時間に合わせてお迎えを調整いたします。着陸後90分以内は追加料金なしでお待ちします。90分超過後は30分ごとに超過待機料金が発生します（30分未満は30分に切り上げ）。\nアルファード： 30分毎 2,500円（税込）\nハイエース： 30分毎 3,000円（税込）\n航空便の遅延による待機は常に無料です。" },
        // pay[1]
        { q: "万が一、運行中にルートの変更や利用時間の延長が必要になった場合はどうすればよいですか？", a: "速やかに乗務員にお申し付けください。乗務員が配車センターに連絡し、実現可能かどうか、および追加費用（通行料・時間割増・駐車場代等）を出発前にご確認いたします。当日の延長は車両の空き状況によりご対応できない場合もございますので、予めご了承ください。" },
        // pay[2]
        { q: "通行料・駐車場代・燃料費・宿泊費など、すべて料金に含まれますか？", a: "はい。1つの料金にすべて含まれています——高速道路料金・駐車場代・燃料費・宿泊費（泊まりがけの場合）。すべてのお見積もりはご予約時に確定・固定されます。追加請求は一切ありません。ただし、出発後のルート変更のみ追加費用が発生する場合があります。" },
        // pay[3]
        { q: "チャイルドシートや空港ミートアップ（ネームボード）は有料ですか。", a: "いずれも無料でご提供しております。チャイルドシートは乳児用・幼児用・ジュニア用（ISOFIXに対応）をご用意しています。また到着ロビーでのネームボード掲示（ミート＆グリート）も無料です。ご予約時にお早めにお申し出ください。" },
        // pay[4]
        { q: "支払手段は何ですか？車内でドライバーに直接支払うことはできますか？", a: "3つの方法からお選びいただけます。車内での現金払い、クレジットカード（主要カード対応・ご乗車後にStripe経由で自動決済）、または法人のお客様向けの銀行振込です。" },
        // pay[5]
        { q: "領収書は発行されますか。", a: "はい。クレジットカード決済のお客様には、ご乗車後に自動でPDF領収書をメールにてお送りします（経費精算にもご利用いただけます）。現金払いのお客様にはご要望に応じて発行いたします。" },
      ],
    },
    {
      group: "❌ キャンセルポリシー",
      items: [
        // can[0]
        { q: "取消料（キャンセル料）はいつから発生しますか。", a: "ご予約確定後のキャンセルにつきましては、特定商取引法に基づく表記に則り、以下の通りキャンセル料を申し受けます。\n配車日の48時間前まで： 無料（全額返金）\n配車日の24時間前〜48時間前まで： お見積り金額の 50%\n配車日の24時間以内、または無断キャンセル： お見積り金額の 100%\n※航空便の欠航など不可抗力による場合は、速やかにお知らせいただくことでキャンセル料は免除となります。" },
      ],
    },
  ],
  en: [
    {
      group: "🚗 Vehicles & In-Car Rules",
      items: [
        // veh[0]
        { q: "What kind of vehicles will be deployed?", a: "Two vehicles: Toyota Alphard (up to 6 passengers, 5 large suitcases) and Toyota Hiace Grand Cabin (up to 9 passengers, 15 large suitcases). Both are green-plate licensed, non-smoking, and equipped with USB charging. No sedans." },
        // veh[1]
        { q: "Is smoking, eating, or drinking allowed inside the vehicle?", a: "No smoking (including e-cigarettes). Drinks in sealed bottles are fine. Light snacks with no strong smell are OK." },
        // veh[2]
        { q: "Can I travel with my pets?", a: "Yes — cats, dogs, and small animals are welcome. Pets must be kept inside a secure carrier or crate throughout the journey. Passengers without a proper carrier may be refused boarding." },
        // veh[3]
        { q: "Can you transport our luggage separately during our tour?", a: "Yes — a popular option for golf and hiking groups. We drop you off at the golf course or trailhead, then deliver your bags to your hotel ahead of you. Available for passengers booked on our service only — not standalone cargo." },
        // veh[4]
        { q: "Will my chauffeur wear a suit and tie?", a: "Yes, every trip without exception. Dark suit and tie is a fixed standard — not an upgrade. This is what separates a licensed chauffeur from a taxi or ride-share." },
        // veh[5]
        { q: "Do the chauffeurs keep conversations private?", a: "Yes. Chauffeurs operate under strict confidentiality — no recording, no sharing of passenger information or conversations. Your privacy is non-negotiable." },
        // veh[6]
        { q: "Can I charge my phone in the vehicle?", a: "Yes. USB-A and USB-C ports are available, and free charging cables for iPhone and Android are provided at no charge." },
      ],
    },
    {
      group: "💴 Rates & Payments",
      items: [
        // pay[0]
        { q: "Do you charge for waiting time (e.g., flight delays)?", a: "The first 90 minutes after landing are free — at no extra charge. After that: Alphard ¥2,500 / Hiace ¥3,000 per 30 minutes. Flight delays are always free — you only pay if the wait is caused by personal activities." },
        // pay[1]
        { q: "Can I change the route or add time during the trip?", a: "Tell your chauffeur immediately. They will confirm feasibility and any added costs — tolls, time surcharges, or parking — before proceeding. Same-day extensions depend on availability and cannot always be guaranteed." },
        // pay[2]
        { q: "Are tolls, parking, fuel, and all fees included in the price?", a: "Yes. One price covers everything — tolls, parking, fuel, and overnight accommodation for the driver. All costs are fixed and confirmed at booking. No hidden fees. Route changes after the trip starts may add costs." },
        // pay[3]
        { q: "Are child seats and Airport Meet & Greet services extra?", a: "Both are free. Child seats (infant, toddler, and booster — ISOFIX compatible) and name-board Meet & Greet at arrivals are included. Request at booking so we can prepare." },
        // pay[4]
        { q: "How can I pay?", a: "Three options: cash in the car, credit card (charged automatically after the trip via Stripe — major cards accepted), or bank transfer for corporate clients." },
        // pay[5]
        { q: "Will I receive a receipt?", a: "Yes. Credit card payments receive an automatic PDF receipt by email after the trip — suitable for business expense claims. Cash payments: receipt issued on request." },
      ],
    },
    {
      group: "❌ Cancellation Policy",
      items: [
        // can[0]
        { q: "What is your cancellation policy?", a: "Cancellations are governed by our official Legal Notice under the Specified Commercial Transactions Act:\nUp to 48 hours before pickup: Free of charge (100% Refund)\nBetween 24 to 48 hours before pickup: 50% of the estimated quote\nWithin 24 hours or No-Show: 100% of the estimated quote\nNote: Cancellation fees are waived if your flight is officially canceled by the airline, provided you notify us immediately." },
      ],
    },
  ],
  zh: [
    {
      group: "🚗 車輛及車內守則",
      items: [
        // veh[0]
        { q: "預訂後會派發什麼樣的車輛？", a: "本公司提供兩款車型：豐田埃爾法（最多6人、5件大型行李箱）及豐田海獅 Grand Cabin（最多9人、15件大型行李箱）。兩款均持有綠色車牌認可，全面禁煙，並配備USB充電接口。本公司不提供普通轎車。" },
        // veh[1]
        { q: "車內可以吸煙或飲食嗎？", a: "全面禁煙（包括電子煙）。飲料限帶蓋瓶裝飲品。輕食以無刺激性氣味為限。" },
        // veh[2]
        { q: "可以攜帶寵物一同乘車嗎？", a: "歡迎攜帶貓、狗及小型動物。乘車全程請務必將寵物置於符合規格的航空箱或便攜籠內。未攜帶合規寵物籠者，司機有權拒絕上車。" },
        // veh[3]
        { q: "團隊行程中，車輛可以幫我們單獨將行李運送到酒店嗎？", a: "可以，這是高爾夫球團及登山團的熱門服務。本公司先將您送至球場或登山起點，再由專屬車輛將行李（如高爾夫球包、重型登山包等）先行送往入住酒店。此服務僅限本團簽約客人的行李，不接受無乘客隨行的純商業貨運。" },
        // veh[4]
        { q: "司機會穿著正式、配戴領帶嗎？", a: "是的，每次行程均不例外。深色西裝配領帶是本公司的固定標準，而非可選升級。這正是持牌包車服務與計程車或網約車的分別所在。" },
        // veh[5]
        { q: "司機會保護乘客的隱私和保密性嗎？", a: "是的。司機在嚴格保密義務下提供服務，不錄音、不共享乘客資訊或車內對話內容。您的隱私受到絕對保護。" },
        // veh[6]
        { q: "可以在車內給手機充電嗎？", a: "可以。車內配備USB-A及USB-C充電接口，並免費提供兼容iPhone及Android的充電線。" },
      ],
    },
    {
      group: "💴 費用與支付相關",
      items: [
        // pay[0]
        { q: "司機接機等待會產生超時費嗎？（如航班延誤）", a: "航班落地後首90分鐘免費等候，無附加費用。超過90分鐘後，每30分鐘收取超時費（不足30分鐘按30分鐘計）：\n豐田埃爾法： 每30分鐘 2,500日元（含稅）\n豐田海獅： 每30分鐘 3,000日元（含稅）\n因航班延誤所致的等候時間一律免費。" },
        // pay[1]
        { q: "萬一乘客在行程中臨時需要修改路線或增加用車時間怎麼辦？", a: "請立即告知司機。司機將確認能否配合，並在繼續行程前告知任何追加費用（過路費、時間溢價、停車費等）。當天臨時延長視車輛供應情況而定，未必能保證。" },
        // pay[2]
        { q: "過路費、停車費、燃油費及所有相關費用都包含在報價內嗎？", a: "是的。一個價格包含一切——過路費、停車費、燃油費及司機住宿費（跨夜行程）。所有費用在預訂時確認並固定，無任何隱藏收費。唯一例外是行程開始後要求更改路線。" },
        // pay[3]
        { q: "兒童安全座椅和機場舉牌接機怎麼收費？", a: "兩項均免費。兒童安全座椅提供嬰兒、幼童及學童款式，兼容ISOFIX。機場到達大廳舉牌接機亦包含在內。請在預訂時提前申請。" },
        // pay[4]
        { q: "支付方式是什麼？可以在車內直接付款給司機嗎？", a: "提供三種方式：車內現金付款、信用卡（行程後透過Stripe自動扣款，接受主要信用卡），以及企業客戶銀行轉帳。" },
        // pay[5]
        { q: "行程結束後是否有發票或收據？", a: "有。信用卡付款客戶於行程後自動收到PDF電子收據（適用於商務報銷）。現金付款客戶可按需索取。" },
      ],
    },
    {
      group: "❌ 取消政策",
      items: [
        // can[0]
        { q: "取消訂單如何收費？", a: "訂單取消政策嚴格遵循日本《特定商業交易法》公示條款執行：\n用車時間前 48 小時以上取消： 免費（全額退款）\n用車時間前 24 至 48 小時內取消： 收取預計行程總額的 50%\n用車時間前 24 小時內取消或無故未到： 收取預計行程總額的 100%\n如因颱風、航班突發停飛等不可抗力導致無法出行，在您提供航司憑證並及時通知本公司的前提下，將免收取消手續費。" },
      ],
    },
  ],
};

export const GROUP_NAMES: Record<Lang, [string,string,string,string,string,string]> = {
  en: ["Before You Book", "Rates & Payment", "Vehicles & Luggage", "Booking & Cancellation", "At the Airport", "Special Requests"],
  ja: ["ご予約前に", "料金・お支払い", "車両・手荷物", "ご予約・キャンセル", "空港でのお出迎え", "特別なご要望"],
  zh: ["預訂前須知", "費用與支付", "車輛與行李", "預訂與取消", "機場接送", "特殊需求"],
};

const EXTRA_ITEMS: { g: 0|1|2|3|4|5; q: Record<Lang,string>; a: Record<Lang,string> }[] = [
  /* ── Before You Book ── */
  {
    g: 0,
    q: { en: "Do your drivers speak English?", ja: "乗務員は英語を話せますか？", zh: "司機會說英語嗎？" },
    a: {
      en: "Yes. All bookings and pre-trip communication are handled in English. Chauffeurs manage everyday directions and requests in English — you will never need to speak Japanese.",
      ja: "はい。すべての予約および出発前のご連絡は英語で対応しております。乗務員は日常的な道案内やご要望を英語でお応えできます——日本語を話す必要は一切ございません。",
      zh: "是的。所有預訂及行程前溝通均以英語處理。司機能以英語應對日常指示及需求——您無需說任何日語。",
    },
  },
  {
    g: 0,
    q: { en: "Do you operate 24/7?", ja: "24時間対応していますか？", zh: "是否24小時服務？" },
    a: {
      en: "Yes. We operate around the clock — including public holidays — with no late-night or early-morning surcharge. All prices are the same regardless of departure time.",
      ja: "はい。祝日を含む24時間365日対応しており、深夜・早朝の割増料金は一切ございません。出発時間に関わらず料金は同一です。",
      zh: "是的。本公司全年無休（包括公眾假期）、24小時服務，深夜及清晨均無附加費用，價格不因時段而改變。",
    },
  },
  {
    g: 0,
    q: { en: "How do I make a booking?", ja: "予約はどのようにすればよいですか？", zh: "如何預訂服務？" },
    a: {
      en: "Book via our website form, WhatsApp, or email at info@octoshell.jp — provide your pickup address, date, time, and passenger count. We confirm within a few hours. Book at least 48 hours in advance to guarantee availability.",
      ja: "ウェブサイトの予約フォーム、WhatsApp、またはメール（info@octoshell.jp）よりご予約いただけます。お迎え場所・日時・人数をお知らせください。数時間以内に確認のご連絡を差し上げます。車両確保のため、48時間前までのご予約を推奨しております。",
      zh: "可透過本網站預訂表格、WhatsApp或電郵（info@octoshell.jp）預訂——請提供接送地址、日期、時間及乘客人數。本公司將於數小時內確認。建議至少提前48小時預訂以確保車輛供應。",
    },
  },
  {
    g: 0,
    q: { en: "Which vehicle should I choose for my group?", ja: "グループに合う車両はどれですか？", zh: "我應該為團體選擇哪款車型？" },
    a: {
      en: "Toyota Alphard: best for 1–4 passengers with standard luggage. Toyota Hiace: best for 5–9 passengers, large groups, golf trips, or heavy luggage. If you are unsure, tell us your group size and luggage and we will recommend.",
      ja: "アルファードは標準的な荷物をお持ちの1〜4名様に最適です。ハイエースは5〜9名様、大人数グループ、ゴルフ旅行、または大型荷物をお持ちの方に最適です。ご不明な場合は、グループの人数と荷物の詳細をお知らせいただければ、最適な車両をご提案いたします。",
      zh: "豐田埃爾法適合1至4人、攜帶標準行李的旅客。豐田海獅適合5至9人、大型團體、高爾夫旅行或行李較多的旅客。如有疑問，請告知人數及行李情況，本公司將為您推薦最合適的車型。",
    },
  },
  {
    g: 0,
    q: { en: "Are your vehicles and chauffeurs fully licensed?", ja: "車両と乗務員は正式な許可・認可を受けていますか？", zh: "您的車輛和司機是否持有合規牌照？" },
    a: {
      en: "Yes. All vehicles operate under a green-plate commercial licence issued by the Japanese government (特定旅客自動車運送事業), and are fully insured. Every chauffeur holds a valid hire-car driver's licence under Japanese law.",
      ja: "はい。弊社の全車両は、日本国土交通省より認可を受けた緑ナンバー（特定旅客自動車運送事業）で運行しており、すべて完全に保険加入済みです。全乗務員は、日本の法律に基づく有効な旅客運送免許を保有しております。",
      zh: "是的。本公司所有車輛均持有日本政府頒發的綠色車牌（特定旅客自動車運送事業）合規運營，並已全面投保。所有司機均依照日本法規持有有效的旅客運輸執照。",
    },
  },
  {
    g: 0,
    q: { en: "Do you offer corporate accounts or business invoicing?", ja: "法人契約や請求書払いに対応していますか？", zh: "是否提供企業帳戶或公司對公結算？" },
    a: {
      en: "Yes. Corporate clients receive consolidated monthly invoicing via bank transfer, priority booking support, and a dedicated contact. Email info@octoshell.jp to set up an account.",
      ja: "はい。法人のお客様は、銀行振込による月次一括請求書払い、優先予約サポート、専任担当者によるご対応が可能です。法人契約のお申し込みはinfo@octoshell.jpまでお問い合わせください。",
      zh: "是的。企業客戶享有銀行轉帳月結發票、優先預訂支援及專屬聯絡人服務。如需開立企業帳戶，請聯絡 info@octoshell.jp。",
    },
  },

  /* ── Rates & Payment ── */
  {
    g: 1,
    q: { en: "Is tipping required?", ja: "チップは必要ですか？", zh: "需要給小費嗎？" },
    a: {
      en: "No. Tipping is not customary in Japan and is never expected by our chauffeurs. A kind word or an online review is the best way to show your appreciation.",
      ja: "不要です。チップは日本では一般的な慣習ではなく、乗務員が期待することもございません。温かいお言葉やオンラインレビューが最大の励みになります。",
      zh: "不需要。日本沒有給小費的習慣，本公司的司機也從不期待。若您滿意服務，留下評價或一句好評是最好的回饋。",
    },
  },

  /* ── Vehicles & Luggage ── */
  {
    g: 2,
    q: { en: "How much luggage can I bring?", ja: "荷物はどのくらい積めますか？", zh: "可以帶多少行李？" },
    a: {
      en: "Alphard: up to 6 passengers and 5 large suitcases (or up to 10 with fewer passengers). Hiace: up to 9 passengers and 9 large suitcases (or up to 15 with fewer passengers). Oversized items — golf bags, strollers, ski equipment — must be declared at booking.",
      ja: "アルファード：最大6名様・大型スーツケース5個（少人数の場合は最大10個）。ハイエース：最大9名様・大型スーツケース9個（少人数の場合は最大15個）。ゴルフバッグ・ベビーカー・スキー用品などの大型荷物は必ず事前にお申し出ください。",
      zh: "埃爾法：最多6人及5件大型行李箱（人數較少時最多10件）。海獅：最多9人及9件大型行李箱（人數較少時最多15件）。高爾夫球包、嬰兒車、滑雪器材等特大行李必須在預訂時申報。",
    },
  },
  {
    g: 2,
    q: { en: "Do you accommodate wheelchair users?", ja: "車椅子の方も利用できますか？", zh: "可以乘坐輪椅嗎？" },
    a: {
      en: "Yes. Please notify us at booking with the wheelchair type (foldable / electric / dimensions). The Toyota Hiace is recommended for larger or electric wheelchairs.",
      ja: "はい。ご予約の際に車椅子の種類（折りたたみ式・電動式・サイズ）をお知らせください。大型・電動車椅子の場合はトヨタ・ハイエースをお勧めしております。",
      zh: "可以。預訂時請告知輪椅類型（折疊式／電動式／尺寸）。較大型或電動輪椅建議選擇豐田海獅。",
    },
  },

  /* ── Booking & Cancellation ── */
  {
    g: 3,
    q: { en: "How will I receive my booking confirmation?", ja: "予約確認はどのように受け取れますか？", zh: "預訂確認如何接收？" },
    a: {
      en: "An email confirmation is sent immediately after booking, including your booking reference, pickup details, and vehicle type. We also send WhatsApp updates before your journey — including your chauffeur's name, contact number, and a reminder 24 hours before pickup.",
      ja: "ご予約確定後すぐに、予約番号・お迎え場所・車種を含む確認メールをお送りします。また、出発前にWhatsAppにてご案内をお届けします——乗務員のお名前・ご連絡先、および出発24時間前のリマインダーを含みます。",
      zh: "預訂確認後，確認電郵即時發送，包含預訂編號、接送詳情及車型資訊。此外，行程前本公司會透過WhatsApp提供更新——包括司機姓名、聯絡電話及出發前24小時提醒。",
    },
  },
  {
    g: 3,
    q: { en: "Can I request multiple stops?", ja: "複数の立ち寄り先を追加できますか？", zh: "可以安排多個停靠點嗎？" },
    a: {
      en: "Yes. List all stops at booking. Common examples: airport → hotel → clinic, or multi-district sightseeing across Tokyo. Any routing surcharges are confirmed before your trip — no surprises.",
      ja: "はい。ご予約時にすべての立ち寄り先をご記入ください。よくある例：空港→ホテル→病院、または東京都内の複数エリアでの観光。ルートによる追加料金は出発前にご確認いたします。",
      zh: "可以。請在預訂時列明所有停靠地點。常見例子：機場→酒店→診所，或東京多區觀光。任何路線附加費均在行程前確認，不會有意外費用。",
    },
  },
  {
    g: 3,
    q: { en: "Do you offer hourly charter?", ja: "時間制貸切はできますか？", zh: "可以按小時包車嗎？" },
    a: {
      en: "Yes, from 4 hours minimum. Tolls, parking, and fuel included. Popular for Ginza shopping, multi-stop Tokyo sightseeing, and corporate visits. Advance booking required — same-day availability not guaranteed.",
      ja: "はい。最低4時間からご利用いただけます。通行料・駐車場代・燃料費込み。銀座でのショッピング、都内複数エリアの観光、企業訪問などに最適です。事前予約推奨。当日ご予約はご対応できない場合があります。",
      zh: "是的，最少4小時起。過路費、停車費及燃油費已包含。適合銀座購物、東京多點觀光及企業拜訪。建議提前預訂，當天預約未必有車。",
    },
  },

  /* ── At the Airport ── */
  {
    g: 4,
    q: { en: "Where exactly will the driver meet me?", ja: "空港でどこで待っていてもらえますか？", zh: "司機在機場哪裡等候？" },
    a: {
      en: "In the arrivals hall, past customs and baggage claim. Your chauffeur holds a name board. If you cannot find them, call or WhatsApp the number in your booking confirmation — do not exit the terminal first.",
      ja: "到着ロビー（入国審査・手荷物受け取り後）にてお待ちしております。乗務員がネームプレートをお持ちしております。見つからない場合は、予約確認に記載された番号にお電話またはWhatsAppでご連絡ください——建物の外へ出る前に必ずご確認ください。",
      zh: "在到達大廳（通關及取行李後）等候。司機將手持接機牌。若找不到司機，請撥打或WhatsApp預訂確認中的聯絡號碼——請勿在聯繫上司機前離開航站樓。",
    },
  },
  {
    g: 4,
    q: { en: "How long does it take from Narita Airport to Tokyo?", ja: "成田空港から東京市内まで何分かかりますか？", zh: "從成田機場到東京市區需要多久？" },
    a: {
      en: "Typically 50–70 minutes (approx. 65 km via expressway). Allow up to 90 minutes during peak hours. We monitor real-time traffic and reroute when needed.",
      ja: "通常50〜70分（高速道路経由で約65km）です。ラッシュアワー時は最大90分ほどお見込みください。リアルタイムの交通情報を確認し、必要に応じてルートを変更いたします。",
      zh: "通常約50至70分鐘（經高速公路約65公里）。尖峰時段請預留最多90分鐘。本公司即時監察交通狀況，如有需要會調整路線。",
    },
  },
  {
    g: 4,
    q: { en: "How long does it take from Haneda Airport to Tokyo?", ja: "羽田空港から東京市内まで何分かかりますか？", zh: "從羽田機場到東京市區需要多久？" },
    a: {
      en: "Typically 30–45 minutes (approx. 20 km via expressway). Allow up to 60 minutes during heavy traffic.",
      ja: "通常30〜45分（高速道路経由で約20km）です。交通渋滞時は最大60分ほどお見込みください。",
      zh: "通常約30至45分鐘（經高速公路約20公里）。交通繁忙時請預留最多60分鐘。",
    },
  },
  {
    g: 4,
    q: { en: "How long will the driver wait after landing?", ja: "着陸後どのくらい待ってもらえますか？", zh: "落地後司機會等多久？" },
    a: {
      en: "Your chauffeur waits in the arrivals hall until you appear. We track your flight in real time, so they know exactly when you land. You have 90 minutes after touchdown to clear customs and collect your bags — at no extra charge. Take your time.",
      ja: "乗務員は到着ロビーでお客様が現れるまでお待ちしております。フライトをリアルタイムで追跡しているため、着陸時間は把握済みです。着陸後90分間は追加料金なしで、通関・手荷物受け取りにゆっくりお使いください。",
      zh: "司機在到達大廳等您出現。本公司即時追蹤您的航班，完全掌握您的落地時間。落地後90分鐘內無附加費用，讓您從容完成通關及取行李。",
    },
  },
  {
    g: 4,
    q: { en: "Should I exchange my JR Pass at the airport?", ja: "JRパスは空港で交換すべきですか？", zh: "我應該在機場兌換JR Pass嗎？" },
    a: {
      en: "We recommend exchanging at major Tokyo stations (Tokyo, Shinjuku, Shibuya) where queues are minimal. Airport counters can have 1–2 hour waits. Your driver can take you to a station counter after drop-off if needed.",
      ja: "東京・新宿・渋谷など都内の主要駅での交換をお勧めします。空港のカウンターは1〜2時間待ちになる場合があります。ご希望であれば、お送りの後に駅のカウンターへご案内することも可能です。",
      zh: "建議在東京、新宿、澀谷等主要車站兌換，等候時間極短。機場兌換窗口可能需排隊1至2小時。若有需要，司機可在送達後帶您前往車站窗口。",
    },
  },

  /* ── Special Requests ── */
  {
    g: 5,
    q: { en: "Do you pick up from hotels, private residences, or Airbnb?", ja: "ホテルや個人宅・Airbnbへの送迎はできますか？", zh: "可以從酒店、民宅或Airbnb接送嗎？" },
    a: {
      en: "Yes — hotels, homes, Airbnb, offices, and cruise terminals across Tokyo, Yokohama, Kawasaki, Chiba, and Saitama. For destinations outside Greater Tokyo (Hakone, Nikko, Karuizawa), contact us for a quote.",
      ja: "はい。東京・横浜・川崎・千葉・埼玉のホテル・個人宅・Airbnb・オフィス・クルーズターミナル等、広域首都圏全域に対応しております。箱根・日光・軽井沢など首都圏外のご目的地はお見積もりをお問い合わせください。",
      zh: "是的——東京、橫濱、川崎、千葉及埼玉的酒店、民宅、Airbnb、辦公室及郵輪碼頭均可接送。大東京以外的目的地（箱根、日光、輕井澤等），請聯絡我們索取報價。",
    },
  },
  {
    g: 5,
    q: { en: "Do you serve Yokohama cruise terminals?", ja: "横浜のクルーズターミナルも対応していますか？", zh: "可以接送橫濱郵輪碼頭嗎？" },
    a: {
      en: "Yes. We serve Osanbashi Pier and Daikoku Pier — approximately 30 minutes from central Tokyo. Please include your vessel name and arrival/departure time when booking.",
      ja: "はい。大さん橋ふ頭および大黒ふ頭に対応しております（東京都心から約30分）。ご予約の際は船名と入出港時間をお知らせください。",
      zh: "是的。本公司服務大棧橋碼頭及大黑碼頭（距東京市中心約30分鐘）。預訂時請提供船名及到港／離港時間。",
    },
  },
  {
    g: 5,
    q: { en: "Do you go to Tokyo Disney Resort?", ja: "東京ディズニーリゾートへの送迎はできますか？", zh: "可以接送東京迪士尼樂園嗎？" },
    a: {
      en: "Yes — both Tokyo Disneyland and Tokyo DisneySea. Approximately 30–40 minutes from central Tokyo. Book at least 48 hours ahead during peak seasons and school holidays.",
      ja: "はい。東京ディズニーランド・東京ディズニーシーの両入口に対応しております。東京都心から約30〜40分です。繁忙期や学校の休暇期間は48時間前までのご予約をお勧めします。",
      zh: "是的——東京迪士尼樂園及東京迪士尼海洋均可。距東京市中心約30至40分鐘。旺季及學校假期請至少提前48小時預訂。",
    },
  },
  {
    g: 5,
    q: { en: "Do you provide long-distance transfers across Japan?", ja: "日本全国への長距離送迎はできますか？", zh: "可以提供日本全國長途接送嗎？" },
    a: {
      en: "Yes. We operate across Japan — Mt. Fuji, Hakone, Nikko, Karuizawa, ski resorts in Nagano and Niigata, and beyond. Same-day and multi-day itineraries available. Contact us for a quote on any destination.",
      ja: "はい。富士山・箱根・日光・軽井沢・長野や新潟のスキーリゾートなど、日本全国に対応しております。日帰り・複数日程のご旅程も承ります。ご希望の目的地へのお見積もりはお気軽にお問い合わせください。",
      zh: "是的。本公司覆蓋全日本，包括富士山、箱根、日光、輕井澤、長野及新潟滑雪勝地等。可安排當天或多日行程。任何目的地均可詢價。",
    },
  },
  {
    g: 5,
    q: { en: "What if I leave something in the car?", ja: "車内に忘れ物をした場合は？", zh: "如果在車上遺留物品怎麼辦？" },
    a: {
      en: "Contact us immediately at info@octoshell.jp. We check with the chauffeur right away. If found, we arrange return shipping at the client's expense. Items are held for 30 days.",
      ja: "速やかにinfo@octoshell.jpまでご連絡ください。すぐに乗務員に確認いたします。お忘れ物が見つかり次第、送料お客様負担にてご返送の手配をいたします。お忘れ物は30日間お預かりいたします。",
      zh: "請立即聯絡 info@octoshell.jp。本公司即時向司機查詢。若找到遺失物，將安排寄回，郵費由客人承擔。物品保存30日。",
    },
  },
];

export function buildFAQ(): Record<Lang, FaqGroup[]> {
  const result = {} as Record<Lang, FaqGroup[]>;
  (["en", "ja", "zh"] as Lang[]).forEach((lang) => {
    const veh = FAQ_BASE[lang][0].items;
    const pay = FAQ_BASE[lang][1].items;
    const can = FAQ_BASE[lang][2].items;
    const n   = GROUP_NAMES[lang];
    const base: FaqGroup[] = [
      { group: n[0], items: [veh[4], veh[5]] },
      { group: n[1], items: [pay[2], pay[4], pay[5]] },
      { group: n[2], items: [veh[0], veh[1], veh[6], pay[3]] },
      { group: n[3], items: [can[0], pay[1]] },
      { group: n[4], items: [pay[0]] },
      { group: n[5], items: [veh[2], veh[3]] },
    ];
    EXTRA_ITEMS.forEach(({ g, q, a }) => {
      base[g].items.push({ q: q[lang], a: a[lang] });
    });
    result[lang] = base;
  });
  return result;
}

export const FAQ_GROUPED = buildFAQ();

/** Flat list of all EN Q&As — used for FAQPage JSON-LD schema */
export const FAQ_FLAT_EN: FaqItem[] = FAQ_GROUPED.en.flatMap((g) => g.items);
