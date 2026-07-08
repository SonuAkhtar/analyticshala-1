"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { workshopData, teamData, testimonyData } from "@/data/appData";
import type { Workshop, TeamMember } from "@/data/appData";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import styles from "./workshopDetails.module.css";


const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" as const },
  }),
};


const parsePrice = (str = "") => parseInt(str.replace(/[₹,\s]/g, ""), 10) || 0;

const parseWorkshopDate = (dateStr: string): Date | null => {
  const months: Record<string, number> = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
  };
  const parts = (dateStr || "").split(", ");
  const [monthName, dayStr] = (parts[0] || "").split(" ");
  const month = months[monthName];
  const day = parseInt(dayStr, 10);
  if (!month || !day) return null;
  const d = new Date(new Date().getFullYear(), month - 1, day, 10, 0, 0);
  if (d.getTime() < Date.now()) d.setFullYear(d.getFullYear() + 1);
  return d;
};

const ZERO_COUNTDOWN = { days: 0, hours: 0, minutes: 0, seconds: 0 };

const useCountdown = (targetTime: number | null) => {
  const [time, setTime] = useState(ZERO_COUNTDOWN);

  useEffect(() => {
    if (targetTime == null) return;
    const tick = () => {
      const diff = targetTime - Date.now();
      setTime(
        diff <= 0
          ? ZERO_COUNTDOWN
          : {
              days: Math.floor(diff / 86400000),
              hours: Math.floor((diff % 86400000) / 3600000),
              minutes: Math.floor((diff % 3600000) / 60000),
              seconds: Math.floor((diff % 60000) / 1000),
            },
      );
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetTime]);

  return time;
};

const buildCalendarUrl = (workshop: Workshop) => {
  const parts = workshop.date?.split(", ") || [];
  const [monthName, dayStr] = (parts[0] || "").split(" ");
  const months: Record<string, number> = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
  };
  const month = months[monthName] || new Date().getMonth() + 1;
  const day = parseInt(dayStr, 10) || new Date().getDate();
  const year = new Date().getFullYear();
  const timeStr = workshop.time || "10:00 AM";
  const startToken = timeStr.split("-")[0].trim();
  const toHHMM = (t: string) => {
    const [time, meridiem] = t.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (meridiem === "PM" && h !== 12) h += 12;
    if (meridiem === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}${String(m || 0).padStart(2, "0")}`;
  };
  const startHHMM = toHHMM(startToken);
  const date = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
  const startDt = `${date}T${startHHMM}00`;
  const endH = parseInt(startHHMM.slice(0, 2), 10) + 3;
  const endDt = `${date}T${String(endH).padStart(2, "00")}${startHHMM.slice(2)}00`;
  const title = encodeURIComponent(workshop.title);
  const details = encodeURIComponent(
    `AnalyticShala Workshop: ${workshop.title}\n\nMore info: https://analyticshala.in/workshops/${workshop.slug ?? workshop.id}`,
  );
  const loc = encodeURIComponent(
    workshop.venue || workshop.eventMode?.join(" / ") || "Online",
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDt}/${endDt}&details=${details}&location=${loc}`;
};


const CountdownTimer = ({ dateStr }: { dateStr: string }) => {
  const target = parseWorkshopDate(dateStr);
  const { days, hours, minutes, seconds } = useCountdown(
    target?.getTime() ?? null,
  );
  if (!target) return null;
  return (
    <div className={styles.countdown}>
      <p className={styles.countdownLabel}>
        <i className="fas fa-stopwatch" /> Workshop starts in
      </p>
      <div className={styles.countdownUnits}>
        {[
          { v: days, l: "Days" },
          { v: hours, l: "Hrs" },
          { v: minutes, l: "Min" },
          { v: seconds, l: "Sec" },
        ].map(({ v, l }) => (
          <div key={l} className={styles.countdownUnit}>
            <span className={styles.countdownNum}>
              {String(v).padStart(2, "0")}
            </span>
            <span className={styles.countdownLbl}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


const levelClass = (level = "") => {
  const key = level.toLowerCase().replace(/\s+/g, "");
  if (key === "beginner") return styles.levelBadgeBeginner;
  if (key === "advanced") return styles.levelBadgeAdvanced;
  return styles.levelBadgeIntermediate;
};


export default function WorkshopDetailsClient({ slug }: { slug: string }) {
  const workshop: Workshop =
    workshopData.upcoming.find(
      (w) => w.slug === slug || String(w.id) === slug,
    ) || workshopData.upcoming[0];

  const instructor: TeamMember =
    teamData.find((t) => t.name === workshop.instructor) || teamData[1];

  const priceNum = parsePrice(workshop.price);
  const origNum = parsePrice(workshop.originalPrice);
  const discount = origNum > 0 ? Math.round((1 - priceNum / origNum) * 100) : 0;

  const totalSeats = workshop.totalSeats ?? 0;
  const seatsLeft = workshop.seatsLeft ?? 0;
  const seatFillPct =
    totalSeats > 0 ? Math.round(((totalSeats - seatsLeft) / totalSeats) * 100) : 0;
  const seatsUrgent = seatsLeft > 0 && seatsLeft <= 5;

  const [copied, setCopied] = useState(false);
  const calUrl = buildCalendarUrl(workshop);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWA = () => {
    const msg = encodeURIComponent(
      `🔥 Check out this workshop: ${workshop.title} on ${workshop.date}\n${window.location.href}`,
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Workshops", href: "/workshops" },
          { label: workshop.title },
        ]}
      />
      <div className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <Image
            src={workshop.image}
            alt={workshop.title}
            fill
            priority
            className={styles.heroImg}
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <div className={styles.heroBadges}>
              <span
                className={styles.catBadge}
                style={{ "--cc": workshop.categoryColor } as React.CSSProperties}
              >
                {workshop.category}
              </span>
              {workshop.level && (
                <span className={`${styles.levelBadge} ${levelClass(workshop.level)}`}>
                  {workshop.level}
                </span>
              )}
            </div>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {workshop.title}
            </motion.h1>
            <motion.p
              className={styles.heroDesc}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {workshop.desc}
            </motion.p>
            <motion.div
              className={styles.heroMeta}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span><i className="fas fa-calendar-alt" /> {workshop.date}</span>
              <span><i className="fas fa-clock" /> {workshop.time}</span>
              <span><i className="fas fa-hourglass-half" /> {workshop.duration}</span>
              <span><i className="fas fa-user-tie" /> {workshop.instructor}</span>
              {workshop.venue && (
                <span><i className="fas fa-map-marker-alt" /> {workshop.venue}</span>
              )}
              {workshop.eventMode.map((m, i) => (
                <span key={i} className={styles.modePill}>{m}</span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Body layout */}
        <div className={styles.layout}>
          <main className={styles.main}>
            {/* What you'll learn */}
            <motion.section
              className={styles.section}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className={styles.sectionTitle}>What You&apos;ll Learn</h2>
              <div className={styles.outcomesGrid}>
                {(workshop.outcomes ?? []).map((item, i) => (
                  <motion.div
                    key={i}
                    className={styles.outcomeItem}
                    variants={fadeUp}
                    custom={i}
                  >
                    <i className="fas fa-check-circle" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Session Agenda */}
            <motion.section
              className={styles.section}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className={styles.sectionTitle}>Session Agenda</h2>
              <div className={styles.curriculum}>
                {(workshop.curriculum ?? []).map((item, i) => (
                  <motion.div
                    key={i}
                    className={styles.currItem}
                    variants={fadeUp}
                    custom={i}
                  >
                    <div className={styles.currNum}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className={styles.currBody}>
                      <div className={styles.currTime}>{item.time}</div>
                      <div className={styles.currTitle}>{item.title}</div>
                      {item.desc && (
                        <div className={styles.currDesc}>{item.desc}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Who is it for */}
            <motion.section
              className={styles.section}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className={styles.sectionTitle}>Who Is This For?</h2>
              <div className={styles.whoGrid}>
                {(workshop.whoIsItFor ?? []).map((item, i) => (
                  <motion.div
                    key={i}
                    className={styles.whoItem}
                    variants={fadeUp}
                    custom={i}
                  >
                    <i className="fas fa-user-check" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Instructor */}
            <motion.section
              className={styles.section}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className={styles.sectionTitle}>Meet Your Instructor</h2>
              <div className={styles.instructorCard}>
                <div className={styles.instrImg}>
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    width={110}
                    height={110}
                  />
                </div>
                <div className={styles.instrInfo}>
                  <h3 className={styles.instrName}>{instructor.name}</h3>
                  <p className={styles.instrRole}>{instructor.position}</p>
                  {instructor.college && (
                    <span className={styles.instrBadge}>{instructor.college}</span>
                  )}
                  <p className={styles.instrBio}>
                    {instructor.bio ||
                      "Industry expert with years of hands-on experience training professionals across the data and AI domain."}
                  </p>
                  <div className={styles.instrSocials}>
                    {instructor.social.map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.instrSocialBtn}
                      >
                        <i className={s.iconClass} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Testimonials */}
            <motion.section
              className={styles.section}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className={styles.sectionTitle}>What Our Students Say</h2>
              <div className={styles.testiGrid}>
                {testimonyData.slice(0, 2).map((t) => (
                  <div key={t.id} className={styles.testiCard}>
                    <div className={styles.testiStars}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star" />
                      ))}
                    </div>
                    <p className={styles.testiQuote}>&ldquo;{t.review}&rdquo;</p>
                    <div className={styles.testiAuthor}>
                      <Image src={t.image} alt={t.name} width={38} height={38} />
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

          {/* Sticky sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.priceCard}>
              <div className={styles.priceRow}>
                <span className={styles.priceNow}>{workshop.price}</span>
                <span className={styles.priceWas}>{workshop.originalPrice}</span>
                <span className={styles.priceOff}>{discount}% OFF</span>
              </div>

              <CountdownTimer dateStr={workshop.date} />

              <div className={styles.sidebarMeta}>
                <div className={styles.sidebarItem}>
                  <i className="fas fa-calendar-alt" />
                  <span>{workshop.date}</span>
                </div>
                <div className={styles.sidebarItem}>
                  <i className="fas fa-clock" />
                  <span>{workshop.time}</span>
                </div>
                <div className={styles.sidebarItem}>
                  <i className="fas fa-hourglass-half" />
                  <span>{workshop.duration}</span>
                </div>
                <div className={styles.sidebarItem}>
                  <i className="fas fa-laptop-house" />
                  <span>{workshop.eventMode.join(" & ")}</span>
                </div>
                {workshop.venue && (
                  <div className={styles.sidebarItem}>
                    <i className="fas fa-map-marker-alt" />
                    <span>{workshop.venue}</span>
                  </div>
                )}
                <div className={styles.sidebarItem}>
                  <i className="fas fa-user-tie" />
                  <span>{workshop.instructor}</span>
                </div>
              </div>

              {totalSeats > 0 && (
                <div className={styles.seatWrap}>
                  <div className={styles.seatTrack}>
                    <div
                      className={`${styles.seatFill}${seatsUrgent ? " " + styles.seatFillUrgent : ""}`}
                      style={{ width: `${seatFillPct}%` }}
                    />
                  </div>
                  <span
                    className={`${styles.seatTxt}${seatsUrgent ? " " + styles.seatTxtUrgent : ""}`}
                  >
                    {seatsUrgent
                      ? `🔥 Only ${seatsLeft} seats left!`
                      : `${seatsLeft} of ${totalSeats} seats remaining`}
                  </span>
                </div>
              )}

              <Link
                href={`/workshop-form?id=${workshop.id}`}
                className={styles.enrollBtn}
              >
                Secure Your Seat <i className="fas fa-arrow-right" />
              </Link>

              <a
                href="https://wa.me/918882641988"
                target="_blank"
                rel="noreferrer"
                className={styles.waBtn}
              >
                <i className="fab fa-whatsapp" /> Ask on WhatsApp
              </a>

              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.calBtn}
              >
                <i className="fas fa-calendar-plus" /> Add to Google Calendar
              </a>

              <div className={styles.shareBar}>
                <span className={styles.shareLabel}>Share</span>
                <button
                  className={`${styles.shareBtn} ${styles.shareBtnWa}`}
                  onClick={shareWA}
                  aria-label="Share on WhatsApp"
                >
                  <i className="fab fa-whatsapp" />
                </button>
                <button
                  className={`${styles.shareBtn} ${styles.shareBtnLi}`}
                  onClick={shareLinkedIn}
                  aria-label="Share on LinkedIn"
                >
                  <i className="fab fa-linkedin-in" />
                </button>
                <button
                  className={`${styles.shareBtn} ${styles.shareBtnCopy}`}
                  onClick={copyLink}
                  aria-label="Copy link"
                >
                  <i className={copied ? "fas fa-check" : "fas fa-link"} />
                </button>
              </div>

              {workshop.tags && workshop.tags.length > 0 && (
                <div className={styles.sidebarTags}>
                  {workshop.tags.map((t, i) => (
                    <span key={i} className={styles.sidebarTag}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
