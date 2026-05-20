"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, memo, useRef } from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import Marq from "@/components/Marq/Marq";
import { heroMarqData, coursesData, workshopData, testimonyData } from "@/data/appData";
import styles from "./Hero.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const skillBars = [
  { label: "Python & SQL", pct: 88, cssVar: "--skill-color-1" },
  { label: "Data Analytics", pct: 92, cssVar: "--skill-color-2" },
  { label: "Machine Learning", pct: 76, cssVar: "--skill-color-3" },
  { label: "Data Visualization", pct: 84, cssVar: "--skill-color-4" },
];

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

const featuredCourses = coursesData
  .filter((c) => c.homepageOrder !== null && c.homepageOrder !== undefined)
  .sort((a, b) => (a.homepageOrder ?? 0) - (b.homepageOrder ?? 0))
  .slice(0, 4);

const nextWorkshop = workshopData.upcoming[0];
const featuredTestimony = testimonyData[0];

/* ── Slide sub-components ── */

const SlideTracker = ({ animate }: { animate: boolean }) => (
  <div className={`${styles.macSlide} ${styles.macSlideTracker}`}>
    <div className={styles.macTrackerStats}>
      <div className={styles.macStat}>
        <span className={styles.macStatNum}>4.9★</span>
        <span className={styles.macStatLabel}>Avg Rating</span>
      </div>
      <div className={styles.macStat}>
        <span className={styles.macStatNum}>90</span>
        <span className={styles.macStatLabel}>Days to Job Ready</span>
      </div>
      <div className={styles.macStat}>
        <span className={styles.macStatNum}>300+</span>
        <span className={styles.macStatLabel}>Learners Trained</span>
      </div>
    </div>
    <div className={styles.macDivider} />
    <p className={styles.macSkillsLabel}>Skills You&apos;ll Master</p>
    {skillBars.map((s, i) => (
      <div key={i} className={styles.macSkillBar}>
        <div className={styles.macSkillBarInfo}>
          <span>{s.label}</span>
          <span style={{ color: `var(${s.cssVar})` }}>{s.pct}%</span>
        </div>
        <div className={styles.macSkillBarTrack}>
          <motion.div
            className={styles.macSkillBarFill}
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
  <div className={`${styles.macSlide} ${styles.macSlideCourses}`}>
    <div className={styles.macCoursesGrid}>
      {featuredCourses.map((c) => (
        <div
          key={c.id}
          className={styles.macCourseItem}
          style={{ "--c-accent": c.accent } as React.CSSProperties}
        >
          <span className={styles.macCourseIcon}>
            <i className={c.icon} style={{ color: c.accent }} />
          </span>
          <div className={styles.macCourseInfo}>
            <span className={styles.macCourseName}>{c.homepageTitle || c.title}</span>
            <span className={styles.macCourseMeta}>
              {c.duration} · {c.level.split("→")[0].trim()}
            </span>
          </div>
          {c.comingSoon && <span className={styles.macCourseSoon}>Soon</span>}
        </div>
      ))}
    </div>
    <Link href="/courses" className={styles.macCtaLink}>
      View all 7 courses <i className="fas fa-arrow-right" />
    </Link>
  </div>
);

const SlideWorkshop = () => {
  const total = nextWorkshop.totalSeats ?? 30;
  const left = nextWorkshop.seatsLeft ?? 0;
  const fillPct = ((total - left) / total) * 100;
  return (
    <div className={`${styles.macSlide} ${styles.macSlideWorkshop}`}>
      <div className={styles.macWsBadge}>
        <i className="fas fa-calendar-check" /> Next Live Workshop
      </div>
      <h4 className={styles.macWsTitle}>{nextWorkshop.title}</h4>
      <div className={styles.macWsMeta}>
        <span><i className="fas fa-calendar-alt" /> {nextWorkshop.date}</span>
        <span><i className="fas fa-clock" /> {nextWorkshop.time}</span>
        <span><i className="fas fa-signal" /> {nextWorkshop.level}</span>
      </div>
      <div className={styles.macWsFooter}>
        <div className={styles.macWsSeats}>
          <div
            className={styles.macWsSeatsBar}
            style={{ "--fill": `${fillPct}%` } as React.CSSProperties}
          />
          <span>{left} seats left</span>
        </div>
      </div>
      <Link href="/workshops" className={styles.macCtaBtn}>
        Book Your Seat <i className="fas fa-arrow-right" />
      </Link>
    </div>
  );
};

const SlideTestimony = () => (
  <div className={`${styles.macSlide} ${styles.macSlideTestimony}`}>
    <div className={styles.macTestiStars}>
      {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star" />)}
    </div>
    <p className={styles.macTestiQuote}>
      &ldquo;{featuredTestimony.review.slice(0, 140)}&hellip;&rdquo;
    </p>
    <div className={styles.macTestiAuthor}>
      <div className={styles.macTestiAvatar}>{featuredTestimony.name[0]}</div>
      <div>
        <strong>{featuredTestimony.name}</strong>
        <span>{featuredTestimony.position}</span>
      </div>
    </div>
    <div className={styles.macTestiCompanyRow}>
      <span className={styles.macTestiCompanyBadge}>
        <i className="fas fa-briefcase" /> Placed via AnalyticShala
      </span>
    </div>
  </div>
);

const SlideStack = () => (
  <div className={`${styles.macSlide} ${styles.macSlideStack}`}>
    <p className={styles.macStackLabel}>Tools &amp; Technologies You&apos;ll Master</p>
    <div className={styles.macStackGrid}>
      {techStack.map((t, i) => (
        <div
          key={i}
          className={styles.macStackItem}
          style={{ "--t-color": t.color } as React.CSSProperties}
        >
          <i className={t.icon} style={{ color: t.color }} />
          <span>{t.label}</span>
        </div>
      ))}
    </div>
    <div className={styles.macStackFooter}>
      <i className="fas fa-certificate" />
      <span>Certificate included with every course</span>
    </div>
  </div>
);

/* memo to prevent re-render during carousel tick */
const ProgressFill = memo(() => <span className={styles.macProgFill} />);
ProgressFill.displayName = "ProgressFill";

const SLIDES = [
  { id: "tracker", windowTitle: "Career Progress Tracker", component: SlideTracker },
  { id: "courses", windowTitle: "Featured Courses", component: SlideCourses },
  { id: "workshop", windowTitle: "Upcoming Workshop", component: SlideWorkshop },
  { id: "testimony", windowTitle: "Student Success Story", component: SlideTestimony },
  { id: "stack", windowTitle: "Skills You'll Master", component: SlideStack },
];

/* ── Mac Carousel ── */

const MacCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const touchStartX = useRef(0);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % SLIDES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) goTo((current + 1) % SLIDES.length);
    if (diff < -50) goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  const ActiveSlide = SLIDES[current].component;

  return (
    <div
      className={styles.mac}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.macBar}>
        <div className={styles.macDots}>
          <span className={`${styles.macDot} ${styles.macDotR}`} />
          <span className={`${styles.macDot} ${styles.macDotY}`} />
          <span className={`${styles.macDot} ${styles.macDotG}`} />
        </div>
        <span className={styles.macTitle}>{SLIDES[current].windowTitle}</span>
        <div className={styles.macDots} style={{ opacity: 0 }} aria-hidden="true">
          <span className={styles.macDot} />
          <span className={styles.macDot} />
          <span className={styles.macDot} />
        </div>
      </div>

      <div className={styles.macBody}>
        <motion.div
          key={animKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <ActiveSlide animate={current === 0} />
        </motion.div>
      </div>

      <div className={styles.macProgress} role="tablist">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={styles.macProgTrack}
            onClick={() => goTo(i)}
            aria-label={`Go to slide: ${s.windowTitle}`}
            aria-current={i === current ? "true" : undefined}
            role="tab"
          >
            <span className={styles.macProgBar}>
              {i < current && <span className={`${styles.macProgFill} ${styles.macProgFillPast}`} />}
              {i === current && <ProgressFill key={animKey} />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── Hero ── */

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
  <section className={styles.hero} id="hero">
    <div className={`${styles.orb} ${styles.orb1}`} />
    <div className={`${styles.orb} ${styles.orb2}`} />
    <div className={`${styles.orb} ${styles.orb3}`} />

    <main className={styles.main}>
      <div className={styles.left}>
        <motion.div
          className={styles.badge}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <i className="fas fa-graduation-cap" />
          India&apos;s fastest growing data analytics community
        </motion.div>

        <div className={styles.titleBlock}>
          <motion.h1
            className={styles.headline}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <span className={styles.headlineTop}>Turn Data Into</span>
            <span className={styles.headlineBottom}>Your Dream Career.</span>
          </motion.h1>

          <motion.div
            className={styles.typewriter}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Master&nbsp;
            <span className={styles.typewriterHighlight}>
              {mounted && (
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
              )}
            </span>
            &nbsp;&amp; land your first data role in 90 days.
          </motion.div>
        </div>

        <motion.div
          className={styles.buttons}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <Link href="/courses" className={styles.btnPrimary}>
            Explore Courses <i className="fas fa-arrow-right" />
          </Link>
          <Link href="/workshops" className={styles.btnGhost}>
            <i className="fas fa-play-circle" /> Visit Workshops
          </Link>
        </motion.div>

        <motion.div
          className={styles.trust}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3.5}
        >
          <span><i className="fas fa-check-circle" /> 2 Free Trial Classes</span>
          <span><i className="fas fa-check-circle" /> 1:1 Career Mentorship</span>
          <span><i className="fas fa-check-circle" /> Job Placement Support</span>
        </motion.div>

        <motion.div
          className={styles.mobileStats}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          {mobileStats.map((s) => (
            <div key={s.label} className={styles.mobileStat}>
              <span className={styles.mobileStatNum}>{s.num}</span>
              <span className={styles.mobileStatLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className={styles.right}
        initial={{ opacity: 0, x: 48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <MacCarousel />

        <motion.div
          className={`${styles.pill} ${styles.pill1}`}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          <i className="fas fa-briefcase" /> Hiring Partners
        </motion.div>

        <motion.div
          className={`${styles.pill} ${styles.pill2}`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        >
          <i className="fas fa-users" /> 500+ Alumni
        </motion.div>

        <motion.div
          className={`${styles.pill} ${styles.pill3}`}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 0.2 }}
        >
          <i className="fas fa-certificate" /> Certified Courses
        </motion.div>
      </motion.div>
    </main>

    <div className={styles.marqStrip}>
      <Marq data={heroMarqData} />
    </div>
  </section>
  );
};

export default Hero;
