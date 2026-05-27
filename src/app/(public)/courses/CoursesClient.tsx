"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { coursesData, courseRegData, type Course } from "@/data/appData";
import styles from "./courses.module.css";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80&auto=format&fit=crop";

const getDifficultyClass = (level: string): string => {
  const first = level.split("→")[0].trim().toLowerCase();
  if (first === "beginner") return styles.cardBeginner;
  if (first === "advanced") return styles.cardAdvanced;
  return styles.cardIntermediate;
};

const stats = [
  { icon: "fas fa-users", value: "300+", label: "Students Trained" },
  { icon: "fas fa-star", value: "4.9", label: "Average Rating" },
  { icon: "fas fa-book-open", value: "12", label: "Course Tracks" },
  { icon: "fas fa-certificate", value: "100%", label: "Certificate Included" },
];

const whyItems = [
  {
    icon: "fas fa-laptop-code",
    title: "Project-Based Learning",
    desc: "Every course includes real projects you can showcase in your portfolio or at interviews.",
  },
  {
    icon: "fas fa-users",
    title: "Live Sessions + Recordings",
    desc: "Join live cohort sessions or learn at your own pace with recorded content.",
  },
  {
    icon: "fas fa-comments",
    title: "Community & Mentorship",
    desc: "Get unstuck fast with a community of peers and direct access to instructors.",
  },
  {
    icon: "fas fa-rupee-sign",
    title: "Affordable Pricing",
    desc: "World-class learning at prices accessible for learners across India and beyond.",
  },
];

const categoryMap: Record<string, string[]> = {
  all: [
    "genai-development",
    "data-analytics-python",
    "sql",
    "excel",
    "applied-ai",
    "agentic-ai",
    "advanced-rag",
    "tableau",
    "leaders",
    "webdev",
  ],
  ai: [
    "applied-ai",
    "agentic-ai",
    "advanced-rag",
    "genai-development",
    "leaders",
  ],
  data: ["data-analytics-python"],
  tools: ["sql", "excel", "tableau", "webdev"],
};

const categories = [
  { key: "all", label: "All Courses" },
  { key: "ai", label: "AI & ML" },
  { key: "data", label: "Data" },
  { key: "tools", label: "Tools & SQL" },
];


const CourseCard = ({ course }: { course: Course }) => {
  const bannerImg = course.bannerImage || DEFAULT_IMAGE;
  const diffClass = getDifficultyClass(course.level || "beginner");
  const reg = courseRegData[course.id];
  const isComingSoon = course.comingSoon || !course.price;

  const badgeColorClass =
    course.badgeColor === "badge-orange"
      ? styles.badgeOrange
      : course.badgeColor === "badge-green"
        ? styles.badgeGreen
        : course.badgeColor === "badge-blue"
          ? styles.badgeBlue
          : course.badgeColor === "badge-purple"
            ? styles.badgePurple
            : styles.badgeRed;

  return (
    <div
      className={`${styles.card} ${diffClass}${isComingSoon ? ` ${styles.cardComingSoon}` : ""}`}
    >
      {/* Left: image panel */}
      <div className={styles.cardImage}>
        <Image
          src={bannerImg}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className={styles.cardImageOverlay} />
        <div className={styles.cardIcon}>
          <i className={course.icon} />
        </div>
        {course.categoryLabel && (
          <span className={styles.cardCatChip}>{course.categoryLabel}</span>
        )}
        {isComingSoon && (
          <span className={`${styles.cardBadge} ${styles.badgeComingSoon}`}>
            Coming Soon
          </span>
        )}
        {!isComingSoon && course.badge && (
          <span className={`${styles.cardBadge} ${badgeColorClass}`}>
            {course.badge}
          </span>
        )}
      </div>

      {/* Right: content panel */}
      <div className={styles.cardBody}>
        <span className={styles.cardCategory}>{course.subtitle}</span>
        <h3 className={styles.cardTitle}>{course.homepageTitle || course.title}</h3>
        <p className={styles.cardDesc}>{course.description}</p>

        <div className={styles.cardMeta}>
          <span>
            <i className="fas fa-clock" /> {course.duration}
          </span>
          {course.modules && (
            <span>
              <i className="fas fa-layer-group" /> {course.modules} Modules
            </span>
          )}
          <span>
            <i className="fas fa-signal" /> {course.level}
          </span>
          {!isComingSoon && reg?.nextBatch && (
            <span className={styles.cardMetaBatch}>
              <i className="fas fa-calendar-alt" /> Next Batch:{" "}
              <strong>{reg.nextBatch}</strong>
            </span>
          )}
        </div>

        <div className={styles.skillsTags}>
          {course.skills.slice(0, 4).map((skill, i) => (
            <span key={i} className={styles.skillTag}>
              {skill}
            </span>
          ))}
          {course.skills.length > 4 && (
            <span className={`${styles.skillTag} ${styles.skillTagMore}`}>
              +{course.skills.length - 4}
            </span>
          )}
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.cardFooterLeft}>
            <div className={styles.cardRating}>
              <i className="fas fa-star" />
              <strong>4.9</strong>
              <span>({course.enrolledCount ?? "100+"} enrolled)</span>
            </div>
          </div>
          {isComingSoon ? (
            <span className={`${styles.cardCta} ${styles.cardCtaDisabled}`}>
              Coming Soon
            </span>
          ) : (
            <Link
              href={`/courses/${course.slug || course.id}`}
              className={styles.cardCta}
            >
              View Course <i className="fas fa-arrow-right" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};


export default function CoursesClient() {
  const [filter, setFilter] = useState("all");
  const [activeWhyCard, setActiveWhyCard] = useState(0);

  const handleWhyScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    setActiveWhyCard(
      Math.round((scrollLeft / maxScroll) * (whyItems.length - 1)),
    );
  };

  const categoryCounts = Object.fromEntries(
    Object.entries(categoryMap).map(([key, ids]) => [
      key,
      coursesData.filter((c) => ids.includes(c.id)).length,
    ]),
  );

  const filtered = categoryMap[filter]
    .map((id) => coursesData.find((c) => c.id === id))
    .filter((c): c is Course => c !== undefined);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCurve} aria-hidden="true">
          <svg
            viewBox="0 0 1440 64"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 C360,64 1080,64 1440,0 L1440,64 L0,64 Z"
              className={styles.heroCurvePath}
            />
          </svg>
        </div>
        <div className="container">
          <span className={styles.heroEyebrow}>
            <i className="fas fa-graduation-cap" /> Our Curriculum
          </span>

          <h1 className={styles.heroHeading}>
            Learn Skills That
            <br />
            <span className={styles.gradientText}>Actually Matter.</span>
          </h1>

          <p className={styles.heroDesc}>
            Hands-on, project-based courses in AI, Data Science, Analytics, and
            more - built for learners who want real-world outcomes, not just
            theory.
          </p>
          <p className={styles.heroTagline}>
            &ldquo;Because &apos;I know Excel&apos; doesn&apos;t cut it anymore
            😄&rdquo;
          </p>

          <div className={styles.statChips}>
            {stats.map((s, i) => (
              <div key={i} className={styles.statChip}>
                <i className={s.icon} />
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.filterRow}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`${styles.filterBtn}${filter === cat.key ? ` ${styles.filterBtnActive}` : ""}`}
                onClick={() => setFilter(cat.key)}
              >
                {cat.label}
                <span className={styles.filterCount}>
                  {categoryCounts[cat.key]}
                </span>
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <i className="fas fa-book-open" />
              <p>No courses in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.whySection}>
        <div className="container">
          <div className={`${styles.sectionLabel} ${styles.sectionLabelInv}`}>
            <i className="fas fa-star" /> Why AnalyticShala
          </div>
          <h2 className={styles.whyHeading}>Built for Real-World Impact</h2>
          <p className={styles.whyTagline}>
            Not just courses. A full career transformation.{" "}
            <em>(No cape required.)</em>
          </p>

          <div className={styles.whyGrid} onScroll={handleWhyScroll}>
            {whyItems.map((item, i) => (
              <div key={i} className={styles.whyCard}>
                <div className={styles.whyIcon}>
                  <i className={item.icon} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.whyDots}>
            {whyItems.map((_, i) => (
              <div
                key={i}
                className={`${styles.whyDot}${i === activeWhyCard ? ` ${styles.whyDotActive}` : ""}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
