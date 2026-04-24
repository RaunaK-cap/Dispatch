"use client";

const channels = [
  { emoji: "✉️", label: "Email" },
  { emoji: "🎮", label: "Discord" },
  { emoji: "✈️", label: "Telegram" },
  { emoji: "📱", label: "WhatsApp" },
];

export default function ChannelGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
      }}
    >
      {channels.map((ch) => (
        <div
          key={ch.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--text)",
            cursor: "default",
            transition: "background 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--accent-light)";
            (e.currentTarget as HTMLElement).style.borderColor = "#ccc";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--bg)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          }}
        >
          <span style={{ fontSize: 16 }}>{ch.emoji}</span>
          <span>{ch.label}</span>
        </div>
      ))}
    </div>
  );
}
