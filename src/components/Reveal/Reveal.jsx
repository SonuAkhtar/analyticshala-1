import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "./reveal.css";
import { aboutUsText } from "../../../appData";
import { useTheme } from "../../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const Reveal = () => {
  const triggerRef = useRef(null);
  const letterRef = useRef([]);
  const { theme } = useTheme();

  const startColor = theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.12)";
  const endColor   = theme === "dark" ? "#f1f5f9" : "#0f172a";

  useGSAP(() => {
    const reveal = gsap.fromTo(
      letterRef.current,
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

    return () => reveal.kill();
  }, [theme]);

  const useLettersArray = () => {
    letterRef.current = [];
    return (ref) => ref && letterRef.current.push(ref);
  };
  const setLetters = useLettersArray();

  return (
    <div className="reveal__wrap" ref={triggerRef}>
      {aboutUsText.split("").map((letter, i) => (
        <span className="reveal__char" key={i} ref={setLetters}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default Reveal;
