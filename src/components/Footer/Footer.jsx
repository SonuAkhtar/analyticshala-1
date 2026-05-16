import { Link } from "react-router-dom";
import { socialIconsData } from "../../../appData";
import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__body">
        <div className="footer__body-inner">
          {/* CTA Band */}
          <div className="footer__cta">
            <div className="footer__cta-left">
              <h2 className="footer__cta-heading">
                Ready to Build Your
                <br />
                <span className="footer__cta-highlight">Data Career?</span>
              </h2>
              <p className="footer__cta-sub">
                Weekend batches. Real projects. 1:1 mentorship. Placement
                support that stays with you until you land the role.
              </p>
              <div className="footer__cta-actions">
                <Link to="/courses" className="footer__cta-btn">
                  Explore Courses <i className="fas fa-arrow-right" />
                </Link>
                <a href="/#contact" className="footer__cta-ghost">
                  Talk to a counsellor
                </a>
              </div>
            </div>

            <div className="footer__cta-stats">
              <div className="footer__cta-stat">
                <span className="footer__cta-num">4.9★</span>
                <span className="footer__cta-lbl">Avg Rating</span>
              </div>
              <div className="footer__cta-divider" />
              <div className="footer__cta-stat">
                <span className="footer__cta-num">90</span>
                <span className="footer__cta-lbl">Days to Job Ready</span>
              </div>
              <div className="footer__cta-divider" />
              <div className="footer__cta-stat">
                <span className="footer__cta-num">300+</span>
                <span className="footer__cta-lbl">Learners Trained</span>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="footer__sep" />

          {/* Nav Columns */}
          <div className="footer__nav">
            {/* Brand */}
            <div className="footer__brand">
              <span className="footer__logo">AnalyticShala</span>
              <p className="footer__tagline">Where Data Careers Are Built.</p>
              <p className="footer__desc">
                Industry-led courses in Data Analytics, Data Science, AI &amp;
                Web Development -designed to get you hired.
              </p>
              <div className="footer__social">
                {socialIconsData.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={item.class}
                  >
                    <i className={item.class} />
                  </a>
                ))}
                <a
                  href="https://www.youtube.com/@analyticshala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube" />
                </a>
                <a
                  href="https://wa.me/918882641988"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link footer__social-link--wa"
                  aria-label="WhatsApp"
                >
                  <i className="fab fa-whatsapp" />
                </a>
              </div>
              <span className="footer__est">Est. 2013 · Gurgaon, India</span>
            </div>

            {/* Navigate */}
            <div className="footer__col">
              <h4>Navigate</h4>
              <Link to="/">Home</Link>
              <Link to="/aboutUs">About Us</Link>
              <Link to="/courses">Courses</Link>
              <Link to="/workshops">Workshops</Link>
              <Link to="/testimony">Student Reviews</Link>
              <Link to="/#faq">FAQ</Link>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h4>Get in Touch</h4>
              <a
                href="mailto:team@analyticshala.in"
                className="footer__contact-item"
              >
                <i className="fas fa-envelope" /> team@analyticshala.in
              </a>
              <a href="tel:+918882641988" className="footer__contact-item">
                <i className="fas fa-phone" /> +91-88826 41988
              </a>
              <a
                href="https://wa.me/918882641988"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__contact-item footer__contact-item--wa"
              >
                <i className="fab fa-whatsapp" /> Chat on WhatsApp
              </a>
              <span className="footer__contact-item">
                <i className="fas fa-map-marker-alt" /> Gurgaon, India · Online
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <span>© {currentYear} AnalyticShala. All rights reserved.</span>
          <div className="footer__bottom-links">
            <Link to="/privacy-policy">Privacy</Link>
            <span className="footer__bottom-dot" />
            <Link to="/terms-of-use">Terms</Link>
            <span className="footer__bottom-dot" />
            <Link to="/refund-policy">Refunds</Link>
          </div>
          <span className="footer__made">Made with ❤️ in India 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
