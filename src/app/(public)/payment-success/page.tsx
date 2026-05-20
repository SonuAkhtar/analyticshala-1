"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./paymentSuccess.module.css";

/* ── Types ── */
interface SuccessData {
  type: "course" | "workshop";
  name: string;
  email: string;
  phone?: string;
  title: string;
  amountINR: string;
  paymentId: string;
  workshopDate?: string;
  workshopTime?: string;
  workshopMode?: string;
  saveOk?: boolean;
  emailOk?: boolean;
}

function SaveFailedBanner({
  paymentId,
  title,
}: {
  paymentId: string;
  title: string;
}) {
  const waUrl = `https://wa.me/918882641988?text=${encodeURIComponent(
    `Hi! My payment for "${title}" went through but I think my registration didn't save. Payment ID: ${paymentId}`,
  )}`;
  return (
    <div
      role="alert"
      style={{
        background: "#fffbeb",
        border: "1px solid #fcd34d",
        color: "#92400e",
        padding: "16px 18px",
        borderRadius: 10,
        margin: "0 auto 24px",
        maxWidth: 560,
        fontSize: 14,
        lineHeight: 1.5,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
          fontWeight: 600,
        }}
      >
        <i className="fas fa-exclamation-triangle" />
        Your payment went through - but please contact us
      </div>
      <p style={{ margin: "0 0 10px" }}>
        We had trouble saving your registration automatically. Don&apos;t worry,
        your money is safe. Please WhatsApp us with the Payment ID below and
        we&apos;ll get you enrolled within minutes.
      </p>
      <code
        style={{
          display: "inline-block",
          background: "#fff",
          padding: "4px 8px",
          borderRadius: 6,
          fontSize: 12,
          marginBottom: 10,
        }}
      >
        {paymentId}
      </code>
      <div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "#25D366",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: 6,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          <i className="fab fa-whatsapp" /> Contact Support on WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ── Confetti ── */
const COLORS = [
  "#f97316",
  "#16a34a",
  "#4f46e5",
  "#f59e0b",
  "#10b981",
  "#ec4899",
];

function Confetti() {
  const pieces = useRef(
    Array.from({ length: 48 }, (_, i) => ({
      color: COLORS[i % COLORS.length],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.8}s`,
      dur: `${1.2 + Math.random() * 0.8}s`,
      rotate: `${Math.random() * 360}deg`,
    })),
  );
  return (
    <div className={styles.confetti} aria-hidden="true">
      {pieces.current.map((p, i) => (
        <span
          key={i}
          className={styles.confettiPiece}
          style={
            {
              "--color": p.color,
              "--left": p.left,
              "--delay": p.delay,
              "--dur": p.dur,
              "--rotate": p.rotate,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ── Course steps ── */
const COURSE_STEPS = [
  {
    icon: "fas fa-envelope",
    label: "Check your email",
    desc: "Enrollment confirmation has been sent to your inbox.",
  },
  {
    icon: "fab fa-whatsapp",
    label: "Join our WhatsApp group",
    desc: "Batch updates, materials, and class links are shared there.",
    cta: { href: "https://wa.me/918882641988", text: "Join Now" },
  },
  {
    icon: "fas fa-calendar-check",
    label: "Attend your first session",
    desc: "Your mentor will share the class link 1 hour before.",
  },
  {
    icon: "fas fa-book-open",
    label: "Start preparing",
    desc: "A pre-course reading list will be emailed to you soon.",
  },
];

/* ── Workshop steps ── */
const WORKSHOP_STEPS = [
  {
    icon: "fas fa-envelope",
    label: "Check your email",
    desc: "Workshop confirmation sent to your inbox.",
  },
  {
    icon: "fab fa-whatsapp",
    label: "Join the session group",
    desc: "Get the live link and last-minute updates.",
    cta: { href: "https://wa.me/918882641988", text: "Join Now" },
  },
  {
    icon: "fas fa-laptop",
    label: "Keep your device ready",
    desc: "Laptop recommended - we'll do live hands-on exercises.",
  },
];

/* ── Course Success ── */
function CourseSuccess({ data }: { data: SuccessData }) {
  const firstName = data.name.split(" ")[0] || "there";
  return (
    <div className={styles.psCourse}>
      <Confetti />
      {data.saveOk === false && (
        <SaveFailedBanner paymentId={data.paymentId} title={data.title} />
      )}
      <div className={styles.psCourseCard}>
        <div className={styles.psCourseHero}>
          <div className={styles.psCourseIconRing} />
          <div className={styles.psCourseIcon}>
            <i className="fas fa-graduation-cap" />
          </div>
          <h1 className={styles.psCourseHeading}>
            Your Learning Journey Begins!
          </h1>
          <p className={styles.psCourseSub}>
            Welcome aboard, <strong>{firstName}</strong>!
          </p>
        </div>

        <div className={styles.psCourseBody}>
          <div className={styles.psCourseProgram}>
            <span className={styles.psCourseProgramLabel}>Enrolled in</span>
            <strong className={styles.psCourseProgramName}>{data.title}</strong>
          </div>

          <div className={styles.psCourseMeta}>
            {data.amountINR && (
              <div className={styles.psCourseMetaItem}>
                <span className={styles.psCourseMetaLabel}>Amount Paid</span>
                <strong
                  className={`${styles.psCourseMetaValue} ${styles.psCourseMetaValueGreen}`}
                >
                  ₹{data.amountINR}
                </strong>
              </div>
            )}
            {data.email && (
              <div className={styles.psCourseMetaItem}>
                <span className={styles.psCourseMetaLabel}>
                  Confirmation sent to
                </span>
                <strong className={styles.psCourseMetaValue}>
                  {data.email}
                </strong>
              </div>
            )}
            {data.paymentId && (
              <div
                className={`${styles.psCourseMetaItem} ${styles.psCourseMetaItemFull}`}
              >
                <span className={styles.psCourseMetaLabel}>Payment ID</span>
                <code className={styles.psCoursePaymentId}>
                  {data.paymentId}
                </code>
              </div>
            )}
          </div>

          <div className={styles.psCourseSteps}>
            <p className={styles.psCourseStepsLabel}>What happens next?</p>
            {COURSE_STEPS.map((step, i) => (
              <div key={i} className={styles.psCourseStep}>
                <div className={styles.psCourseStepIcon}>
                  <i className={step.icon} />
                </div>
                <div className={styles.psCourseStepBody}>
                  <strong>{step.label}</strong>
                  <span>{step.desc}</span>
                  {step.cta && (
                    <a
                      href={step.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.psCourseStepCta}
                    >
                      <i className="fab fa-whatsapp" /> {step.cta.text}{" "}
                      <i className="fas fa-arrow-right" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.psCourseActions}>
            <Link href="/courses" className={styles.psCourseBtnPrimary}>
              Explore More Courses <i className="fas fa-arrow-right" />
            </Link>
            <Link href="/" className={styles.psCourseBtnGhost}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Workshop Success ── */
function WorkshopSuccess({ data }: { data: SuccessData }) {
  const firstName = data.name.split(" ")[0] || "there";
  return (
    <div className={styles.psWorkshop}>
      <Confetti />
      {data.saveOk === false && (
        <SaveFailedBanner paymentId={data.paymentId} title={data.title} />
      )}
      <div className={styles.psWsCard}>
        <div className={styles.psWsHeader}>
          <div className={styles.psWsCheck}>
            <i className="fas fa-check" />
          </div>
          <p className={styles.psWsEyebrow}>Registration Confirmed</p>
          <h1 className={styles.psWsHeading}>
            You&apos;re In! See You There 🎯
          </h1>
          <p className={styles.psWsWelcome}>
            Hey <strong>{firstName}</strong>, your seat is reserved.
          </p>
        </div>

        <div className={styles.psWsTicket}>
          <div className={styles.psWsTicketPerforation} />
          <div className={styles.psWsTicketBody}>
            <div className={styles.psWsTicketTitle}>{data.title}</div>
            <div className={styles.psWsTicketDetails}>
              {data.workshopDate && (
                <div className={styles.psWsTicketDetail}>
                  <i className="fas fa-calendar-alt" />
                  <span>{data.workshopDate}</span>
                </div>
              )}
              {data.workshopTime && (
                <div className={styles.psWsTicketDetail}>
                  <i className="fas fa-clock" />
                  <span>{data.workshopTime}</span>
                </div>
              )}
              {data.workshopMode && (
                <div className={styles.psWsTicketDetail}>
                  <i className="fas fa-laptop-house" />
                  <span>{data.workshopMode}</span>
                </div>
              )}
              {data.email && (
                <div className={styles.psWsTicketDetail}>
                  <i className="fas fa-envelope" />
                  <span>{data.email}</span>
                </div>
              )}
            </div>
            <div className={styles.psWsTicketFooter}>
              {data.amountINR && (
                <div className={styles.psWsAmount}>
                  <span>Paid</span>
                  <strong>₹{data.amountINR}</strong>
                </div>
              )}
              {data.paymentId && (
                <code className={styles.psWsPaymentId}>{data.paymentId}</code>
              )}
            </div>
          </div>
        </div>

        <div className={styles.psWsSteps}>
          {WORKSHOP_STEPS.map((step, i) => (
            <div key={i} className={styles.psWsStep}>
              <div className={styles.psWsStepIcon}>
                <i className={step.icon} />
              </div>
              <div className={styles.psWsStepBody}>
                <strong>{step.label}</strong>
                <span>{step.desc}</span>
                {step.cta && (
                  <a
                    href={step.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.psWsStepCta}
                  >
                    <i className="fab fa-whatsapp" /> {step.cta.text}{" "}
                    <i className="fas fa-arrow-right" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.psWsActions}>
          <Link href="/workshops" className={styles.psWsBtnPrimary}>
            Explore More Workshops <i className="fas fa-arrow-right" />
          </Link>
          <Link href="/" className={styles.psWsBtnGhost}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function PaymentSuccessPage() {
  const router = useRouter();
  const [data, setData] = useState<SuccessData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = sessionStorage.getItem("paymentSuccess");
      if (raw) {
        setData(JSON.parse(raw));
        // Keep in session storage in case user refreshes
      } else {
        router.replace("/");
      }
    } catch {
      router.replace("/");
    }
  }, [router]);

  if (!mounted || !data) return null;

  if (data.type === "workshop") return <WorkshopSuccess data={data} />;
  return <CourseSuccess data={data} />;
}
