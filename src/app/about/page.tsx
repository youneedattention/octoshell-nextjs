"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/context/LangContext";
import type { Lang } from "@/lib/translations";
import React from "react";

/* 鈹€鈹€ Vehicle images 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */
const ALPHARD_IMG = "/alphard.webp";
const HIACE_IMG   = "/hiace.webp";

/* 鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲
   EXACT USER-PROVIDED COPY 鈥?strictly verbatim, three languages
鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲 */

/* 鈹€鈹€ Hero 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */
const HERO: Record<Lang, { badge: string; title: string; sub: string; link_story: string; link_faq: string; link_contact: string }> = {
  ja: { badge: "浼氱ぞ鎯呭牨", title: "Octoshell銇仱銇勩仸", sub: "鏃ユ湰銉椼儵銈ゃ儥銉笺儓銉併儯銈︺儠銈°兗銈点兗銉撱偣", link_story: "Octoshell銇仱銇勩仸", link_faq: "銈堛亸銇傘倠璩晱", link_contact: "銇婂晱銇勫悎銈忋仜" },
  en: { badge: "About Us", title: "The Octoshell Story", sub: "Japan Private Chauffeur Service",     link_story: "How It Works", link_faq: "FAQ",           link_contact: "Contact Us" },
  zh: { badge: "闂滄柤鎴戝€?, title: "鍝佺墝鏁呬簨",          sub: "鏃ユ湰灏堝爆鍙告鏈嶅嫏",                     link_story: "鍝佺墝鏁呬簨",    link_faq: "甯歌鍟忛",        link_contact: "鑱怠鎴戝€? },
};

/* 鈹€鈹€ Section 1: Brand story 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */
const STORY_TITLE: Record<Lang, string> = {
  ja: "绉诲嫊銇父璀樸倰澶夈亪銈?,
  en: "Changing the Travel Game",
  zh: "椤涜鍌崇当鍑鸿鐨勯亰鎴茶鍓?,
};
const STORY_P1: Record<Lang, string> = {
  ja: "璨濆叓鏂广伅鏃ユ湰銉绘澅浜仹瑾曠敓銇椼伨銇椼仧銆傞仩銇勫彜銈堛倞銆岃矟銆嶃伅灏娿亜瀵屻伄璞″敬銇с亗銈娿€併€屽叓鏂广€嶃伅鍥涢潰鍏柟銆併仚銇倧銇′笘鐣屼腑銇嬨倝闆嗐伨銈嬩汉銆呫倰鎰忓懗銇椼伨銇欍€傜銇熴仭銇€佷笘鐣屽叓鏂广亱銈夈亰瓒娿仐銇仾銈嬨仚銇广仸銇亰瀹㈡銈掋€併亱銇戙亴銇堛伄銇亜銆屽疂銆嶃仺銇椼仸銇婅繋銇堛仚銈嬨仺銇勩亞淇″康銇倐銇ㄣ€併儣銉儠銈с儍銈枫儳銉娿儷銇儚銈ゃ儰銉笺偟銉笺儞銈广倰灞曢枊銇椼仸銇勩伨銇欍€?,
  en: 'Octoshell was founded in Tokyo, Japan. In ancient times, "shells" were a symbol of precious wealth, while "octo" represents the eight directions of the world. Our brand philosophy is rooted in welcoming every guest arriving from all corners of the globe as our most precious treasure.',
  zh: "璨濆叓鏂规柤鏃ユ湰鏉变含鍓电珛銆傚湪閬犲彜鏅備唬锛屻€岃矟銆嶆槸鐝嶇█璨″瘜鐨勮薄寰碉紱鑰屻€屽叓鏂广€嶅墖浠ｈ〃鍥涢潰鍏柟锛屽瘬鎰忔簮鑷笘鐣屽悇鍦扮殑璩撳銆傛垜鍊戠殑鍝佺墝鍒濊》锛屼究鏄皣渚嗚嚜涓栫晫鍏柟鐨勬瘡涓€浣嶅鎴讹紝閮藉鐐烘垜鍊戠劇鍙浛浠ｇ殑鑷冲锛屼甫鎻愪緵鏈€闋傜礆鐨勫皥杌婃寰呫€?,
};
const STORY_P2: Record<Lang, string> = {
  ja: "绉併仧銇°伄鏃呫伅銆佹鍙层亗銈嬭胺闁撱伀銇层仯銇濄倞銇ㄤ絿銈€鍚嶉杸銇珮绱氭俯娉夋梾椁ㄣ€屼慨鍠勫闆倢瀹?楝笺伄鏍栥€嶃伕鍚戙亱銇嗘牸寮忛珮銇勬梾瀹伄銇熴倎銇€侀潤瀵傘伀婧€銇°仧妤典笂銇Щ鍕曠┖闁撱倰浠曠珛銇︺倠銇ㄣ亜銇嗐€併伈銇ㄣ仱銇繁銇勩亾銇犮倧銈娿亱銈夊銇俱倞銇俱仐銇熴€傜湡銇磪娌仺銇洰鐨勫湴銇埌鐫€銇椼仧鐬枔銇с伅銇亸銆併仢銇珮槌淬倠鑳搞倰鍖呫伩杈笺個绉诲嫊銇埞閭ｃ伀銇撱仢瀛樺湪銇欍倠銇撱仺銇皸銇ャ亜銇熴伄銇с仚銆備粖鏃ャ€佺銇熴仭銇棩鏈浗鍐呫伄鐙珛銇椼仧绶戙儕銉炽儛銉笺伄鍚堣鏃呭閬嬮€佽硣鏍笺倰鎸併仱銆佸浗闅涚殑銇儣銉儠銈с儍銈枫儳銉娿儷杌婇殜銉荤Щ鍕曘偟銉笺儞銈广儣銉┿儍銉堛儠銈┿兗銉犮伕銇ㄥ璨屻倰閬傘亽銇俱仐銇熴€傘仢銇儘銉冦儓銉兗銈伅澶ф澅浜湉鍐呫伀銇ㄣ仼銇俱倝銇氥€佹棩鏈叏鍥姐伄銇傘倝銈嗐倠鍫存墍銇簝銇屻仯銇︺亜銇俱仚銆傝粖鍐呫伄鍦у€掔殑銇瀵嗘€с仹銇婂妲樸倰绻伄銈堛亞銇劒銇椼亸鍖呫伩杈笺伩銆併仚銇广仸銇梾璺倰鏃呴え銇洟銈屻仢銇倐銇伄寤堕暦绶氫笂銇亗銈嬨€佽嚦楂樸伄銉椼儹銉兗銈般伕銇ㄦ槆鑿仌銇涖伨銇欍€?,
  en: "Our journey began with a singular, intimate obsession: crafting a seamless, whispering transition for elite travelers journeying to Shuzenji Hanare Yado Oni no Sumika鈥攁 legendary hot-spring sanctuary hidden deep within Japan's historic valleys. We realized that true luxury does not begin at the destination, but in the fleeting, breathless moments in between. Today, Octoshell has evolved into a global mobility platform operating with fully independent Japanese licensed transportation and green-plate compliance. Extending far beyond the Greater Tokyo Area to every corner of Japan, we transform every journey into an exquisite extension of the estate itself鈥攃ocooning them in privacy, elevating the art of movement into an unforgettable prelude of indulgence.",
  zh: "瑾曠敓涔嬪垵锛岄€欐簮鏂间竴鍊嬫サ鑷寸窗鑶╃殑绉佷汉鍩峰康锛氱偤鍓嶅線闅卞尶鏂兼棩鏈鍙插北璋蜂腑鐨勫偝濂囨韩娉夎仏鍦扳€斺€斻€屼慨鍠勫闆㈠ 楝兼２銆嶇殑闋傜礆璨磋硴锛屾墦閫犱竴娈垫鐒＄斧闅欍€佸鍛㈠杻鑸潨璎愮殑绉诲嫊閬庢浮銆傛垜鍊戞繁鐭ワ紝鐪熸鐨勫ア鑿甫闈炲鏂兼姷閬旂洰鐨勫湴鐨勯偅涓€鍒伙紝鑰屾槸鍦ㄩ偅娈靛睆鎭湡寰呯殑琛岃粖鏅傚厜涓€備粖澶╋紝鎴戝€戝凡鐒惰浕璁婄偤涓€瀹舵搧鏈夌崹绔嬫棩鏈稜鐗屽悎瑕忓閬嬭硣璩殑鍦嬮殯鍖栧皥妤粖闅婅垏鍑鸿鏈嶅嫏骞冲彴銆傛垜鍊戠殑鍦橀殜鑸囧皥妤徃姗熺恫绲′笉鍍呰钃嬪ぇ鏉变含鍦板崁锛屾洿宸茶Ц鍙婃棩鏈殑姣忓€嬭钀姐€傛垜鍊戝皣姣忎竴娆℃梾绋嬮兘杞夊寲鐐鸿帄鍦掓湰韬殑鍎泤寤朵几锛屽皣璩撳婧煍鍦板寘瑁瑰湪绲曞皪鐨勭瀵嗙┖闁撲腑锛屽皣绉诲嫊鐨勮棟琛撴槆鑿偤涓€鍫翠护浜洪洠蹇樼殑濂㈣彲搴忔洸銆?,
};

/* 鈹€鈹€ Section 2: 4 core services 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */
const SVC_SECTION_TITLE: Record<Lang, string> = {
  ja: "銈裤偆銉犮儥銉笺偣銇ч伕銇广倠绉诲嫊銉椼儵銉?,
  en: "Time-Based & Scenario-Driven Mobility Solutions",
  zh: "鎸夋檪娈佃垏鍫存櫙瀹氬埗鐨勫嚭琛屾柟妗?,
};
const SVC_SECTION_LEAD: Record<Lang, string> = {
  ja: "Octoshell 銇€併€屾檪闁撴灎銉诲埄鐢ㄧ洰鐨勫垾銆嶃伄4澶с偒銉嗐偞銉兗銇с€佹棩鏈叏鍥姐伄涓€娴併伄绉诲嫊浣撻〒銈掓彁渚涖仐銇俱仚銆?,
  en: "Octoshell structures its premium transport services into four clear categories based on duration and usage, ensuring frictionless booking and travel planning worldwide.",
  zh: "Octoshell 渚濇摎銆屾檪闁撻€辨湡鑸囦娇鐢ㄥぇ椤炪€嶅皣楂樼閬嬪姏鏁村悎鐐哄洓澶х祼妲嬪寲鏈嶅嫏锛屼究鏂兼櫤鑳界郴绲辫垏鎼滃皨寮曟搸绮炬簴鎶撳彇锛岀偤鎮ㄦ彁渚涚劇绺殑鏃ユ湰鍏ㄥ鍑鸿妾㈢储锛?,
};
type Service = { title: string; body: string };
const SERVICES: Record<Lang, Service[]> = {
  ja: [
    { title: "绌烘腐瀹氶閫佽繋",           body: "鏉变含甯傚唴銇嬨倝鍚勭┖娓紙缇界敯銉绘垚鐢帮級銇搞伄閫佽繋銈掑畨蹇冦伄瀹氶閬嬭硟銇с仈鍒╃敤銇勩仧銇犮亼銇俱仚銆傘儶銈儷銈裤偆銉犮伄銉曘儵銈ゃ儓杩借贰銆?鏅傞枔鐒℃枡寰呮銆佸埌鐫€銉儞銉笺仹銇寵鐗屻亰鍑鸿繋銇堛偟銉笺儞銈广倰鍚伩銆佹棩鏈埌鐫€鏅傘伄涓嶅畨銈掕В娑堛仐銇俱仚銆? },
    { title: "閮藉競闁撱儣銉┿偆銉欍兗銉堛偡銉ｃ儓銉?, body: "绉佸瘑鎬с伄楂樸亜闀疯窛闆伄鐐瑰鐐圭Щ鍕曘€傛柊骞圭窔銈勫浗鍐呯窔銇埅绌轰究銇唬銈忋倠銆併儞銈搞儘銈广偍銉兗銉堛倓銉椼儸銉熴偄銉犺嚜鐢辨梾琛屽銇仧銈併伄瀹屽叏銉椼儵銈ゃ儥銉笺儓绌洪枔銇с仚銆傚ぇ鏉变含鍦忋亱銈夋棩鏈悇鍦般伕銇Τ鍏夊埄鐢ㄣ倓銇娿倐銇︺仾銇椼伀鏈€閬┿仹銇欍€? },
    { title: "鏅傞枔鍒惰哺鍒囥儚銈ゃ儰銉?& VIP閫佽繋", body: "閬搞伋銇亱銈屻仧瀹濄伄銉堛儍銉椼儔銉┿偆銉愩兗銇屻偄銉嗐兂銉夈亜銇熴仐銇俱仚銆傝鏁般偣銉濄儍銉堛倰宸°倠銉撱偢銉嶃偣瑷晱銆侀珮绱氥偡銉с儍銉斻兂銈般€乂IP銇亰瀹㈡銇€佽繋銇仼銆佹檪闁撳崢浣嶃仹閬嬭虎鎵嬨亴绲傛棩寰呮銇椼€佸畨蹇冦伄鍝佽唱銇с亰杩庛亪銇勩仧銇椼伨銇欍€? },
    { title: "銉椼儹涔楀嫏鍝℃淳閬?,          body: "銇婂妲樸亴淇濇湁銇欍倠杌婁浮銇亱杌兓绠＄悊銈掋儣銉伄銉夈儵銈ゃ儛銉笺亴浠ｈ銇勩仧銇椼伨銇欍€傝粖涓＄鐞嗐伄璨犳媴銈掕唤娓涖仐銆佹渶楂樺嘲銇畨鍏ㄩ亱琛屻倰銇婄磩鏉熴仐銇俱仚銆? },
  ],
  en: [
    { title: "Fixed-Rate Airport Transfers",  body: "Seamless, flat-rate airport transfers between Tokyo downtown and airports (Haneda/Narita). Features include real-time flight tracking, 1 hour of free waiting time, and a personalized meet-and-greet service at Arrivals for a worry-free landing." },
    { title: "City-to-City Long-Distance",    body: "Private, long-distance point-to-point journeys designed for sightseeing or business hospitality. This premium service directly replaces regional flights or Shinkansen trains, offering absolute privacy for business elite and discerning leisure travelers from Greater Tokyo to any destination in Japan." },
    { title: "Hourly Bookings & VIP Attend",  body: "Attended by our handpicked, elite top drivers. Ideal for multi-stop corporate meetings, luxury shopping, or high-profile VIP transport. A dedicated chauffeur remains on standby for your dynamic itinerary." },
    { title: "Professional Driver Dispatch",  body: "Expert dispatch services where our professional drivers manage and operate your own vehicles, delivering unparalleled safety, compliance, and peace of mind." },
  ],
  zh: [
    { title: "姗熷牬瀹氶鎺ラ€?,         body: "鎻愪緵鏉变含甯傚収寰€杩斿悇澶ф鍫达紙缇界敯/鎴愮敯锛夌殑鍥哄畾璨荤巼鎺ラ€佹湇鍕欍€傚寘鍚嵆鏅傝埅鐝嫊鎱嬭拷韫ゃ€?灏忔檪鍏嶈不绛夊緟浠ュ強鎺ユ澶у怀灏堝爆鑸夌墝杩庤硴锛岃В闄ゆ偍鎶垫棩棣栫珯鐨勪竴鍒囩劍鎱€? },
    { title: "鍩庨殯瀹氬埗绌挎鑸囪鍏?,   body: "绉佸瘑銆侀暦閫旂殑楂樼榛炲皪榛炶绋嬶紝灏堢偤鍟嗗嫏娆惧緟鎴栨繁搴﹀害鍋囪ō瑷堛€傚畬缇庢浛浠ｆ棩鏈柊骞圭窔鎴栧崁鍩熷収鑸┖锛屽皥鐐烘サ閲嶉毐绉佺殑鍟嗗嫏绮捐嫳鑸囬珮绔嚜鐢辫璩撳鎵撻€狅紝鐢卞ぇ鏉变含鍦板崁鍑虹櫦锛岀洿閬旀棩鏈鍏т换浣曠洰鐨勫湴銆? },
    { title: "鏅傛鍖呰粖鑸?VIP 灏婃Ξ杩庨€?, body: "鐢辨垜鍊戠櫨瑁℃寫涓€鐨勯爞灏栧劒绉€鍙告鍏ㄧ▼鐐烘偍鎻愪緵灏堝爆渚嶅緸鏈嶅嫏銆傚畬缇庨仼閰嶅绔欓粸鍟嗗嫏鎷滆í銆侀珮绔臣鐗┿€佸ア鑿斂瑕佹帴寰呮垨閲嶅ぇ娲诲嫊锛屽徃姗熷叏绋嬪湪鍫村緟鍛姐€? },
    { title: "灏堟キ涔樺嫏鍝℃淳閬?,       body: "娲鹃仯灏堟キ鍙告鐐哄鎴剁殑鑷湁杌婅紱閫茶椐曢鑸囪硣鐢㈢鐞嗐€傛湁鏁堥檷浣庝紒妤鐞嗘垚鏈紝纰轰繚鍑鸿閬斿埌鏈€楂樼礆鍒ョ殑瀹夊叏鑸囧悎瑕忔婧栥€? },
  ],
};

/* 鈹€鈹€ Section 3: Vehicles 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */
const VEH_SECTION_BADGE: Record<Lang, string> = {
  ja: "杌婄ó銈儵銈?, en: "Vehicle Classes", zh: "杌婇殜绱氬垾",
};
type Vehicle = { name: string; body: string };
const VEHICLES: Record<Lang, Vehicle[]> = {
  ja: [
    { name: "銉撱偢銉嶃偣銉汇儣銉儫銈儬 鈥?銉堛儴銈?銈儷銉曘偂銉笺儔", body: "Octoshell 銇刀瀵剧殑銈ㄣ兗銈广€傛渶涓婄礆銇揩閬╂€с倰瑾囥倞銆佸鏃忔梾琛屻€佸ぇ鑽风墿銇梾琛屽銆併伨銇熴伅 VIP 鎺ュ緟銇渶閬┿仹銇欍€? },
    { name: "銈般儵銉炽儔銉汇偘銉兗銉?鈥?銉堛儴銈?銉忋偆銈ㄣ兗銈?,    body: "澶т汉鏁般伄銈般儷銉笺儣銆併儊銉笺儬銉撱偢銉嶃偣銆併伨銇熴伅銇曘倝銇銇忋伄鑽风墿銈掍即銇嗙Щ鍕曘伀銆佸簝銆呫仺銇椼仧娓呮綌銇ф礂绶淬仌銈屻仧绌洪枔銈掓彁渚涖仐銇俱仚銆? },
  ],
  en: [
    { name: "Business Van 鈥?Toyota Alphard", body: "The crown jewel of Octoshell. Offers executive luxury and supreme comfort, perfect for families, international travelers with luggage, or VIP guests." },
    { name: "Group Luxury 鈥?Toyota Hiace",   body: "Engineered for larger groups, corporate teams, or heavy luggage, maintaining a pristine, spacious environment for long-distance travel." },
  ],
  zh: [
    { name: "鍟嗗嫏灏婁韩寤傚瀷杌?鈥?璞愮敯鍩冪埦娉?, body: "Octoshell 鐨勪富鍔涚帇鐗岃粖鍨嬨€傚叿鍌欓爞绱氱殑鑸掗仼搴﹁垏濂㈣彲搴ц墮锛屾サ鍏堕仼鍚堝搴害鍋囥€佹敎甯跺ぇ浠惰鏉庣殑鍦嬮殯鏃呭鎴?VIP 璨磋硴鎺ュ緟銆? },
    { name: "璞彲澶у閲忓杌?鈥?璞愮敯娴风崊",   body: "灏堢偤澶氫汉鍦橀珨銆佸晢鍕欏湗闅婃垨瓒呭ぇ琛屾潕杓夐亱瑷▓锛屽绲備繚鎸佷竴濉典笉鏌撶殑楂樻绌洪枔鑸囪垝閬╅珨椹椼€? },
  ],
};

/* 鈹€鈹€ FAQ 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */
type FaqItem  = { q: string; a: string };
type FaqGroup = { group: string; items: FaqItem[] };
const FAQ: Record<Lang, FaqGroup[]> = {
  ja: [
    {
      group: "馃殫 杌婁浮銉昏粖鍐呰鍓囥伀銇ゃ亜銇?,
      items: [
        {
          q: "銇┿伄銈堛亞銇粖銇岄厤杌娿仌銈屻伨銇欍亱銆?,
          a: "寮婄ぞ銇с伅銆佹渶楂樼礆銉熴儖銉愩兂銇€屻儓銉ㄣ偪銉汇偄銉儠銈°兗銉夛紙鏈€澶?鍚嶆锛夈€嶃亰銈堛伋澶у瀷銉撱偢銉嶃偣銉愩兂銇€屻儓銉ㄣ偪銉汇儚銈ゃ偍銉笺偣锛堟渶澶?鍚嶆锛夈€嶃伄2杌婄ó銈掑皞闁€銇墜閰嶃仐銇︺亰銈娿伨銇欍€傘偦銉€銉炽偪銈ゃ儣绛夈伄閰嶈粖銇仈銇栥亜銇俱仜銈撱€?,
        },
        {
          q: "杌婂唴銇с伄鍠厵銈勯２椋熴伅銇с亶銇俱仚銇嬨€?,
          a: "鍏ㄨ粖涓″畬鍏ㄧ鐓欙紙闆诲瓙銈裤儛銈冲惈銈€锛夈仺銇曘仜銇︺亜銇熴仩銇勩仸銇娿倞銇俱仚銆傘亰椋熶簨銇枹銇椼仸銇€佽嚟銇勩伄娈嬨倝銇亜杌介銈勩儦銉冦儓銉溿儓銉瓑銇搵浠樸亶銇２鏂欙紙銉熴儘銉┿儷銈︺偐銉笺偪銉肩瓑锛夈伀闄愩倞銆佽粖鍐呫仹銇婂彫銇椾笂銇屻倞銇勩仧銇犮亼銇俱仚銆?,
        },
        {
          q: "銉氥儍銉堝悓浼淬仹銇埄鐢ㄣ伅銇с亶銇俱仚銇嬨€?,
          a: "銇亜銆佸彲鑳姐仹銇欍€傘儦銉冦儓銇ㄥ悓涔椼仌銈屻倠闅涖伅銆佸繀銇氫簣銈併偙銉笺偢锛堛偗銉兗銉堬級銇叆銈屻仸銇勩仧銇犮亶銇俱仚銈堛亞銇婇銇勭敵銇椾笂銇掋伨銇欍€傘偙銉笺偢銈掋亰鎸併仭銇с仾銇勫牬鍚堛€併仈涔楄粖銈掋亰鏂倞銇欍倠鍫村悎銇屻仈銇栥亜銇俱仚銆?,
        },
        {
          q: "鑽风墿銇伩銈掑厛琛屻仐銇﹂亱銈撱仹銈傘倝銇嗐亾銇ㄣ伅銇с亶銇俱仚銇嬨€?,
          a: "銇亜銆佸彲鑳姐仹銇欍€傚紛绀俱仹銇珮銉偞銉儠銉勩偄銉笺倓銉堛儸銉冦偔銉炽偘锛堢櫥灞憋級銉勩偄銉笺倰鏁板銇忔壙銇ｃ仸銇娿倞銇俱仚銆傘亰瀹㈡銈掋伨銇氥偞銉儠鍫淬倓鐧诲北鍙ｃ伀銇婇€併倞銇椼仧寰屻€併亰鑽风墿锛堛偞銉儠銉愩儍銈般倓澶у瀷銉愩儍銈儜銉冦偗绛夛級銇伩銈掋仢銇伨銇捐粖涓°仹銇婇爯銇嬨倞銇椼€佸厛鍥炪倞銇с仈瀹挎硦鍏堛伄銉涖儐銉伕閬嬫惉銉绘惉鍏ャ仚銈嬨亾銇ㄣ亴鍙兘銇с仚銆傘仧銇犮仐銆佸畬鍏ㄣ仾鐒′汉銇波鐗╄几閫併伅娉曞緥涓娿亰鍙椼亼銇с亶銇俱仜銈撱伄銇с€佸師鍓囥仺銇椼仸銉勩偄銉笺仈濂戠磩鑰呮銇亰鑽风墿銇檺銈夈仜銇︺亜銇熴仩銇嶃伨銇欍€?,
        },
        {
          q: "涔楀嫏鍝°伅銈广兗銉勩兓銉嶃偗銈裤偆濮裤仹瀵惧繙銇椼仸銈傘倝銇堛伨銇欍亱锛?,
          a: "銇亜銆佸紛绀俱伄涔楀嫏鍝°伅甯搞伀銈广兗銉勩仺銉嶃偗銈裤偆銈掔潃鐢ㄣ仐銆佹渶楂樻按婧栥伄銉曘偐銉笺優銉仾韬仩銇椼仾銇裤仹銉忋偆銉ゃ兗銇倝銇с伅銇礂绶淬仌銈屻仧銇婅繋銇堛倰銇勩仧銇椼伨銇欍€?,
        },
        {
          q: "涔楀嫏鍝°伅銇婂妲樸伄銉椼儵銈ゃ儛銈枫兗銇ㄦ瀵嗐倰瀹堛仯銇︺亸銈屻伨銇欍亱锛?,
          a: "銇亜銆併亰瀹㈡銇儣銉┿偆銉愩偡銉笺仺姗熷瘑淇濇寔銇渶鍎厛浜嬮爡銇с仚銆備箺鍕欏摗銇幊鏍笺仾瀹堢缇╁嫏銈掗伒瀹堛仐銇︺亰銈娿€佽粖鍐呫仹銇仈浼氳┍銈勬儏鍫便亴澶栭儴銇紡銈屻倠銇撱仺銇竴鍒囥仈銇栥亜銇俱仜銈撱€傚畨蹇冦仐銇︺仈鍒╃敤銇忋仩銇曘亜銆?,
        },
        {
          q: "杌婂唴銇с偣銉炪兗銉堛儠銈┿兂銇厖闆汇伅銇с亶銇俱仚銇嬶紵",
          a: "銇亜銆佸彲鑳姐仹銇欍€傝粖涓°伀銇厖闆荤敤銉濄兗銉堛亴瑁呭倷銇曘倢銇︺亰銈娿€併偄銈ゃ儠銈┿兂銇娿倛銇炽偄銉炽儔銉偆銉夌鏈伀瀵惧繙銇椼仧鍏呴浕銈便兗銉栥儷銈掔劇鏂欍仹銇旂敤鎰忋仐銇︺亰銈娿伨銇欍€?,
        },
      ],
    },
    {
      group: "馃挻 鏂欓噾銉汇亰鏀墪銇勩伀銇ゃ亜銇?,
      items: [
        {
          q: "寰呮鏂欓噾锛堥琛屾銇亝寤剁瓑锛夈伅鐧虹敓銇椼伨銇欍亱銆?,
          a: "鎷呭綋涔楀嫏鍝°亴銇婂妲樸伄鑸┖渚裤伄閬嬭埅鐘舵硜銈掕拷璺°仐銆佸疅闅涖伄鐫€闄告檪闁撱伀鍚堛倧銇涖仸銇婅繋銇堟檪闁撱倰瑾挎暣銇勩仧銇椼伨銇欍€傚疅闅涖伄鐫€闄告檪鍒汇亱銈?0鍒嗐倰瓒呴亷銇椼仸寰呮銇岀櫤鐢熴仐銇熷牬鍚堛€佷互涓嬨伄閫氥倞30鍒嗘瘞銇秴閬庡緟姗熸枡閲戙亴鐧虹敓銇勩仧銇椼伨銇欙紙30鍒嗘湭婧€銇?0鍒嗐伀鍒囥倞涓娿亽锛夈€俓n銈儷銉曘偂銉笺儔锛?30鍒嗘瘞銇?2,500鍐嗭紙绋庤炯锛塡n銉忋偆銈ㄣ兗銈癸細 30鍒嗘瘞銇?3,000鍐嗭紙绋庤炯锛?,
        },
        {
          q: "涓囥亴涓€銆侀亱琛屼腑銇儷銉笺儓銇鏇淬倓鍒╃敤鏅傞枔銇欢闀枫亴蹇呰銇仾銇ｃ仧鍫村悎銇仼銇嗐仚銈屻伆銈堛亜銇с仚銇嬶紵",
          a: "閫熴倓銇嬨伀涔楀嫏鍝°伀銇婄敵銇椾粯銇戙亸銇犮仌銇勩€備箺鍕欏摗銇屻仚銇愩伀閰嶈粖銈汇兂銈裤兗銇ㄩ€ｇ怠銈掑彇銈娿€佽拷鍔犳枡閲戙倰纰鸿獚銇勩仧銇椼伨銇欍€傜獊鐧虹殑銇儷銉笺儓澶夋洿銈勬檪闁撳欢闀枫伀銈堛仯銇︽柊銇熴伀鐧虹敓銇椼仧楂橀€熼亾璺枡閲戙€佹湁鏂欓亾璺枡閲戙€佸洖閫侀€氳鏂欍€侀杌婂牬鏂欓噾銆佷箺鍕欏摗瀹挎硦璨汇€併亰銈堛伋鏅傞枔寤堕暦鍓插鏂欓噾銇渶绲傛焙娓堟檪銇悎绠椼仌銈屻伨銇欍€傚紛绀俱伄銉忋偆銉ゃ兗銈点兗銉撱偣銇畬鍏ㄤ簣绱勫埗銇ч亱琛屻仐銇︺亜銈嬨仧銈併€佸綋鏃ャ伄浜堢磩鐘舵硜銇倛銇ｃ仸銇獊鐧虹殑銇鏇淬倓寤堕暦銇仈瑕佹湜銇亰蹇溿亪銇с亶銇亜鍫村悎銈傘仈銇栥亜銇俱仚銇仹銆佷簣銈併仈浜嗘壙銇忋仩銇曘亜銆?,
        },
        {
          q: "楂橀€熼亾璺枡閲戙€佹湁鏂欓亾璺枡閲戙€侀杌婂牬鏂欓噾銆佷箺鍕欏摗瀹挎硦璨汇仾銇┿伅鍒ユ枡閲戙仹銇欍亱锛?,
          a: "銇勩亜銇堛€佸紛绀俱伄鎻愮ず銇欍倠褰撳垵銇亰瑕嬬銈婇噾椤嶃伅銇欍伖銇﹁炯銇裤伄绶忛鏂欓噾锛堝寘骞蹭尽鏍硷級銇с仚銆傘亗銈夈亱銇樸倎銇旀彁鍑恒亜銇熴仩銇勩仧琛岀▼銈掗亱琛屻仚銈嬨仧銈併伀蹇呰銇珮閫熼亾璺枡閲戙€佹湁鏂欓亾璺枡閲戙€佸洖閫侀€氳鏂欍€侀杌婂牬鏂欓噾銆併亰銈堛伋涔楀嫏鍝°伄瀹挎硦璨荤敤锛堥仩鏂广兓娉娿伨銈娿亴銇戙伄鍫村悎锛夈伅銇欍伖銇﹀熀鏈枡閲戙伀鍚伨銈屻仸銇娿倞銇俱仚銆傞亱琛岄枊濮嬪緦銇€ャ仾銉兗銉堝鏇淬伄銇旇鏈涖亴銇亜闄愩倞銆佽拷鍔犺不鐢ㄣ伅涓€鍒囩櫤鐢熴亜銇熴仐銇俱仜銈撱€?,
        },
        {
          q: "銉併儯銈ゃ儷銉夈偡銉笺儓銈勭┖娓儫銉笺儓銈儍銉楋紙銉嶃兗銉犮儨銉笺儔锛夈伅鏈夋枡銇с仚銇嬨€?,
          a: "銇勩亜銇堛€併仚銇广仸鐒℃枡锛?鍐嗭級銇с仈鎻愪緵銇椼仸銇娿倞銇俱仚銆傘儊銉ｃ偆銉儔銈枫兗銉堬紙銈搞儱銉嬨偄銈枫兗銉堬級銇墜閰嶃€併亰銈堛伋绌烘腐鍒扮潃銉儞銉笺仹銇儘銉笺儬銉溿兗銉夋幉绀猴紙銉熴兗銉堬紗銈般儶銉笺儓锛夈倰銇斿笇鏈涖伄闅涖伅銆佽粖涓℃墜閰嶃伄閮藉悎涓娿€併亰鏃┿倎銇偑銉氥儸銉笺偪銉笺伨銇с亰鐢炽仐鍑恒亸銇犮仌銇勩€?,
        },
        {
          q: "鏀墪鎵嬫銇綍銇с仚銇嬶紵杌婂唴銇с儔銉┿偆銉愩兗銇洿鎺ユ敮鎵曘亞銇撱仺銇仹銇嶃伨銇欍亱锛?,
          a: "杌婂唴銇с伄鐝鹃噾姹烘笀銇蹇溿仐銇︺亜銈嬨伝銇嬨€侀亱琛屽墠銇偗銉偢銉冦儓銈兗銉夈倰銇旂櫥閷层亜銇熴仩銇戙倢銇般€侀亱琛岀祩浜嗗緦銇紛绀俱伄銈兂銉┿偆銉虫焙娓堛偡銈广儐銉狅紙銈广儓銉┿偆銉楋級銈掗€氥仒銇﹁嚜鍕曠殑銇焙娓堛倰瀹屼簡銇曘仜銈嬨亾銇ㄣ倐鍙兘銇с仚銆傘偗銉偢銉冦儓銈兗銉夈倰銇婃寔銇°仹銇亜娉曚汉銇亰瀹㈡銇€佷簨鍓嶃伄閵€琛屾尟杈笺倰銇婄敵銇楀嚭銇忋仩銇曘亜銆?,
        },
        {
          q: "闋樺弾鏇搞伅鐧鸿銇曘倢銇俱仚銇嬨€?,
          a: "銇亜銆併偗銉偢銉冦儓銈兗銉夋焙娓堛伄銇婂妲樸伀銇€併偟銉笺儞銈瑰埄鐢ㄧ祩浜嗗緦銆佹焙娓堛偡銈广儐銉犮倛銈娿仈鐧婚尣銇儭銉笺儷銈儔銉偣瀹涖仸銇搁浕瀛愰牁鍙庢浉锛堥浕瀛愬獟浣撱伄鏇搁潰锛夈倰鑷嫊閫佷粯銇勩仧銇椼伨銇欍€傜従閲戞焙娓堛伄銇婂妲樸伀銇€併仈甯屾湜銇繙銇樸仸闆诲瓙濯掍綋銇牁鍙庢浉銇俱仧銇珛姹傛浉銈掔櫤琛屻亜銇熴仐銇俱仚銆?,
        },
      ],
    },
    {
      group: "鉂?銈儯銉炽偦銉儩銉偡銉?,
      items: [
        {
          q: "鍙栨秷鏂欙紙銈儯銉炽偦銉枡锛夈伅銇勩仱銇嬨倝鐧虹敓銇椼伨銇欍亱銆?,
          a: "銇斾簣绱勭⒑瀹氬緦銇偔銉ｃ兂銈汇儷銇仱銇嶃伨銇椼仸銇€佺壒瀹氬晢鍙栧紩娉曘伀鍩恒仴銇忚〃瑷樸伀鍓囥倞銆佷互涓嬨伄閫氥倞銈儯銉炽偦銉枡銈掔敵銇楀彈銇戙伨銇欍€俓n閰嶈粖鏃ャ伄48鏅傞枔鍓嶃伨銇э細 鐒℃枡锛堝叏椤嶈繑閲戯級\n閰嶈粖鏃ャ伄24鏅傞枔鍓嶃€?8鏅傞枔鍓嶃伨銇э細 銇婅绌嶃倞閲戦銇?50%\n閰嶈粖鏃ャ伄24鏅傞枔浠ュ唴銆併伨銇熴伅鐒℃柇銈儯銉炽偦銉細 銇婅绌嶃倞閲戦銇?100%\n鈥昏埅绌轰究銇瑺鑸仾銇╀笉鍙姉鍔涖伀銈堛倠鍫村悎銇€侀€熴倓銇嬨伀銇婄煡銈夈仜銇勩仧銇犮亸銇撱仺銇с偔銉ｃ兂銈汇儷鏂欍伅鍏嶉櫎銇ㄣ仾銈娿伨銇欍€?,
        },
      ],
    },
  ],
  en: [
    {
      group: "馃殫 Vehicles & In-Car Rules",
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
      group: "馃挻 Rates & Payments",
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
      group: "鉂?Cancellation Policy",
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
      group: "馃殫 杌婅紱鍙婅粖鍏у畧鍓?,
      items: [
        {
          q: "闋愯▊寰屾渻娲剧櫦浠€楹兼ǎ鐨勮粖杓涳紵",
          a: "鏈叕鍙稿皥娉ㄦ柤楂樼绂硴鍖呰粖鏈嶅嫏锛屾棗涓嬭粖闅婂儏鐢辫豹鑿晢鍕欒粖 銆岃睈鐢板焹鐖炬硶锛堟渶澶ц級瀹?浜猴級銆?鍙婂ぇ瀹归噺鍟嗘梾杌?銆岃睈鐢版捣鐛咃紙鏈€澶ц級瀹?浜猴級銆?绲勬垚銆傛垜鍊戜笉鎻愪緵鏅€氳綆杌婅粖鍨嬨€?,
        },
        {
          q: "杌婂収鍙互鍚哥厵鎴栭２椋熷棊锛?,
          a: "灏堝爆杌婂粋鍏у叏闈㈢鐓欙紙鍖呮嫭闆诲瓙鐓欙級銆傜偤浜嗕繚璀変箻杌婅垝閬╁害锛岃粖鍏у儏鍏佽ū椋茬敤鐡惰姘存垨甯惰搵椋叉枡锛屼甫鍏佽ū椋熺敤鐒″埡婵€鎬ф埃鍛崇殑杓曢榛炲績銆?,
        },
        {
          q: "鍙互鏀滃付瀵电墿涓€鍚屼箻杌婂棊锛?,
          a: "鍙互銆傜偤浜嗕繚闅滆杌婂畨鍏紝鏀滃付瀵电墿涔樿粖鏅傝珛鍕欏繀鎻愬墠灏囧叾鏀惧叆瀵电墿鑸┖绠辨垨渚挎敎绫犲収銆傝嫢鏈敎甯跺悎瑕忓鐗╃睜锛屽徃姗熸湁娆婃嫆绲曞叾涓婅粖锛屾暚璜嬭珤瑙ｃ€?,
        },
        {
          q: "鍦橀殜琛岀▼涓紝杌婅紱鍙互骞垜鍊戝柈鐛ㄥ皣琛屾潕閬嬮€佸埌閰掑簵鍡庯紵",
          a: "鍙互锛岄€欐鏄垜鍊戦珮鐖惧か鐞冨湗鍜屽緬姝ョ櫥灞卞湗鐨勬牳蹇冪壒鑹叉湇鍕欍€傛垜鍊戝彲浠ュ厛灏囨偍閫佽嚦楂樼埦澶悆鍫存垨鐧诲北璧烽粸锛岄毃寰岀敱灏堝爆杌婅紱灏囨偍鐨勮鏉庯紙濡傞珮鐖惧か鐞冨寘銆侀噸鍨嬬櫥灞卞寘绛夛級鍏堣閫佸線鎮ㄤ粖鏅氬叆浣忕殑閰掑簵涓﹁睛鐞嗗瘎瀛橈紝璁撴偍鍏ㄧ▼杓曢瑔鍑鸿銆傞渶瑕佹敞鎰忕殑鏄紝鍩烘柤鏃ユ湰娉曡锛屾垜鍊戝儏鎻愪緵鏈湗绨界磩瀹汉鐨勯毃琛岃鏉庡垎娴侀亱閫侊紝涓嶆帴鍙楃劇涔樺闅ㄨ鐨勭磾鍟嗘キ璨ㄩ亱銆?,
        },
        {
          q: "鍙告鏈冪┛钁楁寮忋€侀厤鎴撮牁甯跺棊锛?,
          a: "鏄殑锛屾垜鍊戠殑鍙告濮嬬祩绌胯憲姝ｅ紡鐨勮タ瑁濅甫閰嶆埓闋樺付锛屼繚鎸佹渶楂樻婧栫殑灏堟キ鍎€琛ㄣ€?,
        },
        {
          q: "鍙告鏈冧繚璀蜂箻瀹㈢殑闅辩鍜屼繚瀵嗘€у棊锛?,
          a: "鏄殑銆備繚璀锋偍鐨勯毐绉佸拰姗熷瘑鏄垜鍊戠殑閲嶄腑涔嬮噸銆傛垜鍊戠殑鍙告閬靛惊鏈€鍤存牸鐨勪繚瀵嗘婧栵紝纰轰繚鎮ㄧ殑绉佸瘑灏嶈┍鍜岃绋嬩俊鎭湪浠讳綍鏅傚€欓兘绲曞皪瀹夊叏銆?,
        },
        {
          q: "鍙互鍦ㄨ粖鍏х郸鎵嬫鍏呴浕鍡庯紵",
          a: "鍙互銆傛垜鍊戠殑杌婅紱鍧囬厤鏈夊厖闆绘帴鍙ｏ紝涓﹀厤璨绘彁渚涘吋瀹硅構鏋滃拰瀹夊崜瑷倷鐨勮粖杓夊厖闆荤窔銆?,
        },
      ],
    },
    {
      group: "馃挻 璨荤敤鑸囨敮浠樼浉闂?,
      items: [
        {
          q: "鍙告鎺ユ绛夊緟鏈冪敘鐢熻秴鏅傝不鍡庯紵锛堝鑸彮寤惰锛?,
          a: "鎿旂暥鍙告鏈冧富鍕曡拷韫ゆ偍鐨勮埅鐝嫊鎱嬶紝涓︽牴鎿氳埅鐝闅涜惤鍦版檪闁撻潏娲昏鏁存帴姗熸檪闁撱€傝嫢鍦ㄨ埅鐝闅涜憲闄稿緦锛岀瓑寰呮檪闁撹秴閬?0鍒嗛悩锛屽皣鎸夋瘡30鍒嗛悩鐐哄柈浣嶆敹鍙栬秴鏅傜瓑寰呰不锛堜笉瓒?0鍒嗛悩鎸?0鍒嗛悩瑷堬級锛歕n璞愮敯鍩冪埦娉曪細 姣?0鍒嗛悩鍔犳敹 2,500 鏃ュ厓锛堝惈绋咃級\n璞愮敯娴风崊锛?姣?0鍒嗛悩鍔犳敹 3,000 鏃ュ厓锛堝惈绋咃級",
        },
        {
          q: "钀竴涔樺鍦ㄨ绋嬩腑鑷ㄦ檪闇€瑕佷慨鏀硅矾绶氭垨澧炲姞鐢ㄨ粖鏅傞枔鎬庨杭杈︼紵",
          a: "璜嬬珛鍗宠垏鍙告婧濋€氾紝鍙告鏈冮Μ涓婅垏瑾垮害涓績鍙栧緱鑱公涓︾⒑瑾嶈拷鍔犺不鐢ㄣ€傚洜涔樺鑷ㄦ檪璁婃洿璺窔鎴栬秴鏅傝€屽叏鏂扮敘鐢熺殑楂橀€熷叕璺不銆佹敹璨婚亾璺不銆佸洖閫侀€氳璨汇€佸仠杌婂牬璨汇€佸徃姗熶綇瀹胯不浠ュ強鏅傞枔寤堕暦婧㈠児璨荤敤锛屽皣鎿氬绱姞鑷虫偍鐨勬渶绲傝超鍠腑銆傜敱鏂兼垜鍊戠殑鍖呰粖鏈嶅嫏鍧囩偤鎻愬墠鎺掑柈闋愮磩鍒讹紝璜嬭珤瑙ｇ暥澶╃殑瀵﹂殯闋愮磩鎯呮硜鍙兘鏈冩湁鐒℃硶婊胯冻鎮ㄨ嚚鏅傞渶姹傜殑鎯呮硜鐧肩敓銆?,
        },
        {
          q: "楂橀€熷叕璺不銆佹敹璨婚亾璺不銆佸仠杌婂牬璨汇€佸徃姗熶綇瀹胯不绛夐渶瑕佸彟澶栨敮浠樺棊锛?,
          a: "涓嶉渶瑕併€傛湰鍏徃鎵€鎻愪緵鐨勫垵濮嬩及鍍瑰潎鎺″寘涔惧埗銆傚嚒鏄偤浜嗛亱琛屾偍闋愬畾琛岀▼鎵€蹇呴渶鐨勯珮閫熷叕璺不銆佹敹璨婚亾璺不銆佸洖閫侀€氳璨汇€佸仠杌婂牬璨讳互鍙婂徃姗熼毃琛屼綇瀹胯不锛堥檺閬犻€斿強璺ㄥ琛岀▼锛夛紝鍧囧凡瀹屾暣鍖呭惈鍦ㄧ附鍍逛腑銆傞櫎闈炴偍鍦ㄥ嚭杌婂緦鑷ㄦ檪璁婃洿琛岀▼锛屽惁鍓囩禃鐒′换浣曢毐褰㈡垨杩藉姞璨荤敤銆?,
        },
        {
          q: "鍏掔瀹夊叏搴ф鍜屾鍫磋垑鐗屾帴姗熸€庨杭鏀惰不锛?,
          a: "瀹屽叏鍏嶈不锛?鏃ュ厓锛夈€傛垜鍊戝厤璨绘彁渚涘厭绔ュ畨鍏ㄥ骇妞?瀣板厭搴ф锛屼甫鍏嶈不鎻愪緵鍒伴仈澶у怀鑸夌墝鎺ユ鏈嶅嫏銆傜偤浜嗕究鍒╂彁鍓嶈搴︼紝璜嬪湪闋愯▊鏅傚剺鏃╁悜瀹㈡湇鎻愬嚭鐢宠珛銆?,
        },
        {
          q: "鏀粯鏂瑰紡鏄粈楹硷紵鍙互鍦ㄨ粖鍏х洿鎺ヤ粯娆剧郸鍙告鍡庯紵",
          a: "鎴戝€戞敮鎸佽粖鍏х従閲戠祼甯筹紝涔熷彲浠ュ湪琛岀▼鍓嶇秮瀹氫俊鐢ㄥ崱锛岃绋嬬祼鏉熷緦閫氶亷鎴戝€戠殑绶氫笂鏀粯绯荤当锛堣棈姊濇敮浠橈級鑷嫊瀹屾垚鎵ｆ銆傚浼佹キ娉曚汉瀹㈡埗纰虹劇淇＄敤鍗★紝鍙敵璜嬫彁鍓嶉€茶閵€琛岃綁甯炽€?,
        },
        {
          q: "琛岀▼绲愭潫寰屾槸鍚︽湁鐧肩エ鎴栨敹鎿氾紵",
          a: "鏈夈€備娇鐢ㄤ俊鐢ㄥ崱鏀粯鐨勫鎴讹紝鍦ㄨ绋嬬祼鏉熸墸娆惧畬鎴愬緦锛岀郴绲辨渻鑷嫊灏囧悎瑕忕殑闆诲瓙鏀舵摎锛堟牸寮忕偤PDF闆诲瓙闋樻敹鏇革級鐧奸€佽嚦鎮ㄨɑ鍐婄殑闆诲瓙閮电銆備娇鐢ㄧ従閲戠祼甯崇殑瀹㈡埗锛屾垜鍊戝皣鏍规摎鎮ㄧ殑闇€姹傦紝鍦ㄨ绋嬬祼鏉熷緦鎻愪緵闆诲瓙鏀舵摎鎴栬珛娆惧柈銆?,
        },
      ],
    },
    {
      group: "鉂?鍙栨秷鏀跨瓥",
      items: [
        {
          q: "鍙栨秷瑷傚柈濡備綍鏀惰不锛?,
          a: "瑷傚柈鍙栨秷鏀跨瓥鍤存牸閬靛惊鏃ユ湰銆婄壒瀹氬晢妤氦鏄撴硶銆嬪叕绀烘娆惧煼琛岋細\n鐢ㄨ粖鏅傞枔鍓?48 灏忔檪浠ヤ笂鍙栨秷锛?鍏嶈不锛堝叏椤嶉€€娆撅級\n鐢ㄨ粖鏅傞枔鍓?24 鑷?48 灏忔檪鍏у彇娑堬細 鏀跺彇闋愯▓琛岀▼绺介鐨?50%\n鐢ㄨ粖鏅傞枔鍓?24 灏忔檪鍏у彇娑堟垨鐒℃晠鏈埌锛?鏀跺彇闋愯▓琛岀▼绺介鐨?100%\n瑷伙細濡傚洜棰遍ⅷ銆佽埅鐝獊鐧兼瑺鑸瓑涓嶅彲鎶楀姏灏庤嚧鐒℃硶鍑鸿锛屽湪鎮ㄦ彁渚涜埅鍙告啈璀変甫鍙婃檪閫氱煡鎴戝€戠殑鍓嶆彁涓嬶紝灏囧厤鏀跺彇娑堟墜绾岃不銆?,
        },
      ],
    },
  ],
};

/* 鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲
   Sub-components  (all sizes 脳1.2 vs original)
鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲 */

/* ── New 6-group category names ─────────────────────────────────────── */
const GROUP_NAMES: Record<Lang, [string, string, string, string, string, string]> = {
  en: ["About Us", "Prices & Fees", "Cars & Luggage", "Booking & Cancellation", "At the Airport", "Special Requests"],
  ja: ["私たちについて", "料金・費用", "車両・手荷物", "予約・キャンセル", "空港当日", "特別リクエスト"],
  zh: ["關於我們", "費用與收費", "車輛與行李", "預訂與取消", "在機場", "特殊需求"],
};

function buildRegroupedFAQ(faq: Record<Lang, FaqGroup[]>): Record<Lang, FaqGroup[]> {
  const result = {} as Record<Lang, FaqGroup[]>;
  (["en", "ja", "zh"] as Lang[]).forEach((lang) => {
    const veh = faq[lang][0].items;
    const pay = faq[lang][1].items;
    const can = faq[lang][2].items;
    const n   = GROUP_NAMES[lang];
    result[lang] = [
      { group: n[0], items: [veh[4], veh[5]] },
      { group: n[1], items: [pay[2], pay[3], pay[4], pay[5]] },
      { group: n[2], items: [veh[0], veh[1], veh[6]] },
      { group: n[3], items: [can[0], pay[1]] },
      { group: n[4], items: [pay[0]] },
      { group: n[5], items: [veh[2], veh[3]] },
    ];
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

/* FAQ row 鈥?was [12px]/[13px] Q text, now [14px]/[16px] */
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

/* 鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲
   Page
鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲 */
export default function AboutPage() {
  const { lang } = useLang();
  const [openKey,    setOpenKey]    = useState<string | null>(null);
  const [showForm,   setShowForm]   = useState(false);
  const [submitDone, setSubmitDone] = useState(false);
  const toggle = (key: string) => setOpenKey(prev => (prev === key ? null : key));

  return (
    <main className="min-h-screen bg-[#0c0c0c]">

      {/* 鈹€鈹€ Compact hero 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */}
      <div className="relative bg-[#0c0c0c] pt-[124px] sm:pt-[100px] pb-10 sm:pb-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }} />

        <Header />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          {/* badge: was [9px] 鈫?[11px] */}
          <p className="text-[#c9a84c] text-[11px] tracking-[0.45em] mb-2.5 uppercase">{HERO[lang].badge}</p>
          {/* title: was text-xl/2xl/3xl 鈫?text-2xl/3xl/4xl */}
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.12em] sm:tracking-[0.16em] leading-tight">
            {HERO[lang].title}
          </h1>
          {/* sub: was [10px] 鈫?[12px] */}
          <p className="mt-2 text-white/35 text-[12px] tracking-[0.28em] uppercase">{HERO[lang].sub}</p>

          {/* anchor links: was [10px] 鈫?[12px]; line was w-3.5 鈫?w-4 */}
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

      {/* 鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲
          STORY SECTION
      鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲 */}
      <section id="story" className="scroll-mt-24 bg-[var(--c-body)] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          <SectionLabel label={lang === "ja" ? "銉栥儵銉炽儔銈广儓銉笺儶銉? : lang === "zh" ? "鍝佺墝鏁呬簨" : "Our Story"} />

          {/* Story text + image placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-10 lg:gap-16 items-start">

            {/* Text column */}
            <div>
              {/* H2: was text-2xl/3xl/4xl 鈫?text-3xl/4xl/5xl */}
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
                {/* CTA: was [11px] 鈫?[13px] */}
                <Link href="/book"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="group inline-flex items-center justify-center gap-2.5
                             bg-[#c9a84c] text-[#0c0c0c] text-[12px] sm:text-[13px] tracking-[0.3em] font-black
                             px-8 py-3.5 sm:py-4 transition-all duration-200
                             hover:bg-white
                             shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_4px_28px_rgba(201,168,76,0.5)]
                             active:scale-110 active:bg-white active:shadow-[0_8px_36px_rgba(201,168,76,0.7)]
                             sm:active:scale-100 sm:active:shadow-[0_4px_28px_rgba(201,168,76,0.5)]">
                  {lang === "ja" ? "銇斾簣绱勩伅銇撱仭銈? : lang === "zh" ? "绔嬪嵆闋愯▊" : "Book Now"}
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Image placeholder 鈥?portrait 3:4 */}
            <div className="relative w-full max-w-[310px] mx-auto lg:mx-0">
              <div className="aspect-[3/4] bg-[#1a1a1a] border border-white/[0.07] flex flex-col items-center justify-center gap-4 overflow-hidden">
                {/* corner lines */}
                <div className="absolute top-3 left-3 w-7 h-7 border-t border-l border-[#c9a84c]/40" />
                <div className="absolute top-3 right-3 w-7 h-7 border-t border-r border-[#c9a84c]/40" />
                <div className="absolute bottom-3 left-3 w-7 h-7 border-b border-l border-[#c9a84c]/40" />
                <div className="absolute bottom-3 right-3 w-7 h-7 border-b border-r border-[#c9a84c]/40" />
                {/* camera icon: was w-8/h-8 鈫?w-10/h-10 */}
                <svg className="w-10 h-10 text-white/15" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
                {/* label: was [9px] 鈫?[11px] */}
                <p className="text-white/20 text-[11px] tracking-[0.2em] uppercase text-center px-6 leading-relaxed">
                  {lang === "ja" ? "鍐欑湡銈掋亾銇撱伀鎸垮叆" : lang === "zh" ? "鍦ㄦ鎻掑叆鍦栫墖" : "Insert photo here"}
                </p>
                <p className="text-white/15 text-[10px] tracking-[0.12em] text-center px-6 leading-relaxed">
                  720 脳 960 px 路 3:4
                </p>
              </div>
              {/* caption: was [9px] 鈫?[11px] */}
              <p className="mt-3 text-white/20 text-[11px] tracking-[0.12em] leading-relaxed text-center lg:text-left">
                {lang === "ja"
                  ? "鎺ㄥエ锛氶粧銇勩偄銉儠銈°兗銉夈伄銉夈偄銈掗枊銇戙倠鐧芥墜琚嬨儊銉ｃ偊銉曘偂銉笺€傛澅浜?浼濈当鐨勩仾闁€銈掕儗鏅伀銆併偞銉笺儷銉囥兂銈儻銉兼挳褰便€傜甫浣嶇疆 3:4銉绘渶灏?20脳960px"
                  : lang === "zh"
                  ? "寤鸿锛氭埓鐧芥墜濂楃殑鍙告鐐洪粦鑹?Alphard 闁嬮杸銆傝儗鏅偤鏉变含澶╅殯绶氭垨鍌崇当槌ュ眳銆傞粌閲戞檪鍒宦风副鍚?:4路鏈€灏?20脳960px"
                  : "Suggested: Chauffeur in dark suit & white gloves opening black Alphard door. Tokyo skyline or traditional gate. Golden hour 路 Portrait 3:4 路 min 720脳960px"}
              </p>
            </div>
          </div>

          {/* 鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲
              Section 2: 4 Core Services
          鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲 */}
          <div className="mt-20 sm:mt-28">
            <SectionLabel label={lang === "ja" ? "4銇ゃ伄銈炽偄銈点兗銉撱偣" : lang === "zh" ? "鍥涘ぇ鏍稿績鏈嶅嫏" : "Four Core Services"} />

            {/* sub-section heading: was [14px]/[15px] 鈫?[17px]/[18px] */}
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

          {/* 鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲
              Section 3: Vehicles
          鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲 */}
          <div className="mt-20 sm:mt-28">
            <SectionLabel label={VEH_SECTION_BADGE[lang]} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
              {VEHICLES[lang].map((veh, i) => (
                <div key={i}
                  className="relative bg-[var(--c-card)] border border-[var(--c-rule)] overflow-hidden group hover:border-[#c9a84c]/30 transition-all duration-300">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />

                  {/* vehicle image 鈥?keep white bg so mix-blend-multiply works */}
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

      {/* 鈹€鈹€ Gold divider 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€ */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/35 to-transparent" />

      {/* 鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲
          FAQ SECTION
      鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲 */}
      <section id="faq" className="scroll-mt-24 bg-[var(--c-body)] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <SectionLabel label={lang === "ja" ? "銈堛亸銇傘倠璩晱" : lang === "zh" ? "甯歌鍟忛" : "FAQ"} />

          {/* FAQ title: was text-2xl/3xl 鈫?text-3xl/4xl */}
          <h2 className="text-white text-3xl sm:text-4xl font-light tracking-[0.1em] mb-11 sm:mb-16">
            {lang === "ja" ? "銈堛亸銇傘倠銇旇唱鍟? : lang === "zh" ? "甯歌鍟忛" : "Frequently Asked Questions"}
          </h2>

          <div className="space-y-11 sm:space-y-14">
            {FAQ_GROUPED[lang].map((group) => (
              <div key={group.group}>
                {/* group heading: was [10px] 鈫?[12px]; line was w-3 鈫?w-4 */}
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

          {/* 鈹€鈹€ Contact Us section 鈹€鈹€ */}
          <div id="contact" className="scroll-mt-24 mt-16 sm:mt-20 border border-[var(--c-rule)] p-9 sm:p-12 text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mb-9" />
            <p className="text-[var(--c-ink-3)] text-[13px] tracking-[0.25em] uppercase mb-3">
              {lang === "ja" ? "銈傘仯銇ㄨ┏銇椼亸鐭ャ倞銇熴亜鏂广伅" : lang === "zh" ? "鏈夊叾浠栫枒鍟忥紵" : "Still have questions?"}
            </p>
            <p className="text-[var(--c-ink)] text-[17px] sm:text-[18px] tracking-[0.06em] mb-7 leading-relaxed">
              {lang === "ja"
                ? "銇婃皸杌姐伀銇旈€ｇ怠銇忋仩銇曘亜銆傛媴褰撹€呫倛銈婃姌銈婅繑銇椼仈閫ｇ怠銇勩仧銇椼伨銇欍€?
                : lang === "zh"
                ? "姝¤繋鑸囨垜鍊戣伅绻紝鎴戝€戝皣鏂?4灏忔檪鍏у洖瑕嗘偍銆?
                : "We'd love to hear from you. Our team will respond within 24 hours."}
            </p>

            {!showForm && !submitDone && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-3 bg-[#c9a84c] text-black text-[13px] font-bold tracking-[0.25em] uppercase px-9 py-4 hover:bg-white transition-all duration-200"
              >
                {lang === "ja" ? "銇婂晱銇勫悎銈忋仜" : lang === "zh" ? "鑱怠鎴戝€? : "Contact Us"}
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
                  {lang === "ja" ? "閫佷俊銇屽畬浜嗐仐銇俱仐銇? : lang === "zh" ? "瑷婃伅宸叉垚鍔熼€佸嚭" : "Message Sent"}
                </p>
                <p className="text-[var(--c-ink-2)] text-[13px] sm:text-[14px] tracking-[0.05em] leading-relaxed">
                  {lang === "ja"
                    ? "鎷呭綋鑰呫倛銈婃姌銈婅繑銇椼仈閫ｇ怠銇勩仧銇椼伨銇欍€?
                    : lang === "zh"
                    ? "鎴戝€戠殑鍦橀殜灏囩洝蹇垏鎮ㄨ伅绻€?
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

/* 鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲
   ContactForm component
鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲 */
const SUBJECTS: Record<Lang, string[]> = {
  ja: ["涓€鑸伄銇婂晱銇勫悎銈忋仜", "銇斾簣绱勩兓瑕嬬銈傘倞", "娉曚汉銉婚暦鏈熷绱?, "銇濄伄浠?],
  en: ["General Inquiry", "Booking & Quote Request", "Corporate Contract", "Other"],
  zh: ["涓€鑸鍟?, "闋愯▊鍙婂牨鍍?, "浼佹キ闀锋湡鍚堜綔", "鍏朵粬"],
};

const CLABEL: Record<string, Record<Lang, string>> = {
  subject:  { ja: "銇婂晱銇勫悎銈忋仜绋垾",      en: "Inquiry Type",           zh: "瑭㈠晱椤炲瀷" },
  name:     { ja: "銇婂悕鍓?*",              en: "Your Name *",            zh: "鎮ㄧ殑濮撳悕 *" },
  email:    { ja: "銉°兗銉偄銉夈儸銈?*",       en: "Email Address *",        zh: "闆诲瓙閮典欢 *" },
  phone:    { ja: "闆昏┍鐣彿锛堜换鎰忥級",       en: "Phone Number (optional)", zh: "闆昏┍铏熺⒓锛堥伕濉級" },
  message:  { ja: "銇旈€ｇ怠鍐呭銉汇仈璩晱 *",   en: "Your Message *",         zh: "瑭㈠晱鍏у *" },
  send:     { ja: "閫佷俊銇欍倠",              en: "Send Message",           zh: "鐧奸€佽▕鎭? },
  sending:  { ja: "閫佷俊涓€?,              en: "Sending鈥?,               zh: "鍌抽€佷腑鈥? },
  cancel:   { ja: "銈儯銉炽偦銉?,            en: "Cancel",                 zh: "鍙栨秷" },
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
