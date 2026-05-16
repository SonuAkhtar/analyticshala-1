import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./aboutUs.css";

import Reveal from "../../components/Reveal/Reveal";
import { teamData } from "../../../appData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const staggerGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroTags = [
  { label: "Data Analytics", icon: "fas fa-chart-bar" },
  { label: "Machine Learning", icon: "fas fa-brain" },
  { label: "AI & GenAI", icon: "fas fa-robot", active: true },
];

const heroStats = [
  { icon: "fas fa-calendar-alt", num: "11+", label: "Years of Excellence" },
  { icon: "fas fa-users", num: "500+", label: "Students Trained" },
  { icon: "fas fa-book-open", num: "10+", label: "Courses Offered" },
  { icon: "fas fa-star", num: "4.9★", label: "Average Rating" },
];

const focusAreas = [
  {
    icon: "fas fa-chart-bar",
    gradientFrom: "#6366f1",
    gradientTo: "#a855f7",
    title: "Data Analytics",
    desc: "Master Excel, SQL, Power BI, and Tableau to become the analyst every company needs.",
    cta: "Get Started",
  },
  {
    icon: "fas fa-brain",
    gradientFrom: "#a855f7",
    gradientTo: "#ec4899",
    title: "Data Science & AI",
    desc: "Build predictive models, ML pipelines, and explore GenAI — with Python at the core.",
    cta: "Get Started",
  },
  {
    icon: "fas fa-briefcase",
    gradientFrom: "#06b6d4",
    gradientTo: "#3b82f6",
    title: "Career Development",
    desc: "Resume building, mock interviews, LinkedIn audits, and warm intros to hiring partners.",
    cta: "Get Started",
  },
];

const values = [
  {
    icon: "fas fa-graduation-cap",
    color: "#6366f1",
    title: "Student-First Always",
    desc: "Every course, resource, and support system is built around one goal — your success. Not just completion, but real transformation.",
  },
  {
    icon: "fas fa-industry",
    color: "#f97316",
    title: "Industry-Led Curriculum",
    desc: "Our trainers are active professionals. The curriculum is validated by hiring managers — not academics locked in classrooms.",
  },
  {
    icon: "fas fa-flask",
    color: "#a855f7",
    title: "Learn by Doing",
    desc: "No theory dumps. Real datasets, live capstone projects, and problems sourced directly from industry use cases.",
  },
  {
    icon: "fas fa-rocket",
    color: "#10b981",
    title: "Career-Focused Outcomes",
    desc: "Our job isn't done when the course ends. Resume reviews, interview simulations, and alumni network access — for life.",
  },
];

const steps = [
  {
    num: "01",
    title: "Initial Consultation",
    desc: "We map your background, goals, and timeline then recommend the perfect track for you.",
    icon: "fas fa-comments",
  },
  {
    num: "02",
    title: "Structured Learning",
    desc: "Live cohort sessions, weekly assignments, and real-world datasets guided by industry mentors.",
    icon: "fas fa-laptop-code",
    active: true,
  },
  {
    num: "03",
    title: "Capstone Projects",
    desc: "Build end-to-end projects solving real business problems and add them to your portfolio.",
    icon: "fas fa-layer-group",
  },
  {
    num: "04",
    title: "Placement Support",
    desc: "Resume reviews, mock interviews, and warm introductions to 50+ hiring partners.",
    icon: "fas fa-handshake",
  },
];

const alumniCompanies = [
  { name: "Microsoft", icon: "fab fa-microsoft" },
  { name: "Amazon", icon: "fab fa-amazon" },
  { name: "Google", icon: "fab fa-google" },
  { name: "IBM", icon: "fas fa-server" },
  { name: "Deloitte", icon: "fas fa-building" },
  { name: "TCS", icon: "fas fa-laptop-code" },
  { name: "Infosys", icon: "fas fa-code" },
  { name: "Paytm", icon: "fas fa-mobile-alt" },
];

const AboutUs = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          const pos = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: pos, behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="about">
      <section className="about__hero">
        <div className="about__hero-orb-bg about__hero-orb-bg--1" />
        <div className="about__hero-orb-bg about__hero-orb-bg--2" />

        <div className="container about__hero-grid">
          {/* Left */}
          <div className="about__hero-left">
            <motion.div className="about__hero-tag-row" {...fadeUp(0.04)}>
              {heroTags.map((tag, i) => (
                <span
                  key={i}
                  className={`about__hero-tag${tag.active ? " about__hero-tag--active" : ""}`}
                >
                  <i className={tag.icon} />
                  {tag.label}
                </span>
              ))}
            </motion.div>

            <motion.h1 className="about__hero-heading" {...fadeUp(0.1)}>
              Empowering
              <span className="about__accent-text"> India&apos;s</span>
              <br />
              Data Professionals
              <span className="about__accent-dot">.</span>
            </motion.h1>

            <motion.p className="about__hero-sub" {...fadeUp(0.17)}>
              A Gurgaon-based data education company on a mission to bridge the
              gap between ambition and opportunity — one career at a time.
            </motion.p>

            <motion.div className="about__hero-actions" {...fadeUp(0.23)}>
              <Link to="/courses" className="about__btn--primary">
                Explore Courses <i className="fas fa-arrow-right" />
              </Link>
              <Link to="/workshops" className="about__btn--ghost">
                How It Works
              </Link>
            </motion.div>

            <motion.div className="about__hero-proof" {...fadeUp(0.29)}>
              <div className="about__hero-avatars">
                {["SA", "RK", "NP", "AJ"].map((init, i) => (
                  <span
                    key={i}
                    className="about__hero-avatar"
                    style={{ "--av-i": i }}
                  >
                    {init}
                  </span>
                ))}
              </div>
              <div className="about__hero-proof-text">
                <div className="about__hero-proof-row">
                  <strong>320K+</strong>
                  <span>Happy students</span>
                </div>
                <div className="about__hero-proof-stars">
                  ★★★★★
                  <em>5.0 from 2,500+ reviews</em>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — abstract visual */}
          <motion.div
            className="about__hero-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about__hero-visual">
              <div className="about__hero-sphere" />
              <div className="about__hero-ring about__hero-ring--1" />
              <div className="about__hero-ring about__hero-ring--2" />

              <div className="about__hero-chip about__hero-chip--1">
                <i className="fas fa-graduation-cap" />
                <div>
                  <strong>500+</strong>
                  <span>Alumni Placed</span>
                </div>
              </div>
              <div className="about__hero-chip about__hero-chip--2">
                <i className="fas fa-star" />
                <div>
                  <strong>4.9★</strong>
                  <span>Avg Rating</span>
                </div>
              </div>
              <div className="about__hero-chip about__hero-chip--3">
                Your Partner in Progress
                <i className="fas fa-arrow-right" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="about__stats">
          <div className="container about__stats-inner">
            {heroStats.map((s, i) => (
              <motion.div
                key={i}
                className="about__stat"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <span className="about__stat-num">{s.num}</span>
                <span className="about__stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about__dark">
        <div className="container">
          <div className="about__dark-header">
            <div className="about__dark-header-left">
              <motion.span
                className="about__eyebrow about__eyebrow--inv"
                {...fadeUp(0)}
              >
                <i className="fas fa-layer-group" /> What We Offer
              </motion.span>
              <motion.h2 className="about__dark-heading" {...fadeUp(0.08)}>
                Beyond Skills,
                <br />
                Toward Careers
              </motion.h2>
            </div>
            <motion.p className="about__dark-sub" {...fadeUp(0.12)}>
              Innovative data education tailored to take you beyond fundamentals
              and into real opportunities. Our experts are with you every step.
            </motion.p>
          </div>

          <motion.div
            className="about__dark-grid"
            variants={staggerGrid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {focusAreas.map((area, i) => (
              <motion.div
                key={i}
                className="about__dark-card"
                style={{
                  "--dc-from": area.gradientFrom,
                  "--dc-to": area.gradientTo,
                }}
                variants={staggerItem}
              >
                <div className="about__dark-card-visual">
                  <div className="about__dark-card-blob" />
                  <i className={area.icon} />
                </div>
                <div className="about__dark-card-body">
                  <h3>{area.title}</h3>
                  <p>{area.desc}</p>
                  <Link to="/courses" className="about__dark-card-cta">
                    {area.cta} <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="about__logos">
        <div className="container about__logos-inner">
          <span className="about__logos-label">
            <i className="fas fa-briefcase" /> Our alumni now work at
          </span>
          <div className="about__logos-row">
            {[...alumniCompanies, ...alumniCompanies].map((co, i) => (
              <span key={i} className="about__logos-chip">
                <i className={co.icon} /> {co.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="about__impact">
        <div className="container about__impact-grid">
          <div className="about__impact-left">
            <motion.span className="about__eyebrow" {...fadeUp(0)}>
              <i className="fas fa-bullseye" /> About
            </motion.span>
            <motion.h2 className="about__impact-heading" {...fadeUp(0.08)}>
              Results Crafted,
              <br />
              Careers Achieved
            </motion.h2>
            <motion.p className="about__impact-body" {...fadeUp(0.13)}>
              <strong>Your Growth, Our Business.</strong> We partner with every
              student through a proven learning journey — from fundamentals to
              full career support. Our curriculum is built on industry reality,
              not textbook theory.
            </motion.p>
            <motion.div className="about__impact-actions" {...fadeUp(0.18)}>
              <Link to="/courses" className="about__btn--primary">
                Our Courses <i className="fas fa-arrow-right" />
              </Link>
              <Link to="/workshops" className="about__btn--ghost">
                Learn More
              </Link>
            </motion.div>
            <motion.div className="about__impact-nums" {...fadeUp(0.23)}>
              <div className="about__impact-num">
                <strong>
                  500<span>+</span>
                </strong>
                <span>Happy alumni</span>
              </div>
              <div className="about__impact-divider" />
              <div className="about__impact-num">
                <strong>
                  94.9<span>%</span>
                </strong>
                <span>Proven placement</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="about__impact-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <div className="about__impact-visual">
              <div className="about__impact-sphere" />
              <div className="about__impact-float about__impact-float--1">
                <i className="fas fa-star" />
                <div>
                  <span>Avg Rating</span>
                  <strong>4.9★</strong>
                </div>
              </div>
              <div className="about__impact-float about__impact-float--2">
                <i className="fas fa-users" />
                <div>
                  <span>Learners Trained</span>
                  <strong>300+</strong>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="about__steps">
        <div className="container">
          <div className="about__steps-header">
            <div className="about__steps-header-left">
              <motion.h2 className="about__steps-heading" {...fadeUp(0.05)}>
                Mastering Data,
                <br />
                Elevating You
              </motion.h2>
            </div>
            <div className="about__steps-header-right">
              <motion.span className="about__eyebrow" {...fadeUp(0)}>
                <i className="fas fa-route" /> How It Works
              </motion.span>
              <motion.p className="about__steps-sub" {...fadeUp(0.08)}>
                We simplify education so you can focus on building your legacy
                with confidence and clarity.
              </motion.p>
            </div>
          </div>

          <motion.div
            className="about__steps-grid"
            variants={staggerGrid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className={`about__step${step.active ? " about__step--active" : ""}`}
                variants={staggerItem}
              >
                <div className="about__step-num-label">{step.num}</div>
                <div className="about__step-icon-wrap">
                  <i className={step.icon} />
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
                <Link to="/courses" className="about__step-link">
                  Next <i className="fas fa-arrow-right" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="about__mission" id="reveal">
        <div className="container">
          <motion.span className="about__eyebrow" {...fadeUp(0)}>
            <i className="fas fa-bullseye" /> Our Mission
          </motion.span>
          <motion.h2 className="about__section-title" {...fadeUp(0.08)}>
            What We Stand For
          </motion.h2>
          <motion.p className="about__section-sub" {...fadeUp(0.12)}>
            Scroll through our mission — watch it come to life.
          </motion.p>
          <motion.div
            className="about__reveal-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Reveal />
          </motion.div>
        </div>
      </section>

      <section className="about__values">
        <div className="container">
          <motion.span className="about__eyebrow" {...fadeUp(0)}>
            <i className="fas fa-heart" /> Our Values
          </motion.span>
          <motion.h2 className="about__section-title" {...fadeUp(0.08)}>
            The Principles That Drive Us
          </motion.h2>
          <motion.p className="about__section-sub" {...fadeUp(0.14)}>
            These aren&apos;t just words on a wall. They shape every decision we
            make, every course we build, and every student we support.
          </motion.p>

          <motion.div
            className="about__values-grid"
            variants={staggerGrid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="about__values-card"
                style={{ "--vc": v.color }}
                variants={staggerItem}
              >
                <div className="about__values-icon">
                  <i className={v.icon} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="about__team" id="team">
        <div className="container about__team-layout">
          <div className="about__team-text">
            <motion.span className="about__eyebrow" {...fadeUp(0)}>
              <i className="fas fa-users" /> Our Best Team
            </motion.span>
            <motion.h2 className="about__team-heading" {...fadeUp(0.08)}>
              Our experts blend data wisdom
            </motion.h2>
            <motion.p className="about__team-sub" {...fadeUp(0.14)}>
              Meet the team that turns numbers into opportunity. Our experts
              blend real-world data education with industry innovation.
            </motion.p>
            <motion.div {...fadeUp(0.2)}>
              <Link to="/courses" className="about__team-view-all">
                View All Team <i className="fas fa-arrow-right" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="about__team-grid"
            variants={staggerGrid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {teamData.slice(0, 3).map((member) => (
              <motion.div
                key={member.id}
                className="about__team-card"
                variants={staggerItem}
              >
                <div className="about__team-photo-wrap">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="about__team-photo"
                  />
                  <div className="about__team-overlay">
                    <div className="about__team-socials">
                      {member.social.map((link, j) => (
                        <a
                          key={j}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="about__team-social-btn"
                        >
                          <i className={link.iconClass} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="about__team-info">
                  <h4 className="about__team-name">{member.name}</h4>
                  <span className="about__team-role">{member.position}</span>
                  {member.college && (
                    <span className="about__team-badge">
                      <i className="fas fa-award" /> {member.college}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
