"use client";

import { useState } from "react";
import { workshopData, type Workshop } from "@/data/appData";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

/* ---------- style tokens ---------- */
const T = {
  card: "#1e293b",
  border: "#334155",
  accent: "#6366f1",
  text: "#f1f5f9",
  textM: "#94a3b8",
  textD: "#64748b",
};

const badge = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  display: "inline-block",
  padding: "0.2rem 0.55rem",
  borderRadius: 6,
  fontSize: "0.7rem",
  fontWeight: 600,
  ...extra,
});

const S: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.75rem",
    marginBottom: "1.25rem",
  },
  h1: { fontSize: "1.5rem", fontWeight: 700, color: T.text, margin: 0 },
  badgeCount: badge({
    background: "rgba(99,102,241,0.12)",
    color: "#818cf8",
    marginLeft: "0.5rem",
  }),
  btnPrimary: {
    background: T.accent,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "0.55rem 1.1rem",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  btnGhost: {
    background: "transparent",
    color: T.textM,
    border: `1px solid ${T.border}`,
    borderRadius: 8,
    padding: "0.45rem 0.9rem",
    cursor: "pointer",
    fontSize: "0.82rem",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  btnDanger: {
    background: "rgba(239,68,68,0.12)",
    color: "#f87171",
    border: "1px solid rgba(239,68,68,0.25)",
    borderRadius: 8,
    padding: "0.4rem 0.6rem",
    cursor: "pointer",
    fontSize: "0.82rem",
  },
  btnSm: { padding: "0.35rem 0.65rem", fontSize: "0.78rem" },
  seatsCtrl: { display: "flex", alignItems: "center", gap: "0.25rem" },
  seatsBtn: {
    background: "rgba(99,102,241,0.1)",
    color: "#818cf8",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
  },
  banner: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.75rem",
    background: "rgba(245,158,11,0.08)",
    border: "1px solid rgba(245,158,11,0.3)",
    borderRadius: 10,
    padding: "1rem 1.25rem",
    marginBottom: "1.25rem",
    fontSize: "0.85rem",
    color: "#fbbf24",
    lineHeight: 1.6,
  },
  searchWrap: { position: "relative" as const, marginBottom: "1.25rem" },
  searchIcon: {
    position: "absolute" as const,
    left: "0.9rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: T.textD,
    fontSize: "0.85rem",
  },
  searchInput: {
    width: "100%",
    background: T.card,
    border: `1px solid ${T.border}`,
    borderRadius: 8,
    padding: "0.6rem 1rem 0.6rem 2.4rem",
    color: T.text,
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box" as const,
  },
  tableWrap: {
    background: T.card,
    borderRadius: 12,
    border: `1px solid ${T.border}`,
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "0.85rem",
  },
  th: {
    padding: "0.75rem 1rem",
    textAlign: "left" as const,
    background: "#162032",
    color: T.textM,
    fontSize: "0.72rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    borderBottom: `1px solid ${T.border}`,
  },
  td: {
    padding: "0.9rem 1rem",
    borderBottom: `1px solid #1e3050`,
    color: "#cbd5e1",
    verticalAlign: "middle" as const,
  },
  tdLast: {
    padding: "0.9rem 1rem",
    color: "#cbd5e1",
    verticalAlign: "middle" as const,
  },
  barTrack: {
    height: 5,
    borderRadius: 99,
    background: "#0f172a",
    overflow: "hidden",
    width: 80,
    marginBottom: 4,
  },
  /* Drawer */
  backdrop: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    zIndex: 40,
  },
  drawer: {
    position: "fixed" as const,
    top: 0,
    right: 0,
    bottom: 0,
    width: "min(480px,100vw)",
    background: "#0f172a",
    borderLeft: `1px solid ${T.border}`,
    zIndex: 50,
    display: "flex",
    flexDirection: "column" as const,
  },
  drawerHead: {
    padding: "1.25rem 1.5rem",
    borderBottom: `1px solid ${T.border}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  drawerH2: { fontSize: "1.1rem", fontWeight: 700, color: T.text, margin: 0 },
  drawerSub: { fontSize: "0.8rem", color: T.textM, marginTop: 2 },
  tabs: {
    display: "flex",
    borderBottom: `1px solid ${T.border}`,
    padding: "0 1.5rem",
  },
  tab: {
    padding: "0.7rem 1rem",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: T.textM,
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
  },
  tabActive: { color: T.accent, borderBottomColor: T.accent },
  body: { flex: 1, overflowY: "auto" as const, padding: "1.5rem" },
  field: { marginBottom: "1.1rem" },
  label: {
    display: "block",
    fontSize: "0.78rem",
    fontWeight: 600,
    color: T.textM,
    marginBottom: "0.4rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
  },
  input: {
    width: "100%",
    background: "#1e293b",
    border: `1px solid ${T.border}`,
    borderRadius: 8,
    padding: "0.6rem 0.85rem",
    color: T.text,
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box" as const,
  },
  textarea: {
    width: "100%",
    background: "#1e293b",
    border: `1px solid ${T.border}`,
    borderRadius: 8,
    padding: "0.6rem 0.85rem",
    color: T.text,
    fontSize: "0.875rem",
    outline: "none",
    resize: "vertical" as const,
    boxSizing: "border-box" as const,
  },
  select: {
    width: "100%",
    background: "#1e293b",
    border: `1px solid ${T.border}`,
    borderRadius: 8,
    padding: "0.6rem 0.85rem",
    color: T.text,
    fontSize: "0.875rem",
    outline: "none",
  },
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
  },
  sectionLbl: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: T.accent,
    marginBottom: "0.85rem",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  warnBox: {
    background: "rgba(245,158,11,0.08)",
    border: "1px solid rgba(245,158,11,0.25)",
    borderRadius: 8,
    padding: "0.7rem 1rem",
    fontSize: "0.8rem",
    color: "#d97706",
    marginBottom: "1rem",
    lineHeight: 1.5,
  },
  footer: {
    padding: "1rem 1.5rem",
    borderTop: `1px solid ${T.border}`,
    display: "flex",
    gap: "0.75rem",
  },
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    zIndex: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmBox: {
    background: "#1e293b",
    borderRadius: 16,
    padding: "2rem",
    maxWidth: 380,
    width: "90%",
    textAlign: "center" as const,
    border: `1px solid ${T.border}`,
  },
  confirmIcon: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "rgba(239,68,68,0.12)",
    color: "#f87171",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.25rem",
    margin: "0 auto 1rem",
  },
  toastBase: {
    position: "fixed" as const,
    bottom: "1.5rem",
    right: "1.5rem",
    padding: "0.75rem 1.25rem",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    zIndex: 70,
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
  },
  toastOk: {
    background: "rgba(34,197,94,0.15)",
    color: "#4ade80",
    border: "1px solid rgba(34,197,94,0.3)",
  },
  toastErr: {
    background: "rgba(239,68,68,0.15)",
    color: "#f87171",
    border: "1px solid rgba(239,68,68,0.3)",
  },
};

const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced"];

function initWorkshops(): Workshop[] {
  return workshopData.upcoming.map((w) => ({ ...w }));
}

/* ---------- Toggle ---------- */
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      style={{
        position: "relative",
        display: "inline-block",
        width: 38,
        height: 22,
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        style={{ opacity: 0, width: 0, height: 0, position: "absolute" }}
        checked={checked}
        onChange={onChange}
      />
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          background: checked ? T.accent : "#334155",
          transition: "background 0.2s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: checked ? 19 : 3,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
          }}
        />
      </span>
    </label>
  );
}

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>(initWorkshops);
  const [editing, setEditing] = useState<Workshop | null>(null);
  const [drawerTab, setDrawerTab] = useState<"basic" | "seats" | "content">(
    "basic",
  );
  const [showConfirm, setShowConfirm] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2600);
  }

  function handleEdit(w: Workshop) {
    setEditing({ ...w });
    setDrawerTab("basic");
  }
  function handleClose() {
    setEditing(null);
  }

  function upd(field: string, value: unknown) {
    setEditing((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  function toggleMode(mode: string) {
    if (!editing) return;
    const cur = editing.eventMode ?? [];
    upd(
      "eventMode",
      cur.includes(mode) ? cur.filter((m) => m !== mode) : [...cur, mode],
    );
  }

  async function handleSave() {
    if (!editing) return;
    if (!isSupabaseConfigured || !supabase) {
      showToast("Connect Supabase to save changes", "error");
      return;
    }
    const { error } = await supabase.from("workshops").upsert({
      id: editing.id,
      slug: editing.slug,
      title: editing.title,
      desc: editing.desc,
      date: editing.date,
      time: editing.time,
      duration: editing.duration,
      instructor: editing.instructor,
      category: editing.category,
      category_color: editing.categoryColor,
      image: editing.image,
      level: editing.level,
      event_mode: editing.eventMode,
      price: editing.price,
      original_price: editing.originalPrice,
      total_seats: editing.totalSeats,
      seats_left: editing.seatsLeft,
      tags: editing.tags,
      outcomes: editing.outcomes,
      who_is_it_for: editing.whoIsItFor,
    });
    if (error) {
      showToast(error.message, "error");
      return;
    }
    setWorkshops((prev) =>
      prev.map((w) => (w.id === editing.id ? { ...editing } : w)),
    );
    showToast("Workshop saved successfully!");
    handleClose();
  }

  async function adjustSeats(id: number, delta: number) {
    const w = workshops.find((x) => x.id === id);
    if (!w) return;
    const newSeats = Math.max(
      0,
      Math.min(w.totalSeats ?? 0, (w.seatsLeft ?? 0) + delta),
    );
    setWorkshops((prev) =>
      prev.map((x) => (x.id === id ? { ...x, seatsLeft: newSeats } : x)),
    );
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from("workshops")
        .update({ seats_left: newSeats })
        .eq("id", id);
      if (error) showToast(error.message, "error");
    } else {
      showToast(
        "Seat count updated locally - connect Supabase to persist",
        "error",
      );
    }
  }

  function handleDelete(id: number) {
    setWorkshops((prev) => prev.filter((w) => w.id !== id));
    setShowConfirm(null);
    showToast("Workshop removed (local only - connect Supabase to persist)");
  }

  const filtered = workshops.filter((w) => {
    const q = search.toLowerCase();
    return (
      w.title?.toLowerCase().includes(q) ||
      w.instructor?.toLowerCase().includes(q) ||
      w.category?.toLowerCase().includes(q)
    );
  });

  const toDelete = workshops.find((w) => w.id === showConfirm);

  return (
    <div>
      {/* Header */}
      <div style={S.header}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={S.h1}>Workshops</h1>
          <span style={S.badgeCount}>{workshops.length} upcoming</span>
        </div>
        <button
          style={{ ...S.btnPrimary, opacity: isSupabaseConfigured ? 1 : 0.5 }}
          disabled={!isSupabaseConfigured}
          onClick={() => showToast("Add workshops via Supabase dashboard")}
        >
          <i className="fas fa-plus" /> Add Workshop
        </button>
      </div>

      {!isSupabaseConfigured && (
        <div style={S.banner}>
          <i className="fas fa-exclamation-triangle" style={{ marginTop: 2 }} />
          <div>
            <strong>Supabase not connected.</strong> Viewing local data only.
            Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable saving.
          </div>
        </div>
      )}

      {/* Search */}
      <div style={S.searchWrap}>
        <i className="fas fa-search" style={S.searchIcon} />
        <input
          style={S.searchInput}
          placeholder="Search workshops by title, instructor, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div style={S.tableWrap}>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Workshop</th>
              <th style={S.th}>Instructor</th>
              <th style={S.th}>Seats</th>
              <th style={S.th}>Category</th>
              <th style={S.th}>Status</th>
              <th style={S.th}>Visible</th>
              <th style={S.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    ...S.td,
                    textAlign: "center",
                    padding: "2.5rem",
                    color: T.textM,
                  }}
                >
                  No workshops match your search.
                </td>
              </tr>
            ) : (
              filtered.map((w, i) => {
                const isLast = i === filtered.length - 1;
                const tdSt = isLast ? S.tdLast : S.td;
                const pct = w.totalSeats
                  ? ((w.seatsLeft ?? 0) / w.totalSeats) * 100
                  : 0;
                const barColor =
                  w.seatsLeft === 0
                    ? "#ef4444"
                    : pct < 30
                      ? "#f59e0b"
                      : "#22c55e";
                const statusStyle: React.CSSProperties =
                  w.seatsLeft === 0
                    ? badge({
                        background: "rgba(239,68,68,0.12)",
                        color: "#f87171",
                      })
                    : (w.seatsLeft ?? 0) <= 5
                      ? badge({
                          background: "rgba(251,146,60,0.12)",
                          color: "#fb923c",
                        })
                      : badge({
                          background: "rgba(34,197,94,0.12)",
                          color: "#4ade80",
                        });

                return (
                  <tr key={w.id}>
                    <td style={tdSt}>
                      <div
                        style={{
                          fontWeight: 600,
                          color: T.text,
                          fontSize: "0.875rem",
                        }}
                      >
                        {w.title}
                      </div>
                      <div
                        style={{
                          fontSize: "0.73rem",
                          color: T.textD,
                          marginTop: 2,
                        }}
                      >
                        {w.date}
                      </div>
                    </td>
                    <td style={tdSt}>{w.instructor ?? "-"}</td>
                    <td style={tdSt}>
                      <div style={S.barTrack}>
                        <div
                          style={{
                            height: "100%",
                            borderRadius: 99,
                            background: barColor,
                            width: `${pct}%`,
                            transition: "width 0.3s",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "0.78rem", color: T.textM }}>
                        {w.seatsLeft}/{w.totalSeats} seats
                      </span>
                    </td>
                    <td style={tdSt}>
                      <span
                        style={badge({
                          background: "rgba(148,163,184,0.1)",
                          color: "#94a3b8",
                        })}
                      >
                        {w.category}
                      </span>
                    </td>
                    <td style={tdSt}>
                      <span style={statusStyle}>
                        {w.seatsLeft === 0
                          ? "Full"
                          : (w.seatsLeft ?? 0) <= 5
                            ? "Almost Full"
                            : "Live"}
                      </span>
                    </td>
                    <td style={tdSt}>
                      <Toggle
                        checked={true}
                        onChange={() => {
                          if (!isSupabaseConfigured)
                            showToast(
                              "Connect Supabase to edit visibility",
                              "error",
                            );
                        }}
                      />
                    </td>
                    <td style={tdSt}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          style={{ ...S.btnGhost, ...S.btnSm }}
                          onClick={() => handleEdit(w)}
                        >
                          <i className="fas fa-pen" /> Edit
                        </button>
                        <div style={S.seatsCtrl}>
                          <button
                            style={S.seatsBtn}
                            disabled={(w.seatsLeft ?? 0) <= 0}
                            onClick={() => adjustSeats(w.id, -1)}
                            title="Decrease seats"
                          >
                            <i className="fas fa-minus" />
                          </button>
                          <button
                            style={S.seatsBtn}
                            disabled={(w.seatsLeft ?? 0) >= (w.totalSeats ?? 0)}
                            onClick={() => adjustSeats(w.id, 1)}
                            title="Increase seats"
                          >
                            <i className="fas fa-plus" />
                          </button>
                        </div>
                        <button
                          style={{ ...S.btnDanger, ...S.btnSm }}
                          onClick={() => setShowConfirm(w.id)}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Previous Workshops section */}
      <div style={{ marginTop: "2rem" }}>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: T.text,
            marginBottom: "1rem",
          }}
        >
          Previous Workshops{" "}
          <span style={S.badgeCount}>{workshopData.previous.length}</span>
        </p>
        <div style={S.tableWrap}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Title</th>
                <th style={S.th}>Date</th>
                <th style={S.th}>Attendees</th>
                <th style={S.th}>Rating</th>
                <th style={S.th}>Category</th>
              </tr>
            </thead>
            <tbody>
              {workshopData.previous.map((w, i) => {
                const isLast = i === workshopData.previous.length - 1;
                const tdSt = isLast ? S.tdLast : S.td;
                return (
                  <tr key={w.id}>
                    <td style={{ ...tdSt, fontWeight: 600, color: T.text }}>
                      {w.title}
                    </td>
                    <td style={tdSt}>{w.date}</td>
                    <td style={tdSt}>{w.attendees ?? "-"}</td>
                    <td style={tdSt}>{w.rating ? `⭐ ${w.rating}` : "-"}</td>
                    <td style={tdSt}>
                      <span
                        style={badge({
                          background: "rgba(148,163,184,0.1)",
                          color: "#94a3b8",
                        })}
                      >
                        {w.category}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      {editing && (
        <>
          <div style={S.backdrop} onClick={handleClose} />
          <div style={S.drawer}>
            <div style={S.drawerHead}>
              <div>
                <h2 style={S.drawerH2}>Edit Workshop</h2>
                <p style={S.drawerSub}>{editing.title}</p>
              </div>
              <button
                style={{ ...S.btnGhost, padding: "0.35rem 0.65rem" }}
                onClick={handleClose}
              >
                <i className="fas fa-times" />
              </button>
            </div>

            <div style={S.tabs}>
              {(["basic", "seats", "content"] as const).map((tab) => (
                <button
                  key={tab}
                  style={{
                    ...S.tab,
                    ...(drawerTab === tab ? S.tabActive : {}),
                  }}
                  onClick={() => setDrawerTab(tab)}
                >
                  {tab === "basic"
                    ? "Basic Info"
                    : tab === "seats"
                      ? "Seats & Pricing"
                      : "Content"}
                </button>
              ))}
            </div>

            <div style={S.body}>
              {!isSupabaseConfigured && (
                <div style={S.warnBox}>
                  Connect Supabase to save changes. Edits are preview-only.
                </div>
              )}

              {drawerTab === "basic" && (
                <div>
                  <p style={S.sectionLbl}>
                    <i className="fas fa-info-circle" /> Basic Information
                  </p>
                  <div style={S.field}>
                    <label style={S.label}>Title</label>
                    <input
                      style={S.input}
                      value={editing.title ?? ""}
                      onChange={(e) => upd("title", e.target.value)}
                    />
                  </div>
                  <div style={S.field}>
                    <label style={S.label}>Description</label>
                    <textarea
                      style={S.textarea}
                      rows={3}
                      value={editing.desc ?? ""}
                      onChange={(e) => upd("desc", e.target.value)}
                    />
                  </div>
                  <div style={{ ...S.field, ...S.fieldGrid }}>
                    <div>
                      <label style={S.label}>Date</label>
                      <input
                        style={S.input}
                        value={editing.date ?? ""}
                        placeholder="March 29, Saturday"
                        onChange={(e) => upd("date", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={S.label}>Time</label>
                      <input
                        style={S.input}
                        value={editing.time ?? ""}
                        placeholder="10:00 AM – 1:00 PM"
                        onChange={(e) => upd("time", e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={{ ...S.field, ...S.fieldGrid }}>
                    <div>
                      <label style={S.label}>Duration</label>
                      <input
                        style={S.input}
                        value={editing.duration ?? ""}
                        placeholder="3 Hours"
                        onChange={(e) => upd("duration", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={S.label}>Instructor</label>
                      <input
                        style={S.input}
                        value={editing.instructor ?? ""}
                        onChange={(e) => upd("instructor", e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={{ ...S.field, ...S.fieldGrid }}>
                    <div>
                      <label style={S.label}>Category</label>
                      <input
                        style={S.input}
                        value={editing.category ?? ""}
                        onChange={(e) => upd("category", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={S.label}>Category Color (hex)</label>
                      <input
                        style={S.input}
                        value={editing.categoryColor ?? ""}
                        placeholder="#16a34a"
                        onChange={(e) => upd("categoryColor", e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={S.field}>
                    <label style={S.label}>Image URL</label>
                    <input
                      style={S.input}
                      value={editing.image ?? ""}
                      onChange={(e) => upd("image", e.target.value)}
                    />
                  </div>
                  <div style={S.field}>
                    <label style={S.label}>Level</label>
                    <select
                      style={S.select}
                      value={editing.level ?? ""}
                      onChange={(e) => upd("level", e.target.value)}
                    >
                      {LEVEL_OPTIONS.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={S.field}>
                    <label style={S.label}>Event Mode</label>
                    <div
                      style={{
                        display: "flex",
                        gap: "1.25rem",
                        marginTop: "0.35rem",
                      }}
                    >
                      {["Online", "Offline"].map((mode) => (
                        <label
                          key={mode}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            color: T.textM,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={(editing.eventMode ?? []).includes(mode)}
                            onChange={() => toggleMode(mode)}
                            style={{ width: "auto", accentColor: T.accent }}
                          />
                          {mode}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === "seats" && (
                <div>
                  <p style={S.sectionLbl}>
                    <i className="fas fa-users" /> Seats & Pricing
                  </p>
                  <div style={{ ...S.field, ...S.fieldGrid }}>
                    <div>
                      <label style={S.label}>Price</label>
                      <input
                        style={S.input}
                        value={editing.price ?? ""}
                        placeholder="₹999"
                        onChange={(e) => upd("price", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={S.label}>Original Price</label>
                      <input
                        style={S.input}
                        value={editing.originalPrice ?? ""}
                        placeholder="₹1,999"
                        onChange={(e) => upd("originalPrice", e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={{ ...S.field, ...S.fieldGrid }}>
                    <div>
                      <label style={S.label}>Total Seats</label>
                      <input
                        style={S.input}
                        type="number"
                        value={editing.totalSeats ?? ""}
                        onChange={(e) =>
                          upd("totalSeats", Number(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <label style={S.label}>Seats Left</label>
                      <input
                        style={S.input}
                        type="number"
                        value={editing.seatsLeft ?? ""}
                        min={0}
                        max={editing.totalSeats}
                        onChange={(e) =>
                          upd("seatsLeft", Number(e.target.value))
                        }
                      />
                    </div>
                  </div>
                  <div style={S.field}>
                    <label style={S.label}>Tags (comma-separated)</label>
                    <input
                      style={S.input}
                      value={
                        Array.isArray(editing.tags)
                          ? editing.tags.join(", ")
                          : (editing.tags ?? "")
                      }
                      placeholder="Excel, Pivot Tables, Dashboards"
                      onChange={(e) =>
                        upd(
                          "tags",
                          e.target.value.split(",").map((t) => t.trim()),
                        )
                      }
                    />
                  </div>
                </div>
              )}

              {drawerTab === "content" && (
                <div>
                  <p style={S.sectionLbl}>
                    <i className="fas fa-list" /> Content & Audience
                  </p>
                  <div style={S.field}>
                    <label style={S.label}>Outcomes (one per line)</label>
                    <textarea
                      style={S.textarea}
                      rows={5}
                      value={
                        Array.isArray(editing.outcomes)
                          ? editing.outcomes.join("\n")
                          : (editing.outcomes ?? "")
                      }
                      onChange={(e) =>
                        upd("outcomes", e.target.value.split("\n"))
                      }
                    />
                  </div>
                  <div style={S.field}>
                    <label style={S.label}>Who Is It For (one per line)</label>
                    <textarea
                      style={S.textarea}
                      rows={5}
                      value={
                        Array.isArray(editing.whoIsItFor)
                          ? editing.whoIsItFor.join("\n")
                          : (editing.whoIsItFor ?? "")
                      }
                      onChange={(e) =>
                        upd("whoIsItFor", e.target.value.split("\n"))
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div style={S.footer}>
              <button
                style={{
                  ...S.btnPrimary,
                  opacity: isSupabaseConfigured ? 1 : 0.5,
                }}
                disabled={!isSupabaseConfigured}
                onClick={handleSave}
              >
                <i className="fas fa-save" /> Save Changes
              </button>
              <button style={S.btnGhost} onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirm */}
      {showConfirm !== null && (
        <div style={S.overlay}>
          <div style={S.confirmBox}>
            <div style={S.confirmIcon}>
              <i className="fas fa-trash" />
            </div>
            <h3 style={{ color: T.text, marginBottom: "0.5rem" }}>
              Delete Workshop?
            </h3>
            <p
              style={{
                color: T.textM,
                fontSize: "0.875rem",
                marginBottom: "1.5rem",
              }}
            >
              Are you sure you want to remove{" "}
              <strong style={{ color: T.text }}>{toDelete?.title}</strong>? This
              cannot be undone.
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              <button
                style={S.btnDanger}
                onClick={() => handleDelete(showConfirm!)}
              >
                Yes, Delete
              </button>
              <button style={S.btnGhost} onClick={() => setShowConfirm(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          style={{
            ...S.toastBase,
            ...(toast.type === "success" ? S.toastOk : S.toastErr),
          }}
        >
          <i
            className={`fas fa-${toast.type === "success" ? "check-circle" : "exclamation-circle"}`}
          />
          {toast.msg}
        </div>
      )}
    </div>
  );
}
