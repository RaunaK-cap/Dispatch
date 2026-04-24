"use client";

import { motion } from "framer-motion";

// Section A — Reliability (text left, visual right)
function ReliabilitySection() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center",
        padding: "64px 0",
        borderBottom: "1px solid var(--border)",
      }}
      className="alt-grid"
    >
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "1.2px",
            color: "var(--muted)",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Reliability
        </div>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 500,
            letterSpacing: "-1px",
            color: "var(--text)",
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          <span style={{ display: "block", overflow: "hidden" }}>
            <motion.span 
              style={{ display: "block" }}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Built for reliability.
            </motion.span>
          </span>
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "var(--muted)",
            lineHeight: 1.7,
            maxWidth: 400,
          }}
        >
          Every job is persisted before execution. If a delivery fails, Dispatch
          automatically retries with exponential backoff — up to 3 attempts.
          Unrecoverable jobs land in a dead letter queue for inspection, not
          silently dropped.
        </p>
      </motion.div>

      {/* Visual — flow diagram */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: 28,
          }}
        >
          {[
            { label: "Job queued", color: "#3b82f6", icon: "○", delay: 0 },
            { label: "First attempt → failed", color: "var(--red)", icon: "✕", delay: 0.3 },
            { label: "Retry #1 → failed", color: "var(--amber)", icon: "↺", delay: 0.6 },
            { label: "Retry #2 → delivered", color: "var(--green)", icon: "✓", delay: 0.9 },
          ].map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: step.delay }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 0",
                borderBottom:
                  i < 3 ? "1px solid var(--border)" : "none",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: step.color + "18",
                  border: `1px solid ${step.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: step.color,
                  fontWeight: 500,
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </span>
              <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 400 }}>
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Section B — Observability (visual left, text right)
const logRows = [
  { id: "job_8f3a1c", channel: "Email", status: "delivered", time: "2ms ago" },
  { id: "job_2d9b4e", channel: "Discord", status: "delivered", time: "18ms ago" },
  { id: "job_5e7f2a", channel: "WhatsApp", status: "retrying", time: "3s ago" },
  { id: "job_1c8d3f", channel: "Telegram", status: "delivered", time: "12ms ago" },
  { id: "job_9a2e1b", channel: "Email", status: "failed", time: "1m ago" },
];

function ObservabilitySection() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center",
        padding: "64px 0",
      }}
      className="alt-grid"
    >
      {/* Visual — log table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 80px 80px 70px",
              padding: "10px 16px",
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
            <span>Status</span>
            <span>Time</span>
          </div>
          {logRows.map((row, i) => {
            const statusColor =
              row.status === "delivered"
                ? "var(--green)"
                : row.status === "retrying"
                ? "var(--amber)"
                : "var(--red)";
            const statusBg =
              row.status === "delivered"
                ? "var(--green-bg)"
                : row.status === "retrying"
                ? "#fffbeb"
                : "#fef2f2";
            return (
              <div
                key={row.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px 80px 70px",
                  padding: "9px 16px",
                  borderBottom: i < logRows.length - 1 ? "1px solid var(--border)" : "none",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--muted)",
                    fontFamily: "SF Mono, Fira Code, monospace",
                  }}
                >
                  {row.id}
                </span>
                <span style={{ fontSize: 12, color: "var(--text)", fontWeight: 500 }}>
                  {row.channel}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: statusColor,
                    background: statusBg,
                    border: `1px solid ${statusColor}33`,
                    padding: "2px 7px",
                    borderRadius: 100,
                    display: "inline-block",
                  }}
                >
                  {row.status}
                </span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>{row.time}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "1.2px",
            color: "var(--muted)",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Observability
        </div>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 500,
            letterSpacing: "-1px",
            color: "var(--text)",
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          <span style={{ display: "block", overflow: "hidden" }}>
            <motion.span 
              style={{ display: "block" }}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Full delivery observability.
            </motion.span>
          </span>
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "var(--muted)",
            lineHeight: 1.7,
            maxWidth: 400,
          }}
        >
          See exactly what happened with every notification — channel, destination,
          delivery status, latency, and retry count. Filter by channel or time range.
          Export logs as JSON for your own analytics pipeline.
        </p>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .alt-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function AlternatingSections() {
  return (
    <section
      style={{
        maxWidth: 1100,
        margin: "80px auto 0",
        padding: "0 40px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <ReliabilitySection />
      <ObservabilitySection />
    </section>
  );
}
