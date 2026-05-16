import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./courses.css";
import { coursesData as courses, courseRegData } from "../../../appData";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80&auto=format&fit=crop";

/* Derive difficulty class from level string */
const getDifficultyClass = (level) => {
  const first = level.split("→")[0].trim().toLowerCase();
  if (first === "beginner") return "beginner";
  if (first === "advanced") return "advanced";
  return "intermediate";
};

const stats = [
  { icon: "fas fa-users", value: "500+", label: "Students Trained" },
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

const CourseCard = ({ course }) => {
  const bannerImg = course.bannerImage || DEFAULT_IMAGE;
  const diffClass = getDifficultyClass(course.level || "beginner");
  const reg = courseRegData[course.id];
  const catLabel = course.categoryLabel;
  const isComingSoon = course.comingSoon || !course.price;

  return (
    <div
      className={`courses-page__card courses-page__card--${diffClass}${isComingSoon ? " courses-page__card--coming-soon" : ""}`}
    >
      {/* Left: image panel */}
      <div className="courses-page__card-image">
        <img src={bannerImg} alt={course.title} loading="lazy" />
        <div className="courses-page__card-image-overlay" />
        <div className="courses-page__card-icon">
          <i className={course.icon} />
        </div>
        {/* Category chip – top-left on image */}
        {catLabel && (
          <span className="courses-page__card-cat-chip">{catLabel}</span>
        )}
        {isComingSoon && (
          <span className="courses-page__card-badge courses-page__card-badge--coming-soon">
            Coming Soon
          </span>
        )}
        {!isComingSoon && course.badge && (
          <span
            className={`courses-page__card-badge courses-page__card-badge--${course.badgeColor.replace("badge-", "")}`}
          >
            {course.badge}
          </span>
        )}
      </div>

      {/* Right: content panel */}
      <div className="courses-page__card-body">
        <span className="courses-page__card-category">{course.subtitle}</span>
        <h3 className="courses-page__card-title">{course.title}</h3>
        <p className="courses-page__card-desc">{course.description}</p>

        <div className="courses-page__card-meta">
          <span>
            <i className="fas fa-clock" /> {course.duration}
          </span>
          <span>
            <i className="fas fa-layer-group" /> {course.modules} Modules
          </span>
          <span>
            <i className="fas fa-signal" /> {course.level}
          </span>
          {!isComingSoon && reg?.nextBatch && (
            <span className="courses-page__card-meta-batch">
              <i className="fas fa-calendar-alt" /> Next Batch: <strong>{reg.nextBatch}</strong>
            </span>
          )}
        </div>

        <div className="courses-page__skills-tags">
          {course.skills.slice(0, 4).map((skill, i) => (
            <span key={i} className="courses-page__skill-tag">
              {skill}
            </span>
          ))}
          {course.skills.length > 4 && (
            <span className="courses-page__skill-tag courses-page__skill-tag--more">
              +{course.skills.length - 4}
            </span>
          )}
        </div>

        <div className="courses-page__card-footer">
          <div className="courses-page__card-footer-left">
            <div className="courses-page__card-rating">
              <i className="fas fa-star" />
              <strong>4.9</strong>
              <span>({course.enrolledCount ?? "100+"} enrolled)</span>
            </div>
          </div>
          {isComingSoon ? (
            <span className="courses-page__card-cta courses-page__card-cta--disabled">
              Coming Soon
            </span>
          ) : (
            <Link
              to={`/courses/${course.slug || course.id}`}
              className="courses-page__card-cta"
            >
              View Course <i className="fas fa-arrow-right" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const [filter, setFilter] = useState("all");
  const [activeWhyCard, setActiveWhyCard] = useState(0);

  const handleWhyScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    setActiveWhyCard(Math.round((scrollLeft / maxScroll) * (whyItems.length - 1)));
  };

  const categoryMap = {
    all: [
      "applied-ai",
      "agentic-ai",
      "advanced-rag",
      "genai-development",
      "data-analytics-python",
      "python",
      "sql",
      "excel",
      "tableau",
      "webdev",
      "leaders",
    ],
    ai: ["applied-ai", "agentic-ai", "advanced-rag", "genai-development", "leaders"],
    data: ["data-analytics-python", "python"],
    tools: ["sql", "excel", "tableau", "webdev"],
  };

  const categoryCounts = Object.fromEntries(
    Object.entries(categoryMap).map(([key, ids]) => [
      key,
      courses.filter((c) => ids.includes(c.id)).length,
    ])
  );

  const categories = [
    { key: "all",   label: "All Courses" },
    { key: "ai",    label: "AI & ML"     },
    { key: "data",  label: "Data"        },
    { key: "tools", label: "Tools & SQL" },
  ];

  const filtered = courses.filter((c) => categoryMap[filter].includes(c.id));

  return (
    <div className="courses-page">
      <Helmet>
        <title>Explore Data Courses | AnalyticShala</title>
        <meta
          name="description"
          content="Explore hands-on courses in Data Analytics, Data Science, AI, Machine Learning, SQL, and more. Industry-led curriculum with real projects and job-ready outcomes."
        />
        <meta
          property="og:title"
          content="Explore Data Courses | AnalyticShala"
        />
        <meta
          property="og:description"
          content="From beginner to advanced — find the right data & AI course for your career goals. 300+ learners trained. 4.9★ rated."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://analyticshala.in/courses" />
      </Helmet>
      <section className="courses-page__hero">
        {/* SVG wave -blue hero melts into cream grid section */}
        <div className="courses-page__hero-curve" aria-hidden="true">
          <svg
            viewBox="0 0 1440 64"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 C360,64 1080,64 1440,0 L1440,64 L0,64 Z"
              className="courses-page__hero-curve-path"
            />
          </svg>
        </div>
        <div className="container">
          <span className="courses-page__hero-eyebrow">
            <i className="fas fa-graduation-cap" /> Our Curriculum
          </span>

          <h1 className="courses-page__hero-heading">
            Learn Skills That
            <br />
            <span className="courses-page__gradient-text">
              Actually Matter.
            </span>
          </h1>

          <p className="courses-page__hero-desc">
            Hands-on, project-based courses in AI, Data Science, Analytics, and
            more - built for learners who want real-world outcomes, not just
            theory.
          </p>
          <p className="courses-page__hero-tagline">
            &ldquo;Because &apos;I know Excel&apos; doesn&apos;t cut it anymore
            😄&rdquo;
          </p>

          {/* Stat chips */}
          <div className="courses-page__stat-chips">
            {stats.map((s, i) => (
              <div key={i} className="courses-page__stat-chip">
                <i className={s.icon} />
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="courses-page__grid-section">
        <div className="container">
          {/* Filter pills */}
          <div className="courses-page__filter-row">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`courses-page__filter-btn ${
                  filter === cat.key ? "courses-page__filter-btn--active" : ""
                }`}
                onClick={() => setFilter(cat.key)}
              >
                {cat.label}
                <span className="courses-page__filter-count">
                  {categoryCounts[cat.key]}
                </span>
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="courses-page__grid">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="courses-page__empty">
              <i className="fas fa-book-open" />
              <p>No courses in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <section className="courses-page__why-section">
        <div className="container">
          <div className="courses-page__section-label courses-page__section-label--inv">
            <i className="fas fa-star" /> Why AnalyticShala
          </div>
          <h2 className="courses-page__why-heading">
            Built for Real-World Impact
          </h2>
          <p className="courses-page__why-tagline">
            Not just courses. A full career transformation.{" "}
            <em>(No cape required.)</em>
          </p>

          <div className="courses-page__why-grid" onScroll={handleWhyScroll}>
            {whyItems.map((item, i) => (
              <div key={i} className="courses-page__why-card">
                <div className="courses-page__why-icon">
                  <i className={item.icon} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="courses-page__why-dots">
            {whyItems.map((_, i) => (
              <div
                key={i}
                className={`courses-page__why-dot${i === activeWhyCard ? " courses-page__why-dot--active" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
