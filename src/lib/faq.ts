import type { Lang } from "@/lib/translations";

export type FaqItem  = { q: string; a: string };
export type FaqGroup = { group: string; items: FaqItem[] };

/* ── Base FAQ ─────────────────────────────────────────────────────────── */
const FAQ_BASE: Record<Lang, FaqGroup[]> = {
  ja: [
    {
      group: "🚗 車両・車内規則について",
      items: [
        { q: "どのような車が配車されますか。", a: "弊社では、最高級ミニバンの「トヨタ・アルファード（最大5名様）」および大型ビジネスバンの「トヨタ・ハイエース（最大9名様）」の2車種を専門に手配しております。セダンタイプ等の配車はございません。" },
        { q: "車内での喫煙や飲食はできますか。", a: "全車両完全禁煙（電子タバコ含む）とさせていただいております。お食事に関しては、臭いの残らない軽食やペットボトル等の蓋付きの飲料（ミネラルウォーター等）に限り、車内でお召し上がりいただけます。" },
        { q: "ペット同伴での利用はできますか。", a: "はい、可能です。ペットと同乗される際は、必ず予めケージ（クレート）に入れていただきますようお願い申し上げます。ケージをお持ちでない場合、ご乗車をお断りする場合がございます。" },
        { q: "荷物のみを先行して運んでもらうことはできますか。", a: "はい、可能です。弊社では高ルゴルフツアーやトレッキング（登山）ツアーを数多く承っております。お客様をまずゴルフ場や登山口にお送りした後、お荷物（ゴルフバッグや大型バックパック等）のみをそのまま車両でお預かりし、先回りでご宿泊先のホテルへ運搬・搬入することが可能です。ただし、完全な無人の貨物輸送は法律上お受けできませんので、原則としてツアーご契約者様のお荷物に限らせていただきます。" },
        { q: "乗務員はスーツ・ネクタイ姿で対応してもらえますか？", a: "はい、弊社の乗務員は常にスーツとネクタイを着用し、最高水準のフォーマルな身だしなみでハイヤーならではの洗練されたお迎えをいたします。" },
        { q: "乗務員はお客様のプライバシーと機密を守ってくれますか？", a: "はい、お客様のプライバシーと機密保持は最優先事項です。乗務員は厳格な守秘義務を遵守しており、車内でのご会話や情報が外部に漏れることは一切ございません。安心してご利用ください。" },
        { q: "車内でスマートフォンの充電はできますか？", a: "はい、可能です。車両には充電用ポートが装備されており、アイフォンおよびアンドロイド端末に対応した充電ケーブルを無料でご用意しております。" },
      ],
    },
    {
      group: "💴 料金・お支払いについて",
      items: [
        { q: "待機料金（飛行機の遅延等）は発生しますか。", a: "担当乗務員がお客様の航空便の運航状況を追跡し、実際の着陸時間に合わせてお迎え時間を調整いたします。実際の着陸時刻から90分を超過して待機が発生した場合、以下の通り30分毎に超過待機料金が発生いたします（30分未満は30分に切り上げ）。\nアルファード： 30分毎に 2,500円（税込）\nハイエース： 30分毎に 3,000円（税込）" },
        { q: "万が一、運行中にルートの変更や利用時間の延長が必要になった場合はどうすればよいですか？", a: "速やかに乗務員にお申し付けください。乗務員がすぐに配車センターと連絡を取り、追加料金を確認いたします。突発的なルート変更や時間延長によって新たに発生した高速道路料金、有料道路料金、回送通行料、駐車場料金、乗務員宿泊費、および時間延長割増料金は最終決済時に合算されます。弊社のハイヤーサービスは完全予約制で運行しているため、当日の予約状況によっては突発的な変更や延長のご要望にお応えできない場合もございますので、予めご了承ください。" },
        { q: "通行料・駐車場代・燃料費・宿泊費など、すべて料金に含まれますか？", a: "はい。1つの料金にすべて含まれています——高速道路料金・駐車場代・燃料費・宿泊費（泊まりがけの場合）。追加請求は一切ありません。ただし、出発後にルートを変更した場合のみ追加料金が発生する場合があります。" },
        { q: "チャイルドシートや空港ミートアップ（ネームボード）は有料ですか。", a: "いいえ、すべて無料（0円）でご提供しております。チャイルドシート（ジュニアシート）の手配、および空港到着ロビーでのネームボード掲示（ミート＆グリート）をご希望の際は、車両手配の都合上、お早めにオペレーターまでお申し出ください。" },
        { q: "支払手段は何ですか？車内でドライバーに直接支払うことはできますか？", a: "車内での現金決済に対応しているほか、運行前にクレジットカードをご登録いただければ、運行終了後に弊社のオンライン決済システム（ストライプ）を通じて自動的に決済を完了させることも可能です。クレジットカードをお持ちでない法人のお客様は、事前の銀行振込をお申し出ください。" },
        { q: "領収書は発行されますか。", a: "はい、クレジットカード決済のお客様には、サービス利用終了後、決済システムよりご登録のメールアドレス宛てへ電子領収書（電子媒体の書面）を自動送付いたします。現金決済のお客様には、ご希望に応じて電子媒体の領収書または請求書を発行いたします。" },
      ],
    },
    {
      group: "❌ キャンセルポリシー",
      items: [
        { q: "取消料（キャンセル料）はいつから発生しますか。", a: "ご予約確定後のキャンセルにつきましては、特定商取引法に基づく表記に則り、以下の通りキャンセル料を申し受けます。\n配車日の48時間前まで： 無料（全額返金）\n配車日の24時間前〜48時間前まで： お見積り金額の 50%\n配車日の24時間以内、または無断キャンセル： お見積り金額の 100%\n※航空便の欠航など不可抗力による場合は、速やかにお知らせいただくことでキャンセル料は免除となります。" },
      ],
    },
  ],
  en: [
    {
      group: "🚗 Vehicles & In-Car Rules",
      items: [
        { q: "What kind of vehicles will be deployed?", a: "Toyota Alphard (up to 5 passengers) or Toyota Hiace (up to 9 passengers). No standard sedans." },
        { q: "Is smoking, eating, or drinking allowed inside the vehicle?", a: "No smoking (including e-cigarettes). Drinks in sealed bottles are fine. Light snacks with no strong smell are OK." },
        { q: "Can I travel with my pets?", a: "Yes, pets are welcome but must be kept inside a secure pet carrier/crate throughout the journey. Passengers without a proper carrier may be refused boarding." },
        { q: "Can you transport our luggage separately during our tour?", a: "Yes. We drop you off at your activity (golf course, hiking trail, etc.) and deliver your bags to your hotel ahead of you. Note: we can only carry luggage for passengers booked on our service — not standalone cargo." },
        { q: "Will my chauffeur wear a suit and tie?", a: "Yes. Every chauffeur wears a formal suit and tie for every trip." },
        { q: "Do the chauffeurs keep conversations private?", a: "Yes. Everything said in the car stays in the car. Our chauffeurs never share passenger information." },
        { q: "Can I charge my phone in the vehicle?", a: "Yes. USB ports are available, and free charging cables for iPhone and Android are provided." },
      ],
    },
    {
      group: "💴 Rates & Payments",
      items: [
        { q: "Do you charge for waiting time (e.g., flight delays)?", a: "The first 90 minutes after landing are free. After that: Alphard ¥2,500 / Hiace ¥3,000 per 30 minutes. Flight delays are always free — you only pay if the wait is caused by personal activities." },
        { q: "Can I change the route or add time during the trip?", a: "Tell your chauffeur right away — extra charges will apply, and same-day changes may not always be possible." },
        { q: "Are tolls, parking, fuel, and all fees included in the price?", a: "Yes. One price covers everything — tolls, parking, fuel, and overnight accommodation for the driver. No hidden fees. Route changes after the trip starts may add costs." },
        { q: "Are child seats and Airport Meet & Greet services extra?", a: "Both are free. Please request them when booking so we can prepare in advance." },
        { q: "How can I pay?", a: "Three options: cash in the car, credit card (charged automatically after the trip via Stripe), or bank transfer for corporate clients." },
        { q: "Will I receive a receipt?", a: "Yes. Credit card: PDF receipt sent to your email automatically after the trip. Cash: receipt available on request." },
      ],
    },
    {
      group: "❌ Cancellation Policy",
      items: [
        { q: "What is your cancellation policy?", a: "Cancellations are governed by our official Legal Notice under the Specified Commercial Transactions Act:\nUp to 48 hours before pickup: Free of charge (100% Refund)\nBetween 24 to 48 hours before pickup: 50% of the estimated quote\nWithin 24 hours or No-Show: 100% of the estimated quote\nNote: Cancellation fees are waived if your flight is officially canceled by the airline, provided you notify us immediately." },
      ],
    },
  ],
  zh: [
    {
      group: "🚗 車輛及車內守則",
      items: [
        { q: "預訂後會派發什麼樣的車輛？", a: "本公司專注於高端禮賓包車服務，旗下車隊僅由豪華商務車「豐田埃爾法（最大載客5人）」及大容量商旅車「豐田海獅（最大載客9人）」組成。本公司不提供普通轎車車型。" },
        { q: "車內可以吸煙或飲食嗎？", a: "專屬車廂內全面禁煙（包括電子煙）。為了保證乘車舒適度，車內僅允許飲用瓶裝水或帶蓋飲料，並允許食用無刺激性氣味的輕食點心。" },
        { q: "可以攜帶寵物一同乘車嗎？", a: "可以。為了保障行車安全，攜帶寵物乘車時請務必提前將其放入寵物航空箱或便攜籠內。若未攜帶合規寵物籠，司機有權拒絕其上車，敬請諒解。" },
        { q: "團隊行程中，車輛可以幫我們單獨將行李運送到酒店嗎？", a: "可以，這正是本公司高爾夫球團和徒步登山團的核心特色服務。本公司可以先將您送至高爾夫球場或登山起點，隨後由專屬車輛將您的行李（如高爾夫球包、重型登山包等）先行送往您今晚入住的酒店並辦理寄存，讓您全程輕鬆出行。需要注意的是，基於日本法規，本公司僅提供本團簽約客人的隨行行李分流運送，不接受無乘客隨行的純商業貨運。" },
        { q: "司機會穿著正式、配戴領帶嗎？", a: "是的，本公司的司機始終穿著正式的西裝並配戴領帶，保持最高標準的專業儀表。" },
        { q: "司機會保護乘客的隱私和保密性嗎？", a: "是的。保護您的隱私和機密是本公司的重中之重。本公司的司機遵循最嚴格的保密標準，確保您的私密對話和行程信息在任何時候都絕對安全。" },
        { q: "可以在車內給手機充電嗎？", a: "可以。本公司的車輛均配有充電接口，並免費提供兼容蘋果和安卓設備的車載充電線。" },
      ],
    },
    {
      group: "💴 費用與支付相關",
      items: [
        { q: "司機接機等待會產生超時費嗎？（如航班延誤）", a: "擔當司機會主動追蹤您的航班動態，並根據航班實際落地時間靈活調整接機時間。若在航班實際著陸後，等待時間超過90分鐘，將按每30分鐘為單位收取超時等待費（不足30分鐘按30分鐘計）：\n豐田埃爾法： 每30分鐘加收 2,500 日元（含稅）\n豐田海獅： 每30分鐘加收 3,000 日元（含稅）" },
        { q: "萬一乘客在行程中臨時需要修改路線或增加用車時間怎麼辦？", a: "請立即與司機溝通，司機會馬上與調度中心取得聯繫並確認追加費用。因乘客臨時變更路線或超時而全新產生的高速公路費、收費道路費、回送通行費、停車場費、司機住宿費以及時間延長溢價費用，將據實累加至您的最終賬單中。由於本公司的包車服務均為提前排單預約制，請諒解當天的實際預約情況可能會有無法滿足您臨時需求的情況發生。" },
        { q: "過路費、停車費、燃油費及所有相關費用都包含在報價內嗎？", a: "是的。一個價格包含一切——過路費、停車費、燃油費及司機住宿費（跨夜行程）。無任何隱藏收費。唯一可能產生追加費用的情況，是行程開始後您要求更改路線。" },
        { q: "兒童安全座椅和機場舉牌接機怎麼收費？", a: "完全免費。本公司免費提供兒童安全座椅，並免費提供到達大廳舉牌接機服務。為了便於提前調度，請在預訂時儘早向客服提出申請。" },
        { q: "支付方式是什麼？可以在車內直接付款給司機嗎？", a: "本公司支持車內現金結帳，也可以在行程前綁定信用卡，行程結束後通過線上支付系統（Stripe）自動完成扣款。企業法人客戶如無信用卡，可申請提前進行銀行轉帳。" },
        { q: "行程結束後是否有發票或收據？", a: "有。使用信用卡支付的客戶，行程結束扣款完成後，系統會自動將電子收據發送至您註冊的電子郵箱。使用現金結帳的客戶，本公司將根據您的需求，在行程結束後提供電子收據或請款單。" },
      ],
    },
    {
      group: "❌ 取消政策",
      items: [
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
    a: { en: "Yes. All bookings are fully supported in English. Our drivers have working English for day-to-day communication. For complex conversations we use translation tools to assist.", ja: "はい。すべての予約は英語で対応しております。乗務員は日常会話程度の英語を使用できます。複雑なご要望の際は翻訳ツールを活用してサポートいたします。", zh: "是的。本公司全程提供英文預訂支援。司機具備日常英語溝通能力，如有複雜需求，亦會借助翻譯工具協助。" },
  },
  {
    g: 0,
    q: { en: "Do you operate 24/7?", ja: "24時間対応していますか？", zh: "是否24小時服務？" },
    a: { en: "Yes. We operate around the clock with no late-night or early-morning surcharge. All prices are the same regardless of departure time.", ja: "はい。24時間365日対応しており、深夜・早朝の割増料金は一切ございません。出発時間に関わらず料金は同一です。", zh: "是的。本公司全年無休、24小時服務，深夜及清晨均無附加費用，價格不因時段而改變。" },
  },
  {
    g: 0,
    q: { en: "How do I make a booking?", ja: "予約はどのようにすればよいですか？", zh: "如何預訂服務？" },
    a: { en: "Book via our website booking form, WhatsApp, or email at info@octoshell.jp. We confirm your booking within a few hours. We recommend booking at least 48 hours in advance to guarantee availability.", ja: "ウェブサイトの予約フォーム、WhatsApp、またはメール（info@octoshell.jp）よりご予約いただけます。数時間以内に確認のご連絡を差し上げます。車両の確保のため、48時間前までのご予約を推奨しております。", zh: "可透過本網站的預訂表格、WhatsApp或電郵（info@octoshell.jp）預訂。本公司將於數小時內確認您的預訂。建議至少提前48小時預訂以確保車輛供應。" },
  },
  {
    g: 0,
    q: { en: "Which vehicle should I choose for my group?", ja: "グループに合う車両はどれですか？", zh: "我應該為團體選擇哪款車型？" },
    a: { en: "Toyota Alphard: best for 1–4 passengers with standard luggage. Toyota Hiace: best for 5–9 passengers, large groups, golf trips, or heavy luggage. If you are unsure, tell us your group size and luggage and we will recommend.", ja: "アルファードは標準的な荷物をお持ちの1〜4名様に最適です。ハイエースは5〜9名様、大人数グループ、ゴルフ旅行、または大型荷物をお持ちの方に最適です。ご不明な場合は、グループの人数と荷物の詳細をお知らせいただければ、最適な車両をご提案いたします。", zh: "豐田埃爾法適合1至4人、攜帶標準行李的旅客。豐田海獅適合5至9人、大型團體、高爾夫旅行或行李較多的旅客。如有疑問，請告知人數及行李情況，本公司將為您推薦最合適的車型。" },
  },
  {
    g: 0,
    q: { en: "Are your vehicles and chauffeurs fully licensed?", ja: "車両と乗務員は正式な許可・認可を受けていますか？", zh: "您的車輛和司機是否持有合規牌照？" },
    a: { en: "Yes. All vehicles operate under a green-plate commercial licence issued by the Japanese government (特定旅客自動車運送事業). Every chauffeur holds a valid hire-car driver's licence under Japanese law.", ja: "はい。弊社の全車両は、日本国土交通省より認可を受けた緑ナンバー（特定旅客自動車運送事業）で運行しております。全乗務員は、日本の法律に基づく有効な旅客運送免許を保有しております。", zh: "是的。本公司所有車輛均持有日本政府頒發的綠色車牌（特定旅客自動車運送事業）合規運營。所有司機均依照日本法規持有有效的旅客運輸執照。" },
  },
  {
    g: 0,
    q: { en: "Do you offer corporate accounts or business invoicing?", ja: "法人契約や請求書払いに対応していますか？", zh: "是否提供企業帳戶或公司對公結算？" },
    a: { en: "Yes. Corporate clients can arrange consolidated monthly invoicing via bank transfer. Contact us at info@octoshell.jp to set up a corporate account.", ja: "はい。法人のお客様は、銀行振込による月次一括請求書払いのご契約が可能です。法人契約のお申し込みはinfo@octoshell.jpまでお気軽にお問い合わせください。", zh: "是的。企業客戶可安排銀行轉帳月結發票付款。如需開立企業帳戶，請聯絡 info@octoshell.jp。" },
  },

  /* ── Rates & Payment ── */
  {
    g: 1,
    q: { en: "Is tipping required?", ja: "チップは必要ですか？", zh: "需要給小費嗎？" },
    a: { en: "No. Tipping is not customary in Japan and is never expected by our chauffeurs. A kind word or an online review is the best way to show your appreciation.", ja: "不要です。チップは日本では一般的な慣習ではなく、乗務員が期待することもございません。温かいお言葉やオンラインレビューが最大の励みになります。", zh: "不需要。日本沒有給小費的習慣，本公司的司機也從不期待。若您滿意服務，留下評價或一句好評是最好的回饋。" },
  },

  /* ── Vehicles & Luggage ── */
  {
    g: 2,
    q: { en: "How much luggage can I bring?", ja: "荷物はどのくらい積めますか？", zh: "可以帶多少行李？" },
    a: { en: "Alphard: up to 4 passengers and 4 large suitcases. Hiace: up to 9 passengers and 6+ large suitcases. Please declare your exact luggage count when booking. Oversized items — golf bags, strollers, ski equipment — must be mentioned in advance.", ja: "アルファード：最大4名様・大型スーツケース4個。ハイエース：最大9名様・大型スーツケース6個以上。ご予約時に荷物の数を必ずお知らせください。ゴルフバッグ・ベビーカー・スキー用品などの大型荷物は必ず事前にお申し出ください。", zh: "埃爾法：最多4人及4件大型行李箱。海獅：最多9人及6件以上大型行李箱。預訂時請告知確切行李數量。高爾夫球包、嬰兒車、滑雪器材等特大行李必須提前說明。" },
  },
  {
    g: 2,
    q: { en: "Do you accommodate wheelchair users?", ja: "車椅子の方も利用できますか？", zh: "可以乘坐輪椅嗎？" },
    a: { en: "Yes. Please notify us at booking with the wheelchair type (foldable / electric / dimensions) so we can assign a suitable vehicle.", ja: "はい。ご予約の際に車椅子の種類（折りたたみ式・電動式・サイズ）をお知らせいただければ、適切な車両をご用意いたします。", zh: "可以。預訂時請告知輪椅類型（折疊式／電動式／尺寸），以便本公司安排合適的車輛。" },
  },

  /* ── Booking & Cancellation ── */
  {
    g: 3,
    q: { en: "How will I receive my booking confirmation?", ja: "予約確認はどのように受け取れますか？", zh: "預訂確認如何接收？" },
    a: { en: "An email confirmation is sent immediately after booking, including your booking reference, pickup details, and vehicle type. We also provide WhatsApp updates before your journey — including your chauffeur's name, contact number, and a pickup reminder.", ja: "ご予約確定後、すぐに確認メールをお送りします。予約番号・お迎え場所・車種などの詳細が含まれます。また、出発前にWhatsAppにてお迎え当日のご案内もお届けします——乗務員のお名前・ご連絡先・出発前のリマインダーを含みます。", zh: "預訂確認後，確認電郵將立即發送，包含預訂編號、接送詳情及車型資訊。此外，行程前我們亦會透過WhatsApp為您提供更新——包括司機姓名、聯絡電話及出發前提醒。" },
  },
  {
    g: 3,
    q: { en: "Can I request multiple stops?", ja: "複数の立ち寄り先を追加できますか？", zh: "可以安排多個停靠點嗎？" },
    a: { en: "Yes. Please list all stops in advance when booking. Additional charges may apply depending on routing.", ja: "はい。ご予約時に全ての立ち寄り先をご記入ください。ルートによっては追加料金が発生する場合があります。", zh: "可以。請在預訂時列明所有停靠地點。視乎路線，可能需要支付額外費用。" },
  },
  {
    g: 3,
    q: { en: "Do you offer hourly charter?", ja: "時間制貸切はできますか？", zh: "可以按小時包車嗎？" },
    a: { en: "Yes. Minimum 4 hours. Ideal for shopping, corporate meetings, and sightseeing. Book in advance — same-day bookings are not guaranteed.", ja: "はい。最低4時間からご利用いただけます。ショッピング・企業訪問・観光に最適です。事前予約推奨。当日ご予約はご対応できない場合があります。", zh: "是的。最少4小時起。適合購物、商務拜訪及觀光。建議提前預訂，當天預約未必有車。" },
  },

  /* ── At the Airport ── */
  {
    g: 4,
    q: { en: "Where exactly will the driver meet me?", ja: "空港でどこで待っていてもらえますか？", zh: "司機在機場哪裡等候？" },
    a: { en: "In the arrivals hall, after customs and baggage claim. Your chauffeur will be holding a name board with your name. Please do not exit the terminal before finding your driver.", ja: "到着ロビー（入国審査・手荷物受け取り後）にてお待ちしております。乗務員がお客様のお名前を掲げたネームプレートをお持ちしております。ドライバーを見つける前に建物の外へ出ないようご注意ください。", zh: "在到達大廳（通關及取行李後）等候。司機將手持寫有您姓名的接機牌。請在找到司機前勿離開航站樓。" },
  },
  {
    g: 4,
    q: { en: "How long does it take from Narita Airport to Tokyo?", ja: "成田空港から東京市内まで何分かかりますか？", zh: "從成田機場到東京市區需要多久？" },
    a: { en: "Typically 50–70 minutes. Allow up to 90 minutes during peak hours or if there is an accident on the expressway.", ja: "通常50〜70分程度です。ラッシュアワー時や高速道路での事故発生時は、最大90分ほどお見込みください。", zh: "通常約50至70分鐘。尖峰時段或高速公路發生事故時，請預留最多90分鐘。" },
  },
  {
    g: 4,
    q: { en: "How long does it take from Haneda Airport to Tokyo?", ja: "羽田空港から東京市内まで何分かかりますか？", zh: "從羽田機場到東京市區需要多久？" },
    a: { en: "Typically 30–45 minutes. Allow up to 60 minutes during heavy traffic.", ja: "通常30〜45分程度です。交通渋滞時は最大60分ほどお見込みください。", zh: "通常約30至45分鐘。交通繁忙時請預留最多60分鐘。" },
  },
  {
    g: 4,
    q: { en: "How long will the driver wait after landing?", ja: "着陸後どのくらい待ってもらえますか？", zh: "落地後司機會等多久？" },
    a: { en: "Your chauffeur waits in the arrivals hall until you appear. We track your flight in real time, so they know exactly when you land. You have 90 minutes after touchdown to clear customs and collect your bags — take your time.", ja: "乗務員は到着ロビーでお客様が現れるまでお待ちしております。フライトをリアルタイムで追跡しているため、着陸時間は把握済みです。通関・手荷物受け取りには着陸後90分間ゆっくりお使いください。", zh: "司機在到達大廳等您出現。本公司即時追蹤您的航班，因此完全掌握您的落地時間。落地後有90分鐘讓您完成通關及取行李，請從容不迫。" },
  },
  {
    g: 4,
    q: { en: "Should I exchange my JR Pass at the airport?", ja: "JRパスは空港で交換すべきですか？", zh: "我應該在機場兌換JR Pass嗎？" },
    a: { en: "We recommend exchanging at major Tokyo stations (Tokyo, Shinjuku, Shibuya) where queues are minimal. Airport counters can have 1–2 hour waits. Your driver can take you to a station counter after drop-off if needed.", ja: "東京・新宿・渋谷など都内の主要駅での交換をお勧めします。空港のカウンターは1〜2時間待ちになる場合があります。ご希望であれば、お送りの後に駅のカウンターへご案内することも可能です。", zh: "建議在東京、新宿、澀谷等主要車站兌換，等候時間極短。機場兌換窗口可能需排隊1至2小時。若有需要，司機可在送達後帶您前往車站窗口。" },
  },

  /* ── Special Requests ── */
  {
    g: 5,
    q: { en: "Do you pick up from hotels, private residences, or Airbnb?", ja: "ホテルや個人宅・Airbnbへの送迎はできますか？", zh: "可以從酒店、民宅或Airbnb接送嗎？" },
    a: { en: "Yes. We pick up from any address in Tokyo and surrounding areas — hotels, private homes, Airbnb, offices, or any location you specify.", ja: "はい。東京都内および近郊であれば、ホテル・個人宅・Airbnb・オフィス等、ご指定のいかなる場所からでも対応いたします。", zh: "是的。東京市內及周邊地區任何地址均可，包括酒店、私人住宅、Airbnb、辦公室等您指定的地點。" },
  },
  {
    g: 5,
    q: { en: "Do you serve Yokohama cruise terminals?", ja: "横浜のクルーズターミナルも対応していますか？", zh: "可以接送橫濱郵輪碼頭嗎？" },
    a: { en: "Yes. We serve Osanbashi Pier and Daikoku Pier. Please include your vessel name and arrival/departure time when booking.", ja: "はい。大さん橋ふ頭および大黒ふ頭に対応しております。ご予約の際は船名と入出港時間をお知らせください。", zh: "是的。本公司服務大棧橋碼頭及大黑碼頭。預訂時請提供船名及到港／離港時間。" },
  },
  {
    g: 5,
    q: { en: "Do you go to Tokyo Disney Resort?", ja: "東京ディズニーリゾートへの送迎はできますか？", zh: "可以接送東京迪士尼樂園嗎？" },
    a: { en: "Yes. Both Tokyo Disneyland and Tokyo DisneySea entrances.", ja: "はい。東京ディズニーランド・東京ディズニーシーの両入口に対応しております。", zh: "是的。東京迪士尼樂園及東京迪士尼海洋均可接送。" },
  },
  {
    g: 5,
    q: { en: "Do you provide long-distance transfers across Japan?", ja: "日本全国への長距離送迎はできますか？", zh: "可以提供日本全國長途接送嗎？" },
    a: { en: "Yes. We operate across Japan — Mt. Fuji, Hakone, Nikko, Karuizawa, ski resorts in Nagano and Niigata, and beyond. Contact us for a quote on any destination.", ja: "はい。富士山・箱根・日光・軽井沢・長野や新潟のスキーリゾートなど、日本全国に対応しております。ご希望の目的地へのお見積もりはお気軽にお問い合わせください。", zh: "是的。本公司覆蓋全日本，包括富士山、箱根、日光、輕井澤、長野及新潟滑雪勝地等。任何目的地均可詢價。" },
  },
  {
    g: 5,
    q: { en: "What if I leave something in the car?", ja: "車内に忘れ物をした場合は？", zh: "如果在車上遺留物品怎麼辦？" },
    a: { en: "Contact us immediately at info@octoshell.jp. If the item is found, we will arrange return delivery. Shipping costs are at the client's expense.", ja: "速やかにinfo@octoshell.jpまでご連絡ください。お忘れ物が見つかり次第、ご返送の手配をいたします。送料はお客様のご負担となります。", zh: "請立即聯絡 info@octoshell.jp。若找到遺失物，本公司將為您安排寄回。郵寄費用由客人承擔。" },
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
      { group: n[0], items: [veh[4], veh[5]] },                    // Before You Book: suit, privacy
      { group: n[1], items: [pay[2], pay[4], pay[5]] },            // Rates & Payment: all-in, payment, receipt
      { group: n[2], items: [veh[0], veh[1], veh[6], pay[3]] },   // Vehicles & Luggage: type, smoking, charging, child seat
      { group: n[3], items: [can[0], pay[1]] },                    // Booking & Cancellation: policy, route change
      { group: n[4], items: [pay[0]] },                            // At the Airport: waiting time
      { group: n[5], items: [veh[2], veh[3]] },                    // Special Requests: pets, luggage transport
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
