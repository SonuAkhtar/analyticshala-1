import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./loader.css";

/*
 * Delay per counter step (ms).
 * Triangle curve: slow at start (70 ms) → fast in middle (15 ms) → slow at end (70 ms).
 * With skip = 3-5 per step, ~25 steps total ≈ 1.1 s of counting.
 */
const getDelay = (value) => {
  const t     = value / 100;
  const speed = 1 - Math.abs(2 * t - 1);
  return Math.round(70 - speed * 55);
};

const Loader = ({ onDone }) => {
  const [count, setCount]     = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone]       = useState(false);

  useEffect(() => {
    let cancelled = false;
    let current   = 0;

    const tick = () => {
      if (cancelled) return;
      // Skip 3-5 so the counter feels snappy but legible
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
    return () => { cancelled = true; };
  }, [onDone]);

  if (gone) return null;

  return (
    <motion.div
      className="page-loader"
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={
        exiting
          ? { duration: 0.45, delay: 0.58, ease: "easeIn" }
          : { duration: 0 }
      }
    >
      <div className="page-loader__grid" aria-hidden="true" />

      {/* Brand name — plain centered text, no icon */}
      <motion.p
        className="page-loader__brand"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        AnalyticShala
      </motion.p>

      {/* Counter — bottom left */}
      <motion.div
        className="page-loader__counter"
        animate={{ opacity: exiting ? 0 : 1, y: exiting ? 8 : 0 }}
        transition={{ duration: 0.18 }}
      >
        <div className="page-loader__roll">
          <span key={count} className="page-loader__num">{count}</span>
        </div>
        <span className="page-loader__pct">%</span>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="page-loader__bar"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      >
        <motion.div
          className="page-loader__bar-fill"
          animate={{ width: `${count}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Loader;
