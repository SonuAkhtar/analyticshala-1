import Link from "next/link";
import { workshopData } from "@/data/appData";
import styles from "./notFound.module.css";

export default function WorkshopNotFound() {
  const suggestions = workshopData.upcoming.slice(0, 3);

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
            <i className="fas fa-bolt" />
          </div>
        </div>

        <h1 className={styles.title}>
          This workshop has <em>flown away</em>
        </h1>
        <p className={styles.subhead}>
          This workshop may have already ended, or the link isn&apos;t quite
          right. Don&apos;t worry - we&apos;ve got fresh sessions coming up.
        </p>

        <div className={styles.ctaRow}>
          <Link href="/workshops" className={styles.btnPrimary}>
            See Upcoming Workshops <i className="fas fa-arrow-right" />
          </Link>
          <Link href="/" className={styles.btnGhost}>
            <i className="fas fa-home" /> Back to Home
          </Link>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          <div className={styles.suggestionsHeader}>
            <span className={styles.suggestionsLabel}>Coming up</span>
            <h2 className={styles.suggestionsHeading}>
              Catch one of these instead
            </h2>
          </div>

          <div className={styles.grid}>
            {suggestions.map((w) => (
              <Link
                key={w.id}
                href={`/workshops/${w.slug ?? w.id}`}
                className={styles.card}
              >
                {w.date && (
                  <span className={styles.cardDate}>
                    <i className="fas fa-calendar-alt" /> {w.date}
                  </span>
                )}
                {w.category && (
                  <span className={styles.cardCategory}>{w.category}</span>
                )}
                <h3 className={styles.cardTitle}>{w.title}</h3>
                <div className={styles.cardMeta}>
                  {w.time && (
                    <span>
                      <i className="fas fa-clock" /> {w.time}
                    </span>
                  )}
                  {w.duration && (
                    <span>
                      <i className="fas fa-hourglass-half" /> {w.duration}
                    </span>
                  )}
                </div>
                <span className={styles.cardLink}>
                  View workshop <i className="fas fa-arrow-right" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
