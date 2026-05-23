import { NextRequest, NextResponse } from "next/server";

interface BookingPayload {
  from: string;
  to: string;
  date: string;
  time: string;
  people: number;
  bags: number;
  vehicle: string;
  driverMsg: string;
  name: string;
  email: string;
  phone: string;
  hasWhatsapp: boolean;
}

const VEHICLE_LABEL: Record<string, string> = {
  none:    "指定なし / No Preference",
  alphard: "アルファードクラス (+¥500)",
  hiace:   "ハイエースクラス (+¥4,500)",
};

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
  const phone = b.phone ? `${b.phone}${wa}` : "—";
  const driver = b.driverMsg || "—";
  const vehicle = (VEHICLE_LABEL[b.vehicle] ?? b.vehicle) || "指定なし";

  const rows = [
    row("出発地 / From",             b.from,   true),
    row("目的地 / To",               b.to,     false),
    row("日付 / Date",               b.date,   true),
    row("出発時刻 / Time",           b.time,   false),
    row("乗客数 / Passengers",       String(b.people), true),
    row("スーツケース / Suitcases",   String(b.bags),   false),
    row("車種 / Vehicle",            vehicle,  true),
    row("ドライバーへの伝達 / Driver", driver,   false),
    row("お名前 / Name",             b.name,   true,  true),
    row("メール / Email",            b.email,  false),
    row("緊急電話 / Emergency",      phone,    true),
  ].join("");

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

  <table style="width:100%;border-collapse:collapse;">${rows}</table>

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

  for (const f of ["from", "to", "date", "time", "name", "email"] as const) {
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
      from: "Octoshell Booking <onboarding@resend.dev>",
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
