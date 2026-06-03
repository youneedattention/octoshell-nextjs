"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/context/LangContext";
import type { Lang } from "@/lib/translations";
import React from "react";

/* ── Vehicle images ─────────────────────────────────────────────────── */
const ALPHARD_IMG = "https://octoshell.jp/wp-content/uploads/2024/09/toyotaalphard.png";
const HIACE_IMG   = "https://octoshell.jp/wp-content/uploads/2024/09/toyatahiace.png";

/* ══════════════════════════════════════════════════════════════════════
   EXACT USER-PROVIDED COPY — strictly verbatim, three languages
══════════════════════════════════════════════════════════════════════ */

/* ── Hero ───────────────────────────────────────────────────────────── */
const HERO: Record<Lang, { badge: string; title: string; sub: string; link_story: string; link_faq: string; link_contact: string }> = {
  ja: { badge: "会社情報", title: "Octoshellについて", sub: "日本プライベートチャウファーサービス", link_story: "Octoshellについて", link_faq: "よくある質問", link_contact: "お問い合わせ" },
  en: { badge: "About Us", title: "The Octoshell Story", sub: "Japan Private Chauffeur Service",     link_story: "How It Works", link_faq: "FAQ",           link_contact: "Contact Us" },
  zh: { badge: "關於我們", title: "品牌故事",          sub: "日本專屬司機服務",                     link_story: "品牌故事",    link_faq: "常見問題",        link_contact: "聯絡我們" },
};

/* ── Section 1: Brand story ─────────────────────────────────────────── */
const STORY_TITLE: Record<Lang, string> = {
  ja: "移動の常識を変える",
  en: "Changing the Travel Game",
  zh: "顛覆傳統出行的遊戲規則",
};
const STORY_P1: Record<Lang, string> = {
  ja: "貝八方は日本・東京で誕生しました。遠い古より「貝」は尊い富の象徴であり、「八方」は四面八方、すなわち世界中から集まる人々を意味します。私たちは、世界八方からお越しになるすべてのお客様を、かけがえのない「宝」としてお迎えするという信念のもと、プロフェッショナルなハイヤーサービスを展開しています。",
  en: 'Octoshell was founded in Tokyo, Japan. In ancient times, "shells" were a symbol of precious wealth, while "octo" represents the eight directions of the world. Our brand philosophy is rooted in welcoming every guest arriving from all corners of the globe as our most precious treasure.',
  zh: "貝八方於日本東京創立。在遠古時代，「貝」是珍稀財富的象徵；而「八方」則代表四面八方，寓意源自世界各地的賓客。我們的品牌初衷，便是將來自世界八方的每一位客戶，都奉為我們無可替代的至寶，並提供最頂級的專車款待。",
};
const STORY_P2: Record<Lang, string> = {
  ja: "私たちの旅は、歴史ある谷間にひっそりと佇む名門の高級温泉旅館「修善寺離れ宿 鬼の栖」へ向かう格式高い旅客のために、静寂に満ちた極上の移動空間を仕立てるという、ひとつの深いこだわりから始まりました。真の贅沢とは目的地に到着した瞬間ではなく、その高鳴る胸を包み込む移動の刹那にこそ存在することに気づいたのです。今日、私たちは日本国内の独立した緑ナンバーの合規旅客運送資格を持つ、国際的なプロフェッショナル車隊・移動サービスプラットフォームへと変貌を遂げました。そのネットワークは大東京圏内にとどまらず、日本全国のあらゆる場所に広がっています。車内の圧倒的な私密性でお客様を繭のように優しく包み込み、すべての旅路を旅館の離れそのものの延長線上にある、至高のプロローグへと昇華させます。",
  en: "Our journey began with a singular, intimate obsession: crafting a seamless, whispering transition for elite travelers journeying to Shuzenji Hanare Yado Oni no Sumika—a legendary hot-spring sanctuary hidden deep within Japan's historic valleys. We realized that true luxury does not begin at the destination, but in the fleeting, breathless moments in between. Today, Octoshell has evolved into a global mobility platform operating with fully independent Japanese licensed transportation and green-plate compliance. Extending far beyond the Greater Tokyo Area to every corner of Japan, we transform every journey into an exquisite extension of the estate itself—cocooning them in privacy, elevating the art of movement into an unforgettable prelude of indulgence.",
  zh: "誕生之初，這源於一個極致細膩的私人執念：為前往隱匿於日本歷史山谷中的傳奇溫泉聖地——「修善寺離宿 鬼棲」的頂級貴賓，打造一段毫無縫隙、如呢喃般靜謐的移動過渡。我們深知，真正的奢華並非始於抵達目的地的那一刻，而是在那段屏息期待的行車時光中。今天，我們已然蛻變為一家擁有獨立日本綠牌合規客運資質的國際化專業車隊與出行服務平台。我們的團隊與專業司機網絡不僅覆蓋大東京地區，更已觸及日本的每個角落。我們將每一次旅程都轉化為莊園本身的優雅延伸，將賓客溫柔地包裹在絕對的私密空間中，將移動的藝術昇華為一場令人難忘的奢華序曲。",
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
          a: "弊社では、最高級ミニバンの「トヨタ・アルファード（最大5名様）」および大型ビジネスバンの「トヨタ・ハイエース（最大9名様）」の2車種を専門に手配しております。セダンタイプ等の配車はございません。",
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
          a: "はい、可能です。車両には充電用ポートが装備されており、アイフォンおよびアンドロイド端末に対応した充電ケーブルを無料でご用意しております。",
        },
      ],
    },
    {
      group: "💴 料金・お支払いについて",
      items: [
        {
          q: "待機料金（飛行機の遅延等）は発生しますか。",
          a: "担当乗務員がお客様の航空便の運航状況を追跡し、実際の着陸時間に合わせてお迎え時間を調整いたします。実際の着陸時刻から90分を超過して待機が発生した場合、以下の通り30分毎に超過待機料金が発生いたします（30分未満は30分に切り上げ）。\nアルファード： 30分毎に 2,500円（税込）\nハイエース： 30分毎に 3,000円（税込）",
        },
        {
          q: "万が一、運行中にルートの変更や利用時間の延長が必要になった場合はどうすればよいですか？",
          a: "速やかに乗務員にお申し付けください。乗務員がすぐに配車センターと連絡を取り、追加料金を確認いたします。突発的なルート変更や時間延長によって新たに発生した高速道路料金、有料道路料金、回送通行料、駐車場料金、乗務員宿泊費、および時間延長割増料金は最終決済時に合算されます。弊社のハイヤーサービスは完全予約制で運行しているため、当日の予約状況によっては突発的な変更や延長のご要望にお応えできない場合もございますので、予めご了承ください。",
        },
        {
          q: "高速道路料金、有料道路料金、駐車場料金、乗務員宿泊費などは別料金ですか？",
          a: "いいえ、弊社の提示する当初のお見積り金額はすべて込みの総額料金（包干価格）です。あらかじめご提出いただいた行程を運行するために必要な高速道路料金、有料道路料金、回送通行料、駐車場料金、および乗務員の宿泊費用（遠方・泊まりがけの場合）はすべて基本料金に含まれております。運行開始後に急なルート変更のご要望がない限り、追加費用は一切発生いたしません。",
        },
        {
          q: "チャイルドシートや空港ミートアップ（ネームボード）は有料ですか。",
          a: "いいえ、すべて無料（0円）でご提供しております。チャイルドシート（ジュニアシート）の手配、および空港到着ロビーでのネームボード掲示（ミート＆グリート）をご希望の際は、車両手配の都合上、お早めにオペレーターまでお申し出ください。",
        },
        {
          q: "支払手段は何ですか？車内でドライバーに直接支払うことはできますか？",
          a: "車内での現金決済に対応しているほか、運行前にクレジットカードをご登録いただければ、運行終了後に弊社のオンライン決済システム（ストライプ）を通じて自動的に決済を完了させることも可能です。クレジットカードをお持ちでない法人のお客様は、事前の銀行振込をお申し出ください。",
        },
        {
          q: "領収書は発行されますか。",
          a: "はい、クレジットカード決済のお客様には、サービス利用終了後、決済システムよりご登録のメールアドレス宛てへ電子領収書（電子媒体の書面）を自動送付いたします。現金決済のお客様には、ご希望に応じて電子媒体の領収書または請求書を発行いたします。",
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
          a: "We specialize exclusively in luxury fleet management, deploying premium Toyota Alphard (Max 5 passengers) and spacious Toyota Hiace (Max 9 passengers). We do not deploy standard sedans.",
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
          a: "Our chauffeur will follow up your flight info and adjust the pick up time accordingly. If the waiting time exceeds 90 minutes after the actual landing time, an extended waiting fee will apply for every 30 minutes (rounded up to the nearest 30-minute block):\nToyota Alphard: JPY 2,500 (incl. tax) per 30 mins\nToyota Hiace: JPY 3,000 (incl. tax) per 30 mins",
        },
        {
          q: "What if a passenger needs to change the route or extend the service time spontaneously?",
          a: "Please communicate with the chauffeur immediately, and they will contact the Dispatch Center to confirm the additional charges. New highway tolls, parking fees, deadhead tolls, chauffeur accommodation expenses, and hourly extension surcharges incurred due to spontaneous route/time changes will be added to your final bill. Since our services are pre-scheduled, please understand that we may not be able to accommodate all last-minute requests.",
        },
        {
          q: "Are highway tolls, parking fees, and chauffeur accommodation included in the price?",
          a: "Yes. Our initial quotes are strictly all-inclusive. All standard highway tolls, parking fees, deadhead tolls, and chauffeur overnight accommodation expenses required for your scheduled itinerary are fully included in the total price. No hidden fees will be added unless you request route modifications during the journey.",
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
          a: "Yes, for credit card payments, a digital formal receipt (PDF) will be automatically dispatched to your registered email address via Stripe immediately after your trip concludes. For cash payments, we will provide a PDF receipt or invoice upon request.",
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
      group: "🚗 車輛及車內守則",
      items: [
        {
          q: "預訂後會派發什麼樣的車輛？",
          a: "本公司專注於高端禮賓包車服務，旗下車隊僅由豪華商務車 「豐田埃爾法（最大載客5人）」 及大容量商旅車 「豐田海獅（最大載客9人）」 組成。我們不提供普通轎車車型。",
        },
        {
          q: "車內可以吸煙或飲食嗎？",
          a: "專屬車廂內全面禁煙（包括電子煙）。為了保證乘車舒適度，車內僅允許飲用瓶裝水或帶蓋飲料，並允許食用無刺激性氣味的輕食點心。",
        },
        {
          q: "可以攜帶寵物一同乘車嗎？",
          a: "可以。為了保障行車安全，攜帶寵物乘車時請務必提前將其放入寵物航空箱或便攜籠內。若未攜帶合規寵物籠，司機有權拒絕其上車，敬請諒解。",
        },
        {
          q: "團隊行程中，車輛可以幫我們單獨將行李運送到酒店嗎？",
          a: "可以，這正是我們高爾夫球團和徒步登山團的核心特色服務。我們可以先將您送至高爾夫球場或登山起點，隨後由專屬車輛將您的行李（如高爾夫球包、重型登山包等）先行送往您今晚入住的酒店並辦理寄存，讓您全程輕鬆出行。需要注意的是，基於日本法規，我們僅提供本團簽約客人的隨行行李分流運送，不接受無乘客隨行的純商業貨運。",
        },
        {
          q: "司機會穿著正式、配戴領帶嗎？",
          a: "是的，我們的司機始終穿著正式的西裝並配戴領帶，保持最高標準的專業儀表。",
        },
        {
          q: "司機會保護乘客的隱私和保密性嗎？",
          a: "是的。保護您的隱私和機密是我們的重中之重。我們的司機遵循最嚴格的保密標準，確保您的私密對話和行程信息在任何時候都絕對安全。",
        },
        {
          q: "可以在車內給手機充電嗎？",
          a: "可以。我們的車輛均配有充電接口，並免費提供兼容蘋果和安卓設備的車載充電線。",
        },
      ],
    },
    {
      group: "💴 費用與支付相關",
      items: [
        {
          q: "司機接機等待會產生超時費嗎？（如航班延誤）",
          a: "擔當司機會主動追蹤您的航班動態，並根據航班實際落地時間靈活調整接機時間。若在航班實際著陸後，等待時間超過90分鐘，將按每30分鐘為單位收取超時等待費（不足30分鐘按30分鐘計）：\n豐田埃爾法： 每30分鐘加收 2,500 日元（含稅）\n豐田海獅： 每30分鐘加收 3,000 日元（含稅）",
        },
        {
          q: "萬一乘客在行程中臨時需要修改路線或增加用車時間怎麼辦？",
          a: "請立即與司機溝通，司機會馬上與調度中心取得聯繫並確認追加費用。因乘客臨時變更路線或超時而全新產生的高速公路費、收費道路費、回送通行費、停車場費、司機住宿費以及時間延長溢價費用，將據實累加至您的最終賬單中。由於我們的包車服務均為提前排單預約制，請諒解當天的實際預約情況可能會有無法滿足您臨時需求的情況發生。",
        },
        {
          q: "高速公路費、收費道路費、停車場費、司機住宿費等需要另外支付嗎？",
          a: "不需要。本公司所提供的初始估價均採包乾制。凡是為了運行您預定行程所必需的高速公路費、收費道路費、回送通行費、停車場費以及司機隨行住宿費（限遠途及跨夜行程），均已完整包含在總價中。除非您在出車後臨時變更行程，否則絕無任何隱形或追加費用。",
        },
        {
          q: "兒童安全座椅和機場舉牌接機怎麼收費？",
          a: "完全免費（0日元）。我們免費提供兒童安全座椅/嬰兒座椅，並免費提供到達大廳舉牌接機服務。為了便利提前調度，請在預訂時儘早向客服提出申請。",
        },
        {
          q: "支付方式是什麼？可以在車內直接付款給司機嗎？",
          a: "我們支持車內現金結帳，也可以在行程前綁定信用卡，行程結束後通過我們的線上支付系統（藍條支付）自動完成扣款。如企業法人客戶確無信用卡，可申請提前進行銀行轉帳。",
        },
        {
          q: "行程結束後是否有發票或收據？",
          a: "有。使用信用卡支付的客戶，在行程結束扣款完成後，系統會自動將合規的電子收據（格式為PDF電子領收書）發送至您註冊的電子郵箱。使用現金結帳的客戶，我們將根據您的需求，在行程結束後提供電子收據或請款單。",
        },
      ],
    },
    {
      group: "❌ 取消政策",
      items: [
        {
          q: "取消訂單如何收費？",
          a: "訂單取消政策嚴格遵循日本《特定商業交易法》公示條款執行：\n用車時間前 48 小時以上取消： 免費（全額退款）\n用車時間前 24 至 48 小時內取消： 收取預計行程總額的 50%\n用車時間前 24 小時內取消或無故未到： 收取預計行程總額的 100%\n註：如因颱風、航班突發欠航等不可抗力導致無法出行，在您提供航司憑證並及時通知我們的前提下，將免收取消手續費。",
        },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════
   Sub-components  (all sizes ×1.2 vs original)
══════════════════════════════════════════════════════════════════════ */

/* ── New 6-group category names ─────────────────────────────────────── */
const GROUP_NAMES: Record<Lang, [string, string, string, string, string, string]> = {
  en: ["About Us", "Prices & Fees", "Cars & Luggage", "Booking & Cancellation", "At the Airport", "Special Requests"],
  ja: ["私たちについて", "料金・費用", "車両・手荷物", "予約・キャンセル", "空港当日", "特別リクエスト"],
  zh: ["關於我們", "費用與收費", "車輛與行李", "預訂與取消", "在機場", "特殊需求"],
};

/* ── Extra Q&As (edit here to add / modify) ─────────────────────────
   group index:  0=About Us  1=Prices & Fees  2=Cars & Luggage
                 3=Booking & Cancellation  4=At the Airport  5=Special Requests
──────────────────────────────────────────────────────────────────── */
const EXTRA_ITEMS: { g: 0|1|2|3|4|5; q: Record<Lang,string>; a: Record<Lang,string> }[] = [
  /* ── About Us ── */
  {
    g: 0,
    q: { en: "Do your drivers speak English?", ja: "乗務員は英語を話せますか？", zh: "司機會說英語嗎？" },
    a: {
      en: "Yes. All bookings are fully supported in English. Our drivers have working English for day-to-day communication. For complex conversations we use translation tools to assist.",
      ja: "はい。すべての予約は英語で対応しております。乗務員は日常会話程度の英語を使用できます。複雑なご要望の際は翻訳ツールを活用してサポートいたします。",
      zh: "是的。我們全程提供英文預訂支援。司機具備日常英語溝通能力，如有複雜需求，亦會借助翻譯工具協助。",
    },
  },
  {
    g: 0,
    q: { en: "Do you operate 24/7?", ja: "24時間対応していますか？", zh: "是否24小時服務？" },
    a: {
      en: "Yes. We operate around the clock with no late-night or early-morning surcharge. All prices are the same regardless of departure time.",
      ja: "はい。24時間365日対応しており、深夜・早朝の割増料金は一切ございません。出発時間に関わらず料金は同一です。",
      zh: "是的。我們全年無休、24小時服務，深夜及清晨均無附加費用，價格不因時段而改變。",
    },
  },
  /* ── Cars & Luggage ── */
  {
    g: 2,
    q: { en: "How much luggage can I bring?", ja: "荷物はどのくらい積めますか？", zh: "可以帶多少行李？" },
    a: {
      en: "Alphard: up to 4 passengers and 4 large suitcases. Hiace: up to 9 passengers and 6+ large suitcases. Please declare your exact luggage count when booking. Oversized items — golf bags, strollers, ski equipment — must be mentioned in advance.",
      ja: "アルファード：最大4名様・大型スーツケース4個。ハイエース：最大9名様・大型スーツケース6個以上。ご予約時に荷物の数を必ずお知らせください。ゴルフバッグ・ベビーカー・スキー用品などの大型荷物は必ず事前にお申し出ください。",
      zh: "埃爾法：最多4人及4件大型行李箱。海獅：最多9人及6件以上大型行李箱。預訂時請告知確切行李數量。高爾夫球包、嬰兒車、滑雪器材等特大行李必須提前說明。",
    },
  },
  {
    g: 2,
    q: { en: "Do you accommodate wheelchair users?", ja: "車椅子の方も利用できますか？", zh: "可以乘坐輪椅嗎？" },
    a: {
      en: "Yes. Please notify us at booking with the wheelchair type (foldable / electric / dimensions) so we can assign a suitable vehicle.",
      ja: "はい。ご予約の際に車椅子の種類（折りたたみ式・電動式・サイズ）をお知らせいただければ、適切な車両をご用意いたします。",
      zh: "可以。預訂時請告知輪椅類型（折疊式／電動式／尺寸），以便我們安排合適的車輛。",
    },
  },
  /* ── Booking & Cancellation ── */
  {
    g: 3,
    q: { en: "Can I request multiple stops?", ja: "複数の立ち寄り先を追加できますか？", zh: "可以安排多個停靠點嗎？" },
    a: {
      en: "Yes. Please list all stops in advance when booking. Additional charges may apply depending on routing.",
      ja: "はい。ご予約時に全ての立ち寄り先をご記入ください。ルートによっては追加料金が発生する場合があります。",
      zh: "可以。請在預訂時列明所有停靠地點。視乎路線，可能需要支付額外費用。",
    },
  },
  {
    g: 3,
    q: { en: "Do you offer hourly charter?", ja: "時間制貸切はできますか？", zh: "可以按小時包車嗎？" },
    a: {
      en: "Yes. Minimum 3 hours. Ideal for multi-stop shopping, corporate meetings, and sightseeing. Book in advance — same-day availability is not guaranteed.",
      ja: "はい。最低3時間からご利用いただけます。複数スポット巡りのショッピング・企業訪問・観光に最適です。事前予約推奨。当日ご予約はご対応できない場合があります。",
      zh: "是的。最少3小時起。適合多站購物、商務拜訪及觀光。建議提前預訂，當天預約未必有車。",
    },
  },
  /* ── At the Airport ── */
  {
    g: 4,
    q: { en: "Where exactly will the driver meet me?", ja: "空港でどこで待っていてもらえますか？", zh: "司機在機場哪裡等候？" },
    a: {
      en: "In the arrivals hall, after customs and baggage claim. Your chauffeur will be holding a name board with your name. Please do not exit the terminal before finding your driver.",
      ja: "到着ロビー（入国審査・手荷物受け取り後）にてお待ちしております。乗務員がお客様のお名前を掲げたネームプレートをお持ちしております。ドライバーを見つける前に建物の外へ出ないようご注意ください。",
      zh: "在到達大廳（通關及取行李後）等候。司機將手持寫有您姓名的接機牌。請在找到司機前勿離開航站樓。",
    },
  },
  {
    g: 4,
    q: { en: "How long does it take from Narita Airport to Tokyo?", ja: "成田空港から東京市内まで何分かかりますか？", zh: "從成田機場到東京市區需要多久？" },
    a: {
      en: "Typically 50–70 minutes. Allow up to 90 minutes during peak hours or if there is an accident on the expressway.",
      ja: "通常50〜70分程度です。ラッシュアワー時や高速道路での事故発生時は、最大90分ほどお見込みください。",
      zh: "通常約50至70分鐘。尖峰時段或高速公路發生事故時，請預留最多90分鐘。",
    },
  },
  {
    g: 4,
    q: { en: "How long does it take from Haneda Airport to Tokyo?", ja: "羽田空港から東京市内まで何分かかりますか？", zh: "從羽田機場到東京市區需要多久？" },
    a: {
      en: "Typically 30–45 minutes. Allow up to 60 minutes during heavy traffic.",
      ja: "通常30〜45分程度です。交通渋滞時は最大60分ほどお見込みください。",
      zh: "通常約30至45分鐘。交通繁忙時請預留最多60分鐘。",
    },
  },
  {
    g: 4,
    q: { en: "How long will the driver wait after landing?", ja: "着陸後どのくらい待ってもらえますか？", zh: "落地後司機會等多久？" },
    a: {
      en: "90 minutes from your actual touchdown — free of charge. This covers customs, immigration, and baggage claim. Beyond 90 minutes for personal reasons: Alphard ¥2,500 / Hiace ¥3,000 per 30 minutes. Waiting caused by flight delays is always free.",
      ja: "実際の着陸時刻から90分間は無料でお待ちします。入国審査・手荷物受け取りに十分な時間です。個人的な理由で90分を超えた場合：アルファード ¥2,500・ハイエース ¥3,000（30分毎）。フライト遅延による超過は常に無料です。",
      zh: "實際落地後90分鐘免費等候，足以完成通關及取行李。若因個人原因超過90分鐘：埃爾法 ¥2,500・海獅 ¥3,000（每30分鐘）。因航班延誤所致的等候永遠免費。",
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
      en: "Yes. We pick up from any address in Tokyo and surrounding areas — hotels, private homes, Airbnb, offices, or any location you specify.",
      ja: "はい。東京都内および近郊であれば、ホテル・個人宅・Airbnb・オフィス等、ご指定のいかなる場所からでも対応いたします。",
      zh: "是的。東京市內及周邊地區任何地址均可，包括酒店、私人住宅、Airbnb、辦公室等您指定的地點。",
    },
  },
  {
    g: 5,
    q: { en: "Do you serve Yokohama cruise terminals?", ja: "横浜のクルーズターミナルも対応していますか？", zh: "可以接送橫濱郵輪碼頭嗎？" },
    a: {
      en: "Yes. We serve Osanbashi Pier and Daikoku Pier. Please include your vessel name and arrival/departure time when booking.",
      ja: "はい。大さん橋ふ頭および大黒ふ頭に対応しております。ご予約の際は船名と入出港時間をお知らせください。",
      zh: "是的。我們服務大棧橋碼頭及大黑碼頭。預訂時請提供船名及到港/離港時間。",
    },
  },
  {
    g: 5,
    q: { en: "Do you go to Tokyo Disney Resort?", ja: "東京ディズニーリゾートへの送迎はできますか？", zh: "可以接送東京迪士尼樂園嗎？" },
    a: {
      en: "Yes. Both Tokyo Disneyland and Tokyo DisneySea entrances.",
      ja: "はい。東京ディズニーランド・東京ディズニーシーの両入口に対応しております。",
      zh: "是的。東京迪士尼樂園及東京迪士尼海洋均可接送。",
    },
  },
  {
    g: 5,
    q: { en: "Do you provide long-distance transfers across Japan?", ja: "日本全国への長距離送迎はできますか？", zh: "可以提供日本全國長途接送嗎？" },
    a: {
      en: "Yes. We operate across Japan — Mt. Fuji, Hakone, Nikko, Karuizawa, ski resorts in Nagano and Niigata, and beyond. Contact us for a quote on any destination.",
      ja: "はい。富士山・箱根・日光・軽井沢・長野や新潟のスキーリゾートなど、日本全国に対応しております。ご希望の目的地へのお見積もりはお気軽にお問い合わせください。",
      zh: "是的。我們覆蓋全日本，包括富士山、箱根、日光、輕井澤、長野及新潟滑雪勝地等。任何目的地均可詢價。",
    },
  },
  {
    g: 5,
    q: { en: "What if I leave something in the car?", ja: "車内に忘れ物をした場合は？", zh: "如果在車上遺留物品怎麼辦？" },
    a: {
      en: "Contact us immediately at info@octoshell.jp. If the item is found, we will arrange return delivery. Shipping costs are at the client's expense.",
      ja: "速やかにinfo@octoshell.jpまでご連絡ください。お忘れ物が見つかり次第、ご返送の手配をいたします。送料はお客様のご負担となります。",
      zh: "請立即聯絡 info@octoshell.jp。若找到遺失物，我們將為您安排寄回。郵寄費用由客人承擔。",
    },
  },
  {
    g: 1,
    q: { en: "Is tipping required?", ja: "チップは必要ですか？", zh: "需要給小費嗎？" },
    a: {
      en: "No. Tipping is not customary in Japan and is never expected by our chauffeurs. A kind word or an online review is the best way to show your appreciation.",
      ja: "不要です。チップは日本では一般的な慣習ではなく、乗務員が期待することもございません。温かいお言葉やオンラインレビューが最大の励みになります。",
      zh: "不需要。日本沒有給小費的習慣，我們的司機也從不期待。若您滿意服務，留下評價或一句好評是最好的回饋。",
    },
  },
];

function buildRegroupedFAQ(faq: Record<Lang, FaqGroup[]>): Record<Lang, FaqGroup[]> {
  const result = {} as Record<Lang, FaqGroup[]>;
  (["en", "ja", "zh"] as Lang[]).forEach((lang) => {
    const veh = faq[lang][0].items;
    const pay = faq[lang][1].items;
    const can = faq[lang][2].items;
    const n   = GROUP_NAMES[lang];
    const base: FaqGroup[] = [
      { group: n[0], items: [veh[4], veh[5]] },
      { group: n[1], items: [pay[2], pay[3], pay[4], pay[5]] },
      { group: n[2], items: [veh[0], veh[1], veh[6]] },
      { group: n[3], items: [can[0], pay[1]] },
      { group: n[4], items: [pay[0]] },
      { group: n[5], items: [veh[2], veh[3]] },
    ];
    // Append extra items to their respective groups
    EXTRA_ITEMS.forEach(({ g, q, a }) => {
      base[g].items.push({ q: q[lang], a: a[lang] });
    });
    result[lang] = base;
  });
  return result;
}

const FAQ_GROUPED = buildRegroupedFAQ(FAQ);

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
    <div className={`border-b border-[var(--c-rule)] transition-colors duration-200 ${open ? "border-[#c9a84c]/20" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-5 py-5 sm:py-6 text-left group"
      >
        {/* Q text */}
        <span className={`text-[14px] sm:text-[16px] tracking-[0.05em] leading-relaxed transition-colors duration-200 ${open ? "text-[var(--c-ink)]" : "text-[var(--c-ink-2)] group-hover:text-[var(--c-ink)]"}`}>
          {item.q}
        </span>
        {/* icon circle */}
        <span className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-200 mt-0.5
          ${open ? "border-[#c9a84c]/60 text-[#c9a84c]" : "border-[var(--c-rule)] text-[var(--c-ink-3)] group-hover:border-[var(--c-ink-2)]"}`}>
          <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-6 text-[14px] sm:text-[15px] text-[var(--c-ink-2)] leading-relaxed tracking-[0.03em] pr-9 whitespace-pre-line">
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
  const [openKey,    setOpenKey]    = useState<string | null>(null);
  const [showForm,   setShowForm]   = useState(false);
  const [submitDone, setSubmitDone] = useState(false);
  const toggle = (key: string) => setOpenKey(prev => (prev === key ? null : key));

  return (
    <main className="min-h-screen bg-[#0c0c0c]">

      {/* ── Compact hero ───────────────────────────────────────────── */}
      <div className="relative bg-[#0c0c0c] pt-[124px] sm:pt-[100px] pb-10 sm:pb-14 overflow-hidden">
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
            <Link href="#contact"
              className="flex items-center gap-2.5 text-white/45 text-[12px] tracking-[0.22em] uppercase hover:text-[#c9a84c] transition-colors">
              <span className="w-4 h-px bg-current" />
              {HERO[lang].link_contact}
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          STORY SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section id="story" className="scroll-mt-24 bg-[var(--c-body)] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          <SectionLabel label={lang === "ja" ? "ブランドストーリー" : lang === "zh" ? "品牌故事" : "Our Story"} />

          {/* Story text + image placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-10 lg:gap-16 items-start">

            {/* Text column */}
            <div>
              {/* H2: was text-2xl/3xl/4xl → text-3xl/4xl/5xl */}
              <h2 className="text-[var(--c-ink)] text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.07em] leading-snug mb-7 sm:mb-9">
                {STORY_TITLE[lang]}
              </h2>
              <p className="text-[var(--c-ink-2)] text-[15px] sm:text-[17px] leading-[1.9] tracking-[0.03em] mb-6">
                {STORY_P1[lang]}
              </p>
              <p className="text-[var(--c-ink-2)] text-[15px] sm:text-[17px] leading-[1.9] tracking-[0.03em]">
                {STORY_P2[lang]}
              </p>

              <div className="mt-9 sm:mt-12">
                {/* CTA: was [11px] → [13px] */}
                <Link href="/book"
                  className="group inline-flex items-center justify-center gap-2.5
                             bg-[#c9a84c] text-[#0c0c0c] text-[12px] sm:text-[13px] tracking-[0.3em] font-black
                             px-8 py-3.5 sm:py-4 transition-all duration-200
                             hover:bg-white
                             shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_4px_28px_rgba(201,168,76,0.5)]">
                  {lang === "ja" ? "ご予約はこちら" : lang === "zh" ? "立即預訂" : "Book Now"}
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
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
            <h3 className="text-[var(--c-ink)] text-[17px] sm:text-[18px] font-light tracking-[0.1em] mb-3">
              {SVC_SECTION_TITLE[lang]}
            </h3>
            <p className="text-[var(--c-ink-2)] text-[15px] sm:text-[17px] leading-relaxed tracking-[0.03em] mb-10 sm:mb-12">
              {SVC_SECTION_LEAD[lang]}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--c-rule)]">
              {SERVICES[lang].map((svc, i) => (
                <div key={i} className="bg-[var(--c-card)] p-7 sm:p-10 group hover:bg-[var(--c-body)] transition-colors duration-200">
                  <p className="text-[#c9a84c]/35 text-[43px] font-bold tracking-tight leading-none mb-5 font-mono
                                group-hover:text-[#c9a84c]/55 transition-colors duration-200">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h4 className="text-[var(--c-ink)] text-[17px] sm:text-[18px] font-medium tracking-[0.08em] mb-3.5 leading-snug">
                    {svc.title}
                  </h4>
                  <p className="text-[var(--c-ink-2)] text-[14px] sm:text-[16px] leading-[1.85] tracking-[0.03em]">
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
                  className="relative bg-[var(--c-card)] border border-[var(--c-rule)] overflow-hidden group hover:border-[#c9a84c]/30 transition-all duration-300">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />

                  {/* vehicle image — keep white bg so mix-blend-multiply works */}
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
                    <h3 className="text-[var(--c-ink)] text-[16px] sm:text-[17px] font-medium tracking-[0.1em] mb-3 leading-snug">
                      {veh.name}
                    </h3>
                    <p className="text-[var(--c-ink-2)] text-[14px] leading-[1.8] tracking-[0.03em]">{veh.body}</p>
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
      <section id="faq" className="scroll-mt-24 bg-[var(--c-body)] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <SectionLabel label={lang === "ja" ? "よくある質問" : lang === "zh" ? "常見問題" : "FAQ"} />

          {/* FAQ title: was text-2xl/3xl → text-3xl/4xl */}
          <h2 className="text-white text-3xl sm:text-4xl font-light tracking-[0.1em] mb-11 sm:mb-16">
            {lang === "ja" ? "よくあるご質問" : lang === "zh" ? "常見問題" : "Frequently Asked Questions"}
          </h2>

          <div className="space-y-11 sm:space-y-14">
            {FAQ_GROUPED[lang].map((group) => (
              <div key={group.group}>
                {/* group heading: was [10px] → [12px]; line was w-3 → w-4 */}
                <div className="flex items-center gap-3.5 mb-1">
                  <span className="w-4 h-px bg-[#c9a84c]/50" />
                  <p className="text-[#c9a84c]/70 text-[12px] tracking-[0.35em] uppercase font-semibold">
                    {group.group}
                  </p>
                </div>
                <div className="border-t border-[var(--c-rule)] mt-3">
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

          {/* ── Contact Us section ── */}
          <div id="contact" className="scroll-mt-24 mt-16 sm:mt-20 border border-[var(--c-rule)] p-9 sm:p-12 text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mb-9" />
            <p className="text-[var(--c-ink-3)] text-[13px] tracking-[0.25em] uppercase mb-3">
              {lang === "ja" ? "もっと詳しく知りたい方は" : lang === "zh" ? "有其他疑問？" : "Still have questions?"}
            </p>
            <p className="text-[var(--c-ink)] text-[17px] sm:text-[18px] tracking-[0.06em] mb-7 leading-relaxed">
              {lang === "ja"
                ? "お気軽にご連絡ください。担当者より折り返しご連絡いたします。"
                : lang === "zh"
                ? "歡迎與我們聯繫，我們將於24小時內回覆您。"
                : "We'd love to hear from you. Our team will respond within 24 hours."}
            </p>

            {!showForm && !submitDone && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-3 bg-[#c9a84c] text-black text-[13px] font-bold tracking-[0.25em] uppercase px-9 py-4 hover:bg-white transition-all duration-200"
              >
                {lang === "ja" ? "お問い合わせ" : lang === "zh" ? "聯絡我們" : "Contact Us"}
              </button>
            )}

            {showForm && !submitDone && (
              <ContactForm
                lang={lang}
                onSuccess={() => { setShowForm(false); setSubmitDone(true); }}
                onCancel={() => setShowForm(false)}
              />
            )}

            {submitDone && (
              <div className="text-center">
                <p className="text-[#c9a84c] text-[16px] sm:text-[18px] tracking-[0.08em] mb-3 font-light">
                  {lang === "ja" ? "送信が完了しました" : lang === "zh" ? "訊息已成功送出" : "Message Sent"}
                </p>
                <p className="text-[var(--c-ink-2)] text-[13px] sm:text-[14px] tracking-[0.05em] leading-relaxed">
                  {lang === "ja"
                    ? "担当者より折り返しご連絡いたします。"
                    : lang === "zh"
                    ? "我們的團隊將盡快與您聯繫。"
                    : "Our team will be in touch with you shortly."}
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ContactForm component
══════════════════════════════════════════════════════════════════════ */
const SUBJECTS: Record<Lang, string[]> = {
  ja: ["一般のお問い合わせ", "ご予約・見積もり", "法人・長期契約", "その他"],
  en: ["General Inquiry", "Booking & Quote Request", "Corporate Contract", "Other"],
  zh: ["一般詢問", "預訂及報價", "企業長期合作", "其他"],
};

const CLABEL: Record<string, Record<Lang, string>> = {
  subject:  { ja: "お問い合わせ種別",      en: "Inquiry Type",           zh: "詢問類型" },
  name:     { ja: "お名前 *",              en: "Your Name *",            zh: "您的姓名 *" },
  email:    { ja: "メールアドレス *",       en: "Email Address *",        zh: "電子郵件 *" },
  phone:    { ja: "電話番号（任意）",       en: "Phone Number (optional)", zh: "電話號碼（選填）" },
  message:  { ja: "ご連絡内容・ご質問 *",   en: "Your Message *",         zh: "詢問內容 *" },
  send:     { ja: "送信する",              en: "Send Message",           zh: "發送訊息" },
  sending:  { ja: "送信中…",              en: "Sending…",               zh: "傳送中…" },
  cancel:   { ja: "キャンセル",            en: "Cancel",                 zh: "取消" },
};

function ContactForm({
  lang,
  onSuccess,
  onCancel,
}: {
  lang: Lang;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [subject, setSubject] = useState(SUBJECTS[lang][0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  // reset subject when lang switches
  React.useEffect(() => { setSubject(SUBJECTS[lang][0]); }, [lang]);

  const inputCls =
    "w-full bg-[#0c0c0c] border border-white/15 text-white text-[13px] sm:text-[14px] px-4 py-3 " +
    "focus:outline-none focus:border-[#c9a84c]/60 transition-colors placeholder:text-white/20";
  const labelCls =
    "text-white/40 text-[11px] tracking-[0.2em] uppercase mb-1.5 block text-left";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message, lang }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string; dev?: boolean };
      if (data.ok) {
        onSuccess();
      } else {
        setError(data.error ?? "An error occurred. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 text-left max-w-lg mx-auto space-y-5">

      {/* Subject */}
      <div>
        <label className={labelCls}>{CLABEL.subject[lang]}</label>
        <div className="relative">
          <select
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className={inputCls + " appearance-none cursor-pointer pr-9"}
          >
            {SUBJECTS[lang].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30"
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>{CLABEL.name[lang]}</label>
          <input
            type="text" required
            value={name} onChange={e => setName(e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>{CLABEL.email[lang]}</label>
          <input
            type="email" required
            value={email} onChange={e => setEmail(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className={labelCls}>{CLABEL.phone[lang]}</label>
        <input
          type="tel"
          value={phone} onChange={e => setPhone(e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Message */}
      <div>
        <label className={labelCls}>{CLABEL.message[lang]}</label>
        <textarea
          required rows={5}
          value={message} onChange={e => setMessage(e.target.value)}
          className={inputCls + " resize-none"}
        />
      </div>

      {error && (
        <p className="text-red-400 text-[12px] tracking-[0.05em]">{error}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit" disabled={loading}
          className="flex-1 bg-[#c9a84c] text-black text-[12px] font-bold tracking-[0.3em] uppercase py-4
                     hover:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? CLABEL.sending[lang] : CLABEL.send[lang]}
        </button>
        <button
          type="button" onClick={onCancel} disabled={loading}
          className="sm:w-auto px-6 py-4 border border-white/20 text-white/40 text-[12px] tracking-[0.2em] uppercase
                     hover:border-white/40 hover:text-white/70 transition-all duration-200"
        >
          {CLABEL.cancel[lang]}
        </button>
      </div>
    </form>
  );
}
