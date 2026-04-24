"use client";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "32px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left — wordmark */}
        <span
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: "var(--text)",
            letterSpacing: "-0.3px",
          }}
        >
          Dispatch
        </span>

        {/* Center — links */}
        <nav style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {["Docs", "GitHub", "Privacy", "Terms", "Status"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: 12,
                color: "var(--muted)",
                transition: "color 0.15s ease",
                fontWeight: 400,
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--muted)")
              }
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right — copyright */}
        <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 400 }}>
          © 2025 Dispatch
        </span>
      </div>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: -20,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(80px, 15vw, 160px)",
          fontWeight: 600,
          color: "var(--text)",
          opacity: 0.04,
          letterSpacing: "-4px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        Dispatch
      </div>
    </footer>
  );
}
