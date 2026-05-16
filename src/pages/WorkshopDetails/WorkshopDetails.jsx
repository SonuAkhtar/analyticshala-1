import { useState, useEffect } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { workshopData, teamData, testimonyData } from "../../../appData";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./workshopDetails.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" },
  }),
};

const parsePrice = (str) => parseInt(str.replace(/[₹,\s]/g, ""), 10);

const parseWorkshopDate = (dateStr) => {
  const months = { January:1,February:2,March:3,April:4,May:5,June:6,
    July:7,August:8,September:9,October:10,November:11,December:12 };
  const parts = (dateStr || "").split(", ");
  const [monthName, dayStr] = (parts[0] || "").split(" ");
  const month = months[monthName];
  const day = parseInt(dayStr, 10);
  if (!month || !day) return null;
  const d = new Date(new Date().getFullYear(), month - 1, day, 10, 0, 0);
  if (d < Date.now()) d.setFullYear(d.getFullYear() + 1);
  return d;
};

const useCountdown = (targetDate) => {
  const calc = () => {
    const diff = (targetDate?.getTime() || 0) - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    if (!targetDate) return;
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
};

const CountdownTimer = ({ dateStr }) => {
  const target = parseWorkshopDate(dateStr);
  const { days, hours, minutes, seconds } = useCountdown(target);
  if (!target) return null;
  return (
    <div className="wd-countdown">
      <p className="wd-countdown__label"><i className="fas fa-stopwatch" /> Workshop starts in</p>
      <div className="wd-countdown__units">
        {[{ v: days, l: "Days" }, { v: hours, l: "Hrs" }, { v: minutes, l: "Min" }, { v: seconds, l: "Sec" }].map(({ v, l }) => (
          <div key={l} className="wd-countdown__unit">
            <span className="wd-countdown__num">{String(v).padStart(2, "0")}</span>
            <span className="wd-countdown__lbl">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Build Google Calendar "Add to Event" URL */
const buildCalendarUrl = (workshop) => {
  // Attempt to parse "March 29, Saturday" → a rough date
  const parts = workshop.date?.split(", ") || [];
  const monthDay = parts[0] || "";
  const [monthName, dayStr] = monthDay.split(" ");
  const months = { January:1,February:2,March:3,April:4,May:5,June:6,
    July:7,August:8,September:9,October:10,November:11,December:12 };
  const month = months[monthName] || new Date().getMonth() + 1;
  const day   = parseInt(dayStr, 10) || new Date().getDate();
  const year  = new Date().getFullYear();

  // Parse time "10:00 AM – 1:00 PM" or "10:00 AM"
  const timeStr = workshop.time || "10:00 AM";
  const startToken = timeStr.split("–")[0].trim();
  const toHHMM = (t) => {
    const [time, meridiem] = t.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (meridiem === "PM" && h !== 12) h += 12;
    if (meridiem === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2,"0")}${String(m||0).padStart(2,"0")}`;
  };
  const startHHMM = toHHMM(startToken);
  const startDt = `${year}${String(month).padStart(2,"0")}${String(day).padStart(2,"0")}T${startHHMM}00`;
  // Default 3-hour event
  const endH = parseInt(startHHMM.slice(0,2),10) + 3;
  const endDt = `${year}${String(month).padStart(2,"0")}${String(day).padStart(2,"0")}T${String(endH).padStart(2,"0")}${startHHMM.slice(2)}00`;

  const title   = encodeURIComponent(workshop.title);
  const details = encodeURIComponent(`AnalyticShala Workshop: ${workshop.title}\n\nMore info: https://analyticshala.in/workshops/${workshop.slug || workshop.id}`);
  const loc     = encodeURIComponent(workshop.eventMode?.join(" / ") || "Online");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDt}/${endDt}&details=${details}&location=${loc}`;
};

const WorkshopDetails = () => {
  const [params] = useSearchParams();
  const { slug } = useParams();
  const id = slug
    ? (workshopData.upcoming.find(w => w.slug === slug)?.id || workshopData.upcoming[0].id)
    : Number(params.get("id"));

  const workshop =
    workshopData.upcoming.find((w) => w.id === id) || workshopData.upcoming[0];

  const instructor =
    teamData.find((t) => t.name === workshop.instructor) || teamData[1];

  const discount = Math.round(
    (1 - parsePrice(workshop.price) / parsePrice(workshop.originalPrice)) * 100
  );
  const seatFillPct = Math.round(
    ((workshop.totalSeats - workshop.seatsLeft) / workshop.totalSeats) * 100
  );
  const seatsUrgent = workshop.seatsLeft <= 5;

  const [copied, setCopied] = useState(false);
  const calUrl = buildCalendarUrl(workshop);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWA = () => {
    const msg = encodeURIComponent(
      `🔥 Check out this workshop: ${workshop.title} on ${workshop.date}\n${window.location.href}`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Helmet>
        <title>{workshop.title} | AnalyticShala Workshops</title>
        <meta name="description" content={`${workshop.title} - ${workshop.date}. ${workshop.desc.slice(0, 150)}`} />
        <meta property="og:title" content={`${workshop.title} | AnalyticShala`} />
        <meta property="og:description" content={workshop.desc.slice(0, 160)} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://analyticshala.in/workshops/${workshop.slug || workshop.id}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          "name": workshop.title,
          "description": workshop.desc,
          "startDate": workshop.date,
          "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
          "organizer": {
            "@type": "Organization",
            "name": "AnalyticShala",
            "url": "https://analyticshala.in"
          }
        })}</script>
      </Helmet>
      <Breadcrumb items={[
        { label: "Workshops", href: "/workshops" },
        { label: workshop.title },
      ]} />
    <div className="workshop-details">
      <section className="workshop-details__hero">
        <img src={workshop.image} alt={workshop.title} className="workshop-details__hero-img" />
        <div className="workshop-details__hero-overlay" />
        <div className="workshop-details__hero-content">
          <div className="workshop-details__hero-badges">
            <span
              className="workshop-details__cat-badge"
              style={{ "--cc": workshop.categoryColor }}
            >
              {workshop.category}
            </span>
            <span
              className={`workshop-details__level-badge workshop-details__level-badge--${workshop.level.toLowerCase()}`}
            >
              {workshop.level}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {workshop.title}
          </motion.h1>

          <motion.p
            className="workshop-details__hero-desc"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {workshop.desc}
          </motion.p>

          <motion.div
            className="workshop-details__hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span>
              <i className="fas fa-calendar-alt" /> {workshop.date}
            </span>
            <span>
              <i className="fas fa-clock" /> {workshop.time}
            </span>
            <span>
              <i className="fas fa-hourglass-half" /> {workshop.duration}
            </span>
            <span>
              <i className="fas fa-user-tie" /> {workshop.instructor}
            </span>
            {workshop.eventMode.map((m, i) => (
              <span key={i} className="workshop-details__mode-pill">
                {m}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="workshop-details__layout">
        <main className="workshop-details__main">
          <motion.section
            className="workshop-details__section"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="workshop-details__section-title">What You'll Learn</h2>
            <div className="workshop-details__outcomes-grid">
              {workshop.outcomes.map((item, i) => (
                <motion.div
                  key={i}
                  className="workshop-details__outcome-item"
                  variants={fadeUp}
                  custom={i}
                >
                  <i className="fas fa-check-circle workshop-details__check-icon" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="workshop-details__section"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="workshop-details__section-title">Session Agenda</h2>
            <div className="workshop-details__curriculum">
              {workshop.curriculum.map((item, i) => (
                <motion.div
                  key={i}
                  className="workshop-details__curr-item"
                  variants={fadeUp}
                  custom={i}
                >
                  <div className="workshop-details__curr-num">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="workshop-details__curr-body">
                    <div className="workshop-details__curr-time">{item.time}</div>
                    <div className="workshop-details__curr-title">{item.title}</div>
                    {item.desc && (
                      <div className="workshop-details__curr-desc">{item.desc}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="workshop-details__section"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="workshop-details__section-title">Who Is This For?</h2>
            <div className="workshop-details__who-grid">
              {workshop.whoIsItFor.map((item, i) => (
                <motion.div
                  key={i}
                  className="workshop-details__who-item"
                  variants={fadeUp}
                  custom={i}
                >
                  <i className="fas fa-user-check" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="workshop-details__section"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="workshop-details__section-title">Meet Your Instructor</h2>
            <div className="workshop-details__instructor-card">
              <div className="workshop-details__instr-img">
                <img src={instructor.image} alt={instructor.name} />
              </div>
              <div className="workshop-details__instr-info">
                <h3 className="workshop-details__instr-name">{instructor.name}</h3>
                <p className="workshop-details__instr-role">{instructor.position}</p>
                {instructor.college && (
                  <span className="workshop-details__instr-badge">{instructor.college}</span>
                )}
                <p className="workshop-details__instr-bio">
                  {instructor.bio ||
                    "Industry expert with years of hands-on experience training professionals across the data and AI domain."}
                </p>
                <div className="workshop-details__instr-socials">
                  {instructor.social.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="workshop-details__instr-social-btn"
                    >
                      <i className={s.iconClass} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="workshop-details__section"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="workshop-details__section-title">What Our Students Say</h2>
            <div className="workshop-details__testi-grid">
              {testimonyData.slice(0, 2).map((t) => (
                <div key={t.id} className="workshop-details__testi-card">
                  <div className="workshop-details__testi-stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star" />
                    ))}
                  </div>
                  <p className="workshop-details__testi-quote">&ldquo;{t.review}&rdquo;</p>
                  <div className="workshop-details__testi-author">
                    <img src={t.image} alt={t.name} />
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.position}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </main>

        <aside className="workshop-details__sidebar">
          <div className="workshop-details__price-card">
            <div className="workshop-details__price-row">
              <span className="workshop-details__price-now">{workshop.price}</span>
              <span className="workshop-details__price-was">{workshop.originalPrice}</span>
              <span className="workshop-details__price-off">{discount}% OFF</span>
            </div>

            <CountdownTimer dateStr={workshop.date} />

            <div className="workshop-details__sidebar-meta">
              <div className="workshop-details__sidebar-item">
                <i className="fas fa-calendar-alt" />
                <span>{workshop.date}</span>
              </div>
              <div className="workshop-details__sidebar-item">
                <i className="fas fa-clock" />
                <span>{workshop.time}</span>
              </div>
              <div className="workshop-details__sidebar-item">
                <i className="fas fa-hourglass-half" />
                <span>{workshop.duration}</span>
              </div>
              <div className="workshop-details__sidebar-item">
                <i className="fas fa-laptop-house" />
                <span>{workshop.eventMode.join(" & ")}</span>
              </div>
              <div className="workshop-details__sidebar-item">
                <i className="fas fa-user-tie" />
                <span>{workshop.instructor}</span>
              </div>
            </div>

            <div className="workshop-details__seat-wrap">
              <div className="workshop-details__seat-track">
                <div
                  className={`workshop-details__seat-fill ${seatsUrgent ? "workshop-details__seat-fill--urgent" : ""}`}
                  style={{ width: `${seatFillPct}%` }}
                />
              </div>
              <span className={`workshop-details__seat-txt ${seatsUrgent ? "workshop-details__seat-txt--urgent" : ""}`}>
                {seatsUrgent
                  ? `🔥 Only ${workshop.seatsLeft} seats left!`
                  : `${workshop.seatsLeft} of ${workshop.totalSeats} seats remaining`}
              </span>
            </div>

            <Link to={`/workshop-form?id=${workshop.id}`} className="workshop-details__enroll-btn">
              Secure Your Seat <i className="fas fa-arrow-right" />
            </Link>

            <a
              href="https://wa.me/918882641988"
              target="_blank"
              rel="noreferrer"
              className="workshop-details__wa-btn"
            >
              <i className="fab fa-whatsapp" /> Ask on WhatsApp
            </a>

            {/* Add to Calendar */}
            <a
              href={calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="workshop-details__cal-btn"
            >
              <i className="fas fa-calendar-plus" /> Add to Google Calendar
            </a>

            {/* Social share */}
            <div className="workshop-details__share-bar">
              <span className="workshop-details__share-label">Share</span>
              <button
                className="workshop-details__share-btn workshop-details__share-btn--wa"
                onClick={shareWA}
                aria-label="Share on WhatsApp"
              >
                <i className="fab fa-whatsapp" />
              </button>
              <button
                className="workshop-details__share-btn workshop-details__share-btn--li"
                onClick={shareLinkedIn}
                aria-label="Share on LinkedIn"
              >
                <i className="fab fa-linkedin-in" />
              </button>
              <button
                className="workshop-details__share-btn workshop-details__share-btn--copy"
                onClick={copyLink}
                aria-label="Copy link"
              >
                <i className={copied ? "fas fa-check" : "fas fa-link"} />
              </button>
            </div>

            {workshop.tags && (
              <div className="workshop-details__sidebar-tags">
                {workshop.tags.map((t, i) => (
                  <span key={i} className="workshop-details__sidebar-tag">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
    </>
  );
};

export default WorkshopDetails;
