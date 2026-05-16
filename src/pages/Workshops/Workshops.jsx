import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import "./workshops.css";
import { workshopData } from "../../../appData";

const parseDate = (dateStr = "") => {
  // "March 29, Saturday"  →  { day:"29", month:"MAR", dayName:"SAT" }
  const parts = dateStr.split(", ");
  const [monthDay, dayName = ""] = parts;
  const tokens = monthDay.split(" ");
  return {
    month: (tokens[0] || "").slice(0, 3).toUpperCase(),
    day: tokens[1] || "",
    dayName: dayName.slice(0, 3).toUpperCase(),
  };
};

const getSeatPct = (left, total) =>
  total ? Math.round(((total - left) / total) * 100) : 0;

const getNextSaturday = () => {
  const now = new Date();
  const day = now.getDay();
  const daysUntil = day === 6 ? 7 : 6 - day;
  const sat = new Date(now);
  sat.setDate(now.getDate() + daysUntil);
  sat.setHours(10, 0, 0, 0);
  return sat;
};

const pad = (n) => String(n).padStart(2, "0");

const useCountdown = (target) => {
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return {
      d: pad(Math.floor(diff / 86400000)),
      h: pad(Math.floor((diff % 86400000) / 3600000)),
      m: pad(Math.floor((diff % 3600000) / 60000)),
      s: pad(Math.floor((diff % 60000) / 1000)),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
};

const AVATAR_SEEDS = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=2",
  "https://i.pravatar.cc/40?img=3",
  "https://i.pravatar.cc/40?img=5",
  "https://i.pravatar.cc/40?img=7",
];

const trustPoints = [
  {
    icon: "fas fa-chalkboard-teacher",
    title: "Industry Experts",
    desc: "Taught by working professionals with real-world experience.",
  },
  {
    icon: "fas fa-certificate",
    title: "Certificate Included",
    desc: "Verifiable certificate that actually impresses recruiters.",
  },
  {
    icon: "fas fa-laptop",
    title: "Online & Offline",
    desc: "Flexible modes - attend live or watch recordings anytime.",
  },
  {
    icon: "fas fa-headset",
    title: "Post-Workshop Support",
    desc: "Direct mentor access after class - no ghosting, ever.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] },
});

const FeaturedTicket = ({ workshop }) => {
  const { month, day, dayName } = parseDate(workshop.date);
  const pct = getSeatPct(workshop.seatsLeft, workshop.totalSeats);
  const urgent = workshop.seatsLeft != null && workshop.seatsLeft <= 5;

  return (
    <div className="workshops-page__featured-ticket">
      <div className="workshops-page__featured-ticket-label">
        <span className="workshops-page__status workshops-page__status--upcoming">
          UPCOMING
        </span>
      </div>

      <div className="workshops-page__featured-ticket-body">
        {/* Date badge */}
        <div className="workshops-page__featured-date">
          <span className="workshops-page__featured-month">{month}</span>
          <span className="workshops-page__featured-day">{day}</span>
          {dayName && (
            <span className="workshops-page__featured-dayname">{dayName}</span>
          )}
        </div>

        {/* Content */}
        <div className="workshops-page__featured-info">
          <h3 className="workshops-page__featured-title">{workshop.title}</h3>
          <div className="workshops-page__featured-meta">
            <span>
              <i className="fas fa-clock" /> {workshop.time}
            </span>
            <span>
              <i className="fas fa-hourglass-half" /> {workshop.duration}
            </span>
          </div>

          {workshop.seatsLeft != null && workshop.totalSeats && (
            <div className="workshops-page__featured-seats">
              <div className="workshops-page__seats-bar">
                <div
                  className={`workshops-page__seats-fill${urgent ? " workshops-page__seats-fill--urgent" : ""}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span
                className={urgent ? "workshops-page__seats-txt--urgent" : ""}
              >
                {workshop.seatsLeft} seats left
              </span>
            </div>
          )}

          <Link
            to={`/workshop-details?id=${workshop.id}`}
            className="workshops-page__featured-cta"
          >
            Reserve Your Seat <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const TicketCard = ({ workshop, onWaitlist }) => {
  const { month, day, dayName } = parseDate(workshop.date);
  const pct = getSeatPct(workshop.seatsLeft, workshop.totalSeats);
  const urgent = workshop.seatsLeft != null && workshop.seatsLeft <= 5;

  const statusLabel =
    workshop.seatsLeft === 0 ? "FULL" : urgent ? "LAST SEATS" : "UPCOMING";
  const statusClass =
    workshop.seatsLeft === 0
      ? "workshops-page__status--past"
      : urgent
        ? "workshops-page__status--live"
        : "workshops-page__status--upcoming";

  return (
    <div className="workshops-page__ticket">
      {/* Date badge column */}
      <div className="workshops-page__ticket-date">
        <span className="workshops-page__ticket-month">{month}</span>
        <span className="workshops-page__ticket-day">{day}</span>
        {dayName && (
          <span className="workshops-page__ticket-dayname">{dayName}</span>
        )}
      </div>

      {/* Dashed perforation */}
      <div className="workshops-page__ticket-divider" />

      {/* Content area */}
      <div className="workshops-page__ticket-body">
        <div className="workshops-page__ticket-top">
          <span className={`workshops-page__status ${statusClass}`}>
            {statusLabel}
          </span>
          {workshop.level && (
            <span className="workshops-page__ticket-level">
              {workshop.level}
            </span>
          )}
        </div>

        <h3 className="workshops-page__ticket-title">{workshop.title}</h3>
        <p className="workshops-page__ticket-desc">{workshop.desc}</p>

        {workshop.instructor && (
          <div className="workshops-page__ticket-instructor">
            <i className="fas fa-user-tie" /> {workshop.instructor}
          </div>
        )}

        <div className="workshops-page__ticket-strip">
          <div className="workshops-page__ticket-chips">
            <span>
              <i className="fas fa-clock" /> {workshop.time}
            </span>
            <span>
              <i className="fas fa-hourglass-half" /> {workshop.duration}
            </span>
            {workshop.eventMode?.map((m, i) => (
              <span key={i} className="workshops-page__mode-chip">
                {m}
              </span>
            ))}
          </div>

          <div className="workshops-page__ticket-right">
            {workshop.seatsLeft != null && workshop.totalSeats && (
              <div className="workshops-page__seats-row">
                <div className="workshops-page__seats-bar">
                  <div
                    className={`workshops-page__seats-fill${urgent ? " workshops-page__seats-fill--urgent" : ""}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span
                  className={`workshops-page__seats-txt${urgent ? " workshops-page__seats-txt--urgent" : ""}`}
                >
                  {workshop.seatsLeft} of {workshop.totalSeats} seats
                </span>
              </div>
            )}

            <div className="workshops-page__ticket-footer-row">
              <div className="workshops-page__ticket-price">
                <span className="workshops-page__price-now">
                  {workshop.price}
                </span>
                {workshop.originalPrice && (
                  <span className="workshops-page__price-was">
                    {workshop.originalPrice}
                  </span>
                )}
              </div>
              {workshop.seatsLeft === 0 ? (
                <button
                  className="workshops-page__ticket-cta workshops-page__ticket-cta--waitlist"
                  onClick={() => onWaitlist(workshop)}
                >
                  <i className="fas fa-bell" /> Join Waitlist
                </button>
              ) : (
                <Link
                  to={`/workshop-details?id=${workshop.id}`}
                  className="workshops-page__ticket-cta"
                >
                  Enroll Now <i className="fas fa-arrow-right" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PastCard = ({ workshop }) => (
  <div className="workshops-page__past-card">
    <div className="workshops-page__past-img">
      <img src={workshop.image} alt={workshop.title} loading="lazy" />
      <div className="workshops-page__past-overlay" />
      <span className="workshops-page__status workshops-page__status--past workshops-page__status--abs">
        PAST
      </span>
      {(workshop.attendees || workshop.rating) && (
        <div className="workshops-page__past-img-stats">
          {workshop.attendees && (
            <span className="workshops-page__past-img-stat">
              <i className="fas fa-users" /> {workshop.attendees} attended
            </span>
          )}
          {workshop.rating && (
            <span className="workshops-page__past-img-stat workshops-page__past-img-stat--gold">
              <i className="fas fa-star" /> {workshop.rating}
            </span>
          )}
        </div>
      )}
    </div>
    <div className="workshops-page__past-body">
      <span className="workshops-page__past-cat">{workshop.category}</span>
      <h4 className="workshops-page__past-title">{workshop.title}</h4>
      <div className="workshops-page__past-meta">
        <span>
          <i className="fas fa-calendar-alt" /> {workshop.date}
        </span>
        {workshop.duration && (
          <span>
            <i className="fas fa-clock" /> {workshop.duration}
          </span>
        )}
      </div>
    </div>
  </div>
);

const WaitlistModal = ({ workshop, onClose }) => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setErr(true);
      return;
    }
    // Fire-and-forget to WhatsApp (no backend yet)
    const msg = encodeURIComponent(
      `Hi! I'd like to join the waitlist for "${workshop.title}". My email: ${email}`,
    );
    window.open(
      `https://wa.me/918882641988?text=${msg}`,
      "_blank",
      "noopener,noreferrer",
    );
    setDone(true);
  };

  return (
    <div className="wl-overlay" onClick={onClose}>
      <div className="wl-modal" onClick={(e) => e.stopPropagation()}>
        <button className="wl-modal__close" onClick={onClose}>
          <i className="fas fa-times" />
        </button>
        {done ? (
          <div className="wl-modal__done">
            <i className="fas fa-check-circle" />
            <p>
              You&apos;re on the list! We&apos;ll ping you when seats open for{" "}
              <strong>{workshop.title}</strong>.
            </p>
          </div>
        ) : (
          <>
            <div className="wl-modal__icon">
              <i className="fas fa-bell" />
            </div>
            <h3 className="wl-modal__title">Join the Waitlist</h3>
            <p className="wl-modal__sub">
              <strong>{workshop.title}</strong> is currently full. Drop your
              email and we&apos;ll notify you when seats open.
            </p>
            <form className="wl-modal__form" onSubmit={submit} noValidate>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErr(false);
                }}
                className={err ? "wl-modal__input--error" : ""}
                aria-label="Email for waitlist"
              />
              <button type="submit">
                Notify Me <i className="fas fa-arrow-right" />
              </button>
            </form>
            {err && (
              <p className="wl-modal__err">
                <i className="fas fa-exclamation-circle" /> Enter a valid email.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Workshops = () => {
  const countdown = useCountdown(getNextSaturday().getTime());
  const featured = workshopData.upcoming[0];

  /* Derive unique categories */
  const allCategories = [
    "All",
    ...new Set(workshopData.upcoming.map((w) => w.category).filter(Boolean)),
  ];
  const [activeFilter, setActiveFilter] = useState("All");
  const [waitlistWorkshop, setWaitlistWorkshop] = useState(null);

  const filteredWorkshops =
    activeFilter === "All"
      ? workshopData.upcoming
      : workshopData.upcoming.filter((w) => w.category === activeFilter);

  return (
    <div className="workshops-page">
      <Helmet>
        <title>Live Workshops &amp; Bootcamps | AnalyticShala</title>
        <meta
          name="description"
          content="Join live weekend workshops in Data Analytics, Python, SQL, Power BI & AI. Small batches, real projects, industry experts. Register for upcoming bootcamps."
        />
        <meta
          property="og:title"
          content="Live Workshops & Bootcamps | AnalyticShala"
        />
        <meta
          property="og:description"
          content="Hands-on workshops led by industry professionals. Small batches. Real projects. Job-ready results. Upcoming sessions filling fast."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://analyticshala.in/workshops" />
      </Helmet>
      <section className="workshops-page__hero">
        <div className="workshops-page__hero-orb" />

        <div className="container workshops-page__hero-inner">
          {/* Left */}
          <div className="workshops-page__hero-left">
            <motion.span className="workshops-page__eyebrow" {...fadeUp(0)}>
              <i className="fas fa-bolt" /> Live Workshops &amp; Bootcamps
            </motion.span>

            <motion.h1
              className="workshops-page__hero-heading"
              {...fadeUp(0.08)}
            >
              Weekend Sprints.
              <br />
              <span className="workshops-page__gradient-text">
                Real Skills. Zero Fluff.
              </span>
            </motion.h1>

            <motion.p className="workshops-page__hero-sub" {...fadeUp(0.14)}>
              Hands-on workshops led by industry professionals - Data Analytics,
              Python, SQL, Power BI &amp; AI. Small batches. Real projects.
              Job-ready results.
            </motion.p>

            <motion.p
              className="workshops-page__hero-spoiler"
              {...fadeUp(0.19)}
            >
              <em>&ldquo;Spoiler: our alumni get jobs. Your turn? 👀&rdquo;</em>
            </motion.p>

            <motion.div
              className="workshops-page__hero-actions"
              {...fadeUp(0.24)}
            >
              <a href="#upcoming" className="workshops-page__btn--primary">
                Browse Workshops <i className="fas fa-arrow-down" />
              </a>
              <a
                href="https://wa.me/918882641988"
                target="_blank"
                rel="noopener noreferrer"
                className="workshops-page__btn--ghost"
              >
                <i className="fab fa-whatsapp" /> Chat with Us
              </a>
            </motion.div>
          </div>

          {/* Right - Featured Ticket */}
          <motion.div
            className="workshops-page__hero-right"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <FeaturedTicket workshop={featured} />
          </motion.div>
        </div>
      </section>

      <div className="workshops-page__countdown">
        <span className="workshops-page__countdown-label-main">
          <i className="fas fa-circle" /> NEXT WORKSHOP STARTS IN
        </span>
        <div className="workshops-page__countdown-units">
          {[
            { val: countdown.d, lbl: "DAYS" },
            { val: countdown.h, lbl: "HRS" },
            { val: countdown.m, lbl: "MIN" },
            { val: countdown.s, lbl: "SEC" },
          ].map(({ val, lbl }, i) => (
            <div key={i} className="workshops-page__countdown-unit">
              <span className="workshops-page__countdown-num">{val}</span>
              <span className="workshops-page__countdown-sub">{lbl}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="workshops-page__trust">
        <div className="container workshops-page__trust-inner">
          {trustPoints.map((t, i) => (
            <motion.div
              key={i}
              className="workshops-page__trust-item"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.38 }}
            >
              <div className="workshops-page__trust-icon">
                <i className={t.icon} />
              </div>
              <div>
                <strong>{t.title}</strong>
                <p>{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="workshops-page__upcoming" id="upcoming">
        <div className="container">
          <motion.span
            className="workshops-page__section-eyebrow"
            {...fadeUp(0)}
          >
            <i className="fas fa-calendar-check" /> Upcoming Workshops
          </motion.span>

          <motion.h2
            className="workshops-page__section-title"
            {...fadeUp(0.07)}
          >
            Enroll Before Seats Fill Up
          </motion.h2>
          <motion.p className="workshops-page__section-sub" {...fadeUp(0.12)}>
            All workshops run in small batches -ensuring personalised attention
            and a high-quality experience for every participant.
          </motion.p>

          {/* Category filter bar */}
          <motion.div className="workshops-page__filter-bar" {...fadeUp(0.16)}>
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={`workshops-page__filter-chip${activeFilter === cat ? " workshops-page__filter-chip--active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {filteredWorkshops.length === 0 ? (
            <div className="workshops-page__empty">
              <i className="fas fa-calendar-times" />
              <p>
                No upcoming workshops in <strong>{activeFilter}</strong> right
                now.
              </p>
              <button
                className="workshops-page__filter-chip"
                onClick={() => setActiveFilter("All")}
              >
                View All Workshops
              </button>
            </div>
          ) : (
            <div className="workshops-page__grid">
              {filteredWorkshops.map((w, i) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <TicketCard workshop={w} onWaitlist={setWaitlistWorkshop} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="workshops-page__community">
        <div className="container workshops-page__community-inner">
          <div className="workshops-page__avatar-stack">
            {AVATAR_SEEDS.map((src, i) => (
              <img key={i} src={src} alt="Alumni" />
            ))}
          </div>
          <p>
            Join <strong>500+ learners</strong> already in our community
          </p>
          <a
            href="https://wa.me/918882641988"
            target="_blank"
            rel="noopener noreferrer"
            className="workshops-page__community-btn"
          >
            <i className="fab fa-whatsapp" /> Join on WhatsApp
          </a>
        </div>
      </div>

      <section className="workshops-page__past">
        <div className="container">
          <motion.span
            className="workshops-page__section-eyebrow"
            {...fadeUp(0)}
          >
            <i className="fas fa-history" /> Past Workshops
          </motion.span>
          <motion.h2
            className="workshops-page__section-title"
            {...fadeUp(0.07)}
          >
            Over 500 Students Already Trained
          </motion.h2>
          <motion.p className="workshops-page__section-sub" {...fadeUp(0.12)}>
            Miss a live session? Here&apos;s what past students experienced.{" "}
            <em>(They&apos;re basically legends now.)</em>
          </motion.p>

          <motion.div
            className="workshops-page__past-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {workshopData.previous.map((w) => (
              <motion.div
                key={w.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <PastCard workshop={w} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="workshops-page__cta">
        <div className="container workshops-page__cta-inner">
          <motion.span
            className="workshops-page__eyebrow workshops-page__eyebrow--inv"
            {...fadeUp(0)}
          >
            <i className="fas fa-star" /> Not Sure Where to Start?
          </motion.span>
          <motion.h2 className="workshops-page__cta-heading" {...fadeUp(0.08)}>
            Let Us Find the Right
            <br />
            Workshop for You
          </motion.h2>
          <motion.p className="workshops-page__cta-sub" {...fadeUp(0.14)}>
            Our mentors will assess your goals and recommend the perfect
            starting point - completely free, no pressure.
          </motion.p>
          <motion.div className="workshops-page__cta-actions" {...fadeUp(0.2)}>
            <a
              href="https://wa.me/918882641988?text=Hi%2C%20I%27d%20like%20to%20know%20which%20workshop%20is%20best%20for%20me."
              target="_blank"
              rel="noopener noreferrer"
              className="workshops-page__cta-btn"
            >
              <i className="fab fa-whatsapp" /> Get Free Guidance
            </a>
            <Link to="/aboutUs" className="workshops-page__cta-link">
              Learn About Us <i className="fas fa-arrow-right" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Waitlist modal */}
      {waitlistWorkshop && (
        <WaitlistModal
          workshop={waitlistWorkshop}
          onClose={() => setWaitlistWorkshop(null)}
        />
      )}
    </div>
  );
};

export default Workshops;
