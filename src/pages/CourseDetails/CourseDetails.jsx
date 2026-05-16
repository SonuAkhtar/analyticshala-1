import { useSearchParams, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { courseListData, courseRegData, teamData, testimonyData } from "../../../appData";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./courseDetails.css";


const ENROLLED_COUNT = {
  ai: 284, agentic: 143, rag: 97,
  analytics: 312, datascience: 198,
  sql: 426, excel: 389,
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" },
  }),
};

const CourseDetails = () => {
  const [params] = useSearchParams();
  const { slug } = useParams();
  const id = params.get("id") || courseListData.find(c => c.slug === slug)?.id || courseListData[0].id;

  const course = courseListData.find((c) => c.id === id) || courseListData[0];
  const reg = courseRegData[course.id] || courseRegData[courseListData[0].id];

  const instructor = teamData.find((t) => t.name === reg.instructor) || teamData[1];

  const enrolledCount = ENROLLED_COUNT[course.id] || 120;

  return (
    <div className="course-details">
      <Helmet>
        <title>{course.title} | AnalyticShala</title>
        <meta name="description" content={`${course.title} - ${course.subtitle}. ${course.description.slice(0, 150)}`} />
        <meta property="og:title" content={`${course.title} | AnalyticShala`} />
        <meta property="og:description" content={course.description.slice(0, 160)} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://analyticshala.in/courses/${course.slug || course.id}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": course.title,
          "description": course.description,
          "provider": {
            "@type": "Organization",
            "name": "AnalyticShala",
            "sameAs": "https://analyticshala.in"
          }
        })}</script>
      </Helmet>
      <Breadcrumb items={[
        { label: "Courses", href: "/courses" },
        { label: course.title },
      ]} />
      <section className="course-details__hero">
        <div className="course-details__hero-orb course-details__hero-orb--1" />
        <div className="course-details__hero-orb course-details__hero-orb--2" />
        <div className="course-details__hero-content">
          <div className="course-details__hero-badges">
            {course.badge && (
              <span className={`course-details__badge ${course.badgeColor}`}>{course.badge}</span>
            )}
            <span className="course-details__level-badge">
              <i className="fas fa-signal" /> {course.level}
            </span>
          </div>

          <div className="course-details__hero-icon">
            <i className={course.icon} />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {course.title}
          </motion.h1>

          <motion.p
            className="course-details__hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {course.subtitle}
          </motion.p>

          <motion.div
            className="course-details__hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span><i className="fas fa-clock" /> {course.duration}</span>
            <span><i className="fas fa-layer-group" /> {course.modules} Modules</span>
            <span><i className="fas fa-calendar-check" /> {reg.batchType}</span>
            <span><i className="fas fa-users" /> {enrolledCount}+ enrolled</span>
          </motion.div>
        </div>
      </section>

      <div className="course-details__layout">
        <main className="course-details__main">
          <motion.section
            className="course-details__section"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="course-details__section-title">About This Course</h2>
            <p className="course-details__about-text">{course.description}</p>
            <div className="course-details__skills-wrap">
              {course.skills.map((skill, i) => (
                <span key={i} className="course-details__skill-tag">{skill}</span>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="course-details__section"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="course-details__section-title">What You'll Achieve</h2>
            <div className="course-details__outcomes-grid">
              {course.outcomes.map((item, i) => (
                <motion.div
                  key={i}
                  className="course-details__outcome-item"
                  variants={fadeUp}
                  custom={i}
                >
                  <i className="fas fa-check-circle course-details__check-icon" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="course-details__section"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="course-details__section-title">Course Curriculum</h2>
            <div className="course-details__curriculum">
              {reg.curriculum.map((item, i) => (
                <motion.div
                  key={i}
                  className="course-details__curr-item"
                  variants={fadeUp}
                  custom={i}
                >
                  <div className="course-details__curr-week">{item.week}</div>
                  <div className="course-details__curr-body">
                    <div className="course-details__curr-title">{item.title}</div>
                    {item.topics?.length > 0 && (
                      <ul className="course-details__curr-desc">
                        {item.topics.map((point, j) => (
                          <li key={j}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="course-details__section"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="course-details__section-title">Who Is This For?</h2>
            <div className="course-details__who-grid">
              {reg.whoIsItFor.map((item, i) => (
                <motion.div
                  key={i}
                  className="course-details__who-item"
                  variants={fadeUp}
                  custom={i}
                >
                  <i className="fas fa-user-check" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="course-details__section"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="course-details__section-title">Meet Your Instructor</h2>
            <div className="course-details__instructor-card">
              <div className="course-details__instr-img-wrap">
                <img src={instructor.image} alt={instructor.name} />
              </div>
              <div className="course-details__instr-info">
                <h3 className="course-details__instr-name">{instructor.name}</h3>
                <p className="course-details__instr-role">{instructor.position}</p>
                {instructor.college && (
                  <span className="course-details__instr-badge">{instructor.college}</span>
                )}
                <p className="course-details__instr-bio">
                  {instructor.bio ||
                    "Industry expert with years of hands-on experience training professionals across the data and AI domain."}
                </p>
                <div className="course-details__instr-socials">
                  {instructor.social.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="course-details__instr-social-btn"
                    >
                      <i className={s.iconClass} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="course-details__section"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="course-details__section-title">What Our Students Say</h2>
            <div className="course-details__testi-grid">
              {testimonyData.slice(0, 2).map((t) => (
                <div key={t.id} className="course-details__testi-card">
                  <div className="course-details__testi-stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star" />
                    ))}
                  </div>
                  <p className="course-details__testi-quote">&ldquo;{t.review}&rdquo;</p>
                  <div className="course-details__testi-author">
                    <img src={t.image} alt={t.name} />
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.position}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </main>

        <aside className="course-details__sidebar">
          <div className="course-details__price-card">
            <div className="course-details__sidebar-meta">
              <div className="course-details__sb-item">
                <i className="fas fa-calendar-alt" />
                <span>Next Batch: <strong>{reg.nextBatch}</strong></span>
              </div>
              <div className="course-details__sb-item">
                <i className="fas fa-signal" />
                <span>{course.level}</span>
              </div>
              <div className="course-details__sb-item">
                <i className="fas fa-laptop-house" />
                <span>Online · Live + Recorded</span>
              </div>
              <div className="course-details__sb-item">
                <i className="fas fa-certificate" />
                <span>Certificate on completion</span>
              </div>
            </div>

            <div className="course-details__includes">
              <h4 className="course-details__includes-title">
                <i className="fas fa-gift" /> What's Included
              </h4>
              <ul>
                {reg.includes.map((item, i) => (
                  <li key={i}>
                    <i className="fas fa-check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social proof + urgency above CTA */}
            <div className="course-details__enroll-context">
              <div className="course-details__enroll-proof">
                <i className="fas fa-users" />
                <span><strong>{enrolledCount}+</strong> learners already enrolled</span>
              </div>
              <div className="course-details__enroll-batch">
                <i className="fas fa-fire" />
                <span>Next batch: <strong>{reg.nextBatch}</strong></span>
              </div>
            </div>

            <Link
              to={`/course-form?id=${course.id}`}
              className="course-details__enroll-btn"
            >
              Enroll Now <i className="fas fa-arrow-right" />
            </Link>

            <a
              href="https://wa.me/918882641988"
              target="_blank"
              rel="noreferrer"
              className="course-details__wa-btn"
            >
              <i className="fab fa-whatsapp" /> Ask on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails;
