import "./socialProof.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
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

const ALL_DIGITS = "0123456789".split("");

const DigitReel = ({ digit, isInView, delay }) => {
  const idx = parseInt(digit, 10);
  const cycles = 2;
  const items = [];
  for (let i = 0; i < cycles; i++) items.push(...ALL_DIGITS);
  for (let i = 0; i <= idx; i++) items.push(ALL_DIGITS[i]);

  return (
    <span className="sp__reel-wrap">
      <motion.span
        className="sp__reel-inner"
        initial={{ y: 0 }}
        animate={isInView ? { y: `${-(items.length - 1)}em` } : { y: 0 }}
        transition={{ duration: 1.5, delay, ease: [0.22, 0, 0.08, 1] }}
      >
        {items.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </motion.span>
    </span>
  );
};

const FlickerNumber = ({ value, suffix, isInView }) => {
  const str = value % 1 !== 0 ? value.toFixed(1) : String(value);

  return (
    <span className="sp__flicker">
      {str.split("").map((ch, i) =>
        ALL_DIGITS.includes(ch) ? (
          <DigitReel key={i} digit={ch} isInView={isInView} delay={i * 0.05} />
        ) : (
          <span key={i} className="sp__reel-dot">
            {ch}
          </span>
        ),
      )}
      <span className="sp__reel-suffix">{suffix}</span>
    </span>
  );
};

const SocialProof = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="sp" ref={ref}>
      <div className="container">
        <div className="sp__grid">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="sp__card"
              style={{ "--sc": s.color, "--sp": s.pale, "--sb": s.border }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.45,
                delay: i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="sp__num" style={{ fontFamily: s.font }}>
                <i className={s.icon} />
                <FlickerNumber
                  value={s.number}
                  suffix={s.suffix}
                  isInView={isInView}
                />
              </div>

              <div className="sp__label">{s.label}</div>
              <div className="sp__sub">{s.sub}</div>

              <div className="sp__bar" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
