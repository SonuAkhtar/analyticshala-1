import { useScroll, useSpring, motion } from "framer-motion";
import "./scrollProgress.css";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
};

export default ScrollProgress;
