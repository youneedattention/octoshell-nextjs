import { NextRequest, NextResponse } from "next/server";

interface BookingPayload {
  mode: string;
  from: string;
  to: string;
  date: string;
  time: string;
  addReturn?: boolean;
  returnDate?: string;
  returnTime?: string;
  duration?: string;
  flightNum?: string;
  people: number;
  bags: number;
  driverMsgs: string[];
  name: string;
  email: string;
  phone: string;
  hasWhatsapp: boolean;
}

function row(label: string, value: string, even: boolean, bold = false) {
  return `<tr style="background:${even ? "#f8f6f3" : "#fff"};">
    <td style="padding:11px 18px;font-size:12px;font-weight:600;color:#555;width:36%;white-space:nowrap;">${label}</td>
    <td style="padding:11px 18px;font-size:13px;color:#111;${bold ? "font-weight:600;" : ""}">${value}</td>
  </tr>`;
}

function buildHtml(b: BookingPayload): string {
  const wa = b.hasWhatsapp && b.phone
    ? ` <span style="display:inline-flex;align-items:center;gap:4px;background:#e7f8ef;border-radius:3px;padding:2px 7px;font-size:11px;color:#25D366;font-weight:600;">WhatsApp ✓</span>`
    : "";
  const phone  = b.phone ? `${b.phone}${wa}` : "—";
  const driver = b.driverMsgs?.length ? b.driverMsgs.join("、") : "—";
  const modeLabel = b.mode === "hour"
    ? "By the Hour ／ 時間チャーター"
    : "Transfer ／ 送迎";

  const rows: string[] = [];
  let idx = 0;
  const r = (label: string, value: string, bold = false) => {
    rows.push(row(label, value, idx++ % 2 === 0, bold));
  };

  r("サービス / Mode",           modeLabel);
  r("出発地 / From",              b.from);

  if (b.mode === "transfer") {
    r("目的地 / To",              b.to || "—");
  } else {
    r("利用時間 / Duration",       b.duration ? `${b.duration} hours` : "—");
  }

  r("日付 / Date",                b.date);
  r("出発時刻 / Time",            b.time);

  if (b.mode === "transfer" && b.addReturn) {
    r("帰路日付 / Return Date",    b.returnDate || "—");
    r("帰路時刻 / Return Time",    b.returnTime || "—");
  }

  if (b.flightNum) {
    r("フライト / Flight No.",     b.flightNum);
  }

  r("乗客数 / Passengers",        String(b.people));
  r("スーツケース / Suitcases",    String(b.bags));
  r("ドライバーへの伝達 / Driver",  driver);
  r("お名前 / Name",              b.name, true);
  r("メール / Email",             b.email);
  r("緊急電話 / Emergency",       phone);

  return `<!DOCTYPE html>
<html lang="ja"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f0ede9;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:40px auto;background:#fff;border:1px solid #e2ddd8;">

  <div style="background:#0c0c0c;padding:26px 32px;">
    <p style="margin:0 0 5px;font-size:9px;letter-spacing:0.45em;text-transform:uppercase;color:#c9a84c;">
      NEW BOOKING REQUEST ／ 新規予約リクエスト
    </p>
    <h1 style="margin:0;font-size:21px;font-weight:300;letter-spacing:0.12em;color:#fff;">
      Octoshell Japan
    </h1>
  </div>

  <table style="width:100%;border-collapse:collapse;">${rows.join("")}</table>

  <div style="padding:18px 32px;border-top:1px solid #e2ddd8;">
    <p style="margin:0;font-size:11px;color:#aaa;">
      Reply-To: <a href="mailto:${b.email}" style="color:#c9a84c;">${b.email}</a><br>
      Submitted via <a href="https://octoshell-nextjs.vercel.app/book" style="color:#c9a84c;">octoshell-nextjs.vercel.app/book</a>
    </p>
  </div>
</div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  let body: BookingPayload;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 }); }

  for (const f of ["from", "date", "time", "name", "email"] as const) {
    if (!body[f]) return NextResponse.json({ ok: false, error: `Missing: ${f}` }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[book] RESEND_API_KEY not set — returning dev success");
    return NextResponse.json({ ok: true, dev: true });
  }

  const toEmail = process.env.BOOKING_TO_EMAIL ?? "info@octoshell.jp";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Octoshell Booking <noreply@octoshell.jp>",
      to: [toEmail],
      reply_to: body.email,
      subject: `【予約リクエスト】${body.name}  ${body.date}`,
      html: buildHtml(body),
    }),
  });

  const result = (await res.json()) as { id?: string; message?: string; name?: string };
  if (!res.ok) {
    const msg = result.message ?? result.name ?? `Resend error ${res.status}`;
    console.error("[book] Resend failed:", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 502 });
  }
  return NextResponse.json({ ok: true, id: result.id });
}
