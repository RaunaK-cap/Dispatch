"use client";

import { motion } from "framer-motion";

const bars = [
  { label: "Delivered", percent: 94, color: "var(--green)" },
  { label: "Retried", percent: 5, color: "var(--amber)" },
  { label: "Failed", percent: 1, color: "var(--red)" },
];

export default function RetryBars() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {bars.map((bar, i) => (
        <div key={bar.label}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 400 }}>
              {bar.label}
            </span>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>
              {bar.percent}%
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: "var(--bg)",
              borderRadius: 100,
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${bar.percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.15 }}
              style={{
                height: "100%",
                background: bar.color,
                borderRadius: 100,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
