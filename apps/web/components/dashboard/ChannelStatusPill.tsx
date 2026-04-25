"use client";

import { motion } from "framer-motion";

export type ChannelStatus = "connected" | "degraded" | "error";

interface Props {
  name: string;
  status: ChannelStatus;
}

export default function ChannelStatusPill({ name, status }: Props) {
  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return "var(--green)";
      case "degraded":
        return "var(--amber)";
      case "error":
        return "var(--red)";
      default:
        return "var(--muted)";
    }
  };

  const color = getStatusColor();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 10px",
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: 100,
        fontSize: 11,
        fontWeight: 500,
        color: "var(--text)",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg)")}
    >
      <span>{name}</span>
      <div style={{ position: "relative", width: 6, height: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {status === "connected" && (
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: color,
            }}
          />
        )}
        <div
          style={{
            position: "relative",
            width: status === "connected" ? 4 : 6,
            height: status === "connected" ? 4 : 6,
            borderRadius: "50%",
            background: color,
          }}
        />
      </div>
    </div>
  );
}
