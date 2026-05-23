"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import MenuMobile from "@/components/MenuMobile/MenuMobile";
import styles from "./Header.module.css";

const Header = () => {
  const [menuClick, setMenuClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true);
      } else if (currentY < lastScrollY.current) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#contact");
    }
  };

  const navLinkClass = (href: string) =>
    pathname === href ? `${styles.headerNavLink} ${styles.active}` : styles.headerNavLink;

  return (
    <>
      <header
        className={[
          styles.header,
          scrolled ? styles.headerScrolled : "",
          hidden && !menuClick ? styles.headerHidden : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <nav className={styles.headerNav}>
          <Link className={styles.headerLogo} href="/">
            <span className={styles.headerLogoMark}>A</span>
            <span className={styles.headerLogoText}>
              nalytic<em>Shala</em>
            </span>
          </Link>

          <div className={styles.headerNavItems}>
            <Link href="/aboutUs" className={navLinkClass("/aboutUs")}>
              About Us
            </Link>
            <Link href="/courses" className={navLinkClass("/courses")}>
              Courses
            </Link>
            <Link href="/workshops" className={navLinkClass("/workshops")}>
              Workshops
            </Link>
            <Link href="/testimony" className={navLinkClass("/testimony")}>
              Testimony
            </Link>
            <a href="/#contact" onClick={handleContact} className={styles.headerNavLink}>
              Contact
            </a>
          </div>

          <div className={styles.headerNavRight}>
            <button
              className={styles.headerThemeToggle}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <i className="fas fa-moon" />
              ) : (
                <i className="fas fa-sun" />
              )}
            </button>

            <Link href="/courses" className={styles.headerCta}>
              Enroll Now
              <i className="fas fa-arrow-right" />
            </Link>

            <div
              className={`${styles.headerHamburger} ${menuClick ? styles.headerHamburgerActive : ""}`}
              onClick={() => setMenuClick(!menuClick)}
            >
              <div className={styles.headerHamburgerIcon}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MenuMobile expand={menuClick} setExpand={setMenuClick} />
    </>
  );
};

export default Header;
