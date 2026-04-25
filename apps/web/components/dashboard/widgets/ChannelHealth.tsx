"use client";

import Link from "next/link";

const channels = [
  { name: "Email", icon: "✉", status: "Connected", statusColor: "var(--green)", time: "2 min ago", rate: 99 },
  { name: "Discord", icon: "◈", status: "Connected", statusColor: "var(--green)", time: "18 min ago", rate: 100 },
  { name: "Telegram", icon: "✈", status: "Not configured", statusColor: "var(--red)", time: "Never", rate: 0 },
  { name: "WhatsApp", icon: "📱", status: "Degraded", statusColor: "var(--amber)", time: "1 hr ago", rate: 85 },
];

export default function ChannelHealth() {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, height: "100%", padding: "16px 20px", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", color: "var(--muted)" }}>Channels</span>
        <Link href="/dashboard/settings" style={{ fontSize: 12, color: "var(--muted)", textDecoration: "none" }}>Manage →</Link>
      </div>

      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {channels.map((channel) => (
          <div
            key={channel.name}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 8,
              padding: "10px 12px",
              margin: "0 -12px",
              borderRadius: 8,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14 }}>{channel.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{channel.name}</span>
                <span style={{ fontSize: 11, color: channel.statusColor }}>{channel.status}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", display: "flex", alignItems: "center", gap: 8 }}>
                <span>{channel.time}</span>
                {channel.rate > 0 && (
                  <div style={{ width: 60, height: 3, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${channel.rate}%`, height: "100%", background: channel.statusColor }} />
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", color: "var(--muted)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        style={{
          marginTop: "auto",
          width: "100%",
          padding: "10px 0",
          border: "1px dashed var(--border)",
          borderRadius: 8,
          background: "transparent",
          color: "var(--muted)",
          fontSize: 12,
          fontWeight: 500,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderStyle = "solid";
          e.currentTarget.style.color = "var(--text)";
          e.currentTarget.style.borderColor = "#ccc";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderStyle = "dashed";
          e.currentTarget.style.color = "var(--muted)";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        ＋ Add channel
      </button>
    </div>
  );
}
