import "./Payment.css";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  RAZORPAY_KEY_ID,
  EMAILJS_SERVICE_ID,
  EMAILJS_REG_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from "../../config";
import { supabase } from "../../lib/supabase";
import { useLocation, useNavigate } from "react-router-dom";

const toINR = (paise) => (paise / 100).toLocaleString("en-IN");

const TRUST_BADGES = [
  { icon: "fas fa-lock", label: "256-bit SSL" },
  { icon: "fas fa-shield-alt", label: "Secure Payment" },
  { icon: "fas fa-undo", label: "24-hr Refund" },
];

const ENROLLED_COUNT = {
  ai: 284,
  agentic: 143,
  rag: 97,
  analytics: 312,
  datascience: 198,
  sql: 426,
  excel: 389,
};

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!state) {
    navigate("/");
    return null;
  }

  const itemTitle =
    state.user?.courseTitle ||
    state.user?.workshopTitle ||
    "AnalyticShala Program";
  const amountINR = toINR(state.amount);
  const courseId = state.user?.courseId;
  const enrolledNum = ENROLLED_COUNT[courseId] || 142;

  const openRazorpay = () => {
    if (!RAZORPAY_KEY_ID) {
      alert("Razorpay key missing.");
      return;
    }

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: state.amount,
      currency: "INR",
      name: "AnalyticShala",
      description: itemTitle,
      ...(state.orderId ? { order_id: state.orderId } : {}),
      image: "/favicon.ico",

      prefill: {
        name: state.user.name,
        email: state.user.email,
        contact: state.user.phone,
      },

      handler: async function (response) {
        setIsProcessing(true);
        const waDate = new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        try {
          if (supabase) {
            await supabase.from("registrations").insert({
              type: state.user.courseId ? "course" : "workshop",
              item_id: state.user.courseId || state.user.workshopId || "",
              item_title: itemTitle,
              name: state.user.name,
              email: state.user.email,
              phone: state.user.phone,
              age: state.user.age || null,
              experience: state.user.experience || null,
              goal: state.user.goal || null,
              status: state.user.status || null,
              mode: state.user.mode || null,
              analyticshala_student: state.user.analyticshalaStudent || null,
              amount_paise: state.amount,
              payment_id: response.razorpay_payment_id,
            });
          }
        } catch (err) {
          console.error("Supabase save failed:", err);
        }

        console.log("[EmailJS] service:", EMAILJS_SERVICE_ID || "MISSING", "| template:", EMAILJS_REG_TEMPLATE_ID || "MISSING", "| key:", EMAILJS_PUBLIC_KEY ? "set" : "MISSING");

        if (
          EMAILJS_SERVICE_ID &&
          EMAILJS_REG_TEMPLATE_ID &&
          EMAILJS_PUBLIC_KEY
        ) {
          try {
            await emailjs.send(
              EMAILJS_SERVICE_ID,
              EMAILJS_REG_TEMPLATE_ID,
              {
                to_name:    state.user.name,
                to_email:   state.user.email,
                program:    itemTitle,
                type:       state.user.courseId ? "Course" : "Workshop",
                amount:     amountINR,
                payment_id: response.razorpay_payment_id,
                phone:      state.user.phone,
                date:       waDate,
              },
              EMAILJS_PUBLIC_KEY,
            );
            console.log("[EmailJS] confirmation sent to", state.user.email);
          } catch (err) {
            console.error("[EmailJS] send failed:", err?.text || err?.message || err);
          }
        } else {
          console.warn("[EmailJS] skipped — one or more credentials are missing");
        }

        navigate("/payment-success", {
          state: {
            type: state.user.courseId ? "course" : "workshop",
            name: state.user.name,
            email: state.user.email,
            phone: state.user.phone,
            title: itemTitle,
            amountINR,
            paymentId: response.razorpay_payment_id,
            workshopDate: state.user.workshopDate || "",
            workshopTime: state.user.workshopTime || "",
            workshopMode: state.user.workshopMode || "",
          },
        });
      },

      theme: { color: "#bb1b21" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      {isProcessing && (
        <div className="payment__processing">
          <div className="payment__processing-inner">
            <div className="payment__processing-spinner" />
            <p>Confirming your enrollment…</p>
            <span>Please wait, do not close this page</span>
          </div>
        </div>
      )}
      <div className="payment">
        <div className="payment__wrap">
          <div className="payment__summary">
            <div className="payment__summary-header">
              <i className="fas fa-receipt" />
              <span>Order Summary</span>
            </div>

            <div className="payment__summary-item">
              <div className="payment__summary-item-icon">
                <i className="fas fa-graduation-cap" />
              </div>
              <div className="payment__summary-item-info">
                <span className="payment__summary-item-label">Program</span>
                <strong className="payment__summary-item-name">
                  {itemTitle}
                </strong>
              </div>
            </div>

            <div className="payment__summary-divider" />

            <div className="payment__summary-lines">
              <div className="payment__summary-line">
                <span>
                  Registration Fee <em>(due today)</em>
                </span>
                <span className="payment__summary-line-amount">
                  ₹{amountINR}
                </span>
              </div>
            </div>

            <div className="payment__summary-total">
              <span>Due Today</span>
              <strong>₹{amountINR}</strong>
            </div>

            <div className="payment__summary-proof">
              <i className="fas fa-users" />
              <span>
                {enrolledNum}+ learners already enrolled in this course
              </span>
            </div>
          </div>

          <div className="payment__card">
            <div className="payment__card-header">
              <h2>Complete Your Enrollment</h2>
              <p className="payment__subtext">
                <i className="fas fa-lock" /> Secured by Razorpay
              </p>
            </div>

            <div className="payment__student-recap">
              <div className="payment__student-avatar">
                {state.user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="payment__student-info">
                <strong>{state.user.name}</strong>
                <span>{state.user.email}</span>
              </div>
            </div>

            <button className="payment__pay-btn" onClick={openRazorpay}>
              <i className="fas fa-lock" />
              Pay ₹{amountINR} Securely
            </button>

            <p className="payment__methods">
              <i className="fab fa-google-pay" /> Google Pay &nbsp;·&nbsp;
              <i className="fas fa-credit-card" /> Card &nbsp;·&nbsp;
              <i className="fas fa-university" /> Netbanking &nbsp;·&nbsp; UPI
            </p>

            <div className="payment__trust-badges">
              {TRUST_BADGES.map((b, i) => (
                <div key={i} className="payment__trust-badge">
                  <i className={b.icon} />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/918882641988?text=${encodeURIComponent("Hi! I have a question about my enrollment for " + itemTitle + ".")}`}
              target="_blank"
              rel="noreferrer"
              className="payment__wa-help"
            >
              <i className="fab fa-whatsapp" /> Have a question? Chat with us
            </a>

            <p className="payment__policy-note">
              <i className="fas fa-info-circle" /> Full refund if cancelled
              within 24 hours of payment.{" "}
              <a
                href="/refund-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                View policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
