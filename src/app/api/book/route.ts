import { NextRequest, NextResponse } from "next/server";

/** Expected request body */
interface BookingPayload {
  from: string;
  to: string;
  date: string;
  time: string;
  people: number;
  bags: number;
  name: string;
  email: string;
}

/** Build an HTML email table */
function buildHtml(b: BookingPayload): string {
  const rows: [string, string][] = [
    ["出発地 / From",           b.from],
    ["目的地 / To",             b.to],
    ["日付 / Date",             b.date],
    ["出発時刻 / Departure",    b.time],
    ["乗客数 / Passengers",     String(b.people)],
    ["スーツケース / Suitcases", String(b.bags)],
    ["お名前 / Name",           b.name],
    ["メール / Email",          b.email],
  ];

  const tableRows = rows
    .map(
      ([label, val], i) => `
      <tr style="background:${i % 2 === 0 ? "#f8f6f3" : "#ffffff"};">
        <td style="padding:12px 18px;font-size:12px;font-weight:600;color:#555;white-space:nowrap;width:38%;">${label}</td>
        <td style="padding:12px 18px;font-size:13px;color:#111;">${val}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ede9;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:600px;margin:40px auto;background:#fff;border:1px solid #e2ddd8;">

  <!-- Header -->
  <div style="background:#0c0c0c;padding:28px 32px;">
    <p style="margin:0 0 6px;font-size:9px;letter-spacing:0.45em;text-transform:uppercase;color:#c9a84c;">
      NEW BOOKING REQUEST ／ 新規予約リクエスト
    </p>
    <h1 style="margin:0;font-size:22px;font-weight:300;letter-spacing:0.12em;color:#fff;">
      Octoshell Japan
    </h1>
  </div>

  <!-- Table -->
  <div style="padding:0;">
    <table style="width:100%;border-collapse:collapse;">
      ${tableRows}
    </table>
  </div>

  <!-- Footer -->
  <div style="padding:20px 32px;border-top:1px solid #e2ddd8;">
    <p style="margin:0;font-size:11px;color:#aaa;">
      Reply-To: <a href="mailto:${b.email}" style="color:#c9a84c;">${b.email}</a><br>
      Submitted via <a href="https://octoshell-nextjs.vercel.app/book" style="color:#c9a84c;">octoshell-nextjs.vercel.app/book</a>
    </p>
  </div>

</div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  /* ── Parse body ── */
  let body: BookingPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  /* ── Validate required fields ── */
  const required: (keyof BookingPayload)[] = ["from", "to", "date", "time", "name", "email"];
  for (const f of required) {
    if (!body[f]) {
      return NextResponse.json({ ok: false, error: `Missing field: ${f}` }, { status: 422 });
    }
  }

  /* ── Resend API key check ── */
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[book] RESEND_API_KEY not set — email skipped");
    // Return success so the form still shows the confirmation in development
    return NextResponse.json({ ok: true, dev: true });
  }

  /* ── Recipient (override for testing via env var) ── */
  const toEmail = process.env.BOOKING_TO_EMAIL ?? "info@octoshell.jp";

  /* ── Send via Resend ── */
  const payload = {
    from: "Octoshell Booking <onboarding@resend.dev>",
    to: [toEmail],
    reply_to: body.email,
    subject: `【予約リクエスト】${body.name}  ${body.date}`,
    html: buildHtml(body),
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = (await res.json()) as { id?: string; name?: string; message?: string };

  if (!res.ok) {
    const msg = result.message ?? result.name ?? `Resend error ${res.status}`;
    console.error("[book] Resend failed:", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 502 });
  }

  return NextResponse.json({ ok: true, id: result.id });
}
