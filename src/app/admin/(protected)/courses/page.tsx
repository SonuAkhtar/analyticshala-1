"use client";

import { useState } from "react";
import { courseListData, courseRegData, type Course } from "@/data/appData";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

/* ---------- shared style tokens ---------- */
const T = {
  bg:      "#0f172a",
  card:    "#1e293b",
  border:  "#334155",
  accent:  "#6366f1",
  text:    "#f1f5f9",
  textM:   "#94a3b8",
  textD:   "#64748b",
  danger:  "#ef4444",
  warn:    "#f59e0b",
};

/* ---------- reusable inline styles ---------- */
const S: Record<string, React.CSSProperties> = {
  page:       { },
  header:     { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem" },
  h1:         { fontSize: "1.5rem", fontWeight: 700, color: T.text, margin: 0 },
  badge:      { display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: 6, fontSize: "0.72rem", fontWeight: 600, background: "rgba(99,102,241,0.12)", color: "#818cf8", marginLeft: "0.5rem" },
  btnPrimary: { background: T.accent, color: "#fff", border: "none", borderRadius: 8, padding: "0.55rem 1.1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" },
  btnGhost:   { background: "transparent", color: T.textM, border: `1px solid ${T.border}`, borderRadius: 8, padding: "0.45rem 0.9rem", cursor: "pointer", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.4rem" },
  btnDanger:  { background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "0.45rem 0.65rem", cursor: "pointer", fontSize: "0.82rem" },
  btnSm:      { padding: "0.35rem 0.7rem", fontSize: "0.78rem" },
  banner:     { display: "flex", alignItems: "flex-start", gap: "0.75rem", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "1.25rem", fontSize: "0.85rem", color: "#fbbf24", lineHeight: 1.6 },
  searchWrap: { position: "relative" as const, marginBottom: "1.25rem" },
  searchIcon: { position: "absolute" as const, left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: T.textD, fontSize: "0.85rem" },
  searchInput:{ width: "100%", background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: "0.6rem 1rem 0.6rem 2.4rem", color: T.text, fontSize: "0.875rem", outline: "none", boxSizing: "border-box" as const },
  tableWrap:  { background: T.card, borderRadius: 12, border: `1px solid ${T.border}`, overflow: "hidden" },
  table:      { width: "100%", borderCollapse: "collapse" as const, fontSize: "0.85rem" },
  th:         { padding: "0.75rem 1rem", textAlign: "left" as const, background: "#162032", color: T.textM, fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em", borderBottom: `1px solid ${T.border}` },
  td:         { padding: "0.9rem 1rem", borderBottom: `1px solid #1e3050`, color: "#cbd5e1", verticalAlign: "middle" as const },
  tdLast:     { padding: "0.9rem 1rem", color: "#cbd5e1", verticalAlign: "middle" as const },
  cellName:   { fontWeight: 600, color: T.text, fontSize: "0.875rem" },
  cellSub:    { fontSize: "0.72rem", color: T.textD, marginTop: 2 },
  iconBox:    { width: 32, height: 32, borderRadius: 8, background: "rgba(99,102,241,0.12)", color: "#818cf8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", flexShrink: 0 },
  toggle:     { position: "relative" as const, display: "inline-block", width: 38, height: 22, cursor: "pointer" },
  toggleInput:{ opacity: 0, width: 0, height: 0, position: "absolute" as const },
  /* Drawer */
  backdrop:   { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 40 },
  drawer:     { position: "fixed" as const, top: 0, right: 0, bottom: 0, width: "min(480px,100vw)", background: "#0f172a", borderLeft: `1px solid ${T.border}`, zIndex: 50, display: "flex", flexDirection: "column" as const, overflowY: "hidden" as const },
  drawerHead: { padding: "1.25rem 1.5rem", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" },
  drawerH2:   { fontSize: "1.1rem", fontWeight: 700, color: T.text, margin: 0 },
  drawerSub:  { fontSize: "0.8rem", color: T.textM, marginTop: 2 },
  tabs:       { display: "flex", borderBottom: `1px solid ${T.border}`, padding: "0 1.5rem" },
  tab:        { padding: "0.7rem 1rem", fontSize: "0.85rem", fontWeight: 500, color: T.textM, background: "none", border: "none", borderBottom: "2px solid transparent", cursor: "pointer", transition: "color 0.15s" },
  tabActive:  { color: T.accent, borderBottomColor: T.accent },
  body:       { flex: 1, overflowY: "auto" as const, padding: "1.5rem" },
  field:      { marginBottom: "1.1rem" },
  label:      { display: "block", fontSize: "0.78rem", fontWeight: 600, color: T.textM, marginBottom: "0.4rem", textTransform: "uppercase" as const, letterSpacing: "0.04em" },
  input:      { width: "100%", background: "#1e293b", border: `1px solid ${T.border}`, borderRadius: 8, padding: "0.6rem 0.85rem", color: T.text, fontSize: "0.875rem", outline: "none", boxSizing: "border-box" as const },
  textarea:   { width: "100%", background: "#1e293b", border: `1px solid ${T.border}`, borderRadius: 8, padding: "0.6rem 0.85rem", color: T.text, fontSize: "0.875rem", outline: "none", resize: "vertical" as const, boxSizing: "border-box" as const },
  select:     { width: "100%", background: "#1e293b", border: `1px solid ${T.border}`, borderRadius: 8, padding: "0.6rem 0.85rem", color: T.text, fontSize: "0.875rem", outline: "none" },
  fieldGrid:  { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" },
  sectionLbl: { fontSize: "0.8rem", fontWeight: 600, color: T.accent, marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" },
  warnBox:    { background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 8, padding: "0.7rem 1rem", fontSize: "0.8rem", color: "#d97706", marginBottom: "1rem", lineHeight: 1.5 },
  footer:     { padding: "1rem 1.5rem", borderTop: `1px solid ${T.border}`, display: "flex", gap: "0.75rem" },
  /* Confirm */
  overlay:    { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center" },
  confirmBox: { background: "#1e293b", borderRadius: 16, padding: "2rem", maxWidth: 380, width: "90%", textAlign: "center" as const, border: `1px solid ${T.border}` },
  confirmIcon:{ width: 52, height: 52, borderRadius: "50%", background: "rgba(239,68,68,0.12)", color: "#f87171", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", margin: "0 auto 1rem" },
  /* Toast */
  toastBase:  { position: "fixed" as const, bottom: "1.5rem", right: "1.5rem", padding: "0.75rem 1.25rem", borderRadius: 10, fontWeight: 600, fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", zIndex: 70, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" },
  toastOk:    { background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" },
  toastErr:   { background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" },
};

/* ---------- badge colors ---------- */
const BADGE_CSS: Record<string, React.CSSProperties> = {
  "badge-orange": { background: "rgba(251,146,60,0.12)", color: "#fb923c" },
  "badge-purple": { background: "rgba(99,102,241,0.12)", color: "#818cf8" },
  "badge-blue":   { background: "rgba(59,130,246,0.12)", color: "#60a5fa" },
  "badge-green":  { background: "rgba(34,197,94,0.12)", color: "#4ade80" },
  "badge-yellow": { background: "rgba(234,179,8,0.12)",  color: "#facc15" },
  "badge-red":    { background: "rgba(239,68,68,0.12)",  color: "#f87171" },
};
const GRAY_BADGE: React.CSSProperties = { background: "rgba(148,163,184,0.1)", color: "#94a3b8" };

const LEVEL_OPTIONS = ["Beginner", "Beginner → Intermediate", "Intermediate", "Intermediate → Advanced", "Advanced"];
const BADGE_COLOR_OPTIONS = [
  { value: "badge-orange", label: "Orange" },
  { value: "badge-purple", label: "Purple" },
  { value: "badge-blue",   label: "Blue" },
  { value: "badge-green",  label: "Green" },
  { value: "badge-yellow", label: "Yellow" },
  { value: "badge-red",    label: "Red" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RegMap = Record<string, any>;

function initCourses() {
  return courseListData.map((c) => ({ ...c, visible: true }));
}

/* ---------- Toggle switch ---------- */
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <label style={S.toggle}>
      <input type="checkbox" style={S.toggleInput} checked={checked} onChange={onChange} />
      <span style={{
        position: "absolute", inset: 0, borderRadius: 999,
        background: checked ? T.accent : "#334155",
        transition: "background 0.2s",
      }}>
        <span style={{
          position: "absolute", top: 3, left: checked ? 19 : 3,
          width: 16, height: 16, borderRadius: "50%", background: "#fff",
          transition: "left 0.2s",
        }} />
      </span>
    </label>
  );
}

export default function AdminCourses() {
  const [courses, setCourses]     = useState(initCourses);
  const [regData, setRegData]     = useState<RegMap>({ ...courseRegData });
  const [editing, setEditing]     = useState<(typeof courses[0]) | null>(null);
  const [editReg, setEditReg]     = useState<RegMap[string]>({});
  const [drawerTab, setDrawerTab] = useState<"basic" | "pricing" | "content">("basic");
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [search, setSearch]       = useState("");
  const [toast, setToast]         = useState<{ msg: string; type: "success" | "error" } | null>(null);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2600);
  }

  function handleEdit(c: typeof courses[0]) {
    setEditing({ ...c });
    setEditReg(regData[c.id] ? { ...regData[c.id] } : {});
    setDrawerTab("basic");
  }

  function handleClose() { setEditing(null); setEditReg({}); }

  function upd(field: string, value: unknown) {
    setEditing((prev) => prev ? { ...prev, [field]: value } : prev);
  }
  function updReg(field: string, value: unknown) {
    setEditReg((prev: RegMap[string]) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    if (!editing) return;
    if (!isSupabaseConfigured || !supabase) {
      showToast("Connect Supabase to save changes", "error"); return;
    }
    const { error } = await supabase.from("courses").upsert({
      id: editing.id, slug: editing.slug, title: editing.title,
      subtitle: editing.subtitle, description: editing.description,
      icon: editing.icon, level: editing.level, duration: editing.duration,
      modules: editing.modules, badge: editing.badge, badge_color: editing.badgeColor,
      visible: editing.visible, reg_fee: editReg?.regFee, price: editReg?.price,
      original_price: editReg?.originalPrice, next_batch: editReg?.nextBatch,
      batch_type: editReg?.batchType, instructor: editReg?.instructor,
      skills: editing.skills, outcomes: editing.outcomes, who_is_it_for: editReg?.whoIsItFor,
    });
    if (error) { showToast(error.message, "error"); return; }
    setCourses((prev) => prev.map((c) => c.id === editing.id ? { ...editing } : c));
    setRegData((prev) => ({ ...prev, [editing.id]: { ...editReg } }));
    showToast("Course saved successfully!");
    handleClose();
  }

  function handleToggle(courseId: string) {
    setCourses((prev) => prev.map((c) => c.id === courseId ? { ...c, visible: !c.visible } : c));
    if (!isSupabaseConfigured) showToast("Connect Supabase to persist visibility", "error");
  }

  function handleDelete(courseId: string) {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    setShowConfirm(null);
    showToast("Course removed (local only — connect Supabase to persist)");
  }

  const filtered = courses.filter((c) => {
    const q = search.toLowerCase();
    return c.title?.toLowerCase().includes(q) || c.subtitle?.toLowerCase().includes(q);
  });

  const toDelete = courses.find((c) => c.id === showConfirm);

  return (
    <div>
      {/* Header */}
      <div style={S.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <h1 style={S.h1}>Courses</h1>
          <span style={S.badge}>{courses.length} total</span>
        </div>
        <button
          style={{ ...S.btnPrimary, opacity: isSupabaseConfigured ? 1 : 0.5 }}
          disabled={!isSupabaseConfigured}
          onClick={() => showToast("Add courses via Supabase dashboard")}
        >
          <i className="fas fa-plus" /> Add Course
        </button>
      </div>

      {!isSupabaseConfigured && (
        <div style={S.banner}>
          <i className="fas fa-exclamation-triangle" style={{ marginTop: 2 }} />
          <div>
            <strong>Supabase not connected.</strong> Viewing local data only.
            Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable saving.
          </div>
        </div>
      )}

      {/* Search */}
      <div style={S.searchWrap}>
        <i className="fas fa-search" style={S.searchIcon} />
        <input
          style={S.searchInput}
          placeholder="Search courses by title or subtitle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div style={S.tableWrap}>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Course</th>
              <th style={S.th}>Level</th>
              <th style={S.th}>Price</th>
              <th style={S.th}>Reg Fee</th>
              <th style={S.th}>Badge</th>
              <th style={S.th}>Visible</th>
              <th style={S.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ ...S.td, textAlign: "center", padding: "2.5rem", color: T.textM }}>
                  No courses match your search.
                </td>
              </tr>
            ) : filtered.map((c, i) => {
              const isLast = i === filtered.length - 1;
              const tdStyle = isLast ? S.tdLast : S.td;
              return (
                <tr key={c.id}>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                      <div style={S.iconBox}><i className={c.icon} /></div>
                      <div>
                        <div style={S.cellName}>{c.title}</div>
                        <div style={S.cellSub}>{c.subtitle}</div>
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ ...S.badge, ...GRAY_BADGE, marginLeft: 0 }}>{c.level}</span>
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{regData[c.id]?.price ?? "—"}</td>
                  <td style={tdStyle}>{regData[c.id]?.regFee ?? "—"}</td>
                  <td style={tdStyle}>
                    {c.badge
                      ? <span style={{ display: "inline-block", padding: "0.2rem 0.55rem", borderRadius: 6, fontSize: "0.7rem", fontWeight: 600, ...(BADGE_CSS[c.badgeColor] ?? GRAY_BADGE) }}>{c.badge}</span>
                      : <span style={{ color: T.textD }}>—</span>
                    }
                  </td>
                  <td style={tdStyle}>
                    <Toggle checked={!!c.visible} onChange={() => handleToggle(c.id)} />
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button style={{ ...S.btnGhost, ...S.btnSm }} onClick={() => handleEdit(c)}>
                        <i className="fas fa-pen" /> Edit
                      </button>
                      <button style={{ ...S.btnDanger, ...S.btnSm }} onClick={() => setShowConfirm(c.id)}>
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      {editing && (
        <>
          <div style={S.backdrop} onClick={handleClose} />
          <div style={S.drawer}>
            <div style={S.drawerHead}>
              <div>
                <h2 style={S.drawerH2}>Edit Course</h2>
                <p style={S.drawerSub}>{editing.title}</p>
              </div>
              <button style={{ ...S.btnGhost, padding: "0.35rem 0.65rem" }} onClick={handleClose}>
                <i className="fas fa-times" />
              </button>
            </div>

            {/* Tabs */}
            <div style={S.tabs}>
              {(["basic", "pricing", "content"] as const).map((tab) => (
                <button
                  key={tab}
                  style={{ ...S.tab, ...(drawerTab === tab ? S.tabActive : {}) }}
                  onClick={() => setDrawerTab(tab)}
                >
                  {tab === "basic" ? "Basic Info" : tab === "pricing" ? "Pricing" : "Content"}
                </button>
              ))}
            </div>

            <div style={S.body}>
              {!isSupabaseConfigured && <div style={S.warnBox}>Connect Supabase to save changes. Edits are preview-only.</div>}

              {drawerTab === "basic" && (
                <div>
                  <p style={S.sectionLbl}><i className="fas fa-info-circle" /> Basic Information</p>
                  <div style={S.field}>
                    <label style={S.label}>Title</label>
                    <input style={S.input} value={editing.title ?? ""} onChange={(e) => upd("title", e.target.value)} />
                  </div>
                  <div style={S.field}>
                    <label style={S.label}>Subtitle</label>
                    <input style={S.input} value={editing.subtitle ?? ""} onChange={(e) => upd("subtitle", e.target.value)} />
                  </div>
                  <div style={S.field}>
                    <label style={S.label}>Description</label>
                    <textarea style={S.textarea} rows={4} value={editing.description ?? ""} onChange={(e) => upd("description", e.target.value)} />
                  </div>
                  <div style={{ ...S.field, ...S.fieldGrid }}>
                    <div>
                      <label style={S.label}>Icon (FA class)</label>
                      <input style={S.input} value={editing.icon ?? ""} placeholder="fas fa-brain" onChange={(e) => upd("icon", e.target.value)} />
                    </div>
                    <div>
                      <label style={S.label}>Level</label>
                      <select style={S.select} value={editing.level ?? ""} onChange={(e) => upd("level", e.target.value)}>
                        {LEVEL_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ ...S.field, ...S.fieldGrid }}>
                    <div>
                      <label style={S.label}>Duration</label>
                      <input style={S.input} value={editing.duration ?? ""} placeholder="8 weeks" onChange={(e) => upd("duration", e.target.value)} />
                    </div>
                    <div>
                      <label style={S.label}>Modules</label>
                      <input style={S.input} type="number" value={editing.modules ?? ""} onChange={(e) => upd("modules", Number(e.target.value))} />
                    </div>
                  </div>
                  <div style={S.field}>
                    <label style={S.label}>Slug</label>
                    <input style={S.input} value={editing.slug ?? ""} onChange={(e) => upd("slug", e.target.value)} />
                  </div>
                  <div style={{ ...S.field, ...S.fieldGrid }}>
                    <div>
                      <label style={S.label}>Badge Text</label>
                      <input style={S.input} value={editing.badge ?? ""} placeholder="Trending, New…" onChange={(e) => upd("badge", e.target.value)} />
                    </div>
                    <div>
                      <label style={S.label}>Badge Color</label>
                      <select style={S.select} value={editing.badgeColor ?? ""} onChange={(e) => upd("badgeColor", e.target.value)}>
                        <option value="">None</option>
                        {BADGE_COLOR_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === "pricing" && (
                <div>
                  <p style={S.sectionLbl}><i className="fas fa-tag" /> Pricing & Batch Details</p>
                  <div style={{ ...S.field, ...S.fieldGrid }}>
                    <div>
                      <label style={S.label}>Registration Fee</label>
                      <input style={S.input} value={editReg?.regFee ?? ""} placeholder="₹500" onChange={(e) => updReg("regFee", e.target.value)} />
                    </div>
                    <div>
                      <label style={S.label}>Price</label>
                      <input style={S.input} value={editReg?.price ?? ""} placeholder="₹12,999" onChange={(e) => updReg("price", e.target.value)} />
                    </div>
                  </div>
                  <div style={{ ...S.field, ...S.fieldGrid }}>
                    <div>
                      <label style={S.label}>Original Price</label>
                      <input style={S.input} value={editReg?.originalPrice ?? ""} placeholder="₹19,999" onChange={(e) => updReg("originalPrice", e.target.value)} />
                    </div>
                    <div>
                      <label style={S.label}>Next Batch Date</label>
                      <input style={S.input} value={editReg?.nextBatch ?? ""} placeholder="June 20, 2026" onChange={(e) => updReg("nextBatch", e.target.value)} />
                    </div>
                  </div>
                  <div style={{ ...S.field, ...S.fieldGrid }}>
                    <div>
                      <label style={S.label}>Batch Type</label>
                      <input style={S.input} value={editReg?.batchType ?? ""} placeholder="Weekend Batch" onChange={(e) => updReg("batchType", e.target.value)} />
                    </div>
                    <div>
                      <label style={S.label}>Instructor</label>
                      <input style={S.input} value={editReg?.instructor ?? ""} placeholder="Faizan Ansari" onChange={(e) => updReg("instructor", e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === "content" && (
                <div>
                  <p style={S.sectionLbl}><i className="fas fa-list" /> Content & Audience</p>
                  <div style={S.field}>
                    <label style={S.label}>Skills (one per line)</label>
                    <textarea style={S.textarea} rows={5}
                      value={Array.isArray(editing.skills) ? editing.skills.join("\n") : editing.skills ?? ""}
                      onChange={(e) => upd("skills", e.target.value.split("\n"))}
                    />
                  </div>
                  <div style={S.field}>
                    <label style={S.label}>Outcomes (one per line)</label>
                    <textarea style={S.textarea} rows={5}
                      value={Array.isArray(editing.outcomes) ? editing.outcomes.join("\n") : editing.outcomes ?? ""}
                      onChange={(e) => upd("outcomes", e.target.value.split("\n"))}
                    />
                  </div>
                  <div style={S.field}>
                    <label style={S.label}>Who Is It For (one per line)</label>
                    <textarea style={S.textarea} rows={5}
                      value={Array.isArray(editReg?.whoIsItFor) ? editReg.whoIsItFor.join("\n") : editReg?.whoIsItFor ?? ""}
                      onChange={(e) => updReg("whoIsItFor", e.target.value.split("\n"))}
                    />
                  </div>
                </div>
              )}
            </div>

            <div style={S.footer}>
              <button
                style={{ ...S.btnPrimary, opacity: isSupabaseConfigured ? 1 : 0.5 }}
                disabled={!isSupabaseConfigured}
                onClick={handleSave}
              >
                <i className="fas fa-save" /> Save Changes
              </button>
              <button style={S.btnGhost} onClick={handleClose}>Cancel</button>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirm */}
      {showConfirm && (
        <div style={S.overlay}>
          <div style={S.confirmBox}>
            <div style={S.confirmIcon}><i className="fas fa-trash" /></div>
            <h3 style={{ color: T.text, marginBottom: "0.5rem" }}>Delete Course?</h3>
            <p style={{ color: T.textM, fontSize: "0.875rem", marginBottom: "1.5rem" }}>
              Are you sure you want to remove <strong style={{ color: T.text }}>{toDelete?.title}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button style={S.btnDanger} onClick={() => handleDelete(showConfirm)}>Yes, Delete</button>
              <button style={S.btnGhost} onClick={() => setShowConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ ...S.toastBase, ...(toast.type === "success" ? S.toastOk : S.toastErr) }}>
          <i className={`fas fa-${toast.type === "success" ? "check-circle" : "exclamation-circle"}`} />
          {toast.msg}
        </div>
      )}
    </div>
  );
}
