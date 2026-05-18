"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import {
  RAZORPAY_KEY_ID,
  EMAILJS_SERVICE_ID,
  EMAILJS_REG_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from "@/config";
import { supabase } from "@/lib/supabase";
import styles from "./payment.module.css";

/* ── Types ── */
interface PaymentData {
  amount: number; // paise
  orderId?: string;
  user: {
    name: string;
    email: string;
    phone: string;
    age?: string;
    experience?: string;
    goal?: string;
    status?: string;
    mode?: string;
    analyticshalaStudent?: string;
    courseId?: string;
    courseTitle?: string;
    workshopId?: string;
    workshopTitle?: string;
    workshopDate?: string;
    workshopTime?: string;
    workshopMode?: string;
  };
}

const toINR = (paise: number) => (paise / 100).toLocaleString("en-IN");

const TRUST_BADGES = [
  { icon: "fas fa-lock", label: "256-bit SSL" },
  { icon: "fas fa-shield-alt", label: "Secure Payment" },
  { icon: "fas fa-undo", label: "24-hr Refund" },
];

const ENROLLED_COUNT: Record<string, number> = {
  "data-analytics-python": 190,
  sql: 240,
  excel: 300,
  "genai-development": 120,
  "agentic-ai": 90,
  webdev: 142,
};

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function PaymentPage() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = sessionStorage.getItem("paymentData");
      if (raw) {
        setPaymentData(JSON.parse(raw));
      } else {
        router.replace("/");
      }
    } catch {
      router.replace("/");
    }
  }, [router]);

  if (!mounted || !paymentData) return null;

  const itemTitle =
    paymentData.user?.courseTitle ||
    paymentData.user?.workshopTitle ||
    "AnalyticShala Program";
  const amountINR = toINR(paymentData.amount);
  const courseId = paymentData.user?.courseId ?? "";
  const enrolledNum = ENROLLED_COUNT[courseId] || 142;

  const openRazorpay = () => {
    if (!RAZORPAY_KEY_ID) {
      alert("Razorpay key missing. Please contact support.");
      return;
    }

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: paymentData.amount,
      currency: "INR",
      name: "AnalyticShala",
      description: itemTitle,
      ...(paymentData.orderId ? { order_id: paymentData.orderId } : {}),
      image: "/favicon.ico",

      prefill: {
        name: paymentData.user.name,
        email: paymentData.user.email,
        contact: paymentData.user.phone,
      },

      handler: async function (response: { razorpay_payment_id: string }) {
        setIsProcessing(true);
        const waDate = new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        // Save to Supabase
        if (supabase) {
          try {
            await supabase.from("registrations").insert({
              type: paymentData.user.courseId ? "course" : "workshop",
              item_id: paymentData.user.courseId || paymentData.user.workshopId || "",
              item_title: itemTitle,
              name: paymentData.user.name,
              email: paymentData.user.email,
              phone: paymentData.user.phone,
              age: paymentData.user.age || null,
              experience: paymentData.user.experience || null,
              goal: paymentData.user.goal || null,
              status: paymentData.user.status || null,
              mode: paymentData.user.mode || null,
              analyticshala_student: paymentData.user.analyticshalaStudent || null,
              amount_paise: paymentData.amount,
              payment_id: response.razorpay_payment_id,
            });
          } catch (err) {
            console.error("Supabase save failed:", err);
          }
        }

        // Send EmailJS confirmation
        if (EMAILJS_SERVICE_ID && EMAILJS_REG_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
          try {
            await emailjs.send(
              EMAILJS_SERVICE_ID,
              EMAILJS_REG_TEMPLATE_ID,
              {
                to_name: paymentData.user.name,
                to_email: paymentData.user.email,
                program: itemTitle,
                type: paymentData.user.courseId ? "Course" : "Workshop",
                amount: amountINR,
                payment_id: response.razorpay_payment_id,
                phone: paymentData.user.phone,
                date: waDate,
              },
              EMAILJS_PUBLIC_KEY,
            );
          } catch (err) {
            console.error("[EmailJS] send failed:", err);
          }
        }

        // Store success data in sessionStorage
        const successData = {
          type: paymentData.user.courseId ? "course" : "workshop",
          name: paymentData.user.name,
          email: paymentData.user.email,
          phone: paymentData.user.phone,
          title: itemTitle,
          amountINR,
          paymentId: response.razorpay_payment_id,
          workshopDate: paymentData.user.workshopDate || "",
          workshopTime: paymentData.user.workshopTime || "",
          workshopMode: paymentData.user.workshopMode || "",
        };
        sessionStorage.setItem("paymentSuccess", JSON.stringify(successData));
        sessionStorage.removeItem("paymentData");

        router.push("/payment-success");
      },

      theme: { color: "#bb1b21" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      {/* Razorpay SDK */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      {isProcessing && (
        <div className={styles.processing}>
          <div className={styles.processingInner}>
            <div className={styles.processingSpinner} />
            <p>Confirming your enrollment…</p>
            <span>Please wait, do not close this page</span>
          </div>
        </div>
      )}

      <div className={styles.payment}>
        <div className={styles.wrap}>
          {/* Order Summary */}
          <div className={styles.summary}>
            <div className={styles.summaryHeader}>
              <i className="fas fa-receipt" />
              <span>Order Summary</span>
            </div>

            <div className={styles.summaryItem}>
              <div className={styles.summaryItemIcon}>
                <i className="fas fa-graduation-cap" />
              </div>
              <div className={styles.summaryItemInfo}>
                <span className={styles.summaryItemLabel}>Program</span>
                <strong className={styles.summaryItemName}>{itemTitle}</strong>
              </div>
            </div>

            <div className={styles.summaryDivider} />

            <div className={styles.summaryLines}>
              <div className={styles.summaryLine}>
                <span>Registration Fee <em>(due today)</em></span>
                <span className={styles.summaryLineAmount}>₹{amountINR}</span>
              </div>
            </div>

            <div className={styles.summaryTotal}>
              <span>Due Today</span>
              <strong>₹{amountINR}</strong>
            </div>

            <div className={styles.summaryProof}>
              <i className="fas fa-users" />
              <span>{enrolledNum}+ learners already enrolled</span>
            </div>
          </div>

          {/* Payment Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Complete Your Enrollment</h2>
              <p className={styles.subtext}>
                <i className="fas fa-lock" /> Secured by Razorpay
              </p>
            </div>

            <div className={styles.studentRecap}>
              <div className={styles.studentAvatar}>
                {paymentData.user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className={styles.studentInfo}>
                <strong>{paymentData.user.name}</strong>
                <span>{paymentData.user.email}</span>
              </div>
            </div>

            <button
              className={styles.payBtn}
              onClick={openRazorpay}
              disabled={isProcessing}
            >
              <i className="fas fa-lock" />
              Pay ₹{amountINR} Securely
            </button>

            <p className={styles.methods}>
              <i className="fab fa-google-pay" /> Google Pay &nbsp;·&nbsp;
              <i className="fas fa-credit-card" /> Card &nbsp;·&nbsp;
              <i className="fas fa-university" /> Netbanking &nbsp;·&nbsp; UPI
            </p>

            <div className={styles.trustBadges}>
              {TRUST_BADGES.map((b, i) => (
                <div key={i} className={styles.trustBadge}>
                  <i className={b.icon} />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/918882641988?text=${encodeURIComponent(
                "Hi! I have a question about my enrollment for " + itemTitle + "."
              )}`}
              target="_blank"
              rel="noreferrer"
              className={styles.waHelp}
            >
              <i className="fab fa-whatsapp" /> Have a question? Chat with us
            </a>

            <p className={styles.policyNote}>
              <i className="fas fa-info-circle" /> Full refund if cancelled
              within 24 hours of payment.{" "}
              <a href="/refund-policy" target="_blank" rel="noopener noreferrer">
                View policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
