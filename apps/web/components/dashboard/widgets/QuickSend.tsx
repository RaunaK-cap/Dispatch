"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const channels = [
  { id: "email", icon: "✉", placeholder: "Recipient email" },
  { id: "discord", icon: "◈", placeholder: "Webhook URL" },
  { id: "telegram", icon: "✈", placeholder: "Chat ID" },
  { id: "whatsapp", icon: "📱", placeholder: "Phone number" },
];

export default function QuickSend() {
  const [selectedChannel, setSelectedChannel] = useState<(typeof channels)[number]>(channels[0]!);
  const [message, setMessage] = useState("");
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSend = () => {
    if (!message || !destination) return;
    
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      
      // Reset after success
      setTimeout(() => {
        setMessage("");
        setDestination("");
        setStatus("idle");
      }, 2000);
    }, 1500);
  };

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, height: "100%", padding: "16px 20px", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", color: "var(--text)" }}>Quick Send</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Test your integration</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
        {/* Channel Selector */}
        <div style={{ display: "flex", gap: 8 }}>
          {channels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChannel(ch)}
              style={{
                flex: 1,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                background: selectedChannel.id === ch.id ? "var(--text)" : "var(--bg)",
                color: selectedChannel.id === ch.id ? "var(--bg)" : "var(--text)",
                border: selectedChannel.id === ch.id ? "1px solid var(--text)" : "1px solid var(--border)",
                borderRadius: 8,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {ch.icon}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <input
          type="text"
          placeholder={selectedChannel.placeholder}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{
            width: "100%",
            height: 36,
            padding: "0 12px",
            fontSize: 13,
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            outline: "none",
          }}
        />

        <textarea
          placeholder="Type your test message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            height: 80,
            padding: "12px",
            fontSize: 13,
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            resize: "none",
            outline: "none",
            fontFamily: "inherit",
          }}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={status !== "idle" || !message || !destination}
          style={{
            marginTop: "auto",
            width: "100%",
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: status === "success" ? "var(--green)" : "var(--text)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: status !== "idle" ? "default" : "pointer",
            transition: "all 0.2s",
            opacity: (!message || !destination) && status === "idle" ? 0.5 : 1,
            position: "relative",
            overflow: "hidden"
          }}
        >
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Send test
              </motion.span>
            )}
            {status === "loading" && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="spinner" style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                <span>Sending...</span>
                <style>{`
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                `}</style>
              </motion.div>
            )}
            {status === "success" && (
              <motion.span key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                Delivered ✓
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
