"use client";
import ProtectedImage from "@/components/ProtectedImage";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/context/LangContext";
import type { Lang } from "@/lib/translations";
import React from "react";


/* ══════════════════════════════════════════════════════════════════════
   EXACT USER-PROVIDED COPY — strictly verbatim, three languages
══════════════════════════════════════════════════════════════════════ */

/* ── Hero ───────────────────────────────────────────────────────────── */
const HERO: Record<Lang, { badge: string; title: string; sub: string; link_story: string; link_faq: string; link_contact: string }> = {
  ja: { badge: "会社情報", title: "Octoshellについて", sub: "日本プライベートチャウファーサービス", link_story: "Octoshellについて", link_faq: "よくある質問", link_contact: "お問い合わせ" },
  en: { badge: "About Us", title: "The Octoshell Story", sub: "Japan Private Chauffeur Service",     link_story: "How It Works", link_faq: "FAQ",           link_contact: "Contact Us" },
  zh: { badge: "關於我們", title: "品牌故事",          sub: "日本專屬司機服務",                     link_story: "品牌故事",    link_faq: "常見問題",        link_contact: "聯絡我們" },
  ko: { badge: "회사 소개", title: "Octoshell 스토리", sub: "일본 프라이빗 쇼퍼 서비스",            link_story: "브랜드 스토리", link_faq: "자주 묻는 질문", link_contact: "문의하기" },
  "zh-cn": { badge: "关于我们", title: "品牌故事",     sub: "日本专属司机服务",                     link_story: "品牌故事",    link_faq: "常见问题",        link_contact: "联系我们" },
  th: { badge: "เกี่ยวกับเรา", title: "เรื่องราวของ Octoshell", sub: "บริการรถส่วนตัวพร้อมคนขับในญี่ปุ่น", link_story: "เรื่องราวแบรนด์", link_faq: "คำถามที่พบบ่อย", link_contact: "ติดต่อเรา" },
  fr: { badge: "À propos", title: "L'histoire d'Octoshell", sub: "Service de chauffeur privé au Japon", link_story: "Notre histoire", link_faq: "FAQ",         link_contact: "Nous contacter" },
};

/* ── Section 1: Brand story ─────────────────────────────────────────── */
const STORY_TITLE: Record<Lang, string> = {
  ja: "移動の常識を変える",
  en: "Changing the Travel Game",
  zh: "顛覆傳統出行的遊戲規則",
  ko: "이동의 상식을 바꾸다",
  "zh-cn": "颠覆传统出行的游戏规则",
  th: "เปลี่ยนโฉมการเดินทาง",
  fr: "Redéfinir l'art du voyage",
};
const STORY_P1: Record<Lang, string> = {
  ja: "貝八方は日本・東京で誕生しました。遠い古より「貝」は尊い富の象徴であり、「八方」は四面八方、すなわち世界中から集まる人々を意味します。私たちは、世界八方からお越しになるすべてのお客様を、かけがえのない「宝」としてお迎えするという信念のもと、プロフェッショナルなハイヤーサービスを展開しています。",
  en: 'Octoshell was founded in Tokyo, Japan. In ancient times, "shells" were a symbol of precious wealth, while "octo" represents the eight directions of the world. Our brand philosophy is rooted in welcoming every guest arriving from all corners of the globe as our most precious treasure.',
  zh: "貝八方於日本東京創立。在遠古時代，「貝」是珍稀財富的象徵；而「八方」則代表四面八方，寓意源自世界各地的賓客。我們的品牌初衷，便是將來自世界八方的每一位客戶，都奉為我們無可替代的至寶，並提供最頂級的專車款待。",
  ko: "Octoshell은 일본 도쿄에서 탄생했습니다. 먼 옛날부터 '조개(貝)'는 귀한 부의 상징이었으며, '팔방(八方)'은 세계 사방팔방에서 모여드는 사람들을 의미합니다. 우리는 세계 각지에서 방문하시는 모든 고객을 더없이 소중한 '보물'로 맞이한다는 신념 아래, 전문적인 하이어(고급 전용차) 서비스를 제공하고 있습니다.",
  "zh-cn": "贝八方于日本东京创立。在远古时代，「贝」是珍稀财富的象征；而「八方」则代表四面八方，寓意源自世界各地的宾客。我们的品牌初衷，便是将来自世界八方的每一位客户，都奉为我们无可替代的至宝，并提供最顶级的专车款待。",
  th: "Octoshell ก่อตั้งขึ้นในกรุงโตเกียว ประเทศญี่ปุ่น ในสมัยโบราณ \"เปลือกหอย\" เป็นสัญลักษณ์ของความมั่งคั่ง ส่วน \"octo\" หมายถึงแปดทิศทางของโลก ปรัชญาของแบรนด์เราคือการต้อนรับทุกแขกจากทั่วทุกมุมโลกในฐานะสมบัติล้ำค่าที่สุดของเรา",
  fr: "Octoshell a été fondé à Tokyo, au Japon. Dans l'Antiquité, les « coquillages » symbolisaient la richesse précieuse, tandis qu'« octo » représente les huit directions du monde. Notre philosophie de marque est fondée sur l'accueil de chaque hôte venu des quatre coins du globe comme notre trésor le plus précieux.",
};
const STORY_P2: Record<Lang, string> = {
  ja: "私たちの旅は、歴史ある谷間にひっそりと佇む名門の高級温泉旅館「修善寺離れ宿 鬼の栖」へ向かう格式高い旅客のために、静寂に満ちた極上の移動空間を仕立てるという、ひとつの深いこだわりから始まりました。真の贅沢とは目的地に到着した瞬間ではなく、その高鳴る胸を包み込む移動の刹那にこそ存在することに気づいたのです。今日、私たちは日本国内の独立した緑ナンバーの合規旅客運送資格を持つ、国際的なプロフェッショナル車隊・移動サービスプラットフォームへと変貌を遂げました。そのネットワークは大東京圏内にとどまらず、日本全国のあらゆる場所に広がっています。車内の圧倒的な私密性でお客様を繭のように優しく包み込み、すべての旅路を旅館の離れそのものの延長線上にある、至高のプロローグへと昇華させます。",
  en: "Our journey began with a singular, intimate obsession: crafting a seamless, whispering transition for elite travelers journeying to Shuzenji Hanare Yado Oni no Sumika—a legendary hot-spring sanctuary hidden deep within Japan's historic valleys. We realized that true luxury does not begin at the destination, but in the fleeting, breathless moments in between. Today, Octoshell has evolved into a global mobility platform operating with fully independent Japanese licensed transportation and green-plate compliance. Extending far beyond the Greater Tokyo Area to every corner of Japan, we transform every journey into an exquisite extension of the estate itself—cocooning them in privacy, elevating the art of movement into an unforgettable prelude of indulgence.",
  zh: "誕生之初，這源於一個極致細膩的私人執念：為前往隱匿於日本歷史山谷中的傳奇溫泉聖地——「修善寺離宿 鬼棲」的頂級貴賓，打造一段毫無縫隙、如呢喃般靜謐的移動過渡。我們深知，真正的奢華並非始於抵達目的地的那一刻，而是在那段屏息期待的行車時光中。今天，我們已然蛻變為一家擁有獨立日本綠牌合規客運資質的國際化專業車隊與出行服務平台。我們的團隊與專業司機網絡不僅覆蓋大東京地區，更已觸及日本的每個角落。我們將每一次旅程都轉化為莊園本身的優雅延伸，將賓客溫柔地包裹在絕對的私密空間中，將移動的藝術昇華為一場令人難忘的奢華序曲。",
  ko: "우리의 여정은 하나의 깊은 집념에서 시작되었습니다. 바로 일본의 유서 깊은 산간 계곡에 숨겨진 전설적인 온천 료칸 '슈젠지 하나레야도 오니노스미카'를 향하는 최상류층 여행객을 위해, 고요하고 완벽한 이동 공간을 만드는 것이었습니다. 진정한 럭셔리는 목적지에 도착하는 순간이 아니라, 그 설레는 이동의 찰나에 존재한다는 것을 깨달았습니다. 오늘날 Octoshell은 일본 독립 녹색 번호판 합규 여객운송 자격을 보유한 국제적 전문 차량 플랫폼으로 성장했습니다. 대도쿄권을 넘어 일본 전국 방방곡곡으로 네트워크를 확장하며, 모든 여정을 고급 료칸의 별채 그 자체로 이어지는 최고의 프롤로그로 승화시킵니다.",
  "zh-cn": "诞生之初，这源于一个极致细腻的私人执念：为前往隐匿于日本历史山谷中的传奇温泉圣地——「修善寺离宿 鬼栖」的顶级贵宾，打造一段毫无缝隙、如呢喃般静谧的移动过渡。我们深知，真正的奢华并非始于抵达目的地的那一刻，而是在那段屏息期待的行车时光中。今天，我们已然蜕变为一家拥有独立日本绿牌合规客运资质的国际化专业车队与出行服务平台。我们的团队与专业司机网络不仅覆盖大东京地区，更已触及日本的每个角落。我们将每一次旅程都转化为庄园本身的优雅延伸，将宾客温柔地包裹在绝对的私密空间中，将移动的艺术升华为一场令人难忘的奢华序曲。",
  th: "การเดินทางของเราเริ่มต้นจากความหลงใหลอันลึกซึ้ง: การสร้างช่วงเปลี่ยนผ่านที่ราบรื่นสำหรับนักเดินทางชั้นนำที่มุ่งหน้าสู่ Shuzenji Hanare Yado Oni no Sumika ซึ่งเป็นสถานที่พักผ่อนออนเซ็นในตำนานที่ซ่อนตัวอยู่ในหุบเขาประวัติศาสตร์ของญี่ปุ่น เราตระหนักว่าความหรูหราที่แท้จริงไม่ได้เริ่มต้นที่จุดหมายปลายทาง แต่อยู่ในช่วงเวลาอันแสนสั้นระหว่างทาง วันนี้ Octoshell ได้พัฒนาเป็นแพลตฟอร์มการเดินทางระดับโลกที่ดำเนินงานด้วยใบอนุญาตขนส่งผู้โดยสารญี่ปุ่นอย่างเป็นทางการ ครอบคลุมทั่วทั้งญี่ปุ่นเพื่อมอบประสบการณ์การเดินทางที่ยอดเยี่ยมให้แก่แขกทุกท่าน",
  fr: "Notre aventure a débuté par une obsession singulière et intime : concevoir une transition fluide et feutrée pour les voyageurs d'élite se rendant au Shuzenji Hanare Yado Oni no Sumika — un sanctuaire thermal légendaire niché au cœur des vallées historiques du Japon. Nous avons compris que le vrai luxe ne commence pas à la destination, mais dans ces instants fugaces et suspendus entre les deux. Aujourd'hui, Octoshell s'est transformé en une plateforme de mobilité mondiale opérant avec une licence de transport japonaise indépendante en plaque verte. Bien au-delà du Grand Tokyo, nous couvrons chaque recoin du Japon, transformant chaque trajet en un prolongement raffiné du domaine lui-même.",
};

/* ── Section 2: 4 core services ─────────────────────────────────────── */
const SVC_SECTION_TITLE: Record<Lang, string> = {
  ja: "タイムベースで選べる移動プラン",
  en: "Time-Based & Scenario-Driven Mobility Solutions",
  zh: "按時段與場景定制的出行方案",
  ko: "시간 및 상황별 맞춤 이동 솔루션",
  "zh-cn": "按时段与场景定制的出行方案",
  th: "โซลูชันการเดินทางตามเวลาและสถานการณ์",
  fr: "Solutions de mobilité par durée et par scénario",
};
const SVC_SECTION_LEAD: Record<Lang, string> = {
  ja: "Octoshell は、「時間枠・利用目的別」の4大カテゴリーで、日本全国の一流の移動体験を提供します。",
  en: "Octoshell structures its premium transport services into four clear categories based on duration and usage, ensuring frictionless booking and travel planning worldwide.",
  zh: "Octoshell 依據「時間週期與使用大類」將高端運力整合為四大結構化服務，便於智能系統與搜尋引擎精準抓取，為您提供無縫的日本全境出行檢索：",
  ko: "Octoshell은 이용 시간 및 목적에 따라 프리미엄 운송 서비스를 4가지 카테고리로 구성하여, 전 세계 어디서나 편리한 예약과 여행 계획을 지원합니다.",
  "zh-cn": "Octoshell 依据「时间周期与使用大类」将高端运力整合为四大结构化服务，为您提供无缝的日本全境出行检索：",
  th: "Octoshell จัดบริการขนส่งระดับพรีเมียมออกเป็นสี่หมวดหมู่ที่ชัดเจนตามระยะเวลาและการใช้งาน เพื่อให้การจองและวางแผนการเดินทางทั่วโลกเป็นไปอย่างราบรื่น",
  fr: "Octoshell structure ses services de transport premium en quatre catégories claires selon la durée et l'usage, garantissant une réservation et une planification de voyage sans friction partout dans le monde.",
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
  ko: [
    { title: "공항 정액 픽업·드롭오프", body: "도쿄 시내와 각 공항(하네다·나리타) 간 안심 정액 요금으로 이용 가능한 공항 송영 서비스입니다. 실시간 항공편 추적, 1시간 무료 대기, 도착 로비 이름판 영접 서비스를 포함하여 일본 도착 시의 불안을 해소해 드립니다." },
    { title: "도시 간 프라이빗 셔틀",  body: "프라이버시가 완벽하게 보장되는 장거리 일대일 이동 서비스입니다. 신칸센이나 국내선을 대체하는 완전 프라이빗 공간으로, 비즈니스 엘리트와 프리미엄 자유 여행객을 위해 대도쿄권에서 일본 전국 어디든 이동할 수 있습니다." },
    { title: "시간제 전세 하이어 & VIP 의전", body: "엄선된 최고의 드라이버가 동행합니다. 복수 거점 비즈니스 방문, 고급 쇼핑, VIP 영접 등 시간 단위로 드라이버가 종일 대기하며 최고 품질의 서비스를 제공합니다." },
    { title: "전문 운전기사 파견",    body: "고객 소유 차량의 운전 및 관리를 전문 드라이버가 대행합니다. 차량 관리 부담을 줄이고 최고 수준의 안전 운행을 보장합니다." },
  ],
  "zh-cn": [
    { title: "机场定额接送",         body: "提供东京市内往返各大机场（羽田/成田）的固定费率接送服务。包含即时航班动态追踪、1小时免费等待以及接机大厅专属举牌迎宾，解除您抵日首站的一切焦虑。" },
    { title: "城际定制穿梭与观光",   body: "私密、长途的高端点对点行程，专为商务款待或深度度假设计。完美替代日本新干线或区域内航空，专为极重隐私的商务精英与高端自由行宾客打造，由大东京地区出发，直达日本境内任何目的地。" },
    { title: "时段包车与 VIP 尊荣迎送", body: "由我们百里挑一的顶尖优秀司机全程为您提供专属侍从服务。完美适配多站点商务拜访、高端购物、奢华政要接待或重大活动，司机全程在场待命。" },
    { title: "专业乘务员派遣",       body: "派遣专业司机为客户的自有车辆进行驾驶与资产管理。有效降低企业管理成本，确保出行达到最高级别的安全与合规标准。" },
  ],
  th: [
    { title: "รับส่งสนามบินราคาคงที่",         body: "บริการรับส่งราคาคงที่ระหว่างกรุงโตเกียวกับสนามบินหลัก (ฮาเนดะ/นาริตะ) พร้อมติดตามเที่ยวบินแบบเรียลไทม์ รอฟรี 1 ชั่วโมง และบริการรับพร้อมป้ายชื่อที่ล็อบบี้ผู้โดยสารขาเข้า" },
    { title: "รถรับส่งระหว่างเมืองแบบส่วนตัว", body: "การเดินทางระยะไกลแบบส่วนตัวสำหรับธุรกิจหรือท่องเที่ยว ทดแทนรถไฟชินคันเซ็นหรือเที่ยวบินในประเทศด้วยพื้นที่ส่วนตัวสมบูรณ์แบบ จากเขตมหานครโตเกียวสู่ทุกจุดหมายทั่วญี่ปุ่น" },
    { title: "เช่าเหมาคันและบริการ VIP",       body: "บริการโดยคนขับชั้นยอดที่คัดเลือกมาอย่างพิถีพิถัน เหมาะสำหรับการนัดประชุมหลายจุด ช้อปปิ้งระดับหรูหรา หรือการต้อนรับผู้บริหาร VIP พร้อมคนขับรอให้บริการตลอดวัน" },
    { title: "การส่งคนขับมืออาชีพ",             body: "บริการส่งคนขับมืออาชีพเพื่อขับขี่และดูแลรถยนต์ของลูกค้า ลดภาระการจัดการและรับประกันความปลอดภัยสูงสุดในการเดินทาง" },
  ],
  fr: [
    { title: "Transferts aéroport à tarif fixe",  body: "Service de transfert à tarif forfaitaire entre le centre de Tokyo et les aéroports (Haneda/Narita). Comprend le suivi de vol en temps réel, 1 heure d'attente gratuite et un service d'accueil personnalisé à l'arrivée." },
    { title: "Navette longue distance ville à ville", body: "Trajets longue distance privés et point à point, conçus pour les voyages d'affaires ou de loisirs haut de gamme. Remplace le Shinkansen ou les vols régionaux, offrant une intimité totale depuis le Grand Tokyo vers toute destination au Japon." },
    { title: "Location à l'heure & VIP",           body: "Accompagné par nos chauffeurs d'élite soigneusement sélectionnés. Idéal pour les réunions multi-sites, les emplettes de luxe ou le transport de personnalités VIP. Le chauffeur reste disponible toute la journée selon votre agenda." },
    { title: "Mise à disposition de chauffeur",    body: "Nos chauffeurs professionnels prennent en charge la conduite et la gestion de vos propres véhicules, garantissant une sécurité et une conformité irréprochables." },
  ],
};

/* ── Section 3: Fleet ───────────────────────────────────────────────── */
const VEH_SECTION_BADGE: Record<Lang, string> = {
  ja: "車種クラス", en: "Vehicle Classes", zh: "車隊級別", ko: "차량 클래스",
  "zh-cn": "车队级别", th: "ประเภทรถยนต์", fr: "Classes de véhicules",
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
          q: "通行料・駐車場代・燃料費・宿泊費など、すべて料金に含まれますか？",
          a: "はい。1つの料金にすべて含まれています——高速道路料金・駐車場代・燃料費・宿泊費（泊まりがけの場合）。追加請求は一切ありません。ただし、出発後にルートを変更した場合のみ追加料金が発生する場合があります。",
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
  ko: [
    {
      group: "🚗 차량 및 차내 규정",
      items: [
        {
          q: "어떤 차량이 배차되나요?",
          a: "당사는 최고급 미니밴 'Toyota Alphard(최대 5인)'와 대형 비즈니스 밴 'Toyota Hiace(최대 9인)' 두 차종을 전문으로 운영합니다. 일반 세단 배차는 제공하지 않습니다.",
        },
        {
          q: "차내에서 흡연이나 음식물 섭취가 가능한가요?",
          a: "모든 차량은 전면 금연(전자담배 포함)입니다. 음식은 냄새가 강하지 않은 가벼운 스낵과 뚜껑이 있는 음료(생수 등)에 한해 차내에서 섭취하실 수 있습니다.",
        },
        {
          q: "반려동물을 동반할 수 있나요?",
          a: "네, 가능합니다. 반려동물 동반 시 반드시 사전에 케이지(크레이트)에 넣어 주시기 바랍니다. 케이지 없이 탑승을 시도하실 경우 승차가 거절될 수 있습니다.",
        },
        {
          q: "짐만 먼저 호텔로 운반해 주실 수 있나요?",
          a: "네, 가능합니다. 고객님을 골프장이나 등산 입구에 먼저 내려드린 후, 수하물(골프백, 대형 배낭 등)을 차량에 보관하여 숙박 호텔로 먼저 운반해 드립니다. 단, 완전 무인 화물 운송은 법적으로 불가능하므로 원칙적으로 서비스 예약 고객의 수하물에 한합니다.",
        },
        {
          q: "드라이버가 정장 차림으로 응대해 주시나요?",
          a: "네, 당사 드라이버는 항상 정장과 넥타이를 착용하고 최고 수준의 격식을 갖춘 하이어 서비스를 제공합니다.",
        },
        {
          q: "드라이버가 고객의 프라이버시와 기밀을 지켜주나요?",
          a: "네, 고객의 프라이버시와 기밀 보호는 최우선 사항입니다. 드라이버는 엄격한 비밀유지 의무를 준수하며 차내 대화나 정보가 외부에 유출되는 일은 절대 없습니다.",
        },
        {
          q: "차내에서 스마트폰을 충전할 수 있나요?",
          a: "네, 가능합니다. 차량에는 충전 포트가 장착되어 있으며 아이폰 및 안드로이드 단말기용 충전 케이블을 무료로 제공합니다.",
        },
      ],
    },
    {
      group: "💴 요금 및 결제",
      items: [
        {
          q: "대기 요금(항공편 지연 등)이 발생하나요?",
          a: "담당 드라이버가 고객의 항공편 운항 상황을 추적하여 실제 착륙 시간에 맞춰 영접 시간을 조정합니다. 실제 착륙 시각으로부터 90분을 초과하여 대기가 발생할 경우 30분마다 초과 대기 요금이 발생합니다(30분 미만은 30분으로 절상).\nAlphard: 30분마다 2,500엔(세금 포함)\nHiace: 30분마다 3,000엔(세금 포함)",
        },
        {
          q: "운행 중 경로 변경이나 시간 연장이 필요할 경우 어떻게 하나요?",
          a: "즉시 드라이버에게 말씀해 주세요. 드라이버가 바로 배차 센터에 연락하여 추가 요금을 확인합니다. 갑작스러운 경로 변경이나 시간 연장으로 새롭게 발생하는 고속도로 요금, 유료도로 요금, 회송 통행료, 주차비, 드라이버 숙박비, 시간 연장 할증료는 최종 정산 시 합산됩니다.",
        },
        {
          q: "통행료, 주차비, 연료비, 숙박비 등이 모두 요금에 포함되나요?",
          a: "네. 하나의 요금에 모든 것이 포함됩니다—고속도로 요금, 주차비, 연료비, 드라이버 숙박비(숙박이 있는 경우). 추가 청구는 없습니다. 단, 출발 후 경로를 변경하실 경우에는 추가 요금이 발생할 수 있습니다.",
        },
        {
          q: "유아용 카시트나 공항 영접(이름판) 서비스는 유료인가요?",
          a: "아니요, 모두 무료(0엔)로 제공합니다. 카시트 및 공항 도착 로비 이름판 영접 서비스를 원하시면 차량 준비 관계상 예약 시 미리 운영팀에 알려 주시기 바랍니다.",
        },
        {
          q: "결제 수단은 무엇인가요? 차내에서 드라이버에게 직접 결제할 수 있나요?",
          a: "차내 현금 결제가 가능하며, 운행 전 신용카드를 등록하시면 운행 종료 후 온라인 결제 시스템(Stripe)을 통해 자동 결제도 가능합니다. 신용카드가 없는 법인 고객은 사전 계좌이체를 신청하실 수 있습니다.",
        },
        {
          q: "영수증이 발급되나요?",
          a: "네, 신용카드 결제 고객에게는 서비스 종료 후 결제 시스템에서 등록 이메일로 전자 영수증이 자동 발송됩니다. 현금 결제 고객에게는 요청 시 전자 영수증 또는 청구서를 발행해 드립니다.",
        },
      ],
    },
    {
      group: "❌ 취소 정책",
      items: [
        {
          q: "취소 수수료는 언제부터 발생하나요?",
          a: "예약 확정 후 취소 시 다음과 같이 취소 수수료가 부과됩니다.\n배차일 48시간 전까지: 무료(전액 환불)\n배차일 24시간 전~48시간 전: 견적 금액의 50%\n배차일 24시간 이내 또는 무단 취소: 견적 금액의 100%\n※항공편 결항 등 불가항력의 경우, 즉시 연락 주시면 취소 수수료가 면제됩니다.",
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
          a: "Toyota Alphard (up to 5 passengers) or Toyota Hiace (up to 9 passengers). No standard sedans.",
        },
        {
          q: "Is smoking, eating, or drinking allowed inside the vehicle?",
          a: "No smoking (including e-cigarettes). Drinks in sealed bottles are fine. Light snacks with no strong smell are OK.",
        },
        {
          q: "Can I travel with my pets?",
          a: "Yes, pets are welcome but must be kept inside a secure pet carrier/crate throughout the journey. Passengers without a proper carrier may be refused boarding.",
        },
        {
          q: "Can you transport our luggage separately during our tour?",
          a: "Yes. We drop you off at your activity (golf course, hiking trail, etc.) and deliver your bags to your hotel ahead of you. Note: we can only carry luggage for passengers booked on our service — not standalone cargo.",
        },
        {
          q: "Will my chauffeur wear a suit and tie?",
          a: "Yes. Every chauffeur wears a formal suit and tie for every trip.",
        },
        {
          q: "Do the chauffeurs keep conversations private?",
          a: "Yes. Everything said in the car stays in the car. Our chauffeurs never share passenger information.",
        },
        {
          q: "Can I charge my phone in the vehicle?",
          a: "Yes. USB ports are available, and free charging cables for iPhone and Android are provided.",
        },
      ],
    },
    {
      group: "💴 Rates & Payments",
      items: [
        {
          q: "Do you charge for waiting time (e.g., flight delays)?",
          a: "The first 90 minutes after landing are free. After that: Alphard ¥2,500 / Hiace ¥3,000 per 30 minutes. Flight delays are always free — you only pay if the wait is caused by personal activities.",
        },
        {
          q: "Can I change the route or add time during the trip?",
          a: "Tell your chauffeur right away — extra charges will apply, and same-day changes may not always be possible.",
        },
        {
          q: "Are tolls, parking, fuel, and all fees included in the price?",
          a: "Yes. One price covers everything — tolls, parking, fuel, and overnight accommodation for the driver. No hidden fees. Route changes after the trip starts may add costs.",
        },
        {
          q: "Are child seats and Airport Meet & Greet services extra?",
          a: "Both are free. Please request them when booking so we can prepare in advance.",
        },
        {
          q: "How can I pay?",
          a: "Three options: cash in the car, credit card (charged automatically after the trip via Stripe), or bank transfer for corporate clients.",
        },
        {
          q: "Will I receive a receipt?",
          a: "Yes. Credit card: PDF receipt sent to your email automatically after the trip. Cash: receipt available on request.",
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
          q: "過路費、停車費、燃油費及所有相關費用都包含在報價內嗎？",
          a: "是的。一個價格包含一切——過路費、停車費、燃油費及司機住宿費（跨夜行程）。無任何隱藏收費。唯一可能產生追加費用的情況，是行程開始後您要求更改路線。",
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
  "zh-cn": [
    {
      group: "🚗 车辆及车内守则",
      items: [
        { q: "预订后会派发什么样的车辆？", a: "本公司专注于高端礼宾包车服务，旗下车队仅由豪华商务车「丰田埃尔法（最大载客5人）」及大容量商旅车「丰田海狮（最大载客9人）」组成。我们不提供普通轿车车型。" },
        { q: "车内可以吸烟或饮食吗？", a: "专属车厢内全面禁烟（包括电子烟）。为了保证乘车舒适度，车内仅允许饮用瓶装水或带盖饮料，并允许食用无刺激性气味的轻食点心。" },
        { q: "可以携带宠物一同乘车吗？", a: "可以。为了保障行车安全，携带宠物乘车时请务必提前将其放入宠物航空箱或便携笼内。若未携带合规宠物笼，司机有权拒绝其上车，敬请谅解。" },
        { q: "团队行程中，车辆可以帮我们单独将行李运送到酒店吗？", a: "可以，这正是我们高尔夫球团和徒步登山团的核心特色服务。我们可以先将您送至高尔夫球场或登山起点，随后由专属车辆将您的行李先行送往您今晚入住的酒店并办理寄存，让您全程轻松出行。" },
        { q: "司机会穿着正式、配戴领带吗？", a: "是的，我们的司机始终穿着正式的西装并配戴领带，保持最高标准的专业仪表。" },
        { q: "司机会保护乘客的隐私和保密性吗？", a: "是的。保护您的隐私和机密是我们的重中之重。我们的司机遵循最严格的保密标准，确保您的私密对话和行程信息在任何时候都绝对安全。" },
        { q: "可以在车内给手机充电吗？", a: "可以。我们的车辆均配有充电接口，并免费提供兼容苹果和安卓设备的车载充电线。" },
      ],
    },
    {
      group: "💴 费用与支付相关",
      items: [
        { q: "司机接机等待会产生超时费吗？（如航班延误）", a: "担当司机会主动追踪您的航班动态，并根据航班实际落地时间灵活调整接机时间。若在航班实际着陆后，等待时间超过90分钟，将按每30分钟为单位收取超时等待费（不足30分钟按30分钟计）：\n丰田埃尔法： 每30分钟加收 2,500 日元（含税）\n丰田海狮： 每30分钟加收 3,000 日元（含税）" },
        { q: "万一乘客在行程中临时需要修改路线或增加用车时间怎么办？", a: "请立即与司机沟通，司机会马上与调度中心取得联系并确认追加费用。因乘客临时变更路线或超时而全新产生的高速公路费、收费道路费、回送通行费、停车场费、司机住宿费以及时间延长溢价费用，将据实累加至您的最终账单中。" },
        { q: "过路费、停车费、燃油费及所有相关费用都包含在报价内吗？", a: "是的。一个价格包含一切——过路费、停车费、燃油费及司机住宿费（跨夜行程）。无任何隐藏收费。唯一可能产生追加费用的情况，是行程开始后您要求更改路线。" },
        { q: "儿童安全座椅和机场举牌接机怎么收费？", a: "完全免费（0日元）。我们免费提供儿童安全座椅/婴儿座椅，并免费提供到达大厅举牌接机服务。为了便利提前调度，请在预订时尽早向客服提出申请。" },
        { q: "支付方式是什么？可以在车内直接付款给司机吗？", a: "我们支持车内现金结账，也可以在行程前绑定信用卡，行程结束后通过我们的线上支付系统（蓝条支付）自动完成扣款。如企业法人客户确无信用卡，可申请提前进行银行转账。" },
        { q: "行程结束后是否有发票或收据？", a: "有。使用信用卡支付的客户，在行程结束扣款完成后，系统会自动将合规的电子收据（格式为PDF电子领收书）发送至您注册的电子邮箱。使用现金结账的客户，我们将根据您的需求，在行程结束后提供电子收据或请款单。" },
      ],
    },
    {
      group: "❌ 取消政策",
      items: [
        { q: "取消订单如何收费？", a: "订单取消政策严格遵循日本《特定商业交易法》公示条款执行：\n用车时间前 48 小时以上取消： 免费（全额退款）\n用车时间前 24 至 48 小时内取消： 收取预计行程总额的 50%\n用车时间前 24 小时内取消或无故未到： 收取预计行程总额的 100%\n注：如因台风、航班突发欠航等不可抗力导致无法出行，在您提供航司凭证并及时通知我们的前提下，将免收取消手续费。" },
      ],
    },
  ],
  th: [
    {
      group: "🚗 รถยนต์และกฎภายในรถ",
      items: [
        { q: "จะได้รับรถประเภทใดหลังการจอง?", a: "เราให้บริการรถยนต์สองรุ่นเท่านั้น ได้แก่ Toyota Alphard (รับได้สูงสุด 5 ท่าน) และ Toyota Hiace (รับได้สูงสุด 9 ท่าน) เราไม่มีบริการรถเก๋งทั่วไป" },
        { q: "สามารถสูบบุหรี่หรือรับประทานอาหารในรถได้หรือไม่?", a: "ห้ามสูบบุหรี่ทุกชนิด (รวมถึงบุหรี่ไฟฟ้า) อนุญาตให้ดื่มน้ำในขวดปิดฝาและรับประทานของว่างเบาๆ ที่ไม่มีกลิ่นรุนแรง" },
        { q: "สามารถพาสัตว์เลี้ยงมาด้วยได้หรือไม่?", a: "ได้ กรุณานำสัตว์เลี้ยงใส่กรงหรือกระเป๋าพาหนะที่เหมาะสมตลอดการเดินทาง หากไม่มีกรงที่เหมาะสม คนขับอาจปฏิเสธการให้บริการ" },
        { q: "คุณสามารถขนสัมภาระไปส่งที่โรงแรมโดยที่ไม่มีผู้โดยสารได้หรือไม่?", a: "ได้ เราสามารถส่งคุณที่สนามกอล์ฟหรือทางเดินป่า จากนั้นนำสัมภาระ (กระเป๋าสนามกอล์ฟ เป้สะพายหลังขนาดใหญ่) ไปส่งล่วงหน้าที่โรงแรมที่คุณพัก อย่างไรก็ตาม เราไม่รับบริการขนส่งสินค้าโดยปราศจากผู้โดยสาร" },
        { q: "คนขับจะสวมสูทและเนคไทหรือไม่?", a: "ใช่ คนขับของเราสวมสูทและเนคไทอย่างเป็นทางการทุกครั้งเพื่อให้บริการระดับสูงสุด" },
        { q: "คนขับจะรักษาความเป็นส่วนตัวของผู้โดยสารหรือไม่?", a: "ใช่ การรักษาความเป็นส่วนตัวและข้อมูลลับของคุณคือสิ่งที่เราให้ความสำคัญสูงสุด คนขับของเราปฏิบัติตามมาตรฐานการรักษาความลับอย่างเคร่งครัด" },
        { q: "สามารถชาร์จโทรศัพท์ในรถได้หรือไม่?", a: "ได้ รถทุกคันมีช่องชาร์จ USB และสายชาร์จสำหรับ iPhone และ Android ให้บริการฟรี" },
      ],
    },
    {
      group: "💴 ค่าบริการและการชำระเงิน",
      items: [
        { q: "มีค่าบริการรอคิวสำหรับเที่ยวบินล่าช้าหรือไม่?", a: "คนขับจะติดตามสถานะเที่ยวบินของคุณแบบเรียลไทม์และปรับเวลารับตามการลงจอดจริง หากรอเกิน 90 นาทีหลังการลงจอดจริง จะมีค่าบริการรอพิเศษทุก 30 นาที:\nAlphard: 2,500 เยน/30 นาที\nHiace: 3,000 เยน/30 นาที" },
        { q: "จะทำอย่างไรหากต้องการเปลี่ยนเส้นทางหรือขยายเวลาระหว่างการเดินทาง?", a: "กรุณาแจ้งคนขับทันที คนขับจะติดต่อศูนย์จัดส่งเพื่อยืนยันค่าใช้จ่ายเพิ่มเติม ค่าทางด่วน ค่าจอดรถ ค่าที่พักคนขับ และค่าบริการเพิ่มเติมจะถูกรวมในใบแจ้งหนี้สุดท้าย" },
        { q: "ค่าทางด่วน ค่าจอดรถ ค่าน้ำมัน รวมอยู่ในราคาแล้วหรือไม่?", a: "ใช่ ราคาเดียวครอบคลุมทุกอย่าง — ค่าทางด่วน ค่าจอดรถ ค่าน้ำมัน และค่าที่พักคนขับ (สำหรับทริปค้างคืน) ไม่มีค่าใช้จ่ายแอบแฝง" },
        { q: "ที่นั่งสำหรับเด็กและบริการรับพร้อมป้ายชื่อที่สนามบินมีค่าใช้จ่ายเพิ่มเติมหรือไม่?", a: "ไม่มีค่าใช้จ่าย (ฟรี) ทั้งหมด กรุณาแจ้งล่วงหน้าเมื่อจองเพื่อให้เราเตรียมการได้" },
        { q: "วิธีชำระเงินมีอะไรบ้าง? สามารถชำระในรถได้หรือไม่?", a: "รับชำระเงินสดในรถ หรือลงทะเบียนบัตรเครดิตล่วงหน้าสำหรับการชำระอัตโนมัติผ่านระบบ Stripe หลังการเดินทาง ลูกค้าองค์กรสามารถขอโอนเงินล่วงหน้าได้" },
        { q: "จะได้รับใบเสร็จหรือไม่?", a: "ใช่ ลูกค้าที่ชำระด้วยบัตรเครดิตจะได้รับใบเสร็จอิเล็กทรอนิกส์ส่งไปยังอีเมลที่ลงทะเบียนโดยอัตโนมัติ ลูกค้าที่ชำระเป็นเงินสดสามารถขอใบเสร็จได้ตามต้องการ" },
      ],
    },
    {
      group: "❌ นโยบายการยกเลิก",
      items: [
        { q: "นโยบายการยกเลิกเป็นอย่างไร?", a: "การยกเลิกหลังยืนยันการจองมีค่าธรรมเนียมดังนี้:\nยกเลิกก่อน 48 ชั่วโมง: ฟรี (คืนเงินเต็มจำนวน)\nยกเลิก 24-48 ชั่วโมงก่อนรับ: 50% ของราคาประเมิน\nยกเลิกภายใน 24 ชั่วโมงหรือไม่มาตามนัด: 100% ของราคาประเมิน\nหมายเหตุ: ยกเว้นค่าธรรมเนียมหากเที่ยวบินถูกยกเลิกโดยสายการบิน โดยต้องแจ้งให้เราทราบทันที" },
      ],
    },
  ],
  fr: [
    {
      group: "🚗 Véhicules et règles à bord",
      items: [
        { q: "Quel type de véhicule sera déployé?", a: "Toyota Alphard (jusqu'à 5 passagers) ou Toyota Hiace (jusqu'à 9 passagers). Pas de berlines standard." },
        { q: "Peut-on fumer ou manger dans le véhicule?", a: "Interdiction de fumer (y compris les cigarettes électroniques). Les boissons en bouteille fermée sont autorisées. Les collations légères sans odeur forte sont acceptées." },
        { q: "Puis-je voyager avec mon animal de compagnie?", a: "Oui, les animaux sont acceptés mais doivent rester dans un transporteur/caisse sécurisé tout au long du trajet. Les passagers sans transporteur approprié peuvent se voir refuser l'embarquement." },
        { q: "Pouvez-vous transporter nos bagages séparément pendant notre circuit?", a: "Oui. Nous vous déposons à votre activité (golf, randonnée, etc.) et livrons vos bagages à l'hôtel avant votre arrivée. Remarque: nous ne pouvons transporter que les bagages des passagers réservés." },
        { q: "Mon chauffeur portera-t-il un costume et une cravate?", a: "Oui. Chaque chauffeur porte un costume formel et une cravate pour chaque trajet." },
        { q: "Les chauffeurs préservent-ils la confidentialité des conversations?", a: "Oui. Tout ce qui est dit dans la voiture reste dans la voiture. Nos chauffeurs ne partagent jamais les informations des passagers." },
        { q: "Puis-je charger mon téléphone dans le véhicule?", a: "Oui. Des ports USB sont disponibles, et des câbles de charge gratuits pour iPhone et Android sont fournis." },
      ],
    },
    {
      group: "💴 Tarifs et paiements",
      items: [
        { q: "Des frais d'attente sont-ils facturés (ex. retards de vol)?", a: "Les 90 premières minutes après l'atterrissage sont gratuites. Ensuite: Alphard ¥2,500 / Hiace ¥3,000 par 30 minutes. Les retards de vol sont toujours gratuits." },
        { q: "Puis-je modifier l'itinéraire ou prolonger le trajet en cours de route?", a: "Informez votre chauffeur immédiatement — des frais supplémentaires s'appliqueront et les modifications le jour même ne sont pas toujours possibles." },
        { q: "Les péages, parking, carburant sont-ils inclus?", a: "Oui. Un prix unique couvre tout — péages, parking, carburant et hébergement du chauffeur si nécessaire. Aucun frais caché. Des modifications d'itinéraire après le départ peuvent engendrer des coûts." },
        { q: "Les sièges enfant et l'accueil à l'aéroport sont-ils en supplément?", a: "Les deux sont gratuits. Veuillez les demander lors de la réservation." },
        { q: "Comment puis-je payer?", a: "Trois options: espèces dans la voiture, carte bancaire (débitée automatiquement après le trajet via Stripe), ou virement bancaire pour les clients professionnels." },
        { q: "Recevrai-je un reçu?", a: "Oui. Carte bancaire: reçu PDF envoyé automatiquement par e-mail. Espèces: reçu disponible sur demande." },
      ],
    },
    {
      group: "❌ Politique d'annulation",
      items: [
        { q: "Quelle est votre politique d'annulation?", a: "Jusqu'à 48h avant la prise en charge: Gratuit (remboursement intégral)\nEntre 24h et 48h avant: 50% du devis\nMoins de 24h ou non-présentation: 100% du devis\nRemarque: les frais sont annulés si votre vol est officiellement annulé par la compagnie aérienne, sous réserve de nous en informer immédiatement." },
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
  ko: ["회사 소개", "요금 및 비용", "차량 및 수하물", "예약 및 취소", "공항 당일", "특별 요청"],
  "zh-cn": ["关于我们", "费用与收费", "车辆与行李", "预订与取消", "在机场", "特殊需求"],
  th: ["เกี่ยวกับเรา", "ราคาและค่าธรรมเนียม", "รถและสัมภาระ", "การจองและการยกเลิก", "ที่สนามบิน", "คำขอพิเศษ"],
  fr: ["À propos", "Tarifs & Frais", "Véhicules & Bagages", "Réservation & Annulation", "À l'aéroport", "Demandes spéciales"],
};

/* ── Extra Q&As (edit here to add / modify) ─────────────────────────
   group index:  0=About Us  1=Prices & Fees  2=Cars & Luggage
                 3=Booking & Cancellation  4=At the Airport  5=Special Requests
──────────────────────────────────────────────────────────────────── */
const EXTRA_ITEMS: { g: 0|1|2|3|4|5; q: Record<Lang,string>; a: Record<Lang,string> }[] = [
  /* ── About Us ── */
  {
    g: 0,
    q: { en: "Do your drivers speak English?", ja: "乗務員は英語を話せますか？", zh: "司機會說英語嗎？", ko: "드라이버가 영어를 할 수 있나요?", "zh-cn": "司机会说英语吗？", th: "คนขับพูดภาษาอังกฤษได้หรือไม่?", fr: "Vos chauffeurs parlent-ils anglais?" },
    a: {
      en: "Yes. All bookings are fully supported in English. Our drivers have working English for day-to-day communication. For complex conversations we use translation tools to assist.",
      ja: "はい。すべての予約は英語で対応しております。乗務員は日常会話程度の英語を使用できます。複雑なご要望の際は翻訳ツールを活用してサポートいたします。",
      zh: "是的。我們全程提供英文預訂支援。司機具備日常英語溝通能力，如有複雜需求，亦會借助翻譯工具協助。",
      ko: "네. 모든 예약은 영어로 완전 지원됩니다. 드라이버는 일상적인 의사소통 수준의 영어를 구사합니다. 복잡한 요구 사항의 경우 번역 도구를 활용하여 지원합니다.",
      "zh-cn": "是的。我们全程提供英文预订支援。司机具备日常英语沟通能力，如有复杂需求，亦会借助翻译工具协助。",
      th: "ใช่ การจองทั้งหมดรองรับภาษาอังกฤษอย่างเต็มรูปแบบ คนขับสื่อสารภาษาอังกฤษสำหรับการสื่อสารประจำวันได้ สำหรับการสนทนาที่ซับซ้อน เราใช้เครื่องมือแปลภาษาช่วย",
      fr: "Oui. Toutes les réservations sont entièrement prises en charge en anglais. Nos chauffeurs maîtrisent l'anglais courant. Pour les conversations complexes, nous utilisons des outils de traduction.",
    },
  },
  {
    g: 0,
    q: { en: "Do you operate 24/7?", ja: "24時間対応していますか？", zh: "是否24小時服務？", ko: "24시간 운영하나요?", "zh-cn": "是否24小时服务？", th: "ให้บริการตลอด 24 ชั่วโมงหรือไม่?", fr: "Opérez-vous 24h/24?" },
    a: {
      en: "Yes. We operate around the clock with no late-night or early-morning surcharge. All prices are the same regardless of departure time.",
      ja: "はい。24時間365日対応しており、深夜・早朝の割増料金は一切ございません。出発時間に関わらず料金は同一です。",
      zh: "是的。我們全年無休、24小時服務，深夜及清晨均無附加費用，價格不因時段而改變。",
      ko: "네. 연중무휴 24시간 운영하며 심야·새벽 할증 요금은 없습니다. 출발 시간에 관계없이 요금은 동일합니다.",
      "zh-cn": "是的。我们全年无休、24小时服务，深夜及清晨均无附加费用，价格不因时段而改变。",
      th: "ใช่ เราให้บริการตลอด 24 ชั่วโมง โดยไม่มีค่าบริการเพิ่มเติมสำหรับช่วงดึกหรือเช้าตรู่ ราคาเท่ากันไม่ว่าจะเดินทางเวลาใด",
      fr: "Oui. Nous opérons 24h/24, 7j/7, sans supplément de nuit ou de matin. Les tarifs sont identiques quelle que soit l'heure de départ.",
    },
  },
  /* ── Cars & Luggage ── */
  {
    g: 2,
    q: { en: "How much luggage can I bring?", ja: "荷物はどのくらい積めますか？", zh: "可以帶多少行李？", ko: "짐은 얼마나 실을 수 있나요?", "zh-cn": "可以带多少行李？", th: "สามารถนำสัมภาระมาได้เท่าไร?", fr: "Combien de bagages puis-je apporter?" },
    a: {
      en: "Alphard: up to 4 passengers and 4 large suitcases. Hiace: up to 9 passengers and 6+ large suitcases. Please declare your exact luggage count when booking. Oversized items — golf bags, strollers, ski equipment — must be mentioned in advance.",
      ja: "アルファード：最大4名様・大型スーツケース4個。ハイエース：最大9名様・大型スーツケース6個以上。ご予約時に荷物の数を必ずお知らせください。ゴルフバッグ・ベビーカー・スキー用品などの大型荷物は必ず事前にお申し出ください。",
      zh: "埃爾法：最多4人及4件大型行李箱。海獅：最多9人及6件以上大型行李箱。預訂時請告知確切行李數量。高爾夫球包、嬰兒車、滑雪器材等特大行李必須提前說明。",
      ko: "Alphard: 최대 4인 및 대형 수트케이스 4개. Hiace: 최대 9인 및 대형 수트케이스 6개 이상. 예약 시 정확한 수하물 수를 알려 주세요. 골프백, 유모차, 스키 장비 등 대형 짐은 반드시 사전에 알려 주셔야 합니다.",
      "zh-cn": "埃尔法：最多4人及4件大型行李箱。海狮：最多9人及6件以上大型行李箱。预订时请告知确切行李数量。高尔夫球包、婴儿车、滑雪器材等特大行李必须提前说明。",
      th: "Alphard: รับได้สูงสุด 4 ท่านและกระเป๋าเดินทางขนาดใหญ่ 4 ใบ Hiace: รับได้สูงสุด 9 ท่านและกระเป๋าขนาดใหญ่ 6+ ใบ กรุณาระบุจำนวนสัมภาระที่แน่นอนเมื่อจอง สิ่งของขนาดใหญ่พิเศษต้องแจ้งล่วงหน้า",
      fr: "Alphard: jusqu'à 4 passagers et 4 grandes valises. Hiace: jusqu'à 9 passagers et 6+ grandes valises. Veuillez déclarer le nombre exact de bagages lors de la réservation. Les articles surdimensionnés doivent être mentionnés à l'avance.",
    },
  },
  {
    g: 2,
    q: { en: "Do you accommodate wheelchair users?", ja: "車椅子の方も利用できますか？", zh: "可以乘坐輪椅嗎？", ko: "휠체어 이용자도 탑승할 수 있나요?", "zh-cn": "可以乘坐轮椅吗？", th: "รองรับผู้ใช้รถเข็นหรือไม่?", fr: "Acceptez-vous les utilisateurs de fauteuil roulant?" },
    a: {
      en: "Yes. Please notify us at booking with the wheelchair type (foldable / electric / dimensions) so we can assign a suitable vehicle.",
      ja: "はい。ご予約の際に車椅子の種類（折りたたみ式・電動式・サイズ）をお知らせいただければ、適切な車両をご用意いたします。",
      zh: "可以。預訂時請告知輪椅類型（折疊式／電動式／尺寸），以便我們安排合適的車輛。",
      ko: "네. 예약 시 휠체어 유형(접이식/전동식/크기)을 알려 주시면 적합한 차량을 배정해 드립니다.",
      "zh-cn": "可以。预订时请告知轮椅类型（折叠式／电动式／尺寸），以便我们安排合适的车辆。",
      th: "ได้ กรุณาแจ้งประเภทรถเข็น (พับได้/ไฟฟ้า/ขนาด) เมื่อจอง เพื่อให้เราจัดรถที่เหมาะสม",
      fr: "Oui. Veuillez nous informer lors de la réservation du type de fauteuil roulant (pliant / électrique / dimensions) afin que nous puissions attribuer un véhicule adapté.",
    },
  },
  /* ── Booking & Cancellation ── */
  {
    g: 3,
    q: { en: "Can I request multiple stops?", ja: "複数の立ち寄り先を追加できますか？", zh: "可以安排多個停靠點嗎？", ko: "여러 경유지를 추가할 수 있나요?", "zh-cn": "可以安排多个停靠点吗？", th: "สามารถขอหยุดหลายจุดได้หรือไม่?", fr: "Puis-je demander plusieurs arrêts?" },
    a: {
      en: "Yes. Please list all stops in advance when booking. Additional charges may apply depending on routing.",
      ja: "はい。ご予約時に全ての立ち寄り先をご記入ください。ルートによっては追加料金が発生する場合があります。",
      zh: "可以。請在預訂時列明所有停靠地點。視乎路線，可能需要支付額外費用。",
      ko: "네. 예약 시 모든 경유지를 미리 기재해 주세요. 경로에 따라 추가 요금이 발생할 수 있습니다.",
      "zh-cn": "可以。请在预订时列明所有停靠地点。视乎路线，可能需要支付额外费用。",
      th: "ได้ กรุณาระบุจุดหยุดทั้งหมดล่วงหน้าเมื่อจอง อาจมีค่าใช้จ่ายเพิ่มเติมขึ้นอยู่กับเส้นทาง",
      fr: "Oui. Veuillez lister tous les arrêts à l'avance lors de la réservation. Des frais supplémentaires peuvent s'appliquer selon l'itinéraire.",
    },
  },
  {
    g: 3,
    q: { en: "Do you offer hourly charter?", ja: "時間制貸切はできますか？", zh: "可以按小時包車嗎？", ko: "시간제 전세 서비스가 있나요?", "zh-cn": "可以按小时包车吗？", th: "มีบริการเช่าเหมาคันเป็นชั่วโมงหรือไม่?", fr: "Proposez-vous la location à l'heure?" },
    a: {
      en: "Yes. Minimum 4 hours. Ideal for shopping, corporate meetings, and sightseeing. Book in advance — same-day bookings are not guaranteed.",
      ja: "はい。最低4時間からご利用いただけます。ショッピング・企業訪問・観光に最適です。事前予約推奨。当日ご予約はご対応できない場合があります。",
      zh: "是的。最少4小時起。適合購物、商務拜訪及觀光。建議提前預訂，當天預約未必有車。",
      ko: "네. 최소 4시간부터 이용 가능합니다. 쇼핑, 기업 방문, 관광에 최적입니다. 사전 예약 권장—당일 예약은 보장되지 않을 수 있습니다.",
      "zh-cn": "是的。最少4小时起。适合购物、商务拜访及观光。建议提前预订，当天预约未必有车。",
      th: "ได้ ขั้นต่ำ 4 ชั่วโมง เหมาะสำหรับการช้อปปิ้ง ประชุมธุรกิจ และชมสถานที่ท่องเที่ยว แนะนำจองล่วงหน้า",
      fr: "Oui. Minimum 4 heures. Idéal pour le shopping, les réunions d'affaires et les visites touristiques. Réservation à l'avance recommandée.",
    },
  },
  /* ── At the Airport ── */
  {
    g: 4,
    q: { en: "Where exactly will the driver meet me?", ja: "空港でどこで待っていてもらえますか？", zh: "司機在機場哪裡等候？", ko: "공항에서 드라이버가 어디서 기다리나요?", "zh-cn": "司机在机场哪里等候？", th: "คนขับจะรับฉันที่ไหนในสนามบิน?", fr: "Où exactement le chauffeur m'attendra-t-il?" },
    a: {
      en: "In the arrivals hall, after customs and baggage claim. Your chauffeur will be holding a name board with your name. Please do not exit the terminal before finding your driver.",
      ja: "到着ロビー（入国審査・手荷物受け取り後）にてお待ちしております。乗務員がお客様のお名前を掲げたネームプレートをお持ちしております。ドライバーを見つける前に建物の外へ出ないようご注意ください。",
      zh: "在到達大廳（通關及取行李後）等候。司機將手持寫有您姓名的接機牌。請在找到司機前勿離開航站樓。",
      ko: "입국심사와 수하물 수취 후 도착 로비에서 기다립니다. 드라이버가 고객 이름이 적힌 이름판을 들고 있습니다. 드라이버를 찾기 전에 터미널 밖으로 나가지 마세요.",
      "zh-cn": "在到达大厅（通关及取行李后）等候。司机将手持写有您姓名的接机牌。请在找到司机前勿离开航站楼。",
      th: "ที่ล็อบบี้ผู้โดยสารขาเข้า หลังผ่านพิธีการศุลกากรและรับสัมภาระแล้ว คนขับจะถือป้ายชื่อของคุณ กรุณาอย่าออกจากอาคารผู้โดยสารก่อนพบคนขับ",
      fr: "Dans le hall des arrivées, après le contrôle douanier et la récupération des bagages. Votre chauffeur tiendra un panneau avec votre nom. Ne sortez pas du terminal avant de trouver votre chauffeur.",
    },
  },
  {
    g: 4,
    q: { en: "How long does it take from Narita Airport to Tokyo?", ja: "成田空港から東京市内まで何分かかりますか？", zh: "從成田機場到東京市區需要多久？", ko: "나리타 공항에서 도쿄 시내까지 얼마나 걸리나요?", "zh-cn": "从成田机场到东京市区需要多久？", th: "ใช้เวลานานเท่าไรจากสนามบินนาริตะถึงโตเกียว?", fr: "Combien de temps faut-il de l'aéroport de Narita à Tokyo?" },
    a: {
      en: "Typically 50–70 minutes. Allow up to 90 minutes during peak hours or if there is an accident on the expressway.",
      ja: "通常50〜70分程度です。ラッシュアワー時や高速道路での事故発生時は、最大90分ほどお見込みください。",
      zh: "通常約50至70分鐘。尖峰時段或高速公路發生事故時，請預留最多90分鐘。",
      ko: "보통 50~70분입니다. 러시아워나 고속도로 사고 발생 시 최대 90분까지 소요될 수 있습니다.",
      "zh-cn": "通常约50至70分钟。尖峰时段或高速公路发生事故时，请预留最多90分钟。",
      th: "โดยทั่วไปประมาณ 50–70 นาที ในช่วงชั่วโมงเร่งด่วนหรือมีอุบัติเหตุบนทางด่วน ควรเผื่อเวลาถึง 90 นาที",
      fr: "En général 50 à 70 minutes. Prévoyez jusqu'à 90 minutes aux heures de pointe ou en cas d'accident sur l'autoroute.",
    },
  },
  {
    g: 4,
    q: { en: "How long does it take from Haneda Airport to Tokyo?", ja: "羽田空港から東京市内まで何分かかりますか？", zh: "從羽田機場到東京市區需要多久？", ko: "하네다 공항에서 도쿄 시내까지 얼마나 걸리나요?", "zh-cn": "从羽田机场到东京市区需要多久？", th: "ใช้เวลานานเท่าไรจากสนามบินฮาเนดะถึงโตเกียว?", fr: "Combien de temps faut-il de l'aéroport de Haneda à Tokyo?" },
    a: {
      en: "Typically 30–45 minutes. Allow up to 60 minutes during heavy traffic.",
      ja: "通常30〜45分程度です。交通渋滞時は最大60分ほどお見込みください。",
      zh: "通常約30至45分鐘。交通繁忙時請預留最多60分鐘。",
      ko: "보통 30~45분입니다. 교통 혼잡 시 최대 60분까지 소요될 수 있습니다.",
      "zh-cn": "通常约30至45分钟。交通繁忙时请预留最多60分钟。",
      th: "โดยทั่วไปประมาณ 30–45 นาที ในช่วงการจราจรหนาแน่นควรเผื่อเวลาถึง 60 นาที",
      fr: "En général 30 à 45 minutes. Prévoyez jusqu'à 60 minutes en cas de trafic dense.",
    },
  },
  {
    g: 4,
    q: { en: "How long will the driver wait after landing?", ja: "着陸後どのくらい待ってもらえますか？", zh: "落地後司機會等多久？", ko: "착륙 후 드라이버는 얼마나 기다려 주나요?", "zh-cn": "落地后司机会等多久？", th: "คนขับจะรอนานเท่าไรหลังลงจอด?", fr: "Combien de temps le chauffeur attendra-t-il après l'atterrissage?" },
    a: {
      en: "Your chauffeur waits in the arrivals hall until you appear. We track your flight in real time, so they know exactly when you land. You have 90 minutes after touchdown to clear customs and collect your bags — take your time.",
      ja: "乗務員は到着ロビーでお客様が現れるまでお待ちしております。フライトをリアルタイムで追跡しているため、着陸時間は把握済みです。通関・手荷物受け取りには着陸後90分間ゆっくりお使いください。",
      zh: "司機在到達大廳等您出現。我們即時追蹤您的航班，因此完全掌握您的落地時間。落地後有90分鐘讓您完成通關及取行李，請從容不迫。",
      ko: "드라이버는 도착 로비에서 고객이 나타날 때까지 기다립니다. 실시간으로 항공편을 추적하므로 착륙 시간을 정확히 파악합니다. 착륙 후 90분간 입국심사와 수하물 수취를 여유롭게 하실 수 있습니다.",
      "zh-cn": "司机在到达大厅等您出现。我们即时追踪您的航班，因此完全掌握您的落地时间。落地后有90分钟让您完成通关及取行李，请从容不迫。",
      th: "คนขับรอในล็อบบี้ผู้โดยสารขาเข้าจนกว่าคุณจะออกมา เราติดตามเที่ยวบินแบบเรียลไทม์ คุณมีเวลา 90 นาทีหลังลงจอดเพื่อผ่านพิธีการศุลกากรและรับสัมภาระ",
      fr: "Votre chauffeur attend dans le hall des arrivées jusqu'à votre apparition. Nous suivons votre vol en temps réel. Vous disposez de 90 minutes après l'atterrissage pour passer la douane et récupérer vos bagages.",
    },
  },
  {
    g: 4,
    q: { en: "Should I exchange my JR Pass at the airport?", ja: "JRパスは空港で交換すべきですか？", zh: "我應該在機場兌換JR Pass嗎？", ko: "JR Pass는 공항에서 교환해야 하나요?", "zh-cn": "我应该在机场兑换JR Pass吗？", th: "ควรแลก JR Pass ที่สนามบินหรือไม่?", fr: "Dois-je échanger mon JR Pass à l'aéroport?" },
    a: {
      en: "We recommend exchanging at major Tokyo stations (Tokyo, Shinjuku, Shibuya) where queues are minimal. Airport counters can have 1–2 hour waits. Your driver can take you to a station counter after drop-off if needed.",
      ja: "東京・新宿・渋谷など都内の主要駅での交換をお勧めします。空港のカウンターは1〜2時間待ちになる場合があります。ご希望であれば、お送りの後に駅のカウンターへご案内することも可能です。",
      zh: "建議在東京、新宿、澀谷等主要車站兌換，等候時間極短。機場兌換窗口可能需排隊1至2小時。若有需要，司機可在送達後帶您前往車站窗口。",
      ko: "도쿄, 신주쿠, 시부야 등 주요 역에서 교환하실 것을 권장합니다. 대기 시간이 매우 짧습니다. 공항 창구는 1~2시간 대기가 생길 수 있습니다. 필요하시면 드라이버가 하차 후 역 창구로 안내해 드립니다.",
      "zh-cn": "建议在东京、新宿、涩谷等主要车站兑换，等候时间极短。机场兑换窗口可能需排队1至2小时。若有需要，司机可在送达后带您前往车站窗口。",
      th: "เราแนะนำให้แลกที่สถานีหลักในโตเกียว (โตเกียว ชินจูกุ ชิบูยะ) ซึ่งมีคิวน้อยกว่า ช่องบริการที่สนามบินอาจรอนาน 1–2 ชั่วโมง คนขับสามารถพาคุณไปช่องบริการที่สถานีได้หากต้องการ",
      fr: "Nous recommandons d'échanger dans les grandes gares de Tokyo (Tokyo, Shinjuku, Shibuya) où les files sont minimes. Les comptoirs aéroport peuvent avoir 1 à 2 heures d'attente.",
    },
  },
  /* ── Special Requests ── */
  {
    g: 5,
    q: { en: "Do you pick up from hotels, private residences, or Airbnb?", ja: "ホテルや個人宅・Airbnbへの送迎はできますか？", zh: "可以從酒店、民宅或Airbnb接送嗎？", ko: "호텔, 개인 주택, Airbnb에서 픽업해 주시나요?", "zh-cn": "可以从酒店、民宅或Airbnb接送吗？", th: "รับจากโรงแรม บ้านพักส่วนตัว หรือ Airbnb ได้หรือไม่?", fr: "Prenez-vous en charge depuis les hôtels, résidences privées ou Airbnb?" },
    a: {
      en: "Yes. We pick up from any address in Tokyo and surrounding areas — hotels, private homes, Airbnb, offices, or any location you specify.",
      ja: "はい。東京都内および近郊であれば、ホテル・個人宅・Airbnb・オフィス等、ご指定のいかなる場所からでも対応いたします。",
      zh: "是的。東京市內及周邊地區任何地址均可，包括酒店、私人住宅、Airbnb、辦公室等您指定的地點。",
      ko: "네. 도쿄 시내 및 근교라면 호텔, 개인 주택, Airbnb, 사무실 등 고객이 지정하는 어떤 장소에서도 픽업합니다.",
      "zh-cn": "是的。东京市内及周边地区任何地址均可，包括酒店、私人住宅、Airbnb、办公室等您指定的地点。",
      th: "ใช่ เราสามารถรับจากที่อยู่ใดก็ได้ในโตเกียวและพื้นที่โดยรอบ ไม่ว่าจะเป็นโรงแรม บ้านส่วนตัว Airbnb สำนักงาน หรือสถานที่ที่คุณระบุ",
      fr: "Oui. Nous prenons en charge depuis n'importe quelle adresse à Tokyo et dans les environs — hôtels, résidences privées, Airbnb, bureaux ou tout lieu que vous spécifiez.",
    },
  },
  {
    g: 5,
    q: { en: "Do you serve Yokohama cruise terminals?", ja: "横浜のクルーズターミナルも対応していますか？", zh: "可以接送橫濱郵輪碼頭嗎？", ko: "요코하마 크루즈 터미널도 운행하나요?", "zh-cn": "可以接送横滨邮轮码头吗？", th: "ให้บริการที่ท่าเรือสำราญโยโกฮาม่าหรือไม่?", fr: "Desservez-vous les terminaux de croisière de Yokohama?" },
    a: {
      en: "Yes. We serve Osanbashi Pier and Daikoku Pier. Please include your vessel name and arrival/departure time when booking.",
      ja: "はい。大さん橋ふ頭および大黒ふ頭に対応しております。ご予約の際は船名と入出港時間をお知らせください。",
      zh: "是的。我們服務大棧橋碼頭及大黑碼頭。預訂時請提供船名及到港/離港時間。",
      ko: "네. 오산바시 부두와 다이코쿠 부두에 대응합니다. 예약 시 선박명과 입출항 시간을 알려 주세요.",
      "zh-cn": "是的。我们服务大栈桥码头及大黑码头。预订时请提供船名及到港/离港时间。",
      th: "ใช่ เราให้บริการที่ท่าเรือโอซันบาชิและท่าเรือไดโคกุ กรุณาระบุชื่อเรือและเวลาเข้า/ออกท่าเมื่อจอง",
      fr: "Oui. Nous desservons le quai Osanbashi et le quai Daikoku. Veuillez inclure le nom du navire et l'heure d'arrivée/départ lors de la réservation.",
    },
  },
  {
    g: 5,
    q: { en: "Do you go to Tokyo Disney Resort?", ja: "東京ディズニーリゾートへの送迎はできますか？", zh: "可以接送東京迪士尼樂園嗎？", ko: "도쿄 디즈니 리조트까지 운행하나요?", "zh-cn": "可以接送东京迪士尼乐园吗？", th: "ไปส่งที่ Tokyo Disney Resort ได้หรือไม่?", fr: "Allez-vous à Tokyo Disney Resort?" },
    a: {
      en: "Yes. Both Tokyo Disneyland and Tokyo DisneySea entrances.",
      ja: "はい。東京ディズニーランド・東京ディズニーシーの両入口に対応しております。",
      zh: "是的。東京迪士尼樂園及東京迪士尼海洋均可接送。",
      ko: "네. 도쿄 디즈니랜드와 도쿄 디즈니씨 양쪽 입구 모두 운행합니다.",
      "zh-cn": "是的。东京迪士尼乐园及东京迪士尼海洋均可接送。",
      th: "ใช่ ทั้งทางเข้า Tokyo Disneyland และ Tokyo DisneySea",
      fr: "Oui. Les deux entrées de Tokyo Disneyland et de Tokyo DisneySea.",
    },
  },
  {
    g: 5,
    q: { en: "Do you provide long-distance transfers across Japan?", ja: "日本全国への長距離送迎はできますか？", zh: "可以提供日本全國長途接送嗎？", ko: "일본 전국 장거리 이동 서비스가 있나요?", "zh-cn": "可以提供日本全国长途接送吗？", th: "มีบริการรับส่งระยะไกลทั่วญี่ปุ่นหรือไม่?", fr: "Effectuez-vous des transferts longue distance à travers le Japon?" },
    a: {
      en: "Yes. We operate across Japan — Mt. Fuji, Hakone, Nikko, Karuizawa, ski resorts in Nagano and Niigata, and beyond. Contact us for a quote on any destination.",
      ja: "はい。富士山・箱根・日光・軽井沢・長野や新潟のスキーリゾートなど、日本全国に対応しております。ご希望の目的地へのお見積もりはお気軽にお問い合わせください。",
      zh: "是的。我們覆蓋全日本，包括富士山、箱根、日光、輕井澤、長野及新潟滑雪勝地等。任何目的地均可詢價。",
      ko: "네. 후지산, 하코네, 닛코, 가루이자와, 나가노·니가타 스키 리조트 등 일본 전국에 대응합니다. 원하시는 목적지 견적은 문의 주세요.",
      "zh-cn": "是的。我们覆盖全日本，包括富士山、箱根、日光、轻井泽、长野及新泻滑雪胜地等。任何目的地均可询价。",
      th: "ใช่ เราให้บริการทั่วญี่ปุ่น ไม่ว่าจะเป็นภูเขาไฟฟูจิ ฮาโกเน นิกโก คารุอิซาว่า รีสอร์ตสกีในนากาโนและนีงาตะ ติดต่อเราเพื่อรับใบเสนอราคา",
      fr: "Oui. Nous opérons partout au Japon — Mt. Fuji, Hakone, Nikko, Karuizawa, stations de ski à Nagano et Niigata, et bien plus. Contactez-nous pour un devis.",
    },
  },
  {
    g: 5,
    q: { en: "What if I leave something in the car?", ja: "車内に忘れ物をした場合は？", zh: "如果在車上遺留物品怎麼辦？", ko: "차 안에 물건을 두고 내렸을 경우 어떻게 하나요?", "zh-cn": "如果在车上遗留物品怎么办？", th: "ถ้าลืมของในรถจะทำอย่างไร?", fr: "Que faire si j'oublie quelque chose dans la voiture?" },
    a: {
      en: "Contact us immediately at info@octoshell.jp. If the item is found, we will arrange return delivery. Shipping costs are at the client's expense.",
      ja: "速やかにinfo@octoshell.jpまでご連絡ください。お忘れ物が見つかり次第、ご返送の手配をいたします。送料はお客様のご負担となります。",
      zh: "請立即聯絡 info@octoshell.jp。若找到遺失物，我們將為您安排寄回。郵寄費用由客人承擔。",
      ko: "즉시 info@octoshell.jp로 연락해 주세요. 분실물이 발견되면 반송 수속을 진행합니다. 배송비는 고객 부담입니다.",
      "zh-cn": "请立即联系 info@octoshell.jp。若找到遗失物，我们将为您安排寄回。邮寄费用由客人承担。",
      th: "ติดต่อเราทันทีที่ info@octoshell.jp หากพบสิ่งของ เราจะจัดการส่งคืนให้คุณ ค่าจัดส่งเป็นค่าใช้จ่ายของลูกค้า",
      fr: "Contactez-nous immédiatement à info@octoshell.jp. Si l'objet est retrouvé, nous organiserons la livraison de retour. Les frais d'expédition sont à la charge du client.",
    },
  },
  {
    g: 1,
    q: { en: "Is tipping required?", ja: "チップは必要ですか？", zh: "需要給小費嗎？", ko: "팁이 필요한가요?", "zh-cn": "需要给小费吗？", th: "ต้องให้ทิปหรือไม่?", fr: "Le pourboire est-il obligatoire?" },
    a: {
      en: "No. Tipping is not customary in Japan and is never expected by our chauffeurs. A kind word or an online review is the best way to show your appreciation.",
      ja: "不要です。チップは日本では一般的な慣習ではなく、乗務員が期待することもございません。温かいお言葉やオンラインレビューが最大の励みになります。",
      zh: "不需要。日本沒有給小費的習慣，我們的司機也從不期待。若您滿意服務，留下評價或一句好評是最好的回饋。",
      ko: "아니요. 일본에서는 팁 문화가 없으며 드라이버도 기대하지 않습니다. 따뜻한 한마디나 온라인 리뷰가 최고의 감사 표현입니다.",
      "zh-cn": "不需要。日本没有给小费的习惯，我们的司机也从不期待。若您满意服务，留下评价或一句好评是最好的回馈。",
      th: "ไม่จำเป็น การให้ทิปไม่ใช่ธรรมเนียมในญี่ปุ่นและคนขับของเราไม่ได้คาดหวัง คำขอบคุณหรือรีวิวออนไลน์คือวิธีแสดงความขอบคุณที่ดีที่สุด",
      fr: "Non. Le pourboire n'est pas une coutume au Japon et n'est jamais attendu par nos chauffeurs. Un mot aimable ou un avis en ligne est la meilleure façon de montrer votre appréciation.",
    },
  },
];

function buildRegroupedFAQ(faq: Record<Lang, FaqGroup[]>): Record<Lang, FaqGroup[]> {
  const result = {} as Record<Lang, FaqGroup[]>;
  (["en", "ja", "zh", "ko", "zh-cn", "th", "fr"] as Lang[]).forEach((lang) => {
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
              Section 3: Fleet CTA
          ════════════════════════════════════════════════════════ */}
          <div className="mt-20 sm:mt-28">
            <SectionLabel label={VEH_SECTION_BADGE[lang]} />

            <div className="border border-[var(--c-rule)] p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-4">
                {[
                  { name: "Toyota Alphard", badge: "Luxury MPV" },
                  { name: "Toyota Hiace",   badge: "Premium Van" },
                ].map((v) => (
                  <div key={v.name}>
                    <p className="text-[var(--c-ink)] text-[15px] font-medium tracking-[0.1em]">{v.name}</p>
                    <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]/70 font-medium mt-0.5">{v.badge}</p>
                  </div>
                ))}
              </div>
              <Link href="/fleet" draggable={false} onContextMenu={(e) => e.preventDefault()}
                className="group shrink-0 inline-flex items-center gap-2.5 border border-[#c9a84c]/50 text-[#c9a84c]
                           text-[11px] font-bold tracking-[0.3em] uppercase px-7 py-3.5
                           hover:bg-[#c9a84c] hover:text-[#0c0c0c] transition-all duration-200">
                {lang === "ja" ? "車種詳細を見る" : lang === "zh" ? "查看車型詳情" : "Explore Our Fleet"}
                <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
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

          <h2 className="text-[var(--c-ink)] text-3xl sm:text-4xl font-light tracking-[0.1em] mb-6">
            {lang === "ja" ? "よくあるご質問" : lang === "zh" ? "常見問題" : "Frequently Asked Questions"}
          </h2>
          <p className="text-[var(--c-ink-2)] text-[15px] leading-relaxed mb-10">
            {lang === "ja"
              ? "料金・キャンセル・空港送迎・お支払い方法など、よくいただくご質問をまとめました。"
              : lang === "zh"
              ? "我們整理了關於費用、取消政策、機場接送及付款方式的常見問題。"
              : "We've compiled answers to the most common questions about pricing, cancellation, airport transfers, and payment."}
          </p>

          {/* Category preview chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            {(lang === "ja"
              ? ["私たちについて", "料金・費用", "車両・手荷物", "予約・キャンセル", "空港当日", "特別リクエスト"]
              : lang === "zh"
              ? ["關於我們", "費用與收費", "車輛與行李", "預訂與取消", "在機場", "特殊需求"]
              : ["About Us", "Prices & Fees", "Cars & Luggage", "Booking & Cancellation", "At the Airport", "Special Requests"]
            ).map((cat) => (
              <span key={cat} className="text-[11px] tracking-[0.15em] px-3 py-1.5 border border-[#c9a84c]/25 text-[#c9a84c]/70 uppercase">
                {cat}
              </span>
            ))}
          </div>

          <Link href="/faq"
            className="group inline-flex items-center gap-3 bg-[#c9a84c] text-[#0c0c0c]
                       text-[12px] font-black tracking-[0.3em] uppercase px-8 py-3.5
                       hover:bg-white transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.3)]
                       active:scale-110 sm:active:scale-100 mb-14">
            {lang === "ja" ? "すべてのFAQを見る" : lang === "zh" ? "查看所有常見問題" : "View All FAQs"}
            <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>

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
  ko: ["일반 문의", "예약 및 견적 요청", "법인 계약", "기타"],
  "zh-cn": ["一般询问", "预订及报价", "企业长期合作", "其他"],
  th: ["สอบถามทั่วไป", "จองและขอใบเสนอราคา", "สัญญาองค์กร", "อื่นๆ"],
  fr: ["Renseignement général", "Réservation & Demande de devis", "Contrat entreprise", "Autre"],
};

const CLABEL: Record<string, Record<Lang, string>> = {
  subject:  { ja: "お問い合わせ種別",      en: "Inquiry Type",           zh: "詢問類型",      ko: "문의 유형",      "zh-cn": "询问类型",      th: "ประเภทการสอบถาม",   fr: "Type de demande" },
  name:     { ja: "お名前 *",              en: "Your Name *",            zh: "您的姓名 *",    ko: "성함 *",         "zh-cn": "您的姓名 *",    th: "ชื่อของคุณ *",       fr: "Votre nom *" },
  email:    { ja: "メールアドレス *",       en: "Email Address *",        zh: "電子郵件 *",    ko: "이메일 주소 *",  "zh-cn": "电子邮件 *",    th: "อีเมล *",            fr: "Adresse e-mail *" },
  phone:    { ja: "電話番号（任意）",       en: "Phone Number (optional)", zh: "電話號碼（選填）", ko: "전화번호 (선택)", "zh-cn": "电话号码（选填）", th: "หมายเลขโทรศัพท์ (ไม่บังคับ)", fr: "Téléphone (facultatif)" },
  message:  { ja: "ご連絡内容・ご質問 *",   en: "Your Message *",         zh: "詢問內容 *",    ko: "문의 내용 *",    "zh-cn": "询问内容 *",    th: "ข้อความของคุณ *",   fr: "Votre message *" },
  send:     { ja: "送信する",              en: "Send Message",           zh: "發送訊息",      ko: "보내기",         "zh-cn": "发送信息",      th: "ส่งข้อความ",         fr: "Envoyer" },
  sending:  { ja: "送信中…",              en: "Sending…",               zh: "傳送中…",       ko: "전송 중…",       "zh-cn": "发送中…",       th: "กำลังส่ง…",         fr: "Envoi en cours…" },
  cancel:   { ja: "キャンセル",            en: "Cancel",                 zh: "取消",          ko: "취소",           "zh-cn": "取消",          th: "ยกเลิก",             fr: "Annuler" },
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
