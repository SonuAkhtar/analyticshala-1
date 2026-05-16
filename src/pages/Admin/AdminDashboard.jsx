import { useNavigate } from "react-router-dom";
import { courseListData, workshopData } from "../../../appData";
import { isSupabaseConfigured } from "../../lib/supabase";
import "./adminShared.css";
import "./adminDashboard.css";

const AI_IDS = ["ai", "agentic", "rag"];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const totalCourses = courseListData.length;
  const upcomingWorkshops = workshopData.upcoming;
  const upcomingCount = upcomingWorkshops.length;
  const totalSeats = upcomingWorkshops.reduce((sum, w) => sum + (w.seatsLeft || 0), 0);
  const aiCount = courseListData.filter((c) => AI_IDS.includes(c.id)).length;

  const stats = [
    {
      label: "Total Courses",
      value: totalCourses,
      icon: "fas fa-graduation-cap",
      color: "indigo",
    },
    {
      label: "Upcoming Workshops",
      value: upcomingCount,
      icon: "fas fa-calendar-alt",
      color: "green",
    },
    {
      label: "Total Workshop Seats",
      value: totalSeats,
      icon: "fas fa-users",
      color: "orange",
    },
    {
      label: "Courses in AI/ML",
      value: aiCount,
      icon: "fas fa-brain",
      color: "teal",
    },
  ];

  const quickActions = [
    {
      icon: "fas fa-calendar-plus",
      title: "Add Workshop",
      subtitle: "Create a new upcoming workshop event",
      path: "/admin/workshops",
    },
    {
      icon: "fas fa-bullhorn",
      title: "Edit Announcement",
      subtitle: "Update the site-wide announcement bar",
      path: "/admin/announcements",
    },
    {
      icon: "fas fa-external-link-alt",
      title: "View Site",
      subtitle: "Preview how the site looks to visitors",
      path: "/",
      external: true,
    },
  ];

  const badgeColorMap = {
    "badge-orange": "adm-badge--orange",
    "badge-purple": "adm-badge--indigo",
    "badge-green": "adm-badge--green",
    "badge-blue": "adm-badge--indigo",
    "badge-red": "adm-badge--red",
  };

  return (
    <div className="adm-dash">
      {/* Header */}
      <div className="adm-dash__header">
        <h1>Good morning, Admin 👋</h1>
        <p>Here's what's happening with AnalyticShala</p>
      </div>

      {/* Setup Banner */}
      {!isSupabaseConfigured && (
        <div className="adm-setup-banner">
          <i className="fas fa-exclamation-triangle" />
          <div>
            <strong>Supabase not connected yet</strong>
            <p>
              Add <code>VITE_SUPABASE_URL</code> and{" "}
              <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file
              to enable database features. All editing is read-only until then.
            </p>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="adm-dash__stats">
        {stats.map((s) => (
          <div key={s.label} className={`adm-stat-card adm-stat-card--${s.color}`}>
            <div className="adm-stat-card__icon">
              <i className={s.icon} />
            </div>
            <div>
              <div className="adm-stat-card__value">{s.value}</div>
              <div className="adm-stat-card__label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="adm-dash__section">
        <h2>Quick Actions</h2>
        <div className="adm-dash__actions">
          {quickActions.map((a) => (
            <div
              key={a.title}
              className="adm-action-card"
              onClick={() => {
                if (a.external) {
                  window.open(a.path, "_blank");
                } else {
                  navigate(a.path);
                }
              }}
            >
              <div className="adm-action-card__icon">
                <i className={a.icon} />
              </div>
              <div className="adm-action-card__title">{a.title}</div>
              <div className="adm-action-card__sub">{a.subtitle}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tables */}
      <div className="adm-dash__tables">
        {/* Upcoming Workshops */}
        <div className="adm-dash__section">
          <h2>Upcoming Workshops</h2>
          <div style={{ overflow: "hidden", borderRadius: "var(--adm-radius)", border: "1px solid var(--adm-border)" }}>
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Workshop</th>
                  <th>Instructor</th>
                  <th>Seats</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {upcomingWorkshops.slice(0, 3).map((w) => (
                  <tr key={w.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--adm-text)", fontSize: "0.875rem" }}>{w.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--adm-text-m)" }}>{w.date}</div>
                    </td>
                    <td>{w.instructor}</td>
                    <td>
                      <span
                        className={`adm-badge ${w.seatsLeft <= 5 ? "adm-badge--orange" : "adm-badge--green"}`}
                      >
                        {w.seatsLeft}/{w.totalSeats}
                      </span>
                    </td>
                    <td>
                      <span
                        className="adm-badge adm-badge--gray"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {w.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Course Overview */}
        <div className="adm-dash__section">
          <h2>Course Overview</h2>
          <div style={{ overflow: "hidden", borderRadius: "var(--adm-radius)", border: "1px solid var(--adm-border)" }}>
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Level</th>
                  <th>Badge</th>
                </tr>
              </thead>
              <tbody>
                {courseListData.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: "var(--adm-acc-soft)",
                            color: "var(--adm-acc)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.85rem",
                            flexShrink: 0,
                          }}
                        >
                          <i className={c.icon} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: "var(--adm-text)", fontSize: "0.875rem" }}>{c.title}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--adm-text-m)" }}>{c.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="adm-badge adm-badge--gray" style={{ fontSize: "0.68rem" }}>
                        {c.level}
                      </span>
                    </td>
                    <td>
                      {c.badge ? (
                        <span className={`adm-badge ${badgeColorMap[c.badgeColor] || "adm-badge--gray"}`} style={{ fontSize: "0.68rem" }}>
                          {c.badge}
                        </span>
                      ) : (
                        <span style={{ color: "var(--adm-text-m)", fontSize: "0.78rem" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
