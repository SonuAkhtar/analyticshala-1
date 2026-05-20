"use client";

import { useState } from "react";
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

const S: Record<string, React.CSSProperties> = {
  header: { marginBottom: "1.75rem" },
  h1: { fontSize: "1.5rem", fontWeight: 700, color: T.text, margin: 0 },
  sub: { color: T.textM, marginTop: "0.35rem", fontSize: "0.9rem" },
  banner: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.75rem",
    background: "rgba(245,158,11,0.08)",
    border: "1px solid rgba(245,158,11,0.3)",
    borderRadius: 10,
    padding: "1rem 1.25rem",
    marginBottom: "1.5rem",
    fontSize: "0.85rem",
    color: "#fbbf24",
    lineHeight: 1.6,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: "1.5rem",
  },
  card: {
    background: T.card,
    borderRadius: 12,
    border: `1px solid ${T.border}`,
    padding: "1.5rem",
  },
  cardTitle: {
    fontSize: "0.88rem",
    fontWeight: 700,
    color: T.text,
    marginBottom: "1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.85rem 0",
    borderBottom: `1px solid ${T.border}`,
    marginBottom: "1.25rem",
  },
  toggleLabel: { fontSize: "0.9rem", fontWeight: 600, color: T.text },
  toggleSub: { fontSize: "0.77rem", color: T.textM, marginTop: 2 },
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
    background: "#0f172a",
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
    background: "#0f172a",
    border: `1px solid ${T.border}`,
    borderRadius: 8,
    padding: "0.6rem 0.85rem",
    color: T.text,
    fontSize: "0.875rem",
    outline: "none",
    resize: "vertical" as const,
    boxSizing: "border-box" as const,
  },
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
  },
  saveRow: {
    display: "flex",
    gap: "0.75rem",
    marginTop: "1.5rem",
    paddingTop: "1.25rem",
    borderTop: `1px solid ${T.border}`,
  },
  btnPrimary: {
    background: T.accent,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "0.6rem 1.2rem",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  btnGhost: {
    background: "transparent",
    color: T.textM,
    border: `1px solid ${T.border}`,
    borderRadius: 8,
    padding: "0.55rem 1rem",
    cursor: "pointer",
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  previewLbl: {
    fontSize: "0.72rem",
    fontWeight: 700,
    color: T.textM,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "0.75rem",
  },
  annBar: {
    background: "linear-gradient(90deg,#1e1b4b,#312e81,#1e1b4b)",
    borderRadius: 8,
    padding: "0.75rem 1.1rem",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap" as const,
    gap: "0.5rem",
    fontSize: "0.875rem",
  },
  annBadge: {
    background: "rgba(99,102,241,0.25)",
    color: "#c7d2fe",
    padding: "0.2rem 0.6rem",
    borderRadius: 6,
    fontSize: "0.75rem",
    fontWeight: 700,
  },
  annText: { color: "#e2e8f0", flex: 1, fontSize: "0.875rem" },
  annCta: {
    color: "#818cf8",
    fontWeight: 700,
    fontSize: "0.82rem",
    textDecoration: "underline",
    cursor: "pointer",
  },
  hiddenBox: {
    marginTop: "0.5rem",
    padding: "1.5rem",
    border: `2px dashed ${T.border}`,
    borderRadius: 8,
    textAlign: "center" as const,
    color: T.textM,
    fontSize: "0.85rem",
  },
  infoBox: {
    marginTop: "1.25rem",
    background: "#0f172a",
    borderRadius: 8,
    padding: "1rem",
    fontSize: "0.78rem",
    color: T.textM,
    lineHeight: 1.6,
  },
  infoTitle: {
    fontWeight: 600,
    color: T.textD,
    display: "block",
    marginBottom: "0.35rem",
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

interface AnnForm {
  badge: string;
  text: string;
  ctaText: string;
  ctaHref: string;
  isActive: boolean;
}

const DEFAULT: AnnForm = {
  badge: "🎉 New",
  text: "Upcoming Workshop on GenAI for Business - Limited Seats!",
  ctaText: "Register Free →",
  ctaHref: "/workshops",
  isActive: true,
};

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
        width: 44,
        height: 24,
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
            left: checked ? 23 : 3,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
          }}
        />
      </span>
    </label>
  );
}

export default function AdminAnnouncements() {
  const [form, setForm] = useState<AnnForm>({ ...DEFAULT });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2600);
  }

  function upd<K extends keyof AnnForm>(field: K, value: AnnForm[K]) {
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
      return;
    }
    setSaved(true);
    showToast("Announcement saved!");
    setTimeout(() => setSaved(false), 2200);
  }

  function handleReset() {
    setForm({ ...DEFAULT });
    showToast("Reset to defaults");
  }

  return (
    <div>
      {/* Header */}
      <div style={S.header}>
        <h1 style={S.h1}>Announcement Bar</h1>
        <p style={S.sub}>
          Manage the announcement shown at the top of every page
        </p>
      </div>

      {!isSupabaseConfigured && (
        <div style={S.banner}>
          <i className="fas fa-exclamation-triangle" style={{ marginTop: 2 }} />
          <div>
            <strong>Supabase not connected.</strong> Changes here are
            preview-only. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to save to the database.
          </div>
        </div>
      )}

      <div style={S.layout}>
        {/* Left: Form */}
        <div style={S.card}>
          <p style={S.cardTitle}>
            <i className="fas fa-edit" style={{ color: T.accent }} /> Edit
            Announcement
          </p>

          {/* Active Toggle */}
          <div style={S.toggleRow}>
            <div>
              <div style={S.toggleLabel}>Show announcement bar</div>
              <div style={S.toggleSub}>
                Displays the colored bar at the top of every page
              </div>
            </div>
            <Toggle
              checked={form.isActive}
              onChange={() => upd("isActive", !form.isActive)}
            />
          </div>

          <div style={S.field}>
            <label style={S.label}>Badge / Emoji Label</label>
            <input
              style={S.input}
              value={form.badge}
              placeholder="🎉 New"
              maxLength={20}
              onChange={(e) => upd("badge", e.target.value)}
            />
          </div>

          <div style={S.field}>
            <label style={S.label}>Announcement Message</label>
            <textarea
              style={S.textarea}
              rows={3}
              value={form.text}
              placeholder="Upcoming Workshop on GenAI - Limited Seats!"
              onChange={(e) => upd("text", e.target.value)}
            />
          </div>

          <div style={S.fieldGrid}>
            <div style={S.field}>
              <label style={S.label}>CTA Button Text</label>
              <input
                style={S.input}
                value={form.ctaText}
                placeholder="Register Free →"
                onChange={(e) => upd("ctaText", e.target.value)}
              />
            </div>
            <div style={S.field}>
              <label style={S.label}>CTA URL</label>
              <input
                style={S.input}
                value={form.ctaHref}
                placeholder="/workshops"
                onChange={(e) => upd("ctaHref", e.target.value)}
              />
            </div>
          </div>

          <div style={S.saveRow}>
            <button
              style={{
                ...S.btnPrimary,
                opacity: isSupabaseConfigured ? 1 : 0.5,
              }}
              disabled={saving || !isSupabaseConfigured}
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
            <button style={S.btnGhost} onClick={handleReset}>
              <i className="fas fa-undo" /> Reset
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div style={S.card}>
          <p style={S.cardTitle}>
            <i className="fas fa-eye" style={{ color: T.accent }} /> Live
            Preview
          </p>
          <div style={S.previewLbl}>Preview</div>

          {form.isActive ? (
            <div style={S.annBar}>
              {form.badge && <span style={S.annBadge}>{form.badge}</span>}
              <span style={S.annText}>
                {form.text || (
                  <em style={{ opacity: 0.5 }}>Enter a message above...</em>
                )}
              </span>
              {form.ctaText && <span style={S.annCta}>{form.ctaText}</span>}
            </div>
          ) : (
            <div style={S.hiddenBox}>
              <i
                className="fas fa-eye-slash"
                style={{ marginRight: "0.5rem" }}
              />
              Announcement bar is hidden
            </div>
          )}

          <div style={S.infoBox}>
            <span style={S.infoTitle}>
              <i
                className="fas fa-info-circle"
                style={{ marginRight: "0.35rem" }}
              />
              Preview Notes
            </span>
            This preview reflects how the announcement bar will appear across
            your site. The gradient and styling match the live site's header
            bar.
            {!isSupabaseConfigured && (
              <span
                style={{
                  display: "block",
                  marginTop: "0.5rem",
                  color: "#f59e0b",
                }}
              >
                <i
                  className="fas fa-exclamation-triangle"
                  style={{ marginRight: "0.3rem" }}
                />
                Connect Supabase to persist changes across deployments.
              </span>
            )}
          </div>

          {/* Field Summary */}
          <div
            style={{
              marginTop: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {[
              {
                label: "Status",
                value: form.isActive ? "Active" : "Hidden",
                color: form.isActive ? "#4ade80" : "#94a3b8",
              },
              { label: "Badge", value: form.badge || "(none)", color: T.textM },
              { label: "CTA", value: form.ctaText || "(none)", color: T.textM },
              { label: "URL", value: form.ctaHref || "(none)", color: T.textD },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.8rem",
                }}
              >
                <span style={{ color: T.textD, fontWeight: 600 }}>
                  {row.label}
                </span>
                <span style={{ color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

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
