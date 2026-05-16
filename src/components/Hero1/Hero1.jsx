import { useEffect } from "react";
import gsap from "gsap";
import SplitTextJS from "split-text-js";

// imported CSS
import "./hero1.css";

const Hero1 = () => {
  useEffect(() => {
    const titles = gsap.utils.toArray(".text_wrapper p");
    const timeLine = gsap.timeline();

    titles.forEach((title) => {
      const splitTitle = new SplitTextJS(title);
      timeLine.from(
        splitTitle.chars,
        {
          opacity: 0,
          y: 40,
          rotateX: -90,
          duration: 0.5,
          stagger: {
            each: 0.05,
            repeat: -1,
            repeatDelay: 1.5,
          },
        },
        "<"
      );

      timeLine.to(
        splitTitle.chars,
        {
          opacity: 0,
          y: -40,
          rotateX: 90,
          duration: 0.5,
          stagger: {
            each: 0.05,
            repeat: -1,
            repeatDelay: 1.5,
          },
        },
        "<1"
      );
    });
  }, []);

  return (
    <div className="hero1">
      <main className="hero1_main">
        <h1 className="hero1_top">Let's</h1>
        <div className="text_wrapper">
          <p>Learn</p>
          <p>Grow</p>
          <p>Achieve</p>
        </div>
        <h1 className="hero1_bottom">Together</h1>
      </main>
    </div>
  );
};

export default Hero1;
