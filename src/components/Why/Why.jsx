import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./why.css";

const Why = () => {
  useGSAP(() => {
    let whyTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: ".why",
        start: "50% 50%",
        end: "200% 50%",
        scrub: 1,
        pin: true,
        //markers: true,
      },
    });

    whyTimeLine
      .to(
        ".content.one",
        {
          marginTop: "-25vh",
          opacity: "1",
        },
        "content-1"
      )
      .to(
        ".content.two",
        {
          opacity: "1",
        },
        "content-2"
      )
      .to(
        ".content.one",
        {
          marginTop: "-70vh",
          opacity: "0",
        },
        "content-2"
      )
      .to(
        ".content.three",
        {
          opacity: "1",
        },
        "content-3"
      )
      .to(
        ".content.two",
        {
          opacity: "0",
        },
        "content-3"
      )
      .to(
        ".content.one",
        {
          marginTop: "-110vh",
        },
        "content-3"
      )
      .to(
        ".content.four",
        {
          opacity: "1",
        },
        "content-4"
      )
      .to(
        ".content.three",
        {
          opacity: "0",
        },
        "content-4"
      )
      .to(
        ".content.one",
        {
          marginTop: "-150vh",
        },
        "content-4"
      )
      .to(
        ".content.five",
        {
          opacity: "1",
        },
        "content-5"
      )
      .to(
        ".content.four",
        {
          opacity: "0",
        },
        "content-5"
      )
      .to(
        ".content.one",
        {
          marginTop: "-195vh",
        },
        "content-5"
      );
  });

  return (
    <div className="why">
      <div className="why_left">
        <h1>Why choose AnalyticShala?</h1>
        <div className="icon_wrapper">
          <i className="fas fa-paper-plane" />
        </div>
      </div>
      <div className="why_right">
        <div className="content one">
          <h2>Live Classes</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            temporibus neque nobis libero est doloremque, eum ipsa in.
          </p>
        </div>
        <div className="content two">
          <h2>Practice and Revision</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            temporibus neque nobis libero est doloremque, eum ipsa in.
          </p>
        </div>
        <div className="content three">
          <h2>Lifetime Support</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            temporibus neque nobis libero est doloremque, eum ipsa in.
          </p>
        </div>
        <div className="content four">
          <h2>One-on-One session</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            temporibus neque nobis libero est doloremque, eum ipsa in.
          </p>
        </div>
        <div className="content five">
          <h2>Interview Preparation</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            temporibus neque nobis libero est doloremque, eum ipsa in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Why;
