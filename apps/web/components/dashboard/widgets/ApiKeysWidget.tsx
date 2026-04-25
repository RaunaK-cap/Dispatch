"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const keys = [
  { id: "1", value: "dsp_prod_3f8a2b9c4d1e...", name: "production", status: "active", lastUsed: "4 min ago" },
  { id: "2", value: "dsp_dev_7c1e4a2f9b3d...", name: "development", status: "active", lastUsed: "2 hrs ago" },
  { id: "3", value: "dsp_old_1b3d9f7a2c5e...", name: "old-project", status: "revoked", lastUsed: "3 weeks ago" },
];

export default function ApiKeysWidget() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ background: "#111110", border: "1px solid #2a2a28", borderRadius: 12, height: "100%", padding: "16px 20px", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", color: "#888" }}>API Keys</span>
        <button
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            padding: "4px 10px",
            color: "#fff",
            fontSize: 11,
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          }}
        >
          ＋ New key
        </button>
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {keys.map((key) => (
          <div key={key.id} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Key Value */}
                <motion.div
                  onClick={() => handleCopy(key.id, key.value)}
                  animate={{ background: copiedId === key.id ? "rgba(255,255,255,0.1)" : "transparent" }}
                  style={{
                    fontFamily: "SF Mono, Fira Code, monospace",
                    fontSize: 12,
                    color: copiedId === key.id ? "#fff" : "#aaa",
                    cursor: "pointer",
                    padding: "2px 4px",
                    margin: "-2px -4px",
                    borderRadius: 4,
                  }}
                  title="Click to copy"
                >
                  {copiedId === key.id ? "Copied!" : key.value}
                </motion.div>
                
                {/* Key Name */}
                <span style={{ fontSize: 11, color: "#666" }}>{key.name}</span>
              </div>

              {/* Status and Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {key.status === "active" ? (
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }} />
                  ) : (
                    <div style={{ width: 8, height: 8, borderRadius: "50%", border: "1px solid #666" }} />
                  )}
                  <span style={{ fontFamily: "SF Mono, Fira Code, monospace", fontSize: 11, color: key.status === "active" ? "var(--green)" : "#666" }}>
                    {key.status}
                  </span>
                </div>
                
                {/* Kebab Menu placeholder */}
                <button
                  style={{ background: "transparent", border: "none", color: "#666", cursor: "pointer", padding: "0 4px", letterSpacing: "2px" }}
                  title="Options"
                >
                  ···
                </button>
              </div>
            </div>
            
            {/* Last used */}
            <div style={{ fontSize: 10, color: "#555" }}>
              Last used {key.lastUsed}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
