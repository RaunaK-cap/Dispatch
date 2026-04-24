"use client";

const keys = [
  {
    name: "Production",
    value: "sk_live_••••••••••••••••3f9a",
    status: "active",
    created: "Jan 12, 2025",
  },
  {
    name: "Staging",
    value: "sk_live_••••••••••••••••8b2c",
    status: "active",
    created: "Feb 3, 2025",
  },
  {
    name: "Old Key",
    value: "sk_live_••••••••••••••••1d4e",
    status: "revoked",
    created: "Dec 1, 2024",
  },
];

const statusStyle = (status: string) => ({
  fontSize: 11,
  fontWeight: 500,
  padding: "2px 8px",
  borderRadius: 100,
  background: status === "active" ? "var(--green-bg)" : "#fef2f2",
  color: status === "active" ? "var(--green)" : "var(--red)",
  border: `1px solid ${status === "active" ? "#c5e8d5" : "#fecaca"}`,
});

export default function KeyList() {
  return (
    <div
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr 80px 90px",
          padding: "8px 16px",
          borderBottom: "1px solid var(--border)",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.6px",
          color: "var(--muted)",
          textTransform: "uppercase",
        }}
      >
        <span>Name</span>
        <span>Key</span>
        <span>Status</span>
        <span>Created</span>
      </div>

      {keys.map((key, i) => (
        <div
          key={key.name}
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr 80px 90px",
            padding: "10px 16px",
            borderBottom: i < keys.length - 1 ? "1px solid var(--border)" : "none",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>
            {key.name}
          </span>
          <span
            style={{
              fontSize: 12,
              color: "var(--muted)",
              fontFamily: "SF Mono, Fira Code, monospace",
            }}
          >
            {key.value}
          </span>
          <span style={statusStyle(key.status)}>{key.status}</span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{key.created}</span>
        </div>
      ))}
    </div>
  );
}
