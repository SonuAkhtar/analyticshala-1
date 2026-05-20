"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { workshopData } from "@/data/appData";
import type { Workshop } from "@/data/appData";
import styles from "./workshops.module.css";

/* ── helpers ── */

const parseDate = (dateStr = "") => {
  const parts = dateStr.split(", ");
  const [monthDay, dayName = ""] = parts;
  const tokens = monthDay.split(" ");
  return {
    month: (tokens[0] || "").slice(0, 3).toUpperCase(),
    day: tokens[1] || "",
    dayName: dayName.slice(0, 3).toUpperCase(),
  };
};

const getSeatPct = (left: number, total: number) =>
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

const pad = (n: number) => String(n).padStart(2, "0");

const useCountdown = (target: number) => {
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
  }, [target]); // eslint-disable-line react-hooks/exhaustive-deps
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

/* ── Sub-components ── */

const FeaturedTicket = ({ workshop }: { workshop: Workshop }) => {
  const { month, day, dayName } = parseDate(workshop.date);
  const pct = getSeatPct(workshop.seatsLeft ?? 0, workshop.totalSeats ?? 0);
  const urgent = workshop.seatsLeft != null && workshop.seatsLeft <= 5;

  return (
    <div className={styles.featuredTicket}>
      <div className={styles.featuredTicketLabel}>
        <span className={`${styles.status} ${styles.statusUpcoming}`}>
          UPCOMING
        </span>
      </div>
      <div className={styles.featuredTicketBody}>
        <div className={styles.featuredDate}>
          <span className={styles.featuredMonth}>{month}</span>
          <span className={styles.featuredDay}>{day}</span>
          {dayName && <span className={styles.featuredDayname}>{dayName}</span>}
        </div>
        <div className={styles.featuredInfo}>
          <h3 className={styles.featuredTitle}>{workshop.title}</h3>
          <div className={styles.featuredMeta}>
            <span>
              <i className="fas fa-clock" /> {workshop.time}
            </span>
            <span>
              <i className="fas fa-hourglass-half" /> {workshop.duration}
            </span>
          </div>
          {workshop.seatsLeft != null && workshop.totalSeats && (
            <div className={styles.featuredSeats}>
              <div className={styles.seatsBar}>
                <div
                  className={`${styles.seatsFill}${urgent ? " " + styles.seatsFillUrgent : ""}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className={urgent ? styles.seatsTxtUrgent : ""}>
                {workshop.seatsLeft} seats left
              </span>
            </div>
          )}
          <Link
            href={`/workshops/${workshop.slug || workshop.id}`}
            className={styles.featuredCta}
          >
            Reserve Your Seat <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const TicketCard = ({
  workshop,
  onWaitlist,
}: {
  workshop: Workshop;
  onWaitlist: (w: Workshop) => void;
}) => {
  const { month, day, dayName } = parseDate(workshop.date);
  const pct = getSeatPct(workshop.seatsLeft ?? 0, workshop.totalSeats ?? 0);
  const urgent = workshop.seatsLeft != null && workshop.seatsLeft <= 5;

  const statusLabel =
    workshop.seatsLeft === 0 ? "FULL" : urgent ? "LAST SEATS" : "UPCOMING";
  const statusClass =
    workshop.seatsLeft === 0
      ? styles.statusPast
      : urgent
        ? styles.statusLive
        : styles.statusUpcoming;

  return (
    <div className={styles.ticket}>
      <div className={styles.ticketDate}>
        <span className={styles.ticketMonth}>{month}</span>
        <span className={styles.ticketDay}>{day}</span>
        {dayName && <span className={styles.ticketDayname}>{dayName}</span>}
      </div>
      <div className={styles.ticketDivider} />
      <div className={styles.ticketBody}>
        <div className={styles.ticketTop}>
          <span className={`${styles.status} ${statusClass}`}>
            {statusLabel}
          </span>
          {workshop.level && (
            <span className={styles.ticketLevel}>{workshop.level}</span>
          )}
        </div>
        <h3 className={styles.ticketTitle}>{workshop.title}</h3>
        <p className={styles.ticketDesc}>{workshop.desc}</p>
        {workshop.instructor && (
          <div className={styles.ticketInstructor}>
            <i className="fas fa-user-tie" /> {workshop.instructor}
          </div>
        )}
        <div className={styles.ticketStrip}>
          <div className={styles.ticketChips}>
            <span>
              <i className="fas fa-clock" /> {workshop.time}
            </span>
            <span>
              <i className="fas fa-hourglass-half" /> {workshop.duration}
            </span>
            {workshop.eventMode?.map((m, i) => (
              <span key={i} className={styles.modeChip}>
                {m}
              </span>
            ))}
          </div>
          <div className={styles.ticketRight}>
            {workshop.seatsLeft != null && workshop.totalSeats && (
              <div className={styles.seatsRow}>
                <div className={styles.seatsBar}>
                  <div
                    className={`${styles.seatsFill}${urgent ? " " + styles.seatsFillUrgent : ""}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span
                  className={`${styles.seatsTxt}${urgent ? " " + styles.seatsTxtUrgent : ""}`}
                >
                  {workshop.seatsLeft} of {workshop.totalSeats} seats
                </span>
              </div>
            )}
            <div className={styles.ticketFooterRow}>
              <div className={styles.ticketPrice}>
                <span className={styles.priceNow}>{workshop.price}</span>
                {workshop.originalPrice && (
                  <span className={styles.priceWas}>
                    {workshop.originalPrice}
                  </span>
                )}
              </div>
              {workshop.seatsLeft === 0 ? (
                <button
                  className={`${styles.ticketCta} ${styles.ticketCtaWaitlist}`}
                  onClick={() => onWaitlist(workshop)}
                >
                  <i className="fas fa-bell" /> Join Waitlist
                </button>
              ) : (
                <Link
                  href={`/workshops/${workshop.slug || workshop.id}`}
                  className={styles.ticketCta}
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

const PastCard = ({ workshop }: { workshop: Workshop }) => (
  <div className={styles.pastCard}>
    <div className={styles.pastImg}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={workshop.image} alt={workshop.title} loading="lazy" />
      <div className={styles.pastOverlay} />
      <span className={styles.pastCompletedBadge}>
        <i className="fas fa-check-circle" /> Completed
      </span>
    </div>
    <div className={styles.pastBody}>
      <span
        className={styles.pastCat}
        style={
          workshop.categoryColor
            ? ({
                "--past-cat-color": workshop.categoryColor,
              } as React.CSSProperties)
            : undefined
        }
      >
        {workshop.category}
      </span>
      <h4 className={styles.pastTitle}>{workshop.title}</h4>
      <div className={styles.pastMeta}>
        <span>
          <i className="fas fa-calendar-alt" /> {workshop.date}
        </span>
        {workshop.duration && (
          <span>
            <i className="fas fa-clock" /> {workshop.duration}
          </span>
        )}
      </div>
      {(workshop.rating || workshop.attendees) && (
        <div className={styles.pastStats}>
          {workshop.rating && (
            <div className={styles.pastStat}>
              <div className={styles.pastStatIcon}>
                <i className="fas fa-star" />
              </div>
              <div className={styles.pastStatBody}>
                <strong>{workshop.rating}</strong>
                <span>out of 5</span>
              </div>
            </div>
          )}
          {workshop.attendees && (
            <div className={styles.pastStat}>
              <div
                className={`${styles.pastStatIcon} ${styles.pastStatIconUsers}`}
              >
                <i className="fas fa-users" />
              </div>
              <div className={styles.pastStatBody}>
                <strong>{workshop.attendees}</strong>
                <span>attended</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

const WaitlistModal = ({
  workshop,
  onClose,
}: {
  workshop: Workshop;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setErr(true);
      return;
    }
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
    <div className={styles.wlOverlay} onClick={onClose}>
      <div className={styles.wlModal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.wlModalClose} onClick={onClose}>
          <i className="fas fa-times" />
        </button>
        {done ? (
          <div className={styles.wlModalDone}>
            <i className="fas fa-check-circle" />
            <p>
              You&apos;re on the list! We&apos;ll ping you when seats open for{" "}
              <strong>{workshop.title}</strong>.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.wlModalIcon}>
              <i className="fas fa-bell" />
            </div>
            <h3 className={styles.wlModalTitle}>Join the Waitlist</h3>
            <p className={styles.wlModalSub}>
              <strong>{workshop.title}</strong> is currently full. Drop your
              email and we&apos;ll notify you when seats open.
            </p>
            <form className={styles.wlModalForm} onSubmit={submit} noValidate>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErr(false);
                }}
                className={err ? styles.wlInputError : ""}
                aria-label="Email for waitlist"
              />
              <button type="submit">
                Notify Me <i className="fas fa-arrow-right" />
              </button>
            </form>
            {err && (
              <p className={styles.wlModalErr}>
                <i className="fas fa-exclamation-circle" /> Enter a valid email.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* ── Main client component ── */

export default function WorkshopsClient() {
  const countdown = useCountdown(getNextSaturday().getTime());
  const featured = workshopData.upcoming[0];

  const allCategories = [
    "All",
    ...new Set(workshopData.upcoming.map((w) => w.category).filter(Boolean)),
  ];
  const [activeFilter, setActiveFilter] = useState("All");
  const [waitlistWorkshop, setWaitlistWorkshop] = useState<Workshop | null>(
    null,
  );

  const filteredWorkshops =
    activeFilter === "All"
      ? workshopData.upcoming
      : workshopData.upcoming.filter((w) => w.category === activeFilter);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOrb} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroLeft}>
            <span className={styles.eyebrow}>
              <i className="fas fa-bolt" /> Live Workshops &amp; Bootcamps
            </span>
            <h1 className={styles.heroHeading}>
              Weekend Sprints.
              <br />
              <span className={styles.gradientText}>
                Real Skills. Zero Fluff.
              </span>
            </h1>
            <p className={styles.heroSub}>
              Hands-on workshops led by industry professionals - Data Analytics,
              Python, SQL, Power BI &amp; AI. Small batches. Real projects.
              Job-ready results.
            </p>
            <p className={styles.heroSpoiler}>
              <em>&ldquo;Spoiler: our alumni get jobs. Your turn?&rdquo;</em>
            </p>
            <div className={styles.heroActions}>
              <a href="#upcoming" className={styles.btnPrimary}>
                Browse Workshops <i className="fas fa-arrow-down" />
              </a>
              <a
                href="https://wa.me/918882641988"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnGhost}
              >
                <i className="fab fa-whatsapp" /> Chat with Us
              </a>
            </div>
          </div>
          <div className={styles.heroRight}>
            <FeaturedTicket workshop={featured} />
          </div>
        </div>
      </section>

      {/* Countdown strip */}
      <div className={styles.countdown}>
        <span className={styles.countdownLabelMain}>
          <i className="fas fa-circle" /> NEXT WORKSHOP STARTS IN
        </span>
        <div className={styles.countdownUnits}>
          {[
            { val: countdown.d, lbl: "DAYS" },
            { val: countdown.h, lbl: "HRS" },
            { val: countdown.m, lbl: "MIN" },
            { val: countdown.s, lbl: "SEC" },
          ].map(({ val, lbl }, i) => (
            <div key={i} className={styles.countdownUnit}>
              <span className={styles.countdownNum}>{val}</span>
              <span className={styles.countdownSub}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className={styles.trust}>
        <div className={`container ${styles.trustInner}`}>
          {trustPoints.map((t, i) => (
            <div key={i} className={styles.trustItem}>
              <div className={styles.trustIcon}>
                <i className={t.icon} />
              </div>
              <div>
                <strong>{t.title}</strong>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming workshops */}
      <section className={styles.upcoming} id="upcoming">
        <div className="container">
          <span className={styles.sectionEyebrow}>
            <i className="fas fa-calendar-check" /> Upcoming Workshops
          </span>
          <h2 className={styles.sectionTitle}>Enroll Before Seats Fill Up</h2>
          <p className={styles.sectionSub}>
            All workshops run in small batches - ensuring personalised attention
            and a high-quality experience for every participant.
          </p>

          <div className={styles.filterBar}>
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterChip}${activeFilter === cat ? " " + styles.filterChipActive : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredWorkshops.length === 0 ? (
            <div className={styles.empty}>
              <i className="fas fa-calendar-times" />
              <p>
                No upcoming workshops in <strong>{activeFilter}</strong> right
                now.
              </p>
              <button
                className={styles.filterChip}
                onClick={() => setActiveFilter("All")}
              >
                View All Workshops
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredWorkshops.map((w) => (
                <TicketCard
                  key={w.id}
                  workshop={w}
                  onWaitlist={setWaitlistWorkshop}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community strip */}
      <div className={styles.community}>
        <div className={`container ${styles.communityInner}`}>
          <div className={styles.avatarStack}>
            {AVATAR_SEEDS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
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
            className={styles.communityBtn}
          >
            <i className="fab fa-whatsapp" /> Join on WhatsApp
          </a>
        </div>
      </div>

      {/* Past workshops */}
      <section className={styles.past}>
        <div className="container">
          <span className={styles.sectionEyebrow}>
            <i className="fas fa-history" /> Past Workshops
          </span>
          <h2 className={styles.sectionTitle}>
            Over 500 Students Already Trained
          </h2>
          <p className={styles.sectionSub}>
            Miss a live session? Here&apos;s what past students experienced.{" "}
            <em>(They&apos;re basically legends now.)</em>
          </p>
          <div className={styles.pastGrid}>
            {workshopData.previous.map((w) => (
              <PastCard key={w.id} workshop={w} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <span className={`${styles.eyebrow} ${styles.eyebrowInv}`}>
            <i className="fas fa-star" /> Not Sure Where to Start?
          </span>
          <h2 className={styles.ctaHeading}>
            Let Us Find the Right
            <br />
            Workshop for You
          </h2>
          <p className={styles.ctaSub}>
            Our mentors will assess your goals and recommend the perfect
            starting point - completely free, no pressure.
          </p>
          <div className={styles.ctaActions}>
            <a
              href="https://wa.me/918882641988?text=Hi%2C%20I%27d%20like%20to%20know%20which%20workshop%20is%20best%20for%20me."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              <i className="fab fa-whatsapp" /> Get Free Guidance
            </a>
            <Link href="/aboutUs" className={styles.ctaLink}>
              Learn About Us <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {waitlistWorkshop && (
        <WaitlistModal
          workshop={waitlistWorkshop}
          onClose={() => setWaitlistWorkshop(null)}
        />
      )}
    </div>
  );
}
