import { Link, useNavigate } from "react-router-dom";
import "./notFound.css";

const QUICK_LINKS = [
  { icon: "fas fa-home", label: "Home", href: "/" },
  { icon: "fas fa-graduation-cap", label: "Courses", href: "/courses" },
  { icon: "fas fa-calendar-alt", label: "Workshops", href: "/workshops" },
  { icon: "fas fa-star", label: "Reviews", href: "/testimony" },
  { icon: "fas fa-info-circle", label: "About Us", href: "/aboutUs" },
];

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="nf">
      {/* Background orbs */}
      <div className="nf__orb nf__orb--1" />
      <div className="nf__orb nf__orb--2" />
      <div className="nf__orb nf__orb--3" />

      <div className="nf__inner">
        {/* Animated 404 */}
        <div className="nf__code-wrap" aria-hidden="true">
          <span className="nf__code-digit">4</span>
          <div className="nf__code-icon">
            <i className="fas fa-database" />
          </div>
          <span className="nf__code-digit">4</span>
        </div>

        {/* Copy */}
        <div className="nf__copy">
          <h1 className="nf__heading">Oops -data not found</h1>
          <p className="nf__sub">
            Looks like this page got lost in the training set. Even our best
            model couldn't locate it. Let's get you somewhere useful.
          </p>
        </div>

        {/* Quick links */}
        <div className="nf__links">
          {QUICK_LINKS.map((l) => (
            <Link key={l.href} to={l.href} className="nf__link">
              <i className={l.icon} />
              <span>{l.label}</span>
            </Link>
          ))}
        </div>

        {/* Primary action */}
        <button className="nf__btn" onClick={() => navigate("/")}>
          <i className="fas fa-house" /> Take Me Home
        </button>

        {/* Help nudge */}
        <p className="nf__help">
          Still lost?{" "}
          <a
            href="https://wa.me/918882641988"
            target="_blank"
            rel="noopener noreferrer"
            className="nf__help-link"
          >
            <i className="fab fa-whatsapp" /> Chat with us
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
