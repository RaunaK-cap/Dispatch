"use client";

import { motion } from "framer-motion";

const streamRows = [
  { dot: "#3b82f6", id: "job_8f3a1c", channel: "Email", dest: "alice@example.com" },
  { dot: "#7c3aed", id: "job_2d9b4e", channel: "Discord", dest: "#general" },
  { dot: "#16a34a", id: "job_5e7f2a", channel: "WhatsApp", dest: "+1 555-0142" },
  { dot: "#0ea5e9", id: "job_1c8d3f", channel: "Telegram", dest: "@dispatch_bot" },
];

export default function StreamVisual() {
  return (
    <div
      style={{
        background: "var(--bg)",
        borderRadius: 12,
        border: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 80px 100px 1fr 80px",
          padding: "8px 14px",
          borderBottom: "1px solid var(--border)",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.6px",
          color: "var(--muted)",
          textTransform: "uppercase",
        }}
      >
        <span>Job ID</span>
        <span>Channel</span>
        <span>Destination</span>
        <span></span>
        <span>Status</span>
      </div>
      {streamRows.map((row, i) => (
        <motion.div
          key={row.id}
          className="stream-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.75,
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 80px 100px 1fr 80px",
            padding: "9px 14px",
            borderBottom: i < streamRows.length - 1 ? "1px solid var(--border)" : "none",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "var(--muted)",
              fontFamily: "SF Mono, Fira Code, monospace",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: row.dot,
                flexShrink: 0,
              }}
            />
            {row.id}
          </span>
          <span style={{ fontSize: 11, color: "var(--text)", fontWeight: 500 }}>
            {row.channel}
          </span>
          <span
            style={{
              fontSize: 11,
              color: "var(--muted)",
              fontFamily: "SF Mono, Fira Code, monospace",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {row.dest}
          </span>
          <span />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            style={{
              fontSize: 11,
              color: "var(--green)",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--green)",
              }}
            />
            delivered
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}
