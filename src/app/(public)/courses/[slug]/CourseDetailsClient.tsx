"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { courseRegData, teamData, testimonyData, type Course } from "@/data/appData";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import styles from "./courseDetails.module.css";

interface Props {
  course: Course;
}

const ENROLLED_COUNT: Record<string, number> = {
  ai: 284,
  agentic: 143,
  rag: 97,
  analytics: 312,
  datascience: 198,
  sql: 426,
  excel: 389,
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function CourseDetailsClient({ course }: Props) {
  const reg = courseRegData[course.id];
  const instructor = teamData.find((t) => t.name === (reg?.instructor ?? course.instructor)) ?? teamData[1];
  const enrolledCount = ENROLLED_COUNT[course.id] ?? (course.enrolledCount ?? 120);

  const badgeClass =
    course.badgeColor === "badge-orange"
      ? styles.badgeOrange
      : course.badgeColor === "badge-purple"
        ? styles.badgePurple
        : course.badgeColor === "badge-red"
          ? styles.badgeRed
          : course.badgeColor === "badge-green"
            ? styles.badgeGreen
            : course.badgeColor === "badge-blue"
              ? styles.badgeBlue
              : styles.badgeOrange;

  const includesList = reg?.includes ?? course.includes ?? [];
  const whoIsItForList = reg?.whoIsItFor ?? course.whoIsItFor ?? [];
  const curriculumList = reg?.curriculum ?? course.curriculum ?? [];
  const nextBatch = reg?.nextBatch ?? course.nextBatch;
  const batchType = reg?.batchType ?? course.batchType;

  return (
    <div className={styles.courseDetails}>
      <Breadcrumb
        items={[
          { label: "Courses", href: "/courses" },
          { label: course.title },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className={styles.heroContent}>
          <div className={styles.heroBadges}>
            {course.badge && (
              <span className={`${styles.badge} ${badgeClass}`}>
                {course.badge}
              </span>
            )}
            <span className={styles.levelBadge}>
              <i className="fas fa-signal" /> {course.level}
            </span>
          </div>

          <div className={styles.heroIcon}>
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
            className={styles.heroSub}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {course.subtitle}
          </motion.p>

          <motion.div
            className={styles.heroMeta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span>
              <i className="fas fa-clock" /> {course.duration}
            </span>
            {course.modules && (
              <span>
                <i className="fas fa-layer-group" /> {course.modules} Modules
              </span>
            )}
            {batchType && (
              <span>
                <i className="fas fa-calendar-check" /> {batchType}
              </span>
            )}
            <span>
              <i className="fas fa-users" /> {enrolledCount}+ enrolled
            </span>
          </motion.div>
        </div>
      </section>

      <div className={styles.layout}>
        <main className={styles.main}>
          {/* About */}
          <motion.section
            className={styles.section}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionTitle}>About This Course</h2>
            <p className={styles.aboutText}>{course.description}</p>
            <div className={styles.skillsWrap}>
              {course.skills.map((skill, i) => (
                <span key={i} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Outcomes */}
          {course.outcomes.length > 0 && (
            <motion.section
              className={styles.section}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className={styles.sectionTitle}>What You&apos;ll Achieve</h2>
              <div className={styles.outcomesGrid}>
                {course.outcomes.map((item, i) => (
                  <motion.div
                    key={i}
                    className={styles.outcomeItem}
                    variants={fadeUp}
                    custom={i}
                  >
                    <i className={`fas fa-check-circle ${styles.checkIcon}`} />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Curriculum */}
          {curriculumList.length > 0 && (
            <motion.section
              className={styles.section}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className={styles.sectionTitle}>Course Curriculum</h2>
              <div className={styles.curriculum}>
                {curriculumList.map((item, i) => (
                  <motion.div
                    key={i}
                    className={styles.currItem}
                    variants={fadeUp}
                    custom={i}
                  >
                    <div className={styles.currWeek}>{item.week}</div>
                    <div className={styles.currBody}>
                      <div className={styles.currTitle}>{item.title}</div>
                      {item.topics && item.topics.length > 0 && (
                        <ul className={styles.currDesc}>
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
          )}

          {/* Who is this for */}
          {whoIsItForList.length > 0 && (
            <motion.section
              className={styles.section}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className={styles.sectionTitle}>Who Is This For?</h2>
              <div className={styles.whoGrid}>
                {whoIsItForList.map((item, i) => (
                  <motion.div
                    key={i}
                    className={styles.whoItem}
                    variants={fadeUp}
                    custom={i}
                  >
                    <i className="fas fa-user-check" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Instructor */}
          <motion.section
            className={styles.section}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionTitle}>Meet Your Instructor</h2>
            <div className={styles.instructorCard}>
              <div className={styles.instrImgWrap}>
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  width={80}
                  height={80}
                />
              </div>
              <div className={styles.instrInfo}>
                <h3 className={styles.instrName}>{instructor.name}</h3>
                <p className={styles.instrRole}>{instructor.position}</p>
                {instructor.college && (
                  <span className={styles.instrBadge}>{instructor.college}</span>
                )}
                <p className={styles.instrBio}>
                  {instructor.bio ||
                    "Industry expert with years of hands-on experience training professionals across the data and AI domain."}
                </p>
                {instructor.social.length > 0 && (
                  <div className={styles.instrSocials}>
                    {instructor.social.map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.instrSocialBtn}
                      >
                        <i className={s.iconClass} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section
            className={styles.section}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionTitle}>What Our Students Say</h2>
            <div className={styles.testiGrid}>
              {testimonyData.slice(0, 2).map((t) => (
                <div key={t.id} className={styles.testiCard}>
                  <div className={styles.testiStars}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star" />
                    ))}
                  </div>
                  <p className={styles.testiQuote}>&ldquo;{t.review}&rdquo;</p>
                  <div className={styles.testiAuthor}>
                    <Image src={t.image} alt={t.name} width={40} height={40} />
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

        <aside className={styles.sidebar}>
          <div className={styles.priceCard}>
            <div className={styles.sidebarMeta}>
              {nextBatch && (
                <div className={styles.sbItem}>
                  <i className="fas fa-calendar-alt" />
                  <span>
                    Next Batch: <strong>{nextBatch}</strong>
                  </span>
                </div>
              )}
              <div className={styles.sbItem}>
                <i className="fas fa-signal" />
                <span>{course.level}</span>
              </div>
              <div className={styles.sbItem}>
                <i className="fas fa-laptop-house" />
                <span>Online · Live + Recorded</span>
              </div>
              <div className={styles.sbItem}>
                <i className="fas fa-certificate" />
                <span>Certificate on completion</span>
              </div>
            </div>

            {includesList.length > 0 && (
              <div className={styles.includes}>
                <h4 className={styles.includesTitle}>
                  <i className="fas fa-gift" /> What&apos;s Included
                </h4>
                <ul>
                  {includesList.map((item, i) => (
                    <li key={i}>
                      <i className="fas fa-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.enrollContext}>
              <div className={styles.enrollProof}>
                <i className="fas fa-users" />
                <span>
                  <strong>{enrolledCount}+</strong> learners already enrolled
                </span>
              </div>
              {nextBatch && (
                <div className={styles.enrollBatch}>
                  <i className="fas fa-fire" />
                  <span>
                    Next batch: <strong>{nextBatch}</strong>
                  </span>
                </div>
              )}
            </div>

            <Link
              href={`/course-form?id=${course.id}`}
              className={styles.enrollBtn}
            >
              Enroll Now <i className="fas fa-arrow-right" />
            </Link>

            <a
              href="https://wa.me/918882641988"
              target="_blank"
              rel="noreferrer"
              className={styles.waBtn}
            >
              <i className="fab fa-whatsapp" /> Ask on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
