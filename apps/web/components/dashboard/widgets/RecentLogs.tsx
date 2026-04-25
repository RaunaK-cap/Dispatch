"use client";

import { useState } from "react";
import Link from "next/link";

const logs = [
  { id: "1", time: "2m ago", channel: "Email", icon: "✉", iconColor: "#888", dest: "user@acme.com", message: "Welcome to Dispatch! Your account is...", status: "delivered", latency: "43ms" },
  { id: "2", time: "4m ago", channel: "Discord", icon: "◈", iconColor: "#5865F2", dest: "#alerts", message: "CPU utilization > 80% on worker-1", status: "delivered", latency: "112ms" },
  { id: "3", time: "12m ago", channel: "WhatsApp", icon: "📱", iconColor: "#25D366", dest: "+1 555-0198", message: "Your OTP is 819204", status: "failed", latency: "timeout" },
  { id: "4", time: "18m ago", channel: "Telegram", icon: "✈", iconColor: "#229ED9", dest: "@devteam", message: "Deploy successful in us-east-1", status: "delivered", latency: "89ms" },
  { id: "5", time: "1h ago", channel: "Email", icon: "✉", iconColor: "#888", dest: "admin@corp.net", message: "Monthly invoice attached", status: "retrying", latency: "890ms" },
  // ... more rows to fill space
  { id: "6", time: "2h ago", channel: "Discord", icon: "◈", iconColor: "#5865F2", dest: "#general", message: "New user signup: Bob", status: "delivered", latency: "45ms" },
];

export default function RecentLogs() {
  const [filter, setFilter] = useState("All");

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", color: "var(--text)" }}>Recent Logs</span>
          <div style={{ display: "flex", gap: 6 }}>
            {["All", "Email", "Discord", "Telegram", "WhatsApp", "Failed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "4px 10px",
                  fontSize: 11,
                  borderRadius: 100,
                  border: "none",
                  cursor: "pointer",
                  background: filter === f ? "var(--text)" : "var(--bg)",
                  color: filter === f ? "var(--bg)" : "var(--muted)",
                  transition: "all 0.2s"
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <Link href="/dashboard/logs" style={{ fontSize: 12, color: "var(--muted)", textDecoration: "none" }}>View all →</Link>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Table Header */}
        <div style={{ display: "grid", gridTemplateColumns: "70px 100px 150px 1fr 100px 70px", gap: 12, padding: "10px 20px", fontSize: 11, color: "var(--muted)", borderBottom: "1px solid var(--border)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          <span>Time</span>
          <span>Channel</span>
          <span>Destination</span>
          <span>Message</span>
          <span>Status</span>
          <span style={{ textAlign: "right" }}>Latency</span>
        </div>

        {/* Rows */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {logs.map((log) => (
            <div
              key={log.id}
              style={{
                display: "grid",
                gridTemplateColumns: "70px 100px 150px 1fr 100px 70px",
                gap: 12,
                padding: "10px 20px",
                alignItems: "center",
                borderBottom: "1px solid var(--border)",
                fontSize: 12,
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontFamily: "monospace", color: "var(--muted)" }}>{log.time}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: log.iconColor }}>{log.icon}</span>
                <span>{log.channel}</span>
              </div>
              <span style={{ color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{log.dest}</span>
              <span style={{ color: "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{log.message}</span>
              
              {/* Status Badge */}
              <div>
                {log.status === "delivered" && <span style={{ display: "inline-block", padding: "2px 8px", background: "var(--green-bg)", color: "var(--green)", borderRadius: 100, fontSize: 11 }}>✓ Delivered</span>}
                {log.status === "retrying" && <span style={{ display: "inline-block", padding: "2px 8px", background: "#fffbeb", color: "var(--amber)", borderRadius: 100, fontSize: 11 }}>↻ Retrying</span>}
                {log.status === "failed" && <span style={{ display: "inline-block", padding: "2px 8px", background: "#fef2f2", color: "var(--red)", borderRadius: 100, fontSize: 11 }}>✗ Failed</span>}
              </div>

              <span style={{ fontFamily: "monospace", textAlign: "right", color: log.latency === "timeout" ? "var(--red)" : parseInt(log.latency) > 500 ? "var(--amber)" : "var(--green)" }}>
                {log.latency}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
