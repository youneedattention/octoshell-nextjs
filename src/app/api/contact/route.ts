import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  lang?: string;
}

function row(label: string, value: string, even: boolean, bold = false) {
  return `<tr style="background:${even ? "#f8f6f3" : "#fff"};">
    <td style="padding:11px 18px;font-size:12px;font-weight:600;color:#555;width:32%;white-space:nowrap;">${label}</td>
    <td style="padding:11px 18px;font-size:13px;color:#111;${bold ? "font-weight:600;" : ""}">${value}</td>
  </tr>`;
}

function buildHtml(b: ContactPayload): string {
  const rows: string[] = [];
  let idx = 0;
  const r = (label: string, value: string, bold = false) => {
    rows.push(row(label, value, idx++ % 2 === 0, bold));
  };

  r("件名 / Subject",      b.subject);
  r("お名前 / Name",        b.name, true);
  r("メール / Email",       b.email);
  r("電話 / Phone",         b.phone || "—");
  r("ご連絡内容 / Message", b.message.replace(/\n/g, "<br>"));

  return `<!DOCTYPE html>
<html lang="ja"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f0ede9;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:40px auto;background:#fff;border:1px solid #e2ddd8;">

  <div style="background:#0c0c0c;padding:26px 32px;">
    <p style="margin:0 0 5px;font-size:9px;letter-spacing:0.45em;text-transform:uppercase;color:#c9a84c;">
      NEW INQUIRY ／ お問い合わせ
    </p>
    <h1 style="margin:0;font-size:21px;font-weight:300;letter-spacing:0.12em;color:#fff;">
      Octoshell Japan
    </h1>
  </div>

  <table style="width:100%;border-collapse:collapse;">${rows.join("")}</table>

  <div style="padding:18px 32px;border-top:1px solid #e2ddd8;">
    <p style="margin:0;font-size:11px;color:#aaa;">
      Reply-To: <a href="mailto:${b.email}" style="color:#c9a84c;">${b.email}</a><br>
      Submitted via <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://octoshell.jp"}/about" style="color:#c9a84c;">${(process.env.NEXT_PUBLIC_SITE_URL ?? "https://octoshell.jp").replace("https://", "")}/about</a>
    </p>
  </div>
</div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = await req.json() as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  for (const f of ["name", "email", "subject", "message"] as const) {
    if (!body[f]) {
      return NextResponse.json({ ok: false, error: `Missing field: ${f}` }, { status: 422 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — returning dev success");
    return NextResponse.json({ ok: true, dev: true });
  }

  const toEmail = process.env.BOOKING_TO_EMAIL ?? "info@octoshell.jp";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Octoshell Inquiry <noreply@octoshell.jp>",
      to: [toEmail],
      reply_to: body.email,
      subject: `【お問い合わせ】${body.subject} — ${body.name}`,
      html: buildHtml(body),
    }),
  });

  const result = (await res.json()) as { id?: string; message?: string; name?: string };
  if (!res.ok) {
    const msg = result.message ?? result.name ?? `Resend error ${res.status}`;
    console.error("[contact] Resend failed:", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 502 });
  }

  return NextResponse.json({ ok: true, id: result.id });
}
