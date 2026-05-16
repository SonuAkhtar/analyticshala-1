import { useEffect } from "react";
import gsap from "gsap-trial";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// imported CSS
import "./scrollText.css";

const ScrollText = () => {
  useEffect(() => {
    gsap.set(".photo:not(:first-child)", { opacity: 0, scale: 0.5 });

    const animation = gsap.to(".photo:not(:first-child)", {
      opacity: 1,
      scale: 1,
      duration: 1,
      stagger: 1,
    });

    ScrollTrigger.create({
      trigger: ".gallery",
      start: "top top",
      end: "bottom bottom",
      pin: ".right",
      animation: animation,
      scrub: true,
      markers: true,
    });
  }, []);

  return (
    <>
      <div className="gallery">
        <div className="left">
          <div className="detailsWrapper">
            <div className="details">
              <div className="headline red"></div>
              <div className="text"></div>
              <div className="text"></div>
              <div className="text"></div>
              <div className="text"></div>
            </div>

            <div className="details">
              <div className="headline green"></div>
              <div className="text"></div>
              <div className="text"></div>
              <div className="text"></div>
              <div className="text"></div>
            </div>

            <div className="details">
              <div className="headline blue"></div>
              <div className="text"></div>
              <div className="text"></div>
              <div className="text"></div>
              <div className="text"></div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="photos">
            <div className="photo red"></div>
            <div className="photo green"></div>
            <div className="photo blue"></div>
          </div>
        </div>
      </div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="spacer"></div>
    </>
  );
};

export default ScrollText;
