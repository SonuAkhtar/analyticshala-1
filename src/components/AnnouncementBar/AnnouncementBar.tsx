"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./AnnouncementBar.module.css";

const STORAGE_KEY = "analyticshala_ann_dismissed_v2";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    } else {
      document.documentElement.style.setProperty("--ann-bar-height", "0px");
    }
  }, []);

  useEffect(() => {
    if (!visible || !barRef.current) return;
    const el = barRef.current;

    const update = () => {
      document.documentElement.style.setProperty(
        "--ann-bar-height",
        el.offsetHeight + "px",
      );
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [visible]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    document.documentElement.style.setProperty("--ann-bar-height", "0px");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.annBar} role="banner" ref={barRef}>
      <div className={styles.annBarInner}>
        <span className={styles.annBarBadge}>
          <i className="fas fa-bolt" /> New
        </span>
        <p className={styles.annBarText}>
          <span className={styles.annBarTextDesktop}>
            <strong>Agentic AI course is live</strong> — Next batch: June 20, 2026. Seats filling fast.{" "}
            <Link href="/courses/agentic-ai" className={styles.annBarLink}>
              View Course →
            </Link>
          </span>
          <span className={styles.annBarTextMobile}>
            Agentic AI course live —{" "}
            <Link href="/courses/agentic-ai" className={styles.annBarLink}>
              View Course →
            </Link>
          </span>
        </p>
      </div>
      <button
        className={styles.annBarClose}
        onClick={dismiss}
        aria-label="Dismiss announcement"
      >
        <i className="fas fa-times" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
