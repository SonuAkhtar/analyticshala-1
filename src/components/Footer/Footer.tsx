import Link from "next/link";
import { socialIconsData } from "@/data/appData";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBody}>
        <div className={styles.footerBodyInner}>
          {/* CTA Band */}
          <div className={styles.footerCta}>
            <div className={styles.footerCtaLeft}>
              <h2 className={styles.footerCtaHeading}>
                Ready to Build Your
                <br />
                <span className={styles.footerCtaHighlight}>Data Career?</span>
              </h2>
              <p className={styles.footerCtaSub}>
                Weekend batches. Real projects. 1:1 mentorship. Placement
                support that stays with you until you land the role.
              </p>
              <div className={styles.footerCtaActions}>
                <Link href="/courses" className={styles.footerCtaBtn}>
                  Explore Courses <i className="fas fa-arrow-right" />
                </Link>
                <a href="/#contact" className={styles.footerCtaGhost}>
                  Talk to a counsellor
                </a>
              </div>
            </div>

            <div className={styles.footerCtaStats}>
              {[
                {
                  num: "4.9",
                  unit: "★",
                  label: "Avg Rating",
                  icon: "fas fa-trophy",
                  accent: "#fbbf24",
                },
                {
                  num: "90",
                  unit: "days",
                  label: "To Job Ready",
                  icon: "fas fa-rocket",
                  accent: "#22d3ee",
                },
                {
                  num: "300",
                  unit: "+",
                  label: "Students Trained",
                  icon: "fas fa-users",
                  accent: "#fb7185",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className={styles.footerCtaStat}
                  style={
                    { "--stat-accent": s.accent } as React.CSSProperties
                  }
                >
                  <div className={styles.footerCtaStatIcon}>
                    <i className={s.icon} />
                  </div>
                  <div className={styles.footerCtaStatBody}>
                    <span className={styles.footerCtaNum}>
                      {s.num}
                      <em className={styles.footerCtaUnit}>{s.unit}</em>
                    </span>
                    <span className={styles.footerCtaLbl}>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.footerSep} />

          {/* Nav Columns */}
          <div className={styles.footerNav}>
            {/* Brand */}
            <div className={styles.footerBrand}>
              <span className={styles.footerLogo}>AnalyticShala</span>
              <p className={styles.footerTagline}>
                Where Data Careers Are Built.
              </p>
              <p className={styles.footerDesc}>
                Industry-led courses in Data Analytics, Data Science, AI &amp;
                Web Development - designed to get you hired.
              </p>
              <div className={styles.footerSocial}>
                {socialIconsData.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerSocialLink}
                    aria-label={item.class}
                  >
                    <i className={item.class} />
                  </a>
                ))}
                <a
                  href="https://www.youtube.com/@analyticshala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerSocialLink}
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube" />
                </a>
                <a
                  href="https://wa.me/918882641988"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.footerSocialLink} ${styles.footerSocialLinkWa}`}
                  aria-label="WhatsApp"
                >
                  <i className="fab fa-whatsapp" />
                </a>
              </div>
              <span className={styles.footerEst}>
                Est. 2013 · Gurgaon, India
              </span>
            </div>

            {/* Navigate */}
            <div className={styles.footerCol}>
              <h4>Navigate</h4>
              <Link href="/">Home</Link>
              <Link href="/aboutUs">About Us</Link>
              <Link href="/courses">Courses</Link>
              <Link href="/workshops">Workshops</Link>
              <Link href="/testimony">Student Reviews</Link>
              <Link href="/#faq">FAQ</Link>
            </div>

            {/* Contact */}
            <div className={styles.footerCol}>
              <h4>Get in Touch</h4>
              <a
                href="mailto:team@analyticshala.in"
                className={styles.footerContactItem}
              >
                <i className="fas fa-envelope" /> team@analyticshala.in
              </a>
              <a href="tel:+918882641988" className={styles.footerContactItem}>
                <i className="fas fa-phone" /> +91-88826 41988
              </a>
              <a
                href="https://wa.me/918882641988"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.footerContactItem} ${styles.footerContactItemWa}`}
              >
                <i className="fab fa-whatsapp" /> Chat on WhatsApp
              </a>
              <span className={styles.footerContactItem}>
                <i className="fas fa-map-marker-alt" /> Gurgaon, India · Online
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomInner}>
          <span>© {currentYear} AnalyticShala. All rights reserved.</span>
          <div className={styles.footerBottomLinks}>
            <Link href="/privacy-policy">Privacy</Link>
            <span className={styles.footerBottomDot} />
            <Link href="/terms-of-use">Terms</Link>
            <span className={styles.footerBottomDot} />
            <Link href="/refund-policy">Refunds</Link>
          </div>
          <span className={styles.footerMade}>Made with ❤️ in India 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
