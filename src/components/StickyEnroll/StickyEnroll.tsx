"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./StickyEnroll.module.css";

const StickyEnroll = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${styles.stickyEnroll} ${visible ? styles.visible : ""}`}
      role="complementary"
      aria-label="Sticky enroll bar"
    >
      <div className={styles.inner}>
        <span className={styles.urgency}>
          <i className="fas fa-fire" />
          Limited seats left this batch!
        </span>
        <Link href="/courses" className={styles.cta}>
          Enroll Now <i className="fas fa-arrow-right" />
        </Link>
      </div>
    </div>
  );
};

export default StickyEnroll;
