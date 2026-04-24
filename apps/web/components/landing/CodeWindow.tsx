"use client";

import { motion } from "framer-motion";

const rows = [
  { dot: "#3b82f6", id: "job_8f3a1c", channel: "Email", dest: "user@example.com" },
  { dot: "#7c3aed", id: "job_2d9b4e", channel: "Discord", dest: "#alerts-channel" },
  { dot: "#16a34a", id: "job_5e7f2a", channel: "WhatsApp", dest: "+1 (555) 012-3456" },
];

const code = `import axios from "axios";

// Send a notification via Dispatch
const response = await axios.post(
  "https://api.dispatch.dev/v1/notify",
  {
    channel: "email",
    to: "user@example.com",
    subject: "Your order has shipped",
    message: "Hey! Your package is on the way.",
    webhook_url: "https://hooks.discord.com/...",
  },
  {
    headers: {
      Authorization: \`Bearer \${process.env.DISPATCH_API_KEY}\`,
      "Content-Type": "application/json",
    },
  }
);

console.log(response.data);
// { job_id: "job_8f3a1c", status: "queued" }`;

function highlight(line: string) {
  // Simple syntax highlight by replacing known patterns
  return line
    .replace(/(\/\/.*)/g, '<span style="color:#555">$1</span>')
    .replace(/\b(const|await|import|from|new)\b/g, '<span style="color:#b392f0">$1</span>')
    .replace(/(["'`][^"'`]*["'`])/g, '<span style="color:#9ecbff">$1</span>')
    .replace(/\b(axios|post|console|log|headers|data)\b/g, '<span style="color:#79b8ff">$1</span>')
    .replace(/(https?:\/\/[^\s,"'`]+)/g, '<span style="color:#f97583">$1</span>');
}

export default function CodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      style={{
        background: "#111110",
        borderRadius: 20,
        border: "1px solid #2a2a28",
        overflow: "hidden",
        maxWidth: 1100,
        margin: "60px auto 0",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 20px",
          borderBottom: "1px solid #222220",
        }}
      >
        <span
          style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }}
        />
        <span
          style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }}
        />
        <span
          style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }}
        />
        <span
          style={{
            marginLeft: 12,
            fontSize: 12,
            color: "#555",
            fontFamily: "SF Mono, Fira Code, monospace",
          }}
        >
          notify.ts
        </span>
      </div>

      {/* Code body */}
      <div style={{ padding: "20px 24px", overflowX: "auto" }}>
        <pre
          style={{
            fontSize: 13,
            lineHeight: 1.7,
            color: "#85e89d",
            fontFamily: "SF Mono, Fira Code, Consolas, monospace",
            whiteSpace: "pre",
          }}
        >
          {code.split("\n").map((line, i) => (
            <div
              key={i}
              dangerouslySetInnerHTML={{ __html: highlight(line) || "&nbsp;" }}
            />
          ))}
        </pre>
      </div>

      {/* Live feed */}
      <div style={{ borderTop: "1px solid #222220", padding: "14px 24px 16px" }}>
        <div
          style={{
            fontSize: 11,
            color: "#444",
            fontFamily: "SF Mono, Fira Code, monospace",
            marginBottom: 10,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          Live delivery feed
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={row.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 + i * 0.6 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "6px 0",
              fontSize: 12,
              color: "#666",
              fontFamily: "SF Mono, Fira Code, Consolas, monospace",
              borderBottom: i < rows.length - 1 ? "1px solid #1a1a18" : "none",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: row.dot,
                flexShrink: 0,
              }}
            />
            <span style={{ color: "#444", minWidth: 120 }}>{row.id}</span>
            <span style={{ minWidth: 80 }}>{row.channel}</span>
            <span style={{ flex: 1 }}>{row.dest}</span>
            <span style={{ color: "#28c840", fontWeight: 500 }}>✓ delivered</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
