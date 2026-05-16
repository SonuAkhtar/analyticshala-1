import "./sectionHeader.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SectionHeader = ({ eyebrow, title, subtitle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="section-header" ref={ref}>
      {eyebrow && (
        <motion.span
          className="section-header__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        className="section-header__title"
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="section-header__subtitle"
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
