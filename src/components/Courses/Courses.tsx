"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { coursesData } from "@/data/appData";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./Courses.module.css";

interface CoursesProps {
  setShowDownload: (v: boolean) => void;
}

const featuredCourses = coursesData
  .filter((c) => c.homepageOrder !== null && !c.comingSoon)
  .sort((a, b) => (a.homepageOrder ?? 0) - (b.homepageOrder ?? 0))
  .slice(0, 4);

const cardLabels = ["01", "02", "03", "04"];

const Courses = ({ setShowDownload }: CoursesProps) => {
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCard, setActiveCard] = useState(0);

  const handleGridScroll = () => {
    if (!gridRef.current) return;
    const { scrollLeft, clientWidth } = gridRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveCard(Math.min(index, featuredCourses.length - 1));
  };

  return (
    <section className={styles.courses} ref={ref} id="courses">
      <div className="container">
        <SectionHeader
          eyebrow="COURSES"
          title="Industry-Ready Courses Built for Careers"
          subtitle="Pick a track, master the skills, and get placed. Every course is live, project-based, and mentored."
        />

        <div
          className={styles.grid}
          ref={gridRef}
          onScroll={handleGridScroll}
        >
          {featuredCourses.map((course, i) => (
            <motion.div
              key={course.id}
              className={`${styles.card}${i === 0 ? ` ${styles.cardFirst}` : ""}`}
              style={{ "--accent": course.accent } as React.CSSProperties}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.08 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={styles.cardNum}>{cardLabels[i]}</span>

              <div className={styles.cardTop}>
                <span className={styles.cardChip}>
                  <i className={course.icon} />
                  {course.categoryLabel}
                </span>
                {course.badge && (
                  <span className={styles.cardBadge}>{course.badge}</span>
                )}
              </div>

              <h3 className={styles.cardTitle}>{course.homepageTitle}</h3>
              <p className={styles.cardDesc}>{course.desc}</p>

              <div className={styles.metaPills}>
                <span className={styles.metaPill}>
                  <i className="fas fa-signal" />
                  {course.level}
                </span>
                <span className={styles.metaPill}>
                  <i className="fas fa-clock" />
                  {course.duration}
                </span>
                <span className={`${styles.metaPill} ${styles.metaPillBatch}`}>
                  <i className="fas fa-calendar-alt" />
                  {course.nextBatch}
                </span>
              </div>

              {course.chapters.length > 0 && (
                <div className={styles.chips}>
                  {course.chapters.slice(0, 5).map((ch) => (
                    <span key={ch} className={styles.chipTag}>
                      {ch}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.cardActions}>
                <Link
                  href={`/courses/${course.slug || course.id}`}
                  className={styles.btnPrimary}
                >
                  Show Details <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile dots */}
        <div className={styles.dots}>
          {featuredCourses.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot}${i === activeCard ? ` ${styles.dotActive}` : ""}`}
              aria-label={`Course ${i + 1}`}
            />
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/courses" className={styles.viewAll}>
            <i className="fas fa-th-large" />
            Show all Courses
          </Link>
          <button
            className={`${styles.brochure} btn-shimmer`}
            onClick={() => setShowDownload(true)}
          >
            <i className="fas fa-download" />
            Download Course Brochure
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
