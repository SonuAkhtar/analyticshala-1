import "./hero.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, memo, useRef } from "react";
import Typewriter from "typewriter-effect";
import Marq from "../Marq/Marq";
import {
  heroMarqData,
  coursesData,
  workshopData,
  testimonyData,
} from "../../../appData";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const skillBars = [
  { label: "Python & SQL", pct: 88, cssVar: "--skill-color-1" },
  { label: "Data Analytics", pct: 92, cssVar: "--skill-color-2" },
  { label: "Machine Learning", pct: 76, cssVar: "--skill-color-3" },
  { label: "Data Visualization", pct: 84, cssVar: "--skill-color-4" },
];

const avatarInitials = ["RS", "PK", "AM", "NJ", "DM"];

const mobileStats = [
  { num: "4.9★", label: "Avg Rating" },
  { num: "300+", label: "Learners" },
  { num: "90", label: "Days to Hired" },
];

const techStack = [
  { icon: "fab fa-python", label: "Python", color: "#3776AB" },
  { icon: "fas fa-database", label: "SQL", color: "#4169E1" },
  { icon: "fas fa-chart-pie", label: "Power BI", color: "#F2C811" },
  { icon: "fas fa-chart-bar", label: "Tableau", color: "#E97627" },
  { icon: "fas fa-brain", label: "ML / AI", color: "#7c3aed" },
  { icon: "fas fa-robot", label: "LangChain", color: "#10b981" },
  { icon: "fas fa-table", label: "Excel", color: "#217346" },
  { icon: "fas fa-layer-group", label: "RAG", color: "#e63946" },
  { icon: "fas fa-flask", label: "Scikit", color: "#F7931E" },
];

/* Featured courses for slide */
const featuredCourses = coursesData
  .filter((c) => c.homepageOrder !== null)
  .sort((a, b) => a.homepageOrder - b.homepageOrder)
  .slice(0, 4);

const nextWorkshop = workshopData.upcoming[0];
const featuredTestimony = testimonyData[0];

const SlideTracker = ({ animate }) => (
  <div className="mac-slide mac-slide--tracker">
    <div className="mac-tracker-stats">
      <div className="mac-stat">
        <span className="mac-stat-num">4.9★</span>
        <span className="mac-stat-label">Avg Rating</span>
      </div>
      <div className="mac-stat">
        <span className="mac-stat-num">90</span>
        <span className="mac-stat-label">Days to Job Ready</span>
      </div>
      <div className="mac-stat">
        <span className="mac-stat-num">300+</span>
        <span className="mac-stat-label">Learners Trained</span>
      </div>
    </div>
    <div className="mac-divider" />
    <p className="mac-skills-label">Skills You&apos;ll Master</p>
    {skillBars.map((s, i) => (
      <div key={i} className="mac-skill-bar">
        <div className="mac-skill-bar-info">
          <span>{s.label}</span>
          <span style={{ color: `var(${s.cssVar})` }}>{s.pct}%</span>
        </div>
        <div className="mac-skill-bar-track">
          <motion.div
            className="mac-skill-bar-fill"
            style={{ background: `var(${s.cssVar})` }}
            initial={{ width: 0 }}
            animate={animate ? { width: `${s.pct}%` } : { width: 0 }}
            transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: "easeOut" }}
          />
        </div>
      </div>
    ))}
  </div>
);

const SlideCourses = () => (
  <div className="mac-slide mac-slide--courses">
    <div className="mac-courses-grid">
      {featuredCourses.map((c) => (
        <div
          key={c.id}
          className="mac-course-item"
          style={{ "--c-accent": c.accent }}
        >
          <span className="mac-course-icon">
            <i className={c.icon} style={{ color: c.accent }} />
          </span>
          <div className="mac-course-info">
            <span className="mac-course-name">
              {c.homepageTitle || c.title}
            </span>
            <span className="mac-course-meta">
              {c.duration} · {c.level.split("→")[0].trim()}
            </span>
          </div>
          {c.comingSoon && <span className="mac-course-soon">Soon</span>}
        </div>
      ))}
    </div>
    <Link to="/courses" className="mac-cta-link">
      View all 7 courses <i className="fas fa-arrow-right" />
    </Link>
  </div>
);

const SlideWorkshop = () => (
  <div className="mac-slide mac-slide--workshop">
    <div className="mac-ws-badge">
      <i className="fas fa-calendar-check" /> Next Live Workshop
    </div>
    <h4 className="mac-ws-title">{nextWorkshop.title}</h4>
    <div className="mac-ws-meta">
      <span>
        <i className="fas fa-calendar-alt" /> {nextWorkshop.date}
      </span>
      <span>
        <i className="fas fa-clock" /> {nextWorkshop.time}
      </span>
      <span>
        <i className="fas fa-signal" /> {nextWorkshop.level}
      </span>
    </div>
    <div className="mac-ws-footer">
      <div className="mac-ws-seats">
        <div
          className="mac-ws-seats-bar"
          style={{
            "--fill": `${((nextWorkshop.totalSeats - nextWorkshop.seatsLeft) / nextWorkshop.totalSeats) * 100}%`,
          }}
        />
        <span>{nextWorkshop.seatsLeft} seats left</span>
      </div>
    </div>
    <Link to="/workshops" className="mac-cta-btn">
      Book Your Seat <i className="fas fa-arrow-right" />
    </Link>
  </div>
);

const SlideTestimony = () => (
  <div className="mac-slide mac-slide--testimony">
    <div className="mac-testi-stars">
      {[...Array(5)].map((_, i) => (
        <i key={i} className="fas fa-star" />
      ))}
    </div>
    <p className="mac-testi-quote">
      &ldquo;{featuredTestimony.review.slice(0, 140)}&hellip;&rdquo;
    </p>
    <div className="mac-testi-author">
      <div className="mac-testi-avatar">{featuredTestimony.name[0]}</div>
      <div>
        <strong>{featuredTestimony.name}</strong>
        <span>{featuredTestimony.position}</span>
      </div>
    </div>
    <div className="mac-testi-company-row">
      <span className="mac-testi-company-badge">
        <i className="fas fa-briefcase" /> Placed via AnalyticShala
      </span>
    </div>
  </div>
);

const SlideStack = () => (
  <div className="mac-slide mac-slide--stack">
    <p className="mac-stack-label">Tools & Technologies You&apos;ll Master</p>
    <div className="mac-stack-grid">
      {techStack.map((t, i) => (
        <div
          key={i}
          className="mac-stack-item"
          style={{ "--t-color": t.color }}
        >
          <i className={t.icon} style={{ color: t.color }} />
          <span>{t.label}</span>
        </div>
      ))}
    </div>
    <div className="mac-stack-footer">
      <i className="fas fa-certificate" />
      <span>Certificate included with every course</span>
    </div>
  </div>
);

const ProgressFill = memo(() => <div className="hero__mac-prog-fill" />);

const SLIDES = [
  {
    id: "tracker",
    windowTitle: "Career Progress Tracker",
    component: SlideTracker,
  },
  { id: "courses", windowTitle: "Featured Courses", component: SlideCourses },
  {
    id: "workshop",
    windowTitle: "Upcoming Workshop",
    component: SlideWorkshop,
  },
  {
    id: "testimony",
    windowTitle: "Student Success Story",
    component: SlideTestimony,
  },
  { id: "stack", windowTitle: "Skills You'll Master", component: SlideStack },
];

const MacCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const touchStartX = useRef(0);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % SLIDES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) goTo((current + 1) % SLIDES.length);
    if (diff < -50) goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  const ActiveSlide = SLIDES[current].component;

  return (
    <div
      className="hero__mac"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Title bar */}
      <div className="hero__mac-bar">
        <div className="hero__mac-dots">
          <span className="hero__mac-dot hero__mac-dot--r" />
          <span className="hero__mac-dot hero__mac-dot--y" />
          <span className="hero__mac-dot hero__mac-dot--g" />
        </div>
        <span className="hero__mac-title">{SLIDES[current].windowTitle}</span>
        <div
          className="hero__mac-dots"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <span className="hero__mac-dot" />
          <span className="hero__mac-dot" />
          <span className="hero__mac-dot" />
        </div>
      </div>

      {/* Slide body */}
      <div className="hero__mac-body">
        <motion.div
          key={animKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <ActiveSlide animate={current === 0} />
        </motion.div>
      </div>

      {/* Progress nav */}
      <div className="hero__mac-progress">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            className="hero__mac-prog-track"
            onClick={() => goTo(i)}
            aria-label={`Go to slide: ${s.windowTitle}`}
          >
            {i < current && <div className="hero__mac-prog-fill hero__mac-prog-fill--past" />}
            {i === current && <ProgressFill key={animKey} />}
          </button>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      <main className="hero__main">
        <div className="hero__left">
          <motion.div
            className="hero__badge"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <i className="fas fa-graduation-cap" />
            India&apos;s fastest growing data analytics community
          </motion.div>

          <div className="hero__title">
            <motion.h1
              className="hero__headline"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <span className="hero__headline-top">Turn Data Into</span>
              <span className="hero__headline-bottom">Your Dream Career.</span>
            </motion.h1>

            <motion.p
              className="hero__typewriter"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              Master&nbsp;
              <span className="hero__typewriter-highlight">
                <Typewriter
                  options={{
                    strings: [
                      "Data Analytics",
                      "Python & SQL",
                      "Machine Learning",
                      "Power BI & Tableau",
                      "AI Engineering",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 60,
                    deleteSpeed: 35,
                  }}
                />
              </span>
              & land your first data role in 90 days.
            </motion.p>
          </div>

          <motion.div
            className="hero__buttons"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Link to="/courses" className="hero__btn--primary">
              Explore Courses <i className="fas fa-arrow-right" />
            </Link>
            <Link to="/workshops" className="hero__btn--ghost">
              <i className="fas fa-play-circle" /> Visit Workshops
            </Link>
          </motion.div>

          <motion.div
            className="hero__trust"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3.5}
          >
            <span>
              <i className="fas fa-check-circle" /> 2 Free Trial Classes
            </span>
            <span>
              <i className="fas fa-check-circle" /> 1:1 Career Mentorship
            </span>
            <span>
              <i className="fas fa-check-circle" /> Job Placement Support
            </span>
          </motion.div>

          <motion.div
            className="hero__mobile-stats"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            {mobileStats.map((s) => (
              <div key={s.label} className="hero__mobile-stat">
                <span className="hero__mobile-stat-num">{s.num}</span>
                <span className="hero__mobile-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero__right"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <MacCarousel />

          <motion.div
            className="hero__pill hero__pill--1"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            <i className="fas fa-briefcase" /> Hiring Partners
          </motion.div>

          <motion.div
            className="hero__pill hero__pill--2"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
          >
            <i className="fas fa-users" /> 500+ Alumni
          </motion.div>

          <motion.div
            className="hero__pill hero__pill--3"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 0.2 }}
          >
            <i className="fas fa-certificate" /> Certified Courses
          </motion.div>
        </motion.div>
      </main>

      <div className="hero__marq-strip">
        <Marq data={heroMarqData} />
      </div>
    </section>
  );
};

export default Hero;
