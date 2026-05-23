"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
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

          <div className={styles.themeRow}>
            <span className={styles.themeLabel}>App theme</span>
            <div
              className={styles.themeSwitch}
              role="group"
              aria-label="Theme"
            >
              <span
                className={styles.themeSwitchKnob}
                data-theme={theme}
                aria-hidden="true"
              />
              <button
                type="button"
                className={`${styles.themeSwitchOption}${theme === "light" ? " " + styles.themeSwitchOptionActive : ""}`}
                onClick={() => theme !== "light" && toggleTheme()}
                aria-label="Light mode"
                aria-pressed={theme === "light"}
              >
                <i className="fas fa-sun" />
              </button>
              <button
                type="button"
                className={`${styles.themeSwitchOption}${theme === "dark" ? " " + styles.themeSwitchOptionActive : ""}`}
                onClick={() => theme !== "dark" && toggleTheme()}
                aria-label="Dark mode"
                aria-pressed={theme === "dark"}
              >
                <i className="fas fa-moon" />
              </button>
            </div>
          </div>

          <p className={styles.mobNavTagline}>
            India&apos;s most hands-on data education
          </p>
        </div>
      </div>
    </>
  );
};

export default MenuMobile;
