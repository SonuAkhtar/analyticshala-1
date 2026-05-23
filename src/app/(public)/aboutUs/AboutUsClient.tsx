"use client";

import { useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal/Reveal";
import { teamData } from "@/data/appData";
import styles from "./aboutUs.module.css";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.55,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
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
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const heroTags = [
  { label: "Data Analytics", icon: "fas fa-chart-bar" },
  { label: "Machine Learning", icon: "fas fa-brain" },
  { label: "AI & GenAI", icon: "fas fa-robot", active: true },
];

const heroStats = [
  { num: "11+", label: "Years of Excellence" },
  { num: "300+", label: "Students Trained" },
  { num: "10+", label: "Courses Offered" },
  { num: "4.9★", label: "Average Rating" },
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
    desc: "Build predictive models, ML pipelines, and explore GenAI - with Python at the core.",
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
    desc: "Every course, resource, and support system is built around one goal - your success. Not just completion, but real transformation.",
  },
  {
    icon: "fas fa-industry",
    color: "#f97316",
    title: "Industry-Led Curriculum",
    desc: "Our trainers are active professionals. The curriculum is validated by hiring managers - not academics locked in classrooms.",
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
    desc: "Our job isn't done when the course ends. Resume reviews, interview simulations, and students network access - for life.",
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

const studentsCompanies = [
  { name: "Microsoft", icon: "fab fa-microsoft" },
  { name: "Amazon", icon: "fab fa-amazon" },
  { name: "Google", icon: "fab fa-google" },
  { name: "IBM", icon: "fas fa-server" },
  { name: "Deloitte", icon: "fas fa-building" },
  { name: "TCS", icon: "fas fa-laptop-code" },
  { name: "Infosys", icon: "fas fa-code" },
  { name: "Paytm", icon: "fas fa-mobile-alt" },
];

export default function AboutUsClient() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          const pos = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: pos, behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname]);

  return (
    <div className={styles.about}>
      <section className={styles.hero}>
        <div className={`${styles.heroOrbBg} ${styles.heroOrbBg1}`} />
        <div className={`${styles.heroOrbBg} ${styles.heroOrbBg2}`} />

        <div className={`container ${styles.heroGrid}`}>
          {/* Left */}
          <div className={styles.heroLeft}>
            <motion.div className={styles.heroTagRow} {...fadeUp(0.04)}>
              {heroTags.map((tag, i) => (
                <span
                  key={i}
                  className={`${styles.heroTag} ${tag.active ? styles.heroTagActive : ""}`}
                >
                  <i className={tag.icon} />
                  {tag.label}
                </span>
              ))}
            </motion.div>

            <motion.h1 className={styles.heroHeading} {...fadeUp(0.1)}>
              Empowering
              <span className={styles.accentText}> India&apos;s</span>
              <br />
              Data Professionals
              <span className={styles.accentDot}>.</span>
            </motion.h1>

            <motion.p className={styles.heroSub} {...fadeUp(0.17)}>
              A Gurgaon-based data education company on a mission to bridge the
              gap between ambition and opportunity - one career at a time.
            </motion.p>

            <motion.div className={styles.heroActions} {...fadeUp(0.23)}>
              <Link href="/courses" className={styles.btnPrimary}>
                Explore Courses <i className="fas fa-arrow-right" />
              </Link>
              <Link href="/workshops" className={styles.btnGhost}>
                How It Works
              </Link>
            </motion.div>
          </div>

          {/* Right - abstract visual */}
          <motion.div
            className={styles.heroRight}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className={styles.heroVisual}>
              <div className={styles.heroSphere} />
              <div className={`${styles.heroRing} ${styles.heroRing1}`} />
              <div className={`${styles.heroRing} ${styles.heroRing2}`} />

              <div className={`${styles.heroChip} ${styles.heroChip1}`}>
                <i className="fas fa-graduation-cap" />
                <div>
                  <strong>300+</strong>
                  <span>Students Trained</span>
                </div>
              </div>
              <div className={`${styles.heroChip} ${styles.heroChip2}`}>
                <i className="fas fa-star" />
                <div>
                  <strong>4.9★</strong>
                  <span>Avg Rating</span>
                </div>
              </div>
              <div className={`${styles.heroChip} ${styles.heroChip3}`}>
                Your Partner in Progress
                <i className="fas fa-arrow-right" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className={styles.stats}>
          <div className={`container ${styles.statsInner}`}>
            {heroStats.map((s, i) => (
              <motion.div
                key={i}
                className={styles.stat}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.dark}>
        <div className="container">
          <div className={styles.darkHeader}>
            <div className={styles.darkHeaderLeft}>
              <motion.span
                className={`${styles.eyebrow} ${styles.eyebrowInv}`}
                {...fadeUp(0)}
              >
                <i className="fas fa-layer-group" /> What We Offer
              </motion.span>
              <motion.h2 className={styles.darkHeading} {...fadeUp(0.08)}>
                Beyond Skills,
                <br />
                Toward Careers
              </motion.h2>
            </div>
            <motion.p className={styles.darkSub} {...fadeUp(0.12)}>
              Innovative data education tailored to take you beyond fundamentals
              and into real opportunities. Our experts are with you every step.
            </motion.p>
          </div>

          <motion.div
            className={styles.darkGrid}
            variants={staggerGrid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {focusAreas.map((area, i) => (
              <motion.div
                key={i}
                className={styles.darkCard}
                style={
                  {
                    "--dc-from": area.gradientFrom,
                    "--dc-to": area.gradientTo,
                  } as React.CSSProperties
                }
                variants={staggerItem}
              >
                <div className={styles.darkCardVisual}>
                  <div className={styles.darkCardBlob} />
                  <i className={area.icon} />
                </div>
                <div className={styles.darkCardBody}>
                  <h3>{area.title}</h3>
                  <p>{area.desc}</p>
                  <Link href="/courses" className={styles.darkCardCta}>
                    {area.cta} <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className={styles.logos}>
        <div className={`container ${styles.logosInner}`}>
          <span className={styles.logosLabel}>
            <i className="fas fa-briefcase" /> Our students now work at
          </span>
          <div className={styles.logosRow}>
            {[...studentsCompanies, ...studentsCompanies].map((co, i) => (
              <span key={i} className={styles.logosChip}>
                <i className={co.icon} /> {co.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.impact}>
        <div className={`container ${styles.impactGrid}`}>
          <div>
            <motion.span className={styles.eyebrow} {...fadeUp(0)}>
              <i className="fas fa-bullseye" /> About
            </motion.span>
            <motion.h2 className={styles.impactHeading} {...fadeUp(0.08)}>
              Results Crafted,
              <br />
              Careers Achieved
            </motion.h2>
            <motion.p className={styles.impactBody} {...fadeUp(0.13)}>
              <strong>Your Growth, Our Business.</strong> We partner with every
              student through a proven learning journey - from fundamentals to
              full career support. Our curriculum is built on industry reality,
              not textbook theory.
            </motion.p>
            <motion.div className={styles.impactActions} {...fadeUp(0.18)}>
              <Link href="/courses" className={styles.btnPrimary}>
                Our Courses <i className="fas fa-arrow-right" />
              </Link>
              <Link href="/workshops" className={styles.btnGhost}>
                Learn More
              </Link>
            </motion.div>
            <motion.div className={styles.impactNums} {...fadeUp(0.23)}>
              <div className={styles.impactNum}>
                <strong>
                  300<span>+</span>
                </strong>
                <span>Happy students</span>
              </div>
              <div className={styles.impactDivider} />
              <div className={styles.impactNum}>
                <strong>
                  94.9<span>%</span>
                </strong>
                <span>Proven placement</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className={styles.impactRight}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <div className={styles.impactVisual}>
              <div className={styles.impactSphere} />
              <div className={`${styles.impactFloat} ${styles.impactFloat1}`}>
                <i className="fas fa-star" />
                <div>
                  <span>Avg Rating</span>
                  <strong>4.9★</strong>
                </div>
              </div>
              <div className={`${styles.impactFloat} ${styles.impactFloat2}`}>
                <i className="fas fa-users" />
                <div>
                  <span>Students Trained</span>
                  <strong>300+</strong>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.steps}>
        <div className="container">
          <div className={styles.stepsHeader}>
            <div>
              <motion.h2 className={styles.stepsHeading} {...fadeUp(0.05)}>
                Mastering Data,
                <br />
                Elevating You
              </motion.h2>
            </div>
            <div>
              <motion.span className={styles.eyebrow} {...fadeUp(0)}>
                <i className="fas fa-route" /> How It Works
              </motion.span>
              <motion.p className={styles.stepsSub} {...fadeUp(0.08)}>
                We simplify education so you can focus on building your legacy
                with confidence and clarity.
              </motion.p>
            </div>
          </div>

          <motion.div
            className={styles.stepsGrid}
            variants={staggerGrid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className={`${styles.step} ${step.active ? styles.stepActive : ""}`}
                variants={staggerItem}
              >
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepIconWrap}>
                  <i className={step.icon} />
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={styles.mission} id="reveal">
        <div className="container">
          <motion.span className={styles.eyebrow} {...fadeUp(0)}>
            <i className="fas fa-bullseye" /> Our Mission
          </motion.span>
          <motion.h2 className={styles.sectionTitle} {...fadeUp(0.08)}>
            What We Stand For
          </motion.h2>
          <motion.p className={styles.sectionSub} {...fadeUp(0.12)}>
            Scroll through our mission - watch it come to life.
          </motion.p>
          <motion.div
            className={styles.revealWrap}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Reveal />
          </motion.div>
        </div>
      </section>

      <section className={styles.values}>
        <div className="container">
          <motion.span className={styles.eyebrow} {...fadeUp(0)}>
            <i className="fas fa-heart" /> Our Values
          </motion.span>
          <motion.h2 className={styles.sectionTitle} {...fadeUp(0.08)}>
            The Principles That Drive Us
          </motion.h2>
          <motion.p className={styles.sectionSub} {...fadeUp(0.14)}>
            These aren&apos;t just words on a wall. They shape every decision we
            make, every course we build, and every student we support.
          </motion.p>

          <motion.div
            className={styles.valuesGrid}
            variants={staggerGrid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                className={styles.valuesCard}
                style={{ "--vc": v.color } as React.CSSProperties}
                variants={staggerItem}
              >
                <div className={styles.valuesIcon}>
                  <i className={v.icon} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={styles.team} id="team">
        <div className={`container ${styles.teamLayout}`}>
          <div className={styles.teamText}>
            <motion.span className={styles.eyebrow} {...fadeUp(0)}>
              <i className="fas fa-users" /> Our Best Team
            </motion.span>
            <motion.h2 className={styles.teamHeading} {...fadeUp(0.08)}>
              People who&apos;ve been where you&apos;re going
            </motion.h2>
            <motion.p className={styles.teamSub} {...fadeUp(0.14)}>
              Industry practitioners - not academics. Each mentor has shipped
              real data products and now teaches what actually works in the
              market.
            </motion.p>
            <motion.div {...fadeUp(0.2)}>
              <Link href="/#homeTeam" className={styles.teamViewAll}>
                Meet the full team <i className="fas fa-arrow-right" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            className={styles.teamGrid}
            variants={staggerGrid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {teamData.slice(0, 3).map((member) => (
              <motion.div
                key={member.id}
                className={styles.teamCard}
                variants={staggerItem}
              >
                <div className={styles.teamPhotoWrap}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={styles.teamPhoto}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className={styles.teamOverlay}>
                    <div className={styles.teamSocials}>
                      {member.social.map((link, j) => (
                        <a
                          key={j}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.teamSocialBtn}
                        >
                          <i className={link.iconClass} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.teamInfo}>
                  <h4 className={styles.teamName}>{member.name}</h4>
                  <span className={styles.teamRole}>{member.position}</span>
                  {member.college && (
                    <span className={styles.teamBadge}>
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
}
