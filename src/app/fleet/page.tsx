"use client";
import { useState } from "react";
import Link from "next/link";
import ProtectedImage from "@/components/ProtectedImage";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/context/LangContext";
import type { Lang } from "@/lib/translations";

/* ══════════════════════════════════════════════════════════════════════
   JSON-LD
══════════════════════════════════════════════════════════════════════ */
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Car",
      "name": "Toyota Alphard",
      "brand": { "@type": "Brand", "name": "Toyota" },
      "vehicleSeatingCapacity": 6,
      "description": "Luxury MPV. Perfect for airport transfers, business travel and private sightseeing tours in Japan. Up to 6 passengers. Standard config: 4 passengers + 4 large suitcases. Dimensions: 4,945mm × 1,850mm × 1,950mm.",
      "offers": {
        "@type": "Offer",
        "price": "20000",
        "priceCurrency": "JPY",
        "availability": "https://schema.org/InStock",
        "url": "https://octoshell.jp/book",
      },
      "provider": { "@id": "https://octoshell.jp/#organization" },
    },
    {
      "@type": "Car",
      "name": "Toyota Hiace",
      "brand": { "@type": "Brand", "name": "Toyota" },
      "vehicleSeatingCapacity": 9,
      "description": "Premium Van. Ideal for families, small groups and corporate transportation. Up to 9 passengers and 15 large suitcases. Dimensions: 5,380mm × 1,880mm × 2,285mm.",
      "offers": {
        "@type": "Offer",
        "price": "22000",
        "priceCurrency": "JPY",
        "availability": "https://schema.org/InStock",
        "url": "https://octoshell.jp/book",
      },
      "provider": { "@id": "https://octoshell.jp/#organization" },
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════
   Content
══════════════════════════════════════════════════════════════════════ */
type Copy = Record<Lang, string>;

const HERO_BADGE: Copy = { en: "OUR FLEET", ja: "車種ラインナップ", zh: "車隊介紹", ko: "차량 라인업", "zh-cn": "车队介绍", th: "ยานพาหนะของเรา", fr: "NOTRE FLOTTE" };
const HERO_H1: Copy    = { en: "Two Vehicles.\nEvery Trip Covered.", ja: "2車種で\nあらゆる旅に対応。", zh: "兩款車型\n覆蓋所有行程。", ko: "두 가지 차종으로\n모든 여정을 커버합니다.", "zh-cn": "两款车型\n覆盖所有行程。", th: "สองคัน\nครอบคลุมทุกการเดินทาง", fr: "Deux Véhicules.\nTous Vos Voyages Couverts." };
const HERO_SUB: Copy   = { en: "Toyota Alphard · Toyota Hiace — Licensed Green-Plate Fleet", ja: "トヨタ アルファード · トヨタ ハイエース — 合法緑ナンバー車両", zh: "豐田埃爾法 · 豐田海獅 — 合規綠牌車隊", ko: "Toyota Alphard · Toyota Hiace — 합규 녹색 번호판 차대", "zh-cn": "丰田埃尔法 · 丰田海狮 — 合规绿牌车队", th: "Toyota Alphard · Toyota Hiace — ป้ายเขียวได้รับใบอนุญาต", fr: "Toyota Alphard · Toyota Hiace — Flotte Agréée Plaque Verte" };
const BOOK_BTN: Copy   = { en: "Book This Vehicle", ja: "この車両を予約", zh: "預訂此車", ko: "이 차량 예약", "zh-cn": "预订此车", th: "จองยานพาหนะนี้", fr: "Réserver ce véhicule" };

/* ── Comparison table ── */
const CMP_HEADS: Copy[] = [
  { en: "", ja: "", zh: "", ko: "", "zh-cn": "", th: "", fr: "" },
  { en: "ALPHARD", ja: "アルファード", zh: "埃爾法", ko: "알파드", "zh-cn": "埃尔法", th: "ALPHARD", fr: "ALPHARD" },
  { en: "HIACE", ja: "ハイエース", zh: "海獅", ko: "하이에이스", "zh-cn": "海狮", th: "HIACE", fr: "HIACE" },
];
const CMP_ROWS: { label: Copy; a: Copy; h: Copy }[] = [
  {
    label: { en: "Max passengers", ja: "最大乗車人数", zh: "最多乘客", ko: "최대 탑승 인원", "zh-cn": "最多乘客", th: "ผู้โดยสารสูงสุด", fr: "Passagers max" },
    a: { en: "6", ja: "6名", zh: "6人", ko: "6인", "zh-cn": "6人", th: "6 ท่าน", fr: "6" },
    h: { en: "9", ja: "9名", zh: "9人", ko: "9인", "zh-cn": "9人", th: "9 ท่าน", fr: "9" },
  },
  {
    label: { en: "Suitcases (4–6 pax)", ja: "スーツケース（4〜6名）", zh: "行李箱（4至6人）", ko: "수트케이스 (4~6인)", "zh-cn": "行李箱（4至6人）", th: "กระเป๋า (4–6 ท่าน)", fr: "Valises (4–6 pax)" },
    a: { en: "5 large", ja: "大型5個", zh: "5件大型", ko: "대형 5개", "zh-cn": "5件大型", th: "ขนาดใหญ่ 5 ใบ", fr: "5 grandes" },
    h: { en: "9 large", ja: "大型9個", zh: "9件大型", ko: "대형 9개", "zh-cn": "9件大型", th: "ขนาดใหญ่ 9 ใบ", fr: "9 grandes" },
  },
  {
    label: { en: "Suitcases (1–3 pax)", ja: "スーツケース（1〜3名）", zh: "行李箱（1至3人）", ko: "수트케이스 (1~3인)", "zh-cn": "行李箱（1至3人）", th: "กระเป๋า (1–3 ท่าน)", fr: "Valises (1–3 pax)" },
    a: { en: "up to 10 large", ja: "大型10個まで", zh: "最多10件大型", ko: "대형 최대 10개", "zh-cn": "最多10件大型", th: "สูงสุด 10 ใบ", fr: "jusqu'à 10 grandes" },
    h: { en: "up to 15 large", ja: "大型15個まで", zh: "最多15件大型", ko: "대형 최대 15개", "zh-cn": "最多15件大型", th: "สูงสุด 15 ใบ", fr: "jusqu'à 15 grandes" },
  },
  {
    label: { en: "Golf bags", ja: "ゴルフバッグ", zh: "高爾夫球袋", ko: "골프백", "zh-cn": "高尔夫球袋", th: "ถุงกอล์ฟ", fr: "Sacs de golf" },
    a: { en: "2–3", ja: "2〜3本", zh: "2至3個", ko: "2~3개", "zh-cn": "2至3个", th: "2–3 ถุง", fr: "2–3" },
    h: { en: "4–6", ja: "4〜6本", zh: "4至6個", ko: "4~6개", "zh-cn": "4至6个", th: "4–6 ถุง", fr: "4–6" },
  },
  {
    label: { en: "Stroller / wheelchair", ja: "ベビーカー / 車椅子", zh: "嬰兒車 / 輪椅", ko: "유모차 / 휠체어", "zh-cn": "婴儿车 / 轮椅", th: "รถเข็นเด็ก / รถเข็น", fr: "Poussette / fauteuil roulant" },
    a: { en: "1 (folded)", ja: "1台（折畳）", zh: "1架（折疊）", ko: "1대 (접이식)", "zh-cn": "1架（折叠）", th: "1 คัน (พับ)", fr: "1 (plié)" },
    h: { en: "1–2", ja: "1〜2台", zh: "1至2架", ko: "1~2대", "zh-cn": "1至2架", th: "1–2 คัน", fr: "1–2" },
  },
  {
    label: { en: "Child seat (ISOFIX)", ja: "チャイルドシート（ISOFIX）", zh: "兒童座椅（ISOFIX）", ko: "유아 카시트 (ISOFIX)", "zh-cn": "儿童座椅（ISOFIX）", th: "ที่นั่งนิรภัยเด็ก (ISOFIX)", fr: "Siège enfant (ISOFIX)" },
    a: { en: "Free on request", ja: "無料（要申請）", zh: "免費（需提前申請）", ko: "무료 (요청 시)", "zh-cn": "免费（需提前申请）", th: "ฟรีตามคำขอ", fr: "Gratuit sur demande" },
    h: { en: "Free on request", ja: "無料（要申請）", zh: "免費（需提前申請）", ko: "무료 (요청 시)", "zh-cn": "免费（需提前申请）", th: "ฟรีตามคำขอ", fr: "Gratuit sur demande" },
  },
  {
    label: { en: "Airport transfer from", ja: "空港送迎料金〜", zh: "機場接送起價", ko: "공항 송영 시작 요금", "zh-cn": "机场接送起价", th: "รับส่งสนามบินเริ่มต้น", fr: "Transfert aéroport à partir de" },
    a: { en: "¥20,000", ja: "¥20,000〜", zh: "¥20,000起", ko: "¥20,000~", "zh-cn": "¥20,000起", th: "¥20,000", fr: "¥20,000" },
    h: { en: "¥22,000", ja: "¥22,000〜", zh: "¥22,000起", ko: "¥22,000~", "zh-cn": "¥22,000起", th: "¥22,000", fr: "¥22,000" },
  },
];

/* ── Vehicle detail data ── */
type VehicleData = {
  id: string;
  name: string;
  badge: Copy;
  tagline: Copy;
  img: string;
  dims: { l: string; w: string; h: string };
  configs: { label: Copy; bags: Copy; note?: Copy }[];
  best_for: Copy[];
  book_slug: string;
};

const VEHICLES: VehicleData[] = [
  {
    id: "alphard",
    name: "Toyota Alphard",
    badge: { en: "Luxury MPV", ja: "ラグジュアリーMPV", zh: "豪華MPV", ko: "럭셔리 MPV", "zh-cn": "豪华MPV", th: "มินิแวนหรูหรา", fr: "MPV de Luxe" },
    tagline: {
      en: "Perfect for airport transfers, business travel and private sightseeing tours in Japan.",
      ja: "空港送迎、ビジネス出張、プライベート観光に最適です。",
      zh: "完美適用於機場接送、商務出行及日本私人觀光遊覽。",
      ko: "공항 송영, 비즈니스 출장, 일본 프라이빗 관광에 완벽합니다.",
      "zh-cn": "完美适用于机场接送、商务出行及日本私人观光游览。",
      th: "เหมาะสำหรับรับส่งสนามบิน การเดินทางเพื่อธุรกิจ และทัวร์ชมสถานที่ส่วนตัวในญี่ปุ่น",
      fr: "Parfait pour les transferts aéroport, les voyages d'affaires et les circuits touristiques privés au Japon.",
    },
    img: "/alphard.webp",
    dims: { l: "4,945 mm", w: "1,850 mm", h: "1,950 mm" },
    configs: [
      {
        label: { en: "Standard (4–6 passengers)", ja: "標準（4〜6名）", zh: "標準（4至6人）", ko: "표준 (4~6인)", "zh-cn": "标准（4至6人）", th: "มาตรฐาน (4–6 ท่าน)", fr: "Standard (4–6 passagers)" },
        bags:  { en: "5 large suitcases", ja: "大型スーツケース5個", zh: "5件大型行李箱", ko: "대형 수트케이스 5개", "zh-cn": "5件大型行李箱", th: "กระเป๋าขนาดใหญ่ 5 ใบ", fr: "5 grandes valises" },
      },
      {
        label: { en: "Light (1–3 passengers)", ja: "少人数（1〜3名）", zh: "輕裝（1至3人）", ko: "소인수 (1~3인)", "zh-cn": "轻装（1至3人）", th: "เบา (1–3 ท่าน)", fr: "Léger (1–3 passagers)" },
        bags:  { en: "up to 10 large suitcases", ja: "大型スーツケース最大10個", zh: "最多10件大型行李箱", ko: "대형 수트케이스 최대 10개", "zh-cn": "最多10件大型行李箱", th: "สูงสุด 10 ใบ", fr: "jusqu'à 10 grandes valises" },
        note:  { en: "Ideal for heavy luggage or shopping trips", ja: "大荷物・ショッピング旅行に最適", zh: "適合大量行李或購物行程", ko: "대형 짐이나 쇼핑 여행에 최적", "zh-cn": "适合大量行李或购物行程", th: "เหมาะสำหรับสัมภาระมากหรือทริปช้อปปิ้ง", fr: "Idéal pour les bagages lourds ou les virées shopping" },
      },
    ],
    best_for: [
      { en: "Airport transfers", ja: "空港送迎", zh: "機場接送", ko: "공항 송영", "zh-cn": "机场接送", th: "รับส่งสนามบิน", fr: "Transferts aéroport" },
      { en: "VIP & corporate clients", ja: "VIP・法人のお客様", zh: "VIP及企業客戶", ko: "VIP 및 법인 고객", "zh-cn": "VIP及企业客户", th: "ลูกค้า VIP และองค์กร", fr: "Clients VIP & entreprises" },
      { en: "Couples & small families", ja: "カップル・小家族", zh: "情侶及小家庭", ko: "커플 및 소가족", "zh-cn": "情侣及小家庭", th: "คู่รักและครอบครัวเล็ก", fr: "Couples & petites familles" },
      { en: "Luxury sightseeing", ja: "高級観光", zh: "豪華觀光", ko: "럭셔리 관광", "zh-cn": "豪华观光", th: "ทัวร์ชมสถานที่หรูหรา", fr: "Visites touristiques de luxe" },
    ],
    book_slug: "alphard",
  },
  {
    id: "hiace",
    name: "Toyota Hiace",
    badge: { en: "Premium Van", ja: "プレミアムバン", zh: "優質廂型車", ko: "프리미엄 밴", "zh-cn": "优质厢型车", th: "แวนระดับพรีเมียม", fr: "Van Premium" },
    tagline: {
      en: "Ideal for families, small groups and corporate transportation.",
      ja: "ファミリー、小グループ、法人輸送に最適です。",
      zh: "適合家庭出行、小型團體及企業接送。",
      ko: "가족, 소그룹, 법인 이동에 이상적입니다.",
      "zh-cn": "适合家庭出行、小型团体及企业接送。",
      th: "เหมาะสำหรับครอบครัว กลุ่มเล็ก และการขนส่งองค์กร",
      fr: "Idéal pour les familles, petits groupes et le transport d'entreprise.",
    },
    img: "/hiace.webp",
    dims: { l: "5,380 mm", w: "1,880 mm", h: "2,285 mm" },
    configs: [
      {
        label: { en: "Standard (7–9 passengers)", ja: "標準（7〜9名）", zh: "標準（7至9人）", ko: "표준 (7~9인)", "zh-cn": "标准（7至9人）", th: "มาตรฐาน (7–9 ท่าน)", fr: "Standard (7–9 passagers)" },
        bags:  { en: "9 large suitcases", ja: "大型スーツケース9個", zh: "9件大型行李箱", ko: "대형 수트케이스 9개", "zh-cn": "9件大型行李箱", th: "กระเป๋าขนาดใหญ่ 9 ใบ", fr: "9 grandes valises" },
      },
      {
        label: { en: "Light (1–6 passengers)", ja: "少人数（1〜6名）", zh: "輕裝（1至6人）", ko: "소인수 (1~6인)", "zh-cn": "轻装（1至6人）", th: "เบา (1–6 ท่าน)", fr: "Léger (1–6 passagers)" },
        bags:  { en: "up to 15 large suitcases", ja: "大型スーツケース最大15個", zh: "最多15件大型行李箱", ko: "대형 수트케이스 최대 15개", "zh-cn": "最多15件大型行李箱", th: "สูงสุด 15 ใบ", fr: "jusqu'à 15 grandes valises" },
        note:  { en: "Also fits ski bags, golf bags, strollers, or wheelchairs", ja: "スキーバッグ・ゴルフバッグ・ベビーカー・車椅子も積載可", zh: "亦可放置滑雪袋、高爾夫球袋、嬰兒車或輪椅", ko: "스키백, 골프백, 유모차, 휠체어도 탑재 가능", "zh-cn": "亦可放置滑雪袋、高尔夫球袋、婴儿车或轮椅", th: "รองรับถุงสกี ถุงกอล์ฟ รถเข็นเด็ก หรือรถเข็น", fr: "Convient également aux sacs de ski, sacs de golf, poussettes ou fauteuils roulants" },
      },
    ],
    best_for: [
      { en: "Large groups & families", ja: "大家族・大人数グループ", zh: "大家庭及大型團體", ko: "대가족 및 대그룹", "zh-cn": "大家庭及大型团体", th: "กลุ่มใหญ่และครอบครัว", fr: "Grands groupes & familles" },
      { en: "Golf & ski tours", ja: "ゴルフ・スキーツアー", zh: "高爾夫及滑雪之旅", ko: "골프 및 스키 투어", "zh-cn": "高尔夫及滑雪之旅", th: "ทัวร์กอล์ฟและสกี", fr: "Circuits golf & ski" },
      { en: "Hiking & outdoor trips", ja: "登山・アウトドア", zh: "登山及戶外活動", ko: "등산 및 야외 활동", "zh-cn": "登山及户外活动", th: "เดินป่าและกิจกรรมกลางแจ้ง", fr: "Randonnée & plein air" },
      { en: "Events & MICE", ja: "イベント・MICE", zh: "活動及會議", ko: "이벤트 및 MICE", "zh-cn": "活动及会议", th: "งานอีเวนต์และ MICE", fr: "Événements & MICE" },
    ],
    book_slug: "hiace",
  },
];

/* ── FAQ ── */
const FAQS: { q: Copy; a: Copy }[] = [
  {
    q: { en: "Can I mix different luggage types — suitcases, golf bags, and a stroller?", ja: "スーツケース・ゴルフバッグ・ベビーカーなど、異なる荷物を一緒に積めますか？", zh: "可以混放行李箱、高爾夫球袋和嬰兒車嗎？", ko: "수트케이스, 골프백, 유모차 등 다양한 짐을 함께 실을 수 있나요?", "zh-cn": "可以混放行李箱、高尔夫球袋和婴儿车吗？", th: "สามารถผสมสัมภาระหลายประเภทได้หรือไม่?", fr: "Puis-je mélanger différents types de bagages — valises, sacs de golf et poussette?" },
    a: { en: "Yes. Just tell us what you're bringing when you book. We'll confirm the vehicle can fit everything before confirming.", ja: "はい。ご予約時に持ち込む荷物をすべてお知らせください。すべて積載できる車両を確認した上で予約を確定いたします。", zh: "可以。預訂時請告訴我們您帶的所有物品，我們確認車輛可以容納後才會確認預訂。", ko: "네. 예약 시 가져올 짐을 모두 알려 주세요. 모두 탑재 가능한 차량을 확인한 후 예약을 확정합니다.", "zh-cn": "可以。预订时请告诉我们您带的所有物品，我们确认车辆可以容纳后才会确认预订。", th: "ได้ แจ้งให้เราทราบสิ่งที่คุณนำมาเมื่อจอง เราจะยืนยันว่ารถสามารถใส่ทุกอย่างได้ก่อนยืนยันการจอง", fr: "Oui. Indiquez simplement ce que vous apportez lors de la réservation. Nous confirmerons que le véhicule peut tout accueillir." },
  },
  {
    q: { en: "Which vehicle is right for my group?", ja: "どの車両が私のグループに合っていますか？", zh: "哪款車型適合我的團體？", ko: "저희 그룹에는 어떤 차량이 적합한가요?", "zh-cn": "哪款车型适合我的团体？", th: "ยานพาหนะคันไหนเหมาะสำหรับกลุ่มของฉัน?", fr: "Quel véhicule convient à mon groupe?" },
    a: { en: "4 or fewer passengers with standard luggage → Alphard. 5 or more passengers, oversized bags, or golf/ski equipment → Hiace. Unsure? Tell us your group size and luggage and we'll recommend.", ja: "標準的な荷物で4名以下 → アルファード。5名以上、大型荷物、ゴルフ・スキー機材あり → ハイエース。迷われている場合は、グループ人数と荷物をお知らせください。", zh: "4人以下且行李標準 → 埃爾法。5人以上、或有超大行李、高爾夫/滑雪器材 → 海獅。不確定？告訴我們人數和行李，我們為您推薦。", ko: "표준 짐의 4인 이하 → Alphard. 5인 이상, 대형 짐, 골프/스키 장비 → Hiace. 잘 모르시겠으면 인원수와 짐을 알려 주시면 추천해 드립니다.", "zh-cn": "4人以下且行李标准 → 埃尔法。5人以上、或有超大行李、高尔夫/滑雪器材 → 海狮。不确定？告诉我们人数和行李，我们为您推荐。", th: "4 ท่านหรือน้อยกว่าพร้อมสัมภาระมาตรฐาน → Alphard 5 ท่านขึ้นไป สัมภาระขนาดใหญ่ หรือกอล์ฟ/สกี → Hiace ไม่แน่ใจ? แจ้งขนาดกลุ่มและสัมภาระ เราจะแนะนำ", fr: "4 passagers ou moins avec bagages standard → Alphard. 5+ passagers, gros bagages ou équipement golf/ski → Hiace. Pas sûr? Donnez-nous vos informations et nous recommanderons." },
  },
  {
    q: { en: "Are both vehicles non-smoking?", ja: "両車両とも禁煙ですか？", zh: "兩款車型都禁煙嗎？", ko: "두 차량 모두 금연인가요?", "zh-cn": "两款车型都禁烟吗？", th: "ยานพาหนะทั้งสองคันห้ามสูบบุหรี่หรือไม่?", fr: "Les deux véhicules sont-ils non-fumeurs?" },
    a: { en: "Yes. Both vehicles are strictly non-smoking, including e-cigarettes.", ja: "はい。電子タバコを含め、両車両とも完全禁煙です。", zh: "是的。兩款車型均嚴格禁煙，包括電子煙。", ko: "네. 전자담배를 포함하여 두 차량 모두 완전 금연입니다.", "zh-cn": "是的。两款车型均严格禁烟，包括电子烟。", th: "ใช่ ยานพาหนะทั้งสองคันห้ามสูบบุหรี่อย่างเคร่งครัด รวมถึงบุหรี่ไฟฟ้า", fr: "Oui. Les deux véhicules sont strictement non-fumeurs, y compris les cigarettes électroniques." },
  },
];

/* ══════════════════════════════════════════════════════════════════════
   Sub-components
══════════════════════════════════════════════════════════════════════ */
function GoldRule() {
  return <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent mb-10 sm:mb-14" />;
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-6 h-px bg-[#c9a84c]" />
      <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] uppercase font-semibold">{label}</p>
    </div>
  );
}

function ImgPlaceholder({ note, ratio = "3/2" }: { note: string; ratio?: string }) {
  return (
    <div className={`relative bg-[#1a1a1a] border border-white/[0.07] flex flex-col items-center justify-center gap-3 overflow-hidden`}
      style={{ aspectRatio: ratio }}>
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#c9a84c]/40" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#c9a84c]/40" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#c9a84c]/40" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#c9a84c]/40" />
      <svg className="w-8 h-8 text-white/15" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
      </svg>
      <p className="text-white/20 text-[10px] tracking-widest uppercase text-center px-6 leading-relaxed">{note}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════════ */
export default function VehiclesPage() {
  const { lang } = useLang();
  const [showGolf, setShowGolf] = useState<Record<string, boolean>>({});

  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── HERO ── */}
      <div className="relative bg-[#0c0c0c] pt-[124px] sm:pt-[100px] pb-10 sm:pb-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Header />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] mb-2.5 uppercase">{HERO_BADGE[lang]}</p>
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.1em] leading-tight whitespace-pre-line">
            {HERO_H1[lang]}
          </h1>
          <p className="mt-2 text-white/35 text-[12px] tracking-[0.25em] uppercase">{HERO_SUB[lang]}</p>

          {/* Quick jump chips */}
          <div className="flex gap-3 mt-8 overflow-x-auto pb-1 scrollbar-hide">
            {VEHICLES.map((v) => (
              <a key={v.id} href={`#${v.id}`}
                className="shrink-0 text-[11px] tracking-[0.18em] uppercase text-white/45 border border-white/15
                           px-4 py-2 hover:text-[#c9a84c] hover:border-[#c9a84c]/40 transition-all">
                {v.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── VEHICLE CARDS ── */}
      <section className="bg-[var(--c-body)] py-14 sm:py-18 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <GoldRule />
          <SectionLabel label={lang === "ja" ? "車種一覧" : lang === "zh" ? "車型一覽" : "Quick Comparison"} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VEHICLES.map((v) => {
              const cfg = v.id === "alphard"
                ? { recPax: 4, recBag: 4, maxPax: 6, maxBag: 5, recGolf: 3, maxGolf: 4 }
                : { recPax: 7, recBag: 9, maxPax: 9, maxBag: 15, recGolf: 6, maxGolf: 9 };
              const isGolf = !!showGolf[v.id];
              return (
                <div key={v.id} className="flex flex-col border border-[var(--c-rule)] hover:border-[#c9a84c]/30 transition-colors duration-300 overflow-hidden">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />

                  {/* Top-view image — full width */}
                  <div className="w-full h-[180px] sm:h-[220px] flex items-center justify-center px-6 pt-6">
                    <ProtectedImage
                      src={`/${v.id}-top-${lang === "ja" ? "jp" : lang === "zh" ? "cn" : "en"}.png`}
                      alt="" width={400} height={220}
                      className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-screen"
                    />
                  </div>

                  {/* Name + badge */}
                  <div className="px-6 sm:px-8 pt-4 pb-3">
                    <p className="text-[var(--c-ink)] text-[17px] sm:text-[19px] font-light tracking-[0.08em]">{v.name}</p>
                    <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]/70 font-medium mt-0.5">{v.badge[lang]}</p>
                  </div>

                  {/* Dimensions */}
                  <div className="grid grid-cols-3 gap-px mx-6 sm:mx-8 mb-4 border border-[var(--c-rule)]">
                    {[
                      { k: lang === "ja" ? "全長" : lang === "zh" ? "全長" : "Length", val: v.dims.l },
                      { k: lang === "ja" ? "全幅" : lang === "zh" ? "全寬" : "Width",  val: v.dims.w },
                      { k: lang === "ja" ? "全高" : lang === "zh" ? "全高" : "Height", val: v.dims.h },
                    ].map((d, i) => (
                      <div key={d.k} className={`flex flex-col items-center py-2.5 ${i < 2 ? "border-r border-[var(--c-rule)]" : ""}`}>
                        <p className="text-[9px] tracking-[0.3em] uppercase text-[var(--c-ink-3)] mb-1">{d.k}</p>
                        <p className="text-[12px] font-semibold text-[var(--c-ink)] tracking-tight">{d.val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[var(--c-rule)] mx-6 sm:mx-8" />

                  {/* Capacity rows */}
                  <div className="px-6 sm:px-8 py-5 space-y-4">
                    {[
                      { label: lang === "ja" ? "推奨" : lang === "zh" ? "推薦" : "REC.", pax: cfg.recPax, bag: cfg.recBag, golf: cfg.recGolf, gold: true },
                      { label: lang === "ja" ? "最大" : lang === "zh" ? "最多" : "MAX", pax: cfg.maxPax, bag: cfg.maxBag, golf: cfg.maxGolf, gold: false },
                    ].map((row) => (
                      <div key={row.label} className="grid grid-cols-[4rem_1fr_1fr] items-center gap-4">
                        <span className={`text-[10px] tracking-[0.35em] uppercase font-semibold ${row.gold ? "text-[#c9a84c]" : "text-[var(--c-ink-3)]"}`}>
                          {row.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <ProtectedImage src="/icons/seat.png" alt="Pax" width={24} height={24} className={`invert dark:invert-0 ${row.gold ? "opacity-90 dark:opacity-70" : "opacity-40 dark:opacity-30"}`} />
                          <span className={`text-[22px] sm:text-[26px] font-semibold leading-none ${row.gold ? "text-[var(--c-ink)]" : "text-[var(--c-ink-3)]"}`}>{row.pax}</span>
                        </div>
                        <button
                          onClick={() => setShowGolf((p) => ({ ...p, [v.id]: !p[v.id] }))}
                          className="flex items-center gap-2 cursor-pointer select-none"
                        >
                          <div className="relative w-6 h-6">
                            <ProtectedImage src="/icons/suitcase.png" alt="" width={24} height={24}
                              className={`absolute inset-0 invert dark:invert-0 transition-opacity duration-300 ${row.gold ? "opacity-90 dark:opacity-70" : "opacity-40 dark:opacity-30"} ${isGolf ? "opacity-0!" : ""}`} />
                            <ProtectedImage src="/icons/golfbag.png" alt="" width={24} height={24}
                              className={`absolute inset-0 brightness-0 dark:invert transition-opacity duration-300 ${row.gold ? "opacity-90" : "opacity-40"} ${isGolf ? "" : "opacity-0!"}`} />
                          </div>
                          <span className={`text-[22px] sm:text-[26px] font-semibold leading-none transition-colors duration-300 ${row.gold ? "text-[var(--c-ink)]" : "text-[var(--c-ink-3)]"}`}>
                            {isGolf ? row.golf : row.bag}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VEHICLE SECTIONS ── */}
      {VEHICLES.map((v, idx) => {
        const isEven = idx % 2 === 0;
        const bg = isEven ? "bg-[var(--c-card)]" : "bg-[var(--c-body)]";

        return (
          <section key={v.id} id={v.id} className={`scroll-mt-24 ${bg} py-16 sm:py-22 px-4 sm:px-6`}>
            <div className="max-w-5xl mx-auto">
              <GoldRule />

              {/* Title row */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
                <div>
                  <h2 className="text-[var(--c-ink)] text-2xl sm:text-3xl lg:text-[2rem] font-light tracking-[0.08em]">
                    {v.name}
                  </h2>
                  <p className="mt-1 text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]/70 font-medium">{v.badge[lang]}</p>
                  <p className="mt-4 text-[var(--c-ink-2)] text-[15px] leading-[1.8] max-w-xl">{v.tagline[lang]}</p>
                </div>
                <Link href="/book" draggable={false} onContextMenu={(e) => e.preventDefault()}
                  className="group shrink-0 inline-flex items-center gap-2.5 bg-[#c9a84c] text-[#0c0c0c]
                             text-[12px] font-black tracking-[0.3em] px-8 py-3.5 hover:bg-white
                             transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.35)]
                             active:scale-110 sm:active:scale-100">
                  {BOOK_BTN[lang]}
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Main vehicle image */}
              <div className="overflow-hidden mb-12 flex items-center justify-center h-[200px] sm:h-[260px] px-8">
                <ProtectedImage src={v.img} alt={v.name} width={600} height={340}
                  className="object-contain object-bottom w-full h-full" />
              </div>

              {/* Best for */}
              <div className="flex flex-wrap gap-2 mb-12">
                {v.best_for.map((tag) => (
                  <span key={tag.en} className="text-[11px] tracking-[0.15em] px-3 py-1.5 border border-[#c9a84c]/30 text-[#c9a84c]/80 uppercase">
                    {tag[lang]}
                  </span>
                ))}
              </div>

              {/* Two image columns: Dimensions + Luggage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">

                {/* Vehicle Dimensions */}
                <div>
                  <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase font-semibold mb-4">
                    {lang === "ja" ? "車両寸法" : lang === "zh" ? "車輛尺寸" : "Vehicle Dimensions"}
                  </p>
                  <ImgPlaceholder
                    note={`Diagram: top/side/front view with dimensions labelled. L ${v.dims.l} × W ${v.dims.w} × H ${v.dims.h}`}
                    ratio="4/3"
                  />
                  {/* Dimension specs below image */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {[
                      { k: lang === "ja" ? "全長" : lang === "zh" ? "全長" : "Length", v: v.dims.l },
                      { k: lang === "ja" ? "全幅" : lang === "zh" ? "全寬" : "Width",  v: v.dims.w },
                      { k: lang === "ja" ? "全高" : lang === "zh" ? "全高" : "Height", v: v.dims.h },
                    ].map((d) => (
                      <div key={d.k} className="border border-[var(--c-rule)] p-3 text-center">
                        <p className="text-[10px] text-[var(--c-ink-3)] tracking-widest uppercase mb-1">{d.k}</p>
                        <p className="text-[13px] font-semibold text-[var(--c-ink)] tracking-tight">{d.v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Luggage Capacity */}
                <div>
                  <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase font-semibold mb-4">
                    {lang === "ja" ? "荷物積載例" : lang === "zh" ? "行李容量示例" : "Luggage Capacity Examples"}
                  </p>
                  <ImgPlaceholder
                    note={`Infographic: two configs side by side. Config A (${v.configs[0].label.en}): ${v.configs[0].bags.en}. Config B (${v.configs[1].label.en}): ${v.configs[1].bags.en}.`}
                    ratio="4/3"
                  />
                  {/* Config cards below image */}
                  <div className="flex flex-col gap-3 mt-4">
                    {v.configs.map((cfg) => (
                      <div key={cfg.label.en} className="border border-[var(--c-rule)] p-3">
                        <p className="text-[11px] text-[var(--c-ink-3)] tracking-[0.15em] uppercase mb-1">{cfg.label[lang]}</p>
                        <p className="text-[14px] font-bold text-[#c9a84c]">{cfg.bags[lang]}</p>
                        {cfg.note && <p className="text-[11px] text-[var(--c-ink-3)] mt-0.5">{cfg.note[lang]}</p>}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ── FAQ ── */}
      <section className="bg-[#0c0c0c] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <GoldRule />
          <SectionLabel label={lang === "ja" ? "よくある質問" : lang === "zh" ? "常見問題" : "FAQ"} />
          <div>
            {FAQS.map((faq, i) => (
              <details key={i} className="group border-b border-white/[0.07] py-5 cursor-pointer">
                <summary className="flex items-start justify-between gap-4 list-none select-none">
                  <span className="text-white/80 text-[14px] sm:text-[15px] leading-snug group-open:text-white transition-colors">
                    <span className="text-[#c9a84c]/50 text-[11px] tracking-widest mr-3 font-mono">{String(i + 1).padStart(2, "0")}</span>
                    {faq.q[lang]}
                  </span>
                  <svg className="w-4 h-4 shrink-0 text-white/30 mt-0.5 transition-transform duration-200 group-open:rotate-180"
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <p className="mt-4 text-white/50 text-[13px] sm:text-[14px] leading-[1.85] pl-9">{faq.a[lang]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#0a0a0a] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mb-10" />
          <h2 className="text-white text-xl sm:text-2xl font-light tracking-[0.1em] mb-8">
            {lang === "ja" ? "ご予約・お見積もり" : lang === "zh" ? "立即預訂" : "Ready to Book?"}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book" draggable={false} onContextMenu={(e) => e.preventDefault()}
              className="group inline-flex items-center gap-2.5 bg-[#c9a84c] text-[#0c0c0c]
                         text-[12px] font-black tracking-[0.3em] px-10 py-4 hover:bg-white
                         transition-all duration-200 shadow-[0_4px_20px_rgba(201,168,76,0.35)]
                         active:scale-110 sm:active:scale-100">
              {lang === "ja" ? "今すぐ予約" : lang === "zh" ? "立即預訂" : "Book Your Vehicle"}
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href="/services" className="text-white/35 text-[11px] tracking-[0.2em] uppercase hover:text-white/60 transition-colors">
              {lang === "ja" ? "サービス一覧へ" : lang === "zh" ? "查看所有服務" : "View All Services"}
            </Link>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent mt-10" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
