import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "clamp(3rem, 10vw, 8rem)", fontWeight: 800, lineHeight: 1, color: "var(--brand-red)" }}>
        404
      </h1>
      <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)" }}>
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        style={{
          padding: "0.875rem 2rem",
          background: "var(--gradient-cta)",
          color: "white",
          borderRadius: "8px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
