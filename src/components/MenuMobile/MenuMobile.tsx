"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import styles from "./MenuMobile.module.css";

interface MenuMobileProps {
  expand: boolean;
  setExpand: (v: boolean) => void;
}

const navLinks = [
  { name: "About Us",  to: "/aboutUs",   num: "01" },
  { name: "Courses",   to: "/courses",   num: "02" },
  { name: "Workshops", to: "/workshops", num: "03" },
  { name: "Testimony", to: "/testimony", num: "04" },
  { name: "Contact",   contact: true,    num: "05" },
] as const;

const MenuMobile = ({ expand, setExpand }: MenuMobileProps) => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleContact = () => {
    setExpand(false);
    if (pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#contact");
    }
  };

  return (
    <>
      <div
        className={`${styles.mobNavOverlay} ${expand ? styles.mobNavOverlayActive : ""}`}
        onClick={() => setExpand(false)}
      />

      <div className={`${styles.mobNav} ${expand ? styles.mobNavOpen : ""}`}>
        <nav className={styles.mobNavLinks}>
          {navLinks.map((link, i) =>
            "contact" in link && link.contact ? (
              <div
                key={i}
                className={`${styles.mobNavLink} ${styles.mobNavLinkBtn}`}
                role="button"
                tabIndex={0}
                onClick={handleContact}
                onKeyDown={(e) => e.key === "Enter" && handleContact()}
                style={{ "--delay": `${i * 0.12 + 0.05}s` } as React.CSSProperties}
              >
                <span className={styles.mobNavNum}>{link.num}</span>
                <span className={styles.mobNavName}>{link.name}</span>
                <i className={`fas fa-arrow-right ${styles.mobNavArrow}`} />
              </div>
            ) : (
              <Link
                key={i}
                href={"to" in link ? link.to : "/"}
                className={`${styles.mobNavLink} ${pathname === ("to" in link ? link.to : "/") ? styles.mobNavLinkActive : ""}`}
                onClick={() => setExpand(false)}
                style={{ "--delay": `${i * 0.12 + 0.05}s` } as React.CSSProperties}
              >
                <span className={styles.mobNavNum}>{link.num}</span>
                <span className={styles.mobNavName}>{link.name}</span>
                <i className={`fas fa-arrow-right ${styles.mobNavArrow}`} />
              </Link>
            ),
          )}
        </nav>

        <div className={styles.mobNavFooter}>
          <Link
            href="/courses"
            className={styles.mobNavCta}
            onClick={() => setExpand(false)}
          >
            Enroll Now <i className="fas fa-arrow-right" />
          </Link>

          <button className={styles.mobNavThemeToggle} onClick={toggleTheme}>
            <i className={theme === "light" ? "fas fa-moon" : "fas fa-sun"} />
            <span>{theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}</span>
          </button>

          <p className={styles.mobNavTagline}>
            India&apos;s most hands-on data education
          </p>
        </div>
      </div>
    </>
  );
};

export default MenuMobile;
