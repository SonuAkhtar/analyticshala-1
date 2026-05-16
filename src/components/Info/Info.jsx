import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "./info.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Info = () => {
  const infoMain = useRef();

  useGSAP(() => {
    let timeLine = gsap.timeline({
      scrollTrigger: {
        trigger: "section.info",
        start: "10% 50%",
        end: "60% 50%",
        //  markers: true,
        scrub: 1,
      },
    });

    timeLine.to(".text_area_hover", {
      width: "100%",
    });
  });

  return (
    <section className="info" id="info">
      <div className="container">
        <h2 className="section_title">What we do</h2>
        <span className="section_subtitle">Information</span>

        <main className="info_main">
          <div className="text_area">
            <p>This is a testing text of gsap for now</p>
            <br />
            <p>There could be some more.</p>
          </div>
          <div className="text_area_hover">
            <p>This is a testing text of gsap for now</p>
            <br />
            <p>There could be some more.</p>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Info;
