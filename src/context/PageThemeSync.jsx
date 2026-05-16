import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const PAGE_THEMES = {
  "/": {
    key: "home",
    accent: "#16a34a",
    bg: "#f0fdf4",
    bgSec: "#dcfce7",
    border: "#bbf7d0",
    borderLight: "#86efac",
    headerBg: "rgba(240, 253, 244, 0.88)",
    headerBgScrolled: "rgba(240, 253, 244, 0.97)",
    headerBorder: "rgba(22, 163, 74, 0.18)",
    shadowHover: "0 12px 40px rgba(22, 163, 74, 0.18)",
  },
  "/aboutUs": {
    key: "about",
    accent: "#7c3aed",
    bg: "#faf8ff",
    bgSec: "#f2eeff",
    border: "#ddd6fe",
    borderLight: "#c4b5fd",
    headerBg: "rgba(250, 248, 255, 0.88)",
    headerBgScrolled: "rgba(250, 248, 255, 0.97)",
    headerBorder: "rgba(124, 58, 237, 0.18)",
    shadowHover: "0 12px 40px rgba(124, 58, 237, 0.15)",
  },
  "/courses": {
    key: "courses",
    accent: "#1d4ed8",
    bg: "#f0f6ff",
    bgSec: "#dbeafe",
    border: "#bfdbfe",
    borderLight: "#93c5fd",
    headerBg: "rgba(240, 246, 255, 0.88)",
    headerBgScrolled: "rgba(240, 246, 255, 0.97)",
    headerBorder: "rgba(29, 78, 216, 0.18)",
    shadowHover: "0 12px 40px rgba(29, 78, 216, 0.15)",
  },
  "/course-details": {
    key: "course-details",
    accent: "#0d9488",
    bg: "#f0fdfa",
    bgSec: "#ccfbf1",
    border: "#99f6e4",
    borderLight: "#5eead4",
    headerBg: "rgba(240, 253, 250, 0.88)",
    headerBgScrolled: "rgba(240, 253, 250, 0.97)",
    headerBorder: "rgba(13, 148, 136, 0.18)",
    shadowHover: "0 12px 40px rgba(13, 148, 136, 0.15)",
  },
  "/course-form": {
    key: "course-form",
    accent: "#1d4ed8",
    bg: "#f0f6ff",
    bgSec: "#dbeafe",
    border: "#bfdbfe",
    borderLight: "#93c5fd",
    headerBg: "rgba(240, 246, 255, 0.88)",
    headerBgScrolled: "rgba(240, 246, 255, 0.97)",
    headerBorder: "rgba(29, 78, 216, 0.18)",
    shadowHover: "0 12px 40px rgba(29, 78, 216, 0.15)",
  },
  "/workshops": {
    key: "workshops",
    accent: "#92400e",
    bg: "#fffbeb",
    bgSec: "#fef3c7",
    border: "#fde68a",
    borderLight: "#fcd34d",
    headerBg: "rgba(255, 251, 235, 0.88)",
    headerBgScrolled: "rgba(255, 251, 235, 0.97)",
    headerBorder: "rgba(146, 64, 14, 0.18)",
    shadowHover: "0 12px 40px rgba(146, 64, 14, 0.15)",
  },
  "/workshop-details": {
    key: "workshop-details",
    accent: "#9f1239",
    bg: "#fff1f2",
    bgSec: "#ffe4e6",
    border: "#fecdd3",
    borderLight: "#fda4af",
    headerBg: "rgba(255, 241, 242, 0.88)",
    headerBgScrolled: "rgba(255, 241, 242, 0.97)",
    headerBorder: "rgba(159, 18, 57, 0.18)",
    shadowHover: "0 12px 40px rgba(159, 18, 57, 0.15)",
  },
  "/workshop-form": {
    key: "workshop-form",
    accent: "#92400e",
    bg: "#fffbeb",
    bgSec: "#fef3c7",
    border: "#fde68a",
    borderLight: "#fcd34d",
    headerBg: "rgba(255, 251, 235, 0.88)",
    headerBgScrolled: "rgba(255, 251, 235, 0.97)",
    headerBorder: "rgba(146, 64, 14, 0.18)",
    shadowHover: "0 12px 40px rgba(146, 64, 14, 0.15)",
  },
  "/testimony": {
    key: "testimony",
    accent: "#86198f",
    bg: "#fdf4ff",
    bgSec: "#fae8ff",
    border: "#f5d0fe",
    borderLight: "#e879f9",
    headerBg: "rgba(253, 244, 255, 0.88)",
    headerBgScrolled: "rgba(253, 244, 255, 0.97)",
    headerBorder: "rgba(134, 25, 143, 0.18)",
    shadowHover: "0 12px 40px rgba(134, 25, 143, 0.15)",
  },
  "/payment": {
    key: "payment",
    accent: "#0369a1",
    bg: "#f0f9ff",
    bgSec: "#e0f2fe",
    border: "#bae6fd",
    borderLight: "#7dd3fc",
    headerBg: "rgba(240, 249, 255, 0.88)",
    headerBgScrolled: "rgba(240, 249, 255, 0.97)",
    headerBorder: "rgba(3, 105, 161, 0.18)",
    shadowHover: "0 12px 40px rgba(3, 105, 161, 0.15)",
  },
  "/payment-success": {
    key: "payment-success",
    accent: "#15803d",
    bg: "#f0fdf4",
    bgSec: "#dcfce7",
    border: "#bbf7d0",
    borderLight: "#86efac",
    headerBg: "rgba(240, 253, 244, 0.88)",
    headerBgScrolled: "rgba(240, 253, 244, 0.97)",
    headerBorder: "rgba(21, 128, 61, 0.18)",
    shadowHover: "0 12px 40px rgba(21, 128, 61, 0.15)",
  },
  "/privacy-policy": {
    key: "policy",
    accent: "#334155",
    bg: "#f8fafc",
    bgSec: "#f1f5f9",
    border: "#e2e8f0",
    borderLight: "#cbd5e1",
    headerBg: "rgba(248, 250, 252, 0.88)",
    headerBgScrolled: "rgba(248, 250, 252, 0.97)",
    headerBorder: "rgba(51, 65, 85, 0.18)",
    shadowHover: "0 12px 40px rgba(51, 65, 85, 0.12)",
  },
  "/terms-of-use": {
    key: "policy",
    accent: "#334155",
    bg: "#f8fafc",
    bgSec: "#f1f5f9",
    border: "#e2e8f0",
    borderLight: "#cbd5e1",
    headerBg: "rgba(248, 250, 252, 0.88)",
    headerBgScrolled: "rgba(248, 250, 252, 0.97)",
    headerBorder: "rgba(51, 65, 85, 0.18)",
    shadowHover: "0 12px 40px rgba(51, 65, 85, 0.12)",
  },
  "/refund-policy": {
    key: "policy",
    accent: "#334155",
    bg: "#f8fafc",
    bgSec: "#f1f5f9",
    border: "#e2e8f0",
    borderLight: "#cbd5e1",
    headerBg: "rgba(248, 250, 252, 0.88)",
    headerBgScrolled: "rgba(248, 250, 252, 0.97)",
    headerBorder: "rgba(51, 65, 85, 0.18)",
    shadowHover: "0 12px 40px rgba(51, 65, 85, 0.12)",
  },
};

const DEFAULT_THEME = PAGE_THEMES["/"];

export default function PageThemeSync() {
  const { pathname } = useLocation();
  const { theme: colorMode } = useTheme();

  useEffect(() => {
    const theme = PAGE_THEMES[pathname] ?? DEFAULT_THEME;
    const root = document.documentElement;
    const isDark = colorMode === "dark";

    root.setAttribute("data-page", theme.key);
    root.style.setProperty("--page-accent", theme.accent);

    const lightVars = [
      "--bg-primary", "--bg-secondary", "--border", "--border-light",
      "--header-bg", "--header-bg-scrolled", "--header-border",
      "--card-shadow-hover", "--bg-card-hover",
    ];

    if (isDark) {
      lightVars.forEach((v) => root.style.removeProperty(v));
    } else {
      root.style.setProperty("--bg-primary", theme.bg);
      root.style.setProperty("--bg-secondary", theme.bgSec);
      root.style.setProperty("--border", theme.border);
      root.style.setProperty("--border-light", theme.borderLight);
      root.style.setProperty("--header-bg", theme.headerBg);
      root.style.setProperty("--header-bg-scrolled", theme.headerBgScrolled);
      root.style.setProperty("--header-border", theme.headerBorder);
      root.style.setProperty("--card-shadow-hover", theme.shadowHover);
      root.style.setProperty("--bg-card-hover", theme.bgSec);
    }

    return () => {
      root.removeAttribute("data-page");
    };
  }, [pathname, colorMode]);

  return null;
}
