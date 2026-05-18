import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL ?? "AnalyticShala <onboarding@resend.dev>";
const TEAM_EMAIL = process.env.RESEND_TEAM_EMAIL ?? "team@analyticshala.in";

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json();

  if (!email || !name) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TEAM_EMAIL,
    replyTo: email,
    subject: `New counselling inquiry from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <div style="background:#bb1b21;padding:24px 32px;border-radius:10px 10px 0 0">
          <h2 style="margin:0;color:#fff;font-size:18px">New Contact Inquiry</h2>
        </div>
        <div style="background:#fff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-size:13px;color:#6b7280;width:120px">Name</td><td style="padding:10px 12px;border:1px solid #e5e7eb;font-weight:600">${name}</td></tr>
            <tr><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-size:13px;color:#6b7280">Email</td><td style="padding:10px 12px;border:1px solid #e5e7eb"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-size:13px;color:#6b7280">Phone</td><td style="padding:10px 12px;border:1px solid #e5e7eb">${phone || "Not provided"}</td></tr>
            <tr><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-size:13px;color:#6b7280;vertical-align:top">Message</td><td style="padding:10px 12px;border:1px solid #e5e7eb">${message || "Free counselling request"}</td></tr>
          </table>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("[Resend] send-inquiry failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
