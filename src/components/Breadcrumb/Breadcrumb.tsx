import Link from "next/link";
import styles from "./Breadcrumb.module.css";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav
      className={styles.breadcrumb}
      aria-label="Breadcrumb"
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.home} aria-label="Home">
          <i className="fas fa-home" />
        </Link>

        {items.map((item, i) => (
          <span key={i} className={styles.segment}>
            <span className={styles.chevron} aria-hidden="true">
              <i className="fas fa-chevron-right" />
            </span>
            {item.href ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span
                className={styles.current}
                aria-current="page"
                title={item.label}
              >
                {item.label}
              </span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;
