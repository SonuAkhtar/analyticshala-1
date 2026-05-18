"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import styles from "./LearningPath.module.css";

gsap.registerPlugin(ScrollTrigger);

const roadmapSteps = [
  {
    phase: "Phase 01",
    icon: "fas fa-compass",
    color: "#e63946",
    colorNext: "#f97316",
    weeks: "Week 1",
    title: "Set Your Direction",
    desc: "Begin with a free 1:1 counselling call. We understand your current skills, map your career goals, and build a personalised 90-day plan just for you.",
    highlights: [
      "Free 30-min counselling call",
      "Career goal & skill-gap analysis",
      "Personalised 90-day learning plan",
      "Industry mentor assigned",
    ],
  },
  {
    phase: "Phase 02",
    icon: "fas fa-laptop-code",
    color: "#f97316",
    colorNext: "#7c3aed",
    weeks: "Weeks 2–10",
    title: "Learn By Doing",
    desc: "Weekend live classes with industry experts, real-world datasets, and graded assignments — you practise with the same tools professionals actually use on the job.",
    highlights: [
      "Live weekend batches",
      "Real industry datasets",
      "Weekly graded assignments",
      "All sessions recorded & accessible",
    ],
  },
  {
    phase: "Phase 03",
    icon: "fas fa-project-diagram",
    color: "#7c3aed",
    colorNext: "#10b981",
    weeks: "Weeks 11–12",
    title: "Build Your Portfolio",
    desc: "Solve a real business problem through a capstone project. This becomes the centrepiece of your portfolio — the piece that makes recruiters take notice.",
    highlights: [
      "End-to-end capstone project",
      "GitHub portfolio setup",
      "LinkedIn profile optimisation",
      "1:1 project review with mentor",
    ],
  },
  {
    phase: "Phase 04",
    icon: "fas fa-handshake",
    color: "#10b981",
    colorNext: "#10b981",
    weeks: "Week 13 onwards",
    title: "Land the Job",
    desc: "Mock interviews, resume workshops, and direct recruiter connections. We don't stop supporting you until you receive and accept the right offer.",
    highlights: [
      "Mock interview simulations",
      "Resume & cover letter review",
      "Direct recruiter connections",
      "Offer negotiation coaching",
    ],
  },
];

const LearningPath = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const connectorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const buildTimeline = (
        nodes: (HTMLDivElement | null)[],
        connectors: (HTMLDivElement | null)[],
        cards: (HTMLDivElement | null)[]
      ) => {
        // Initial states: first node fully visible, rest dimmed
        nodes
          .slice(1)
          .forEach((n) => n && gsap.set(n, { opacity: 0.25, scale: 0.75 }));
        connectors.forEach(
          (c) => c && gsap.set(c, { scaleY: 0, transformOrigin: "top center" })
        );
        // First card visible and in place, rest hidden below
        cards.forEach(
          (c, i) =>
            c && gsap.set(c, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 80 })
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=290%",
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
          },
        });

        for (let i = 0; i < roadmapSteps.length - 1; i++) {
          const b = i;
          // Draw connector to next node
          tl.to(connectors[i], { scaleY: 1, ease: "none", duration: 0.5 }, b);
          // Activate next node
          tl.to(
            nodes[i + 1],
            { opacity: 1, scale: 1, duration: 0.18, ease: "back.out(1.5)" },
            b + 0.38
          );
          // Slide current card out upward
          tl.to(
            cards[i],
            { autoAlpha: 0, y: -22, duration: 0.2, ease: "power2.in" },
            b + 0.5
          );
          // Slide next card in from below
          tl.to(
            cards[i + 1],
            { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" },
            b + 0.68
          );
        }
      };

      mm.add("(min-width: 1025px)", () => {
        buildTimeline(nodeRefs.current, connectorRefs.current, cardRefs.current);
      });

      mm.add("(max-width: 767px)", () => {
        buildTimeline(nodeRefs.current, connectorRefs.current, cardRefs.current);
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className={styles.lp} id="learning-path" ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <span className={styles.eyebrow}>YOUR ROADMAP</span>
          <h2 className={styles.heading}>
            Go from Zero to{" "}
            <span className={styles.headingEm}>Job-Ready</span> in 90 Days
          </h2>
          <p className={styles.subhead}>
            A structured, mentor-guided journey — step by step, skill by skill,
            from your first lesson to your first offer.
          </p>
        </div>

        <div className={styles.body}>
          {/* Left: progress rail */}
          <div className={styles.rail}>
            {roadmapSteps.map((step, i) => (
              <div key={i} className={styles.railItem}>
                <div className={styles.railNodeCol}>
                  <div
                    className={styles.node}
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    style={{ "--nc": step.color } as React.CSSProperties}
                  >
                    <i className={step.icon} />
                  </div>
                  {i < roadmapSteps.length - 1 && (
                    <div
                      className={styles.connector}
                      ref={(el) => {
                        connectorRefs.current[i] = el;
                      }}
                      style={
                        {
                          "--nc": step.color,
                          "--nc-next": step.colorNext,
                        } as React.CSSProperties
                      }
                    />
                  )}
                </div>

                <div className={styles.railContent}>
                  <span
                    className={styles.railPhase}
                    style={{ color: step.color }}
                  >
                    {step.phase}
                  </span>
                  <span className={styles.railTitle}>{step.title}</span>
                  <span className={styles.railWeeks}>{step.weeks}</span>

                  {/* Tablet-only inline detail */}
                  <div className={styles.inlineDetail}>
                    <p className={styles.inlineDesc}>{step.desc}</p>
                    <ul className={styles.inlineList}>
                      {step.highlights.map((h, j) => (
                        <li key={j}>
                          <i className="fas fa-check-circle" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: detail cards (desktop + mobile) */}
          <div className={styles.detail}>
            {roadmapSteps.map((step, i) => (
              <div
                key={i}
                className={styles.card}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={{ "--sc": step.color } as React.CSSProperties}
              >
                <div className={styles.cardBadge}>
                  <div className={styles.cardBadgeIcon}>
                    <i className={step.icon} />
                  </div>
                  <div>
                    <span className={styles.cardBadgePhase}>{step.phase}</span>
                    <span className={styles.cardBadgeWeeks}>{step.weeks}</span>
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardDesc}>{step.desc}</p>

                <ul className={styles.cardList}>
                  {step.highlights.map((h, j) => (
                    <li key={j}>
                      <i className="fas fa-check-circle" />
                      {h}
                    </li>
                  ))}
                </ul>

                <span className={styles.cardNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctaRow}>
          <p>Ready to start your journey?</p>
          <Link href="/#contact" className={styles.ctaBtn}>
            Book Free Counselling <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LearningPath;
