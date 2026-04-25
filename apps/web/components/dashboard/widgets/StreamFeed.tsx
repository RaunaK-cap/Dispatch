"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type JobStatus = "delivered" | "retrying" | "failed" | "queued";

interface LogRow {
  id: string;
  time: string;
  channel: string;
  channelIcon: string;
  channelColor: string;
  destination: string;
  message: string;
  status: JobStatus;
}

const initialLogs: LogRow[] = [
  { id: "job_3f8a", time: "12:04:31", channel: "email", channelIcon: "✉", channelColor: "#888", destination: "user@acme.com", message: '"Welcome to Dispatch"', status: "delivered" },
  { id: "job_9c1b", time: "12:04:29", channel: "discord", channelIcon: "◈", channelColor: "#5865F2", destination: "#alerts", message: '"CPU spike detected"', status: "delivered" },
  { id: "job_7e5d", time: "12:04:27", channel: "telegram", channelIcon: "✈", channelColor: "#229ED9", destination: "@devbot", message: '"Build #142 passed"', status: "retrying" },
  { id: "job_2a1c", time: "12:04:25", channel: "whatsapp", channelIcon: "📱", channelColor: "#25D366", destination: "+91984...", message: '"OTP: 849201"', status: "failed" },
];

export default function StreamFeed() {
  const [logs, setLogs] = useState<LogRow[]>(initialLogs);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll simulation (optional, just visual for the dashboard)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLog: LogRow = {
          id: `job_${Math.random().toString(36).substr(2, 4)}`,
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          channel: "email",
          channelIcon: "✉",
          channelColor: "#888",
          destination: "user@acme.com",
          message: '"Ping from system"',
          status: "delivered",
        };
        return [newLog, ...prev].slice(0, 8); // Keep 8 items
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative", width: 8, height: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", background: "var(--green)" }}
            />
            <div style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", color: "var(--muted)" }}>
            Live Stream
          </span>
        </div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 11,
            color: "var(--muted)",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text)";
            e.currentTarget.style.borderColor = "#ccc";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--muted)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>

      {/* Feed Area */}
      <div style={{ padding: "0 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            background: "#111110",
            borderRadius: 12,
            padding: "16px",
            flex: 1,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {isPaused && (
            <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", background: "var(--text)", color: "var(--bg)", padding: "4px 10px", borderRadius: 100, fontSize: 11, zIndex: 10 }}>
              Paused
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, filter: isPaused ? "blur(1px)" : "none", transition: "filter 0.2s" }}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                layout
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 24px 70px 120px 1fr 90px",
                  gap: 12,
                  alignItems: "center",
                  fontSize: 12,
                }}
              >
                <span style={{ fontFamily: "monospace", color: "#555", fontSize: 11 }}>{log.time}</span>
                <span style={{ color: log.channelColor, fontSize: 14 }}>{log.channelIcon}</span>
                <span style={{ fontFamily: "monospace", color: "#666", fontSize: 11 }}>{log.id}</span>
                <span style={{ fontFamily: "monospace", color: "#999" }}>{log.destination}</span>
                <span style={{ color: "#aaa", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{log.message}</span>
                
                {/* Status Badge */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {log.status === "delivered" && <span style={{ color: "var(--green)", fontSize: 11 }}>✓ delivered</span>}
                  {log.status === "retrying" && <span style={{ color: "var(--amber)", fontSize: 11 }}>↻ retrying</span>}
                  {log.status === "failed" && <span style={{ color: "var(--red)", fontSize: 11 }}>✗ failed</span>}
                  {log.status === "queued" && <span style={{ color: "#666", fontSize: 11 }}>⏳ queued</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div style={{ padding: "16px 20px" }}>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>
          2,341 delivered today · 3 failed · 1 retrying
        </span>
      </div>
    </div>
  );
}
