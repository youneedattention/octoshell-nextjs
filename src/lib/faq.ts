import type { Lang } from "@/lib/translations";

export type FaqItem  = { q: string; a: string };
export type FaqGroup = { group: string; items: FaqItem[] };

/* ── Base FAQ ─────────────────────────────────────────────────────────── */
const FAQ_BASE: Record<Lang, FaqGroup[]> = {
  ja: [
    {
      group: "🚗 車両・車内規則について",
      items: [
        { q: "どのような車が配車されますか。", a: "2車種をご用意しております。トヨタ・アルファード（最大6名様・大型スーツケース5個）、およびトヨタ・ハイエース グランドキャビン（最大9名様・大型スーツケース15個）。いずれも緑ナンバー認可・完全禁煙・USB充電対応です。セダン等の配車はございません。" },
        { q: "車内での喫煙や飲食はできますか。", a: "全車両完全禁煙（電子タバコ含む）です。飲料は蓋付きのペットボトル等に限りOKです。軽食は臭いの残らないものに限りお召し上がりいただけます。" },
        { q: "ペット同伴での利用はできますか。", a: "はい、猫・犬・小型動物を歓迎しております。ご乗車中は必ずキャリーケースまたはクレートに入れていただく必要があります。キャリーをお持ちでない場合はご乗車をお断りする場合がございます。" },
        { q: "荷物のみを先行して運んでもらうことはできますか。", a: "はい、可能です。ゴルフグループや登山グループに人気のサービスです。お客様をゴルフ場や登山口にお送りした後、ゴルフバッグや大型バックパック等をホテルへ先行搬入いたします。ツアー契約者様のお荷物に限り対応可能です（無人の商業貨物輸送は法律上不可）。" },
        { q: "乗務員はスーツ・ネクタイ姿で対応してもらえますか？", a: "はい、すべてのご乗車において例外なくお守りしております。ダークスーツとネクタイの着用は弊社の固定基準であり、オプションではございません。これがタクシーやライドシェアとの違いです。" },
        { q: "乗務員はお客様のプライバシーと機密を守ってくれますか？", a: "はい。乗務員は厳格な守秘義務のもと業務を行っており、録音や乗客情報・会話内容の共有は一切行いません。お客様のプライバシーは絶対的に守られます。" },
        { q: "車内でスマートフォンの充電はできますか？", a: "はい、可能です。USB-AおよびUSB-Cポートを装備しており、iPhone・Android対応の充電ケーブルを無料でご用意しております。" },
      ],
    },
    {
      group: "💴 料金・お支払いについて",
      items: [
        { q: "待機料金（飛行機の遅延等）は発生しますか。", a: "担当乗務員がフライトをリアルタイムで追跡し、実際の着陸時間に合わせてお迎えを調整いたします。着陸後90分以内は追加料金なしでお待ちします。90分超過後は30分ごとに超過待機料金が発生します（30分未満は30分に切り上げ）。\nアルファード： 30分毎 2,500円（税込）\nハイエース： 30分毎 3,000円（税込）\n航空便の遅延による待機は常に無料です。" },
        { q: "万が一、運行中にルートの変更や利用時間の延長が必要になった場合はどうすればよいですか？", a: "速やかに乗務員にお申し付けください。乗務員が配車センターに連絡し、実現可能かどうか、および追加費用（通行料・時間割増・駐車場代等）を出発前にご確認いたします。当日の延長は車両の空き状況によりご対応できない場合もございますので、予めご了承ください。" },
        { q: "通行料・駐車場代・燃料費・宿泊費など、すべて料金に含まれますか？", a: "はい。1つの料金にすべて含まれています——高速道路料金・駐車場代・燃料費・宿泊費（泊まりがけの場合）。すべてのお見積もりはご予約時に確定・固定されます。追加請求は一切ありません。ただし、出発後のルート変更のみ追加費用が発生する場合があります。" },
        { q: "チャイルドシートや空港ミートアップ（ネームボード）は有料ですか。", a: "いずれも無料でご提供しております。チャイルドシートは乳児用・幼児用・ジュニア用（ISOFIXに対応）をご用意しています。また到着ロビーでのネームボード掲示（ミート＆グリート）も無料です。ご予約時にお早めにお申し出ください。" },
        { q: "支払手段は何ですか？車内でドライバーに直接支払うことはできますか？", a: "3つの方法からお選びいただけます。車内での現金払い、クレジットカード（主要カード対応・ご乗車後にStripe経由で自動決済）、または法人のお客様向けの銀行振込です。" },
        { q: "領収書は発行されますか。", a: "はい。クレジットカード決済のお客様には、ご乗車後に自動でPDF領収書をメールにてお送りします（経費精算にもご利用いただけます）。現金払いのお客様にはご要望に応じて発行いたします。" },
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
        { q: "What kind of vehicles will be deployed?", a: "Two vehicles: Toyota Alphard (up to 6 passengers, 5 large suitcases) and Toyota Hiace Grand Cabin (up to 9 passengers, 15 large suitcases). Both are green-plate licensed, non-smoking, and equipped with USB charging. No sedans." },
        { q: "Is smoking, eating, or drinking allowed inside the vehicle?", a: "No smoking (including e-cigarettes). Drinks in sealed bottles are fine. Light snacks with no strong smell are OK." },
        { q: "Can I travel with my pets?", a: "Yes — cats, dogs, and small animals are welcome. Pets must be kept inside a secure carrier or crate throughout the journey. Passengers without a proper carrier may be refused boarding." },
        { q: "Can you transport our luggage separately during our tour?", a: "Yes — a popular option for golf and hiking groups. We drop you off at the golf course or trailhead, then deliver your bags to your hotel ahead of you. Available for passengers booked on our service only — not standalone cargo." },
        { q: "Will my chauffeur wear a suit and tie?", a: "Yes, every trip without exception. Dark suit and tie is a fixed standard — not an upgrade. This is what separates a licensed chauffeur from a taxi or ride-share." },
        { q: "Do the chauffeurs keep conversations private?", a: "Yes. Chauffeurs operate under strict confidentiality — no recording, no sharing of passenger information or conversations. Your privacy is non-negotiable." },
        { q: "Can I charge my phone in the vehicle?", a: "Yes. USB-A and USB-C ports are available, and free charging cables for iPhone and Android are provided at no charge." },
      ],
    },
    {
      group: "💴 Rates & Payments",
      items: [
        { q: "Do you charge for waiting time (e.g., flight delays)?", a: "The first 90 minutes after landing are free — at no extra charge. After that: Alphard ¥2,500 / Hiace ¥3,000 per 30 minutes. Flight delays are always free — you only pay if the wait is caused by personal activities." },
        { q: "Can I change the route or add time during the trip?", a: "Tell your chauffeur immediately. They will confirm feasibility and any added costs — tolls, time surcharges, or parking — before proceeding. Same-day extensions depend on availability and cannot always be guaranteed." },
        { q: "Are tolls, parking, fuel, and all fees included in the price?", a: "Yes. One price covers everything — tolls, parking, fuel, and overnight accommodation for the driver. All costs are fixed and confirmed at booking. No hidden fees. Route changes after the trip starts may add costs." },
        { q: "Are child seats and Airport Meet & Greet services extra?", a: "Both are free. Child seats (infant, toddler, and booster — ISOFIX compatible) and name-board Meet & Greet at arrivals are included. Request at booking so we can prepare." },
        { q: "How can I pay?", a: "Three options: cash in the car, credit card (charged automatically after the trip via Stripe — major cards accepted), or bank transfer for corporate clients." },
        { q: "Will I receive a receipt?", a: "Yes. Credit card payments receive an automatic PDF receipt by email after the trip — suitable for business expense claims. Cash payments: receipt issued on request." },
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
        { q: "預訂後會派發什麼樣的車輛？", a: "本公司提供兩款車型：豐田埃爾法（最多6人、5件大型行李箱）及豐田海獅 Grand Cabin（最多9人、15件大型行李箱）。兩款均持有綠色車牌認可，全面禁煙，並配備USB充電接口。本公司不提供普通轎車。" },
        { q: "車內可以吸煙或飲食嗎？", a: "全面禁煙（包括電子煙）。飲料限帶蓋瓶裝飲品。輕食以無刺激性氣味為限。" },
        { q: "可以攜帶寵物一同乘車嗎？", a: "歡迎攜帶貓、狗及小型動物。乘車全程請務必將寵物置於符合規格的航空箱或便攜籠內。未攜帶合規寵物籠者，司機有權拒絕上車。" },
        { q: "團隊行程中，車輛可以幫我們單獨將行李運送到酒店嗎？", a: "可以，這是高爾夫球團及登山團的熱門服務。本公司先將您送至球場或登山起點，再由專屬車輛將行李（如高爾夫球包、重型登山包等）先行送往入住酒店。此服務僅限本團簽約客人的行李，不接受無乘客隨行的純商業貨運。" },
        { q: "司機會穿著正式、配戴領帶嗎？", a: "是的，每次行程均不例外。深色西裝配領帶是本公司的固定標準，而非可選升級。這正是持牌包車服務與計程車或網約車的分別所在。" },
        { q: "司機會保護乘客的隱私和保密性嗎？", a: "是的。司機在嚴格保密義務下提供服務，不錄音、不共享乘客資訊或車內對話內容。您的隱私受到絕對保護。" },
        { q: "可以在車內給手機充電嗎？", a: "可以。車內配備USB-A及USB-C充電接口，並免費提供兼容iPhone及Android的充電線。" },
      ],
    },
    {
      group: "💴 費用與支付相關",
      items: [
        { q: "司機接機等待會產生超時費嗎？（如航班延誤）", a: "航班落地後首90分鐘免費等候，無附加費用。超過90分鐘後，每30分鐘收取超時費（不足30分鐘按30分鐘計）：\n豐田埃爾法： 每30分鐘 2,500日元（含稅）\n豐田海獅： 每30分鐘 3,000日元（含稅）\n因航班延誤所致的等候時間一律免費。" },
        { q: "萬一乘客在行程中臨時需要修改路線或增加用車時間怎麼辦？", a: "請立即告知司機。司機將確認能否配合，並在繼續行程前告知任何追加費用（過路費、時間溢價、停車費等）。當天臨時延長視車輛供應情況而定，未必能保證。" },
        { q: "過路費、停車費、燃油費及所有相關費用都包含在報價內嗎？", a: "是的。一個價格包含一切——過路費、停車費、燃油費及司機住宿費（跨夜行程）。所有費用在預訂時確認並固定，無任何隱藏收費。唯一例外是行程開始後要求更改路線。" },
        { q: "兒童安全座椅和機場舉牌接機怎麼收費？", a: "兩項均免費。兒童安全座椅提供嬰兒、幼童及學童款式，兼容ISOFIX。機場到達大廳舉牌接機亦包含在內。請在預訂時提前申請。" },
        { q: "支付方式是什麼？可以在車內直接付款給司機嗎？", a: "提供三種方式：車內現金付款、信用卡（行程後透過Stripe自動扣款，接受主要信用卡），以及企業客戶銀行轉帳。" },
        { q: "行程結束後是否有發票或收據？", a: "有。信用卡付款客戶於行程後自動收到PDF電子收據（適用於商務報銷）。現金付款客戶可按需索取。" },
      ],
    },
    {
      group: "❌ 取消政策",
      items: [
        { q: "取消訂單如何收費？", a: "訂單取消政策嚴格遵循日本《特定商業交易法》公示條款執行：\n用車時間前 48 小時以上取消： 免費（全額退款）\n用車時間前 24 至 48 小時內取消： 收取預計行程總額的 50%\n用車時間前 24 小時內取消或無故未到： 收取預計行程總額的 100%\n如因颱風、航班突發停飛等不可抗力導致無法出行，在您提供航司憑證並及時通知本公司的前提下，將免收取消手續費。" },
      ],
    },
  ],
  "zh-cn": [
    {
      group: "🚗 车辆及车内守则",
      items: [
        { q: "预订后会派发什么样的车辆？", a: "本公司提供两款车型：丰田埃尔法（最多6人、5件大型行李箱）及丰田海狮 Grand Cabin（最多9人、15件大型行李箱）。两款均持有绿色车牌认可，全面禁烟，并配备USB充电接口。本公司不提供普通轿车。" },
        { q: "车内可以吸烟或饮食吗？", a: "全面禁烟（包括电子烟）。饮料限带盖瓶装饮品。轻食以无刺激性气味为限。" },
        { q: "可以携带宠物一同乘车吗？", a: "欢迎携带猫、狗及小型动物。乘车全程请务必将宠物置于符合规格的航空箱或便携笼内。未携带合规宠物笼者，司机有权拒绝上车。" },
        { q: "团队行程中，车辆可以帮我们单独将行李运送到酒店吗？", a: "可以，这是高尔夫球团及登山团的热门服务。本公司先将您送至球场或登山起点，再由专属车辆将行李先行送往入住酒店。此服务仅限本团签约客人的行李，不接受无乘客随行的纯商业货运。" },
        { q: "司机会穿着正式、配戴领带吗？", a: "是的，每次行程均不例外。深色西装配领带是本公司的固定标准，而非可选升级。这正是持牌包车服务与出租车或网约车的分别所在。" },
        { q: "司机会保护乘客的隐私和保密性吗？", a: "是的。司机在严格保密义务下提供服务，不录音、不共享乘客资讯或车内对话内容。您的隐私受到绝对保护。" },
        { q: "可以在车内给手机充电吗？", a: "可以。车内配备USB-A及USB-C充电接口，并免费提供兼容iPhone及Android的充电线。" },
      ],
    },
    {
      group: "💴 费用与支付相关",
      items: [
        { q: "司机接机等待会产生超时费吗？（如航班延误）", a: "航班落地后首90分钟免费等候，无附加费用。超过90分钟后，每30分钟收取超时费（不足30分钟按30分钟计）：\n丰田埃尔法： 每30分钟 2,500日元（含税）\n丰田海狮： 每30分钟 3,000日元（含税）\n因航班延误所致的等候时间一律免费。" },
        { q: "万一乘客在行程中临时需要修改路线或增加用车时间怎么办？", a: "请立即告知司机。司机将确认能否配合，并在继续行程前告知任何追加费用（过路费、时间溢价、停车费等）。当天临时延长视车辆供应情况而定，未必能保证。" },
        { q: "过路费、停车费、燃油费及所有相关费用都包含在报价内吗？", a: "是的。一个价格包含一切——过路费、停车费、燃油费及司机住宿费（跨夜行程）。所有费用在预订时确认并固定，无任何隐藏收费。唯一例外是行程开始后要求更改路线。" },
        { q: "儿童安全座椅和机场举牌接机怎么收费？", a: "两项均免费。儿童安全座椅提供婴儿、幼童及学童款式，兼容ISOFIX。机场到达大厅举牌接机亦包含在内。请在预订时提前申请。" },
        { q: "支付方式是什么？可以在车内直接付款给司机吗？", a: "提供三种方式：车内现金付款、信用卡（行程后透过Stripe自动扣款，接受主要信用卡），以及企业客户银行转账。" },
        { q: "行程结束后是否有发票或收据？", a: "有。信用卡付款客户于行程后自动收到PDF电子收据（适用于商务报销）。现金付款客户可按需索取。" },
      ],
    },
    {
      group: "❌ 取消政策",
      items: [
        { q: "取消订单如何收费？", a: "订单取消政策严格遵循日本《特定商业交易法》公示条款执行：\n用车时间前 48 小时以上取消： 免费（全额退款）\n用车时间前 24 至 48 小时内取消： 收取预计行程总额的 50%\n用车时间前 24 小时内取消或无故未到： 收取预计行程总额的 100%\n如因台风、航班突发停飞等不可抗力导致无法出行，在您提供航司凭证并及时通知本公司的前提下，将免收取消手续费。" },
      ],
    },
  ],
  th: [
    {
      group: "🚗 รถและกฎในรถ",
      items: [
        { q: "จะได้รับรถประเภทใด?", a: "รถสองคัน: Toyota Alphard (สูงสุด 6 ที่นั่ง, กระเป๋าใหญ่ 5 ใบ) และ Toyota Hiace Grand Cabin (สูงสุด 9 ที่นั่ง, กระเป๋าใหญ่ 15 ใบ) ทั้งสองคันมีป้ายทะเบียนสีเขียว ห้ามสูบบุหรี่ และมีช่องชาร์จ USB ไม่มีรถซีดาน" },
        { q: "สูบบุหรี่หรือรับประทานอาหารในรถได้หรือไม่?", a: "ห้ามสูบบุหรี่ทุกชนิด (รวมบุหรี่ไฟฟ้า) เครื่องดื่มในขวดปิดฝาได้ อาหารเบาๆ ที่ไม่มีกลิ่นแรงได้" },
        { q: "พาสัตว์เลี้ยงได้หรือไม่?", a: "ได้ — แมว สุนัข และสัตว์เล็กยินดีต้อนรับ ต้องอยู่ในกรงหรือกล่องขนส่งตลอดการเดินทาง" },
        { q: "ขนส่งกระเป๋าแยกได้หรือไม่?", a: "ได้ — เป็นตัวเลือกยอดนิยมสำหรับกลุ่มกอล์ฟและเดินป่า เราส่งท่านที่สนามกอล์ฟหรือทางเดินป่า แล้วนำกระเป๋าไปส่งที่โรงแรมก่อน" },
        { q: "คนขับสวมสูทและเน็คไทหรือไม่?", a: "ใช่ ทุกเที่ยวโดยไม่มีข้อยกเว้น สูทสีเข้มและเน็คไทเป็นมาตรฐานคงที่ ไม่ใช่การอัปเกรด" },
        { q: "คนขับรักษาความลับหรือไม่?", a: "ใช่ คนขับทำงานภายใต้ข้อตกลงความลับเข้มงวด ไม่มีการบันทึกหรือเปิดเผยข้อมูลผู้โดยสาร" },
        { q: "ชาร์จโทรศัพท์ในรถได้หรือไม่?", a: "ได้ มีพอร์ต USB-A และ USB-C พร้อมสาย iPhone และ Android ให้ฟรี" },
      ],
    },
    {
      group: "💴 ค่าบริการและการชำระเงิน",
      items: [
        { q: "มีค่าธรรมเนียมรอคอยหรือไม่?", a: "90 นาทีแรกหลังลงจอดฟรี หลังจากนั้น: Alphard ¥2,500 / Hiace ¥3,000 ต่อ 30 นาที เที่ยวบินดีเลย์ฟรีเสมอ" },
        { q: "เปลี่ยนเส้นทางระหว่างเดินทางได้หรือไม่?", a: "แจ้งคนขับทันที พวกเขาจะยืนยันความเป็นไปได้และค่าใช้จ่ายเพิ่มเติมก่อนดำเนินการ" },
        { q: "ค่าทางด่วน ที่จอดรถ น้ำมัน รวมอยู่ในราคาหรือไม่?", a: "ใช่ ราคาเดียวครอบคลุมทุกอย่าง ไม่มีค่าใช้จ่ายซ่อนเร้น" },
        { q: "เบาะเด็กและบริการรับที่สนามบินเสียค่าใช้จ่ายเพิ่มหรือไม่?", a: "ทั้งสองอย่างฟรี เบาะเด็กทุกขนาด (ISOFIX) และป้ายรับที่ห้องผู้โดยสารขาเข้ารวมอยู่แล้ว" },
        { q: "ชำระเงินอย่างไร?", a: "สามเลือก: เงินสดในรถ บัตรเครดิต (ผ่าน Stripe หลังเดินทาง) หรือโอนธนาคารสำหรับองค์กร" },
        { q: "จะได้รับใบเสร็จหรือไม่?", a: "ใช่ บัตรเครดิตจะได้รับใบเสร็จ PDF ทางอีเมลอัตโนมัติ เงินสดออกตามคำขอ" },
      ],
    },
    {
      group: "❌ นโยบายการยกเลิก",
      items: [
        { q: "นโยบายการยกเลิกเป็นอย่างไร?", a: "มากกว่า 48 ชั่วโมงก่อนรับ: ฟรี\n24-48 ชั่วโมงก่อนรับ: 50% ของใบเสนอราคา\nภายใน 24 ชั่วโมงหรือไม่มา: 100%\nหมายเหตุ: ยกเว้นถ้าเที่ยวบินถูกยกเลิกโดยสายการบิน" },
      ],
    },
  ],
  fr: [
    {
      group: "🚗 Véhicules et règles à bord",
      items: [
        { q: "Quel type de véhicule sera mis à disposition ?", a: "Deux véhicules : Toyota Alphard (jusqu'à 6 passagers, 5 grandes valises) et Toyota Hiace Grand Cabin (jusqu'à 9 passagers, 15 grandes valises). Tous deux sont agréés, non-fumeurs et équipés de ports USB. Pas de berlines." },
        { q: "Peut-on fumer, manger ou boire dans le véhicule ?", a: "Interdiction de fumer (y compris les e-cigarettes). Boissons en bouteilles fermées autorisées. Collations légères sans odeur forte acceptées." },
        { q: "Puis-je voyager avec mon animal de compagnie ?", a: "Oui — chats, chiens et petits animaux sont les bienvenus. Les animaux doivent rester dans une cage de transport sécurisée pendant tout le trajet." },
        { q: "Pouvez-vous transporter nos bagages séparément ?", a: "Oui — option populaire pour les groupes de golf et de randonnée. Nous vous déposons au terrain ou au départ du sentier, puis livrons vos bagages à l'hôtel." },
        { q: "Mon chauffeur portera-t-il un costume et une cravate ?", a: "Oui, à chaque trajet sans exception. Le costume sombre et la cravate sont un standard fixe — pas une option. C'est ce qui distingue un chauffeur licencié d'un taxi." },
        { q: "Les chauffeurs respectent-ils la confidentialité ?", a: "Oui. Les chauffeurs opèrent sous stricte confidentialité — aucun enregistrement, aucun partage d'informations sur les passagers ou les conversations." },
        { q: "Puis-je charger mon téléphone dans le véhicule ?", a: "Oui. Des ports USB-A et USB-C sont disponibles, avec des câbles de recharge iPhone et Android fournis gratuitement." },
      ],
    },
    {
      group: "💴 Tarifs et paiement",
      items: [
        { q: "Facturez-vous l'attente (ex. retards de vol) ?", a: "Les 90 premières minutes après l'atterrissage sont gratuites. Ensuite : Alphard ¥2 500 / Hiace ¥3 000 par 30 minutes. Les retards de vol sont toujours gratuits." },
        { q: "Puis-je modifier l'itinéraire ou ajouter du temps pendant le trajet ?", a: "Informez votre chauffeur immédiatement. Il confirmera la faisabilité et les coûts éventuels avant de procéder." },
        { q: "Les péages, parkings, carburant sont-ils inclus dans le prix ?", a: "Oui. Un prix tout compris — péages, parking, carburant et hébergement du chauffeur. Aucun frais cachés." },
        { q: "Les sièges enfants et l'accueil aéroport sont-ils en supplément ?", a: "Les deux sont gratuits. Sièges enfants (nourrisson, bambin, rehausseur — ISOFIX) et accueil avec panneau nominatif inclus. Demandez à la réservation." },
        { q: "Comment puis-je payer ?", a: "Trois options : espèces dans le véhicule, carte bancaire (débitée automatiquement après le trajet via Stripe), ou virement bancaire pour les entreprises." },
        { q: "Vais-je recevoir un reçu ?", a: "Oui. Les paiements par carte reçoivent automatiquement un reçu PDF par e-mail — utilisable pour les notes de frais. Espèces : reçu sur demande." },
      ],
    },
    {
      group: "❌ Politique d'annulation",
      items: [
        { q: "Quelle est votre politique d'annulation ?", a: "Plus de 48h avant la prise en charge : Gratuit (remboursement intégral)\nEntre 24h et 48h : 50% du devis\nMoins de 24h ou no-show : 100% du devis\nNote : Les frais sont annulés si votre vol est officiellement annulé par la compagnie aérienne." },
      ],
    },
  ],
  ko: [
    {
      group: "🚗 차량 및 차내 규정",
      items: [
        { q: "어떤 차량이 배차됩니까?", a: "두 가지 차종을 제공합니다: 토요타 알파드（최대 6명, 대형 수트케이스 5개）및 토요타 하이에이스 그랜드 캐빈（최대 9명, 대형 수트케이스 15개）. 모두 녹색 번호판 허가, 전면 금연, USB 충전 가능합니다. 세단 등은 제공하지 않습니다." },
        { q: "차내에서 흡연이나 음식물 섭취가 가능합니까?", a: "전면 금연（전자담배 포함）입니다. 음료는 뚜껑이 있는 페트병 등에 한해 허용됩니다. 가벼운 간식은 냄새가 남지 않는 것에 한해 허용됩니다." },
        { q: "반려동물과 함께 이용할 수 있습니까?", a: "네, 고양이·개·소형 동물을 환영합니다. 승차 중에는 반드시 이동장 또는 크레이트에 넣어 주셔야 합니다. 이동장이 없는 경우 승차가 거절될 수 있습니다." },
        { q: "짐만 먼저 호텔로 운반해 줄 수 있습니까?", a: "네, 가능합니다. 골프 그룹이나 등산 그룹에게 인기 있는 서비스입니다. 골프장이나 등산로 입구에 모셔다 드린 후, 골프백이나 대형 배낭 등을 호텔에 먼저 배달해 드립니다. 당사 계약 승객의 짐에 한해 가능합니다（무인 상업 화물 운송은 법적으로 불가）." },
        { q: "기사가 정장과 넥타이를 착용합니까?", a: "네, 모든 승차에서 예외 없이 착용합니다. 다크 수트와 넥타이는 당사의 고정 기준이며 선택 사항이 아닙니다. 이것이 택시나 라이드셰어와의 차이입니다." },
        { q: "기사가 고객의 프라이버시와 기밀을 보호합니까?", a: "네. 기사는 엄격한 비밀 유지 의무 하에 업무를 수행하며, 녹음이나 승객 정보·대화 내용 공유를 일절 하지 않습니다. 고객의 프라이버시는 절대적으로 보호됩니다." },
        { q: "차내에서 스마트폰을 충전할 수 있습니까?", a: "네, 가능합니다. USB-A 및 USB-C 포트가 장착되어 있으며, iPhone·Android 호환 충전 케이블을 무료로 제공합니다." },
      ],
    },
    {
      group: "💴 요금 및 결제",
      items: [
        { q: "대기 요금（항공편 지연 등）이 발생합니까?", a: "담당 기사가 항공편을 실시간으로 추적하여 실제 착륙 시간에 맞춰 출영합니다. 착륙 후 90분 이내는 추가 요금 없이 대기합니다. 90분 초과 후에는 30분마다 초과 대기 요금이 발생합니다（30분 미만은 30분으로 올림）.\n알파드: 30분마다 2,500엔（세금 포함）\n하이에이스: 30분마다 3,000엔（세금 포함）\n항공편 지연으로 인한 대기는 항상 무료입니다." },
        { q: "운행 중 경로 변경이나 이용 시간 연장이 필요한 경우 어떻게 해야 합니까?", a: "즉시 기사에게 말씀해 주세요. 기사가 배차 센터에 연락하여 가능 여부와 추가 비용（통행료·시간 할증·주차비 등）을 출발 전에 확인합니다. 당일 연장은 차량 가용 상황에 따라 대응이 어려울 수 있습니다." },
        { q: "통행료·주차비·연료비·숙박비 등 모든 비용이 요금에 포함됩니까?", a: "네. 하나의 요금에 모든 비용이 포함됩니다——고속도로 요금·주차비·연료비·숙박비（1박 이상의 경우）. 모든 견적은 예약 시 확정·고정됩니다. 추가 청구는 일절 없습니다. 단, 출발 후 경로 변경 시 추가 비용이 발생할 수 있습니다." },
        { q: "아동 시트와 공항 네임보드 서비스는 유료입니까?", a: "두 가지 모두 무료로 제공합니다. 아동 시트는 유아용·아동용·주니어용（ISOFIX 호환）을 준비하고 있습니다. 도착 로비에서의 네임보드 미팅도 무료입니다. 예약 시 미리 신청해 주세요." },
        { q: "결제 방법은 무엇입니까? 차내에서 기사에게 직접 결제할 수 있습니까?", a: "세 가지 방법 중 선택하실 수 있습니다. 차내 현금 결제, 신용카드（주요 카드 지원·승차 후 Stripe를 통해 자동 결제）, 또는 법인 고객을 위한 은행 이체입니다." },
        { q: "영수증이 발급됩니까?", a: "네. 신용카드 결제 고객에게는 승차 후 자동으로 PDF 영수증을 이메일로 발송합니다（경비 처리에도 사용 가능）. 현금 결제 고객에게는 요청에 따라 발행합니다." },
      ],
    },
    {
      group: "❌ 취소 정책",
      items: [
        { q: "취소 수수료는 언제부터 발생합니까?", a: "예약 확정 후 취소에 대해서는 일본 특정상거래법에 따라 다음과 같이 취소 수수료를 청구합니다.\n배차일 48시간 전까지: 무료（전액 환불）\n배차일 24~48시간 전: 견적 금액의 50%\n배차일 24시간 이내 또는 무단 취소: 견적 금액의 100%\n※항공편 결항 등 불가항력의 경우, 신속히 연락해 주시면 취소 수수료가 면제됩니다." },
      ],
    },
  ],
};

export const GROUP_NAMES: Record<Lang, [string,string,string,string,string,string]> = {
  en: ["Before You Book", "Rates & Payment", "Vehicles & Luggage", "Booking & Cancellation", "At the Airport", "Special Requests"],
  ja: ["ご予約前に", "料金・お支払い", "車両・手荷物", "ご予約・キャンセル", "空港でのお出迎え", "特別なご要望"],
  zh: ["預訂前須知", "費用與支付", "車輛與行李", "預訂與取消", "機場接送", "特殊需求"],
  ko: ["예약 전 안내", "요금 및 결제", "차량 및 수하물", "예약 및 취소", "공항에서", "특별 요청"],
  "zh-cn": ["预订前须知", "费用与支付", "车辆与行李", "预订与取消", "机场接送", "特殊需求"],
  th: ["ก่อนจอง", "ค่าบริการและการชำระเงิน", "รถและสัมภาระ", "การจองและการยกเลิก", "ที่สนามบิน", "คำขอพิเศษ"],
  fr: ["Avant de réserver", "Tarifs et paiement", "Véhicules et bagages", "Réservation et annulation", "À l'aéroport", "Demandes spéciales"],
};

const EXTRA_ITEMS: { g: 0|1|2|3|4|5; q: Record<Lang,string>; a: Record<Lang,string> }[] = [
  /* ── Before You Book ── */
  {
    g: 0,
    q: { en: "Do your drivers speak English?", ja: "乗務員は英語を話せますか？", zh: "司機會說英語嗎？", ko: "기사가 영어를 할 수 있습니까?", "zh-cn": "司机会说英语吗？", th: "คนขับพูดภาษาอังกฤษได้หรือไม่?", fr: "Vos chauffeurs parlent-ils anglais ?" },
    a: {
      en: "Yes. All bookings and pre-trip communication are handled in English. Chauffeurs manage everyday directions and requests in English — you will never need to speak Japanese.",
      ja: "はい。すべての予約および出発前のご連絡は英語で対応しております。乗務員は日常的な道案内やご要望を英語でお応えできます——日本語を話す必要は一切ございません。",
      zh: "是的。所有預訂及行程前溝通均以英語處理。司機能以英語應對日常指示及需求——您無需說任何日語。",
      ko: "네. 모든 예약 및 출발 전 연락은 영어로 처리합니다. 기사는 일상적인 안내와 요청을 영어로 응대할 수 있습니다——일본어를 할 필요가 전혀 없습니다.",
      "zh-cn": "是的。所有预订及行程前沟通均以英语处理。司机能以英语应对日常指示及需求。",
      th: "ใช่ การจองและการสื่อสารก่อนเดินทางทั้งหมดเป็นภาษาอังกฤษ คนขับสามารถสื่อสารภาษาอังกฤษในชีวิตประจำวันได้",
      fr: "Oui. Toutes les réservations et communications avant le trajet sont gérées en anglais. Les chauffeurs gèrent les directions et demandes courantes en anglais.",
    },
  },
  {
    g: 0,
    q: { en: "Do you operate 24/7?", ja: "24時間対応していますか？", zh: "是否24小時服務？", ko: "24시간 운영합니까?", "zh-cn": "24小时运营吗？", th: "เปิดให้บริการตลอด 24 ชั่วโมงหรือไม่?", fr: "Opérez-vous 24h/24 ?" },
    a: {
      en: "Yes. We operate around the clock — including public holidays — with no late-night or early-morning surcharge. All prices are the same regardless of departure time.",
      ja: "はい。祝日を含む24時間365日対応しており、深夜・早朝の割増料金は一切ございません。出発時間に関わらず料金は同一です。",
      zh: "是的。本公司全年無休（包括公眾假期）、24小時服務，深夜及清晨均無附加費用，價格不因時段而改變。",
      ko: "네. 공휴일을 포함하여 24시간 365일 운영하며, 심야·새벽 할증 요금은 일절 없습니다. 출발 시간에 관계없이 요금은 동일합니다.",
      "zh-cn": "是的。全年无休（包括公众假期）、24小时服务，深夜及清晨均无附加费用。",
      th: "ใช่ เราให้บริการตลอดเวลา รวมถึงวันหยุดนักขัตฤกษ์ ไม่มีค่าธรรมเนียมเพิ่มสำหรับกลางดึกหรือเช้าตรู่",
      fr: "Oui. Nous opérons en permanence — y compris les jours fériés — sans supplément de nuit ou de matin. Les tarifs sont identiques quelle que soit l'heure.",
    },
  },
  {
    g: 0,
    q: { en: "How do I make a booking?", ja: "予約はどのようにすればよいですか？", zh: "如何預訂服務？", ko: "예약은 어떻게 합니까?", "zh-cn": "如何预订服务？", th: "จะจองอย่างไร?", fr: "Comment effectuer une réservation ?" },
    a: {
      en: "Book via our website form, WhatsApp, or email at info@octoshell.jp — provide your pickup address, date, time, and passenger count. We confirm within a few hours. Book at least 48 hours in advance to guarantee availability.",
      ja: "ウェブサイトの予約フォーム、WhatsApp、またはメール（info@octoshell.jp）よりご予約いただけます。お迎え場所・日時・人数をお知らせください。数時間以内に確認のご連絡を差し上げます。車両確保のため、48時間前までのご予約を推奨しております。",
      zh: "可透過本網站預訂表格、WhatsApp或電郵（info@octoshell.jp）預訂——請提供接送地址、日期、時間及乘客人數。本公司將於數小時內確認。建議至少提前48小時預訂以確保車輛供應。",
      ko: "웹사이트 예약 양식, WhatsApp 또는 이메일（info@octoshell.jp）로 예약하실 수 있습니다——픽업 장소, 날짜, 시간, 인원수를 알려주세요. 몇 시간 이내에 확인 연락을 드립니다. 차량 확보를 위해 48시간 전까지 예약을 권장합니다.",
      "zh-cn": "可通过本网站预订表格、WhatsApp或电邮（info@octoshell.jp）预订——请提供接送地址、日期、时间及乘客人数。建议至少提前48小时预订。",
      th: "จองผ่านแบบฟอร์มบนเว็บไซต์ WhatsApp หรืออีเมล info@octoshell.jp — ระบุที่รับ วันที่ เวลา และจำนวนผู้โดยสาร แนะนำจองล่วงหน้า 48 ชั่วโมง",
      fr: "Via notre formulaire en ligne, WhatsApp ou e-mail à info@octoshell.jp — indiquez le lieu de prise en charge, la date, l'heure et le nombre de passagers. Réservez au moins 48h à l'avance.",
    },
  },
  {
    g: 0,
    q: { en: "Which vehicle should I choose for my group?", ja: "グループに合う車両はどれですか？", zh: "我應該為團體選擇哪款車型？", ko: "그룹에 맞는 차량은 어느 것입니까?", "zh-cn": "我应该为团体选择哪款车型？", th: "ควรเลือกรถคันไหนสำหรับกลุ่ม?", fr: "Quel véhicule choisir pour mon groupe ?" },
    a: {
      en: "Toyota Alphard: best for 1–4 passengers with standard luggage. Toyota Hiace: best for 5–9 passengers, large groups, golf trips, or heavy luggage. If you are unsure, tell us your group size and luggage and we will recommend.",
      ja: "アルファードは標準的な荷物をお持ちの1〜4名様に最適です。ハイエースは5〜9名様、大人数グループ、ゴルフ旅行、または大型荷物をお持ちの方に最適です。ご不明な場合は、グループの人数と荷物の詳細をお知らせいただければ、最適な車両をご提案いたします。",
      zh: "豐田埃爾法適合1至4人、攜帶標準行李的旅客。豐田海獅適合5至9人、大型團體、高爾夫旅行或行李較多的旅客。如有疑問，請告知人數及行李情況，本公司將為您推薦最合適的車型。",
      ko: "알파드는 표준 짐을 가진 1~4명에게 최적입니다. 하이에이스는 5~9명, 대규모 그룹, 골프 여행, 또는 짐이 많은 분께 최적입니다. 불확실한 경우 그룹 인원과 짐 상세를 알려주시면 최적의 차량을 추천해 드리겠습니다.",
      "zh-cn": "埃尔法适合1至4人标准行李的旅客。海狮适合5至9人、大型团体、高尔夫旅行或行李较多的旅客。",
      th: "Toyota Alphard: เหมาะสำหรับ 1-4 คนพร้อมกระเป๋าทั่วไป Toyota Hiace: เหมาะสำหรับ 5-9 คน กลุ่มใหญ่ กอล์ฟ หรือกระเป๋าหนัก",
      fr: "Toyota Alphard : idéal pour 1 à 4 passagers avec bagages standard. Toyota Hiace : idéal pour 5 à 9 passagers, grands groupes, voyages de golf ou bagages importants.",
    },
  },
  {
    g: 0,
    q: { en: "Are your vehicles and chauffeurs fully licensed?", ja: "車両と乗務員は正式な許可・認可を受けていますか？", zh: "您的車輛和司機是否持有合規牌照？", ko: "차량과 기사는 정식 허가·인가를 받았습니까?", "zh-cn": "车辆和司机是否持有合规牌照？", th: "รถและคนขับได้รับใบอนุญาตครบถ้วนหรือไม่?", fr: "Vos véhicules et chauffeurs sont-ils pleinement agréés ?" },
    a: {
      en: "Yes. All vehicles operate under a green-plate commercial licence issued by the Japanese government (特定旅客自動車運送事業), and are fully insured. Every chauffeur holds a valid hire-car driver's licence under Japanese law.",
      ja: "はい。弊社の全車両は、日本国土交通省より認可を受けた緑ナンバー（特定旅客自動車運送事業）で運行しており、すべて完全に保険加入済みです。全乗務員は、日本の法律に基づく有効な旅客運送免許を保有しております。",
      zh: "是的。本公司所有車輛均持有日本政府頒發的綠色車牌（特定旅客自動車運送事業）合規運營，並已全面投保。所有司機均依照日本法規持有有效的旅客運輸執照。",
      ko: "네. 당사의 모든 차량은 일본 국토교통성으로부터 인가받은 녹색 번호판（특정 여객 자동차 운송사업）으로 운행하며, 모두 완전히 보험에 가입되어 있습니다. 모든 기사는 일본 법률에 따른 유효한 여객 운송 면허를 보유하고 있습니다.",
      "zh-cn": "是的。所有车辆均持有日本政府颁发的绿色车牌（特定旅客自动车运送事业）合规运营，并已全面投保。",
      th: "ใช่ รถทุกคันดำเนินการภายใต้ใบอนุญาตเชิงพาณิชย์แผ่นป้ายสีเขียวของรัฐบาลญี่ปุ่น และได้รับการประกันเต็มรูปแบบ",
      fr: "Oui. Tous les véhicules opèrent sous licence commerciale plaque verte délivrée par le gouvernement japonais, et sont entièrement assurés.",
    },
  },
  {
    g: 0,
    q: { en: "Do you offer corporate accounts or business invoicing?", ja: "法人契約や請求書払いに対応していますか？", zh: "是否提供企業帳戶或公司對公結算？", ko: "법인 계약이나 청구서 결제가 가능합니까?", "zh-cn": "是否提供企业账户或公司对公结算？", th: "มีบัญชีองค์กรหรือการออกใบแจ้งหนี้ธุรกิจหรือไม่?", fr: "Proposez-vous des comptes entreprise ou la facturation professionnelle ?" },
    a: {
      en: "Yes. Corporate clients receive consolidated monthly invoicing via bank transfer, priority booking support, and a dedicated contact. Email info@octoshell.jp to set up an account.",
      ja: "はい。法人のお客様は、銀行振込による月次一括請求書払い、優先予約サポート、専任担当者によるご対応が可能です。法人契約のお申し込みはinfo@octoshell.jpまでお問い合わせください。",
      zh: "是的。企業客戶享有銀行轉帳月結發票、優先預訂支援及專屬聯絡人服務。如需開立企業帳戶，請聯絡 info@octoshell.jp。",
      ko: "네. 법인 고객은 은행 이체를 통한 월별 일괄 청구서 결제, 우선 예약 지원, 전담 담당자 대응이 가능합니다. 법인 계약 신청은 info@octoshell.jp로 문의해 주세요.",
      "zh-cn": "是的。企业客户享有银行转账月结发票、优先预订支持及专属联系人服务。联系 info@octoshell.jp。",
      th: "ใช่ ลูกค้าองค์กรได้รับการออกใบแจ้งหนี้รายเดือนผ่านการโอนธนาคาร การสนับสนุนการจองก่อน และผู้ติดต่อเฉพาะ",
      fr: "Oui. Les clients professionnels bénéficient d'une facturation mensuelle consolidée par virement, d'une priorité de réservation et d'un contact dédié.",
    },
  },

  /* ── Rates & Payment ── */
  {
    g: 1,
    q: { en: "Is tipping required?", ja: "チップは必要ですか？", zh: "需要給小費嗎？", ko: "팁이 필요합니까?", "zh-cn": "需要给小费吗？", th: "ต้องให้ทิปหรือไม่?", fr: "Le pourboire est-il obligatoire ?" },
    a: {
      en: "No. Tipping is not customary in Japan and is never expected by our chauffeurs. A kind word or an online review is the best way to show your appreciation.",
      ja: "不要です。チップは日本では一般的な慣習ではなく、乗務員が期待することもございません。温かいお言葉やオンラインレビューが最大の励みになります。",
      zh: "不需要。日本沒有給小費的習慣，本公司的司機也從不期待。若您滿意服務，留下評價或一句好評是最好的回饋。",
      ko: "필요 없습니다. 팁은 일본에서 일반적인 관습이 아니며, 기사도 기대하지 않습니다. 따뜻한 말씀이나 온라인 리뷰가 최고의 감사 표현입니다.",
      "zh-cn": "不需要。日本没有给小费的习惯，本公司的司机也从不期待。留下评价或好评是最好的回馈。",
      th: "ไม่ การให้ทิปไม่ใช่ธรรมเนียมในญี่ปุ่น และคนขับไม่คาดหวัง คำพูดดีๆ หรือรีวิวออนไลน์เป็นการแสดงความขอบคุณที่ดีที่สุด",
      fr: "Non. Le pourboire n'est pas une coutume au Japon et nos chauffeurs ne s'y attendent jamais. Un mot gentil ou un avis en ligne est la meilleure façon de montrer votre satisfaction.",
    },
  },

  /* ── Vehicles & Luggage ── */
  {
    g: 2,
    q: { en: "How much luggage can I bring?", ja: "荷物はどのくらい積めますか？", zh: "可以帶多少行李？", ko: "짐을 얼마나 실을 수 있습니까?", "zh-cn": "可以带多少行李？", th: "สามารถนำกระเป๋าได้เท่าไร?", fr: "Combien de bagages puis-je apporter ?" },
    a: {
      en: "Alphard: up to 6 passengers and 5 large suitcases (or up to 10 with fewer passengers). Hiace: up to 9 passengers and 9 large suitcases (or up to 15 with fewer passengers). Oversized items — golf bags, strollers, ski equipment — must be declared at booking.",
      ja: "アルファード：最大6名様・大型スーツケース5個（少人数の場合は最大10個）。ハイエース：最大9名様・大型スーツケース9個（少人数の場合は最大15個）。ゴルフバッグ・ベビーカー・スキー用品などの大型荷物は必ず事前にお申し出ください。",
      zh: "埃爾法：最多6人及5件大型行李箱（人數較少時最多10件）。海獅：最多9人及9件大型行李箱（人數較少時最多15件）。高爾夫球包、嬰兒車、滑雪器材等特大行李必須在預訂時申報。",
      ko: "알파드: 최대 6명 및 대형 수트케이스 5개（인원이 적은 경우 최대 10개）. 하이에이스: 최대 9명 및 대형 수트케이스 9개（인원이 적은 경우 최대 15개）. 골프백·유모차·스키 장비 등 대형 짐은 예약 시 반드시 신고해 주세요.",
      "zh-cn": "埃尔法：最多6人及5件大型行李箱（人数较少时最多10件）。海狮：最多9人及9件大型行李箱（最多15件）。高尔夫球包、婴儿车、滑雪装备必须在预订时申报。",
      th: "Alphard: สูงสุด 6 คนและกระเป๋าใหญ่ 5 ใบ (หรือสูงสุด 10 ใบถ้ามีคนน้อย) Hiace: สูงสุด 9 คนและกระเป๋าใหญ่ 9 ใบ (สูงสุด 15 ใบ) ต้องแจ้งสิ่งของพิเศษตอนจอง",
      fr: "Alphard : jusqu'à 6 passagers et 5 grandes valises (ou 10 avec moins de passagers). Hiace : jusqu'à 9 passagers et 9 grandes valises (ou 15). Les articles surdimensionnés doivent être déclarés à la réservation.",
    },
  },
  {
    g: 2,
    q: { en: "Do you accommodate wheelchair users?", ja: "車椅子の方も利用できますか？", zh: "可以乘坐輪椅嗎？", ko: "휠체어 이용자도 탑승할 수 있습니까?", "zh-cn": "可以乘坐轮椅吗？", th: "รองรับผู้ใช้รถเข็นหรือไม่?", fr: "Acceptez-vous les utilisateurs de fauteuil roulant ?" },
    a: {
      en: "Yes. Please notify us at booking with the wheelchair type (foldable / electric / dimensions). The Toyota Hiace is recommended for larger or electric wheelchairs.",
      ja: "はい。ご予約の際に車椅子の種類（折りたたみ式・電動式・サイズ）をお知らせください。大型・電動車椅子の場合はトヨタ・ハイエースをお勧めしております。",
      zh: "可以。預訂時請告知輪椅類型（折疊式／電動式／尺寸）。較大型或電動輪椅建議選擇豐田海獅。",
      ko: "네. 예약 시 휠체어 종류（접이식/전동식/크기）를 알려주세요. 대형·전동 휠체어의 경우 토요타 하이에이스를 권장합니다.",
      "zh-cn": "可以。预订时请告知轮椅类型（折叠式／电动式／尺寸）。较大型或电动轮椅建议选择丰田海狮。",
      th: "ใช่ กรุณาแจ้งประเภทรถเข็น (พับได้/ไฟฟ้า/ขนาด) ตอนจอง แนะนำ Toyota Hiace สำหรับรถเข็นขนาดใหญ่หรือไฟฟ้า",
      fr: "Oui. Précisez le type de fauteuil (pliant / électrique / dimensions) à la réservation. Le Toyota Hiace est recommandé pour les fauteuils plus grands ou électriques.",
    },
  },

  /* ── Booking & Cancellation ── */
  {
    g: 3,
    q: { en: "How will I receive my booking confirmation?", ja: "予約確認はどのように受け取れますか？", zh: "預訂確認如何接收？", ko: "예약 확인은 어떻게 받습니까?", "zh-cn": "预订确认如何接收？", th: "จะได้รับการยืนยันการจองอย่างไร?", fr: "Comment vais-je recevoir ma confirmation de réservation ?" },
    a: {
      en: "An email confirmation is sent immediately after booking, including your booking reference, pickup details, and vehicle type. We also send WhatsApp updates before your journey — including your chauffeur's name, contact number, and a reminder 24 hours before pickup.",
      ja: "ご予約確定後すぐに、予約番号・お迎え場所・車種を含む確認メールをお送りします。また、出発前にWhatsAppにてご案内をお届けします——乗務員のお名前・ご連絡先、および出発24時間前のリマインダーを含みます。",
      zh: "預訂確認後，確認電郵即時發送，包含預訂編號、接送詳情及車型資訊。此外，行程前本公司會透過WhatsApp提供更新——包括司機姓名、聯絡電話及出發前24小時提醒。",
      ko: "예약 확정 후 즉시 예약 번호·픽업 장소·차종을 포함한 확인 이메일을 발송합니다. 또한 출발 전 WhatsApp으로 안내를 드립니다——기사 이름·연락처 및 출발 24시간 전 리마인더를 포함합니다.",
      "zh-cn": "预订确认后，确认电邮即时发送，包含预订编号、接送详情及车型信息。行程前还会通过WhatsApp提供更新。",
      th: "อีเมลยืนยันส่งทันทีหลังจอง รวมถึงรหัสอ้างอิง รายละเอียดรับ และประเภทรถ นอกจากนี้ยังส่งข้อมูลอัปเดตผ่าน WhatsApp ก่อนเดินทาง",
      fr: "Un e-mail de confirmation est envoyé immédiatement après la réservation, avec votre référence, les détails de prise en charge et le type de véhicule. Nous envoyons aussi des mises à jour WhatsApp avant votre trajet.",
    },
  },
  {
    g: 3,
    q: { en: "Can I request multiple stops?", ja: "複数の立ち寄り先を追加できますか？", zh: "可以安排多個停靠點嗎？", ko: "여러 경유지를 추가할 수 있습니까?", "zh-cn": "可以安排多个停靠点吗？", th: "ขอหยุดหลายจุดได้หรือไม่?", fr: "Puis-je demander plusieurs arrêts ?" },
    a: {
      en: "Yes. List all stops at booking. Common examples: airport → hotel → clinic, or multi-district sightseeing across Tokyo. Any routing surcharges are confirmed before your trip — no surprises.",
      ja: "はい。ご予約時にすべての立ち寄り先をご記入ください。よくある例：空港→ホテル→病院、または東京都内の複数エリアでの観光。ルートによる追加料金は出発前にご確認いたします。",
      zh: "可以。請在預訂時列明所有停靠地點。常見例子：機場→酒店→診所，或東京多區觀光。任何路線附加費均在行程前確認，不會有意外費用。",
      ko: "네. 예약 시 모든 경유지를 기재해 주세요. 일반적인 예: 공항→호텔→병원, 또는 도쿄 내 여러 지역 관광. 경로에 따른 추가 요금은 출발 전에 확인합니다.",
      "zh-cn": "可以。请在预订时列明所有停靠地点。任何路线附加费均在行程前确认。",
      th: "ได้ ระบุจุดจอดทั้งหมดตอนจอง ค่าธรรมเนียมเส้นทางเพิ่มเติมจะยืนยันก่อนเดินทาง",
      fr: "Oui. Listez tous les arrêts à la réservation. Les suppléments de trajet éventuels sont confirmés avant votre voyage — aucune surprise.",
    },
  },
  {
    g: 3,
    q: { en: "Do you offer hourly charter?", ja: "時間制貸切はできますか？", zh: "可以按小時包車嗎？", ko: "시간제 전세가 가능합니까?", "zh-cn": "可以按小时包车吗？", th: "มีบริการเช่าเหมาชั่วโมงหรือไม่?", fr: "Proposez-vous la location à l'heure ?" },
    a: {
      en: "Yes, from 4 hours minimum. Tolls, parking, and fuel included. Popular for Ginza shopping, multi-stop Tokyo sightseeing, and corporate visits. Advance booking required — same-day availability not guaranteed.",
      ja: "はい。最低4時間からご利用いただけます。通行料・駐車場代・燃料費込み。銀座でのショッピング、都内複数エリアの観光、企業訪問などに最適です。事前予約推奨。当日ご予約はご対応できない場合があります。",
      zh: "是的，最少4小時起。過路費、停車費及燃油費已包含。適合銀座購物、東京多點觀光及企業拜訪。建議提前預訂，當天預約未必有車。",
      ko: "네, 최소 4시간부터 이용 가능합니다. 통행료·주차비·연료비 포함. 긴자 쇼핑, 도쿄 내 여러 지역 관광, 기업 방문 등에 최적입니다. 사전 예약 권장. 당일 예약은 대응이 어려울 수 있습니다.",
      "zh-cn": "是的，最少4小时起。过路费、停车费及燃油费已包含。建议提前预订，当天预约未必有车。",
      th: "ใช่ ขั้นต่ำ 4 ชั่วโมง รวมค่าทางด่วน ที่จอดรถ และน้ำมัน เหมาะสำหรับช้อปปิ้งกินซ่า ท่องเที่ยวโตเกียวหลายจุด และเยี่ยมชมบริษัท",
      fr: "Oui, à partir de 4 heures minimum. Péages, parking et carburant inclus. Populaire pour le shopping à Ginza, les visites multi-sites à Tokyo et les rendez-vous d'affaires.",
    },
  },

  /* ── At the Airport ── */
  {
    g: 4,
    q: { en: "Where exactly will the driver meet me?", ja: "空港でどこで待っていてもらえますか？", zh: "司機在機場哪裡等候？", ko: "공항에서 기사가 어디에서 기다립니까?", "zh-cn": "司机在机场哪里等候？", th: "คนขับจะรอที่ไหนในสนามบิน?", fr: "Où exactement le chauffeur m'attendra-t-il ?" },
    a: {
      en: "In the arrivals hall, past customs and baggage claim. Your chauffeur holds a name board. If you cannot find them, call or WhatsApp the number in your booking confirmation — do not exit the terminal first.",
      ja: "到着ロビー（入国審査・手荷物受け取り後）にてお待ちしております。乗務員がネームプレートをお持ちしております。見つからない場合は、予約確認に記載された番号にお電話またはWhatsAppでご連絡ください——建物の外へ出る前に必ずご確認ください。",
      zh: "在到達大廳（通關及取行李後）等候。司機將手持接機牌。若找不到司機，請撥打或WhatsApp預訂確認中的聯絡號碼——請勿在聯繫上司機前離開航站樓。",
      ko: "도착 로비（입국 심사·수하물 수취 후）에서 기다립니다. 기사가 네임보드를 들고 있습니다. 찾지 못하는 경우, 예약 확인서에 기재된 번호로 전화 또는 WhatsApp으로 연락해 주세요——건물 밖으로 나가기 전에 반드시 확인해 주세요.",
      "zh-cn": "在到达大厅（通关及取行李后）等候。司机将手持接机牌。若找不到司机，请拨打预订确认中的联系号码。",
      th: "ในห้องรับผู้โดยสาร ผ่านศุลกากรและรับกระเป๋าแล้ว คนขับถือป้ายชื่อ ถ้าหาไม่พบโทรหรือ WhatsApp ตามเบอร์ในการยืนยันการจอง",
      fr: "Dans le hall des arrivées, après les douanes et la récupération des bagages. Votre chauffeur tient un panneau nominatif. Si vous ne le trouvez pas, appelez ou WhatsApp le numéro de confirmation.",
    },
  },
  {
    g: 4,
    q: { en: "How long does it take from Narita Airport to Tokyo?", ja: "成田空港から東京市内まで何分かかりますか？", zh: "從成田機場到東京市區需要多久？", ko: "나리타 공항에서 도쿄 시내까지 얼마나 걸립니까?", "zh-cn": "从成田机场到东京市区需要多久？", th: "จากสนามบินนาริตะถึงโตเกียวใช้เวลาเท่าไร?", fr: "Combien de temps de l'aéroport Narita à Tokyo ?" },
    a: {
      en: "Typically 50–70 minutes (approx. 65 km via expressway). Allow up to 90 minutes during peak hours. We monitor real-time traffic and reroute when needed.",
      ja: "通常50〜70分（高速道路経由で約65km）です。ラッシュアワー時は最大90分ほどお見込みください。リアルタイムの交通情報を確認し、必要に応じてルートを変更いたします。",
      zh: "通常約50至70分鐘（經高速公路約65公里）。尖峰時段請預留最多90分鐘。本公司即時監察交通狀況，如有需要會調整路線。",
      ko: "보통 50~70분（고속도로 경유 약 65km）입니다. 혼잡 시간대에는 최대 90분을 예상해 주세요. 실시간 교통 정보를 확인하여 필요 시 경로를 변경합니다.",
      "zh-cn": "通常约50至70分钟（经高速公路约65公里）。尖峰时段请预留最多90分钟。",
      th: "โดยทั่วไป 50-70 นาที (ประมาณ 65 กม. ทางด่วน) ช่วงชั่วโมงเร่งด่วนอาจถึง 90 นาที",
      fr: "Généralement 50 à 70 minutes (environ 65 km par autoroute). Comptez jusqu'à 90 minutes aux heures de pointe.",
    },
  },
  {
    g: 4,
    q: { en: "How long does it take from Haneda Airport to Tokyo?", ja: "羽田空港から東京市内まで何分かかりますか？", zh: "從羽田機場到東京市區需要多久？", ko: "하네다 공항에서 도쿄 시내까지 얼마나 걸립니까?", "zh-cn": "从羽田机场到东京市区需要多久？", th: "จากสนามบินฮาเนดะถึงโตเกียวใช้เวลาเท่าไร?", fr: "Combien de temps de l'aéroport Haneda à Tokyo ?" },
    a: {
      en: "Typically 30–45 minutes (approx. 20 km via expressway). Allow up to 60 minutes during heavy traffic.",
      ja: "通常30〜45分（高速道路経由で約20km）です。交通渋滞時は最大60分ほどお見込みください。",
      zh: "通常約30至45分鐘（經高速公路約20公里）。交通繁忙時請預留最多60分鐘。",
      ko: "보통 30~45분（고속도로 경유 약 20km）입니다. 교통 혼잡 시 최대 60분을 예상해 주세요.",
      "zh-cn": "通常约30至45分钟（经高速公路约20公里）。交通繁忙时请预留最多60分钟。",
      th: "โดยทั่วไป 30-45 นาที (ประมาณ 20 กม. ทางด่วน) ช่วงรถติดอาจถึง 60 นาที",
      fr: "Généralement 30 à 45 minutes (environ 20 km par autoroute). Comptez jusqu'à 60 minutes en cas de trafic dense.",
    },
  },
  {
    g: 4,
    q: { en: "How long will the driver wait after landing?", ja: "着陸後どのくらい待ってもらえますか？", zh: "落地後司機會等多久？", ko: "착륙 후 기사가 얼마나 기다립니까?", "zh-cn": "落地后司机会等多久？", th: "คนขับจะรอนานเท่าไรหลังลงจอด?", fr: "Combien de temps le chauffeur attendra-t-il après l'atterrissage ?" },
    a: {
      en: "Your chauffeur waits in the arrivals hall until you appear. We track your flight in real time, so they know exactly when you land. You have 90 minutes after touchdown to clear customs and collect your bags — at no extra charge. Take your time.",
      ja: "乗務員は到着ロビーでお客様が現れるまでお待ちしております。フライトをリアルタイムで追跡しているため、着陸時間は把握済みです。着陸後90分間は追加料金なしで、通関・手荷物受け取りにゆっくりお使いください。",
      zh: "司機在到達大廳等您出現。本公司即時追蹤您的航班，完全掌握您的落地時間。落地後90分鐘內無附加費用，讓您從容完成通關及取行李。",
      ko: "기사는 도착 로비에서 고객이 나타날 때까지 기다립니다. 항공편을 실시간으로 추적하므로 착륙 시간을 정확히 파악합니다. 착륙 후 90분 이내는 추가 요금 없이 통관·수하물 수취에 여유롭게 사용하실 수 있습니다.",
      "zh-cn": "司机在到达大厅等您出现。落地后90分钟内无附加费用，让您从容完成通关及取行李。",
      th: "คนขับรอในห้องรับผู้โดยสารจนกว่าคุณจะออกมา 90 นาทีหลังลงจอดไม่มีค่าใช้จ่ายเพิ่ม",
      fr: "Votre chauffeur attend dans le hall des arrivées jusqu'à votre apparition. Vous disposez de 90 minutes après l'atterrissage pour passer les douanes et récupérer vos bagages — sans frais supplémentaires.",
    },
  },
  {
    g: 4,
    q: { en: "Should I exchange my JR Pass at the airport?", ja: "JRパスは空港で交換すべきですか？", zh: "我應該在機場兌換JR Pass嗎？", ko: "JR 패스는 공항에서 교환해야 합니까?", "zh-cn": "我应该在机场兑换JR Pass吗？", th: "ควรแลก JR Pass ที่สนามบินหรือไม่?", fr: "Dois-je échanger mon JR Pass à l'aéroport ?" },
    a: {
      en: "We recommend exchanging at major Tokyo stations (Tokyo, Shinjuku, Shibuya) where queues are minimal. Airport counters can have 1–2 hour waits. Your driver can take you to a station counter after drop-off if needed.",
      ja: "東京・新宿・渋谷など都内の主要駅での交換をお勧めします。空港のカウンターは1〜2時間待ちになる場合があります。ご希望であれば、お送りの後に駅のカウンターへご案内することも可能です。",
      zh: "建議在東京、新宿、澀谷等主要車站兌換，等候時間極短。機場兌換窗口可能需排隊1至2小時。若有需要，司機可在送達後帶您前往車站窗口。",
      ko: "도쿄·신주쿠·시부야 등 도내 주요 역에서의 교환을 권장합니다. 공항 창구는 1~2시간 대기가 발생할 수 있습니다. 원하시면 목적지 도착 후 역 창구로 안내해 드릴 수 있습니다.",
      "zh-cn": "建议在东京、新宿、涩谷等主要车站兑换，等候时间极短。机场兑换窗口可能需排队1至2小时。",
      th: "แนะนำให้แลกที่สถานีหลักในโตเกียว (โตเกียว ชินจูกุ ชิบุยะ) ที่สนามบินอาจรอ 1-2 ชั่วโมง คนขับสามารถพาไปสถานีได้",
      fr: "Nous recommandons de l'échanger dans les grandes gares de Tokyo (Tokyo, Shinjuku, Shibuya) où les files sont courtes. Les guichets d'aéroport peuvent avoir 1 à 2h d'attente.",
    },
  },

  /* ── Special Requests ── */
  {
    g: 5,
    q: { en: "Do you pick up from hotels, private residences, or Airbnb?", ja: "ホテルや個人宅・Airbnbへの送迎はできますか？", zh: "可以從酒店、民宅或Airbnb接送嗎？", ko: "호텔, 개인 주택, Airbnb에서 픽업합니까?", "zh-cn": "可以从酒店、民宅或Airbnb接送吗？", th: "รับจากโรงแรม บ้านพัก หรือ Airbnb ได้หรือไม่?", fr: "Effectuez-vous des prises en charge à l'hôtel, domicile ou Airbnb ?" },
    a: {
      en: "Yes — hotels, homes, Airbnb, offices, and cruise terminals across Tokyo, Yokohama, Kawasaki, Chiba, and Saitama. For destinations outside Greater Tokyo (Hakone, Nikko, Karuizawa), contact us for a quote.",
      ja: "はい。東京・横浜・川崎・千葉・埼玉のホテル・個人宅・Airbnb・オフィス・クルーズターミナル等、広域首都圏全域に対応しております。箱根・日光・軽井沢など首都圏外のご目的地はお見積もりをお問い合わせください。",
      zh: "是的——東京、橫濱、川崎、千葉及埼玉的酒店、民宅、Airbnb、辦公室及郵輪碼頭均可接送。大東京以外的目的地（箱根、日光、輕井澤等），請聯絡我們索取報價。",
      ko: "네——도쿄·요코하마·가와사키·지바·사이타마의 호텔·개인 주택·Airbnb·사무실·크루즈 터미널 등 수도권 전역에 대응합니다. 하코네·닛코·가루이자와 등 수도권 외 목적지는 문의해 주세요.",
      "zh-cn": "是的——东京、横滨、川崎、千叶及埼玉的酒店、民宅、Airbnb、办公室及邮轮码头均可接送。",
      th: "ได้ — โรงแรม บ้าน Airbnb สำนักงาน และท่าเรือในโตเกียว โยโกฮาม่า คาวาซากิ ชิบะ และไซตามะ",
      fr: "Oui — hôtels, domiciles, Airbnb, bureaux et terminaux de croisière à Tokyo, Yokohama, Kawasaki, Chiba et Saitama.",
    },
  },
  {
    g: 5,
    q: { en: "Do you serve Yokohama cruise terminals?", ja: "横浜のクルーズターミナルも対応していますか？", zh: "可以接送橫濱郵輪碼頭嗎？", ko: "요코하마 크루즈 터미널에도 대응합니까?", "zh-cn": "可以接送横滨邮轮码头吗？", th: "บริการท่าเรือสำราญโยโกฮาม่าหรือไม่?", fr: "Desservez-vous les terminaux de croisière de Yokohama ?" },
    a: {
      en: "Yes. We serve Osanbashi Pier and Daikoku Pier — approximately 30 minutes from central Tokyo. Please include your vessel name and arrival/departure time when booking.",
      ja: "はい。大さん橋ふ頭および大黒ふ頭に対応しております（東京都心から約30分）。ご予約の際は船名と入出港時間をお知らせください。",
      zh: "是的。本公司服務大棧橋碼頭及大黑碼頭（距東京市中心約30分鐘）。預訂時請提供船名及到港／離港時間。",
      ko: "네. 오산바시 부두 및 다이코쿠 부두에 대응합니다（도쿄 도심에서 약 30분）. 예약 시 선박명과 입출항 시간을 알려주세요.",
      "zh-cn": "是的。本公司服务大栈桥码头及大黑码头（距东京市中心约30分钟）。预订时请提供船名及到港／离港时间。",
      th: "ใช่ เราให้บริการท่า Osanbashi และ Daikoku (ประมาณ 30 นาทีจากโตเกียว) แจ้งชื่อเรือและเวลาเข้า/ออกท่าตอนจอง",
      fr: "Oui. Nous desservons le quai Osanbashi et le quai Daikoku (environ 30 minutes du centre de Tokyo). Indiquez le nom du navire et l'heure d'arrivée/départ à la réservation.",
    },
  },
  {
    g: 5,
    q: { en: "Do you go to Tokyo Disney Resort?", ja: "東京ディズニーリゾートへの送迎はできますか？", zh: "可以接送東京迪士尼樂園嗎？", ko: "도쿄 디즈니 리조트로 갑니까?", "zh-cn": "可以接送东京迪士尼乐园吗？", th: "ไปโตเกียว ดิสนีย์ รีสอร์ตได้หรือไม่?", fr: "Allez-vous au Tokyo Disney Resort ?" },
    a: {
      en: "Yes — both Tokyo Disneyland and Tokyo DisneySea. Approximately 30–40 minutes from central Tokyo. Book at least 48 hours ahead during peak seasons and school holidays.",
      ja: "はい。東京ディズニーランド・東京ディズニーシーの両入口に対応しております。東京都心から約30〜40分です。繁忙期や学校の休暇期間は48時間前までのご予約をお勧めします。",
      zh: "是的——東京迪士尼樂園及東京迪士尼海洋均可。距東京市中心約30至40分鐘。旺季及學校假期請至少提前48小時預訂。",
      ko: "네——도쿄 디즈니랜드·도쿄 디즈니씨 모두 대응합니다. 도쿄 도심에서 약 30~40분입니다. 성수기나 학교 방학 기간에는 48시간 전까지 예약을 권장합니다.",
      "zh-cn": "是的——东京迪士尼乐园及东京迪士尼海洋均可。距东京市中心约30至40分钟。旺季请至少提前48小时预订。",
      th: "ได้ — ทั้งโตเกียว ดิสนีย์แลนด์และโตเกียว ดิสนีย์ซี ประมาณ 30-40 นาทีจากใจกลางโตเกียว ช่วงพีกซีซั่นจองล่วงหน้า 48 ชั่วโมง",
      fr: "Oui — Tokyo Disneyland et Tokyo DisneySea. Environ 30 à 40 minutes du centre de Tokyo. Réservez au moins 48h à l'avance pendant les saisons de pointe.",
    },
  },
  {
    g: 5,
    q: { en: "Do you provide long-distance transfers across Japan?", ja: "日本全国への長距離送迎はできますか？", zh: "可以提供日本全國長途接送嗎？", ko: "일본 전국 장거리 이동이 가능합니까?", "zh-cn": "可以提供日本全国长途接送吗？", th: "มีบริการรับส่งระยะไกลทั่วญี่ปุ่นหรือไม่?", fr: "Proposez-vous des transferts longue distance à travers le Japon ?" },
    a: {
      en: "Yes. We operate across Japan — Mt. Fuji, Hakone, Nikko, Karuizawa, ski resorts in Nagano and Niigata, and beyond. Same-day and multi-day itineraries available. Contact us for a quote on any destination.",
      ja: "はい。富士山・箱根・日光・軽井沢・長野や新潟のスキーリゾートなど、日本全国に対応しております。日帰り・複数日程のご旅程も承ります。ご希望の目的地へのお見積もりはお気軽にお問い合わせください。",
      zh: "是的。本公司覆蓋全日本，包括富士山、箱根、日光、輕井澤、長野及新潟滑雪勝地等。可安排當天或多日行程。任何目的地均可詢價。",
      ko: "네. 후지산·하코네·닛코·가루이자와·나가노 및 니가타 스키 리조트 등 일본 전국에 대응합니다. 당일·복수 일정 모두 가능합니다. 희망 목적지의 견적은 언제든지 문의해 주세요.",
      "zh-cn": "是的。本公司覆盖全日本，包括富士山、箱根、日光、轻井泽、长野及新潟滑雪胜地等。可安排当天或多日行程。",
      th: "ใช่ เราให้บริการทั่วญี่ปุ่น — ฟูจิ ฮาโกเน่ นิกโก้ คารุอิซาวะ รีสอร์ตสกีในนากาโนและนิกาตะ รวมถึงพื้นที่อื่นๆ",
      fr: "Oui. Nous opérons dans tout le Japon — Mt Fuji, Hakone, Nikko, Karuizawa, stations de ski au Nagano et Niigata, et au-delà.",
    },
  },
  {
    g: 5,
    q: { en: "What if I leave something in the car?", ja: "車内に忘れ物をした場合は？", zh: "如果在車上遺留物品怎麼辦？", ko: "차 안에 물건을 두고 내린 경우 어떻게 합니까?", "zh-cn": "车内有遗留物品怎么办？", th: "ถ้าลืมของในรถจะทำอย่างไร?", fr: "Que faire si j'oublie quelque chose dans le véhicule ?" },
    a: {
      en: "Contact us immediately at info@octoshell.jp. We check with the chauffeur right away. If found, we arrange return shipping at the client's expense. Items are held for 30 days.",
      ja: "速やかにinfo@octoshell.jpまでご連絡ください。すぐに乗務員に確認いたします。お忘れ物が見つかり次第、送料お客様負担にてご返送の手配をいたします。お忘れ物は30日間お預かりいたします。",
      zh: "請立即聯絡 info@octoshell.jp。本公司即時向司機查詢。若找到遺失物，將安排寄回，郵費由客人承擔。物品保存30日。",
      ko: "즉시 info@octoshell.jp로 연락해 주세요. 곧바로 기사에게 확인합니다. 분실물이 발견되면 고객 부담으로 반송 수속을 진행합니다. 분실물은 30일간 보관합니다.",
      "zh-cn": "请立即联系 info@octoshell.jp。本公司即时向司机查询。若找到遗失物，将安排寄回，邮费由客人承担。物品保存30日。",
      th: "ติดต่อเราทันทีที่ info@octoshell.jp เราตรวจสอบกับคนขับทันที ถ้าพบจะจัดส่งคืนโดยค่าใช้จ่ายของลูกค้า เก็บสิ่งของไว้ 30 วัน",
      fr: "Contactez-nous immédiatement à info@octoshell.jp. Nous vérifions avec le chauffeur immédiatement. Si trouvé, nous organisons le renvoi aux frais du client. Les objets sont conservés 30 jours.",
    },
  },
];

export function buildFAQ(): Record<Lang, FaqGroup[]> {
  const result = {} as Record<Lang, FaqGroup[]>;
  (["en", "ja", "zh", "ko", "zh-cn", "th", "fr"] as Lang[]).forEach((lang) => {
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
