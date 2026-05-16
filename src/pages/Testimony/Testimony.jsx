import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./testimony.css";
import { testimonyData } from "../../../appData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] },
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
  return {
    role: role.trim(),
    company: company ? company.trim() : "",
  };
};


const TestimonyCard = ({ t, featured = false }) => {
  const { role, company } = parsePosition(t.position);
  return (
    <div
      className={`testimony-page__card${featured ? " testimony-page__card--featured" : ""}`}
    >
      <div className="testimony-page__stars">
        {[...Array(5)].map((_, i) => (
          <i key={i} className="fas fa-star" />
        ))}
      </div>

      <p className="testimony-page__review-text">&ldquo;{t.review}&rdquo;</p>

      <div className="testimony-page__author">
        <div className="testimony-page__author-img-wrap">
          <img src={t.image} alt={t.name} />
        </div>
        <div className="testimony-page__author-info">
          <strong className="testimony-page__author-name">{t.name}</strong>
          <span className="testimony-page__author-role">{role}</span>
          {company && (
            <span className="testimony-page__author-company">
              <i className="fas fa-briefcase" /> {company}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Testimony = () => {
  const featured = testimonyData[0];

  return (
    <div className="testimony-page">
      <section className="testimony-page__hero">
        <div className="testimony-page__hero-glow" />
        <div className="container testimony-page__hero-inner">
          <motion.h1 className="testimony-page__hero-heading" {...fadeUp(0.07)}>
            Real People.
            <br />
            <span className="testimony-page__gradient-text">Real Results.</span>
          </motion.h1>

          <motion.p className="testimony-page__hero-sub" {...fadeUp(0.13)}>
            Over 500 professionals have transformed their careers with
            AnalyticShala. Here&apos;s what they have to say.
          </motion.p>

          {/* Stats row */}
          <motion.div className="testimony-page__stats-row" {...fadeUp(0.18)}>
            {heroStats.map((s, i) => (
              <div key={i} className="testimony-page__stat-item">
                <span className="testimony-page__stat-num">{s.num}</span>
                <span className="testimony-page__stat-label">{s.label}</span>
                {i < heroStats.length - 1 && (
                  <span className="testimony-page__stat-sep">·</span>
                )}
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="testimony-page__hero-actions"
            {...fadeUp(0.23)}
          >
            <Link
              to="/workshops"
              className="testimony-page__btn testimony-page__btn--primary"
            >
              Join the Next Batch <i className="fas fa-arrow-right" />
            </Link>
            <a
              href="https://wa.me/918882641988"
              target="_blank"
              rel="noopener noreferrer"
              className="testimony-page__btn testimony-page__btn--ghost"
            >
              <i className="fab fa-whatsapp" /> Talk to an Alumnus
            </a>
          </motion.div>

          {/* Featured quote card */}
          <motion.div
            className="testimony-page__hero-quote"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="testimony-page__hero-quote-mark">
              <i className="fas fa-quote-left" />
            </div>
            <p className="testimony-page__hero-quote-text">
              &ldquo;{featured.review}&rdquo;
            </p>
            <div className="testimony-page__hero-quote-author">
              <img src={featured.image} alt={featured.name} />
              <div>
                <strong>{featured.name}</strong>
                <span>{featured.position}</span>
              </div>
              <div className="testimony-page__hero-quote-stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="testimony-page__stats-bar">
        <div className="container testimony-page__stats-inner">
          {heroStats.map((s, i) => (
            <div key={i} className="testimony-page__stats-bar-item">
              <i className={`${s.icon} testimony-page__stats-bar-icon`} />
              <span className="testimony-page__stats-bar-num">{s.num}</span>
              <span className="testimony-page__stats-bar-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="testimony-page__reviews">
        <div className="container">
          <motion.span className="testimony-page__eyebrow" {...fadeUp(0)}>
            <i className="fas fa-quote-left" /> What They Say
          </motion.span>
          <motion.h2
            className="testimony-page__section-title"
            {...fadeUp(0.07)}
          >
            Straight from Our Alumni
          </motion.h2>
          <motion.p className="testimony-page__section-sub" {...fadeUp(0.12)}>
            No scripts. No filters. Honest accounts from students who chose to
            invest in themselves - and it paid off.
          </motion.p>

          <div className="testimony-page__grid">
            {testimonyData.map((t, i) => (
              <TestimonyCard key={t.id} t={t} featured={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <div className="testimony-page__alumni-strip">
        <div className="container testimony-page__alumni-inner">
          <span className="testimony-page__alumni-label">
            Our alumni now work at
          </span>
          <div className="testimony-page__alumni-companies">
            {alumniCompanies.map((c, i) => (
              <span key={i} className="testimony-page__alumni-chip">
                <i className={c.icon} /> {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="testimony-page__trust">
        <div className="container testimony-page__trust-inner">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              className="testimony-page__trust-item"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <span className="testimony-page__trust-icon">
                <i className={item.icon} />
              </span>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="testimony-page__cta">
        <div className="container testimony-page__cta-inner">
          <motion.div className="testimony-page__cta-pills" {...fadeUp(0)}>
            <Link to="/workshops" className="testimony-page__cta-pill">
              Browse Workshops
            </Link>
            <span className="testimony-page__cta-pill-sep" />
            <Link
              to="/#contact"
              className="testimony-page__cta-pill testimony-page__cta-pill--accent"
            >
              Get in Touch
            </Link>
          </motion.div>

          <motion.h2 className="testimony-page__cta-heading" {...fadeUp(0.08)}>
            Ready to Write Your
            <br />
            Own Success Story?
          </motion.h2>

          <motion.p className="testimony-page__cta-sub" {...fadeUp(0.14)}>
            Join a weekend workshop or enroll in a full course. Hundreds of
            students already made the move - now it&apos;s your turn.
          </motion.p>

          <motion.div className="testimony-page__cta-actions" {...fadeUp(0.2)}>
            <Link
              to="/workshops"
              className="testimony-page__btn testimony-page__btn--cta-dark"
            >
              Join the Next Batch <i className="fas fa-arrow-right" />
            </Link>
            <Link
              to="/#contact"
              className="testimony-page__btn testimony-page__btn--cta-outline"
            >
              <i className="fas fa-comment-dots" /> Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimony;
