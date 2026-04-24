"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "4", label: "Channels supported" },
  { value: "<50ms", label: "Queue latency" },
  { value: "99.9%", label: "Delivery uptime" },
  { value: "3×", label: "Retry on failure" },
];

export default function StatBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "48px 0",
        margin: "0",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
        className="stat-grid"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: "0 32px",
              borderRight:
                i < stats.length - 1 ? "1px solid var(--border)" : "none",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                letterSpacing: "-1px",
                color: "var(--text)",
                marginBottom: 6,
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 400 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stat-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stat-grid > div {
            border-right: none !important;
            padding: 12px 0 !important;
            border-bottom: 1px solid var(--border);
          }
          .stat-grid > div:last-child,
          .stat-grid > div:nth-child(3) {
            border-bottom: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
