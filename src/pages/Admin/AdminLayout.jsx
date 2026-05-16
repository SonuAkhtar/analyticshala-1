import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { isSupabaseConfigured } from "../../lib/supabase";
import "./adminLayout.css";

const NAV = [
  { to: "/admin/dashboard", icon: "fas fa-th-large", label: "Dashboard" },
  { to: "/admin/courses", icon: "fas fa-graduation-cap", label: "Courses" },
  { to: "/admin/workshops", icon: "fas fa-calendar-alt", label: "Workshops" },
  {
    to: "/admin/announcements",
    icon: "fas fa-bullhorn",
    label: "Announcements",
  },
];

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin");
  };

  return (
    <div className="adm-layout">
      {sidebarOpen && (
        <div
          className="adm-layout__mob-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`adm-sidebar ${sidebarOpen ? "adm-sidebar--open" : ""}`}
      >
        {/* Logo */}
        <div className="adm-sidebar__logo">
          <div className="adm-sidebar__logo-icon">
            <i className="fas fa-chart-line" />
          </div>
          <div className="adm-sidebar__logo-text">
            <span className="adm-sidebar__logo-name">AnalyticShala</span>
            <span className="adm-sidebar__logo-sub">Admin Portal</span>
          </div>
        </div>

        {/* Supabase status indicator */}
        <div
          className={`adm-sidebar__status ${isSupabaseConfigured ? "adm-sidebar__status--live" : "adm-sidebar__status--offline"}`}
        >
          <span className="adm-sidebar__status-dot" />
          <span>
            {isSupabaseConfigured
              ? "Live -Supabase connected"
              : "Setup required"}
          </span>
        </div>

        {/* Nav */}
        <nav className="adm-sidebar__nav">
          <p className="adm-sidebar__nav-label">Menu</p>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `adm-sidebar__link ${isActive ? "adm-sidebar__link--active" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <i className={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom: user + sign out */}
        <div className="adm-sidebar__footer">
          <div className="adm-sidebar__user">
            <div className="adm-sidebar__avatar">
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="adm-sidebar__user-info">
              <span className="adm-sidebar__user-email">
                {user?.email || "admin"}
              </span>
              <span className="adm-sidebar__user-role">Administrator</span>
            </div>
          </div>
          <button
            className="adm-sidebar__signout"
            onClick={handleSignOut}
            title="Sign out"
          >
            <i className="fas fa-sign-out-alt" />
          </button>
        </div>
      </aside>

      <div className="adm-main">
        {/* Top bar */}
        <header className="adm-topbar">
          <button
            className="adm-topbar__menu"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars" />
          </button>

          <div className="adm-topbar__right">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="adm-topbar__preview"
            >
              <i className="fas fa-external-link-alt" /> View Site
            </a>
            <div className="adm-topbar__avatar">
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="adm-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
