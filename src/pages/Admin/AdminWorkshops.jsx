import { useState } from "react";
import { workshopData } from "../../../appData";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import "./adminShared.css";
import "./adminWorkshops.css";

const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced"];

function initWorkshops() {
  return workshopData.upcoming.map((w) => ({ ...w }));
}

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState(initWorkshops);
  const [editing, setEditing] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [drawerTab, setDrawerTab] = useState("basic");

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }

  function handleEdit(workshop) {
    setEditing({ ...workshop });
    setDrawerTab("basic");
  }

  function handleClose() {
    setEditing(null);
  }

  async function handleSave() {
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
    } else {
      setWorkshops((prev) =>
        prev.map((w) => (w.id === editing.id ? { ...editing } : w)),
      );
      showToast("Workshop saved successfully!", "success");
      handleClose();
    }
  }

  async function adjustSeats(workshopId, delta) {
    const workshop = workshops.find((w) => w.id === workshopId);
    const newSeats = Math.max(
      0,
      Math.min(workshop.totalSeats, workshop.seatsLeft + delta),
    );

    setWorkshops((prev) =>
      prev.map((w) =>
        w.id === workshopId ? { ...w, seatsLeft: newSeats } : w,
      ),
    );

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from("workshops")
        .update({ seats_left: newSeats })
        .eq("id", workshopId);
      if (error) showToast(error.message, "error");
    } else {
      showToast(
        "Seat count updated locally -connect Supabase to persist",
        "error",
      );
    }
  }

  function handleDelete(workshopId) {
    setWorkshops((prev) => prev.filter((w) => w.id !== workshopId));
    setShowConfirm(null);
    showToast(
      "Workshop removed (local only -connect Supabase to persist)",
      "success",
    );
  }

  function updateEditing(field, value) {
    setEditing((prev) => ({ ...prev, [field]: value }));
  }

  function toggleEventMode(mode) {
    const current = editing.eventMode || [];
    if (current.includes(mode)) {
      updateEditing(
        "eventMode",
        current.filter((m) => m !== mode),
      );
    } else {
      updateEditing("eventMode", [...current, mode]);
    }
  }

  const filtered = workshops.filter((w) => {
    const q = search.toLowerCase();
    return (
      w.title?.toLowerCase().includes(q) ||
      w.instructor?.toLowerCase().includes(q) ||
      w.category?.toLowerCase().includes(q)
    );
  });

  const workshopToDelete = workshops.find((w) => w.id === showConfirm);

  return (
    <div className="adm-workshops">
      {/* Header */}
      <div className="adm-workshops__header">
        <div className="adm-workshops__title-row">
          <h1>Workshops</h1>
          <span className="adm-badge adm-badge--indigo">
            {workshops.length} upcoming
          </span>
        </div>
        <div className="adm-workshops__actions">
          <button
            className="adm-btn adm-btn--primary"
            disabled={!isSupabaseConfigured}
            title={
              !isSupabaseConfigured
                ? "Connect Supabase to add workshops"
                : undefined
            }
            onClick={() =>
              showToast("Add workshop via Supabase dashboard", "success")
            }
          >
            <i className="fas fa-plus" /> Add Workshop
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
      <div className="adm-workshops__search">
        <i className="fas fa-search" />
        <input
          type="text"
          placeholder="Search workshops by title, instructor, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="adm-workshops__table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Workshop</th>
              <th>Instructor</th>
              <th>Seats</th>
              <th>Category</th>
              <th>Status</th>
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
                  No workshops match your search.
                </td>
              </tr>
            ) : (
              filtered.map((w) => {
                const pct =
                  w.totalSeats > 0 ? (w.seatsLeft / w.totalSeats) * 100 : 0;
                const fillClass =
                  w.seatsLeft === 0
                    ? "adm-seats-bar__fill--danger"
                    : pct < 30
                      ? "adm-seats-bar__fill--warn"
                      : "adm-seats-bar__fill--ok";

                return (
                  <tr key={w.id}>
                    <td>
                      <div className="adm-workshop-cell">
                        <strong>{w.title}</strong>
                        <span>{w.date}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: "0.875rem" }}>{w.instructor}</td>
                    <td>
                      <div className="adm-seats-bar">
                        <div className="adm-seats-bar__track">
                          <div
                            className={`adm-seats-bar__fill ${fillClass}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span>
                          {w.seatsLeft}/{w.totalSeats} seats
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="adm-badge adm-badge--gray"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {w.category}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`adm-badge ${w.seatsLeft === 0 ? "adm-badge--red" : w.seatsLeft <= 5 ? "adm-badge--orange" : "adm-badge--green"}`}
                        style={{ fontSize: "0.7rem" }}
                      >
                        {w.seatsLeft === 0
                          ? "Full"
                          : w.seatsLeft <= 5
                            ? "Almost Full"
                            : "Live"}
                      </span>
                    </td>
                    <td>
                      <label className="adm-toggle">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          onChange={() => {
                            if (!isSupabaseConfigured) {
                              showToast(
                                "Connect Supabase to enable editing",
                                "error",
                              );
                            }
                          }}
                        />
                        <span className="adm-toggle__slider" />
                      </label>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.35rem",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          className="adm-btn adm-btn--ghost adm-btn--sm"
                          onClick={() => handleEdit(w)}
                        >
                          <i className="fas fa-pen" /> Edit
                        </button>
                        <div className="adm-seats-controls">
                          <button
                            onClick={() => adjustSeats(w.id, -1)}
                            disabled={w.seatsLeft <= 0}
                            title="Decrease seats"
                          >
                            <i className="fas fa-minus" />
                          </button>
                          <button
                            onClick={() => adjustSeats(w.id, 1)}
                            disabled={w.seatsLeft >= w.totalSeats}
                            title="Increase seats"
                          >
                            <i className="fas fa-plus" />
                          </button>
                        </div>
                        <button
                          className="adm-btn adm-btn--danger adm-btn--sm"
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

      {/* Drawer */}
      {editing && (
        <>
          <div className="adm-backdrop" onClick={handleClose} />
          <div className="adm-drawer">
            <div className="adm-drawer__head">
              <div>
                <h2>Edit Workshop</h2>
                <p>{editing.title}</p>
              </div>
              <button className="adm-drawer__close" onClick={handleClose}>
                <i className="fas fa-times" />
              </button>
            </div>

            <div className="adm-drawer-tabs">
              {["basic", "seats", "content"].map((tab) => (
                <button
                  key={tab}
                  className={`adm-drawer-tab ${drawerTab === tab ? "adm-drawer-tab--active" : ""}`}
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
                    <label>Description</label>
                    <textarea
                      rows={3}
                      value={editing.desc || ""}
                      onChange={(e) => updateEditing("desc", e.target.value)}
                    />
                  </div>
                  <div className="adm-field-grid">
                    <div className="adm-field">
                      <label>Date</label>
                      <input
                        type="text"
                        value={editing.date || ""}
                        placeholder="March 29, Saturday"
                        onChange={(e) => updateEditing("date", e.target.value)}
                      />
                    </div>
                    <div className="adm-field">
                      <label>Time</label>
                      <input
                        type="text"
                        value={editing.time || ""}
                        placeholder="10:00 AM – 1:00 PM"
                        onChange={(e) => updateEditing("time", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="adm-field-grid">
                    <div className="adm-field">
                      <label>Duration</label>
                      <input
                        type="text"
                        value={editing.duration || ""}
                        placeholder="3 Hours"
                        onChange={(e) =>
                          updateEditing("duration", e.target.value)
                        }
                      />
                    </div>
                    <div className="adm-field">
                      <label>Instructor</label>
                      <input
                        type="text"
                        value={editing.instructor || ""}
                        onChange={(e) =>
                          updateEditing("instructor", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="adm-field-grid">
                    <div className="adm-field">
                      <label>Category</label>
                      <input
                        type="text"
                        value={editing.category || ""}
                        placeholder="Data Analytics"
                        onChange={(e) =>
                          updateEditing("category", e.target.value)
                        }
                      />
                    </div>
                    <div className="adm-field">
                      <label>Category Color (hex)</label>
                      <input
                        type="text"
                        value={editing.categoryColor || ""}
                        placeholder="#16a34a"
                        onChange={(e) =>
                          updateEditing("categoryColor", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="adm-field">
                    <label>Image URL</label>
                    <input
                      type="text"
                      value={editing.image || ""}
                      onChange={(e) => updateEditing("image", e.target.value)}
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
                  <div className="adm-field">
                    <label>Event Mode</label>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginTop: "0.25rem",
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
                            color: "var(--adm-text-2)",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={(editing.eventMode || []).includes(mode)}
                            onChange={() => toggleEventMode(mode)}
                            style={{
                              width: "auto",
                              padding: 0,
                              border: "none",
                            }}
                          />
                          {mode}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === "seats" && (
                <div className="adm-form-section">
                  <p className="adm-form-section__title">
                    <i className="fas fa-users" /> Seats & Pricing
                  </p>
                  <div className="adm-field-grid">
                    <div className="adm-field">
                      <label>Price</label>
                      <input
                        type="text"
                        value={editing.price || ""}
                        placeholder="₹999"
                        onChange={(e) => updateEditing("price", e.target.value)}
                      />
                    </div>
                    <div className="adm-field">
                      <label>Original Price</label>
                      <input
                        type="text"
                        value={editing.originalPrice || ""}
                        placeholder="₹1,999"
                        onChange={(e) =>
                          updateEditing("originalPrice", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="adm-field-grid">
                    <div className="adm-field">
                      <label>Total Seats</label>
                      <input
                        type="number"
                        value={editing.totalSeats || ""}
                        onChange={(e) =>
                          updateEditing("totalSeats", Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="adm-field">
                      <label>Seats Left</label>
                      <input
                        type="number"
                        value={editing.seatsLeft ?? ""}
                        min={0}
                        max={editing.totalSeats}
                        onChange={(e) =>
                          updateEditing("seatsLeft", Number(e.target.value))
                        }
                      />
                    </div>
                  </div>
                  <div className="adm-field">
                    <label>Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={
                        Array.isArray(editing.tags)
                          ? editing.tags.join(", ")
                          : editing.tags || ""
                      }
                      placeholder="Excel, Pivot Tables, Dashboards"
                      onChange={(e) =>
                        updateEditing(
                          "tags",
                          e.target.value.split(",").map((t) => t.trim()),
                        )
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
                        Array.isArray(editing.whoIsItFor)
                          ? editing.whoIsItFor.join("\n")
                          : editing.whoIsItFor || ""
                      }
                      onChange={(e) =>
                        updateEditing("whoIsItFor", e.target.value.split("\n"))
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
            <h3>Delete Workshop?</h3>
            <p>
              Are you sure you want to remove{" "}
              <strong>{workshopToDelete?.title}</strong>? This action cannot be
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
