"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutUsText } from "@/data/appData";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./Reveal.module.css";

gsap.registerPlugin(ScrollTrigger);

const Reveal = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { theme } = useTheme();

  const startColor = theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.12)";
  const endColor = theme === "dark" ? "#f1f5f9" : "#0f172a";

  useGSAP(() => {
    const els = letterRefs.current.filter(Boolean) as HTMLSpanElement[];
    const reveal = gsap.fromTo(
      els,
      { color: startColor },
      {
        color: endColor,
        duration: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          scrub: true,
          start: "top 75%",
          end: "bottom 60%",
        },
      }
    );
    return () => { reveal.kill(); };
  }, [theme]);

  letterRefs.current = [];

  return (
    <div className={styles.wrap} ref={triggerRef}>
      {aboutUsText.split("").map((letter, i) => (
        <span
          className={styles.char}
          key={i}
          ref={(el) => { letterRefs.current[i] = el; }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default Reveal;
