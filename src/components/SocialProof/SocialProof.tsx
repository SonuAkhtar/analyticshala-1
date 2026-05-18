"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./SocialProof.module.css";

interface Stat {
  number: number;
  suffix: string;
  label: string;
  sub: string;
  icon: string;
  color: string;
  pale: string;
  border: string;
  font: string;
}

const stats: Stat[] = [
  {
    number: 500,
    suffix: "+",
    label: "Students Trained",
    sub: "and growing every batch",
    icon: "fas fa-users",
    color: "#e63946",
    pale: "#fff0f1",
    border: "rgba(230,57,70,0.18)",
    font: "var(--font-num-1)",
  },
  {
    number: 4.9,
    suffix: "",
    label: "Average Rating",
    sub: "based on 200+ reviews",
    icon: "fas fa-star",
    color: "#f59e0b",
    pale: "#fffbeb",
    border: "rgba(245,158,11,0.18)",
    font: "var(--font-num-2)",
  },
  {
    number: 11,
    suffix: "+",
    label: "Years of Excellence",
    sub: "est. 2013, Gurgaon",
    icon: "fas fa-award",
    color: "#7c3aed",
    pale: "#f5f3ff",
    border: "rgba(124,58,237,0.18)",
    font: "var(--font-num-3)",
  },
  {
    number: 7,
    suffix: "",
    label: "Course Tracks",
    sub: "data, AI, web & more",
    icon: "fas fa-graduation-cap",
    color: "#0d9488",
    pale: "#f0fdfa",
    border: "rgba(13,148,136,0.18)",
    font: "var(--font-num-4)",
  },
];

/* ── DigitReel ── */

interface DigitReelProps {
  digit: string;
  isInView: boolean;
}

const DigitReel = ({ digit, isInView }: DigitReelProps) => {
  const target = parseInt(digit, 10);
  // Build: 0-9 twice, then target
  const items = [
    ...Array.from({ length: 10 }, (_, i) => i),
    ...Array.from({ length: 10 }, (_, i) => i),
    target,
  ];

  return (
    <span className={styles.reelWrap} aria-hidden="true">
      <motion.span
        className={styles.reelInner}
        initial={{ y: 0 }}
        animate={isInView ? { y: `${-(items.length - 1)}em` } : { y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {items.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </motion.span>
    </span>
  );
};

/* ── FlickerNumber ── */

interface FlickerNumberProps {
  value: number;
  suffix: string;
  isInView: boolean;
}

const FlickerNumber = ({ value, suffix, isInView }: FlickerNumberProps) => {
  const str = String(value);
  return (
    <span className={styles.flicker}>
      {str.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <DigitReel key={i} digit={ch} isInView={isInView} />
        ) : (
          <span key={i}>{ch}</span>
        )
      )}
      {suffix && <span>{suffix}</span>}
    </span>
  );
};

/* ── SocialProof ── */

const SocialProof = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={styles.sp} ref={ref}>
      <div className={styles.grid}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={styles.card}
            style={
              {
                "--sc": stat.color,
                "--sp": stat.pale,
                "--sb": stat.border,
              } as React.CSSProperties
            }
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{
              duration: 0.55,
              delay: i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className={styles.num} style={{ fontFamily: stat.font }}>
              <span
                className={styles.iconWrap}
                style={{ background: stat.pale }}
              >
                <i className={stat.icon} />
              </span>
              <FlickerNumber
                value={stat.number}
                suffix={stat.suffix}
                isInView={isInView}
              />
            </div>
            <p className={styles.label}>{stat.label}</p>
            <p className={styles.sub}>{stat.sub}</p>
            <div className={styles.bar} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SocialProof;
