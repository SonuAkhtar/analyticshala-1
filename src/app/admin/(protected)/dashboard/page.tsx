"use client";

import { useRouter } from "next/navigation";
import { coursesData, workshopData, courseListData } from "@/data/appData";
import { isSupabaseConfigured } from "@/lib/supabase";

const AI_IDS = ["genai-development", "agentic-ai"];

const S: Record<string, React.CSSProperties> = {
  page:        { padding: "0" },
  header:      { marginBottom: "2rem" },
  h1:          { fontSize: "1.75rem", fontWeight: 700, color: "#f1f5f9", margin: 0 },
  subtitle:    { color: "#94a3b8", marginTop: "0.35rem", fontSize: "0.95rem" },
  banner:      { display: "flex", alignItems: "flex-start", gap: "0.75rem", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "1.75rem", fontSize: "0.85rem", color: "#fbbf24", lineHeight: 1.6 },
  statsGrid:   { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1rem", marginBottom: "2rem" },
  statCard:    { background: "#1e293b", borderRadius: 12, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", border: "1px solid #334155" },
  statIcon:    { width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 },
  statValue:   { fontSize: "1.75rem", fontWeight: 700, color: "#f1f5f9", lineHeight: 1 },
  statLabel:   { fontSize: "0.78rem", color: "#94a3b8", marginTop: "0.25rem" },
  sectionTitle:{ fontSize: "1rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "1rem" },
  actionsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1rem", marginBottom: "2rem" },
  actionCard:  { background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: "1.25rem", cursor: "pointer", transition: "border-color 0.15s" },
  actionIcon:  { width: 40, height: 40, borderRadius: 8, background: "rgba(99,102,241,0.12)", color: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", marginBottom: "0.75rem" },
  actionTitle: { fontWeight: 600, color: "#f1f5f9", fontSize: "0.9rem" },
  actionSub:   { color: "#94a3b8", fontSize: "0.78rem", marginTop: "0.25rem" },
  tablesGrid:  { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "1.5rem" },
  tableWrap:   { background: "#1e293b", borderRadius: 12, border: "1px solid #334155", overflow: "hidden" },
  tableHead:   { background: "#0f172a", padding: "0.85rem 1.25rem", fontSize: "0.85rem", fontWeight: 600, color: "#f1f5f9", borderBottom: "1px solid #334155" },
  table:       { width: "100%", borderCollapse: "collapse" as const, fontSize: "0.85rem" },
  th:          { padding: "0.75rem 1rem", textAlign: "left" as const, background: "#162032", color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em", borderBottom: "1px solid #334155" },
  td:          { padding: "0.8rem 1rem", borderBottom: "1px solid #1e3050", color: "#cbd5e1", verticalAlign: "top" as const },
  tdLast:      { padding: "0.8rem 1rem", color: "#cbd5e1", verticalAlign: "top" as const },
  badge:       { display: "inline-block", padding: "0.2rem 0.55rem", borderRadius: 6, fontSize: "0.7rem", fontWeight: 600 },
  badgeGreen:  { background: "rgba(34,197,94,0.12)", color: "#4ade80" },
  badgeOrange: { background: "rgba(251,146,60,0.12)", color: "#fb923c" },
  badgeIndigo: { background: "rgba(99,102,241,0.12)", color: "#818cf8" },
  badgeGray:   { background: "rgba(148,163,184,0.1)", color: "#94a3b8" },
};

export default function AdminDashboard() {
  const router = useRouter();

  const totalCourses   = courseListData.length;
  const upcoming       = workshopData.upcoming;
  const upcomingCount  = upcoming.length;
  const totalSeats     = upcoming.reduce((s, w) => s + (w.seatsLeft ?? 0), 0);
  const aiCount        = coursesData.filter((c) => AI_IDS.includes(c.id)).length;

  const stats = [
    { label: "Total Courses",        value: totalCourses,    icon: "fas fa-graduation-cap", bg: "rgba(99,102,241,0.12)",  color: "#818cf8" },
    { label: "Upcoming Workshops",   value: upcomingCount,   icon: "fas fa-calendar-alt",   bg: "rgba(34,197,94,0.12)",   color: "#4ade80" },
    { label: "Workshop Seats Left",  value: totalSeats,      icon: "fas fa-users",          bg: "rgba(251,146,60,0.12)",  color: "#fb923c" },
    { label: "AI/ML Courses",        value: aiCount,         icon: "fas fa-brain",          bg: "rgba(168,85,247,0.12)", color: "#c084fc" },
  ];

  const quickActions = [
    { icon: "fas fa-calendar-plus",    title: "Manage Workshops",   sub: "Edit seats, add upcoming workshops",    path: "/admin/workshops" },
    { icon: "fas fa-graduation-cap",   title: "Manage Courses",     sub: "Edit course details and pricing",       path: "/admin/courses" },
    { icon: "fas fa-bullhorn",         title: "Announcements",      sub: "Update the site-wide announcement bar", path: "/admin/announcements" },
    { icon: "fas fa-external-link-alt",title: "View Site",          sub: "Preview the site as a visitor",         path: "/", external: true },
  ];

  const badgeMap: Record<string, React.CSSProperties> = {
    "badge-orange": S.badgeOrange,
    "badge-purple": S.badgeIndigo,
    "badge-blue":   S.badgeIndigo,
    "badge-green":  S.badgeGreen,
    "badge-yellow": S.badgeGray,
    "badge-red":    { background: "rgba(239,68,68,0.12)", color: "#f87171" },
  };

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <h1 style={S.h1}>Good morning, Admin 👋</h1>
        <p style={S.subtitle}>Here's what's happening with AnalyticShala</p>
      </div>

      {/* Supabase banner */}
      {!isSupabaseConfigured && (
        <div style={S.banner}>
          <i className="fas fa-exclamation-triangle" style={{ marginTop: 2 }} />
          <div>
            <strong>Supabase not connected yet.</strong>{" "}
            Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your{" "}
            <code>.env.local</code> to enable database features.
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={S.statsGrid}>
        {stats.map((s) => (
          <div key={s.label} style={S.statCard}>
            <div style={{ ...S.statIcon, background: s.bg, color: s.color }}>
              <i className={s.icon} />
            </div>
            <div>
              <div style={S.statValue}>{s.value}</div>
              <div style={S.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <p style={S.sectionTitle}>Quick Actions</p>
      <div style={S.actionsGrid}>
        {quickActions.map((a) => (
          <div
            key={a.title}
            style={S.actionCard}
            onClick={() => a.external ? window.open(a.path, "_blank") : router.push(a.path)}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6366f1")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#334155")}
          >
            <div style={S.actionIcon}><i className={a.icon} /></div>
            <div style={S.actionTitle}>{a.title}</div>
            <div style={S.actionSub}>{a.sub}</div>
          </div>
        ))}
      </div>

      {/* Tables */}
      <div style={S.tablesGrid}>
        {/* Upcoming Workshops */}
        <div style={S.tableWrap}>
          <div style={S.tableHead}>Upcoming Workshops</div>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Workshop</th>
                <th style={S.th}>Instructor</th>
                <th style={S.th}>Seats</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.slice(0, 4).map((w, i) => {
                const isLast = i === Math.min(upcoming.length, 4) - 1;
                return (
                  <tr key={w.id}>
                    <td style={isLast ? S.tdLast : S.td}>
                      <div style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "0.85rem" }}>{w.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: 2 }}>{w.date}</div>
                    </td>
                    <td style={isLast ? S.tdLast : S.td}>{w.instructor ?? "—"}</td>
                    <td style={isLast ? S.tdLast : S.td}>
                      <span style={{ ...S.badge, ...(w.seatsLeft != null && w.seatsLeft <= 5 ? S.badgeOrange : S.badgeGreen) }}>
                        {w.seatsLeft}/{w.totalSeats}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Course Overview */}
        <div style={S.tableWrap}>
          <div style={S.tableHead}>Course Overview</div>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Course</th>
                <th style={S.th}>Level</th>
                <th style={S.th}>Badge</th>
              </tr>
            </thead>
            <tbody>
              {courseListData.map((c, i) => {
                const isLast = i === courseListData.length - 1;
                return (
                  <tr key={c.id}>
                    <td style={isLast ? S.tdLast : S.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(99,102,241,0.12)", color: "#818cf8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0 }}>
                          <i className={c.icon} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "0.83rem" }}>{c.title}</div>
                          <div style={{ fontSize: "0.72rem", color: "#64748b" }}>{c.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td style={isLast ? S.tdLast : S.td}>
                      <span style={{ ...S.badge, ...S.badgeGray }}>{c.level}</span>
                    </td>
                    <td style={isLast ? S.tdLast : S.td}>
                      {c.badge
                        ? <span style={{ ...S.badge, ...(badgeMap[c.badgeColor] ?? S.badgeGray) }}>{c.badge}</span>
                        : <span style={{ color: "#475569" }}>—</span>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
