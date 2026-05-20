import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM =
  process.env.RESEND_FROM_EMAIL ?? "AnalyticShala <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  const { name, email, program, type, amount, paymentId, phone, date } =
    await req.json();

  if (!email || !name) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: `You're enrolled in ${program} - AnalyticShala`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <div style="background:#bb1b21;padding:28px 32px;border-radius:10px 10px 0 0">
          <h1 style="margin:0;color:#fff;font-size:22px">Registration Confirmed 🎉</h1>
        </div>
        <div style="background:#fff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px">
          <p style="margin:0 0 16px">Hi <strong>${name}</strong>,</p>
          <p style="margin:0 0 24px">Your enrollment for <strong>${program}</strong> has been confirmed. Here are your details:</p>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-size:13px;color:#6b7280">Program</td><td style="padding:10px 12px;border:1px solid #e5e7eb;font-weight:600">${program}</td></tr>
            <tr><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-size:13px;color:#6b7280">Type</td><td style="padding:10px 12px;border:1px solid #e5e7eb">${type}</td></tr>
            <tr><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-size:13px;color:#6b7280">Amount Paid</td><td style="padding:10px 12px;border:1px solid #e5e7eb;font-weight:600">₹${amount}</td></tr>
            <tr><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-size:13px;color:#6b7280">Payment ID</td><td style="padding:10px 12px;border:1px solid #e5e7eb;font-size:13px;color:#6b7280">${paymentId}</td></tr>
            <tr><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-size:13px;color:#6b7280">Phone</td><td style="padding:10px 12px;border:1px solid #e5e7eb">${phone}</td></tr>
            <tr><td style="padding:10px 12px;background:#f9fafb;border:1px solid #e5e7eb;font-size:13px;color:#6b7280">Date</td><td style="padding:10px 12px;border:1px solid #e5e7eb">${date}</td></tr>
          </table>

          <p style="margin:0 0 8px;font-size:14px;color:#6b7280">Our team will reach out shortly with next steps. In the meantime, feel free to WhatsApp us at <strong>+91 88826 41988</strong>.</p>
          <p style="margin:24px 0 0;font-size:13px;color:#9ca3af">- Team AnalyticShala</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("[Resend] send-confirmation failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
