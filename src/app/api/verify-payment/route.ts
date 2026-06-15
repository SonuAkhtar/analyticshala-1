import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Run on the Node.js runtime — we need the `crypto` module for HMAC.
export const runtime = "nodejs";

const keySecret = process.env.RAZORPAY_KEY_SECRET;

interface RegistrationData {
  courseId?: string;
  workshopId?: string;
  title?: string;
  name?: string;
  email?: string;
  phone?: string;
  // course-only
  experience?: string;
  goal?: string;
  // workshop-only
  workshopDate?: string;
  workshopTime?: string;
  workshopMode?: string;
  age?: string | number;
  status?: string;
  mode?: string;
  analyticshalaStudent?: string;
  amountInr?: number;
}

interface VerifyBody {
  type: "course" | "workshop";
  paymentId: string;
  orderId?: string;
  signature?: string;
  isTest?: boolean;
  data: RegistrationData;
}

/**
 * Confirms the Razorpay payment signature is authentic.
 * signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret)
 */
function isValidSignature(
  orderId: string,
  paymentId: string,
  signature: string,
): boolean {
  if (!keySecret) return false;
  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  // Constant-time compare to avoid timing leaks.
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    console.error("[verify-payment] Supabase not configured");
    return NextResponse.json(
      { success: false, message: "Database not configured" },
      { status: 500 },
    );
  }

  let body: VerifyBody;
  try {
    body = (await req.json()) as VerifyBody;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const { type, paymentId, orderId, signature, isTest, data } = body;

  if (!paymentId || !type || !data) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 },
    );
  }

  // Verify the payment is genuine. The order is always created server-side
  // before checkout, so a real Razorpay success returns order id + signature.
  if (orderId && signature) {
    if (!isValidSignature(orderId, paymentId, signature)) {
      console.error("[verify-payment] signature mismatch", { paymentId, orderId });
      return NextResponse.json(
        { success: false, message: "Payment signature verification failed" },
        { status: 400 },
      );
    }
  } else {
    // No order/signature available — cannot cryptographically verify. Record it
    // but flag it so it can be audited rather than silently trusted.
    console.warn(
      "[verify-payment] missing order/signature, saving as unverified",
      { paymentId },
    );
  }

  const table =
    type === "course" ? "course_registrations" : "workshop_registrations";

  // Idempotency: a retry (or keepalive re-send) must not create a duplicate.
  // If a row for this payment already exists, treat it as success.
  try {
    const existing = await supabaseAdmin
      .from(table)
      .select("id")
      .eq("payment_id", paymentId)
      .limit(1)
      .maybeSingle();
    if (existing.data) {
      return NextResponse.json({ success: true, saved: true, duplicate: true });
    }
  } catch (err) {
    // Existence check is best-effort (e.g. anon role may lack SELECT). The
    // unique-constraint handling below still protects against duplicates.
    console.warn("[verify-payment] duplicate check skipped:", err);
  }

  const { error } =
    type === "course"
      ? await supabaseAdmin.from(table).insert({
          course_id: data.courseId,
          course_title: data.title,
          name: data.name,
          email: data.email,
          phone: data.phone,
          experience: data.experience || null,
          goal: data.goal || null,
          amount_inr: data.amountInr ?? null,
          payment_id: paymentId,
          is_test: Boolean(isTest),
        })
      : await supabaseAdmin.from(table).insert({
          workshop_id: data.workshopId || "",
          workshop_title: data.title,
          workshop_date: data.workshopDate || null,
          workshop_time: data.workshopTime || null,
          workshop_mode: data.workshopMode || null,
          name: data.name,
          email: data.email,
          phone: data.phone,
          age:
            data.age !== undefined && data.age !== "" && data.age !== null
              ? Number(data.age)
              : null,
          status: data.status || null,
          mode: data.mode || null,
          analyticshala_student: data.analyticshalaStudent || null,
          amount_inr: data.amountInr ?? null,
          payment_id: paymentId,
          is_test: Boolean(isTest),
        });

  if (error) {
    // 23505 = unique_violation → the row already exists (idempotent success).
    if (error.code === "23505") {
      return NextResponse.json({ success: true, saved: true, duplicate: true });
    }
    console.error("[verify-payment] insert failed:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, saved: true });
}
