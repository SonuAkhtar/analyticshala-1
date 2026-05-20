"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { testimonyData } from "@/data/appData";
import styles from "./testimony.module.css";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.58,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

const heroStats = [
  { num: "300+", label: "Learners Trained", icon: "fas fa-graduation-cap" },
  { num: "4.9★", label: "Average Rating", icon: "fas fa-star" },
  { num: "Weekend", label: "Live Batches", icon: "fas fa-calendar-alt" },
  { num: "11+", label: "Years Teaching", icon: "fas fa-chalkboard-teacher" },
];

const trustItems = [
  { icon: "fas fa-chalkboard-teacher", text: "Industry Expert Trainers" },
  { icon: "fas fa-certificate", text: "Recognised Certificates" },
  { icon: "fas fa-users", text: "300+ Learners Community" },
  { icon: "fas fa-headset", text: "Lifetime Mentor Access" },
  { icon: "fas fa-briefcase", text: "Career Placement Support" },
];

const alumniCompanies = [
  { icon: "fas fa-building", name: "Infosys" },
  { icon: "fas fa-building", name: "Wipro" },
  { icon: "fas fa-building", name: "Genpact" },
  { icon: "fas fa-building", name: "Accenture" },
  { icon: "fas fa-building", name: "Deloitte" },
  { icon: "fas fa-building", name: "IBM" },
];

const parsePosition = (pos = "") => {
  const [role, company] = pos.split("@");
  return { role: role.trim(), company: company ? company.trim() : "" };
};

const TestimonyCard = ({
  t,
  featured = false,
}: {
  t: (typeof testimonyData)[0];
  featured?: boolean;
}) => {
  const { role, company } = parsePosition(t.position);
  return (
    <div className={`${styles.card} ${featured ? styles.cardFeatured : ""}`}>
      <div className={styles.cardStars}>
        {[...Array(5)].map((_, i) => (
          <i key={i} className="fas fa-star" />
        ))}
      </div>
      <p className={styles.cardReview}>&ldquo;{t.review}&rdquo;</p>
      <div className={styles.cardAuthor}>
        <div className={styles.cardAuthorImgWrap}>
          <img src={t.image} alt={t.name} />
        </div>
        <div className={styles.cardAuthorInfo}>
          <strong className={styles.cardAuthorName}>{t.name}</strong>
          <span className={styles.cardAuthorRole}>{role}</span>
          {company && (
            <span className={styles.cardAuthorCompany}>
              <i className="fas fa-briefcase" /> {company}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function TestimonyPageClient() {
  const featured = testimonyData[0];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`container ${styles.heroInner}`}>
          <motion.h1 className={styles.heroHeading} {...fadeUp(0.07)}>
            Real People.
            <br />
            <span className={styles.gradientText}>Real Results.</span>
          </motion.h1>

          <motion.p className={styles.heroSub} {...fadeUp(0.13)}>
            Over 500 professionals have transformed their careers with
            AnalyticShala. Here&apos;s what they have to say.
          </motion.p>

          <motion.div className={styles.statsRow} {...fadeUp(0.18)}>
            {heroStats.map((s, i) => (
              <div key={i} className={styles.statItem}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
                {i < heroStats.length - 1 && (
                  <span className={styles.statSep}>·</span>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div className={styles.heroActions} {...fadeUp(0.23)}>
            <Link
              href="/workshops"
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              Join the Next Batch <i className="fas fa-arrow-right" />
            </Link>
            <a
              href="https://wa.me/918882641988"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnGhost}`}
            >
              <i className="fab fa-whatsapp" /> Talk to an Alumnus
            </a>
          </motion.div>

          <motion.div
            className={styles.heroQuote}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className={styles.heroQuoteMark}>
              <i className="fas fa-quote-left" />
            </div>
            <p className={styles.heroQuoteText}>
              &ldquo;{featured.review}&rdquo;
            </p>
            <div className={styles.heroQuoteAuthor}>
              <img src={featured.image} alt={featured.name} />
              <div>
                <strong>{featured.name}</strong>
                <span>{featured.position}</span>
              </div>
              <div className={styles.heroQuoteStars}>
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className={`container ${styles.statsBarInner}`}>
          {heroStats.map((s, i) => (
            <div key={i} className={styles.statsBarItem}>
              <i className={`${s.icon} ${styles.statsBarIcon}`} />
              <span className={styles.statsBarNum}>{s.num}</span>
              <span className={styles.statsBarLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Full masonry/grid of all testimonials */}
      <section className={styles.reviews}>
        <div className="container">
          <motion.span className={styles.eyebrow} {...fadeUp(0)}>
            <i className="fas fa-quote-left" /> What They Say
          </motion.span>
          <motion.h2 className={styles.sectionTitle} {...fadeUp(0.07)}>
            Straight from Our Alumni
          </motion.h2>
          <motion.p className={styles.sectionSub} {...fadeUp(0.12)}>
            No scripts. No filters. Honest accounts from students who chose to
            invest in themselves - and it paid off.
          </motion.p>

          <div className={styles.grid}>
            {testimonyData.map((t, i) => (
              <TestimonyCard key={t.id} t={t} featured={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Alumni strip */}
      <div className={styles.alumniStrip}>
        <div className={`container ${styles.alumniInner}`}>
          <span className={styles.alumniLabel}>Our alumni now work at</span>
          <div className={styles.alumniCompanies}>
            {alumniCompanies.map((c, i) => (
              <span key={i} className={styles.alumniChip}>
                <i className={c.icon} /> {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Trust */}
      <section className={styles.trust}>
        <div className={`container ${styles.trustInner}`}>
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              className={styles.trustItem}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <span className={styles.trustIcon}>
                <i className={item.icon} />
              </span>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <motion.div className={styles.ctaPills} {...fadeUp(0)}>
            <Link href="/workshops" className={styles.ctaPill}>
              Browse Workshops
            </Link>
            <span className={styles.ctaPillSep} />
            <Link
              href="/#contact"
              className={`${styles.ctaPill} ${styles.ctaPillAccent}`}
            >
              Get in Touch
            </Link>
          </motion.div>

          <motion.h2 className={styles.ctaHeading} {...fadeUp(0.08)}>
            Ready to Write Your
            <br />
            Own Success Story?
          </motion.h2>

          <motion.p className={styles.ctaSub} {...fadeUp(0.14)}>
            Join a weekend workshop or enroll in a full course. Hundreds of
            students already made the move - now it&apos;s your turn.
          </motion.p>

          <motion.div className={styles.ctaActions} {...fadeUp(0.2)}>
            <Link
              href="/workshops"
              className={`${styles.btn} ${styles.btnCtaDark}`}
            >
              Join the Next Batch <i className="fas fa-arrow-right" />
            </Link>
            <Link
              href="/#contact"
              className={`${styles.btn} ${styles.btnCtaOutline}`}
            >
              <i className="fas fa-comment-dots" /> Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
