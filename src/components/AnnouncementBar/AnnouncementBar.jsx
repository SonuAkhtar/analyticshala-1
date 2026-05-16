import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./announcementBar.css";

const STORAGE_KEY = "analyticshala_ann_dismissed_v2";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
    else document.documentElement.style.setProperty("--ann-bar-height", "0px");
  }, []);

  useEffect(() => {
    if (!visible || !barRef.current) return;
    const update = () => {
      document.documentElement.style.setProperty(
        "--ann-bar-height",
        barRef.current.offsetHeight + "px"
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(barRef.current);
    return () => ro.disconnect();
  }, [visible]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    document.documentElement.style.setProperty("--ann-bar-height", "0px");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="ann-bar" role="banner" ref={barRef}>
      <div className="ann-bar__inner">
        <span className="ann-bar__badge">
          <i className="fas fa-bolt" /> New
        </span>
        <p className="ann-bar__text">
          <span className="ann-bar__text--desktop">
            <strong>Agentic AI course is live</strong> — Next batch: June 20, 2026. Seats filling fast.{" "}
            <Link to="/courses/agentic-ai" className="ann-bar__link">View Course →</Link>
          </span>
          <span className="ann-bar__text--mobile">
            Agentic AI course live —{" "}
            <Link to="/courses/agentic-ai" className="ann-bar__link">View Course →</Link>
          </span>
        </p>
      </div>
      <button
        className="ann-bar__close"
        onClick={dismiss}
        aria-label="Dismiss announcement"
      >
        <i className="fas fa-times" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
