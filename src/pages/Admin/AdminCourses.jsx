import { useState } from "react";
import { courseListData, courseRegData, teamData } from "../../../appData";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import "./adminShared.css";
import "./adminCourses.css";

const LEVEL_OPTIONS = [
  "Beginner",
  "Beginner → Intermediate",
  "Intermediate",
  "Intermediate → Advanced",
  "Advanced",
];

const BADGE_COLOR_OPTIONS = [
  { value: "badge-orange", label: "Orange" },
  { value: "badge-purple", label: "Purple" },
  { value: "badge-green", label: "Green" },
  { value: "badge-blue", label: "Blue" },
  { value: "badge-red", label: "Red" },
];

const BADGE_CLASS_MAP = {
  "badge-orange": "adm-badge--orange",
  "badge-purple": "adm-badge--indigo",
  "badge-green": "adm-badge--green",
  "badge-blue": "adm-badge--indigo",
  "badge-red": "adm-badge--red",
};

function initCourses() {
  return courseListData.map((c) => ({ ...c, visible: true }));
}

export default function AdminCourses() {
  const [courses, setCourses] = useState(initCourses);
  const [regData, setRegData] = useState({ ...courseRegData });
  const [editing, setEditing] = useState(null);
  const [editReg, setEditReg] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [drawerTab, setDrawerTab] = useState("basic");

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }

  function handleEdit(course) {
    setEditing({ ...course });
    setEditReg(regData[course.id] ? { ...regData[course.id] } : {});
    setDrawerTab("basic");
  }

  function handleClose() {
    setEditing(null);
    setEditReg(null);
  }

  async function handleSave() {
    if (!isSupabaseConfigured || !supabase) {
      showToast("Connect Supabase to save changes", "error");
      return;
    }
    const { error } = await supabase.from("courses").upsert({
      id: editing.id,
      slug: editing.slug,
      title: editing.title,
      subtitle: editing.subtitle,
      description: editing.description,
      icon: editing.icon,
      level: editing.level,
      duration: editing.duration,
      modules: editing.modules,
      badge: editing.badge,
      badge_color: editing.badgeColor,
      visible: editing.visible,
      reg_fee: editReg?.regFee,
      price: editReg?.price,
      original_price: editReg?.originalPrice,
      emi: editReg?.emi,
      next_batch: editReg?.nextBatch,
      batch_type: editReg?.batchType,
      instructor: editReg?.instructor,
      skills: editing.skills,
      outcomes: editing.outcomes,
      who_is_it_for: editReg?.whoIsItFor,
    });
    if (error) {
      showToast(error.message, "error");
    } else {
      setCourses((prev) =>
        prev.map((c) => (c.id === editing.id ? { ...editing } : c)),
      );
      setRegData((prev) => ({ ...prev, [editing.id]: { ...editReg } }));
      showToast("Course saved successfully!", "success");
      handleClose();
    }
  }

  async function handleToggle(courseId) {
    if (!isSupabaseConfigured || !supabase) {
      showToast("Connect Supabase to enable editing", "error");
      return;
    }
    const course = courses.find((c) => c.id === courseId);
    const newVisible = !course.visible;
    const { error } = await supabase
      .from("courses")
      .update({ visible: newVisible })
      .eq("id", courseId);
    if (error) {
      showToast(error.message, "error");
    } else {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId ? { ...c, visible: newVisible } : c,
        ),
      );
    }
  }

  function handleLocalToggle(courseId) {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, visible: !c.visible } : c)),
    );
    if (!isSupabaseConfigured) {
      showToast("Connect Supabase to enable editing", "error");
    }
  }

  function handleDelete(courseId) {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    setShowConfirm(null);
    showToast(
      "Course removed (local only -connect Supabase to persist)",
      "success",
    );
  }

  function updateEditing(field, value) {
    setEditing((prev) => ({ ...prev, [field]: value }));
  }

  function updateEditReg(field, value) {
    setEditReg((prev) => ({ ...prev, [field]: value }));
  }

  const filtered = courses.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.title?.toLowerCase().includes(q) ||
      c.subtitle?.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q)
    );
  });

  const courseToDelete = courses.find((c) => c.id === showConfirm);

  return (
    <div className="adm-courses">
      {/* Header */}
      <div className="adm-courses__header">
        <div className="adm-courses__title-row">
          <h1>Courses</h1>
          <span className="adm-badge adm-badge--indigo">
            {courses.length} total
          </span>
        </div>
        <div className="adm-courses__actions">
          <button
            className="adm-btn adm-btn--primary"
            disabled={!isSupabaseConfigured}
            title={
              !isSupabaseConfigured
                ? "Connect Supabase to add courses"
                : undefined
            }
            onClick={() =>
              showToast("Add course via Supabase dashboard", "success")
            }
          >
            <i className="fas fa-plus" /> Add Course
          </button>
        </div>
      </div>

      {!isSupabaseConfigured && (
        <div className="adm-setup-banner">
          <i className="fas fa-exclamation-triangle" />
          <div>
            <strong>Supabase not connected</strong>
            <p>
              Viewing local data only. Add <code>VITE_SUPABASE_URL</code> and{" "}
              <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> to
              enable saving.
            </p>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="adm-courses__search">
        <i className="fas fa-search" />
        <input
          type="text"
          placeholder="Search courses by title, subtitle, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="adm-courses__table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Level</th>
              <th>Price</th>
              <th>Reg Fee</th>
              <th>Badge</th>
              <th>Visible</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "var(--adm-text-m)",
                  }}
                >
                  No courses match your search.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="adm-courses__course-cell">
                      <div className="adm-courses__course-icon">
                        <i className={c.icon} />
                      </div>
                      <div>
                        <div className="adm-courses__course-name">
                          {c.title}
                        </div>
                        <div className="adm-courses__course-sub">
                          {c.subtitle}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="adm-badge adm-badge--gray"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {c.level}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                    {regData[c.id]?.price || "—"}
                  </td>
                  <td style={{ fontSize: "0.875rem" }}>
                    {regData[c.id]?.regFee || "—"}
                  </td>
                  <td>
                    {c.badge ? (
                      <span
                        className={`adm-badge ${BADGE_CLASS_MAP[c.badgeColor] || "adm-badge--gray"}`}
                        style={{ fontSize: "0.7rem" }}
                      >
                        {c.badge}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "var(--adm-text-m)",
                          fontSize: "0.8rem",
                        }}
                      >
                        —
                      </span>
                    )}
                  </td>
                  <td>
                    <label className="adm-toggle">
                      <input
                        type="checkbox"
                        checked={!!c.visible}
                        onChange={() => handleLocalToggle(c.id)}
                      />
                      <span className="adm-toggle__slider" />
                    </label>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        className="adm-btn adm-btn--ghost adm-btn--sm"
                        onClick={() => handleEdit(c)}
                      >
                        <i className="fas fa-pen" /> Edit
                      </button>
                      <button
                        className="adm-btn adm-btn--danger adm-btn--sm"
                        onClick={() => setShowConfirm(c.id)}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      {editing && (
        <>
          <div className="adm-backdrop" onClick={handleClose} />
          <div className="adm-drawer">
            <div className="adm-drawer__head">
              <div>
                <h2>Edit Course</h2>
                <p>{editing.title}</p>
              </div>
              <button className="adm-drawer__close" onClick={handleClose}>
                <i className="fas fa-times" />
              </button>
            </div>

            {/* Tabs */}
            <div className="adm-drawer-tabs">
              {["basic", "pricing", "content"].map((tab) => (
                <button
                  key={tab}
                  className={`adm-drawer-tab ${drawerTab === tab ? "adm-drawer-tab--active" : ""}`}
                  onClick={() => setDrawerTab(tab)}
                >
                  {tab === "basic"
                    ? "Basic Info"
                    : tab === "pricing"
                      ? "Pricing"
                      : "Content"}
                </button>
              ))}
            </div>

            <div className="adm-drawer__body">
              {!isSupabaseConfigured && (
                <div
                  style={{
                    background: "rgba(245,158,11,0.08)",
                    border: "1px solid rgba(245,158,11,0.3)",
                    borderRadius: 8,
                    padding: "0.75rem 1rem",
                    fontSize: "0.8rem",
                    color: "#92400e",
                    lineHeight: 1.5,
                  }}
                >
                  Connect Supabase to save changes. Your edits are visible in
                  preview only.
                </div>
              )}

              {drawerTab === "basic" && (
                <div className="adm-form-section">
                  <p className="adm-form-section__title">
                    <i className="fas fa-info-circle" /> Basic Information
                  </p>
                  <div className="adm-field">
                    <label>Title</label>
                    <input
                      type="text"
                      value={editing.title || ""}
                      onChange={(e) => updateEditing("title", e.target.value)}
                    />
                  </div>
                  <div className="adm-field">
                    <label>Subtitle</label>
                    <input
                      type="text"
                      value={editing.subtitle || ""}
                      onChange={(e) =>
                        updateEditing("subtitle", e.target.value)
                      }
                    />
                  </div>
                  <div className="adm-field">
                    <label>Description</label>
                    <textarea
                      rows={4}
                      value={editing.description || ""}
                      onChange={(e) =>
                        updateEditing("description", e.target.value)
                      }
                    />
                  </div>
                  <div className="adm-field-grid">
                    <div className="adm-field">
                      <label>Icon (FontAwesome class)</label>
                      <input
                        type="text"
                        value={editing.icon || ""}
                        placeholder="fas fa-brain"
                        onChange={(e) => updateEditing("icon", e.target.value)}
                      />
                    </div>
                    <div className="adm-field">
                      <label>Level</label>
                      <select
                        value={editing.level || ""}
                        onChange={(e) => updateEditing("level", e.target.value)}
                      >
                        {LEVEL_OPTIONS.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="adm-field-grid">
                    <div className="adm-field">
                      <label>Duration</label>
                      <input
                        type="text"
                        value={editing.duration || ""}
                        placeholder="8 weeks"
                        onChange={(e) =>
                          updateEditing("duration", e.target.value)
                        }
                      />
                    </div>
                    <div className="adm-field">
                      <label>Modules</label>
                      <input
                        type="number"
                        value={editing.modules || ""}
                        onChange={(e) =>
                          updateEditing("modules", Number(e.target.value))
                        }
                      />
                    </div>
                  </div>
                  <div className="adm-field">
                    <label>Slug</label>
                    <input
                      type="text"
                      value={editing.slug || ""}
                      onChange={(e) => updateEditing("slug", e.target.value)}
                    />
                  </div>
                  <div className="adm-field-grid">
                    <div className="adm-field">
                      <label>Badge Text</label>
                      <input
                        type="text"
                        value={editing.badge || ""}
                        placeholder="Trending, New, Hot..."
                        onChange={(e) => updateEditing("badge", e.target.value)}
                      />
                    </div>
                    <div className="adm-field">
                      <label>Badge Color</label>
                      <select
                        value={editing.badgeColor || ""}
                        onChange={(e) =>
                          updateEditing("badgeColor", e.target.value)
                        }
                      >
                        <option value="">None</option>
                        {BADGE_COLOR_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === "pricing" && (
                <div className="adm-form-section">
                  <p className="adm-form-section__title">
                    <i className="fas fa-tag" /> Pricing & Batch Details
                  </p>
                  <div className="adm-field-grid">
                    <div className="adm-field">
                      <label>Registration Fee</label>
                      <input
                        type="text"
                        value={editReg?.regFee || ""}
                        placeholder="₹500"
                        onChange={(e) =>
                          updateEditReg("regFee", e.target.value)
                        }
                      />
                    </div>
                    <div className="adm-field">
                      <label>Price</label>
                      <input
                        type="text"
                        value={editReg?.price || ""}
                        placeholder="₹12,999"
                        onChange={(e) => updateEditReg("price", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="adm-field-grid">
                    <div className="adm-field">
                      <label>Original Price</label>
                      <input
                        type="text"
                        value={editReg?.originalPrice || ""}
                        placeholder="₹19,999"
                        onChange={(e) =>
                          updateEditReg("originalPrice", e.target.value)
                        }
                      />
                    </div>
                    <div className="adm-field">
                      <label>EMI</label>
                      <input
                        type="text"
                        value={editReg?.emi || ""}
                        placeholder="₹1,083/mo"
                        onChange={(e) => updateEditReg("emi", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="adm-field-grid">
                    <div className="adm-field">
                      <label>Next Batch Date</label>
                      <input
                        type="text"
                        value={editReg?.nextBatch || ""}
                        placeholder="April 5, 2026"
                        onChange={(e) =>
                          updateEditReg("nextBatch", e.target.value)
                        }
                      />
                    </div>
                    <div className="adm-field">
                      <label>Batch Type</label>
                      <input
                        type="text"
                        value={editReg?.batchType || ""}
                        placeholder="Weekend Batch"
                        onChange={(e) =>
                          updateEditReg("batchType", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="adm-field">
                    <label>Instructor</label>
                    <input
                      type="text"
                      value={editReg?.instructor || ""}
                      placeholder="Faizan Ansari"
                      onChange={(e) =>
                        updateEditReg("instructor", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}

              {drawerTab === "content" && (
                <div className="adm-form-section">
                  <p className="adm-form-section__title">
                    <i className="fas fa-list" /> Content & Audience
                  </p>
                  <div className="adm-field">
                    <label>Skills (one per line)</label>
                    <textarea
                      rows={5}
                      value={
                        Array.isArray(editing.skills)
                          ? editing.skills.join("\n")
                          : editing.skills || ""
                      }
                      onChange={(e) =>
                        updateEditing("skills", e.target.value.split("\n"))
                      }
                    />
                  </div>
                  <div className="adm-field">
                    <label>Outcomes (one per line)</label>
                    <textarea
                      rows={5}
                      value={
                        Array.isArray(editing.outcomes)
                          ? editing.outcomes.join("\n")
                          : editing.outcomes || ""
                      }
                      onChange={(e) =>
                        updateEditing("outcomes", e.target.value.split("\n"))
                      }
                    />
                  </div>
                  <div className="adm-field">
                    <label>Who Is It For (one per line)</label>
                    <textarea
                      rows={5}
                      value={
                        Array.isArray(editReg?.whoIsItFor)
                          ? editReg.whoIsItFor.join("\n")
                          : editReg?.whoIsItFor || ""
                      }
                      onChange={(e) =>
                        updateEditReg("whoIsItFor", e.target.value.split("\n"))
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="adm-drawer__footer">
              <button
                className="adm-btn adm-btn--primary"
                disabled={!isSupabaseConfigured}
                title={
                  !isSupabaseConfigured ? "Connect Supabase to save" : undefined
                }
                onClick={handleSave}
              >
                <i className="fas fa-save" /> Save Changes
              </button>
              <button className="adm-btn adm-btn--ghost" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirm */}
      {showConfirm && (
        <div className="adm-confirm-overlay">
          <div className="adm-confirm-box">
            <div className="adm-confirm-box__icon">
              <i className="fas fa-trash" />
            </div>
            <h3>Delete Course?</h3>
            <p>
              Are you sure you want to remove{" "}
              <strong>{courseToDelete?.title}</strong>? This action cannot be
              undone.
            </p>
            <div className="adm-confirm-box__actions">
              <button
                className="adm-btn adm-btn--danger"
                onClick={() => handleDelete(showConfirm)}
              >
                Yes, Delete
              </button>
              <button
                className="adm-btn adm-btn--ghost"
                onClick={() => setShowConfirm(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`adm-toast adm-toast--${toast.type}`}>
          <i
            className={`fas fa-${toast.type === "success" ? "check-circle" : "exclamation-circle"}`}
          />
          {toast.msg}
        </div>
      )}
    </div>
  );
}
