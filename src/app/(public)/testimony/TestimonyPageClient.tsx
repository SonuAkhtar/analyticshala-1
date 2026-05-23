"use client";

import Image from "next/image";
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

const studentsCompanies = [
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
          <Image src={t.image} alt={t.name} width={42} height={42} />
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
  const peeks = testimonyData.slice(1, 4);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <div className={`${styles.heroBlob} ${styles.heroBlob1}`} />
          <div className={`${styles.heroBlob} ${styles.heroBlob2}`} />
          <div className={`${styles.heroBlob} ${styles.heroBlob3}`} />
          <div className={styles.heroGrid} />
        </div>

        {/* Decorative floating avatar peeks (desktop only) */}
        {peeks[0] && (
          <div
            className={`${styles.heroPeek} ${styles.heroPeekLeft}`}
            aria-hidden="true"
          >
            <Image
              src={peeks[0].image}
              alt=""
              width={56}
              height={56}
            />
            <span className={styles.heroPeekStars}>
              {"★".repeat(5)}
            </span>
          </div>
        )}
        {peeks[1] && (
          <div
            className={`${styles.heroPeek} ${styles.heroPeekRight}`}
            aria-hidden="true"
          >
            <Image
              src={peeks[1].image}
              alt=""
              width={48}
              height={48}
            />
            <span className={styles.heroPeekStars}>
              {"★".repeat(5)}
            </span>
          </div>
        )}
        {peeks[2] && (
          <div
            className={`${styles.heroPeek} ${styles.heroPeekTopRight}`}
            aria-hidden="true"
          >
            <Image
              src={peeks[2].image}
              alt=""
              width={44}
              height={44}
            />
          </div>
        )}

        <div className={`container ${styles.heroInner}`}>
          <motion.div className={styles.heroEyebrow} {...fadeUp(0)}>
            <span className={styles.heroEyebrowStars}>
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star" />
              ))}
            </span>
            <span className={styles.heroEyebrowText}>
              Trusted by <strong>300+ students</strong>
            </span>
          </motion.div>

          <motion.h1 className={styles.heroHeading} {...fadeUp(0.07)}>
            Real People.
            <br />
            <span className={styles.gradientText}>Real Results.</span>
          </motion.h1>

          <motion.p className={styles.heroSub} {...fadeUp(0.13)}>
            Over 300 professionals have transformed their careers with
            AnalyticShala. Their unfiltered stories - straight from the people
            who lived them.
          </motion.p>

          <motion.div className={styles.statGrid} {...fadeUp(0.18)}>
            {heroStats.map((s, i) => (
              <div key={i} className={styles.statTile}>
                <div className={styles.statTileIcon}>
                  <i className={s.icon} />
                </div>
                <span className={styles.statTileNum}>{s.num}</span>
                <span className={styles.statTileLabel}>{s.label}</span>
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
            <div className={styles.heroQuoteTop}>
              <div className={styles.heroQuoteStars}>
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star" />
                ))}
              </div>
              <span className={styles.heroQuoteVerified}>
                <i className="fas fa-check-circle" /> Verified student
              </span>
            </div>
            <div className={styles.heroQuoteMark}>
              <i className="fas fa-quote-left" />
            </div>
            <p className={styles.heroQuoteText}>
              &ldquo;{featured.review}&rdquo;
            </p>
            <div className={styles.heroQuoteAuthor}>
              <Image
                src={featured.image}
                alt={featured.name}
                width={48}
                height={48}
              />
              <div className={styles.heroQuoteAuthorInfo}>
                <strong>{featured.name}</strong>
                <span>{featured.position}</span>
              </div>
              <span className={styles.heroQuoteFeatured}>
                <i className="fas fa-bolt" /> Featured
              </span>
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
            Straight from Our Students
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

      {/* Students strip */}
      <div className={styles.studentsStrip}>
        <div className={`container ${styles.studentsInner}`}>
          <span className={styles.studentsLabel}>Our students now work at</span>
          <div className={styles.studentsCompanies}>
            {studentsCompanies.map((c, i) => (
              <span key={i} className={styles.studentsChip}>
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
