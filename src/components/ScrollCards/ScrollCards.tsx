"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { scrollCardsData } from "@/data/appData";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ScrollCards.module.css";

interface CardMeta {
  icon: string;
  color: string;
  dark: boolean;
}

const cardMeta: CardMeta[] = [
  { icon: "fas fa-chalkboard-teacher", color: "#4ade80", dark: true },
  { icon: "fas fa-play-circle",        color: "#22d3ee", dark: false },
  { icon: "fas fa-user-tie",           color: "#c084fc", dark: false },
  { icon: "fas fa-infinity",           color: "#fb923c", dark: false },
  { icon: "fas fa-project-diagram",    color: "#818cf8", dark: true },
];

const ScrollCards = () => {
  const ref = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCard, setActiveCard] = useState(0);

  const handleBentoScroll = () => {
    if (!bentoRef.current) return;
    const { scrollLeft, clientWidth } = bentoRef.current;
    const cardWidth = clientWidth;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveCard(Math.min(index, scrollCardsData.length - 1));
  };

  return (
    <section className={styles.scrollCards} ref={ref}>
      <div className="container">
        <SectionHeader
          eyebrow="WHY US"
          title="Why 500+ Students Chose Analyticshala"
          subtitle="We're not just another online course. We're a career transformation platform built by people who've been in the industry."
        />
      </div>

      <div
        className={styles.bento}
        ref={bentoRef}
        onScroll={handleBentoScroll}
      >
        {scrollCardsData.map((card, i) => {
          const meta = cardMeta[i] ?? cardMeta[0];
          return (
            <motion.div
              key={card.id}
              className={`${styles.card}${meta.dark ? ` ${styles.cardDark}` : ""}`}
              style={{ "--cc": meta.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.cardIcon}>
                <i className={meta.icon} />
              </div>
              <span className={styles.cardNumber}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.info}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile dot indicators */}
      <div className={styles.dots}>
        {scrollCardsData.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot}${i === activeCard ? ` ${styles.dotActive}` : ""}`}
            aria-label={`Card ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ScrollCards;
