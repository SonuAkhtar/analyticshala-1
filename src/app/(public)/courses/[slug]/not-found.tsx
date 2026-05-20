import Link from "next/link";
import { courseListData } from "@/data/appData";
import styles from "./notFound.module.css";

export default function CourseNotFound() {
  const suggestions = [...courseListData]
    .filter((c) => !c.comingSoon)
    .sort((a, b) => a.homepageOrder - b.homepageOrder)
    .slice(0, 3);

  return (
    <div className={styles.page}>
      <div className={styles.bgShapes} aria-hidden="true">
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
      </div>

      <div className={styles.hero}>
        <div className={styles.numberWrap}>
          <span className={styles.bigNumber}>404</span>
          <div className={styles.iconBadge} aria-hidden="true">
            <i className="fas fa-graduation-cap" />
          </div>
        </div>

        <h1 className={styles.title}>
          This course took a <em>different path</em>
        </h1>
        <p className={styles.subhead}>
          We couldn&apos;t find the course you&apos;re looking for - it may have
          been renamed, or the link is slightly off. But there&apos;s plenty
          more to explore.
        </p>

        <div className={styles.ctaRow}>
          <Link href="/courses" className={styles.btnPrimary}>
            Browse All Courses <i className="fas fa-arrow-right" />
          </Link>
          <Link href="/" className={styles.btnGhost}>
            <i className="fas fa-home" /> Back to Home
          </Link>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          <div className={styles.suggestionsHeader}>
            <span className={styles.suggestionsLabel}>Most popular</span>
            <h2 className={styles.suggestionsHeading}>
              Maybe try one of these?
            </h2>
          </div>

          <div className={styles.grid}>
            {suggestions.map((c) => (
              <Link
                key={c.id}
                href={`/courses/${c.slug || c.id}`}
                className={styles.card}
              >
                <div className={styles.cardIcon}>
                  <i className={c.icon} />
                </div>
                <span className={styles.cardCategory}>{c.categoryLabel}</span>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <div className={styles.cardMeta}>
                  {c.duration && (
                    <span>
                      <i className="fas fa-clock" /> {c.duration}
                    </span>
                  )}
                  {c.level && (
                    <span>
                      <i className="fas fa-signal" /> {c.level}
                    </span>
                  )}
                </div>
                <span className={styles.cardLink}>
                  View course <i className="fas fa-arrow-right" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
