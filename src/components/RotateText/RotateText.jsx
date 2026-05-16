import { useEffect } from "react";
import gsap from "gsap";
import "./rotateText.css";
import SplitTextJS from "split-text-js";

const RotateText = () => {
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
          stagger: 0.05,
        },
        "<"
      );

      timeLine.to(
        splitTitle.chars,
        {
          opacity: 0,
          y: -40,
          rotateX: 90,
          stagger: 0.02,
        },
        "<1"
      );
    });
  }, []);

  return (
    <section className="rotateText" id="rotateText">
      <div className="container">
        <main className="rotate_main">
          <div className="text_wrapper">
            <p>Data Science</p>
            <p>Artificial Intelligence</p>
            <p>Machine Learning</p>
            <p>Python</p>
            <p>Advance Excel</p>
          </div>
        </main>
      </div>
    </section>
  );
};

export default RotateText;
