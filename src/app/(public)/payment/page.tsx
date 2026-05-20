"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RAZORPAY_KEY_ID } from "@/config";
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

const ENROLLED_COUNT: Record<string, number> = {
  "data-analytics-python": 190,
  sql: 240,
  excel: 300,
  "genai-development": 120,
  "agentic-ai": 90,
  webdev: 142,
};

const COURSE_INCLUDES = [
  { icon: "fas fa-video", label: "Live cohort" },
  { icon: "fas fa-certificate", label: "Certificate" },
  { icon: "fas fa-infinity", label: "Lifetime access" },
];

interface RazorpayInstance {
  open: () => void;
  on: (
    event: "payment.failed",
    handler: (response: {
      error?: { description?: string; reason?: string; code?: string };
    }) => void,
  ) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

export default function PaymentPage() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

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
  const isWorkshop = !paymentData.user?.courseId;
  const wsDate = paymentData.user?.workshopDate ?? "";
  const wsTime = paymentData.user?.workshopTime ?? "";
  const wsMode = paymentData.user?.workshopMode ?? "";
  const wsDateParts = (() => {
    if (!wsDate) return { month: "", day: "", dayName: "" };
    const [monthDay, dayName = ""] = wsDate.split(", ");
    const [month = "", day = ""] = monthDay.split(" ");
    return {
      month: month.slice(0, 3).toUpperCase(),
      day,
      dayName: dayName.slice(0, 3).toUpperCase(),
    };
  })();

  const openRazorpay = () => {
    setPaymentError(null);

    if (!RAZORPAY_KEY_ID) {
      setPaymentError(
        "Payments aren't configured yet. Please contact support on WhatsApp and we'll help you enroll.",
      );
      return;
    }

    if (
      typeof window === "undefined" ||
      typeof window.Razorpay === "undefined"
    ) {
      setPaymentError(
        "Payment system is still loading. Please wait a moment and try again.",
      );
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

      modal: {
        ondismiss: () => {
          setIsProcessing(false);
          setPaymentError(
            "Payment cancelled. No money was deducted - you can try again whenever you're ready.",
          );
        },
      },

      handler: async function (response: { razorpay_payment_id: string }) {
        setIsProcessing(true);
        setPaymentError(null);
        const waDate = new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        // Flag dev/test rows so production data stays clean
        const host = window.location.hostname;
        const isTest =
          host === "localhost" ||
          host === "127.0.0.1" ||
          host.endsWith(".vercel.app"); // preview deploys count as test

        // Save to Supabase - track success so the success page can warn the user if it failed
        let saveOk = false;
        if (supabase) {
          try {
            const insertResult = paymentData.user.courseId
              ? await supabase.from("course_registrations").insert({
                  course_id: paymentData.user.courseId,
                  course_title: itemTitle,
                  name: paymentData.user.name,
                  email: paymentData.user.email,
                  phone: paymentData.user.phone,
                  experience: paymentData.user.experience || null,
                  goal: paymentData.user.goal || null,
                  amount_inr: paymentData.amount / 100,
                  payment_id: response.razorpay_payment_id,
                  is_test: isTest,
                })
              : await supabase.from("workshop_registrations").insert({
                  workshop_id: paymentData.user.workshopId || "",
                  workshop_title: itemTitle,
                  workshop_date: paymentData.user.workshopDate || null,
                  workshop_time: paymentData.user.workshopTime || null,
                  workshop_mode: paymentData.user.workshopMode || null,
                  name: paymentData.user.name,
                  email: paymentData.user.email,
                  phone: paymentData.user.phone,
                  age: paymentData.user.age
                    ? Number(paymentData.user.age)
                    : null,
                  status: paymentData.user.status || null,
                  mode: paymentData.user.mode || null,
                  analyticshala_student:
                    paymentData.user.analyticshalaStudent || null,
                  amount_inr: paymentData.amount / 100,
                  payment_id: response.razorpay_payment_id,
                  is_test: isTest,
                });

            if (insertResult.error) {
              console.error("Supabase save failed:", insertResult.error);
            } else {
              saveOk = true;
            }
          } catch (err) {
            console.error("Supabase save threw:", err);
          }
        } else {
          console.error(
            "Supabase client not configured - registration not saved",
          );
        }

        // Send confirmation email via Resend
        let emailOk = false;
        try {
          const emailRes = await fetch("/api/send-confirmation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: paymentData.user.name,
              email: paymentData.user.email,
              program: itemTitle,
              type: paymentData.user.courseId ? "Course" : "Workshop",
              amount: amountINR,
              paymentId: response.razorpay_payment_id,
              phone: paymentData.user.phone,
              date: waDate,
            }),
          });
          emailOk = emailRes.ok;
          if (!emailRes.ok) {
            console.error(
              "[Resend] confirmation email failed:",
              emailRes.status,
            );
          }
        } catch (err) {
          console.error("[Resend] confirmation email failed:", err);
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
          saveOk,
          emailOk,
        };
        sessionStorage.setItem("paymentSuccess", JSON.stringify(successData));
        sessionStorage.removeItem("paymentData");

        router.push("/payment-success");
      },

      theme: { color: "#bb1b21" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      setIsProcessing(false);
      const reason =
        response?.error?.description ||
        response?.error?.reason ||
        "Your bank declined the payment.";
      setPaymentError(
        `Payment failed: ${reason} No money was deducted. Please try again or use a different payment method.`,
      );
    });
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

      <div
        className={`${styles.payment}${isWorkshop ? " " + styles.paymentWorkshop : ""}`}
      >
        <div className={styles.wrap}>
          {/* Order Summary */}
          {isWorkshop ? (
            <div className={`${styles.summary} ${styles.summaryWs}`}>
              <div className={styles.summaryHeader}>
                <i className="fas fa-bolt" />
                <span>Your Workshop Ticket</span>
              </div>

              {(wsDateParts.day || wsDateParts.month) && (
                <div className={styles.wsTicketDate}>
                  <span className={styles.wsTicketMonth}>
                    {wsDateParts.month}
                  </span>
                  <span className={styles.wsTicketDay}>{wsDateParts.day}</span>
                  {wsDateParts.dayName && (
                    <span className={styles.wsTicketDayName}>
                      {wsDateParts.dayName}
                    </span>
                  )}
                </div>
              )}

              <div className={styles.wsTicketTitleWrap}>
                <span className={styles.summaryItemLabel}>Workshop</span>
                <strong className={styles.wsTicketTitle}>{itemTitle}</strong>
              </div>

              <div className={styles.wsPerforation} />

              <div className={styles.wsDetailRows}>
                {wsDate && (
                  <div className={styles.wsDetailRow}>
                    <i className="fas fa-calendar-alt" />
                    <span>{wsDate}</span>
                  </div>
                )}
                {wsTime && (
                  <div className={styles.wsDetailRow}>
                    <i className="fas fa-clock" />
                    <span>{wsTime}</span>
                  </div>
                )}
                {wsMode && (
                  <div className={styles.wsDetailRow}>
                    <i className="fas fa-laptop-house" />
                    <span>{wsMode}</span>
                  </div>
                )}
              </div>

              <div className={styles.wsPerforation} />

              <div className={styles.summaryLines}>
                <div className={styles.summaryLine}>
                  <span>
                    Workshop Fee <em>(one-time)</em>
                  </span>
                  <span className={styles.summaryLineAmount}>₹{amountINR}</span>
                </div>
              </div>

              <div className={styles.summaryTotal}>
                <span>Total Due</span>
                <strong>₹{amountINR}</strong>
              </div>

              <div className={styles.summaryProof}>
                <i className="fas fa-fire" />
                <span>Limited seats — lock yours now</span>
              </div>
            </div>
          ) : (
            <div className={`${styles.summary} ${styles.summaryCourse}`}>
              <div className={styles.summaryHeader}>
                <i className="fas fa-check-circle" />
                <span>Enrollment</span>
              </div>

              <div className={styles.courseHero}>
                <div className={styles.courseHeroIcon}>
                  <i className="fas fa-graduation-cap" />
                </div>
                <strong className={styles.courseHeroTitle}>{itemTitle}</strong>
                <div className={styles.courseHeroChips}>
                  {COURSE_INCLUDES.map((c) => (
                    <span key={c.label} className={styles.courseHeroChip}>
                      <i className={c.icon} /> {c.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.summaryTotal}>
                <span>Registration fee</span>
                <strong>₹{amountINR}</strong>
              </div>

              <div className={styles.summaryProof}>
                <i className="fas fa-users" />
                <span>{enrolledNum}+ learners already enrolled</span>
              </div>
            </div>
          )}

          {/* Payment Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>{isWorkshop ? "Confirm Your Spot" : "Complete Your Enrollment"}</h2>
            </div>

            <div className={styles.studentRecap}>
              <div className={styles.studentAvatar}>
                {paymentData.user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className={styles.studentInfo}>
                <strong>{paymentData.user.name}</strong>
                <span>{paymentData.user.email}</span>
              </div>
              <i
                className={`fas fa-check-circle ${styles.studentRecapCheck}`}
                aria-hidden="true"
              />
            </div>

            {paymentError && (
              <div role="alert" className={styles.errorBanner}>
                <i className="fas fa-exclamation-triangle" />
                <span>{paymentError}</span>
              </div>
            )}

            <button
              className={styles.payBtn}
              onClick={openRazorpay}
              disabled={isProcessing}
            >
              <i className={isWorkshop ? "fas fa-bolt" : "fas fa-lock"} />
              {isWorkshop
                ? `Reserve Seat · ₹${amountINR}`
                : `Pay ₹${amountINR} Securely`}
            </button>

            <div className={styles.trustStrip}>
              <span className={styles.trustStripItem}>
                <i className="fas fa-lock" /> Razorpay encrypted
              </span>
              <span className={styles.trustStripDot}>·</span>
              <a
                href="/refund-policy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.trustStripItem}
              >
                <i className="fas fa-undo" /> 24-hr refund
              </a>
              <span className={styles.trustStripDot}>·</span>
              <a
                href={`https://wa.me/918882641988?text=${encodeURIComponent(
                  "Hi! I have a question about " + itemTitle + ".",
                )}`}
                target="_blank"
                rel="noreferrer"
                className={`${styles.trustStripItem} ${styles.trustStripWa}`}
              >
                <i className="fab fa-whatsapp" /> Need help?
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
