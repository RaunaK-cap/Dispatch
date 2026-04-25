"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Generate 24 dummy data points
const hours = Array.from({ length: 24 }).map((_, i) => {
  const isHighVolume = i > 8 && i < 18;
  const sent = isHighVolume ? Math.floor(Math.random() * 200) + 100 : Math.floor(Math.random() * 50);
  const delivered = Math.floor(sent * (0.9 + Math.random() * 0.1));
  const failed = sent - delivered;
  
  // Calculate height percentage based on max 300
  const height = Math.max((sent / 300) * 100, 4);
  
  // Color intensity
  const intensity = sent === 0 ? "var(--surface)" : 
                    sent < 50 ? "#e6f4ea" : 
                    sent < 150 ? "#81c995" : "#34a853";

  return { time: `${i}:00`, sent, delivered, failed, height, intensity };
});

export default function DeliveryTimeline() {
  const [activeTab, setActiveTab] = useState("24h");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG paths for the mini trend line below
  const sentPoints = hours.map((h, i) => `${(i / 23) * 100},${100 - (h.sent / 300) * 100}`).join(" ");
  const deliveredPoints = hours.map((h, i) => `${(i / 23) * 100},${100 - (h.delivered / 300) * 100}`).join(" ");

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, height: "100%", padding: "16px 20px", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", color: "var(--muted)" }}>Delivery Timeline</span>
        
        {/* Toggle */}
        <div style={{ display: "flex", background: "var(--bg)", borderRadius: 6, padding: 2, border: "1px solid var(--border)" }}>
          {["24h", "7d", "30d"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontSize: 11,
                padding: "2px 10px",
                borderRadius: 4,
                border: "none",
                background: activeTab === tab ? "var(--surface)" : "transparent",
                color: activeTab === tab ? "var(--text)" : "var(--muted)",
                boxShadow: activeTab === tab ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap Bar Chart */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "2%", position: "relative", marginBottom: 16 }}>
        {hours.map((h, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              flex: 1,
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              position: "relative",
            }}
          >
            <motion.div
              animate={{ scale: hoveredIndex === i ? 1.1 : 1 }}
              style={{
                width: "100%",
                height: `${h.height}%`,
                background: h.intensity,
                borderRadius: 4,
                border: h.sent === 0 ? "1px solid var(--border)" : "none",
                transformOrigin: "bottom center",
                cursor: "crosshair",
              }}
            />
            {/* Tooltip */}
            {hoveredIndex === i && (
              <div
                style={{
                  position: "absolute",
                  bottom: `${h.height + 10}%`,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#111110",
                  color: "#fff",
                  padding: "6px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  whiteSpace: "nowrap",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                <div style={{ color: "#aaa", marginBottom: 4 }}>{h.time}</div>
                <div>{h.sent} sent · <span style={{ color: "var(--green)" }}>{h.delivered} delivered</span></div>
                {h.failed > 0 && <div style={{ color: "var(--red)" }}>{h.failed} failed</div>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Trend Lines (SVG) */}
      <div style={{ height: 30, width: "100%", position: "relative", borderTop: "1px solid var(--border)", paddingTop: 8 }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* Sent Line */}
          <polyline
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            points={sentPoints}
          />
          {/* Delivered Line */}
          <polyline
            fill="none"
            stroke="var(--green)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            points={deliveredPoints}
          />
        </svg>
      </div>
    </div>
  );
}
