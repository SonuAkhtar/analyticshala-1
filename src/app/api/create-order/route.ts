import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

const razorpay =
  keyId && keySecret ? new Razorpay({ key_id: keyId, key_secret: keySecret }) : null;

export async function POST(req: NextRequest) {
  if (!razorpay) {
    return NextResponse.json(
      { success: false, message: "Razorpay credentials not configured" },
      { status: 500 },
    );
  }

  try {
    const { amount, itemId } = await req.json();

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid amount" },
        { status: 400 },
      );
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `rcpt_${itemId ?? "item"}_${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Order creation failed";
    console.error("[Razorpay] create-order failed:", err);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
