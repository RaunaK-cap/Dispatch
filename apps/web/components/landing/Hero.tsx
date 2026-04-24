"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NodeDiagram from "./NodeDiagram";

export default function Hero() {
  return (
    <section
      style={{
        paddingTop: 140,
        paddingBottom: 80,
        maxWidth: 1100,
        margin: "0 auto",
        padding: "140px 40px 80px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "55fr 45fr",
          gap: 48,
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--green-bg)",
              border: "1px solid #c5e8d5",
              borderRadius: 100,
              padding: "5px 12px",
              marginBottom: 28,
            }}
          >
            <span
              className="pulse-dot"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--green)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "var(--green)",
                letterSpacing: "0.2px",
              }}
            >
              Now in public beta
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 500,
              letterSpacing: "-2px",
              lineHeight: 1.08,
              marginBottom: 20,
            }}
          >
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span 
                style={{ color: "var(--text)", display: "block" }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                One API.
              </motion.span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span 
                style={{ color: "var(--muted)", display: "block" }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                Every channel.
              </motion.span>
            </span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: 15,
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: 400,
              marginBottom: 32,
              fontWeight: 400,
            }}
          >
            Dispatch is notification infrastructure for developers. Send to
            Email, Discord, Telegram, and WhatsApp from a single POST request —
            with queuing, retries, and delivery logs built in.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/signup"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#fff",
                background: "var(--text)",
                padding: "10px 22px",
                borderRadius: 10,
                transition: "opacity 0.15s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "0.8")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "1")
              }
            >
              Start for free
            </Link>
            <a
              href="#"
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "var(--muted)",
                padding: "10px 22px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                transition: "border-color 0.2s ease, color 0.2s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#ccc";
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--muted)";
              }}
            >
              View docs →
            </a>
          </div>
        </motion.div>

        {/* Right column — Node Diagram (hidden on mobile) */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        >
          <NodeDiagram />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
