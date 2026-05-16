import { useState } from "react";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import "./adminShared.css";
import "./adminAnnouncements.css";

const DEFAULT_FORM = {
  badge: "🎉 New",
  text: "Upcoming Workshop on GenAI for Business -Limited Seats!",
  ctaText: "Register Free →",
  ctaHref: "/workshops",
  isActive: true,
};

export default function AdminAnnouncements() {
  const [form, setForm] = useState({ ...DEFAULT_FORM });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }

  function updateForm(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    if (!isSupabaseConfigured || !supabase) {
      showToast("Connect Supabase to save changes", "error");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("announcements").upsert({
      id: 1,
      is_active: form.isActive,
      badge: form.badge,
      text: form.text,
      cta_text: form.ctaText,
      cta_href: form.ctaHref,
    });
    setSaving(false);
    if (error) {
      showToast(error.message, "error");
    } else {
      setSaved(true);
      showToast("Announcement saved!", "success");
      setTimeout(() => setSaved(false), 2000);
    }
  }

  function handleReset() {
    setForm({ ...DEFAULT_FORM });
    showToast("Reset to defaults", "success");
  }

  return (
    <div className="adm-ann">
      {/* Header */}
      <div className="adm-ann__header">
        <h1>Announcement Bar</h1>
        <p>Manage the announcement shown at the top of every page</p>
      </div>

      {!isSupabaseConfigured && (
        <div className="adm-setup-banner">
          <i className="fas fa-exclamation-triangle" />
          <div>
            <strong>Supabase not connected</strong>
            <p>
              Changes here are preview-only. Add <code>VITE_SUPABASE_URL</code>{" "}
              and <code>VITE_SUPABASE_ANON_KEY</code> to save to the database.
            </p>
          </div>
        </div>
      )}

      <div className="adm-ann__layout">
        {/* Left: Form */}
        <div className="adm-ann__form-card">
          {/* Active Toggle */}
          <div className="adm-ann__toggle-row">
            <div className="adm-ann__active-label">
              <span>Show announcement bar</span>
              <small>Displays the colored bar at the top of every page</small>
            </div>
            <label className="adm-toggle">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => updateForm("isActive", e.target.checked)}
              />
              <span className="adm-toggle__slider" />
            </label>
          </div>

          {/* Badge */}
          <div className="adm-field" style={{ marginBottom: "1rem" }}>
            <label>Badge / Emoji Label</label>
            <input
              type="text"
              value={form.badge}
              placeholder="🎉 New"
              onChange={(e) => updateForm("badge", e.target.value)}
              maxLength={20}
            />
          </div>

          {/* Message */}
          <div className="adm-field" style={{ marginBottom: "1rem" }}>
            <label>Announcement Message</label>
            <textarea
              rows={3}
              value={form.text}
              placeholder="Upcoming Workshop on GenAI for Business -Limited Seats!"
              onChange={(e) => updateForm("text", e.target.value)}
            />
          </div>

          {/* CTA */}
          <div className="adm-field-grid" style={{ marginBottom: "0" }}>
            <div className="adm-field">
              <label>CTA Button Text</label>
              <input
                type="text"
                value={form.ctaText}
                placeholder="Register Free →"
                onChange={(e) => updateForm("ctaText", e.target.value)}
              />
            </div>
            <div className="adm-field">
              <label>CTA URL</label>
              <input
                type="text"
                value={form.ctaHref}
                placeholder="/workshops"
                onChange={(e) => updateForm("ctaHref", e.target.value)}
              />
            </div>
          </div>

          {/* Save Row */}
          <div className="adm-ann__save-row">
            <button
              className="adm-btn adm-btn--primary"
              disabled={saving || !isSupabaseConfigured}
              title={
                !isSupabaseConfigured ? "Connect Supabase to save" : undefined
              }
              onClick={handleSave}
            >
              {saving ? (
                <>
                  <i className="fas fa-spinner fa-spin" /> Saving...
                </>
              ) : saved ? (
                <>
                  <i className="fas fa-check" /> Saved!
                </>
              ) : (
                <>
                  <i className="fas fa-save" /> Save Changes
                </>
              )}
            </button>
            <button className="adm-btn adm-btn--ghost" onClick={handleReset}>
              <i className="fas fa-undo" /> Reset to Defaults
            </button>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="adm-ann__preview-card">
          <div className="adm-ann__preview-label">Live Preview</div>

          {form.isActive ? (
            <div className="adm-ann__bar">
              {form.badge && (
                <span className="adm-ann__bar-badge">{form.badge}</span>
              )}
              <span className="adm-ann__bar-text">
                {form.text || (
                  <em style={{ opacity: 0.5 }}>Enter a message...</em>
                )}
              </span>
              {form.ctaText && (
                <span className="adm-ann__bar-cta">{form.ctaText}</span>
              )}
            </div>
          ) : (
            <div
              style={{
                marginTop: "0.75rem",
                padding: "1.5rem",
                border: "2px dashed var(--adm-border)",
                borderRadius: 8,
                textAlign: "center",
                color: "var(--adm-text-m)",
                fontSize: "0.85rem",
              }}
            >
              <i
                className="fas fa-eye-slash"
                style={{ marginRight: "0.5rem" }}
              />
              Announcement bar is hidden
            </div>
          )}

          <div
            style={{
              marginTop: "1.25rem",
              padding: "1rem",
              background: "var(--adm-bg)",
              borderRadius: 8,
              fontSize: "0.78rem",
              color: "var(--adm-text-m)",
              lineHeight: 1.6,
            }}
          >
            <strong
              style={{
                color: "var(--adm-text-2)",
                display: "block",
                marginBottom: "0.35rem",
              }}
            >
              <i
                className="fas fa-info-circle"
                style={{ marginRight: "0.35rem" }}
              />
              Preview Notes
            </strong>
            This preview reflects exactly how the announcement bar will appear
            across your site. The gradient and styling match the live site's
            header bar.
            {!isSupabaseConfigured && (
              <span
                style={{
                  display: "block",
                  marginTop: "0.5rem",
                  color: "var(--adm-warn)",
                }}
              >
                <i
                  className="fas fa-exclamation-triangle"
                  style={{ marginRight: "0.3rem" }}
                />
                Connect Supabase to persist changes.
              </span>
            )}
          </div>
        </div>
      </div>

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
