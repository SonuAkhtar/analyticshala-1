"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Loader.module.css";

const getDelay = (value: number) => {
  const t = value / 100;
  const speed = 1 - Math.abs(2 * t - 1);
  return Math.round(70 - speed * 55);
};

interface LoaderProps {
  onDone?: () => void;
}

const Loader = ({ onDone }: LoaderProps) => {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let current = 0;

    const tick = () => {
      if (cancelled) return;
      const skip = 3 + Math.floor(Math.random() * 3);
      current = Math.min(current + skip, 100);
      setCount(current);

      if (current < 100) {
        setTimeout(tick, getDelay(current));
      } else {
        setTimeout(() => {
          if (cancelled) return;
          setExiting(true);
          setTimeout(() => {
            if (cancelled) return;
            setGone(true);
            onDone?.();
          }, 1100);
        }, 300);
      }
    };

    setTimeout(tick, getDelay(0));
    return () => {
      cancelled = true;
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <motion.div
      className={styles.pageLoader}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={
        exiting
          ? { duration: 0.45, delay: 0.58, ease: "easeIn" }
          : { duration: 0 }
      }
    >
      <div className={styles.pageLoaderGrid} aria-hidden="true" />

      <motion.p
        className={styles.pageLoaderBrand}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        AnalyticShala
      </motion.p>

      <motion.div
        className={styles.pageLoaderCounter}
        animate={{ opacity: exiting ? 0 : 1, y: exiting ? 8 : 0 }}
        transition={{ duration: 0.18 }}
      >
        <div className={styles.pageLoaderRoll}>
          <span key={count} className={styles.pageLoaderNum}>{count}</span>
        </div>
        <span className={styles.pageLoaderPct}>%</span>
      </motion.div>

      <motion.div
        className={styles.pageLoaderBar}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      >
        <motion.div
          className={styles.pageLoaderBarFill}
          animate={{ width: `${count}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Loader;
