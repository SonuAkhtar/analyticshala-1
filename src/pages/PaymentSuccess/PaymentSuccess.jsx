import { Link, useLocation } from "react-router-dom";
import "./PaymentSuccess.css";

const Confetti = () => {
  const COLORS = [
    "#f97316",
    "#16a34a",
    "#4f46e5",
    "#f59e0b",
    "#10b981",
    "#ec4899",
  ];
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 48 }).map((_, i) => (
        <span
          key={i}
          className="confetti__piece"
          style={{
            "--color": COLORS[i % COLORS.length],
            "--left": `${Math.random() * 100}%`,
            "--delay": `${Math.random() * 0.8}s`,
            "--dur": `${1.2 + Math.random() * 0.8}s`,
            "--rotate": `${Math.random() * 360}deg`,
          }}
        />
      ))}
    </div>
  );
};

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
    desc: "Laptop recommended — we'll do live hands-on exercises.",
  },
];

const CourseSuccess = ({ name, email, title, amountINR, paymentId }) => (
  <div className="ps ps--course">
    <Confetti />
    <div className="ps__card ps__card--course">
      <div className="ps__course-hero">
        <div className="ps__course-icon-ring" />
        <div className="ps__course-icon">
          <i className="fas fa-graduation-cap" />
        </div>
        <h1 className="ps__course-heading">Your Learning Journey Begins!</h1>
        <p className="ps__course-sub">
          Welcome aboard, <strong>{name.split(" ")[0]}</strong>!
        </p>
      </div>

      <div className="ps__course-program">
        <span className="ps__course-program-label">Enrolled in</span>
        <strong className="ps__course-program-name">{title}</strong>
      </div>

      <div className="ps__course-meta">
        {amountINR && (
          <div className="ps__course-meta-item">
            <span className="ps__course-meta-label">Amount Paid</span>
            <strong className="ps__course-meta-value ps__course-meta-value--green">
              ₹{amountINR}
            </strong>
          </div>
        )}
        {email && (
          <div className="ps__course-meta-item">
            <span className="ps__course-meta-label">Confirmation sent to</span>
            <strong className="ps__course-meta-value">{email}</strong>
          </div>
        )}
        {paymentId && (
          <div className="ps__course-meta-item ps__course-meta-item--full">
            <span className="ps__course-meta-label">Payment ID</span>
            <code className="ps__course-payment-id">{paymentId}</code>
          </div>
        )}
      </div>

      <div className="ps__course-steps">
        <p className="ps__course-steps-label">What happens next?</p>
        {COURSE_STEPS.map((step, i) => (
          <div key={i} className="ps__course-step">
            <div className="ps__course-step-icon">
              <i className={step.icon} />
            </div>
            <div className="ps__course-step-body">
              <strong>{step.label}</strong>
              <span>{step.desc}</span>
              {step.cta && (
                <a
                  href={step.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ps__course-step-cta"
                >
                  <i className="fab fa-whatsapp" /> {step.cta.text}{" "}
                  <i className="fas fa-arrow-right" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="ps__course-actions">
        <Link to="/courses" className="ps__course-btn ps__course-btn--primary">
          Explore More Courses <i className="fas fa-arrow-right" />
        </Link>
        <Link to="/" className="ps__course-btn ps__course-btn--ghost">
          Back to Home
        </Link>
      </div>
    </div>
  </div>
);

const WorkshopSuccess = ({
  name,
  email,
  title,
  amountINR,
  paymentId,
  workshopDate,
  workshopTime,
  workshopMode,
}) => (
  <div className="ps ps--workshop">
    <Confetti />
    <div className="ps__ws-card">
      <div className="ps__ws-header">
        <div className="ps__ws-check">
          <i className="fas fa-check" />
        </div>
        <p className="ps__ws-eyebrow">Registration Confirmed</p>
        <h1 className="ps__ws-heading">You&apos;re In! See You There 🎯</h1>
        <p className="ps__ws-welcome">
          Hey <strong>{name.split(" ")[0]}</strong>, your seat is reserved.
        </p>
      </div>

      <div className="ps__ws-ticket">
        <div className="ps__ws-ticket-perforation" />
        <div className="ps__ws-ticket-body">
          <div className="ps__ws-ticket-title">{title}</div>

          <div className="ps__ws-ticket-details">
            {workshopDate && (
              <div className="ps__ws-ticket-detail">
                <i className="fas fa-calendar-alt" />
                <span>{workshopDate}</span>
              </div>
            )}
            {workshopTime && (
              <div className="ps__ws-ticket-detail">
                <i className="fas fa-clock" />
                <span>{workshopTime}</span>
              </div>
            )}
            {workshopMode && (
              <div className="ps__ws-ticket-detail">
                <i className="fas fa-laptop-house" />
                <span>{workshopMode}</span>
              </div>
            )}
            {email && (
              <div className="ps__ws-ticket-detail">
                <i className="fas fa-envelope" />
                <span>{email}</span>
              </div>
            )}
          </div>

          <div className="ps__ws-ticket-footer">
            {amountINR && (
              <div className="ps__ws-amount">
                <span>Paid</span>
                <strong>₹{amountINR}</strong>
              </div>
            )}
            {paymentId && (
              <code className="ps__ws-payment-id">{paymentId}</code>
            )}
          </div>
        </div>
      </div>

      <div className="ps__ws-steps">
        {WORKSHOP_STEPS.map((step, i) => (
          <div key={i} className="ps__ws-step">
            <div className="ps__ws-step-icon">
              <i className={step.icon} />
            </div>
            <div className="ps__ws-step-body">
              <strong>{step.label}</strong>
              <span>{step.desc}</span>
              {step.cta && (
                <a
                  href={step.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ps__ws-step-cta"
                >
                  <i className="fab fa-whatsapp" /> {step.cta.text}{" "}
                  <i className="fas fa-arrow-right" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="ps__ws-actions">
        <Link to="/workshops" className="ps__ws-btn ps__ws-btn--primary">
          Explore More Workshops <i className="fas fa-arrow-right" />
        </Link>
        <Link to="/" className="ps__ws-btn ps__ws-btn--ghost">
          Back to Home
        </Link>
      </div>
    </div>
  </div>
);

const PaymentSuccess = () => {
  const { state } = useLocation();
  if (!state) return null;
  if (state.type === "workshop") return <WorkshopSuccess {...state} />;
  return <CourseSuccess {...state} />;
};

export default PaymentSuccess;
