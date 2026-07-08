"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import styles from "./AnnouncementBar.module.css";

const STORAGE_KEY = "analyticshala_ann_dismissed_v2";

interface AnnouncementItem {
  id: string;
  href: string;
  ctaText: string;
  textDesktop: ReactNode;
  textMobile: ReactNode;
  /** Once this date has passed, the announcement is auto-removed. */
  validUntil: Date;
}

// Add new announcements here. Any entry whose validUntil date has passed
// is automatically dropped, so past-batch announcements never linger.
const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "agentic-ai-batch",
    href: "/courses/agentic-ai",
    ctaText: "View Course",
    textDesktop: (
      <>
        <strong>Agentic AI course is live</strong> - Next batch: June 20,
        2026.
      </>
    ),
    textMobile: (
      <>
        <strong>Agentic AI</strong> course is live
      </>
    ),
    validUntil: new Date(2026, 5, 20),
  },
];

const AnnouncementBar = () => {
  const [announcement, setAnnouncement] = useState<AnnouncementItem | null>(
    null,
  );
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const active =
      ANNOUNCEMENTS.find((a) => a.validUntil.getTime() >= Date.now()) ?? null;
    setAnnouncement(active);
    if (!active) return;

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

  if (!announcement || !visible) return null;

  return (
    <div className={styles.annBar} role="banner" ref={barRef}>
      <div className={styles.annBarInner}>
        <span className={styles.annBarBadge}>
          <span className={styles.annBarLiveDot} aria-hidden="true" />
          Live
        </span>

        <span className={styles.annBarDivider} aria-hidden="true" />

        <p className={styles.annBarText}>
          <span className={styles.annBarTextDesktop}>
            {announcement.textDesktop}
          </span>
          <span className={styles.annBarTextMobile}>
            {announcement.textMobile}
          </span>
        </p>

        <Link href={announcement.href} className={styles.annBarCta}>
          {announcement.ctaText} <i className="fas fa-arrow-right" />
        </Link>
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
