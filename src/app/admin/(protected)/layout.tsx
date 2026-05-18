"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#6366f1",
          fontSize: "1.5rem",
        }}
      >
        <i className="fas fa-circle-notch fa-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#f1f5f9" }}>
      <nav style={{ background: "#1e293b", padding: "1rem 2rem", display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <strong style={{ color: "#6366f1" }}>Admin</strong>
        <a href="/admin/dashboard" style={{ color: "#94a3b8", textDecoration: "none" }}>Dashboard</a>
        <a href="/admin/courses"   style={{ color: "#94a3b8", textDecoration: "none" }}>Courses</a>
        <a href="/admin/workshops" style={{ color: "#94a3b8", textDecoration: "none" }}>Workshops</a>
        <a href="/admin/announcements" style={{ color: "#94a3b8", textDecoration: "none" }}>Announcements</a>
      </nav>
      <main style={{ padding: "2rem" }}>{children}</main>
    </div>
  );
}
