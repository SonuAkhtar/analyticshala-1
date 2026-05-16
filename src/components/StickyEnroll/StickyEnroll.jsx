import { useState, useEffect } from "react";
import "./stickyEnroll.css";
import { Link } from "react-router-dom";

const StickyEnroll = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-enroll${visible ? " sticky-enroll--visible" : ""}`}>
      <span className="sticky-enroll__urgency">
        <i className="fas fa-fire" /> Limited seats left!
      </span>
      <Link to="/courses" className="sticky-enroll__cta">
        <i className="fas fa-graduation-cap" />
        Enroll Now
      </Link>
    </div>
  );
};

export default StickyEnroll;
