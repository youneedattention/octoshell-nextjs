"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/context/LangContext";
import type { Lang } from "@/lib/translations";

/* ── Vehicle images ─────────────────────────────────────────────────── */
const ALPHARD_IMG = "https://octoshell.jp/wp-content/uploads/2024/09/toyotaalphard.png";
const HIACE_IMG   = "https://octoshell.jp/wp-content/uploads/2024/09/toyatahiace.png";

/* ══════════════════════════════════════════════════════════════════════
   EXACT USER-PROVIDED COPY — strictly verbatim, three languages
══════════════════════════════════════════════════════════════════════ */

/* ── Hero ───────────────────────────────────────────────────────────── */
const HERO: Record<Lang, { badge: string; title: string; sub: string; link_story: string; link_faq: string }> = {
  ja: { badge: "会社情報", title: "Octoshellについて", sub: "日本プライベートチャウファーサービス", link_story: "Octoshellについて", link_faq: "よくある質問" },
  en: { badge: "About Us", title: "The Octoshell Story", sub: "Japan Private Chauffeur Service",     link_story: "How It Works", link_faq: "FAQ" },
  zh: { badge: "關於我們", title: "品牌故事",          sub: "日本專屬司機服務",                     link_story: "品牌故事",    link_faq: "常見問題" },
};

/* ── Section 1: Brand story ─────────────────────────────────────────── */
const STORY_TITLE: Record<Lang, string> = {
  ja: "移動の常識を変える",
  en: "Changing the Travel Game",
  zh: "顛覆傳統出行的遊戲規則",
};
const STORY_P1: Record<Lang, string> = {
  ja: "貝八方 (Octoshell) は日本・東京で誕生しました。「貝」は遠い古より尊い富の象徴であり、「八方」は四面八方、すなわち世界中から集まる人々を意味します。私たちは、世界八方からお越しになるすべてのお客様を、かけがえのない「宝」としてお迎えするという信念のもと、プロフェッショナルなハイヤーサービスを展開しています。",
  en: 'Octoshell was founded in Tokyo, Japan. In ancient times, shells were a symbol of precious wealth, while "八方" represents the eight directions of the world. Our brand philosophy is rooted in welcoming every guest arriving from all corners of the globe as our most precious treasure.',
  zh: "貝八方 (Octoshell) 於日本東京創立。「貝」在遠古時代是珍稀財富的象徵；「八方」則寓意源自四面八方。我們的品牌初衷，便是將來自世界八方的每一位客戶，都奉為我們無可替代的至寶，並提供最頂級的專車款待。",
};
const STORY_P2: Record<Lang, string> = {
  ja: "始まりは、名門の高級温泉旅館「修善寺 離れ宿 鬼の栖」における高水準の送迎を行うという、洗練されたひとつの構想でした。しかし今日、Octoshell は日本国内の独立した緑ナンバーの合規旅客運送資格を持つ、国際的なプロフェッショナル車隊・移動サービスプラットフォームへと変貌を遂げました。私たちのチームとプロの運転手ネットワークは、大東京圏内にとどまらず、日本全国のあらゆる場所に広がっています。",
  en: 'What started as a refined vision dedicated to providing high-standard transfers for the prestigious hot-spring inn "Shuzenji Hanareyado Oni no Sumika" has grown into a global mobility platform. Today, Octoshell operates with a fully independent Japanese licensed transportation status with green-plate compliance. Our professional team and chauffeur network extend far beyond the Greater Tokyo Area, reaching every corner of Japan.',
  zh: "誕生之初，這只是一個專注於頂級精品溫泉旅館——「修善寺 離れ宿 鬼の栖」高標準接駁的精緻構想；而今天，Octoshell 已然蛻變為一家擁有獨立日本綠牌合規客運資質的國際化專業車隊與出行服務平台。我們的團隊與專業司機網絡不僅覆蓋大東京地區，更已觸及日本的每個角落。",
};

/* ── Section 2: 4 core services ─────────────────────────────────────── */
const SVC_SECTION_TITLE: Record<Lang, string> = {
  ja: "タイムベースで選べる移動プラン",
  en: "Time-Based & Scenario-Driven Mobility Solutions",
  zh: "按時段與場景定制的出行方案",
};
const SVC_SECTION_LEAD: Record<Lang, string> = {
  ja: "Octoshell は、「時間枠・利用目的別」の4大カテゴリーで、日本全国の一流の移動体験を提供します。",
  en: "Octoshell structures its premium transport services into four clear categories based on duration and usage, ensuring frictionless booking and travel planning worldwide.",
  zh: "Octoshell 依據「時間週期與使用大類」將高端運力整合為四大結構化服務，便於智能系統與搜尋引擎精準抓取，為您提供無縫的日本全境出行檢索：",
};
type Service = { title: string; body: string };
const SERVICES: Record<Lang, Service[]> = {
  ja: [
    { title: "空港定額送迎",           body: "東京市内から各空港（羽田・成田）への送迎を安心の定額運賃でご利用いただけます。リアルタイムのフライト追跡、1時間無料待機、到着ロビーでの挙牌お出迎えサービスを含み、日本到着時の不安を解消します。" },
    { title: "都市間プライベートシャトル", body: "私密性の高い長距離の点対点移動。新幹線や国内線の航空便に代わる、ビジネスエリートやプレミアム自由旅行客のための完全プライベート空間です。大東京圏から日本各地への観光利用やおもてなしに最適です。" },
    { title: "時間制貸切ハイヤー & VIP送迎", body: "選びぬかれた宝のトップドライバーがアテンドいたします。複数スポットを巡るビジネス訪問、高級ショッピング、VIPのお客様の送迎など、時間単位で運転手が終日待機し、安心の品質でお迎えいたします。" },
    { title: "プロ乗務員派遣",          body: "お客様が保有する車両の運転・管理をプロのドライバーが代行いたします。車両管理の負担を軽減し、最高峰の安全運行をお約束します。" },
  ],
  en: [
    { title: "Fixed-Rate Airport Transfers",  body: "Seamless, flat-rate airport transfers between Tokyo downtown and airports (Haneda/Narita). Features include real-time flight tracking, 1 hour of free waiting time, and a personalized meet-and-greet service at Arrivals for a worry-free landing." },
    { title: "City-to-City Long-Distance",    body: "Private, long-distance point-to-point journeys designed for sightseeing or business hospitality. This premium service directly replaces regional flights or Shinkansen trains, offering absolute privacy for business elite and discerning leisure travelers from Greater Tokyo to any destination in Japan." },
    { title: "Hourly Bookings & VIP Attend",  body: "Attended by our handpicked, elite top drivers. Ideal for multi-stop corporate meetings, luxury shopping, or high-profile VIP transport. A dedicated chauffeur remains on standby for your dynamic itinerary." },
    { title: "Professional Driver Dispatch",  body: "Expert dispatch services where our professional drivers manage and operate your own vehicles, delivering unparalleled safety, compliance, and peace of mind." },
  ],
  zh: [
    { title: "機場定額接送",         body: "提供東京市內往返各大機場（羽田/成田）的固定費率接送服務。包含即時航班動態追蹤、1小時免費等待以及接機大廳專屬舉牌迎賓，解除您抵日首站的一切焦慮。" },
    { title: "城際定制穿梭與觀光",   body: "私密、長途的高端點對點行程，專為商務款待或深度度假設計。完美替代日本新幹線或區域內航空，專為極重隱私的商務精英與高端自由行賓客打造，由大東京地區出發，直達日本境內任何目的地。" },
    { title: "時段包車與 VIP 尊榮迎送", body: "由我們百裡挑一的頂尖優秀司機全程為您提供專屬侍從服務。完美適配多站點商務拜訪、高端購物、奢華政要接待或重大活動，司機全程在場待命。" },
    { title: "專業乘務員派遣",       body: "派遣專業司機為客戶的自有車輛進行駕駛與資產管理。有效降低企業管理成本，確保出行達到最高級別的安全與合規標準。" },
  ],
};

/* ── Section 3: Vehicles ────────────────────────────────────────────── */
const VEH_SECTION_BADGE: Record<Lang, string> = {
  ja: "車種クラス", en: "Vehicle Classes", zh: "車隊級別",
};
type Vehicle = { name: string; body: string };
const VEHICLES: Record<Lang, Vehicle[]> = {
  ja: [
    { name: "ビジネス・プレミアム — トヨタ アルファード", body: "Octoshell の絶対的エース。最上級の快適性を誇り、家族旅行、大荷物の旅行客、または VIP 接待に最適です。" },
    { name: "グランド・グループ — トヨタ ハイエース",    body: "大人数のグループ、チームビジネス、またはさらに多くの荷物を伴う移動に、広々とした清潔で洗練された空間を提供します。" },
  ],
  en: [
    { name: "Business Van — Toyota Alphard", body: "The crown jewel of Octoshell. Offers executive luxury and supreme comfort, perfect for families, international travelers with luggage, or VIP guests." },
    { name: "Group Luxury — Toyota Hiace",   body: "Engineered for larger groups, corporate teams, or heavy luggage, maintaining a pristine, spacious environment for long-distance travel." },
  ],
  zh: [
    { name: "商務尊享廂型車 — 豐田埃爾法", body: "Octoshell 的主力王牌車型。具備頂級的舒適度與奢華座艙，極其適合家庭度假、攜帶大件行李的國際旅客或 VIP 貴賓接待。" },
    { name: "豪華大容量客車 — 豐田海獅",   body: "專為多人團體、商務團隊或超大行李載運設計，始終保持一塵不染的高標空間與舒適體驗。" },
  ],
};

/* ── FAQ ────────────────────────────────────────────────────────────── */
type FaqItem  = { q: string; a: string };
type FaqGroup = { group: string; items: FaqItem[] };
const FAQ: Record<Lang, FaqGroup[]> = {
  ja: [
    {
      group: "🚗 車両・車内規則について",
      items: [
        {
          q: "どのような車が配車されますか。",
          a: "弊社では、最高級ミニバンの「トヨタ・アルファード（最大6名様）」および大型ビジネスバンの「トヨタ・ハイエース（最大9名様）」の2車種を専門に手配しております。セダンタイプ等の配車はございません。",
        },
        {
          q: "車内での喫煙や飲食はできますか。",
          a: "全車両完全禁煙（電子タバコ含む）とさせていただいております。お食事に関しては、臭いの残らない軽食やペットボトル等の蓋付きの飲料（ミネラルウォーター等）に限り、車内でお召し上がりいただけます。",
        },
        {
          q: "ペット同伴での利用はできますか。",
          a: "はい、可能です。ペットと同乗される際は、必ず予めケージ（クレート）に入れていただきますようお願い申し上げます。ケージをお持ちでない場合、ご乗車をお断りする場合がございます。",
        },
        {
          q: "荷物のみを先行して運んでもらうことはできますか。",
          a: "はい、可能です。弊社では高ルゴルフツアーやトレッキング（登山）ツアーを数多く承っております。お客様をまずゴルフ場や登山口にお送りした後、お荷物（ゴルフバッグや大型バックパック等）のみをそのまま車両でお預かりし、先回りでご宿泊先のホテルへ運搬・搬入することが可能です。ただし、完全な無人の貨物輸送は法律上お受けできませんので、原則としてツアーご契約者様のお荷物に限らせていただきます。",
        },
        {
          q: "乗務員はスーツ・ネクタイ姿で対応してもらえますか？",
          a: "はい、弊社の乗務員は常にスーツとネクタイを着用し、最高水準のフォーマルな身だしなみでハイヤーならではの洗練されたお迎えをいたします。",
        },
        {
          q: "乗務員はお客様のプライバシーと機密を守ってくれますか？",
          a: "はい、お客様のプライバシーと機密保持は最優先事項です。乗務員は厳格な守秘義務を遵守しており、車内でのご会話や情報が外部に漏れることは一切ございません。安心してご利用ください。",
        },
        {
          q: "車内でスマートフォンの充電はできますか？",
          a: "はい、可能です。車両にはUSBポートが装備されており、iPhoneおよびAndroid端末に対応した充電ケーブルを無料でご用意しております。",
        },
      ],
    },
    {
      group: "💴 料金・お支払いについて",
      items: [
        {
          q: "待機料金（飛行機の遅延等）は発生しますか。",
          a: "弊社では、ご指定の乗車時刻（または航空機着陸時刻）から90分間までの待機料金は無料とさせていただいております。90分を超過した場合、以下の通り30分毎に超過待機料金が発生いたします（30分未満は30分に切り上げ）。\nアルファード： 30分毎に 2,500円（税込）\nハイエース： 30分毎に 3,000円（税込）",
        },
        {
          q: "チャイルドシートや空港ミートアップ（ネームボード）は有料ですか。",
          a: "いいえ、すべて無料（0円）でご提供しております。チャイルドシート（ジュニアシート）の手配、および空港到着ロビーでのネームボード掲示（ミート＆グリート）をご希望の際は、車両手配の都合上、お早めにオペレーターまでお申し出ください。",
        },
        {
          q: "支払手段は何ですか？車内でドライバーに直接支払うことはできますか？",
          a: "車内での現金決済に対応しているほか、運行前にクレジットカードをご登録いただければ、運行終了後に弊社のオンラインStripeシステムを通じて自動的に決済を完了させることも可能です。クレジットカードをお持ちでない法人のお客様は、事前の銀行振込をお申し出ください。",
        },
        {
          q: "領収書は発行されますか。",
          a: "はい、サービス利用終了後、Stripe システムよりご登録のメールアドレス宛てへ電子領収書（PDF）を自動送付いたします。",
        },
      ],
    },
    {
      group: "❌ キャンセルポリシー",
      items: [
        {
          q: "取消料（キャンセル料）はいつから発生しますか。",
          a: "ご予約確定後のキャンセルにつきましては、特定商取引法に基づく表記に則り、以下の通りキャンセル料を申し受けます。\n配車日の48時間前まで： 無料（全額返金）\n配車日の24時間前〜48時間前まで： お見積り金額の 50%\n配車日の24時間以内、または無断キャンセル： お見積り金額の 100%\n※航空便の欠航など不可抗力による場合は、速やかにお知らせいただくことでキャンセル料は免除となります。",
        },
      ],
    },
  ],
  en: [
    {
      group: "🚗 Vehicles & In-Car Rules",
      items: [
        {
          q: "What kind of vehicles will be deployed?",
          a: "We specialize exclusively in luxury fleet management, deploying premium Toyota Alphard (Max 6 passengers) and spacious Toyota Hiace (Max 9 passengers). We do not deploy standard sedans.",
        },
        {
          q: "Is smoking, eating, or drinking allowed inside the vehicle?",
          a: "All vehicles are strictly Non-Smoking (including e-cigarettes and vapes). For refreshments, only bottled water/capped beverages and light, odorless snacks are permitted inside the car.",
        },
        {
          q: "Can I travel with my pets?",
          a: "Yes, pets are welcome but must be kept inside a secure pet carrier/crate throughout the journey. Passengers without a proper carrier may be refused boarding.",
        },
        {
          q: "Can you transport our luggage separately during our tour?",
          a: "Yes, absolutely. We frequently manage customized Golf Tours and Hiking/Trekking groups. We can drop you off at the golf course or trailhead and transport your luggage (golf bags, heavy backpacks, etc.) directly to your designated hotel ahead of your arrival. Please note that for legal compliance, we only transport luggage belonging to contracted passengers of our tours; standalone commercial cargo shipping is not permitted.",
        },
        {
          q: "Will my chauffeur be smart and wear a suit and tie?",
          a: "Yes, our chauffeurs are always smartly dressed in a formal suit and tie, maintaining the highest standards of professional appearance.",
        },
        {
          q: "Do the chauffeurs maintain the privacy and confidentiality of their passengers?",
          a: "Yes. Your privacy and confidentiality are our top priorities. Our chauffeurs adhere to the strictest standards; your private conversations and information will be kept strictly secure at all times.",
        },
        {
          q: "Can I charge my phone in the vehicle?",
          a: "Yes. Most of our vehicles are equipped with USB ports and we offer complimentary charging cables compatible with both iPhone and Android devices.",
        },
      ],
    },
    {
      group: "💴 Rates & Payments",
      items: [
        {
          q: "Do you charge for waiting time (e.g., flight delays)?",
          a: "We offer a generous 90-minute complimentary waiting period starting from your scheduled pickup time (or actual flight landing time). If the delay exceeds 90 minutes, an extended waiting fee will apply for every 30 minutes (rounded up to the nearest 30-minute block):\nToyota Alphard: JPY 2,500 (incl. tax) per 30 mins\nToyota Hiace: JPY 3,000 (incl. tax) per 30 mins",
        },
        {
          q: "Are child seats and Airport Meet & Greet services extra?",
          a: "No, both services are 100% Complimentary (Free of Charge). If you require a child/junior safety seat or a personalized name-board greeting at the arrival lobby, please notify our team in advance so we can guarantee availability.",
        },
        {
          q: "What are the payment methods? Can I pay the chauffeur directly inside the vehicle?",
          a: "We accept cash payments inside the vehicle, or you can pre-register your credit card before the trip for automatic billing via our online Stripe system upon completion. Corporate clients without credit cards may also apply for upfront bank transfers.",
        },
        {
          q: "Will I receive a receipt?",
          a: "Yes, a digital formal receipt (PDF) will be automatically dispatched to your registered email address via Stripe immediately after your trip concludes.",
        },
      ],
    },
    {
      group: "❌ Cancellation Policy",
      items: [
        {
          q: "What is your cancellation policy?",
          a: "Cancellations are governed by our official Legal Notice under the Specified Commercial Transactions Act:\nUp to 48 hours before pickup: Free of charge (100% Refund)\nBetween 24 to 48 hours before pickup: 50% of the estimated quote\nWithin 24 hours or No-Show: 100% of the estimated quote\nNote: Cancellation fees are waived if your flight is officially canceled by the airline, provided you notify us immediately.",
        },
      ],
    },
  ],
  zh: [
    {
      group: "🚗 车辆及车内守则",
      items: [
        {
          q: "预订后会派发什么样的车辆？",
          a: "本公司专注于高端礼宾包车服务，旗下车队仅由豪华商务车 丰田埃尔法（Alphard，最大载客6人） 及大容量商旅车 丰田海狮（Hiace，最大载客9人） 组成。我们不提供普通轿车车型。",
        },
        {
          q: "车内可以吸烟或饮食吗？",
          a: "专属车厢内全面禁烟（包括电子烟）。为了保证乘车舒适度，车内仅允许饮用瓶装水或带盖饮料，并允许食用无刺激性气味的轻食点心。",
        },
        {
          q: "可以携带宠物一同乘车吗？",
          a: "可以。为了保障行车安全，携带宠物乘车时请务必提前将其放入宠物航空箱或便携笼内。若未携带合规宠物笼，司机有权拒绝其上车，敬请谅解。",
        },
        {
          q: "团队行程中，车辆可以帮我们单独将行李运送到酒店吗？",
          a: "可以，这正是我们高尔夫球团和徒步登山团的核心特色服务。我们可以先将您送至高尔夫球场或登山起点，随后由专属车辆将您的行李（如高尔夫球包、重型登山包等）先行送往您今晚入住的酒店并办理寄存，让您全程轻松出行。需要注意的是，基于日本法规，我们仅提供本团签约客人的随行行李分流运送，不接受无乘客随行的纯商业货运。",
        },
        {
          q: "司机会穿着正式、系领带吗？",
          a: "是的，我们的司机始终穿着正式的西装并佩戴领带，保持最高标准的专业仪表。",
        },
        {
          q: "司机会保护乘客的隐私和保密性吗？",
          a: "是的。保护您的隐私和机密是我们的重中之重。我们的司机遵循最严格的保密标准，确保您的私密对话和行程信息在任何时候都绝对安全。",
        },
        {
          q: "可以在车内给手机充电吗？",
          a: "可以。我们的车辆均配有USB接口，并免费提供兼容 iPhone 和 Android 设备的车载充电线。",
        },
      ],
    },
    {
      group: "💴 费用与支付相关",
      items: [
        {
          q: "司机接机等待会产生超时费吗？（如航班延误）",
          a: "本公司提供极具诚意的 90分钟免费等待服务（自您预约的接机时间或航班实际落地时间起算）。若超时超过90分钟，将按每30分钟为单位收取超时等待费（不足30分钟按30分钟计）：\n丰田埃尔法 (Alphard)： 每30分钟加收 2,500 日元（含税）\n丰田海狮 (Hiace)： 每30分钟加收 3,000 日元（含税）",
        },
        {
          q: "儿童安全座椅和机场举牌接机（Meet & Greet）怎么收费？",
          a: "完全免费（0日元）。我们免费提供儿童安全座椅/婴儿座椅，并免费提供到达大厅举牌接机服务。为了便于提前调度，请在预订时尽早向客服提出申请。",
        },
        {
          q: "支付方式是什么？可以在车内直接付款给司机吗？",
          a: "我们支持车内现金结账，也可以在行程前绑定信用卡，行程结束后通过我们的 Stripe 线上系统自动完成扣款。如企业法人客户确无信用卡，可申请提前进行银行转账。",
        },
        {
          q: "行程结束后是否有发票/收据？",
          a: "有。在您的行程结束扣款完成后，Stripe 系统会自动将合规的电子收据（PDF格式领収書）发送至您注册的电子邮箱。",
        },
      ],
    },
    {
      group: "❌ 取消政策",
      items: [
        {
          q: "取消订单如何收费？",
          a: "订单取消政策严格遵循日本《特定商业交易法》公示条款执行：\n用车时间前 48 小时以上取消： 免费（全额退款）\n用车时间前 24 至 48 小时内取消： 收取预计行程总额的 50%\n用车时间前 24 小时内取消或无故未到（No-Show）： 收取预计行程总额的 100%\n注：如因台风、航班突发欠航等不可抗力导致无法出行，在您提供航司凭证并及时通知我们的前提下，将免收取消手续费。",
        },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════
   Sub-components  (all sizes ×1.2 vs original)
══════════════════════════════════════════════════════════════════════ */

/* Section label — was [10px]/[11px], now [12px]/[13px] */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-7 sm:mb-9">
      {/* line was w-5, now w-6 */}
      <span className="w-6 h-px bg-[#c9a84c]" />
      <p className="text-[#c9a84c] text-[12px] sm:text-[13px] tracking-[0.45em] uppercase font-semibold">{label}</p>
    </div>
  );
}

/* FAQ row — was [12px]/[13px] Q text, now [14px]/[16px] */
function FaqRow({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  return (
    <div className={`border-b border-white/[0.07] transition-colors duration-200 ${open ? "border-[#c9a84c]/20" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-5 py-5 sm:py-6 text-left group"
      >
        {/* Q text: was [12px]/[13px] → [14px]/[16px] */}
        <span className={`text-[14px] sm:text-[16px] tracking-[0.05em] leading-relaxed transition-colors duration-200 ${open ? "text-white" : "text-white/65 group-hover:text-white/90"}`}>
          {item.q}
        </span>
        {/* icon circle: was w-5 h-5, now w-6 h-6 */}
        <span className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-200 mt-0.5
          ${open ? "border-[#c9a84c]/60 text-[#c9a84c]" : "border-white/20 text-white/30 group-hover:border-white/40"}`}>
          {/* chevron: was w-2.5 h-2.5, now w-3 h-3 */}
          <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
      {open && (
        /* A text: was [12px]/[13px] → [14px]/[15px]; whitespace-pre-line for \n line breaks */
        <p className="pb-6 text-[14px] sm:text-[15px] text-white/50 leading-relaxed tracking-[0.03em] pr-9 whitespace-pre-line">
          {item.a}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const { lang } = useLang();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (key: string) => setOpenKey(prev => (prev === key ? null : key));

  return (
    <main className="min-h-screen bg-[#0c0c0c]">

      {/* ── Compact hero ───────────────────────────────────────────── */}
      <div className="relative bg-[#0c0c0c] pt-[82px] sm:pt-24 pb-10 sm:pb-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }} />

        <Header />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          {/* badge: was [9px] → [11px] */}
          <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] mb-2.5 uppercase">{HERO[lang].badge}</p>
          {/* title: was text-xl/2xl/3xl → text-2xl/3xl/4xl */}
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.12em] sm:tracking-[0.16em] leading-tight">
            {HERO[lang].title}
          </h1>
          {/* sub: was [10px] → [12px] */}
          <p className="mt-2 text-white/35 text-[12px] tracking-[0.28em] uppercase">{HERO[lang].sub}</p>

          {/* anchor links: was [10px] → [12px]; line was w-3.5 → w-4 */}
          <div className="flex items-center gap-7 mt-7 sm:mt-9">
            <Link href="#story"
              className="flex items-center gap-2.5 text-white/45 text-[12px] tracking-[0.22em] uppercase hover:text-[#c9a84c] transition-colors">
              <span className="w-4 h-px bg-current" />
              {HERO[lang].link_story}
            </Link>
            <Link href="#faq"
              className="flex items-center gap-2.5 text-white/45 text-[12px] tracking-[0.22em] uppercase hover:text-[#c9a84c] transition-colors">
              <span className="w-4 h-px bg-current" />
              {HERO[lang].link_faq}
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          STORY SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section id="story" className="scroll-mt-20 bg-[#111111] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          <SectionLabel label={lang === "ja" ? "ブランドストーリー" : lang === "zh" ? "品牌故事" : "Our Story"} />

          {/* Story text + image placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-10 lg:gap-16 items-start">

            {/* Text column */}
            <div>
              {/* H2: was text-2xl/3xl/4xl → text-3xl/4xl/5xl */}
              <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.07em] leading-snug mb-7 sm:mb-9">
                {STORY_TITLE[lang]}
              </h2>
              {/* body: was [13px]/[14px] → [15px]/[17px] */}
              <p className="text-white/60 text-[15px] sm:text-[17px] leading-[1.9] tracking-[0.03em] mb-6">
                {STORY_P1[lang]}
              </p>
              <p className="text-white/60 text-[15px] sm:text-[17px] leading-[1.9] tracking-[0.03em]">
                {STORY_P2[lang]}
              </p>

              <div className="mt-9 sm:mt-12">
                {/* CTA: was [11px] → [13px] */}
                <Link href="/book"
                  className="inline-flex items-center gap-3 border border-[#c9a84c]/50 text-[#c9a84c] text-[13px] tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-[#c9a84c] hover:text-black transition-all duration-200">
                  {lang === "ja" ? "ご予約はこちら" : lang === "zh" ? "立即預訂" : "Book Now"}
                </Link>
              </div>
            </div>

            {/* Image placeholder — portrait 3:4 */}
            <div className="relative w-full max-w-[310px] mx-auto lg:mx-0">
              <div className="aspect-[3/4] bg-[#1a1a1a] border border-white/[0.07] flex flex-col items-center justify-center gap-4 overflow-hidden">
                {/* corner lines */}
                <div className="absolute top-3 left-3 w-7 h-7 border-t border-l border-[#c9a84c]/40" />
                <div className="absolute top-3 right-3 w-7 h-7 border-t border-r border-[#c9a84c]/40" />
                <div className="absolute bottom-3 left-3 w-7 h-7 border-b border-l border-[#c9a84c]/40" />
                <div className="absolute bottom-3 right-3 w-7 h-7 border-b border-r border-[#c9a84c]/40" />
                {/* camera icon: was w-8/h-8 → w-10/h-10 */}
                <svg className="w-10 h-10 text-white/15" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
                {/* label: was [9px] → [11px] */}
                <p className="text-white/20 text-[11px] tracking-[0.2em] uppercase text-center px-6 leading-relaxed">
                  {lang === "ja" ? "写真をここに挿入" : lang === "zh" ? "在此插入圖片" : "Insert photo here"}
                </p>
                <p className="text-white/15 text-[10px] tracking-[0.12em] text-center px-6 leading-relaxed">
                  720 × 960 px · 3:4
                </p>
              </div>
              {/* caption: was [9px] → [11px] */}
              <p className="mt-3 text-white/20 text-[11px] tracking-[0.12em] leading-relaxed text-center lg:text-left">
                {lang === "ja"
                  ? "推奨：黒いアルファードのドアを開ける白手袋チャウファー。東京/伝統的な門を背景に、ゴールデンアワー撮影。縦位置 3:4・最小720×960px"
                  : lang === "zh"
                  ? "建議：戴白手套的司機為黑色 Alphard 開門。背景為東京天際線或傳統鳥居。黃金時刻·縱向3:4·最小720×960px"
                  : "Suggested: Chauffeur in dark suit & white gloves opening black Alphard door. Tokyo skyline or traditional gate. Golden hour · Portrait 3:4 · min 720×960px"}
              </p>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════
              Section 2: 4 Core Services
          ════════════════════════════════════════════════════════ */}
          <div className="mt-20 sm:mt-28">
            <SectionLabel label={lang === "ja" ? "4つのコアサービス" : lang === "zh" ? "四大核心服務" : "Four Core Services"} />

            {/* sub-section heading: was [14px]/[15px] → [17px]/[18px] */}
            <h3 className="text-white text-[17px] sm:text-[18px] font-light tracking-[0.1em] mb-3">
              {SVC_SECTION_TITLE[lang]}
            </h3>
            {/* lead: was [13px]/[14px] → [15px]/[17px] */}
            <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed tracking-[0.03em] mb-10 sm:mb-12">
              {SVC_SECTION_LEAD[lang]}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06]">
              {SERVICES[lang].map((svc, i) => (
                <div key={i} className="bg-[#111111] p-7 sm:p-10 group hover:bg-[#161616] transition-colors duration-200">
                  {/* number: was [36px] → [43px] */}
                  <p className="text-[#c9a84c]/35 text-[43px] font-bold tracking-tight leading-none mb-5 font-mono
                                group-hover:text-[#c9a84c]/55 transition-colors duration-200">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  {/* service title: was [14px]/[15px] → [17px]/[18px] */}
                  <h4 className="text-white text-[17px] sm:text-[18px] font-medium tracking-[0.08em] mb-3.5 leading-snug">
                    {svc.title}
                  </h4>
                  {/* service body: was [12px]/[13px] → [14px]/[16px] */}
                  <p className="text-white/45 text-[14px] sm:text-[16px] leading-[1.85] tracking-[0.03em]">
                    {svc.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════
              Section 3: Vehicles
          ════════════════════════════════════════════════════════ */}
          <div className="mt-20 sm:mt-28">
            <SectionLabel label={VEH_SECTION_BADGE[lang]} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
              {VEHICLES[lang].map((veh, i) => (
                <div key={i}
                  className="relative bg-[#0f0f0f] border border-white/[0.07] overflow-hidden group hover:border-white/[0.14] transition-all duration-300">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />

                  {/* vehicle image */}
                  <div className="bg-white mx-6 mt-7 mb-0 h-[170px] sm:h-[200px] flex items-center justify-center overflow-hidden">
                    <Image
                      src={i === 0 ? ALPHARD_IMG : HIACE_IMG}
                      alt={veh.name}
                      width={360}
                      height={210}
                      className="object-contain mix-blend-multiply w-full h-full p-2"
                    />
                  </div>

                  <div className="px-6 py-6">
                    {/* vehicle name: was [13px]/[14px] → [16px]/[17px] */}
                    <h3 className="text-white text-[16px] sm:text-[17px] font-medium tracking-[0.1em] mb-3 leading-snug">
                      {veh.name}
                    </h3>
                    {/* vehicle body: was [12px] → [14px] */}
                    <p className="text-white/40 text-[14px] leading-[1.8] tracking-[0.03em]">{veh.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Gold divider ────────────────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/35 to-transparent" />

      {/* ══════════════════════════════════════════════════════════════
          FAQ SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section id="faq" className="scroll-mt-20 bg-[#0c0c0c] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <SectionLabel label={lang === "ja" ? "よくある質問" : lang === "zh" ? "常見問題" : "FAQ"} />

          {/* FAQ title: was text-2xl/3xl → text-3xl/4xl */}
          <h2 className="text-white text-3xl sm:text-4xl font-light tracking-[0.1em] mb-11 sm:mb-16">
            {lang === "ja" ? "よくあるご質問" : lang === "zh" ? "常見問題" : "Frequently Asked Questions"}
          </h2>

          <div className="space-y-11 sm:space-y-14">
            {FAQ[lang].map((group) => (
              <div key={group.group}>
                {/* group heading: was [10px] → [12px]; line was w-3 → w-4 */}
                <div className="flex items-center gap-3.5 mb-1">
                  <span className="w-4 h-px bg-[#c9a84c]/50" />
                  <p className="text-[#c9a84c]/70 text-[12px] tracking-[0.35em] uppercase font-semibold">
                    {group.group}
                  </p>
                </div>
                <div className="border-t border-white/[0.07] mt-3">
                  {group.items.map((item, idx) => {
                    const key = `${group.group}-${idx}`;
                    return (
                      <FaqRow
                        key={key}
                        item={item}
                        open={openKey === key}
                        onToggle={() => toggle(key)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* CTA block */}
          <div className="mt-16 sm:mt-22 border border-white/[0.07] p-9 sm:p-12 text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mb-9" />
            {/* was [11px] → [13px] */}
            <p className="text-white/40 text-[13px] tracking-[0.25em] uppercase mb-3">
              {lang === "ja" ? "もっと詳しく知りたい方は" : lang === "zh" ? "有其他疑問？" : "Still have questions?"}
            </p>
            {/* was [14px]/[15px] → [17px]/[18px] */}
            <p className="text-white text-[17px] sm:text-[18px] tracking-[0.06em] mb-7 leading-relaxed">
              {lang === "ja"
                ? "お気軽にご予約フォームからお問い合わせください。"
                : lang === "zh"
                ? "歡迎透過預訂表單與我們聯繫。"
                : "Reach out through our booking form and we'll be happy to help."}
            </p>
            {/* was [11px] → [13px] */}
            <Link href="/book"
              className="inline-flex items-center gap-3 bg-[#c9a84c] text-black text-[13px] font-bold tracking-[0.25em] uppercase px-9 py-4 hover:bg-white transition-all duration-200">
              {lang === "ja" ? "ご予約・お問い合わせ" : lang === "zh" ? "預訂 / 聯絡我們" : "Book / Contact Us"}
            </Link>
          </div>

        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
