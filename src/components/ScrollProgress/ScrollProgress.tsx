"use client";

import { useScroll, useSpring, motion } from "framer-motion";
import styles from "./ScrollProgress.module.css";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={styles.scrollProgress}
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
};

export default ScrollProgress;
